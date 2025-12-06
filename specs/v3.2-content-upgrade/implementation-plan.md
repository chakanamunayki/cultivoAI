# CultivoAI v3.2 Implementation Plan

## Pre-Implementation

- [x] Create backup of current landing page components
- [x] Create backup of current content files

---

## Phase 1: Hero Section Upgrade (HIGH PRIORITY) ✅ COMPLETED

### 1.1 Hero Text Updates ✅
- [x] Update `src/content/types.ts` - add `heroFooterBar` field to `HeroCopy`
- [x] Update `src/content/es.ts` - new hero copy + footer bar text
- [x] Update `src/content/en.ts` - new hero copy + footer bar text
- [x] Update `src/components/landing/sections/hero-section.tsx`:
  - [x] Update left panel with new simplified headline structure
  - [x] Add footer bar element at bottom of hero (full-width, below both panels)

### 1.2 Hero Animation - Growing Ecosystem Tree ✅
- [x] Create `src/components/landing/ui/growing-tree.tsx`:
  - [x] Build SVG tree structure with geometric/brutalist style
  - [x] Implement 6-stage animation sequence using CSS keyframes
  - [x] Add seed node with "Tu negocio" label
  - [x] Add 3 main branch icons (Chatbots, Automatización, Dashboards)
  - [x] Add 6 sub-branch result labels
  - [x] Add success star crown with glow effect
  - [x] Implement loop with fade transition
  - [x] Respect `prefers-reduced-motion`
- [x] Update `src/components/landing/sections/hero-section.tsx`:
  - [x] Replace purple panel content with `GrowingTree` component
  - [x] Keep purple background and existing container styling
  - [x] Remove rocket emoji and floating shapes

**Commit:** `7184fdf` feat(hero): implement Phase 1 - hero section upgrade

---

## Phase 2: Who We Are Section Update (MEDIUM PRIORITY) ✅ COMPLETED

### 2.1 Content & Types ✅
- [x] Update `src/content/types.ts`:
  - [x] Create `TeamMember` interface with full bio fields
  - [x] Update `AboutCopy` to use `TeamMember[]` array
- [x] Update `src/content/es.ts` - add Paul, Rocky, Marta full data
- [x] Update `src/content/en.ts` - add Paul, Rocky, Marta full data

### 2.2 Team Member Modal ✅
- [x] Create `src/components/landing/ui/team-member-modal.tsx`:
  - [x] Reuse existing `Modal` component wrapper
  - [x] Image header section
  - [x] Name, title, flag badges
  - [x] Bio sections (experience, projects, etc.)
  - [x] LinkedIn button
  - [x] Special sections for Rocky (Project19, Samsung video)
- [x] Update `src/components/landing/ui/modal-provider.tsx`:
  - [x] Add `openTeamMemberModal` function
  - [x] Add `teamMember` modal type
- [x] Update `src/components/landing/ui/modal-renderer.tsx`:
  - [x] Add case for `teamMember` modal type

### 2.3 About Section Updates ✅
- [x] Update `src/components/landing/sections/about-section.tsx`:
  - [x] Change grid from 2-col to 3-col (responsive)
  - [x] Add Marta card with green (#10B981) accent
  - [x] Add LinkedIn icon button to each card
  - [x] Add "Ver más" button that triggers modal
  - [x] Add footer note about technical experts
  - [x] Keep existing card styling exactly (grayscale, contrast, hover effects preserved)

### 2.4 Bug Fixes ✅
- [x] Fix hydration mismatch in `src/components/landing/layout/nav.tsx`:
  - [x] Add `isMounted` state to defer session-dependent rendering

**Note:** Hero animation (Growing Tree) from Phase 1 needs visual refinement - deferred for later.

---

## Phase 3: New Sections (MEDIUM PRIORITY) ✅ COMPLETED

### 3.1 How We Work Section ✅
- [x] Update `src/content/types.ts` - add `HowWeWorkContent` interface
- [x] Update `src/content/es.ts` - add howWeWork content (3 pillars)
- [x] Update `src/content/en.ts` - add howWeWork content (3 pillars)
- [x] Create `src/components/landing/sections/how-we-work-section.tsx`:
  - [x] Reuse existing card patterns from services/partnerships
  - [x] 2+1 layout (2 side-by-side, 1 full-width)
  - [x] Use existing `Reveal` component for animations
  - [x] Use Lucide icons (RefreshCw, Sprout, Users)
- [x] Update `src/app/page.tsx` - add section in correct order

### 3.2 What We Do Section ✅
- [x] Update `src/content/types.ts` - add `WhatWeDoContent` interface
- [x] Update `src/content/es.ts` - add whatWeDo content
- [x] Update `src/content/en.ts` - add whatWeDo content
- [x] Create `src/components/landing/sections/what-we-do-section.tsx`:
  - [x] Title + intro paragraph
  - [x] Two-column layout (Optimize | Expand)
  - [x] Bullet lists using existing styling patterns
  - [x] Services preview with links
- [x] Update `src/app/page.tsx` - add section in correct order

### 3.3 Values Section ✅
- [x] Update `src/content/types.ts` - add `Value` interface
- [x] Update `src/content/es.ts` - add 6 values
- [x] Update `src/content/en.ts` - add 6 values
- [x] Create `src/components/landing/sections/values-section.tsx`:
  - [x] 2x3 grid or stacked list layout
  - [x] Icon + title + description pattern
  - [x] Reuse existing card/list styling
- [x] Update `src/app/page.tsx` - add section in correct order

### 3.4 Mission Statement Section ✅
- [x] Update `src/content/types.ts` - add `MissionContent` interface
- [x] Update `src/content/es.ts` - add mission statement
- [x] Update `src/content/en.ts` - add mission statement
- [x] Create `src/components/landing/sections/mission-section.tsx`:
  - [x] Full-width centered text block
  - [x] Large typography
  - [x] Brutalist styling (border, shadow)
- [x] Update `src/app/page.tsx` - add section in correct order

---

## Phase 4: Existing Section Updates (LOW PRIORITY) ✅

### 4.1 Who We Help / Sectors Update ✅
- [x] Update `src/content/types.ts` - add badge and chatButtonLabel to Sector
- [x] Update `src/content/es.ts` - add badge text to sectors
- [x] Update `src/content/en.ts` - add badge text to sectors
- [x] Update `src/components/landing/sections/who-we-help-section.tsx`:
  - [x] Add "Descuentos disponibles ✓" badge to sector cards
  - [x] Add "Hablemos →" button to each card
  - [x] Wire button to open chat with sector context

### 4.2 Services Section Updates ✅
- [x] Update `src/content/types.ts` - add pricing field to Service
- [x] Update `src/content/es.ts` - add service pricing
- [x] Update `src/content/en.ts` - add service pricing
- [x] Update `src/components/landing/ui/service-modal.tsx`:
  - [x] Add pricing display in modal

### 4.3 Demos Section - Add Project19 ✅
- [x] Update `src/content/es.ts` - add project19 use case
- [x] Update `src/content/en.ts` - add project19 use case
- [x] Create `src/components/landing/demos/project19-view.tsx`:
  - [x] WhatsApp-style chat interface
  - [x] Morning briefing message simulation
  - [x] Evening check-in simulation
  - [x] Voice transcription indicator
  - [x] Stack and cost display
- [x] Update `src/components/landing/sections/demos-section.tsx`:
  - [x] Add project19 to DEMO_ICON_MAP
  - [x] Add project19 to VISUAL_MAP
  - [x] Add case for project19 in renderVisual

### 4.4 Stories Section - Metrics Update ✅
- [x] Update `src/content/types.ts` - add `metric` field to `RealStory`
- [x] Update `src/content/es.ts` - add metrics to stories
- [x] Update `src/content/en.ts` - add metrics to stories
- [x] Update `src/components/landing/sections/stories-section.tsx`:
  - [x] Add RESULTADO/Result metric display below before/after
  - [x] Add bilingual labels for Before/After/Result

### 4.5 Footer - Currency Selector ✅
- [x] Update `src/components/landing/layout/footer.tsx`:
  - [x] Add currency selector UI (USD/COP toggle)
  - [x] Style to match Brutalist theme

---

## Phase 5: Navigation & Page Structure Updates ✅

### 5.1 Update Navigation ✅
- [x] Navigation items verified - correct and complete
- [x] Section order verified in page.tsx

### 5.2 Update Page Layout ✅
- [x] All section components imported (completed in Phase 1-3)
- [x] Lazy loading configured for all sections
- [x] Correct section order verified:
    1. Hero ✅
    2. About (Who We Are) ✅
    3. How We Work (NEW) ✅
    4. What We Do (NEW) ✅
    5. Why Us ✅
    6. Services ✅
    7. Demos ✅
    8. Who We Help (Sectors) ✅
    9. Semilla ✅
    10. Partnerships ✅
    11. Projects ✅
    12. Stories (Real Examples) ✅
    13. Values (NEW) ✅
    14. Mission (NEW) ✅
    15. What Happens Next ✅
    16. Footer ✅

---

## Phase 6: Final Polish & Verification ✅

- [x] Run `pnpm lint` - No new errors from v3.2 changes (1 pre-existing error in nav.tsx)
- [x] All sections render correctly (verified in code)
- [x] All bilingual content in es.ts and en.ts
- [x] All modals updated (service modal with pricing)
- [x] Animations use existing Reveal component
- [x] Mobile responsiveness maintained (using existing responsive classes)
- [x] Content follows v3.2 spec document

---

## File Change Summary

### New Files
- `src/components/landing/ui/growing-tree.tsx`
- `src/components/landing/ui/team-member-modal.tsx`
- `src/components/landing/sections/how-we-work-section.tsx`
- `src/components/landing/sections/what-we-do-section.tsx`
- `src/components/landing/sections/values-section.tsx`
- `src/components/landing/sections/mission-section.tsx`
- `src/components/landing/demos/project19-view.tsx`

### Modified Files
- `src/content/types.ts`
- `src/content/es.ts`
- `src/content/en.ts`
- `src/components/landing/sections/hero-section.tsx`
- `src/components/landing/sections/about-section.tsx`
- `src/components/landing/sections/who-we-help-section.tsx`
- `src/components/landing/sections/stories-section.tsx`
- `src/components/landing/sections/demos-section.tsx`
- `src/components/landing/ui/modal-provider.tsx`
- `src/components/landing/ui/modal-renderer.tsx`
- `src/components/landing/ui/service-modal.tsx`
- `src/components/landing/layout/footer.tsx`
- `src/app/page.tsx`

---

## Notes

- **Design Preservation**: All new components must use existing Brutalist styling patterns
- **Component Reuse**: Use `Reveal`, `Modal`, existing card patterns
- **No External Dependencies**: Hero animation uses CSS/SVG only
- **Placeholder Images**: Use placeholder images until real photos are provided
- **Content Accuracy**: Cross-reference all text with v3.2 document
