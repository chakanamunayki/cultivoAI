# Cultivo AI - AI Assistant Guidelines

## Project Overview

**Cultivo AI** is a family-run AI consultancy website built from Colombia. This is NOT a corporate tech site - it's a warm, personal, human website where the family (Paul, Rocky, Marta) should feel present throughout.

- **Website:** cultivoai.co
- **Tagline:** "AI que crece contigo" / "AI that grows with you"
- **Family:** Paul (founder), Rocky (14yo apprentice/son), Marta (holistic anchor)

### What Cultivo AI Does

- AI integration consulting for mission-driven businesses
- Workflow automation, chatbots, business intelligence, content systems
- Website development with AI built-in
- Startup advisory based on real experience (successes and failures)
- Semilla Fund: Rocky's donation-based program for small projects

### Tech Stack

- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **AI Integration**: Vercel AI SDK 5 + OpenRouter (100+ AI models)
- **Authentication**: BetterAuth with Google OAuth
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: shadcn/ui components with Tailwind CSS 4
- **Styling**: Tailwind CSS with dark mode support
- **Deployment**: Vercel

## Important Context

This is an **agentic coding boilerplate/starter template** - all existing pages and components are meant to be examples and should be **completely replaced** to build the Cultivo AI website.

### CRITICAL: You MUST Override All Boilerplate Content

**DO NOT keep any boilerplate components, text, or UI elements unless explicitly requested.** This includes:

- **Remove all placeholder/demo content** (setup checklists, welcome messages, boilerplate text)
- **Replace the entire navigation structure** - build navigation for: Inicio | Servicios | Proyectos | Nosotros | Semilla | Contacto
- **Override all page content completely** - don't append to existing pages, replace them entirely
- **Remove or replace all example components** (setup-checklist, starter-prompt-modal, etc.)

### What to Preserve

- **All installed libraries and dependencies** (DO NOT uninstall packages)
- **Authentication system** (customize UI/flow for Cultivo AI)
- **Database setup** (modify schema per docs/project_info/database.md)
- **Core configuration files** (next.config.ts, tsconfig.json, tailwind.config.ts)
- **Build and development scripts**

## Design Principles

1. **Minimal, warm, human** - No corporate coldness
2. **No emoji/icon overload** - Use sparingly if at all
3. **Photography over illustrations** when possible
4. **Generous whitespace** - Let content breathe
5. **Earth tones** - Greens, terracotta, cream
6. **Bilingual** - Spanish (primary) and English

## Page Structure

The website needs these sections (see docs/project_info/sections.md for full content):

1. **Hero** - Paul and Rocky intro, personal, not corporate
2. **Why Cultivo AI** - Contrast-led (what we're NOT vs what we ARE)
3. **Services** - 6 service cards (from docs/project_info/services.md)
4. **How We Add Value** - Real examples/case studies
5. **Projects** - Chak, Raiz Capital, Munayki, this site
6. **Our Story** - Family narrative (from docs/project_info/story.md)
7. **Flexible Partnerships** - Payment structures (standard, reduced, deferred, revenue share, equity)
8. **Who We Help** - Ideal fit criteria and sectors
9. **Semilla Fund** - Rocky's program
10. **Values** - Core beliefs
11. **Give-Back Model** - How paid work funds community work
12. **Testimonials** - (Paul to provide)
13. **Promotions** - Dynamic promo section
14. **What Happens Next** - Clear process after contact
15. **Contact** - Form + direct contact options
16. **Footer** - Links, social, legal

## Key Features to Build

1. **i18n** - `/es` (default) and `/en` routes with language switcher
2. **Currency switcher** - COP | USD | EUR with auto-detection
3. **AI Chatbot** - Floating widget, trained on Cultivo content (see docs/project_info/chatbot.md)
4. **Contact form** - Saves to PostgreSQL leads table
5. **Database schema** - Implement from docs/project_info/database.md

## Database Schema

Implement these tables (full schema in docs/project_info/database.md):

- `leads` - Contact form and chatbot lead capture
- `chat_conversations` - Chatbot session data
- `chat_messages` - Individual messages
- `email_subscribers` - Newsletter signups
- `promotions` - Promo codes
- `semilla_supporters` - Semilla Fund contributions

## Chatbot Personality

The chatbot represents the whole family/business (see docs/project_info/chatbot.md):

- Warm, curious, genuinely interested
- Bilingual - switches naturally
- Honest about capabilities
- Asks questions rather than pushing sales
- Uses "nosotros/we" naturally
- Conversational, not corporate

## What NOT to Do

- Don't list specific tool names (say "latest AI technology" not "Zapier, Make")
- Don't overuse emojis or icons
- Don't make it feel corporate or cold
- Don't use generic stock photos
- Don't over-format with bullets everywhere
- Don't use the placeholder "todo list app" example from the boilerplate

## Project Documentation

Read these files for complete content and specifications:

- `docs/project_info/sections.md` - All page copy in ES/EN
- `docs/project_info/services.md` - Detailed service descriptions
- `docs/project_info/story.md` - Family narrative content
- `docs/project_info/chatbot.md` - AI chatbot specs and personality
- `docs/project_info/database.md` - PostgreSQL/Drizzle schema
- `docs/project_info/workflows.md` - n8n automation specs (external)
- `docs/project_info/CLAUDE.md` - Additional project context

## Component Development Guidelines

**Always prioritize shadcn/ui components** when building:

1. **First Choice**: Use existing shadcn/ui components from the project
2. **Second Choice**: Install additional shadcn/ui components using `pnpm dlx shadcn@latest add <component-name>`
3. **Last Resort**: Only create custom components if shadcn/ui doesn't provide a suitable option

## Post-Implementation Documentation

After completing features, document in `/docs/features/`:

- What the feature does
- How it works
- Key components and files
- Usage examples
- Configuration required

## Request

Please help transform this boilerplate into the Cultivo AI website. **Completely replace all existing boilerplate code** to match the project requirements defined in the docs/project_info/ files.

**Success Criteria**: The final application should be a warm, personal, bilingual website for a family AI consultancy - with no evidence of the original boilerplate template.
