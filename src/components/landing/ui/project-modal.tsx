"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

interface ProjectModalProps {
  project: Project;
  onOpenContact?: () => void;
}

export function ProjectModal({ project, onOpenContact }: ProjectModalProps) {
  const { locale } = useLocale();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const imageGallery = useMemo(() => {
    const images = project.images && project.images.length > 0 ? project.images : [project.image];
    const merged = images.includes(project.image) ? images : [project.image, ...images];
    return Array.from(new Set(merged));
  }, [project.image, project.images]);

  const hasMultipleImages = imageGallery.length > 1;

  const whatItMeansLabel = locale === "es" ? "Que significa" : "What it means";
  const whyItMattersLabel = locale === "es" ? "Por que importa" : "Why it matters";
  const includedLabel = locale === "es" ? "Que incluye" : "What's included";
  const idealFitLabel = locale === "es" ? "Ideal para" : "Ideal fit";
  const outcomeLabel = locale === "es" ? "Resultado tipico" : "Typical outcome";
  const lessonLabel = locale === "es" ? "Leccion aprendida" : "Lesson learned";
  const galleryLabel = locale === "es" ? "Galeria del proyecto" : "Project gallery";
  const ctaText = locale === "es" ? "Quiero algo similar" : "I'm interested in something similar";

  useEffect(() => {
    if (!hasMultipleImages) return;

    const handleKeyNavigation = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveImageIndex((prev) => (prev === 0 ? imageGallery.length - 1 : prev - 1));
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveImageIndex((prev) => (prev === imageGallery.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyNavigation);
    return () => window.removeEventListener("keydown", handleKeyNavigation);
  }, [hasMultipleImages, imageGallery.length]);

  const showPreviousImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? imageGallery.length - 1 : prev - 1));
  };

  const showNextImage = () => {
    setActiveImageIndex((prev) => (prev === imageGallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-h-[92vh] overflow-y-auto bg-[#212121] pr-2 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:#9ca3af_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9ca3af]">
      {/* Top Gallery */}
      <div className="overflow-hidden border-b border-black/10 bg-[#18181B]">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={imageGallery[activeImageIndex] ?? project.image}
            alt={`${project.title} - ${galleryLabel} ${activeImageIndex + 1}`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 960px"
            priority
          />

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                aria-label={locale === "es" ? "Imagen anterior" : "Previous image"}
                className="absolute top-1/2 left-3 -translate-y-1/2 rounded-xl border border-black/10 bg-white/95 p-2 text-neutral-700 shadow-[0_10px_20px_rgba(15,23,42,0.2)] transition-all hover:-translate-y-[52%] hover:bg-white hover:text-neutral-900 md:left-5 md:p-3"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                aria-label={locale === "es" ? "Siguiente imagen" : "Next image"}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-xl border border-black/10 bg-white/95 p-2 text-neutral-700 shadow-[0_10px_20px_rgba(15,23,42,0.2)] transition-all hover:-translate-y-[52%] hover:bg-white hover:text-neutral-900 md:right-5 md:p-3"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {hasMultipleImages && (
            <div className="absolute right-3 bottom-3 rounded-md border border-white/40 bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              {activeImageIndex + 1} / {imageGallery.length}
            </div>
          )}
        </div>

        {hasMultipleImages && (
          <div className="overflow-x-auto border-t border-black/10 bg-[#ececec] px-4 py-3 md:px-6">
            <div className="flex gap-3 min-w-max">
              {imageGallery.map((src, index) => (
                <button
                  type="button"
                  key={`${src}-${index}`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`${galleryLabel} ${index + 1}`}
                  className={[
                    "relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border md:h-16 md:w-28",
                    index === activeImageIndex
                      ? "border-[#00BCD4] shadow-[0_0_0_2px_rgba(15,77,63,0.18)]"
                      : "border-black/10",
                  ].join(" ")}
                >
                  <Image
                    src={src}
                    alt={`${project.title} thumbnail ${index + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="112px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-[#212121] p-6 md:p-8 lg:p-10">
        <div className="mb-5 -mx-6 border-y border-black/10 bg-[#e9e9e9] px-6 py-2 md:-mx-8 md:px-8 lg:-mx-10 lg:px-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold tracking-[0.08em] text-[#4f4f4f] uppercase md:text-xs">
            <span>{project.status}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="text-[#656565]">
                / {tag}
              </span>
            ))}
          </div>
        </div>

        <Dialog.Title asChild>
          <h2 className="mb-4 text-3xl leading-tight font-black tracking-tight text-white md:text-4xl lg:text-5xl">
            {project.title}
          </h2>
        </Dialog.Title>

        <Dialog.Description asChild>
          <p className="mb-8 text-lg leading-relaxed font-semibold text-white/85 md:text-xl">
            {project.fullDesc}
          </p>
        </Dialog.Description>

        <div className="space-y-5">
          <div className="-mx-6 border-y border-black/10 bg-[#e5e5e5] px-6 py-4 md:-mx-8 md:px-8 lg:-mx-10 lg:px-10">
            <h3 className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#4d4d4d] uppercase">
              {whatItMeansLabel}
            </h3>
            <p className="text-base leading-relaxed font-semibold text-[#2d2d2d] md:text-lg">
              {project.modal.whatItMeans}
            </p>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-black/10 bg-[#f1f1f1] p-0 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f5f5] hover:shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
            <h3 className="border-b border-[#00BCD4]/35 bg-[#00BCD4] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#FFFFFF] uppercase md:px-6">
              {whyItMattersLabel}
            </h3>
            <p className="px-5 pb-6 pt-4 text-base leading-relaxed font-medium text-[#3c3c3c] md:px-6 md:pb-7 md:pt-5 md:text-lg">
              {project.modal.whyItMatters}
            </p>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-black/10 bg-[#f3f3f3] p-0 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f7f7f7] hover:shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
            <h3 className="border-b border-[#00BCD4]/35 bg-[#00BCD4] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#FFFFFF] uppercase md:px-6">
              {includedLabel}
            </h3>
            <ul className="space-y-2 px-5 pb-6 pt-4 md:px-6 md:pb-7 md:pt-5">
              {project.modal.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#1b1b1b]" />
                  <span className="text-base leading-relaxed font-medium text-[#2d2d2d]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-black/10 bg-[#f1f1f1] p-0 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f5f5] hover:shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
            <h3 className="border-b border-[#00BCD4]/35 bg-[#00BCD4] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#FFFFFF] uppercase md:px-6">
              {idealFitLabel}
            </h3>
            <ul className="space-y-2 px-5 pb-6 pt-4 md:px-6 md:pb-7 md:pt-5">
              {project.modal.idealFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#2f2f2f]" />
                  <span className="text-sm leading-relaxed font-semibold text-[#2f2f2f] md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#00BCD4] bg-[#00BCD4] p-0 text-[#FFFFFF] shadow-[0_14px_28px_rgba(15,23,42,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00BCD4] hover:shadow-[0_18px_34px_rgba(15,23,42,0.26)]">
            <h3 className="border-b border-black/10 bg-[#e6e6e6] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#2f2f2f] uppercase md:px-6">
              {outcomeLabel}
            </h3>
            <p className="px-5 pb-6 pt-4 text-base leading-relaxed font-semibold md:px-6 md:pb-7 md:pt-5 md:text-lg">
              {project.modal.typicalOutcome}
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[18px] border border-black/10 bg-[#f0f0f0] p-0 shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f4f4f4] hover:shadow-[0_12px_24px_rgba(15,23,42,0.12)]">
          <span className="block border-b border-black/10 bg-[#e3e3e3] px-5 py-2.5 text-xs font-semibold tracking-[0.07em] text-[#5a5a5a] uppercase md:px-6">
            {lessonLabel}
          </span>
          <p className="px-5 pb-6 pt-4 text-sm leading-relaxed font-medium italic text-[#3e3e3e] md:px-6 md:pb-7 md:pt-5 md:text-base">
            &quot;{project.lessons}&quot;
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenContact}
          className="mt-8 w-full rounded-xl bg-[#00BCD4] px-6 py-3.5 text-sm font-semibold tracking-[0.08em] text-white uppercase shadow-[0_14px_28px_rgba(15,23,42,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#00BCD4] hover:shadow-[0_18px_34px_rgba(15,23,42,0.28)]"
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}
