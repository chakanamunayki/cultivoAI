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
    <div className="bg-[#FAFAFA]">
      {/* Top Gallery */}
      <div className="border-b-4 border-black bg-[#18181B]">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={imageGallery[activeImageIndex] ?? project.image}
            alt={`${project.title} - ${galleryLabel} ${activeImageIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 960px"
            priority
          />

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                aria-label={locale === "es" ? "Imagen anterior" : "Previous image"}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 bg-white text-black border-4 border-black p-2 md:p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-48%] transition-transform"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                aria-label={locale === "es" ? "Siguiente imagen" : "Next image"}
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 bg-white text-black border-4 border-black p-2 md:p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-48%] transition-transform"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {hasMultipleImages && (
            <div className="absolute bottom-3 right-3 bg-black text-white border-2 border-white px-3 py-1.5 font-black text-xs">
              {activeImageIndex + 1} / {imageGallery.length}
            </div>
          )}
        </div>

        {hasMultipleImages && (
          <div className="border-t-4 border-black bg-[#F4F4F5] px-4 md:px-6 py-3 overflow-x-auto">
            <div className="flex gap-3 min-w-max">
              {imageGallery.map((src, index) => (
                <button
                  type="button"
                  key={`${src}-${index}`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`${galleryLabel} ${index + 1}`}
                  className={[
                    "relative w-24 h-14 md:w-28 md:h-16 border-4 shrink-0 overflow-hidden",
                    index === activeImageIndex ? "border-black" : "border-[#E4E4E7]",
                  ].join(" ")}
                >
                  <Image
                    src={src}
                    alt={`${project.title} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 lg:p-10 bg-white">
        <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
          <span className="bg-[#F4F4F5] text-[#18181B] border-2 border-black px-3 py-1 font-bold text-xs uppercase">
            {project.status}
          </span>
          {project.tags.map((tag) => (
            <span key={tag} className="bg-black text-white px-3 py-1 font-bold text-xs uppercase">
              {tag}
            </span>
          ))}
        </div>

        <Dialog.Title asChild>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 leading-tight">
            {project.title}
          </h2>
        </Dialog.Title>

        <Dialog.Description asChild>
          <p className="text-lg md:text-xl font-bold leading-relaxed mb-8">{project.fullDesc}</p>
        </Dialog.Description>

        <div className="space-y-6">
          <div className="border-l-8 border-black pl-5">
            <h3 className="font-black uppercase text-xs tracking-widest text-neutral-600 mb-2">
              {whatItMeansLabel}
            </h3>
            <p className="text-lg md:text-xl font-bold leading-relaxed">
              {project.modal.whatItMeans}
            </p>
          </div>

          <div className="bg-[#F4F4F5] border-4 border-black p-5 md:p-6">
            <h3 className="font-black uppercase text-sm mb-2">{whyItMattersLabel}</h3>
            <p className="font-medium text-base md:text-lg leading-relaxed opacity-90">
              {project.modal.whyItMatters}
            </p>
          </div>

          <div className="bg-white border-4 border-black p-5 md:p-6">
            <h3 className="font-black uppercase text-sm mb-3">{includedLabel}</h3>
            <ul className="space-y-2">
              {project.modal.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-3 h-3 bg-black shrink-0" />
                  <span className="font-medium text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#F4F4F5] border-4 border-black p-5 md:p-6">
            <h3 className="font-black uppercase text-sm mb-3">{idealFitLabel}</h3>
            <ul className="space-y-2">
              {project.modal.idealFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-3 h-3 bg-black shrink-0" />
                  <span className="font-bold text-sm md:text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_black]">
            <h3 className="font-black uppercase text-sm mb-3">{outcomeLabel}</h3>
            <p className="font-bold text-base md:text-lg leading-relaxed">
              {project.modal.typicalOutcome}
            </p>
          </div>
        </div>

        <div className="bg-[#F4F4F5] border-l-8 border-black p-6 mt-8">
          <span className="font-bold text-xs uppercase block mb-2 text-neutral-500">
            {lessonLabel}
          </span>
          <p className="font-medium italic">&quot;{project.lessons}&quot;</p>
        </div>

        <button
          type="button"
          onClick={onOpenContact}
          className="mt-8 w-full bg-black text-white border-4 border-black px-6 py-4 font-black uppercase hover:bg-white hover:text-black transition-colors shadow-[8px_8px_0px_0px_var(--primary)] hover:shadow-[4px_4px_0px_0px_var(--primary)]"
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}
