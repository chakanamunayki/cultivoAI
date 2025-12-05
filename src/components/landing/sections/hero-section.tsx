"use client";

import dynamic from "next/dynamic";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

// Lazy load the tree animation for performance
const GrowingTree = dynamic(
  () => import("@/components/landing/ui/growing-tree").then((mod) => mod.GrowingTree),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[350px] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

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
            <div className="text-lg md:text-xl lg:text-2xl font-bold border-l-8 border-black pl-4 md:pl-6 mb-8 md:mb-10 bg-white/50 py-4 max-w-xl">
              {subheadlineLines.map((line, index) => (
                <p key={index} className={index > 0 ? "mt-2" : ""}>
                  {line}
                </p>
              ))}
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

        {/* Right Panel - Purple with Growing Tree Animation */}
        <div className="bg-[#A855F7] p-4 md:p-8 border-b-4 border-black flex items-center justify-center relative overflow-hidden min-h-[450px]">
          <Reveal delay={200} className="relative z-10 w-full h-full">
            <GrowingTree />
          </Reveal>
        </div>
      </div>

      {/* Hero Footer Bar */}
      <div className="bg-black border-b-4 border-black">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-4 px-6">
          <span className="text-[#FFC805] font-black text-sm md:text-base uppercase tracking-wide">
            {content.hero.footerBar.price}
          </span>
          <span className="hidden md:block text-white/40">|</span>
          <span className="text-white font-bold text-sm md:text-base">
            {content.hero.footerBar.impactRates}
          </span>
          <span className="hidden md:block text-white/40">|</span>
          <span className="text-white/80 font-medium text-sm md:text-base flex items-center gap-2">
            <span className="text-base">🇬🇧🇨🇴</span>
            {content.hero.footerBar.familyTagline}
          </span>
        </div>
      </div>
    </section>
  );
}
