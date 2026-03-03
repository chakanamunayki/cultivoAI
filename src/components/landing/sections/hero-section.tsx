"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

interface HeroSectionProps {
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
  onTertiaryCta: () => void;
}

export function HeroSection({
  onPrimaryCta,
  onSecondaryCta,
  onTertiaryCta,
}: HeroSectionProps) {
  const { content } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const rotatingAudience = content.hero.audienceChips;
  const [activeAudienceIndex, setActiveAudienceIndex] = useState(0);
  const [isRotationPaused, setIsRotationPaused] = useState(false);

  const subheadLines = content.hero.subheadline
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3);

  const outcomesLine = content.hero.outcomes.join(" · ");

  const longestAudience = useMemo(() => {
    return rotatingAudience.reduce(
      (longest, item) => (item.length > longest.length ? item : longest),
      rotatingAudience[0] ?? ""
    );
  }, [rotatingAudience]);

  const audienceMinWidthCh = Math.min(Math.max(longestAudience.length + 1, 18), 34);
  const activeIndex = shouldReduceMotion
    ? 0
    : activeAudienceIndex % Math.max(rotatingAudience.length, 1);

  useEffect(() => {
    if (shouldReduceMotion || isRotationPaused || rotatingAudience.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveAudienceIndex((current) => (current + 1) % rotatingAudience.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isRotationPaused, rotatingAudience.length, shouldReduceMotion]);

  return (
    <section id="hero" className="relative overflow-hidden border-b border-black/10">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.96)_0%,rgba(16,185,129,0.10)_52%,rgba(255,255,255,0.98)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.28) 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative max-w-[1140px] mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-14 lg:py-16">
        <Reveal>
          <div className="max-w-[760px]">
            <p className="text-xs md:text-sm font-bold tracking-[0.16em] uppercase text-neutral-700 mb-4">
              {content.hero.tagline}
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-black">
              {content.hero.line1}
            </h1>

            <div className="mt-5 space-y-2 text-base md:text-lg text-neutral-800">
              {subheadLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <p className="mt-5 text-sm md:text-base font-semibold text-neutral-900">
              {outcomesLine}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm md:text-base">
              <span className="font-semibold text-neutral-700">
                {content.hero.audienceLabel}
              </span>
              <span
                className="relative inline-flex h-7 md:h-8 max-w-full overflow-hidden font-mono font-semibold text-neutral-900 cursor-default"
                style={{ width: `min(100%, ${audienceMinWidthCh}ch)` }}
                onMouseEnter={() => setIsRotationPaused(true)}
                onMouseLeave={() => setIsRotationPaused(false)}
                onFocusCapture={() => setIsRotationPaused(true)}
                onBlurCapture={() => setIsRotationPaused(false)}
                tabIndex={0}
                aria-live={shouldReduceMotion ? "off" : "polite"}
              >
                {rotatingAudience.map((item, index) => (
                  <span
                    key={item}
                    aria-hidden={index !== activeIndex}
                    className={[
                      "absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap transition-opacity duration-700 ease-out",
                      index === activeIndex ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  >
                    {item}
                  </span>
                ))}
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 md:gap-4">
              <button
                type="button"
                onClick={onPrimaryCta}
                className="bg-black text-white px-6 py-3 font-semibold rounded-md hover:bg-neutral-800 transition-colors"
              >
                {content.hero.cta}
              </button>
              <button
                type="button"
                onClick={onSecondaryCta}
                className="bg-white text-black px-6 py-3 font-semibold rounded-md border border-neutral-300 hover:border-neutral-500 transition-colors"
              >
                {content.hero.secondaryCta}
              </button>
              <button
                type="button"
                onClick={onTertiaryCta}
                className="text-sm md:text-base font-semibold underline underline-offset-4 text-neutral-800 hover:text-black transition-colors"
              >
                {content.hero.tertiaryCta}
              </button>
            </div>

            <p className="mt-4 text-xs md:text-sm text-neutral-700">
              {content.hero.microcopy}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
