"use client";

import { createElement, useState } from "react";
import {
  Filter,
  LayoutTemplate,
  MessageSquare,
  PieChart,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { ChatView } from "@/components/landing/demos/chat-view";
import { CodeView } from "@/components/landing/demos/code-view";
import { CRMView } from "@/components/landing/demos/crm-view";
import { DashboardView } from "@/components/landing/demos/dashboard-view";
import { MobileView } from "@/components/landing/demos/mobile-view";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

const DEMO_ICON_MAP: Record<string, LucideIcon> = {
  chat: MessageSquare,
  lead: Filter,
  web: LayoutTemplate,
  dash: PieChart,
  social: Smartphone,
};

// Map use case IDs to visual types
const VISUAL_MAP: Record<string, string> = {
  chat: "chat",
  lead: "crm",
  web: "code",
  dash: "dashboard",
  social: "mobile",
};

function getUseCaseIcon(id: string): LucideIcon {
  return DEMO_ICON_MAP[id] || MessageSquare;
}

interface DemosSectionProps {
  className?: string;
}

export function DemosSection({ className = "" }: DemosSectionProps) {
  const { content } = useLocale();
  const [activeTab, setActiveTab] = useState(0);
  const activeCase = content.useCases[activeTab] ?? content.useCases[0];

  if (!activeCase) {
    return null;
  }

  const renderVisual = () => {
    const visualType = VISUAL_MAP[activeCase.id] || "chat";

    switch (visualType) {
      case "code":
        return <CodeView steps={activeCase.steps} />;
      case "mobile":
        return <MobileView steps={activeCase.steps} />;
      case "dashboard":
        return <DashboardView steps={activeCase.steps} />;
      case "crm":
        return <CRMView steps={activeCase.steps} />;
      case "chat":
      default:
        return <ChatView steps={activeCase.steps} activeTab={activeTab} />;
    }
  };

  return (
    <div
      id="demos"
      className={`py-20 md:py-32 bg-white border-b-4 border-black ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 text-black">
              {content.demosTitle}
            </h2>
            <p className="text-lg max-w-2xl mx-auto font-bold border-b-4 border-black inline-block pb-1">
              {content.demosSubtitle}
            </p>
          </div>
        </Reveal>

        {/* Navigation Menu */}
        <div className="mb-12">
          <div className="flex overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide gap-3 md:flex-wrap md:justify-center">
            {content.useCases.map((useCase, index) => {
              const isActive = activeTab === index;
              const IconComponent = getUseCaseIcon(useCase.id);

              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-5 py-3 transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-[#A855F7] text-white border-4 border-black shadow-[4px_4px_0px_0px_black] -translate-y-1"
                      : "bg-white text-black border-4 border-black hover:bg-gray-100"
                  }`}
                >
                  <IconComponent size={18} />
                  <span className="font-bold text-sm uppercase tracking-wide">
                    {useCase.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Description Panel */}
          <div className="lg:col-span-4">
            <Reveal key={`desc-${activeTab}`}>
              <div className="p-8 h-full flex flex-col justify-center bg-[#FFDE00] border-4 border-black shadow-[8px_8px_0px_0px_black]">
                <div className="w-16 h-16 flex items-center justify-center mb-6 bg-black text-white border-2 border-black">
                  {createElement(getUseCaseIcon(activeCase.id), { size: 32 })}
                </div>

                <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 leading-none text-black">
                  {activeCase.title}
                </h3>

                <p className="font-medium text-lg mb-8 leading-relaxed text-black">
                  {activeCase.description}
                </p>

                <div className="mt-auto text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-black opacity-50">
                  <div className="w-2 h-2 bg-black"></div>
                  Live Demo Active
                </div>
              </div>
            </Reveal>
          </div>

          {/* Simulation Window */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden min-h-[500px] flex flex-col bg-white border-4 border-black shadow-[12px_12px_0px_0px_#10B981]">
              {/* Header */}
              <div className="p-4 flex items-center justify-between border-b bg-[#10B981] border-black border-b-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-black"></div>
                  <div className="w-3 h-3 bg-black"></div>
                  <div className="w-3 h-3 bg-black"></div>
                </div>
                <div className="font-mono text-xs uppercase text-black font-black">
                  {activeCase.id.toUpperCase()}_AGENT_V2.4.exe
                </div>
              </div>

              {/* Dynamic Content Based on Type */}
              <div className="flex-1 bg-white relative">{renderVisual()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
