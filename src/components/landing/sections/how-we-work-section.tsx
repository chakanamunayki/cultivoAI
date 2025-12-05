"use client";

import { RefreshCw, Sprout, Users } from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

const ICON_MAP: Record<string, typeof RefreshCw> = {
  RefreshCw,
  Sprout,
  Users,
};

export function HowWeWorkSection() {
  const { content } = useLocale();
  const { howWeWork } = content;

  // Separate pillars: first two side-by-side, third full-width
  const sideBySidePillars = howWeWork.pillars.filter((p) => !p.isFullWidth);
  const fullWidthPillar = howWeWork.pillars.find((p) => p.isFullWidth);

  return (
    <section
      id="how-we-work"
      className="border-b-4 border-black bg-white py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Standard brand styling */}
        <Reveal>
          <div className="flex flex-col md:flex-row gap-6 mb-12 md:mb-16 items-start">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none bg-black text-white px-4 py-2 inline-block rotate-1">
              {howWeWork.title}
            </h2>
            <p className="text-lg md:text-xl font-bold max-w-xl md:mt-2 border-l-4 border-[#A855F7] pl-4 md:pl-6">
              {howWeWork.subtitle}
            </p>
          </div>
        </Reveal>

        {/* Two side-by-side cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {sideBySidePillars.map((pillar, index) => {
            const Icon = ICON_MAP[pillar.icon] || RefreshCw;
            return (
              <Reveal key={pillar.title} delay={index * 100}>
                <div className="h-full bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-1 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#FFC805] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
                      <Icon size={28} className="text-black" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black uppercase">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Full-width card */}
        {fullWidthPillar && (
          <Reveal delay={200}>
            <div className="bg-[#C4F9E0] border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-1 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="p-3 bg-[#10B981] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform shrink-0 w-fit">
                  <Users size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black uppercase mb-2">
                    {fullWidthPillar.title}
                  </h3>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {fullWidthPillar.description}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
