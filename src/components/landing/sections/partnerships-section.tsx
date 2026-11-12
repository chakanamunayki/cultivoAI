"use client";

import {
  landingCardClass,
  landingPrimaryBlueButtonClass,
  landingPrimaryDarkButtonClass,
  landingTitleBandClass,
  type LandingCardVariant,
} from "@/components/landing/ui/landing-card-styles";
import { useModal } from "@/components/landing/ui/modal-provider";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

interface PartnershipsSectionProps {
  onOpenChatGeneral: () => void;
}

export function PartnershipsSection({ onOpenChatGeneral }: PartnershipsSectionProps) {
  const { content, locale } = useLocale();
  const { openPartnershipModal } = useModal();
  const extras = content.partnershipsExtras;
  const detailsLabel =
    locale === "es" ? "Ver detalles ->" : locale === "pt" ? "Ver detalhes ->" : "View details ->";
  const closingCta =
    extras?.closingCta ??
    (locale === "es"
      ? "¿No sabes qué opción encaja? Hablemos."
      : "Not sure which option fits? Let's talk.");

  return (
    <div id="partnerships" className="border-b border-white/10 bg-[#212121]">
      <div className="mx-auto max-w-[1600px] p-6 md:p-12 lg:p-24">
        <Reveal>
          <SectionHeader
            title={content.partnershipsTitle}
            subtitle={content.partnershipsSubtitle}
            subtitleClassName="max-w-2xl text-white/80"
            tone="onDark"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {content.partnerships.map((partner, i) => {
            // The first step is where everyone starts, so it carries the accent.
            const variant: LandingCardVariant = i === 0 ? "blue" : "dark";
            const isBlue = variant === "blue";

            return (
              <Reveal key={partner.name} delay={i * 100}>
                <article
                  className={landingCardClass(
                    variant,
                    "group flex h-full w-full flex-col overflow-hidden rounded-[22px] p-6 text-left hover:-translate-y-1"
                  )}
                >
                  <h3
                    className={landingTitleBandClass(
                      variant,
                      "-mx-6 -mt-6 mb-5 px-6 py-2.5 text-xl leading-tight font-black tracking-tight"
                    )}
                  >
                    {partner.name}
                  </h3>
                  <p
                    className={cn(
                      "mb-3 text-xs font-semibold tracking-[0.08em] uppercase",
                      isBlue ? "text-white" : "text-[#00BCD4]"
                    )}
                  >
                    {partner.tagline}
                  </p>
                  <p
                    className={cn(
                      "text-[15px] leading-relaxed",
                      isBlue ? "text-white" : "text-white/85"
                    )}
                  >
                    {partner.description}
                  </p>

                  <div className="mt-auto pt-6">
                    {partner.terms && (
                      <div
                        className={cn(
                          "mb-5 border-t pt-4",
                          isBlue ? "border-white/30" : "border-white/10"
                        )}
                      >
                        <p
                          className={cn(
                            "text-sm leading-relaxed font-medium",
                            isBlue ? "text-white" : "text-white/85"
                          )}
                        >
                          {partner.terms}
                        </p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => openPartnershipModal(partner)}
                      className={cn(
                        "w-full rounded-lg px-4 py-2.5 text-center text-xs font-semibold tracking-[0.07em]",
                        isBlue ? landingPrimaryDarkButtonClass : landingPrimaryBlueButtonClass
                      )}
                    >
                      {detailsLabel}
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {extras && (
          <Reveal delay={300}>
            <div className="mt-8 flex flex-col gap-4 rounded-[22px] border border-white/15 bg-white/[0.04] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.3)] md:flex-row md:items-center md:justify-between md:gap-8">
              <p className="text-base leading-relaxed text-white/85">{extras.missionLine}</p>
              <button
                type="button"
                onClick={onOpenChatGeneral}
                className={cn(
                  "shrink-0 px-6 py-2.5 text-center text-xs font-semibold tracking-[0.07em]",
                  landingPrimaryBlueButtonClass
                )}
              >
                {extras.missionCta}
              </button>
            </div>
          </Reveal>
        )}

        <Reveal delay={300} className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenChatGeneral}
            className={cn(
              "px-8 py-3.5 text-lg font-semibold tracking-[0.06em]",
              landingPrimaryDarkButtonClass
            )}
          >
            {closingCta}
          </button>
        </Reveal>
      </div>
    </div>
  );
}
