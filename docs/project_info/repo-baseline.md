# Repo Baseline: What Ships vs What Doesn't

Date: 2026-03-02

## Shipping App (What We Build/Deploy)

- `src/`: Next.js app code (components, hooks, routes, lib, content).
- `public/`: static assets served by Next.js.
- `drizzle/`: database schema + migrations (used by `pnpm build` via `db:migrate`).
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, Tailwind/PostCSS config: build/tooling config.

Primary commands (must stay green):

```powershell
pnpm lint
pnpm typecheck
pnpm build:ci
```

## Non-Shipping (Documentation / Planning / Prototypes)

- `docs/`: planning + documentation (excluded from TS inputs via `tsconfig.json`).
- `specs/`: specs and experiments (excluded from repo-wide TS/ESLint; should not affect builds).
  - `specs/gemini-live-voice-example/`: local prototype (ignored by git; not part of the app).
- `create-agentic-app/`: template sync source (excluded from TS inputs).

## Generated / Local-Only (Never Commit)

- `.next/`, `out/`: Next build artifacts.
- `node_modules/`, `.pnpm-store/`: dependencies.
- `.env*`: environment files (gitignored).
- `*.tsbuildinfo`: TypeScript incremental build artifacts.

## Lint/Typecheck Boundaries (Intentional)

- TypeScript project inputs are defined by `tsconfig.json`:
  - `docs/` and `specs/` are excluded so prototypes/plans cannot break `pnpm typecheck` or `pnpm build:ci`.
- ESLint ignores are defined by `eslint.config.mjs`:
  - `docs/**` and `specs/**` are ignored for the same reason.

## Working Agreements

- If something is not shipped, it must not break CI.
- If a prototype in `specs/` needs typechecking, it should have its own `tsconfig.json` and its own script (separate from app CI).
- Planning docs live under `docs/plans/**` and should be committed when they track execution.

