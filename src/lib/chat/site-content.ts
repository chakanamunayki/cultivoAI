/**
 * Site content handed to the chat model, built on the server from the content
 * files. The chat route must not take this from the request body: a caller
 * could put anything in it and steer the system prompt.
 */

import { en } from "@/content/en";
import { es } from "@/content/es";
import { pt } from "@/content/pt";
import type { Locale, SiteContent } from "@/content/types";
import type { SiteContentForPrompt } from "@/lib/chat/system-prompt";

const CONTENT_BY_LOCALE: Record<Locale, SiteContent> = { es, en, pt };

export function buildSiteContentForPrompt(locale: Locale): SiteContentForPrompt {
  const content = CONTENT_BY_LOCALE[locale];
  return {
    services: content.services.map((s) => ({
      title: s.title,
      description: s.description,
      details: s.details,
    })),
    projects: content.projects.map((p) => ({
      title: p.title,
      desc: p.desc,
      fullDesc: p.fullDesc,
    })),
    whyUs: content.whyUs,
    partnerships: content.partnerships.map((p) => ({
      name: p.name,
      tagline: p.tagline,
      description: p.description,
    })),
    ...(content.whoWeHelp
      ? {
          whoWeHelp: {
            idealItems: content.whoWeHelp.idealItems,
            notIdealItems: content.whoWeHelp.notIdealItems,
            sectors: content.whoWeHelp.sectors,
          },
        }
      : {}),
  };
}
