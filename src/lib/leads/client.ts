export type Locale = "es" | "en" | "pt";

export interface CreateLeadInput {
  name?: string;
  email: string;
  company?: string;
  phone?: string;
  whatsapp?: string;
  preferredLanguage?: Locale;
  projectType?: string;
  projectDescription?: string;
  source?: string;
  interests?: string[];
  conversationSummary?: string;
  transcript?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface CreateLeadResponse {
  success: true;
  leadId: string;
  qualificationScore?: number;
  qualificationLevel?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function safeReadJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function createLead(input: CreateLeadInput): Promise<CreateLeadResponse> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await safeReadJson(response);

  if (!response.ok) {
    const message =
      isRecord(data) && typeof data.error === "string"
        ? data.error
        : `Lead submission failed (${response.status})`;
    throw new Error(message);
  }

  if (!isRecord(data) || data.success !== true || typeof data.leadId !== "string") {
    throw new Error("Lead submission returned an unexpected response");
  }

  const result: CreateLeadResponse = {
    success: true,
    leadId: data.leadId,
    ...(typeof data.qualificationScore === "number"
      ? { qualificationScore: data.qualificationScore }
      : {}),
    ...(typeof data.qualificationLevel === "string"
      ? { qualificationLevel: data.qualificationLevel }
      : {}),
  };

  return result;
}
