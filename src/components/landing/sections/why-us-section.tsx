"use client";

import { Check, X } from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import { useLocale } from "@/hooks/use-locale";

export function WhyUsSection() {
  const { content, locale } = useLocale();
  const sectionTitle = locale === "es" ? "Por que nosotros" : "Why Us";
  const sectionSubtitle =
    locale === "es" ? "Lo que no somos y lo que si somos" : "What we are not, and what we are";

  return (
    <section id="why-us" className="border-b border-black/10 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Negative - What we're NOT */}
          <div className="rounded-[24px] border border-black/10 bg-[#f2f2f2] p-8 shadow-[0_14px_30px_rgba(15,23,42,0.1)] ring-1 ring-white/80 transition-all duration-200 hover:-translate-y-1 hover:bg-[#f6f6f6] hover:shadow-[0_20px_36px_rgba(15,23,42,0.18)] md:p-10 lg:p-12">
            <Reveal>
              <h3 className="-mx-8 mb-8 border-y border-[#00BCD4]/35 bg-[#00BCD4] px-8 py-3 text-2xl font-black tracking-tight text-[#FFFFFF] uppercase md:-mx-10 md:mb-10 md:px-10 md:text-3xl lg:-mx-12 lg:px-12">
                {content.whyUs.notTitle}
              </h3>
              <ul className="space-y-4 text-lg font-semibold md:space-y-6 md:text-xl">
                {content.whyUs.notItems.map((item, i) => (
                  <li key={i} className="group flex items-start gap-4 md:gap-6">
                    <X
                      size={28}
                      className="h-8 w-8 shrink-0 rounded-lg border border-red-200 bg-red-500/90 p-1.5 text-white transition-transform group-hover:scale-105 md:h-9 md:w-9"
                    />
                    <span className="pt-1 text-base text-[#3d3d3d] transition-colors group-hover:text-red-700 md:text-xl">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Positive - What we ARE */}
          <div className="rounded-[24px] border border-[#00BCD4] bg-[#00BCD4] p-8 text-[#FFFFFF] shadow-[0_18px_34px_rgba(15,23,42,0.22)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#00BCD4] hover:shadow-[0_22px_40px_rgba(15,23,42,0.28)] md:p-10 lg:p-12">
            <Reveal delay={200}>
              <h3 className="-mx-8 mb-8 border-y border-white/15 bg-[#212121] px-8 py-3 text-2xl font-black tracking-tight text-[#FFFFFF] uppercase md:-mx-10 md:mb-10 md:px-10 md:text-3xl lg:-mx-12 lg:px-12">
                {content.whyUs.yesTitle}
              </h3>
              <ul className="space-y-4 text-lg font-semibold md:space-y-6 md:text-xl">
                {content.whyUs.yesItems.map((item, i) => (
                  <li key={i} className="group flex items-start gap-4 md:gap-6">
                    <Check
                      size={28}
                      className="h-8 w-8 shrink-0 rounded-lg border border-white/25 bg-white/10 p-1.5 text-[#FFFFFF] transition-transform group-hover:scale-105 md:h-9 md:w-9"
                    />
                    <span className="pt-1 text-base transition-colors group-hover:text-white md:text-xl">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
