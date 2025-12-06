"use client";

import { ArrowRight, Check, Settings, Rocket, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

interface WhatWeDoSectionProps {
  onScrollToServices?: () => void;
}

export function WhatWeDoSection({ onScrollToServices }: WhatWeDoSectionProps) {
  const { content } = useLocale();
  const { whatWeDo } = content;

  const handleScrollToServices = () => {
    if (onScrollToServices) {
      onScrollToServices();
    } else {
      const el = document.getElementById("services");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Icons for the columns
  const columnIcons: LucideIcon[] = [Settings, Rocket];

  return (
    <section
      id="what-we-do"
      className="border-b-4 border-black bg-neutral-100 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Standard brand styling */}
        <Reveal>
          <div className="flex flex-col md:flex-row gap-6 mb-12 md:mb-16 items-start">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none bg-black text-white px-4 py-2 inline-block rotate-1">
              {whatWeDo.title}
            </h2>
            <p className="text-lg md:text-xl font-bold max-w-xl md:mt-2 border-l-4 border-[#A855F7] pl-4 md:pl-6">
              {whatWeDo.subtitle}
            </p>
          </div>
        </Reveal>

        {/* Intro paragraph */}
        <Reveal delay={100}>
          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed text-center">
              {whatWeDo.intro}
            </p>
          </div>
        </Reveal>

        {/* Two columns: Optimize & Expand - Card format with prominent styling */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {whatWeDo.columns.map((column, columnIndex) => {
            const IconComponent = columnIcons[columnIndex] ?? Settings;
            const isOptimize = columnIndex === 0;
            return (
              <Reveal key={column.title} delay={columnIndex * 150 + 150}>
                <div
                  className={`h-full border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 ${
                    isOptimize ? "bg-[#FFC805]" : "bg-[#A855F7]"
                  }`}
                >
                  {/* Header with icon and title */}
                  <div className="p-6 md:p-8 border-b-4 border-black flex items-center gap-4 md:gap-6">
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                        isOptimize ? "bg-black" : "bg-white"
                      }`}
                    >
                      <IconComponent
                        size={36}
                        className={isOptimize ? "text-[#FFC805]" : "text-[#A855F7]"}
                        strokeWidth={2.5}
                      />
                    </div>
                    <h3
                      className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${
                        isOptimize ? "text-black" : "text-white"
                      }`}
                    >
                      {column.title}
                    </h3>
                  </div>

                  {/* Items list with better spacing and visibility */}
                  <div className="p-6 md:p-8">
                    <ul className="space-y-4 md:space-y-5">
                      {column.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className={`flex gap-4 items-center group ${
                            isOptimize ? "text-black" : "text-white"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 flex items-center justify-center border-2 border-current shrink-0 group-hover:scale-110 transition-transform ${
                              isOptimize ? "bg-black/10" : "bg-white/20"
                            }`}
                          >
                            <Check
                              size={18}
                              className="shrink-0"
                              strokeWidth={3}
                            />
                          </div>
                          <span className="text-base md:text-lg font-bold leading-snug">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Services button only - no list */}
        <Reveal delay={350}>
          <div className="text-center">
            <button
              onClick={handleScrollToServices}
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-black uppercase text-lg border-4 border-black shadow-[8px_8px_0px_0px_#A855F7] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_#A855F7] hover:-translate-y-1 transition-all group"
            >
              {whatWeDo.servicesPreview.linkText}
              <ArrowRight
                size={24}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
