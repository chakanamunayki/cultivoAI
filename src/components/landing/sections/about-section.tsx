"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { useModal } from "@/components/landing/ui/modal-provider";
import { Reveal } from "@/components/landing/ui/reveal";
import type { TeamMember } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

export function AboutSection() {
  const { content } = useLocale();
  const { openTeamMemberModal } = useModal();

  const handleViewMore = (member: TeamMember) => {
    openTeamMemberModal(member);
  };

  return (
    <div
      id="about"
      className="bg-white border-b-4 border-black p-6 md:p-12 lg:p-24 relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row gap-6 mb-12 md:mb-16 items-start">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none bg-black text-white px-4 py-2 inline-block rotate-1">
              {content.about.title}
            </h2>
            <p className="text-lg md:text-xl font-bold max-w-xl md:mt-2 border-l-4 border-[#A855F7] pl-4 md:pl-6">
              {content.about.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8 lg:gap-12">
          {content.about.teamMembers.map((member, index) => (
            <Reveal key={member.id} delay={100 * (index + 1)}>
              <div className={`relative group ${index > 0 ? "mt-8 md:mt-0" : ""}`}>
                <div
                  className={`absolute inset-0 ${member.shadowColor} translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4`}
                ></div>
                <div className="relative border-4 border-black bg-white p-4 h-full transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                  <div className="aspect-[4/5] border-4 border-black overflow-hidden mb-6 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 relative">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="eager"
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase mb-2">
                    {member.name}
                  </h3>
                  {member.badge && (
                    <div className="bg-[#FFDE00] text-black font-bold text-xs inline-block px-2 py-1 mb-2 border-2 border-black w-fit">
                      {member.badge}
                    </div>
                  )}
                  <div
                    className={`${member.accentColor} ${member.id === "rocky" ? "text-black" : "text-white"} font-bold text-xs md:text-sm inline-block px-3 py-1 mb-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-fit`}
                  >
                    {member.title}
                  </div>
                  {member.subtitle && (
                    <p className="text-xs font-medium text-neutral-600 mb-3">
                      {member.subtitle}
                    </p>
                  )}
                  <p className="font-bold text-sm md:text-base leading-tight mb-4 flex-grow">
                    &quot;{member.description}&quot;
                  </p>
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-[#0077B5] text-white font-bold text-xs px-3 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
                      >
                        <Linkedin className="w-3 h-3" />
                        LinkedIn
                      </a>
                    )}
                    <button
                      onClick={() => handleViewMore(member)}
                      className="inline-flex items-center gap-1 bg-black text-white font-bold text-xs px-3 py-2 border-2 border-black shadow-[3px_3px_0px_0px_#A855F7] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#A855F7] transition-all"
                    >
                      {content.about.viewMoreLabel} →
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
            <p className="text-sm md:text-base font-medium text-neutral-600 border-t-2 border-black pt-6 max-w-2xl mx-auto">
              {content.about.footerNote}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
