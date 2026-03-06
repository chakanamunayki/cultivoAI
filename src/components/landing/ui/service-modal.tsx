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
import type { Service } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

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

  const ctaText = locale === "es" ? "Estoy interesado" : "I'm interested";
  const whatItMeansLabel = locale === "es" ? "Que significa" : "What it means";
  const whyItMattersLabel = locale === "es" ? "Por que importa" : "Why it matters";
  const includedLabel = locale === "es" ? "Que incluye" : "What's included";
  const idealFitLabel = locale === "es" ? "Ideal para" : "Ideal fit";
  const outcomeLabel = locale === "es" ? "Resultado tipico" : "Typical outcome";

  return (
    <div className="max-h-[92vh] overflow-y-auto bg-[#f7f7f7] pr-2 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:#9ca3af_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9ca3af]">
      {/* Header Background with Image */}
      <div className="relative h-48 overflow-hidden border-b border-black/10 md:h-64">
        <div className="absolute inset-0 z-10 bg-black/35" />
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover object-center"
        />
        <div className="absolute bottom-6 left-6 z-20 flex items-end gap-4">
          <div className="rounded-xl border border-white/40 bg-white/90 p-4 text-[#00BCD4] shadow-[0_12px_24px_rgba(15,23,42,0.25)] backdrop-blur-sm">
            <Icon size={32} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#f7f7f7] p-8 md:p-12">
        <div className="mb-5 -mx-8 border-y border-black/10 bg-[#e9e9e9] px-8 py-2 md:-mx-12 md:px-12">
          <h3 className="text-xs font-semibold tracking-[0.09em] text-[#4d4d4d] uppercase">
            {service.eng}
          </h3>
        </div>

        <Dialog.Title asChild>
          <h2 className="mb-3 text-3xl font-black tracking-tight text-[#1f1f1f] md:text-5xl">
            {service.title}
          </h2>
        </Dialog.Title>

        <div className="space-y-5">
          {/* What it means (lead) */}
          <div className="-mx-8 border-y border-black/10 bg-[#e5e5e5] px-8 py-4 md:-mx-12 md:px-12">
            <h4 className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#4d4d4d] uppercase">
              {whatItMeansLabel}
            </h4>
            <p className="text-base leading-relaxed font-semibold text-[#2d2d2d] md:text-lg">
              {service.modal.whatItMeans}
            </p>
          </div>

          {/* Why it matters + Typical outcome */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-[20px] border border-black/10 bg-[#f1f1f1] p-0 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f5f5] hover:shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
              <h4 className="border-b border-[#00BCD4]/35 bg-[#00BCD4] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#FFFFFF] uppercase md:px-6">
                {whyItMattersLabel}
              </h4>
              <p className="px-5 pb-6 pt-4 text-base leading-relaxed font-medium text-[#3c3c3c] md:px-6 md:pb-7 md:pt-5 md:text-lg">
                {service.modal.whyItMatters}
              </p>
            </div>
            <div className="overflow-hidden rounded-[20px] border border-[#00BCD4] bg-[#00BCD4] p-0 text-[#FFFFFF] shadow-[0_14px_28px_rgba(15,23,42,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00BCD4] hover:shadow-[0_18px_34px_rgba(15,23,42,0.26)]">
              <h4 className="border-b border-black/10 bg-[#e6e6e6] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#2f2f2f] uppercase md:px-6">
                {outcomeLabel}
              </h4>
              <p className="px-5 pb-6 pt-4 text-base leading-relaxed font-semibold md:px-6 md:pb-7 md:pt-5 md:text-lg">
                {service.modal.typicalOutcome}
              </p>
            </div>
          </div>

          {/* What's included */}
          <div className="overflow-hidden rounded-[20px] border border-black/10 bg-[#f3f3f3] p-0 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f7f7f7] hover:shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
            <h4 className="border-b border-[#00BCD4]/35 bg-[#00BCD4] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#FFFFFF] uppercase md:px-6">
              {includedLabel}
            </h4>
            <ul className="space-y-2 px-5 pb-6 pt-4 md:px-6 md:pb-7 md:pt-5">
              {service.modal.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#1b1b1b]" />
                  <span className="text-base leading-relaxed font-medium text-[#2d2d2d] md:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal fit */}
          <div className="overflow-hidden rounded-[20px] border border-black/10 bg-[#f1f1f1] p-0 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f5f5] hover:shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
            <h4 className="border-b border-[#00BCD4]/35 bg-[#00BCD4] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#FFFFFF] uppercase md:px-6">
              {idealFitLabel}
            </h4>
            <ul className="space-y-2 px-5 pb-6 pt-4 md:px-6 md:pb-7 md:pt-5">
              {service.modal.idealFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#2f2f2f]" />
                  <span className="text-base leading-relaxed font-semibold text-[#2f2f2f] md:text-lg">
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
            className="w-full rounded-xl bg-[#1f1f1f] px-8 py-3.5 text-sm font-semibold tracking-[0.08em] text-white uppercase shadow-[0_14px_28px_rgba(17,24,39,0.26)] transition-all hover:-translate-y-0.5 hover:bg-[#111] hover:shadow-[0_18px_34px_rgba(17,24,39,0.32)] md:w-auto"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
