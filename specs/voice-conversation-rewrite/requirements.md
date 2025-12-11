# Voice Conversation Feature - Requirements

## Problem Statement

The current voice conversation implementation uses raw WebSockets and fails immediately with connection code 1000. This is the WRONG approach. We need to completely rewrite it using the official `@google/genai` SDK which handles WebSocket connection management, protocol details, and audio streaming correctly.

## Context

- **Failed Implementation**: Raw WebSocket approach in `src/hooks/use-gemini-live.ts` and `src/lib/gemini-live.ts`
- **Correct Approach**: Documented in `docs/technical/ai/gemini-voice.md` using `@google/genai` SDK
- **Package Already Installed**: `@google/genai` is available in the project
- **Working Infrastructure**: Token generation endpoint, UI components, database logging all exist

## Core Requirements

### 1. SDK-Based Implementation

- **MUST USE**: `@google/genai` SDK with `ai.live.connect()` method
- **NO RAW WEBSOCKETS**: Let the SDK handle connection management
- **API Version**: Use `v1alpha` for native audio models
- **Model**: `gemini-2.5-flash-native-audio-preview-09-2025`

### 2. Authentication

- Use ephemeral tokens from existing `/api/voice/token` endpoint
- Token flow:
  1. Frontend requests token from backend
  2. Backend creates ephemeral token with `@google/generative-ai`
  3. Frontend uses token to initialize `GoogleGenAI` client
  4. Client connects to Gemini Live API

### 3. Audio Processing

#### Input (Microphone → Gemini)
- **Format**: 16-bit PCM audio at 16kHz
- **MIME Type**: `audio/pcm;rate=16000`
- **Chunk Size**: 20-40ms chunks (320 samples at 16kHz = 20ms)
- **Encoding**: Base64 encode PCM data before sending
- **Method**: Use Audio Worklets for low-latency processing

#### Output (Gemini → Speaker)
- **Format**: PCM audio at 24kHz
- **Playback**: Browser's Web Audio API
- **Streaming**: Real-time playback as audio chunks arrive

### 4. Voice Activity Detection (VAD)

- **Automatic Detection**: Let Gemini handle VAD (`automaticActivityDetection.disabled: false`)
- **Prefix Padding**: 100ms to capture speech onset
- **Silence Duration**: 300ms of silence = end of speech
- **Tunable**: Allow adjustment for responsiveness vs accuracy

### 5. Bilingual Support

- **Spanish Voice**: `Kore` (default for Spanish locale)
- **English Voice**: `Kore` (or configurable alternative)
- **Dynamic Switching**: Voice selection based on user's locale preference

### 6. Session Management

- **Initial Connection**: Use ephemeral token to establish session
- **Resumption**: Enable session resumption for long conversations (>10 min)
- **Reconnection**: Handle `goAway` messages and reconnect seamlessly
- **Handle Storage**: Store session handles in localStorage for reconnection

### 7. UI Integration

- **Existing Component**: `src/components/landing/voice-conversation-mode.tsx`
- **Design System**: Maintain Brutalist UI styling (black borders, hard shadows, yellow/purple accents)
- **States**:
  - Idle (not recording)
  - Recording (capturing audio)
  - Processing (waiting for AI response)
  - Speaking (AI is responding)
  - Error (connection/audio issues)

### 8. Performance & Latency

- **Target Latency**: <1000ms end-to-end (user stops speaking → AI starts speaking)
- **Streaming**: Use `sendRealtimeInput` for low latency
- **Chunking**: Small audio chunks (20-40ms), not large buffers
- **Monitoring**: Log latency for STT, LLM, and TTS separately

### 9. Error Handling

- **Connection Errors**: Graceful retry with exponential backoff
- **Audio Errors**: Fallback to text input if microphone fails
- **Token Expiry**: Detect and refresh ephemeral tokens
- **Browser Compatibility**: Handle Firefox audio context quirks

### 10. Data Persistence

- **Conversation Logging**: Continue using existing database schema
- **Metrics Tracking**: Log latency, errors, session duration
- **Transcriptions**: Store both user input and AI output transcriptions

## Non-Requirements (Already Working)

- Token generation endpoint (`/api/voice/token`)
- Database schema and conversation logging
- System prompt generation
- UI component structure and styling
- Better Auth integration
- Internationalization (i18n) system

## Success Criteria

1. ✅ Voice conversation establishes and maintains connection
2. ✅ User can speak and receive audio responses in <1s latency
3. ✅ VAD correctly detects end of speech (no cut-offs or long pauses)
4. ✅ Spanish and English voices work correctly based on locale
5. ✅ Sessions can resume after disconnections
6. ✅ No hydration errors or React warnings
7. ✅ Works on Chrome, Firefox, and Safari
8. ✅ Brutalist UI design preserved exactly
9. ✅ Conversation data logged to database
10. ✅ Passes TypeScript type checking and ESLint

## Technical Constraints

- **Next.js 16** with App Router
- **React 19** with Server Components and Client Components
- **TypeScript** - strict mode enabled
- **No shadcn theming** - preserve Brutalist design
- **pnpm** package manager
- **No server restarts** during development (use Fast Refresh)

## References

- Primary Documentation: `docs/technical/ai/gemini-voice.md`
- SDK Package: `@google/genai`
- API Docs: https://ai.google.dev/gemini-api/docs/live-guide
- Ephemeral Tokens: https://ai.google.dev/gemini-api/docs/ephemeral-tokens
