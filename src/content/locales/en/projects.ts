import type { SiteContent } from "../../types";

export const enProjectsContent: Pick<SiteContent, "projectsTitle" | "projectsSubtitle" | "projects"> = {
projectsTitle: "What We've Built",
projectsSubtitle: "Selected projects from our current work",
projects: [
  {
    title: "Chak: From SaaS to Brain",
    desc: "V1: full SaaS platform with protocol builder, project management, and IoT. V2: Chak Brain, a RAG-backed conversational system covering the entire team.",
    fullDesc:
      "Chak works with life. Lab protocols, cultivations, projects with real impact on health and nature. Chak v1 was a full operational platform: protocol builder, project management, and IoT integration built alongside Universidad de Envigado. Chak v2 is Chak Brain, a RAG-backed system covering the entire team across operations, lab protocols, commercial, prospects, and projects. The evolution from complex SaaS to conversational brain is the real insight.",
    lessons: "Adding features solves the wrong problem. The right question: can the team access what the business knows in a single conversation?",
    status: "Active",
    image: "/landing/photos/project-screenshots/Screenshot_chak-foodtech.com.jpeg",
    images: [
      "/landing/photos/project-screenshots/Screenshot_chak-foodtech.com.jpeg",
    ],
    url: "https://chak-foodtech.com",
    tags: ["AI", "RAG", "SaaS"],
    modal: {
      whatItMeans:
        "Two chapters, one key insight: when we stopped adding features and started building a brain, everything simplified.",
      whyItMatters:
        "Chak v1 proved that complex systems hit a ceiling. Chak Brain proved a team can access everything the business knows in a single conversation. That is the real leap.",
      whatsIncluded: [
        "V1: protocol builder, project management, and IoT with Universidad de Envigado",
        "V2: RAG-backed conversational system for operations, protocols, commercial, and prospects",
        "Background agents that optimize the knowledge base and learn with use",
        "Conversational access to the team's full knowledge layer",
      ],
      idealFit: [
        "Teams with documented processes that no one can query quickly",
        "Businesses tired of searching across scattered files and folders",
        "Organizations that want AI that grows with them, not a static tool",
      ],
      typicalOutcome:
        "The team stops searching, stops asking around, and starts acting on what the business already knows.",
    },
  },
  {
    title: "RaizCapitalColombia.co",
    desc: "Projects and properties in Colombia using data plus creativity to propose realistic business models and opportunities.",
    fullDesc:
      "A strategy and information platform that organizes opportunities clearly and helps teams evaluate direction with practical inputs instead of guesswork.",
    lessons: "Clarity in framing and data quality changes decision quality.",
    status: "Active",
    image: "/landing/photos/project-screenshots/Screenshot_www.raizcapital.co.jpeg",
    images: [
      "/landing/photos/project-screenshots/Screenshot_www.raizcapital.co.jpeg",
    ],
    url: "https://www.raizcapital.co/",
    tags: ["Data", "Strategy"],
    modal: {
      whatItMeans:
        "A strategy and information layer that makes opportunities easier to compare and decisions easier to defend.",
      whyItMatters:
        "When everything is vague, teams waste time debating opinions. Clear framing + clean data improves decision quality.",
      whatsIncluded: [
        "A clear information structure (what matters, what to ignore)",
        "A way to compare opportunities consistently",
        "Simple views that support decision conversations",
        "A system that can evolve as the project grows",
      ],
      idealFit: [
        "Teams evaluating multiple opportunities or directions",
        "Projects that need clarity more than hype",
        "Decision-makers who value structured thinking",
      ],
      typicalOutcome: "Faster evaluation, clearer tradeoffs, and fewer circular discussions.",
    },
  },
  {
    title: "SetaSouls. Holistic Brand Website",
    desc: "98 performance. 100 SEO. 100 best practices. Design, speed, and search visibility built together from the start.",
    fullDesc:
      "A wellness brand website built and optimised on Vercel. Every architecture, performance, and design decision was intentional from day one, not patched in at the end. The result: 98 performance, 96 accessibility, 100 best practices, and 100 technical SEO on Lighthouse.",
    lessons: "Lighthouse is not the goal. It is proof that the right decisions were made throughout.",
    status: "In development",
    image: "/landing/photos/project-screenshots/Screenshot_SetaSouls.app.jpeg",
    images: [
      "/landing/photos/project-screenshots/Screenshot_SetaSouls.app.jpeg",
    ],
    url: "https://setasouls.app",
    tags: ["Web", "Vercel"],
    stats: [
      { label: "Performance", value: "98" },
      { label: "SEO", value: "100" },
      { label: "Best Practices", value: "100" },
      { label: "Accessibility", value: "96" },
    ],
    modal: {
      whatItMeans:
        "A fast, modern, well-positioned site that represents the brand with clarity and confidence.",
      whyItMatters:
        "98 performance, 100 SEO, 100 best practices. Not an accident. The result of building with intention from the start.",
      whatsIncluded: [
        "Performance architecture: 98/100 on Lighthouse",
        "Full technical SEO: 100/100, covering structure, metadata, and schema",
        "Accessibility: 96/100",
        "Brand design and user experience",
        "Deployed and optimised on Vercel",
      ],
      idealFit: [
        "Brands that need a premium digital presence",
        "Projects where performance and design are equally important",
        "Teams that want real results, not just promises",
      ],
      typicalOutcome:
        "A site that loads in milliseconds, ranks in search, and feels properly built.",
    },
  },
],
};
