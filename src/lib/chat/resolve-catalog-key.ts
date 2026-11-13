/**
 * Resolves the name the chat model gave for a service or project to the card it
 * means. The model answers in either language and paraphrases, so matching only
 * the current locale's titles silently opened nothing.
 *
 * Order: exact title, then a title contained in the query ("the Proof and
 * records service"), then a query contained in a title ("SetaSouls"), then the
 * longest keyword alias found in the query.
 */

export interface CatalogEntry {
  /** Stable id of the card, the same in every language. */
  key: string;
  /** The card's title in every language the site has. */
  titles: string[];
}

export function normalizeForMatch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Shorter queries than this are too vague to match against a title.
const MIN_PARTIAL_LENGTH = 4;

export function resolveCatalogKey(
  query: string,
  entries: CatalogEntry[],
  aliases: Record<string, string>
): string | undefined {
  const target = normalizeForMatch(query);
  if (!target) return undefined;

  const normalized = entries.map((entry) => ({
    key: entry.key,
    titles: entry.titles.map(normalizeForMatch).filter(Boolean),
  }));

  const exact = normalized.find((e) => e.titles.includes(target));
  if (exact) return exact.key;

  const titleInQuery = normalized.find((e) =>
    e.titles.some((title) => target.includes(title))
  );
  if (titleInQuery) return titleInQuery.key;

  if (target.length >= MIN_PARTIAL_LENGTH) {
    const queryInTitle = normalized.find((e) =>
      e.titles.some((title) => title.includes(target))
    );
    if (queryInTitle) return queryInTitle.key;
  }

  const paddedTarget = ` ${target} `;
  const aliasKey = Object.keys(aliases)
    .sort((a, b) => b.length - a.length)
    .find((alias) => paddedTarget.includes(` ${normalizeForMatch(alias)} `));
  const resolved = aliasKey ? aliases[aliasKey] : undefined;
  return resolved && entries.some((e) => e.key === resolved) ? resolved : undefined;
}

// Keyword fallbacks, in both languages. Values are service animationKeys. Also
// covers names from before the services were consolidated (8 -> 4 cards, then
// the Cultivo Labs rework), which the model can still emit.
export const SERVICE_ALIASES: Record<string, string> = {
  // -> Data, knowledge and AI systems
  "company brain": "company-brain",
  "decision and automation": "company-brain",
  "sistemas de decision": "company-brain",
  "workflow optimization": "company-brain",
  "optimizacion de flujos": "company-brain",
  workflow: "company-brain",
  automation: "company-brain",
  automatizacion: "company-brain",
  "ai assistants": "company-brain",
  "asistentes ia": "company-brain",
  asistentes: "company-brain",
  "knowledge and content systems": "company-brain",
  "sistemas de conocimiento y contenido": "company-brain",
  knowledge: "company-brain",
  conocimiento: "company-brain",
  data: "company-brain",
  datos: "company-brain",
  ai: "company-brain",
  ia: "company-brain",
  // -> Software and platforms
  "custom ai and software": "software-web",
  "software, websites and digital experiences": "software-web",
  "software, sitios web y experiencias digitales": "software-web",
  software: "software-web",
  platforms: "software-web",
  plataformas: "software-web",
  websites: "software-web",
  website: "software-web",
  "sitio web": "software-web",
  "sitios web": "software-web",
  apps: "software-web",
  // -> Proof and records
  "decision dashboards": "company-brain",
  "dashboards de decision": "company-brain",
  proof: "dashboards",
  records: "dashboards",
  pruebas: "dashboards",
  registros: "dashboards",
  evidence: "dashboards",
  evidencia: "dashboards",
  mrv: "dashboards",
  impact: "dashboards",
  impacto: "dashboards",
  carbon: "dashboards",
  carbono: "dashboards",
  // -> Startup and investment readiness
  "startup advisory": "startup",
  "asesoria para startups": "startup",
  startup: "startup",
  startups: "startup",
  investment: "startup",
  inversion: "startup",
  investors: "startup",
  inversores: "startup",
};

// Values are project keys: the animationKey, or project-<index> for a project
// that has none (see the caller in src/app/page.tsx).
export const PROJECT_ALIASES: Record<string, string> = {
  "company brain": "company-brain",
  "protocol ip": "company-brain",
  "ip de los protocolos": "company-brain",
  "protected knowledge": "company-brain",
  "conocimiento protegido": "company-brain",
  "knowledge platform": "company-brain",
  biotech: "company-brain",
  biotecnologia: "company-brain",
  "vertical farming": "company-brain",
  "agricultura vertical": "company-brain",
};
