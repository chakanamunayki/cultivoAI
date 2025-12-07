# Hero Section Code Screen Replacement - Implementation Plan

## Phase 1: Component Adaptation
**Goal**: Adapt the existing AppWindows component to Brutalist design system

### Tasks:
- [ ] Create new component file `src/components/landing/ui/code-terminal.tsx`
- [ ] Copy complete code from `docs/template/code-screen/components/AppWindows.tsx`
- [ ] Keep framer-motion (already working, no need to remove)
- [ ] Install framer-motion if not present: `pnpm add framer-motion`
- [ ] Adapt styling to Brutalist theme (keeping all existing animations):
  - [ ] Change outer container from soft rounded to `border-4 border-black`
  - [ ] Change shadows from soft to `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`
  - [ ] Keep terminal header (#1e293b) but add `border-b-4 border-black`
  - [ ] Keep terminal body styling (already dark with good colors)
  - [ ] Add Brutalist hover effect: `hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
  - [ ] Remove rounded corners: change `rounded-xl` to `rounded-none` or minimal rounding
- [ ] Add "use client" directive at top of file
- [ ] Keep all existing animation logic (framer-motion variants, timing, etc.)
- [ ] Keep auto-scroll functionality (already implemented)
- [ ] Keep loop/restart logic (already implemented)

### Deliverable:
- Working `CodeTerminal` component with Brutalist styling
- All existing animations preserved
- Terminal script and timing unchanged

---

## Phase 2: Bilingual Content Integration
**Goal**: Make terminal content support Spanish/English

### Tasks:
- [ ] Create content constants in `src/content/es.ts`:
  - [ ] Terminal commands
  - [ ] System messages
  - [ ] Success/error messages
  - [ ] LinkedIn scenario text
- [ ] Create content constants in `src/content/en.ts`:
  - [ ] Mirror Spanish content in English
- [ ] Update `src/content/types.ts` to include terminal content types
- [ ] Integrate `useLocale` hook in `CodeTerminal` component
- [ ] Replace hardcoded strings with localized content
- [ ] Verify both languages display correctly

### Deliverable:
- Bilingual terminal animation
- Content properly organized in content files

---

## Phase 3: Hero Section Integration
**Goal**: Replace rocket with code screen and reposition elements

### Tasks:
- [ ] Import `CodeTerminal` component in hero-section.tsx
- [ ] Remove rocket Image component (lines 72-80)
- [ ] Add CodeTerminal component in appropriate position
- [ ] Adjust positioning of existing elements:
  - [ ] Keep AI text (opacity-20, large text) - adjust z-index if needed
  - [ ] Keep white circle (top-10 left-10, animate-bounce)
  - [ ] Keep yellow square (bottom-20 right-10, rotate-12)
  - [ ] Position CodeTerminal in center-top area
  - [ ] Reposition "No Drama" box to lower portion
- [ ] Set proper z-index layering:
  - [ ] Background shapes: z-0
  - [ ] AI text: z-0
  - [ ] CodeTerminal: z-10
  - [ ] "No Drama" box: z-20
- [ ] Adjust spacing/margins to prevent overlap

### Deliverable:
- Rocket removed
- Code screen integrated
- All elements properly layered and positioned

---

## Phase 4: Responsive Layout Implementation
**Goal**: Ensure clean mobile, tablet, desktop layouts

### Tasks:
- [ ] **Desktop (≥ 1024px) Layout**:
  - [ ] CodeTerminal: absolute positioned in upper-center area
  - [ ] "No Drama" box: absolute positioned in lower area
  - [ ] Background elements: distributed as decoration
  - [ ] No overlap between CodeTerminal and "No Drama" box

- [ ] **Tablet (768px - 1023px) Layout**:
  - [ ] CodeTerminal: centered, max-width constrained
  - [ ] "No Drama" box: below CodeTerminal with margin-top
  - [ ] Reduce CodeTerminal size slightly if needed

- [ ] **Mobile (< 768px) Layout**:
  - [ ] Switch to vertical flex layout
  - [ ] CodeTerminal: full width with padding, reduced height
  - [ ] "No Drama" box: full width, below CodeTerminal
  - [ ] Reduce terminal font size for readability
  - [ ] Hide or simplify background elements if cluttered
  - [ ] Ensure minimum spacing between elements

- [ ] Test on multiple screen sizes:
  - [ ] 1920px (desktop)
  - [ ] 1024px (small desktop/tablet)
  - [ ] 768px (tablet)
  - [ ] 375px (mobile)

### Deliverable:
- Fully responsive hero section
- Clean stacking on mobile
- No overlaps or layout breaks

---

## Phase 5: Animation Polish & Performance
**Goal**: Optimize animations and ensure smooth performance

### Tasks:
- [ ] Add Intersection Observer to defer animation start:
  - [ ] Detect when hero section is in viewport
  - [ ] Start terminal animation only when visible
  - [ ] Pause/reset when out of viewport (optional)
- [ ] Optimize CSS animations:
  - [ ] Use `transform` and `opacity` (GPU-accelerated)
  - [ ] Add `will-change` hints where appropriate
  - [ ] Minimize reflows/repaints
- [ ] Test animation performance:
  - [ ] Check CPU usage during animation
  - [ ] Verify 60fps on mid-range devices
  - [ ] Test on mobile devices
- [ ] Add proper cleanup in useEffect:
  - [ ] Clear timeouts on unmount
  - [ ] Remove event listeners
- [ ] Verify no hydration warnings in console
- [ ] Ensure animation loops smoothly without visual glitches

### Deliverable:
- Performant, smooth animations
- No console errors or warnings
- Optimized resource usage

---

## Phase 6: Final QA & Validation
**Goal**: Ensure production-ready quality

### Tasks:
- [ ] **Visual QA**:
  - [ ] Compare against Brutalist design spec
  - [ ] Verify all borders are 4px black
  - [ ] Verify shadows are hard (8px offset, no blur)
  - [ ] Verify colors match palette (yellow, purple, black, white)
  - [ ] Check hover effects work correctly
  - [ ] Verify no rounded corners (except terminal dots)
  - [ ] Test in both Spanish and English

- [ ] **Code Quality**:
  - [ ] Run `pnpm lint` - fix all errors
  - [ ] Run `pnpm typecheck` - fix all errors
  - [ ] Remove any console.logs or debug code
  - [ ] Add JSDoc comments for complex logic
  - [ ] Verify proper TypeScript types

- [ ] **Responsive Testing**:
  - [ ] Test all breakpoints (mobile, tablet, desktop)
  - [ ] Verify no horizontal scroll
  - [ ] Check text readability at all sizes
  - [ ] Verify spacing and alignment

- [ ] **Browser Testing**:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
  - [ ] Mobile browsers (iOS Safari, Chrome Mobile)

- [ ] **Accessibility**:
  - [ ] Add alt text if needed
  - [ ] Verify keyboard navigation works
  - [ ] Check color contrast ratios
  - [ ] Test with screen reader (basic check)

### Deliverable:
- Production-ready hero section
- All tests passing
- No visual regressions
- Clean, maintainable code

---

## Summary
**Total Phases**: 6
**Estimated Tasks**: ~45

### Phase Breakdown:
1. Component Creation & Adaptation (10 tasks)
2. Bilingual Content Integration (6 tasks)
3. Hero Section Integration (6 tasks)
4. Responsive Layout Implementation (11 tasks)
5. Animation Polish & Performance (8 tasks)
6. Final QA & Validation (17 tasks)

### Key Risks & Mitigation:
- **Risk**: Animation performance on mobile
  - **Mitigation**: Use CSS animations, Intersection Observer, optimize reflows
- **Risk**: Overlap between code screen and "No Drama" box
  - **Mitigation**: Careful positioning with z-index and absolute/relative layouts
- **Risk**: Hydration errors from client-side animation
  - **Mitigation**: Proper "use client" directive, useEffect for browser APIs
- **Risk**: Breaking Brutalist design consistency
  - **Mitigation**: Constant reference to design spec, visual QA at each phase
