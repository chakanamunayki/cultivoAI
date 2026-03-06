# CultivoAI Codebase Audit

Date: 2026-03-05

Scope: current repository state, including the in-progress landing-page refactor visible in the working tree.

## Executive Summary

The codebase is not broken, but it is carrying real operational risk and avoidable maintenance debt.

Current status:

- `pnpm lint`: passes with 27 warnings, all concentrated in `src/hooks/use-gemini-live.ts`
- `pnpm typecheck`: passes
- `pnpm build:ci`: passes

That means the immediate problem is not compilation. The immediate problem is unsafe architecture and unclear repo boundaries.

## Highest Priority Findings

### 1. Admin API routes are not protected server-side

Severity: Critical

The admin UI checks session state in the client, but the admin API routes themselves do not verify authentication before reading or exporting data.

Evidence:

- `src/app/api/admin/stats/route.ts:49`
- `src/app/api/admin/leads/route.ts:48`
- `src/app/api/admin/conversations/route.ts`
- `src/app/api/admin/export/route.ts`
- `src/app/api/admin/leads/[id]/route.ts`
- `src/lib/session.ts:18`
- `src/proxy.ts:24`

Impact:

- Anyone who can hit `/api/admin/*` can potentially access lead and conversation data directly.
- Client-side gating on `/admin` is not enough. The API routes need their own auth check.

Recommendation:

- Add a shared server guard for all admin API routes using `auth.api.getSession(...)` or `requireAuth()`.
- Decide whether admin access means "any authenticated user" or a narrower allowlist/role check.
- Treat this as the first cleanup item before any aesthetic refactor.

### 2. The "ephemeral token" flow exposes the real Gemini API key to the browser

Severity: Critical

The voice token endpoint base64-encodes the real `GEMINI_API_KEY` and returns it to the client. The client then decodes it and uses it as the API key.

Evidence:

- `src/app/api/voice/token/route.ts:92`
- `src/app/api/voice/token/route.ts:100`
- `src/app/api/voice/token/route.ts:107`
- `src/hooks/use-gemini-live.ts:219`
- `src/hooks/use-gemini-live.ts:222`

Impact:

- This is not an ephemeral token in any meaningful security sense.
- The API key is exposed to browser-side code and is partially logged in development.
- The comments in the route currently overstate the protection level.

Recommendation:

- Replace this with a real server-mediated flow.
- If the provider supports true ephemeral credentials, use that.
- If not, proxy the live session server-side instead of shipping the raw key to the browser.
- Remove the API-key decoding/logging from `use-gemini-live.ts`.

### 3. Production build is coupled to database migration

Severity: High

The default build script runs a database migration before building the app.

Evidence:

- `package.json:5`

Impact:

- `pnpm build` has side effects.
- This is risky in CI and risky in deployment pipelines where build and release should be separate concerns.
- Failed migrations become build failures, and successful builds can mutate infrastructure unexpectedly.

Recommendation:

- Change `build` to `next build`.
- Run migrations in an explicit deploy/release step instead.

## Important Functional Gaps

### 4. Contact modal submit path is still a placeholder

Severity: High

The visible contact modal simulates a submit with a timeout and does not persist anything.

Evidence:

- `src/components/landing/ui/contact-modal.tsx:35`
- `src/components/landing/ui/contact-modal.tsx:39`

Impact:

- Users can fill a form that does not actually do anything.
- That is worse than hiding the form, because it creates false confidence about lead capture.

Recommendation:

- Either wire this to a real server action / API route immediately, or remove the submit path until it is real.

### 5. Repository documentation is misleading and partially broken

Severity: High

The root README still describes the old starter boilerplate, and internal docs still point to a missing template file.

Evidence:

- `README.md:1`
- `CLAUDE.md:62`
- `docs/plans/landing-page-implementation.md:10`
- `specs/brutalist-landing-page/requirements.md:5`
- `docs/template/App.tsx` is missing

Impact:

- New contributors will get the wrong mental model of the repo.
- Internal implementation references send people to files that no longer exist.
- Cleanup work risks becoming slower because the docs are now a source of confusion.

Recommendation:

- Rewrite the root README for the actual product.
- Update `CLAUDE.md` and old plan/spec references to the current template locations, or archive them clearly.
- Add one short repo map explaining what is product code vs template/generator code.

## Maintainability Findings

### 6. Core product behavior is concentrated in oversized client files

Severity: Medium

The biggest files are carrying too many responsibilities:

- `src/components/landing/voice-conversation-mode.tsx` - 870 lines
- `src/components/landing/ai-chat-widget.tsx` - 853 lines
- `src/hooks/use-gemini-live.ts` - 769 lines
- `src/content/es.ts` - 1326 lines
- `src/content/en.ts` - 1313 lines

Impact:

- Harder review cycles
- Higher regression risk
- State, UI, networking, and analytics concerns are mixed together

Recommendation:

- Split voice into transport, audio IO, transcript state, and UI layers.
- Split chat widget into message state, lead capture, function-call actions, and presentation.
- Break content files into section-based modules instead of one giant object per locale.

### 7. Client-component usage is wider than it needs to be

Severity: Medium

There are 70 `use client` modules. The landing page root is also client-side (`src/app/page.tsx:1`), and many purely presentational sections are client components.

Impact:

- More hydration and more browser-side state than necessary
- Larger surface area for subtle client-only bugs
- Harder to reason about what should be server-rendered vs interactive

Recommendation:

- Keep client boundaries only where interaction is real: chat, modals, cursor, voice, intersection/lazy behavior.
- Convert static landing sections back to server components where possible.

### 8. Chat requests duplicate large content payloads on every message

Severity: Medium

`AIChatWidget` sends a large `siteContent` object with every `/api/chat/gemini` request.

Evidence:

- `src/components/landing/ai-chat-widget.tsx:552`
- `src/app/api/chat/gemini/route.ts:31`

Impact:

- Larger request bodies than needed
- Content logic duplicated on both client and server
- More chances for stale prompt construction when content shape changes

Recommendation:

- Send `locale`, `context`, and small identifiers only.
- Build prompt content server-side from the canonical content modules.

### 9. Lint warnings are concentrated in the most fragile hook

Severity: Medium

All 27 lint warnings come from `src/hooks/use-gemini-live.ts`, including:

- missing hook dependencies
- unstable dependency arrays
- heavy `console.log` usage
- `useRef<any>`

Impact:

- This is the part of the codebase most likely to drift into race conditions and hard-to-debug behavior.

Recommendation:

- Treat `use-gemini-live.ts` as a refactor target, not a "clean up later" file.
- Add explicit message/session types and remove `any`.
- Introduce a small logger wrapper if verbose voice logging is still needed.

## Repository Hygiene Findings

### 10. The repo currently mixes app code, generator code, templates, and experiments without a clear boundary

Severity: Medium

The following are all present in the same repository root:

- shipping app code in `src/`
- generator code in `create-agentic-app/`
- design/template assets in `docs/template/`
- legacy/starter docs and specs

This may be intentional, but the root-level docs do not explain the split.

Recommendation:

- If the monorepo shape is intentional, document it explicitly.
- If not, move generator/template assets to a separate repo or a clearly named workspace area.

### 11. Suspicious root-level tracked artifacts should be reviewed

Severity: Low

Tracked root files include:

- `icacls`
- `takeown`
- `reset.bat`
- `test-gemini-ws.html`

Some of these look like local troubleshooting artifacts rather than durable product assets.

Recommendation:

- Remove them if they are not part of a deliberate support workflow.
- If they are intentional, document why they belong in the root.

## What Is Actually In Good Shape

- TypeScript and production build are both green.
- The app compiles despite the current landing refactor.
- Content typing is thorough, even if the content layout is now too large.
- The repo already has a cleanup spec (`specs/codebase-cleanup/`), but it does not cover the critical auth/security issues above.

## Recommended Cleanup Order

1. Protect all `/api/admin/*` routes server-side.
2. Replace the fake Gemini token flow with a real secure approach.
3. Decouple `build` from migrations.
4. Fix or remove the non-functional contact form path.
5. Rewrite root docs so the repo matches reality.
6. Refactor `use-gemini-live.ts`.
7. Split `ai-chat-widget.tsx` and `voice-conversation-mode.tsx`.
8. Move localized content into section modules.
9. Review root artifacts and repo boundaries.

## Bottom Line

This is not a "start over" codebase.

It is a codebase that needs:

- security cleanup first
- operational cleanup second
- component/content refactoring third

If those are done in that order, the project is in a reasonable place to continue building.
