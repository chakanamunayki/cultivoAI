"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, FileText, Loader2, MessageSquare, Minimize2, Send } from "lucide-react";
import type { ChatContext } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

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

interface AIChatWidgetProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  onNavigate: (sectionId: string) => void;
  onOpenProjectModal: (projectTitle: string) => void;
  onOpenServiceModal: (serviceTitle: string) => void;
  context?: ChatContext | null;
  onOpenForm?: () => void;
}

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastContextRef = useRef<ChatContext | null | undefined>(undefined);

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
  }, [locale]); // Only reset on locale change, not context change

  // Handle context changes (when user clicks different CTAs)
  useEffect(() => {
    // Only update if context actually changed and chat is open
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

  const executeFunctionCall = useCallback(
    (call: FunctionCall) => {
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
        default:
          return `Unknown function: ${name}`;
      }
    },
    [onNavigate, onOpenProjectModal, onOpenServiceModal]
  );

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      // Send message to API
      const response = await fetch("/api/chat/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
          locale,
          siteContent: {
            services: content.services.map((s) => ({
              title: s.title,
              description: s.description,
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
          executeFunctionCall(call);
        }
      }

      // Add response text
      const responseText =
        data.text ||
        (locale === "es" ? "Entendido." : "Got it.");
      setMessages((prev) => [...prev, { role: "model", text: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage =
        locale === "es"
          ? "Lo siento, hubo un error. Por favor intenta de nuevo."
          : "Sorry, there was an error. Please try again.";
      setMessages((prev) => [...prev, { role: "model", text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, locale, content, executeFunctionCall]);

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
