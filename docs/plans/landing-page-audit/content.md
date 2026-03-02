# Content / Copy Audit

This is not a “design critique”; it’s a professionalism pass to reduce placeholder content and inconsistent copy before scaling.

## Issues to address

1. Placeholder links/content in shipping copy
- Files: `src/content/es.ts`, `src/content/en.ts`
- Example patterns to remove before launch:
  - Placeholder YouTube URLs like `https://www.youtube.com/watch?v=example`
  - “Coming soon” items without a clear UX pattern (either remove or make a deliberate “coming soon” section)

2. Spanish accents and typography consistency
- Files: `src/content/es.ts`, `src/app/layout.tsx`
- Examples to normalize (representative):
  - “Quienes” → “Quiénes”
  - “mas” → “más”
  - “proposito” → “propósito”
  - “Automatizacion” → “Automatización”
- Recommendation:
  - Do a focused pass on the Spanish copy for accents and consistent casing.
  - Keep style consistent between locales (periods, uppercase usage, CTA casing).

3. Mixed brand/product terminology
- Ensure “CultivoAI” capitalization is consistent (“CultivoAI” vs “CultivoAi”, etc).
- Ensure “Semilla” is explained consistently in both languages.

4. Image sourcing and rights
- Many images appear to be from Unsplash.
- Recommendation:
  - If these are placeholders, replace with brand-owned photos/illustrations before launch.
  - If they are intended to ship, document source/licensing and consider self-hosting critical assets.

