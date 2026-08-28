import type { SiteContent } from "../../types";

export const enProjectsContent: Pick<SiteContent, "projectsTitle" | "projectsSubtitle" | "projects"> = {
projectsTitle: "What We've Built",
projectsSubtitle: "Selected projects from our current work",
projects: [
  {
    title: "CHAK FoodTech: From SaaS to Protected Brain",
    desc: "We built CHAK Brain, the knowledge layer for an agri-biotech production platform. Role-gated access to scientific protocols and experiment data, isolated from the execution layer so the IP stays with the company.",
    fullDesc:
      "CHAK FoodTech turns a biological objective into a controlled, measurable, reproducible plant-production process. We built the digital layer. V1 was the execution platform: a protocol builder, project management, and IoT, built alongside Universidad de Envigado. V2 is CHAK Brain, the knowledge layer over the operation's real documents: protocols, lab observations, experiments, commercial. Access is role-gated, the lab technician sees protocols, the commercial team sees clients, the director sees everything. The knowledge layer is isolated from the execution layer, so the infrastructure, the supplier, even the crop can change, but the protocols, data, and accumulated know-how stay protected inside the company.",
    lessons: "Infrastructure executes. The protocols, the experiment data, and the accumulated know-how are the real asset, and they belong to the company, not to whoever runs the hardware.",
    status: "Active",
    image: "/landing/photos/project-screenshots/Screenshot_chak-foodtech.com.jpeg",
    images: [
      "/landing/photos/project-screenshots/Screenshot_chak-foodtech.com.jpeg",
    ],
    url: "https://chak-foodtech.com",
    tags: ["Agri-biotech", "RAG", "Protocol IP"],
    modal: {
      whatItMeans:
        "A protected knowledge layer over a real agri-biotech operation: protocols, observations, experiments, and commercial data, queryable in plain language and scoped to each role.",
      whyItMatters:
        "In science-driven production, the protocol IP is the moat. Left in PDFs, WhatsApp, and people's heads, it leaks across roles and walks out the door. CHAK Brain keeps it structured, role-gated, and owned by the company.",
      whatsIncluded: [
        "V1 execution platform: protocol builder, project management, and IoT, with Universidad de Envigado",
        "V2 CHAK Brain: knowledge layer over protocols, observations, experiments, and commercial",
        "Role-gated access: each role reaches its domain, nothing more",
        "Knowledge layer isolated from the execution layer, so the IP stays with the company",
      ],
      idealFit: [
        "Labs and agri-biotech teams whose protocol IP is the core asset",
        "Operations where each role needs different scientific and commercial context",
        "Teams that need their know-how to stay when people or suppliers change",
      ],
      typicalOutcome:
        "The protocol IP is protected, structured, and queryable. The team acts on what the operation already knows, and the know-how stays when people leave.",
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
    url: "https://holisticsoul.vercel.app/",
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
