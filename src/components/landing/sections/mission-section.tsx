"use client";

import {
  landingCardClass,
  landingPrimaryDarkButtonClass,
  landingTitleBandClass,
} from "@/components/landing/ui/landing-card-styles";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

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
            tone="onDark"
          />
        </Reveal>

        {/* Statement - Two column layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Statement text */}
          <Reveal delay={100}>
            <div className={landingCardClass("dark", "rounded-[24px] p-6 md:p-8")}>
              <div
                className={landingTitleBandClass(
                  "dark",
                  "-mx-6 mb-4 px-6 py-2.5 md:-mx-8 md:px-8"
                )}
              >
                <h3 className="text-lg font-black leading-tight text-[#FFFFFF] md:text-xl">
                  {mission.title}
                </h3>
              </div>
              <div className="space-y-4">
                {mission.statement.map((line, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed font-semibold text-white/90 md:text-lg"
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
              <div className={landingCardClass("blue", "w-full rounded-[24px] px-8 py-6 text-center hover:-translate-y-1 md:px-12 md:py-8")}>
                <div
                  className={landingTitleBandClass(
                    "blue",
                    "-mx-8 mb-4 px-8 py-2.5 md:-mx-12 md:px-12"
                  )}
                >
                  <h3 className="text-lg font-black leading-tight text-[#FFFFFF] md:text-xl">
                    {mission.title}
                  </h3>
                </div>
                <span className="text-2xl font-black tracking-tight text-[#FFFFFF] md:text-3xl lg:text-4xl">
                  {mission.tagline}
                </span>
                {onOpenChatImpact && (
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={onOpenChatImpact}
                      className={cn(
                        "w-full px-6 py-3 text-sm font-semibold tracking-[0.08em] md:w-auto",
                        landingPrimaryDarkButtonClass
                      )}
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
