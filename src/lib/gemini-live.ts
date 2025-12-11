/**
 * Gemini Live API Types & Configuration
 *
 * Type definitions and configuration for Google Gemini Live API
 * Used with @google/genai SDK for voice conversations
 */

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
// Audio Configuration
// ============================================

export const AUDIO_CONFIG = {
  // Input audio settings (microphone → Gemini)
  INPUT: {
    SAMPLE_RATE: 16000, // 16kHz
    CHANNELS: 1, // Mono
    BIT_DEPTH: 16, // 16-bit PCM
    CHUNK_SIZE: 320, // 20ms chunks at 16kHz
    MIME_TYPE: "audio/pcm;rate=16000",
  },

  // Output audio settings (Gemini → speaker)
  OUTPUT: {
    SAMPLE_RATE: 24000, // 24kHz
    CHANNELS: 1, // Mono
    BIT_DEPTH: 16, // 16-bit PCM
  },
} as const;

// ============================================
// Model Configuration
// ============================================

export const GEMINI_LIVE_CONFIG = {
  // Model to use for Live API
  MODEL: "gemini-2.5-flash-native-audio-preview-09-2025",

  // API version (v1alpha required for native audio models)
  API_VERSION: "v1alpha",

  // Voice Activity Detection settings
  VAD: {
    DISABLED: false, // Use automatic VAD
    PREFIX_PADDING_MS: 100, // Capture speech onset
    SILENCE_DURATION_MS: 300, // End-of-speech detection
  },

  // Connection timeout
  CONNECTION_TIMEOUT_MS: 10000,
} as const;

// ============================================
// Event Types (for hook callbacks)
// ============================================

export interface GeminiLiveEvents {
  onConnectionStateChange: (state: GeminiConnectionState) => void;
  onConversationStateChange: (state: GeminiConversationState) => void;
  onTranscript: (text: string, isFinal: boolean, isUser: boolean) => void;
  onAudioChunk: (audioData: ArrayBuffer) => void;
  onError: (error: Error) => void;
}
