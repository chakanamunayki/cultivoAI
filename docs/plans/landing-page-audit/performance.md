# Performance Audit

## Observations

1. Large client entrypoint
- File: `src/app/page.tsx` is a single `"use client"` page managing:
  - chat lazy-load timing
  - scroll routing
  - modal + content lookups
  - dynamic imports for many sections
- Cost:
  - More JS to hydrate on initial load than necessary.

2. Heavy animation usage
- Files:
  - `src/components/landing/sections/hero-section.tsx` (Framer Motion)
  - likely other sections use `Reveal` and motion.
- Recommendation:
  - Respect `prefers-reduced-motion`.
  - Keep animations but avoid animating layout/large paint areas unnecessarily.

3. Image optimization opportunities
- Remote images are used (Unsplash). Next Image optimization is configured, which helps.
- Recommendation:
  - Don’t force eager loading for non-critical imagery (example: About section member images).
  - Consider self-hosting critical marketing images to avoid third-party latency variability.

4. Chat widget loading strategy is reasonable but can be improved
- File: `src/app/page.tsx` loads chat widget after 2.5s or on click.
- Recommendation:
  - Replace fixed timeout with `requestIdleCallback` (with a fallback) so it loads when the browser is idle.

