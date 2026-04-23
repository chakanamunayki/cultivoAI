"use client";

import { useMemo } from "react";
import { ArrowDownRight, MessageCircle, Telescope } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

interface HeroSectionProps {
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
  onTertiaryCta: () => void;
}

const HERO_VIDEO_URL = "/landing/hero-bg-v3-10s.mp4";
const HERO_VIDEO_POSTER_URL = "/landing/hero-bg-v3-10s.jpg";

export function HeroSection({ onPrimaryCta, onSecondaryCta, onTertiaryCta }: HeroSectionProps) {
  const { content } = useLocale();

  const audienceChips = useMemo(() => {
    return Array.from(new Set(content.hero.audienceChips.map((item) => item.trim()).filter(Boolean))).slice(0, 6);
  }, [content.hero.audienceChips]);

  return (
    <section
      id="hero"
      data-custom-cursor-region
      className="relative z-10 isolate min-h-[620px] overflow-visible rounded-br-[15vw] bg-background text-[#efefef] md:min-h-[760px]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-br-[15vw] bg-[#212121]">
        <div className="absolute inset-0 overflow-hidden rounded-br-[15vw]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_VIDEO_POSTER_URL}
            className="h-full w-full object-cover object-center [object-position:50%_28%] md:[object-position:50%_20%]"
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(33,33,33,0.18)_12%,rgba(33,33,33,0.85)_72%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-[1600px] items-end px-6 pt-32 pb-24 md:min-h-[760px] md:px-10 md:pb-28 lg:px-16">
        <div className="max-w-[1120px]">
          <p className="mb-4 inline-flex rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase md:mb-6 md:text-sm">
            {content.hero.tagline}
          </p>

          <h1 className="text-[clamp(2.35rem,8.4vw,7.1rem)] leading-[0.88] font-black tracking-[-0.04em] text-white mix-blend-difference">
            {content.hero.line1}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/[0.86] md:mt-7 md:text-xl">
            {content.hero.subheadline}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5 md:mt-8">
            {audienceChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border border-white/30 bg-black/30 px-3.5 py-1.5 text-xs font-semibold text-white/90 md:text-sm"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
            <button
              type="button"
              onClick={onPrimaryCta}
              className="inline-flex items-center gap-2 rounded-full bg-[#00BCD4] px-5 py-3 text-sm font-bold tracking-[0.07em] text-[#111111] uppercase transition-colors hover:bg-[#00BCD4] md:text-base"
            >
              <MessageCircle size={18} />
              {content.hero.cta}
            </button>

            <button
              type="button"
              onClick={onSecondaryCta}
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/25 px-5 py-3 text-sm font-bold tracking-[0.07em] text-white uppercase transition-colors hover:bg-black/40 md:text-base"
            >
              <Telescope size={18} />
              {content.hero.secondaryCta}
            </button>

            <button
              type="button"
              onClick={onTertiaryCta}
              className="inline-flex items-center gap-2 rounded-full border border-transparent px-2 py-2 text-sm font-semibold text-white/90 underline decoration-white/60 underline-offset-4 transition-colors hover:text-white md:text-base"
            >
              {content.hero.tertiaryCta}
              <ArrowDownRight size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute top-full left-0 z-20 h-[clamp(5rem,7vw,8rem)] w-[clamp(5rem,7vw,8rem)] bg-[#212121]" />
      <div className="pointer-events-none absolute top-full left-0 z-30 h-[clamp(5rem,7vw,8rem)] w-[clamp(5rem,7vw,8rem)] rounded-tl-[clamp(5rem,7vw,8rem)] bg-background" />
    </section>
  );
}
