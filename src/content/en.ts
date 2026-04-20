import { enAbout } from "./locales/en/about";
import { enClosingSectionsContent } from "./locales/en/closing-sections";
import { enPartnershipsContent } from "./locales/en/partnerships";
import { enProjectsContent } from "./locales/en/projects";
import { enSemillaContent } from "./locales/en/semilla";
import { enServicesContent } from "./locales/en/services";
import { enStoriesContent } from "./locales/en/stories";
import { enUseCasesContent } from "./locales/en/use-cases";
import { enWhoWeHelpContent } from "./locales/en/who-we-help";
import type { SiteContent } from "./types";

export const en: SiteContent = {
  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Partners", href: "#partnerships" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#what-happens-next" },
  ],

  marquee: [
    "Human-first AI",
    "Dashboards",
    "Useful assistants",
    "Retreat operations",
    "Living knowledge",
    "Automation",
    "Private data",
    "Offline",
    "Direct collaboration",
    "24h response",
  ],

  hero: {
    tagline: "FOR GOOD PROJECTS",
    line1: "AI systems to scale valuable work",
    subheadline: "Cut busywork. See what matters.",
    services: [],
    servicesDone: "",
    audience: [],
    outcomes: ["Less manual work", "Clearer decisions", "Better follow-through"],
    audienceLabel: "Built for:",
    audienceChips: [
      "Impact startups",
      "Wellness retreats",
      "Off-grid communities",
      "Hydroponics",
      "Holistic wellbeing",
      "Regenerative projects",
    ],
    tertiaryCta: "Explore services",
    microcopy:
      "Private data. Offline setup when needed. Shared templates to reduce costs.",
    terminalLabel: "How we work:",
    line3: "",
    cta: "Let's talk",
    secondaryCta: "View projects",
    noDrama: "No chaos.",
    noDramaText: "Clear scope. Fast version one. Direct iteration.",
    impactSection: {
      text: "Colombia-based, working worldwide. Direct collaboration. Clear scope.",
      cta: "Let's talk",
    },
  },

  about: enAbout,

  howWeWork: {
    title: "How We Work",
    subtitle: "Principles that guide every project",
    pillars: [
      {
        icon: "RefreshCw",
        title: "Win-Win or No Deal",
        description:
          "We only take projects where expectations are clear and both sides benefit. If we cannot add real value, we will tell you early.",
      },
      {
        icon: "Sprout",
        title: "Holistic Systems",
        description:
          "We think end-to-end. Software, workflows, data, decisions, communication, and design need to work together, not as separate pieces.",
      },
      {
        icon: "Users",
        title: "Always Human",
        description:
          "AI is a tool we use for good. We build with care for tone, trust, and real people on the other side of the screen.",
        isFullWidth: true,
      },
    ],
  },

  whatWeDo: {
    title: "How We Help",
    subtitle: "Practical AI integration for real businesses",
    intro:
      "We work with teams building something with purpose: businesses and projects that create a positive impact on people and their communities. We understand how each team works, connect what already exists, and give each person access to only what they need. What we build depends on the project: automation, AI, SEO, integrations.",
    columns: [
      {
        title: "OPTIMIZE",
        items: [
          "Reduce repetitive work",
          "Create one source of truth",
          "Improve handoffs and follow-through",
          "Make reporting automatic",
        ],
      },
      {
        title: "EXPAND",
        items: [
          "Faster responses without losing warmth",
          "Consistent content and knowledge sharing",
          "Better decision-making with real signals",
          "New ways to support users and customers",
        ],
      },
    ],
    servicesPreview: {
      title: "Our services include:",
      linkText: "View all services",
    },
  },

  whyUs: {
    notTitle: "What we're NOT",
    notItems: [
      "A big agency with handoffs and junior delivery.",
      "Hype-driven consultants selling you a trend.",
      "A team that makes you feel confused on purpose.",
    ],
    yesTitle: "What we ARE",
    yesItems: [
      "A small senior team that works directly with you.",
      "System builders who ship version one quickly, then improve.",
      "Human-first builders who care about tone, trust, and outcomes.",
      "Colombia-based, working worldwide.",
    ],
  },

  ...enServicesContent,

  ...enUseCasesContent,

  ...enWhoWeHelpContent,

  ...enSemillaContent,

  ...enPartnershipsContent,

  ...enProjectsContent,

  ...enStoriesContent,

  ...enClosingSectionsContent,
};
