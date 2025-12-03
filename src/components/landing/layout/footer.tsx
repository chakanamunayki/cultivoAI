"use client";

import { useLocale } from "@/hooks/use-locale";
import { Reveal } from "../ui/reveal";

interface FooterProps {
  onContactClick?: () => void;
}

export function Footer({ onContactClick }: FooterProps) {
  const { content } = useLocale();

  return (
    <footer className="bg-black text-white p-8 md:p-16 text-center border-t-4 border-[#A855F7]">
      <Reveal>
        <h2
          className="text-3xl md:text-4xl lg:text-7xl font-black uppercase mb-6 md:mb-8 hover:text-[#A855F7] transition-colors cursor-pointer tracking-tight"
          onClick={onContactClick}
        >
          {content.footer.cta.split(".")[0]}?
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 font-mono text-[#FFDE00] text-sm md:text-base">
          <span>BOGOTA, COLOMBIA</span>
          <span className="hidden md:inline text-white">&rarr;</span>
          <span>WORLDWIDE</span>
        </div>
        <p className="mt-8 md:mt-12 text-neutral-600 text-xs md:text-sm font-bold uppercase">
          {content.footer.copyright}
        </p>
      </Reveal>
    </footer>
  );
}
