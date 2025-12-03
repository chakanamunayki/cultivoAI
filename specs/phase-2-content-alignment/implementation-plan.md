# Phase 2: Content Alignment & Optimization - Implementation Plan

**Created:** December 3, 2024
**Status:** COMPLETED

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

| Phase | Focus | Priority | Status |
|-------|-------|----------|--------|
| 2A | Chatbot-First UX | HIGH | ✅ COMPLETED |
| 2B | New Sections | HIGH | ✅ COMPLETED |
| 2C | Navigation & Footer | MEDIUM | ✅ COMPLETED |
| 2D | Performance Optimization | HIGH | ✅ COMPLETED |

---

## Phase 2A: Chatbot-First UX

**Goal:** Make chatbot the primary conversion path with contextual greetings.
**Status:** ✅ COMPLETED

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
- [ ] Add WhatsApp Business number to environment/config (DEFERRED to Phase 3)
- [ ] Update chat system prompt to offer WhatsApp for direct contact (DEFERRED)
- [ ] Add function call `offer_whatsapp_contact()` to provide number when appropriate (DEFERRED)

#### 2A.5 - Contextual Greetings Content
- [x] Add Spanish contextual greetings to `src/content/es.ts`
- [x] Add English contextual greetings to `src/content/en.ts`

---

## Phase 2B: New Sections

**Goal:** Add "Who We Help" and "What Happens Next" sections.
**Status:** ✅ COMPLETED

### Tasks

#### 2B.1 - Content Types
- [x] Add `WhoWeHelpContent` interface to `src/content/types.ts`
- [x] Add `WhatHappensNextContent` interface to `src/content/types.ts`
- [x] Update `SiteContent` interface to include new content types

#### 2B.2 - Spanish Content
- [x] Add `whoWeHelp` content to `src/content/es.ts`
- [x] Add `whatHappensNext` content to `src/content/es.ts`

#### 2B.3 - English Content
- [x] Add `whoWeHelp` content to `src/content/en.ts`
- [x] Add `whatHappensNext` content to `src/content/en.ts`

#### 2B.4 - Who We Help Section Component
- [x] Create `src/components/landing/sections/who-we-help-section.tsx`
- [x] Implement "Ideal for you if..." list with checkmark icons
- [x] Implement "Not ideal if..." list with X icons
- [x] Implement "Sectors we love" grid with sector cards
- [x] Add CTA button that opens chat with qualification context
- [x] Apply Brutalist styling
- [x] Wrap content in `Reveal` component for scroll animation

#### 2B.5 - What Happens Next Section Component
- [x] Create `src/components/landing/sections/what-happens-next-section.tsx`
- [x] Implement numbered step visualization (1-5)
- [x] Each step shows number, title, and description
- [x] Add CTA button that opens chat
- [x] Apply Brutalist styling
- [x] Wrap content in `Reveal` component

#### 2B.6 - Integrate New Sections into Page
- [x] Import new sections in `src/app/page.tsx`
- [x] Add `WhoWeHelpSection` after `DemosSection`
- [x] Add `WhatHappensNextSection` before `Footer`
- [x] Add section IDs for navigation anchors

---

## Phase 2C: Navigation & Footer Updates

**Goal:** Add chat CTA to nav, enhance footer with social/contact links.
**Status:** ✅ COMPLETED

### Tasks

#### 2C.1 - Navigation CTA Button
- [x] Add "Hablemos" / "Let's Talk" button to `Nav` component
- [x] Style as prominent CTA (yellow background, black border)
- [x] Wire button to open chat widget with general context
- [x] Ensure button is visible on both mobile and desktop

#### 2C.2 - Navigation Items Update
- [x] Add "Contacto" nav item to content files
- [x] Wire to scroll to footer or open chat

#### 2C.3 - Footer Social Links
- [x] Create social links data structure in content files
- [x] Add LinkedIn icon/link
- [x] Add WhatsApp icon/link
- [x] Add Instagram icon with "Coming Soon" tooltip
- [x] Add Facebook icon with "Coming Soon" tooltip

#### 2C.4 - Footer Contact Info
- [x] Add email display: hola@cultivoai.co
- [x] Add WhatsApp number display
- [x] Style as clickable links

#### 2C.5 - Footer Quick Links
- [x] Add quick links column with all section anchors
- [x] Ensure smooth scroll behavior on click

#### 2C.6 - Footer Layout Update
- [x] Restructure footer to multi-column layout
- [x] Maintain Brutalist styling
- [x] Ensure responsive layout

---

## Phase 2D: Performance Optimization

**Goal:** Optimize page load and runtime performance for long-scrolling page.
**Status:** ✅ COMPLETED

### Tasks

#### 2D.1 - Lazy Load Sections
- [x] Create `src/components/landing/ui/lazy-section.tsx` wrapper component
- [x] Convert below-fold sections to lazy load using `next/dynamic`:
  - [x] `WhyUsSection`
  - [x] `ServicesSection`
  - [x] `DemosSection`
  - [x] `WhoWeHelpSection`
  - [x] `SemillaSection`
  - [x] `PartnershipsSection`
  - [x] `ProjectsSection`
  - [x] `StoriesSection`
  - [x] `WhatHappensNextSection`
- [x] Keep above-fold sections eager: `HeroSection`, `AboutSection`

#### 2D.2 - Chat Widget Lazy Loading
- [x] Convert `AIChatWidget` to dynamic import with `ssr: false`
- [x] Load chat widget after 2.5 second delay
- [x] Load immediately on user interaction (CTA click)
- [x] Show minimal chat button placeholder until loaded

#### 2D.3 - Image Optimization
- [x] Audit all images - confirmed all use Next.js `<Image>` component
- [x] Add `priority` to hero rocket image for LCP
- [x] Add `loading="eager"` to above-fold images (About section)
- [x] Add `loading="lazy"` to below-fold images (Projects, Stories)
- [x] Enable AVIF and WebP formats in `next.config.ts`
- [x] Configure optimal device and image sizes

#### 2D.4 - Animation Performance
- [x] Audit `Reveal` component for performance
- [x] Ensure only `transform` and `opacity` are animated (GPU accelerated)
- [x] Add `will-change` hint that auto-clears after animation
- [x] Add `prefers-reduced-motion` media query support using `useSyncExternalStore`

#### 2D.5 - Bundle Analysis
- [x] Run `pnpm build` - successful
- [x] Add `optimizePackageImports` for tree-shaking:
  - [x] `lucide-react`
  - [x] `@radix-ui/react-avatar`
  - [x] `@radix-ui/react-dialog`
  - [x] `@radix-ui/react-dropdown-menu`
  - [x] `@radix-ui/react-label`
  - [x] `@radix-ui/react-slot`

#### 2D.6 - Performance Testing
- [x] Run Lighthouse audit - **Final Score: 94 Performance**
- [x] Accessibility: 94
- [x] Best Practices: 100
- [x] SEO: 100

#### 2D.7 - Additional Optimizations
- [x] Add aggressive cache headers for static assets (1 year, immutable)
- [x] Add cache headers for Next.js images
- [x] Add cache headers for fonts
- [x] Add `preconnect` hints for external image domains
- [x] Add `dns-prefetch` for faster DNS resolution

---

## Files Created

| File | Purpose |
|------|---------|
| `src/components/landing/sections/who-we-help-section.tsx` | New section component |
| `src/components/landing/sections/what-happens-next-section.tsx` | New section component |
| `src/components/landing/ui/lazy-section.tsx` | Lazy loading wrapper |

## Files Modified

| File | Changes |
|------|---------|
| `src/content/types.ts` | Added new interfaces |
| `src/content/es.ts` | Added new content sections, contextual greetings |
| `src/content/en.ts` | Added new content sections, contextual greetings |
| `src/components/landing/ai-chat-widget.tsx` | Added context prop, contextual greetings |
| `src/components/landing/sections/hero-section.tsx` | Updated CTAs, added priority image |
| `src/components/landing/sections/semilla-section.tsx` | Updated CTA to open chat |
| `src/components/landing/sections/services-section.tsx` | Updated CTAs to open chat |
| `src/components/landing/sections/partnerships-section.tsx` | Updated CTAs to open chat |
| `src/components/landing/sections/about-section.tsx` | Added eager loading to images |
| `src/components/landing/sections/projects-section.tsx` | Added lazy loading to images |
| `src/components/landing/sections/stories-section.tsx` | Added lazy loading to images |
| `src/components/landing/layout/nav.tsx` | Added CTA button, updated nav items |
| `src/components/landing/layout/footer.tsx` | Added social links, contact info, quick links |
| `src/components/landing/ui/reveal.tsx` | Added prefers-reduced-motion, will-change |
| `src/app/page.tsx` | Dynamic imports, lazy loading, chat widget delay |
| `src/app/layout.tsx` | Added preconnect hints |
| `next.config.ts` | Added image formats, cache headers, optimizePackageImports |

---

## Verification Checklist

- [x] All CTAs open chat widget (not form)
- [x] Chat displays correct contextual greeting for each entry point
- [x] "Who We Help" section renders in both ES and EN
- [x] "What Happens Next" section renders in both ES and EN
- [x] Nav has prominent "Hablemos" button that opens chat
- [x] Footer has social links (LinkedIn, WhatsApp, Instagram placeholder, Facebook placeholder)
- [x] Footer has contact info (email, WhatsApp)
- [x] Footer has quick links column
- [x] Form modal still accessible via fallback option
- [x] Lazy loading working (dynamic imports)
- [x] Lighthouse mobile score >= 80 (Achieved: **94**)
- [x] No TypeScript errors (`pnpm typecheck`)
- [x] No lint errors (`pnpm lint`)
- [x] Smooth scroll animations (GPU-accelerated)
- [x] prefers-reduced-motion support added

---

## Performance Results

| Metric | Target | Achieved |
|--------|--------|----------|
| Performance | 80+ | **94** |
| Accessibility | - | **94** |
| Best Practices | - | **100** |
| SEO | - | **100** |

---

## Notes

- WhatsApp Business number and Paul's LinkedIn URL are placeholders - update when provided
- Instagram/Facebook are placeholders until accounts are created
- Contact form modal accessible via fallback icon in chat header
- All Brutalist styling preserved exactly
