"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Locale, Service } from "@/content/types";
import { cn } from "@/lib/utils";
import { AiAssistantsAnimation } from "./service-animations/AiAssistantsAnimation";
import { CompanyBrainAnimation } from "./service-animations/CompanyBrainAnimation";
import { DashboardAnimation } from "./service-animations/DashboardAnimation";
import { KnowledgeAnimation } from "./service-animations/KnowledgeAnimation";
import { RetreatOpsAnimation } from "./service-animations/RetreatOpsAnimation";
import { SoftwareWebAnimation } from "./service-animations/SoftwareWebAnimation";
import { StartupAdvisoryAnimation } from "./service-animations/StartupAdvisoryAnimation";
import { WorkflowAnimation } from "./service-animations/WorkflowAnimation";

type AnimationComponent = React.ComponentType<{ locale?: Locale }>;

const SERVICE_ANIMATIONS: Record<string, AnimationComponent> = {
  "workflow": WorkflowAnimation,
  "ai-assistants": AiAssistantsAnimation,
  "company-brain": CompanyBrainAnimation,
  "retreat-ops": RetreatOpsAnimation,
  "dashboards": DashboardAnimation,
  "knowledge": KnowledgeAnimation,
  "startup": StartupAdvisoryAnimation,
  "software-web": SoftwareWebAnimation,
};

interface StackedServiceCardProps {
  index: number;
  service: Service;
  locale: Locale;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onSeeMore: (service: Service) => void;
}

function StackedServiceCard({
  index,
  service,
  locale,
  progress,
  range,
  targetScale,
  onSeeMore,
}: StackedServiceCardProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const usesContainImage = service.imageFit === "contain";
  const imageScale = useTransform(scrollYProgress, [0, 1], usesContainImage ? [1, 1] : [1.08, 1]);
  const cardScale = useTransform(progress, range, [1, targetScale]);
  const seeMoreLabel = locale === "es" ? "Ver mas" : locale === "pt" ? "Ver mais" : "See more";

  return (
    <div className="sticky top-0 flex min-h-screen w-full items-center justify-center py-2 md:py-8">
      <motion.article
        ref={containerRef}
        onClick={() => onSeeMore(service)}
        style={{
          scale: cardScale,
          top: `calc(-4vh + ${index * 24}px)`,
          zIndex: index + 1,
        }}
        className={cn(
          "relative -top-[12%] min-h-[860px] w-[94%] max-w-6xl origin-top cursor-pointer overflow-hidden rounded-[30px] border p-5 transition-all duration-200 md:h-[82vh] md:min-h-[640px] md:p-7 lg:p-8",
          "border-white/15 bg-[#212121] text-[#FFFFFF] shadow-[0_20px_40px_rgba(0,0,0,0.34)] ring-1 ring-white/5 hover:-translate-y-1 hover:bg-[#1b1b1b] hover:shadow-[0_24px_44px_rgba(0,0,0,0.42)]"
        )}
      >
        <div className="-mx-5 -mt-5 mb-5 flex items-center justify-center gap-4 border-b border-[#00BCD4]/35 bg-[#00BCD4] px-5 py-3 text-sm font-bold tracking-[0.08em] text-[#FFFFFF] uppercase md:-mx-7 md:-mt-7 md:px-7 md:py-3.5 md:text-base lg:-mx-8 lg:-mt-8 lg:px-8">
          <span className="opacity-60">0{index + 1}</span>
          <span>{service.title}</span>
        </div>

        <div className="grid h-full gap-5 md:gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-stretch">
          <div className="order-2 flex min-h-0 flex-col lg:order-1">
            <div className="min-h-0 pr-1 lg:max-h-[360px] lg:overflow-y-auto lg:pr-2 lg:[scrollbar-width:thin] lg:[scrollbar-color:#9ca3af_transparent] lg:[&::-webkit-scrollbar]:w-1.5 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:bg-[#9ca3af]">
              <h3 className="text-2xl leading-tight font-black tracking-tight md:text-3xl">
                {service.title}
              </h3>

              <ul className="mt-4 space-y-2 md:mt-5">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
                        "bg-[#FFFFFF]"
                      )}
                    />
                    <span className="text-sm leading-snug font-semibold md:text-base">{detail}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 border-t border-white/15 pt-4 text-sm leading-snug text-white/85 md:mt-5 md:text-base">
                {service.description}
              </p>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSeeMore(service);
              }}
              className="relative z-10 mt-5 inline-flex w-fit items-center gap-2 self-center rounded-lg bg-[#00BCD4] px-5 py-2.5 text-sm font-semibold tracking-[0.06em] text-[#111111] uppercase shadow-[0_8px_18px_rgba(15,23,42,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#00BCD4] md:mt-8 md:text-base"
            >
              {seeMoreLabel}
              <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="order-1 lg:order-2">
            <div
              className={cn(
                "relative h-[280px] overflow-hidden rounded-[20px] border border-black/10 md:h-[340px] lg:h-full lg:min-h-[420px]",
                !service.animationKey && !service.videoUrl && usesContainImage ? "bg-white/95" : ""
              )}
            >
              {service.animationKey && SERVICE_ANIMATIONS[service.animationKey] ? (
                (() => {
                  const Animation = SERVICE_ANIMATIONS[service.animationKey] as AnimationComponent;
                  return <Animation locale={locale} />;
                })()
              ) : service.videoUrl ? (
                <video
                  src={service.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <motion.div style={{ scale: imageScale }} className="absolute inset-0">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className={cn(
                      usesContainImage ? "object-contain object-center p-2 md:p-4" : "object-cover object-center"
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
                  />
                </motion.div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

interface StackingServiceCardsProps {
  services: Service[];
  locale: Locale;
  onSeeMore: (service: Service) => void;
  className?: string;
}

export function StackingServiceCards({
  services,
  locale,
  onSeeMore,
  className,
}: StackingServiceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {services.map((service, index) => {
        const targetScale = 1 - (services.length - index - 1) * 0.04;
        const rangeStart = services.length > 1 ? index / services.length : 0;
        const range: [number, number] = [rangeStart, 1];

        return (
          <StackedServiceCard
            key={service.title}
            index={index}
            service={service}
            locale={locale}
            progress={scrollYProgress}
            range={range}
            targetScale={targetScale}
            onSeeMore={onSeeMore}
          />
        );
      })}
    </div>
  );
}

