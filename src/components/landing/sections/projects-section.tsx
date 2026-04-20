"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  landingCardClass,
  landingTitleBandClass,
  type LandingCardVariant,
} from "@/components/landing/ui/landing-card-styles";
import { useModal } from "@/components/landing/ui/modal-provider";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import type { Project } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const { content, locale } = useLocale();
  const { openProjectModal } = useModal();

  const handleProjectClick = (project: Project) => {
    openProjectModal(project);
  };

  return (
    <div id="projects" className="border-b border-black/10 bg-white">
      {/* Title Header */}
      <div className="border-b border-black/10 p-8 md:p-12 lg:p-16">
        <Reveal>
          <SectionHeader
            title={content.projectsTitle}
            subtitle={content.projectsSubtitle}
            className="mb-0"
            subtitleClassName="max-w-2xl"
          />
        </Reveal>
      </div>

      {/* Projects List */}
      <div className="space-y-6 p-6 md:p-8 lg:p-10">
        {content.projects.map((project, i) => {
          const variant: LandingCardVariant = i === 0 ? "blue" : "dark";
          const lessonVariant: LandingCardVariant = variant === "blue" ? "dark" : "blue";

          return (
            <button
              type="button"
              key={i}
              className={landingCardClass(
                variant,
                "group grid w-full cursor-pointer overflow-hidden rounded-[24px] text-left lg:grid-cols-12 hover:-translate-y-1"
              )}
              onClick={() => handleProjectClick(project)}
            >
              <div
                className={cn(
                  "order-2 flex flex-col justify-center border-t p-6 md:p-8 lg:order-1 lg:col-span-7 lg:border-t-0 lg:border-r lg:p-12",
                  variant === "blue" ? "border-white/15" : "border-white/10"
                )}
              >
                <Reveal>
                  <div
                    className={landingTitleBandClass(
                      variant,
                      "-mx-6 mb-4 px-6 py-2 md:-mx-8 md:mb-6 md:px-8 lg:-mx-12 lg:px-12"
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold tracking-[0.08em] text-[#FFFFFF] uppercase md:text-xs">
                      <span>{project.status}</span>
                      {project.tags.map((tag) => (
                        <span key={tag} className={variant === "blue" ? "text-white/85" : "text-white/80"}>
                          / {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="mb-4 text-3xl leading-tight font-black tracking-tight md:mb-6 md:text-4xl lg:text-5xl">
                    {project.title}
                  </h3>
                  <p
                    className={cn(
                      "max-w-2xl text-lg font-semibold md:text-xl",
                      project.stats ? "mb-0" : "mb-6 md:mb-8",
                      variant === "blue" ? "text-[#eef9f5]" : "text-white/90"
                    )}
                  >
                    {project.desc}
                  </p>

                  {project.stats && project.stats.length > 0 && (
                    <div
                      className="-mx-6 my-6 grid border-y border-white/10 bg-black/25 md:-mx-8 md:my-8 lg:-mx-12"
                      style={{ gridTemplateColumns: `repeat(${project.stats.length}, 1fr)` }}
                    >
                      {project.stats.map((stat, idx) => (
                        <div
                          key={stat.label}
                          className={cn(
                            "py-5 text-center",
                            idx > 0 && "border-l border-white/10"
                          )}
                        >
                          <div className="text-4xl font-black leading-none tracking-tight text-primary md:text-5xl">
                            {stat.value}
                          </div>
                          <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 md:text-[11px]">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={cn(
                        "mb-6 inline-flex items-center gap-2 border-2 px-5 py-2.5 text-sm font-black uppercase tracking-[0.1em] transition-all hover:-translate-y-0.5 md:mb-8",
                        variant === "blue"
                          ? "border-white bg-white/10 text-white hover:bg-white hover:text-black"
                          : "border-primary bg-primary/10 text-primary hover:bg-primary hover:text-black"
                      )}
                    >
                      {locale === "es" ? "Ver sitio" : "Visit site"}
                      <ArrowRight size={14} />
                    </a>
                  )}

                  <div className={landingCardClass(lessonVariant, "overflow-hidden rounded-[16px] p-0 hover:translate-y-0")}>
                    <span
                      className={landingTitleBandClass(
                        lessonVariant,
                        "block px-4 py-2 text-xs font-semibold tracking-[0.07em] uppercase md:px-6"
                      )}
                    >
                      {locale === "es" ? "Leccion aprendida:" : "Lesson Learned:"}
                    </span>
                    <p
                      className={cn(
                        "px-4 pb-4 pt-3 text-sm font-medium italic md:px-6 md:pb-6 md:pt-4 md:text-base",
                        lessonVariant === "blue" ? "text-white/95" : "text-white/90"
                      )}
                    >
                      &quot;{project.lessons}&quot;
                    </p>
                  </div>
                </Reveal>
              </div>
              <div
                className={cn(
                  "relative order-1 h-[300px] overflow-hidden border-b md:h-[400px] lg:order-2 lg:col-span-5 lg:h-auto lg:border-b-0",
                  variant === "blue" ? "border-white/15" : "border-white/10"
                )}
              >
                <div className="bg-primary pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-60"></div>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover animate-scroll-preview contrast-125 grayscale filter transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                />
                <div className="absolute right-4 bottom-4 z-20 opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowRight size={48} className="text-white drop-shadow-md" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
