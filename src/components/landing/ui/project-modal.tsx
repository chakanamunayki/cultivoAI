"use client";

import Image from "next/image";
import type { Project } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

interface ProjectModalProps {
  project: Project;
}

export function ProjectModal({ project }: ProjectModalProps) {
  const { locale } = useLocale();

  const lessonLabel = locale === "es" ? "Lesson Learned" : "Lesson Learned";

  return (
    <div className="flex flex-col md:flex-row">
      {/* Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover filter grayscale contrast-125 border-b-4 md:border-b-0 md:border-r-4 border-black"
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-black text-white px-3 py-1 font-bold text-xs uppercase shadow-[3px_3px_0px_0px_#A855F7]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight">
          {project.title}
        </h2>

        {/* Status */}
        <div className="inline-block mb-6 bg-[#FFDE00] border-2 border-black px-3 py-1 font-bold uppercase text-xs">
          {project.status}
        </div>

        {/* Description */}
        <p className="text-lg font-medium leading-relaxed mb-8 opacity-90">
          {project.fullDesc || project.desc}
        </p>

        {/* Lesson Learned */}
        <div className="bg-[#F3F4F6] border-l-8 border-black p-6">
          <span className="font-bold text-xs uppercase block mb-2 text-neutral-500">
            {lessonLabel}
          </span>
          <p className="font-medium italic">&quot;{project.lessons}&quot;</p>
        </div>
      </div>
    </div>
  );
}
