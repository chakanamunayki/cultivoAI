# Phase 6: Voice Conversation Implementation Plan

## Overview

Add full voice conversation capability to the CultivoAI chatbot using:
- **Groq Whisper API** for speech-to-text (fast, cheap, accurate)
- **Gemini 2.0 Flash** for AI text responses (existing)
- **Gemini 2.5 TTS** for natural voice responses (new)

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  USER INPUT (Voice)                                                 │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────────┐   │
│  │  Mic Button │───▶│ MediaRecorder│───▶│ Audio Blob (WebM)   │   │
│  │  (Press)    │    │  API         │    │                     │   │
│  └─────────────┘    └──────────────┘    └──────────┬──────────┘   │
│                                                     │              │
│                                                     ▼              │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                POST /api/voice/transcribe                    │  │
│  │                (FormData with audio file)                    │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  AI RESPONSE (Voice)                                               │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Receive audio base64 ──▶ Decode ──▶ Play via AudioContext  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        SERVER (Next.js API)                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  STEP 1: Speech-to-Text (Groq Whisper)                             │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  /api/voice/transcribe                                      │    │
│  │  ┌─────────────────┐     ┌─────────────────────────────┐   │    │
│  │  │ Receive Audio   │────▶│ Groq Whisper API            │   │    │
│  │  │ (WebM/WAV)      │     │ whisper-large-v3-turbo      │   │    │
│  │  └─────────────────┘     └──────────────┬──────────────┘   │    │
│  │                                          │                  │    │
│  │                                          ▼                  │    │
│  │                          ┌─────────────────────────────┐   │    │
│  │                          │ Return: { text, language,   │   │    │
│  │                          │   duration, confidence }    │   │    │
│  │                          └─────────────────────────────┘   │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                     │
│  STEP 2: AI Response (Gemini Chat)                                 │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  /api/chat/gemini (existing)                                │    │
│  │  ┌─────────────────┐     ┌─────────────────────────────┐   │    │
│  │  │ Receive Text    │────▶│ Gemini 2.0 Flash            │   │    │
│  │  │ (transcribed)   │     │ + Function Calling          │   │    │
│  │  └─────────────────┘     └──────────────┬──────────────┘   │    │
│  │                                          │                  │    │
│  │                                          ▼                  │    │
│  │                          ┌─────────────────────────────┐   │    │
│  │                          │ Return: { text, functions } │   │    │
│  │                          └─────────────────────────────┘   │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                     │
│  STEP 3: Text-to-Speech (Gemini TTS)                               │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  /api/voice/synthesize                                      │    │
│  │  ┌─────────────────┐     ┌─────────────────────────────┐   │    │
│  │  │ Receive Text    │────▶│ Gemini 2.5 Flash TTS        │   │    │
│  │  │ (AI response)   │     │ gemini-2.5-flash-preview-tts│   │    │
│  │  └─────────────────┘     └──────────────┬──────────────┘   │    │
│  │                                          │                  │    │
│  │                                          ▼                  │    │
│  │                          ┌─────────────────────────────┐   │    │
│  │                          │ Return: { audio (base64),   │   │    │
│  │                          │   duration }                │   │    │
│  │                          └─────────────────────────────┘   │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        DATABASE (PostgreSQL)                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  chat_messages table:                                               │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ id | conversation_id | role | content | input_type |       │    │
│  │    |                 |      |         | audio_duration_ms | │    │
│  │    |                 |      |         | transcription_    | │    │
│  │    |                 |      |         | confidence        | │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Full Voice Flow

```
User speaks ──▶ MediaRecorder ──▶ Groq Whisper (STT) ──▶ Text
                                                          │
                                                          ▼
                                              Gemini 2.0 Flash (Chat)
                                                          │
                                                          ▼
                                              AI Response Text
                                                          │
                                                          ▼
                                       Gemini 2.5 TTS (Voice) ──▶ Audio
                                                                    │
                                                                    ▼
                                                         Play in browser
```

## Implementation Steps

### Step 1: Install Dependencies

```bash
pnpm add groq-sdk
```

**Already installed:** `@google/genai` (used for TTS)

### Step 2: Environment Variables

Add to `.env.local`:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### Step 3: Database Schema Update

Add new columns to `chat_messages` table in `src/lib/schema.ts`:

```typescript
// In chatMessages table, add:
inputType: varchar("input_type", { length: 20 }).default("text"), // "text" | "voice"
audioDurationMs: integer("audio_duration_ms"),
transcriptionConfidence: decimal("transcription_confidence", { precision: 5, scale: 4 }),
originalLanguage: varchar("original_language", { length: 10 }), // detected language
```

Run migration:
```bash
pnpm db:generate
pnpm db:migrate
```

### Step 4: Create Groq Client

Create `src/lib/groq.ts`:

```typescript
import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  console.warn("GROQ_API_KEY not configured - voice transcription disabled");
}

export const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

export const WHISPER_MODEL = "whisper-large-v3-turbo";
```

### Step 5: Create Voice Transcription API Route

Create `src/app/api/voice/transcribe/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { groq, WHISPER_MODEL } from "@/lib/groq";
import { toFile } from "groq-sdk";

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
      language: language || undefined, // Let Whisper detect if not provided
    });

    return NextResponse.json({
      text: transcription.text,
      language: transcription.language,
      duration: transcription.duration,
      segments: transcription.segments,
    });
  } catch (error) {
    console.error("Voice transcription error:", error);
    return NextResponse.json(
      { error: "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Required for FormData
  },
};
```

### Step 5B: Create Voice Synthesis API Route (TTS)

Create `src/app/api/voice/synthesize/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Gemini TTS voice options (30 available)
// Good Spanish voices: Orus (warm), Zephyr (bright), Puck (upbeat)
const VOICE_CONFIG = {
  es: "Orus",   // Warm, friendly for Spanish
  en: "Puck",  // Upbeat, friendly for English
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
      return NextResponse.json(
        { error: "No text provided" },
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
              voiceName: VOICE_CONFIG[locale as keyof typeof VOICE_CONFIG] || VOICE_CONFIG.es,
            },
          },
        },
      },
    });

    // Extract audio data (base64 encoded PCM)
    const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

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
```

### Step 6: Create Audio Player Hook (TTS Playback)

Create `src/hooks/use-audio-player.ts`:

```typescript
"use client";

import { useState, useRef, useCallback } from "react";

interface AudioPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAudioPlayer() {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    isLoading: false,
    error: null,
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Convert PCM base64 to playable audio
  const playPCMAudio = useCallback(async (base64Audio: string, sampleRate = 24000) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Create AudioContext if needed
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({ sampleRate });
      }

      const audioContext = audioContextRef.current;

      // Decode base64 to ArrayBuffer
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Convert PCM to Float32 (assuming 16-bit PCM)
      const pcmData = new Int16Array(bytes.buffer);
      const floatData = new Float32Array(pcmData.length);
      for (let i = 0; i < pcmData.length; i++) {
        floatData[i] = pcmData[i] / 32768; // Normalize to -1 to 1
      }

      // Create AudioBuffer
      const audioBuffer = audioContext.createBuffer(1, floatData.length, sampleRate);
      audioBuffer.getChannelData(0).set(floatData);

      // Stop any currently playing audio
      if (sourceRef.current) {
        sourceRef.current.stop();
      }

      // Create and play source
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);

      source.onended = () => {
        setState((prev) => ({ ...prev, isPlaying: false }));
      };

      sourceRef.current = source;
      source.start();

      setState((prev) => ({ ...prev, isPlaying: true, isLoading: false }));
    } catch (error) {
      console.error("Audio playback error:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to play audio",
      }));
    }
  }, []);

  // Synthesize and play text
  const speakText = useCallback(async (text: string, locale: "es" | "en" = "es") => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch("/api/voice/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, locale }),
      });

      if (!response.ok) {
        throw new Error("TTS request failed");
      }

      const data = await response.json();

      if (data.audio) {
        await playPCMAudio(data.audio, data.sampleRate || 24000);
      }
    } catch (error) {
      console.error("TTS error:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to synthesize speech",
      }));
    }
  }, [playPCMAudio]);

  const stop = useCallback(() => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, []);

  return {
    ...state,
    speakText,
    playPCMAudio,
    stop,
  };
}
```

### Step 7: Create Voice Recording Hook (STT)

Create `src/hooks/use-voice-recording.ts`:

```typescript
"use client";

import { useState, useRef, useCallback } from "react";

interface VoiceRecordingState {
  isRecording: boolean;
  isProcessing: boolean;
  error: string | null;
  audioBlob: Blob | null;
}

interface UseVoiceRecordingOptions {
  onTranscription?: (text: string) => void;
  onError?: (error: string) => void;
  locale?: "es" | "en";
}

export function useVoiceRecording(options: UseVoiceRecordingOptions = {}) {
  const { onTranscription, onError, locale = "es" } = options;

  const [state, setState] = useState<VoiceRecordingState>({
    isRecording: false,
    isProcessing: false,
    error: null,
    audioBlob: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        }
      });

      // Determine best supported format
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        setState((prev) => ({ ...prev, audioBlob, isProcessing: true }));

        // Send to transcription API
        try {
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.webm");
          formData.append("language", locale);

          const response = await fetch("/api/voice/transcribe", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Transcription failed");
          }

          const data = await response.json();

          if (data.text) {
            onTranscription?.(data.text);
          }

          setState((prev) => ({
            ...prev,
            isProcessing: false,
            error: null
          }));
        } catch (error) {
          const errorMsg = locale === "es"
            ? "Error al transcribir el audio"
            : "Error transcribing audio";
          setState((prev) => ({
            ...prev,
            isProcessing: false,
            error: errorMsg
          }));
          onError?.(errorMsg);
        }
      };

      mediaRecorder.start();
      setState((prev) => ({
        ...prev,
        isRecording: true,
        error: null
      }));
    } catch (error) {
      const errorMsg = locale === "es"
        ? "No se pudo acceder al micrófono"
        : "Could not access microphone";
      setState((prev) => ({ ...prev, error: errorMsg }));
      onError?.(errorMsg);
    }
  }, [locale, onTranscription, onError]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      setState((prev) => ({ ...prev, isRecording: false }));
    }
  }, [state.isRecording]);

  const toggleRecording = useCallback(() => {
    if (state.isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [state.isRecording, startRecording, stopRecording]);

  return {
    ...state,
    startRecording,
    stopRecording,
    toggleRecording,
  };
}
```

### Step 8: Update Chat Widget for Voice

Update `src/components/landing/ai-chat-widget.tsx`:

Key changes:
1. Import and use `useVoiceRecording` hook for STT
2. Import and use `useAudioPlayer` hook for TTS
3. Update mic button to toggle recording
4. Add visual feedback for recording state (pulsing animation)
5. Auto-send transcribed text to chat
6. Auto-play AI responses as voice

```typescript
// Add to imports
import { useVoiceRecording } from "@/hooks/use-voice-recording";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { Volume2, VolumeX } from "lucide-react";

// Inside component, add:
const [voiceModeEnabled, setVoiceModeEnabled] = useState(false);

// Audio player for TTS
const { isPlaying, speakText, stop: stopAudio } = useAudioPlayer();

// Voice recording for STT
const {
  isRecording,
  isProcessing,
  toggleRecording
} = useVoiceRecording({
  locale,
  onTranscription: (text) => {
    // Auto-send the transcribed text
    setInput(text);
    setTimeout(() => {
      if (text.trim()) {
        handleSend();
      }
    }, 100);
  },
  onError: (error) => {
    setMessages((prev) => [...prev, {
      role: "model",
      text: error
    }]);
  },
});

// Modify handleSend to play AI response as voice when voice mode is enabled
// After receiving AI response:
if (voiceModeEnabled && responseText) {
  speakText(responseText, locale);
}

// Update mic button:
<button
  onClick={toggleRecording}
  disabled={isProcessing || isPlaying}
  className={`p-3 border-2 border-black transition-all ${
    isRecording
      ? "bg-red-accent text-white animate-pulse"
      : isProcessing
      ? "bg-yellow-secondary text-black"
      : "bg-gray-bg text-black hover:bg-purple hover:text-white"
  }`}
  aria-label={isRecording ? "Stop recording" : "Start voice input"}
>
  {isProcessing ? (
    <Loader2 size={20} className="animate-spin" />
  ) : (
    <Mic size={20} />
  )}
</button>

// Add voice mode toggle in header:
<button
  onClick={() => {
    setVoiceModeEnabled(!voiceModeEnabled);
    if (isPlaying) stopAudio();
  }}
  className={`p-1 transition-all ${
    voiceModeEnabled ? "text-purple" : "text-black"
  }`}
  title={voiceModeEnabled ? "Disable voice responses" : "Enable voice responses"}
>
  {voiceModeEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
</button>
```

### Step 9: Update Conversation Logging

Modify `src/app/api/chat/conversations/route.ts` to include voice metadata:

```typescript
// When logging messages, accept additional voice fields:
interface MessageLogRequest {
  conversationId: string;
  role: "user" | "model";
  content: string;
  inputType?: "text" | "voice";
  audioDurationMs?: number;
  transcriptionConfidence?: number;
  // ... existing fields
}
```

## File Structure After Implementation

```
src/
├── app/
│   └── api/
│       ├── chat/
│       │   ├── gemini/route.ts        # Existing - no changes
│       │   └── conversations/route.ts # Update for voice metadata
│       └── voice/
│           ├── transcribe/route.ts    # NEW - Groq Whisper STT endpoint
│           └── synthesize/route.ts    # NEW - Gemini TTS endpoint
├── components/
│   └── landing/
│       └── ai-chat-widget.tsx         # Update with voice recording + playback
├── hooks/
│   ├── use-voice-recording.ts         # NEW - Voice recording hook (STT)
│   └── use-audio-player.ts            # NEW - Audio playback hook (TTS)
└── lib/
    └── groq.ts                        # NEW - Groq client
```

## Bilingual Content Updates

Add to `src/content/es.ts` and `src/content/en.ts`:

```typescript
// In chat section:
voice: {
  startRecording: "Mantén presionado para hablar", // "Hold to speak"
  stopRecording: "Suelta para enviar",              // "Release to send"
  processing: "Procesando audio...",                // "Processing audio..."
  error: "Error con el micrófono",                  // "Microphone error"
  notSupported: "Tu navegador no soporta grabación de voz", // "Browser doesn't support voice"
}
```

## Cost Estimation

| Component | Cost | Notes |
|-----------|------|-------|
| Groq Whisper (STT) | ~$0.04/hour | whisper-large-v3-turbo |
| Gemini 2.0 Flash (Chat) | ~$0.075/1M input tokens | Same as current text chat |
| Gemini 2.5 TTS | ~$8.50/1M output tokens | Audio output pricing |
| **Total per voice exchange** | ~$0.005-0.01 | 10 sec input + response |

For 1000 voice exchanges/month: **~$5-10/month**

### Cost Breakdown Example (1 voice message):
- User speaks 10 seconds → Groq: ~$0.0001
- Gemini chat response: ~$0.0005
- TTS response (50 words): ~$0.005
- **Total: ~$0.006 per exchange**

## Testing Checklist

### Speech-to-Text (STT)
- [ ] Microphone permission request works
- [ ] Recording starts/stops correctly
- [ ] Audio is transcribed accurately in Spanish
- [ ] Audio is transcribed accurately in English
- [ ] Transcribed text is sent to Gemini chat
- [ ] Conversation is saved to database with voice metadata
- [ ] Error handling for no microphone
- [ ] Error handling for transcription failure
- [ ] Visual feedback during recording (pulsing red)
- [ ] Visual feedback during processing (spinner)

### Text-to-Speech (TTS)
- [ ] AI response is converted to audio
- [ ] Audio plays automatically after response
- [ ] Voice sounds natural in Spanish
- [ ] Voice sounds natural in English
- [ ] Audio can be stopped/muted
- [ ] Speaker icon shows during playback
- [ ] Error handling for TTS failure

### Browser Compatibility
- [ ] Works on Chrome desktop
- [ ] Works on Chrome mobile
- [ ] Works on Safari mobile (iOS)
- [ ] Works on Firefox (if supported)

## Future Enhancements (Phase 6B)

1. **Push-to-talk vs Toggle**: Add option for hold-to-record
2. **Audio Waveform**: Show visual waveform during recording
3. **Noise Reduction**: Client-side audio processing before sending
4. **Voice Selection**: Let users choose from Gemini's 30 voices
5. **Conversation Mode**: Continuous listening after each response

## Security Considerations

1. **Rate Limiting**: Add rate limiting to `/api/voice/transcribe` to prevent abuse
2. **File Size Limit**: Enforce 25MB max (Groq's limit)
3. **Audio Validation**: Verify file is actual audio before processing
4. **GROQ_API_KEY**: Keep server-side only, never expose to client
