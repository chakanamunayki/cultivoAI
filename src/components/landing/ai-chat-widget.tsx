"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  FileText,
  Loader2,
  MessageSquare,
  Minimize2,
  Phone,
  Send,
} from "lucide-react";
import type { ChatContext, ChatContextType } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";
import {
  buildWhatsAppMessage,
  getWhatsAppUrl,
} from "@/lib/chat/system-prompt";

// ============================================
// Types
// ============================================

interface Message {
  role: "user" | "model";
  text: string;
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

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573106172706";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substring(7)}`);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);
  const [whatsAppContext, setWhatsAppContext] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastContextRef = useRef<ChatContext | null | undefined>(undefined);
  const conversationInitialized = useRef(false);

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
        case "semilla":
          return greetings.semilla;
        case "service":
          return greetings.service.replace("{service}", ctx.serviceTitle || "");
        case "partnership":
          return greetings.partnership.replace("{partnership}", ctx.partnershipName || "");
        case "qualification":
          return greetings.qualification;
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
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: info.name,
          email: info.email,
          company: info.company,
          phone: info.phone,
          interests: info.interestedServices,
          projectDescription: info.projectDescription,
          source: "chatbot",
          preferredLanguage: locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to capture lead");
      }

      const data = await response.json();
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
          const leadInfo: LeadInfo = {
            name: args.name as string,
            email: args.email as string,
            company: args.company as string | undefined,
            phone: args.phone as string | undefined,
            interestedServices: args.interested_services as string[] | undefined,
            projectDescription: args.project_description as string | undefined,
          };
          const result = await handleLeadCapture(leadInfo);
          return result.success
            ? `Lead captured successfully`
            : "Failed to capture lead";
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
          // For now, navigate to the booking section or open form
          if (onOpenForm) {
            onOpenForm();
          } else {
            onNavigate("what-happens-next");
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
      handleLeadCapture,
      handleQualifyLead,
    ]
  );

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    // Log user message
    logMessage("user", userMessage);

    const startTime = Date.now();

    try {
      // Get user timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Send message to API with enhanced context
      const response = await fetch("/api/chat/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
            semilla: content.semilla,
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

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data: ChatResponse = await response.json();

      // Handle function calls
      if (data.functionCalls && data.functionCalls.length > 0) {
        for (const call of data.functionCalls) {
          await executeFunctionCall(call);
        }
      }

      // Add response text
      const responseText =
        data.text || (locale === "es" ? "Entendido." : "Got it.");
      setMessages((prev) => [...prev, { role: "model", text: responseText }]);

      // Log assistant response with latency
      const latencyMs = Date.now() - startTime;
      logMessage("model", responseText, {
        modelUsed: "gemini-2.0-flash",
        latencyMs,
      });
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage =
        locale === "es"
          ? "Lo siento, hubo un error. Por favor intenta de nuevo."
          : "Sorry, there was an error. Please try again.";
      setMessages((prev) => [...prev, { role: "model", text: errorMessage }]);

      // Log error message
      logMessage("model", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, locale, content, context, sessionId, executeFunctionCall, logMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  // Collapsed state - show toggle button
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end font-grotesk">
        <button
          onClick={() => onToggle(true)}
          className="bg-black text-white p-4 border-4 border-transparent hover:border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 font-bold uppercase"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
          <span>Chat AI</span>
        </button>
      </div>
    );
  }

  // Expanded state - show chat window
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end font-grotesk">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-80 md:w-96 mb-4 flex flex-col transition-all duration-300 origin-bottom-right h-[500px] max-h-[80vh]">
        {/* Header */}
        <div className="bg-[#FFC805] border-b-4 border-black p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot size={24} className="text-black" />
            <span className="font-bold text-black uppercase">
              {content.chat.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* WhatsApp button */}
            <button
              onClick={() => openWhatsApp()}
              className="text-black hover:scale-110 transition-transform"
              aria-label="WhatsApp"
              title={locale === "es" ? "Contactar por WhatsApp" : "Contact via WhatsApp"}
            >
              <Phone size={20} />
            </button>
            {onOpenForm && (
              <button
                onClick={onOpenForm}
                className="text-black hover:scale-110 transition-transform"
                aria-label={content.chat.contextualGreetings.formFallback}
                title={content.chat.contextualGreetings.formFallback}
              >
                <FileText size={20} />
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F3F4F6]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-3 text-sm ${
                  msg.role === "user"
                    ? "bg-black text-white font-bold border-2 border-transparent"
                    : "bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_#A855F7]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#FFDE00] border-2 border-black p-2">
                <Loader2 size={16} className="animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t-4 border-black">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={content.chat.placeholder}
              className="flex-1 p-2 outline-none bg-[#F3F4F6] border-2 border-black focus:shadow-[2px_2px_0px_0px_#A855F7] font-bold"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-[#A855F7] text-white border-2 border-black hover:bg-[#9333EA] disabled:opacity-50 transition-colors"
              aria-label={content.chat.sendButton}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
