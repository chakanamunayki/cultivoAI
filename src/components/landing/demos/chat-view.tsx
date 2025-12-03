"use client";

import {
  Bot,
  User,
  BrainCircuit,
  Check,
  Database,
  Loader2,
} from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import type { Step } from "@/content/types";

interface DemoStep extends Step {
  type?: string;
  text?: string;
  isProcessing?: boolean;
}

interface ChatViewProps {
  steps: DemoStep[];
  activeTab: number;
}

export function ChatView({ steps, activeTab }: ChatViewProps) {
  return (
    <div className="p-6 md:p-8 flex-1 bg-gray-50/30 space-y-6 overflow-y-auto max-h-[600px]">
      {steps.map((step, i) => {
        const stepType = step.action ? "user" : step.result ? "bot" : "action";
        const text = step.action || step.result;
        const isUser = stepType === "user" || text?.includes("Cliente:");
        const isAI = text?.includes("IA:") || text?.includes("Analizando");
        const isAction = text?.includes("Enviando") || text?.includes("Bot:");

        return (
          <Reveal key={`${activeTab}-${i}`} delay={i * 400}>
            <div
              className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div
                  className={`w-10 h-10 flex items-center justify-center shrink-0 shadow-sm border-2 border-black shadow-[4px_4px_0px_0px_black] ${
                    isAI
                      ? "bg-blue-600 text-white"
                      : isAction
                        ? "bg-green-500 text-white"
                        : "bg-[#1a1a1a] text-white"
                  }`}
                >
                  {isAI ? (
                    <BrainCircuit size={18} />
                  ) : isAction ? (
                    <Check size={18} />
                  ) : text?.includes("{") ? (
                    <Database size={18} />
                  ) : (
                    <Bot size={18} />
                  )}
                </div>
              )}

              <div
                className={`max-w-[85%] p-5 text-sm md:text-base ${
                  isUser
                    ? "bg-black text-white font-bold shadow-[4px_4px_0px_0px_#A855F7]"
                    : isAI
                      ? "bg-white border-2 border-black font-mono"
                      : "bg-[#FFDE00] border-2 border-black font-bold"
                }`}
              >
                {isAI && text?.includes("Analizando") && (
                  <div className="flex items-center gap-2 mb-2 opacity-60 text-[10px] uppercase tracking-wider font-bold">
                    <Loader2 size={12} className="animate-spin" /> Procesando
                  </div>
                )}
                <div className={text?.includes("{") ? "font-mono text-xs md:text-sm" : ""}>
                  {text}
                </div>
              </div>

              {isUser && (
                <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-white border-2 border-black text-black">
                  <User size={20} />
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
