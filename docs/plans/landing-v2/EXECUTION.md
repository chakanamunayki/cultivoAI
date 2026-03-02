# Execution Tracker: Landing V2 (Content Refresh + Conversion)

Owner: Paul/Rocky + Codex
Start date: 2026-03-02
Prereq: `docs/plans/landing-page-audit/EXECUTION.md` P0 complete (build green baseline).

## Goal

Ship a simpler, clearer landing page that converts, with progressive disclosure and “depth” moved into pillar pages + interactive tools + (later) blog/news.

## Definition Of Done

- Message clarity: 1 primary promise + 1 primary CTA above the fold.
- Reduced cognitive load: sections trimmed/reordered; no “wall of info”.
- Performance: no regressions in `pnpm build:ci` output and no new console errors.
- SEO: canonical + OG/Twitter basics set; sitemap/robots consistent with public routes.
- A11y: interactive elements are buttons/links; modals remain accessible.
- Builds green: `pnpm lint`, `pnpm typecheck`, `pnpm build:ci` all pass.

## Inputs Needed (From Paul/Rocky)

1) Hero
- Primary headline (English + Spanish if needed)
- Subheadline (1–2 lines)
- Primary CTA label + destination (e.g. “Book a call”, “WhatsApp”, “Chat”)
- Secondary CTA (optional)

2) Offer
- 3–5 “what we do” bullets (plain language)
- 2–3 target customer types (who it’s for / not for)
- 3 proof points (results, logos, case highlights, or credible metrics)

3) Voice/Brand
- Tone (direct, playful, formal, etc.)
- “No-go” words or claims (especially health-adjacent)

4) Conversion Path
- What counts as a lead? (form submit, WhatsApp click, chat started, etc.)
- Preferred primary channel

## Proposed Landing Structure (V2)

Above the fold
- Headline + subheadline
- Primary CTA + secondary CTA
- 3 trust bullets (speed, direct access, outcomes)
- 1 interactive “micro-proof” (see ideas below)

Mid page
- “How we work” (3 steps)
- Services (3 cards max, link to detail pages)
- Proof (short: 3–6 items)
- FAQ (only real questions; avoid fluff)

Bottom
- Final CTA
- Lightweight footer with contact links

Progressive disclosure
- Add detail on dedicated pages (pillar pages) rather than expanding the landing.

## Interactivity Ideas (Pick 1–2 for V1)

- “Project Fit” flow (5 questions → recommended next step + CTA)
- ROI / time-saved calculator (lightweight; exportable summary later)
- “Pick your outcome” selector (buttons change the subheadline and CTA context)
- “Ask CultivoAI” (chat with guardrails + clear next step; link to contact)

## Execution Checklist (Ordered)

P0. Content Integration
- [ ] Implement new hero copy + CTA
- [ ] Reduce/merge sections; move depth into pillar pages (links only for now)
- [ ] Ensure nav/footer interaction targets are semantic (`<a>`/`<button>`)

P0. Analytics (Minimal)
- [ ] Track CTA events (WhatsApp/call/contact/chat) in a single place (no vendor lock-in)
- [ ] Track “interactive tool” completion rate

P0. SEO Baseline
- [ ] Canonical strategy + metadata base URL decision
- [ ] OG/Twitter images (even a placeholder, but intentional)
- [ ] Ensure sitemap lists only public indexable URLs

P1. Interactivity V1
- [ ] Build chosen interactive module(s)
- [ ] Validate a11y + keyboard flows
- [ ] Keep bundle impact reasonable

## Commands (Run After Each Major Step)

```powershell
pnpm lint
pnpm typecheck
pnpm build:ci
```

## Work Log

Template (append entries)
- Date:
  - Change:
  - Files:
  - Verification:
  - Notes:

