# CLAUDE.md - Cultivo AI Website Project

## Project Overview

Building the landing page for **cultivoai.co** - a family-run AI consultancy from Colombia.

This is a warm, personal, human website. NOT a corporate tech site. The family (Paul, Rocky, Marta) should feel present throughout.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **ORM:** Drizzle
- **Database:** PostgreSQL
- **AI Integration:** OpenRouter (for chatbot)
- **Automation:** n8n (external, not in this repo)
- **Deployment:** Vercel

## i18n Structure

- `/es` - Spanish (default)
- `/en` - English
- Browser language detection with manual override
- URL-based routing

## Dynamic Currency

- Auto-detect based on browser locale
- Manual toggle: COP | USD | EUR
- Display in header/nav

## Project Structure

```
/docs
  CLAUDE.md          # This file - project instructions
  content/
    sections.md      # All page sections with copy
    services.md      # Detailed service descriptions
    story.md         # Family story content
    chatbot.md       # AI chatbot personality & training
  technical/
    database.md      # PostgreSQL schema
    workflows.md     # n8n workflow specs
    api.md           # API endpoints needed
```

## Design Principles

1. **Minimal, warm, human** - No corporate coldness
2. **No emoji/icon overload** - Use sparingly if at all
3. **Photography over illustrations** when possible
4. **Generous whitespace** - Let content breathe
5. **Earth tones** - Greens, terracotta, cream (Paul will finalize palette)

## Key Messaging

- "AI that grows with you" / "AI que crece contigo"
- Family consultancy, not agency
- Accessible pricing, personal attention
- Integration specialists using latest AI tech
- Mission-driven focus

## What NOT to Do

- Don't list specific tools (no "Zapier, Make" etc.) - say "latest AI technology"
- Don't overuse emojis or icons
- Don't make it feel corporate or cold
- Don't use generic stock photos
- Don't over-format with bullets everywhere

## Content Files

Read these in order:
1. `content/sections.md` - Page structure and copy
2. `content/services.md` - Service details
3. `content/story.md` - Family narrative
4. `content/chatbot.md` - Chatbot specs

## Database

Schema in `technical/database.md` - PostgreSQL with Drizzle ORM.

## Key Features to Build

1. Bilingual content (ES/EN) with URL routing
2. Currency switcher with dynamic display
3. AI chatbot widget (OpenRouter integration)
4. Contact form → PostgreSQL
5. Clean, minimal design throughout

## Notes

- Rocky will run chatbot development workshops - this is part of his learning
- Testimonials: Paul will provide
- Photos: Paul working with Nano Banana
- Pricing: Starting from $100 USD for simple projects, project-based
- Projects (Chak, Raíz Capital): Paul will add docs
