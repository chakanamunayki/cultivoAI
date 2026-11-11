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
  MAX_MESSAGE_CHARS,
  createRateLimiter,
  sanitizeHistory,
} from "@/lib/chat/request-limits";
import { buildSiteContentForPrompt } from "@/lib/chat/site-content";
import {
  buildSystemPrompt,
  type SystemPromptContext,
} from "@/lib/chat/system-prompt";

// Primary. Runs on Google infra via OpenRouter, so it does NOT touch any Google
// API quota. ~1.9s, reliable, tools fire, reasoning disables cleanly.
const DEFAULT_OPENROUTER_CHAT_MODEL = "google/gemini-2.5-flash-lite";
// Automatic fallback if the primary model's provider errors or rate-limits.
// OpenRouter routes the same request to the next model in the list. Qwen's free
// shared pool is 429-prone under load, so it sits behind the reliable primary.
const FALLBACK_CHAT_MODEL = "qwen/qwen3.8-flash";

// 20 messages a minute per visitor is far above real chat use.
const rateLimiter = createRateLimiter(20, 60_000);

const ENTRY_CONTEXTS: ChatContextType[] = [
  "general",
  "booking",
  "story",
  "service",
  "partnership",
  "qualification",
  "impact",
];

interface ChatRequest {
  message: string;
  history: unknown;
  locale: Locale;
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
      "Scrolls the website to a specific section. Use when users want to see a section or ask about content on the page. Valid IDs: 'hero', 'services' (what I build), 'who-we-help' (who I work with), 'semillero' (innovation network), 'projects', 'about', 'values' (how I work), 'partnerships' (ways to work together), 'what-happens-next'.",
    inputSchema: z.object({ section_id: z.string() }),
    execute: stub,
  }),
  show_project_details: tool({
    description:
      "Opens a modal with full details about a specific project (e.g. 'Protected knowledge platform', 'SetaSouls').",
    inputSchema: z.object({ project_title: z.string() }),
    execute: stub,
  }),
  show_service_details: tool({
    description:
      "Opens a modal with full details about a specific service. Use the site's current service names: 'Software and platforms', 'Data, knowledge and AI systems', 'Proof and records', 'Startup and investment readiness' (Spanish: 'Software y plataformas', 'Sistemas de datos, conocimiento e IA', 'Pruebas y registros', 'Preparación para startups e inversión').",
    inputSchema: z.object({ service_title: z.string() }),
    execute: stub,
  }),
  collect_lead_info: tool({
    description:
      "Shows a short contact form in the chat so the user can leave their name and email. Call it when the user asks to be contacted, wants a call or a proposal, or gives their contact details. Pass any name and email the user already gave so the form is pre-filled. Only call this AFTER the user has expressed clear interest.",
    inputSchema: z.object({
      name: z.string().optional(),
      email: z.string().optional(),
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
      "Records which service fits the user, for follow-up. Invisible to the user. Use the site's current service names.",
    inputSchema: z.object({
      service_name: z.string(),
      reason: z.string(),
    }),
    execute: stub,
  }),
  offer_whatsapp: tool({
    description:
      "Shows a WhatsApp button under your reply. Use when the user asks for direct contact or prefers messaging. context_message is a one-line summary of what they want, pre-filled in WhatsApp.",
    inputSchema: z.object({ context_message: z.string() }),
    execute: stub,
  }),
  schedule_call: tool({
    description:
      "Use when the user wants to book a call with Paul. Shows the contact form in the chat (or a WhatsApp button if their details are already captured) so Paul can arrange the call.",
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
          text: "Lo siento, el servicio de IA no está configurado.",
        },
        { status: 500 }
      );
    }

    const body: ChatRequest = await request.json();
    const { history, locale, entryContext, sessionId, timezone, pageUrl } = body;

    const safeLocale: Locale =
      locale === "en" ? "en" : locale === "pt" ? "pt" : "es";
    requestLocale = safeLocale;

    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }
    if (message.length > MAX_MESSAGE_CHARS) {
      const tooLong = {
        es: "Ese mensaje es demasiado largo. ¿Me lo resumes en unas líneas?",
        en: "That message is too long. Could you sum it up in a few lines?",
        pt: "Essa mensagem é longa demais. Pode resumir em algumas linhas?",
      }[safeLocale];
      return NextResponse.json(
        { error: "Message is too long", text: tooLong },
        { status: 413 }
      );
    }

    const callerId =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!rateLimiter.allow(callerId)) {
      const slowDown = {
        es: "Vas muy rápido. Espera un momento y vuelve a intentarlo, o escribe por WhatsApp.",
        en: "That's a lot of messages at once. Give it a moment and try again, or use WhatsApp.",
        pt: "São muitas mensagens de uma vez. Espere um momento e tente de novo, ou use o WhatsApp.",
      }[safeLocale];
      return NextResponse.json(
        { error: "Too many requests", text: slowDown },
        { status: 429 }
      );
    }

    const str = (value: unknown, max: number) =>
      typeof value === "string" ? value.slice(0, max) : undefined;
    const promptContext: SystemPromptContext = {
      locale: safeLocale,
      entryContext: ENTRY_CONTEXTS.find((c) => c === entryContext),
      timezone: str(timezone, 100),
      pageUrl: str(pageUrl, 300),
      sessionId: str(sessionId, 100),
    };
    // Site content comes from the server's own content files, never the request.
    const systemInstruction = buildSystemPrompt(
      buildSiteContentForPrompt(safeLocale),
      promptContext
    );

    // Convert widget history (role "model") to model messages (role "assistant").
    const messages: ModelMessage[] = sanitizeHistory(history).map((msg) => ({
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
      es: "El servicio de IA está muy ocupado ahora mismo. Intenta de nuevo en unos segundos o usa WhatsApp.",
      en: "The AI service is busy right now. Please try again in a few seconds or use WhatsApp.",
      pt: "O serviço de IA está muito ocupado agora. Tente de novo em alguns segundos ou use o WhatsApp.",
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
