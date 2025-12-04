/**
 * Admin Leads API Route
 * Phase 4 - Paginated leads with filters
 */

import { NextResponse } from "next/server";
import { desc, eq, sql, and, or, ilike, gte, lte, count, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads, chatConversations } from "@/lib/schema";

// ============================================
// Types
// ============================================

interface LeadWithConversations {
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  name: string | null;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  preferredLanguage: string | null;
  projectType: string | null;
  projectDescription: string | null;
  budgetRange: string | null;
  timeline: string | null;
  source: string | null;
  status: string | null;
  notes: string | null;
  qualificationScore: number | null;
  qualificationLevel: string | null;
  interests: string | null;
  conversationSummary: string | null;
  hasBudget: boolean | null;
  hasTimeline: boolean | null;
  hasClearUseCase: boolean | null;
  isDecisionMaker: boolean | null;
  isSectorFit: boolean | null;
  conversationCount: number;
  lastConversationAt: Date | null;
}

// ============================================
// GET - Paginated leads with filters
// ============================================

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    // Pagination
    const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") ?? "20")));
    const offset = (page - 1) * limit;

    // Filters
    const status = url.searchParams.get("status");
    const source = url.searchParams.get("source");
    const search = url.searchParams.get("search");
    const qualificationLevel = url.searchParams.get("qualificationLevel");
    const dateFrom = url.searchParams.get("dateFrom");
    const dateTo = url.searchParams.get("dateTo");
    const sortBy = url.searchParams.get("sortBy") ?? "createdAt";
    const sortOrder = url.searchParams.get("sortOrder") ?? "desc";

    // Build where conditions
    const conditions = [];

    if (status) {
      conditions.push(eq(leads.status, status));
    }

    if (source) {
      conditions.push(eq(leads.source, source));
    }

    if (qualificationLevel) {
      conditions.push(eq(leads.qualificationLevel, qualificationLevel));
    }

    if (search) {
      conditions.push(
        or(
          ilike(leads.name, `%${search}%`),
          ilike(leads.email, `%${search}%`),
          ilike(leads.phone, `%${search}%`),
          ilike(leads.projectDescription, `%${search}%`)
        )
      );
    }

    if (dateFrom) {
      conditions.push(gte(leads.createdAt, new Date(dateFrom)));
    }

    if (dateTo) {
      conditions.push(lte(leads.createdAt, new Date(dateTo)));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get total count for pagination
    const [countResult] = await db
      .select({ count: count() })
      .from(leads)
      .where(whereClause);

    const totalCount = countResult?.count ?? 0;
    const totalPages = Math.ceil(totalCount / limit);

    // Determine sort column and order
    const sortColumn = sortBy === "qualificationScore"
      ? leads.qualificationScore
      : sortBy === "name"
        ? leads.name
        : sortBy === "email"
          ? leads.email
          : leads.createdAt;

    const orderFn = sortOrder === "asc" ? asc : desc;

    // Get leads with conversation counts using a subquery
    const leadsData = await db
      .select({
        id: leads.id,
        createdAt: leads.createdAt,
        updatedAt: leads.updatedAt,
        name: leads.name,
        email: leads.email,
        phone: leads.phone,
        whatsapp: leads.whatsapp,
        preferredLanguage: leads.preferredLanguage,
        projectType: leads.projectType,
        projectDescription: leads.projectDescription,
        budgetRange: leads.budgetRange,
        timeline: leads.timeline,
        source: leads.source,
        status: leads.status,
        notes: leads.notes,
        qualificationScore: leads.qualificationScore,
        qualificationLevel: leads.qualificationLevel,
        interests: leads.interests,
        conversationSummary: leads.conversationSummary,
        hasBudget: leads.hasBudget,
        hasTimeline: leads.hasTimeline,
        hasClearUseCase: leads.hasClearUseCase,
        isDecisionMaker: leads.isDecisionMaker,
        isSectorFit: leads.isSectorFit,
      })
      .from(leads)
      .where(whereClause)
      .orderBy(orderFn(sortColumn))
      .limit(limit)
      .offset(offset);

    // Get conversation counts for these leads
    const leadIds = leadsData.map(l => l.id);

    let conversationCounts: { leadId: string; count: number; lastConversationAt: Date | null }[] = [];

    if (leadIds.length > 0) {
      conversationCounts = await db
        .select({
          leadId: chatConversations.leadId,
          count: count(),
          lastConversationAt: sql<Date>`MAX(${chatConversations.lastMessageAt})`.as("lastConversationAt"),
        })
        .from(chatConversations)
        .where(sql`${chatConversations.leadId} IN ${leadIds}`)
        .groupBy(chatConversations.leadId) as { leadId: string; count: number; lastConversationAt: Date | null }[];
    }

    // Merge conversation counts into leads
    const conversationCountMap = new Map(
      conversationCounts.map(c => [c.leadId, { count: c.count, lastConversationAt: c.lastConversationAt }])
    );

    const leadsWithConversations: LeadWithConversations[] = leadsData.map(lead => ({
      ...lead,
      conversationCount: conversationCountMap.get(lead.id)?.count ?? 0,
      lastConversationAt: conversationCountMap.get(lead.id)?.lastConversationAt ?? null,
    }));

    return NextResponse.json({
      leads: leadsWithConversations,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

// ============================================
// PATCH - Update lead status or notes
// ============================================

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { leadId, status, notes, assignedTo } = body;

    if (!leadId) {
      return NextResponse.json(
        { error: "Lead ID is required" },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;

    await db
      .update(leads)
      .set(updateData)
      .where(eq(leads.id, leadId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}
