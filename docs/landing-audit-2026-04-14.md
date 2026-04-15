---
title: CultivoAI Pre-Launch Audit
date: 2026-04-14
status: active
owner: Paul
purpose: Finalise everything needed to get CultivoAI live. Screenshots referenced per section.
---

# CultivoAI Pre-Launch Audit

Full audit of the landing page, chat widget, voice mode, APIs, content, mobile behaviour, and deploy readiness. Organised so we can walk through it section by section. Each item has a status flag:

- [OK] shippable as-is
- [CHECK] needs visual/behaviour verification (screenshot expected here)
- [FIX] must fix before launch
- [DEFER] can ship without, revisit after launch

Baseline checks, 2026-04-14:
- `pnpm typecheck` — passes (exit 0)
- `pnpm lint` — passes (exit 0, no warnings reported after filter)
- `pnpm build:ci` — not re-run in this audit, re-run before deploy

---

## 1. Landing Page Structure

Entry: [src/app/page.tsx](src/app/page.tsx)
Layout: [src/app/layout.tsx](src/app/layout.tsx)

### 1.1 Section order as rendered

| # | Section | Component | Above fold | ID | Notes |
|---|---------|-----------|------------|----|-------|
| 1 | Hero | [hero-section.tsx](src/components/landing/sections/hero-section.tsx) | yes | `#hero` | Video bg from codepen asset |
| 2 | About / Team | [about-section.tsx](src/components/landing/sections/about-section.tsx) | yes | `#about` | 3 team member cards |
| 3 | How We Work | [how-we-work-section.tsx](src/components/landing/sections/how-we-work-section.tsx) | lazy | `#how-we-work` | 3 pillars |
| 4 | What We Do | [what-we-do-section.tsx](src/components/landing/sections/what-we-do-section.tsx) | lazy | `#what-we-do` | Intro + columns |
| 5 | Why Us | [why-us-section.tsx](src/components/landing/sections/why-us-section.tsx) | lazy | `#why-us` | |
| 6 | Services | [services-section.tsx](src/components/landing/sections/services-section.tsx) | lazy | `#services` | Uses `StackingServiceCards` |
| 7 | Who We Help | [who-we-help-section.tsx](src/components/landing/sections/who-we-help-section.tsx) | lazy | `#who-we-help` | Sector tiles |
| 8 | Partnerships | [partnerships-section.tsx](src/components/landing/sections/partnerships-section.tsx) | lazy | `#partnerships` | Pricing models |
| 9 | Projects | [projects-section.tsx](src/components/landing/sections/projects-section.tsx) | lazy | `#projects` | Alternating layout, modal on click |
| 10 | Values | [values-section.tsx](src/components/landing/sections/values-section.tsx) | lazy | `#values` | |
| 11 | Mission | [mission-section.tsx](src/components/landing/sections/mission-section.tsx) | lazy | `#mission` | |
| 12 | What Happens Next | [what-happens-next-section.tsx](src/components/landing/sections/what-happens-next-section.tsx) | lazy | `#what-happens-next` | Steps, no CTA on card |
| — | Footer | [footer.tsx](src/components/landing/layout/footer.tsx) | — | — | |

### 1.2 Sections built but NOT rendered on the landing [FIX or DEFER]

Present in [src/components/landing/sections/index.ts](src/components/landing/sections/index.ts#L1-L8) but never imported into page.tsx:

- `SemillaSection` — Rocky's fund initiative
- `StoriesSection` — testimonials / real stories
- `ProcessTerminalSection` — terminal-style process visual

Decisions to make:
1. Do we ship without Stories and Semilla for v1? If not, where do they sit in the order?
2. If we're dropping them entirely, remove the exports + files so they don't rot.

### 1.3 Nav behaviour [CHECK]

[src/components/landing/layout/nav.tsx](src/components/landing/layout/nav.tsx)

- Desktop shows only: Services, Projects, About ([nav.tsx:30](src/components/landing/layout/nav.tsx#L30))
- `mix-blend-difference` over hero — looks great but can cause odd text colour at certain scroll positions. Verify against the hero video at all sizes.
- Mobile menu: fullscreen slide-down, dark panel + cyan menu panel. Grid `md:grid-cols-[1.25fr_1fr]`.
- Locale toggle present desktop + mobile.

Screenshot slots:
- Nav over hero, desktop ≥1280
- Nav scrolled past hero, desktop
- Mobile nav collapsed + open

---

## 2. Hero [CHECK]

[src/components/landing/sections/hero-section.tsx](src/components/landing/sections/hero-section.tsx)

- Background: external mp4 from `assets.codepen.io` ([hero-section.tsx:14](src/components/landing/sections/hero-section.tsx#L14))
- Rounded bottom-right `rounded-br-[15vw]` cut.
- CTAs: primary (`Let's talk` → contact modal), secondary (→ #projects), tertiary text link (→ #services)
- Title uses `mix-blend-difference` — readability depends on video brightness.

[FIX candidate] Host the hero video locally in `/public` rather than relying on codepen CDN. Bandwidth + availability risk.

Screenshot slots:
- Hero desktop ≥1280
- Hero mobile portrait
- Hero tablet 768

---

## 3. About / Team [CHECK]

[src/components/landing/sections/about-section.tsx](src/components/landing/sections/about-section.tsx)

- Three team member cards from `content.about.teamMembers`.
- Assets present: [public/landing/photos/team/](public/landing/photos/team/) — `paul.jpg`, `rocky.jpeg`, `marta.jpg`.
- Cards hover: lift + shadow change, grayscale → colour on hover.
- Footer note block in cyan.

[CHECK] Only 3 members — make sure content array isn't accidentally pruned. Also note hero `loading="eager"` for member images — fine for LCP but all 3 eager-load 4:5 aspect photos.

Screenshot slots:
- About desktop 3-up
- About mobile stacked

---

## 4. Services [CHECK]

[src/components/landing/sections/services-section.tsx](src/components/landing/sections/services-section.tsx)
Stacking cards: [stacking-service-cards.tsx](src/components/landing/ui/stacking-service-cards.tsx)

- Dark `#212121` background.
- `StackingServiceCards` uses framer-motion `useScroll` (regression risk — prior commit `34530ee` fixed a useScroll warning, keep an eye on it).
- CTA at bottom: "Agenda 15 minutos" / "Book a 15-minute call" → opens contact modal.
- Service animations live in [ui/service-animations/](src/components/landing/ui/service-animations/) (8 files).

Screenshot slots:
- Services stack at rest (desktop)
- Services mid-scroll transition
- Services mobile

---

## 5. Projects [CHECK]

[src/components/landing/sections/projects-section.tsx](src/components/landing/sections/projects-section.tsx)
Modal: [project-modal.tsx](src/components/landing/ui/project-modal.tsx)

- Alternating blue / dark variant cards, full-width buttons.
- Opens `ProjectModal` on click.
- Recent commits (`eabab48`, `f83b25c`, `34530ee`) indicate stats/URL field + nested-button fix + useScroll fix — all in.

Screenshot slots:
- Projects list desktop
- Project modal open
- Projects mobile

---

## 6. Who We Help / Partnerships / Values / Mission / What Happens Next

Lower-fold story sections. All wired to lazy-load, all use content from [src/content/locales/](src/content/locales/).

[CHECK] each for:
- Correct sector / partnership imagery (`public/landing/photos/sectors/`, `public/landing/photos/partnerships/`)
- CTA destinations (most open the contact modal)

Screenshot slots per section: desktop + mobile.

---

## 7. Footer [CHECK]

[src/components/landing/layout/footer.tsx](src/components/landing/layout/footer.tsx)

Must verify:
- Contact info: `content.footer.contactInfo.email`, `.whatsapp`, `.whatsappDisplay`, `.location`
- Legal / copyright line
- Quick-jump links match section IDs in nav

---

## 8. Chat Widget (Gemini)

[src/components/landing/ai-chat-widget.tsx](src/components/landing/ai-chat-widget.tsx) — 869 lines
API: [src/app/api/chat/gemini/route.ts](src/app/api/chat/gemini/route.ts)
Prompt builder: [src/lib/chat/system-prompt.ts](src/lib/chat/system-prompt.ts) — 631 lines
Functions: [src/lib/chat/functions.ts](src/lib/chat/functions.ts) — 353 lines

### 8.1 Flow [CHECK]

- Widget loaded via `dynamic({ ssr: false })` 2.5s after paint, or instantly if placeholder clicked ([page.tsx:164-170](src/app/page.tsx#L164)).
- Placeholder shown before load: WhatsApp button + "Chat AI" button, bottom-right ([page.tsx:123-147](src/app/page.tsx#L123)).
- Opening chat: generates sessionId, POSTs `/api/chat/conversations`, loads contextual greeting based on `ChatContext`.
- Messages POST to `/api/chat/gemini` with `siteContent` + history + locale + timezone + pageUrl.
- Model: `gemini-2.5-flash` (configurable via `GEMINI_CHAT_MODEL`).
- Function calling enabled: `navigate_to_section`, `show_project_details`, `show_service_details`, plus lead capture.

### 8.2 Lead capture

- Inline contact form component: [chat-inline-contact-form.tsx](src/components/landing/chat-inline-contact-form.tsx)
- POSTs to `/api/leads` ([route.ts](src/app/api/leads/route.ts)) — calculates qualification score + level on save.
- Conversation → lead linked via PATCH on `/api/chat/conversations`.
- WhatsApp handoff link built via `buildWhatsAppMessage` / `getWhatsAppUrl`.

### 8.3 Known issues [FIX]

1. **Large `siteContent` payload on every request** — widget sends the full content object every message. Move prompt assembly server-side, send only `locale + context + ids`. Already flagged in [docs/codebase-audit-2026-03-05.md](docs/codebase-audit-2026-03-05.md#L186-L208).
2. **Widget file size** — 869 lines mixing transport, UI, lead form, voice entry, audio. Not a blocker, but regression risk. DEFER splitting until post-launch unless we hit a bug.
3. **Error messages in Spanish/English present** — verify user sees correct-locale error on quota 429.

Screenshot slots:
- Widget closed (placeholder)
- Widget open, default state
- Widget with assistant reply
- Widget with inline contact form
- Widget → voice mode handoff
- Mobile chat full-screen vs floating

---

## 9. Voice Mode (Gemini Live)

[src/components/landing/voice-conversation-mode.tsx](src/components/landing/voice-conversation-mode.tsx) — 705 lines
Hook: [src/hooks/use-gemini-live.ts](src/hooks/use-gemini-live.ts)
Token: [src/app/api/voice/token/route.ts](src/app/api/voice/token/route.ts)
Synthesize: [src/app/api/voice/synthesize/route.ts](src/app/api/voice/synthesize/route.ts)
Transcribe: [src/app/api/voice/transcribe/route.ts](src/app/api/voice/transcribe/route.ts)

### 9.1 Flow [CHECK]

- Opened from inside chat widget (voice contact form captures name/email/phone first).
- Pre-connection form gate (`showInitialForm` default true).
- Uses `useGeminiLive` for WebSocket, VAD, transcripts, frequency data.
- Visual modes: Idle / Connecting / Error / Live canvas + mic level.
- Conversation logged to `/api/chat/conversations` (entryContext = "voice", model = "gemini-live-2.0-flash").

### 9.2 Critical security issue [FIX] — inherited from 2026-03-05 audit

[api/voice/token/route.ts:92-107](src/app/api/voice/token/route.ts#L92-L107) base64-encodes the **real `GEMINI_API_KEY`** into the returned token. Client decodes and uses it directly. That is not an ephemeral token — it exposes the raw key to the browser.

Options to fix before launch:
1. Proxy the Gemini Live WebSocket server-side (preferred, no key in browser).
2. Use Google's proper ephemeral auth if available for Live API.
3. At minimum, put voice mode behind a feature flag + require auth before issuing the token.

Confirm status — if this was fixed since March, remove from the fix list.

### 9.3 Browser support [CHECK]

Requires: `getUserMedia`, `AudioWorklet`, `WebSocket`. iOS Safari historically flaky with AudioWorklet + 44.1kHz. Test on:
- iOS Safari (latest + one version back)
- Android Chrome
- Desktop Chrome, Safari, Firefox

Screenshot / recording slots:
- Voice pre-form
- Voice connecting animation
- Voice live with visualizer
- Voice error state

---

## 10. Contact Modal

[src/components/landing/ui/contact-modal.tsx](src/components/landing/ui/contact-modal.tsx)

- Submits to `/api/leads` via `createLead` — [CHECK] confirm success state renders; older audit flagged this as placeholder, current code does call `createLead`.
- WhatsApp fallback button present.
- "Open chat" button swaps to chat widget.

---

## 11. API Routes Inventory

| Route | Method | Purpose | Auth | Notes |
|-------|--------|---------|------|-------|
| `/api/chat/gemini` | POST | Main chat completion | none | sends big `siteContent` |
| `/api/chat/conversations` | POST/PATCH | Create + update conversations / log messages | none | |
| `/api/chat` | POST | Legacy OpenRouter chat | none | still present, check if used |
| `/api/voice/token` | POST/GET | Voice ephemeral token | rate-limited, **no real auth** | [FIX] leaks API key |
| `/api/voice/synthesize` | POST | TTS synth | none | |
| `/api/voice/transcribe` | POST | STT | none | |
| `/api/leads` | POST/PATCH | Create / qualify leads | none | |
| `/api/admin/*` | — | Admin dashboard data | **none server-side** | [FIX] critical |
| `/api/auth/[...all]` | — | Better Auth | n/a | |
| `/api/diagnostics` | — | Dev diagnostics | — | verify not shipped to prod |

### 11.1 [FIX] Admin API routes have no server-side auth

Confirmed: grep for `getSession|requireAuth|auth.api` across `src/app/api/admin/**` returns zero matches. Client-side gating on `/admin` alone is not enough. Anyone hitting `/api/admin/*` can read lead data.

Must add a shared server guard before launch. Simplest path:

```ts
// src/lib/admin-guard.ts
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Response("Unauthorized", { status: 401 });
  // optional allowlist of emails
  return session;
}
```

Call at the top of every `src/app/api/admin/**/route.ts` handler.

### 11.2 [FIX] Production build couples migration

[package.json:9](package.json#L9) still has `build:with-migrate`. Current `build` uses filter wrapper, good. Make sure deploy platform runs `pnpm build` (not `build:with-migrate`) and runs migrations as a separate deploy step.

---

## 12. Content and i18n

[src/content/es.ts](src/content/es.ts) + [src/content/en.ts](src/content/en.ts) — ~156 lines each, re-exporting from [src/content/locales/es/](src/content/locales/es/) and `en/`.

Both have modules for: `about`, `closing-sections`, `partnerships`, `projects`, `semilla`, `services`, `stories`, `use-cases`, `who-we-help`.

### 12.1 Memory rule compliance — em dashes [OK]

Searched `src/content/**` for `—` and `–`: zero matches. Compliance confirmed.
One em dash appears in [src/components/landing/ui/service-animations/SoftwareWebAnimation.tsx:85](src/components/landing/ui/service-animations/SoftwareWebAnimation.tsx#L85) — decorative code-editor tab label "page.tsx — CultivoAI". Non-copy, fine to leave but flag if strict.

### 12.2 Parity check [CHECK]

Both es.ts and en.ts are the same length (156 lines), same import list. Do a visual walkthrough in both languages to confirm every section renders correctly and nothing reads like machine translation.

### 12.3 Typos / stylistic review [CHECK]

- Spanish: many accents stripped (`consultoría` → `consultoria`, `automatización` → `automatizacion`, `información` → `informacion`). Decide if that's intentional (safer across old systems) or if we want proper accented Spanish for the public site. If we want accents, do a single pass across `src/content/locales/es/*` + layout metadata.
- Layout metadata strings in [layout.tsx:55-89](src/app/layout.tsx#L55) are also unaccented.

---

## 13. Mobile Responsiveness

Twenty-six grid/flex breakpoint hits across sections. High-risk areas to screenshot:

| Area | Why it's risky |
|------|----------------|
| Hero `clamp()` title | Very large type, verify no horizontal scroll at 320px |
| About cards | Neumorphic shadows can clip on mobile |
| Stacking service cards | Framer scroll behaviour on small viewports |
| Projects alternating | 12-col grid collapses at `lg:` — verify md layout |
| Mobile nav | Full-screen takeover with `md:grid-cols-[1.25fr_1fr]` |
| Chat widget | Position `fixed bottom-6 right-6` — check vs iOS safe-area |
| Voice visualizer canvas | Canvas sizing on rotation |

Recommended viewports to capture:
- 320 × 640 (smallest common)
- 375 × 667 (iPhone SE)
- 390 × 844 (iPhone 14)
- 768 × 1024 (tablet)
- 1024, 1280, 1536 (desktop breakpoints)

---

## 14. Build, Deploy, SEO

### 14.1 Metadata [CHECK]

[src/app/layout.tsx:53-94](src/app/layout.tsx#L53-L94):
- Title template + default OK.
- OG image: **not set** — Twitter card `summary_large_image` will render blank. [FIX] add `openGraph.images` + `twitter.images` pointing to a hosted OG image.
- Icons: only favicon.ico wired in manifest. There's an `icon.svg` at [src/app/icon.svg](src/app/icon.svg) (untracked in git status) — wire into manifest.

### 14.2 Sitemap / robots [CHECK]

- [src/app/sitemap.ts](src/app/sitemap.ts) only outputs the homepage. Fine for a single-page site — confirm we don't want `/dashboard`, `/chat`, `/admin` (we don't).
- [src/app/robots.ts](src/app/robots.ts) correctly disallows `/api/`, `/admin/`, `/dashboard/`, `/profile/`, `/chat/`.

### 14.3 Environment variables at launch

Required in prod:
- `POSTGRES_URL`
- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET`
- `GEMINI_API_KEY` (+ optional `GEMINI_CHAT_MODEL`)
- `OPENROUTER_API_KEY` (+ `OPENROUTER_MODEL`) — only if legacy `/api/chat` is still used
- `NEXT_PUBLIC_APP_URL` — must be set to production domain so sitemap + jsonLd resolve correctly
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — otherwise falls back to hardcoded `573106172607`

Not required unless used:
- `BLOB_READ_WRITE_TOKEN`
- Polar keys

### 14.4 Hosting

- No `vercel.json` / `railway.toml` present at root — confirm target host (Vercel likely for Next.js 16).
- Windows Next 16 file-watching bug noted in CLAUDE.md — not a prod concern, prod is Linux.

---

## 15. Known Issues Surviving Since 2026-03-05 Audit

Cross-reference [docs/codebase-audit-2026-03-05.md](docs/codebase-audit-2026-03-05.md):

| # | Issue | Status 2026-04-14 |
|---|-------|-------------------|
| 1 | Admin API routes unprotected | **STILL OPEN** — confirmed |
| 2 | Voice token exposes real API key | **STILL OPEN** — code unchanged |
| 3 | Build coupled to migrate | Partially fixed — default `build` no longer migrates, but `build:with-migrate` still available |
| 4 | Contact modal placeholder submit | **FIXED** — now calls `createLead` |
| 5 | README misleading | Partially updated |
| 6 | Oversized client files | Unchanged, tolerable |
| 7 | Too many `use client` | Unchanged |
| 8 | Chat sends large siteContent each msg | Unchanged |
| 9 | Lint warnings in use-gemini-live | **FIXED** — current lint run is clean |
| 10 | Repo has generator + template mixed in | Unchanged |

---

## 16. Launch Punch List (ordered)

Must do before launch:

1. [FIX] Protect all `/api/admin/**` routes with a server session guard.
2. [FIX] Fix voice token key leak (proxy server-side or disable voice at launch).
3. [FIX] Add OG image + twitter image to `src/app/layout.tsx` metadata.
4. [FIX] Set `NEXT_PUBLIC_APP_URL` + `NEXT_PUBLIC_WHATSAPP_NUMBER` in production.
5. [DECIDE] Ship or drop `SemillaSection` + `StoriesSection` + `ProcessTerminalSection`. If shipping, wire into `page.tsx`. If dropping, delete the files + exports.
6. [FIX] Host the hero video locally instead of external codepen CDN.
7. [DECIDE] Accented Spanish or stripped? Make one choice, apply consistently.
8. [CHECK] Walk through every section in ES and EN with screenshots at the listed viewports.
9. [CHECK] Walk through the chat widget flow end-to-end incl. lead capture + WhatsApp.
10. [CHECK] Walk through voice mode on desktop + iOS + Android.
11. [CHECK] Contact modal submit → confirm lead appears in DB.
12. [CHECK] Admin dashboard shows the test lead (after 1 is fixed).
13. [CHECK] Run `pnpm build:ci` against production env vars.

Nice to have post-launch:
- Split `ai-chat-widget.tsx` and `voice-conversation-mode.tsx` into smaller modules.
- Move prompt assembly server-side; shrink chat request payloads.
- Reduce `use client` footprint on purely presentational sections.
- Add analytics (Vercel Analytics / Plausible).
- Add `/404` + `/error` content review.

---

## 17. Screenshot Checklist

Below is a clean list of screenshot slots we agreed on, grouped so you can grab them in one pass per viewport. Drop the images next to each bullet (or paste paths) and we'll wire them into this doc.

### Desktop ≥ 1280
- [ ] Nav over hero
- [ ] Nav after scroll
- [ ] Hero
- [ ] About (3-up)
- [ ] How We Work
- [ ] What We Do
- [ ] Why Us
- [ ] Services — rest state
- [ ] Services — mid-scroll
- [ ] Who We Help
- [ ] Partnerships
- [ ] Projects list
- [ ] Project modal open
- [ ] Values
- [ ] Mission
- [ ] What Happens Next
- [ ] Footer
- [ ] Chat placeholder (closed)
- [ ] Chat open, default
- [ ] Chat with inline contact form
- [ ] Voice pre-form
- [ ] Voice connecting
- [ ] Voice live

### Tablet 768
- [ ] Hero
- [ ] Services stack
- [ ] Projects
- [ ] Mobile nav open
- [ ] Chat open

### Mobile 390
- [ ] Nav collapsed
- [ ] Nav open (full-screen takeover)
- [ ] Hero
- [ ] About stacked
- [ ] How We Work stacked
- [ ] Services stacked
- [ ] Projects stacked
- [ ] Partnerships stacked
- [ ] Footer
- [ ] Chat full-screen
- [ ] Voice pre-form
- [ ] Voice live

### Mobile 320
- [ ] Hero — confirm no horizontal scroll
- [ ] Services — confirm cards don't clip
- [ ] Contact modal — confirm form is usable

---

## 18. How we'll work through this

1. You capture the screenshots in the order above and drop them into `docs/screenshots/landing-audit-2026-04-14/` (I'll create the folder when you're ready).
2. We walk section by section. For each, I compare the screenshot against the intended behaviour and call out any visual / copy / wiring issue.
3. We tackle the [FIX] items in Section 16 in order — I'll open each one as a focused edit when you say go.
4. Final run: `pnpm check` + `pnpm build:ci` against prod env, then deploy.

End of audit.
