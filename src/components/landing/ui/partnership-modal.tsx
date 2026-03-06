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
    <div className="max-h-[92vh] overflow-y-auto bg-[#212121] pr-2 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:#9ca3af_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9ca3af]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-black/10">
        {partnership.imageUrl ? (
          <div className="relative h-44 bg-neutral-200 md:h-56">
            <Image
              src={partnership.imageUrl}
              alt={partnership.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ) : (
          <div className="h-24 bg-[#00BCD4] md:h-28" />
        )}

        <div className="absolute inset-0 flex items-end gap-4 p-6 md:p-8">
          <div className="rounded-xl border border-white/40 bg-white/90 p-4 text-[#00BCD4] shadow-[0_12px_24px_rgba(15,23,42,0.25)] backdrop-blur-sm">
            <Icon size={28} />
          </div>
          <div className="pb-1">
            <Dialog.Title asChild>
              <h2 className="text-3xl leading-none font-black tracking-tight text-white md:text-5xl">
                {partnership.name}
              </h2>
            </Dialog.Title>
            <Dialog.Description asChild>
              <p className="mt-2 text-sm font-semibold tracking-[0.08em] text-[#FFFFFF] uppercase md:text-base">
                {partnership.tagline}
              </p>
            </Dialog.Description>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-8 md:p-12">
        {/* What it means */}
        <div className="-mx-8 border-y border-black/10 bg-[#e5e5e5] px-8 py-4 md:-mx-12 md:px-12">
          <h3 className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#4d4d4d] uppercase">
            {whatItMeansLabel}
          </h3>
          <p className="text-base leading-relaxed font-semibold text-[#2d2d2d] md:text-lg">
            {partnership.modal.whatItMeans}
          </p>
        </div>

        {/* Why it matters + Typical outcome */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-[20px] border border-black/10 bg-[#f1f1f1] p-0 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f5f5] hover:shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
            <h3 className="border-b border-[#00BCD4]/35 bg-[#00BCD4] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#FFFFFF] uppercase md:px-6">
              {whyItMattersLabel}
            </h3>
            <p className="px-5 pb-6 pt-4 text-base leading-relaxed font-medium text-[#3c3c3c] md:px-6 md:pb-7 md:pt-5 md:text-lg">
              {partnership.modal.whyItMatters}
            </p>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-[#00BCD4] bg-[#00BCD4] p-0 text-[#FFFFFF] shadow-[0_14px_28px_rgba(15,23,42,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00BCD4] hover:shadow-[0_18px_34px_rgba(15,23,42,0.26)]">
            <h3 className="border-b border-black/10 bg-[#e6e6e6] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#2f2f2f] uppercase md:px-6">
              {outcomeLabel}
            </h3>
            <p className="px-5 pb-6 pt-4 text-base leading-relaxed font-semibold md:px-6 md:pb-7 md:pt-5 md:text-lg">
              {partnership.modal.typicalOutcome}
            </p>
          </div>
        </div>

        {/* What's included */}
        <div className="overflow-hidden rounded-[20px] border border-black/10 bg-[#f3f3f3] p-0 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f7f7f7] hover:shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
          <h3 className="border-b border-[#00BCD4]/35 bg-[#00BCD4] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#FFFFFF] uppercase md:px-6">
            {includedLabel}
          </h3>
          <ul className="space-y-2 px-5 pb-6 pt-4 md:px-6 md:pb-7 md:pt-5">
            {partnership.modal.whatsIncluded.map((item) => (
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
          <h3 className="border-b border-[#00BCD4]/35 bg-[#00BCD4] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#FFFFFF] uppercase md:px-6">
            {idealFitLabel}
          </h3>
          <ul className="space-y-2 px-5 pb-6 pt-4 md:px-6 md:pb-7 md:pt-5">
            {partnership.modal.idealFit.map((item) => (
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

      {/* CTA - Green button with chat icon */}
      <button
        type="button"
        onClick={onOpenContact}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00BCD4] px-8 py-3.5 text-sm font-semibold tracking-[0.08em] text-white uppercase shadow-[0_14px_28px_rgba(15,23,42,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#00BCD4] hover:shadow-[0_18px_34px_rgba(15,23,42,0.28)]"
      >
        <MessageSquare size={20} />
        {chatCtaText}
      </button>
    </div>
  );
}
