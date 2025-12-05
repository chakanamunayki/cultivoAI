"use client";

import { useSyncExternalStore, useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, Sprout, X, User, ChevronDown } from "lucide-react";
import { UserProfile } from "@/components/auth/user-profile";
import { useLocale } from "@/hooks/use-locale";
import { useSession } from "@/lib/auth-client";

interface NavProps {
  onScrollTo?: (id: string) => void;
  onOpenChat?: () => void;
}

// Desktop nav shows only these key items
const DESKTOP_NAV_KEYS = ["services", "projects", "about"];

// Hydration-safe mounted state using useSyncExternalStore
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function Nav({ onScrollTo, onOpenChat }: NavProps) {
  const { locale, toggleLocale, content } = useLocale();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  // Prevent hydration mismatch by only rendering auth-dependent content after mount
  const isMounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  const signInLabel = locale === "es" ? "Entrar" : "Sign In";
  const ctaLabel = locale === "es" ? "Hablemos" : "Let's Talk";
  const moreLabel = locale === "es" ? "Más" : "More";

  // Filter nav items for desktop (only key items)
  const desktopNavItems = content.nav.filter((item) =>
    DESKTOP_NAV_KEYS.some((key) => item.href.includes(key))
  );

  // Group mobile nav items into main and "more" sections
  const mobileMainItems = content.nav.filter((item) =>
    DESKTOP_NAV_KEYS.some((key) => item.href.includes(key))
  );
  const mobileMoreItems = content.nav.filter(
    (item) => !DESKTOP_NAV_KEYS.some((key) => item.href.includes(key))
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
    setExpandedSubmenu(null);
  };

  const handleChatClick = () => {
    setIsMobileMenuOpen(false);
    onOpenChat?.();
  };

  const toggleSubmenu = (submenu: string) => {
    setExpandedSubmenu(expandedSubmenu === submenu ? null : submenu);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black">
      <div className="flex justify-between items-stretch relative bg-white z-50">
        {/* Logo Section */}
        <div
          className="p-3 md:p-4 border-r-4 border-black flex items-center gap-3 cursor-pointer group hover:bg-gray-50 transition-colors"
          onClick={() => scrollTo("hero")}
        >
          <div className="w-10 h-10 bg-[#FFC805] border-2 border-black rounded-xl flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-6 group-hover:rotate-0 transition-transform">
            <Sprout size={24} fill="currentColor" />
          </div>
          <span className="font-black text-2xl tracking-tight leading-none">
            Cultivo<span className="text-[#A855F7]">AI</span>
          </span>
        </div>

        {/* Mobile: CTA + Language + Burger (right side) */}
        <div className="lg:hidden flex items-stretch ml-auto">
          {/* Mobile CTA Button */}
          <button
            onClick={handleChatClick}
            className="px-4 border-l-4 border-black bg-[#FFC805] hover:bg-[#FFDE00] transition-colors font-bold uppercase text-sm flex items-center gap-2"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">{ctaLabel}</span>
          </button>

          {/* Language Toggle (Mobile) */}
          <button
            onClick={toggleLocale}
            className="px-4 border-l-4 border-black hover:bg-[#FFDE00] transition-colors font-bold uppercase text-sm"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>

          {/* Mobile Burger Button (rightmost) */}
          <button
            className="px-6 border-l-4 border-black hover:bg-[#FFDE00] transition-colors flex items-center justify-center"
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
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="flex-1 px-4 border-r-4 border-black font-bold uppercase hover:bg-[#FFDE00] transition-colors text-sm"
            >
              {item.label}
            </button>
          ))}
          {/* CTA Button (Desktop) */}
          <button
            onClick={handleChatClick}
            className="px-6 border-l-4 border-black bg-[#FFC805] font-bold uppercase hover:bg-[#FFDE00] hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <MessageCircle size={18} />
            {ctaLabel}
          </button>
          {/* Language Toggle (Desktop) */}
          <button
            onClick={toggleLocale}
            className="px-6 border-l-4 border-black font-bold uppercase hover:bg-[#A855F7] hover:text-white transition-colors text-sm"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          {/* Desktop Burger Button */}
          <button
            className="px-5 border-l-4 border-black hover:bg-[#FFDE00] transition-colors flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {/* Auth Button (Desktop) */}
          <div className="px-4 border-l-4 border-black flex items-center">
            {isMounted && session ? (
              <UserProfile />
            ) : (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-bold uppercase text-sm hover:text-[#A855F7] transition-colors"
              >
                <User size={18} />
                {signInLabel}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu (Mobile & Desktop) */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b-4 border-black animate-in slide-in-from-top-2 duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] z-40">
          {/* Main nav items */}
          {mobileMainItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="w-full text-left p-4 border-b-4 border-black font-black uppercase hover:bg-[#FFDE00] hover:pl-6 transition-all text-lg"
            >
              {item.label}
            </button>
          ))}

          {/* "More" submenu with expandable sections */}
          {mobileMoreItems.length > 0 && (
            <>
              <button
                onClick={() => toggleSubmenu("more")}
                className="w-full text-left p-4 border-b-4 border-black font-black uppercase hover:bg-gray-100 transition-all text-lg flex items-center justify-between"
              >
                <span>{moreLabel}</span>
                <ChevronDown
                  size={24}
                  className={`transition-transform ${expandedSubmenu === "more" ? "rotate-180" : ""}`}
                />
              </button>

              {/* Expanded submenu items */}
              {expandedSubmenu === "more" && (
                <div className="bg-gray-50 border-b-4 border-black">
                  {mobileMoreItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => scrollTo(item.href)}
                      className="w-full text-left p-4 pl-8 border-b-2 border-gray-200 last:border-b-0 font-bold uppercase hover:bg-[#FFDE00] hover:pl-10 transition-all text-base"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* CTA Button in Mobile Menu */}
          <button
            onClick={handleChatClick}
            className="w-full text-left p-4 border-b-4 border-black font-black uppercase bg-[#FFC805] hover:bg-[#FFDE00] hover:pl-6 transition-all text-lg flex items-center gap-3"
          >
            <MessageCircle size={22} />
            {ctaLabel}
          </button>

          {/* Auth in Mobile Menu */}
          {isMounted && session ? (
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-left p-4 font-black uppercase hover:bg-[#FFDE00] hover:pl-6 transition-all text-lg flex items-center gap-3"
            >
              <User size={22} />
              Dashboard
            </Link>
          ) : (
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-left p-4 font-black uppercase hover:bg-[#FFDE00] hover:pl-6 transition-all text-lg flex items-center gap-3"
            >
              <User size={22} />
              {signInLabel}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
