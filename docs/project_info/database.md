# Database Schema

PostgreSQL schema for cultivoai.co using Drizzle ORM.

---

## Overview

Tables:
1. **leads** - Contact form and chatbot lead capture
2. **chat_conversations** - Chatbot conversation sessions
3. **chat_messages** - Individual messages in conversations
4. **email_subscribers** - Newsletter/update signups
5. **promotions** - Promo codes and discounts
6. **semilla_supporters** - Semilla Fund contributions
7. **page_views** - Basic analytics (optional)

---

## Schema

```sql
-- =============================================
-- LEADS
-- Main table for capturing potential clients
-- =============================================

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact info
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  whatsapp VARCHAR(50),
  preferred_language VARCHAR(2) DEFAULT 'es',
  
  -- Project info
  project_type VARCHAR(100),
  project_description TEXT,
  budget_range VARCHAR(50),
  timeline VARCHAR(50),
  how_heard VARCHAR(100),
  
  -- Source tracking
  source VARCHAR(50) DEFAULT 'form',
  promo_code VARCHAR(50),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  
  -- Status tracking
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  assigned_to VARCHAR(50),
  
  -- Display preferences
  display_currency VARCHAR(3) DEFAULT 'USD',
  newsletter_consent BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at);

-- Status values:
-- 'new' - Just submitted
-- 'contacted' - Initial response sent
-- 'qualified' - Good fit, moving forward
-- 'proposal_sent' - Proposal delivered
-- 'negotiating' - Discussing terms
-- 'won' - Became client
-- 'lost' - Did not proceed
-- 'nurturing' - Not ready now, stay in touch


-- =============================================
-- CHAT CONVERSATIONS
-- Session-level chatbot data
-- =============================================

CREATE TABLE chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  session_id VARCHAR(255),
  
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  last_message_at TIMESTAMP WITH TIME ZONE,
  
  language VARCHAR(2) DEFAULT 'es',
  page_url VARCHAR(500),
  
  -- Escalation
  escalated_to_human BOOLEAN DEFAULT FALSE,
  escalation_method VARCHAR(50),
  
  -- AI analysis
  summary TEXT,
  intent_detected VARCHAR(100),
  sentiment VARCHAR(50),
  
  -- Metrics
  message_count INTEGER DEFAULT 0,
  total_tokens_used INTEGER DEFAULT 0
);

CREATE INDEX idx_conversations_lead ON chat_conversations(lead_id);
CREATE INDEX idx_conversations_session ON chat_conversations(session_id);
CREATE INDEX idx_conversations_started ON chat_conversations(started_at);


-- =============================================
-- CHAT MESSAGES
-- Individual messages within conversations
-- =============================================

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  role VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  
  -- For assistant messages
  model_used VARCHAR(100),
  tokens_used INTEGER,
  latency_ms INTEGER
);

CREATE INDEX idx_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX idx_messages_created ON chat_messages(created_at);

-- Role values: 'user', 'assistant', 'system'


-- =============================================
-- EMAIL SUBSCRIBERS
-- Newsletter and update signups
-- =============================================

CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  language VARCHAR(2) DEFAULT 'es',
  
  source VARCHAR(50),
  source_page VARCHAR(255),
  
  subscribed BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  
  -- Segmentation
  interests TEXT[],
  lead_id UUID REFERENCES leads(id)
);

CREATE INDEX idx_subscribers_email ON email_subscribers(email);
CREATE INDEX idx_subscribers_subscribed ON email_subscribers(subscribed);


-- =============================================
-- PROMOTIONS
-- Promo codes and discounts
-- =============================================

CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255),
  description_en TEXT,
  description_es TEXT,
  
  discount_type VARCHAR(20),
  discount_value DECIMAL(10,2),
  discount_currency VARCHAR(3),
  
  valid_from TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  
  max_uses INTEGER,
  times_used INTEGER DEFAULT 0,
  
  applicable_services TEXT[],
  minimum_value DECIMAL(10,2),
  
  active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_promotions_code ON promotions(code);
CREATE INDEX idx_promotions_active ON promotions(active);

-- Discount types: 'percentage', 'fixed_amount', 'custom'


-- =============================================
-- SEMILLA SUPPORTERS
-- Semilla Fund contributions
-- =============================================

CREATE TABLE semilla_supporters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  
  tier VARCHAR(50),
  amount_usd DECIMAL(10,2),
  payment_method VARCHAR(50),
  payment_reference VARCHAR(255),
  
  status VARCHAR(50) DEFAULT 'active',
  
  project_interest TEXT,
  wants_updates BOOLEAN DEFAULT TRUE,
  
  display_name VARCHAR(255),
  anonymous BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_semilla_email ON semilla_supporters(email);
CREATE INDEX idx_semilla_status ON semilla_supporters(status);

-- Tier values: 'seed', 'sprout', 'grow', 'partner'
-- Status values: 'pending', 'active', 'completed', 'refunded'


-- =============================================
-- PAGE VIEWS (Optional - basic analytics)
-- =============================================

CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  session_id VARCHAR(255),
  page_path VARCHAR(255),
  language VARCHAR(2),
  currency_displayed VARCHAR(3),
  
  referrer VARCHAR(500),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  
  device_type VARCHAR(50),
  country VARCHAR(2),
  
  time_on_page INTEGER,
  scroll_depth INTEGER,
  chatbot_opened BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_pageviews_session ON page_views(session_id);
CREATE INDEX idx_pageviews_created ON page_views(created_at);
CREATE INDEX idx_pageviews_path ON page_views(page_path);
```

---

## Drizzle Schema (TypeScript)

```typescript
// schema.ts

import { 
  pgTable, 
  uuid, 
  timestamp, 
  varchar, 
  text, 
  boolean, 
  integer, 
  decimal 
} from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  whatsapp: varchar('whatsapp', { length: 50 }),
  preferredLanguage: varchar('preferred_language', { length: 2 }).default('es'),
  
  projectType: varchar('project_type', { length: 100 }),
  projectDescription: text('project_description'),
  budgetRange: varchar('budget_range', { length: 50 }),
  timeline: varchar('timeline', { length: 50 }),
  howHeard: varchar('how_heard', { length: 100 }),
  
  source: varchar('source', { length: 50 }).default('form'),
  promoCode: varchar('promo_code', { length: 50 }),
  utmSource: varchar('utm_source', { length: 100 }),
  utmMedium: varchar('utm_medium', { length: 100 }),
  utmCampaign: varchar('utm_campaign', { length: 100 }),
  
  status: varchar('status', { length: 50 }).default('new'),
  notes: text('notes'),
  assignedTo: varchar('assigned_to', { length: 50 }),
  
  displayCurrency: varchar('display_currency', { length: 3 }).default('USD'),
  newsletterConsent: boolean('newsletter_consent').default(false),
});

export const chatConversations = pgTable('chat_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  leadId: uuid('lead_id').references(() => leads.id),
  sessionId: varchar('session_id', { length: 255 }),
  
  startedAt: timestamp('started_at', { withTimezone: true }).defaultNow(),
  endedAt: timestamp('ended_at', { withTimezone: true }),
  lastMessageAt: timestamp('last_message_at', { withTimezone: true }),
  
  language: varchar('language', { length: 2 }).default('es'),
  pageUrl: varchar('page_url', { length: 500 }),
  
  escalatedToHuman: boolean('escalated_to_human').default(false),
  escalationMethod: varchar('escalation_method', { length: 50 }),
  
  summary: text('summary'),
  intentDetected: varchar('intent_detected', { length: 100 }),
  sentiment: varchar('sentiment', { length: 50 }),
  
  messageCount: integer('message_count').default(0),
  totalTokensUsed: integer('total_tokens_used').default(0),
});

export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').references(() => chatConversations.id, { onDelete: 'cascade' }),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  role: varchar('role', { length: 20 }).notNull(),
  content: text('content').notNull(),
  
  modelUsed: varchar('model_used', { length: 100 }),
  tokensUsed: integer('tokens_used'),
  latencyMs: integer('latency_ms'),
});

export const emailSubscribers = pgTable('email_subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  language: varchar('language', { length: 2 }).default('es'),
  
  source: varchar('source', { length: 50 }),
  sourcePage: varchar('source_page', { length: 255 }),
  
  subscribed: boolean('subscribed').default(true),
  unsubscribedAt: timestamp('unsubscribed_at', { withTimezone: true }),
  
  leadId: uuid('lead_id').references(() => leads.id),
});

export const promotions = pgTable('promotions', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  
  code: varchar('code', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  descriptionEn: text('description_en'),
  descriptionEs: text('description_es'),
  
  discountType: varchar('discount_type', { length: 20 }),
  discountValue: decimal('discount_value', { precision: 10, scale: 2 }),
  discountCurrency: varchar('discount_currency', { length: 3 }),
  
  validFrom: timestamp('valid_from', { withTimezone: true }),
  validUntil: timestamp('valid_until', { withTimezone: true }),
  
  maxUses: integer('max_uses'),
  timesUsed: integer('times_used').default(0),
  
  minimumValue: decimal('minimum_value', { precision: 10, scale: 2 }),
  
  active: boolean('active').default(true),
});

export const semillaSupporters = pgTable('semilla_supporters', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  
  tier: varchar('tier', { length: 50 }),
  amountUsd: decimal('amount_usd', { precision: 10, scale: 2 }),
  paymentMethod: varchar('payment_method', { length: 50 }),
  paymentReference: varchar('payment_reference', { length: 255 }),
  
  status: varchar('status', { length: 50 }).default('active'),
  
  projectInterest: text('project_interest'),
  wantsUpdates: boolean('wants_updates').default(true),
  
  displayName: varchar('display_name', { length: 255 }),
  anonymous: boolean('anonymous').default(false),
});
```

---

## Indexes Summary

Key indexes for performance:

- `leads.email` - Quick lookup by email
- `leads.status` - Filter by pipeline stage
- `leads.created_at` - Sort by date
- `chat_conversations.lead_id` - Link conversations to leads
- `chat_conversations.session_id` - Find by browser session
- `chat_messages.conversation_id` - Get all messages in conversation
- `email_subscribers.email` - Quick lookup
- `promotions.code` - Validate promo codes

---

## Notes

- All tables use UUID primary keys
- Timestamps include timezone (important for global users)
- Soft delete not implemented - can add `deleted_at` if needed
- Page views table is optional - can use external analytics instead
- Arrays (interests, applicable_services) may need adjustment for Drizzle
