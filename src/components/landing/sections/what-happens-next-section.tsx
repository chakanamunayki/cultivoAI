"use client";

import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import { useLocale } from "@/hooks/use-locale";

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
              <div
                className={`rounded-[22px] border transition-all duration-200 ${
                  i === 1
                    ? "border-[#00BCD4] bg-[#00BCD4] text-[#FFFFFF] shadow-[0_16px_30px_rgba(15,23,42,0.22)] hover:-translate-y-1 hover:bg-[#00BCD4] hover:shadow-[0_20px_36px_rgba(15,23,42,0.28)]"
                    : "border-black/10 bg-[#f3f3f3] shadow-[0_14px_28px_rgba(15,23,42,0.1)] ring-1 ring-white/80 hover:-translate-y-1 hover:bg-[#f7f7f7] hover:shadow-[0_20px_36px_rgba(15,23,42,0.18)]"
                }`}
              >
                <div className="flex items-start gap-4 p-4 md:gap-6 md:p-6 lg:p-8">
                  {/* Number */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border md:h-16 md:w-16 ${
                      i === 1
                        ? "border-white/25 bg-white/10 text-[#FFFFFF]"
                        : "border-black/10 bg-[#e9e9e9] text-[#1f1f1f]"
                    }`}
                  >
                    <span className="text-2xl font-black md:text-3xl">{step.number}</span>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-2 text-lg font-black tracking-tight md:text-xl lg:text-2xl">
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm md:text-base ${
                        i === 1 ? "text-[#eef9f5]" : "text-gray-700"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
