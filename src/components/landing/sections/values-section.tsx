"use client";

import {
  Sprout,
  Handshake,
  User,
  Hammer,
  Scale,
  Mountain,
} from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

const ICON_MAP: Record<string, typeof Sprout> = {
  Sprout,
  Handshake,
  User,
  Hammer,
  Scale,
  Mountain,
};

export function ValuesSection() {
  const { content } = useLocale();
  const { values } = content;

  return (
    <section
      id="values"
      className="border-b-4 border-black bg-white py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row gap-6 mb-12 md:mb-16 items-start">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none bg-black text-white px-4 py-2 inline-block rotate-1">
              {values.title}
            </h2>
            <p className="text-lg md:text-xl font-bold max-w-xl md:mt-2 border-l-4 border-[#A855F7] pl-4 md:pl-6">
              {values.subtitle}
            </p>
          </div>
        </Reveal>

        {/* 2x3 grid of values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {values.values.map((value, index) => {
            const Icon = ICON_MAP[value.icon] || Sprout;
            return (
              <Reveal key={value.title} delay={index * 75}>
                <div className="h-full bg-neutral-100 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:translate-x-0.5 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#FFC805] border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform">
                      <Icon size={24} className="text-black" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg md:text-xl font-black uppercase leading-tight">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
