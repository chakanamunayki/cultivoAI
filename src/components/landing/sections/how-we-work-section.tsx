"use client";

import { CodeTerminal } from "@/components/landing/ui/code-terminal";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import { useLocale } from "@/hooks/use-locale";

export function HowWeWorkSection() {
  const { content } = useLocale();
  const { howWeWork } = content;
  const noDramaLabel = content.hero.noDrama;
  const noDramaText = content.hero.noDramaText
    .replace(new RegExp(`^${content.hero.noDrama.replace(".", "\\.")}\\s*`, "i"), "")
    .trim();

  // Separate pillars: first two side-by-side, third full-width
  const sideBySidePillars = howWeWork.pillars.filter((p) => !p.isFullWidth);
  const fullWidthPillar = howWeWork.pillars.find((p) => p.isFullWidth);
  return (
    <section id="how-we-work" className="border-b border-white/10 bg-[#212121] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            title={howWeWork.title}
            subtitle={howWeWork.subtitle}
            subtitleClassName="text-white/80"
            tone="onDark"
          />
        </Reveal>

        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <div className="mb-6 grid gap-6 md:mb-8 md:grid-cols-2 md:gap-8">
              {sideBySidePillars.map((pillar, index) => {
                return (
                  <Reveal key={pillar.title} delay={index * 100}>
                    <div className="group h-full rounded-[24px] border border-white/15 bg-[#212121] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.3)] ring-1 ring-white/5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1b1b1b] hover:shadow-[0_18px_34px_rgba(0,0,0,0.4)] md:p-8">
                      <div className="-mx-6 mb-4 border-y border-[#00BCD4]/35 bg-[#00BCD4] px-6 py-3 md:-mx-8 md:px-8">
                        <h3 className="text-xl font-black tracking-tight text-[#FFFFFF] md:text-2xl">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-base leading-relaxed text-white/85 md:text-lg">
                        {pillar.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {fullWidthPillar && (
              <Reveal delay={220}>
                <div className="group rounded-[24px] border border-[#00BCD4] bg-[#00BCD4] p-6 text-[#FFFFFF] shadow-[0_18px_34px_rgba(15,23,42,0.22)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#00BCD4] hover:shadow-[0_22px_40px_rgba(15,23,42,0.28)] md:p-8">
                  <div className="-mx-6 mb-4 border-y border-white/15 bg-[#212121] px-6 py-3 md:-mx-8 md:px-8">
                    <h3 className="text-xl font-black tracking-tight text-[#FFFFFF] md:text-2xl">
                      {fullWidthPillar.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed md:text-lg">
                    {fullWidthPillar.description}
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          <div>
            <Reveal delay={120}>
              <CodeTerminal fillContainer />
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-6 h-[128px] rounded-[20px] border border-white/15 bg-[#212121] p-5 shadow-[0_12px_26px_rgba(0,0,0,0.32)] ring-1 ring-white/5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1b1b1b] hover:shadow-[0_16px_30px_rgba(0,0,0,0.42)] md:h-[140px] md:p-6">
                <span className="-mx-5 mb-3 block border-y border-white/15 bg-[#181818] px-5 py-2 text-[11px] font-semibold tracking-[0.1em] text-[#FFFFFF] uppercase md:-mx-6 md:px-6">
                  {noDramaLabel}
                </span>
                <p className="text-base font-semibold text-white/90 md:text-lg">
                  {noDramaText}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
