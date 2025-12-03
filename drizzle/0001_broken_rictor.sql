CREATE TABLE "chat_conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" uuid,
	"session_id" varchar(255),
	"started_at" timestamp with time zone DEFAULT now(),
	"ended_at" timestamp with time zone,
	"last_message_at" timestamp with time zone,
	"language" varchar(2) DEFAULT 'es',
	"page_url" varchar(500),
	"entry_context" varchar(50),
	"user_timezone" varchar(100),
	"escalated_to_human" boolean DEFAULT false,
	"escalation_method" varchar(50),
	"summary" text,
	"intent_detected" varchar(100),
	"sentiment" varchar(50),
	"message_count" integer DEFAULT 0,
	"total_tokens_used" integer DEFAULT 0,
	"function_calls_used" text,
	"lead_captured" boolean DEFAULT false,
	"whatsapp_clicked" boolean DEFAULT false,
	"form_opened" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"role" varchar(20) NOT NULL,
	"content" text NOT NULL,
	"model_used" varchar(100),
	"tokens_used" integer,
	"latency_ms" integer
);
--> statement-breakpoint
CREATE TABLE "email_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"language" varchar(2) DEFAULT 'es',
	"source" varchar(50),
	"source_page" varchar(255),
	"subscribed" boolean DEFAULT true,
	"unsubscribed_at" timestamp with time zone,
	"lead_id" uuid,
	CONSTRAINT "email_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"whatsapp" varchar(50),
	"preferred_language" varchar(2) DEFAULT 'es',
	"project_type" varchar(100),
	"project_description" text,
	"budget_range" varchar(50),
	"timeline" varchar(50),
	"how_heard" varchar(100),
	"source" varchar(50) DEFAULT 'form',
	"promo_code" varchar(50),
	"utm_source" varchar(100),
	"utm_medium" varchar(100),
	"utm_campaign" varchar(100),
	"status" varchar(50) DEFAULT 'new',
	"notes" text,
	"assigned_to" varchar(50),
	"display_currency" varchar(3) DEFAULT 'USD',
	"newsletter_consent" boolean DEFAULT false,
	"qualification_score" integer DEFAULT 0,
	"qualification_level" varchar(20) DEFAULT 'cold',
	"interests" text,
	"conversation_summary" text,
	"has_budget" boolean DEFAULT false,
	"has_timeline" boolean DEFAULT false,
	"has_clear_use_case" boolean DEFAULT false,
	"is_decision_maker" boolean DEFAULT false,
	"is_sector_fit" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "promotions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"code" varchar(50) NOT NULL,
	"name" varchar(255),
	"description_en" text,
	"description_es" text,
	"discount_type" varchar(20),
	"discount_value" numeric(10, 2),
	"discount_currency" varchar(3),
	"valid_from" timestamp with time zone,
	"valid_until" timestamp with time zone,
	"max_uses" integer,
	"times_used" integer DEFAULT 0,
	"minimum_value" numeric(10, 2),
	"active" boolean DEFAULT true,
	CONSTRAINT "promotions_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "semilla_supporters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"tier" varchar(50),
	"amount_usd" numeric(10, 2),
	"payment_method" varchar(50),
	"payment_reference" varchar(255),
	"status" varchar(50) DEFAULT 'active',
	"project_interest" text,
	"wants_updates" boolean DEFAULT true,
	"display_name" varchar(255),
	"anonymous" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "chat_conversations" ADD CONSTRAINT "chat_conversations_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_conversation_id_chat_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."chat_conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_subscribers" ADD CONSTRAINT "email_subscribers_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "conversations_lead_idx" ON "chat_conversations" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "conversations_session_idx" ON "chat_conversations" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "conversations_started_idx" ON "chat_conversations" USING btree ("started_at");--> statement-breakpoint
CREATE INDEX "conversations_entry_context_idx" ON "chat_conversations" USING btree ("entry_context");--> statement-breakpoint
CREATE INDEX "messages_conversation_idx" ON "chat_messages" USING btree ("conversation_id");--> statement-breakpoint
CREATE INDEX "messages_created_idx" ON "chat_messages" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "subscribers_email_idx" ON "email_subscribers" USING btree ("email");--> statement-breakpoint
CREATE INDEX "subscribers_subscribed_idx" ON "email_subscribers" USING btree ("subscribed");--> statement-breakpoint
CREATE INDEX "leads_email_idx" ON "leads" USING btree ("email");--> statement-breakpoint
CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "leads_created_idx" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "leads_qualification_idx" ON "leads" USING btree ("qualification_score");--> statement-breakpoint
CREATE INDEX "promotions_code_idx" ON "promotions" USING btree ("code");--> statement-breakpoint
CREATE INDEX "promotions_active_idx" ON "promotions" USING btree ("active");--> statement-breakpoint
CREATE INDEX "semilla_email_idx" ON "semilla_supporters" USING btree ("email");--> statement-breakpoint
CREATE INDEX "semilla_status_idx" ON "semilla_supporters" USING btree ("status");--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "account_provider_account_idx" ON "account" USING btree ("provider_id","account_id");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_token_idx" ON "session" USING btree ("token");--> statement-breakpoint
CREATE INDEX "user_email_idx" ON "user" USING btree ("email");