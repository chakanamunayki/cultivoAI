# Code Quality / Organization Audit

## Build & type safety

1. `pnpm typecheck` fails (strict flags enabled)
- `tsconfig.json` uses strict settings including:
  - `noUncheckedIndexedAccess`
  - `noUnusedLocals`, `noUnusedParameters`
- Current failures include:
  - `specs/gemini-live-voice-example/**` (example code breaks strict settings)
  - `src/components/landing/voice-visualizer-canvas.tsx`:
    - unchecked indexed access (`frequencyData[dataIdx]`)
    - possible undefined element access in arrays (`particlesRef.current[i]`)
    - unused locals (`bassCount`, `isSwirl`)
- Recommendation:
  - Keep strict flags (good).
  - Exclude non-production example folders from `tsconfig.json` (`specs/**`).
  - Fix landing components to satisfy strict typing (don’t relax compiler options).

## Lint warnings to address

`pnpm lint` currently reports warnings (no errors), including:
- `src/hooks/use-gemini-live.ts`: many `console.log` flagged by `no-console`.
- Missing hook dependencies in:
  - `src/components/landing/demos/code-view.tsx`
  - `src/components/landing/voice-visualizer-canvas.tsx`
- Recommendation:
  - Gate debug logs behind a flag or remove them in production.
  - Fix dependency arrays or refactor to avoid unstable deps.

## Component boundaries

1. `src/app/page.tsx` has too many responsibilities
- Recommendation:
  - Create `src/components/landing/home-client.tsx` (client) to own:
    - chat state, chat context, widget lazy-load
    - scroll function
    - modal open handlers
  - Keep `src/app/page.tsx` server-side and mostly declarative.

2. Custom modal should not be maintained long-term
- Recommendation:
  - Standardize on Radix Dialog.

## Content organization
- Content is centralized in `src/content/{es,en}.ts` (good).
- Recommendation:
  - Avoid hard-coded bilingual strings in components (example: nav labels) and keep them in content maps for consistency.

