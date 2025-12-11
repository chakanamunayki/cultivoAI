"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleGenAI, Modality } from "@google/genai";
import type { Locale } from "@/content/types";
import {
  type GeminiConnectionState,
  type GeminiConversationState,
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

// Voice configuration by locale
const VOICE_CONFIG: Record<Locale, string> = {
  es: "Kore", // Spanish voice
  en: "Kore", // English voice
};

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

  // Refs for session and audio
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const isRecordingRef = useRef(false);

  // Audio playback queue
  const audioQueueRef = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const nextPlayTimeRef = useRef<number>(0); // Track when next chunk should start

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

  const fetchEphemeralToken = useCallback(async (): Promise<string | null> => {
    try {
      console.log("[Gemini Live SDK] Fetching ephemeral token for locale:", locale);

      const response = await fetch("/api/voice/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });

      if (!response.ok) {
        throw new Error(`Token fetch failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("[Gemini Live SDK] Token received");

      // Decode the base64 token to extract the API key
      try {
        const tokenPayload = JSON.parse(atob(data.token));
        console.log("[Gemini Live SDK] Decoded token, API key starts with:", tokenPayload.apiKey?.substring(0, 10));
        return tokenPayload.apiKey;
      } catch (decodeErr) {
        console.error("[Gemini Live SDK] Failed to decode token:", decodeErr);
        throw new Error("Invalid token format");
      }
    } catch (err) {
      console.error("[Gemini Live SDK] Token fetch error:", err);
      const errorMsg = new Error(
        locale === "es"
          ? `Error al obtener token: ${err instanceof Error ? err.message : "Desconocido"}`
          : `Failed to fetch token: ${err instanceof Error ? err.message : "Unknown"}`
      );
      setError(errorMsg);
      onError?.(errorMsg);
      return null;
    }
  }, [locale, onError]);

  // ============================================
  // Audio Playback
  // ============================================

  const playAudioChunk = useCallback(async (audioData: ArrayBuffer) => {
    if (!playbackContextRef.current) {
      console.warn("[Gemini Live SDK] No playback context available");
      return;
    }

    try {
      const ctx = playbackContextRef.current;

      // Check if context is closed
      if (ctx.state === "closed") {
        console.warn("[Gemini Live SDK] AudioContext was closed, recreating...");
        playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
        return playAudioChunk(audioData); // Retry with new context
      }

      // Resume if suspended
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      // PCM16 data from Gemini (24kHz, mono, 16-bit little-endian)
      const dataView = new DataView(audioData);
      const numSamples = audioData.byteLength / 2; // 2 bytes per 16-bit sample
      const float32 = new Float32Array(numSamples);

      // Convert PCM16 to Float32 with proper endianness handling
      for (let i = 0; i < numSamples; i++) {
        const sample = dataView.getInt16(i * 2, true); // true = little-endian
        // Normalize to -1.0 to 1.0
        float32[i] = sample / 32768.0;
      }

      // Create audio buffer at 24kHz
      const audioBuffer = ctx.createBuffer(1, numSamples, 24000);
      audioBuffer.getChannelData(0).set(float32);

      // Calculate when to start this chunk (scheduled playback eliminates gaps)
      const currentTime = ctx.currentTime;
      const startTime = Math.max(currentTime, nextPlayTimeRef.current);

      // Schedule next chunk right after this one
      const duration = audioBuffer.duration;
      nextPlayTimeRef.current = startTime + duration;

      // Play audio at scheduled time
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.start(startTime);

      // When audio ends, check for more in queue
      source.onended = () => {
        isPlayingRef.current = false;
        if (audioQueueRef.current.length > 0) {
          const nextChunk = audioQueueRef.current.shift();
          if (nextChunk) {
            playAudioChunk(nextChunk);
          }
        } else {
          updateConversationState("idle");
          // Reset play time when idle
          nextPlayTimeRef.current = 0;
        }
      };

      isPlayingRef.current = true;
    } catch (err) {
      console.error("[Gemini Live SDK] Audio playback error:", err);
      isPlayingRef.current = false;
    }
  }, [updateConversationState]);

  const queueAudioChunk = useCallback(
    (audioData: ArrayBuffer) => {
      audioQueueRef.current.push(audioData);

      // Start playing if not already
      if (!isPlayingRef.current) {
        const chunk = audioQueueRef.current.shift();
        if (chunk) {
          playAudioChunk(chunk);
        }
      }
    },
    [playAudioChunk]
  );

  const clearAudioQueue = useCallback(() => {
    audioQueueRef.current = [];
    isPlayingRef.current = false;
  }, []);

  // ============================================
  // Audio Input Setup
  // ============================================

  const setupAudioInput = useCallback(async (): Promise<boolean> => {
    try {
      console.log("[Gemini Live SDK] Setting up audio input");

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        },
      });

      mediaStreamRef.current = stream;

      // Create AudioContext at 16kHz for input
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      const ctx = audioContextRef.current;

      // Load Audio Worklet module
      await ctx.audioWorklet.addModule("/pcm-processor.js");

      // Create worklet node
      const workletNode = new AudioWorkletNode(ctx, "pcm-processor");
      workletNodeRef.current = workletNode;

      // Connect microphone to worklet
      const source = ctx.createMediaStreamSource(stream);
      source.connect(workletNode);

      // Handle audio data from worklet
      workletNode.port.onmessage = (event) => {
        if (
          event.data.type === "pcm" &&
          sessionRef.current &&
          isRecordingRef.current
        ) {
          const pcmBuffer = event.data.data as ArrayBuffer;

          // Convert to base64
          const bytes = new Uint8Array(pcmBuffer);
          let binary = "";
          for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]!);
          }
          const base64Audio = btoa(binary);

          // Send to Gemini via SDK (with safety check for WebSocket state)
          try {
            // Only send if session exists and has sendRealtimeInput method
            if (sessionRef.current && typeof sessionRef.current.sendRealtimeInput === 'function') {
              sessionRef.current.sendRealtimeInput({
                audio: {
                  data: base64Audio,
                  mimeType: "audio/pcm;rate=16000",
                },
              });
            }
          } catch (err) {
            // Silently ignore errors if WebSocket is closing/closed
            if (err instanceof Error && !err.message.includes('CLOSING') && !err.message.includes('CLOSED')) {
              console.error("[Gemini Live SDK] Error sending audio:", err);
            }
          }
        }
      };

      console.log("[Gemini Live SDK] Audio input setup complete");
      return true;
    } catch (err) {
      console.error("[Gemini Live SDK] Audio input setup failed:", err);
      const errorMsg = new Error(
        locale === "es"
          ? "No se pudo acceder al micrófono"
          : "Could not access microphone"
      );
      setError(errorMsg);
      onError?.(errorMsg);
      return false;
    }
  }, [locale, onError]);

  // ============================================
  // Audio Output Setup
  // ============================================

  const setupAudioOutput = useCallback((): boolean => {
    try {
      // Reuse existing context if it's still open
      if (playbackContextRef.current && playbackContextRef.current.state !== "closed") {
        console.log("[Gemini Live SDK] Reusing existing audio output context");
        return true;
      }

      // Create AudioContext for playback at 24kHz (Gemini output)
      playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
      console.log("[Gemini Live SDK] Audio output setup complete");
      return true;
    } catch (err) {
      console.error("[Gemini Live SDK] Audio output setup failed:", err);
      return false;
    }
  }, []);

  // ============================================
  // SDK Connection
  // ============================================

  const initializeSession = useCallback(async (): Promise<boolean> => {
    try {
      console.log("[Gemini Live SDK] Initializing session");

      // Step 1: Get ephemeral token
      const token = await fetchEphemeralToken();
      if (!token) {
        console.error("[Gemini Live SDK] No token available");
        return false;
      }

      // Step 2: Initialize GoogleGenAI with ephemeral token
      const ai = new GoogleGenAI({
        apiKey: token,
        httpOptions: { apiVersion: "v1alpha" },
      });

      // Step 3: Configure session
      const config = {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: VOICE_CONFIG[locale],
            },
          },
        },
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        realtimeInputConfig: {
          automaticActivityDetection: {
            disabled: false,
            prefixPaddingMs: 100,
            silenceDurationMs: 300,
          },
        },
      };

      console.log("[Gemini Live SDK] Connecting to Gemini Live API");

      // Step 4: Connect with callbacks
      // Use a Promise to wait for connection to open
      let resolveConnection: (value: boolean) => void;
      const connectionPromise = new Promise<boolean>((resolve) => {
        resolveConnection = resolve;
      });

      const session = await ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        config: config,
        callbacks: {
          onopen: () => {
            console.log("[Gemini Live SDK] Connection opened");
            updateConnectionState("connected");
            updateConversationState("idle");
            // Start recording immediately after connection
            isRecordingRef.current = true;
            resolveConnection(true);
          },
          onmessage: (message: any) => {
            console.log("[Gemini Live SDK] Message received:", message);

            // Handle audio responses
            if (message.serverContent?.modelTurn?.parts) {
              console.log("[Gemini Live SDK] Processing modelTurn with", message.serverContent.modelTurn.parts.length, "parts");
              for (const part of message.serverContent.modelTurn.parts) {
                // Audio data
                if (part.inlineData?.data) {
                  console.log("[Gemini Live SDK] Received audio data:", {
                    length: part.inlineData.data.length,
                    mimeType: part.inlineData.mimeType
                  });
                  updateConversationState("speaking");

                  // Decode base64 to ArrayBuffer
                  const binary = atob(part.inlineData.data);
                  const bytes = new Uint8Array(binary.length);
                  for (let i = 0; i < binary.length; i++) {
                    bytes[i] = binary.charCodeAt(i);
                  }

                  queueAudioChunk(bytes.buffer);
                }

                // Text transcription
                if (part.text) {
                  console.log("[Gemini Live SDK] Received text:", part.text);
                  setAiTranscript((prev) => prev + part.text);
                  onTranscript?.(part.text, false, false);
                }
              }
            }

            // Handle user input transcription
            if (message.serverContent?.inputTranscript) {
              const transcript = message.serverContent.inputTranscript;
              setUserTranscript((prev) => prev + transcript);
              onTranscript?.(transcript, false, true);
            }

            // Handle turn complete
            if (message.serverContent?.turnComplete) {
              console.log("[Gemini Live SDK] Turn complete");
              if (audioQueueRef.current.length === 0) {
                updateConversationState("idle");
              }
            }

            // Handle interruption
            if (message.serverContent?.interrupted) {
              console.log("[Gemini Live SDK] Interrupted");
              clearAudioQueue();
              updateConversationState("idle");
            }
          },
          onerror: (event: ErrorEvent) => {
            console.error("[Gemini Live SDK] Connection error:", event);
            const errorMsg = new Error(
              locale === "es"
                ? `Error de conexión: ${event.message || "Desconocido"}`
                : `Connection error: ${event.message || "Unknown"}`
            );
            setError(errorMsg);
            onError?.(errorMsg);
            updateConnectionState("error");
            resolveConnection(false);
          },
          onclose: (event?: CloseEvent) => {
            console.log("[Gemini Live SDK] Connection closed", {
              code: event?.code,
              reason: event?.reason,
              wasClean: event?.wasClean,
            });
            isRecordingRef.current = false;
            updateConnectionState("disconnected");
            updateConversationState("idle");
            resolveConnection(false);
          },
        },
      });

      sessionRef.current = session;
      console.log("[Gemini Live SDK] Waiting for connection to open...");

      // Wait for connection to actually open before proceeding
      const connected = await connectionPromise;
      if (!connected) {
        console.error("[Gemini Live SDK] Connection failed to open");
        return false;
      }

      console.log("[Gemini Live SDK] Session initialized successfully");
      return true;
    } catch (err) {
      console.error("[Gemini Live SDK] Session initialization failed:", err);
      const errorMsg = new Error(
        locale === "es"
          ? `Error al inicializar sesión: ${err instanceof Error ? err.message : "Desconocido"}`
          : `Failed to initialize session: ${err instanceof Error ? err.message : "Unknown"}`
      );
      setError(errorMsg);
      onError?.(errorMsg);
      updateConnectionState("error");
      return false;
    }
  }, [
    locale,
    systemPrompt,
    fetchEphemeralToken,
    queueAudioChunk,
    clearAudioQueue,
    updateConnectionState,
    updateConversationState,
    onTranscript,
    onError,
  ]);

  // ============================================
  // Public Connect Method
  // ============================================

  const connect = useCallback(async () => {
    if (connectionState === "connected" || connectionState === "connecting") {
      return;
    }

    console.log("[Gemini Live SDK] Starting connection sequence");
    setError(null);
    setUserTranscript("");
    setAiTranscript("");
    clearAudioQueue();

    updateConnectionState("connecting");

    // Step 1: Setup audio output
    const outputSuccess = setupAudioOutput();
    if (!outputSuccess) {
      console.error("[Gemini Live SDK] Audio output setup failed");
      updateConnectionState("error");
      return;
    }

    // Step 2: Initialize SDK session FIRST (before audio input)
    const sessionSuccess = await initializeSession();
    if (!sessionSuccess) {
      console.error("[Gemini Live SDK] Session initialization failed");
      updateConnectionState("error");
      return;
    }

    // Step 3: Setup audio input AFTER session is connected
    const inputSuccess = await setupAudioInput();
    if (!inputSuccess) {
      console.error("[Gemini Live SDK] Audio input setup failed");
      updateConnectionState("error");
    }
  }, [
    connectionState,
    clearAudioQueue,
    setupAudioOutput,
    setupAudioInput,
    initializeSession,
    updateConnectionState,
  ]);

  // ============================================
  // Public Disconnect Method
  // ============================================

  const disconnect = useCallback(() => {
    console.log("[Gemini Live SDK] Disconnecting");

    // Stop recording
    isRecordingRef.current = false;

    // Close session
    if (sessionRef.current) {
      try {
        sessionRef.current.disconnect?.();
      } catch (err) {
        console.error("[Gemini Live SDK] Error disconnecting session:", err);
      }
      sessionRef.current = null;
    }

    // Stop media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    // Close input audio context only (keep playback for queued audio)
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Don't close playback context - let queued audio finish playing
    // It will be closed on component unmount only

    // Clear worklet
    workletNodeRef.current = null;

    // Clear audio queue
    clearAudioQueue();

    updateConnectionState("disconnected");
    updateConversationState("idle");
  }, [clearAudioQueue, updateConnectionState, updateConversationState]);

  // ============================================
  // Cleanup on Unmount
  // ============================================

  // Cleanup on unmount only - using ref to avoid recreating effect
  useEffect(() => {
    return () => {
      // Disconnect when hook unmounts
      if (sessionRef.current) {
        try {
          sessionRef.current.disconnect?.();
        } catch (err) {
          console.error("[Gemini Live SDK] Cleanup error:", err);
        }
      }
      // Stop media stream
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      // Close audio contexts
      if (audioContextRef.current?.state !== "closed") {
        try {
          audioContextRef.current?.close();
        } catch (err) {
          // Ignore already closed error
        }
      }
      if (playbackContextRef.current?.state !== "closed") {
        try {
          playbackContextRef.current?.close();
        } catch (err) {
          // Ignore already closed error
        }
      }
    };
  }, []); // Empty deps - cleanup ONLY on unmount

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
