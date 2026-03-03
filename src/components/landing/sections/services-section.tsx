"use client";

import Image from "next/image";
import {
  BarChart3,
  CalendarCheck,
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
  CalendarCheck,
  Layers,
  Monitor,
  Rocket,
};

function getServiceIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] || Zap;
}

interface ServicesSectionProps {
  onOpenChatBooking: () => void;
}

export function ServicesSection({ onOpenChatBooking }: ServicesSectionProps) {
  const { content, locale } = useLocale();
  const { openServiceModal } = useModal();
  const ribbonText =
    locale === "es" ? "Flujos + Dashboards + Web" : "Workflows + Dashboards + Web";

  const handleServiceClick = (service: Service) => {
    openServiceModal(service);
  };

  return (
    <div id="services" className="border-b-4 border-black bg-background">
      <div className="p-6 md:p-12 lg:p-24 max-w-[1600px] mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8 border-b-4 border-black pb-8">
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              {content.servicesTitle.split(" ")[0]}
              <br />
              <span className="text-primary">
                {content.servicesTitle.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <div className="bg-black text-white px-4 md:px-6 py-2 md:py-3 font-bold uppercase rotate-2 text-lg md:text-xl shadow-[4px_4px_0px_0px_white]">
              {ribbonText}
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((service, i) => {
            const IconComponent = getServiceIcon(service.icon);
            const isRetreatOps = service.title === "Retreat Ops Systems";
            const detailPreviewCount =
              service.title === "AI Assistants" ||
              service.title === "Knowledge and Content Systems"
                ? 3
                : 2;
            const retreatCopyLines = [...service.details, service.description].filter(Boolean);
            return (
              <Reveal key={i} delay={i * 100}>
                <button
                  type="button"
                  className="group relative h-full cursor-pointer text-left w-full"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300"></div>
                  <div className="relative border-4 border-black bg-white h-full flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                    <div className="relative w-full aspect-[16/9] border-b-4 border-black bg-neutral-200">
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                      <div className="absolute top-4 right-4 bg-black text-white border-2 border-black px-3 py-1 font-black text-sm md:text-base shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)]">
                        0{i + 1}
                      </div>

                      <div className="absolute bottom-4 left-4 p-2.5 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <IconComponent size={18} className="text-black" />
                      </div>
                    </div>

                    <div className="p-6 md:p-8 h-full flex flex-col">
                      <h3 className="font-black text-xl md:text-2xl uppercase mb-2 leading-none">
                        {service.title}
                      </h3>
                      <p className="font-bold text-xs uppercase mb-5 text-primary tracking-wider">
                        {service.eng}
                      </p>

                      {isRetreatOps ? (
                        <div className="mt-auto border-t-4 border-black pt-4 space-y-2">
                          {retreatCopyLines.map((line) => (
                            <p key={line} className="font-bold text-sm md:text-base leading-snug">
                              {line}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <>
                          <ul className="space-y-2 mb-6">
                            {service.details.slice(0, detailPreviewCount).map((detail) => (
                              <li key={detail} className="flex gap-3 items-start">
                                <span className="mt-1.5 w-3 h-3 bg-black shrink-0" />
                                <span className="font-bold text-sm md:text-base leading-snug">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <p className="mt-auto font-bold border-t-4 border-black pt-4 text-base md:text-lg leading-snug">
                            {service.description}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Brutalist CTA */}
        <Reveal delay={300} className="mt-16 md:mt-24">
          <div className="bg-black text-white p-6 md:p-8 lg:p-12 border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] md:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.5)] flex flex-col lg:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary rounded-full blur-xl opacity-15 animate-pulse"></div>

            <div className="flex-1 z-10 w-full">
              <div className="flex items-center gap-4 mb-4 text-primary">
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
              type="button"
              onClick={onOpenChatBooking}
              className="w-full lg:w-auto relative z-10 bg-primary text-primary-foreground font-black uppercase text-lg md:text-xl px-6 md:px-10 py-4 md:py-6 border-4 border-transparent hover:border-white hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_var(--primary)] md:shadow-[8px_8px_0px_0px_var(--primary)]"
            >
              {locale === "es" ? "Agenda 15 minutos" : "Book a 15-minute call"}
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
