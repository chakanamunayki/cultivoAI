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

- Date: 2026-03-02
  - Change: Locked V2 content and UX direction from review of `docs/plans/landing-page-audit/new-cotent-for-landing-page.md`.
  - Files: this tracker (implementation starts next thread)
  - Verification: decisions confirmed by user in chat
  - Notes:
    - Keep design language standardized (current brutalist system, no redesign pivot).
    - Remove from homepage now: Semilla section, long Real Examples library, project19 transcript/stack/cost references, age references, father/son positioning in sales sections.
    - Keep father/son narrative in About only.
    - Primary CTA destination: open contact modal.
    - Secondary CTA destination: `#projects` on homepage.
    - Implement bilingual pass in same delivery (`en.ts` + `es.ts`).
    - Demos on homepage: gateway only ("See demos"), no featured project19 block.
    - Partnership simplification: remove deferred payment and revenue share options.
    - Include accessibility cleanup in same pass (nav/footer semantic click targets and related a11y polish).

## Decision Lock (2026-03-02)

Approved implementation decisions:

1) Section scope
- Remove homepage Semilla section.
- Remove long Real Examples section content from homepage (or reduce to non-library format in later phase).
- Keep AI in Action as a lightweight gateway to `/demos` only.

2) CTA behavior
- Primary CTA: opens contact modal.
- Secondary CTA: scroll to `#projects`.

3) Messaging guardrails
- Remove pricing/stack namedrops and age/family framing from core sales copy.
- Keep "father and son" storytelling only in About context.
- Keep positioning around human-first systems, health/sustainability, practical outcomes.

4) Partnerships
- Keep simplified models; remove deferred payment and revenue-share framing from homepage.

5) Implementation quality bar
- Do EN and ES together.
- Include semantic/a11y cleanup while applying content changes.
- Keep build checks green: `pnpm lint`, `pnpm typecheck`, `pnpm build:ci`.

## Next Thread Start Plan

P0:
- Update `src/content/en.ts` and `src/content/es.ts` with approved copy and section removals.
- Update homepage composition in `src/app/page.tsx` to remove non-shipping sections from this phase.
- Update nav/footer links to match remaining sections.
- Convert remaining non-semantic click targets in nav/footer to semantic controls/anchors.

P1:
- Convert Demos block to homepage gateway behavior (button to `/demos`) with minimal copy.
- Simplify partnership cards/content to approved 3-model framing.

P2:
- Align chat contextual greetings and contact form labels with updated positioning.
