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

// ============================================
// API Route Handler
// ============================================

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

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

    // Build enhanced system prompt with context
    const promptContext: SystemPromptContext = {
      locale,
      entryContext,
      timezone,
      pageUrl,
      sessionId,
    };
    const systemInstruction = buildSystemPrompt(siteContent, promptContext);

    // Initialize Gemini AI
    const ai = new GoogleGenAI({ apiKey });

    // Convert history to Gemini format
    const geminiHistory = history
      .filter((msg) => msg.text)
      .map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

    // Create chat session with enhanced configuration
    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
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
        text: finalResult.text || (locale === "es" ? "Listo!" : "Done!"),
        functionCalls,
      });
    }

    return NextResponse.json({
      text: result.text || (locale === "es" ? "Entendido." : "Got it."),
      functionCalls: [],
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process message",
        text: "Lo siento, hubo un error procesando tu mensaje. Por favor intenta de nuevo.",
      },
      { status: 500 }
    );
  }
}
