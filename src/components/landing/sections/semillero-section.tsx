"use client";

import {
  landingCardClass,
  landingPrimaryDarkButtonClass,
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
              <p className="text-base leading-relaxed font-semibold text-white/90 md:text-lg">
                {semillero.body}
              </p>
            </div>
          </Reveal>

          {/* Right: two CTAs */}
          <Reveal delay={200}>
            <div className={landingCardClass("blue", "flex h-full flex-col justify-center gap-3 rounded-[24px] p-6 text-center hover:-translate-y-1 md:p-8")}>
              <button
                type="button"
                onClick={onOpenChatProject}
                className={cn("w-full px-6 py-3 text-sm font-semibold tracking-[0.08em]", landingPrimaryDarkButtonClass)}
              >
                {semillero.projectCta}
              </button>
              <button
                type="button"
                onClick={onOpenChatInnovation}
                className={cn("w-full px-6 py-3 text-sm font-semibold tracking-[0.08em]", landingPrimaryDarkButtonClass)}
              >
                {semillero.innovationCta}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
