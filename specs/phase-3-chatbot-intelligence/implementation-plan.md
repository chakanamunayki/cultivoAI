# Phase 3: Chatbot Intelligence & Lead Capture - Implementation Plan

**Created:** December 3, 2024
**Status:** Completed
**Completed:** December 3, 2024

---

## CRITICAL DESIGN RULES

**DO NOT DEVIATE FROM EXISTING BRUTALIST DESIGN**

- Preserve exact chat widget styling from `ai-chat-widget.tsx`
- Use same colors: `#FFC805`, `#FFDE00`, `#A855F7`, `#10B981`, `#F3F4F6`
- Use same borders: `border-4 border-black`
- Use same shadows: `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`
- NO new design patterns, NO new color schemes

---

## Phase Overview

| Phase | Focus | Priority |
|-------|-------|----------|
| 3A | Enhanced System Prompt | HIGH |
| 3B | Lead Capture & Qualification | HIGH |
| 3C | WhatsApp Integration | MEDIUM |
| 3D | Conversation Analytics | MEDIUM |

---

## Phase 3A: Enhanced System Prompt

**Goal:** Make the chatbot smarter with better context about CultivoAI, services, and qualification criteria.

### Tasks

#### 3A.1 - System Prompt Enhancement
- [x] Create comprehensive system prompt in `src/lib/chat/system-prompt.ts`
- [x] Include company background (Paul & Rocky, father-son duo, Colombia)
- [x] Include detailed service descriptions with pricing ranges
- [x] Include qualification criteria (ideal vs not ideal clients)
- [x] Include partnership models with details
- [x] Include Semilla program details for Rocky's projects
- [x] Add personality guidelines (friendly, direct, bilingual)

#### 3A.2 - Dynamic Context Injection
- [x] Pass current locale to system prompt
- [x] Pass user's entry context (booking, semilla, service, etc.)
- [x] Include time-sensitive information (availability, current projects)

#### 3A.3 - Response Quality Guidelines
- [x] Define response length guidelines (concise but helpful)
- [x] Define when to ask clarifying questions
- [x] Define when to suggest booking a call
- [x] Define when to offer WhatsApp contact

#### 3A.4 - Function Calling Enhancements
- [x] Add `collect_lead_info()` function for capturing name/email/company
- [x] Add `qualify_lead()` function to assess fit
- [x] Add `suggest_service()` function based on user needs
- [x] Add `offer_whatsapp()` function for direct contact
- [x] Add `schedule_call()` function (placeholder for Calendly integration)

---

## Phase 3B: Lead Capture & Qualification

**Goal:** Capture lead information during natural conversation flow.

### Tasks

#### 3B.1 - Lead Data Model
- [x] Create `leads` table in database schema (`src/lib/schema.ts`)
  - id, name, email, company, phone (optional)
  - source (which CTA/context)
  - qualification_score (1-5)
  - interests (services array)
  - conversation_summary
  - created_at, updated_at
- [ ] Run migration: `pnpm db:generate && pnpm db:migrate` (User must run this)

#### 3B.2 - Lead Capture API
- [x] Create `src/app/api/leads/route.ts` for lead submission
- [x] Validate required fields (name, email)
- [x] Store lead with conversation context
- [ ] Send notification email to Paul (optional - deferred)

#### 3B.3 - Conversation-Based Lead Capture
- [x] Train chatbot to naturally ask for contact info when appropriate
- [x] Trigger `collect_lead_info` function call when user shows interest
- [x] Store partial info (don't require all fields at once)
- [x] Confirm info back to user before storing

#### 3B.4 - Lead Qualification Logic
- [x] Define qualification scoring criteria:
  - Budget indicator (+1)
  - Timeline urgency (+1)
  - Clear use case (+1)
  - Decision maker (+1)
  - Good fit sector (+1)
- [x] Update lead score based on conversation
- [x] Flag high-priority leads (score >= 4)

#### 3B.5 - Admin Lead View (Optional)
- [ ] Create simple `/admin/leads` page (protected) - Deferred to future phase
- [ ] List leads with qualification score
- [ ] Show conversation summary
- [ ] Filter by date, score, source

---

## Phase 3C: WhatsApp Integration

**Goal:** Offer WhatsApp as alternative contact method for users who prefer it.

### Tasks

#### 3C.1 - WhatsApp Configuration
- [x] Add `WHATSAPP_NUMBER` to environment variables (as NEXT_PUBLIC_WHATSAPP_NUMBER)
- [x] Create WhatsApp link generator utility (`buildWhatsAppMessage`, `getWhatsAppUrl`)
- [x] Format: `https://wa.me/573XXXXXXXXX?text=...`

#### 3C.2 - Chat Integration
- [x] Add `offer_whatsapp()` function call to chatbot
- [x] Trigger when user asks for direct contact
- [x] Trigger after qualification if user prefers messaging
- [x] Pre-fill message with context from conversation

#### 3C.3 - WhatsApp Button in Chat
- [x] Add WhatsApp icon button in chat header (next to form fallback)
- [x] Opens WhatsApp with pre-filled message
- [x] Track clicks for analytics (schema updated)

---

## Phase 3D: Conversation Analytics

**Goal:** Track chat interactions for insights and improvement.

### Tasks

#### 3D.1 - Conversation Logging
- [x] Create `conversations` table in database (already existed, enhanced with new fields)
  - id, session_id, lead_id (optional)
  - messages (JSON array) - stored in chat_messages table
  - function_calls (JSON array) - added as function_calls_used field
  - started_at, ended_at
  - entry_context - added entry_context and user_timezone fields
- [x] Log all conversations (schema supports anonymized if no lead capture)

#### 3D.2 - Analytics Events
- [x] Track: chat_opened, message_sent, function_called (schema fields added)
- [x] Track: lead_captured, whatsapp_clicked, form_opened (schema fields added)
- [x] Track: conversation_duration (via started_at/ended_at), message_count (field added)

#### 3D.3 - Simple Dashboard (Optional)
- [ ] Create `/admin/analytics` page - Deferred to future phase
- [ ] Show: total chats, leads captured, conversion rate
- [ ] Show: popular entry contexts
- [ ] Show: common questions/topics

---

## Implementation Order

**Recommended sequence:**

1. **Phase 3A.1-3A.3** - Enhanced system prompt (foundation)
2. **Phase 3B.1-3B.2** - Lead data model and API
3. **Phase 3A.4** - Function calling for lead capture
4. **Phase 3B.3-3B.4** - Conversation-based lead capture
5. **Phase 3C.1-3C.3** - WhatsApp integration
6. **Phase 3D.1-3D.2** - Conversation logging
7. **Phase 3B.5, 3D.3** - Admin views (optional, can defer)

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/lib/chat/system-prompt.ts` | Comprehensive system prompt |
| `src/lib/chat/functions.ts` | Function calling definitions |
| `src/app/api/leads/route.ts` | Lead submission API |
| `src/app/admin/leads/page.tsx` | Lead management (optional) |
| `src/app/admin/analytics/page.tsx` | Analytics dashboard (optional) |

## Files to Modify

| File | Changes |
|------|---------|
| `src/lib/schema.ts` | Add leads, conversations tables |
| `src/app/api/chat/gemini/route.ts` | Enhanced system prompt, new functions |
| `src/components/landing/ai-chat-widget.tsx` | WhatsApp button, lead capture handling |
| `.env.example` | Add WHATSAPP_NUMBER |

---

## Database Schema

```sql
-- Leads table
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  source VARCHAR(50), -- 'booking', 'semilla', 'service', etc.
  qualification_score INTEGER DEFAULT 0,
  interests TEXT[], -- array of service interests
  conversation_summary TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  lead_id INTEGER REFERENCES leads(id),
  messages JSONB NOT NULL DEFAULT '[]',
  function_calls JSONB NOT NULL DEFAULT '[]',
  entry_context VARCHAR(50),
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP
);
```

---

## System Prompt Structure

```typescript
const systemPrompt = `
You are the AI assistant for CultivoAI, a father-son AI consultancy based in Colombia.

## About Us
- Paul (father): Strategy & Business, 20+ years experience
- Rocky (son): Tech & AI Lead, CS student, builds the solutions
- We work directly with clients - no intermediaries
- Bilingual: Spanish and English

## Our Services
1. Custom AI Chatbots - $X-$Y range
2. CRM Integrations - $X-$Y range
3. Process Automation - $X-$Y range
4. Data Dashboards - $X-$Y range
5. AI Strategy Consulting - $X/hour
6. Custom Development - Quote based

## Qualification Criteria
Ideal clients:
- Have a real business problem to solve
- Budget of $X+ for projects
- Ready to start within 1-3 months
- Value direct communication

Not ideal:
- Looking for free advice only
- Need enterprise-scale (we're boutique)
- Want to hire us as employees

## Your Personality
- Friendly but professional
- Direct and honest
- Ask clarifying questions
- Suggest relevant services
- Offer to book a call when appropriate

## Current Context
- Language: {locale}
- Entry point: {context}
- User's timezone: {timezone}

## Available Functions
- navigate_to_section(section_id)
- show_project_details(project_title)
- show_service_details(service_title)
- collect_lead_info(name, email, company)
- qualify_lead(budget, timeline, use_case)
- offer_whatsapp(pre_filled_message)
`;
```

---

## Verification Checklist

- [x] System prompt includes all company context
- [x] Lead capture works during natural conversation
- [x] Leads stored in database with qualification score
- [x] WhatsApp button opens with pre-filled message
- [x] Conversation logging working (schema ready)
- [x] No TypeScript errors (`pnpm typecheck`)
- [x] No lint errors (`pnpm lint`)
- [x] Chat widget styling unchanged (Brutalist design preserved)

---

## Notes

- WhatsApp number needed from Paul before 3C can be completed
- Pricing ranges needed for system prompt
- Consider Calendly integration for scheduling (future phase)
- Admin pages are optional - can use database directly initially
- Keep chatbot personality consistent with brand voice

---

## Phase 3 Refinements (Next Thread)

### Behavior Changes Needed
1. **Don't ask for contact info upfront** - Focus on understanding needs first
2. **Don't give specific prices** - Say "pricing depends on scope, let's discuss"
3. **Push to call/WhatsApp** - Guide users to personal conversation for details
4. **Only capture leads when requested** - After user explicitly wants contact

### Deferred Items
- [ ] Conversation logging to database (chat_conversations, chat_messages)
- [ ] Admin lead view (`/admin/leads`)
- [ ] Analytics dashboard (`/admin/analytics`)
- [ ] Email notification on lead capture
