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
import type { ChatContextType, Locale } from "@/content/types";
import {
  buildSystemPrompt,
  type SiteContentForPrompt,
  type SystemPromptContext,
} from "@/lib/chat/system-prompt";

// Primary. Runs on Google infra via OpenRouter, so it does NOT touch any Google
// API quota. ~1.9s, reliable, tools fire, reasoning disables cleanly.
const DEFAULT_OPENROUTER_CHAT_MODEL = "google/gemini-2.5-flash-lite";
// Automatic fallback if the primary model's provider errors or rate-limits.
// OpenRouter routes the same request to the next model in the list. Qwen's free
// shared pool is 429-prone under load, so it sits behind the reliable primary.
const FALLBACK_CHAT_MODEL = "qwen/qwen3.8-flash";

interface Message {
  role: "user" | "model";
  text: string;
}

interface ChatRequest {
  message: string;
  history: Message[];
  locale: Locale;
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

// Tools mirror src/lib/chat/functions.ts. execute is a stub the widget never
// relies on: the real actions (navigation, modals, lead form) run client-side.
// The route is a single model call (stopWhen stepCountIs(1) below), so the stub
// result is never fed back for a second call. We only forward the tool CALLS.
const stub = async () => ({ status: "ok" });
const chatTools = {
  navigate_to_section: tool({
    description:
      "Scrolls the website to a specific section. Use when users want to see a section or ask about content on the page. Valid IDs: 'hero', 'about', 'services', 'partnerships', 'projects', 'stories', 'who-we-help', 'what-happens-next'.",
    inputSchema: z.object({ section_id: z.string() }),
    execute: stub,
  }),
  show_project_details: tool({
    description:
      "Opens a modal with full details about a specific project (e.g. 'CHAK FoodTech', 'Munayki', 'Raiz Capital').",
    inputSchema: z.object({ project_title: z.string() }),
    execute: stub,
  }),
  show_service_details: tool({
    description:
      "Opens a modal with full details about a specific service. Use the site's current service names: 'Company Brain', 'Decision and Automation Systems', 'Custom AI and Software Builds', 'Retreat Ops Systems'.",
    inputSchema: z.object({ service_title: z.string() }),
    execute: stub,
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
    execute: stub,
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
    execute: stub,
  }),
  suggest_service: tool({
    description:
      "Recommends a specific service when there is a clear match. Use the site's current service names, Company Brain first.",
    inputSchema: z.object({
      service_name: z.string(),
      reason: z.string(),
    }),
    execute: stub,
  }),
  offer_whatsapp: tool({
    description:
      "Offers to continue on WhatsApp. Use after qualifying a lead, when the user asks for direct contact, or if they prefer messaging.",
    inputSchema: z.object({ context_message: z.string() }),
    execute: stub,
  }),
  schedule_call: tool({
    description:
      "Suggests booking a call with Paul. Use for qualified leads (score 3+) with complex projects or who need detailed discussion.",
    inputSchema: z.object({
      reason: z.string(),
      urgency: z.string().optional(),
    }),
    execute: stub,
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
  let requestLocale: Locale = "es";

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
    const safeLocale: Locale =
      locale === "en" ? "en" : locale === "pt" ? "pt" : "es";
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

    // reasoning off must be sent in the request body via extraBody. Passing it as
    // a model-settings field is silently ignored by this provider version, which
    // leaves Qwen reasoning (10s+ per call instead of ~2s).
    const fallbackModels =
      chatModel === FALLBACK_CHAT_MODEL
        ? [chatModel]
        : [chatModel, FALLBACK_CHAT_MODEL];

    const result = await generateText({
      model: openrouter(chatModel, {
        extraBody: {
          reasoning: { enabled: false },
          // OpenRouter provider-level fallback: try these in order.
          models: fallbackModels,
        },
      }),
      system: systemInstruction,
      messages,
      tools: chatTools,
      // Single model call: return the tool call immediately, do not loop for a
      // second call. Keeps tool-triggering messages as fast as plain ones.
      stopWhen: stepCountIs(1),
      // Fail fast instead of hanging: OpenRouter already handles model fallback
      // in one request, so we do not need the SDK's long retry-with-backoff.
      maxRetries: 1,
    });

    // Forward tool calls as { name, args } so the widget's executeFunctionCall
    // runs the real client-side action (navigation, modal, lead form).
    const functionCalls: FunctionCallResult[] = result.toolCalls.map((call) => ({
      name: call.toolName,
      args: (call.input as Record<string, unknown>) ?? {},
    }));

    // Models often return a tool call with no prose. Keep the model's text when
    // present; otherwise a short confirmation, since the UI action itself is the
    // reply. Bare acknowledgement only when nothing happened at all.
    const modelText = result.text?.trim() || "";
    const ackDone = { es: "Listo.", en: "Done.", pt: "Pronto." }[safeLocale];
    const ackGot = { es: "Entendido.", en: "Got it.", pt: "Entendi." }[safeLocale];
    const text =
      modelText || (functionCalls.length > 0 ? ackDone : ackGot);

    return NextResponse.json({ text, functionCalls });
  } catch (error) {
    const status = getErrorStatus(error);
    const isQuota = status === 429;
    const quotaText = {
      es: "Estamos con alta demanda del servicio de IA. Intenta de nuevo en unos segundos o usa WhatsApp.",
      en: "We're at high AI capacity right now. Please try again in a few seconds or use WhatsApp.",
      pt: "Estamos com alta demanda do serviço de IA. Tente de novo em alguns segundos ou use o WhatsApp.",
    }[requestLocale];
    const genericText = {
      es: "Lo siento, hubo un error procesando tu mensaje. Por favor intenta de nuevo.",
      en: "Sorry, there was an error processing your message. Please try again.",
      pt: "Desculpe, houve um erro ao processar a sua mensagem. Por favor, tente de novo.",
    }[requestLocale];
    const userText = isQuota ? quotaText : genericText;

    console.error("OpenRouter API error:", { status, error });

    return NextResponse.json(
      { error: "Failed to process message", text: userText },
      { status }
    );
  }
}
