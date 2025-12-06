# Phase 4: Analytics Dashboard & Admin - Requirements

## Overview

Create an internal admin dashboard for CultivoAI to manage leads and view conversation analytics. This dashboard is for Paul to monitor leads captured through the chatbot and manage follow-ups.

## Context

- **Branch**: `feature/phase-2-chatbot-first-ux`
- **Previous Phases**:
  - Phase 3 complete: Lead capture, conversation logging, WhatsApp/call redirection
  - Commits: 45d8ee6 (Phase 3 refinements), 81e28f9 (Phase 3 core)

## Existing Database Tables

Tables already created in Phase 3:

1. **`leads`** - Contact info, qualification scores, project details
   - Fields: name, email, phone, whatsapp, projectType, budgetRange, timeline
   - Qualification: qualificationScore, qualificationLevel, hasBudget, hasTimeline, etc.
   - Status tracking: status (new/warm/hot/priority/contacted/converted), notes, assignedTo

2. **`chat_conversations`** - Session data, metrics, entry context
   - Fields: sessionId, language, pageUrl, entryContext
   - Metrics: messageCount, totalTokensUsed
   - Analytics: leadCaptured, whatsappClicked, formOpened

3. **`chat_messages`** - Individual messages with latency/model metadata
   - Fields: role, content, modelUsed, tokensUsed, latencyMs

## Functional Requirements

### FR1: Admin Dashboard Route
- Protected route at `/admin` for internal use only
- Overview of key metrics at a glance
- Mobile-friendly for Paul to check on phone

### FR2: Lead Overview
- Total leads count with breakdown by status (new/warm/hot/priority)
- Leads by source (chatbot, form, etc.)
- Recent leads table with quick actions
- This week/month lead counts

### FR3: Conversation Metrics
- Total conversations count
- Average messages per conversation
- Average conversation duration
- Lead capture rate
- WhatsApp click rate

### FR4: Lead Management
- Paginated leads list with search and filters
- Filter by: status, source, qualification level, date range
- Quick actions: view conversation, WhatsApp, email, change status

### FR5: Lead Details View
- Full conversation history for each lead
- Qualification score breakdown (5 factors)
- Timeline of all interactions
- Quick action buttons

### FR6: Export Functionality
- Export leads to CSV
- Filter exports by status and date range

## Non-Functional Requirements

### NFR1: Design
- Keep Brutalist styling consistent with main site
- Simple, functional admin UI
- No dark mode (consistent with main site)

### NFR2: Performance
- Paginated API responses
- Efficient database queries
- Parallel data fetching where possible

### NFR3: Bilingual Support
- Spanish and English content for admin UI
- Use existing language detection from main site

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/stats` | GET | Dashboard summary statistics |
| `/api/admin/leads` | GET | Paginated leads with filters |
| `/api/admin/leads` | PATCH | Update lead status/notes |
| `/api/admin/leads/[id]` | GET | Lead details with conversations |
| `/api/admin/leads/[id]` | DELETE | Delete a lead |
| `/api/admin/conversations` | GET | Conversation metrics and listing |
| `/api/admin/export` | GET | Export leads to CSV/JSON |

## Optional Enhancements (Future)

- Email notification when high-priority lead captured
- Slack/Discord webhook for new leads
- Real-time updates via WebSocket
