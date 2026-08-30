import type { SiteContent } from "../../types";

export const enProjectsContent: Pick<SiteContent, "projectsTitle" | "projectsSubtitle" | "projects"> = {
projectsTitle: "What We've Built",
projectsSubtitle: "Selected projects from our current work",
projects: [
  {
    title: "Company Brain: Protocol IP, Protected Through Execution",
    desc: "We built a Company Brain for an agri-biotech production platform in Colombia. Scientists author the protocol; the Brain guides the person running it step by step, without ever exposing the full recipe. The IP stays in the system, not in someone's phone.",
    fullDesc:
      "The platform turns a biological objective into a controlled, measurable, reproducible plant-production process. We built the digital layer, the Company Brain, and it works as one loop. Scientists and lab leads author the protocol in the builder: every step, parameter, and sequence. That full protocol is the IP. When it is time to run it, the Brain guides the person doing the work one step at a time: what to do now, the parameters, the frequency, the asepsis, and it captures their observations back against that step. The operator executes the protocol without ever holding the whole thing. Access is role-gated: the lab technician is guided through the steps, the commercial team sees clients, the director sees everything. The full protocol and the accumulated data stay in the system, not in the executor's hands, not in WhatsApp, not walking out the door.",
    lessons: "The people running a protocol don't need the whole protocol. They need the current step. Authoring and execution are one loop, and the full recipe, the real IP, never has to leave the system.",
    status: "Active",
    image: "",
    tags: ["Company Brain", "Agri-biotech", "RAG"],
    modal: {
      whatItMeans:
        "One loop over a real agri-biotech operation. Scientists author protocols in the builder; the people executing are guided one step at a time and their observations flow back. Everything is scoped to each role, and the full protocol never leaves the system.",
      whyItMatters:
        "In science-driven production, the protocol is the IP. Hand the whole recipe to everyone who runs it and it leaks across roles and walks out the door. The Company Brain guides execution step by step, so the operator gets exactly what they need to do the work and never the full protocol. The IP stays structured, role-gated, and owned by the company.",
      whatsIncluded: [
        "Protocol builder where scientists and lab leads author the full protocol: steps, parameters, sequence",
        "Step-by-step execution guidance: the operator sees the current step, its parameters and frequency, nothing more",
        "Observations captured back against each step as the work happens",
        "Role-gated access, so the full protocol and the data stay protected in the system",
      ],
      idealFit: [
        "Labs and agri-biotech teams whose protocol IP is the core asset",
        "Operations that need field or lab staff to execute protocols precisely without handing over the whole recipe",
        "Teams that need the know-how and data to stay in the company when people change",
      ],
      typicalOutcome:
        "Protocols run consistently on the ground, observations come back structured, and the full recipe, the real IP, stays inside the company instead of in someone's phone.",
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
