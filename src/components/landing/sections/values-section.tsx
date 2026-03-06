"use client";

import {
  Sprout,
  Handshake,
  User,
  Hammer,
  Scale,
  Mountain,
} from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import { useLocale } from "@/hooks/use-locale";

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
            const isFeatured = index === 2;
            return (
              <Reveal key={value.title} delay={index * 75}>
                <div
                  className={`group h-full rounded-[22px] border p-6 transition-all duration-200 ${
                    isFeatured
                      ? "border-[#00BCD4] bg-[#00BCD4] text-[#FFFFFF] shadow-[0_16px_30px_rgba(15,23,42,0.22)] hover:-translate-y-1 hover:bg-[#00BCD4] hover:shadow-[0_20px_36px_rgba(15,23,42,0.28)]"
                      : "border-black/10 bg-[#f2f2f2] text-[#1f1f1f] shadow-[0_14px_28px_rgba(15,23,42,0.1)] ring-1 ring-white/80 hover:-translate-y-0.5 hover:bg-[#f6f6f6] hover:shadow-[0_18px_34px_rgba(15,23,42,0.15)]"
                  }`}
                >
                  <div
                    className={`-mx-6 mb-4 flex items-center gap-3 border-y px-6 py-2.5 ${
                      isFeatured
                        ? "border-white/15 bg-[#212121]"
                        : "border-[#00BCD4]/35 bg-[#00BCD4]"
                    }`}
                  >
                    <div
                      className={`rounded-lg border p-2 transition-transform group-hover:scale-105 ${
                        isFeatured
                          ? "border-white/25 bg-white/10"
                          : "border-white/25 bg-white/10"
                      }`}
                    >
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
                    className={`text-sm leading-relaxed md:text-base ${
                      isFeatured ? "text-[#eef9f5]" : "text-neutral-700"
                    }`}
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
