/**
 * Leads API Route
 * Forwards captured leads to an email-forwarding service (Formspree /
 * Web3Forms) instead of a database. Set LEADS_FORWARD_URL to the endpoint.
 */

import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import {
  calculateQualificationScore,
  getQualificationLevel,
  type QualificationFactors,
} from "@/lib/chat/system-prompt";

// ============================================
// Types
// ============================================

interface CreateLeadRequest {
  name?: string;
  email: string;
  company?: string;
  phone?: string;
  whatsapp?: string;
  preferredLanguage?: "es" | "en" | "pt";
  projectType?: string;
  projectDescription?: string;
  budgetRange?: string;
  timeline?: string;
  howHeard?: string;
  source?: string;
  interests?: string[];
  conversationSummary?: string;
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

function clean(str: string | undefined): string | undefined {
  if (!str) return undefined;
  return str.trim().slice(0, 500);
}

// ============================================
// POST - Capture a new lead (forwarded via email)
// ============================================

export async function POST(request: Request) {
  try {
    const body: CreateLeadRequest = await request.json();

    // Validate required field
    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const forwardUrl = process.env.LEADS_FORWARD_URL;
    if (!forwardUrl) {
      console.error("LEADS_FORWARD_URL is not set; cannot forward lead.");
      return NextResponse.json(
        { error: "Lead forwarding is not configured" },
        { status: 500 }
      );
    }

    const name = clean(body.name);
    const email = body.email.trim().toLowerCase();
    const interests = body.interests?.length
      ? body.interests.join(", ")
      : undefined;

    // Payload accepted by both Formspree and Web3Forms. Web3Forms also needs
    // an access_key; supply it via LEADS_FORWARD_ACCESS_KEY when using them.
    const payload: Record<string, unknown> = {
      subject: `New CultivoAI lead: ${name || email}`,
      name: name || "(no name)",
      email,
      source: clean(body.source) || "chatbot",
      language: body.preferredLanguage || "es",
      ...(clean(body.company) ? { company: clean(body.company) } : {}),
      ...(clean(body.phone) ? { phone: clean(body.phone) } : {}),
      ...(clean(body.whatsapp) ? { whatsapp: clean(body.whatsapp) } : {}),
      ...(clean(body.projectType) ? { projectType: clean(body.projectType) } : {}),
      ...(clean(body.projectDescription)
        ? { projectDescription: clean(body.projectDescription) }
        : {}),
      ...(interests ? { interests } : {}),
      ...(clean(body.conversationSummary)
        ? { conversationSummary: clean(body.conversationSummary) }
        : {}),
      ...(clean(body.utmSource) ? { utmSource: clean(body.utmSource) } : {}),
      ...(clean(body.utmMedium) ? { utmMedium: clean(body.utmMedium) } : {}),
      ...(clean(body.utmCampaign) ? { utmCampaign: clean(body.utmCampaign) } : {}),
      ...(process.env.LEADS_FORWARD_ACCESS_KEY
        ? { access_key: process.env.LEADS_FORWARD_ACCESS_KEY }
        : {}),
    };

    const forwardRes = await fetch(forwardUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!forwardRes.ok) {
      const detail = await forwardRes.text().catch(() => "");
      console.error(
        `Lead forwarding failed (${forwardRes.status}): ${detail.slice(0, 300)}`
      );
      return NextResponse.json(
        { error: "Failed to submit lead" },
        { status: 502 }
      );
    }

    // No database, so synthesise an id the client can carry for the session.
    return NextResponse.json({
      success: true,
      leadId: randomUUID(),
    });
  } catch (error) {
    console.error("Error capturing lead:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}

// ============================================
// PATCH - Qualification scoring (computed, not persisted)
// ============================================

export async function PATCH(request: Request) {
  try {
    const body: UpdateQualificationRequest = await request.json();

    if (!body.leadId) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    const factors: QualificationFactors = {
      budgetIndicator: body.budgetIndicator,
      timeline: body.timeline,
      useCase: body.useCase,
      decisionMaker: body.decisionMaker,
      sectorFit: body.sectorFit,
    };
    const qualificationScore = calculateQualificationScore(factors);
    const qualificationLevel = getQualificationLevel(qualificationScore);

    return NextResponse.json({
      success: true,
      qualificationScore,
      qualificationLevel,
    });
  } catch (error) {
    console.error("Error scoring lead qualification:", error);
    return NextResponse.json(
      { error: "Failed to score lead qualification" },
      { status: 500 }
    );
  }
}
