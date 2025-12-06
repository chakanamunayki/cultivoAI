"use client";

import {
  Briefcase,
  HeartHandshake,
  Hourglass,
  PieChart,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useModal } from "@/components/landing/ui/modal-provider";
import { Reveal } from "@/components/landing/ui/reveal";
import type { Partnership } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

const PARTNERSHIP_ICON_MAP: Record<string, LucideIcon> = {
  Briefcase,
  HeartHandshake,
  Hourglass,
  TrendingUp,
  PieChart,
};

function getPartnershipIcon(iconName: string): LucideIcon {
  return PARTNERSHIP_ICON_MAP[iconName] || Briefcase;
}

interface PartnershipsSectionProps {
  onOpenChatGeneral: () => void;
}

export function PartnershipsSection({ onOpenChatGeneral }: PartnershipsSectionProps) {
  const { content } = useLocale();
  const { openPartnershipModal } = useModal();

  const handlePartnershipClick = (partnership: Partnership) => {
    openPartnershipModal(partnership);
  };

  return (
    <div id="partnerships" className="bg-[#E5E7EB] border-b-4 border-black">
      <div className="p-6 md:p-12 lg:p-24 max-w-[1600px] mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-16">
            <div className="inline-block bg-[#FFDE00] border-4 border-black p-4 shadow-[6px_6px_0px_0px_black] rotate-1 mb-6">
              <h2 className="text-3xl md:text-5xl font-black uppercase">
                {content.partnershipsTitle}
              </h2>
            </div>
            <p className="font-bold text-lg md:text-xl max-w-2xl border-l-8 border-[#A855F7] pl-6 py-2 bg-white/50">
              {content.partnershipsSubtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {content.partnerships.map((partner, i) => {
            const IconComponent = getPartnershipIcon(partner.icon);

            return (
              <Reveal key={i} delay={i * 100}>
                <div
                  onClick={() => handlePartnershipClick(partner)}
                  className="group bg-white border-4 border-black p-6 h-full hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_black] transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-4 bg-black text-white p-3 inline-block transform -rotate-2 group-hover:rotate-0 transition-transform">
                      <IconComponent size={24} />
                    </div>
                    <h3 className="font-black text-xl uppercase leading-tight mb-2">
                      {partner.name}
                    </h3>
                    <p className="font-bold text-sm text-neutral-600 border-t-4 border-black pt-2 mb-4">
                      {partner.tagline}
                    </p>
                  </div>
                  <div className="bg-black text-white font-black uppercase text-xs p-2 text-center border-t-4 border-black">
                    Ver Detalles →
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={300} className="mt-12 text-center">
          <button
            onClick={onOpenChatGeneral}
            className="bg-black text-white border-4 border-transparent px-8 py-4 font-black uppercase text-lg shadow-[8px_8px_0px_0px_#A855F7] hover:bg-white hover:text-black hover:border-black hover:shadow-[4px_4px_0px_0px_#A855F7] transition-all"
          >
            Presupuesto Limitado? Hablemos.
          </button>
        </Reveal>
      </div>
    </div>
  );
}
