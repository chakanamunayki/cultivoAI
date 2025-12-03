# CultivoAI Brutalist Landing Page - Implementation Plan

**Created:** December 3, 2024
**Status:** Ready for Implementation

---

## Overview

Migrate the Brutalist landing page template from `docs/template/App.tsx` to replace the current boilerplate homepage, while preserving authentication, database integration, and adding a sophisticated AI chatbot that acts as a sales representative.

---

## Key Decisions

| Decision | Choice |
|----------|--------|
| Page Structure | **Replace homepage** - Landing becomes root (/), keep dashboard/chat/profile |
| Authentication | **Keep BetterAuth** - Users can sign in, conversations saved to DB |
| Contact Form | **Popup modal** - Encourage chatbot usage as primary lead capture |
| AI Providers | **Both** - Gemini for chat widget (function calling), OpenRouter for other AI features |
| Design | **Brutalist ONLY** - No theme switching, no dark mode |
| Language | **ES/EN** - Browser detection + manual toggle |

---

## Phase 1: Foundation Setup

### 1.1 Install Dependencies

```bash
pnpm add @google/genai
```

### 1.2 Update Environment Variables

**File: `.env.local`** (add)
```env
GEMINI_API_KEY=your-gemini-api-key
```

### 1.3 Update Tailwind/CSS

**File: `src/app/globals.css`** - Replace with Brutalist theme

**Changes:**
- Remove dark mode CSS variables
- Add Brutalist color palette (#FFC805, #FFDE00, #A855F7, #10B981)
- Add marquee animation keyframes
- Add selection styling (yellow background)
- Keep existing utility imports

### 1.4 Update Root Layout

**File: `src/app/layout.tsx`**

**Changes:**
- Add Space Grotesk, Inter, JetBrains Mono fonts via `next/font/google`
- Remove ThemeProvider (no dark mode)
- Remove SiteHeader/SiteFooter (Brutalist has its own)
- Keep Toaster for notifications
- Add LanguageProvider wrapper

---

## Phase 2: Content Architecture

### 2.1 Create Content Directory

```
src/content/
├── types.ts      # TypeScript interfaces
├── es.ts         # Spanish content (primary)
├── en.ts         # English content
└── index.ts      # Language context & hooks
```

### 2.2 Content Types

**File: `src/content/types.ts`**

Define interfaces for:
- `NavItem`, `HeroCopy`, `Service`, `Project`, `Partnership`
- `UseCase`, `Step`, `RealStory`, `SemillaContent`, `WhyUs`
- `SiteContent` (combines all)

### 2.3 Extract Content from Template

**Source:** `docs/template/App.tsx` lines 50-400 (data constants)
**Source:** `docs/project_info/sections.md` (bilingual content)

**Files to create:**
- `src/content/es.ts` - Spanish (extract from template)
- `src/content/en.ts` - English (from sections.md)

### 2.4 Language Provider

**File: `src/components/providers/language-provider.tsx`**

- Client component with context
- Browser language detection (`navigator.language`)
- localStorage persistence
- Manual toggle support

---

## Phase 3: Component Architecture

### 3.1 Directory Structure

```
src/components/
├── landing/
│   ├── layout/
│   │   ├── marquee.tsx           # Top scrolling banner
│   │   ├── nav.tsx               # Sticky navigation + language toggle
│   │   └── footer.tsx            # Brutalist footer
│   │
│   ├── sections/
│   │   ├── hero-section.tsx      # Hero with CTAs
│   │   ├── about-section.tsx     # Team (Paul & Rocky)
│   │   ├── why-us-section.tsx    # NOT vs YES contrast
│   │   ├── services-section.tsx  # Service grid
│   │   ├── demos-section.tsx     # AI use case demos
│   │   ├── semilla-section.tsx   # Rocky's fund
│   │   ├── partnerships-section.tsx
│   │   ├── projects-section.tsx  # Portfolio
│   │   └── stories-section.tsx   # Testimonials
│   │
│   ├── ui/
│   │   ├── reveal.tsx            # Scroll animation (IntersectionObserver)
│   │   ├── modal.tsx             # Brutalist modal wrapper
│   │   ├── modal-provider.tsx    # Modal state context
│   │   ├── project-modal.tsx     # Project detail content
│   │   ├── service-modal.tsx     # Service detail content
│   │   ├── partnership-modal.tsx # Partnership detail content
│   │   └── contact-modal.tsx     # Contact form popup
│   │
│   ├── demos/
│   │   ├── chat-view.tsx         # Chat simulation
│   │   ├── crm-view.tsx          # CRM pipeline
│   │   ├── code-view.tsx         # Code editor
│   │   ├── dashboard-view.tsx    # Analytics dashboard
│   │   └── mobile-view.tsx       # Mobile app
│   │
│   └── chat/
│       ├── ai-chat-widget.tsx    # Floating Gemini chat (Client)
│       └── chat-message.tsx      # Message bubble component
│
├── providers/
│   └── language-provider.tsx
│
└── auth/                         # Keep existing auth components
```

### 3.2 Component Types

**Server Components:**
- `footer.tsx` (static)
- Section wrappers that just render children

**Client Components ("use client"):**
- Everything with state, effects, or event handlers
- All sections (for Reveal animations and interactivity)
- `reveal.tsx`, `modal.tsx`, `ai-chat-widget.tsx`
- All demo views

---

## Phase 4: AI Chat Integration (Gemini)

### 4.1 API Route

**File: `src/app/api/gemini/chat/route.ts`**

```typescript
// POST handler for Gemini chat
// - Accepts messages array + language
// - Uses function calling (navigate, show_project, show_service, capture_lead)
// - Saves conversations to DB if user authenticated
// - Returns response with any function calls
```

**Function Declarations:**
1. `navigate_to_section(section_id)` - Scroll to section
2. `show_project_details(project_title)` - Open project modal
3. `show_service_details(service_title)` - Open service modal
4. `capture_lead_info(name, email, interest, notes)` - **NEW** - Sales lead capture

### 4.2 System Instruction

The AI acts as a **sales representative**:
- Warm, helpful, bilingual (ES/EN)
- Knows all services, projects, pricing models
- Asks qualifying questions
- Captures lead info via function calling
- Guides users to relevant sections
- Promotes Rocky's Semilla fund

### 4.3 Chat Widget Component

**File: `src/components/landing/chat/ai-chat-widget.tsx`**

- Fixed position bottom-right
- Brutalist styling (4px borders, hard shadows)
- Manages chat state
- Calls `/api/gemini/chat`
- Executes function calls (navigate, open modals, capture leads)
- Auto-saves conversations to DB when user logged in

### 4.4 Database Integration

**Existing tables in `src/lib/schema.ts`:**
- `chatConversations` - Session-level data
- `chatMessages` - Individual messages
- `leads` - Captured lead information

**Flow:**
1. User starts chat → create conversation (anonymous or linked to user)
2. Each message → save to chatMessages
3. Lead capture function → insert into leads table
4. If user signs in later → link anonymous conversation to user

---

## Phase 5: Authentication Integration

### 5.1 Keep BetterAuth

The existing auth system stays:
- Google OAuth sign-in
- Session management
- User profile

### 5.2 Auth in Landing Page

**Nav component:**
- Show sign-in button if not authenticated
- Show user avatar/dropdown if authenticated
- Language toggle always visible

**Chat widget:**
- Works for anonymous users (conversations not saved)
- If authenticated, conversations persist to DB
- Prompt to sign in for conversation history

---

## Phase 6: Forms & Lead Capture

### 6.1 Contact Modal (Popup)

**File: `src/components/landing/ui/contact-modal.tsx`**

- Triggered by "Hablemos" / "Let's Talk" CTA buttons
- Brutalist styled form
- Fields: name, email, WhatsApp, project type, description
- Server action submission
- Encourages chatbot: "Prefer to chat? Our AI assistant can help!"

### 6.2 Semilla Form

**File: `src/components/landing/sections/semilla-section.tsx`**

- Inline form in Semilla section
- Fields: name, email, description
- For small project proposals

### 6.3 Server Actions

**File: `src/app/actions/leads.ts`**
```typescript
"use server"
export async function submitContactForm(formData: FormData)
export async function submitSemillaProposal(formData: FormData)
export async function captureLeadFromChat(data: LeadData)
```

---

## Phase 7: Page Assembly

### 7.1 Root Page

**File: `src/app/page.tsx`** (replace existing)

```typescript
import { Marquee } from "@/components/landing/layout/marquee";
import { Nav } from "@/components/landing/layout/nav";
import { HeroSection } from "@/components/landing/sections/hero-section";
// ... all sections
import { Footer } from "@/components/landing/layout/footer";
import { AIChatWidget } from "@/components/landing/chat/ai-chat-widget";
import { ModalProvider } from "@/components/landing/ui/modal-provider";
import { ContactModal } from "@/components/landing/ui/contact-modal";

export default function HomePage() {
  return (
    <ModalProvider>
      <div className="min-h-full bg-[#F3F4F6] text-black font-grotesk selection:bg-[#FFDE00] selection:text-black">
        <Marquee />
        <Nav />
        <main>
          <HeroSection />
          <AboutSection />
          <WhyUsSection />
          <ServicesSection />
          <DemosSection />
          <SemillaSection />
          <PartnershipsSection />
          <ProjectsSection />
          <StoriesSection />
        </main>
        <Footer />
        <AIChatWidget />
        <ContactModal />
      </div>
    </ModalProvider>
  );
}
```

### 7.2 Keep Existing App Routes

**Keep ALL existing routes:**
- `src/app/dashboard/` - User dashboard (may enhance later)
- `src/app/chat/` - Full chat interface (may enhance later)
- `src/app/profile/` - User profile
- `src/app/api/auth/` - BetterAuth routes
- `src/app/api/chat/` - OpenRouter chat API
- `src/components/auth/` - Auth components

**Remove only unused boilerplate components:**
- `src/components/setup-checklist.tsx` (onboarding wizard)
- `src/components/starter-prompt-modal.tsx` (AI prompts modal)

**Modify (not delete):**
- `src/components/theme-provider.tsx` - Remove or simplify (no dark mode on landing)
- `src/components/ui/mode-toggle.tsx` - Remove from landing page only

---

## Phase 8: Implementation Order

### Week 1: Foundation & Content

| Day | Tasks |
|-----|-------|
| 1 | Install deps, update globals.css, configure fonts in layout |
| 2 | Create content types, extract Spanish content from template |
| 3 | Create English content from sections.md, build LanguageProvider |
| 4 | Build Reveal component, Modal system, ModalProvider |
| 5 | Build Marquee, Nav (with auth + language toggle) |

### Week 2: Sections

| Day | Tasks |
|-----|-------|
| 6 | HeroSection, AboutSection |
| 7 | WhyUsSection, ServicesSection + ServiceModal |
| 8 | DemosSection + all 5 demo view components |
| 9 | SemillaSection (with form), PartnershipsSection + modal |
| 10 | ProjectsSection + modal, StoriesSection, Footer |

### Week 3: AI Chat & Polish

| Day | Tasks |
|-----|-------|
| 11 | Gemini API route with function calling |
| 12 | AIChatWidget component (Brutalist styling) |
| 13 | Chat DB integration, lead capture function |
| 14 | ContactModal, server actions, form validation |
| 15 | Final assembly, testing, lint/typecheck |

---

## Critical Files Reference

### Template Source (COPY EXACTLY)
- `docs/template/App.tsx` lines 1372-1946 → BrutalistDesign component
- `docs/template/App.tsx` lines 464-742 → AIChatWidget
- `docs/template/App.tsx` lines 50-400 → Data constants (SERVICES, PROJECTS, etc.)
- `docs/template/App.tsx` lines 750-1135 → Modal components
- `docs/template/App.tsx` lines 1135-1312 → AIUseCases + demo views

### Content Source
- `docs/project_info/sections.md` → All bilingual copy

### Files to Modify
- `src/app/globals.css` → Brutalist theme
- `src/app/layout.tsx` → Fonts, remove dark mode
- `src/app/page.tsx` → Replace with landing page

### Files to Create
- `src/content/*.ts` → Content system
- `src/components/landing/**/*.tsx` → All landing components
- `src/components/providers/language-provider.tsx`
- `src/app/api/gemini/chat/route.ts`
- `src/app/actions/leads.ts`

### Files to Remove (minimal)
- `src/components/setup-checklist.tsx` (boilerplate onboarding)
- `src/components/starter-prompt-modal.tsx` (boilerplate prompts)

### Files to Keep (DO NOT DELETE)
- `src/app/dashboard/` - Keep for future use
- `src/app/chat/` - Keep for full chat experience
- `src/app/profile/` - User profile management
- `src/components/theme-provider.tsx` - May need for other pages
- `src/components/ui/mode-toggle.tsx` - May need for other pages

---

## Design Rules Checklist

When implementing each component, verify:

- [ ] 4px black borders (`border-4 border-black`)
- [ ] Hard shadows (`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`)
- [ ] Colors match exactly (#FFC805, #FFDE00, #A855F7, #10B981, #F3F4F6)
- [ ] Uppercase headings with `font-black`
- [ ] Space Grotesk font family
- [ ] Hover effects preserved (translate, shadow reduction, color change)
- [ ] Reveal animations working (opacity + translate-y)
- [ ] Section IDs match for navigation (hero, about, services, etc.)
- [ ] No rounded corners on main elements
- [ ] Selection styling (yellow background, black text)

---

## Success Criteria

1. **Visual parity** - Landing page looks identical to template
2. **Bilingual** - ES/EN switching works, content displays correctly
3. **AI Chat** - Gemini chat works, function calling navigates/opens modals
4. **Lead capture** - Chatbot captures leads, saves to DB
5. **Auth integration** - Users can sign in, conversations persist
6. **Forms** - Contact modal and Semilla form submit to DB
7. **Performance** - Page loads fast, animations smooth
8. **Clean code** - `pnpm lint && pnpm typecheck` passes
