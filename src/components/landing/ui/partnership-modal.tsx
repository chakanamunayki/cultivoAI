"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Briefcase,
  HeartHandshake,
  Hourglass,
  MessageSquare,
  PieChart,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { Partnership } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  HeartHandshake,
  Hourglass,
  TrendingUp,
  PieChart,
};

interface PartnershipModalProps {
  partnership: Partnership;
  onOpenContact?: () => void;
}

export function PartnershipModal({ partnership, onOpenContact }: PartnershipModalProps) {
  const { locale } = useLocale();
  const Icon = iconMap[partnership.icon] ?? Briefcase;

  const chatCtaText = locale === "es" ? "Hablemos de esto" : "Let's talk about this";
  const whatItMeansLabel = locale === "es" ? "Que significa" : "What it means";
  const whyItMattersLabel = locale === "es" ? "Por que importa" : "Why it matters";
  const includedLabel = locale === "es" ? "Que incluye" : "What's included";
  const idealFitLabel = locale === "es" ? "Ideal para" : "Ideal fit";
  const outcomeLabel = locale === "es" ? "Resultado tipico" : "Typical outcome";

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative border-b-4 border-black overflow-hidden">
        {partnership.imageUrl ? (
          <div className="relative h-44 md:h-56 bg-neutral-200">
            <Image
              src={partnership.imageUrl}
              alt={partnership.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ) : (
          <div className="h-24 md:h-28 bg-black" />
        )}

        <div className="absolute inset-0 p-6 md:p-8 flex items-end gap-4">
          <div className="p-4 bg-white border-4 border-black text-black shadow-[6px_6px_0px_0px_white]">
            <Icon size={28} />
          </div>
          <div className="pb-1">
            <Dialog.Title asChild>
              <h2 className="text-3xl md:text-5xl font-black uppercase leading-none text-white">
                {partnership.name}
              </h2>
            </Dialog.Title>
            <Dialog.Description asChild>
              <p className="font-black text-primary uppercase mt-2">
                {partnership.tagline}
              </p>
            </Dialog.Description>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 space-y-8 mb-10">
        {/* What it means */}
        <div className="border-l-8 border-black pl-6">
          <h3 className="font-black uppercase text-xs tracking-widest text-neutral-600 mb-2">
            {whatItMeansLabel}
          </h3>
          <p className="text-xl font-bold leading-relaxed">{partnership.modal.whatItMeans}</p>
        </div>

        {/* Why it matters + Typical outcome */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-muted border-4 border-black p-6">
            <h3 className="font-black uppercase text-sm mb-3">{whyItMattersLabel}</h3>
            <p className="font-medium text-base md:text-lg leading-relaxed opacity-90">
              {partnership.modal.whyItMatters}
            </p>
          </div>
          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_black]">
            <h3 className="font-black uppercase text-sm mb-3">{outcomeLabel}</h3>
            <p className="font-bold text-base md:text-lg leading-relaxed">
              {partnership.modal.typicalOutcome}
            </p>
          </div>
        </div>

        {/* What's included */}
        <div className="bg-white border-4 border-black p-6">
          <h3 className="font-black uppercase text-sm mb-4">{includedLabel}</h3>
          <ul className="space-y-2">
            {partnership.modal.whatsIncluded.map((item) => (
              <li key={item} className="flex items-start gap-3">
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
          <h3 className="font-black uppercase text-sm mb-4">{idealFitLabel}</h3>
          <ul className="space-y-2">
            {partnership.modal.idealFit.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 w-3 h-3 bg-black shrink-0" />
                <span className="font-bold text-base md:text-lg leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA - Green button with chat icon */}
      <button
        type="button"
        onClick={onOpenContact}
        className="w-full bg-primary text-primary-foreground border-t-4 border-black px-8 py-5 font-black uppercase hover:shadow-[8px_8px_0px_0px_black] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
      >
        <MessageSquare size={20} />
        {chatCtaText}
      </button>
    </div>
  );
}
