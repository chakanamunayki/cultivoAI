"use client";

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
  onChatClick?: () => void;
}

export function PartnershipModal({ partnership, onChatClick }: PartnershipModalProps) {
  const { locale } = useLocale();
  const Icon = iconMap[partnership.icon] ?? Briefcase;

  const idealForLabel = locale === "es" ? "Ideal Para:" : "Ideal For:";
  const chatCtaText = locale === "es" ? "Hablemos de esto" : "Let's talk about this";

  return (
    <div className="p-8 md:p-12 bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 border-b-4 border-black pb-6">
        <div className="p-4 bg-black text-white">
          <Icon size={32} />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase leading-none text-black">
            {partnership.name}
          </h2>
          <p className="font-bold text-[#A855F7] uppercase">{partnership.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-xl font-medium leading-relaxed mb-8">{partnership.description}</p>

        {/* Ideal For */}
        <div className="bg-[#F3F4F6] border-4 border-black p-6">
          <h4 className="font-black uppercase text-sm mb-2 text-black">
            {idealForLabel}
          </h4>
          <p className="font-bold text-lg text-black">{partnership.idealFor.join(". ")}</p>
        </div>
      </div>

      {/* CTA - Green button with chat icon */}
      <button
        onClick={onChatClick}
        className="w-full bg-[#10B981] text-black border-4 border-black px-8 py-4 font-black uppercase hover:shadow-[8px_8px_0px_0px_black] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
      >
        <MessageSquare size={20} />
        {chatCtaText}
      </button>
    </div>
  );
}
