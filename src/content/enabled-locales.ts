import type { Locale } from "./types";

/**
 * Locales offered to visitors. Portuguese content is kept in src/content/pt.ts
 * but hidden for now; add "pt" back here to re-enable it everywhere
 * (nav selector, server detection, stored-choice restore).
 */
export const ENABLED_LOCALES: readonly Locale[] = ["es", "en"];

export function isEnabledLocale(value: string | null | undefined): value is Locale {
  return ENABLED_LOCALES.includes(value as Locale);
}
