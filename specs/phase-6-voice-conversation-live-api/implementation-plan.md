# Phase 6: Implementation Plan - Gemini Live API Voice Conversation

## Phase Overview

| Phase | Description | Key Deliverables |
|-------|-------------|------------------|
| 6A | Backend Infrastructure | Ephemeral token API, WebSocket proxy |
| 6B | Gemini Live Client | WebSocket manager, audio handling |
| 6C | Voice Mode UI Redesign | New overlay with form, animations |
| 6D | Integration & Polish | Connect all pieces, optimize latency |

---

## Phase 6A: Backend Infrastructure

### Objective
Create secure backend endpoints for Gemini Live API authentication.

### Tasks

- [ ] **6A-1: Create ephemeral token endpoint**
  - File: `src/app/api/voice/token/route.ts`
  - Generate short-lived tokens for client-side Gemini Live connection
  - Token expiry: 60 seconds
  - Rate limiting to prevent abuse

- [ ] **6A-2: Add Gemini Live API configuration**
  - File: `src/lib/gemini-live.ts`
  - WebSocket endpoint URL
  - Audio format constants (16kHz input, 24kHz output)
  - VAD configuration defaults
  - System prompt builder for voice (concise responses)

- [ ] **6A-3: Update environment variables**
  - File: `.env.example`
  - Add `GEMINI_API_KEY` validation for Live API access
  - Document required API permissions

### Deliverables
- `/api/voice/token` endpoint returning ephemeral tokens
- Gemini Live configuration module
- Updated environment documentation

---

## Phase 6B: Gemini Live WebSocket Client

### Objective
Build the client-side WebSocket manager for real-time audio streaming.

### Tasks

- [ ] **6B-1: Create Gemini Live WebSocket hook**
  - File: `src/hooks/use-gemini-live.ts`
  - WebSocket connection lifecycle management
  - Session setup with system instructions
  - VAD configuration (automatic turn detection)
  - Connection state tracking (connecting, connected, error)

- [ ] **6B-2: Implement audio input handler**
  - File: `src/hooks/use-gemini-live.ts` (continued)
  - MediaRecorder for microphone capture
  - Audio format conversion to 16-bit PCM, 16kHz
  - Streaming audio to WebSocket in chunks
  - Handle microphone permissions

- [ ] **6B-3: Implement streaming audio output handler**
  - File: `src/hooks/use-gemini-live.ts` (continued)
  - AudioContext for playback (24kHz sample rate)
  - **Stream-first playback** - start playing as soon as first chunk arrives
  - Queue/buffer subsequent chunks for seamless playback
  - No waiting for full response - play while receiving
  - Handle chunk timing to avoid gaps or overlaps

- [ ] **6B-4: Handle conversation events**
  - File: `src/hooks/use-gemini-live.ts` (continued)
  - User speech start/end detection (from VAD)
  - AI response start/end events
  - Transcription events (for display)
  - Interruption handling

- [ ] **6B-5: Implement session management**
  - Token refresh before expiry
  - Reconnection on disconnect
  - Graceful session termination
  - Error recovery

### Deliverables
- `useGeminiLive` hook with full audio I/O
- Connection state management
- Event-driven conversation flow

---

## Phase 6C: Voice Mode UI Updates

### Objective
Add lead capture form to existing voice overlay (keep current design).

### Tasks

- [ ] **6C-1: Keep existing overlay layout**
  - File: `src/components/landing/voice-conversation-mode.tsx`
  - Retain current full-screen dark overlay design
  - Keep existing z-index fix and structure
  - Add lead capture form to bottom area
  - Keep all existing animations

- [ ] **6C-2: Update connection states for Gemini Live**
  - Connecting: Use existing spinner animation
  - Ready/Idle: Keep pulsing mic icon
  - Listening: Keep yellow animated rings (user speaking)
  - AI Speaking: Keep purple animated rings with soundwaves
  - Add: Connection error state with retry

- [ ] **6C-3: Add inline lead capture form**
  - Name, email, and phone fields
  - Phone field with international format support
  - Compact brutalist styling (fields stacked on mobile, side-by-side on desktop)
  - Submit button
  - Success state (checkmark)
  - Does not close overlay on submit
  - Form validation before submission

- [ ] **6C-4: Add live transcription display**
  - Show user's speech as text (real-time)
  - Show AI response text
  - Scrolling transcript area (optional, can be minimal)

- [ ] **6C-5: Update animations for states**
  - Reuse existing CSS keyframes from globals.css
  - Listening: `animate-voice-pulse`, `animate-soundwave`
  - Speaking: `animate-voice-pulse-fast`, `animate-soundwave-tall`
  - Connecting: `animate-spin-slow`

### Deliverables
- Redesigned voice overlay component
- Inline lead capture form
- State-based visual feedback

---

## Phase 6D: Integration & Polish

### Objective
Connect all components and optimize for production.

### Tasks

- [ ] **6D-1: Integrate Gemini Live hook with UI**
  - File: `src/components/landing/voice-conversation-mode.tsx`
  - Replace current `useVoiceRecording` + API calls with `useGeminiLive`
  - Wire up state changes to UI animations
  - Handle all connection states

- [ ] **6D-2: Connect lead capture to existing API**
  - Use existing `/api/leads` endpoint
  - Add phone field to lead capture
  - Link lead to conversation ID
  - Update chat widget state when lead captured

- [ ] **6D-2.1: Implement voice conversation logging**
  - Save voice transcript to existing conversations table
  - Mark conversation as `source: 'voice'` to distinguish from text chat
  - Log each turn with timestamps
  - Store session duration and turn count
  - Link to lead record when captured

- [ ] **6D-3: Add voice-optimized system prompt**
  - File: `src/lib/chat/system-prompt.ts`
  - Add `buildVoiceSystemPrompt()` function
  - Shorter responses for voice
  - More conversational language
  - Same lead capture strategy

- [ ] **6D-4: Implement bilingual voice support**
  - Pass locale to Gemini Live session
  - Voice output matches user language
  - All UI labels from content files

- [ ] **6D-5: Add error handling & fallbacks**
  - Microphone permission denied
  - WebSocket connection failure
  - Token refresh failure
  - Browser not supported
  - Show helpful error messages

- [ ] **6D-6: Performance optimization**
  - Minimize audio buffering delay
  - Optimize chunk sizes for streaming
  - Reduce re-renders during conversation
  - Test on slower connections

- [ ] **6D-7: Clean up old voice code**
  - Remove `src/hooks/use-voice-recording.ts` (if no longer needed)
  - Remove `src/hooks/use-audio-player.ts` (if no longer needed)
  - Remove `/api/voice/transcribe` endpoint
  - Remove Groq SDK dependency (if only used for transcription)

### Deliverables
- Fully integrated real-time voice conversation
- Lead capture working in voice mode
- Bilingual support
- Production-ready error handling

---

## File Structure (New/Modified)

```
src/
├── app/api/voice/
│   ├── token/route.ts          # NEW: Ephemeral token endpoint
│   └── transcribe/route.ts     # DELETE: No longer needed
├── components/landing/
│   └── voice-conversation-mode.tsx  # MODIFY: Redesign with Gemini Live
├── hooks/
│   ├── use-gemini-live.ts      # NEW: Gemini Live WebSocket hook
│   ├── use-voice-recording.ts  # DELETE: Replaced by Gemini Live
│   └── use-audio-player.ts     # DELETE: Replaced by Gemini Live
├── lib/
│   ├── gemini-live.ts          # NEW: Configuration & helpers
│   └── chat/
│       └── system-prompt.ts    # MODIFY: Add voice-optimized prompt
```

---

## Technical Notes

### WebSocket Message Flow

```
1. Client → Server: setup (model, config, system_instruction)
2. Server → Client: setupComplete
3. Client → Server: realtimeInput (audio chunks)
4. Server → Client: serverContent (audio response chunks)
5. Server → Client: turnComplete (AI finished speaking)
```

### Audio Processing

```javascript
// Input: Convert browser audio to 16-bit PCM, 16kHz
const audioContext = new AudioContext({ sampleRate: 16000 });
// Use AudioWorklet for efficient processing

// Output: Play 24kHz PCM audio
const playbackContext = new AudioContext({ sampleRate: 24000 });
// Buffer and queue audio chunks for smooth playback
```

### VAD Configuration

```javascript
{
  "realtimeInputConfig": {
    "automaticActivityDetection": {
      "disabled": false,
      "startOfSpeechSensitivity": "HIGH",    // Detect speech quickly
      "endOfSpeechSensitivity": "MEDIUM",    // Wait for natural pause
      "silenceDurationMs": 500               // 500ms silence = turn complete
    }
  }
}
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Gemini Live API not available in region | Fallback to current implementation |
| High API costs | Monitor usage, implement rate limiting |
| Browser audio API differences | Test on all major browsers, use polyfills |
| Poor network conditions | Show connection quality indicator, graceful degradation |

---

## Success Criteria

- [ ] Voice response latency < 1 second
- [ ] Automatic turn-taking works naturally
- [ ] Lead capture form works in voice mode
- [ ] Bilingual (ES/EN) working
- [ ] No crashes or audio glitches
- [ ] Clean code with no linting errors
