"use client";

import { motion } from "framer-motion";
import { CodeTerminal } from "@/components/landing/ui/code-terminal";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

interface HeroSectionProps {
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
  onTertiaryCta: () => void;
  onImpactCta: () => void;
}

export function HeroSection({
  onPrimaryCta,
  onSecondaryCta,
  onTertiaryCta,
  onImpactCta,
}: HeroSectionProps) {
  const { content } = useLocale();
  const heroHighlights = content.hero.subheadline
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const coreHighlights = heroHighlights.slice(0, 3);
  const supportHighlights = heroHighlights.slice(3, 5);
  const hoverCardClass =
    "transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";

  return (
    <section id="hero">
      <div className="grid lg:grid-cols-2 min-h-[85vh]">
        {/* Left Panel - Yellow */}
        <div className="bg-background p-6 md:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-center relative overflow-hidden group min-w-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <Reveal>
            {/* Tagline - Fades in first */}
            <motion.div
              className="bg-white border-4 border-black p-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] w-max mb-6 md:mb-8 transform hover:rotate-0 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="font-black uppercase tracking-tight text-sm md:text-base">
                {content.hero.tagline}
              </span>
            </motion.div>

            {/* Main Headline: "AI INTEGRATION." - Types/fades up */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.95] mb-5 md:mb-6 tracking-tight text-balance break-words w-full max-w-full lg:max-w-[22ch]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              {content.hero.line1}
            </motion.h1>

            {/* Highlighted value points */}
            <motion.div
              className="mb-5 md:mb-6 max-w-[52ch] flex flex-col gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
            >
              {coreHighlights.map((line, index) => (
                <div
                  key={line}
                  className={[
                    "border-4 border-black px-4 py-3 md:px-5 md:py-3.5 text-base md:text-lg lg:text-xl font-semibold leading-[1.3] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                    hoverCardClass,
                    index === 0
                      ? "bg-[#059669] text-white hover:bg-[#047857]"
                      : "bg-white",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {line}
                </div>
              ))}
            </motion.div>

            {/* Outcomes */}
            <motion.ul
              className="mb-5 md:mb-7 flex flex-wrap items-center gap-x-6 md:gap-x-8 gap-y-2 text-base md:text-lg font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
            >
              {content.hero.outcomes.map((item) => (
                <li key={item} className="flex items-center gap-3 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 bg-black shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            {/* Audience chips */}
            <motion.div
              className="mb-6 md:mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85, ease: "easeOut" }}
            >
              <div className="font-black uppercase text-xs tracking-widest text-neutral-600 mb-3">
                {content.hero.audienceLabel}
              </div>
              <div className="flex flex-wrap gap-2">
                {content.hero.audienceChips.map((chip) => (
                  <span
                    key={chip}
                    className="bg-white border-2 border-black px-2.5 py-1.5 font-black uppercase text-[11px] md:text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={onPrimaryCta}
                className="bg-black text-white px-6 md:px-8 py-4 md:py-5 font-black uppercase shadow-[8px_8px_0px_0px_var(--primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--primary)] transition-all border-2 border-transparent text-base md:text-lg"
              >
                {content.hero.cta}
              </button>
              <button
                type="button"
                onClick={onSecondaryCta}
                className="bg-white text-black border-4 border-black px-6 md:px-8 py-4 md:py-5 font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-base md:text-lg"
              >
                {content.hero.secondaryCta}
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={onTertiaryCta}
                className="w-max font-black uppercase underline underline-offset-4 text-sm md:text-base hover:text-primary transition-colors"
              >
                {content.hero.tertiaryCta}
              </button>
              <p className="text-base md:text-lg font-medium opacity-80 max-w-2xl">
                {content.hero.microcopy}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right Panel */}
        <div className="bg-[#18181B] p-6 sm:p-8 md:p-16 pb-24 sm:pb-28 md:pb-16 border-b-4 border-black flex flex-col items-center justify-start relative overflow-hidden min-h-[560px] sm:min-h-[620px] lg:min-h-[700px] text-white">
          {/* Abstract Shapes */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10 w-14 md:w-24 h-14 md:h-24 bg-white border-4 border-black rounded-full animate-bounce duration-[3000ms] z-0"></div>

          {/* Accent Square */}
          <div className="absolute bottom-10 md:bottom-20 right-8 md:right-10 w-32 md:w-48 h-32 md:h-48 bg-primary border-4 border-black rotate-12 transition-transform hover:rotate-45 duration-700 z-0"></div>

          {/* AI Text - lower-left so it stays visible beneath terminal */}
          <div className="absolute left-6 sm:left-8 md:left-12 lg:left-16 bottom-10 sm:bottom-12 md:bottom-16 lg:bottom-20 opacity-[0.22] md:opacity-[0.16] font-black text-[120px] sm:text-[160px] md:text-[220px] lg:text-[260px] leading-none text-white pointer-events-none select-none z-[5]">
            AI
          </div>

          {/* Code Terminal - Top Center */}
          <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-2xl mb-6 lg:mb-8 mt-2">
            <div className="mb-4 flex justify-center">
              <span
                className={[
                  "inline-block bg-white text-black border-2 border-black px-4 py-2.5 font-black uppercase text-base md:text-lg shadow-[8px_8px_0px_0px_var(--primary)] rotate-[-1deg]",
                  hoverCardClass,
                ].join(" ")}
              >
                {content.hero.terminalLabel}
              </span>
            </div>
            <CodeTerminal />
          </div>

          <div className="relative z-20 w-full max-w-sm sm:max-w-md md:max-w-lg self-center sm:self-end sm:mr-6 md:mr-12 mt-2 md:mt-4 space-y-3 mb-2 md:mb-6">
            {supportHighlights.map((line, index) => (
              <Reveal key={line} delay={180 + index * 80}>
                <div
                  className={[
                    "border-4 p-4 md:p-5 font-black text-sm md:text-base leading-snug shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                    hoverCardClass,
                    index === 0
                      ? "bg-[#F4F4F5] text-black border-black"
                      : "bg-black text-white border-white",
                  ].join(" ")}
                >
                  {line}
                </div>
              </Reveal>
            ))}

            <Reveal delay={340}>
              <div
                className={[
                  "bg-white border-4 border-black p-4 md:p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                  hoverCardClass,
                ].join(" ")}
              >
                <h3 className="font-black text-lg md:text-xl mb-2 bg-black text-white inline-block px-2 py-1">
                  {content.hero.noDrama}
                </h3>
                <p className="font-bold text-sm md:text-base leading-snug border-t-4 border-black pt-2 text-black">
                  {content.hero.noDramaText}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Compact Impact Section */}
      <div className="bg-black border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-6 py-8 md:py-10 text-center">
          <h3 className="text-primary font-black text-2xl md:text-3xl uppercase tracking-tight mb-6">
            {content.hero.impactSection.text}
          </h3>
          <button
            type="button"
            onClick={onImpactCta}
            className="bg-primary text-primary-foreground px-8 py-4 font-black uppercase shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all border-2 border-white text-base md:text-lg"
          >
            {content.hero.impactSection.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
