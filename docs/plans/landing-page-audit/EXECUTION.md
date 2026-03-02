# Execution Tracker: Clean Landing Page Base

Owner: Paul/Rocky + Codex
Start date: 2026-03-02
Goal: get to a clean, professional baseline before changing landing sections.

## Definition Of Done (Base Is "Clean")

- `pnpm lint` has no landing-related warnings (or warnings are explicitly documented and accepted).
- `pnpm typecheck` passes.
- `pnpm build:ci` passes.
- Modals are accessible (dialog semantics + focus management).
- `robots.ts` and `sitemap.ts` are consistent.
- `manifest.ts` is CultivoAI-branded (no boilerplate).

## Execution Checklist (Prioritized)

P0. Build Is Green
- [x] Exclude non-shipping `specs/**` from TS/Next typecheck inputs (or split it into a separate package)
  - Files: `tsconfig.json` (and possibly repo structure)
  - Verification: `pnpm typecheck`, `pnpm build:ci`
  - Notes: Current build fails due to `specs/gemini-live-voice-example/**`.
- [x] Fix strict TS errors in landing visualizer
  - File: `src/components/landing/voice-visualizer-canvas.tsx`
  - Verification: `pnpm typecheck`
  - Notes: errors from `noUncheckedIndexedAccess` + possible undefined element access + unused locals.

P0. SEO Consistency
- [x] Align sitemap with robots
  - Files: `src/app/sitemap.ts`, `src/app/robots.ts`
  - Target: sitemap lists only public, indexable routes (likely `/` only for now).

P0. Manifest Branding
- [x] Replace boilerplate PWA manifest values with CultivoAI branding
  - File: `src/app/manifest.ts`
  - Target: name/short_name/description/colors/icons match CultivoAI.

P0/P1. Accessibility Baseline
- [x] Replace custom modal with Radix Dialog (focus trap, aria wiring, focus restore)
  - Files:
    - `src/components/landing/ui/modal.tsx` (remove or refactor)
    - `src/components/landing/ui/*-modal.tsx` (adopt new primitive)
    - `src/components/landing/ui/modal-renderer.tsx` (if needed)
  - Verification:
    - Keyboard: Tab stays in dialog, Esc closes, focus returns to trigger
    - Screen reader: dialog announced with title
- [ ] Fix clickable non-interactive elements
  - Files:
    - `src/components/landing/layout/nav.tsx` (logo should be `<a>`/`<button>`)
    - `src/components/landing/layout/footer.tsx` (CTA header click target)

P1. Architecture Cleanup (Keeps Landing Maintainable)
- [ ] Split `src/app/page.tsx` into server page + a single client wrapper for interactivity
  - Files:
    - `src/app/page.tsx`
    - new: `src/components/landing/home-client.tsx` (suggested)
  - Target: keep most sections server-rendered; isolate chat/modal/scroll state.

P1. Contact Form Is Real
- [ ] Implement `ContactModal` submission (server action or API route), validation, success/error UI
  - File: `src/components/landing/ui/contact-modal.tsx`
  - Verification: can submit, see success state, errors handled.

## Commands (Run After Each Step)

```powershell
pnpm lint
pnpm typecheck
pnpm build:ci
```

## Decision Log

- 2026-03-02: Baseline audit completed; execution started from `docs/plans/landing-page-audit/`.

## Work Log

Template (append entries)
- Date:
  - Change:
  - Files:
  - Verification:
  - Notes:

- Date: 2026-03-02
  - Change: Excluded non-shipping `specs/**` from repo-wide lint/typecheck to unblock CI builds.
  - Files: `tsconfig.json`, `eslint.config.mjs`
  - Verification: `pnpm lint`, `pnpm typecheck`, `pnpm build:ci`
  - Notes: `pnpm lint` reports warnings (no errors); address as part of baseline cleanup.

- Date: 2026-03-02
  - Change: Fixed strict TypeScript issues in landing voice visualizer and removed unused animation components blocking `tsc --noEmit`.
  - Files: `src/components/landing/voice-visualizer-canvas.tsx`, `src/components/landing/voice-conversation-mode.tsx`
  - Verification: `pnpm lint`, `pnpm typecheck`, `pnpm build:ci`
  - Notes: Remaining lint warnings include `react-hooks/exhaustive-deps` in the visualizer and other areas.

- Date: 2026-03-02
  - Change: Made `robots.txt` disallows and `sitemap.xml` entries consistent (sitemap now lists only public routes; robots also blocks `/admin/`).
  - Files: `src/app/robots.ts`, `src/app/sitemap.ts`
  - Verification: `pnpm lint`, `pnpm typecheck`, `pnpm build:ci`
  - Notes: `baseUrl` now normalizes away trailing slashes to avoid `//sitemap.xml`.

- Date: 2026-03-02
  - Change: Replaced boilerplate manifest metadata with CultivoAI branding (name/description/theme color).
  - Files: `src/app/manifest.ts`
  - Verification: `pnpm lint`, `pnpm typecheck`, `pnpm build:ci`
  - Notes: Using existing `/favicon.ico` as the only icon until dedicated PWA icon sizes are added.

- Date: 2026-03-02
  - Change: Replaced custom modal overlay with Radix `Dialog` for accessibility (focus trap, Esc/outside click, focus restore) and added dialog titles/descriptions to landing modals.
  - Files: `src/components/landing/ui/modal.tsx`, `src/components/landing/ui/contact-modal.tsx`, `src/components/landing/ui/partnership-modal.tsx`, `src/components/landing/ui/project-modal.tsx`, `src/components/landing/ui/service-modal.tsx`, `src/components/landing/ui/team-member-modal.tsx`
  - Verification: `pnpm lint`, `pnpm typecheck`, `pnpm build:ci`
  - Notes: Brutalist styling and close button preserved; semantics now come from Radix.

- Date: 2026-03-02
  - Change: Cleared remaining landing-related ESLint warnings (hooks deps) to keep the landing baseline clean.
  - Files: `src/components/landing/demos/code-view.tsx`, `src/components/landing/voice-visualizer-canvas.tsx`
  - Verification: `pnpm lint`, `pnpm typecheck`, `pnpm build:ci`
  - Notes: `pnpm lint` warnings now come from `src/hooks/use-gemini-live.ts` (non-landing) rather than landing components.

- Date: 2026-03-02
  - Change: Added stable visualizer signal outputs to `useGeminiLive` (`frequencyData` + `audioSource`) and wired up analyzer-based sampling.
  - Files: `src/hooks/use-gemini-live.ts`
  - Verification: `pnpm lint`, `pnpm typecheck`, `pnpm build:ci`
  - Notes: `frequencyData` is a stable `Uint8Array` reference updated in-place to avoid re-running visualizer effects every frame.

## Next Thread Backlog (Post-Baseline)

Landing
- Fix clickable non-interactive elements (`src/components/landing/layout/nav.tsx`, `src/components/landing/layout/footer.tsx`).
- Decide lint policy for non-landing warnings (currently `src/hooks/use-gemini-live.ts`) and optionally enforce `eslint --max-warnings=0` in CI later.
- Create a dedicated `specs` typecheck/lint path (e.g. separate script/package) so `specs/**` stays healthy without blocking app builds.
- SEO polish: canonical strategy, real OG/Twitter images, and stable `sitemap.xml` `lastModified` strategy.
- PWA polish: add real PNG icons (`192`, `512`, maskable) and `apple-touch-icon` instead of only `favicon.ico`.

Blog / News
- Plan and implement a DB+Admin-managed blog (draft/review/scheduled/published), with a phased rollout (keep landing live first; publish blog after 5–10 seed posts).
