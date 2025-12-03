# Phase 2: Content Alignment & Optimization - Implementation Plan

**Created:** December 3, 2024
**Status:** In Progress

---

## CRITICAL DESIGN RULES

**DO NOT DEVIATE FROM EXISTING BRUTALIST DESIGN**

- Copy existing component patterns exactly
- Use same colors: `#FFC805`, `#FFDE00`, `#A855F7`, `#10B981`, `#F3F4F6`
- Use same borders: `border-4 border-black`
- Use same shadows: `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`
- Use same fonts: `font-grotesk`, `font-bold`, `font-black`, `uppercase`
- Use same hover effects: `hover:-translate-y-1`, shadow reduction
- Reference existing sections as templates for new sections
- NO new design patterns, NO new color schemes, NO creative liberties

---

## Phase Overview

| Phase | Focus | Priority |
|-------|-------|----------|
| 2A | Chatbot-First UX | HIGH |
| 2B | New Sections | HIGH |
| 2C | Navigation & Footer | MEDIUM |
| 2D | Performance Optimization | HIGH |

---

## Phase 2A: Chatbot-First UX

**Goal:** Make chatbot the primary conversion path with contextual greetings.

### Tasks

#### 2A.1 - Chat Context System
- [x] Define `ChatContext` type in `src/content/types.ts`
- [x] Add context parameter to `AIChatWidget` component props
- [x] Create context-to-greeting mapping for each context type
- [x] Update chat widget to display contextual greeting when opened with context

#### 2A.2 - Update CTA Buttons to Open Chat
- [x] Modify `HeroSection` - "Agenda 15 minutos" opens chat with booking context
- [x] Modify `HeroSection` - "Conoce nuestra historia" opens chat with story context
- [x] Modify `SemillaSection` - "Proponer Proyecto" opens chat with semilla context
- [x] Modify `ServicesSection` - "Agenda 15 Minutos" CTA opens chat with booking context
- [x] Modify `PartnershipsSection` - "Presupuesto Limitado? Hablemos" CTA opens chat with general context
- [x] Modify `Footer` - CTA opens chat with general context

#### 2A.3 - Form Modal Fallback
- [x] Add "Prefer a form?" icon button in chat widget header
- [x] Ensure contact modal can still be opened via this fallback
- [x] Keep existing contact modal functionality intact

#### 2A.4 - WhatsApp Integration in Chat
- [ ] Add WhatsApp Business number to environment/config (DEFERRED to next phase)
- [ ] Update chat system prompt to offer WhatsApp for direct contact (DEFERRED)
- [ ] Add function call `offer_whatsapp_contact()` to provide number when appropriate (DEFERRED)

#### 2A.5 - Contextual Greetings Content
- [x] Add Spanish contextual greetings to `src/content/es.ts`
- [x] Add English contextual greetings to `src/content/en.ts`

**Contextual Greetings Map:**

| Context | Spanish Greeting | English Greeting |
|---------|------------------|------------------|
| booking | "Hola! Veo que quieres agendar tiempo con Paul..." | "Hi! I see you want to book time with Paul..." |
| story | "Hola! Te cuento sobre nuestra historia..." | "Hi! Let me tell you about our story..." |
| semilla | "Hey! Soy Rocky (bueno, la version IA)..." | "Hey! I'm Rocky (well, the AI version)..." |
| service | "Hola! Te interesa {service}..." | "Hi! You're interested in {service}..." |
| partnership | "Hola! Quieres saber mas sobre {model}..." | "Hi! You want to know more about {model}..." |
| general | Default welcome message | Default welcome message |
| qualification | "Hola! Veamos si somos el fit correcto..." | "Hi! Let's see if we're the right fit..." |

---

## Phase 2B: New Sections

**Goal:** Add "Who We Help" and "What Happens Next" sections.

### Tasks

#### 2B.1 - Content Types
- [ ] Add `WhoWeHelpContent` interface to `src/content/types.ts`
- [ ] Add `WhatHappensNextContent` interface to `src/content/types.ts`
- [ ] Update `SiteContent` interface to include new content types

#### 2B.2 - Spanish Content
- [ ] Add `whoWeHelp` content to `src/content/es.ts` (from sections.md Section 8)
- [ ] Add `whatHappensNext` content to `src/content/es.ts` (from sections.md Section 14)

#### 2B.3 - English Content
- [ ] Add `whoWeHelp` content to `src/content/en.ts` (from sections.md Section 8)
- [ ] Add `whatHappensNext` content to `src/content/en.ts` (from sections.md Section 14)

#### 2B.4 - Who We Help Section Component
- [ ] Create `src/components/landing/sections/who-we-help-section.tsx`
- [ ] Implement "Ideal for you if..." list with checkmark icons
- [ ] Implement "Not ideal if..." list with X icons
- [ ] Implement "Sectors we love" grid with sector cards
- [ ] Add CTA button that opens chat with qualification context
- [ ] Apply Brutalist styling (4px borders, hard shadows, uppercase headings)
- [ ] Wrap content in `Reveal` component for scroll animation

#### 2B.5 - What Happens Next Section Component
- [ ] Create `src/components/landing/sections/what-happens-next-section.tsx`
- [ ] Implement numbered step visualization (1-5)
- [ ] Each step shows number, title, and description
- [ ] Add CTA button that opens chat
- [ ] Apply Brutalist styling
- [ ] Wrap content in `Reveal` component

#### 2B.6 - Integrate New Sections into Page
- [ ] Import new sections in `src/app/page.tsx`
- [ ] Add `WhoWeHelpSection` after `DemosSection` (or appropriate position)
- [ ] Add `WhatHappensNextSection` before `Footer` (or after Stories)
- [ ] Add section IDs for navigation anchors
- [ ] Update nav items in content files if needed

---

## Phase 2C: Navigation & Footer Updates

**Goal:** Add chat CTA to nav, enhance footer with social/contact links.

### Tasks

#### 2C.1 - Navigation CTA Button
- [ ] Add "Hablemos" / "Let's Talk" button to `Nav` component
- [ ] Style as prominent CTA (yellow background, black border)
- [ ] Wire button to open chat widget with general context
- [ ] Ensure button is visible on both mobile and desktop
- [ ] Position: right side of nav, before language toggle

#### 2C.2 - Navigation Items Update
- [ ] Add "Contacto" nav item to content files
- [ ] Wire to scroll to footer or open chat (decide which)

#### 2C.3 - Footer Social Links
- [ ] Create social links data structure in content files
- [ ] Add LinkedIn icon/link (Paul's profile - URL placeholder until provided)
- [ ] Add WhatsApp icon/link (Business number - placeholder until provided)
- [ ] Add Instagram icon with "Coming Soon" tooltip or disabled state
- [ ] Add Facebook icon with "Coming Soon" tooltip or disabled state

#### 2C.4 - Footer Contact Info
- [ ] Add email display: hola@cultivoai.co
- [ ] Add WhatsApp number display
- [ ] Style as clickable links (mailto:, wa.me/)

#### 2C.5 - Footer Quick Links
- [ ] Add quick links column with all section anchors
- [ ] Links: Inicio, Nosotros, Servicios, Demos, Semilla, Alianzas, Proyectos, Historias
- [ ] Ensure smooth scroll behavior on click

#### 2C.6 - Footer Layout Update
- [ ] Restructure footer to multi-column layout:
  - Column 1: Logo + tagline + location
  - Column 2: Quick links
  - Column 3: Social + Contact
- [ ] Maintain Brutalist styling
- [ ] Ensure responsive layout (stacked on mobile)

---

## Phase 2D: Performance Optimization

**Goal:** Optimize page load and runtime performance for long-scrolling page.

### Tasks

#### 2D.1 - Lazy Load Sections
- [ ] Install `react-intersection-observer` if not present
- [ ] Create `LazySection` wrapper component
- [ ] Convert below-fold sections to lazy load:
  - [ ] `WhyUsSection`
  - [ ] `ServicesSection`
  - [ ] `DemosSection`
  - [ ] `WhoWeHelpSection`
  - [ ] `SemillaSection`
  - [ ] `PartnershipsSection`
  - [ ] `ProjectsSection`
  - [ ] `StoriesSection`
  - [ ] `WhatHappensNextSection`
- [ ] Keep above-fold sections eager: `HeroSection`, `AboutSection`

#### 2D.2 - Chat Widget Lazy Loading
- [ ] Convert `AIChatWidget` to dynamic import
- [ ] Load chat widget after initial page paint (2-3 second delay)
- [ ] Or load on first user interaction (scroll past hero / click CTA)
- [ ] Show minimal chat button placeholder until loaded

#### 2D.3 - Image Optimization
- [ ] Audit all `<img>` tags in landing components
- [ ] Convert to Next.js `<Image>` component
- [ ] Add `width`, `height`, and `alt` to all images
- [ ] Add `placeholder="blur"` with `blurDataURL` for hero images
- [ ] Use `sizes` prop for responsive images
- [ ] Consider WebP format with fallbacks

#### 2D.4 - Animation Performance
- [ ] Audit `Reveal` component for performance
- [ ] Ensure only `transform` and `opacity` are animated (GPU accelerated)
- [ ] Add `will-change: transform` hint where needed
- [ ] Consider `prefers-reduced-motion` media query support
- [ ] Test on mobile devices for jank

#### 2D.5 - Bundle Analysis
- [ ] Run `pnpm build` and check bundle size
- [ ] Identify any large dependencies that could be code-split
- [ ] Ensure no duplicate React instances
- [ ] Check for unused imports

#### 2D.6 - Performance Testing
- [ ] Run Lighthouse audit (mobile) - target score 80+
- [ ] Run Lighthouse audit (desktop) - target score 90+
- [ ] Test on throttled network (3G) for perceived performance
- [ ] Test scroll performance on mobile device

---

## Implementation Order

**Recommended sequence:**

1. **Phase 2A.1-2A.2** - Chat context system and CTA updates (foundation)
2. **Phase 2B.1-2B.3** - Content types and translations (needed for sections)
3. **Phase 2B.4-2B.6** - Build and integrate new sections
4. **Phase 2A.3-2A.5** - Form fallback and contextual greetings polish
5. **Phase 2C.1-2C.6** - Navigation and footer updates
6. **Phase 2D.1-2D.6** - Performance optimization (do last, measure impact)

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/landing/sections/who-we-help-section.tsx` | New section component |
| `src/components/landing/sections/what-happens-next-section.tsx` | New section component |
| `src/components/landing/ui/lazy-section.tsx` | Lazy loading wrapper |

## Files to Modify

| File | Changes |
|------|---------|
| `src/content/types.ts` | Add new interfaces |
| `src/content/es.ts` | Add new content sections, contextual greetings |
| `src/content/en.ts` | Add new content sections, contextual greetings |
| `src/components/landing/ai-chat-widget.tsx` | Add context prop, contextual greetings |
| `src/components/landing/sections/hero-section.tsx` | Update CTAs to open chat |
| `src/components/landing/sections/semilla-section.tsx` | Update CTA to open chat |
| `src/components/landing/sections/services-section.tsx` | Update CTAs to open chat |
| `src/components/landing/sections/partnerships-section.tsx` | Update CTAs to open chat |
| `src/components/landing/layout/nav.tsx` | Add CTA button, update nav items |
| `src/components/landing/layout/footer.tsx` | Add social links, contact info, quick links |
| `src/app/page.tsx` | Import and add new sections, lazy loading |

---

## Verification Checklist

After implementation, verify:

- [ ] All CTAs open chat widget (not form)
- [ ] Chat displays correct contextual greeting for each entry point
- [ ] "Who We Help" section renders in both ES and EN
- [ ] "What Happens Next" section renders in both ES and EN
- [ ] Nav has prominent "Hablemos" button that opens chat
- [ ] Footer has social links (LinkedIn, WhatsApp, Instagram placeholder, Facebook placeholder)
- [ ] Footer has contact info (email, WhatsApp)
- [ ] Footer has quick links column
- [ ] Form modal still accessible via fallback option
- [ ] Lazy loading working (check Network tab)
- [ ] Lighthouse mobile score >= 80
- [ ] No TypeScript errors (`pnpm typecheck`)
- [ ] No lint errors (`pnpm lint`)
- [ ] Smooth scroll animations on mobile
- [ ] All links/buttons keyboard accessible

---

## Notes

- WhatsApp Business number and Paul's LinkedIn URL are dependencies - use placeholders until provided
- Instagram/Facebook are placeholders until accounts are created
- Keep contact form modal as-is, just add fallback access point
- Maintain exact Brutalist styling from template
- Content for new sections is in `docs/project_info/sections.md`
