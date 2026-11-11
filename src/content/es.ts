import { esAbout } from "./locales/es/about";
import { esClosingSectionsContent } from "./locales/es/closing-sections";
import { esPartnershipsContent } from "./locales/es/partnerships";
import { esProjectsContent } from "./locales/es/projects";
import { esServicesContent } from "./locales/es/services";
import { esStoriesContent } from "./locales/es/stories";
import { esUseCasesContent } from "./locales/es/use-cases";
import { esWhoWeHelpContent } from "./locales/es/who-we-help";
import type { SiteContent } from "./types";

export const es: SiteContent = {
  nav: [
    { label: "Quiénes somos", href: "#about" },
    { label: "Qué construyo", href: "#services" },
    { label: "Con quién trabajo", href: "#who-we-help" },
    { label: "Semillero", href: "#semillero" },
    { label: "Proyectos", href: "#projects" },
  ],

  marquee: [
    "Tierra y regeneración",
    "Comunidades autosuficientes",
    "Salud holística",
    "Naturaleza y agritech",
    "Software y datos",
    "IA donde sirve",
    "Impacto que se puede demostrar",
    "Listos para invertir",
    "Red de innovación",
    "De Colombia al mundo",
  ],

  hero: {
    tagline: "TECNOLOGÍA PARA BUENOS PROYECTOS",
    line1:
      "Tu socio tecnológico para proyectos que cuidan la tierra, las personas y las comunidades.",
    subheadline:
      "He cofundado y construido startups. Ahora ayudo a buenos proyectos de regeneración, vida autosuficiente, salud holística y naturaleza a construir su tecnología, encontrar las innovaciones adecuadas y prepararse para la inversión.",
    services: [],
    servicesDone: "",
    audience: [],
    outcomes: [],
    audienceLabel: "Para:",
    audienceChips: [
      "Tierra y regeneración",
      "Comunidades autosuficientes",
      "Salud holística y productos naturales",
      "Naturaleza y agritech",
    ],
    tertiaryCta: "Qué construyo",
    microcopy: "Un fundador, de principio a fin. Desde Colombia, para el mundo.",
    terminalLabel: "Así trabajo:",
    line3: "",
    cta: "Hablemos",
    secondaryCta: "Ver proyectos",
    noDrama: "Sin caos.",
    noDramaText: "Alcance claro. Primera versión rápida. Iteración directa.",
    impactSection: {
      text: "Desde Colombia, para el mundo. Colaboración directa. Alcance claro.",
      cta: "Hablemos",
    },
  },

  about: esAbout,

  // No se muestra en la página; se le pasa al asistente del chat como contexto.
  whyUs: {
    notTitle: "Lo que NO soy",
    notItems: [
      "Una agencia grande con traspasos y un equipo junior.",
      "Un consultor que vende la moda del momento.",
      "Alguien que complica las cosas a propósito.",
    ],
    yesTitle: "Lo que SÍ soy",
    yesItems: [
      "Un cofundador de startups que diseña y construye el sistema él mismo.",
      "Alguien que lanza una primera versión rápido y la mejora con el uso real.",
      "Alguien que solo acepta acuerdos buenos para todos (ayni).",
      "Desde Colombia, para Latinoamérica y el mundo.",
    ],
  },

  semillero: {
    title: "Semillero",
    subtitle: "Donde los buenos proyectos crecen juntos.",
    body:
      "Hablo cada semana con innovadores de todo el mundo: nuevas tecnologías de energía, suelo, agua y salud que buscan lugares reales donde funcionar. Y conozco proyectos en Latinoamérica que necesitan justo eso. Semillero los une, para que la buena gente y las buenas innovaciones se fortalezcan juntas.",
    projectCta: "Tengo un proyecto",
    innovationCta: "Tengo una innovación",
  },

  ...esServicesContent,

  ...esUseCasesContent,

  ...esWhoWeHelpContent,

  ...esPartnershipsContent,

  ...esProjectsContent,

  ...esStoriesContent,

  ...esClosingSectionsContent,
};
