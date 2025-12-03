"use client";

import { X, Check } from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

export function WhyUsSection() {
  const { content } = useLocale();

  return (
    <div className="border-b-4 border-black bg-white">
      <div className="grid md:grid-cols-2">
        {/* Negative - What we're NOT */}
        <div className="p-8 md:p-12 lg:p-20 border-b-4 md:border-b-0 md:border-r-4 border-black bg-neutral-100">
          <Reveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-8 md:mb-12 decoration-4 md:decoration-8 underline decoration-red-500 underline-offset-4 md:underline-offset-8">
              {content.whyUs.notTitle}
            </h2>
            <ul className="space-y-4 md:space-y-6 font-bold text-lg md:text-xl">
              {content.whyUs.notItems.map((item, i) => (
                <li key={i} className="flex gap-4 md:gap-6 items-start group">
                  <X
                    size={28}
                    className="shrink-0 text-white border-4 border-black bg-red-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform md:w-9 md:h-9"
                  />
                  <span className="group-hover:text-red-600 transition-colors pt-1 text-base md:text-xl">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Positive - What we ARE */}
        <div className="p-8 md:p-12 lg:p-20 bg-[#C4F9E0]">
          <Reveal delay={200}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-8 md:mb-12 decoration-4 md:decoration-8 underline decoration-green-600 underline-offset-4 md:underline-offset-8">
              {content.whyUs.yesTitle}
            </h2>
            <ul className="space-y-4 md:space-y-6 font-bold text-lg md:text-xl">
              {content.whyUs.yesItems.map((item, i) => (
                <li key={i} className="flex gap-4 md:gap-6 items-start group">
                  <Check
                    size={28}
                    className="shrink-0 text-white border-4 border-black bg-green-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform md:w-9 md:h-9"
                  />
                  <span className="group-hover:text-green-800 transition-colors pt-1 text-base md:text-xl">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
