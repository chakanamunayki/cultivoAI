"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/components/landing/ui/modal-provider";
import { Reveal } from "@/components/landing/ui/reveal";
import type { Project } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

export function ProjectsSection() {
  const { content } = useLocale();
  const { openProjectModal } = useModal();

  const handleProjectClick = (project: Project) => {
    openProjectModal(project);
  };

  return (
    <div id="projects" className="bg-white border-b-4 border-black">
      {/* Title Header */}
      <div className="p-8 md:p-16 border-b-4 border-black bg-neutral-900 text-white">
        <Reveal>
          <h2 className="text-4xl md:text-5xl lg:text-8xl font-black uppercase tracking-tight text-center md:text-left">
            {content.projectsTitle}
            <span className="text-[#A855F7]">.</span>
          </h2>
        </Reveal>
      </div>

      {/* Projects List */}
      <div>
        {content.projects.map((project, i) => (
          <div
            key={i}
            className="group border-b-4 border-black last:border-b-0 grid lg:grid-cols-12 bg-white hover:bg-neutral-50 transition-colors cursor-pointer"
            onClick={() => handleProjectClick(project)}
          >
            <div className="lg:col-span-7 p-6 md:p-8 lg:p-16 flex flex-col justify-center order-2 lg:order-1 border-t-4 lg:border-t-0 border-black lg:border-r-4">
              <Reveal>
                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-black text-white px-3 py-1 font-bold text-xs md:text-sm uppercase shadow-[3px_3px_0px_0px_#A855F7]"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="bg-[#FFDE00] text-black border-2 border-black px-3 py-1 font-bold text-xs md:text-sm uppercase">
                    {project.status}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 md:mb-6 leading-tight group-hover:text-[#A855F7] transition-colors">
                  {project.title}
                </h3>
                <p className="text-lg md:text-xl font-bold mb-6 md:mb-8 max-w-2xl">
                  {project.desc}
                </p>
                <div className="bg-[#F3F4F6] border-l-8 border-black p-4 md:p-6">
                  <span className="font-black text-xs uppercase text-neutral-500 block mb-2">
                    Lesson Learned:
                  </span>
                  <p className="font-medium italic text-sm md:text-base">
                    &quot;{project.lessons}&quot;
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5 h-[300px] md:h-[400px] lg:h-auto relative overflow-hidden order-1 lg:order-2 border-b-4 lg:border-b-0 border-black lg:border-l-0">
              <div className="absolute inset-0 bg-[#A855F7] mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10 pointer-events-none"></div>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={48} className="text-white drop-shadow-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
