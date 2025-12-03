# CultivoAI Brutalist Landing Page - Requirements

## Overview

Migrate the Brutalist landing page template from `docs/template/App.tsx` to replace the current boilerplate homepage. CultivoAI is a bilingual (Spanish/English) AI and automation consultancy website for Paul & Rocky, a father-son duo based in Colombia.

## Core Requirements

### 1. Design System
- **Brutalist theme ONLY** - No dark mode, no theme switching
- Exact visual preservation from template (`docs/template/App.tsx` lines 1372-1946)
- 4px black borders, hard shadows (8px offset), no rounded corners
- Color palette: Yellow (#FFC805, #FFDE00), Purple (#A855F7), Green (#10B981)
- Typography: Space Grotesk (headings), Inter (body), JetBrains Mono (code)

### 2. Internationalization (i18n)
- Bilingual support: Spanish (primary) and English
- Browser language detection via `navigator.language`
- Manual language toggle (ES/EN) in navigation
- localStorage persistence for user preference
- All user-facing content must have both language versions

### 3. Page Sections
1. **Marquee** - Scrolling top banner
2. **Navigation** - Sticky nav with auth integration + language toggle
3. **Hero** - Split layout (yellow/purple) with CTAs
4. **About** - Team section (Paul & Rocky)
5. **Why Us** - Contrast section (NOT vs YES)
6. **Services** - 6 service cards with modals
7. **AI Demos** - 5 interactive use case demonstrations
8. **Semilla** - Rocky's fund initiative with form
9. **Partnerships** - 5 flexible pricing models
10. **Projects** - Portfolio with modals
11. **Stories** - Testimonials/success stories
12. **Footer** - CTA and contact info

### 4. AI Chat Widget (Gemini)
- Fixed bottom-right floating widget
- Brutalist styling matching design system
- Powered by Google Gemini (`@google/genai`)
- Function calling capabilities:
  - `navigate_to_section(section_id)` - Scroll to page sections
  - `show_project_details(project_title)` - Open project modal
  - `show_service_details(service_title)` - Open service modal
  - `capture_lead_info(name, email, interest, notes)` - Lead capture
- Acts as bilingual sales representative
- Saves conversations to database when user is authenticated

### 5. Lead Capture
- Contact modal popup (triggered by CTA buttons)
- Semilla proposal form (inline in Semilla section)
- Chat-based lead capture via function calling
- Server actions for form submission
- Database storage for leads

### 6. Authentication Integration
- Keep existing BetterAuth with Google OAuth
- Show sign-in button when not authenticated
- Show user avatar/dropdown when authenticated
- Chat conversations persist when user is logged in

### 7. Existing Routes (Preserve)
- `/dashboard` - User dashboard
- `/chat` - Full chat interface
- `/profile` - User profile
- `/api/auth/[...all]` - BetterAuth routes
- `/api/chat` - OpenRouter chat API

## Technical Constraints

- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **Package Manager**: pnpm
- **No dark mode**: Single Brutalist theme only
- **Template reference**: `docs/template/App.tsx` is source of truth
- **Content reference**: `docs/project_info/sections.md` for bilingual copy

## Success Criteria

1. Visual parity with template design
2. Bilingual ES/EN switching works correctly
3. AI chat widget functional with Gemini
4. Function calling navigates and opens modals
5. Lead capture saves to database
6. Auth integration works (sign in, conversation persistence)
7. Forms submit correctly
8. `pnpm lint && pnpm typecheck` passes
9. Smooth animations and transitions
