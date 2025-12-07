# Hero Section Code Screen Replacement - Requirements

## Overview
Replace the rocket emoji graphic in the hero section's right panel with an animated terminal/code screen component while preserving all other Brutalist design elements.

## Source Material
- **Template Reference**: `docs/template/code-screen/`
- **Current Hero**: `src/components/landing/sections/hero-section.tsx`
- **Key Components to Port**:
  - `AppWindows.tsx` - Animated terminal with LinkedIn automation scenario
  - `Hero.tsx` - Text content reference (not needed, we keep our current left panel)

## Requirements

### 1. Remove Elements
- ❌ Remove rocket emoji image (lines 72-80)
- ✅ Keep AI text (line 67-69)
- ✅ Keep white circle (line 61)
- ✅ Keep yellow square (line 64)

### 2. Add Code Screen Component
- Use existing `AppWindows.tsx` component (copy directly)
- Keep framer-motion animations (already implemented and working)
- Adapt styling to Brutalist design system (borders, shadows, colors)
- Ensure proper responsive behavior (mobile + desktop)

### 3. Reposition "No Drama" Box
- Current position: `relative z-10 w-full max-w-md`
- New position: Must not overlap with code screen
- Maintain white card with black border, purple shadow offset
- Keep all text content exactly as-is

### 4. Mobile Alignment
- Stack vertically on mobile (< 1024px)
- Code screen should be centered and sized appropriately
- "No Drama" box should stack below code screen on mobile
- Maintain proper spacing and readability
- Preserve all borders and shadows

### 5. Design Preservation Rules
**CRITICAL**: Maintain exact Brutalist styling:
- 4px black borders on all elements
- Hard shadows: `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`
- No rounded corners (except terminal header dots)
- High contrast colors
- Hover effects: translate + shadow reduction
- NO theme switching, NO dark mode toggle

### 6. Terminal Styling Requirements
Match Brutalist theme (NOT the soft/modern theme from template):
```css
Container: bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
Header: bg-[#FFC805] border-b-4 border-black
Terminal body: bg-black text-white
Success text: text-[#10B981] (green-semilla)
Error text: text-[#EF4444] (red-accent)
AI/Event text: text-[#A855F7] (purple)
```

### 7. Animation Requirements
- Keep existing framer-motion animations from AppWindows.tsx
- Terminal lines appear sequentially with delays (already implemented)
- Auto-scroll to bottom as new lines appear (already implemented)
- Loop the animation after completion (already implemented)
- Blinking cursor effect (already implemented)
- CRT scanline effect (already implemented)
- Only adapt styling, NOT animation logic

### 8. Content Requirements
- Keep the LinkedIn automation scenario from template
- Bilingual support (Spanish/English) for terminal commands
- Match tone: professional, technical, showing real automation value

### 9. Responsive Behavior
**Desktop (≥ 1024px)**:
- Code screen: positioned in upper portion of right panel
- "No Drama" box: positioned in lower portion, NOT overlapping
- AI text, white circle, yellow square: background elements

**Tablet (768px - 1023px)**:
- Code screen: centered, slightly smaller
- "No Drama" box: below code screen with margin

**Mobile (< 768px)**:
- Code screen: full width with padding, reduced height
- "No Drama" box: below code screen, full width
- Maintain readability of terminal text (may need smaller font)

### 10. Performance Requirements
- Use framer-motion (already optimized in existing component)
- Animation performance already optimized (CSS transforms, GPU-accelerated)
- Optional: Add Intersection Observer to defer animation start until section is visible
- Terminal should be client component ("use client")

## Success Criteria
- [ ] Rocket removed, code screen integrated
- [ ] All Brutalist styling preserved (borders, shadows, colors)
- [ ] "No Drama" box repositioned without overlap
- [ ] Mobile layout stacks cleanly
- [ ] Animation loops smoothly
- [ ] No hydration errors
- [ ] Passes TypeScript checks
- [ ] Passes ESLint checks
- [ ] Visually matches Brutalist theme (NOT soft modern theme)
