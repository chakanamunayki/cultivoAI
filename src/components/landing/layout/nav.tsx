"use client";

import { useSyncExternalStore, useState } from "react";
import { Menu, MessageCircle, Sprout, X } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

interface NavProps {
  onScrollTo?: (id: string) => void;
  onOpenChat?: () => void;
}

// Keep nav resilient even if content drifts: only allow links to real homepage section IDs.
const VALID_SECTION_IDS = new Set([
  "hero",
  "about",
  "how-we-work",
  "what-we-do",
  "why-us",
  "services",
  "who-we-help",
  "partnerships",
  "projects",
  "values",
  "mission",
  "what-happens-next",
]);

// Desktop nav shows only these key items
const DESKTOP_NAV_KEYS = ["services", "projects", "about"];

// Hydration-safe mounted state using useSyncExternalStore
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function Nav({ onScrollTo, onOpenChat }: NavProps) {
  const { locale, toggleLocale, content } = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ctaLabel = locale === "es" ? "Hablemos" : "Let's Talk";

  const navItems = content.nav.filter((item) => {
    const href = item.href?.trim() ?? "";
    if (href.startsWith("#")) {
      return VALID_SECTION_IDS.has(href.slice(1));
    }
    return false;
  });

  // Filter nav items for desktop (only key items)
  const desktopNavItems = navItems.filter((item) =>
    DESKTOP_NAV_KEYS.some((key) => item.href.includes(key))
  );

  const scrollTo = (id: string) => {
    if (onScrollTo) {
      onScrollTo(id);
    } else {
      const el = document.getElementById(id.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleChatClick = () => {
    setIsMobileMenuOpen(false);
    onOpenChat?.();
  };

  // Use client-only rendering for marquee to avoid hydration mismatch
  const isClient = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  // Render a single marquee sequence to avoid visible duplication.
  const marqueeItems = isClient ? Array.from(new Set(content.marquee)) : [];
  const marqueeText = isClient && marqueeItems.length ? `${marqueeItems.join(" | ")} | ` : "";

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="flex justify-between items-stretch relative bg-white z-50 border-b-4 border-black">
        {/* Logo Section */}
        <button
          type="button"
          className="p-3 md:p-4 border-r-4 border-black flex items-center gap-3 cursor-pointer group hover:bg-gray-50 transition-colors"
          onClick={() => scrollTo("hero")}
          aria-label={locale === "es" ? "Ir al inicio" : "Go to home section"}
        >
          <div className="w-10 h-10 bg-primary border-2 border-black rounded-xl flex items-center justify-center text-primary-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-6 group-hover:rotate-0 transition-transform">
            <Sprout size={24} fill="currentColor" />
          </div>
          <span className="font-black text-2xl tracking-tight leading-none">
            Cultivo<span className="text-primary">AI</span>
          </span>
        </button>

        {/* Mobile: CTA + Language + Burger (right side) */}
        <div className="lg:hidden flex items-stretch ml-auto">
          {/* Mobile CTA Button */}
          <button
            type="button"
            onClick={handleChatClick}
            className="px-4 border-l-4 border-black bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold uppercase text-sm flex items-center gap-2"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">{ctaLabel}</span>
          </button>

          {/* Language Toggle (Mobile) */}
          <button
            type="button"
            onClick={toggleLocale}
            className="px-4 border-l-4 border-black hover:bg-secondary transition-colors font-bold uppercase text-sm"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>

          {/* Mobile Burger Button (rightmost) */}
          <button
            type="button"
            className="px-6 border-l-4 border-black hover:bg-secondary transition-colors flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Links (simplified - only key items) */}
        <div className="hidden lg:flex flex-1">
          {desktopNavItems.map((item) => (
            <button
              type="button"
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="flex-1 px-4 border-r-4 border-black font-bold uppercase hover:bg-secondary transition-colors text-sm"
            >
              {item.label}
            </button>
          ))}
          {/* CTA Button (Desktop) */}
          <button
            type="button"
            onClick={handleChatClick}
            className="px-6 border-l-4 border-black bg-primary text-primary-foreground font-bold uppercase hover:bg-primary/90 hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <MessageCircle size={18} />
            {ctaLabel}
          </button>
          {/* Language Toggle (Desktop) */}
          <button
            type="button"
            onClick={toggleLocale}
            className="px-6 border-l-4 border-black font-bold uppercase hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          {/* Desktop Burger Button */}
          <button
            type="button"
            className="px-5 border-l-4 border-black hover:bg-secondary transition-colors flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu (Mobile & Desktop) */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b-4 border-black animate-in slide-in-from-top-2 duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] z-40 max-h-[calc(100vh-120px)] overflow-y-auto">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="w-full text-left p-4 border-b-4 border-black font-black uppercase hover:bg-secondary hover:pl-6 transition-all text-lg"
            >
              {item.label}
            </button>
          ))}

          {/* CTA Button in Mobile Menu */}
          <button
            type="button"
            onClick={handleChatClick}
            className="w-full text-left p-4 border-b-4 border-black font-black uppercase bg-primary text-primary-foreground hover:bg-primary/90 hover:pl-6 transition-all text-lg flex items-center gap-3"
          >
            <MessageCircle size={22} />
            {ctaLabel}
          </button>
        </div>
      )}

      {/* Sticky Ticker under nav */}
      <div className="bg-black text-white overflow-hidden whitespace-nowrap py-2 md:py-2.5 border-b-4 border-black">
        <div className="animate-marquee inline-block font-bold tracking-wide uppercase text-xs md:text-sm">
          {marqueeText}
        </div>
      </div>
    </nav>
  );
}

