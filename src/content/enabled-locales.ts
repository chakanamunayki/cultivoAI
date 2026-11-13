import type { Locale } from "./types";

/**
 * Locales offered to visitors. Portuguese content is kept in src/content/pt.ts
 * but hidden for now; add "pt" back here to re-enable it everywhere
 * (nav selector, server detection, stored-choice restore).
 *
 * Before re-enabling, refresh Portuguese to match ES/EN: the PT copy itself,
 * the PT chat prompt in src/lib/chat/system-prompt.ts, the missing PT `ui`
 * labels (PT falls back to English), the Munay-Ki and Discovery Sprint images,
 * and the headings that now speak as "we". PT still has the old who-we-help fit
 * lists and sector detail fields, which the page no longer renders.
 */
export const ENABLED_LOCALES: readonly Locale[] = ["es", "en"];

export function isEnabledLocale(value: string | null | undefined): value is Locale {
  return ENABLED_LOCALES.includes(value as Locale);
}
