"use client";

import { Loader2, Instagram, Twitter, Linkedin } from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import type { Step } from "@/content/types";

interface MobileViewProps {
  steps: Step[];
}

export function MobileView({ steps }: MobileViewProps) {
  return (
    <div className="h-full bg-gray-100 flex items-center justify-center py-4">
      <div className="w-64 h-[500px] bg-white rounded-3xl border-8 border-gray-900 overflow-hidden shadow-xl flex flex-col relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-xl z-20"></div>

        {/* Status Bar */}
        <div className="bg-gray-50 p-2 pt-6 flex justify-between items-center text-[10px] text-gray-500 font-bold px-4 border-b">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-black rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Feed */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
          {steps.map((step, i) => {
            const text = step.action || step.result;
            const isUser = !!step.action && step.action.includes("Usuario:");
            const isAI = text?.includes("IA:") || text?.includes("Adaptando");
            const isAction = text?.includes("Instagram") || text?.includes("Twitter") || text?.includes("LinkedIn");

            return (
              <Reveal key={i} delay={i * 400}>
                {isUser && (
                  <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tr-sm text-xs mb-2 shadow-sm">
                    <p className="font-bold mb-1">New Idea</p>
                    {text}
                  </div>
                )}
                {isAction && (
                  <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 border-b pb-2">
                      {text?.includes("Instagram") && (
                        <Instagram size={14} className="text-pink-500" />
                      )}
                      {text?.includes("Twitter") && (
                        <Twitter size={14} className="text-blue-400" />
                      )}
                      {text?.includes("LinkedIn") && (
                        <Linkedin size={14} className="text-blue-700" />
                      )}
                      <span className="text-[10px] font-bold text-gray-400">
                        Just now
                      </span>
                    </div>
                    <div className="h-16 bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-gray-300 text-xs">
                      Image Preview
                    </div>
                    <div className="h-2 bg-gray-100 w-3/4 rounded mb-1"></div>
                    <div className="h-2 bg-gray-100 w-1/2 rounded"></div>
                  </div>
                )}
                {isAI && (
                  <div className="flex items-center justify-center gap-2 py-2">
                    <Loader2
                      size={12}
                      className="animate-spin text-purple-500"
                    />
                    <span className="text-[10px] text-purple-500 font-bold uppercase tracking-wide">
                      Generating Content...
                    </span>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
