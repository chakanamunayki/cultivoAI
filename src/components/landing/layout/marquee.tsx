"use client";

import { useLocale } from "@/hooks/use-locale";

export function Marquee() {
  const { content } = useLocale();

  // Duplicate the text for seamless infinite scroll
  const marqueeText = `${content.marquee} ${content.marquee} `;

  return (
    <div className="bg-black text-[#FFDE00] overflow-hidden whitespace-nowrap py-2 md:py-3 border-b-4 border-black">
      <div className="animate-marquee inline-block font-black tracking-widest uppercase text-xs md:text-sm">
        {marqueeText}
      </div>
    </div>
  );
}
