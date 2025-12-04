ALTER TABLE "chat_messages" ADD COLUMN "input_type" varchar(20) DEFAULT 'text';--> statement-breakpoint
ALTER TABLE "chat_messages" ADD COLUMN "audio_duration_ms" integer;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD COLUMN "transcription_confidence" numeric(5, 4);--> statement-breakpoint
ALTER TABLE "chat_messages" ADD COLUMN "original_language" varchar(10);