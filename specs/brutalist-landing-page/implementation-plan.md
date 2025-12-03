# CultivoAI Brutalist Landing Page - Implementation Plan

## Phase 1: Foundation Setup
**Status: COMPLETE**

- [x] Install `@google/genai` dependency
- [x] Update `src/app/globals.css` with Brutalist theme (colors, animations, selection styling)
- [x] Configure fonts in `src/app/layout.tsx` (Space Grotesk, Inter, JetBrains Mono)
- [x] Update metadata for CultivoAI
- [x] Create `src/content/types.ts` with TypeScript interfaces
- [x] Exclude `docs/` from tsconfig.json and eslint.config.mjs
- [x] Verify lint and typecheck pass

---

## Phase 2: Content Architecture
**Status: COMPLETE**

### 2.1 Spanish Content
- [x] Create `src/content/es.ts` with all Spanish content
  - Navigation items
  - Hero copy (tagline, headline, subheadline, CTAs)
  - About section (Paul & Rocky bios)
  - Why Us (NOT vs YES items)
  - Services (6 services with details)
  - Use cases (5 AI demos)
  - Semilla fund content
  - Partnerships (5 pricing models)
  - Projects (portfolio items)
  - Stories (testimonials)
  - Footer copy
  - Chat widget copy
  - Contact form labels

### 2.2 English Content
- [x] Create `src/content/en.ts` with all English content (mirror structure of es.ts)

### 2.3 Language Provider
- [x] Create `src/components/providers/language-provider.tsx`
  - React context for locale state
  - Browser language detection
  - localStorage persistence
  - Toggle function for manual switching
- [x] Create `src/hooks/use-locale.ts` hook for consuming language context
- [x] Create `src/content/index.ts` to export content getter function

### 2.4 Verification
- [x] Run `pnpm lint && pnpm typecheck`

---

## Phase 3: UI Components
**Status: COMPLETE**

### 3.1 Animation & Utility Components
- [x] Create `src/components/landing/ui/reveal.tsx` (scroll-triggered fade-in animation)
- [x] Create `src/components/landing/ui/modal.tsx` (Brutalist modal wrapper)
- [x] Create `src/components/landing/ui/modal-provider.tsx` (modal state context)

### 3.2 Layout Components
- [x] Create `src/components/landing/layout/marquee.tsx` (scrolling top banner)
- [x] Create `src/components/landing/layout/nav.tsx` (sticky nav with auth + language toggle)
- [x] Create `src/components/landing/layout/footer.tsx` (Brutalist footer)

### 3.3 Modal Content Components
- [x] Create `src/components/landing/ui/project-modal.tsx`
- [x] Create `src/components/landing/ui/service-modal.tsx`
- [x] Create `src/components/landing/ui/partnership-modal.tsx`
- [x] Create `src/components/landing/ui/contact-modal.tsx`

### 3.4 Verification
- [x] Run `pnpm lint && pnpm typecheck`

---

## Phase 4: Landing Page Sections
**Status: PENDING**

### 4.1 Core Sections
- [ ] Create `src/components/landing/sections/hero-section.tsx`
- [ ] Create `src/components/landing/sections/about-section.tsx`
- [ ] Create `src/components/landing/sections/why-us-section.tsx`
- [ ] Create `src/components/landing/sections/services-section.tsx`
- [ ] Create `src/components/landing/sections/semilla-section.tsx` (with inline form)
- [ ] Create `src/components/landing/sections/partnerships-section.tsx`
- [ ] Create `src/components/landing/sections/projects-section.tsx`
- [ ] Create `src/components/landing/sections/stories-section.tsx`

### 4.2 AI Demo Section
- [ ] Create `src/components/landing/sections/demos-section.tsx`
- [ ] Create `src/components/landing/demos/chat-view.tsx`
- [ ] Create `src/components/landing/demos/crm-view.tsx`
- [ ] Create `src/components/landing/demos/code-view.tsx`
- [ ] Create `src/components/landing/demos/dashboard-view.tsx`
- [ ] Create `src/components/landing/demos/mobile-view.tsx`

### 4.3 Verification
- [ ] Run `pnpm lint && pnpm typecheck`

---

## Phase 5: AI Chat Integration
**Status: PENDING**

### 5.1 Gemini API Route
- [ ] Create `src/app/api/gemini/chat/route.ts`
  - POST handler for chat messages
  - System instruction (bilingual sales rep persona)
  - Function declarations (navigate, show_project, show_service, capture_lead)
  - Response handling with function call results

### 5.2 Chat Widget Component
- [ ] Create `src/components/landing/chat/chat-message.tsx` (message bubble)
- [ ] Create `src/components/landing/chat/ai-chat-widget.tsx`
  - Floating widget with Brutalist styling
  - Message history state
  - API integration
  - Function call execution (scroll, open modals)
  - Typing indicator

### 5.3 Database Integration
- [ ] Add Gemini chat tables to schema if needed (or reuse existing chat tables)
- [ ] Implement conversation persistence for authenticated users
- [ ] Implement lead capture function

### 5.4 Verification
- [ ] Run `pnpm lint && pnpm typecheck`

---

## Phase 6: Forms & Lead Capture
**Status: PENDING**

### 6.1 Server Actions
- [ ] Create `src/app/actions/leads.ts`
  - `submitContactForm(formData)` - Contact modal submission
  - `submitSemillaProposal(formData)` - Semilla form submission
  - `captureLeadFromChat(data)` - Chatbot lead capture

### 6.2 Form Components
- [ ] Update contact modal with form fields and validation
- [ ] Update Semilla section with inline form
- [ ] Add form submission feedback (toast notifications)

### 6.3 Verification
- [ ] Run `pnpm lint && pnpm typecheck`

---

## Phase 7: Page Assembly & Cleanup
**Status: PENDING**

### 7.1 Landing Page
- [ ] Replace `src/app/page.tsx` with landing page assembly
  - Import all sections
  - Wrap with ModalProvider and LanguageProvider
  - Add AIChatWidget
  - Add ContactModal

### 7.2 Layout Updates
- [ ] Update `src/app/layout.tsx` to conditionally show SiteHeader/SiteFooter
  - Landing page uses its own Nav/Footer
  - Dashboard/chat/profile pages use existing SiteHeader/SiteFooter

### 7.3 Cleanup
- [ ] Remove unused boilerplate components (setup-checklist, starter-prompt-modal)
- [ ] Verify all existing routes still work (/dashboard, /chat, /profile)

### 7.4 Final Verification
- [ ] Run `pnpm lint && pnpm typecheck`
- [ ] Visual review of all sections
- [ ] Test language switching
- [ ] Test chat widget functionality
- [ ] Test form submissions
- [ ] Test authentication flow

---

## File Structure (Final)

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/route.ts     # Existing
│   │   ├── chat/route.ts              # Existing (OpenRouter)
│   │   └── gemini/chat/route.ts       # NEW
│   ├── actions/
│   │   └── leads.ts                   # NEW
│   ├── globals.css                    # UPDATED (Phase 1)
│   ├── layout.tsx                     # UPDATED (Phase 1)
│   └── page.tsx                       # REPLACED (Phase 7)
├── components/
│   ├── landing/
│   │   ├── layout/
│   │   │   ├── marquee.tsx
│   │   │   ├── nav.tsx
│   │   │   └── footer.tsx
│   │   ├── sections/
│   │   │   ├── hero-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── why-us-section.tsx
│   │   │   ├── services-section.tsx
│   │   │   ├── demos-section.tsx
│   │   │   ├── semilla-section.tsx
│   │   │   ├── partnerships-section.tsx
│   │   │   ├── projects-section.tsx
│   │   │   └── stories-section.tsx
│   │   ├── demos/
│   │   │   ├── chat-view.tsx
│   │   │   ├── crm-view.tsx
│   │   │   ├── code-view.tsx
│   │   │   ├── dashboard-view.tsx
│   │   │   └── mobile-view.tsx
│   │   ├── ui/
│   │   │   ├── reveal.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── modal-provider.tsx
│   │   │   ├── project-modal.tsx
│   │   │   ├── service-modal.tsx
│   │   │   ├── partnership-modal.tsx
│   │   │   └── contact-modal.tsx
│   │   └── chat/
│   │       ├── ai-chat-widget.tsx
│   │       └── chat-message.tsx
│   └── providers/
│       └── language-provider.tsx      # DONE (Phase 2)
├── content/
│   ├── types.ts                       # DONE (Phase 1)
│   ├── es.ts                          # DONE (Phase 2)
│   ├── en.ts                          # DONE (Phase 2)
│   └── index.ts                       # DONE (Phase 2)
└── hooks/
    └── use-locale.ts                  # DONE (Phase 2)
```

---

## Critical Design Rules

When implementing each component, verify:

- [ ] 4px black borders (`border-4 border-black`)
- [ ] Hard shadows (`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`)
- [ ] Colors match exactly (#FFC805, #FFDE00, #A855F7, #10B981, #F3F4F6)
- [ ] Uppercase headings with `font-black`
- [ ] Space Grotesk font family for headings
- [ ] Hover effects preserved (translate, shadow reduction, color change)
- [ ] Reveal animations working (opacity + translate-y)
- [ ] Section IDs match for navigation (hero, about, services, demos, semilla, partnerships, projects, stories)
- [ ] No rounded corners on main elements
- [ ] Selection styling (yellow background, black text)
