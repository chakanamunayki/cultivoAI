/**
 * Admin Lead Details API Route
 * Phase 4 - Single lead with full conversation history
 */

import { NextResponse } from "next/server";
import { eq, desc, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads, chatConversations, chatMessages } from "@/lib/schema";

// ============================================
// Types
// ============================================

interface ConversationWithMessages {
  id: string;
  startedAt: Date | null;
  endedAt: Date | null;
  lastMessageAt: Date | null;
  language: string | null;
  pageUrl: string | null;
  entryContext: string | null;
  summary: string | null;
  intentDetected: string | null;
  sentiment: string | null;
  messageCount: number | null;
  escalatedToHuman: boolean | null;
  escalationMethod: string | null;
  leadCaptured: boolean | null;
  whatsappClicked: boolean | null;
  formOpened: boolean | null;
  messages: {
    id: string;
    createdAt: Date | null;
    role: string;
    content: string;
    modelUsed: string | null;
    tokensUsed: number | null;
    latencyMs: number | null;
  }[];
}

interface LeadDetails {
  lead: typeof leads.$inferSelect;
  conversations: ConversationWithMessages[];
  timeline: {
    type: "lead_created" | "conversation" | "status_change" | "escalation";
    timestamp: Date;
    description: string;
    metadata?: Record<string, unknown>;
  }[];
}

// ============================================
// GET - Lead details with conversations
// ============================================

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await params;

    // Get lead
    const [lead] = await db
      .select()
      .from(leads)
      .where(eq(leads.id, leadId))
      .limit(1);

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    // Get all conversations for this lead
    const conversationsData = await db
      .select()
      .from(chatConversations)
      .where(eq(chatConversations.leadId, leadId))
      .orderBy(desc(chatConversations.startedAt));

    // Get messages for all conversations
    const conversationsWithMessages: ConversationWithMessages[] = [];

    for (const conv of conversationsData) {
      const messages = await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.conversationId, conv.id))
        .orderBy(asc(chatMessages.createdAt));

      conversationsWithMessages.push({
        id: conv.id,
        startedAt: conv.startedAt,
        endedAt: conv.endedAt,
        lastMessageAt: conv.lastMessageAt,
        language: conv.language,
        pageUrl: conv.pageUrl,
        entryContext: conv.entryContext,
        summary: conv.summary,
        intentDetected: conv.intentDetected,
        sentiment: conv.sentiment,
        messageCount: conv.messageCount,
        escalatedToHuman: conv.escalatedToHuman,
        escalationMethod: conv.escalationMethod,
        leadCaptured: conv.leadCaptured,
        whatsappClicked: conv.whatsappClicked,
        formOpened: conv.formOpened,
        messages: messages.map(m => ({
          id: m.id,
          createdAt: m.createdAt,
          role: m.role,
          content: m.content,
          modelUsed: m.modelUsed,
          tokensUsed: m.tokensUsed,
          latencyMs: m.latencyMs,
        })),
      });
    }

    // Build timeline
    const timeline: LeadDetails["timeline"] = [];

    // Add lead creation
    if (lead.createdAt) {
      timeline.push({
        type: "lead_created",
        timestamp: lead.createdAt,
        description: `Lead captured via ${lead.source ?? "unknown"}`,
        metadata: {
          qualificationLevel: lead.qualificationLevel,
          qualificationScore: lead.qualificationScore,
        },
      });
    }

    // Add conversations to timeline
    for (const conv of conversationsWithMessages) {
      if (conv.startedAt) {
        timeline.push({
          type: "conversation",
          timestamp: conv.startedAt,
          description: `Chat conversation (${conv.messageCount ?? 0} messages)`,
          metadata: {
            intent: conv.intentDetected,
            sentiment: conv.sentiment,
            duration: conv.lastMessageAt && conv.startedAt
              ? Math.round((conv.lastMessageAt.getTime() - conv.startedAt.getTime()) / 60000)
              : null,
          },
        });

        // Add escalation if occurred
        if (conv.escalatedToHuman && conv.lastMessageAt) {
          timeline.push({
            type: "escalation",
            timestamp: conv.lastMessageAt,
            description: `Escalated to human via ${conv.escalationMethod ?? "unknown"}`,
          });
        }
      }
    }

    // Sort timeline by timestamp descending
    timeline.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    const response: LeadDetails = {
      lead,
      conversations: conversationsWithMessages,
      timeline,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching lead details:", error);
    return NextResponse.json(
      { error: "Failed to fetch lead details" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE - Delete a lead
// ============================================

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await params;

    // Note: conversations and messages will be orphaned but not deleted
    // to preserve analytics data. Consider adding cascade delete if needed.

    await db.delete(leads).where(eq(leads.id, leadId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
