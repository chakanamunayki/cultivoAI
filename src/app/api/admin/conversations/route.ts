/**
 * Admin Conversations API Route
 * Phase 4 - Conversation metrics and listing
 */

import { NextResponse } from "next/server";
import { desc, eq, sql, and, gte, lte, count, avg } from "drizzle-orm";
import { db } from "@/lib/db";
import { chatConversations, leads } from "@/lib/schema";

// ============================================
// GET - Conversation listing with metrics
// ============================================

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    // Pagination
    const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") ?? "20")));
    const offset = (page - 1) * limit;

    // Filters
    const dateFrom = url.searchParams.get("dateFrom");
    const dateTo = url.searchParams.get("dateTo");
    const withEscalation = url.searchParams.get("withEscalation");
    const withLeadCapture = url.searchParams.get("withLeadCapture");
    const language = url.searchParams.get("language");
    const entryContext = url.searchParams.get("entryContext");

    // Build where conditions
    const conditions = [];

    if (dateFrom) {
      conditions.push(gte(chatConversations.startedAt, new Date(dateFrom)));
    }

    if (dateTo) {
      conditions.push(lte(chatConversations.startedAt, new Date(dateTo)));
    }

    if (withEscalation === "true") {
      conditions.push(eq(chatConversations.escalatedToHuman, true));
    }

    if (withLeadCapture === "true") {
      conditions.push(eq(chatConversations.leadCaptured, true));
    }

    if (language) {
      conditions.push(eq(chatConversations.language, language));
    }

    if (entryContext) {
      conditions.push(eq(chatConversations.entryContext, entryContext));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get total count
    const [countResult] = await db
      .select({ count: count() })
      .from(chatConversations)
      .where(whereClause);

    const totalCount = countResult?.count ?? 0;
    const totalPages = Math.ceil(totalCount / limit);

    // Get conversations with lead info
    const conversationsData = await db
      .select({
        id: chatConversations.id,
        leadId: chatConversations.leadId,
        sessionId: chatConversations.sessionId,
        startedAt: chatConversations.startedAt,
        endedAt: chatConversations.endedAt,
        lastMessageAt: chatConversations.lastMessageAt,
        language: chatConversations.language,
        pageUrl: chatConversations.pageUrl,
        entryContext: chatConversations.entryContext,
        summary: chatConversations.summary,
        intentDetected: chatConversations.intentDetected,
        sentiment: chatConversations.sentiment,
        messageCount: chatConversations.messageCount,
        totalTokensUsed: chatConversations.totalTokensUsed,
        escalatedToHuman: chatConversations.escalatedToHuman,
        escalationMethod: chatConversations.escalationMethod,
        leadCaptured: chatConversations.leadCaptured,
        whatsappClicked: chatConversations.whatsappClicked,
        formOpened: chatConversations.formOpened,
        functionCallsUsed: chatConversations.functionCallsUsed,
        // Lead info if linked
        leadName: leads.name,
        leadEmail: leads.email,
        leadQualificationLevel: leads.qualificationLevel,
      })
      .from(chatConversations)
      .leftJoin(leads, eq(chatConversations.leadId, leads.id))
      .where(whereClause)
      .orderBy(desc(chatConversations.startedAt))
      .limit(limit)
      .offset(offset);

    // Calculate aggregate metrics for the filtered set
    const [metrics] = await db
      .select({
        avgMessages: avg(chatConversations.messageCount),
        avgDuration: sql<number>`
          AVG(
            EXTRACT(EPOCH FROM (${chatConversations.lastMessageAt} - ${chatConversations.startedAt})) / 60
          )
        `.as("avgDuration"),
        avgTokens: avg(chatConversations.totalTokensUsed),
        escalationCount: sql<number>`COUNT(*) FILTER (WHERE ${chatConversations.escalatedToHuman} = true)`.as(
          "escalationCount"
        ),
        leadCaptureCount: sql<number>`COUNT(*) FILTER (WHERE ${chatConversations.leadCaptured} = true)`.as(
          "leadCaptureCount"
        ),
      })
      .from(chatConversations)
      .where(whereClause);

    return NextResponse.json({
      conversations: conversationsData.map(conv => ({
        ...conv,
        functionCallsUsed: conv.functionCallsUsed ? JSON.parse(conv.functionCallsUsed) : [],
        durationMinutes: conv.lastMessageAt && conv.startedAt
          ? Math.round((conv.lastMessageAt.getTime() - conv.startedAt.getTime()) / 60000)
          : null,
      })),
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages,
      },
      metrics: {
        avgMessages: Math.round(Number(metrics?.avgMessages ?? 0)),
        avgDurationMinutes: Math.round(Number(metrics?.avgDuration ?? 0)),
        avgTokens: Math.round(Number(metrics?.avgTokens ?? 0)),
        escalationCount: metrics?.escalationCount ?? 0,
        leadCaptureCount: metrics?.leadCaptureCount ?? 0,
        escalationRate: totalCount > 0
          ? Math.round(((metrics?.escalationCount ?? 0) / totalCount) * 100)
          : 0,
        leadCaptureRate: totalCount > 0
          ? Math.round(((metrics?.leadCaptureCount ?? 0) / totalCount) * 100)
          : 0,
      },
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}
