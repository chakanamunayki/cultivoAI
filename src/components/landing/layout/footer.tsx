"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BrandMark } from "@/components/landing/ui/brand-mark";
import type { SocialLink } from "@/content/types";
import { useLocale } from "@/hooks/use-locale";
import { Reveal } from "../ui/reveal";

interface FooterProps {
  onContactClick?: () => void;
  onScrollTo?: (id: string) => void;
}

// Social icon mapping
const socialIcons: Record<SocialLink["platform"], React.ReactNode> = {
  linkedin: <Linkedin size={20} />,
  whatsapp: <MessageCircle size={20} />,
  instagram: <Instagram size={20} />,
  facebook: <Facebook size={20} />,
};

export function Footer({ onContactClick, onScrollTo }: FooterProps) {
  const { content } = useLocale();

  const scrollTo = (href: string) => {
    if (onScrollTo) {
      onScrollTo(href);
    } else {
      const el = document.getElementById(href.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-black text-white border-t border-white/10">
      {/* CTA Section */}
      <Reveal>
        <div className="p-8 md:p-16 text-center border-b border-white/10">
          <h2 className="text-3xl md:text-4xl lg:text-7xl font-black uppercase mb-6 md:mb-8 tracking-tight">
            {content.footer.cta}
          </h2>
          <button
            type="button"
            onClick={onContactClick}
            className="inline-flex items-center gap-3 rounded-xl bg-[#FFFFFF] px-8 py-4 text-lg font-semibold tracking-[0.06em] text-[#18181b] uppercase shadow-[0_16px_30px_rgba(15,23,42,0.3)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_36px_rgba(15,23,42,0.36)]"
          >
            <MessageCircle size={24} />
            {content.footer.ctaButton}
          </button>
        </div>
      </Reveal>

      {/* Multi-column Section */}
      <div className="p-8 md:p-12 lg:p-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Logo + Tagline + Location */}
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <BrandMark className="h-10 w-10 text-primary" />
                <span className="flex items-baseline gap-1.5 leading-none">
                  <span className="text-[28px] font-bold tracking-[-0.03em]">Cultivo</span>
                  <span className="font-mono text-base font-medium tracking-[0.04em] text-primary">labs</span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-primary font-mono text-sm">
                <MapPin size={18} />
                <div>
                  <p>{content.footer.contactInfo.location}</p>
                  <p className="text-neutral-400">{content.footer.contactInfo.locationSecondary}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Column 2: Quick Links */}
          <Reveal>
            <div className="space-y-4">
              <h3 className="font-black uppercase text-lg tracking-tight border-b border-white/10 pb-2 inline-block">
                {content.footer.quickLinksTitle}
              </h3>
              <ul className="space-y-2">
                {content.footer.quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollTo(link.href);
                      }}
                      className="text-neutral-300 hover:text-primary hover:pl-2 transition-all font-bold uppercase text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Column 3: Contact Info */}
          <Reveal>
            <div className="space-y-4">
              <h3 className="font-black uppercase text-lg tracking-tight border-b border-white/10 pb-2 inline-block">
                {content.footer.contactTitle}
              </h3>
              <ul className="space-y-3">
                {content.footer.contactInfo.email ? (
                  <li>
                    <a
                      href={`mailto:${content.footer.contactInfo.email}`}
                      className="flex items-center gap-3 text-neutral-300 hover:text-primary transition-colors group"
                    >
                      <Mail size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-sm">{content.footer.contactInfo.email}</span>
                    </a>
                  </li>
                ) : null}
                <li>
                  <a
                    href={`https://wa.me/${content.footer.contactInfo.whatsapp.replace(/\+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-neutral-300 hover:text-primary transition-colors group"
                  >
                    <Phone size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-sm">{content.footer.contactInfo.whatsappDisplay}</span>
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Column 4: Social Links */}
          <Reveal>
            <div className="space-y-4">
              <h3 className="font-black uppercase text-lg tracking-tight border-b border-white/10 pb-2 inline-block">
                {content.footer.socialTitle}
              </h3>
              <ul className="space-y-3">
                {content.footer.socialLinks.filter((social) => !social.comingSoon).map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-neutral-300 hover:text-primary transition-colors group"
                    >
                      <span className="group-hover:scale-110 transition-transform">
                        {socialIcons[social.platform]}
                      </span>
                      <span className="font-bold text-sm">{social.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 p-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-400 text-xs md:text-sm font-bold uppercase">
            {content.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
