# Voice Conversation Improvements - Requirements

## Overview
Improve the CultivoAI voice conversation experience to be more polished, professional, and sales-ready. The current implementation has several issues that need to be addressed before it can be used to sell AI voice solutions to clients.

## Current Issues

### 1. AI Speaking Its Own Instructions
**Problem**: The AI is reading out its internal system prompt instructions during voice conversations.
- Users hear things like "CRITICO - Respuestas Cortas para Voz" and other meta-instructions
- This breaks immersion and looks unprofessional

**Root Cause**: The `buildVoiceSystemPrompt` function in `src/lib/chat/system-prompt.ts` includes verbose instructional text that's being spoken aloud instead of being treated as behavioral guidance.

### 2. Contact Form Unclear Timing
**Problem**: Uncertainty about when to collect name/email/phone from users.
- Current implementation can show form during conversation (interrupts flow)
- No clear strategy for lead capture timing

**User Question**: "Not sure if best to do this from the beginning or during conversation"

### 3. Poor User Experience Flow
**Problem**: User has to click "Ready" button after already clicking voice icon.
- Extra friction - users already opted in by clicking voice
- Not phone-like experience
- No greeting to start the conversation naturally

### 4. UI/UX Not Modern Enough
**Problem**: Current brutalist design is functional but not appealing enough for a demo solution we're selling.
- Static animations (basic bounce/pulse)
- No real-time voice visualization
- Missing ambient effects
- Needs more polish and "wow factor"

### 5. Voice Quality/Effects Missing
**Problem**: Raw voice output without enhancements.
- No background ambiance options
- No audio processing effects
- Missing professional phone-call feel

### 6. Database Persistence Uncertainty
**Question**: Need to verify that conversations and lead data are being saved properly to the database.

---

## Requirements

### FR-1: System Prompt Fix
**Priority**: CRITICAL
- [ ] Remove all verbose instructional text from voice system prompt
- [ ] Keep only pure behavioral guidance that won't be spoken
- [ ] Prompt should guide behavior without meta-commentary
- [ ] AI should never speak instructions meant for itself

**Acceptance Criteria**:
- AI responds naturally in voice mode without reading instructions
- System prompt is concise and behavior-focused
- No meta-language like "CRITICO", "DO NOT", "ALWAYS", etc. in spoken output

---

### FR-2: Contact Form at Start
**Priority**: HIGH
- [ ] Show contact form (name, email, phone) BEFORE voice connection starts
- [ ] Form should have "Skip for now" option (recommended approach)
- [ ] Form should use brutalist design matching site theme
- [ ] Form should validate email format before proceeding
- [ ] Store captured data in leads table immediately

**Acceptance Criteria**:
- Form appears first when user clicks voice icon
- User can skip form and proceed to voice
- Email validation prevents invalid formats
- Data is saved to database before voice starts
- If user fills form, AI can greet them by name

**Design Decision**: Form at START with skip option (not mandatory, not during conversation)

---

### FR-3: Auto-Greeting (AI Speaks First)
**Priority**: HIGH
- [ ] Remove "Ready" button requirement
- [ ] AI should automatically greet user when connection establishes
- [ ] Greeting should be personalized if name was captured
- [ ] Natural phone-call experience (no manual trigger needed)

**Greeting Examples**:
- With name: "Hi [Name]! I'm the CultivoAI assistant. How can I help you today?"
- Without name: "Hi! I'm the CultivoAI assistant. How can I help you today?"

**Acceptance Criteria**:
- No "tap to speak" instruction needed
- AI speaks immediately after connection
- User can interrupt AI greeting naturally
- Microphone is active from start (VAD handles silence)

---

### FR-4: Modern UI/UX Improvements
**Priority**: MEDIUM
- [ ] Add real-time voice visualizer (waveform/frequency bars)
- [ ] Improve animation smoothness (reduce jarring transitions)
- [ ] Add particle effects during AI speaking
- [ ] Add gradient accents while maintaining brutalist borders/shadows
- [ ] Better loading states with skeleton screens
- [ ] Improve status badge animations

**Specific Enhancements**:
- Replace static soundwave bars with real-time audio analysis
- Add floating particle effects around speaking animation
- Smooth transitions between states (idle → listening → speaking)
- Visual feedback for microphone input level
- Gradient overlays on brutalist boxes (keep 4px borders and hard shadows)

**Acceptance Criteria**:
- Voice visualizer responds to actual audio input/output
- Animations are smooth (60fps)
- UI feels modern while preserving brutalist theme
- Visual polish suitable for client demos

---

### FR-5: Background Audio Enhancement
**Priority**: LOW
- [ ] Add optional ambient background sound
- [ ] Allow user to toggle background audio on/off
- [ ] Subtle white noise or gentle music option
- [ ] Audio processing for voice (reverb/EQ optional)

**Options**:
- Gentle white noise (call center ambiance)
- Soft background music (lo-fi beats)
- Nature sounds (rain, cafe, etc.)
- None (default)

**Acceptance Criteria**:
- Background audio is opt-in
- Volume is balanced (doesn't overpower voice)
- User can toggle during conversation
- Audio loops seamlessly

---

### FR-6: Database Verification
**Priority**: MEDIUM
- [ ] Verify conversations are being logged to `chatConversations` table
- [ ] Verify messages are being logged to `chatMessages` table
- [ ] Verify lead data is being saved to `leads` table
- [ ] Confirm voice metadata fields are populated (inputType, audioDurationMs)
- [ ] Test conversation flow from start to end
- [ ] Verify data integrity and relationships

**Acceptance Criteria**:
- All voice conversations appear in admin dashboard
- Turn count, duration, and summary are accurate
- Lead qualification data is captured correctly
- Voice-specific metadata is populated
- No data loss on connection errors

---

## Non-Functional Requirements

### NFR-1: Performance
- Voice visualizer should not impact audio latency
- UI animations should maintain 60fps
- Background audio should not cause crackling or glitches

### NFR-2: Accessibility
- Contact form should be keyboard navigable
- Screen reader support for form labels
- Visual indicators for audio state (not just audio-only)

### NFR-3: Browser Compatibility
- Works in Chrome, Edge, Safari (latest versions)
- Graceful degradation for unsupported browsers
- WebRTC/AudioContext feature detection

### NFR-4: Design Consistency
- Maintain brutalist design system (4px borders, hard shadows, uppercase text)
- Use existing color palette (yellow, purple, green, black/white)
- Follow existing component patterns
- Use Space Grotesk font for headings

---

## Out of Scope

- ❌ **Unit/E2E Testing** (unless explicitly requested)
- ❌ **Multi-language voice support** (keep English/Spanish text only)
- ❌ **Voice cloning or custom TTS** (use Gemini's built-in voices)
- ❌ **Call recording/playback** (only live conversations)
- ❌ **Multi-party voice calls** (only 1:1 user-to-AI)
- ❌ **Dark mode** (brutalist theme only, as per project guidelines)

---

## Success Metrics

### User Experience
- Users don't hear AI instructions
- Contact capture rate increases
- Average conversation duration increases
- Voice conversations feel natural and professional

### Technical
- Zero spoken system prompts
- 100% of conversations logged to database
- Contact form submission rate > 30%
- Voice connection success rate > 95%

### Business
- Demo-ready quality suitable for showcasing to potential clients
- Professional appearance for selling voice AI solutions
- Reduced bounce rate on voice feature

---

## User Personas

### Primary: Potential Client Testing Voice Demo
- **Goal**: Evaluate CultivoAI's voice AI capabilities
- **Pain Point**: Needs to see polished, professional implementation
- **Need**: Seamless, impressive experience that shows technical expertise

### Secondary: Website Visitor Exploring Services
- **Goal**: Learn about CultivoAI offerings
- **Pain Point**: Prefers voice over typing
- **Need**: Quick, easy way to get information via voice

---

## Technical Context

### Existing Implementation
- **Voice SDK**: Google Gemini Live API (`@google/genai`)
- **Model**: `gemini-2.5-flash-native-audio-preview-09-2025`
- **Audio**: PCM16 @ 16kHz input, 24kHz output
- **Components**: `VoiceConversationMode`, `useGeminiLive` hook
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS 4 with brutalist design system

### Files Involved
- `src/components/landing/voice-conversation-mode.tsx` - Main UI component
- `src/hooks/use-gemini-live.ts` - WebRTC/SDK hook
- `src/lib/chat/system-prompt.ts` - System prompt builder
- `src/lib/gemini-live.ts` - Type definitions
- `src/lib/schema.ts` - Database schema
- `src/app/api/voice/` - API routes (token, transcribe, synthesize)
- `public/pcm-processor.js` - AudioWorklet for microphone input

---

## Dependencies

### Required
- Google Gemini API key with Live API access
- Browser with WebRTC support (getUserMedia, AudioContext, AudioWorklet)
- PostgreSQL database (already set up)

### Optional
- Background audio files (MP3/OGG for ambient sounds)
- Audio processing libraries (if adding effects)

---

## Constraints

- **Design**: MUST preserve brutalist theme (no dark mode, no theme switching)
- **Framework**: Next.js 16 with App Router, React 19
- **Package Manager**: pnpm only
- **No Server Restarts**: Developer should not run dev server
- **Lint/Typecheck**: MUST run after all changes
