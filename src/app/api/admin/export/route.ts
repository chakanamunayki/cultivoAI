/**
 * Admin Export API Route
 * Phase 4 - Export leads to CSV
 */

import { NextResponse } from "next/server";
import { desc, eq, sql, and, gte, lte } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads, chatConversations } from "@/lib/schema";

// ============================================
// Types
// ============================================

interface ExportLead {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  preferredLanguage: string;
  projectType: string;
  projectDescription: string;
  budgetRange: string;
  timeline: string;
  source: string;
  status: string;
  qualificationScore: number;
  qualificationLevel: string;
  hasBudget: string;
  hasTimeline: string;
  hasClearUseCase: string;
  isDecisionMaker: string;
  isSectorFit: string;
  conversationCount: number;
  interests: string;
  conversationSummary: string;
  notes: string;
}

// ============================================
// Helper: Convert to CSV
// ============================================

function escapeCSV(value: string | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  // Escape quotes and wrap in quotes if contains comma, quote, or newline
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toCSV(headers: string[], rows: Record<string, unknown>[]): string {
  const headerLine = headers.map(h => escapeCSV(h)).join(",");
  const dataLines = rows.map(row =>
    headers.map(h => escapeCSV(row[h] as string)).join(",")
  );
  return [headerLine, ...dataLines].join("\n");
}

// ============================================
// GET - Export leads to CSV
// ============================================

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    // Optional filters
    const status = url.searchParams.get("status");
    const dateFrom = url.searchParams.get("dateFrom");
    const dateTo = url.searchParams.get("dateTo");
    const format = url.searchParams.get("format") ?? "csv";

    // Build where conditions
    const conditions = [];

    if (status) {
      conditions.push(eq(leads.status, status));
    }

    if (dateFrom) {
      conditions.push(gte(leads.createdAt, new Date(dateFrom)));
    }

    if (dateTo) {
      conditions.push(lte(leads.createdAt, new Date(dateTo)));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get all leads matching criteria
    const leadsData = await db
      .select()
      .from(leads)
      .where(whereClause)
      .orderBy(desc(leads.createdAt));

    // Get conversation counts for all leads
    const leadIds = leadsData.map(l => l.id);

    let conversationCounts: { leadId: string; count: number }[] = [];

    if (leadIds.length > 0) {
      conversationCounts = await db
        .select({
          leadId: chatConversations.leadId,
          count: sql<number>`COUNT(*)::int`.as("count"),
        })
        .from(chatConversations)
        .where(sql`${chatConversations.leadId} IN ${leadIds}`)
        .groupBy(chatConversations.leadId) as { leadId: string; count: number }[];
    }

    const conversationCountMap = new Map(
      conversationCounts.map(c => [c.leadId, c.count])
    );

    // Format data for export
    const exportData: ExportLead[] = leadsData.map(lead => ({
      id: lead.id,
      createdAt: lead.createdAt?.toISOString() ?? "",
      name: lead.name ?? "",
      email: lead.email,
      phone: lead.phone ?? "",
      whatsapp: lead.whatsapp ?? "",
      preferredLanguage: lead.preferredLanguage ?? "",
      projectType: lead.projectType ?? "",
      projectDescription: lead.projectDescription ?? "",
      budgetRange: lead.budgetRange ?? "",
      timeline: lead.timeline ?? "",
      source: lead.source ?? "",
      status: lead.status ?? "",
      qualificationScore: lead.qualificationScore ?? 0,
      qualificationLevel: lead.qualificationLevel ?? "",
      hasBudget: lead.hasBudget ? "Yes" : "No",
      hasTimeline: lead.hasTimeline ? "Yes" : "No",
      hasClearUseCase: lead.hasClearUseCase ? "Yes" : "No",
      isDecisionMaker: lead.isDecisionMaker ? "Yes" : "No",
      isSectorFit: lead.isSectorFit ? "Yes" : "No",
      conversationCount: conversationCountMap.get(lead.id) ?? 0,
      interests: lead.interests ?? "",
      conversationSummary: lead.conversationSummary ?? "",
      notes: lead.notes ?? "",
    }));

    if (format === "json") {
      return NextResponse.json(exportData);
    }

    // Default: CSV format
    const headers = [
      "id",
      "createdAt",
      "name",
      "email",
      "phone",
      "whatsapp",
      "preferredLanguage",
      "projectType",
      "projectDescription",
      "budgetRange",
      "timeline",
      "source",
      "status",
      "qualificationScore",
      "qualificationLevel",
      "hasBudget",
      "hasTimeline",
      "hasClearUseCase",
      "isDecisionMaker",
      "isSectorFit",
      "conversationCount",
      "interests",
      "conversationSummary",
      "notes",
    ];

    const csv = toCSV(headers, exportData as unknown as Record<string, unknown>[]);

    // Generate filename with date
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `cultivoai-leads-${dateStr}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error exporting leads:", error);
    return NextResponse.json(
      { error: "Failed to export leads" },
      { status: 500 }
    );
  }
}
