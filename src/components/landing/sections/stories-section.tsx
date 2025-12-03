"use client";

import Image from "next/image";
import { Zap, MessageSquare, BarChart3, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/landing/ui/reveal";
import { useLocale } from "@/hooks/use-locale";

const STORY_ICONS: Record<string, { icon: LucideIcon; color: string }> = {
  "E-commerce": { icon: Zap, color: "bg-blue-500" },
  Salud: { icon: MessageSquare, color: "bg-purple-500" },
  Retail: { icon: BarChart3, color: "bg-emerald-500" },
};

function getStoryIcon(industry: string): { icon: LucideIcon; color: string } {
  return STORY_ICONS[industry] || { icon: Zap, color: "bg-blue-500" };
}

export function StoriesSection() {
  const { content } = useLocale();

  return (
    <div id="stories" className="bg-[#A855F7] p-6 md:p-12 lg:p-24 border-b-4 border-black">
      <Reveal>
        <div className="bg-black text-white p-4 inline-block transform -rotate-2 mb-8 md:mb-12 shadow-[6px_6px_0px_0px_white] md:shadow-[8px_8px_0px_0px_white]">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-black uppercase">
            {content.storiesTitle}
          </h2>
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {content.stories.map((story, i) => {
          const { icon: IconComponent, color } = getStoryIcon(story.industry);

          return (
            <Reveal key={i} delay={i * 150}>
              <div className="bg-white border-4 border-black h-full shadow-[8px_8px_0px_0px_black] md:shadow-[12px_12px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 md:hover:translate-x-2 md:hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_black] transition-all duration-200 flex flex-col group overflow-hidden">
                {/* Image Header */}
                <div className="h-40 md:h-48 border-b-4 border-black overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <Image
                    src={story.imageUrl}
                    alt={story.company}
                    fill
                    className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div
                    className={`absolute top-4 left-4 z-20 w-10 h-10 md:w-12 md:h-12 ${color} border-4 border-black flex items-center justify-center text-white`}
                  >
                    <IconComponent size={20} className="md:w-6 md:h-6" />
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-black uppercase mb-4 md:mb-6 bg-black text-white inline-block px-2 self-start transform -rotate-1 group-hover:rotate-0 transition-transform">
                    {story.company}
                  </h3>

                  <div className="space-y-4 md:space-y-6 flex-1">
                    <div>
                      <div className="font-black text-[10px] md:text-xs uppercase bg-red-500 text-white inline-block px-2 mb-2 border-2 border-black">
                        Antes
                      </div>
                      <p className="font-bold text-sm leading-snug border-l-4 border-red-500 pl-3">
                        {story.before}
                      </p>
                    </div>
                    <div>
                      <div className="font-black text-[10px] md:text-xs uppercase bg-green-600 text-white inline-block px-2 mb-2 border-2 border-black">
                        Despues
                      </div>
                      <p className="font-bold text-sm leading-snug border-l-4 border-green-600 pl-3">
                        {story.after}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
