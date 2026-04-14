"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Sprout } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

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

export function Nav({ onScrollTo, onOpenChat }: NavProps) {
  const { locale, toggleLocale, content } = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);

  const ctaLabel = locale === "es" ? "Hablemos" : "Let's Talk";

  const navItems = content.nav.filter((item) => {
    const href = item.href?.trim() ?? "";
    if (href.startsWith("#")) {
      return VALID_SECTION_IDS.has(href.slice(1));
    }
    return false;
  });

  const desktopNavItems = navItems.filter((item) =>
    DESKTOP_NAV_KEYS.some((key) => item.href.includes(key))
  );

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (!firstEntry) {
          return;
        }
        setIsOverHero(firstEntry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isMobileMenuOpen]);

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

  const headerStyle = useMemo(() => {
    const blend = !isMobileMenuOpen && isOverHero;

    if (blend) {
      return {
        shell:
          "mix-blend-difference border-white/20 bg-transparent text-white shadow-none backdrop-blur-none",
        subtleButton:
          "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white",
        ctaButton:
          "bg-white text-black hover:bg-white/90",
      };
    }

    return {
      shell:
        "border-black/10 bg-white/[0.92] text-neutral-900 shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur-md",
      subtleButton:
        "border-black/10 bg-white text-neutral-900 hover:bg-neutral-100",
      ctaButton:
        "bg-[#00BCD4] text-neutral-950 hover:bg-[#00BCD4]",
    };
  }, [isMobileMenuOpen, isOverHero]);

  return (
    <>
      <nav data-custom-cursor-region className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-[1600px] px-4 pt-4 md:px-6">
          <div
            className={cn(
              "pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border px-3 py-3 transition-all duration-300 md:px-5",
              headerStyle.shell
            )}
          >
            <button
              type="button"
              onClick={() => scrollTo("hero")}
              aria-label={locale === "es" ? "Ir al inicio" : "Go to home section"}
              className="flex items-center gap-2.5"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border-2 border-white/80 bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,0.25)] -rotate-6 shrink-0">
                <Sprout size={17} fill="currentColor" />
              </span>
              <span className="text-lg leading-none font-black tracking-[-0.02em] md:text-2xl">
                Cultivo<span className="text-[#00BCD4]">AI</span>
              </span>
            </button>

            <div className="hidden items-center gap-2 lg:flex">
              {desktopNavItems.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="rounded-full px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-black/10"
                >
                  {item.label}
                </button>
              ))}

              <button
                type="button"
                onClick={toggleLocale}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-bold tracking-[0.08em] uppercase transition-colors",
                  headerStyle.subtleButton
                )}
              >
                {locale === "es" ? "EN" : "ES"}
              </button>

              <button
                type="button"
                onClick={handleChatClick}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold tracking-[0.04em] uppercase transition-colors",
                  headerStyle.ctaButton
                )}
              >
                <MessageCircle size={16} />
                {ctaLabel}
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "relative h-11 w-11 rounded-full border transition-colors",
                  headerStyle.subtleButton
                )}
              >
                <span
                  className={cn(
                    "absolute left-1/2 h-[2px] w-6 -translate-x-1/2 bg-current transition-all duration-300",
                    isMobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[8px]"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 h-[2px] w-6 -translate-x-1/2 bg-current transition-opacity duration-200",
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 h-[2px] w-6 -translate-x-1/2 bg-current transition-all duration-300",
                    isMobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-[8px]"
                  )}
                />
              </button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={toggleLocale}
                className={cn(
                  "rounded-full border px-3 py-2 text-xs font-bold tracking-[0.08em] uppercase transition-colors",
                  headerStyle.subtleButton
                )}
              >
                {locale === "es" ? "EN" : "ES"}
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "relative h-11 w-11 rounded-full border transition-colors",
                  headerStyle.subtleButton
                )}
              >
                <span
                  className={cn(
                    "absolute left-1/2 h-[2px] w-6 -translate-x-1/2 bg-current transition-all duration-300",
                    isMobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[8px]"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 h-[2px] w-6 -translate-x-1/2 bg-current transition-opacity duration-200",
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 h-[2px] w-6 -translate-x-1/2 bg-current transition-all duration-300",
                    isMobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-[8px]"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        data-custom-cursor-region
        className={cn(
          "fixed inset-0 z-40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-[110%] pointer-events-none"
        )}
      >
        <div className="grid h-full min-h-screen md:grid-cols-[1.25fr_1fr]">
          <div className="relative overflow-hidden bg-[#212121] px-6 pt-28 pb-10 text-white md:px-12 md:pt-36">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.26), transparent 35%), radial-gradient(circle at 80% 10%, rgba(0,188,212,0.35), transparent 35%), linear-gradient(120deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
              }}
            />

            <div className="relative z-10 mx-auto flex h-full w-full max-w-[760px] flex-col">
              <p className="text-xs font-semibold tracking-[0.12em] text-white/[0.70] uppercase">
                {locale === "es" ? "Contacto directo" : "Direct contact"}
              </p>
              <h2 className="mt-4 text-4xl leading-[0.95] font-black tracking-[-0.03em] md:text-6xl">
                {locale === "es" ? "Construyamos algo util" : "Let us build something useful"}
              </h2>
              <p className="mt-4 max-w-xl text-base text-white/[0.75] md:text-lg">
                {content.hero.microcopy}
              </p>

              <div className="mt-8 space-y-4 text-base font-semibold md:text-lg">
                <a
                  href={`mailto:${content.footer.contactInfo.email}`}
                  className="block transition-colors hover:text-[#00BCD4]"
                >
                  {content.footer.contactInfo.email}
                </a>
                <a
                  href={`https://wa.me/${content.footer.contactInfo.whatsapp.replace(/\+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-[#00BCD4]"
                >
                  {content.footer.contactInfo.whatsappDisplay}
                </a>
                <p className="text-white/[0.75]">{content.footer.contactInfo.location}</p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleChatClick}
                  className="inline-flex items-center gap-2 rounded-full bg-[#00BCD4] px-5 py-2.5 text-sm font-bold tracking-[0.08em] text-neutral-950 uppercase transition-colors hover:bg-[#00BCD4]"
                >
                  <MessageCircle size={16} />
                  {ctaLabel}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toggleLocale();
                  }}
                  className="rounded-full border border-white/30 px-4 py-2.5 text-xs font-bold tracking-[0.08em] uppercase transition-colors hover:bg-white/[0.15]"
                >
                  {locale === "es" ? "English" : "Espanol"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#00BCD4] px-6 pt-28 pb-10 text-[#111111] md:px-12 md:pt-36">
            <div className="mx-auto flex h-full w-full max-w-[520px] flex-col">
              <p className="text-xs font-semibold tracking-[0.12em] text-black/[0.60] uppercase">
                {locale === "es" ? "Menu" : "Menu"}
              </p>
              <div className="mt-6 flex flex-col gap-3 md:gap-4">
                {navItems.map((item) => (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => scrollTo(item.href)}
                    className="text-left text-4xl leading-[0.92] font-black tracking-[-0.03em] transition-colors hover:text-white md:text-6xl"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
