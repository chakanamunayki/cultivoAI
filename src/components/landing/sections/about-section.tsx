"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Linkedin } from "lucide-react";
import { useModal } from "@/components/landing/ui/modal-provider";
import { Reveal } from "@/components/landing/ui/reveal";
import { SectionHeader } from "@/components/landing/ui/section-header";
import type { TeamMember } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";

export function AboutSection() {
  const { content, ui } = useLocale();
  const { openTeamMemberModal } = useModal();
  const noteLabel = ui.aboutNote;
  const carousel = ui.aboutCarousel;
  const members = content.about.teamMembers;
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mobile only: the card whose centre is nearest the track's centre is the active one.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const trackRect = track.getBoundingClientRect();
      const centre = trackRect.left + trackRect.width / 2;
      let nearest = 0;
      let nearestDistance = Infinity;
      Array.from(track.children).forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - centre);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
      });
      setActiveIndex(nearest);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToCard = useCallback((index: number) => {
    const track = trackRef.current;
    const card = track?.children[index];
    if (!track || !card) return;
    const paddingLeft = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    const left =
      track.scrollLeft +
      card.getBoundingClientRect().left -
      track.getBoundingClientRect().left -
      paddingLeft;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === members.length - 1;
  // Mobile arrows sit on the middle of the photo: track top padding + card padding + half the 4:5 photo.
  const arrowTop = "calc(36px + 0.625 * (0.85 * (100vw - 48px) - 40px))";
  const arrowClass =
    "absolute z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#1f1f1f] text-white shadow-[0_8px_18px_rgba(17,24,39,0.32)] transition-opacity duration-300 md:hidden";

  const handleViewMore = (member: TeamMember) => {
    openTeamMemberModal(member);
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-black/10 bg-white px-6 pt-[calc(clamp(5rem,7vw,8rem)+0.75rem)] pb-6 md:px-12 md:pt-[calc(clamp(5rem,7vw,8rem)+1rem)] md:pb-12 lg:px-24 lg:pt-[calc(clamp(5rem,7vw,8rem)+1.25rem)] lg:pb-24"
    >
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <SectionHeader
            title={content.about.title}
            subtitle={content.about.subtitle}
            className="mb-6 md:mb-8"
          />
          <p className="mb-12 max-w-3xl text-base leading-relaxed text-[#3a3a3a] md:mb-16 md:text-lg">
            {content.about.intro}
          </p>
        </Reveal>

        {/* Mobile: the whole row fades in once (cards off to the side would otherwise fade in late).
            Desktop: this wrapper stays still and each card fades in on its own. */}
        <Reveal className="md:translate-y-0! md:opacity-100! md:transition-none!">
          <div role="region" aria-label={carousel.label} className="relative">
            <div
              ref={trackRef}
              className="-mx-6 -mt-4 -mb-12 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pt-4 pb-12 [scrollbar-width:none] md:mx-0 md:my-0 md:grid md:snap-none md:grid-cols-2 md:gap-8 md:overflow-visible md:p-0 lg:grid-cols-3 lg:gap-12 [&::-webkit-scrollbar]:hidden"
            >
              {members.map((member, index) => (
                <Reveal
                  key={member.id}
                  delay={100 * (index + 1)}
                  className="w-[85%] shrink-0 snap-start max-md:translate-y-0! max-md:opacity-100! max-md:transition-none! md:w-auto"
                >
                  <div className="group relative h-full">
                    <div className="relative flex h-full flex-col rounded-[30px] bg-[#e8e8e8] p-5 shadow-[14px_14px_30px_#c7c7c7,-14px_-14px_30px_#ffffff] transition-all duration-300 hover:-translate-y-1 hover:shadow-[18px_18px_34px_#c4c4c4,-18px_-18px_34px_#ffffff] md:p-6">
                      <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-[22px] bg-[#e4e4e4] shadow-[inset_8px_8px_16px_#cccccc,inset_-8px_-8px_16px_#ffffff] contrast-125 grayscale filter transition-all duration-500 group-hover:grayscale-0">
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
                          loading="eager"
                        />
                      </div>
                      <h3 className="mb-2 text-2xl font-black tracking-tight text-[#222] md:text-3xl">
                        {member.name}
                      </h3>
                      {member.badge && (
                        <div className="-mx-5 mb-2 border-y border-black/10 bg-[#e5e5e5] px-5 py-2 text-center text-[11px] font-semibold tracking-[0.08em] text-[#4f4f4f] uppercase md:-mx-6 md:px-6">
                          {member.badge}
                        </div>
                      )}
                      <div className="-mx-5 mb-3 border-y border-white/10 bg-[#1f1f1f] px-5 py-2 text-center text-xs font-semibold tracking-[0.07em] text-[#FFFFFF] uppercase md:-mx-6 md:px-6 md:text-sm">
                        {member.title}
                      </div>
                      <div className="-mx-5 mb-3 grid w-auto grid-cols-2 border-y border-black/10 bg-[#ebebeb] md:-mx-6">
                        <span className="inline-flex items-center justify-center gap-2 border-r border-black/10 px-2.5 py-2 text-[11px] font-semibold text-[#3f3f3f] uppercase">
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
                        <span className="inline-flex items-center justify-center gap-2 px-2.5 py-2 text-[11px] font-semibold text-[#3f3f3f] uppercase">
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
                        <p className="mb-3 text-xs font-medium text-[#606060]">{member.subtitle}</p>
                      )}
                      <p className="mb-4 flex-grow text-sm leading-tight font-semibold text-[#222] md:text-base">
                        &quot;{member.description}&quot;
                      </p>
                      {/* Action Buttons */}
                      <div className="mt-auto flex flex-wrap gap-2">
                        {member.linkedinUrl && (
                          <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-[#0A66C2] px-4 py-2.5 text-xs font-semibold tracking-[0.06em] text-white uppercase shadow-[0_8px_18px_rgba(8,56,104,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#004182] hover:shadow-[0_10px_22px_rgba(8,56,104,0.38)]"
                          >
                            <Linkedin className="h-3 w-3" />
                            LinkedIn
                          </a>
                        )}
                        {member.bio && (
                          <button
                            onClick={() => handleViewMore(member)}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#1f1f1f] px-4 py-2.5 text-xs font-semibold tracking-[0.06em] text-white uppercase shadow-[0_8px_18px_rgba(17,24,39,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#111]"
                          >
                            {content.about.viewMoreLabel}
                            <ArrowRight size={14} aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToCard(activeIndex - 1)}
              disabled={isFirst}
              aria-label={carousel.previous}
              style={{ top: arrowTop }}
              className={`${arrowClass} left-0 ${isFirst ? "pointer-events-none opacity-0" : "opacity-100"}`}
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollToCard(activeIndex + 1)}
              disabled={isLast}
              aria-label={carousel.next}
              style={{ top: arrowTop }}
              className={`${arrowClass} right-0 ${isLast ? "pointer-events-none opacity-0" : "opacity-100"}`}
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            <div className="mt-2 flex justify-center gap-1 md:hidden">
              {members.map((member, index) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => scrollToCard(index)}
                  aria-label={`${carousel.goTo} ${member.name}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className="p-2"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-6 bg-[#1f1f1f]" : "w-2 bg-black/20"}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Footer Note */}
        <Reveal delay={400}>
          <div className="mt-12 text-center md:mt-16">
            <div className="inline-block overflow-hidden rounded-[18px] border border-[#00BCD4] bg-[#00BCD4] px-0 py-0 shadow-[0_16px_30px_rgba(15,23,42,0.22)]">
              <div className="border-b border-white/10 bg-[#1f1f1f] px-6 py-2 text-xs font-semibold tracking-[0.08em] text-[#FFFFFF] uppercase md:px-8">
                {noteLabel}
              </div>
              <p className="px-6 py-4 text-base font-semibold text-[#18181b] md:px-8 md:py-6 md:text-lg">
                {content.about.footerNote.replace(/\*\*/g, "")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
