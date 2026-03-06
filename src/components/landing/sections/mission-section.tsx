"use client";

import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import { useLocale } from "@/hooks/use-locale";

interface MissionSectionProps {
  onOpenChatImpact?: () => void;
}

export function MissionSection({ onOpenChatImpact }: MissionSectionProps) {
  const { content, locale } = useLocale();
  const { mission } = content;
  const impactCtaText = locale === "es" ? "Proponer proyecto" : "Propose project";

  return (
    <section id="mission" className="border-b border-black/10 bg-[#161f1c] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            title={mission.title}
            subtitle={mission.tagline}
            subtitleClassName="text-[#FFFFFF] border-[#FFFFFF]/70"
          />
        </Reveal>

        {/* Statement - Two column layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Statement text */}
          <Reveal delay={100}>
            <div className="rounded-[24px] border border-white/15 bg-[#f3f3f3] p-6 text-[#1f1f1f] shadow-[0_16px_30px_rgba(15,23,42,0.2)] ring-1 ring-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f7f7f7] hover:shadow-[0_20px_36px_rgba(15,23,42,0.24)] md:p-8">
              <div className="-mx-6 mb-4 border-y border-[#00BCD4]/35 bg-[#00BCD4] px-6 py-2.5 text-xs font-semibold tracking-[0.08em] text-[#FFFFFF] uppercase md:-mx-8 md:px-8">
                {mission.title}
              </div>
              <div className="space-y-4">
                {mission.statement.map((line, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed font-semibold text-neutral-800 md:text-lg"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: Tagline highlight */}
          <Reveal delay={200}>
            <div className="flex h-full items-center justify-center">
              <div className="w-full rounded-[24px] border border-[#00BCD4] bg-[#00BCD4] px-8 py-6 text-center shadow-[0_18px_34px_rgba(15,23,42,0.24)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#00BCD4] hover:shadow-[0_22px_40px_rgba(15,23,42,0.28)] md:px-12 md:py-8">
                <div className="-mx-8 mb-4 border-y border-white/15 bg-[#212121] px-8 py-2.5 text-xs font-semibold tracking-[0.08em] text-[#FFFFFF] uppercase md:-mx-12 md:px-12">
                  {mission.title}
                </div>
                <span className="text-2xl font-black tracking-tight text-[#FFFFFF] md:text-3xl lg:text-4xl">
                  {mission.tagline}
                </span>
                {onOpenChatImpact && (
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={onOpenChatImpact}
                      className="w-full rounded-xl bg-[#FFFFFF] px-6 py-3 text-sm font-semibold tracking-[0.08em] text-[#00BCD4] uppercase transition-all hover:-translate-y-0.5 hover:bg-white md:w-auto"
                    >
                      {impactCtaText}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
