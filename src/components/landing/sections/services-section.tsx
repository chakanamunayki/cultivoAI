"use client";

import {
  BarChart3,
  Code2,
  Layers,
  MessageSquare,
  Monitor,
  Rocket,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useModal } from "@/components/landing/ui/modal-provider";
import { Reveal } from "@/components/landing/ui/reveal";
import type { Service } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  MessageSquare,
  BarChart3,
  Layers,
  Monitor,
  Rocket,
};

function getServiceIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] || Zap;
}

export function ServicesSection() {
  const { content } = useLocale();
  const { openServiceModal, openContactModal } = useModal();

  const handleServiceClick = (service: Service) => {
    openServiceModal(service);
  };

  return (
    <div id="services" className="border-b-4 border-black bg-[#FFDE00]">
      <div className="p-6 md:p-12 lg:p-24 max-w-[1600px] mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8 border-b-4 border-black pb-8">
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              {content.servicesTitle.split(" ")[0]}
              <br />
              <span className="text-white text-stroke-3 text-stroke-black">
                {content.servicesTitle.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <div className="bg-black text-white px-4 md:px-6 py-2 md:py-3 font-bold uppercase rotate-2 text-lg md:text-xl shadow-[4px_4px_0px_0px_white]">
              Full Stack + AI
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((service, i) => {
            const IconComponent = getServiceIcon(service.icon);
            return (
              <Reveal key={i} delay={i * 100}>
                <div
                  className="group relative h-full cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300"></div>
                  <div className="relative border-4 border-black bg-white p-6 md:p-8 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-[#A855F7] border-2 border-black rounded-none group-hover:bg-[#FFDE00] transition-colors duration-300 group-hover:animate-bounce">
                          <IconComponent
                            size={28}
                            className="text-white group-hover:text-black transition-colors md:w-8 md:h-8"
                          />
                        </div>
                        <span className="font-black text-4xl md:text-5xl opacity-10 text-black">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="font-black text-xl md:text-2xl uppercase mb-2 leading-none">
                        {service.title}
                      </h3>
                      <p className="font-bold text-xs uppercase mb-6 text-[#A855F7] tracking-wider">
                        {service.eng}
                      </p>
                    </div>
                    <p className="font-bold border-t-4 border-black pt-4 text-base md:text-lg leading-snug">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Brutalist CTA */}
        <Reveal delay={300} className="mt-16 md:mt-24">
          <div className="bg-black text-white p-6 md:p-8 lg:p-12 border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] md:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.5)] flex flex-col lg:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#FFDE00] rounded-full blur-xl opacity-20 animate-pulse"></div>

            <div className="flex-1 z-10 w-full">
              <div className="flex items-center gap-4 mb-4 text-[#FFDE00]">
                <Code2 size={24} />
                <span className="font-mono font-bold text-base md:text-lg">
                  SYSTEM.INIT_CALL()
                </span>
              </div>
              <p className="font-bold text-xl md:text-2xl lg:text-3xl leading-tight">
                {content.servicesSubtitle}
              </p>
            </div>

            <button
              onClick={openContactModal}
              className="w-full lg:w-auto relative z-10 bg-[#FFDE00] text-black font-black uppercase text-lg md:text-xl px-6 md:px-10 py-4 md:py-6 border-4 border-transparent hover:border-white hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_#A855F7] md:shadow-[8px_8px_0px_0px_#A855F7]"
            >
              Agenda 15 Minutos
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
