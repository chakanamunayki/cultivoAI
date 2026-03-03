"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Linkedin, Play } from "lucide-react";
import type { TeamMember } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

interface TeamMemberModalProps {
  member: TeamMember;
  onOpenContact?: () => void;
}

export function TeamMemberModal({ member, onOpenContact }: TeamMemberModalProps) {
  const { locale } = useLocale();
  const ctaText = locale === "es" ? "Hablemos" : "Let's talk";

  return (
    <div className="flex flex-col md:flex-row">
      {/* Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto relative">
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          className="object-cover filter grayscale contrast-125 border-b-4 md:border-b-0 md:border-r-4 border-black"
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 p-8 md:p-12 bg-white overflow-y-auto max-h-[70vh] md:max-h-none">
        {/* Badge */}
        {member.badge && (
          <div className="inline-block mb-4 bg-secondary text-secondary-foreground border-2 border-black px-3 py-1 font-bold uppercase text-xs">
            {member.badge}
          </div>
        )}

        {/* Title */}
        <Dialog.Title asChild>
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-2 leading-tight">
            {member.name}
          </h2>
        </Dialog.Title>

        {/* Role */}
        <div
          className={`${member.accentColor} text-primary-foreground font-bold text-xs md:text-sm inline-block px-3 py-1 mb-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
        >
          {member.title}
        </div>

        {/* Subtitle */}
        {member.subtitle && (
          <p className="text-sm font-medium text-neutral-600 mb-4">{member.subtitle}</p>
        )}

        {/* Bio Headline */}
        <p className="text-lg font-bold mb-6 border-l-4 border-primary pl-4">
          {member.bio.headline}
        </p>

        {/* Bio Sections */}
        <div className="space-y-6">
          {member.bio.sections.map((section, index) => (
            <div key={index} className="bg-muted border-l-4 border-black p-4">
              <span className="font-bold text-xs uppercase block mb-2 text-neutral-500">
                {section.title}
              </span>
              <p className="font-medium text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-8">
          {member.bio.linkedinUrl && (
            <a
              href={member.bio.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0A66C2] text-white font-bold px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#004182] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          )}
          {member.bio.videoUrl && (
            <a
              href={member.bio.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF0000] text-white font-bold px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Play className="w-4 h-4" />
              {member.bio.videoLabel || "Watch Video"}
            </a>
          )}
        </div>

        {/* CTA */}
        {onOpenContact && (
          <button
            type="button"
            onClick={onOpenContact}
            className="mt-8 w-full bg-black text-white border-4 border-black px-6 py-4 font-black uppercase hover:bg-white hover:text-black transition-colors shadow-[8px_8px_0px_0px_var(--primary)] hover:shadow-[4px_4px_0px_0px_var(--primary)]"
          >
            {ctaText}
          </button>
        )}
      </div>
    </div>
  );
}
