# Voice Conversation Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  voice-conversation-mode.tsx (UI Component)                   │  │
│  │  - Brutalist design (borders, shadows, animations)            │  │
│  │  - Recording button, status indicators                        │  │
│  │  - Transcription display                                      │  │
│  └────────────────┬─────────────────────────────────────────────┘  │
│                   │                                                  │
│                   ▼                                                  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  use-gemini-live.ts (Hook)                                    │  │
│  │  - Session management (@google/genai SDK)                     │  │
│  │  - Audio input/output coordination                            │  │
│  │  - State management (recording, speaking, errors)             │  │
│  └───┬──────────────────────────────────────────────────────┬───┘  │
│      │                                                       │      │
│      ▼                                                       ▼      │
│  ┌─────────────────────────────┐     ┌──────────────────────────┐ │
│  │  Audio Input Pipeline       │     │  Audio Output Pipeline   │ │
│  ├─────────────────────────────┤     ├──────────────────────────┤ │
│  │  1. Microphone (getUserMedia)│    │  1. Receive PCM (24kHz)  │ │
│  │  2. AudioContext (16kHz)     │    │  2. Decode base64        │ │
│  │  3. Audio Worklet Processor  │    │  3. Create AudioBuffer   │ │
│  │  4. Float32 → PCM16 convert  │    │  4. Play via Web Audio   │ │
│  │  5. Base64 encode            │    │                          │ │
│  │  6. Send to Gemini SDK       │    │                          │ │
│  └─────────────┬───────────────┘     └──────────────────────────┘ │
│                │                                                    │
│                ▼                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  @google/genai SDK                                            │ │
│  │  - WebSocket connection management                            │ │
│  │  - Protocol handling (BidiGenerateContent)                    │ │
│  │  - Audio streaming (sendRealtimeInput)                        │ │
│  │  - Response handling (onmessage callbacks)                    │ │
│  └────────────────┬─────────────────────────────────────────────┘ │
│                   │                                                 │
└───────────────────┼─────────────────────────────────────────────────┘
                    │
                    │ HTTPS + WebSocket
                    │
┌───────────────────┼─────────────────────────────────────────────────┐
│                   ▼                   Next.js Backend               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  /api/voice/token (Token Generation)                         │  │
│  │  - Uses @google/generative-ai                                │  │
│  │  - Creates ephemeral token (1 use, 30min expiry)             │  │
│  │  - Constraints: model, voice, responseModalities             │  │
│  │  - Returns token string to client                            │  │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Database Logging (PostgreSQL + Drizzle)                     │  │
│  │  - Conversation metadata                                     │  │
│  │  - Transcriptions (user + AI)                                │  │
│  │  - Performance metrics (latency)                             │  │
│  │  - Error logs                                                │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
                    │
                    │ WebSocket (wss://)
                    │
┌───────────────────┼─────────────────────────────────────────────────┐
│                   ▼                 Google Gemini Live API          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Model: gemini-2.5-flash-native-audio-preview-09-2025               │
│  API Version: v1alpha                                                │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Audio Processing Pipeline                                    │  │
│  │  1. Speech-to-Text (STT) - 16kHz PCM → Text                  │  │
│  │  2. Language Model (LLM) - Generate response                 │  │
│  │  3. Text-to-Speech (TTS) - Text → 24kHz PCM audio            │  │
│  │  4. Voice Activity Detection (VAD)                           │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  Features:                                                           │
│  - Proactive audio (model decides when to speak)                    │
│  - Affective dialog (adapts tone to emotion)                        │
│  - 30+ voices in 24+ languages                                      │
│  - Session resumption (for long conversations)                      │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
1. User clicks "Start Voice Conversation"
   ↓
2. Frontend: fetch('/api/voice/token')
   ↓
3. Backend: GoogleGenerativeAI.auth.createEphemeralToken({
     config: {
       uses: 1,
       expireTime: now + 30min,
       liveConnectConstraints: {
         model: "gemini-2.5-flash-native-audio-preview-09-2025",
         config: { responseModalities: ["AUDIO"], speechConfig: {...} }
       }
     }
   })
   ↓
4. Backend: Return { token: "..." }
   ↓
5. Frontend: Initialize SDK
   const ai = new GoogleGenAI({
     apiKey: token,
     httpOptions: { apiVersion: "v1alpha" }
   })
   ↓
6. Frontend: Connect to Live API
   const session = await ai.live.connect({
     model: "gemini-2.5-flash-native-audio-preview-09-2025",
     config: {...},
     callbacks: { onopen, onmessage, onerror, onclose }
   })
   ↓
7. Session established, ready for audio streaming
```

---

## Audio Streaming Flow

### User Speaks → AI Hears

```
1. Microphone captures audio (browser sample rate, e.g., 48kHz)
   ↓
2. AudioContext resamples to 16kHz
   ↓
3. Audio Worklet Processor (pcm-processor.js):
   - Collects 20ms chunks (320 samples at 16kHz)
   - Converts Float32 → Int16 PCM
   - Posts message with PCM buffer
   ↓
4. Hook receives PCM buffer:
   - Base64 encodes the buffer
   - Calls session.sendRealtimeInput({
       audio: { data: base64Audio, mimeType: "audio/pcm;rate=16000" }
     })
   ↓
5. SDK sends audio over WebSocket to Gemini
   ↓
6. Gemini VAD detects end of speech (300ms silence)
   ↓
7. Gemini STT converts audio → text
   ↓
8. Gemini LLM generates response
   ↓
9. Gemini TTS converts response → 24kHz PCM audio
   ↓
10. Audio streamed back to client
```

### AI Responds → User Hears

```
1. SDK receives audio response in onmessage callback
   ↓
2. Extract audio data:
   message.serverContent.modelTurn.parts[{inlineData: {data: base64, mimeType}}]
   ↓
3. Decode base64 → ArrayBuffer (PCM 24kHz)
   ↓
4. Create AudioBuffer:
   const audioBuffer = audioContext.createBuffer(1, samples, 24000)
   audioBuffer.getChannelData(0).set(pcmData)
   ↓
5. Create AudioBufferSourceNode:
   const source = audioContext.createBufferSource()
   source.buffer = audioBuffer
   source.connect(audioContext.destination)
   source.start()
   ↓
6. User hears AI response in real-time
```

---

## State Machine

```
┌─────────────┐
│   IDLE      │ ← Initial state
└──────┬──────┘
       │ User clicks "Start"
       ▼
┌─────────────────┐
│  INITIALIZING   │ ← Fetching token, setting up audio
└──────┬──────────┘
       │ Session connected
       ▼
┌─────────────────┐
│  CONNECTED      │ ← Ready for conversation
└──────┬──────────┘
       │ User clicks mic button
       ▼
┌─────────────────┐
│  RECORDING      │ ← Capturing audio, sending to Gemini
└──────┬──────────┘
       │ VAD detects end of speech
       ▼
┌─────────────────┐
│  PROCESSING     │ ← Waiting for AI response
└──────┬──────────┘
       │ Audio response received
       ▼
┌─────────────────┐
│  SPEAKING       │ ← AI audio playing
└──────┬──────────┘
       │ Audio finishes
       ▼
┌─────────────────┐
│  CONNECTED      │ ← Back to ready state
└──────┬──────────┘
       │ User clicks "Stop" or error occurs
       ▼
┌─────────────────┐
│  DISCONNECTED   │ ← Session ended, cleanup complete
└─────────────────┘
       │ User clicks "Start" again
       ▼
┌─────────────────┐
│  INITIALIZING   │
└─────────────────┘
```

### Error States

Any state can transition to:
- **ERROR** → Display error message, show retry button
- **RECONNECTING** → Temporary state while reconnecting after network interruption

---

## Key Files & Responsibilities

### Frontend

| File | Responsibility |
|------|----------------|
| `src/components/landing/voice-conversation-mode.tsx` | UI component (Brutalist design), user interactions |
| `src/hooks/use-gemini-live.ts` | Session management, audio coordination, state machine |
| `public/pcm-processor.js` | Audio Worklet for low-latency PCM conversion |

### Backend

| File | Responsibility |
|------|----------------|
| `src/app/api/voice/token/route.ts` | Ephemeral token generation |
| `src/lib/db.ts` | Database connection |
| `src/lib/schema.ts` | Conversation logging schema |

### Configuration

| File | Responsibility |
|------|----------------|
| `src/content/es.ts` | Spanish content (voice UI labels) |
| `src/content/en.ts` | English content (voice UI labels) |
| `.env.local` | `GEMINI_API_KEY` environment variable |

---

## Data Flow: One Complete Turn

```
User speaks "¿Qué servicios ofrecen?" (in Spanish)
  ↓
Microphone → AudioContext (16kHz) → Audio Worklet
  ↓
Worklet: Float32 → PCM16 → base64
  ↓
Hook: sendRealtimeInput({ audio: { data: base64, mimeType: "audio/pcm;rate=16000" }})
  ↓
SDK → WebSocket → Gemini Live API
  ↓
Gemini VAD: Detects 300ms silence, end of speech
  ↓
Gemini STT: "¿Qué servicios ofrecen?" (transcription)
  ↓
Gemini LLM: Generates response based on system prompt + conversation history
  ↓
Gemini TTS: Converts response to Spanish audio (Kore voice, 24kHz PCM)
  ↓
WebSocket → SDK → onmessage callback
  ↓
Hook: Decode base64 → PCM → AudioBuffer (24kHz)
  ↓
Web Audio API: Play audio
  ↓
User hears: "Ofrecemos consultoría en IA, automatización, integración de APIs..."
  ↓
Database: Log turn (user transcription, AI transcription, audio URL, latency)
```

---

## Performance Targets

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Token fetch latency | <200ms | `console.time('token-fetch')` |
| Connection establishment | <500ms | Time from `connect()` to `onopen` |
| Audio chunk latency | <50ms | Time from microphone → `sendRealtimeInput()` |
| VAD trigger time | 300ms | Configured in `silenceDurationMs` |
| STT latency | <300ms | Time from VAD trigger → transcription received |
| LLM latency | <500ms | Time from transcription → response text |
| TTS latency (first byte) | <700ms | Time from response text → first audio chunk |
| Audio playback latency | <100ms | Time from audio received → speaker output |
| **Total round-trip** | **<1000ms** | User stops speaking → AI starts speaking |

---

## Security Considerations

1. **Ephemeral Tokens**:
   - Never expose `GEMINI_API_KEY` to client
   - Tokens are single-use, 30-min expiry
   - Constrained to specific model and config

2. **Audio Privacy**:
   - Audio never stored on server (unless user explicitly saves)
   - Transcriptions logged to database (encrypted at rest)
   - User can delete conversation history

3. **Rate Limiting**:
   - Gemini Free Tier: 60 requests/min
   - Implement client-side rate limiting if needed

4. **Input Validation**:
   - Validate audio MIME type and sample rate
   - Limit audio chunk size to prevent abuse

---

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 90+ | ✅ Full | Primary target, Audio Worklet support |
| Firefox 88+ | ✅ Full | Requires same sample rate for recording + playback |
| Safari 14.1+ | ⚠️ Partial | Audio Worklet support varies, test thoroughly |
| Edge 90+ | ✅ Full | Chromium-based, same as Chrome |

---

## Configuration Options

### Voice Selection (by locale)

```typescript
const VOICE_CONFIG = {
  es: { voiceName: "Kore" },  // Spanish
  en: { voiceName: "Kore" }   // English (or alternative)
};
```

### VAD Tuning

```typescript
const VAD_CONFIG = {
  automaticActivityDetection: {
    disabled: false,           // Let Gemini handle VAD
    prefixPaddingMs: 100,      // Capture speech onset
    silenceDurationMs: 300     // Adjust for responsiveness
  }
};

// Increase silenceDurationMs for:
// - Users who pause mid-sentence
// - Noisy environments

// Decrease silenceDurationMs for:
// - Faster, more responsive conversation
// - Users who speak in short bursts
```

### Session Resumption

```typescript
const SESSION_CONFIG = {
  sessionResumption: {}  // Enable resumption
};

// Listen for sessionResumptionUpdate in onmessage
// Store handle in localStorage
// Reconnect with: sessionResumption: { handle: storedHandle }
```

---

## Monitoring & Debugging

### Console Logs (Development)

```typescript
console.log('🎤 Recording started');
console.log('🔊 Sending audio chunk', { size: pcmData.byteLength });
console.log('🤖 AI response received', { transcription, audioLength });
console.log('⏱️ Latency:', { stt: 250, llm: 450, tts: 600, total: 1300 });
console.error('❌ Error:', error.message);
```

### Database Metrics

Log to `conversations` table:
- Start time, end time, duration
- Turn count
- Average latency per turn
- Error count
- Voice used
- Locale

### Browser DevTools

- **Performance tab**: Profile audio processing, identify bottlenecks
- **Network tab**: Check WebSocket messages, verify chunk sizes
- **Memory tab**: Detect leaks (AudioContext, AudioBufferSource not cleaned up)

---

## Rollback Strategy

If SDK approach has critical issues:

1. **Do NOT revert to raw WebSockets** (known to fail)
2. Debug SDK issues:
   - Check SDK version (`pnpm list @google/genai`)
   - Review SDK GitHub issues
   - Test with minimal example from official docs
3. Contact Google support with:
   - SDK version
   - Error messages
   - Minimal reproduction code
4. Temporary workaround: Disable voice, use text-only chat
