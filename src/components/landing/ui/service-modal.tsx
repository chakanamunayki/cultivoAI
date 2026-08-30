"use client";

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

  const ctaText = locale === "es" ? "Estoy interesado" : locale === "pt" ? "Tenho interesse" : "I'm interested";
  const whyItMattersLabel = locale === "es" ? "Por que importa" : locale === "pt" ? "Por que importa" : "Why it matters";
  const includedLabel = locale === "es" ? "Que incluye" : locale === "pt" ? "O que inclui" : "What's included";
  const idealFitLabel = locale === "es" ? "Ideal para" : locale === "pt" ? "Ideal para" : "Ideal fit";
  const outcomeLabel = locale === "es" ? "Resultado tipico" : locale === "pt" ? "Resultado típico" : "Typical outcome";

  return (
    <div className="max-h-[92vh] overflow-y-auto bg-[#212121] pr-2 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:#9ca3af_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9ca3af]">
      {/* Header with Title and abstract design */}
      <div className="relative overflow-hidden border-b border-white/5 bg-[#111111] px-8 pb-10 pt-10 md:px-12 md:pb-12 md:pt-14">
        {/* Soft Glowing Orbs */}
        <div className="absolute -left-[10%] -top-[20%] h-[120%] w-[60%] rounded-full bg-[#00BCD4]/15 blur-[80px]" />
        <div className="absolute -right-[10%] -bottom-[20%] h-[120%] w-[60%] rounded-full bg-[#00BCD4]/10 blur-[80px]" />

        {/* Subtle Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Gradient Fade to Content */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#212121]/80 via-transparent to-transparent md:from-[#212121]/60" />

        {/* Header Content */}
        <div className="relative z-20 flex flex-col gap-5 md:gap-6">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="shrink-0 rounded-2xl border border-[#00BCD4]/30 bg-[#212121]/80 p-3 text-[#00BCD4] shadow-[0_8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/10 backdrop-blur-xl md:p-3.5">
              <Icon size={28} className="hidden md:block" />
              <Icon size={24} className="md:hidden" />
            </div>
            <Dialog.Title asChild>
              <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl lg:text-4xl">
                {service.title}
              </h2>
            </Dialog.Title>
          </div>

          <div className="max-w-4xl">
            <p className="text-base font-medium leading-relaxed text-white/80 md:text-lg lg:text-xl">
              {service.modal.whatItMeans}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#212121] p-8 md:p-12">
        <div className="space-y-5">

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
