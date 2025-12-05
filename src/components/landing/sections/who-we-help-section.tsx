"use client";

import {
  ArrowRight,
  Check,
  GraduationCap,
  Heart,
  Home,
  Rocket,
  Sprout,
  X,
} from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

const iconMap: Record<string, React.ElementType> = {
  Sprout,
  Heart,
  GraduationCap,
  Home,
  Rocket,
};

interface WhoWeHelpSectionProps {
  onOpenChatQualification: () => void;
  onOpenChatWithSector?: (sectorName: string) => void;
}

export function WhoWeHelpSection({
  onOpenChatQualification,
  onOpenChatWithSector,
}: WhoWeHelpSectionProps) {
  const { content } = useLocale();

  return (
    <section
      id="who-we-help"
      className="border-b-4 border-black bg-white py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Title - matching Partnerships section style */}
        <Reveal>
          <div className="mb-12 md:mb-16 text-center">
            <div className="inline-block bg-[#FFDE00] border-4 border-black p-4 shadow-[6px_6px_0px_0px_black] rotate-1 mb-6">
              <h2 className="text-3xl md:text-5xl font-black uppercase">
                {content.whoWeHelp.title}
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Ideal / Not Ideal Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          {/* Ideal for you if... */}
          <Reveal>
            <div className="bg-[#C4F9E0] border-4 border-black p-6 md:p-8 lg:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 md:mb-8 decoration-4 underline decoration-green-600 underline-offset-4">
                {content.whoWeHelp.idealTitle}
              </h3>
              <ul className="space-y-4">
                {content.whoWeHelp.idealItems.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <Check
                      size={24}
                      className="shrink-0 text-white border-4 border-black bg-green-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform"
                    />
                    <span className="font-bold text-base md:text-lg group-hover:text-green-800 transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Not ideal if... */}
          <Reveal delay={200}>
            <div className="bg-neutral-100 border-4 border-black p-6 md:p-8 lg:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 md:mb-8 decoration-4 underline decoration-red-500 underline-offset-4">
                {content.whoWeHelp.notIdealTitle}
              </h3>
              <ul className="space-y-4">
                {content.whoWeHelp.notIdealItems.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <X
                      size={24}
                      className="shrink-0 text-white border-4 border-black bg-red-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform"
                    />
                    <span className="font-bold text-base md:text-lg group-hover:text-red-600 transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Sectors We Love */}
        <Reveal delay={300}>
          <div className="bg-[#FFC805] border-4 border-black p-6 md:p-8 lg:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {/* Section Title with decorative style */}
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-block bg-black text-white px-6 py-3 -rotate-1 shadow-[4px_4px_0px_0px_#A855F7]">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase">
                  {content.whoWeHelp.sectorsTitle}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              {content.whoWeHelp.sectors.map((sector, i) => {
                const IconComponent = iconMap[sector.icon] || Rocket;
                return (
                  <div
                    key={i}
                    className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-1 transition-all group overflow-hidden flex flex-col"
                  >
                    {/* Placeholder Image */}
                    <div className="h-32 md:h-40 bg-gradient-to-br from-[#A855F7]/20 to-[#10B981]/20 border-b-4 border-black relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <IconComponent
                          size={64}
                          className="text-[#A855F7]/40 group-hover:text-[#A855F7]/60 group-hover:scale-110 transition-all"
                        />
                      </div>
                      {/* Badge */}
                      {sector.badge && (
                        <div className="absolute top-2 left-2 bg-[#10B981] text-white text-[10px] md:text-xs font-bold px-2 py-1 border-2 border-black flex items-center gap-1">
                          <Check size={12} className="shrink-0" />
                          {sector.badge}
                        </div>
                      )}
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-[#FFC805] border-l-4 border-b-4 border-black" />
                    </div>
                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="font-black uppercase text-sm md:text-base mb-2 group-hover:text-[#A855F7] transition-colors">
                        {sector.name}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-700 mb-4 flex-grow">
                        {sector.description}
                      </p>
                      {/* Chat Button */}
                      {sector.chatButtonLabel && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenChatWithSector?.(sector.name);
                          }}
                          className="w-full bg-[#A855F7] text-white text-xs md:text-sm font-bold py-2 px-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-1"
                        >
                          {sector.chatButtonLabel}
                          <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={400}>
          <div className="text-center mt-12 md:mt-16">
            <p className="text-lg md:text-xl font-bold mb-6">
              {content.whoWeHelp.cta}
            </p>
            <button
              onClick={onOpenChatQualification}
              className="bg-[#A855F7] text-white font-black uppercase px-8 py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-1 transition-all text-lg"
            >
              {content.whoWeHelp.ctaButton}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
