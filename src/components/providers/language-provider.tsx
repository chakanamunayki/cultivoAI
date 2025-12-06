"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { en } from "@/content/en";
import { es } from "@/content/es";
import type { Locale, SiteContent } from "@/content/types";

const STORAGE_KEY = "cultivoai-locale";
const SSR_DEFAULT_LOCALE: Locale = "es";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  content: SiteContent;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectBrowserLocale(): Locale {
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

function getClientLocale(defaultLocale?: Locale): Locale {
  // Check storage first, then detect from browser
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
  // CRITICAL: Always initialize with SSR_DEFAULT_LOCALE to match server render
  // This prevents hydration mismatch - we detect and update to client locale after mount
  const [locale, setLocaleState] = useState<Locale>(defaultLocale ?? SSR_DEFAULT_LOCALE);

  // Two-pass rendering to avoid hydration mismatch:
  // 1. Server and client both render with SSR_DEFAULT_LOCALE (no mismatch)
  // 2. After mount, detect client locale and update if different
  useEffect(() => {
    // Now safe to check localStorage/browser and update
    const clientLocale = getClientLocale(defaultLocale);
    if (clientLocale !== locale) {
      setLocaleState(clientLocale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      locale,
      setLocale,
      toggleLocale,
      content,
    }),
    [locale, setLocale, toggleLocale, content]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
