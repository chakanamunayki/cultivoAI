/**
 * Admin Stats API Route
 * Phase 4 - Dashboard Summary Statistics
 */

import { NextResponse } from "next/server";
import { sql, count, avg, gte, isNotNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads, chatConversations } from "@/lib/schema";

// ============================================
// Types
// ============================================

interface DashboardStats {
  leads: {
    total: number;
    byStatus: {
      new: number;
      warm: number;
      hot: number;
      priority: number;
      contacted: number;
      converted: number;
    };
    bySource: Record<string, number>;
    thisWeek: number;
    thisMonth: number;
  };
  conversations: {
    total: number;
    avgMessages: number;
    avgDurationMinutes: number;
    withLeadCapture: number;
    withEscalation: number;
    thisWeek: number;
  };
  engagement: {
    whatsappClicks: number;
    formOpens: number;
    leadCaptureRate: number;
  };
}

// ============================================
// GET - Dashboard summary stats
// ============================================

export async function GET() {
  try {
    // Get date boundaries
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Execute all queries in parallel for better performance
    const [
      totalLeads,
      leadsByStatus,
      leadsBySource,
      leadsThisWeek,
      leadsThisMonth,
      totalConversations,
      conversationMetrics,
      conversationsThisWeek,
      engagementMetrics,
    ] = await Promise.all([
      // Total leads
      db.select({ count: count() }).from(leads),

      // Leads by status
      db
        .select({
          status: leads.status,
          count: count(),
        })
        .from(leads)
        .groupBy(leads.status),

      // Leads by source
      db
        .select({
          source: leads.source,
          count: count(),
        })
        .from(leads)
        .groupBy(leads.source),

      // Leads this week
      db
        .select({ count: count() })
        .from(leads)
        .where(gte(leads.createdAt, weekAgo)),

      // Leads this month
      db
        .select({ count: count() })
        .from(leads)
        .where(gte(leads.createdAt, monthAgo)),

      // Total conversations
      db.select({ count: count() }).from(chatConversations),

      // Conversation metrics (avg messages, avg duration)
      db
        .select({
          avgMessages: avg(chatConversations.messageCount),
          // Duration in minutes between startedAt and lastMessageAt
          avgDuration: sql<number>`
            AVG(
              EXTRACT(EPOCH FROM (${chatConversations.lastMessageAt} - ${chatConversations.startedAt})) / 60
            )
          `.as("avgDuration"),
          withLeadCapture: sql<number>`COUNT(*) FILTER (WHERE ${chatConversations.leadCaptured} = true)`.as(
            "withLeadCapture"
          ),
          withEscalation: sql<number>`COUNT(*) FILTER (WHERE ${chatConversations.escalatedToHuman} = true)`.as(
            "withEscalation"
          ),
        })
        .from(chatConversations)
        .where(isNotNull(chatConversations.startedAt)),

      // Conversations this week
      db
        .select({ count: count() })
        .from(chatConversations)
        .where(gte(chatConversations.startedAt, weekAgo)),

      // Engagement metrics
      db
        .select({
          whatsappClicks: sql<number>`COUNT(*) FILTER (WHERE ${chatConversations.whatsappClicked} = true)`.as(
            "whatsappClicks"
          ),
          formOpens: sql<number>`COUNT(*) FILTER (WHERE ${chatConversations.formOpened} = true)`.as("formOpens"),
        })
        .from(chatConversations),
    ]);

    // Process leads by status
    const statusCounts = {
      new: 0,
      warm: 0,
      hot: 0,
      priority: 0,
      contacted: 0,
      converted: 0,
    };
    for (const row of leadsByStatus) {
      const status = row.status as keyof typeof statusCounts;
      if (status in statusCounts) {
        statusCounts[status] = row.count;
      }
    }

    // Process leads by source
    const sourceCounts: Record<string, number> = {};
    for (const row of leadsBySource) {
      if (row.source) {
        sourceCounts[row.source] = row.count;
      }
    }

    // Calculate lead capture rate
    const totalConvCount = totalConversations[0]?.count ?? 0;
    const leadsWithCapture = conversationMetrics[0]?.withLeadCapture ?? 0;
    const leadCaptureRate =
      totalConvCount > 0 ? Math.round((leadsWithCapture / totalConvCount) * 100) : 0;

    const stats: DashboardStats = {
      leads: {
        total: totalLeads[0]?.count ?? 0,
        byStatus: statusCounts,
        bySource: sourceCounts,
        thisWeek: leadsThisWeek[0]?.count ?? 0,
        thisMonth: leadsThisMonth[0]?.count ?? 0,
      },
      conversations: {
        total: totalConvCount,
        avgMessages: Math.round(Number(conversationMetrics[0]?.avgMessages ?? 0)),
        avgDurationMinutes: Math.round(Number(conversationMetrics[0]?.avgDuration ?? 0)),
        withLeadCapture: leadsWithCapture,
        withEscalation: conversationMetrics[0]?.withEscalation ?? 0,
        thisWeek: conversationsThisWeek[0]?.count ?? 0,
      },
      engagement: {
        whatsappClicks: engagementMetrics[0]?.whatsappClicks ?? 0,
        formOpens: engagementMetrics[0]?.formOpens ?? 0,
        leadCaptureRate,
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
