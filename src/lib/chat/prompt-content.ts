/**
 * Picks the parts of one locale's site content that the chat model sees.
 * Pure (type-only imports) so it can be tested without the content barrel.
 */

import type { SiteContentForPrompt } from "./system-prompt";
import type { SiteContent } from "../../content/types";

type PromptSource = Pick<
  SiteContent,
  "services" | "projects" | "whyUs" | "partnerships" | "projectsInProgress" | "whoWeHelp"
>;

export function promptContentFrom(content: PromptSource): SiteContentForPrompt {
  return {
    services: content.services.map((s) => ({
      title: s.title,
      description: s.description,
      details: s.details,
    })),
    projects: content.projects
      .filter((p) => !p.hidden)
      .map((p) => ({ title: p.title, desc: p.desc, fullDesc: p.fullDesc })),
    ...(content.projectsInProgress?.length
      ? {
          projectsInProgress: content.projectsInProgress.map((p) => ({
            status: p.status,
            title: p.title,
            desc: p.desc,
            details: p.details ?? [],
          })),
        }
      : {}),
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
