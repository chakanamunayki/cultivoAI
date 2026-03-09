"use client";

import { Code2 } from "lucide-react";
import { useModal } from "@/components/landing/ui/modal-provider";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import { StackingServiceCards } from "@/components/landing/ui/stacking-service-cards";
import type { Service } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

interface ServicesSectionProps {
  onOpenChatBooking: () => void;
}

export function ServicesSection({ onOpenChatBooking }: ServicesSectionProps) {
  const { content, locale } = useLocale();
  const { openServiceModal } = useModal();
  const ribbonText = locale === "es" ? "Flujos + Dashboards + Web" : "Workflows + Dashboards + Web";

  const handleServiceSeeMore = (service: Service) => {
    openServiceModal(service);
  };

  return (
    <div id="services" className="border-b border-white/10 bg-[#212121]">
      <div className="mx-auto max-w-[1600px] p-6 md:p-12 lg:p-24">
        <Reveal>
          <SectionHeader
            title={content.servicesTitle}
            subtitle={ribbonText}
            subtitleClassName="text-white/80"
            tone="onDark"
          />
        </Reveal>

        <StackingServiceCards
          services={content.services}
          locale={locale}
          onSeeMore={handleServiceSeeMore}
          className="mt-2 md:mt-6"
        />

        <Reveal delay={300} className="mt-16 md:mt-24">
          <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-[26px] border border-white/15 bg-[#212121] p-6 text-[#FFFFFF] shadow-[0_16px_34px_rgba(0,0,0,0.34)] ring-1 ring-white/5 md:gap-12 md:p-8 lg:flex-row lg:p-12">
            <div className="absolute -top-16 -left-16 h-36 w-36 rounded-full bg-[#00BCD4]/25 opacity-70 blur-2xl" />

            <div className="z-10 w-full flex-1">
              <div className="mb-4 flex items-center gap-4 text-[#00BCD4]">
                <Code2 size={24} />
                <span className="font-mono text-base font-semibold md:text-lg">
                  SYSTEM.INIT_CALL()
                </span>
              </div>
              <p className="text-xl leading-tight font-semibold text-[#FFFFFF] md:text-2xl lg:text-3xl">
                {content.servicesSubtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenChatBooking}
              className="relative z-10 w-full rounded-xl bg-[#00BCD4] px-6 py-3.5 text-lg font-semibold tracking-[0.06em] text-[#FFFFFF] uppercase shadow-[0_14px_28px_rgba(15,23,42,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#00BCD4] hover:shadow-[0_18px_34px_rgba(15,23,42,0.3)] md:w-auto md:px-10 md:py-5 md:text-xl"
            >
              {locale === "es" ? "Agenda 15 minutos" : "Book a 15-minute call"}
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
