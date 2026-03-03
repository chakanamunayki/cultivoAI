/**
 * Gemini Chat API Route
 * Phase 3A - Enhanced System Prompt & Function Calling
 */

import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import type { ChatContextType } from "@/content/types";
import { chatFunctionDeclarations } from "@/lib/chat/functions";
import {
  buildSystemPrompt,
  type SiteContentForPrompt,
  type SystemPromptContext,
} from "@/lib/chat/system-prompt";

const DEFAULT_GEMINI_CHAT_MODEL = "gemini-2.5-flash";

// ============================================
// Types
// ============================================

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

function getGeminiErrorDetails(error: unknown): {
  status: number;
  providerMessage?: string;
} {
  if (!(error instanceof Error)) {
    return { status: 500 };
  }

  let providerMessage: string | undefined;
  let status = 500;

  try {
    const parsed = JSON.parse(error.message) as {
      error?: { code?: number; message?: string; status?: string };
    };
    if (parsed.error?.code) {
      status = parsed.error.code;
    }
    if (parsed.error?.message) {
      providerMessage = parsed.error.message;
    }
  } catch {
    if (error.message.toLowerCase().includes("quota")) {
      status = 429;
    }
    providerMessage = error.message;
  }

  if (status < 400 || status > 599) {
    status = 500;
  }

  return providerMessage ? { status, providerMessage } : { status };
}

// ============================================
// API Route Handler
// ============================================

export async function POST(request: Request) {
  let requestLocale: "es" | "en" = "es";

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const chatModel = process.env.GEMINI_CHAT_MODEL || DEFAULT_GEMINI_CHAT_MODEL;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured");
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

    // Build enhanced system prompt with context
    const promptContext: SystemPromptContext = {
      locale: safeLocale,
      entryContext,
      timezone,
      pageUrl,
      sessionId,
    };
    const systemInstruction = buildSystemPrompt(siteContent, promptContext);

    // Initialize Gemini AI
    const ai = new GoogleGenAI({ apiKey });

    // Convert history to Gemini format
    const geminiHistory = safeHistory
      .filter((msg) => msg?.text)
      .map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

    const chat = ai.chats.create({
      model: chatModel,
      config: {
        systemInstruction,
        tools: [chatFunctionDeclarations],
      },
      history: geminiHistory,
    });

    // Send message
    const result = await chat.sendMessage({ message });

    // Extract function calls if any
    const functionCalls: FunctionCallResult[] | undefined =
      result.functionCalls?.map((call) => ({
        name: call.name || "",
        args: (call.args as Record<string, unknown>) || {},
      }));

    // If there are function calls, send the results back to get final response
    if (functionCalls && functionCalls.length > 0) {
      const toolResponses = functionCalls
        .filter((call) => call.name)
        .map((call) => ({
          functionResponse: {
            name: call.name,
            response: { result: `Action ${call.name} executed successfully` },
          },
        }));

      const finalResult = await chat.sendMessage({ message: toolResponses });

      return NextResponse.json({
        text: finalResult.text || (safeLocale === "es" ? "Listo!" : "Done!"),
        functionCalls,
      });
    }

    return NextResponse.json({
      text: result.text || (safeLocale === "es" ? "Entendido." : "Got it."),
      functionCalls: [],
    });
  } catch (error) {
    const { status, providerMessage } = getGeminiErrorDetails(error);
    const isQuota = status === 429;
    const isSpanish = requestLocale === "es";
    const userText = isQuota
      ? isSpanish
        ? "Estamos con alta demanda del servicio de IA. Intenta de nuevo en unos segundos o usa WhatsApp."
        : "We're at high AI capacity right now. Please try again in a few seconds or use WhatsApp."
      : isSpanish
      ? "Lo siento, hubo un error procesando tu mensaje. Por favor intenta de nuevo."
      : "Sorry, there was an error processing your message. Please try again.";

    console.error("Gemini API error:", {
      status,
      providerMessage,
      error,
    });

    return NextResponse.json(
      {
        error: "Failed to process message",
        text: userText,
      },
      { status }
    );
  }
}
