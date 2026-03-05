# MVP Cleanup Execution Log

Date opened: 2026-03-05
Owner: Codex + Paul
Status: In progress

## Goal

Clean up the MVP-facing codebase before the next build phase.

This pass is focused on:

- repo hygiene
- documentation accuracy
- frontend/code organization
- removing dead or misleading UX paths
- making the current app easier to maintain

This pass does not cover:

- database redesign
- backend architecture cleanup
- auth/security hardening of server routes
- analytics/data model cleanup

Those items were identified in the audit and are intentionally deferred for a later backend pass.

## Source Document

- Audit: `docs/codebase-audit-2026-03-05.md`

## Cleanup Rules

1. Prefer small, safe changes that reduce ambiguity.
2. Remove or simplify before adding abstractions.
3. Keep the MVP working after each cleanup batch.
4. Do not mix frontend cleanup with backend redesign in this pass.

## Workstreams

### 1. Documentation Cleanup

Status: In progress

- Replace boilerplate root README with a real project README.
- Fix references to missing template files.
- Add a short repo map explaining `src/`, `docs/`, `create-agentic-app/`, and template assets.

### 2. Repo Hygiene

Status: In progress

- Review tracked root artifacts like `icacls`, `takeown`, `reset.bat`, and `test-gemini-ws.html`.
- Remove files that are not part of the product or documented tooling workflow.
- Clarify whether `create-agentic-app/` is intentionally part of this repo.

### 3. MVP UX Integrity

Status: In progress

- Fix or remove fake submission flows in the contact modal.
- Remove dead-end UX that looks functional but is not wired through.
- Keep lead/contact entry paths honest and consistent.

### 4. Frontend Structure

Status: In progress

- Break apart oversized landing/chat/voice files where the split is obvious and low-risk.
- Reduce unnecessary client-component surface where possible.
- Move repeated inline UI/data glue into smaller local helpers.

### 5. Content Structure

Status: Pending

- Review giant locale files for section-based splitting.
- Keep content typing intact while making content easier to edit.

## Current Priority Order

1. Documentation cleanup
2. Repo hygiene
3. MVP UX integrity
4. Frontend structure
5. Content structure

## Execution Log

### 2026-03-05

- Created this execution log in `docs/plan/`.
- Completed initial audit in `docs/codebase-audit-2026-03-05.md`.
- Locked scope for this cleanup pass to MVP-facing cleanup only.
- Deferred DB/backend work to a later pass.
- Replaced the stale starter README with a product-specific repo README.
- Wired the landing contact modal to the existing `POST /api/leads` flow (real persistence instead of a fake timeout).
- Added simple loading/success/error states to the contact modal and a clear success confirmation with an explicit close action.
- Consolidated lead creation into a shared client helper (`src/lib/leads/client.ts`) and reused it in the chat widget.
- Updated docs that referenced the missing `docs/template/App.tsx` to point at the current landing implementation (`src/app/page.tsx` and `src/components/landing/**`).
- Removed suspicious root artifacts (`icacls`, `takeown`, `reset.bat`, `test-gemini-ws.html`). `test-gemini-ws.html` contained a hardcoded Google API key, so it was deleted and added to `.gitignore` to prevent re-adding.
- Decoupled `pnpm build` from DB migrations (`build` is now pure, `build:with-migrate` is explicit opt-in) to remove deployment/CI side effects.
- Moved root cache-maintenance artifacts out of the repo root:
  - `clear-all-cache.bat` -> `scripts/windows/clear-all-cache.bat`
  - `CACHE-BUSTING-GUIDE.md` -> `docs/technical/dev-workflows/cache-busting-guide.md`
- Updated maintenance docs and README references to the new cache script/doc paths and added a short "Repo Boundaries" section clarifying that `create-agentic-app/` is generator/template code, not runtime app code.
- Reduced landing client complexity with low-risk UI extractions:
  - Added `src/components/landing/chat-inline-contact-form.tsx` and used it from `ai-chat-widget.tsx`.
  - Added `src/components/landing/voice-contact-form.tsx` and reused it for both pre-connection and in-conversation forms in `voice-conversation-mode.tsx`.
- Removed a chat dead-end fallback for `schedule_call` function calls by ensuring it now resolves to a real action path (open form when available, otherwise trigger lead capture or WhatsApp follow-up).
- Fixed a voice-form fallback edge case so submitting contact details no longer becomes a no-op when a submit handler is not provided.
- Cleared all 27 warning-level ESLint findings in `src/hooks/use-gemini-live.ts` with behavior-preserving cleanup:
  - Replaced `console.log` diagnostics with a dev-only `debugLog` helper that routes through allowed `console.warn`.
  - Stabilized retry configuration constants outside render scope.
  - Fixed hook dependency warnings (`onConnected`, retry callback wiring) without changing the connection/audio flow.
- Audited README/docs references after cache artifact moves and confirmed active references use:
  - `scripts/windows/clear-all-cache.bat`
  - `docs/technical/dev-workflows/cache-busting-guide.md`
- Updated `baseline-browser-mapping` to latest (`2.10.0`) and pinned overrides in `package.json` to reduce stale-data warning churn from toolchain resolution.

### 2026-03-05 (warning-noise cleanup pass)

- Verified that `baseline-browser-mapping@2.10.0` is still the current latest upstream release, so stale-data warnings are currently upstream-driven.
- Added `scripts/run-with-warning-filters.cjs` and `scripts/filter-tooling-warnings.cjs`, then routed lint/build scripts through the wrapper to suppress known non-actionable warning noise without changing app behavior:
  - Sets `BROWSERSLIST_IGNORE_OLD_DATA=true`
  - Sets `BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA=true`
  - Applies a narrow filter for the known `[baseline-browser-mapping] ... over two months old` warning text when lint/build tools emit it.
  - Adds `NODE_OPTIONS=--disable-warning=DEP0040` for build scripts only (targeted suppression of `punycode` deprecation noise).
- Updated `docs/technical/dev-workflows/cache-busting-guide.md` for repo-hygiene fallout:
  - Corrected dev-port guidance from `3001` to `3005` to match current scripts.
  - Replaced encoding-corrupted diagram text with ASCII-safe guidance.

### 2026-03-05 (docs/reference hygiene sync pass)

- Updated `docs/project_info/repo-baseline.md` to remove an outdated statement that `pnpm build` runs DB migrations.
- Added explicit build behavior notes in `docs/project_info/repo-baseline.md`:
  - `pnpm build` is pure (`next build`).
  - `pnpm build:with-migrate` is explicit opt-in for migration + build.
- Updated `specs/phase-6-voice-conversation-live-api/prompt.md` to align port guidance with current scripts:
  - default local dev port is `3005` (`pnpm dev`)
  - fallback port guidance updated to `3006` when `3005` is already in use.
- Verification for this pass:
  - `pnpm lint` passed
  - `pnpm typecheck` passed
  - `pnpm build:ci` passed

### 2026-03-05 (repo/docs boundary consistency pass)

- Re-checked docs/spec references for stale script/path guidance against current repo scripts and active plan paths.
- Updated `docs/project_info/repo-baseline.md` working-agreement wording so it matches current structure:
  - planning docs are under `docs/plans/**`
  - active execution logs may also be under `docs/plan/**` (used by this MVP cleanup log)
- Confirmed no additional non-historical references were still pointing to removed root maintenance artifacts.
- Verification for this pass:
  - `pnpm lint` passed
  - `pnpm typecheck` passed
  - `pnpm build:ci` passed

### 2026-03-05 (planning reference typo cleanup pass)

- Fixed a planning-doc filename typo in `docs/plans/landing-page-audit/`:
  - `new-cotent-for-landing-page.md` -> `new-content-for-landing-page.md`
- Updated the remaining live reference in `docs/plans/landing-v2/EXECUTION.md` to the corrected filename.
- Verification for this pass:
  - `pnpm lint` passed
  - `pnpm typecheck` passed
  - `pnpm build:ci` passed

### 2026-03-05 (MVP UX integrity sweep pass)

- Performed a targeted CTA integrity sweep across the active MVP landing surfaces:
  - `src/app/page.tsx`
  - `src/components/landing/layout/nav.tsx`
  - `src/components/landing/layout/footer.tsx`
  - `src/components/landing/ai-chat-widget.tsx`
  - `src/components/landing/voice-conversation-mode.tsx`
  - `src/components/landing/ui/contact-modal.tsx`
  - `src/components/landing/sections/**` and landing modal components for CTA entry points
- Verified visible landing/nav/footer/chat/voice CTAs resolve to real outcomes only:
  - section anchors and smooth-scroll navigation
  - modal open flows (project/service/partnership/contact/team)
  - WhatsApp and mailto exits
  - lead-capture form submissions through `POST /api/leads`
  - chat/voice actions that route to contact capture or WhatsApp fallback paths
- No additional safe dead-end CTA removals/corrections were required in this pass.
- Verification for this pass:
  - `pnpm lint` passed
  - `pnpm typecheck` passed
  - `pnpm build:ci` passed

## Exit Criteria For This Pass

- The repo explains itself without boilerplate confusion.
- No clearly fake MVP user flows remain in the UI.
- Root-level clutter is reduced or documented.
- The main landing/chat code is cleaner and easier to continue from.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build:ci` still pass after cleanup.
