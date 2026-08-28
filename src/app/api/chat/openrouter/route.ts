/**
 * OpenRouter Chat API Route
 * Public landing-widget chat brain. Mirrors the Gemini route's request/response
 * contract ({ text, functionCalls }) so the widget needs no structural change.
 *
 * Tools are declared with server-side stub execution. The real UI side effects
 * (navigation, modals, lead form) run client-side in the widget, same pattern as
 * the Gemini route. The server only needs the tool CALLS to forward to the client
 * and a final text reply.
 */

import { NextResponse } from "next/server";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, stepCountIs, tool, type ModelMessage } from "ai";
import { z } from "zod";
import type { ChatContextType } from "@/content/types";
import {
  buildSystemPrompt,
  type SiteContentForPrompt,
  type SystemPromptContext,
} from "@/lib/chat/system-prompt";

const DEFAULT_OPENROUTER_CHAT_MODEL = "qwen/qwen3.8-flash";

interface Message {
  role: "user" | "model";
  text: string;
}

interface ChatRequest {
  message: string;
  history: Message[];
  locale: "es" | "en";
  siteContent: SiteContentForPrompt;
  entryContext?: ChatContextType;
  sessionId?: string;
  timezone?: string;
  pageUrl?: string;
}

interface FunctionCallResult {
  name: string;
  args: Record<string, unknown>;
}

// Tools mirror src/lib/chat/functions.ts. Execution is a stub: the widget runs
// the real actions on the client. We only forward the calls and the final text.
const chatTools = {
  navigate_to_section: tool({
    description:
      "Scrolls the website to a specific section. Use when users want to see a section or ask about content on the page. Valid IDs: 'hero', 'about', 'services', 'partnerships', 'projects', 'stories', 'who-we-help', 'what-happens-next'.",
    inputSchema: z.object({ section_id: z.string() }),
    execute: async () => ({ status: "ok" }),
  }),
  show_project_details: tool({
    description:
      "Opens a modal with full details about a specific project (e.g. 'CHAK FoodTech', 'Munayki', 'Raiz Capital').",
    inputSchema: z.object({ project_title: z.string() }),
    execute: async () => ({ status: "ok" }),
  }),
  show_service_details: tool({
    description:
      "Opens a modal with full details about a specific service (e.g. 'Company Brain', 'Workflow Optimization', 'Decision Dashboards').",
    inputSchema: z.object({ service_title: z.string() }),
    execute: async () => ({ status: "ok" }),
  }),
  collect_lead_info: tool({
    description:
      "Captures contact information when the user shows genuine interest in being contacted, booking a call, or receiving a proposal. Only call this AFTER the user has expressed clear interest.",
    inputSchema: z.object({
      name: z.string(),
      email: z.string(),
      company: z.string().optional(),
      phone: z.string().optional(),
      interested_services: z.array(z.string()).optional(),
      project_description: z.string().optional(),
    }),
    execute: async () => ({ status: "ok" }),
  }),
  qualify_lead: tool({
    description:
      "Scores a lead based on conversation signals. Call after gathering enough information about the user's needs. Each factor adds 1 point (0-5).",
    inputSchema: z.object({
      budget_indicator: z.boolean(),
      timeline: z.boolean(),
      use_case: z.boolean(),
      decision_maker: z.boolean(),
      sector_fit: z.boolean(),
      conversation_summary: z.string().optional(),
    }),
    execute: async () => ({ status: "ok" }),
  }),
  suggest_service: tool({
    description:
      "Recommends a specific service when there is a clear match. Use the site's current service names, Company Brain first.",
    inputSchema: z.object({
      service_name: z.string(),
      reason: z.string(),
    }),
    execute: async () => ({ status: "ok" }),
  }),
  offer_whatsapp: tool({
    description:
      "Offers to continue on WhatsApp. Use after qualifying a lead, when the user asks for direct contact, or if they prefer messaging.",
    inputSchema: z.object({ context_message: z.string() }),
    execute: async () => ({ status: "ok" }),
  }),
  schedule_call: tool({
    description:
      "Suggests booking a call with Paul. Use for qualified leads (score 3+) with complex projects or who need detailed discussion.",
    inputSchema: z.object({
      reason: z.string(),
      urgency: z.string().optional(),
    }),
    execute: async () => ({ status: "ok" }),
  }),
};

function getErrorStatus(error: unknown): number {
  if (error && typeof error === "object") {
    const maybe = error as {
      statusCode?: number;
      status?: number;
      responseBody?: string;
    };
    const status = maybe.statusCode ?? maybe.status;
    if (typeof status === "number" && status >= 400 && status <= 599) {
      return status;
    }
  }
  return 500;
}

export async function POST(request: Request) {
  let requestLocale: "es" | "en" = "es";

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const chatModel =
      process.env.OPENROUTER_MODEL || DEFAULT_OPENROUTER_CHAT_MODEL;

    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is not configured");
      return NextResponse.json(
        {
          error: "AI service not configured",
          text: "Lo siento, el servicio de IA no esta configurado.",
        },
        { status: 500 }
      );
    }

    const body: ChatRequest = await request.json();
    const {
      message,
      history,
      locale,
      siteContent,
      entryContext,
      sessionId,
      timezone,
      pageUrl,
    } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }
    const safeLocale = locale === "en" ? "en" : "es";
    requestLocale = safeLocale;
    const safeHistory = Array.isArray(history) ? history : [];

    if (!siteContent) {
      return NextResponse.json(
        { error: "Site content is required" },
        { status: 400 }
      );
    }

    const promptContext: SystemPromptContext = {
      locale: safeLocale,
      entryContext,
      timezone,
      pageUrl,
      sessionId,
    };
    const systemInstruction = buildSystemPrompt(siteContent, promptContext);

    // Convert widget history (role "model") to model messages (role "assistant").
    const messages: ModelMessage[] = safeHistory
      .filter((msg) => msg?.text)
      .map((msg) => ({
        role: msg.role === "model" ? "assistant" : "user",
        content: msg.text,
      }));
    messages.push({ role: "user", content: message });

    const openrouter = createOpenRouter({ apiKey });

    // Disable reasoning: current flash models are reasoning-capable, which makes
    // them slow and verbose. A landing widget wants fast, concise, plain replies.
    // stepCountIs(2): step 1 the model may call tools (stub-executed), step 2 it
    // produces the final natural-language reply.
    const result = await generateText({
      model: openrouter(chatModel, {
        reasoning: { enabled: false, effort: "low" },
      }),
      system: systemInstruction,
      messages,
      tools: chatTools,
      stopWhen: stepCountIs(2),
    });

    // Collect every tool call across steps and forward as { name, args } so the
    // widget's executeFunctionCall runs the real client-side action.
    const functionCalls: FunctionCallResult[] = result.steps.flatMap((step) =>
      step.toolCalls.map((call) => ({
        name: call.toolName,
        args: (call.input as Record<string, unknown>) ?? {},
      }))
    );

    const fallbackText = safeLocale === "es" ? "Entendido." : "Got it.";

    return NextResponse.json({
      text: result.text?.trim() || fallbackText,
      functionCalls,
    });
  } catch (error) {
    const status = getErrorStatus(error);
    const isQuota = status === 429;
    const isSpanish = requestLocale === "es";
    const userText = isQuota
      ? isSpanish
        ? "Estamos con alta demanda del servicio de IA. Intenta de nuevo en unos segundos o usa WhatsApp."
        : "We're at high AI capacity right now. Please try again in a few seconds or use WhatsApp."
      : isSpanish
      ? "Lo siento, hubo un error procesando tu mensaje. Por favor intenta de nuevo."
      : "Sorry, there was an error processing your message. Please try again.";

    console.error("OpenRouter API error:", { status, error });

    return NextResponse.json(
      { error: "Failed to process message", text: userText },
      { status }
    );
  }
}
