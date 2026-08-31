"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  FileText,
  Loader2,
  MessageSquare,
  Mic,
  Minimize2,
  Phone,
  Send,
} from "lucide-react";
import type { ChatContext, ChatContextType } from "@/content/types";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useLocale } from "@/hooks/use-locale";
import {
  buildWhatsAppMessage,
  getWhatsAppUrl,
} from "@/lib/chat/system-prompt";
import { createLead } from "@/lib/leads/client";
import {
  AIChatQuickQuestions,
  type QuickQuestion,
} from "./ai-chat-quick-questions";
import { ChatInlineContactForm } from "./chat-inline-contact-form";
import { VoiceConversationMode } from "./voice-conversation-mode";

// Voice mode is hard-disabled for now. The voice code (components, hooks, API
// routes) stays in the repo, dormant. To re-enable, restore the env-driven check:
//   const VOICE_ENABLED = process.env.NEXT_PUBLIC_VOICE_ENABLED === "true";
const VOICE_ENABLED = false;

// WhatsApp icon component
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// ============================================
// Types
// ============================================

interface Message {
  role: "user" | "model";
  text: string;
  showContactForm?: boolean; // Show inline contact form after this message
  showWhatsAppCta?: boolean; // Show inline "Continue on WhatsApp" button after this message
}

interface FunctionCall {
  name: string;
  args: Record<string, unknown>;
}

interface ChatResponse {
  text?: string;
  functionCalls?: FunctionCall[];
  error?: string;
}

interface LeadInfo {
  name: string;
  email: string;
  company?: string | undefined;
  phone?: string | undefined;
  interestedServices?: string[] | undefined;
  projectDescription?: string | undefined;
}

interface VoiceUserInfo {
  name: string;
  email: string;
  phone?: string;
}

interface AIChatWidgetProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  onNavigate: (sectionId: string) => void;
  onOpenProjectModal: (projectTitle: string) => void;
  onOpenServiceModal: (serviceTitle: string) => void;
  context?: ChatContext | null;
  onOpenForm?: () => void;
}

// ============================================
// Constants
// ============================================

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573106172607";

// ============================================
// Component
// ============================================

export function AIChatWidget({
  isOpen,
  onToggle,
  onNavigate,
  onOpenProjectModal,
  onOpenServiceModal,
  context,
  onOpenForm,
}: AIChatWidgetProps) {
  const { content, locale } = useLocale();
  // Pick a string for the active locale. Portuguese falls back to English only if
  // a pt value is not supplied.
  const tt = useCallback(
    (es: string, en: string, pt: string) =>
      locale === "es" ? es : locale === "pt" ? pt : en,
    [locale]
  );
  const chatToggleLabel = tt("Hablemos", "Let's Talk", "Vamos conversar");
  const fifteenMinLabel = "15 MIN";
  const fifteenMinTitle = tt(
    "Agendar charla de 15 minutos",
    "Book a 15-minute project chat",
    "Agendar conversa de 15 minutos"
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substring(7)}`);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);
  const [whatsAppContext, setWhatsAppContext] = useState<string>("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({ name: "", email: "" });
  const [contactFormError, setContactFormError] = useState<string | null>(null);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isVoiceModeOpen, setIsVoiceModeOpen] = useState(false);
  const [showVoiceContactForm, setShowVoiceContactForm] = useState(false);
  const [voiceUserInfo, setVoiceUserInfo] = useState<VoiceUserInfo | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastContextRef = useRef<ChatContext | null | undefined>(undefined);
  const conversationInitialized = useRef(false);

  // Audio player for TTS (used in voice mode)
  const {
    isPlaying: isPlayingAudio,
    isLoading: isLoadingAudio,
  } = useAudioPlayer();

  // Get contextual greeting based on context type
  const getContextualGreeting = useCallback(
    (ctx: ChatContext | null | undefined): string => {
      if (!ctx) {
        return content.chat.contextualGreetings.general;
      }

      const greetings = content.chat.contextualGreetings;

      switch (ctx.type) {
        case "booking":
          return greetings.booking;
        case "story":
          return greetings.story;
        case "service":
          return greetings.service.replace("{service}", ctx.serviceTitle || "");
        case "partnership":
          return greetings.partnership.replace("{partnership}", ctx.partnershipName || "");
        case "qualification":
          return greetings.qualification;
        case "impact":
          return greetings.impact;
        default:
          return greetings.general;
      }
    },
    [content.chat.contextualGreetings]
  );

  // Initialize messages with contextual greeting on locale change
  useEffect(() => {
    const greeting = getContextualGreeting(context);
    setMessages([{ role: "model", text: greeting }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  // Handle context changes (when user clicks different CTAs)
  useEffect(() => {
    if (isOpen && context !== lastContextRef.current) {
      const greeting = getContextualGreeting(context);
      setMessages([{ role: "model", text: greeting }]);
      lastContextRef.current = context;
    }
  }, [context, isOpen, getContextualGreeting]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  // Initialize conversation when chat opens
  const initializeConversation = useCallback(async () => {
    if (conversationInitialized.current || conversationId) return;
    conversationInitialized.current = true;

    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = await fetch("/api/chat/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          language: locale,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
          entryContext: context?.type,
          userTimezone: timezone,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setConversationId(data.conversationId);
      }
    } catch (error) {
      console.error("Failed to initialize conversation:", error);
    }
  }, [sessionId, locale, context?.type, conversationId]);

  // Log message to database
  const logMessage = useCallback(async (
    role: "user" | "model",
    messageContent: string,
    metadata?: { modelUsed?: string; tokensUsed?: number; latencyMs?: number }
  ) => {
    if (!conversationId) return;

    try {
      await fetch("/api/chat/conversations?action=message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          role,
          content: messageContent,
          ...metadata,
        }),
      });
    } catch (error) {
      console.error("Failed to log message:", error);
    }
  }, [conversationId]);

  // Update conversation with lead ID
  const linkLeadToConversation = useCallback(async (leadId: string) => {
    if (!conversationId) return;

    try {
      await fetch("/api/chat/conversations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          leadId,
          leadCaptured: true,
        }),
      });
    } catch (error) {
      console.error("Failed to link lead to conversation:", error);
    }
  }, [conversationId]);

  // Initialize conversation when chat opens
  useEffect(() => {
    if (isOpen && !conversationInitialized.current) {
      initializeConversation();
    }
  }, [isOpen, initializeConversation]);

  // Handle lead capture API call
  const handleLeadCapture = useCallback(async (info: LeadInfo): Promise<{ success: boolean; leadId?: string }> => {
    try {
      const data = await createLead({
        name: info.name,
        email: info.email,
        source: "chatbot",
        preferredLanguage: locale,
        ...(info.company ? { company: info.company } : {}),
        ...(info.phone ? { phone: info.phone } : {}),
        ...(info.interestedServices?.length ? { interests: info.interestedServices } : {}),
        ...(info.projectDescription ? { projectDescription: info.projectDescription } : {}),
      });
      setCurrentLeadId(data.leadId);
      // Link lead to conversation
      if (data.leadId) {
        linkLeadToConversation(data.leadId);
      }
      return { success: true, leadId: data.leadId };
    } catch (error) {
      console.error("Lead capture error:", error);
      return { success: false };
    }
  }, [locale, linkLeadToConversation]);

  // Handle inline contact form submission
  const handleContactFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormError(null);

    const { name, email } = contactFormData;

    // Validate
    if (!name.trim()) {
      setContactFormError(
        locale === "es"
          ? "Por favor ingresa tu nombre"
          : locale === "pt"
          ? "Por favor, digite o seu nome"
          : "Please enter your name"
      );
      return;
    }

    // Email validation - must have @ and valid domain
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setContactFormError(
        locale === "es"
          ? "Por favor ingresa un email válido (ej: nombre@gmail.com)"
          : locale === "pt"
          ? "Por favor, digite um e-mail válido (ex: nome@gmail.com)"
          : "Please enter a valid email (e.g., name@gmail.com)"
      );
      return;
    }

    setIsSubmittingContact(true);

    try {
      const result = await handleLeadCapture({ name: name.trim(), email: email.trim() });

      if (result.success) {
        // Hide the form and add success message
        setShowContactForm(false);
        setContactFormData({ name: "", email: "" });

        const successMessage = locale === "es"
          ? `¡Perfecto ${name}! Ya tengo tu información. Si quieres, seguimos con una charla de 15 minutos sobre tu proyecto.`
          : locale === "pt"
          ? `Perfeito, ${name}! Já tenho as suas informações. Se você quiser, seguimos com uma conversa de 15 minutos sobre o seu projeto.`
          : `Perfect ${name}! I've got your info. If you want, we can move to a 15-minute project chat.`;

        setMessages(prev => [...prev, { role: "model", text: successMessage, showWhatsAppCta: true }]);
      } else {
        setContactFormError(
          locale === "es"
            ? "Hubo un error. Por favor intenta de nuevo."
            : locale === "pt"
            ? "Houve um erro. Por favor, tente de novo."
            : "There was an error. Please try again."
        );
      }
    } catch {
      setContactFormError(
        locale === "es"
          ? "Hubo un error. Por favor intenta de nuevo."
          : locale === "pt"
          ? "Houve um erro. Por favor, tente de novo."
          : "There was an error. Please try again."
      );
    } finally {
      setIsSubmittingContact(false);
    }
  }, [contactFormData, locale, handleLeadCapture]);

  // Trigger showing the contact form
  const triggerContactForm = useCallback(() => {
    // If voice mode is open, show the voice contact form instead
    if (isVoiceModeOpen) {
      setShowVoiceContactForm(true);
      return;
    }

    const askMessage = locale === "es"
      ? "Para poder ayudarte mejor, déjame tus datos:"
      : locale === "pt"
      ? "Para poder te ajudar melhor, me deixa os seus dados:"
      : "To help you better, please share your details:";

    setMessages(prev => [...prev, { role: "model", text: askMessage, showContactForm: true }]);
    setShowContactForm(true);
  }, [locale, isVoiceModeOpen]);

  // Handle voice contact form submission
  const handleVoiceContactFormSubmit = useCallback(async (name: string, email: string, phone?: string): Promise<boolean> => {
    try {
      const result = await handleLeadCapture({ name, email, phone });
      if (result.success) {
        setShowVoiceContactForm(false);
        setVoiceUserInfo({
          name,
          email,
          ...(phone ? { phone } : {}),
        });
        // Add success message to chat
        const successMessage = locale === "es"
          ? `¡Perfecto ${name}! Ya tengo tu información.`
          : locale === "pt"
          ? `Perfeito, ${name}! Já tenho as suas informações.`
          : `Perfect ${name}! I've got your info.`;
        setMessages(prev => [...prev, { role: "model", text: successMessage, showWhatsAppCta: true }]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [handleLeadCapture, locale]);

  // Handle voice contact form dismiss
  const handleVoiceContactFormDismiss = useCallback(() => {
    setShowVoiceContactForm(false);
  }, []);

  const openVoiceMode = useCallback(() => {
    setIsVoiceModeOpen(true);
  }, []);

  // Handle lead qualification
  const handleQualifyLead = useCallback(async (data: {
    budgetIndicator: boolean;
    timeline: boolean;
    useCase: boolean;
    decisionMaker: boolean;
    sectorFit: boolean;
    conversationSummary?: string | undefined;
  }): Promise<{ score: number }> => {
    if (!currentLeadId) {
      // Calculate score locally if no lead yet
      let score = 0;
      if (data.budgetIndicator) score++;
      if (data.timeline) score++;
      if (data.useCase) score++;
      if (data.decisionMaker) score++;
      if (data.sectorFit) score++;
      return { score };
    }

    try {
      const response = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: currentLeadId,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update qualification");
      }

      const result = await response.json();
      return { score: result.qualificationScore };
    } catch (error) {
      console.error("Qualification error:", error);
      let score = 0;
      if (data.budgetIndicator) score++;
      if (data.timeline) score++;
      if (data.useCase) score++;
      if (data.decisionMaker) score++;
      if (data.sectorFit) score++;
      return { score };
    }
  }, [currentLeadId]);

  // Open WhatsApp with context
  const openWhatsApp = useCallback((contextMessage?: string) => {
    const message = buildWhatsAppMessage(locale, {
      conversationSummary: contextMessage || whatsAppContext,
    });
    const url = getWhatsAppUrl(WHATSAPP_NUMBER, message);
    window.open(url, "_blank");
  }, [locale, whatsAppContext]);

  // Execute function calls from AI
  const executeFunctionCall = useCallback(
    async (call: FunctionCall): Promise<string> => {
      const { name, args } = call;

      switch (name) {
        case "navigate_to_section": {
          const sectionId = args.section_id as string;
          onNavigate(sectionId);
          return `Navigated to section: ${sectionId}`;
        }

        case "show_project_details": {
          const projectTitle = args.project_title as string;
          onOpenProjectModal(projectTitle);
          return `Opened project modal: ${projectTitle}`;
        }

        case "show_service_details": {
          const serviceTitle = args.service_title as string;
          onOpenServiceModal(serviceTitle);
          return `Opened service modal: ${serviceTitle}`;
        }

        case "collect_lead_info": {
          // Instead of directly capturing, trigger the inline form for accurate data entry
          // This prevents typos and ensures proper email format
          if (!currentLeadId) {
            triggerContactForm();
            return `Contact form displayed for user to fill in their details`;
          }
          return `Lead already captured`;
        }

        case "qualify_lead": {
          const result = await handleQualifyLead({
            budgetIndicator: args.budget_indicator as boolean,
            timeline: args.timeline as boolean,
            useCase: args.use_case as boolean,
            decisionMaker: args.decision_maker as boolean,
            sectorFit: args.sector_fit as boolean,
            conversationSummary: args.conversation_summary as string | undefined,
          });
          return `Lead qualified with score: ${result.score}/5`;
        }

        case "suggest_service": {
          const serviceTitle = args.service_name as string;
          onOpenServiceModal(serviceTitle);
          return `Suggested and opened service: ${serviceTitle}`;
        }

        case "offer_whatsapp": {
          const contextMessage = args.context_message as string;
          setWhatsAppContext(contextMessage);
          // Don't auto-open, just prepare the context
          return `WhatsApp contact offered`;
        }

        case "schedule_call": {
          if (onOpenForm) {
            onOpenForm();
          } else if (!currentLeadId) {
            triggerContactForm();
          } else {
            openWhatsApp();
          }
          return `Call scheduling suggested`;
        }

        default:
          return `Unknown function: ${name}`;
      }
    },
    [
      onNavigate,
      onOpenProjectModal,
      onOpenServiceModal,
      onOpenForm,
      handleQualifyLead,
      currentLeadId,
      triggerContactForm,
      openWhatsApp,
    ]
  );

  // Core function to send message to API (reusable for voice and text)
  const sendMessageToAPI = useCallback(async (userMessage: string) => {
    setIsLoading(true);
    logMessage("user", userMessage);
    const startTime = Date.now();

    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const response = await fetch("/api/chat/openrouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
          locale,
          entryContext: context?.type as ChatContextType | undefined,
          sessionId,
          timezone,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
          siteContent: {
            services: content.services.map((s) => ({
              title: s.title,
              description: s.description,
              details: s.details,
            })),
            projects: content.projects.map((p) => ({
              title: p.title,
              desc: p.desc,
              fullDesc: p.fullDesc,
            })),
            stories: content.stories,
            whyUs: content.whyUs,
            partnerships: content.partnerships.map((p) => ({
              name: p.name,
              tagline: p.tagline,
              description: p.description,
            })),
            whoWeHelp: content.whoWeHelp
              ? {
                  idealItems: content.whoWeHelp.idealItems,
                  notIdealItems: content.whoWeHelp.notIdealItems,
                  sectors: content.whoWeHelp.sectors,
                }
              : undefined,
          },
        }),
      });

      const data: ChatResponse = await response.json();

      if (!response.ok) {
        const apiError =
          data.text ||
          data.error ||
          (locale === "es"
            ? "Lo siento, hubo un error. Por favor intenta de nuevo."
            : locale === "pt"
            ? "Desculpe, houve um erro. Por favor, tente de novo."
            : "Sorry, there was an error. Please try again.");
        throw new Error(apiError);
      }

      // Handle function calls
      if (data.functionCalls && data.functionCalls.length > 0) {
        for (const call of data.functionCalls) {
          await executeFunctionCall(call);
        }
      }

      // Add response text
      const responseText =
        data.text ||
        (locale === "es" ? "Entendido." : locale === "pt" ? "Entendi." : "Got it.");
      setMessages((prev) => [...prev, { role: "model", text: responseText }]);

      // Log assistant response with latency
      const latencyMs = Date.now() - startTime;
      logMessage("model", responseText, {
        modelUsed: process.env.NEXT_PUBLIC_CHAT_MODEL || "openrouter",
        latencyMs,
      });
    } catch (error) {
      console.error("Chat error:", error);
      const fallbackMessage =
        locale === "es"
          ? "Lo siento, hubo un error. Por favor intenta de nuevo."
          : locale === "pt"
          ? "Desculpe, houve um erro. Por favor, tente de novo."
          : "Sorry, there was an error. Please try again.";
      const hasTechnicalError =
        error instanceof Error &&
        /(Unexpected token|JSON|NetworkError|Failed to fetch|Load failed)/i.test(error.message);
      const errorMessage =
        error instanceof Error && error.message && !hasTechnicalError
          ? error.message
          : fallbackMessage;
      setMessages((prev) => [...prev, { role: "model", text: errorMessage }]);
      logMessage("model", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [messages, locale, content, context, sessionId, executeFunctionCall, logMessage]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    await sendMessageToAPI(userMessage);
  }, [input, isLoading, sendMessageToAPI]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  // Handle quick question click with explicit actions
  const handleQuickQuestion = useCallback((question: QuickQuestion) => {
    if (isLoading) return;

    if (question.action === "send") {
      setMessages((prev) => [...prev, { role: "user", text: question.text }]);
      void sendMessageToAPI(question.text);
      return;
    }

    setMessages((prev) => [...prev, { role: "user", text: question.text }]);
    void logMessage("user", question.text);

    if (question.action === "capture_contact") {
      if (currentLeadId) {
        const alreadyCapturedMessage =
          locale === "es"
            ? "Ya tengo tus datos. Si quieres, seguimos con la charla de 15 minutos."
            : locale === "pt"
            ? "Já tenho os seus dados. Se você quiser, seguimos com a conversa de 15 minutos."
            : "I already have your details. If you want, we can move to a 15-minute project chat.";
        setMessages((prev) => [
          ...prev,
          { role: "model", text: alreadyCapturedMessage },
        ]);
        void logMessage("model", alreadyCapturedMessage);
        return;
      }

      triggerContactForm();
      return;
    }

    if (question.action === "open_whatsapp") {
      const contextMessage =
        locale === "es"
          ? "Quiero continuar por WhatsApp."
          : locale === "pt"
          ? "Quero continuar pelo WhatsApp."
          : "I want to continue on WhatsApp.";
      openWhatsApp(contextMessage);
    }
  }, [
    isLoading,
    sendMessageToAPI,
    logMessage,
    currentLeadId,
    locale,
    triggerContactForm,
    openWhatsApp,
  ]);

  // Collapsed state - show toggle button
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] flex flex-col items-end font-grotesk">
        <div className="flex items-center gap-2">
          <button
            onClick={() => openWhatsApp()}
            className="inline-flex h-[58px] w-[58px] items-center justify-center rounded-xl bg-[#25D366] text-[#0b2d1f] shadow-[0_10px_20px_rgba(15,23,42,0.26)] transition-all hover:-translate-y-0.5 hover:bg-[#34e073] hover:shadow-[0_14px_26px_rgba(15,23,42,0.32)]"
            aria-label="Open WhatsApp"
            title={tt("Contactar por WhatsApp", "Contact via WhatsApp", "Falar pelo WhatsApp")}
          >
            <WhatsAppIcon size={24} />
          </button>
          <button
            onClick={() => onToggle(true)}
            className="bg-primary text-primary-foreground p-4 border-4 border-black hover:bg-primary/90 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 font-bold uppercase"
            aria-label="Open chat"
          >
            <MessageSquare size={24} />
            <span>{chatToggleLabel}</span>
          </button>
        </div>
      </div>
    );
  }

  // Expanded state - show chat window
  return (
    <>
    <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto z-[60] flex flex-col items-end font-grotesk">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full md:w-[600px] lg:w-[700px] xl:w-[800px] flex flex-col transition-all duration-300 origin-bottom-right h-[85vh] md:h-[600px] md:max-h-[80vh] md:mb-4">
        {/* Header */}
        <div className="bg-white border-b-4 border-black p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot size={24} className="text-black" />
            <span className="font-bold text-black uppercase">
              {content.chat.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Voice Mode button */}
            {VOICE_ENABLED && (
              <button
                onClick={openVoiceMode}
                className="px-3 py-1.5 bg-primary text-primary-foreground border-2 border-black hover:bg-primary/90 hover:scale-105 transition-all font-bold text-xs uppercase"
                aria-label={tt("Modo de voz", "Voice mode", "Modo de voz")}
                title={tt("Conversación por voz", "Voice conversation", "Conversa por voz")}
              >
                <Phone size={16} className="inline mr-1" />
                VOZ
              </button>
            )}
            {/* WhatsApp button */}
            <button
              onClick={() => openWhatsApp()}
              className="text-[#25D366] hover:scale-110 transition-transform"
              aria-label="WhatsApp"
              title={tt("Contactar por WhatsApp", "Contact via WhatsApp", "Falar pelo WhatsApp")}
            >
              <WhatsAppIcon size={20} />
            </button>
            {onOpenForm && (
              <button
                onClick={onOpenForm}
                className="px-2 py-1.5 bg-white text-black border-2 border-black hover:bg-muted transition-all font-bold text-[11px] uppercase inline-flex items-center gap-1"
                aria-label={fifteenMinTitle}
                title={fifteenMinTitle}
              >
                <FileText size={14} />
                {fifteenMinLabel}
              </button>
            )}
            <button
              onClick={() => onToggle(false)}
              className="text-black hover:scale-110 transition-transform"
              aria-label="Close chat"
            >
              <Minimize2 size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted">
          {messages.map((msg, idx) => {
            const isLastBotMessage = msg.role === "model" && idx === messages.length - 1;
            const showSpeakerIcon = isLastBotMessage && (isPlayingAudio || isLoadingAudio);
            const shouldShowForm = msg.showContactForm && showContactForm && !currentLeadId;

            return (
              <div key={idx} className="space-y-3">
                <div
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className="max-w-[85%] p-3 text-sm border-2 font-medium"
                    style={{
                      backgroundColor: msg.role === "user" ? "#000000" : "#00BCD4",
                      color: "#FFFFFF",
                      borderColor: msg.role === "user" ? "transparent" : "#000000",
                      boxShadow: msg.role === "user" ? "none" : "4px 4px 0px 0px rgba(0,0,0,1)",
                      fontWeight: msg.role === "user" ? 700 : 500,
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="flex-1">{msg.text}</span>
                      {showSpeakerIcon && (
                        <span className="flex-shrink-0 mt-0.5">
                          {isLoadingAudio ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Mic size={14} className="animate-pulse" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inline Contact Form */}
                {shouldShowForm && (
                  <div className="flex justify-start">
                    <ChatInlineContactForm
                      locale={locale}
                      formData={contactFormData}
                      formError={contactFormError}
                      isSubmitting={isSubmittingContact}
                      onSubmit={handleContactFormSubmit}
                      onFormDataChange={setContactFormData}
                    />
                  </div>
                )}

                {/* Inline "Continue on WhatsApp" CTA after lead capture */}
                {msg.showWhatsAppCta && (
                  <div className="flex justify-start">
                    <button
                      onClick={() => openWhatsApp()}
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold uppercase text-sm px-4 py-2.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      <WhatsAppIcon size={18} />
                      {tt(
                        "Seguir en WhatsApp",
                        "Continue on WhatsApp",
                        "Continuar no WhatsApp"
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary text-secondary-foreground border-2 border-black p-3 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm font-bold">
                  {tt("Pensando...", "Thinking...", "Pensando...")}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <AIChatQuickQuestions
          locale={locale}
          contextType={context?.type ?? "general"}
          onQuestionClick={handleQuickQuestion}
          isLoading={isLoading}
        />

        {/* Input */}
        <div className="p-3 bg-white border-t-4 border-black">
          <div className="flex gap-2 items-center">
            {/* Voice Mode Button */}
            {VOICE_ENABLED && (
              <button
                onClick={openVoiceMode}
                className="p-3 border-2 border-black transition-all bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                aria-label={tt("Modo de voz", "Voice mode", "Modo de voz")}
                title={tt("Conversación por voz", "Voice conversation", "Conversa por voz")}
              >
                <Mic size={20} />
              </button>
            )}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={content.chat.placeholder}
              className="flex-1 p-3 outline-none bg-muted border-2 border-black focus:shadow-[2px_2px_0px_0px_var(--primary)] font-bold text-base"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-primary text-primary-foreground border-2 border-black hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all"
              aria-label={content.chat.sendButton}
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Voice Conversation Mode Overlay */}
    {VOICE_ENABLED && isVoiceModeOpen && (
      <VoiceConversationMode
        isOpen={true}
        onClose={() => {
          setIsVoiceModeOpen(false);
          setShowVoiceContactForm(false);
        }}
        locale={locale as "es" | "en"}
        showInitialForm={!voiceUserInfo}
        requirePreForm={!voiceUserInfo}
        showContactForm={showVoiceContactForm}
        onContactFormSubmit={handleVoiceContactFormSubmit}
        onContactFormDismiss={handleVoiceContactFormDismiss}
        capturedUserInfo={voiceUserInfo}
      />
    )}
    </>
  );
}
