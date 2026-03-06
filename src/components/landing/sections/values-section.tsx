"use client";

import {
  Sprout,
  Handshake,
  User,
  Hammer,
  Scale,
  Mountain,
} from "lucide-react";
import {
  landingCardClass,
  landingIconChipClass,
  landingTitleBandClass,
  type LandingCardVariant,
} from "@/components/landing/ui/landing-card-styles";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, typeof Sprout> = {
  Sprout,
  Handshake,
  User,
  Hammer,
  Scale,
  Mountain,
};

export function ValuesSection() {
  const { content } = useLocale();
  const { values } = content;

  return (
    <section
      id="values"
      className="border-b border-black/10 bg-white py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <SectionHeader title={values.title} subtitle={values.subtitle} />
        </Reveal>

        {/* 2x3 grid of values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {values.values.map((value, index) => {
            const Icon = ICON_MAP[value.icon] || Sprout;
            const variant: LandingCardVariant = index === 2 ? "blue" : "dark";
            return (
              <Reveal key={value.title} delay={index * 75}>
                <div className={landingCardClass(variant, "group h-full rounded-[22px] p-6")}>
                  <div
                    className={landingTitleBandClass(
                      variant,
                      "-mx-6 mb-4 flex items-center gap-3 px-6 py-2.5"
                    )}
                  >
                    <div className={landingIconChipClass(variant)}>
                      <Icon
                        size={24}
                        className="text-[#FFFFFF]"
                        strokeWidth={2.5}
                      />
                    </div>
                    <h3 className="text-lg font-black leading-tight text-[#FFFFFF] md:text-xl">
                      {value.title}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      "text-sm leading-relaxed md:text-base",
                      variant === "blue" ? "text-[#eef9f5]" : "text-white/85"
                    )}
                  >
                    {value.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
