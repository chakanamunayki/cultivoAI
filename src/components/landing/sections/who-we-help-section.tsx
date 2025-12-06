"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  GraduationCap,
  Heart,
  Home,
  Rocket,
  Sprout,
  X,
  Users,
  Wrench,
  Lightbulb,
} from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";
import type { Sector } from "@/content/types";

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
  const { content, locale } = useLocale();
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
              {content.whoWeHelp.sectors.map((sector, i) => {
                const IconComponent = iconMap[sector.icon] || Rocket;
                return (
                  <div
                    key={i}
                    className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 group overflow-hidden flex flex-col"
                  >
                    {/* Icon Header - More prominent */}
                    <div className="h-28 md:h-32 bg-gradient-to-br from-[#A855F7] to-[#9333EA] border-b-4 border-black relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <IconComponent
                        size={56}
                        className="text-white group-hover:scale-110 transition-transform duration-300 relative z-10"
                        strokeWidth={1.5}
                      />
                      {/* Badge */}
                      {sector.badge && (
                        <div className="absolute top-2 left-2 bg-[#10B981] text-white text-[10px] font-black px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 uppercase">
                          <Check size={10} className="shrink-0" strokeWidth={3} />
                          {sector.badge}
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-4 md:p-5 flex flex-col flex-grow bg-white">
                      <h4 className="font-black uppercase text-base md:text-lg mb-2 group-hover:text-[#A855F7] transition-colors leading-tight">
                        {sector.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">
                        {sector.description}
                      </p>
                      {/* Action Buttons */}
                      <div className="space-y-2 mt-auto">
                        {sector.detailsButtonLabel && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSector(sector);
                            }}
                            className="w-full bg-black text-white text-xs font-bold py-2.5 px-3 border-2 border-black shadow-[3px_3px_0px_0px_#A855F7] hover:shadow-[1px_1px_0px_0px_#A855F7] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 uppercase"
                          >
                            {sector.detailsButtonLabel}
                            <ArrowRight size={14} />
                          </button>
                        )}
                        {sector.chatButtonLabel && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenChatWithSector?.(sector.name);
                            }}
                            className="w-full bg-[#A855F7] text-white text-xs font-bold py-2.5 px-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 uppercase"
                          >
                            {sector.chatButtonLabel}
                            <ArrowRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Sector Details Modal */}
        {selectedSector && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={() => setSelectedSector(null)}
          >
            <div
              className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#A855F7] max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-[#A855F7] p-4 md:p-6 border-b-4 border-black flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {(() => {
                    const IconComponent = iconMap[selectedSector.icon] || Rocket;
                    return (
                      <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <IconComponent size={24} className="text-[#A855F7]" />
                      </div>
                    );
                  })()}
                  <h3 className="text-xl md:text-2xl font-black uppercase text-white">
                    {selectedSector.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSector(null)}
                  className="w-10 h-10 bg-white border-4 border-black flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  <X size={20} strokeWidth={3} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 md:p-6 space-y-6">
                {/* Description */}
                <p className="text-lg font-medium text-gray-700 border-l-4 border-[#A855F7] pl-4">
                  {selectedSector.description}
                </p>

                {/* Who We Help */}
                {selectedSector.whoWeHelp && selectedSector.whoWeHelp.length > 0 && (
                  <div className="bg-[#C4F9E0] border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2 mb-4">
                      <Users size={20} className="text-green-700" />
                      <h4 className="font-black uppercase text-green-800">
                        {locale === "es" ? "A quienes ayudamos" : "Who we help"}
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {selectedSector.whoWeHelp.map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <Check size={16} className="shrink-0 mt-0.5 text-green-700" strokeWidth={3} />
                          <span className="text-sm font-medium text-green-900">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* How We Help */}
                {selectedSector.howWeHelp && selectedSector.howWeHelp.length > 0 && (
                  <div className="bg-[#FFDE00] border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2 mb-4">
                      <Wrench size={20} className="text-black" />
                      <h4 className="font-black uppercase text-black">
                        {locale === "es" ? "Como ayudamos" : "How we help"}
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {selectedSector.howWeHelp.map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <Check size={16} className="shrink-0 mt-0.5 text-black" strokeWidth={3} />
                          <span className="text-sm font-bold text-black">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Example Projects */}
                {selectedSector.exampleProjects && selectedSector.exampleProjects.length > 0 && (
                  <div className="bg-neutral-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb size={20} className="text-purple-600" />
                      <h4 className="font-black uppercase text-gray-800">
                        {locale === "es" ? "Ejemplos de proyectos" : "Example projects"}
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {selectedSector.exampleProjects.map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="w-5 h-5 bg-[#A855F7] text-white text-xs font-black flex items-center justify-center border-2 border-black shrink-0">
                            {i + 1}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                {selectedSector.chatButtonLabel && (
                  <button
                    onClick={() => {
                      setSelectedSector(null);
                      onOpenChatWithSector?.(selectedSector.name);
                    }}
                    className="w-full bg-[#A855F7] text-white font-black uppercase py-4 px-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-lg"
                  >
                    {selectedSector.chatButtonLabel}
                    <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

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
