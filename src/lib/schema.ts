import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  uuid,
  varchar,
  integer,
  decimal,
} from "drizzle-orm/pg-core";

// ==============================================
// BETTER AUTH TABLES (keep existing)
// ==============================================

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("user_email_idx").on(table.email)]
);

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("session_user_id_idx").on(table.userId),
    index("session_token_idx").on(table.token),
  ]
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("account_user_id_idx").on(table.userId),
    index("account_provider_account_idx").on(table.providerId, table.accountId),
  ]
);

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// ==============================================
// CULTIVO AI TABLES
// ==============================================

// LEADS - Contact form and chatbot lead capture
export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

    // Contact info
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }),
    whatsapp: varchar("whatsapp", { length: 50 }),
    preferredLanguage: varchar("preferred_language", { length: 2 }).default("es"),

    // Project info
    projectType: varchar("project_type", { length: 100 }),
    projectDescription: text("project_description"),
    budgetRange: varchar("budget_range", { length: 50 }),
    timeline: varchar("timeline", { length: 50 }),
    howHeard: varchar("how_heard", { length: 100 }),

    // Source tracking
    source: varchar("source", { length: 50 }).default("form"),
    promoCode: varchar("promo_code", { length: 50 }),
    utmSource: varchar("utm_source", { length: 100 }),
    utmMedium: varchar("utm_medium", { length: 100 }),
    utmCampaign: varchar("utm_campaign", { length: 100 }),

    // Status tracking
    status: varchar("status", { length: 50 }).default("new"),
    notes: text("notes"),
    assignedTo: varchar("assigned_to", { length: 50 }),

    // Display preferences
    displayCurrency: varchar("display_currency", { length: 3 }).default("USD"),
    newsletterConsent: boolean("newsletter_consent").default(false),

    // Lead qualification (Phase 3B)
    qualificationScore: integer("qualification_score").default(0),
    qualificationLevel: varchar("qualification_level", { length: 20 }).default("cold"),
    interests: text("interests"), // JSON array of service interests
    conversationSummary: text("conversation_summary"),

    // Qualification factors (booleans)
    hasBudget: boolean("has_budget").default(false),
    hasTimeline: boolean("has_timeline").default(false),
    hasClearUseCase: boolean("has_clear_use_case").default(false),
    isDecisionMaker: boolean("is_decision_maker").default(false),
    isSectorFit: boolean("is_sector_fit").default(false),
  },
  (table) => [
    index("leads_email_idx").on(table.email),
    index("leads_status_idx").on(table.status),
    index("leads_created_idx").on(table.createdAt),
    index("leads_qualification_idx").on(table.qualificationScore),
  ]
);

// CHAT CONVERSATIONS - Session-level chatbot data
export const chatConversations = pgTable(
  "chat_conversations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    leadId: uuid("lead_id").references(() => leads.id),
    sessionId: varchar("session_id", { length: 255 }),

    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow(),
    endedAt: timestamp("ended_at", { withTimezone: true }),
    lastMessageAt: timestamp("last_message_at", { withTimezone: true }),

    language: varchar("language", { length: 2 }).default("es"),
    pageUrl: varchar("page_url", { length: 500 }),

    // Entry context (Phase 3A)
    entryContext: varchar("entry_context", { length: 50 }),
    userTimezone: varchar("user_timezone", { length: 100 }),

    // Escalation
    escalatedToHuman: boolean("escalated_to_human").default(false),
    escalationMethod: varchar("escalation_method", { length: 50 }),

    // AI analysis
    summary: text("summary"),
    intentDetected: varchar("intent_detected", { length: 100 }),
    sentiment: varchar("sentiment", { length: 50 }),

    // Metrics
    messageCount: integer("message_count").default(0),
    totalTokensUsed: integer("total_tokens_used").default(0),

    // Analytics events (Phase 3D)
    functionCallsUsed: text("function_calls_used"), // JSON array of function names called
    leadCaptured: boolean("lead_captured").default(false),
    whatsappClicked: boolean("whatsapp_clicked").default(false),
    formOpened: boolean("form_opened").default(false),
  },
  (table) => [
    index("conversations_lead_idx").on(table.leadId),
    index("conversations_session_idx").on(table.sessionId),
    index("conversations_started_idx").on(table.startedAt),
    index("conversations_entry_context_idx").on(table.entryContext),
  ]
);

// CHAT MESSAGES - Individual messages within conversations
export const chatMessages = pgTable(
  "chat_messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conversationId: uuid("conversation_id").references(() => chatConversations.id, {
      onDelete: "cascade",
    }),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    role: varchar("role", { length: 20 }).notNull(),
    content: text("content").notNull(),

    // For assistant messages
    modelUsed: varchar("model_used", { length: 100 }),
    tokensUsed: integer("tokens_used"),
    latencyMs: integer("latency_ms"),

    // Voice metadata (Phase 6)
    inputType: varchar("input_type", { length: 20 }).default("text"), // "text" | "voice"
    audioDurationMs: integer("audio_duration_ms"),
    transcriptionConfidence: decimal("transcription_confidence", { precision: 5, scale: 4 }),
    originalLanguage: varchar("original_language", { length: 10 }), // detected language from STT
  },
  (table) => [
    index("messages_conversation_idx").on(table.conversationId),
    index("messages_created_idx").on(table.createdAt),
  ]
);

// EMAIL SUBSCRIBERS - Newsletter and update signups
export const emailSubscribers = pgTable(
  "email_subscribers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),

    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    language: varchar("language", { length: 2 }).default("es"),

    source: varchar("source", { length: 50 }),
    sourcePage: varchar("source_page", { length: 255 }),

    subscribed: boolean("subscribed").default(true),
    unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),

    leadId: uuid("lead_id").references(() => leads.id),
  },
  (table) => [
    index("subscribers_email_idx").on(table.email),
    index("subscribers_subscribed_idx").on(table.subscribed),
  ]
);

// PROMOTIONS - Promo codes and discounts
export const promotions = pgTable(
  "promotions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),

    code: varchar("code", { length: 50 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    descriptionEn: text("description_en"),
    descriptionEs: text("description_es"),

    discountType: varchar("discount_type", { length: 20 }),
    discountValue: decimal("discount_value", { precision: 10, scale: 2 }),
    discountCurrency: varchar("discount_currency", { length: 3 }),

    validFrom: timestamp("valid_from", { withTimezone: true }),
    validUntil: timestamp("valid_until", { withTimezone: true }),

    maxUses: integer("max_uses"),
    timesUsed: integer("times_used").default(0),

    minimumValue: decimal("minimum_value", { precision: 10, scale: 2 }),

    active: boolean("active").default(true),
  },
  (table) => [
    index("promotions_code_idx").on(table.code),
    index("promotions_active_idx").on(table.active),
  ]
);

// SEMILLA SUPPORTERS - Semilla Fund contributions
export const semillaSupporters = pgTable(
  "semilla_supporters",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),

    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),

    tier: varchar("tier", { length: 50 }),
    amountUsd: decimal("amount_usd", { precision: 10, scale: 2 }),
    paymentMethod: varchar("payment_method", { length: 50 }),
    paymentReference: varchar("payment_reference", { length: 255 }),

    status: varchar("status", { length: 50 }).default("active"),

    projectInterest: text("project_interest"),
    wantsUpdates: boolean("wants_updates").default(true),

    displayName: varchar("display_name", { length: 255 }),
    anonymous: boolean("anonymous").default(false),
  },
  (table) => [
    index("semilla_email_idx").on(table.email),
    index("semilla_status_idx").on(table.status),
  ]
);
