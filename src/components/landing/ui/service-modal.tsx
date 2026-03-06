"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import {
  BarChart3,
  CalendarCheck,
  Layers,
  MessageSquare,
  Monitor,
  Rocket,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  landingCardClass,
  landingPrimaryBlueButtonClass,
  landingTitleBandClass,
} from "@/components/landing/ui/landing-card-styles";
import type { Service } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Zap,
  MessageSquare,
  BarChart3,
  CalendarCheck,
  Layers,
  Monitor,
  Rocket,
};

interface ServiceModalProps {
  service: Service;
  onOpenContact?: () => void;
}

export function ServiceModal({ service, onOpenContact }: ServiceModalProps) {
  const { locale } = useLocale();
  const Icon = iconMap[service.icon] ?? Zap;
  const usesContainImage = service.imageFit === "contain";

  const ctaText = locale === "es" ? "Estoy interesado" : "I'm interested";
  const whatItMeansLabel = locale === "es" ? "Que significa" : "What it means";
  const whyItMattersLabel = locale === "es" ? "Por que importa" : "Why it matters";
  const includedLabel = locale === "es" ? "Que incluye" : "What's included";
  const idealFitLabel = locale === "es" ? "Ideal para" : "Ideal fit";
  const outcomeLabel = locale === "es" ? "Resultado tipico" : "Typical outcome";

  return (
    <div className="max-h-[92vh] overflow-y-auto bg-[#212121] pr-2 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:#9ca3af_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9ca3af]">
      {/* Header Background with Image */}
      <div
        className={`relative h-48 overflow-hidden border-b border-black/10 md:h-64 ${
          usesContainImage ? "bg-[#e9e9e9]" : ""
        }`}
      >
        <div className={`absolute inset-0 z-10 ${usesContainImage ? "bg-black/15" : "bg-black/35"}`} />
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className={usesContainImage ? "object-contain object-center p-4 md:p-6" : "object-cover object-center"}
        />
        <div className="absolute bottom-6 left-6 z-20 flex items-end gap-4">
          <div className="rounded-xl border border-white/40 bg-white/90 p-4 text-[#00BCD4] shadow-[0_12px_24px_rgba(15,23,42,0.25)] backdrop-blur-sm">
            <Icon size={32} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#212121] p-8 md:p-12">
        <div className="mb-5 -mx-8 border-y border-black/10 bg-[#e9e9e9] px-8 py-2 md:-mx-12 md:px-12">
          <h3 className="text-xs font-semibold tracking-[0.09em] text-[#4d4d4d] uppercase">
            {service.eng}
          </h3>
        </div>

        <Dialog.Title asChild>
          <h2 className="mb-3 text-3xl font-black tracking-tight text-white md:text-5xl">
            {service.title}
          </h2>
        </Dialog.Title>

        <div className="space-y-5">
          {/* What it means (lead) */}
          <div className={landingCardClass("dark", "overflow-hidden rounded-[20px] p-0")}>
            <h4
              className={landingTitleBandClass(
                "dark",
                "px-5 py-2.5 text-xs font-semibold tracking-[0.07em] uppercase md:px-6"
              )}
            >
              {whatItMeansLabel}
            </h4>
            <p className="px-5 pb-6 pt-4 text-base leading-relaxed font-semibold text-white/90 md:px-6 md:pb-7 md:pt-5 md:text-lg">
              {service.modal.whatItMeans}
            </p>
          </div>

          {/* Why it matters + Typical outcome */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className={landingCardClass("dark", "overflow-hidden rounded-[20px] p-0")}>
              <h4
                className={landingTitleBandClass(
                  "dark",
                  "px-5 py-2.5 text-xs font-semibold tracking-[0.07em] uppercase md:px-6"
                )}
              >
                {whyItMattersLabel}
              </h4>
              <p className="px-5 pb-6 pt-4 text-base leading-relaxed font-medium text-white/90 md:px-6 md:pb-7 md:pt-5 md:text-lg">
                {service.modal.whyItMatters}
              </p>
            </div>
            <div className={landingCardClass("blue", "overflow-hidden rounded-[20px] p-0")}>
              <h4
                className={landingTitleBandClass(
                  "blue",
                  "px-5 py-2.5 text-xs font-semibold tracking-[0.07em] uppercase md:px-6"
                )}
              >
                {outcomeLabel}
              </h4>
              <p className="px-5 pb-6 pt-4 text-base leading-relaxed font-semibold md:px-6 md:pb-7 md:pt-5 md:text-lg">
                {service.modal.typicalOutcome}
              </p>
            </div>
          </div>

          {/* What's included */}
          <div className={landingCardClass("dark", "overflow-hidden rounded-[20px] p-0")}>
            <h4
              className={landingTitleBandClass(
                "dark",
                "px-5 py-2.5 text-xs font-semibold tracking-[0.07em] uppercase md:px-6"
              )}
            >
              {includedLabel}
            </h4>
            <ul className="space-y-2 px-5 pb-6 pt-4 md:px-6 md:pb-7 md:pt-5">
              {service.modal.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
                  <span className="text-base leading-relaxed font-medium text-white/90 md:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal fit */}
          <div className={landingCardClass("blue", "overflow-hidden rounded-[20px] p-0")}>
            <h4
              className={landingTitleBandClass(
                "blue",
                "px-5 py-2.5 text-xs font-semibold tracking-[0.07em] uppercase md:px-6"
              )}
            >
              {idealFitLabel}
            </h4>
            <ul className="space-y-2 px-5 pb-6 pt-4 md:px-6 md:pb-7 md:pt-5">
              {service.modal.idealFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white/95" />
                  <span className="text-base leading-relaxed font-semibold text-white/95 md:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex gap-4">
          <button
            type="button"
            onClick={onOpenContact}
            className={cn(
              "w-full px-8 py-3.5 text-sm font-semibold tracking-[0.08em] md:w-auto",
              landingPrimaryBlueButtonClass
            )}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
