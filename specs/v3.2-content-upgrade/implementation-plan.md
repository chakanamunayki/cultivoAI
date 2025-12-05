# CultivoAI v3.2 Implementation Plan

## Pre-Implementation

- [ ] Create backup of current landing page components
- [ ] Create backup of current content files

---

## Phase 1: Hero Section Upgrade (HIGH PRIORITY)

### 1.1 Hero Text Updates
- [ ] Update `src/content/types.ts` - add `heroFooterBar` field to `HeroCopy`
- [ ] Update `src/content/es.ts` - new hero copy + footer bar text
- [ ] Update `src/content/en.ts` - new hero copy + footer bar text
- [ ] Update `src/components/landing/sections/hero-section.tsx`:
  - [ ] Update left panel with new simplified headline structure
  - [ ] Add footer bar element at bottom of hero (full-width, below both panels)

### 1.2 Hero Animation - Growing Ecosystem Tree
- [ ] Create `src/components/landing/ui/growing-tree.tsx`:
  - [ ] Build SVG tree structure with geometric/brutalist style
  - [ ] Implement 6-stage animation sequence using CSS keyframes
  - [ ] Add seed node with "Tu negocio" label
  - [ ] Add 3 main branch icons (Chatbots, Automatización, Dashboards)
  - [ ] Add 6 sub-branch result labels
  - [ ] Add success star crown with glow effect
  - [ ] Implement loop with fade transition
  - [ ] Respect `prefers-reduced-motion`
- [ ] Update `src/components/landing/sections/hero-section.tsx`:
  - [ ] Replace purple panel content with `GrowingTree` component
  - [ ] Keep purple background and existing container styling
  - [ ] Remove rocket emoji and floating shapes

---

## Phase 2: Who We Are Section Update (MEDIUM PRIORITY)

### 2.1 Content & Types
- [ ] Update `src/content/types.ts`:
  - [ ] Create `TeamMember` interface with full bio fields
  - [ ] Update `AboutCopy` to use `TeamMember[]` array
- [ ] Update `src/content/es.ts` - add Paul, Rocky, Marta full data
- [ ] Update `src/content/en.ts` - add Paul, Rocky, Marta full data

### 2.2 Team Member Modal
- [ ] Create `src/components/landing/ui/team-member-modal.tsx`:
  - [ ] Reuse existing `Modal` component wrapper
  - [ ] Image header section
  - [ ] Name, title, flag badges
  - [ ] Bio sections (experience, projects, etc.)
  - [ ] LinkedIn button
  - [ ] Special sections for Rocky (Project19, Samsung video)
- [ ] Update `src/components/landing/ui/modal-provider.tsx`:
  - [ ] Add `openTeamMemberModal` function
  - [ ] Add `teamMember` modal type
- [ ] Update `src/components/landing/ui/modal-renderer.tsx`:
  - [ ] Add case for `teamMember` modal type

### 2.3 About Section Updates
- [ ] Update `src/components/landing/sections/about-section.tsx`:
  - [ ] Change grid from 2-col to 3-col (responsive)
  - [ ] Add Marta card with green (#10B981) accent
  - [ ] Add LinkedIn icon button to each card
  - [ ] Add "Ver más" button that triggers modal
  - [ ] Add footer note about technical experts
  - [ ] Keep existing card styling exactly

---

## Phase 3: New Sections (MEDIUM PRIORITY)

### 3.1 How We Work Section
- [ ] Update `src/content/types.ts` - add `HowWeWorkContent` interface
- [ ] Update `src/content/es.ts` - add howWeWork content (3 pillars)
- [ ] Update `src/content/en.ts` - add howWeWork content (3 pillars)
- [ ] Create `src/components/landing/sections/how-we-work-section.tsx`:
  - [ ] Reuse existing card patterns from services/partnerships
  - [ ] 2+1 layout (2 side-by-side, 1 full-width)
  - [ ] Use existing `Reveal` component for animations
  - [ ] Use Lucide icons (RefreshCw, Sprout, Users)
- [ ] Update `src/app/page.tsx` - add section in correct order

### 3.2 What We Do Section
- [ ] Update `src/content/types.ts` - add `WhatWeDoContent` interface
- [ ] Update `src/content/es.ts` - add whatWeDo content
- [ ] Update `src/content/en.ts` - add whatWeDo content
- [ ] Create `src/components/landing/sections/what-we-do-section.tsx`:
  - [ ] Title + intro paragraph
  - [ ] Two-column layout (Optimize | Expand)
  - [ ] Bullet lists using existing styling patterns
  - [ ] Services preview with links
- [ ] Update `src/app/page.tsx` - add section in correct order

### 3.3 Values Section
- [ ] Update `src/content/types.ts` - add `Value` interface
- [ ] Update `src/content/es.ts` - add 6 values
- [ ] Update `src/content/en.ts` - add 6 values
- [ ] Create `src/components/landing/sections/values-section.tsx`:
  - [ ] 2x3 grid or stacked list layout
  - [ ] Icon + title + description pattern
  - [ ] Reuse existing card/list styling
- [ ] Update `src/app/page.tsx` - add section in correct order

### 3.4 Mission Statement Section
- [ ] Update `src/content/types.ts` - add `MissionStatement` interface
- [ ] Update `src/content/es.ts` - add mission statement
- [ ] Update `src/content/en.ts` - add mission statement
- [ ] Create `src/components/landing/sections/mission-section.tsx`:
  - [ ] Full-width centered text block
  - [ ] Large typography
  - [ ] Brutalist styling (border, shadow)
- [ ] Update `src/app/page.tsx` - add section in correct order

---

## Phase 4: Existing Section Updates (LOW PRIORITY)

### 4.1 Who We Help / Sectors Update
- [ ] Update `src/content/es.ts` - add badge text to sectors
- [ ] Update `src/content/en.ts` - add badge text to sectors
- [ ] Update `src/components/landing/sections/who-we-help-section.tsx`:
  - [ ] Add "Descuentos disponibles ✓" badge to sector cards
  - [ ] Add "Hablemos →" button to each card
  - [ ] Wire button to open chat with sector context

### 4.2 Services Section Updates
- [ ] Update `src/content/es.ts` - update service popup pricing
- [ ] Update `src/content/en.ts` - update service popup pricing
- [ ] Update `src/components/landing/ui/service-modal.tsx`:
  - [ ] Add pricing display if not already present

### 4.3 Demos Section - Add Project19
- [ ] Update `src/content/es.ts` - add project19 use case
- [ ] Update `src/content/en.ts` - add project19 use case
- [ ] Create `src/components/landing/demos/project19-view.tsx`:
  - [ ] WhatsApp-style chat interface
  - [ ] Morning briefing message simulation
  - [ ] Evening check-in simulation
  - [ ] Voice transcription indicator
  - [ ] Stack and cost display
- [ ] Update `src/components/landing/sections/demos-section.tsx`:
  - [ ] Add project19 to DEMO_ICON_MAP
  - [ ] Add project19 to VISUAL_MAP
  - [ ] Add case for project19 in renderVisual

### 4.4 Stories Section - Metrics Update
- [ ] Update `src/content/types.ts` - add `metric` field to `RealStory`
- [ ] Update `src/content/es.ts` - add metrics to stories
- [ ] Update `src/content/en.ts` - add metrics to stories
- [ ] Update `src/components/landing/sections/stories-section.tsx`:
  - [ ] Add RESULTADO metric display below before/after

### 4.5 Footer - Currency Selector
- [ ] Update `src/content/types.ts` - add currency options
- [ ] Update `src/content/es.ts` - add currency labels
- [ ] Update `src/content/en.ts` - add currency labels
- [ ] Update `src/components/landing/layout/footer.tsx`:
  - [ ] Add currency selector UI (visual only)
  - [ ] Style to match existing language toggle

---

## Phase 5: Navigation & Page Structure Updates

### 5.1 Update Navigation
- [ ] Update `src/content/es.ts` - update nav items if needed
- [ ] Update `src/content/en.ts` - update nav items if needed
- [ ] Review `src/components/landing/layout/nav.tsx` for any needed updates

### 5.2 Update Page Layout
- [ ] Update `src/app/page.tsx`:
  - [ ] Import new section components
  - [ ] Add lazy loading for new sections
  - [ ] Ensure correct section order:
    1. Hero
    2. About (Who We Are)
    3. How We Work (NEW)
    4. What We Do (NEW)
    5. Why Us
    6. Services
    7. Demos
    8. Who We Help (Sectors)
    9. Semilla
    10. Partnerships
    11. Projects
    12. Stories (Real Examples)
    13. Values (NEW)
    14. Mission (NEW)
    15. What Happens Next
    16. Footer

---

## Phase 6: Final Polish & Verification

- [ ] Run `pnpm lint` and fix any issues
- [ ] Run `pnpm typecheck` and fix any type errors
- [ ] Verify all sections render correctly
- [ ] Verify all bilingual content displays correctly
- [ ] Verify all modals open/close properly
- [ ] Verify hero animation plays correctly
- [ ] Verify animations respect reduced-motion preference
- [ ] Verify mobile responsiveness for all new/updated sections
- [ ] Cross-reference with v3.2 spec document for content accuracy

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
