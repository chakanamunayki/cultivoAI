"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  GraduationCap,
  Heart,
  Home,
  Rocket,
  Sprout,
  X,
  Lightbulb,
} from "lucide-react";
import {
  landingCardClass,
  landingPrimaryBlueButtonClass,
  landingPrimaryDarkButtonClass,
  landingTitleBandClass,
  type LandingCardVariant,
} from "@/components/landing/ui/landing-card-styles";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import type { Sector } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

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

  const whatItMeansLabel = locale === "es" ? "Que significa" : "What it means";
  const whyItMattersLabel = locale === "es" ? "Por que importa" : "Why it matters";
  const includedLabel = locale === "es" ? "Que incluye" : "What's included";
  const idealFitLabel = locale === "es" ? "Ideal para" : "Ideal fit";
  const outcomeLabel = locale === "es" ? "Resultado tipico" : "Typical outcome";
  const sectionSubtitle =
    locale === "es"
      ? "Sectores y equipos con los que generamos mayor impacto"
      : "Sectors and teams where we create the most impact";

  return (
    <section id="who-we-help" className="border-b border-black/10 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section Title */}
        <Reveal>
          <SectionHeader
            title={content.whoWeHelp.title}
            subtitle={sectionSubtitle}
            subtitleClassName="max-w-2xl"
          />
        </Reveal>

        {/* Ideal / Not Ideal Grid */}
        <div className="mb-16 grid gap-8 md:mb-20 md:grid-cols-2 md:gap-12">
          {/* Ideal for you if... */}
          <Reveal>
            <div className={landingCardClass("blue", "rounded-[24px] p-6 hover:-translate-y-1 md:p-8 lg:p-10")}>
              <h3
                className={landingTitleBandClass(
                  "blue",
                  "-mx-6 mb-6 px-6 py-3 text-2xl font-black tracking-tight uppercase md:-mx-8 md:mb-8 md:px-8 md:text-3xl lg:-mx-10 lg:px-10"
                )}
              >
                {content.whoWeHelp.idealTitle}
              </h3>
              <ul className="space-y-4">
                {content.whoWeHelp.idealItems.map((item, i) => (
                  <li key={i} className="group flex items-start gap-4">
                    <Check
                      size={24}
                      className="shrink-0 rounded-lg border border-white/25 bg-white/10 p-1 text-[#FFFFFF] transition-transform group-hover:scale-105"
                    />
                    <span className="text-base font-semibold transition-colors group-hover:text-white md:text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Not ideal if... */}
          <Reveal delay={200}>
            <div className={landingCardClass("dark", "rounded-[24px] p-6 hover:-translate-y-1 md:p-8 lg:p-10")}>
              <h3
                className={landingTitleBandClass(
                  "dark",
                  "-mx-6 mb-6 px-6 py-3 text-2xl font-black tracking-tight uppercase md:-mx-8 md:mb-8 md:px-8 md:text-3xl lg:-mx-10 lg:px-10"
                )}
              >
                {content.whoWeHelp.notIdealTitle}
              </h3>
              <ul className="space-y-4">
                {content.whoWeHelp.notIdealItems.map((item, i) => (
                  <li key={i} className="group flex items-start gap-4">
                    <X
                      size={24}
                      className="shrink-0 rounded-lg border border-red-200 bg-red-500/90 p-1 text-white transition-transform group-hover:scale-105"
                    />
                    <span className="text-base font-semibold text-white/90 transition-colors group-hover:text-red-200 md:text-lg">
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
          <div
            className={landingCardClass(
              "dark",
              "rounded-[28px] p-6 hover:translate-y-0 hover:bg-[#212121] md:p-8 lg:p-12"
            )}
          >
            {/* Section Title with decorative style */}
            <div className="-mx-6 mb-8 text-center md:-mx-8 md:mb-12 lg:-mx-12">
              <h3
                className={landingTitleBandClass(
                  "dark",
                  "px-6 py-3 text-2xl font-black uppercase md:px-8 md:text-3xl lg:px-12 lg:text-4xl"
                )}
              >
                {content.whoWeHelp.sectorsTitle}
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-2">
              {content.whoWeHelp.sectors.map((sector, i) => {
                const IconComponent = iconMap[sector.icon] || Rocket;
                const variant: LandingCardVariant = i === 0 ? "blue" : "dark";
                return (
                  <div
                    key={i}
                    className={landingCardClass(
                      variant,
                      "group flex h-full flex-col overflow-hidden rounded-[20px]"
                    )}
                  >
                    <h4
                      className={landingTitleBandClass(
                        variant,
                        "px-5 py-2.5 text-base leading-tight font-black tracking-tight md:px-6 md:text-lg"
                      )}
                    >
                      {sector.name}
                    </h4>
                    {/* Visual Header */}
                    <div
                      className={cn(
                        "relative flex h-32 items-center justify-center overflow-hidden border-b bg-neutral-200 md:h-36 lg:h-44",
                        variant === "blue" ? "border-white/15" : "border-white/10"
                      )}
                    >
                      {sector.imageUrl ? (
                        <>
                          <Image
                            src={sector.imageUrl}
                            alt={sector.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                          />
                          <div className="from-primary/70 absolute inset-0 bg-gradient-to-br to-[#000]/20" />
                          <div className="absolute right-3 bottom-3 rounded-lg border border-white/50 bg-white/90 p-2 shadow-[0_8px_16px_rgba(15,23,42,0.2)]">
                            <IconComponent size={18} className="text-[#00BCD4]" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="from-primary absolute inset-0 bg-gradient-to-br to-primary" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <IconComponent
                            size={56}
                            className="relative z-10 text-white transition-transform duration-300 group-hover:scale-110"
                            strokeWidth={1.5}
                          />
                        </>
                      )}
                      {/* Badge */}
                      {sector.badge && (
                        <div
                          className={`absolute right-0 bottom-0 left-0 flex items-center justify-center gap-1 border-t px-2 py-1.5 text-[10px] font-semibold tracking-[0.08em] uppercase ${
                            variant === "blue"
                              ? "border-white/15 bg-[#212121] text-[#FFFFFF]"
                              : "border-[#00BCD4]/35 bg-[#00BCD4] text-[#FFFFFF]"
                          }`}
                        >
                          <Check size={10} className="shrink-0" strokeWidth={3} />
                          {sector.badge}
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex flex-grow flex-col p-5 md:p-6">
                      <p
                        className={`mb-4 flex-grow text-sm leading-relaxed ${
                          variant === "blue" ? "text-[#eef9f5]" : "text-white/85"
                        }`}
                      >
                        {sector.description}
                      </p>
                      {/* Action Buttons */}
                      <div className="mt-auto space-y-2">
                        {sector.detailsButtonLabel && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSector(sector);
                            }}
                            className={cn(
                              "flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-[0.06em]",
                              variant === "dark"
                                ? landingPrimaryBlueButtonClass
                                : landingPrimaryDarkButtonClass,
                              "shadow-[0_8px_16px_rgba(17,24,39,0.24)]"
                            )}
                          >
                            {sector.detailsButtonLabel}
                            <ArrowRight size={14} />
                          </button>
                        )}
                        {sector.chatButtonLabel && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenChatWithSector?.(sector.name);
                            }}
                            className={cn(
                              "flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-[0.06em]",
                              variant === "dark"
                                ? landingPrimaryBlueButtonClass
                                : landingPrimaryDarkButtonClass
                            )}
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setSelectedSector(null)}
          >
            <div
              className="animate-in zoom-in-95 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[26px] border border-white/80 bg-[#f7f7f7] pr-2 shadow-[0_24px_70px_rgba(15,23,42,0.24),inset_0_0_0_1px_rgba(255,255,255,0.9)] ring-1 ring-black/5 duration-200 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:#9ca3af_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9ca3af]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative border-b border-black/10">
                {selectedSector.imageUrl ? (
                  <div className="relative h-36 overflow-hidden bg-neutral-200 md:h-44">
                    <Image
                      src={selectedSector.imageUrl}
                      alt={selectedSector.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                  </div>
                ) : (
                  <div className="h-28 bg-[#00BCD4]" />
                )}

                <div className="absolute inset-0 flex items-start justify-between p-4 md:p-6">
                  <div className="flex items-center gap-4">
                    {(() => {
                      const IconComponent = iconMap[selectedSector.icon] || Rocket;
                      return (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/40 bg-white/90 shadow-[0_10px_20px_rgba(15,23,42,0.24)]">
                          <IconComponent size={24} className="text-[#00BCD4]" />
                        </div>
                      );
                    })()}
                    <h3 className="text-xl font-black tracking-tight text-white drop-shadow-sm md:text-2xl">
                      {selectedSector.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedSector(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/50 bg-white/95 text-neutral-700 shadow-[0_10px_20px_rgba(15,23,42,0.2)] transition-all hover:bg-white hover:text-neutral-900"
                  >
                    <X size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="space-y-5 p-4 md:p-6">
                {/* What it means (lead) */}
                <div className={landingCardClass("dark", "overflow-hidden rounded-[16px] p-0")}>
                  <h4
                    className={landingTitleBandClass(
                      "dark",
                      "px-5 py-2.5 text-xs font-semibold tracking-[0.07em] uppercase"
                    )}
                  >
                    {whatItMeansLabel}
                  </h4>
                  <p className="px-5 pb-5 pt-4 text-base leading-relaxed font-semibold text-white/90 md:text-lg">
                    {selectedSector.modal?.whatItMeans ?? selectedSector.description}
                  </p>
                </div>

                {/* Why it matters + Typical outcome */}
                {(selectedSector.modal?.whyItMatters || selectedSector.modal?.typicalOutcome) && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className={landingCardClass("dark", "overflow-hidden rounded-[16px] p-0")}>
                      <h4
                        className={landingTitleBandClass(
                          "dark",
                          "px-5 py-2.5 text-xs font-semibold tracking-[0.07em] uppercase"
                        )}
                      >
                        {whyItMattersLabel}
                      </h4>
                      <p className="px-5 pb-5 pt-4 text-base leading-relaxed font-medium text-white/90">
                        {selectedSector.modal?.whyItMatters}
                      </p>
                    </div>
                    <div className={landingCardClass("blue", "overflow-hidden rounded-[16px] p-0")}>
                      <h4
                        className={landingTitleBandClass(
                          "blue",
                          "px-5 py-2.5 text-xs font-semibold tracking-[0.07em] uppercase"
                        )}
                      >
                        {outcomeLabel}
                      </h4>
                      <p className="px-5 pb-5 pt-4 text-base leading-relaxed font-semibold">
                        {selectedSector.modal?.typicalOutcome}
                      </p>
                    </div>
                  </div>
                )}

                {/* What's included */}
                {((selectedSector.modal?.whatsIncluded?.length ?? 0) > 0 ||
                  (selectedSector.howWeHelp?.length ?? 0) > 0) && (
                  <div className={landingCardClass("dark", "overflow-hidden rounded-[16px] p-0")}>
                    <h4
                      className={landingTitleBandClass(
                        "dark",
                        "px-5 py-2.5 text-xs font-semibold tracking-[0.07em] uppercase"
                      )}
                    >
                      {includedLabel}
                    </h4>
                    <ul className="space-y-2 px-5 pb-5 pt-4">
                      {(selectedSector.modal?.whatsIncluded ?? selectedSector.howWeHelp ?? []).map(
                        (item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
                            <span className="text-sm font-medium text-white/90">{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* Ideal fit */}
                {((selectedSector.modal?.idealFit?.length ?? 0) > 0 ||
                  (selectedSector.whoWeHelp?.length ?? 0) > 0) && (
                  <div className={landingCardClass("blue", "overflow-hidden rounded-[16px] p-0")}>
                    <h4
                      className={landingTitleBandClass(
                        "blue",
                        "px-5 py-2.5 text-xs font-semibold tracking-[0.07em] uppercase"
                      )}
                    >
                      {idealFitLabel}
                    </h4>
                    <ul className="space-y-2 px-5 pb-5 pt-4">
                      {(selectedSector.modal?.idealFit ?? selectedSector.whoWeHelp ?? []).map(
                        (item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white/95" />
                            <span className="text-sm font-semibold text-white/95">{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* Example Projects */}
                {selectedSector.exampleProjects && selectedSector.exampleProjects.length > 0 && (
                  <div className={landingCardClass("dark", "overflow-hidden rounded-[16px] p-0")}>
                    <div className={landingTitleBandClass("dark", "flex items-center gap-2 px-5 py-2.5")}>
                      <Lightbulb size={18} className="text-white" />
                      <h4 className="text-xs font-semibold tracking-[0.07em] text-white uppercase">
                        {locale === "es" ? "Ejemplos de proyectos" : "Example projects"}
                      </h4>
                    </div>
                    <ul className="space-y-2 px-5 pb-5 pt-4">
                      {selectedSector.exampleProjects.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/15 text-xs font-semibold text-white">
                            {i + 1}
                          </div>
                          <span className="text-sm font-medium text-white/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                {selectedSector.chatButtonLabel && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSector(null);
                      onOpenChatWithSector?.(selectedSector.name);
                    }}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 px-6 py-3.5 text-lg font-semibold tracking-[0.06em]",
                      landingPrimaryDarkButtonClass
                    )}
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
          <div className="mt-12 text-center md:mt-16">
            <p className="mb-6 text-lg font-semibold md:text-xl">{content.whoWeHelp.cta}</p>
            <button
              type="button"
              onClick={onOpenChatQualification}
              className={cn(
                "px-8 py-3.5 text-lg font-semibold tracking-[0.06em]",
                landingPrimaryDarkButtonClass
              )}
            >
              {content.whoWeHelp.ctaButton}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
