import type { SiteContent } from "../../types";

export const enProjectsContent: Pick<
  SiteContent,
  "projectsTitle" | "projectsSubtitle" | "projects" | "projectsInProgressTitle" | "projectsInProgress"
> = {
projectsTitle: "Projects",
projectsSubtitle: "Selected work",
// Unnamed on purpose: no partner names until they agree.
projectsInProgressTitle: "What I'm working on now",
projectsInProgress: [
  {
    status: "Consortium forming",
    title: "Restoration after mining, Colombia",
    desc: "Mines in Colombia have to restore the land they used and prove, year after year, that it worked. Today that proof is scattered across nurseries, field teams and satellite reports.",
    details: [
      {
        label: "The new rules",
        text: "Colombia's 2026 mine-closure decree (Decreto 0742) makes monitoring after closure part of every closure plan, and the new compensation manual (Resolución 0305) has the authorities checking restoration at least once a year.",
      },
      {
        label: "Three parts, one record",
        text: "Native-plant propagation, field restoration with local communities and satellite monitoring of survival.",
      },
      {
        label: "My part",
        text: "The record: software that links each batch of plants, from nursery to field, to how many survive, and turns it into the compliance reports the authorities ask for. It is built as the work happens, not at the end.",
      },
      {
        label: "Next step",
        text: "The consortium is finalising its concept note and preparing funding applications for 2027.",
      },
    ],
  },
  {
    status: "Early conversations",
    title: "Biochar and hemp in the Andes, Ecuador",
    desc: "A cooperative at 3,200 metres in the Ecuadorian Andes, with a model where every output feeds the next.",
    details: [
      {
        label: "The loop",
        text: "Biochar from small kilns becomes compost, the compost feeds a licensed hemp seed lab, the hemp is grown in the field, and the residues go back in as biochar and carbon removal.",
      },
      {
        label: "The community",
        text: "Two highland communities do the work. Families in one began training to make biochar in late 2025, and an indigenous Kichwa community grows the hemp. Half of the planned carbon income goes to the farmers and a community fund, and a land trust is planned to keep the land in local hands.",
      },
      {
        label: "Why it matters",
        text: "The hemp grain aims to feed 100 families in an area where more than half of children are chronically malnourished, and the fibre becomes low-carbon building blocks for housing.",
      },
      {
        label: "Where I can help",
        text: "Turning the model into a fundable case: numbers that hold up, clean budgets and the evidence that grant makers and carbon buyers ask for.",
      },
    ],
  },
],
projects: [
  {
    title: "Protected knowledge platform for a biotech and vertical farming project",
    desc: "I built the software for an agri-biotech production platform in Colombia: a protocol builder where scientists author and manage every recipe, and a Company Brain that guides the person running it step by step, without ever exposing the full protocol. The IP stays in the system, not in someone's phone.",
    fullDesc:
      "The platform turns a biological objective into a controlled, measurable, reproducible plant-production process, and I built the software that runs it end to end. First, the protocol builder: scientists and lab leads author, version, and manage the full protocol in one place, every step, parameter, and sequence. That library of protocols is the IP. Second, the Company Brain: when it is time to run a protocol, the Brain guides the person doing the work one step at a time, what to do now, the parameters, the frequency, the asepsis, and captures their observations back against that step. The operator executes without ever holding the whole recipe. Access is role-gated: the lab technician is guided through the steps, the commercial team sees clients, the director sees everything. Authoring and execution are one loop, and the full protocol and the accumulated data stay in the system, not in the executor's hands.",
    lessons: "The people running a protocol don't need the whole protocol. They need the current step. Authoring and execution are one loop, and the full recipe, the real IP, never has to leave the system.",
    status: "Active",
    image: "",
    animationKey: "company-brain",
    tags: ["Company Brain", "Protocol builder", "Agri-biotech"],
    modal: {
      whatItMeans:
        "A two-part platform over a real agri-biotech operation. A protocol builder where scientists author, version, and manage the full recipe library, and a Company Brain that guides the people executing one step at a time and pulls their observations back. Everything is scoped to each role, and the full protocol never leaves the system.",
      whyItMatters:
        "In science-driven production, the protocol is the IP. Hand the whole recipe to everyone who runs it and it leaks across roles and walks out the door. The Company Brain guides execution step by step, so the operator gets exactly what they need to do the work and never the full protocol. The IP stays structured, role-gated, and owned by the company.",
      whatsIncluded: [
        "Protocol builder and manager where scientists and lab leads author, version, and update the full protocol library: steps, parameters, sequence",
        "Step-by-step execution guidance: the operator sees the current step, its parameters and frequency, nothing more",
        "Observations captured back against each step as the work happens",
        "Role-gated access, so the full protocol and the data stay protected in the system",
        "The Brain answers on Telegram: the team asks, logs and gets the next step from the chat they already use, with skills for specific jobs",
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
    // Hidden until it is relaunched as the Munayki site.
    hidden: true,
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
