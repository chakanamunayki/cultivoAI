# Phase 2: Content Alignment & Optimization - Requirements

**Created:** December 3, 2024
**Status:** Approved
**Previous Phase:** Landing page implementation (Complete)

---

## Overview

Align the CultivoAI landing page with project documentation, implement chatbot-first UX strategy, add missing critical sections, and optimize performance for a long-scrolling page.

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| CTA Behavior | Chatbot-first with specific context | All CTAs open chat with contextual pre-filled messages |
| Form Modal | Keep as fallback | For users who prefer traditional forms |
| "Who We Help" Section | Add with CTA | Important for visitor self-qualification |
| Social Links | LinkedIn (Paul's profile), WhatsApp Business | Instagram/Facebook to be set up later |

---

## Functional Requirements

### FR-1: Chatbot-First UX

**FR-1.1** All primary CTA buttons must open the chat widget instead of the contact form modal.

**FR-1.2** Each CTA must pass specific context to the chat widget:

| CTA Button | Context Message |
|------------|-----------------|
| "Agenda 15 minutos con Paul" | Booking/scheduling context |
| "Conoce nuestra historia" | Story/about context |
| "Proponer Proyecto" (Semilla) | Rocky's Semilla Fund context |
| "Hablemos" (Nav/Footer) | General inquiry context |
| Service CTAs | Specific service context |
| Partnership CTAs | Partnership model context |

**FR-1.3** Chat widget must display contextual greeting based on the CTA clicked.

**FR-1.4** Contact form modal must remain accessible as a fallback option (e.g., "Prefer a form?" link).

**FR-1.5** Chat widget must be able to provide WhatsApp Business number for direct contact when requested.

### FR-2: Who We Help Section

**FR-2.1** Add new section with content from `docs/project_info/sections.md` Section 8.

**FR-2.2** Section must include:
- "Ideal for you if..." list (8 items)
- "Not ideal if..." list (6 items)
- "Sectors we love" list (5 sectors with descriptions)
- CTA button that opens chat with qualification context

**FR-2.3** Content must be bilingual (ES/EN).

### FR-3: What Happens Next Section

**FR-3.1** Add new section with content from `docs/project_info/sections.md` Section 14.

**FR-3.2** Section must include:
- 5-step process visualization
- Each step with title and description
- CTA button that opens chat

**FR-3.3** Content must be bilingual (ES/EN).

### FR-4: Navigation Updates

**FR-4.1** Add prominent "Hablemos" / "Let's Talk" CTA button to navigation.

**FR-4.2** CTA button must open chat widget (not form).

**FR-4.3** Add "Contacto" nav item that scrolls to footer or opens chat.

### FR-5: Footer Updates

**FR-5.1** Add social links section:
- LinkedIn (Paul's profile URL - to be provided)
- WhatsApp Business (number to be provided)
- Instagram placeholder (coming soon)
- Facebook placeholder (coming soon)

**FR-5.2** Add direct contact information:
- Email: hola@cultivoai.co
- WhatsApp Business number

**FR-5.3** Add quick links column with all section anchors.

---

## Non-Functional Requirements

### NFR-1: Performance

**NFR-1.1** Sections below the fold must be lazy-loaded.

**NFR-1.2** Chat widget must not block initial page load - load on demand or after page paint.

**NFR-1.3** All images must use Next.js Image component with:
- Blur placeholders
- Proper sizing (width/height)
- Responsive srcSet

**NFR-1.4** Lighthouse Performance score must remain above 80 on mobile.

### NFR-2: Mobile Experience

**NFR-2.1** All new sections must be fully responsive.

**NFR-2.2** Animations must use GPU-accelerated CSS transforms only.

**NFR-2.3** Touch targets must be minimum 44x44px.

### NFR-3: Accessibility

**NFR-3.1** All interactive elements must be keyboard accessible.

**NFR-3.2** Chat widget must be openable via keyboard.

**NFR-3.3** New sections must maintain proper heading hierarchy.

---

## Content Requirements

### New Content Types Needed

```typescript
// Add to src/content/types.ts

interface WhoWeHelpContent {
  title: string;
  idealForTitle: string;
  idealForItems: string[];
  notIdealTitle: string;
  notIdealItems: string[];
  sectorsTitle: string;
  sectors: { name: string; description: string }[];
  cta: string;
}

interface WhatHappensNextContent {
  title: string;
  steps: {
    number: number;
    title: string;
    description: string;
  }[];
  cta: string;
}

interface ChatContext {
  type: 'booking' | 'story' | 'semilla' | 'general' | 'service' | 'partnership' | 'qualification';
  serviceId?: string;
  partnershipId?: string;
}
```

### Content Sources

| Content | Source File |
|---------|-------------|
| Who We Help (ES/EN) | `docs/project_info/sections.md` Section 8 |
| What Happens Next (ES/EN) | `docs/project_info/sections.md` Section 14 |
| Chat contextual greetings | `docs/project_info/chatbot.md` |

---

## Out of Scope

- Currency selector (COP/USD/EUR) - deferred to later phase
- Values section - may add if page doesn't feel too long
- Give-Back Model section - may incorporate into About later
- Marta's extended story - content not finalized
- Legal pages (Terms, Privacy) - separate task
- Instagram/Facebook setup - pending account creation

---

## Dependencies

| Dependency | Status | Value |
|------------|--------|-------|
| Paul's LinkedIn URL | Ready | https://www.linkedin.com/in/paul-ronayne-69b37010a/ |
| WhatsApp Business number | Ready | +573106172706 |
| Email | Ready | hola@cultivoai.co |

---

## Success Criteria

1. All CTA buttons open chat with appropriate context
2. Chat displays contextual greeting based on entry point
3. "Who We Help" section renders correctly in ES/EN
4. "What Happens Next" section renders correctly in ES/EN
5. Nav includes "Hablemos" CTA button
6. Footer includes social links and contact info
7. Page maintains good performance (Lighthouse 80+)
8. `pnpm lint && pnpm typecheck` passes
