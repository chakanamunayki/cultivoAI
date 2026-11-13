import { enAbout } from "./locales/en/about";
import { enClosingSectionsContent } from "./locales/en/closing-sections";
import { enPartnershipsContent } from "./locales/en/partnerships";
import { enProjectsContent } from "./locales/en/projects";
import { enServicesContent } from "./locales/en/services";
import { enStoriesContent } from "./locales/en/stories";
import { enUi } from "./locales/en/ui";
import { enUseCasesContent } from "./locales/en/use-cases";
import { enWhoWeHelpContent } from "./locales/en/who-we-help";
import type { SiteContent } from "./types";

export const en: SiteContent = {
  nav: [
    { label: "Who we are", href: "#about" },
    { label: "What we build", href: "#services" },
    { label: "Who we work with", href: "#who-we-help" },
    { label: "Semillero", href: "#semillero" },
    { label: "Projects", href: "#projects" },
    { label: "How to start", href: "#partnerships" },
  ],

  marquee: [
    "Land and regeneration",
    "Self-sufficient communities",
    "Holistic health",
    "Nature and agritech",
    "Software and data",
    "AI where it helps",
    "Impact you can prove",
    "Investor-ready",
    "Innovation network",
    "Colombia to the world",
  ],

  hero: {
    tagline: "TECH FOR GOOD PROJECTS",
    line1: "Your hands-on tech partner for projects that care for land, people and communities.",
    subheadline:
      "I've co-founded and built startups. Now I help good projects in regeneration, self-sufficient living, holistic health and nature build their tech, find the right innovations and get ready for investment.",
    services: [],
    servicesDone: "",
    audience: [],
    outcomes: [],
    audienceLabel: "Built for:",
    audienceChips: [
      "Land and regeneration",
      "Self-sufficient communities",
      "Holistic health and natural products",
      "Nature and agritech",
    ],
    tertiaryCta: "What we build",
    microcopy: "One founder, start to finish. Based in Colombia, working worldwide.",
    terminalLabel: "How I work:",
    line3: "",
    cta: "Let's talk",
    secondaryCta: "See projects",
    noDrama: "No chaos.",
    noDramaText: "Clear scope. Fast version one. Direct iteration.",
    impactSection: {
      text: "Based in Colombia, working worldwide. Direct collaboration. Clear scope.",
      cta: "Let's talk",
    },
  },

  about: enAbout,

  ui: enUi,

  // Not rendered on the page; fed to the chat assistant as positioning context.
  whyUs: {
    notTitle: "What I'm NOT",
    notItems: [
      "A big agency with handoffs and junior delivery.",
      "A hype-driven consultant selling you a trend.",
      "Someone who makes things sound complicated on purpose.",
    ],
    yesTitle: "What I AM",
    yesItems: [
      "A startup co-founder who designs and builds the system myself.",
      "A builder who ships version one fast, then improves it with real use.",
      "Someone who only takes deals that are good for everyone in them (ayni).",
      "Based in Colombia, working across Latin America and worldwide.",
    ],
  },

  semillero: {
    title: "Semillero",
    subtitle: "Spanish for seedbed. Where good projects grow together.",
    body:
      "I talk every week with innovators around the world: new energy, soil, water and health technologies looking for real places to work. And I know projects across Latin America that need exactly that. Semillero brings them together, so good people and good innovations get stronger side by side.",
    projectCta: "I have a project",
    innovationCta: "I have an innovation",
  },

  ...enServicesContent,

  ...enUseCasesContent,

  ...enWhoWeHelpContent,

  ...enPartnershipsContent,

  ...enProjectsContent,
  projects: enProjectsContent.projects.filter((project) => !project.hidden),

  ...enStoriesContent,

  ...enClosingSectionsContent,
};
