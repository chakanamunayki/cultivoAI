# Phase 6: Real-Time Voice Conversation with Gemini Live API

## Overview

Replace the current slow voice conversation implementation (30+ second latency) with Gemini Live API for true real-time speech-to-speech conversations with sub-second latency.

## Problem Statement

### Current Implementation Issues
1. **High Latency (~30 seconds)**: Current flow is `Voice → Groq STT → Gemini Chat → TTS → Voice`
2. **Manual Interruption Required**: Users must tap buttons to start/stop speaking
3. **Separate Transcription Step**: Adds significant delay waiting for full transcription
4. **Not Conversational**: Feels robotic, not like a natural phone call

### Industry Standard (2025)
- Response latency should be **under 800ms** for natural conversation
- Automatic Voice Activity Detection (VAD) for seamless turn-taking
- Speech-to-speech models eliminate transcription overhead
- Interruption handling built-in

## Requirements

### Functional Requirements

#### FR-1: Real-Time Speech-to-Speech (Streaming)
- Use Gemini Live API WebSocket connection for direct audio streaming
- Eliminate separate STT (Speech-to-Text) step
- **Streaming audio output** - AI starts speaking as soon as first audio chunk arrives (~600ms)
- No waiting for full response generation - audio plays while more is being generated
- Audio format: 16-bit PCM, 16kHz input / 24kHz output

**How it works:**
```
User stops speaking → 600ms → First audio chunk plays
                            → More chunks stream in while speaking
                            → Seamless playback, no gaps
```

#### FR-2: Automatic Turn-Taking (VAD)
- Implement Voice Activity Detection for automatic conversation flow
- User can speak naturally - no need to press/hold buttons
- AI responds when user stops speaking (configurable silence threshold)
- Support for interruption - user can speak while AI is talking

#### FR-3: Lead Capture Form
- Include inline name/email/phone fields within the voice mode overlay
- Phone number field with proper validation
- Form appears after initial greeting or when AI requests contact info
- Form submission does not close voice mode
- Captured leads link to conversation
- All fields stored in database

#### FR-3.1: Conversation Persistence
- Save full voice conversation transcript to database
- Link conversation to lead record
- Store key metadata:
  - Session duration
  - Number of turns (exchanges)
  - Language used
  - Lead qualification score (if assessed)
  - Timestamp of each message
- Conversation visible in admin dashboard

#### FR-4: Conversation Continuity
- Maintain conversation context throughout voice session
- Sync with text chat history
- Same system prompt and personality as text chat

#### FR-5: Bilingual Support
- Support Spanish and English based on user locale
- AI voice should match selected language
- UI labels in both languages

### Non-Functional Requirements

#### NFR-1: Performance
- First audio response within 800ms of user finishing speaking
- Smooth audio playback without stuttering
- Minimal CPU usage for audio processing

#### NFR-2: Security
- Use ephemeral tokens (not direct API keys in browser)
- Secure WebSocket connection (wss://)
- Token expiry and refresh mechanism

#### NFR-3: Browser Compatibility
- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful fallback for unsupported browsers
- Microphone permission handling

#### NFR-4: User Experience
- Visual feedback for connection status
- Clear indication of who is speaking (user vs AI)
- Animated states: connecting, listening, speaking, processing
- Easy exit from voice mode

## Technical Specifications

### Gemini Live API Details

**WebSocket Endpoint:**
```
wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent
```

**Authentication:**
- Production: Ephemeral tokens via backend API
- Token lifetime: 1 minute

**Audio Configuration:**
- Input: 16-bit PCM, 16kHz, mono
- Output: 24kHz, mono

**VAD Configuration:**
```javascript
{
  "automaticActivityDetection": {
    "disabled": false,
    "startOfSpeechSensitivity": "HIGH",
    "endOfSpeechSensitivity": "MEDIUM",
    "silenceDurationMs": 500
  }
}
```

### System Prompt (Voice-Optimized)
- Keep responses concise for voice (under 3 sentences)
- Use conversational language, not formal text
- Proactive lead capture after 2-3 exchanges
- Natural conversation flow

## User Stories

### US-1: Natural Voice Conversation
**As a** website visitor
**I want to** have a natural voice conversation with the AI
**So that** I can quickly learn about CultivoAI's services without typing

**Acceptance Criteria:**
- Click mic button to enter voice mode
- Full-screen overlay appears
- AI greets me by voice
- I can speak naturally and AI responds within 1 second
- I can interrupt the AI if needed
- Conversation feels like a phone call

### US-2: Lead Capture During Voice
**As a** potential client
**I want to** provide my contact info during voice conversation
**So that** CultivoAI can follow up with me

**Acceptance Criteria:**
- Name/email form visible in voice mode overlay
- Can fill out while continuing conversation
- Form submission shows confirmation
- Lead linked to conversation transcript

### US-3: Seamless Language Support
**As a** Spanish-speaking visitor
**I want to** have the conversation in Spanish
**So that** I can communicate naturally

**Acceptance Criteria:**
- AI detects and matches my language
- All UI labels in Spanish
- Voice responses in natural Spanish

## Design Notes
- **Keep existing UI design** - The current voice mode overlay design is approved
- Animations and visual states already implemented in CSS
- Only update backend integration (Gemini Live) and add form fields
- Maintain brutalist styling consistency

## Out of Scope
- Video calling
- Screen sharing
- Multiple voice options (single natural voice)
- Offline mode
- Voice recording/download
- Major UI redesign (keep existing overlay design)

## Dependencies
- Gemini API key with Live API access
- Modern browser with WebRTC/MediaRecorder support
- Microphone permissions

## Success Metrics
- Average response latency < 800ms
- Voice session completion rate > 70%
- Lead capture rate in voice mode > 50%
- User satisfaction (qualitative feedback)
