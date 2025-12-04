"use client";

import { useState, useRef, useCallback } from "react";

interface VoiceRecordingState {
  isRecording: boolean;
  isProcessing: boolean;
  error: string | null;
  audioBlob: Blob | null;
}

interface TranscriptionResult {
  text: string;
  language?: string;
  duration?: number;
}

interface UseVoiceRecordingOptions {
  onTranscription?: (result: TranscriptionResult) => void;
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
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async () => {
    try {
      // Check browser support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const errorMsg =
          locale === "es"
            ? "Tu navegador no soporta grabación de voz"
            : "Your browser doesn't support voice recording";
        setState((prev) => ({ ...prev, error: errorMsg }));
        onError?.(errorMsg);
        return;
      }

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        },
      });

      streamRef.current = stream;

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
        streamRef.current = null;

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
            const data = await response.json();
            throw new Error(data.error || "Transcription failed");
          }

          const data = await response.json();

          if (data.text) {
            onTranscription?.({
              text: data.text,
              language: data.language,
              duration: data.duration,
            });
          }

          setState((prev) => ({
            ...prev,
            isProcessing: false,
            error: null,
          }));
        } catch (error) {
          console.error("Transcription error:", error);
          const errorMsg =
            locale === "es"
              ? "Error al transcribir el audio"
              : "Error transcribing audio";
          setState((prev) => ({
            ...prev,
            isProcessing: false,
            error: errorMsg,
          }));
          onError?.(errorMsg);
        }
      };

      mediaRecorder.start();
      setState((prev) => ({
        ...prev,
        isRecording: true,
        error: null,
      }));
    } catch (error) {
      console.error("Microphone access error:", error);
      const errorMsg =
        locale === "es"
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

  const cancelRecording = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.ondataavailable = null;
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
    }
    setState({
      isRecording: false,
      isProcessing: false,
      error: null,
      audioBlob: null,
    });
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
    cancelRecording,
    toggleRecording,
  };
}
