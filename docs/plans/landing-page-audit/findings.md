# Findings (Prioritized)

Severity legend
- P0: must fix before moving forward (blocks build, high-risk UX/SEO/accessibility)
- P1: should fix soon (quality, maintainability, measurable UX/SEO/perf gains)
- P2: nice to have (polish, cleanup, future-proofing)

## P0 (Blockers)

1. TypeScript/build is failing
- Evidence:
  - `pnpm typecheck` fails with many errors, including:
    - `specs/gemini-live-voice-example/**` (unused locals, strict null issues)
    - `src/components/landing/voice-visualizer-canvas.tsx` (strict null / unchecked index access)
  - `pnpm build:ci` fails because Next’s typecheck fails on `specs/gemini-live-voice-example/components/Controls.tsx` (unused param/local).
- Why it matters:
  - You don’t currently have a “clean base”: CI/build pipelines will fail as-is.
- Recommended fixes:
  - Exclude non-shipping experimentation from `tsconfig.json` and from Next build inputs.
    - Add `specs` to `exclude`, or move `specs/` outside the workspace, or convert it into a separate package with its own tsconfig.
  - Fix strict TypeScript issues in `src/components/landing/voice-visualizer-canvas.tsx` (see `code-quality.md` for specifics).

2. Modal implementation is not accessibility-grade
- File: `src/components/landing/ui/modal.tsx`
- Issues:
  - Missing `role="dialog"` and `aria-modal="true"` semantics.
  - No focus trap. Keyboard users can tab to the page behind the modal.
  - Focus is not restored to the trigger when closing.
- Recommendation:
  - Replace this with `@radix-ui/react-dialog` (already a dependency) and standardize all landing modals on it.

3. Sitemap includes routes that robots disallow
- Files:
  - `src/app/robots.ts` disallows `/dashboard/`, `/chat/`, etc.
  - `src/app/sitemap.ts` includes `/dashboard` and `/chat`.
- Why it matters:
  - Sends conflicting signals to search engines.
- Recommendation:
  - Only include public, indexable routes in `sitemap.ts` (likely just `/` for now), or stop disallowing those routes in `robots.ts` (not recommended for authenticated areas).

4. Web app manifest is boilerplate (not CultivoAI)
- File: `src/app/manifest.ts`
- Current values include “Agentic Coding Boilerplate”.
- Recommendation:
  - Update `name`, `short_name`, `description`, colors/icons to match CultivoAI branding.

## P1 (High-value improvements)

1. Home page is a large client component (SEO/perf/maintainability)
- File: `src/app/page.tsx` is `"use client"`.
- Why it matters:
  - Larger client bundle and more hydration work than necessary.
  - Harder to keep the page organized as it grows.
- Recommendation:
  - Convert `/` into a server component by default.
  - Move interactive behaviors (chat open, modal open, smooth scrolling) into a single client wrapper component like `HomeClient`.

2. Navigation semantics (buttons used as links; clickable div)
- File: `src/components/landing/layout/nav.tsx`
- Issues:
  - Logo is a clickable `<div>` (not keyboard-accessible by default).
  - Section navigation uses `<button>` rather than `<a href="#...">`.
  - Menu button lacks `aria-expanded`, `aria-controls` wiring.
- Recommendation:
  - Use `<a href="#section">` for in-page navigation (still can enhance with smooth scrolling).
  - Make the logo a `<a href="#hero">` or `<Link href="/">`.
  - Add a skip-link at the top of the page to jump to main content.

3. Contact form is a stub
- File: `src/components/landing/ui/contact-modal.tsx` has a TODO and simulates submission via timeout.
- Recommendation:
  - Implement a real submission path (server action or API route), validation, and success/error states.

4. Image loading strategy
- Example: `src/components/landing/sections/about-section.tsx` sets `loading="eager"` on member images.
- Recommendation:
  - Only set eager/priority for truly above-the-fold imagery; default to lazy for below-fold sections.

5. Locale persistence vs. hydration strategy needs a more robust approach
- File: `src/components/providers/language-provider.tsx`
- Current behavior:
  - Stores locale in `localStorage` but intentionally never reads it on mount.
- Recommendation:
  - If you want persistence without hydration issues, use a cookie + server read (`next/headers` cookies), or implement locale routing (`/en`, `/es`) so metadata + content can be server-driven.

## P2 (Polish)

1. Smooth scroll offset with sticky nav
- Current `scrollIntoView` can land content under the sticky nav.
- Recommendation:
  - Add `scroll-margin-top` to sections, or set `scroll-padding-top` on `html`.

2. String matching lookups for modals are fragile
- File: `src/app/page.tsx` uses `includes()` by title for service/project lookup.
- Recommendation:
  - Use stable identifiers (id/slug) rather than title substring matching.

3. Preconnects in `layout.tsx` should be justified
- File: `src/app/layout.tsx` preconnects to `images.unsplash.com` and `raw.githubusercontent.com`.
- Recommendation:
  - Keep preconnects only for critical origins actually used on initial render; add `crossOrigin` where appropriate.

