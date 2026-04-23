"use client";

import { ArrowRight, Check, Settings, Rocket, type LucideIcon } from "lucide-react";
import {
  landingCardClass,
  landingIconChipClass,
  landingPrimaryDarkButtonClass,
  landingTitleBandClass,
  type LandingCardVariant,
} from "@/components/landing/ui/landing-card-styles";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

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
      className="relative border-b border-black/10 bg-background pt-[calc(clamp(5rem,7vw,8rem)+0.75rem)] pb-10 md:pt-[calc(clamp(5rem,7vw,8rem)+1rem)] md:pb-14 lg:pt-[calc(clamp(5rem,7vw,8rem)+1.25rem)] lg:pb-16"
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
            const variant: LandingCardVariant = columnIndex === 1 ? "blue" : "dark";
            return (
              <Reveal key={column.title} delay={columnIndex * 150 + 150}>
                <div className={landingCardClass(variant, "h-full overflow-hidden rounded-[28px] p-0 hover:-translate-y-1")}>
                  {/* Header with icon and title */}
                  <div
                    className={landingTitleBandClass(
                      variant,
                      "flex items-center gap-4 px-6 py-4 md:gap-6 md:px-8 md:py-5"
                    )}
                  >
                    <div className={cn("flex h-16 w-16 items-center justify-center rounded-xl border md:h-20 md:w-20", landingIconChipClass(variant, "p-0"))}>
                      <IconComponent size={36} className="text-[#FFFFFF]" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight md:text-4xl">{column.title}</h3>
                  </div>

                  {/* Items list with better spacing and visibility */}
                  <div className="p-6 md:p-8">
                    <ul className="space-y-4 md:space-y-5">
                      {column.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className={cn(
                            "group flex items-center gap-4",
                            variant === "blue" ? "text-[#eef9f5]" : "text-white/90"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-transform group-hover:scale-105",
                              variant === "blue"
                                ? "border-white/30 bg-white/10"
                                : "border-white/20 bg-black/20"
                            )}
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
              className={cn(
                "group inline-flex items-center gap-2 px-8 py-3.5 text-lg font-semibold tracking-[0.06em]",
                landingPrimaryDarkButtonClass
              )}
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
