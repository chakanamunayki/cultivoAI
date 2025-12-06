/**
 * Leads API Route
 * Phase 3B - Lead Capture & Qualification
 */

import { NextResponse } from "next/server";
import {
  calculateQualificationScore,
  getQualificationLevel,
  type QualificationFactors,
} from "@/lib/chat/system-prompt";
import { db } from "@/lib/db";
import { leads } from "@/lib/schema";

// ============================================
// Types
// ============================================

interface CreateLeadRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  whatsapp?: string;
  preferredLanguage?: "es" | "en";
  projectType?: string;
  projectDescription?: string;
  budgetRange?: string;
  timeline?: string;
  howHeard?: string;
  source?: string;
  interests?: string[];
  conversationSummary?: string;
  // Qualification factors
  hasBudget?: boolean;
  hasTimeline?: boolean;
  hasClearUseCase?: boolean;
  isDecisionMaker?: boolean;
  isSectorFit?: boolean;
  // UTM tracking
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

interface UpdateQualificationRequest {
  leadId: string;
  budgetIndicator: boolean;
  timeline: boolean;
  useCase: boolean;
  decisionMaker: boolean;
  sectorFit: boolean;
  conversationSummary?: string;
}

// ============================================
// Validation
// ============================================

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeString(str: string | undefined): string | undefined {
  if (!str) return undefined;
  return str.trim().slice(0, 500); // Limit length
}

// ============================================
// POST - Create new lead
// ============================================

export async function POST(request: Request) {
  try {
    const body: CreateLeadRequest = await request.json();

    // Validate required fields
    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Calculate qualification score if factors provided
    let qualificationScore = 0;
    let qualificationLevel: "cold" | "warm" | "hot" | "priority" = "cold";

    if (
      body.hasBudget !== undefined ||
      body.hasTimeline !== undefined ||
      body.hasClearUseCase !== undefined ||
      body.isDecisionMaker !== undefined ||
      body.isSectorFit !== undefined
    ) {
      const factors: QualificationFactors = {
        budgetIndicator: body.hasBudget ?? false,
        timeline: body.hasTimeline ?? false,
        useCase: body.hasClearUseCase ?? false,
        decisionMaker: body.isDecisionMaker ?? false,
        sectorFit: body.isSectorFit ?? false,
      };
      qualificationScore = calculateQualificationScore(factors);
      qualificationLevel = getQualificationLevel(qualificationScore);
    }

    // Create the lead
    const result = await db
      .insert(leads)
      .values({
        name: sanitizeString(body.name),
        email: body.email.trim().toLowerCase(),
        phone: sanitizeString(body.phone),
        whatsapp: sanitizeString(body.whatsapp),
        preferredLanguage: body.preferredLanguage || "es",
        projectType: sanitizeString(body.projectType),
        projectDescription: sanitizeString(body.projectDescription),
        budgetRange: sanitizeString(body.budgetRange),
        timeline: sanitizeString(body.timeline),
        howHeard: sanitizeString(body.howHeard),
        source: body.source || "chatbot",
        utmSource: sanitizeString(body.utmSource),
        utmMedium: sanitizeString(body.utmMedium),
        utmCampaign: sanitizeString(body.utmCampaign),
        interests: body.interests ? JSON.stringify(body.interests) : null,
        conversationSummary: sanitizeString(body.conversationSummary),
        qualificationScore,
        qualificationLevel,
        hasBudget: body.hasBudget ?? false,
        hasTimeline: body.hasTimeline ?? false,
        hasClearUseCase: body.hasClearUseCase ?? false,
        isDecisionMaker: body.isDecisionMaker ?? false,
        isSectorFit: body.isSectorFit ?? false,
        status: qualificationScore >= 4 ? "priority" : "new",
      })
      .returning({ id: leads.id });

    const newLead = result[0];
    if (!newLead) {
      return NextResponse.json(
        { error: "Failed to create lead" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId: newLead.id,
      qualificationScore,
      qualificationLevel,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

// ============================================
// PATCH - Update lead qualification
// ============================================

export async function PATCH(request: Request) {
  try {
    const body: UpdateQualificationRequest = await request.json();

    if (!body.leadId) {
      return NextResponse.json(
        { error: "Lead ID is required" },
        { status: 400 }
      );
    }

    // Calculate qualification score
    const factors: QualificationFactors = {
      budgetIndicator: body.budgetIndicator,
      timeline: body.timeline,
      useCase: body.useCase,
      decisionMaker: body.decisionMaker,
      sectorFit: body.sectorFit,
    };
    const qualificationScore = calculateQualificationScore(factors);
    const qualificationLevel = getQualificationLevel(qualificationScore);

    // Update the lead
    const { eq } = await import("drizzle-orm");
    await db
      .update(leads)
      .set({
        qualificationScore,
        qualificationLevel,
        hasBudget: body.budgetIndicator,
        hasTimeline: body.timeline,
        hasClearUseCase: body.useCase,
        isDecisionMaker: body.decisionMaker,
        isSectorFit: body.sectorFit,
        conversationSummary: body.conversationSummary,
        status: qualificationScore >= 4 ? "priority" : undefined,
        updatedAt: new Date(),
      })
      .where(eq(leads.id, body.leadId));

    return NextResponse.json({
      success: true,
      qualificationScore,
      qualificationLevel,
    });
  } catch (error) {
    console.error("Error updating lead qualification:", error);
    return NextResponse.json(
      { error: "Failed to update lead qualification" },
      { status: 500 }
    );
  }
}
