"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import {
  landingCardClass,
  landingPrimaryBlueButtonClass,
  landingPrimaryDarkButtonClass,
  landingTitleBandClass,
  type LandingCardVariant,
} from "@/components/landing/ui/landing-card-styles";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

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
    <section id="who-we-help" className="border-b border-black/10 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section Title */}
        <Reveal>
          <SectionHeader
            title={content.whoWeHelp.title}
            subtitle={content.whoWeHelp.subtitle}
            subtitleClassName="max-w-2xl"
          />
        </Reveal>

        {/* Sectors We Love */}
        <Reveal delay={300}>
          <div
            className={landingCardClass(
              "dark",
              "rounded-[28px] p-6 hover:translate-y-0 hover:bg-[#212121] md:p-8 lg:p-12"
            )}
          >
            {/* Section Title with decorative style */}
            {content.whoWeHelp.sectorsTitle && (
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
            )}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-2">
              {content.whoWeHelp.sectors.map((sector, i) => {
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
                        "px-5 py-2.5 text-center text-base uppercase leading-tight font-black tracking-tight md:px-6 md:text-lg"
                      )}
                    >
                      {sector.name}
                    </h4>
                    {/* Visual Header */}
                    <div
                      className={cn(
                        "relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b bg-neutral-200",
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
                          <div className="from-black/30 absolute inset-0 bg-gradient-to-br to-transparent" />
                        </>
                      ) : (
                        <>
                          <div className="from-primary absolute inset-0 bg-gradient-to-br to-primary" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </>
                      )}
                      {/* Badge */}
                      {sector.badge && (
                        <div
                          className={`absolute right-0 bottom-0 left-0 flex items-center justify-center gap-1 border-t px-2 py-1.5 text-[10px] font-semibold tracking-[0.08em] uppercase ${variant === "blue"
                              ? "border-white/15 bg-[#212121] text-[#FFFFFF]"
                              : "border-[#00BCD4]/35 bg-[#00BCD4] text-[#18181b]"
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
                        className={`mb-4 flex-grow text-sm leading-relaxed ${variant === "blue" ? "text-[#18181b]/85" : "text-white/85"
                          }`}
                      >
                        {sector.description}
                      </p>
                      {/* Action Buttons */}
                      <div className="mt-auto space-y-2">
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
