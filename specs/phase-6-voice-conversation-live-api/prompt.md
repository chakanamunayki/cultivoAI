# Phase 6: Gemini Live API Voice Conversation - Implementation Prompt

## Context

You are implementing Phase 6 of CultivoAI - upgrading the voice conversation feature to use **Gemini Live API** for real-time speech-to-speech conversations.

**Current Problem:** The existing voice implementation has ~30 second latency (Voice → Groq STT → Gemini Chat → TTS → Voice).

**Solution:** Use Gemini Live API WebSocket for direct speech-to-speech with ~600ms first-token latency.

## Documentation

Before starting, read these spec files in order:

1. **Requirements:** `specs/phase-6-voice-conversation-live-api/requirements.md`
2. **Implementation Plan:** `specs/phase-6-voice-conversation-live-api/implementation-plan.md`

## Key Technical Details

### Gemini Live API
- **WebSocket Endpoint:** `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent`
- **Audio Input:** 16-bit PCM, 16kHz, mono
- **Audio Output:** 24kHz, mono (streams in chunks - play immediately, don't wait)
- **VAD:** Built-in Voice Activity Detection for automatic turn-taking
- **Authentication:** Use ephemeral tokens (not direct API keys in browser)

### Existing Code to Preserve
- Keep the current voice overlay UI design (`src/components/landing/voice-conversation-mode.tsx`)
- Keep all CSS animations in `src/app/globals.css`
- Keep the z-index fix (VoiceConversationMode outside chat container)

### Existing Code to Replace
- `src/hooks/use-voice-recording.ts` → Replace with `useGeminiLive` hook
- `src/hooks/use-audio-player.ts` → Replace with streaming audio in `useGeminiLive`
- `/api/voice/transcribe` → No longer needed (Gemini handles audio directly)

## Implementation Phases

Use the TodoWrite tool to track progress through these phases:

### Phase 6A: Backend Infrastructure
```
[ ] 6A-1: Create ephemeral token endpoint (/api/voice/token)
[ ] 6A-2: Add Gemini Live configuration (src/lib/gemini-live.ts)
[ ] 6A-3: Update environment variables
```

### Phase 6B: Gemini Live WebSocket Client
```
[ ] 6B-1: Create useGeminiLive hook with WebSocket connection
[ ] 6B-2: Implement audio input handler (mic → 16kHz PCM → WebSocket)
[ ] 6B-3: Implement streaming audio output (WebSocket → queue → play immediately)
[ ] 6B-4: Handle conversation events (VAD, speech start/end, interruption)
[ ] 6B-5: Implement session management (token refresh, reconnection)
```

### Phase 6C: Voice Mode UI Updates
```
[ ] 6C-1: Keep existing overlay layout, add lead capture form area
[ ] 6C-2: Update connection states for Gemini Live
[ ] 6C-3: Add inline lead capture form (name, email, phone)
[ ] 6C-4: Add live transcription display
[ ] 6C-5: Update animations for states (reuse existing CSS)
```

### Phase 6D: Integration & Polish
```
[ ] 6D-1: Integrate useGeminiLive hook with UI
[ ] 6D-2: Connect lead capture to existing /api/leads endpoint (add phone field)
[ ] 6D-2.1: Implement voice conversation logging (source: 'voice')
[ ] 6D-3: Add voice-optimized system prompt (shorter responses)
[ ] 6D-4: Implement bilingual voice support
[ ] 6D-5: Add error handling & fallbacks
[ ] 6D-6: Performance optimization
[ ] 6D-7: Clean up old voice code
```

## Instructions for Implementation

1. **Start each session** by reading the requirements.md and implementation-plan.md
2. **Use TodoWrite** to create the task list and update it as you complete tasks
3. **Work phase by phase** - complete 6A before starting 6B
4. **Run lint and typecheck** after each file change: `pnpm lint && pnpm typecheck`
5. **Keep the existing UI design** - only add the form fields and update the backend
6. **Test on port 3001** if 3000 is in use (check for stale servers)

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/components/landing/voice-conversation-mode.tsx` | Voice overlay UI (modify) |
| `src/components/landing/ai-chat-widget.tsx` | Chat widget with voice button |
| `src/hooks/use-gemini-live.ts` | NEW: Gemini Live WebSocket hook |
| `src/lib/gemini-live.ts` | NEW: Configuration & helpers |
| `src/app/api/voice/token/route.ts` | NEW: Ephemeral token endpoint |
| `src/lib/chat/system-prompt.ts` | Add voice-optimized prompt |
| `src/lib/schema.ts` | Database schema (add phone field if needed) |

## Success Criteria

- [ ] Voice response latency < 1 second (first audio chunk)
- [ ] Automatic turn-taking works (no button holding)
- [ ] User can interrupt AI while speaking
- [ ] Lead capture form works (name, email, phone)
- [ ] Conversations saved to database with source: 'voice'
- [ ] Bilingual support (ES/EN)
- [ ] No lint or type errors
- [ ] Streaming audio playback (no waiting for full response)

## Start Command

Begin by reading the spec files, then create the todo list:

```
Read: specs/phase-6-voice-conversation-live-api/requirements.md
Read: specs/phase-6-voice-conversation-live-api/implementation-plan.md
Then use TodoWrite to create Phase 6A tasks and mark the first one as in_progress
```
