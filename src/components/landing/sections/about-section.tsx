"use client";

import Image from "next/image";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

export function AboutSection() {
  const { content } = useLocale();

  return (
    <div
      id="about"
      className="bg-white border-b-4 border-black p-6 md:p-12 lg:p-24 relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row gap-6 mb-12 md:mb-16 items-start">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none bg-black text-white px-4 py-2 inline-block rotate-1">
              {content.about.title}
            </h2>
            <p className="text-lg md:text-xl font-bold max-w-xl md:mt-2 border-l-4 border-[#A855F7] pl-4 md:pl-6">
              {content.about.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-24">
          {/* Paul */}
          <Reveal delay={100}>
            <div className="relative group">
              <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"></div>
              <div className="relative border-4 border-black bg-white p-4 h-full transform hover:-translate-y-2 transition-transform duration-300">
                <div className="aspect-[4/5] border-4 border-black overflow-hidden mb-6 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800"
                    alt="Paul"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase mb-2">
                  {content.about.paulTitle}
                </h3>
                <div className="bg-[#A855F7] text-white font-bold text-xs md:text-sm inline-block px-3 py-1 mb-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  ESTRATEGIA & NEGOCIOS
                </div>
                <p className="font-bold text-base md:text-lg leading-tight">
                  &quot;{content.about.paulDescription}&quot;
                </p>
              </div>
            </div>
          </Reveal>

          {/* Rocky */}
          <Reveal delay={200}>
            <div className="relative group mt-8 md:mt-0">
              <div className="absolute inset-0 bg-[#FFDE00] translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"></div>
              <div className="relative border-4 border-black bg-white p-4 h-full transform hover:-translate-y-2 transition-transform duration-300">
                <div className="aspect-[4/5] border-4 border-black overflow-hidden mb-6 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800"
                    alt="Rocky"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase mb-2">
                  {content.about.rockyTitle}
                </h3>
                <div className="bg-[#FFDE00] text-black font-bold text-xs md:text-sm inline-block px-3 py-1 mb-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  TECH & AI LEAD
                </div>
                <p className="font-bold text-base md:text-lg leading-tight">
                  &quot;{content.about.rockyDescription}&quot;
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
