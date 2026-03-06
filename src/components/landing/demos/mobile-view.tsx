"use client";

import { Loader2, Instagram, Twitter, Linkedin, Sparkles, Heart, MessageCircle, Share2 } from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import type { Step } from "@/content/types";

interface MobileViewProps {
  steps: Step[];
}

export function MobileView({ steps }: MobileViewProps) {
  return (
    <div className="h-full bg-muted flex items-center justify-center py-4 px-4">
      <div className="w-56 md:w-64 h-[420px] md:h-[460px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col relative">
        {/* Phone Header */}
        <div className="bg-black p-2 flex justify-between items-center text-[10px] text-white font-bold px-3">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <Sparkles size={10} className="text-primary" />
            <span className="text-primary">AI</span>
          </div>
        </div>

        {/* App Header */}
        <div className="bg-primary p-2 border-b-4 border-black flex items-center justify-between">
          <span className="text-primary-foreground font-black text-xs uppercase">Social Manager</span>
          <div className="flex gap-1">
            <div className="w-5 h-5 bg-white border-2 border-black flex items-center justify-center">
              <Instagram size={10} className="text-pink-500" />
            </div>
            <div className="w-5 h-5 bg-white border-2 border-black flex items-center justify-center">
              <Twitter size={10} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-background">
          {steps.map((step, i) => {
            const text = step.action || step.result;
            const isUser = !!step.action && step.action.includes("Usuario:");
            const isAI = text?.includes("IA:") || text?.includes("Adaptando");
            const isAction = text?.includes("Instagram") || text?.includes("Twitter") || text?.includes("LinkedIn");

            return (
              <Reveal key={i} delay={i * 400}>
                {isUser && (
                  <div className="bg-black text-white p-2.5 border-2 border-black shadow-[2px_2px_0px_0px_var(--primary)] text-[11px]">
                    <p className="font-black mb-1 text-primary uppercase text-[10px]">New Idea</p>
                    <p className="leading-tight">{text}</p>
                  </div>
                )}
                {isAction && (
                  <div className="bg-white p-2.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b-2 border-black">
                      {text?.includes("Instagram") && (
                        <div className="w-5 h-5 bg-gradient-to-br from-primary to-primary border-2 border-black flex items-center justify-center">
                          <Instagram size={10} className="text-white" />
                        </div>
                      )}
                      {text?.includes("Twitter") && (
                        <div className="w-5 h-5 bg-zinc-400 border-2 border-black flex items-center justify-center">
                          <Twitter size={10} className="text-white" />
                        </div>
                      )}
                      {text?.includes("LinkedIn") && (
                        <div className="w-5 h-5 bg-zinc-800 border-2 border-black flex items-center justify-center">
                          <Linkedin size={10} className="text-white" />
                        </div>
                      )}
                      <span className="text-[9px] font-bold text-gray-500 uppercase">
                        Posted
                      </span>
                    </div>
                    {/* Image placeholder */}
                    <div className="h-14 bg-gradient-to-br from-secondary to-white border-2 border-black mb-2 flex items-center justify-center">
                      <span className="text-[10px] text-muted-foreground font-bold">AI Generated</span>
                    </div>
                    {/* Engagement */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Heart size={12} className="text-red-500" />
                        <MessageCircle size={12} className="text-gray-400" />
                        <Share2 size={12} className="text-gray-400" />
                      </div>
                      <span className="text-[9px] font-bold text-primary">+23 likes</span>
                    </div>
                  </div>
                )}
                {isAI && (
                  <div className="flex items-center justify-center gap-2 py-2 bg-muted border-2 border-black">
                    <Loader2
                      size={12}
                      className="animate-spin text-primary"
                    />
                    <span className="text-[10px] text-primary font-black uppercase">
                      AI Creating...
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
