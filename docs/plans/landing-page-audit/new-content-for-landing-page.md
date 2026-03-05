Codex task: Final landing page copy + structure polish (CultivoAI)

Goal
Fix the hero so it reads clean. Fix ticker duplication. Move “shared building blocks” out of the terminal. Restore terminal steps. Align Services copy with the hero’s differentiators (privacy/offline, market signals). Remove repeated copy in Retreat Ops.

Step 0 — Locate relevant components/data
1) Find the hero component by searching for any of these strings:
   - "FOR GOOD PROJECTS"
   - "Automation that cuts busywork."
   - "Built for:"
   - "Less manual work"
2) Find the ticker implementation by searching:
   - "Human-first AI | Less friction"
   - "Decision dashboards | Useful assistants"
   - the pipe character pattern " | "
3) Find the terminal block by searching:
   - "cultivo-terminal"
   - "Starting discovery..."
4) Find the Services section data by searching:
   - "Workflow Optimization01"
   - "AI Assistants02"
   - "Retreat Ops Systems03"
   - "Knowledge and Content Systems05"

Step 1 — Fix ticker duplication (must be first)
Problem: ticker string repeats twice.
Implementation:
- Store ticker items as an array (if not already).
- Render the array once.
- Ensure the array is not concatenated twice.

Set ticker items to exactly this list (EN):
[
  "Human-first AI",
  "Less busywork",
  "Decision dashboards",
  "Useful assistants",
  "Living knowledge",
  "Retreat ops",
  "Market signals",
  "Data stays private",
  "Offline when needed",
  "24h reply"
]

Acceptance:
- Only one run of the ticker appears on page.
- No duplicated sequence.

Step 2 — Hero: make H1 clean. Add differentiators in the hero
Replace hero text with this structure:

Eyebrow:
"FOR GOOD PROJECTS"

H1:
"AI systems that help good projects scale"
(Do not use "good work/projects". Pick one. Use "good projects".)

Subhead lines:
"Automation that cuts busywork."
"Dashboards that show what matters."
"Knowledge you can reuse."

Add two supporting lines directly under the subhead (still in hero, not in terminal):
"Shared building blocks keep costs down. Templates. Automations. Dashboard patterns."
"Keep your data private. Offline setups available when needed."

Keep these blocks exactly as-is:
Outcomes:
- "Less manual work"
- "Clearer decisions"
- "Better follow-through"

Built for:
- "Wellness retreats"
- "Sustainability projects"
- "Impact startups"

CTAs:
- "Let's talk"
- "View projects"
- "Explore services"

Microcopy:
"Win-win partnerships. Impact-friendly options. Direct collaboration."

Acceptance:
- H1 has no slash or mixed wording.
- “Shared building blocks” + “private/offline” appear in the hero.
- Hero remains scannable.

Step 3 — Terminal: restore multi-step process. Keep marketing out
Current issue: terminal contains marketing lines.
Fix:
- Remove these lines from terminal area:
  "Shared building blocks keep costs down across aligned projects..."
  "Keep your data private. Offline setups..."
  (These belong in hero per Step 2.)

Restore terminal steps (EN). Use these lines inside the terminal:
"Starting discovery..."
"Mapping your workflow..."
"Finding busywork..."
"Finding friction points..."
"Designing a simple version one..."
"Building the dashboard..."
"Creating a living knowledge base..."
"Shipping and testing..."
"Measuring results..."
"Iterating with your team..."
Then keep your short close line below the terminal (outside terminal):
"No chaos. Clear scope. Fast version one. Direct iteration."

Acceptance:
- Terminal reads like a process log.
- No positioning/marketing statements inside terminal.

Step 4 — Services: align with niche needs. Remove duplicates
4.1 AI Assistants card — add privacy/offline + integrations
Replace the AI Assistants description block with:

"LLM-based assistants trained on your business information."
"Customer support. Internal help. Scheduling. Quotes."
"Works with WhatsApp, email, calendars."
"Keep your data private. Offline setups available when needed."

4.2 Retreat Ops Systems — remove repeated list
Current issue: you list bullets then repeat the same list again.
Make it one clean block only. Use this:

"Bookings, payments, invoicing."
"Guest messaging before, during, after."
"Itineraries, checklists, feedback, follow-up."
"Dashboards for occupancy, revenue, satisfaction."
"Ops without chaos. Human experience."

Ensure you do not also show a duplicated bullet list above it.

4.3 Knowledge and Content Systems — add market signals
Replace the short card copy with:

"Market signals plus content system design."
"Topic direction based on real demand."
"Draft workflow. Review workflow. Publishing workflow."
"Consistent output without chaos."

If there is an expanded “What it means / Why it matters” section on the page, update it to include market signals:
- Mention: audience pain, keywords, competitor scan, offer clarity, messaging angles.
- Outcome: repeatable path from signal to output.

Acceptance:
- AI Assistants clearly mentions privacy/offline.
- Retreat Ops has no repeated list.
- Knowledge + Content clearly mentions market signals.

Step 5 — Final checks
1) Search the page output for duplicated ticker sequences. Confirm none.
2) Confirm the hero contains:
   - the three subhead lines
   - the shared building blocks line
   - the privacy/offline line
3) Confirm the terminal is multi-step and contains no marketing lines.
4) Confirm Services edits render correctly.
5) Run lint/build/test scripts if present.

Deliverables
- Commit changes.
- Provide edited file paths.
- Provide before/after snippets for ticker, hero, terminal, AI Assistants, Retreat Ops, Knowledge + Content.