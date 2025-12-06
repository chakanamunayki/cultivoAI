/**
 * Conversations API Route
 * Phase 3C - Conversation Logging & Tracking
 */

import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { chatConversations, chatMessages } from "@/lib/schema";

// ============================================
// Types
// ============================================

interface CreateConversationRequest {
  sessionId: string;
  language?: "es" | "en";
  pageUrl?: string;
  entryContext?: string;
  userTimezone?: string;
}

interface AddMessageRequest {
  conversationId: string;
  role: "user" | "model";
  content: string;
  modelUsed?: string;
  tokensUsed?: number;
  latencyMs?: number;
}

interface UpdateConversationRequest {
  conversationId: string;
  leadId?: string;
  summary?: string;
  intentDetected?: string;
  sentiment?: string;
  escalatedToHuman?: boolean;
  escalationMethod?: string;
  functionCallsUsed?: string[];
  leadCaptured?: boolean;
  whatsappClicked?: boolean;
  formOpened?: boolean;
}

// ============================================
// POST - Create conversation or add message
// ============================================

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get("action");
    const body = await request.json();

    if (action === "message") {
      return await handleAddMessage(body as AddMessageRequest);
    }

    // Default: create conversation
    return await handleCreateConversation(body as CreateConversationRequest);
  } catch (error) {
    console.error("Conversations API error:", error);
    // Provide more context in development
    const errorMessage = process.env.NODE_ENV === "development"
      ? `Failed to process request: ${error instanceof Error ? error.message : String(error)}`
      : "Failed to process request";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// ============================================
// PATCH - Update conversation
// ============================================

export async function PATCH(request: Request) {
  try {
    const body: UpdateConversationRequest = await request.json();

    if (!body.conversationId) {
      return NextResponse.json(
        { error: "Conversation ID is required" },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {
      lastMessageAt: new Date(),
    };

    if (body.leadId) updateData.leadId = body.leadId;
    if (body.summary) updateData.summary = body.summary;
    if (body.intentDetected) updateData.intentDetected = body.intentDetected;
    if (body.sentiment) updateData.sentiment = body.sentiment;
    if (body.escalatedToHuman !== undefined) updateData.escalatedToHuman = body.escalatedToHuman;
    if (body.escalationMethod) updateData.escalationMethod = body.escalationMethod;
    if (body.functionCallsUsed) updateData.functionCallsUsed = JSON.stringify(body.functionCallsUsed);
    if (body.leadCaptured !== undefined) updateData.leadCaptured = body.leadCaptured;
    if (body.whatsappClicked !== undefined) updateData.whatsappClicked = body.whatsappClicked;
    if (body.formOpened !== undefined) updateData.formOpened = body.formOpened;

    await db
      .update(chatConversations)
      .set(updateData)
      .where(eq(chatConversations.id, body.conversationId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating conversation:", error);
    return NextResponse.json(
      { error: "Failed to update conversation" },
      { status: 500 }
    );
  }
}

// ============================================
// Handlers
// ============================================

async function handleCreateConversation(body: CreateConversationRequest) {
  if (!body.sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  // Check if conversation already exists for this session
  const existing = await db
    .select({ id: chatConversations.id })
    .from(chatConversations)
    .where(eq(chatConversations.sessionId, body.sessionId))
    .limit(1);

  const existingConversation = existing[0];
  if (existingConversation) {
    return NextResponse.json({
      success: true,
      conversationId: existingConversation.id,
      isExisting: true,
    });
  }

  // Create new conversation
  const result = await db
    .insert(chatConversations)
    .values({
      sessionId: body.sessionId,
      language: body.language || "es",
      pageUrl: body.pageUrl?.slice(0, 500),
      entryContext: body.entryContext?.slice(0, 50),
      userTimezone: body.userTimezone?.slice(0, 100),
      startedAt: new Date(),
      lastMessageAt: new Date(),
    })
    .returning({ id: chatConversations.id });

  const newConversation = result[0];
  if (!newConversation) {
    return NextResponse.json(
      { error: "Failed to create conversation" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    conversationId: newConversation.id,
    isExisting: false,
  });
}

async function handleAddMessage(body: AddMessageRequest) {
  if (!body.conversationId || !body.content || !body.role) {
    return NextResponse.json(
      { error: "Conversation ID, role, and content are required" },
      { status: 400 }
    );
  }

  // Insert message
  const result = await db
    .insert(chatMessages)
    .values({
      conversationId: body.conversationId,
      role: body.role,
      content: body.content.slice(0, 10000), // Limit content length
      modelUsed: body.modelUsed?.slice(0, 100),
      tokensUsed: body.tokensUsed,
      latencyMs: body.latencyMs,
    })
    .returning({ id: chatMessages.id });

  const newMessage = result[0];
  if (!newMessage) {
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }

  // Update conversation metrics
  await db
    .update(chatConversations)
    .set({
      lastMessageAt: new Date(),
      messageCount: sql`${chatConversations.messageCount} + 1`,
      totalTokensUsed: body.tokensUsed
        ? sql`${chatConversations.totalTokensUsed} + ${body.tokensUsed}`
        : chatConversations.totalTokensUsed,
    })
    .where(eq(chatConversations.id, body.conversationId));

  return NextResponse.json({
    success: true,
    messageId: newMessage.id,
  });
}
