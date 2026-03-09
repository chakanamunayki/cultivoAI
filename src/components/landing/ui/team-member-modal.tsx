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
    <div className="flex flex-col md:flex-row rounded-[26px] overflow-hidden">
      {/* Image */}
      <div className="relative h-64 w-full bg-[#ececec] p-4 md:h-auto md:w-1/2 md:p-5">
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          className="object-cover filter grayscale contrast-125 rounded-[18px] shadow-[inset_10px_10px_20px_#d0d0d0,inset_-10px_-10px_20px_#ffffff]"
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 p-7 md:p-10 bg-[#f7f7f7] overflow-y-auto max-h-[70vh] md:max-h-[92vh] pr-3 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:#9ca3af_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9ca3af]">
        {/* Badge */}
        {member.badge && (
          <div className="mb-3 -mx-7 border-y border-black/10 bg-[#e5e5e5] px-7 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-[#4f4f4f] md:-mx-10 md:px-10">
            {member.badge}
          </div>
        )}

        {/* Title */}
        <Dialog.Title asChild>
          <h2 className="mb-2 text-3xl font-black leading-tight tracking-tight text-[#222] md:text-4xl">
            {member.name}
          </h2>
        </Dialog.Title>

        {/* Role */}
        <div className="mb-3 -mx-7 border-y border-white/10 bg-[#1f1f1f] px-7 py-2 text-center text-xs font-semibold uppercase tracking-[0.07em] text-[#FFFFFF] md:-mx-10 md:px-10 md:text-sm">
          {member.title}
        </div>
        <div className="mb-4 -mx-7 grid w-auto grid-cols-2 border-y border-black/10 bg-[#ebebeb] md:-mx-10">
          <span className="inline-flex items-center justify-center gap-2 border-r border-black/10 px-2.5 py-2 text-[11px] font-semibold uppercase text-[#3f3f3f]">
            <svg
              aria-hidden
              viewBox="0 0 60 30"
              className="h-3 w-4 overflow-hidden rounded-[2px]"
            >
              <rect width="60" height="30" fill="#012169" />
              <path d="M0 0L60 30M60 0L0 30" stroke="#FFFFFF" strokeWidth="6" />
              <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="3" />
              <path d="M30 0V30M0 15H60" stroke="#FFFFFF" strokeWidth="10" />
              <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
            </svg>
            EN
          </span>
          <span className="inline-flex items-center justify-center gap-2 px-2.5 py-2 text-[11px] font-semibold uppercase text-[#3f3f3f]">
            <svg
              aria-hidden
              viewBox="0 0 60 30"
              className="h-3 w-4 overflow-hidden rounded-[2px]"
            >
              <rect width="60" height="30" fill="#AA151B" />
              <rect y="7.5" width="60" height="15" fill="#F1BF00" />
            </svg>
            ES
          </span>
        </div>

        {/* Subtitle */}
        {member.subtitle && (
          <p className="mb-4 text-sm font-medium text-[#606060]">{member.subtitle}</p>
        )}

        {/* Bio Headline */}
        <p className="mb-6 -mx-7 border-y border-black/10 bg-[#e7e7e7] px-7 py-3 text-base font-semibold leading-relaxed text-[#303030] md:-mx-10 md:px-10 md:text-lg">
          {member.bio.headline}
        </p>

        {/* Bio Sections */}
        <div className="space-y-4">
          {member.bio.sections.map((section, index) => (
            <div
              key={index}
              className="rounded-[14px] border border-[#00BCD4] bg-[#00BCD4] p-4 shadow-[0_10px_20px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00BCD4] hover:shadow-[0_14px_28px_rgba(15,23,42,0.25)]"
            >
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.06em] text-[#FFFFFF]">
                {section.title}
              </span>
              <p className="text-sm font-medium leading-relaxed text-[#FFFFFF]">
                {section.content}
              </p>
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
              className="inline-flex items-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(8,56,104,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#004182] hover:shadow-[0_10px_22px_rgba(8,56,104,0.38)]"
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
              className="inline-flex items-center gap-2 rounded-lg bg-[#FF0000] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(127,29,29,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#dc0000] hover:shadow-[0_10px_22px_rgba(127,29,29,0.34)]"
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
            className="mt-8 w-full rounded-xl bg-[#1f1f1f] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_14px_28px_rgba(17,24,39,0.26)] transition-all hover:-translate-y-0.5 hover:bg-[#111] hover:shadow-[0_18px_34px_rgba(17,24,39,0.32)]"
          >
            {ctaText}
          </button>
        )}
      </div>
    </div>
  );
}


