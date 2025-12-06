"use client";

import { createElement, useState } from "react";
import {
  Filter,
  LayoutTemplate,
  MessageSquare,
  PieChart,
  Smartphone,
  UserCircle,
  type LucideIcon,
} from "lucide-react";
import { ChatView } from "@/components/landing/demos/chat-view";
import { CodeView } from "@/components/landing/demos/code-view";
import { CRMView } from "@/components/landing/demos/crm-view";
import { DashboardView } from "@/components/landing/demos/dashboard-view";
import { MobileView } from "@/components/landing/demos/mobile-view";
import { Project19View } from "@/components/landing/demos/project19-view";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

const DEMO_ICON_MAP: Record<string, LucideIcon> = {
  chat: MessageSquare,
  lead: Filter,
  web: LayoutTemplate,
  dash: PieChart,
  social: Smartphone,
  project19: UserCircle,
};

// Map use case IDs to visual types
const VISUAL_MAP: Record<string, string> = {
  chat: "chat",
  lead: "crm",
  web: "code",
  dash: "dashboard",
  social: "mobile",
  project19: "project19",
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
      case "project19":
        return <Project19View steps={activeCase.steps} activeTab={activeTab} />;
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
          <div className="flex flex-col md:flex-row gap-6 mb-12 md:mb-16 items-start">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none bg-black text-white px-4 py-2 inline-block rotate-1">
              {content.demosTitle}
            </h2>
            <p className="text-lg md:text-xl font-bold max-w-xl md:mt-2 border-l-4 border-[#A855F7] pl-4 md:pl-6">
              {content.demosSubtitle}
            </p>
          </div>
        </Reveal>

        {/* Navigation Menu */}
        <div className="mb-12">
          <div className="flex overflow-x-auto pt-2 pb-4 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide gap-3 md:flex-wrap md:justify-center">
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
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-12 items-start">
          {/* Description Panel - Compact on mobile */}
          <div className="lg:col-span-4">
            <Reveal key={`desc-${activeTab}`}>
              <div className="p-4 lg:p-8 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0 bg-[#FFDE00] border-4 border-black shadow-[4px_4px_0px_0px_black] lg:shadow-[8px_8px_0px_0px_black]">
                <div className="w-12 h-12 lg:w-16 lg:h-16 shrink-0 flex items-center justify-center lg:mb-6 bg-black text-white border-2 border-black">
                  {createElement(getUseCaseIcon(activeCase.id), { size: 24 })}
                </div>

                <div className="flex-1 lg:flex-none">
                  <h3 className="text-lg lg:text-2xl xl:text-3xl font-black uppercase mb-1 lg:mb-4 leading-none text-black">
                    {activeCase.title}
                  </h3>

                  <p className="hidden lg:block font-medium text-lg mb-8 leading-relaxed text-black">
                    {activeCase.description}
                  </p>

                  <div className="hidden lg:flex mt-auto text-sm font-bold uppercase tracking-widest items-center gap-2 text-black opacity-50">
                    <div className="w-2 h-2 bg-black"></div>
                    Live Demo Active
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Simulation Window */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden h-[500px] md:h-[550px] flex flex-col bg-white border-4 border-black shadow-[12px_12px_0px_0px_#10B981]">
              {/* Header */}
              <div className="p-4 flex items-center justify-between border-b bg-[#10B981] border-black border-b-4 shrink-0">
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
              <div className="flex-1 bg-white relative overflow-hidden">{renderVisual()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
