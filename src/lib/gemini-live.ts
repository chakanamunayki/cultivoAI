/**
 * Gemini Live API Configuration & Helpers
 *
 * Real-time speech-to-speech WebSocket configuration for CultivoAI
 * Documentation: https://ai.google.dev/api/multimodal-live
 */

import type { Locale } from "@/content/types";

// ============================================
// WebSocket Configuration
// ============================================

export const GEMINI_LIVE_CONFIG = {
  // WebSocket endpoint for Gemini Live API (v1beta for stable API)
  // Note: Updated from v1alpha to v1beta per 2025 documentation
  WEBSOCKET_URL:
    "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent",

  // Model to use for Live API
  // Using gemini-2.0-flash-exp which is confirmed working with Live API
  // The model name MUST include "models/" prefix for the API to recognize it
  MODEL: "models/gemini-2.0-flash-exp",

  // Token refresh interval (refresh 10 seconds before expiry)
  TOKEN_REFRESH_BUFFER_MS: 10000,

  // Connection timeout
  CONNECTION_TIMEOUT_MS: 10000,

  // Reconnection settings
  MAX_RECONNECT_ATTEMPTS: 3,
  RECONNECT_DELAY_MS: 1000,
} as const;

// ============================================
// Audio Configuration
// ============================================

export const AUDIO_CONFIG = {
  // Input audio settings (microphone → Gemini)
  INPUT: {
    SAMPLE_RATE: 16000, // 16kHz
    CHANNELS: 1, // Mono
    BIT_DEPTH: 16, // 16-bit PCM
    CHUNK_SIZE: 4096, // Bytes per chunk sent to WebSocket
    MIME_TYPE: "audio/pcm",
  },

  // Output audio settings (Gemini → speaker)
  OUTPUT: {
    SAMPLE_RATE: 24000, // 24kHz
    CHANNELS: 1, // Mono
    BIT_DEPTH: 16, // 16-bit PCM
  },

  // AudioWorklet processor name
  WORKLET_NAME: "pcm-processor",
} as const;

// ============================================
// Voice Activity Detection (VAD) Configuration
// ============================================

export const REALTIME_INPUT_CONFIG = {
  // Automatic activity detection settings
  automaticActivityDetection: {
    disabled: false,
    // How sensitive the start-of-speech detection is
    // LOW = less sensitive, HIGH = more sensitive (may have more false positives)
    startOfSpeechSensitivity: "START_SENSITIVITY_LOW",
    // How sensitive the end-of-speech detection is
    // HIGH = quick end detection when user stops talking
    endOfSpeechSensitivity: "END_SENSITIVITY_HIGH",
    // Prefix padding duration in milliseconds (audio before speech starts)
    prefixPaddingMs: 20,
    // Silence duration to consider turn complete (ms) - shorter = faster response
    silenceDurationMs: 300,
  },
  // Activity handling - interrupts AI when user starts speaking
  activityHandling: "START_OF_ACTIVITY_INTERRUPTS",
  // Only include audio activity in turn (not silence)
  turnCoverage: "TURN_INCLUDES_ONLY_ACTIVITY",
} as const;

// ============================================
// Voice Configuration for Languages
// ============================================

export const VOICE_CONFIG: Record<
  Locale,
  {
    voiceName: string;
    languageCode: string;
    speakingRate: number;
  }
> = {
  es: {
    voiceName: "Puck", // Natural voice for Spanish
    languageCode: "es",
    speakingRate: 1.0,
  },
  en: {
    voiceName: "Puck", // Natural voice for English
    languageCode: "en",
    speakingRate: 1.0,
  },
};

// ============================================
// Types for Gemini Live API Messages
// ============================================

// Client → Server message types
export interface GeminiSetupMessage {
  model: string;
  generationConfig?: {
    responseModalities?: string[]; // ["AUDIO"] for voice output
    speechConfig?: {
      voiceConfig?: {
        prebuiltVoiceConfig?: {
          voiceName: string;
        };
      };
    };
  };
  systemInstruction?: {
    parts: Array<{ text: string }>;
  };
  realtimeInputConfig?: {
    automaticActivityDetection?: {
      disabled?: boolean;
      startOfSpeechSensitivity?: string;
      endOfSpeechSensitivity?: string;
      prefixPaddingMs?: number;
      silenceDurationMs?: number;
    };
    activityHandling?: string;
    turnCoverage?: string;
  };
}

export interface GeminiRealtimeInputMessage {
  realtimeInput: {
    mediaChunks: Array<{
      mimeType: string;
      data: string; // Base64 encoded PCM audio
    }>;
  };
}

export interface GeminiClientContentMessage {
  clientContent: {
    turns: Array<{
      role: "user" | "model";
      parts: Array<{ text: string }>;
    }>;
    turnComplete: boolean;
  };
}

// Server → Client message types
export interface GeminiSetupCompleteMessage {
  setupComplete: Record<string, unknown>;
}

export interface GeminiServerContentMessage {
  serverContent: {
    modelTurn?: {
      parts: Array<{
        text?: string;
        inlineData?: {
          mimeType: string;
          data: string; // Base64 encoded audio
        };
      }>;
    };
    turnComplete?: boolean;
    interrupted?: boolean;
  };
}

export interface GeminiToolCallMessage {
  toolCall: {
    functionCalls: Array<{
      id: string;
      name: string;
      args: Record<string, unknown>;
    }>;
  };
}

export interface GeminiToolCallCancellationMessage {
  toolCallCancellation: {
    ids: string[];
  };
}

// Union type for all server messages
export type GeminiServerMessage =
  | GeminiSetupCompleteMessage
  | GeminiServerContentMessage
  | GeminiToolCallMessage
  | GeminiToolCallCancellationMessage;

// ============================================
// Connection States
// ============================================

export type GeminiConnectionState =
  | "disconnected"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "error";

export type GeminiConversationState =
  | "idle" // Ready, waiting for user
  | "listening" // User is speaking
  | "processing" // Processing user input
  | "speaking" // AI is responding
  | "interrupted"; // AI was interrupted

// ============================================
// Event Types
// ============================================

export interface GeminiLiveEvents {
  onConnectionStateChange: (state: GeminiConnectionState) => void;
  onConversationStateChange: (state: GeminiConversationState) => void;
  onUserSpeechStart: () => void;
  onUserSpeechEnd: () => void;
  onAISpeechStart: () => void;
  onAISpeechEnd: () => void;
  onTranscript: (text: string, isFinal: boolean, isUser: boolean) => void;
  onAudioChunk: (audioData: ArrayBuffer) => void;
  onError: (error: Error) => void;
  onInterrupted: () => void;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Decode ephemeral token to get API key
 */
export function decodeToken(token: string): {
  apiKey: string;
  expiresAt: number;
  locale: Locale;
} | null {
  try {
    const decoded = atob(token);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Check if token is expired or about to expire
 */
export function isTokenExpired(
  expiresAt: number,
  bufferMs: number = GEMINI_LIVE_CONFIG.TOKEN_REFRESH_BUFFER_MS
): boolean {
  return Date.now() + bufferMs >= expiresAt;
}

/**
 * Build WebSocket URL with API key
 */
export function buildWebSocketUrl(apiKey: string): string {
  const url = new URL(GEMINI_LIVE_CONFIG.WEBSOCKET_URL);
  url.searchParams.set("key", apiKey);
  return url.toString();
}

/**
 * Build setup message for Gemini Live session
 */
export function buildSetupMessage(
  systemPrompt: string,
  locale: Locale
): GeminiSetupMessage {
  const voiceConfig = VOICE_CONFIG[locale];

  return {
    model: GEMINI_LIVE_CONFIG.MODEL,
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: voiceConfig.voiceName,
          },
        },
      },
    },
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    realtimeInputConfig: {
      automaticActivityDetection: {
        disabled: REALTIME_INPUT_CONFIG.automaticActivityDetection.disabled,
        startOfSpeechSensitivity: REALTIME_INPUT_CONFIG.automaticActivityDetection.startOfSpeechSensitivity,
        endOfSpeechSensitivity: REALTIME_INPUT_CONFIG.automaticActivityDetection.endOfSpeechSensitivity,
        prefixPaddingMs: REALTIME_INPUT_CONFIG.automaticActivityDetection.prefixPaddingMs,
        silenceDurationMs: REALTIME_INPUT_CONFIG.automaticActivityDetection.silenceDurationMs,
      },
      activityHandling: REALTIME_INPUT_CONFIG.activityHandling,
      turnCoverage: REALTIME_INPUT_CONFIG.turnCoverage,
    },
  };
}

/**
 * Build realtime input message with audio chunk
 */
export function buildRealtimeInputMessage(
  audioBase64: string
): GeminiRealtimeInputMessage {
  return {
    realtimeInput: {
      mediaChunks: [
        {
          // Include sample rate in mimeType as per API spec
          mimeType: `audio/pcm;rate=${AUDIO_CONFIG.INPUT.SAMPLE_RATE}`,
          data: audioBase64,
        },
      ],
    },
  };
}

/**
 * Convert Float32Array audio to 16-bit PCM
 */
export function float32ToPCM16(float32Array: Float32Array): ArrayBuffer {
  const pcm16 = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    // Clamp to [-1, 1] and convert to 16-bit
    const sample = float32Array[i];
    const clamped =
      sample !== undefined
        ? Math.max(-1, Math.min(1, sample))
        : 0;
    pcm16[i] = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
  }
  return pcm16.buffer;
}

/**
 * Convert 16-bit PCM to Float32Array
 */
export function pcm16ToFloat32(pcm16Buffer: ArrayBuffer): Float32Array {
  const pcm16 = new Int16Array(pcm16Buffer);
  const float32 = new Float32Array(pcm16.length);
  for (let i = 0; i < pcm16.length; i++) {
    const sample = pcm16[i];
    float32[i] = sample !== undefined ? sample / (sample < 0 ? 0x8000 : 0x7fff) : 0;
  }
  return float32;
}

/**
 * Convert ArrayBuffer to Base64 string
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
}

/**
 * Convert Base64 string to ArrayBuffer
 */
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Check if message is setup complete
 */
export function isSetupComplete(
  message: GeminiServerMessage
): message is GeminiSetupCompleteMessage {
  return "setupComplete" in message;
}

/**
 * Check if message is server content
 */
export function isServerContent(
  message: GeminiServerMessage
): message is GeminiServerContentMessage {
  return "serverContent" in message;
}

/**
 * Check if message is tool call
 */
export function isToolCall(
  message: GeminiServerMessage
): message is GeminiToolCallMessage {
  return "toolCall" in message;
}

/**
 * Check if message is tool call cancellation
 */
export function isToolCallCancellation(
  message: GeminiServerMessage
): message is GeminiToolCallCancellationMessage {
  return "toolCallCancellation" in message;
}

/**
 * Parse server message to extract audio and text
 */
export function parseServerContent(message: GeminiServerContentMessage): {
  audioChunks: ArrayBuffer[];
  textChunks: string[];
  turnComplete: boolean;
  interrupted: boolean;
} {
  const result = {
    audioChunks: [] as ArrayBuffer[],
    textChunks: [] as string[],
    turnComplete: message.serverContent.turnComplete ?? false,
    interrupted: message.serverContent.interrupted ?? false,
  };

  if (message.serverContent.modelTurn?.parts) {
    for (const part of message.serverContent.modelTurn.parts) {
      if (part.inlineData?.data) {
        result.audioChunks.push(base64ToArrayBuffer(part.inlineData.data));
      }
      if (part.text) {
        result.textChunks.push(part.text);
      }
    }
  }

  return result;
}
