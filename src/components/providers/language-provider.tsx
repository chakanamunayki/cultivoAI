"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { en } from "@/content/en";
import { es } from "@/content/es";
import type { Locale, SiteContent } from "@/content/types";

const STORAGE_KEY = "cultivoai-locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  content: SiteContent;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") return "es";

  const browserLang = navigator.language.toLowerCase();

  // Check for Spanish locales
  if (
    browserLang.startsWith("es") ||
    browserLang === "es-co" ||
    browserLang === "es-mx" ||
    browserLang === "es-ar"
  ) {
    return "es";
  }

  // Default to English for all other locales
  return "en";
}

function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") {
      return stored;
    }
  } catch {
    // localStorage might be unavailable
  }

  return null;
}

function storeLocale(locale: Locale): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // localStorage might be unavailable
  }
}

const contentMap: Record<Locale, SiteContent> = {
  es,
  en,
};

function getInitialLocale(defaultLocale?: Locale): Locale {
  // During SSR, use default
  if (typeof window === "undefined") {
    return defaultLocale ?? "es";
  }

  // On client, check storage first, then detect from browser
  const storedLocale = getStoredLocale();
  if (storedLocale) {
    return storedLocale;
  }

  if (defaultLocale) {
    return defaultLocale;
  }

  return detectBrowserLocale();
}

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

export function LanguageProvider({ children, defaultLocale }: LanguageProviderProps) {
  // Use lazy initialization to get the initial locale
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale(defaultLocale));
  const [isHydrated, setIsHydrated] = useState(false);

  // Mark as hydrated after mount
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Sync locale with storage on client after hydration
  useEffect(() => {
    if (!isHydrated) return;

    // Re-check locale from storage/browser after hydration
    const clientLocale = getInitialLocale(defaultLocale);
    if (clientLocale !== locale) {
      setLocaleState(clientLocale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    storeLocale(newLocale);

    // Update HTML lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLocale;
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "es" ? "en" : "es");
  }, [locale, setLocale]);

  const content = contentMap[locale];

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo<LanguageContextValue>(
    () => ({
      locale: isHydrated ? locale : (defaultLocale ?? "es"),
      setLocale,
      toggleLocale,
      content: isHydrated ? content : contentMap[defaultLocale ?? "es"],
    }),
    [locale, setLocale, toggleLocale, content, isHydrated, defaultLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
