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

        {/* Two columns: Optimize & Expand - Improved format */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {whatWeDo.columns.map((column, columnIndex) => {
            const IconComponent = columnIcons[columnIndex] ?? Settings;
            return (
              <Reveal key={column.title} delay={columnIndex * 100 + 150}>
                <div
                  className={`h-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all ${
                    columnIndex === 0 ? "bg-[#FFC805]" : "bg-[#A855F7]"
                  }`}
                >
                  {/* Image placeholder header */}
                  <div className="h-32 md:h-40 border-b-4 border-black overflow-hidden relative bg-black/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent
                        size={64}
                        className={columnIndex === 0 ? "text-black/20" : "text-white/20"}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="p-6 md:p-8">
                    <h3
                      className={`text-2xl md:text-3xl font-black uppercase mb-6 ${
                        columnIndex === 0 ? "text-black" : "text-white"
                      }`}
                    >
                      {column.title}
                    </h3>
                    <ul className="space-y-3">
                      {column.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className={`flex gap-3 items-start ${
                            columnIndex === 0 ? "text-black" : "text-white"
                          }`}
                        >
                          <Check
                            size={20}
                            className={`shrink-0 mt-0.5 ${
                              columnIndex === 0 ? "text-black" : "text-white"
                            }`}
                            strokeWidth={3}
                          />
                          <span className="text-sm md:text-base font-bold">
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
