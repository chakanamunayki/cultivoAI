"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/components/landing/ui/modal-provider";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import type { Project } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

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
        {content.projects.map((project, i) => (
          <button
            type="button"
            key={i}
            className={`group grid w-full cursor-pointer overflow-hidden rounded-[24px] border text-left transition-all duration-200 lg:grid-cols-12 ${
              i === 0
                ? "border-[#00BCD4] bg-[#00BCD4] text-[#FFFFFF] shadow-[0_18px_34px_rgba(15,23,42,0.22)] hover:-translate-y-1 hover:bg-[#00BCD4] hover:shadow-[0_22px_40px_rgba(15,23,42,0.28)]"
                : "border-black/10 bg-[#f3f3f3] text-[#1f1f1f] shadow-[0_16px_30px_rgba(15,23,42,0.1)] ring-1 ring-white/80 hover:-translate-y-1 hover:bg-[#f7f7f7] hover:shadow-[0_20px_36px_rgba(15,23,42,0.16)]"
            }`}
            onClick={() => handleProjectClick(project)}
          >
            <div className="order-2 flex flex-col justify-center border-t border-black/10 p-6 md:p-8 lg:order-1 lg:col-span-7 lg:border-t-0 lg:border-r lg:border-black/10 lg:p-12">
              <Reveal>
                <div
                  className={`-mx-6 mb-4 border-y px-6 py-2 md:-mx-8 md:mb-6 md:px-8 lg:-mx-12 lg:px-12 ${
                    i === 0
                      ? "border-white/15 bg-[#212121]"
                      : "border-[#00BCD4]/35 bg-[#00BCD4]"
                  }`}
                >
                  <div
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold tracking-[0.08em] text-[#FFFFFF] uppercase md:text-xs"
                  >
                    <span>{project.status}</span>
                    {project.tags.map((tag) => (
                      <span key={tag} className={i === 0 ? "text-white/85" : "text-[#eef9f5]"}>
                        / {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="mb-4 text-3xl leading-tight font-black tracking-tight md:mb-6 md:text-4xl lg:text-5xl">
                  {project.title}
                </h3>
                <p
                  className={`mb-6 max-w-2xl text-lg font-semibold md:mb-8 md:text-xl ${
                    i === 0 ? "text-[#eef9f5]" : ""
                  }`}
                >
                  {project.desc}
                </p>
                <div
                  className={`rounded-[16px] border p-4 md:p-6 ${
                    i === 0 ? "border-white/20 bg-white/10" : "border-black/10 bg-[#ededed]"
                  }`}
                >
                  <span
                    className={`-mx-4 mb-3 block border-y px-4 py-2 text-xs font-semibold tracking-[0.07em] uppercase md:-mx-6 md:px-6 ${
                      i === 0
                        ? "border-white/15 bg-[#212121] text-[#FFFFFF]"
                        : "border-[#00BCD4]/35 bg-[#00BCD4] text-[#FFFFFF]"
                    }`}
                  >
                    {locale === "es" ? "Leccion aprendida:" : "Lesson Learned:"}
                  </span>
                  <p className="text-sm font-medium italic md:text-base">
                    &quot;{project.lessons}&quot;
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="relative order-1 h-[300px] overflow-hidden border-b border-black/10 md:h-[400px] lg:order-2 lg:col-span-5 lg:h-auto lg:border-b-0">
              <div className="bg-primary pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-60"></div>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center contrast-125 grayscale filter transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
              />
              <div className="absolute right-4 bottom-4 z-20 opacity-0 transition-opacity group-hover:opacity-100">
                <ArrowRight size={48} className="text-white drop-shadow-md" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
