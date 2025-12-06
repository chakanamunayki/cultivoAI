"use client";

import { Bot, Mic, Check, CheckCheck, Clock } from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import type { Step } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

interface Project19ViewProps {
  steps: Step[];
  activeTab: number;
}

export function Project19View({ steps, activeTab }: Project19ViewProps) {
  const { locale } = useLocale();

  const stackLabel = locale === "es" ? "Stack:" : "Stack:";
  const costLabel = locale === "es" ? "Costo:" : "Cost:";

  return (
    <div className="flex flex-col h-full">
      {/* WhatsApp-style header */}
      <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 border-b-4 border-black">
        <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center border-2 border-white">
          <Bot size={20} />
        </div>
        <div>
          <div className="font-bold text-sm">Project19 Coach</div>
          <div className="text-xs opacity-80 flex items-center gap-1">
            <span className="w-2 h-2 bg-[#25D366] rounded-full"></span>
            Online
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto max-h-[450px] bg-[#ECE5DD]">
        {steps.map((step, i) => {
          const text = step.action || step.result;
          const isUserMessage = step.action?.includes("Rocky:");
          const isTimeHeader =
            step.action?.includes("AM") || step.action?.includes("PM");
          const isVoiceNote = text?.includes("[") && text?.includes("]");

          // Time header
          if (isTimeHeader && step.action && !step.action.includes("Rocky:")) {
            return (
              <Reveal key={`${activeTab}-${i}`} delay={i * 500}>
                <div className="flex justify-center">
                  <span className="bg-[#DCF8C6] text-[#075E54] text-xs font-bold px-3 py-1 rounded-full border border-[#075E54]/20">
                    <Clock size={12} className="inline mr-1" />
                    {text}
                  </span>
                </div>
              </Reveal>
            );
          }

          // User message (Rocky)
          if (isUserMessage) {
            const messageText = text?.replace("Rocky: ", "") || "";
            return (
              <Reveal key={`${activeTab}-${i}`} delay={i * 500}>
                <div className="flex justify-end">
                  <div className="bg-[#DCF8C6] text-black max-w-[80%] px-4 py-2 rounded-lg rounded-tr-none border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {isVoiceNote ? (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                          <Mic size={18} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="h-1.5 bg-[#075E54] rounded-full w-24"></div>
                          <div className="text-xs text-gray-600 mt-1">0:30</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm">{messageText}</span>
                    )}
                    <div className="flex justify-end items-center gap-1 mt-1">
                      <span className="text-[10px] text-gray-500">
                        {i < 4 ? "7:01 AM" : "8:02 PM"}
                      </span>
                      <CheckCheck size={14} className="text-[#53BDEB]" />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          }

          // Bot message
          if (step.result) {
            return (
              <Reveal key={`${activeTab}-${i}`} delay={i * 500}>
                <div className="flex justify-start">
                  <div className="bg-white text-black max-w-[80%] px-4 py-2 rounded-lg rounded-tl-none border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-sm">{step.result}</span>
                    <div className="flex justify-end items-center gap-1 mt-1">
                      <span className="text-[10px] text-gray-500">
                        {i < 4 ? "7:00 AM" : "8:01 PM"}
                      </span>
                      <Check size={14} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          }

          return null;
        })}
      </div>

      {/* Stack and cost info */}
      <div className="bg-[#F0F0F0] border-t-4 border-black px-4 py-3 flex items-center justify-between">
        <div className="text-xs font-mono">
          <span className="font-bold">{stackLabel}</span>{" "}
          <span className="bg-black text-white px-1.5 py-0.5 text-[10px] mr-1">
            n8n
          </span>
          <span className="bg-[#A855F7] text-white px-1.5 py-0.5 text-[10px] mr-1">
            Notion
          </span>
          <span className="bg-[#25D366] text-white px-1.5 py-0.5 text-[10px] mr-1">
            WhatsApp
          </span>
          <span className="bg-[#FF6B35] text-white px-1.5 py-0.5 text-[10px]">
            OpenRouter
          </span>
        </div>
        <div className="bg-[#10B981] text-white text-xs font-bold px-3 py-1 border-2 border-black">
          {costLabel} ~$0.30/mes
        </div>
      </div>
    </div>
  );
}
