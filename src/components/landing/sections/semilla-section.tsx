"use client";

import { Leaf, Zap, GraduationCap, MessageSquare } from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

interface SemillaSectionProps {
  onOpenChatSemilla: () => void;
}

export function SemillaSection({ onOpenChatSemilla }: SemillaSectionProps) {
  const { content } = useLocale();

  return (
    <div id="semilla" className="bg-[#10B981] border-b-4 border-black">
      <div className="p-6 md:p-12 lg:p-24 max-w-[1600px] mx-auto">
        <Reveal>
          <div className="bg-black text-white p-4 inline-block transform rotate-1 mb-12 shadow-[8px_8px_0px_0px_white]">
            <h2 className="text-3xl md:text-5xl font-black uppercase flex items-center gap-4">
              <Leaf className="text-[#10B981]" size={32} />
              {content.semilla.title}
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column: Story */}
          <Reveal>
            <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black uppercase mb-6 bg-[#FFDE00] inline-block px-2 border-2 border-black">
                {content.semilla.subtitle}
              </h3>
              <div className="space-y-4 font-bold text-lg">
                <p>{content.semilla.about}</p>
              </div>
            </div>

            <div className="mt-12 bg-black text-white p-8 border-4 border-white shadow-[12px_12px_0px_0px_#A855F7]">
              <h3 className="text-2xl font-black uppercase mb-4 text-[#A855F7]">
                {content.semilla.ctaTitle}
              </h3>
              <p className="font-bold text-xl mb-6">
                {content.semilla.ctaDescription}
              </p>
              <p className="mt-6 pt-6 border-t-2 border-white/20 font-bold italic text-[#FFDE00]">
                &quot;{content.semilla.goal}&quot;
              </p>
            </div>
          </Reveal>

          {/* Right Column: Offer & Form */}
          <Reveal delay={200}>
            {/* What I can do */}
            <div className="mb-12">
              <h3 className="text-3xl font-black uppercase mb-6 text-white text-stroke-2 text-stroke-black">
                Servicios
              </h3>
              <div className="space-y-6">
                <div className="bg-[#FFDE00] border-4 border-black p-6 hover:-translate-y-1 transition-transform">
                  <h4 className="font-black uppercase mb-2 flex items-center gap-2">
                    <Zap size={20} /> Disponible Ahora
                  </h4>
                  <ul className="list-disc list-inside font-bold">
                    {content.semilla.services.slice(0, 3).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border-4 border-black p-6 hover:-translate-y-1 transition-transform">
                  <h4 className="font-black uppercase mb-2 flex items-center gap-2">
                    <GraduationCap size={20} /> Aprendiendo
                  </h4>
                  <ul className="list-disc list-inside font-bold">
                    {content.semilla.services.slice(3).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Tiers */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {content.semilla.tiers.map((tier, i) => (
                <div
                  key={i}
                  className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_black] hover:bg-[#A855F7] hover:text-white transition-colors group"
                >
                  <div className="font-black text-xl uppercase mb-1">
                    {tier.name.split(" ")[0]}
                  </div>
                  <div className="font-mono text-sm bg-black text-white inline-block px-1 mb-2 group-hover:bg-white group-hover:text-black">
                    {tier.name.match(/\(([^)]+)\)/)?.[1] || ""}
                  </div>
                  <p className="text-xs font-bold leading-tight">
                    {tier.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA to Chat */}
            <div className="bg-[#F3F4F6] border-4 border-black p-8 relative">
              <div className="absolute -top-4 -right-4 bg-red-500 text-white border-4 border-black px-4 py-2 font-black uppercase rotate-3">
                Escribeme!
              </div>
              <h3 className="text-2xl font-black uppercase mb-2">
                {content.semilla.ctaTitle}
              </h3>
              <p className="font-bold mb-6">{content.semilla.ctaDescription}</p>
              <button
                onClick={onOpenChatSemilla}
                className="w-full bg-black text-white border-4 border-transparent p-4 font-black uppercase hover:bg-white hover:text-black hover:border-black transition-all flex justify-center items-center gap-2 shadow-[8px_8px_0px_0px_#A855F7] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#A855F7]"
              >
                {content.semilla.ctaButton} <MessageSquare size={20} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
