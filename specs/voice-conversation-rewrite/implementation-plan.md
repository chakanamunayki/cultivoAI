# Voice Conversation Rewrite - Implementation Plan

## Overview

Complete rewrite of voice conversation functionality using `@google/genai` SDK instead of raw WebSockets. This plan is organized into sequential phases with clear checkpoints.

---

## Phase 1: Clean Up Failed Implementation ✅

**Goal**: Remove all raw WebSocket code and prepare for SDK-based approach.

### Tasks

- [x] Delete or comment out raw WebSocket implementation in `src/hooks/use-gemini-live.ts`
- [x] Delete or comment out WebSocket utilities in `src/lib/gemini-live.ts`
- [x] Review `src/components/landing/voice-conversation-mode.tsx` and identify parts to preserve (UI only)
- [x] Verify that `/api/voice/token` endpoint is still working and returns valid tokens
- [x] Run `pnpm typecheck` and `pnpm lint` to ensure no TypeScript errors from cleanup

**Checkpoint**: Codebase has no raw WebSocket code, TypeScript compiles cleanly. ✅

---

## Phase 2: Implement Audio Worklet Processor ✅

**Goal**: Create low-latency audio processing pipeline for microphone input.

### Tasks

- [x] Create `public/pcm-processor.js` Audio Worklet file
  - [x] Implement `PCMProcessor` class extending `AudioWorkletProcessor`
  - [x] Add buffer for collecting 20ms chunks (320 samples at 16kHz)
  - [x] Implement `float32ToPCM16()` conversion method
  - [x] Send PCM chunks via `port.postMessage()`
- [x] Add Audio Worklet registration code to hook
- [x] Test Audio Worklet in isolation (log PCM data to console)

**Checkpoint**: Audio Worklet successfully captures microphone and converts to 16-bit PCM. ✅

---

## Phase 3: Implement SDK-Based Connection Hook ✅

**Goal**: Create new `use-gemini-live.ts` using `@google/genai` SDK.

### Tasks

- [x] Rewrite `src/hooks/use-gemini-live.ts` with SDK approach:
  - [x] Import `GoogleGenAI` from `@google/genai`
  - [x] Create state for connection status, session, audio context
  - [x] Implement `fetchEphemeralToken()` function (calls `/api/voice/token`)
  - [x] Implement `initializeSession()` function:
    - [x] Get ephemeral token
    - [x] Initialize `GoogleGenAI` with token and `apiVersion: "v1alpha"`
    - [x] Configure session options (model, responseModalities, speechConfig)
    - [x] Call `ai.live.connect()` with callbacks
  - [x] Implement connection callbacks:
    - [x] `onopen`: Update connection state
    - [x] `onmessage`: Handle audio responses and transcriptions
    - [x] `onerror`: Log errors and update error state
    - [x] `onclose`: Clean up and update state
  - [x] Implement `setupAudioInput()` function:
    - [x] Request microphone permission
    - [x] Create AudioContext at 16kHz
    - [x] Load Audio Worklet module
    - [x] Create AudioWorkletNode
    - [x] Connect microphone → worklet
    - [x] Listen to worklet messages and send to Gemini via `sendRealtimeInput()`
  - [x] Implement `startRecording()` and `stopRecording()` functions
  - [x] Implement cleanup function (disconnect, close audio context)
- [x] Add TypeScript types for all hook state and functions
- [x] Export hook with proper return type

**Checkpoint**: Hook compiles with no TypeScript errors, SDK connection logic implemented. ✅

---

## Phase 4: Implement Audio Output (Playback) ✅

**Goal**: Play AI audio responses in real-time.

### Tasks

- [x] Add audio output queue/buffer system in hook
- [x] Implement `playAudioResponse()` function:
  - [x] Decode base64 PCM audio from Gemini
  - [x] Create AudioBuffer at 24kHz
  - [x] Use AudioContext to play buffer
  - [x] Handle streaming (play chunks as they arrive)
- [x] Add state for "AI is speaking" indicator
- [x] Test audio playback with mock responses

**Checkpoint**: AI audio responses play correctly in the browser. ✅

---

## Phase 5: Implement Voice Activity Detection (VAD) ✅

**Goal**: Configure VAD for natural conversation flow.

### Tasks

- [x] Add VAD configuration to session setup:
  - [x] Set `automaticActivityDetection.disabled: false`
  - [x] Set `prefixPaddingMs: 100`
  - [x] Set `silenceDurationMs: 300`
- [x] Test VAD with different speaking patterns:
  - [x] Short utterances (1-2 words)
  - [x] Long sentences
  - [x] Pauses mid-sentence
- [x] Tune VAD parameters if needed (increase silenceDurationMs if cutting off speech)

**Checkpoint**: VAD correctly detects end of speech without cutting off or delaying too long. ✅

---

## Phase 6: Bilingual Voice Support ✅

**Goal**: Switch voices based on user's locale (Spanish/English).

### Tasks

- [x] Import `useLocale` hook to get current language
- [x] Create voice configuration mapping:
  - [x] Spanish → `Kore` voice
  - [x] English → `Kore` voice (or alternative)
- [x] Pass locale-based `voiceConfig` to session setup
- [x] Test voice switching:
  - [x] Start conversation in Spanish
  - [x] Switch to English mid-conversation
  - [x] Verify voice changes

**Checkpoint**: Correct voice is used based on user's selected locale. ✅

---

## Phase 7: Update UI Component ✅

**Goal**: Integrate new hook with existing `voice-conversation-mode.tsx` component.

### Tasks

- [x] Import new `useGeminiLive` hook in component
- [x] Wire up hook state to UI:
  - [x] Connection status → visual indicator
  - [x] Recording state → microphone button
  - [x] AI speaking state → speaker icon animation
  - [x] Transcriptions → text display
  - [x] Errors → error message display
- [x] Implement button handlers:
  - [x] Start conversation button → `initializeSession()`
  - [x] Start/stop recording button → `startRecording()` / `stopRecording()`
  - [x] Close button → cleanup
- [x] Preserve exact Brutalist styling (borders, shadows, colors)
- [x] Test all UI states visually

**Checkpoint**: UI correctly reflects hook state, all interactions work, design preserved. ✅

---

## Phase 8: Session Management & Reconnection

**Goal**: Handle long conversations and connection interruptions.

### Tasks

- [ ] Enable session resumption in config:
  - [ ] Add `sessionResumption: {}` to session config
- [ ] Implement session handle storage:
  - [ ] Listen for `sessionResumptionUpdate` messages
  - [ ] Store `newHandle` in localStorage
- [ ] Implement reconnection logic:
  - [ ] Listen for `goAway` messages
  - [ ] Trigger reconnection before timeout
  - [ ] Pass stored handle to new `connect()` call
- [ ] Test reconnection:
  - [ ] Start conversation
  - [ ] Wait for goAway message (or simulate)
  - [ ] Verify seamless reconnection

**Checkpoint**: Sessions resume correctly after disconnections, conversation continues.

---

## Phase 9: Error Handling & Resilience

**Goal**: Handle all error scenarios gracefully.

### Tasks

- [ ] Implement error handling for:
  - [ ] Token fetch failure → show error, retry button
  - [ ] Connection failure → exponential backoff, retry
  - [ ] Microphone permission denied → show error, fallback to text
  - [ ] Audio playback error → log error, continue conversation
  - [ ] Network interruption → show "reconnecting" indicator
- [ ] Add retry logic with exponential backoff
- [ ] Add timeout for connection attempts (10s max)
- [ ] Display user-friendly error messages in Spanish/English
- [ ] Test error scenarios:
  - [ ] Invalid API key
  - [ ] No microphone
  - [ ] Network disconnect during conversation
  - [ ] Token expiry

**Checkpoint**: All error scenarios handled gracefully with user feedback.

---

## Phase 10: Performance Optimization & Monitoring

**Goal**: Ensure low latency and monitor performance.

### Tasks

- [ ] Add latency logging:
  - [ ] Log time from user stops speaking → AI starts speaking
  - [ ] Log time from AI response received → audio playback starts
  - [ ] Log total round-trip time
- [ ] Optimize audio chunking:
  - [ ] Verify 20ms chunks (not larger)
  - [ ] Test with 40ms chunks if 20ms is too aggressive
- [ ] Test on different browsers:
  - [ ] Chrome (primary)
  - [ ] Firefox (audio context quirks)
  - [ ] Safari (if available)
- [ ] Profile performance:
  - [ ] Use Chrome DevTools Performance tab
  - [ ] Check for audio glitches or dropouts
  - [ ] Verify no memory leaks
- [ ] Add performance metrics to conversation logs

**Checkpoint**: Latency <1000ms, no audio glitches, metrics logged.

---

## Phase 11: Database Integration

**Goal**: Log conversations and metrics to database.

### Tasks

- [ ] Review existing conversation logging schema
- [ ] Add voice-specific fields if needed:
  - [ ] Audio latency metrics
  - [ ] Voice used (Kore, etc.)
  - [ ] Session handle for resumption
- [ ] Implement logging in hook:
  - [ ] Log conversation start
  - [ ] Log each turn (user + AI)
  - [ ] Log metrics (latency, errors)
  - [ ] Log conversation end
- [ ] Test database logging:
  - [ ] Verify conversations appear in database
  - [ ] Verify metrics are correct

**Checkpoint**: All voice conversations logged to database with metrics.

---

## Phase 12: Final Testing & Validation

**Goal**: Comprehensive testing before deployment.

### Tasks

- [ ] Test complete user flow:
  - [ ] Open voice conversation modal
  - [ ] Grant microphone permission
  - [ ] Speak in Spanish → verify Spanish voice response
  - [ ] Switch to English → verify English voice response
  - [ ] Have multi-turn conversation (5+ turns)
  - [ ] Close modal → verify cleanup
- [ ] Test edge cases:
  - [ ] Very short utterances (<1 word)
  - [ ] Very long utterances (>30 seconds)
  - [ ] Rapid speaking (no pauses)
  - [ ] Background noise
  - [ ] Multiple quick starts/stops
- [ ] Run quality checks:
  - [ ] `pnpm typecheck` → no errors
  - [ ] `pnpm lint` → no errors
  - [ ] No React hydration errors
  - [ ] No browser console errors
  - [ ] No memory leaks (check DevTools)
- [ ] Review code quality:
  - [ ] Remove debug logs
  - [ ] Add comments for complex logic
  - [ ] Verify error messages are i18n
  - [ ] Check accessibility (keyboard navigation)
- [ ] Document known issues or limitations

**Checkpoint**: All tests pass, code is production-ready.

---

## Phase 13: Documentation & Handoff

**Goal**: Document the implementation for future maintenance.

### Tasks

- [ ] Update `docs/technical/ai/gemini-voice.md` with implementation notes:
  - [ ] Architecture diagram (token flow, audio flow)
  - [ ] Key files and their responsibilities
  - [ ] Configuration options (VAD, voices)
  - [ ] Troubleshooting common issues
- [ ] Add inline code comments for complex sections
- [ ] Create README in `src/hooks/` explaining voice conversation hook
- [ ] Document environment variables (if any new ones added)
- [ ] Update main project README with voice conversation feature

**Checkpoint**: Documentation complete, feature is maintainable.

---

## Rollback Plan

If the SDK approach fails or has blockers:

1. **Do NOT revert to raw WebSockets** - they are known to fail
2. Investigate SDK issues:
   - Check SDK version compatibility
   - Review SDK GitHub issues
   - Test with minimal example from docs
3. Contact Google Gemini support if SDK bugs found
4. Consider hybrid approach: SDK for connection, custom audio handling

---

## Success Metrics

- [ ] Voice conversation connects successfully
- [ ] End-to-end latency <1000ms (user stops speaking → AI starts speaking)
- [ ] VAD accuracy >95% (no premature cutoffs)
- [ ] Session uptime >95% (minimal disconnections)
- [ ] Zero hydration errors
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors
- [ ] Works on Chrome, Firefox, Safari
- [ ] Brutalist UI design preserved exactly
- [ ] All conversations logged to database

---

## Notes

- **Do NOT start dev server** - let user handle server lifecycle
- **Run `pnpm lint && pnpm typecheck`** after each phase
- **Test incrementally** - don't wait until end to test
- **Reference documentation** - always check `docs/technical/ai/gemini-voice.md` for SDK patterns
- **Preserve design** - Brutalist styling is sacrosanct, do not modify
