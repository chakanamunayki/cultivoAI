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

CultivoAI is a bilingual (Spanish/English) AI and automation consultancy website for a father-son duo (Paul & Rocky) based in Colombia. The site uses a **Neo-Brutalist design** with an integrated Gemini AI chat assistant.

### Tech Stack

- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **AI Integration (Chat Widget)**: Google Gemini AI (`@google/genai`) with function calling
- **AI Integration (Backend)**: Vercel AI SDK 5 + OpenRouter (for other AI features)
- **Authentication**: BetterAuth with Google OAuth
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Custom Brutalist components (NO shadcn theming - preserve exact design)
- **Styling**: Tailwind CSS 4 (NO dark mode - single Brutalist theme only)
- **Internationalization**: Browser language detection (Spanish/English)

---

## CultivoAI Frontend Design System

### CRITICAL: Design Preservation Rules

**DO NOT CHANGE THE DESIGN. EVER. NOT A SINGLE PIXEL.**

The template in `docs/template/App.tsx` (specifically `BrutalistDesign` component, lines 1372-1946) is the **exact visual specification**. When implementing:

1. **Preserve ALL visual elements exactly** - colors, shadows, borders, animations, spacing
2. **Preserve ALL effects** - hover states, transitions, scroll animations, marquee
3. **Preserve the Brutalist theme ONLY** - No theme switcher, no Rocket/Playful theme
4. **NO dark mode toggle** - Single theme, no light/dark switching
5. **Preserve the AI chat widget** - Gemini integration with function calling
6. **Split into components** but maintain pixel-perfect visual parity

### Brutalist Design Characteristics

```
- 4px black borders on everything
- Hard shadows: shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] or shadow-[8px_8px_0px_0px_#A855F7]
- No rounded corners (or minimal)
- High contrast, bold typography
- Uppercase text for headings
- Hover effects: translate + shadow reduction
- Selection color: bg-[#FFDE00] text-black
```

### Color Palette (Do NOT deviate)

```css
/* Primary */
--yellow-primary: #FFC805;
--yellow-secondary: #FFDE00;

/* Accents */
--purple: #A855F7;
--purple-dark: #9333EA;
--green-semilla: #10B981;
--green-light: #C4F9E0;
--red-accent: #EF4444;

/* Neutrals */
--black: #000000;
--near-black: #1a1a1a;
--gray-bg: #F3F4F6;
--white: #FFFFFF;
```

### Typography (Required fonts - load via next/font)

```css
font-grotesk: 'Space Grotesk'     /* Primary for Brutalist - headings, nav */
font-sans: 'Inter'                 /* Body text */
font-mono: 'JetBrains Mono'        /* Code, technical elements */
```

### Key Visual Elements (Must preserve exactly)

1. **Top Marquee Bar**: Black bg, yellow text, infinite scroll animation
2. **Navigation**: Sticky, white bg, 4px black border bottom, stretched nav items
3. **Hero Split**: Yellow left panel, purple right panel with floating elements
4. **Service Cards**: Black shadow offset, hover translate effect
5. **Projects List**: Alternating layout, grayscale images with purple overlay on hover
6. **AI Chat Widget**: Bottom-right floating, brutalist styling with shadows
7. **Modals**: 4px black border, purple shadow offset, X close button

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
- Styling: Brutalist theme (see `AIChatWidget` component in template)
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

### Chat Widget Styling (Brutalist)

```
Container: bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
Header: bg-[#FFC805] border-b-4 border-black
User messages: bg-black text-white font-bold
Bot messages: bg-white border-2 border-black shadow-[4px_4px_0px_0px_#A855F7]
Input: bg-[#F3F4F6] border-2 border-black focus:shadow-[2px_2px_0px_0px_#A855F7]
Send button: bg-[#A855F7] text-white border-2 border-black
```

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
│   ├── page.tsx                  # Landing page (Brutalist design)
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

1. **PRESERVE THE BRUTALIST DESIGN EXACTLY**
   - Reference `docs/template/App.tsx` for all visual decisions
   - Copy class names exactly - do not "improve" or "clean up" styling
   - Maintain all animations, hover effects, shadows, borders

2. **ALWAYS run lint and typecheck** after changes:
   ```bash
   pnpm lint && pnpm typecheck
   ```

3. **NEVER start the dev server yourself**

4. **NO dark mode, NO theme switching**
   - Single Brutalist theme only
   - Remove any dark mode utilities or providers

5. **Bilingual content**
   - All user-facing text must support Spanish and English
   - Use content files in `src/content/`

6. **Gemini for chat widget, OpenRouter for backend**
   - Chat widget: `@google/genai` with function calling
   - Other AI features: `@openrouter/ai-sdk-provider`

### Template Reference

The source of truth for all visual specifications is:
- **File**: `docs/template/App.tsx`
- **Component**: `BrutalistDesign` (lines 1372-1946)
- **Chat Widget**: `AIChatWidget` (lines 464-742)
- **Animations**: `Reveal` component, marquee keyframes
- **Modals**: `Modal`, `ProjectModalContent`, `ServiceModalContent`, `PartnershipModalContent`

When implementing, always cross-reference these sections to ensure pixel-perfect accuracy.

---

## Package Manager

This project uses **pnpm**. Use `pnpm` for all commands.
