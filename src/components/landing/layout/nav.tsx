"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, MessageCircle, Sprout, X, User } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { UserProfile } from "@/components/auth/user-profile";
import { useLocale } from "@/hooks/use-locale";

interface NavProps {
  onScrollTo?: (id: string) => void;
  onOpenChat?: () => void;
}

export function Nav({ onScrollTo, onOpenChat }: NavProps) {
  const { locale, toggleLocale, content } = useLocale();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const signInLabel = locale === "es" ? "Entrar" : "Sign In";

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

  const ctaLabel = locale === "es" ? "Hablemos" : "Let's Talk";

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

        {/* Mobile CTA Button */}
        <button
          onClick={handleChatClick}
          className="lg:hidden px-4 border-l-4 border-black bg-[#FFC805] hover:bg-[#FFDE00] transition-colors font-bold uppercase text-sm flex items-center gap-2"
        >
          <MessageCircle size={18} />
          <span className="hidden sm:inline">{ctaLabel}</span>
        </button>

        {/* Language Toggle (Mobile) */}
        <button
          onClick={toggleLocale}
          className="lg:hidden px-4 border-l-4 border-black hover:bg-[#FFDE00] transition-colors font-bold uppercase text-sm"
        >
          {locale === "es" ? "EN" : "ES"}
        </button>

        {/* Mobile Burger Button */}
        <button
          className="lg:hidden px-6 border-l-4 border-black hover:bg-[#FFDE00] transition-colors flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex flex-1">
          {content.nav.map((item) => (
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
          {/* Auth Button (Desktop) */}
          <div className="px-4 border-l-4 border-black flex items-center">
            {session ? (
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

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b-4 border-black animate-in slide-in-from-top-2 duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] z-40">
          {content.nav.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="w-full text-left p-4 border-b-4 border-black font-black uppercase hover:bg-[#FFDE00] hover:pl-6 transition-all text-lg"
            >
              {item.label}
            </button>
          ))}
          {/* CTA Button in Mobile Menu */}
          <button
            onClick={handleChatClick}
            className="w-full text-left p-4 border-b-4 border-black font-black uppercase bg-[#FFC805] hover:bg-[#FFDE00] hover:pl-6 transition-all text-lg flex items-center gap-3"
          >
            <MessageCircle size={22} />
            {ctaLabel}
          </button>
          {/* Auth in Mobile Menu */}
          {session ? (
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
