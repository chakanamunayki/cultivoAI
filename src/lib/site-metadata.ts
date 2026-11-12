import type { Locale } from "../content/types";
import type { Metadata } from "next";

/** Public address of the live site. Production sets NEXT_PUBLIC_APP_URL; this is the fallback. */
export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://cultivolab.vercel.app").replace(/\/$/, "");

/**
 * Pick the site locale from an Accept-Language header.
 * The header is a ranked list ("en-GB,en;q=0.9,es;q=0.8"), so honour the q-weights
 * and use the top entry. Portuguese is served only when enabled, otherwise Spanish
 * (closest). Anything else, including no header, gets English.
 */
export function localeFromAcceptLanguage(acceptLanguage: string, portugueseEnabled = false): Locale {
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const parsedQ = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return {
        tag: tag?.trim().toLowerCase() ?? "",
        q: Number.isNaN(parsedQ) ? 0 : parsedQ,
      };
    })
    .filter((entry) => entry.tag.length > 0)
    .sort((a, b) => b.q - a.q);

  const topLanguage = ranked[0]?.tag ?? "";
  if (topLanguage.startsWith("pt")) return portugueseEnabled ? "pt" : "es";
  return topLanguage.startsWith("es") ? "es" : "en";
}

// Copy source: docs/copy/cultivo-labs-site-copy-v1.md, section 0.
const COPY = {
  es: {
    title: "Cultivo Labs · Tu socio tecnológico para proyectos que cuidan la tierra, las personas y las comunidades",
    description:
      "Cofundador de startups que volvió a construir con las manos. Ayudo a buenos proyectos de regeneración, comunidades autosuficientes, salud holística y naturaleza a construir su tecnología, encontrar las innovaciones adecuadas y prepararse para la inversión. Desde Colombia, para Latinoamérica y el mundo.",
    keywords: [
      "Cultivo Labs",
      "Semillero",
      "regeneración",
      "comunidades autosuficientes",
      "salud holística",
      "agritech",
      "MRV",
      "startups",
      "Colombia",
      "Latinoamérica",
    ],
    ogLocale: "es_CO",
    ogAlternate: "en_US",
  },
  en: {
    title: "Cultivo Labs · Hands-on tech partner for projects that care for land, people and communities",
    description:
      "Startup co-founder turned hands-on builder. I help good projects in regeneration, self-sufficient communities, holistic health and nature build their tech, find the right innovations and get ready for investment. Based in Colombia, working across Latin America and worldwide.",
    keywords: [
      "Cultivo Labs",
      "Semillero",
      "regeneration",
      "self-sufficient communities",
      "holistic health",
      "agritech",
      "MRV",
      "startups",
      "Colombia",
      "Latin America",
    ],
    ogLocale: "en_US",
    ogAlternate: "es_CO",
  },
} as const;

/** Page metadata in the visitor's language. Portuguese is hidden and stale, so it uses Spanish. */
export function buildSiteMetadata(locale: Locale) {
  const copy = locale === "en" ? COPY.en : COPY.es;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: copy.title,
      template: "%s | Cultivo Labs",
    },
    description: copy.description,
    keywords: [...copy.keywords],
    authors: [{ name: "Paul Ronayne" }],
    creator: "Cultivo Labs",
    openGraph: {
      type: "website",
      url: "/",
      locale: copy.ogLocale,
      alternateLocale: [copy.ogAlternate],
      siteName: "Cultivo Labs",
      title: copy.title,
      description: copy.description,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  } satisfies Metadata;
}
