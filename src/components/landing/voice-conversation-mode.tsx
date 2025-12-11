"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Mic, Phone, X, AlertCircle, WifiOff } from "lucide-react";
import { useGeminiLive } from "@/hooks/use-gemini-live";
import { buildVoiceSystemPrompt } from "@/lib/chat/system-prompt";

// ============================================
// Types
// ============================================

interface VoiceConversationModeProps {
  isOpen: boolean;
  onClose: () => void;
  locale: "es" | "en";
  showContactForm?: boolean;
  onContactFormSubmit?: (name: string, email: string, phone?: string) => Promise<boolean>;
  onContactFormDismiss?: () => void;
}

interface VoiceLabels {
  connecting: string;
  connected: string;
  listening: string;
  processing: string;
  speaking: string;
  idle: string;
  error: string;
  reconnecting: string;
  form: string;
  tapToSpeak: string;
  backToText: string;
  endCall: string;
  you: string;
  ai: string;
  name: string;
  email: string;
  phone: string;
  submit: string;
  submitting: string;
  formTitle: string;
  formError: string;
  connectionError: string;
  microphoneError: string;
  retry: string;
}

// ============================================
// Constants
// ============================================

const LABELS: Record<"es" | "en", VoiceLabels> = {
  es: {
    connecting: "CONECTANDO",
    connected: "CONECTADO",
    listening: "ESCUCHANDO",
    processing: "PROCESANDO",
    speaking: "HABLANDO",
    idle: "LISTO",
    error: "ERROR",
    reconnecting: "RECONECTANDO",
    form: "TUS DATOS",
    tapToSpeak: "Habla para comenzar",
    backToText: "Volver a texto",
    endCall: "Terminar",
    you: "Tu",
    ai: "AI",
    name: "Nombre",
    email: "Email",
    phone: "Telefono (opcional)",
    submit: "Continuar",
    submitting: "Enviando...",
    formTitle: "Para ayudarte mejor",
    formError: "Por favor completa todos los campos correctamente",
    connectionError: "No se pudo conectar. Verifica tu conexion.",
    microphoneError: "No se pudo acceder al microfono.",
    retry: "Reintentar",
  },
  en: {
    connecting: "CONNECTING",
    connected: "CONNECTED",
    listening: "LISTENING",
    processing: "PROCESSING",
    speaking: "SPEAKING",
    idle: "READY",
    error: "ERROR",
    reconnecting: "RECONNECTING",
    form: "YOUR DETAILS",
    tapToSpeak: "Speak to begin",
    backToText: "Back to text",
    endCall: "End",
    you: "You",
    ai: "AI",
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    submit: "Continue",
    submitting: "Sending...",
    formTitle: "To help you better",
    formError: "Please fill in all fields correctly",
    connectionError: "Could not connect. Check your connection.",
    microphoneError: "Could not access microphone.",
    retry: "Retry",
  },
};

// ============================================
// Animation Components
// ============================================

function ConnectingAnimation() {
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

function IdleAnimation({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="relative w-48 h-48 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      {/* Static outer ring */}
      <div className="absolute w-40 h-40 border-4 border-white/20" />
      {/* Center mic icon */}
      <div className="w-24 h-24 bg-[#10B981] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:bg-[#059669] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
        <Mic size={32} className="text-white" />
      </div>
    </div>
  );
}

function ErrorAnimation({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="relative w-48 h-48 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      {/* Static outer ring */}
      <div className="absolute w-40 h-40 border-4 border-[#EF4444]/30" />
      {/* Center error icon */}
      <div className="w-24 h-24 bg-[#EF4444] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:bg-[#DC2626] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
        <WifiOff size={32} className="text-white" />
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
  showContactForm = false,
  onContactFormSubmit,
  onContactFormDismiss,
}: VoiceConversationModeProps) {

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const labels = LABELS[locale];

  // Conversation logging refs
  const conversationIdRef = useRef<string | null>(null);
  const sessionStartTimeRef = useRef<number | null>(null);
  const turnCountRef = useRef(0);
  const hasAttemptedConnectionRef = useRef(false);

  // Build system prompt for voice
  const systemPrompt = buildVoiceSystemPrompt(locale);

  // Create or get conversation ID for logging
  const initConversation = useCallback(async () => {
    if (conversationIdRef.current) return;

    try {
      const sessionId = `voice-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const response = await fetch("/api/chat/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          language: locale,
          entryContext: "voice", // Mark as voice conversation
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
          userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        conversationIdRef.current = data.conversationId;
        sessionStartTimeRef.current = Date.now();
        turnCountRef.current = 0;
      }
    } catch (err) {
      console.error("Failed to create voice conversation:", err);
    }
  }, [locale]);

  // Log message to conversation
  const logMessage = useCallback(async (role: "user" | "model", content: string) => {
    if (!conversationIdRef.current || !content.trim()) return;

    try {
      await fetch("/api/chat/conversations?action=message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: conversationIdRef.current,
          role,
          content,
          modelUsed: role === "model" ? "gemini-live-2.0-flash" : undefined,
        }),
      });

      if (role === "user") {
        turnCountRef.current++;
      }
    } catch (err) {
      console.error("Failed to log voice message:", err);
    }
  }, []);

  // End conversation and log final stats
  const endConversation = useCallback(async () => {
    if (!conversationIdRef.current) return;

    try {
      const duration = sessionStartTimeRef.current
        ? Math.round((Date.now() - sessionStartTimeRef.current) / 1000)
        : 0;

      await fetch("/api/chat/conversations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: conversationIdRef.current,
          summary: `Voice conversation - ${turnCountRef.current} turns, ${duration}s duration`,
        }),
      });
    } catch (err) {
      console.error("Failed to end voice conversation:", err);
    } finally {
      conversationIdRef.current = null;
      sessionStartTimeRef.current = null;
      turnCountRef.current = 0;
    }
  }, []);

  // Gemini Live hook
  const {
    connectionState,
    conversationState,
    isConnected,
    connect,
    disconnect,
    userTranscript,
    aiTranscript,
    error,
  } = useGeminiLive({
    locale,
    systemPrompt,
    onTranscript: (text, isFinal, isUser) => {
      // Log final transcripts to database
      if (isFinal && text.trim()) {
        logMessage(isUser ? "user" : "model", text);
      }
    },
    onError: (err) => {
      console.error("Gemini Live error:", err);
    },
    onConnectionChange: () => {
      // Connection state changes are handled by the hook
    },
    onConversationChange: () => {
      // Conversation state changes are handled by the hook
    },
  });

  // Show contact form when requested
  useEffect(() => {
    if (showContactForm && isOpen) {
      setShowForm(true);
    }
  }, [showContactForm, isOpen]);

  // Store stable references to connect and initConversation
  const connectRef = useRef(connect);
  const initConversationRef = useRef(initConversation);

  // Update refs when functions change
  useEffect(() => {
    connectRef.current = connect;
    initConversationRef.current = initConversation;
  }, [connect, initConversation]);

  // Auto-connect when component mounts (since we only render when modal is open)
  useEffect(() => {
    // Connect immediately since component only renders when modal is open
    if (connectionState === "disconnected" && !showForm && !hasAttemptedConnectionRef.current) {
      hasAttemptedConnectionRef.current = true;
      // Initialize conversation logging (non-blocking)
      initConversationRef.current().catch(() => {
        // Conversation logging unavailable - continue silently
      });
      connectRef.current();
    }

    // Reset attempt flag when closed
    return () => {
      if (!isOpen) {
        hasAttemptedConnectionRef.current = false;
      }
    };
  }, [isOpen, connectionState, showForm]); // Stable dependencies - no function refs

  // Handle close - disconnect and end conversation logging
  const handleClose = useCallback(() => {
    disconnect();
    endConversation(); // Log final stats before closing
    setShowForm(false);
    setFormData({ name: "", email: "", phone: "" });
    setFormError(null);
    onClose();
  }, [disconnect, endConversation, onClose]);

  // Handle retry connection
  const handleRetry = useCallback(() => {
    connect();
  }, [connect]);

  // Handle contact form submission
  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const { name, email, phone } = formData;

    // Validate name
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
        const success = await onContactFormSubmit(
          name.trim(),
          email.trim(),
          phone.trim() || undefined
        );
        if (success) {
          setFormData({ name: "", email: "", phone: "" });
          setShowForm(false);
          // Reconnect to voice after form submission
          if (!isConnected) {
            connect();
          }
        } else {
          setFormError(labels.formError);
        }
      }
    } catch {
      setFormError(labels.formError);
    } finally {
      setIsSubmittingForm(false);
    }
  }, [formData, labels.formError, onContactFormSubmit, isConnected, connect]);

  // Handle form dismiss (skip)
  const handleFormDismiss = useCallback(() => {
    if (onContactFormDismiss) {
      onContactFormDismiss();
    }
    setShowForm(false);
    setFormData({ name: "", email: "", phone: "" });
    setFormError(null);
    // Connect to voice
    if (!isConnected) {
      connect();
    }
  }, [onContactFormDismiss, isConnected, connect]);

  // Get display state label
  const getStateLabel = (): string => {
    if (showForm) return labels.form;

    // Connection states take priority
    if (connectionState === "connecting") return labels.connecting;
    if (connectionState === "reconnecting") return labels.reconnecting;
    if (connectionState === "error") return labels.error;

    // Conversation states
    switch (conversationState) {
      case "listening":
        return labels.listening;
      case "processing":
        return labels.processing;
      case "speaking":
        return labels.speaking;
      case "interrupted":
        return labels.processing;
      default:
        return labels.idle;
    }
  };

  // Get state color
  const getStateColor = (): string => {
    if (showForm) return "#10B981"; // Green for form

    if (connectionState === "connecting" || connectionState === "reconnecting") {
      return "#FFDE00"; // Yellow for connecting
    }
    if (connectionState === "error") {
      return "#EF4444"; // Red for error
    }

    switch (conversationState) {
      case "listening":
        return "#FFC805"; // Yellow for listening
      case "processing":
      case "speaking":
      case "interrupted":
        return "#A855F7"; // Purple for AI
      default:
        return "#10B981"; // Green for idle/ready
    }
  };

  // Render animation based on state
  const renderAnimation = () => {
    if (showForm) return null;

    if (connectionState === "connecting" || connectionState === "reconnecting") {
      return <ConnectingAnimation />;
    }

    if (connectionState === "error") {
      return <ErrorAnimation onClick={handleRetry} />;
    }

    switch (conversationState) {
      case "listening":
        return <ListeningAnimation />;
      case "processing":
      case "interrupted":
        return <ProcessingAnimation />;
      case "speaking":
        return <SpeakingAnimation />;
      default:
        return <IdleAnimation />;
    }
  };

  if (!isOpen) return null;

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
        {/* Contact Form - shown when showForm is true */}
        {showForm ? (
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
              <div>
                <label className="block text-sm font-bold uppercase mb-2 text-black">
                  {labels.phone}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder={locale === "es" ? "+57 300 123 4567" : "+1 555 123 4567"}
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
            <div className="relative">
              {renderAnimation()}
            </div>

            {/* State label */}
            <div
              className="px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-xl uppercase tracking-wider"
              style={{ backgroundColor: getStateColor(), color: "#000000" }}
            >
              {getStateLabel()}
            </div>

            {/* Error message */}
            {connectionState === "error" && error && (
              <div className="flex items-center gap-2 px-4 py-2 bg-[#EF4444] text-white border-2 border-black">
                <AlertCircle size={20} />
                <span className="font-bold text-sm">
                  {error.message.includes("microfono") || error.message.includes("microphone")
                    ? labels.microphoneError
                    : labels.connectionError}
                </span>
              </div>
            )}

            {/* Transcripts */}
            <div className="w-full space-y-4 max-h-48 overflow-y-auto">
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
              {aiTranscript && (
                <div className="bg-[#A855F7] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                  <div className="text-xs font-bold uppercase text-white/70 mb-1">
                    {labels.ai}
                  </div>
                  <p className="font-medium text-white">{aiTranscript}</p>
                </div>
              )}
            </div>

            {/* Instructions based on state */}
            {conversationState === "idle" && connectionState === "connected" && (
              <p className="text-white/60 font-bold uppercase text-sm">
                {labels.tapToSpeak}
              </p>
            )}

            {connectionState === "error" && (
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-[#FFC805] text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase hover:bg-[#FFDE00] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {labels.retry}
              </button>
            )}

            {/* Single close button at bottom - cleaner UX */}
            <button
              onClick={handleClose}
              className="flex items-center gap-2 px-8 py-4 mt-4 bg-[#EF4444] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase hover:bg-[#DC2626] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Phone size={20} />
              {labels.endCall}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
