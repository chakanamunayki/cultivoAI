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
  onConnected?: () => void; // Called when connection opens successfully
  onRetrying?: (attempt: number, delay: number) => void; // Called when auto-retry starts
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
  sendTextPrompt: (text: string) => void; // Send text input to trigger AI response

  // Transcripts
  userTranscript: string;
  aiTranscript: string;

  // Audio level (0-100)
  audioLevel: number;

  // Frequency data for visualizer (stable reference; contents update in-place)
  frequencyData: Uint8Array;

  // Active audio source for visualizer
  audioSource: "mic" | "ai" | "idle";

  // Retry state
  retryAttempt: number;
  maxRetries: number;

  // Error state
  error: Error | null;
  errorType: "microphone" | "network" | "server" | null;
}

// Voice configuration by locale
const VOICE_CONFIG: Record<Locale, string> = {
  es: "Kore", // Spanish voice
  en: "Kore", // English voice
};

const MAX_RETRIES = 3;
const RETRY_DELAYS = [0, 2000, 5000] as const; // Instant, 2s, 5s

const debugLog = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(...args);
  }
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
    onConnected,
    onRetrying,
  } = options;

  // State
  const [connectionState, setConnectionState] = useState<GeminiConnectionState>("disconnected");
  const [conversationState, setConversationState] = useState<GeminiConversationState>("idle");
  const [userTranscript, setUserTranscript] = useState("");
  const [aiTranscript, setAiTranscript] = useState("");
  const [audioLevel, setAudioLevel] = useState(0);
  const frequencyDataRef = useRef<Uint8Array>(new Uint8Array(128));
  const [audioSource, setAudioSource] = useState<"mic" | "ai" | "idle">("idle");
  const [error, setError] = useState<Error | null>(null);
  const [errorType, setErrorType] = useState<"microphone" | "network" | "server" | null>(null);
  const [retryAttempt, setRetryAttempt] = useState(0);

  // Refs for session and audio
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const isRecordingRef = useRef(false);
  const connectRef = useRef<(isRetry?: boolean) => Promise<void>>(async () => {});

  // AnalyserNode refs for frequency data
  const inputAnalyserRef = useRef<AnalyserNode | null>(null);
  const outputAnalyserRef = useRef<AnalyserNode | null>(null);
  const frequencyRafRef = useRef<number | null>(null);

  // Audio playback queue
  const audioQueueRef = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const nextPlayTimeRef = useRef<number>(0); // Track when next chunk should start

  // ============================================
  // Frequency Analysis Loop (for visualizer)
  // ============================================

  const stopFrequencyAnalysis = useCallback(() => {
    if (frequencyRafRef.current != null) {
      cancelAnimationFrame(frequencyRafRef.current);
      frequencyRafRef.current = null;
    }
    frequencyDataRef.current.fill(0);
    setAudioSource("idle");
  }, []);

  const startFrequencyAnalysis = useCallback(() => {
    stopFrequencyAnalysis();

    const micData = new Uint8Array(128);
    const aiData = new Uint8Array(128);

    const analyze = () => {
      const inputAnalyser = inputAnalyserRef.current;
      const outputAnalyser = outputAnalyserRef.current;

      if (inputAnalyser) {
        inputAnalyser.getByteFrequencyData(micData);
      } else {
        micData.fill(0);
      }

      if (outputAnalyser) {
        outputAnalyser.getByteFrequencyData(aiData);
      } else {
        aiData.fill(0);
      }

      const micVol =
        micData.reduce((a, b) => a + b, 0) / (micData.length || 1);
      const aiVol = aiData.reduce((a, b) => a + b, 0) / (aiData.length || 1);

      // Thresholds to avoid jitter from background noise
      const AI_THRESHOLD = 2;
      const MIC_THRESHOLD = 5;

      if (aiVol > AI_THRESHOLD) {
        frequencyDataRef.current.set(aiData);
        setAudioSource((prev) => (prev === "ai" ? prev : "ai"));
      } else if (micVol > MIC_THRESHOLD) {
        frequencyDataRef.current.set(micData);
        setAudioSource((prev) => (prev === "mic" ? prev : "mic"));
      } else {
        frequencyDataRef.current.set(micData);
        setAudioSource((prev) => (prev === "idle" ? prev : "idle"));
      }

      frequencyRafRef.current = requestAnimationFrame(analyze);
    };

    analyze();
  }, [stopFrequencyAnalysis]);

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
      debugLog("[Gemini Live SDK] Fetching ephemeral token for locale:", locale);

      const response = await fetch("/api/voice/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });

      if (!response.ok) {
        throw new Error(`Token fetch failed: ${response.status}`);
      }

      const data = await response.json();
      debugLog("[Gemini Live SDK] Token received");

      // Decode the base64 token to extract the API key
      try {
        const tokenPayload = JSON.parse(atob(data.token));
        debugLog(
          "[Gemini Live SDK] Decoded token, API key starts with:",
          tokenPayload.apiKey?.substring(0, 10)
        );
        return tokenPayload.apiKey;
      } catch (decodeErr) {
        console.error("[Gemini Live SDK] Failed to decode token:", decodeErr);
        throw new Error("Invalid token format");
      }
    } catch (err) {
      console.error("[Gemini Live SDK] Token fetch error:", err);

      // Classify error type
      setErrorType(err instanceof TypeError ? "network" : "server");

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
      // Use zero-copy Int16Array for efficient decoding
      const int16Array = new Int16Array(audioData);
      const numSamples = int16Array.length;

      // Create audio buffer at 24kHz
      const audioBuffer = ctx.createBuffer(1, numSamples, 24000);
      const channelData = audioBuffer.getChannelData(0);

      // Convert PCM16 to Float32 (normalize to -1.0 to 1.0)
      for (let i = 0; i < numSamples; i++) {
        channelData[i] = int16Array[i]! / 32768.0;
      }

      // Calculate when to start this chunk (scheduled playback eliminates gaps)
      const currentTime = ctx.currentTime;
      const startTime = Math.max(currentTime, nextPlayTimeRef.current);

      // Schedule next chunk right after this one
      const duration = audioBuffer.duration;
      nextPlayTimeRef.current = startTime + duration;

      // Play audio at scheduled time
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;

      // Connect to GainNode for proper volume normalization
      if (gainNodeRef.current) {
        source.connect(gainNodeRef.current);
      } else {
        // Fallback to direct connection (should not happen)
        console.warn("[Gemini Live SDK] GainNode not available, connecting directly");
        source.connect(ctx.destination);
      }

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
          updateConversationState("listening"); // Return to listening state after speaking
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
      debugLog("[Gemini Live SDK] Setting up audio input");

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

      // Create AnalyserNode for input (microphone) frequency data
      const inputAnalyser = ctx.createAnalyser();
      inputAnalyser.fftSize = 256; // 128 frequency bins
      inputAnalyser.smoothingTimeConstant = 0.5;
      inputAnalyserRef.current = inputAnalyser;

      // Connect microphone to both analyser and worklet
      const source = ctx.createMediaStreamSource(stream);
      source.connect(inputAnalyser);
      source.connect(workletNode);

      // Handle audio data from worklet
      workletNode.port.onmessage = (event) => {
        // Handle PCM audio data
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
            if (
              sessionRef.current &&
              typeof sessionRef.current.sendRealtimeInput === "function"
            ) {
              sessionRef.current.sendRealtimeInput({
                audio: {
                  data: base64Audio,
                  mimeType: "audio/pcm;rate=16000",
                },
              });
            }
          } catch (err) {
            // Silently ignore errors if WebSocket is closing/closed
            if (
              err instanceof Error &&
              !err.message.includes("CLOSING") &&
              !err.message.includes("CLOSED")
            ) {
              console.error("[Gemini Live SDK] Error sending audio:", err);
            }
          }
        }

        // Handle audio level updates (for visualization)
        if (event.data.type === "level") {
          setAudioLevel(event.data.level);
        }
      };

      debugLog("[Gemini Live SDK] Audio input setup complete");
      return true;
    } catch (err) {
      console.error("[Gemini Live SDK] Audio input setup failed:", err);

      // Classify error type
      const isMicPermission = err instanceof Error &&
        (err.name === "NotAllowedError" || err.name === "PermissionDeniedError");

      setErrorType(isMicPermission ? "microphone" : "network");

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
        debugLog("[Gemini Live SDK] Reusing existing audio output context");
        return true;
      }

      // Create AudioContext for playback at 24kHz (Gemini output)
      const ctx = new AudioContext({ sampleRate: 24000 });
      playbackContextRef.current = ctx;

      // Create GainNode for volume normalization and clipping prevention
      const gainNode = ctx.createGain();
      gainNode.gain.value = 1.0; // Unity gain (no volume change)

      // Create AnalyserNode for output (AI) frequency data
      const outputAnalyser = ctx.createAnalyser();
      outputAnalyser.fftSize = 256; // 128 frequency bins
      outputAnalyser.smoothingTimeConstant = 0.5;
      outputAnalyserRef.current = outputAnalyser;

      // Connect: GainNode -> Analyser -> Destination
      gainNode.connect(outputAnalyser);
      outputAnalyser.connect(ctx.destination);
      gainNodeRef.current = gainNode;

      debugLog("[Gemini Live SDK] Audio output setup complete (with GainNode)");
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
      debugLog("[Gemini Live SDK] Initializing session");

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

      debugLog("[Gemini Live SDK] Connecting to Gemini Live API");

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
            debugLog("[Gemini Live SDK] Connection opened");
            updateConnectionState("connected");
            updateConversationState("listening"); // Start in listening state to show mic level
            // Start recording immediately after connection
            isRecordingRef.current = true;
            // Trigger auto-greeting if callback provided
            onConnected?.();
            resolveConnection(true);
          },
          onmessage: (message: any) => {
            debugLog("[Gemini Live SDK] Message received:", message);

            // Handle audio responses
            if (message.serverContent?.modelTurn?.parts) {
              debugLog(
                "[Gemini Live SDK] Processing modelTurn with",
                message.serverContent.modelTurn.parts.length,
                "parts"
              );
              for (const part of message.serverContent.modelTurn.parts) {
                // Audio data
                if (part.inlineData?.data) {
                  debugLog("[Gemini Live SDK] Received audio data:", {
                    length: part.inlineData.data.length,
                    mimeType: part.inlineData.mimeType,
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
                  debugLog("[Gemini Live SDK] Received text:", part.text);
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
              debugLog("[Gemini Live SDK] Turn complete");
              if (audioQueueRef.current.length === 0) {
                updateConversationState("listening"); // Return to listening after turn complete
              }
            }

            // Handle interruption
            if (message.serverContent?.interrupted) {
              debugLog("[Gemini Live SDK] Interrupted");
              clearAudioQueue();
              updateConversationState("listening"); // Return to listening after interruption
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
            debugLog("[Gemini Live SDK] Connection closed", {
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
      debugLog("[Gemini Live SDK] Waiting for connection to open...");

      // Wait for connection to actually open before proceeding
      const connected = await connectionPromise;
      if (!connected) {
        console.error("[Gemini Live SDK] Connection failed to open");
        return false;
      }

      debugLog("[Gemini Live SDK] Session initialized successfully");
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
    onConnected,
  ]);

  // Auto-retry with exponential backoff
  const attemptRetry = useCallback(async () => {
    const currentAttempt = retryAttempt;

    if (currentAttempt >= MAX_RETRIES) {
      debugLog("[Gemini Live SDK] Max retries reached");
      return;
    }

    const delay = RETRY_DELAYS[currentAttempt] ?? 5000;
    debugLog(
      `[Gemini Live SDK] Retrying in ${delay}ms (attempt ${currentAttempt + 1}/${MAX_RETRIES})`
    );

    setRetryAttempt(currentAttempt + 1);
    onRetrying?.(currentAttempt + 1, delay);

    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    await connectRef.current(true); // Retry connection
  }, [retryAttempt, onRetrying]);

  // ============================================
  // Public Connect Method
  // ============================================

  const connect = useCallback(async (isRetry = false) => {
    if (connectionState === "connected" || connectionState === "connecting") {
      return;
    }

    debugLog(
      "[Gemini Live SDK] Starting connection sequence",
      isRetry ? `(retry ${retryAttempt + 1})` : ""
    );
    setError(null);
    setErrorType(null);
    setUserTranscript("");
    setAiTranscript("");
    setAudioLevel(0);
    clearAudioQueue();

    updateConnectionState("connecting");

    // Step 1: Setup audio output
    const outputSuccess = setupAudioOutput();
    if (!outputSuccess) {
      console.error("[Gemini Live SDK] Audio output setup failed");
      setErrorType("network");
      updateConnectionState("error");
      await attemptRetry();
      return;
    }

    // Step 2: Initialize SDK session FIRST (before audio input)
    const sessionSuccess = await initializeSession();
    if (!sessionSuccess) {
      console.error("[Gemini Live SDK] Session initialization failed");
      // Error type already set in initializeSession or fetchEphemeralToken
      updateConnectionState("error");
      await attemptRetry();
      return;
    }

    // Step 3: Setup audio input AFTER session is connected
    const inputSuccess = await setupAudioInput();
    if (!inputSuccess) {
      console.error("[Gemini Live SDK] Audio input setup failed");
      // Error type already set in setupAudioInput
      updateConnectionState("error");
      // Don't retry on microphone permission errors (user must manually grant)
      if (errorType !== "microphone") {
        await attemptRetry();
      }
    } else {
      // Success - reset retry counter
      setRetryAttempt(0);
      startFrequencyAnalysis();
    }
  }, [
    connectionState,
    retryAttempt,
    errorType,
    clearAudioQueue,
    setupAudioOutput,
    setupAudioInput,
    initializeSession,
    updateConnectionState,
    startFrequencyAnalysis,
    attemptRetry,
  ]);

  connectRef.current = connect;

  // ============================================
  // Public Disconnect Method
  // ============================================

  const disconnect = useCallback(() => {
    debugLog("[Gemini Live SDK] Disconnecting");

    // Stop recording
    isRecordingRef.current = false;

    // Stop frequency analysis
    stopFrequencyAnalysis();

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

    // Reset audio level
    setAudioLevel(0);

    // Reset retry state
    setRetryAttempt(0);
    setError(null);
    setErrorType(null);

    updateConnectionState("disconnected");
    updateConversationState("idle");
  }, [clearAudioQueue, stopFrequencyAnalysis, updateConnectionState, updateConversationState]);

  // ============================================
  // Send Text Prompt (for auto-greeting)
  // ============================================

  const sendTextPrompt = useCallback((text: string) => {
    if (!sessionRef.current) {
      console.warn("[Gemini Live SDK] Cannot send text: session not available");
      return;
    }

    try {
      // Send text input to trigger AI response
      sessionRef.current.sendRealtimeInput({
        text: text,
      });
      debugLog("[Gemini Live SDK] Sent text prompt:", text);
    } catch (err) {
      console.error("[Gemini Live SDK] Error sending text prompt:", err);
    }
  }, []); // No dependencies - only check sessionRef which is stable

  // ============================================
  // Cleanup on Unmount
  // ============================================

  // Cleanup on unmount only - using ref to avoid recreating effect
  useEffect(() => {
    return () => {
      stopFrequencyAnalysis();
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
  }, [stopFrequencyAnalysis]);

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
    sendTextPrompt,
    userTranscript,
    aiTranscript,
    audioLevel,
    frequencyData: frequencyDataRef.current,
    audioSource,
    retryAttempt,
    maxRetries: MAX_RETRIES,
    error,
    errorType,
  };
}
