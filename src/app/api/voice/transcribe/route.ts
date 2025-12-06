import { NextResponse } from "next/server";
import { toFile } from "groq-sdk";
import { groq, WHISPER_MODEL } from "@/lib/groq";

export async function POST(request: Request) {
  try {
    if (!groq) {
      return NextResponse.json(
        { error: "Voice transcription not configured" },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File | null;
    const language = formData.get("language") as string | null; // "es" or "en"

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Validate file size (max 25MB - Groq's limit)
    if (audioFile.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Audio file too large (max 25MB)" },
        { status: 400 }
      );
    }

    // Convert File to buffer for Groq
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create file for Groq API
    const file = await toFile(buffer, audioFile.name || "audio.webm");

    // Transcribe with Groq Whisper
    const transcription = await groq.audio.transcriptions.create({
      file,
      model: WHISPER_MODEL,
      response_format: "verbose_json",
      ...(language ? { language } : {}), // Let Whisper detect if not provided
    });

    // Type assertion for verbose_json response format
    const verboseResult = transcription as typeof transcription & {
      language?: string;
      duration?: number;
      segments?: unknown[];
    };

    return NextResponse.json({
      text: transcription.text,
      language: verboseResult.language,
      duration: verboseResult.duration,
      segments: verboseResult.segments,
    });
  } catch (error) {
    console.error("Voice transcription error:", error);
    return NextResponse.json(
      { error: "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
