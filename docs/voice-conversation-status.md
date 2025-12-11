# Gemini Live Voice Conversation - Current Status

**Date**: December 11, 2025
**Status**: ⚠️ WORKING BUT KNOWN GEMINI API AUDIO BUG

## What's Working ✅

1. **WebSocket Connection**: Successfully connects to Gemini Live API
2. **Voice Input**: Microphone capture working, sending PCM16 audio at 16kHz
3. **Voice Output**: Receiving PCM16 audio at 24kHz from Gemini - **PLAYS BUT HAS CRACKLING**
4. **Transcription**: Getting text transcripts of conversation
5. **Function Calling**: System prompt and qualification logic integrated
6. **Session Management**: Proper connection lifecycle, token refresh
7. **UI**: Brutalist voice interface with animations

## Current Issue 🐛

**AUDIO CRACKLING/STATIC IN GEMINI'S VOICE**

This is a **known bug in Gemini Live API**, not our implementation:
- [GitHub Issue #872](https://github.com/googleapis/python-genai/issues/872) - Live API Audio Quality Bad
- [GitHub Issue #837](https://github.com/googleapis/python-genai/issues/837) - TTS produces static noise
- Multiple users reporting same issue across Python and JavaScript SDKs
- Tagged as P2 priority by Google (may not be fixed in next release)

## Current Implementation

**Location**: `src/hooks/use-gemini-live.ts`

**Audio Pipeline**:
- Input: PCM16, 16kHz, mono via AudioWorklet (`/pcm-processor.js`)
- Output: PCM16, 24kHz, mono via scheduled AudioBuffer playback
- Two separate AudioContext instances (16kHz for input, 24kHz for output)
- Proper PCM16 decoding with DataView and little-endian handling
- Normalization: `sample / 32767.0` (correct for PCM16 asymmetric range)

**What We Tried (All Failed to Fix Crackling)**:
1. ✅ Proper PCM16 decoding with DataView - correct but didn't fix it
2. ✅ Scheduled audio playback - eliminates gaps but not crackling
3. ✅ Fixed normalization factor (32768 → 32767) - didn't fix it
4. ❌ AudioWorklet for output - fails with "No execution context available" in Next.js

**Conclusion**: The crackling is **server-side** in Gemini's TTS, not client-side decoding.

## Planned Solution 🎯

**Hybrid Architecture**: Gemini for intelligence + ElevenLabs for voice

```
User speaks → Speech-to-Text → Gemini Chat API (text) → ElevenLabs TTS → Clean audio
```

**Benefits**:
- Crystal clear voice (no crackling)
- More voice options
- Simpler code (no WebSocket complexity)
- Works around Gemini API bug

**Implementation**:
- Create new `use-voice-conversation.ts` hook
- Use browser SpeechRecognition or Gemini STT for input
- Use Gemini Chat API (text-based) for responses
- Use ElevenLabs TTS for output
- Reuse existing UI components

**Timeline**: Before production launch

## Files

```
src/hooks/use-gemini-live.ts         - Current Gemini Live implementation (has crackling)
src/components/landing/voice-conversation-mode.tsx  - UI component (reusable)
public/pcm-processor.js              - Input worklet (working)
src/app/api/voice/token/route.ts     - Ephemeral token endpoint
```

## Research Sources

- [Gemini Live API Audio Quality Issue #872](https://github.com/googleapis/python-genai/issues/872)
- [Gemini TTS Static Noise Issue #837](https://github.com/googleapis/python-genai/issues/837)
- [Audio Output Fix PR #1553](https://github.com/GoogleCloudPlatform/generative-ai/pull/1553)
- [Best Practices Discussion](https://discuss.ai.google.dev/t/best-practices-for-playing-gemini-live-apis-24khz-pcm-audio-stream-in-expo-react-native/95569)
- [KVR Audio Forum - PCM16 Normalization](https://www.kvraudio.com/forum/viewtopic.php?t=566788)
- [wav-encoder PCM16 Distortion Bug](https://github.com/mohayonao/wav-encoder/issues/10)
