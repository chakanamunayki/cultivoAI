"use client";

import { CodeTerminal } from "@/components/landing/ui/code-terminal";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

interface HeroSectionProps {
  onOpenChatBooking: () => void;
  onOpenChatStory: () => void;
}

export function HeroSection({ onOpenChatBooking, onOpenChatStory }: HeroSectionProps) {
  const { content } = useLocale();

  // Split subheadline by newlines for proper rendering
  const subheadlineLines = content.hero.subheadline.split("\n");

  return (
    <section id="hero">
      <div className="grid lg:grid-cols-2 min-h-[85vh]">
        {/* Left Panel - Yellow */}
        <div className="bg-[#FFC805] p-6 md:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <Reveal>
            <div className="bg-white border-4 border-black p-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] w-max mb-6 md:mb-8 transform hover:rotate-0 transition-transform duration-300">
              <span className="font-black uppercase tracking-tight text-sm md:text-base">
                {content.hero.tagline}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-black uppercase leading-[0.95] mb-6 md:mb-8 tracking-tight">
              {content.hero.headline}
            </h1>
            <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-2 hover:rotate-0 transition-transform duration-500 mb-8 md:mb-10 max-w-lg">
              <div className="space-y-3">
                {subheadlineLines.map((line, index) => (
                  <p key={index} className="font-black text-lg md:text-xl leading-tight">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenChatBooking}
                className="bg-black text-white px-6 md:px-8 py-4 md:py-5 font-black uppercase shadow-[8px_8px_0px_0px_#A855F7] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#A855F7] transition-all border-2 border-transparent text-base md:text-lg"
              >
                {content.hero.cta}
              </button>
              <button
                onClick={onOpenChatStory}
                className="bg-white text-black border-4 border-black px-6 md:px-8 py-4 md:py-5 font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-base md:text-lg"
              >
                {content.hero.secondaryCta}
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right Panel - Purple */}
        <div className="bg-[#A855F7] p-8 md:p-16 border-b-4 border-black flex flex-col items-center justify-center relative overflow-hidden min-h-[400px] lg:min-h-[600px]">
          {/* Abstract Shapes */}
          <div className="absolute top-10 left-10 w-16 md:w-24 h-16 md:h-24 bg-white border-4 border-black rounded-full animate-bounce duration-[3000ms] z-0"></div>

          {/* Yellow Square */}
          <div className="absolute bottom-20 right-10 w-32 md:w-48 h-32 md:h-48 bg-[#FFC805] border-4 border-black rotate-12 transition-transform hover:rotate-45 duration-700 z-0"></div>

          {/* AI Text */}
          <div className="absolute bottom-24 right-[160px] md:right-[240px] opacity-20 font-black text-[100px] md:text-[200px] leading-none text-white pointer-events-none select-none z-0">
            AI
          </div>

          {/* Code Terminal - Top Center */}
          <div className="relative z-10 w-full max-w-2xl mb-6 lg:mb-8">
            <CodeTerminal />
          </div>

          {/* No Drama Box - Bottom */}
          <Reveal delay={200} className="relative z-10 w-full max-w-sm">
            <div className="bg-white border-4 border-black p-5 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-3 hover:rotate-0 transition-transform duration-500 relative z-20">
              <h3 className="font-black text-xl md:text-2xl mb-3 bg-black text-white inline-block px-3 py-1 -rotate-2">
                {content.hero.noDrama}
              </h3>
              <p className="font-bold text-base md:text-lg leading-snug border-t-4 border-black pt-3">
                {content.hero.noDramaText}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Hero Footer Bar */}
      <div className="bg-black border-b-4 border-black">
        <div className="max-w-5xl mx-auto px-6 py-8 md:py-10">
          <div className="text-center space-y-4">
            <h3 className="text-[#FFC805] font-black text-xl md:text-2xl uppercase tracking-tight">
              {content.hero.footerBar.price}
            </h3>
            <p className="text-white font-medium text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              {content.hero.footerBar.impactRates}
            </p>
            <p className="text-white/90 font-bold text-base md:text-lg pt-2">
              {content.hero.footerBar.familyTagline}
            </p>
            <div className="pt-4">
              <button
                onClick={onOpenChatBooking}
                className="bg-[#FFC805] text-black px-8 py-4 font-black uppercase shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all border-2 border-white text-base md:text-lg"
              >
                {content.hero.footerBar.ctaButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
