"use client";

import { useState } from "react";
import { DollarSign, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Sprout } from "lucide-react";
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
  const { content, locale } = useLocale();
  const [currency, setCurrency] = useState<"USD" | "COP">("USD");

  const currencyLabel = locale === "es" ? "Moneda" : "Currency";

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
    <footer className="bg-black text-white border-t-4 border-[#A855F7]">
      {/* CTA Section */}
      <Reveal>
        <div className="p-8 md:p-16 text-center border-b-4 border-neutral-800">
          <h2
            className="text-3xl md:text-4xl lg:text-7xl font-black uppercase mb-6 md:mb-8 hover:text-[#A855F7] transition-colors cursor-pointer tracking-tight"
            onClick={onContactClick}
          >
            {content.footer.cta.split(".")[0]}?
          </h2>
          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFC805] text-black font-black uppercase text-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all"
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
                <div className="w-10 h-10 bg-[#FFC805] border-2 border-white rounded-xl flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] transform -rotate-6">
                  <Sprout size={24} fill="currentColor" />
                </div>
                <span className="font-black text-2xl tracking-tight leading-none">
                  Cultivo<span className="text-[#A855F7]">AI</span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-[#FFDE00] font-mono text-sm">
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
              <h3 className="font-black uppercase text-lg tracking-tight border-b-2 border-[#A855F7] pb-2 inline-block">
                {content.footer.quickLinksTitle}
              </h3>
              <ul className="space-y-2">
                {content.footer.quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-neutral-300 hover:text-[#FFDE00] hover:pl-2 transition-all font-bold uppercase text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Column 3: Contact Info */}
          <Reveal>
            <div className="space-y-4">
              <h3 className="font-black uppercase text-lg tracking-tight border-b-2 border-[#A855F7] pb-2 inline-block">
                {content.footer.contactTitle}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${content.footer.contactInfo.email}`}
                    className="flex items-center gap-3 text-neutral-300 hover:text-[#FFDE00] transition-colors group"
                  >
                    <Mail size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-sm">{content.footer.contactInfo.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${content.footer.contactInfo.whatsapp.replace(/\+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-neutral-300 hover:text-[#10B981] transition-colors group"
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
              <h3 className="font-black uppercase text-lg tracking-tight border-b-2 border-[#A855F7] pb-2 inline-block">
                {content.footer.socialTitle}
              </h3>
              <ul className="space-y-3">
                {content.footer.socialLinks.map((social) => (
                  <li key={social.platform}>
                    {social.comingSoon ? (
                      <span className="flex items-center gap-3 text-neutral-600 cursor-not-allowed">
                        {socialIcons[social.platform]}
                        <span className="font-bold text-sm">{social.label}</span>
                        <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded font-mono">
                          PRONTO
                        </span>
                      </span>
                    ) : (
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-neutral-300 hover:text-[#FFDE00] transition-colors group"
                      >
                        <span className="group-hover:scale-110 transition-transform">
                          {socialIcons[social.platform]}
                        </span>
                        <span className="font-bold text-sm">{social.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Copyright + Currency Selector */}
      <div className="border-t-2 border-neutral-800 p-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-xs md:text-sm font-bold uppercase">
            {content.footer.copyright}
          </p>

          {/* Currency Selector */}
          <div className="flex items-center gap-3">
            <span className="text-neutral-500 text-xs font-bold uppercase flex items-center gap-1">
              <DollarSign size={14} />
              {currencyLabel}
            </span>
            <div className="flex border-2 border-neutral-700">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1 text-xs font-black uppercase transition-colors ${
                  currency === "USD"
                    ? "bg-[#10B981] text-white"
                    : "bg-transparent text-neutral-400 hover:text-white"
                }`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency("COP")}
                className={`px-3 py-1 text-xs font-black uppercase transition-colors border-l-2 border-neutral-700 ${
                  currency === "COP"
                    ? "bg-[#10B981] text-white"
                    : "bg-transparent text-neutral-400 hover:text-white"
                }`}
              >
                COP
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
