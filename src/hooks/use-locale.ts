"use client";

import { useContext } from "react";
import { LanguageContext } from "@/components/providers/language-provider";

/**
 * Hook to access locale and content from the LanguageProvider
 *
 * @returns {Object} - locale, setLocale, toggleLocale, and content
 * @throws {Error} - if used outside LanguageProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { locale, toggleLocale, content } = useLocale();
 *
 *   return (
 *     <div>
 *       <p>{content.hero.headline}</p>
 *       <button onClick={toggleLocale}>
 *         {locale === 'es' ? 'EN' : 'ES'}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useLocale() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLocale must be used within a LanguageProvider");
  }

  return context;
}
