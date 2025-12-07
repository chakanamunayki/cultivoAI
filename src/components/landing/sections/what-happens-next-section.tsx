"use client";

import { Reveal } from "@/components/landing/ui/reveal";
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
      className="border-b-4 border-black bg-[#F3F4F6] py-16 md:py-24"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <Reveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-center mb-4">
            {content.whatHappensNext.title}
          </h2>
          <p className="text-lg md:text-xl font-bold text-center text-gray-600 mb-12 md:mb-16">
            {content.whatHappensNext.subtitle}
          </p>
        </Reveal>

        {/* Steps */}
        <div className="space-y-6 md:space-y-8">
          {content.whatHappensNext.steps.map((step, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-1 transition-all">
                <div className="flex items-start gap-4 md:gap-6 p-4 md:p-6 lg:p-8">
                  {/* Number */}
                  <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 bg-[#FFC805] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#A855F7]">
                    <span className="text-2xl md:text-3xl font-black">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-black uppercase mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-700">
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
