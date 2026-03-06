"use client";

import Image from "next/image";
import { Briefcase, HeartHandshake, PieChart, type LucideIcon } from "lucide-react";
import { useModal } from "@/components/landing/ui/modal-provider";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import type { Partnership } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

const PARTNERSHIP_ICON_MAP: Record<string, LucideIcon> = {
  Briefcase,
  HeartHandshake,
  PieChart,
};

function getPartnershipIcon(iconName: string): LucideIcon {
  return PARTNERSHIP_ICON_MAP[iconName] || Briefcase;
}

interface PartnershipsSectionProps {
  onOpenChatGeneral: () => void;
}

export function PartnershipsSection({ onOpenChatGeneral }: PartnershipsSectionProps) {
  const { content, locale } = useLocale();
  const { openPartnershipModal } = useModal();
  const impactCardCta =
    locale === "es" ? "Proponer proyecto de impacto" : "Propose an impact project";

  const handlePartnershipClick = (partnership: Partnership) => {
    openPartnershipModal(partnership);
  };

  return (
    <div id="partnerships" className="border-b border-white/10 bg-[#212121]">
      <div className="mx-auto max-w-[1600px] p-6 md:p-12 lg:p-24">
        <Reveal>
          <SectionHeader
            title={content.partnershipsTitle}
            subtitle={content.partnershipsSubtitle}
            subtitleClassName="max-w-2xl text-white/80"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.partnerships.map((partner, i) => {
            const IconComponent = getPartnershipIcon(partner.icon);

            return (
              <Reveal key={i} delay={i * 100}>
                <article
                  className={`group flex h-full w-full flex-col justify-between overflow-hidden rounded-[22px] border p-6 text-left transition-all duration-200 ${
                    i === 1
                      ? "border-[#00BCD4] bg-[#00BCD4] text-[#FFFFFF] shadow-[0_16px_30px_rgba(15,23,42,0.22)] hover:-translate-y-1 hover:bg-[#00BCD4] hover:shadow-[0_20px_36px_rgba(15,23,42,0.28)]"
                      : "border-white/15 bg-[#212121] text-[#FFFFFF] shadow-[0_14px_28px_rgba(0,0,0,0.3)] ring-1 ring-white/5 hover:-translate-y-1 hover:bg-[#1b1b1b] hover:shadow-[0_18px_34px_rgba(0,0,0,0.4)]"
                  }`}
                >
                  <div>
                    {partner.imageUrl ? (
                      <div className="relative mb-4 aspect-[3/2] w-full overflow-hidden rounded-[16px] border border-black/10 bg-neutral-200">
                        <Image
                          src={partner.imageUrl}
                          alt={partner.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute bottom-3 left-3 rounded-lg border border-white/50 bg-white/90 p-2 shadow-[0_8px_16px_rgba(15,23,42,0.2)]">
                          <IconComponent size={18} className="text-[#00BCD4]" />
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`mb-4 inline-flex rounded-lg border p-3 ${
                          i === 1
                            ? "border-white/25 bg-white/10 text-[#FFFFFF]"
                            : "border-white/20 bg-white/10 text-[#FFFFFF]"
                        }`}
                      >
                        <IconComponent size={24} />
                      </div>
                    )}
                    <h3 className="mb-2 text-xl leading-tight font-black tracking-tight">
                      {partner.name}
                    </h3>
                    <p
                      className={`mb-4 text-sm font-medium ${
                        i === 1 ? "text-[#eef9f5]" : "text-white/80"
                      }`}
                    >
                      {partner.tagline}
                    </p>
                    <p
                      className={`mb-4 text-sm leading-relaxed ${
                        i === 1 ? "text-[#e6f6f0]" : "text-white/85"
                      }`}
                    >
                      {partner.description}
                    </p>
                    {partner.idealFor[0] && (
                      <p
                        className={`text-sm font-medium ${
                          i === 1 ? "text-[#FFFFFF]" : "text-white/75"
                        }`}
                      >
                        {partner.idealFor[0]}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 space-y-2">
                    <button
                      type="button"
                      onClick={() => handlePartnershipClick(partner)}
                      className={`w-full rounded-lg px-4 py-2.5 text-center text-xs font-semibold tracking-[0.07em] uppercase transition-all ${
                        i === 1
                          ? "bg-[#00BCD4] text-[#FFFFFF] hover:bg-[#00BCD4]"
                          : "bg-[#00BCD4] text-[#FFFFFF] hover:bg-[#00BCD4]"
                      }`}
                    >
                      {locale === "es" ? "Ver detalles ->" : "View details ->"}
                    </button>
                    {i === 1 && (
                      <button
                        type="button"
                        onClick={onOpenChatGeneral}
                        className="w-full rounded-lg bg-[#1f1f1f] px-4 py-2.5 text-center text-xs font-semibold tracking-[0.07em] text-[#FFFFFF] uppercase transition-all hover:bg-[#111]"
                      >
                        {impactCardCta}
                      </button>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={300} className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenChatGeneral}
            className="rounded-xl bg-[#1f1f1f] px-8 py-3.5 text-lg font-semibold tracking-[0.06em] text-white uppercase shadow-[0_14px_28px_rgba(17,24,39,0.26)] transition-all hover:-translate-y-0.5 hover:bg-[#111] hover:shadow-[0_18px_34px_rgba(17,24,39,0.32)]"
          >
            {locale === "es"
              ? "Tienes un presupuesto ajustado? Hablemos."
              : "Working with a tight budget? Let's talk."}
          </button>
        </Reveal>
      </div>
    </div>
  );
}
