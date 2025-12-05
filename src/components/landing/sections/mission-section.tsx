"use client";

import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

export function MissionSection() {
  const { content } = useLocale();
  const { mission } = content;

  return (
    <section
      id="mission"
      className="border-b-4 border-black bg-[#1a1a1a] py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          {/* Title - Standard brand styling */}
          <div className="mb-12 md:mb-16">
            <div className="inline-block bg-[#FFC805] border-4 border-black p-4 shadow-[6px_6px_0px_0px_white] rotate-1">
              <h2 className="text-3xl md:text-5xl font-black uppercase">
                {mission.title}
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Statement - Two column layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Statement text */}
          <Reveal delay={100}>
            <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#A855F7]">
              <div className="space-y-4">
                {mission.statement.map((line, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg font-bold text-neutral-800 leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: Tagline highlight */}
          <Reveal delay={200}>
            <div className="flex items-center justify-center h-full">
              <div className="bg-[#FFC805] px-8 py-6 md:px-12 md:py-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 hover:rotate-0 transition-transform">
                <span className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-black">
                  {mission.tagline}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
