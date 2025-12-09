"use client";

import { motion } from "framer-motion";
import { CodeTerminal } from "@/components/landing/ui/code-terminal";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

interface HeroSectionProps {
  onOpenChatBooking: () => void;
  onOpenChatStory: () => void;
  onOpenChatImpact: () => void;
  onOpenServiceModal: (serviceTitle: string) => void;
}

export function HeroSection({ onOpenChatBooking, onOpenChatStory, onOpenChatImpact, onOpenServiceModal }: HeroSectionProps) {
  const { content } = useLocale();

  return (
    <section id="hero">
      <div className="grid lg:grid-cols-2 min-h-[85vh]">
        {/* Left Panel - Yellow */}
        <div className="bg-[#FFC805] p-6 md:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-center relative overflow-hidden group">
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
              className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-tight mb-6 md:mb-8 tracking-tight whitespace-nowrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              {content.hero.line1}
            </motion.h1>

            {/* Services: Brutalist tags that stagger in and open modals */}
            <div className="flex flex-wrap gap-3 mb-6 md:mb-8 items-center">
              {content.hero.services?.map((service, index) => (
                <motion.div
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.7 + index * 0.15,
                    ease: "backOut",
                  }}
                >
                  <button
                    onClick={() => onOpenServiceModal(service)}
                    className="bg-white border-2 border-black px-3 py-1.5 md:px-4 md:py-2 font-black uppercase text-xs md:text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all inline-block cursor-pointer"
                  >
                    {service}
                  </button>
                </motion.div>
              ))}
              <motion.span
                className="font-black text-xl md:text-2xl text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.7 + (content.hero.services?.length || 0) * 0.15 + 0.2,
                  ease: "easeOut",
                }}
              >
                {content.hero.servicesDone}
              </motion.span>
            </div>

            {/* Audience line: Words stagger in */}
            <div className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 leading-tight">
              {content.hero.audience?.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 1.0 + index * 0.2,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Differentiator line - Fades in last, lighter weight */}
            <motion.p
              className="text-lg md:text-xl font-medium opacity-70 mb-8 md:mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{
                duration: 0.5,
                delay: 1.0 + (content.hero.audience?.length || 0) * 0.2,
                ease: "easeOut",
              }}
            >
              {content.hero.line3}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenChatBooking}
                className="bg-black text-white px-6 md:px-8 py-4 md:py-5 font-black uppercase shadow-[8px_8px_0px_0px_#43B316] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#43B316] transition-all border-2 border-transparent text-base md:text-lg"
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

        {/* Right Panel - Green */}
        <div className="bg-[#437D2C] p-8 md:p-16 border-b-4 border-black flex flex-col items-center justify-center relative overflow-hidden min-h-[400px] lg:min-h-[600px]">
          {/* Abstract Shapes */}
          <div className="absolute top-10 left-10 w-16 md:w-24 h-16 md:h-24 bg-white border-4 border-black rounded-full animate-bounce duration-[3000ms] z-0"></div>

          {/* Yellow Square */}
          <div className="absolute bottom-20 right-10 w-32 md:w-48 h-32 md:h-48 bg-[#FFC805] border-4 border-black rotate-12 transition-transform hover:rotate-45 duration-700 z-0"></div>

          {/* AI Text - LARGE, VISIBLE TO LEFT OF BOX */}
          <div className="absolute bottom-16 left-8 md:left-16 lg:left-24 opacity-30 font-black text-[140px] md:text-[200px] lg:text-[280px] leading-none text-white pointer-events-none select-none z-10">
            AI
          </div>

          {/* Code Terminal - Top Center */}
          <div className="relative z-10 w-full max-w-2xl mb-6 lg:mb-8">
            <CodeTerminal />
          </div>

          {/* No Drama Box - Bottom Right, Smaller */}
          <Reveal delay={200} className="relative z-20 w-full max-w-[280px] ml-auto mr-6 md:mr-12">
            <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-3 hover:rotate-0 transition-transform duration-500">
              <h3 className="font-black text-lg md:text-xl mb-2 bg-black text-white inline-block px-2 py-1 -rotate-2">
                {content.hero.noDrama}
              </h3>
              <p className="font-bold text-sm md:text-base leading-snug border-t-4 border-black pt-2">
                {content.hero.noDramaText}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Compact Impact Section */}
      <div className="bg-black border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-6 py-8 md:py-10 text-center">
          <h3 className="text-[#FFC805] font-black text-2xl md:text-3xl uppercase tracking-tight mb-6">
            {content.hero.impactSection.text}
          </h3>
          <button
            onClick={onOpenChatImpact}
            className="bg-[#FFC805] text-black px-8 py-4 font-black uppercase shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all border-2 border-white text-base md:text-lg"
          >
            {content.hero.impactSection.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
