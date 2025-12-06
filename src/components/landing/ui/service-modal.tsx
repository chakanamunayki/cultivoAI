"use client";

import Image from "next/image";
import {
  BarChart3,
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
  Layers,
  Monitor,
  Rocket,
};

interface ServiceModalProps {
  service: Service;
}

export function ServiceModal({ service }: ServiceModalProps) {
  const { locale } = useLocale();
  const Icon = iconMap[service.icon] ?? Zap;

  const ctaText = locale === "es" ? "Estoy interesado" : "I'm interested";

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
          <div className="p-4 bg-[#A855F7] border-4 border-black text-white shadow-[6px_6px_0px_0px_white]">
            <Icon size={32} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-12">
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-2 text-black">
          {service.title}
        </h2>
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <h3 className="text-lg font-bold uppercase tracking-wider text-[#A855F7]">
            {service.eng}
          </h3>
          {service.pricing && (
            <span className="bg-[#10B981] text-white text-sm font-bold px-3 py-1 border-2 border-black">
              {service.pricing}
            </span>
          )}
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl font-medium leading-relaxed mb-6 border-l-4 border-black pl-6">
            {service.description}
          </p>
          <p className="text-base md:text-lg opacity-80 leading-relaxed">
            {service.details.join(" ")}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex gap-4">
          <button className="w-full md:w-auto bg-[#FFDE00] text-black border-4 border-black px-8 py-4 font-black uppercase hover:shadow-[8px_8px_0px_0px_black] hover:-translate-y-1 transition-all">
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
