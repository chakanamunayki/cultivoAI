/**
 * Site content handed to the chat model, built on the server from the content
 * files. The chat route must not take this from the request body: a caller
 * could put anything in it and steer the system prompt.
 */

import { en } from "@/content/en";
import { es } from "@/content/es";
import { pt } from "@/content/pt";
import type { Locale, SiteContent } from "@/content/types";
import { promptContentFrom } from "@/lib/chat/prompt-content";
import type { SiteContentForPrompt } from "@/lib/chat/system-prompt";

const CONTENT_BY_LOCALE: Record<Locale, SiteContent> = { es, en, pt };

export function buildSiteContentForPrompt(locale: Locale): SiteContentForPrompt {
  return promptContentFrom(CONTENT_BY_LOCALE[locale]);
}
