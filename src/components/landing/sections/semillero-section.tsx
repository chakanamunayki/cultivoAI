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

interface SemilleroSectionProps {
  onOpenChatProject: () => void;
  onOpenChatInnovation: () => void;
}

// Semillero teaser. Layout and classes reuse the former Mission section.
// The full Semillero network page is phase 2.
export function SemilleroSection({ onOpenChatProject, onOpenChatInnovation }: SemilleroSectionProps) {
  const { content } = useLocale();
  const { semillero } = content;

  return (
    <section id="semillero" className="border-b border-black/10 bg-[#161f1c] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            title={semillero.title}
            subtitle={semillero.subtitle}
            subtitleClassName="text-[#FFFFFF] border-[#FFFFFF]/70"
            tone="onDark"
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: body */}
          <Reveal delay={100}>
            <div className={landingCardClass("dark", "h-full rounded-[24px] p-6 md:p-8")}>
              <div
                className={landingTitleBandClass(
                  "dark",
                  "-mx-6 mb-4 px-6 py-2.5 text-left md:-mx-8 md:px-8"
                )}
              >
                <h3 className="text-left text-lg font-black leading-tight tracking-tight uppercase md:text-xl">
                  {semillero.title}
                </h3>
              </div>
              <p className="text-base leading-relaxed font-semibold text-white/90 md:text-lg">
                {semillero.body}
              </p>
            </div>
          </Reveal>

          {/* Right: tagline + two CTAs */}
          <Reveal delay={200}>
            <div className="flex h-full items-center justify-center">
              <div className={landingCardClass("blue", "w-full rounded-[24px] px-8 py-6 text-center hover:-translate-y-1 md:px-12 md:py-8")}>
                <div
                  className={landingTitleBandClass(
                    "blue",
                    "-mx-8 mb-4 px-8 py-2.5 text-left md:-mx-12 md:px-12"
                  )}
                >
                  <h3 className="text-left text-lg font-black leading-tight tracking-tight uppercase md:text-xl">
                    {semillero.title}
                  </h3>
                </div>
                <span className="text-2xl font-black tracking-tight text-[#18181b] md:text-3xl lg:text-4xl">
                  {semillero.subtitle}
                </span>
                <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-center">
                  <button
                    type="button"
                    onClick={onOpenChatProject}
                    className={cn(
                      "w-full px-6 py-3 text-sm font-semibold tracking-[0.08em] md:w-auto",
                      landingPrimaryDarkButtonClass
                    )}
                  >
                    {semillero.projectCta}
                  </button>
                  <button
                    type="button"
                    onClick={onOpenChatInnovation}
                    className={cn(
                      "w-full px-6 py-3 text-sm font-semibold tracking-[0.08em] md:w-auto",
                      landingPrimaryDarkButtonClass
                    )}
                  >
                    {semillero.innovationCta}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
