# Action Plan (Clean Pro Base)

Goal: make the landing page a reliable foundation (build passes, strict typing, accessible UI primitives, and solid SEO defaults).

## Phase 0: Make CI/build green (P0)
1. Fix TypeScript/build blockers
- Exclude `specs/**` from `tsconfig.json` or move it out of the build workspace.
- Fix `src/components/landing/voice-visualizer-canvas.tsx` strict typing issues.
- Target outcome:
  - `pnpm typecheck` passes
  - `pnpm build:ci` passes

2. Fix sitemap/robots mismatch
- Remove `/dashboard` and `/chat` from `src/app/sitemap.ts` (unless you intend them to be public and indexable).

3. Replace boilerplate manifest content
- Update `src/app/manifest.ts` fields to CultivoAI.

## Phase 1: Accessibility baseline (P0/P1)
1. Replace `src/components/landing/ui/modal.tsx` with Radix Dialog
- Standardize all modals to be accessible by default.

2. Fix navigation semantics
- Replace clickable `<div>` / heading `onClick` patterns with `<a>` or `<button>`.
- Use anchors for section navigation.
- Add skip link.

## Phase 2: Architecture/perf cleanup (P1)
1. Split `src/app/page.tsx`
- Server render the page shell and static sections.
- Move interactive state and handlers into a single client component.

2. Improve image loading strategy
- Use eager/priority only for above-the-fold.
- Audit remote image dependencies.

## Phase 3: SEO polish (P1/P2)
1. Add OG image
- Add `public/og.png` (or similar) and reference it in metadata.
2. Add `metadataBase` + canonical URL
3. Decide i18n SEO strategy
- Keep one indexable language OR implement `/en` and `/es`.

## Suggested “Definition of Done” for the base
- `pnpm lint` has 0 warnings (or warnings are consciously allowed and documented)
- `pnpm typecheck` passes
- `pnpm build:ci` passes
- Modal and nav are keyboard- and screen-reader-friendly
- Sitemap only includes public pages; robots aligns

