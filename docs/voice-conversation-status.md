# Gemini Live Voice Conversation - Current Status

**Date**: December 11, 2025
**Status**: ⚠️ WORKING BUT WITH AUDIO QUALITY ISSUES

## What's Working ✅

1. **WebSocket Connection**: Successfully connects to Gemini Live API
2. **Voice Input**: Microphone capture working, sending PCM16 audio at 16kHz
3. **Voice Output**: Receiving PCM16 audio at 24kHz from Gemini
4. **Transcription**: Getting text transcripts of conversation
5. **Function Calling**: System prompt and qualification logic integrated
6. **Session Management**: Proper connection lifecycle, token refresh
7. **UI**: Brutalist voice interface with animations

## Current Problem ❌

**AUDIO CRACKLING**: The AI's voice response has severe crackling/distortion making it sound like a bad radio.

### What We've Tried (All Failed):

1. ✅ **Proper PCM16 decoding with DataView** - Correct endianness, still crackles
2. ✅ **Scheduled audio playback** - Eliminates gaps between chunks, still crackles
3. ❌ **AudioWorklet with ring buffer** - Fails with "No execution context available" error
4. ❌ **Blob URL for worklet** - Same error, doesn't work in Next.js environment

### Technical Details

**Audio Format**:
- Input: 16-bit PCM, 16kHz, mono, little-endian
- Output: 16-bit PCM, 24kHz, mono, little-endian
- Chunk size: 2560 bytes (~53ms of audio at 24kHz)

**Current Implementation**:
- Location: `src/hooks/use-gemini-live.ts`
- Method: Direct AudioBuffer playback with scheduled timing
- Decoding: DataView.getInt16() for proper byte order
- Normalization: `sample / 32768.0`

**The Crackling**:
- Appears on ALL responses
- Not related to network (chunks arrive fine)
- Not gaps (scheduled playback eliminates gaps)
- Something wrong with PCM decoding or playback

## Research Done

**GitHub Issues Found**:
- [Audio Quality Bad Issue #872](https://github.com/googleapis/python-genai/issues/872) - Others report same issue
- [Static Noise Issue #837](https://github.com/googleapis/python-genai/issues/837) - TTS produces static
- [Best Practices Discussion](https://discuss.ai.google.dev/t/best-practices-for-playing-gemini-live-apis-24khz-pcm-audio-stream-in-expo-react-native/95569)

**Google's Approach**:
- Uses AudioWorklet for playback (we can't get this working)
- Separate contexts: 16kHz input, 24kHz output
- Ring buffer for smooth playback

## Files Modified

```
src/hooks/use-gemini-live.ts         - Main hook (300+ lines)
src/components/landing/voice-conversation-mode.tsx  - UI component
public/pcm-processor.js              - Input worklet (working)
public/audio-playback-processor.js   - Output worklet (BROKEN)
src/app/api/voice/token/route.ts     - Ephemeral token endpoint
```

## Next Steps - PROMPT FOR NEW THREAD

```
GEMINI LIVE VOICE: Fix audio crackling in playback

CONTEXT:
- Gemini Live WebSocket voice conversation is working
- Receiving PCM16 audio at 24kHz correctly (verified mime type)
- Audio plays but has SEVERE crackling/distortion
- AudioWorklet approach fails with "No execution context available" in Next.js

CURRENT CODE:
- src/hooks/use-gemini-live.ts - playAudioChunk function
- Uses DataView.getInt16() for proper PCM16 decoding
- Uses scheduled playback with AudioContext.currentTime
- Converts to Float32, creates AudioBuffer, plays with BufferSource

THE PROBLEM:
The crackling suggests either:
1. Wrong sample rate interpretation (says 24kHz but maybe different?)
2. Wrong channel count (mono vs stereo mismatch?)
3. Wrong PCM format (maybe not PCM16?)
4. Buffer underruns causing glitches
5. Some other decoding issue we missed

WHAT TO TRY:
1. Check if Google's official multimodal-live-api-web-console has working implementation we can copy
2. Try different sample rates (16kHz, 22.05kHz, 44.1kHz, 48kHz)
3. Try stereo instead of mono
4. Try AudioBufferSourceNode.loop or different playback approach
5. Look for Web Audio API issues specific to Next.js/React
6. Consider using MediaSource Extensions instead of Web Audio API
7. Check if we need to add silence padding between chunks

DO NOT:
- Try AudioWorklet again (it's broken in this environment)
- Revert to old code (current code is correct, just needs tweaking)
- Suggest band-aid solutions that don't fix root cause

GOAL: Crystal clear voice like you'd get from a phone call or video chat.
```

## Commits to Review

Recent commits (last 10):
```
9d3edfb fix: use Blob URL for AudioWorklet (FAILED)
cb6da62 debug: add detailed logging and wait time for worklet loading
c595f2e feat: implement AudioWorklet-based playback (FAILED)
985c0f2 fix: implement scheduled audio playback (HAS CRACKLING)
b7744e4 fix: use DataView for proper PCM16 decoding (HAS CRACKLING)
9669499 debug: log audio mimeType
0912c06 fix: reuse AudioContext to prevent recreation
b0cd914 fix: prevent AudioContext from closing while audio is playing
```

**Working baseline**: Commit `985c0f2` has working audio with crackling.
