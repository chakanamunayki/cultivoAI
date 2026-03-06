"use client";

import {
  landingCardClass,
  landingTitleBandClass,
  type LandingCardVariant,
} from "@/components/landing/ui/landing-card-styles";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

// Props kept for backwards compatibility even though CTA was removed

interface WhatHappensNextSectionProps {
  onOpenChat?: () => void;
}

export function WhatHappensNextSection(_props: WhatHappensNextSectionProps) {
  const { content } = useLocale();

  return (
    <section
      id="what-happens-next"
      className="bg-background border-b border-black/10 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section Title */}
        <Reveal>
          <SectionHeader
            title={content.whatHappensNext.title}
            subtitle={content.whatHappensNext.subtitle}
            subtitleClassName="max-w-2xl"
          />
        </Reveal>

        {/* Steps */}
        <div className="space-y-6 md:space-y-8">
          {content.whatHappensNext.steps.map((step, i) => (
            <Reveal key={i} delay={i * 100}>
              {(() => {
                const variant: LandingCardVariant = i === 1 ? "blue" : "dark";
                return (
                  <div className={landingCardClass(variant, "overflow-hidden rounded-[22px] hover:-translate-y-1")}>
                    <div
                      className={landingTitleBandClass(
                        variant,
                        "flex items-center gap-4 px-4 py-3 md:px-6 md:py-3.5"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-lg font-black md:h-12 md:w-12 md:text-2xl",
                          variant === "blue"
                            ? "border-white/25 bg-white/10 text-white"
                            : "border-white/20 bg-black/20 text-white"
                        )}
                      >
                        {step.number}
                      </div>
                      <h3 className="text-lg font-black tracking-tight md:text-xl lg:text-2xl">
                        {step.title}
                      </h3>
                    </div>

                    <div className="p-4 md:p-6 lg:p-8">
                      <p
                        className={cn(
                          "text-sm md:text-base",
                          variant === "blue" ? "text-[#eef9f5]" : "text-white/85"
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
