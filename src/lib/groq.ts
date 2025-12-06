import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  console.warn("GROQ_API_KEY not configured - voice transcription disabled");
}

export const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

export const WHISPER_MODEL = "whisper-large-v3-turbo";
