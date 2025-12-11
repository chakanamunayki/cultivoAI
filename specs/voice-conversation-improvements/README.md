# Voice Conversation Improvements

## Quick Summary

This spec addresses critical improvements to the CultivoAI voice conversation feature to make it production-ready for showcasing to potential clients.

## Current Issues

1. **AI Speaking Instructions** - AI reads out its own system prompt ("CRITICO - Respuestas Cortas...") ❌
2. **Poor UX Flow** - User clicks voice → then has to click "Ready" → conversation starts (too much friction) ❌
3. **Contact Form Timing** - Unclear when to capture name/email/phone ❓
4. **Basic UI** - Static animations, no voice visualizer, not "wow" enough for demos ⚠️
5. **No Background Audio** - Missing ambient soundscape for professional feel ⚠️
6. **Database Uncertainty** - Need to verify conversations are being saved ❓

## Proposed Solutions

### 🔴 Critical (Must Have)
- **Phase 1**: Fix system prompt (stop AI from speaking instructions)
- **Phase 3**: Auto-greeting (AI speaks first, remove "Ready" button)

### 🟡 High Priority (Should Have)
- **Phase 2**: Contact form at start (with skip option)
- **Phase 0**: Verify database logging is working

### 🟢 Nice to Have (Could Have)
- **Phase 4**: Modern UI (voice visualizer, particles, smooth animations)
- **Phase 5**: Background ambient audio (optional)

## Implementation Order

**Recommended sequence** (following best practices):

1. **Phase 0** - Verify database (30 min) ✅ Establish baseline
2. **Phase 1** - Fix system prompt (1-2 hours) ✅ Quick critical win
3. **Phase 3** - Auto-greeting (2-3 hours) ✅ Immediate UX improvement
4. **Phase 2** - Contact form (3-4 hours) ✅ Lead capture enhancement
5. **Phase 4** - UI polish (4-6 hours) ⭐ Visual wow factor
6. **Phase 5** - Background audio (2-3 hours) 🎵 Optional enhancement
7. **Phase 6** - DB verification (1 hour) ✅ Confirm all logging works
8. **Phase 7** - Final QA (2-3 hours) 🧪 Testing and polish

**Total Estimated Time**: 15-22 hours

## Files to be Modified

### Core Logic
- `src/lib/chat/system-prompt.ts` - Fix voice prompt
- `src/components/landing/voice-conversation-mode.tsx` - Main UI component
- `src/hooks/use-gemini-live.ts` - WebRTC/SDK hook

### New Components (to create)
- `src/components/landing/voice-visualizer.tsx` - Real-time audio visualization
- `src/components/landing/particle-effect.tsx` - Floating particles animation
- `src/components/landing/ambient-audio-player.tsx` - Background sound player

### Content/Config
- `src/content/es.ts` & `src/content/en.ts` - Form labels (if needed)
- `public/audio/ambient/` - Ambient audio files (new directory)

## Database Schema (Already Exists ✅)

The database schema is ready to go:
- `chatConversations` - Session-level conversation data
- `chatMessages` - Individual messages with voice metadata
- `leads` - Contact information and qualification

**Voice-specific fields already in schema**:
- `chatMessages.inputType` - "text" | "voice"
- `chatMessages.audioDurationMs` - Duration of voice message
- `chatMessages.transcriptionConfidence` - STT accuracy
- `chatConversations.entryContext` - Can be set to "voice"

## Success Criteria

### Technical
- ✅ AI never speaks system instructions
- ✅ Zero "Ready" button friction
- ✅ 100% of conversations logged to database
- ✅ Voice visualizer runs at 60fps
- ✅ No console errors or memory leaks

### User Experience
- ✅ Professional, polished appearance
- ✅ Natural phone-call feel
- ✅ Lead capture rate >30%
- ✅ Demo-ready quality

### Business
- ✅ Can confidently show to potential clients
- ✅ Demonstrates technical expertise
- ✅ Differentiates from competitors

## Next Steps

1. **Read** [requirements.md](./requirements.md) for detailed specifications
2. **Follow** [implementation-plan.md](./implementation-plan.md) phase by phase
3. **Check off** tasks as you complete them
4. **Test** thoroughly after each phase
5. **Ship** when Phase 7 (Final QA) is complete

## Questions?

- **When to show contact form?** → At start, with skip option (Phase 2)
- **Are conversations being saved?** → Need to verify in Phase 0
- **Should we keep brutalist design?** → Yes, but add modern accents (gradients, particles)
- **What about dark mode?** → No dark mode per project guidelines
- **Testing required?** → Manual QA only (no unit/e2e unless requested)

## Contact

For questions or clarification:
- Review the detailed [requirements.md](./requirements.md)
- Check the task breakdown in [implementation-plan.md](./implementation-plan.md)
- Refer to existing voice implementation in `src/components/landing/voice-conversation-mode.tsx`
