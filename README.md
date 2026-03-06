# CultivoAI

CultivoAI is a bilingual marketing site and MVP platform for an AI and automation consultancy. The repository currently includes the public landing page, lead capture flows, a Gemini-powered website assistant, voice conversation experiments, authenticated app pages, and an internal admin surface for reviewing leads and conversations.

## Current Focus

The active cleanup plan for the MVP lives in `docs/plan/mvp-cleanup-execution-log.md`.

This cleanup pass is focused on frontend and repo quality. Database and backend cleanup are intentionally deferred.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Drizzle ORM
- Better Auth
- Google Gemini / Groq integrations
- pnpm

## Main Areas

- `/` public landing page with bilingual content, modals, chat widget, and voice UI
- `/admin` internal dashboard for leads, conversations, and exports
- `/chat`, `/dashboard`, `/profile` authenticated app routes from the starter base
- `/api/*` app APIs for chat, voice, leads, auth, diagnostics, and admin data

## Repo Map

- `src/` shipping application code
- `docs/` product docs, plans, audits, and technical notes
- `specs/` implementation specs and historical planning docs
- `create-agentic-app/` bundled generator/template source kept in this repo
- `drizzle/` SQL migrations and metadata
- `public/` static assets

## Repo Boundaries

- `src/`, `public/`, `drizzle/`, and root Next.js config files are the live MVP application.
- `create-agentic-app/` is a separate scaffolding package (template/generator source), not part of the runtime app bundle.
- `docs/template/**` and most historical `specs/**` content are reference/planning assets, not production runtime code.

## Dev Maintenance

- Windows cache reset script: `scripts/windows/clear-all-cache.bat`
- Cache troubleshooting guide: `docs/technical/dev-workflows/cache-busting-guide.md`

## Scripts

```bash
pnpm dev
pnpm dev:turbo
pnpm lint
pnpm typecheck
pnpm check
pnpm build:ci
pnpm build
pnpm build:with-migrate
pnpm db:generate
pnpm db:migrate
pnpm db:push
pnpm db:studio
```

Note:

- `pnpm build` is a pure `next build` (no migration side effects)
- `pnpm build:with-migrate` runs migrations before `next build` (explicit opt-in)
- `pnpm build:ci` runs the same pure application build as `pnpm build`

## Local Setup

1. Install dependencies.
2. Copy `env.example` to `.env`.
3. Fill in the required environment variables.
4. Start the database if needed.
5. Run migrations.
6. Start the app.

```bash
pnpm install
copy env.example .env
pnpm db:migrate
pnpm dev
```

## Environment

Common variables used by the app:

- `POSTGRES_URL`
- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GEMINI_API_KEY`
- `GROQ_API_KEY`
- `OPENROUTER_API_KEY`
- `NEXT_PUBLIC_APP_URL`

Check the current example file for the full list:

- `env.example`

## Notes

- The repository still contains historical starter/template material. Not everything under `docs/` or `create-agentic-app/` is part of the live product runtime.
- The current audit document is `docs/codebase-audit-2026-03-05.md`.
- The public landing experience is the main MVP surface being cleaned up first.
