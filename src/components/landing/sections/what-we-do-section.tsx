"use client";

import { ArrowRight, Check, Settings, Rocket, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
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
      className="border-b border-black/10 bg-background py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <SectionHeader title={whatWeDo.title} subtitle={whatWeDo.subtitle} />
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
            const isFeatured = columnIndex === 1;
            return (
              <Reveal key={column.title} delay={columnIndex * 150 + 150}>
                <div
                  className={`h-full overflow-hidden rounded-[28px] border p-0 transition-all duration-200 ${
                    isFeatured
                      ? "border-[#00BCD4] bg-[#00BCD4] text-[#FFFFFF] shadow-[0_18px_34px_rgba(15,23,42,0.22)] hover:-translate-y-1 hover:bg-[#00BCD4] hover:shadow-[0_22px_40px_rgba(15,23,42,0.28)]"
                      : "border-black/10 bg-[#f3f3f3] text-[#1f1f1f] shadow-[0_16px_30px_rgba(15,23,42,0.1)] ring-1 ring-white/80 hover:-translate-y-1 hover:bg-[#f6f6f6] hover:shadow-[0_20px_36px_rgba(15,23,42,0.16)]"
                  }`}
                >
                  {/* Header with icon and title */}
                  <div
                    className={`flex items-center gap-4 border-b p-6 md:gap-6 md:p-8 ${
                      isFeatured
                        ? "border-[#00BCD4]/50 bg-[#00BCD4]"
                        : "border-black/10 bg-[#e6e6e6]"
                    }`}
                  >
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-xl border md:h-20 md:w-20 ${
                        isFeatured
                          ? "border-white/25 bg-white/10 text-[#FFFFFF]"
                          : "border-black/10 bg-[#f0f0f0] text-[#1f1f1f]"
                      }`}
                    >
                      <IconComponent
                        size={36}
                        className={isFeatured ? "text-[#FFFFFF]" : "text-primary"}
                        strokeWidth={2.5}
                      />
                    </div>
                    <h3
                      className="text-3xl font-black tracking-tight md:text-4xl"
                    >
                      <span
                        className={`inline-block rounded-[4px] px-3 py-1 ${
                          isFeatured
                            ? "bg-[#212121] text-[#FFFFFF]"
                            : "bg-[#00BCD4] text-[#FFFFFF]"
                        }`}
                      >
                        {column.title}
                      </span>
                    </h3>
                  </div>

                  {/* Items list with better spacing and visibility */}
                  <div className="p-6 md:p-8">
                    <ul className="space-y-4 md:space-y-5">
                      {column.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className={`group flex items-center gap-4 ${
                            isFeatured ? "text-[#eef9f5]" : "text-[#1f1f1f]"
                          }`}
                        >
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-transform group-hover:scale-105 ${
                              isFeatured
                                ? "border-white/30 bg-white/10"
                                : "border-black/15 bg-[#e8e8e8]"
                            }`}
                          >
                            <Check
                              size={18}
                              className="shrink-0"
                              strokeWidth={3}
                            />
                          </div>
                          <span className="text-base leading-snug font-semibold md:text-lg">
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
              className="group inline-flex items-center gap-2 rounded-xl bg-[#1f1f1f] px-8 py-3.5 text-lg font-semibold tracking-[0.06em] text-white uppercase shadow-[0_14px_28px_rgba(17,24,39,0.26)] transition-all hover:-translate-y-0.5 hover:bg-[#111] hover:shadow-[0_18px_34px_rgba(17,24,39,0.32)]"
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
