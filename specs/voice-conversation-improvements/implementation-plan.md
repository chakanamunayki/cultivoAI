# Voice Conversation Improvements - Implementation Plan

## Overview
Step-by-step implementation plan for improving the voice conversation experience in CultivoAI. This plan is organized into phases with checkboxes for tracking progress.

---

## Phase 0: Database Verification & Analysis
**Goal**: Verify that conversations are being saved correctly before making improvements.

### Tasks

#### 0.1 Database Connection Verification
- [ ] Confirm PostgreSQL connection is active (.env has POSTGRES_URL)
- [ ] Verify Drizzle schema is up to date with database
- [ ] Check if migrations have been run (`pnpm db:migrate`)

#### 0.2 Conversation Logging Verification
- [ ] Test voice conversation end-to-end
- [ ] Query `chatConversations` table to verify conversation is created
  - Session ID should match
  - Entry context should be "voice"
  - Language should be set correctly
- [ ] Query `chatMessages` table to verify messages are being logged
  - Both user and model messages should appear
  - Final transcripts should be saved (isFinal=true)
  - Model used should be "gemini-live-2.0-flash"
- [ ] Check conversation summary is updated on close
- [ ] Verify turn count and duration are calculated correctly

#### 0.3 Lead Capture Verification (if applicable)
- [ ] Check if `leads` table is populated when contact form is submitted
- [ ] Verify lead qualification fields are updated
- [ ] Confirm conversation is linked to lead (leadId foreign key)

**Completion Criteria**:
- ✅ Database is accessible
- ✅ Voice conversations appear in `chatConversations` table
- ✅ Messages appear in `chatMessages` table with correct metadata
- ✅ Admin dashboard shows conversation stats

**Files to Check**:
- `src/components/landing/voice-conversation-mode.tsx` (lines 269-344: logging functions)
- `src/app/api/chat/conversations/route.ts` (API endpoint)
- Database tables via Drizzle Studio or SQL client

---

## Phase 1: System Prompt Fix (CRITICAL)
**Goal**: Stop AI from speaking its own instructions.

### Tasks

#### 1.1 Analyze Current Prompt
- [ ] Review `buildVoiceSystemPrompt` function in `src/lib/chat/system-prompt.ts` (lines 668-715)
- [ ] Identify all verbose instructional text that might be spoken
- [ ] Document what's being spoken vs what should stay as behavioral guidance

#### 1.2 Create Minimal Voice Prompt
- [ ] Rewrite voice system prompt to be concise and behavior-focused
- [ ] Remove all meta-language (CRITICO, DO NOT, ALWAYS, etc.)
- [ ] Keep only: who you are, how to behave, what to say
- [ ] Remove formatting instructions (lists, bullets, emojis) - these don't apply to speech
- [ ] Simplify lead capture strategy (just behavior, not detailed rules)

**New Prompt Structure** (recommended):
```
You are the CultivoAI voice assistant.

Paul and Rocky run a father-son AI consultancy in Colombia. Paul handles strategy (20+ years experience), Rocky builds solutions (14-year-old tech lead).

Your role: Help visitors understand our services through natural conversation.

Behavior:
- Speak conversationally in [Spanish/English]
- Keep responses under 2-3 sentences
- Ask for name and email after 2-3 exchanges
- Never give specific prices - suggest a call with Paul
- Be friendly and professional

Services: [brief list]
```

#### 1.3 Test and Validate
- [ ] Test voice conversation with new prompt
- [ ] Verify AI does NOT speak instructions
- [ ] Verify AI still behaves correctly (captures leads, stays on topic)
- [ ] Test in both Spanish and English

**Completion Criteria**:
- ✅ AI responds naturally without meta-instructions
- ✅ Prompt is under 500 words total
- ✅ AI behavior is unchanged (still qualifies leads, suggests services)

**Files to Modify**:
- `src/lib/chat/system-prompt.ts` (buildVoiceSystemPrompt function)

---

## Phase 2: Contact Form at Start
**Goal**: Capture name/email/phone before voice conversation begins.

### Tasks

#### 2.1 Update VoiceConversationMode Props
- [ ] Modify `VoiceConversationModeProps` interface to support initial form
- [ ] Add prop: `showInitialForm?: boolean` (default true)
- [ ] Keep existing `showContactForm` for mid-conversation form (backward compat)

#### 2.2 Create Form State Management
- [ ] Add state: `showPreConnectionForm` (boolean)
- [ ] Initialize to `true` when modal opens (before connection)
- [ ] Add state: `capturedUserInfo` with name, email, phone
- [ ] Update form labels to match brutalist design

#### 2.3 Modify Connection Flow
- [ ] Change auto-connect logic (line 397) to wait for form completion
- [ ] Connect ONLY after:
  - User submits form, OR
  - User clicks "Skip for now"
- [ ] Pass captured name to greeting function

#### 2.4 Update UI Rendering
- [ ] Show form FIRST when modal opens (before any animations)
- [ ] Form should block connection animations
- [ ] Add "Skip for now" button (subtle, bottom of form)
- [ ] Keep brutalist styling: 4px borders, shadow-[8px_8px_0px_0px_#A855F7]

**Form Layout**:
```
┌─────────────────────────────────┐
│  BEFORE WE START                │  (yellow bg, black text)
│  (Optional info to help you)    │
├─────────────────────────────────┤
│  Name:     [____________]       │  (brutalist inputs)
│  Email:    [____________]       │
│  Phone:    [____________]       │  (optional)
│                                 │
│  [  CONTINUE TO VOICE CHAT  ]   │  (yellow button)
│                                 │
│  Skip for now                   │  (text link, small)
└─────────────────────────────────┘
```

#### 2.5 Email Validation
- [ ] Validate email format (must have @ and domain)
- [ ] Show error if email is invalid
- [ ] Prevent submission until email is valid
- [ ] Optional: Show green checkmark when valid

#### 2.6 Save Lead Data
- [ ] Call lead capture API when form is submitted
- [ ] Store returned leadId for conversation linking
- [ ] Handle API errors gracefully (allow skip if API fails)

**Completion Criteria**:
- ✅ Form appears first when voice icon is clicked
- ✅ Voice connection waits for form completion or skip
- ✅ Form data is saved to `leads` table
- ✅ User can skip form and proceed to voice
- ✅ Brutalist styling is preserved

**Files to Modify**:
- `src/components/landing/voice-conversation-mode.tsx` (main logic)
- `src/content/es.ts` and `src/content/en.ts` (form labels if needed)

---

## Phase 3: Auto-Greeting (AI Speaks First)
**Goal**: AI greets user immediately on connection.

### Tasks

#### 3.1 Remove "Ready" Button
- [ ] Remove idle animation click handler (line 558)
- [ ] Remove "tap to speak" instruction (line 709)
- [ ] Keep idle animation as visual indicator only

#### 3.2 Implement Auto-Greeting
- [ ] Add greeting state: `hasGreeted` (boolean ref)
- [ ] In `useGeminiLive` hook, add `onConnected` callback option
- [ ] Trigger greeting when connection state becomes "connected"
- [ ] Prevent greeting from firing multiple times (use ref)

#### 3.3 Send Greeting Prompt
**Option A: Pre-fill with SDK** (recommended)
- [ ] In `initializeSession`, add initial prompt to config
- [ ] Use `systemInstruction.parts` with greeting text
- [ ] Gemini will speak automatically on connection

**Option B: Send Message** (fallback)
- [ ] After connection opens, send realtime input with greeting request
- [ ] Use `session.sendRealtimeInput({ text: "greet-the-user" })`

#### 3.4 Personalize Greeting
- [ ] If form was filled (name captured), use personalized greeting:
  - Spanish: "Hola [Name]! Soy el asistente de CultivoAI. ¿En qué te puedo ayudar?"
  - English: "Hi [Name]! I'm the CultivoAI assistant. How can I help you?"
- [ ] If form was skipped, use generic greeting:
  - Spanish: "Hola! Soy el asistente de CultivoAI. ¿En qué te puedo ayudar?"
  - English: "Hi! I'm the CultivoAI assistant. How can I help you?"

#### 3.5 Handle Interruption
- [ ] Ensure user can interrupt greeting (VAD should detect speech)
- [ ] Clear audio queue if user starts speaking during greeting
- [ ] Update conversation state to "listening" when interrupted

**Completion Criteria**:
- ✅ AI speaks immediately after connection
- ✅ No "Ready" button or "tap to speak" instruction
- ✅ Greeting is personalized if name was captured
- ✅ User can interrupt greeting naturally
- ✅ Conversation flows smoothly after greeting

**Files to Modify**:
- `src/hooks/use-gemini-live.ts` (add onConnected callback)
- `src/components/landing/voice-conversation-mode.tsx` (trigger greeting)
- `src/lib/chat/system-prompt.ts` (potentially adjust prompt)

---

## Phase 4: Modern UI/UX Improvements
**Goal**: Make the voice interface more visually appealing and modern.

### Tasks

#### 4.1 Real-Time Voice Visualizer
- [ ] Add state for audio analysis: `audioLevels` (array of numbers)
- [ ] Create AudioAnalyser for microphone input (Web Audio API)
- [ ] Extract frequency data using `getByteFrequencyData()`
- [ ] Update `audioLevels` state on each animation frame
- [ ] Replace static soundwave bars with dynamic bars based on audio levels

**Implementation**:
```typescript
// In useGeminiLive hook
const analyserRef = useRef<AnalyserNode | null>(null);
const audioDataRef = useRef<Uint8Array | null>(null);

// After creating audio context (line 264)
const analyser = ctx.createAnalyser();
analyser.fftSize = 256; // 128 frequency bars
source.connect(analyser);
analyserRef.current = analyser;
audioDataRef.current = new Uint8Array(analyser.frequencyBinCount);

// Animation loop
const updateAudioLevels = () => {
  if (analyserRef.current && audioDataRef.current) {
    analyserRef.current.getByteFrequencyData(audioDataRef.current);
    // Pass to component via callback
  }
  requestAnimationFrame(updateAudioLevels);
};
```

- [ ] Add visualizer component: `<VoiceVisualizer levels={audioLevels} />`
- [ ] Render bars with heights based on frequency data
- [ ] Style with brutalist borders and yellow/purple colors

#### 4.2 Particle Effects During Speaking
- [ ] Create `<ParticleEffect />` component
- [ ] Generate floating particles (circles/squares) around AI animation
- [ ] Animate particles upward with random drift (CSS keyframes)
- [ ] Show particles only when `conversationState === "speaking"`
- [ ] Use purple color (#A855F7) with varying opacity

**Particle Animation**:
```css
@keyframes float-up {
  from {
    transform: translate(0, 0);
    opacity: 1;
  }
  to {
    transform: translate(var(--x-drift), -100px);
    opacity: 0;
  }
}
```

#### 4.3 Smooth State Transitions
- [ ] Add CSS transitions for all state changes
- [ ] Use `transition-all duration-300 ease-in-out` for color changes
- [ ] Fade out old animation, fade in new (avoid jarring switches)
- [ ] Add scale effects on state change (slight zoom in/out)

#### 4.4 Gradient Accents (Preserve Brutalism)
- [ ] Add gradient overlays to animation backgrounds
- [ ] Keep 4px black borders intact
- [ ] Use gradients sparingly:
  - Yellow to orange for listening state
  - Purple to pink for speaking state
  - Green to teal for idle state
- [ ] Apply as `background-image` with brutalist bg as fallback

**Example**:
```tsx
<div className="bg-[#A855F7] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
     style={{
       backgroundImage: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)'
     }}>
```

#### 4.5 Loading States with Skeletons
- [ ] Replace instant state changes with skeleton screens
- [ ] Show pulsing placeholder during "connecting" state
- [ ] Animate skeleton bars during loading

#### 4.6 Microphone Input Level Indicator
- [ ] Show small visual indicator of mic input level
- [ ] Bar or ring around microphone icon that fills based on volume
- [ ] Green when detecting speech, gray when silent

**Completion Criteria**:
- ✅ Voice visualizer responds to actual audio input
- ✅ Particle effects appear during AI speaking
- ✅ State transitions are smooth (no jarring changes)
- ✅ Brutalist theme is preserved (borders, shadows, uppercase)
- ✅ UI looks polished and modern

**Files to Modify**:
- `src/components/landing/voice-conversation-mode.tsx` (add visualizer)
- `src/hooks/use-gemini-live.ts` (add audio analysis)
- Create new file: `src/components/landing/voice-visualizer.tsx`
- Create new file: `src/components/landing/particle-effect.tsx`
- Update: `tailwind.config.ts` (add new animations if needed)

---

## Phase 5: Background Audio Enhancement
**Goal**: Add optional ambient background sound for better experience.

### Tasks

#### 5.1 Audio File Preparation
- [ ] Source royalty-free ambient audio files (or create)
  - Gentle white noise (call center ambiance)
  - Soft lo-fi background music
  - Nature sounds (rain, cafe)
- [ ] Convert to web-optimized format (OGG + MP3 fallback)
- [ ] Place files in `public/audio/ambient/`
- [ ] Keep file sizes small (<500KB each, looped)

#### 5.2 Audio Player Component
- [ ] Create `<AmbientAudioPlayer />` component
- [ ] Use `<audio>` element with loop attribute
- [ ] Preload audio on component mount
- [ ] Control volume (low, ~0.1-0.2 volume)
- [ ] Provide play/pause/stop methods

#### 5.3 UI Toggle Control
- [ ] Add small toggle button in voice modal
- [ ] Icon: speaker with waves (on) or muted (off)
- [ ] Position: Top-right corner next to close button
- [ ] Brutalist styling: border-4, shadow, yellow bg when active

**Toggle UI**:
```tsx
<button
  onClick={() => setAmbientEnabled(!ambientEnabled)}
  className="p-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
             hover:bg-[#FFC805] transition-colors"
>
  {ambientEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
</button>
```

#### 5.4 Audio Selection (Optional)
- [ ] Add dropdown or cycle button to switch between ambient sounds
- [ ] Store user preference in localStorage
- [ ] Options: None, White Noise, Lo-Fi, Rain, Cafe

#### 5.5 Integration with Voice
- [ ] Start ambient audio when voice connection starts
- [ ] Stop ambient audio when voice modal closes
- [ ] Ensure ambient doesn't interfere with voice detection (separate audio context)
- [ ] Duck ambient volume when AI is speaking (reduce to 0.05)

**Completion Criteria**:
- ✅ Ambient audio is opt-in (off by default or user toggle)
- ✅ Volume is balanced (doesn't overpower voice)
- ✅ Audio loops seamlessly without gaps
- ✅ User can toggle on/off during conversation
- ✅ Preference is saved in localStorage

**Files to Create**:
- `src/components/landing/ambient-audio-player.tsx`
- `public/audio/ambient/white-noise.ogg`
- `public/audio/ambient/lofi-beats.ogg`
- `public/audio/ambient/rain.ogg`

**Files to Modify**:
- `src/components/landing/voice-conversation-mode.tsx` (add toggle)

---

## Phase 6: Database Verification Follow-Up
**Goal**: Ensure all improvements are being logged correctly.

### Tasks

#### 6.1 Test Full Flow
- [ ] Open voice modal → form appears
- [ ] Fill form with test data → submit
- [ ] Wait for auto-greeting → hear AI speak
- [ ] Have short conversation (3-5 turns)
- [ ] Close modal
- [ ] Query database for conversation record

#### 6.2 Verify New Data Points
- [ ] Check if lead was created from initial form
- [ ] Verify conversation is linked to lead (leadId matches)
- [ ] Confirm auto-greeting was logged as first AI message
- [ ] Check turn count and duration are accurate
- [ ] Verify summary mentions voice conversation

#### 6.3 Admin Dashboard Check
- [ ] Open admin dashboard (`/admin`)
- [ ] Verify conversation appears in list
- [ ] Check lead appears with correct qualification score
- [ ] Confirm all metrics are accurate

**Completion Criteria**:
- ✅ All voice conversations are logged with correct metadata
- ✅ Lead capture from initial form is working
- ✅ Conversation-to-lead linking is correct
- ✅ Admin dashboard shows accurate stats

**Files to Verify**:
- Database tables (via Drizzle Studio or SQL client)
- `src/app/admin/page.tsx` (dashboard)

---

## Phase 7: Final Polish & QA
**Goal**: Ensure everything works together seamlessly.

### Tasks

#### 7.1 Cross-Browser Testing
- [ ] Test in Chrome (primary target)
- [ ] Test in Edge
- [ ] Test in Safari (Mac/iOS if available)
- [ ] Verify WebRTC works in all browsers
- [ ] Check audio playback quality

#### 7.2 Responsive Design Check
- [ ] Test on desktop (1920x1080, 1366x768)
- [ ] Test on tablet (iPad size)
- [ ] Test on mobile (iPhone SE, iPhone 14 Pro)
- [ ] Ensure modal is usable on small screens
- [ ] Check form fits on mobile without scroll

#### 7.3 Performance Optimization
- [ ] Measure audio latency (should be <500ms)
- [ ] Check for memory leaks (long conversations)
- [ ] Verify animations run at 60fps
- [ ] Ensure audio visualizer doesn't lag

#### 7.4 Error Handling
- [ ] Test microphone permission denied
- [ ] Test network disconnect during conversation
- [ ] Test API token fetch failure
- [ ] Verify error messages are user-friendly

#### 7.5 Accessibility
- [ ] Form inputs have proper labels
- [ ] Tab order makes sense
- [ ] Focus states are visible
- [ ] Skip button is keyboard accessible

#### 7.6 Lint & TypeCheck
- [ ] Run `pnpm lint` - fix all errors
- [ ] Run `pnpm typecheck` - fix all type errors
- [ ] Ensure no console errors in browser

#### 7.7 Documentation Update
- [ ] Update CLAUDE.md with voice conversation changes
- [ ] Document new environment variables (if any)
- [ ] Add troubleshooting section for common voice issues

**Completion Criteria**:
- ✅ Works in Chrome, Edge, Safari
- ✅ Responsive on all screen sizes
- ✅ No lint or TypeScript errors
- ✅ Error handling is robust
- ✅ Accessibility basics are met

---

## Implementation Order (Recommended)

1. **Phase 0** (Verification) - Do this FIRST to establish baseline
2. **Phase 1** (System Prompt) - Critical fix, quick win
3. **Phase 3** (Auto-Greeting) - Depends on Phase 1, improves UX immediately
4. **Phase 2** (Contact Form) - Can be done in parallel with Phase 3
5. **Phase 4** (UI Improvements) - After core functionality is solid
6. **Phase 5** (Background Audio) - Nice-to-have, do last
7. **Phase 6** (DB Verification) - After all changes, ensure logging works
8. **Phase 7** (Final Polish) - Before shipping

---

## Rollback Plan

If any phase causes issues:

### Phase 1 (System Prompt)
- Revert to original prompt in git history
- Keep backup of working prompt in comments

### Phase 2 (Contact Form)
- Add feature flag: `ENABLE_VOICE_INITIAL_FORM=false` in env
- Fall back to old behavior (no form, direct connection)

### Phase 3 (Auto-Greeting)
- Add feature flag: `ENABLE_VOICE_AUTO_GREETING=false`
- Restore "tap to speak" instruction

### Phase 4 (UI Improvements)
- Remove visualizer/particles if causing performance issues
- Keep original animations as fallback

### Phase 5 (Background Audio)
- Feature is opt-in, can be disabled by default
- No rollback needed

---

## Testing Checklist

After completing all phases:

- [ ] Voice modal opens smoothly
- [ ] Form appears first (or can be skipped)
- [ ] Email validation works
- [ ] Form data is saved to database
- [ ] Voice connection succeeds
- [ ] AI greets user automatically (personalized if name given)
- [ ] AI does NOT speak system instructions
- [ ] Conversation flows naturally
- [ ] Voice visualizer shows real-time audio
- [ ] Particle effects appear during AI speaking
- [ ] Ambient audio toggle works (if enabled)
- [ ] User can interrupt AI at any time
- [ ] Conversation is logged to database
- [ ] Lead is linked to conversation
- [ ] Admin dashboard shows conversation
- [ ] Modal closes cleanly
- [ ] No memory leaks or console errors
- [ ] Works in Chrome, Edge, Safari
- [ ] Responsive on mobile/tablet/desktop

---

## Success Metrics

After deployment, monitor:

- **Lead Capture Rate**: % of voice users who submit form
- **Conversation Completion**: % of users who have >3 turns
- **Average Duration**: Mean conversation length in seconds
- **Bounce Rate**: % of users who close within 10 seconds
- **System Prompt Issues**: # of times AI speaks instructions (should be 0)
- **Connection Success**: % of successful WebRTC connections
- **User Feedback**: Qualitative feedback on voice experience

**Target Metrics**:
- Lead capture rate: >30%
- Conversation completion: >60%
- Average duration: >60 seconds
- Bounce rate: <20%
- System prompt issues: 0
- Connection success: >95%
