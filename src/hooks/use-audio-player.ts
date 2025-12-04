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
  const playPCMAudio = useCallback(
    async (base64Audio: string, sampleRate = 24000) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        // Create AudioContext if needed
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext({ sampleRate });
        }

        const audioContext = audioContextRef.current;

        // Resume context if suspended (required by browsers after user interaction)
        if (audioContext.state === "suspended") {
          await audioContext.resume();
        }

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
          const sample = pcmData[i];
          floatData[i] = sample !== undefined ? sample / 32768 : 0; // Normalize to -1 to 1
        }

        // Create AudioBuffer
        const audioBuffer = audioContext.createBuffer(
          1,
          floatData.length,
          sampleRate
        );
        audioBuffer.getChannelData(0).set(floatData);

        // Stop any currently playing audio
        if (sourceRef.current) {
          try {
            sourceRef.current.stop();
          } catch {
            // Ignore errors if already stopped
          }
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
    },
    []
  );

  // Synthesize and play text
  const speakText = useCallback(
    async (text: string, locale: "es" | "en" = "es") => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const response = await fetch("/api/voice/synthesize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, locale }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "TTS request failed");
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
    },
    [playPCMAudio]
  );

  const stop = useCallback(() => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop();
      } catch {
        // Ignore errors if already stopped
      }
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, []);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    stop();
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, [stop]);

  return {
    ...state,
    speakText,
    playPCMAudio,
    stop,
    cleanup,
  };
}
