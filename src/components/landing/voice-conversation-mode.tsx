"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, Mic, Phone, Square, X } from "lucide-react";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useVoiceRecording } from "@/hooks/use-voice-recording";

// ============================================
// Types
// ============================================

type VoiceState = "idle" | "listening" | "processing" | "thinking" | "speaking" | "form";

interface VoiceConversationModeProps {
  isOpen: boolean;
  onClose: () => void;
  locale: "es" | "en";
  onSendMessage: (message: string) => Promise<string | null>;
  showContactForm?: boolean;
  onContactFormSubmit?: (name: string, email: string) => Promise<boolean>;
  onContactFormDismiss?: () => void;
}

interface VoiceLabels {
  listening: string;
  processing: string;
  thinking: string;
  speaking: string;
  idle: string;
  form: string;
  tapToSpeak: string;
  backToText: string;
  endCall: string;
  you: string;
  ai: string;
  name: string;
  email: string;
  submit: string;
  submitting: string;
  formTitle: string;
  formError: string;
}

// ============================================
// Constants
// ============================================

const LABELS: Record<"es" | "en", VoiceLabels> = {
  es: {
    listening: "ESCUCHANDO",
    processing: "TRANSCRIBIENDO",
    thinking: "PENSANDO",
    speaking: "HABLANDO",
    idle: "LISTO",
    form: "TUS DATOS",
    tapToSpeak: "Toca para hablar",
    backToText: "Volver a texto",
    endCall: "Terminar",
    you: "Tú",
    ai: "AI",
    name: "Nombre",
    email: "Email",
    submit: "Continuar",
    submitting: "Enviando...",
    formTitle: "Para ayudarte mejor",
    formError: "Por favor completa todos los campos correctamente",
  },
  en: {
    listening: "LISTENING",
    processing: "TRANSCRIBING",
    thinking: "THINKING",
    speaking: "SPEAKING",
    idle: "READY",
    form: "YOUR DETAILS",
    tapToSpeak: "Tap to speak",
    backToText: "Back to text",
    endCall: "End",
    you: "You",
    ai: "AI",
    name: "Name",
    email: "Email",
    submit: "Continue",
    submitting: "Sending...",
    formTitle: "To help you better",
    formError: "Please fill in all fields correctly",
  },
};

// ============================================
// Animation Components
// ============================================

function ListeningAnimation() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Outer pulsing ring */}
      <div className="absolute w-48 h-48 border-4 border-[#FFC805] animate-voice-pulse" />
      {/* Middle pulsing ring */}
      <div className="absolute w-36 h-36 border-4 border-[#FFC805] animate-voice-pulse-delay-1" />
      {/* Inner solid ring */}
      <div className="absolute w-24 h-24 bg-[#FFC805] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="w-full h-full flex items-center justify-center">
          <Mic size={32} className="text-black" />
        </div>
      </div>
      {/* Soundwave bars */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 bg-[#FFC805] border border-black animate-soundwave"
            style={{
              animationDelay: `${i * 0.1}s`,
              height: "8px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ProcessingAnimation() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Spinning squares */}
      <div className="absolute w-32 h-32 border-4 border-[#FFDE00] animate-spin-slow" />
      <div className="absolute w-24 h-24 border-4 border-[#FFC805] animate-spin-slow-reverse" />
      {/* Center loader */}
      <div className="absolute w-16 h-16 bg-[#FFDE00] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
        <Loader2 size={28} className="text-black animate-spin" />
      </div>
    </div>
  );
}

function ThinkingAnimation() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Pulsing purple rings */}
      <div className="absolute w-48 h-48 border-4 border-[#A855F7] animate-voice-pulse-fast" />
      <div className="absolute w-36 h-36 border-4 border-[#9333EA] animate-voice-pulse-fast-delay-1" />
      <div className="absolute w-24 h-24 border-4 border-[#A855F7] animate-voice-pulse-fast-delay-2" />
      {/* Center brain icon representation */}
      <div className="absolute w-16 h-16 bg-[#A855F7] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-white animate-bounce" style={{ animationDuration: "0.6s" }} />
          <div className="w-2 h-2 bg-white animate-bounce" style={{ animationDuration: "0.6s", animationDelay: "0.1s" }} />
          <div className="w-2 h-2 bg-white animate-bounce" style={{ animationDuration: "0.6s", animationDelay: "0.2s" }} />
        </div>
      </div>
    </div>
  );
}

function SpeakingAnimation() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Outer glow effect */}
      <div className="absolute w-48 h-48 border-4 border-[#A855F7] opacity-50" />
      {/* Center speaker icon */}
      <div className="absolute w-24 h-24 bg-[#A855F7] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
        <div className="relative">
          <div className="w-4 h-4 bg-white" />
          {/* Sound waves emanating */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            <div className="w-3 h-0.5 bg-white animate-fade-in-out" />
            <div className="w-4 h-0.5 bg-white animate-fade-in-out" style={{ animationDelay: "0.1s" }} />
            <div className="w-3 h-0.5 bg-white animate-fade-in-out" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>
      </div>
      {/* Animated soundwave bars at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-2 bg-[#A855F7] border border-black animate-soundwave-tall"
            style={{
              animationDelay: `${i * 0.08}s`,
              height: "12px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function IdleAnimation() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Static outer ring */}
      <div className="absolute w-40 h-40 border-4 border-black/20" />
      {/* Center mic icon */}
      <div className="w-24 h-24 bg-[#F3F4F6] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:bg-[#FFC805] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
        <Mic size={32} className="text-black" />
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export function VoiceConversationMode({
  isOpen,
  onClose,
  locale,
  onSendMessage,
  showContactForm = false,
  onContactFormSubmit,
  onContactFormDismiss,
}: VoiceConversationModeProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [userTranscript, setUserTranscript] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [shouldAutoListen, setShouldAutoListen] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const isProcessingRef = useRef(false);
  const labels = LABELS[locale];

  // Audio player for TTS
  const {
    isPlaying: isPlayingAudio,
    isLoading: isLoadingAudio,
    speakText,
    stop: stopAudio,
  } = useAudioPlayer();

  // Voice recording for STT
  const {
    isRecording,
    isProcessing: isProcessingVoice,
    startRecording,
    stopRecording,
    cancelRecording,
  } = useVoiceRecording({
    locale,
    onTranscription: async (result) => {
      if (result.text.trim() && !isProcessingRef.current) {
        isProcessingRef.current = true;
        setUserTranscript(result.text);
        setVoiceState("thinking");

        try {
          // Send to AI and get response
          const response = await onSendMessage(result.text);

          if (response) {
            setAiResponse(response);
            setVoiceState("speaking");
            await speakText(response, locale);
          }
        } catch (error) {
          console.error("Voice conversation error:", error);
          setVoiceState("idle");
        } finally {
          isProcessingRef.current = false;
        }
      }
    },
    onError: (error) => {
      console.error("Voice recording error:", error);
      setVoiceState("idle");
      isProcessingRef.current = false;
    },
  });

  // Show contact form when requested
  useEffect(() => {
    if (showContactForm && isOpen) {
      // Stop any ongoing recording or playback
      stopAudio();
      cancelRecording();
      setVoiceState("form");
      setShouldAutoListen(false);
    }
  }, [showContactForm, isOpen, stopAudio, cancelRecording]);

  // Update voice state based on recording/processing status
  useEffect(() => {
    if (voiceState !== "form") {
      if (isRecording) {
        setVoiceState("listening");
      } else if (isProcessingVoice) {
        setVoiceState("processing");
      }
    }
  }, [isRecording, isProcessingVoice, voiceState]);

  // Update voice state based on audio playback
  useEffect(() => {
    if (voiceState === "form") return; // Don't change state when showing form

    if (isPlayingAudio) {
      setVoiceState("speaking");
    } else if (isLoadingAudio && voiceState === "thinking") {
      // Keep thinking state while loading audio
    } else if (
      !isPlayingAudio &&
      !isLoadingAudio &&
      voiceState === "speaking"
    ) {
      // Audio finished playing - go back to idle or auto-listen
      if (shouldAutoListen && !isProcessingRef.current) {
        // Small delay before auto-starting next recording
        const timer = setTimeout(() => {
          if (isOpen && shouldAutoListen && !isProcessingRef.current) {
            setVoiceState("listening");
            startRecording();
          } else {
            setVoiceState("idle");
          }
        }, 500);
        return () => clearTimeout(timer);
      } else {
        setVoiceState("idle");
      }
    }
    return undefined;
  }, [
    isPlayingAudio,
    isLoadingAudio,
    voiceState,
    shouldAutoListen,
    isOpen,
    startRecording,
  ]);

  // Auto-start listening when voice mode opens
  useEffect(() => {
    if (isOpen && voiceState === "idle" && !isProcessingRef.current && !showContactForm) {
      const timer = setTimeout(() => {
        if (isOpen && shouldAutoListen && !showContactForm) {
          startRecording();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, voiceState, shouldAutoListen, startRecording, showContactForm]);

  // Handle close - stop everything
  const handleClose = useCallback(() => {
    stopAudio();
    cancelRecording();
    setShouldAutoListen(true);
    setVoiceState("idle");
    setUserTranscript("");
    setAiResponse("");
    setFormData({ name: "", email: "" });
    setFormError(null);
    isProcessingRef.current = false;
    onClose();
  }, [stopAudio, cancelRecording, onClose]);

  // Handle manual mic tap
  const handleMicTap = useCallback(() => {
    if (voiceState === "listening") {
      stopRecording();
    } else if (voiceState === "idle") {
      startRecording();
    } else if (voiceState === "speaking") {
      // Stop current speech and start listening
      stopAudio();
      setShouldAutoListen(false);
      setVoiceState("idle");
    }
  }, [voiceState, stopRecording, startRecording, stopAudio]);

  // Handle contact form submission
  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const { name, email } = formData;

    // Validate
    if (!name.trim()) {
      setFormError(labels.formError);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setFormError(labels.formError);
      return;
    }

    setIsSubmittingForm(true);

    try {
      if (onContactFormSubmit) {
        const success = await onContactFormSubmit(name.trim(), email.trim());
        if (success) {
          setFormData({ name: "", email: "" });
          setShouldAutoListen(true);
          setVoiceState("idle");
          // Resume voice conversation
          setTimeout(() => {
            if (isOpen) {
              startRecording();
            }
          }, 500);
        } else {
          setFormError(labels.formError);
        }
      }
    } catch {
      setFormError(labels.formError);
    } finally {
      setIsSubmittingForm(false);
    }
  }, [formData, labels.formError, onContactFormSubmit, isOpen, startRecording]);

  // Handle form dismiss (skip)
  const handleFormDismiss = useCallback(() => {
    if (onContactFormDismiss) {
      onContactFormDismiss();
    }
    setShouldAutoListen(true);
    setVoiceState("idle");
    setFormData({ name: "", email: "" });
    setFormError(null);
    // Resume voice conversation
    setTimeout(() => {
      if (isOpen) {
        startRecording();
      }
    }, 500);
  }, [onContactFormDismiss, isOpen, startRecording]);

  // Render animation based on state
  const renderAnimation = () => {
    switch (voiceState) {
      case "listening":
        return <ListeningAnimation />;
      case "processing":
        return <ProcessingAnimation />;
      case "thinking":
        return <ThinkingAnimation />;
      case "speaking":
        return <SpeakingAnimation />;
      case "form":
        return null; // No animation for form state
      default:
        return (
          <div onClick={handleMicTap}>
            <IdleAnimation />
          </div>
        );
    }
  };

  // Get state label
  const getStateLabel = () => {
    switch (voiceState) {
      case "listening":
        return labels.listening;
      case "processing":
        return labels.processing;
      case "thinking":
        return labels.thinking;
      case "speaking":
        return labels.speaking;
      case "form":
        return labels.form;
      default:
        return labels.idle;
    }
  };

  // Get state color
  const getStateColor = () => {
    switch (voiceState) {
      case "listening":
        return "#FFC805";
      case "processing":
        return "#FFDE00";
      case "thinking":
      case "speaking":
        return "#A855F7";
      case "form":
        return "#10B981"; // Green for form
      default:
        return "#000000";
    }
  };

  if (!isOpen) return null;

  // Debug: Log when component renders
  console.log("VoiceConversationMode is rendering! isOpen:", isOpen);

  return (
    <div className="fixed inset-0 z-[70] bg-black/90 flex flex-col items-center justify-center font-grotesk">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#EF4444] hover:text-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          aria-label="Close voice mode"
        >
          <X size={24} />
        </button>

        {/* Main content */}
        <div className="flex flex-col items-center gap-8 max-w-lg w-full px-6">
          {/* Contact Form - shown when voiceState is 'form' */}
          {voiceState === "form" ? (
            <div className="w-full max-w-sm">
              {/* Form Title */}
              <h2 className="text-white text-2xl font-bold uppercase text-center mb-6">
                {labels.formTitle}
              </h2>

              {/* Form */}
              <form
                onSubmit={handleFormSubmit}
                className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#A855F7] p-6 space-y-4"
              >
                <div>
                  <label className="block text-sm font-bold uppercase mb-2 text-black">
                    {labels.name}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={locale === "es" ? "Tu nombre" : "Your name"}
                    className="w-full p-3 border-4 border-black bg-[#F3F4F6] font-bold text-base focus:shadow-[4px_4px_0px_0px_#A855F7] outline-none"
                    disabled={isSubmittingForm}
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase mb-2 text-black">
                    {labels.email}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder={locale === "es" ? "tu@email.com" : "your@email.com"}
                    className="w-full p-3 border-4 border-black bg-[#F3F4F6] font-bold text-base focus:shadow-[4px_4px_0px_0px_#A855F7] outline-none"
                    disabled={isSubmittingForm}
                  />
                </div>
                {formError && (
                  <p className="text-sm font-bold text-[#EF4444]">{formError}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmittingForm}
                  className="w-full p-3 bg-[#FFC805] text-black font-bold uppercase border-4 border-black hover:bg-[#FFDE00] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmittingForm ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {labels.submitting}
                    </>
                  ) : (
                    labels.submit
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleFormDismiss}
                  className="w-full p-2 text-sm font-bold text-black/60 uppercase hover:text-black transition-colors"
                >
                  {locale === "es" ? "Saltar por ahora" : "Skip for now"}
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Animation container */}
              <div
                className="relative cursor-pointer"
                onClick={
                  voiceState === "idle" || voiceState === "listening"
                    ? handleMicTap
                    : undefined
                }
              >
                {renderAnimation()}
              </div>

              {/* State label */}
              <div
                className="px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-xl uppercase tracking-wider"
                style={{ backgroundColor: getStateColor(), color: "#000000" }}
              >
                {getStateLabel()}
              </div>

              {/* Transcripts */}
              <div className="w-full space-y-4">
                {/* User transcript */}
                {userTranscript && (
                  <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                    <div className="text-xs font-bold uppercase text-[#666] mb-1">
                      {labels.you}
                    </div>
                    <p className="font-bold text-black">{userTranscript}</p>
                  </div>
                )}

                {/* AI response */}
                {aiResponse && (
                  <div className="bg-[#A855F7] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                    <div className="text-xs font-bold uppercase text-white/70 mb-1">
                      {labels.ai}
                    </div>
                    <p className="font-medium text-white">{aiResponse}</p>
                  </div>
                )}
              </div>

              {/* Tap instruction for idle state */}
              {voiceState === "idle" && (
                <p className="text-white/60 font-bold uppercase text-sm">
                  {labels.tapToSpeak}
                </p>
              )}

              {/* Action buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleClose}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase hover:bg-[#F3F4F6] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <ArrowLeft size={20} />
                  {labels.backToText}
                </button>
                <button
                  onClick={handleClose}
                  className="flex items-center gap-2 px-6 py-3 bg-[#EF4444] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase hover:bg-[#DC2626] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <Phone size={20} />
                  {labels.endCall}
                </button>
              </div>

              {/* Recording indicator when listening */}
              {voiceState === "listening" && (
                <button
                  onClick={handleMicTap}
                  className="flex items-center gap-2 px-4 py-2 bg-[#EF4444] text-white border-2 border-black font-bold uppercase text-sm animate-pulse"
                >
                  <Square size={16} />
                  {locale === "es" ? "Detener" : "Stop"}
                </button>
              )}
            </>
          )}
        </div>
    </div>
  );
}
