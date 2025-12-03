/**
 * CultivoAI Content System
 *
 * This module exports all content-related types and utilities
 * for the bilingual (Spanish/English) landing page.
 */

import { en } from "./en";
import { es } from "./es";
import type { Locale, SiteContent } from "./types";

// Re-export types
export type { Locale, SiteContent, NavItem, HeroCopy, Service, Project } from "./types";
export type { Partnership, UseCase, Step, RealStory, SemillaContent } from "./types";
export type { WhyUs, FooterCopy, ChatCopy, ContactFormCopy, AboutCopy } from "./types";

// Re-export content
export { es } from "./es";
export { en } from "./en";

const contentMap: Record<Locale, SiteContent> = {
  es,
  en,
};

/**
 * Get content for a specific locale
 * @param locale - 'es' or 'en'
 * @returns SiteContent for the specified locale
 */
export function getContent(locale: Locale): SiteContent {
  return contentMap[locale];
}

/**
 * Get a specific content key for a locale
 * @param locale - 'es' or 'en'
 * @param key - Key path in SiteContent
 * @returns The content value
 */
export function t<K extends keyof SiteContent>(locale: Locale, key: K): SiteContent[K] {
  return contentMap[locale][key];
}
