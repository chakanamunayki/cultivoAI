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
    <div className="relative overflow-hidden">
      {/* Header Background with Image */}
      <div className="h-48 md:h-64 relative overflow-hidden border-b-4 border-black">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-6 left-6 z-20 flex items-end gap-4">
          <div className="p-4 bg-primary border-4 border-black text-primary-foreground shadow-[6px_6px_0px_0px_white]">
            <Icon size={32} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-12">
        <Dialog.Title asChild>
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-2 text-black">
            {service.title}
          </h2>
        </Dialog.Title>
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <h3 className="text-lg font-bold uppercase tracking-wider text-primary">
            {service.eng}
          </h3>
        </div>

        <div className="space-y-10">
          {/* What it means (lead) */}
          <div className="border-l-8 border-black pl-6">
            <h4 className="font-black uppercase text-xs tracking-widest text-neutral-600 mb-2">
              {whatItMeansLabel}
            </h4>
            <p className="text-xl font-bold leading-relaxed">{service.modal.whatItMeans}</p>
          </div>

          {/* Why it matters + Typical outcome */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-muted border-4 border-black p-6">
              <h4 className="font-black uppercase text-sm mb-3">{whyItMattersLabel}</h4>
              <p className="font-medium text-base md:text-lg leading-relaxed opacity-90">
                {service.modal.whyItMatters}
              </p>
            </div>
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_black]">
              <h4 className="font-black uppercase text-sm mb-3">{outcomeLabel}</h4>
              <p className="font-bold text-base md:text-lg leading-relaxed">
                {service.modal.typicalOutcome}
              </p>
            </div>
          </div>

          {/* What's included */}
          <div className="bg-white border-4 border-black p-6">
            <h4 className="font-black uppercase text-sm mb-4">{includedLabel}</h4>
            <ul className="space-y-2">
              {service.modal.whatsIncluded.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="mt-1 w-3 h-3 bg-black shrink-0" />
                  <span className="font-medium text-base md:text-lg leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal fit */}
          <div className="bg-secondary border-4 border-black p-6 shadow-[6px_6px_0px_0px_black]">
            <h4 className="font-black uppercase text-sm mb-4">{idealFitLabel}</h4>
            <ul className="space-y-2">
              {service.modal.idealFit.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="mt-1 w-3 h-3 bg-black shrink-0" />
                  <span className="font-bold text-base md:text-lg leading-relaxed text-black">
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
            className="w-full md:w-auto bg-primary text-primary-foreground border-4 border-black px-8 py-4 font-black uppercase hover:shadow-[8px_8px_0px_0px_black] hover:-translate-y-1 transition-all"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
