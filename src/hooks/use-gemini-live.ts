"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/types";
import {
  GEMINI_LIVE_CONFIG,
  AUDIO_CONFIG,
  type GeminiConnectionState,
  type GeminiConversationState,
  type GeminiServerMessage,
  buildWebSocketUrl,
  buildSetupMessage,
  buildRealtimeInputMessage,
  decodeToken,
  isTokenExpired,
  isSetupComplete,
  isServerContent,
  parseServerContent,
  float32ToPCM16,
  pcm16ToFloat32,
  arrayBufferToBase64,
} from "@/lib/gemini-live";

// ============================================
// Types
// ============================================

export interface UseGeminiLiveOptions {
  locale: Locale;
  systemPrompt: string;
  onTranscript?: (text: string, isFinal: boolean, isUser: boolean) => void;
  onError?: (error: Error) => void;
  onConnectionChange?: (state: GeminiConnectionState) => void;
  onConversationChange?: (state: GeminiConversationState) => void;
}

export interface UseGeminiLiveReturn {
  // Connection state
  connectionState: GeminiConnectionState;
  conversationState: GeminiConversationState;
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;

  // Control methods
  connect: () => Promise<void>;
  disconnect: () => void;

  // Transcripts
  userTranscript: string;
  aiTranscript: string;

  // Error state
  error: Error | null;
}

// ============================================
// AudioWorklet Processor Code (inline)
// ============================================

const PCM_PROCESSOR_CODE = `
class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 4096;
    this.buffer = new Float32Array(this.bufferSize);
    this.bufferIndex = 0;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (!input || !input[0]) return true;

    const inputChannel = input[0];

    for (let i = 0; i < inputChannel.length; i++) {
      this.buffer[this.bufferIndex++] = inputChannel[i];

      if (this.bufferIndex >= this.bufferSize) {
        // Send buffer to main thread
        this.port.postMessage({
          type: 'audio',
          data: this.buffer.slice()
        });
        this.bufferIndex = 0;
      }
    }

    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);
`;

// ============================================
// Hook Implementation
// ============================================

export function useGeminiLive(options: UseGeminiLiveOptions): UseGeminiLiveReturn {
  const {
    locale,
    systemPrompt,
    onTranscript,
    onError,
    onConnectionChange,
    onConversationChange,
  } = options;

  // State
  const [connectionState, setConnectionState] = useState<GeminiConnectionState>("disconnected");
  const [conversationState, setConversationState] = useState<GeminiConversationState>("idle");
  const [userTranscript, setUserTranscript] = useState("");
  const [aiTranscript, setAiTranscript] = useState("");
  const [error, setError] = useState<Error | null>(null);

  // Refs for WebSocket and audio
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const tokenRef = useRef<{ apiKey: string; expiresAt: number } | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const isSetupCompleteRef = useRef(false);

  // Audio playback queue
  const audioQueueRef = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const nextPlayTimeRef = useRef(0);

  // ============================================
  // Connection State Updates
  // ============================================

  const updateConnectionState = useCallback(
    (state: GeminiConnectionState) => {
      setConnectionState(state);
      onConnectionChange?.(state);
    },
    [onConnectionChange]
  );

  const updateConversationState = useCallback(
    (state: GeminiConversationState) => {
      setConversationState(state);
      onConversationChange?.(state);
    },
    [onConversationChange]
  );

  // ============================================
  // Token Management
  // ============================================

  const fetchToken = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/voice/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }

      const data = await response.json();
      const decoded = decodeToken(data.token);

      if (!decoded) {
        throw new Error("Invalid token format");
      }

      tokenRef.current = {
        apiKey: decoded.apiKey,
        expiresAt: decoded.expiresAt,
      };

      return true;
    } catch (err) {
      console.error("Token fetch error:", err);
      return false;
    }
  }, [locale]);

  // ============================================
  // Audio Playback (Streaming)
  // ============================================

  const playNextChunk = useCallback(async () => {
    if (!playbackContextRef.current || audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      return;
    }

    isPlayingRef.current = true;
    const chunk = audioQueueRef.current.shift();

    if (!chunk) {
      isPlayingRef.current = false;
      return;
    }

    try {
      const ctx = playbackContextRef.current;

      // Resume if suspended
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      // Convert PCM to Float32
      const float32Data = pcm16ToFloat32(chunk);

      // Create audio buffer
      const audioBuffer = ctx.createBuffer(
        1,
        float32Data.length,
        AUDIO_CONFIG.OUTPUT.SAMPLE_RATE
      );
      audioBuffer.getChannelData(0).set(float32Data);

      // Create source and schedule playback
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      // Schedule to play immediately or after current buffer
      const currentTime = ctx.currentTime;
      const startTime = Math.max(currentTime, nextPlayTimeRef.current);
      source.start(startTime);

      // Update next play time
      nextPlayTimeRef.current = startTime + audioBuffer.duration;

      // When this chunk ends, play next
      source.onended = () => {
        if (audioQueueRef.current.length > 0) {
          playNextChunk();
        } else {
          isPlayingRef.current = false;
          // AI finished speaking
          updateConversationState("idle");
        }
      };
    } catch (err) {
      console.error("Audio playback error:", err);
      isPlayingRef.current = false;
    }
  }, [updateConversationState]);

  const queueAudioChunk = useCallback(
    (audioData: ArrayBuffer) => {
      audioQueueRef.current.push(audioData);

      // Start playing if not already
      if (!isPlayingRef.current) {
        playNextChunk();
      }
    },
    [playNextChunk]
  );

  const clearAudioQueue = useCallback(() => {
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    nextPlayTimeRef.current = 0;
  }, []);

  // ============================================
  // WebSocket Message Handling
  // ============================================

  const handleWebSocketMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);

        if (isSetupComplete(message as GeminiServerMessage)) {
          isSetupCompleteRef.current = true;
          updateConversationState("idle");
          return;
        }

        const serverMsg = message as GeminiServerMessage;
        if (isServerContent(serverMsg)) {
          const { audioChunks, textChunks, turnComplete, interrupted } =
            parseServerContent(serverMsg);

          // Handle interruption
          if (interrupted) {
            clearAudioQueue();
            updateConversationState("interrupted");
            return;
          }

          // Queue audio chunks for playback
          if (audioChunks.length > 0) {
            updateConversationState("speaking");
            for (const chunk of audioChunks) {
              queueAudioChunk(chunk);
            }
          }

          // Handle text transcripts
          if (textChunks.length > 0) {
            const text = textChunks.join("");
            setAiTranscript((prev) => prev + text);
            onTranscript?.(text, turnComplete, false);
          }

          // Turn complete
          if (turnComplete) {
            if (audioQueueRef.current.length === 0) {
              updateConversationState("idle");
            }
          }
        }

        // Handle toolCall messages (for function calling)
        // TODO: Handle function calls if needed in the future

        // Handle activity messages (user started/stopped speaking)
        if ("serverContent" in message && message.serverContent) {
          const sc = message.serverContent;
          if (sc.inputTranscript) {
            // User's speech transcribed
            setUserTranscript((prev) => prev + sc.inputTranscript);
            onTranscript?.(sc.inputTranscript, false, true);
          }
        }
      } catch {
        // WebSocket message parse error - ignore malformed messages
      }
    },
    [clearAudioQueue, queueAudioChunk, updateConversationState, onTranscript]
  );

  // ============================================
  // Audio Input Setup
  // ============================================

  const setupAudioInput = useCallback(async (): Promise<boolean> => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: AUDIO_CONFIG.INPUT.SAMPLE_RATE,
        },
      });

      mediaStreamRef.current = stream;

      // Create AudioContext for input
      audioContextRef.current = new AudioContext({
        sampleRate: AUDIO_CONFIG.INPUT.SAMPLE_RATE,
      });

      const ctx = audioContextRef.current;

      // Create and register AudioWorklet
      const blob = new Blob([PCM_PROCESSOR_CODE], { type: "application/javascript" });
      const workletUrl = URL.createObjectURL(blob);

      await ctx.audioWorklet.addModule(workletUrl);
      URL.revokeObjectURL(workletUrl);

      // Create worklet node
      const workletNode = new AudioWorkletNode(ctx, "pcm-processor");
      workletNodeRef.current = workletNode;

      // Connect microphone to worklet
      const source = ctx.createMediaStreamSource(stream);
      source.connect(workletNode);

      // Handle audio data from worklet
      let audioChunksSent = 0;
      workletNode.port.onmessage = (event) => {
        if (event.data.type === "audio" && wsRef.current?.readyState === WebSocket.OPEN && isSetupCompleteRef.current) {
          const float32Data = event.data.data as Float32Array;
          const pcmBuffer = float32ToPCM16(float32Data);
          const base64 = arrayBufferToBase64(pcmBuffer);
          const message = buildRealtimeInputMessage(base64);
          wsRef.current.send(JSON.stringify(message));
          audioChunksSent++;
        }
      };

      return true;
    } catch {
      const error = new Error(
        locale === "es"
          ? "No se pudo acceder al microfono"
          : "Could not access microphone"
      );
      setError(error);
      onError?.(error);
      return false;
    }
  }, [locale, onError]);

  // ============================================
  // Audio Output Setup
  // ============================================

  const setupAudioOutput = useCallback((): boolean => {
    try {
      playbackContextRef.current = new AudioContext({
        sampleRate: AUDIO_CONFIG.OUTPUT.SAMPLE_RATE,
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  // ============================================
  // WebSocket Connection
  // ============================================

  const connectWebSocket = useCallback(async (): Promise<boolean> => {
    if (!tokenRef.current) {
      console.error("[Gemini Live WS] No token available");
      return false;
    }

    return new Promise((resolve) => {
      const url = buildWebSocketUrl(tokenRef.current!.apiKey);
      const ws = new WebSocket(url);
      wsRef.current = ws;

      const connectionTimeout = setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          console.error("[Gemini Live WS] Connection timeout");
          ws.close();
          resolve(false);
        }
      }, GEMINI_LIVE_CONFIG.CONNECTION_TIMEOUT_MS);

      ws.onopen = () => {
        clearTimeout(connectionTimeout);

        // Send setup message
        const setupMessage = buildSetupMessage(systemPrompt, locale);
        ws.send(JSON.stringify(setupMessage));

        updateConnectionState("connected");
        reconnectAttemptsRef.current = 0;
        resolve(true);
      };

      ws.onmessage = handleWebSocketMessage;

      ws.onerror = () => {
        clearTimeout(connectionTimeout);
        const error = new Error(
          locale === "es"
            ? "Error de conexion de voz"
            : "Voice connection error"
        );
        setError(error);
        onError?.(error);
        resolve(false);
      };

      ws.onclose = () => {
        clearTimeout(connectionTimeout);
        isSetupCompleteRef.current = false;

        // Attempt reconnection if not intentionally disconnected
        if (
          connectionState === "connected" &&
          reconnectAttemptsRef.current < GEMINI_LIVE_CONFIG.MAX_RECONNECT_ATTEMPTS
        ) {
          reconnectAttemptsRef.current++;
          updateConnectionState("reconnecting");
          setTimeout(() => {
            connectWebSocket();
          }, GEMINI_LIVE_CONFIG.RECONNECT_DELAY_MS);
        } else {
          updateConnectionState("disconnected");
        }
      };
    });
  }, [
    systemPrompt,
    locale,
    connectionState,
    handleWebSocketMessage,
    updateConnectionState,
    onError,
  ]);

  // ============================================
  // Public Connect Method
  // ============================================

  const connect = useCallback(async () => {
    if (connectionState === "connected" || connectionState === "connecting") {
      return;
    }

    setError(null);
    setUserTranscript("");
    setAiTranscript("");
    clearAudioQueue();

    updateConnectionState("connecting");

    // Step 1: Fetch token
    const tokenSuccess = await fetchToken();
    if (!tokenSuccess) {
      console.error("[Gemini Live] Token fetch failed");
      updateConnectionState("error");
      const error = new Error(
        locale === "es"
          ? "No se pudo obtener el token de voz"
          : "Could not get voice token"
      );
      setError(error);
      onError?.(error);
      return;
    }

    // Step 2: Setup audio output
    const outputSuccess = setupAudioOutput();
    if (!outputSuccess) {
      console.error("[Gemini Live] Audio output setup failed");
      updateConnectionState("error");
      return;
    }

    // Step 3: Setup audio input
    const inputSuccess = await setupAudioInput();
    if (!inputSuccess) {
      console.error("[Gemini Live] Audio input setup failed");
      updateConnectionState("error");
      return;
    }

    // Step 4: Connect WebSocket
    const wsSuccess = await connectWebSocket();
    if (!wsSuccess) {
      console.error("[Gemini Live] WebSocket connection failed");
      updateConnectionState("error");
    }
  }, [
    connectionState,
    locale,
    clearAudioQueue,
    fetchToken,
    setupAudioOutput,
    setupAudioInput,
    connectWebSocket,
    updateConnectionState,
    onError,
  ]);

  // ============================================
  // Public Disconnect Method
  // ============================================

  const disconnect = useCallback(() => {
    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    // Stop media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    // Close audio contexts
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (playbackContextRef.current) {
      playbackContextRef.current.close();
      playbackContextRef.current = null;
    }

    // Clear worklet
    workletNodeRef.current = null;

    // Clear audio queue
    clearAudioQueue();

    // Reset state
    isSetupCompleteRef.current = false;
    reconnectAttemptsRef.current = 0;
    tokenRef.current = null;

    updateConnectionState("disconnected");
    updateConversationState("idle");
  }, [clearAudioQueue, updateConnectionState, updateConversationState]);

  // ============================================
  // Token Refresh Effect
  // ============================================

  useEffect(() => {
    if (connectionState !== "connected" || !tokenRef.current) {
      return;
    }

    const checkTokenInterval = setInterval(async () => {
      if (tokenRef.current && isTokenExpired(tokenRef.current.expiresAt)) {
        const success = await fetchToken();
        if (!success) {
          // Token refresh failed, reconnect
          disconnect();
          await connect();
        }
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(checkTokenInterval);
  }, [connectionState, fetchToken, connect, disconnect]);

  // ============================================
  // Cleanup on Unmount
  // ============================================

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  // ============================================
  // Return
  // ============================================

  return {
    connectionState,
    conversationState,
    isConnected: connectionState === "connected",
    isListening: conversationState === "listening",
    isSpeaking: conversationState === "speaking",
    connect,
    disconnect,
    userTranscript,
    aiTranscript,
    error,
  };
}
