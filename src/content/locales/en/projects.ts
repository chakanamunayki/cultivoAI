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
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
    ],
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
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1600&auto=format&fit=crop",
    ],
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
    title: "Mushroom health project with OpenClaw",
    desc: "Specialized AI agents supporting research, content creation, business intelligence, and a living knowledge base.",
    fullDesc:
      "A modular multi-agent setup built for health-focused research and operations, with structured knowledge and iterative workflows that can evolve quickly.",
    lessons: "Knowledge architecture is the backbone of long-term speed.",
    status: "In development",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1600&auto=format&fit=crop",
    ],
    tags: ["Research", "AI Agents"],
    modal: {
      whatItMeans:
        "A modular system that supports research and operations with reusable knowledge and practical workflows.",
      whyItMatters:
        "Research teams move faster when knowledge is structured and decisions are supported by a living system, not scattered files.",
      whatsIncluded: [
        "A knowledge base that grows as the project learns",
        "Repeatable workflows for research, writing, and internal updates",
        "Decision support views for priorities and next actions",
        "A modular approach so parts can evolve independently",
      ],
      idealFit: [
        "Health and research teams with complex information flows",
        "Projects where documentation and consistency are bottlenecks",
        "Teams who want to build a system they can keep using",
      ],
      typicalOutcome:
        "Less time searching and rewriting, faster iterations, and a clearer shared understanding across the team.",
    },
  },
  {
    title: "SetaSouls. Holistic Brand Website",
    desc: "98 performance. 100 SEO. 100 best practices. Design, speed, and search visibility built together from the start.",
    fullDesc:
      "A wellness brand website built and optimised on Vercel. Every architecture, performance, and design decision was intentional from day one, not patched in at the end. The result: 98 performance, 96 accessibility, 100 best practices, and 100 technical SEO on Lighthouse.",
    lessons: "Lighthouse is not the goal. It is proof that the right decisions were made throughout.",
    status: "In development",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1600",
    ],
    tags: ["Web", "Vercel"],
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
