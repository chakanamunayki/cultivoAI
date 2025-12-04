import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Gemini TTS voice options
// Charon is a deeper male voice
const VOICE_CONFIG = {
  es: "Charon", // Deep male voice for Spanish
  en: "Charon", // Deep male voice for English
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "TTS service not configured" },
        { status: 503 }
      );
    }

    const { text, locale = "es" } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // Limit text length for TTS (prevent abuse)
    if (text.length > 2000) {
      return NextResponse.json(
        { error: "Text too long for TTS (max 2000 chars)" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Generate speech with Gemini TTS
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName:
                VOICE_CONFIG[locale as keyof typeof VOICE_CONFIG] ||
                VOICE_CONFIG.es,
            },
          },
        },
      },
    });

    // Extract audio data (base64 encoded PCM)
    const audioData =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!audioData) {
      return NextResponse.json(
        { error: "Failed to generate audio" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      audio: audioData, // base64 encoded PCM audio
      format: "pcm",
      sampleRate: 24000,
    });
  } catch (error) {
    console.error("Voice synthesis error:", error);
    return NextResponse.json(
      { error: "Failed to synthesize voice" },
      { status: 500 }
    );
  }
}
