"use client";

import { createContext, useCallback, useMemo, useState } from "react";
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

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

export function LanguageProvider({ children, defaultLocale }: LanguageProviderProps) {
  // CRITICAL: Initialize with server-detected locale (passed via defaultLocale prop)
  // Server detects from Accept-Language header, preventing hydration mismatch
  // DO NOT check localStorage on mount - causes hydration errors and prevents hot reload
  const [locale, setLocaleState] = useState<Locale>(defaultLocale ?? SSR_DEFAULT_LOCALE);

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
