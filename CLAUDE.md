# CultivoAI - AI Assistant Guidelines

## 🚨 CRITICAL: Content Changes Not Showing? Read This First!

If content changes aren't appearing after editing `src/content/es.ts` or `src/content/en.ts`:

**ROOT CAUSE:** Next.js dev server may be reading from **committed git version** instead of working directory files.

**SOLUTION:**
1. **Commit your content changes immediately:**
   ```bash
   git add src/content/es.ts src/content/en.ts
   git commit -m "update content"
   ```
2. **Kill server + delete cache:**
   ```bash
   # Kill server (Ctrl+C)
   rm -rf .next
   pnpm dev
   ```
3. **Hard refresh browser:** `Ctrl+Shift+R`

**Why this happens:**
- **Next.js 16.0.3 bug**: File watching on Windows + pnpm doesn't detect uncommitted changes
- Next.js reads from git-committed files instead of working directory
- Hydration errors cause React to discard server HTML and use stale client state
- Browser cache compounds the problem

**Permanent fix (recommended):**
```bash
pnpm update next@latest
# Upgrades from 16.0.3 to 16.0.8+ which fixes the file watching bug
```

**Workaround until upgrade:** Always commit content changes before testing them in the browser.

---

## Project Overview

CultivoAI is a bilingual (Spanish/English) AI and automation consultancy website for a father-son duo (Paul & Rocky) based in Colombia. The site began as a Neo-Brutalist design and has since moved to a **soft dark-card look** (rounded corners, soft shadows) in cyan, near-black and white, with an integrated Gemini AI chat assistant.

### Tech Stack

- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **AI Integration (Chat Widget)**: Google Gemini AI (`@google/genai`) with function calling
- **AI Integration (Backend)**: Vercel AI SDK 5 + OpenRouter (for other AI features)
- **Authentication**: BetterAuth with Google OAuth
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Custom landing components (NO shadcn theming - preserve the existing design)
- **Styling**: Tailwind CSS 4 (NO dark mode - single theme only)
- **Internationalization**: Browser language detection (Spanish/English). Portuguese content exists in `src/content/pt.ts` + `locales/pt/` but is hidden; re-enable by adding `"pt"` to `ENABLED_LOCALES` in `src/content/enabled-locales.ts`.

---

## CultivoAI Frontend Design System

### CRITICAL: Design Preservation Rules

**Do not restyle existing sections unless Paul asks for it.**

**Style direction (updated 2026-11-11): the site is no longer brutalist.** New or reworked UI
uses rounded corners, soft blurred shadows and no hard black borders or zero-blur offset
shadows. The palette (cyan, near-black, white) and Space Grotesk stay. Take the look from
`src/components/landing/ui/landing-card-styles.ts` and the live sections. Hard offset shadows
survive only in older pieces (chat widget, voice mode, `demos/`); leave those as they are and
do not copy them into new work.

Historical note: older docs referenced `docs/template/App.tsx` as the visual source of truth, but that file is **not present** in this repo anymore.

The **current landing implementation** in `src/app/page.tsx` and `src/components/landing/**` is the canonical visual/UX reference. When implementing:

1. **Preserve ALL visual elements exactly** - colors, shadows, borders, animations, spacing
2. **Preserve ALL effects** - hover states, transitions, scroll animations, marquee
3. **One theme only** - No theme switcher, no Rocket/Playful theme
4. **NO dark mode toggle** - Single theme, no light/dark switching
5. **Preserve the AI chat widget** - Gemini integration with function calling
6. **Split into components** but keep visual parity with what is already there

### Design Characteristics (as built, checked 2026-11-11)

Older versions of this file described a yellow/purple palette. That is gone. The live
site is **cyan + near-black + white**. Always read `src/app/globals.css` and the landing
components for the truth; this summary is a guide only.

```
- Dark cards: bg-[#212121], rounded-[24px] / rounded-[30px], thin border-white/15,
  soft shadows such as shadow-[0_14px_30px_rgba(0,0,0,0.3)]
- Cyan title bands on cards; white surfaces with soft shadows
  (shadow-[0_10px_24px_rgba(15,23,42,0.08)] etc.) in modals
- Rounded corners everywhere: rounded-full, rounded-2xl, rounded-[16px], rounded-[20px]
- High contrast, bold typography, uppercase labels and title bands
- Hover effects: small translate + shadow change
- Legacy only (chat widget, voice mode, demos/): border-2 / border-4 border-black and
  hard offset shadows like shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
```

**Radius gotcha:** `globals.css` still sets `--radius-sm`, `-md`, `-lg` and `-xl` to `0px`, so
`rounded-sm` through `rounded-xl` render square. Use `rounded-2xl`, `rounded-full` or an
explicit value such as `rounded-[12px]`.

### Color Palette (source: `src/app/globals.css` `--brand-*` tokens)

```css
--brand-primary: #00BCD4;    /* cyan, the main accent */
--brand-ink: #18181b;        /* near-black text; #212121 / #0c0c0c dark panels */
--brand-background: #fafafa;
--brand-surface: #ffffff;
--brand-subtle: #f4f4f5;
--brand-border: #e4e4e7;
--brand-muted: #52525b;
--brand-warning: #f59e0b;
--brand-danger: #dc2626;
/* WhatsApp button: #25D366 */
```

### Typography (Required fonts - load via next/font)

```css
font-grotesk: 'Space Grotesk'     /* Primary - headings, nav */
font-sans: 'Inter'                 /* Body text */
font-mono: 'JetBrains Mono'        /* Code, technical elements */
```

### Key Visual Elements (Must preserve exactly)

Check the component itself for exact classes; do not trust colour names written here.

1. **Marquee / ticker**: infinite scroll animation (integrated into the nav)
2. **Navigation**: sticky, ES/EN selector, "Let's talk" CTA
3. **Hero**: see `sections/hero-section.tsx`
4. **Service Cards**: stacking dark cards with a soft shadow, each with a looping motion
   panel (see `ui/stacking-service-cards.tsx` and `ui/service-animations/`, shared pieces in
   `service-animations/panel-kit.tsx`)
5. **Projects List**: see `sections/projects-section.tsx`
6. **AI Chat Widget + WhatsApp button**: bottom-right floating
7. **Modals**: rounded white surfaces with soft shadows, X close button

### Animations (Must preserve)

```css
/* Marquee */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}

/* Reveal on scroll - use IntersectionObserver */
transition: opacity 1000ms, transform 1000ms;
/* Hidden: opacity-0 translate-y-12 */
/* Visible: opacity-100 translate-y-0 */

/* Hover transforms */
hover:-translate-y-1, hover:-translate-y-2
hover:translate-x-1 hover:translate-y-1
hover:shadow-[4px_4px_0px_0px_...] /* reduced from 8px */

/* Icon bounce */
animate-bounce (on service card icons on hover)
```

---

## Internationalization (i18n)

### CRITICAL: SSR Hydration Rules

**NEVER use browser APIs in useState initializers.** This causes hydration mismatches.

```typescript
// ❌ WRONG - causes hydration mismatch
const [locale, setLocale] = useState(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("locale") || detectBrowserLocale();
  }
  return "es";
});

// ✅ CORRECT - always initialize with SSR default, update in useEffect
const [locale, setLocale] = useState<Locale>("es"); // SSR default

useEffect(() => {
  // Safe to check localStorage/browser AFTER hydration
  const clientLocale = getStoredLocale() || detectBrowserLocale();
  if (clientLocale !== locale) {
    setLocale(clientLocale);
  }
}, []);
```

**Why this matters:**
- Server renders with default value (no window/localStorage)
- Client useState initializer runs AGAIN and may return different value
- React sees mismatch → hydration error → old cached content may persist
- Changes appear not to take effect even after clearing caches

### Language Detection

- Detect browser language via `navigator.language` or `Accept-Language` header
- Default to Spanish (`es`) for Spanish-speaking locales (es, es-*, etc.)
- Default to English (`en`) for all others
- Store user preference in localStorage for persistence
- Provide language toggle in navigation (ES/EN)

### Content Constants (from template)

All text content must have Spanish and English versions:

| Constant | Description |
|----------|-------------|
| `NAV_ITEMS` | Navigation menu labels |
| `COPY.hero` | Hero section headlines and CTAs |
| `SERVICES` | 6 service offerings with title, description, details |
| `PROJECTS` | 5 portfolio projects |
| `PARTNERSHIPS` | 5 flexible pricing models |
| `USE_CASES` | 5 AI demo scenarios |
| `REAL_STORIES` | 11 success stories/testimonials |
| `SEMILLA_CONTENT` | Rocky's fund initiative (about, tiers, services, goal) |
| `WHY_US` | Value proposition (what we're NOT vs what we ARE) |

---

## AI Chat Widget (Gemini)

### Implementation Details

- Package: `@google/genai`
- Model: `gemini-2.5-flash`
- Styling: see `src/components/landing/ai-chat-widget.tsx`
- Position: Fixed bottom-right (`fixed bottom-6 right-6 z-[60]`)

### Function Calling

The chat widget can control the page via these functions:

```typescript
// Scroll to section
navigate_to_section(section_id: string)
// section_id: 'hero' | 'about' | 'services' | 'demos' | 'semilla' | 'partnerships' | 'projects' | 'stories'

// Open project modal
show_project_details(project_title: string)

// Open service modal
show_service_details(service_title: string)
```

### Chat Widget Styling

The widget still carries the earlier brutalist styling: black borders and hard black offset
shadows, with cyan accents. The yellow (`#FFC805`) and purple (`#A855F7`) values that used to
be listed here are no longer in the code. Read `ai-chat-widget.tsx` for the exact classes, and
do not restyle it unless Paul asks.

### Environment Variable

```env
GEMINI_API_KEY=your-gemini-api-key
```

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/        # Better Auth
│   │   ├── chat/                 # Chat API routes
│   │   │   ├── route.ts          # Backend AI (OpenRouter)
│   │   │   ├── gemini/route.ts   # Gemini chat endpoint
│   │   │   └── conversations/    # Conversation logging
│   │   ├── leads/route.ts        # Lead capture API
│   │   └── admin/                # Admin API routes
│   │       ├── stats/route.ts    # Dashboard statistics
│   │       ├── leads/            # Lead management
│   │       ├── conversations/    # Conversation metrics
│   │       └── export/route.ts   # CSV/JSON export
│   ├── admin/                    # Admin dashboard (Phase 4)
│   │   ├── layout.tsx            # Admin layout with nav
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── leads/                # Lead management pages
│   │   ├── conversations/        # Conversation analytics
│   │   └── export/               # Export functionality
│   ├── dashboard/                # User dashboard
│   │   └── page.tsx              # User dashboard page
│   ├── page.tsx                  # Landing page
│   └── layout.tsx                # Root layout with fonts
├── components/
│   ├── landing/                  # CultivoAI landing page components
│   │   ├── layout/               # Nav, Footer, Marquee
│   │   ├── sections/             # Page sections
│   │   ├── demos/                # AI demo visualizations
│   │   ├── ui/                   # Modals, Reveal, etc.
│   │   └── ai-chat-widget.tsx    # Gemini chat (Client Component)
│   ├── auth/                     # Auth components (SignIn, UserProfile)
│   ├── providers/                # Context providers
│   └── ui/                       # shadcn/ui components
├── content/
│   ├── es.ts                     # Spanish content
│   ├── en.ts                     # English content
│   ├── admin.ts                  # Admin dashboard content (ES/EN)
│   └── types.ts                  # Content type definitions
├── types/
│   └── admin.ts                  # Admin TypeScript types
├── hooks/
│   ├── use-locale.ts             # Language detection hook
│   └── use-admin-content.ts      # Admin content hook
└── lib/
    ├── auth.ts                   # Better Auth config
    ├── auth-client.ts            # Auth client hooks
    ├── db.ts                     # Drizzle database
    ├── schema.ts                 # Database schema
    └── chat/                     # Chat utilities
        └── system-prompt.ts      # Gemini system prompt & qualification
```

---

## Environment Variables

```env
# Database
POSTGRES_URL=postgresql://user:password@localhost:5432/db_name

# Better Auth
BETTER_AUTH_SECRET=32-char-random-string

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Gemini AI (Chat Widget)
GEMINI_API_KEY=your-gemini-api-key

# OpenRouter (Backend AI)
OPENROUTER_API_KEY=sk-or-v1-your-key
OPENROUTER_MODEL=openai/gpt-5-mini

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# File Storage (optional)
BLOB_READ_WRITE_TOKEN=
```

---

## Available Scripts

```bash
pnpm dev          # Start dev server (DON'T run this yourself - ask user)
pnpm build        # Build for production
pnpm lint         # Run ESLint (ALWAYS run after changes)
pnpm typecheck    # TypeScript checking (ALWAYS run after changes)
pnpm db:generate  # Generate database migrations
pnpm db:migrate   # Run database migrations
pnpm db:studio    # Open Drizzle Studio
```

---

## Guidelines for AI Assistants

### CRITICAL RULES

1. **PRESERVE THE EXISTING DESIGN; BUILD NEW WORK IN THE SOFT LOOK**
   - Reference `src/app/page.tsx` and `src/components/landing/**` for all visual decisions
   - Do not "improve" or "clean up" the styling of existing sections unless asked
   - New or reworked UI: rounded corners and soft shadows, not brutalist borders and
     offset shadows (see "Style direction" above)

2. **ALWAYS run lint and typecheck** after changes:
   ```bash
   pnpm lint && pnpm typecheck
   ```

3. **NEVER start the dev server yourself**

4. **NO dark mode, NO theme switching**
   - Single theme only
   - Remove any dark mode utilities or providers

5. **Bilingual content**
   - All user-facing text must support Spanish and English
   - Use content files in `src/content/`

6. **Gemini for chat widget, OpenRouter for backend**
   - Chat widget: `@google/genai` with function calling
   - Other AI features: `@openrouter/ai-sdk-provider`

### Current Landing Reference

The source of truth for the current landing experience is:
- `src/app/page.tsx` (composition + modal wiring)
- `src/components/landing/layout/*` (nav/footer)
- `src/components/landing/sections/*` (landing sections)
- `src/components/landing/ui/*` (shared UI pieces + modals)
- `src/components/landing/ai-chat-widget.tsx` (chat + lead capture)
- `src/components/landing/voice-conversation-mode.tsx` (voice UI)

When implementing, cross-reference these files to preserve styling/behavior.

---

## Package Manager

This project uses **pnpm**. Use `pnpm` for all commands.
