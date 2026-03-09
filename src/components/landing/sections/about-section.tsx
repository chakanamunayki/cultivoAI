"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { useModal } from "@/components/landing/ui/modal-provider";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import type { TeamMember } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

export function AboutSection() {
  const { content, locale } = useLocale();
  const { openTeamMemberModal } = useModal();
  const noteLabel = locale === "es" ? "Nota" : "Note";

  const handleViewMore = (member: TeamMember) => {
    openTeamMemberModal(member);
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-black/10 bg-white px-6 pt-[calc(15vw+1rem)] pb-6 md:px-12 md:pt-[calc(15vw+1.25rem)] md:pb-12 lg:px-24 lg:pt-[calc(15vw+1.5rem)] lg:pb-24"
    >
      <div className="max-w-[1600px] mx-auto">
        <Reveal>
          <SectionHeader title={content.about.title} subtitle={content.about.subtitle} />
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8 lg:gap-12">
          {content.about.teamMembers.map((member, index) => (
            <Reveal key={member.id} delay={100 * (index + 1)}>
              <div className={`relative group h-full ${index > 0 ? "mt-8 md:mt-0" : ""}`}>
                <div className="relative flex h-full flex-col rounded-[30px] bg-[#e8e8e8] p-5 md:p-6 shadow-[14px_14px_30px_#c7c7c7,-14px_-14px_30px_#ffffff] transition-all duration-300 hover:-translate-y-1 hover:shadow-[18px_18px_34px_#c4c4c4,-18px_-18px_34px_#ffffff]">
                  <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-[22px] bg-[#e4e4e4] filter grayscale contrast-125 shadow-[inset_8px_8px_16px_#cccccc,inset_-8px_-8px_16px_#ffffff] transition-all duration-500 group-hover:grayscale-0">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="eager"
                    />
                  </div>
                  <h3 className="mb-2 text-2xl font-black tracking-tight text-[#222] md:text-3xl">
                    {member.name}
                  </h3>
                  {member.badge && (
                    <div className="mb-2 -mx-5 border-y border-black/10 bg-[#e5e5e5] px-5 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-[#4f4f4f] md:-mx-6 md:px-6">
                      {member.badge}
                    </div>
                  )}
                  <div
                    className="mb-3 -mx-5 border-y border-white/10 bg-[#1f1f1f] px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.07em] text-[#FFFFFF] md:-mx-6 md:px-6 md:text-sm"
                  >
                    {member.title}
                  </div>
                  <div className="mb-3 -mx-5 grid w-auto grid-cols-2 border-y border-black/10 bg-[#ebebeb] md:-mx-6">
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
                  {member.subtitle && (
                    <p className="mb-3 text-xs font-medium text-[#606060]">
                      {member.subtitle}
                    </p>
                  )}
                  <p className="mb-4 flex-grow text-sm font-semibold leading-tight text-[#222] md:text-base">
                    &quot;{member.description}&quot;
                  </p>
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-[#0A66C2] px-4 py-2.5 text-xs font-semibold tracking-[0.06em] text-white uppercase shadow-[0_8px_18px_rgba(8,56,104,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#004182] hover:shadow-[0_10px_22px_rgba(8,56,104,0.38)]"
                      >
                        <Linkedin className="w-3 h-3" />
                        LinkedIn
                      </a>
                    )}
                    <button
                      onClick={() => handleViewMore(member)}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#1f1f1f] px-4 py-2.5 text-xs font-semibold tracking-[0.06em] text-white uppercase shadow-[0_8px_18px_rgba(17,24,39,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#111]"
                    >
                      {content.about.viewMoreLabel} {"->"}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Footer Note */}
        <Reveal delay={400}>
          <div className="mt-12 md:mt-16 text-center">
            <div className="inline-block overflow-hidden rounded-[18px] border border-[#00BCD4] bg-[#00BCD4] px-0 py-0 shadow-[0_16px_30px_rgba(15,23,42,0.22)]">
              <div className="border-b border-white/10 bg-[#1f1f1f] px-6 py-2 text-xs font-semibold tracking-[0.08em] text-[#FFFFFF] uppercase md:px-8">
                {noteLabel}
              </div>
              <p className="px-6 py-4 text-base font-semibold text-[#FFFFFF] md:px-8 md:py-6 md:text-lg">
                {content.about.footerNote.replace(/\*\*/g, "")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

