"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { en } from "@/content/en";
import { es } from "@/content/es";
import { pt } from "@/content/pt";
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

function getStoredLocale(): Locale | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "es" || value === "en" || value === "pt" ? value : null;
  } catch {
    // localStorage might be unavailable
    return null;
  }
}

const contentMap: Record<Locale, SiteContent> = {
  es,
  en,
  pt,
};

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

export function LanguageProvider({ children, defaultLocale }: LanguageProviderProps) {
  // CRITICAL: Initialize with server-detected locale (passed via defaultLocale prop).
  // The server detects from the Accept-Language header, so SSR and the first client
  // render agree. NEVER read localStorage in this initializer: it runs during SSR-
  // hydration and would cause a mismatch. Reading it in a post-hydration effect
  // (below) is safe and is how a saved user choice is restored.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale ?? SSR_DEFAULT_LOCALE);

  // After hydration, an explicit stored choice wins over browser detection.
  // If the user never toggled, there is nothing stored and browser detection stands.
  useEffect(() => {
    const stored = getStoredLocale();
    if (stored && stored !== locale) {
      setLocaleState(stored);
      if (typeof document !== "undefined") {
        document.documentElement.lang = stored;
      }
    }
    // Run once on mount. `locale` is intentionally excluded: this restores a saved
    // choice at startup only, it must not re-fire on later toggles.
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
