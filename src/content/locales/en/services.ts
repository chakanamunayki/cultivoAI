import type { SiteContent } from "../../types";

export const enServicesContent: Pick<SiteContent, "servicesTitle" | "servicesSubtitle" | "services"> = {
  servicesTitle: "Our Services",
  servicesSubtitle:
    "We don't sell hype. We build practical systems that make it easier to execute well. Not sure where to start? Fifteen minutes is enough.",
  services: [
    {
      icon: "Brain",
      title: "Company Brain: Protected Knowledge Layer",
      eng: "Company Brain: Protected Knowledge Layer",
      description: "The knowledge layer for your scientific and operational IP. Protocols, processes, and field data become one structured, queryable brain, with the knowledge layer isolated from the execution layer so your IP stays protected and role-gated. Ready for IoT, satellite, lab and field data, MRV and carbon.",
      details: [
        "Protect your protocol IP. Your know-how becomes a structured, versioned knowledge layer, not scattered PDFs and people's heads.",
        "The knowledge layer is isolated from the execution layer. What the system knows is scoped per tenant, project, and role, so nothing leaks across.",
        "Role-gated access: the lab technician sees protocols, the commercial team sees clients and proposals, the director sees everything. Nobody sees what isn't theirs.",
        "Structured scientific evidence, built to scale from 400 documents to tens of thousands, and ready to ingest IoT, satellite, lab and field data for MRV and carbon.",
        "Privacy by design: runs locally when it needs to. Your documents don't leave your system during indexing.",
      ],
      imageUrl: "/landing/photos/services/ai-assistants.png",
      animationKey: "company-brain",
      modal: {
        whatItMeans:
          "A protected knowledge layer built on your real scientific and operational IP: protocols, processes, project history, commercial data. Your team asks in plain language and the brain answers from what your business actually knows, scoped to their role.",
        whyItMatters:
          "Your protocol IP is your moat, and today it is trapped in PDFs, in key people's heads, in WhatsApp. When someone is unavailable it disappears, when someone new joins they start from zero, and without isolation it leaks across roles and clients. The Company Brain we built for an agri-biotech production platform in Colombia solved exactly this and keeps learning every day the team uses it.",
        whatsIncluded: [
          "Ingestion of your real IP: protocols, processes, commercial, projects (PDF, Word, Excel)",
          "Knowledge layer isolated from the execution layer, scoped per tenant, project, and role",
          "Role-gated access: each person reaches their domain, nothing more",
          "Ready for IoT, satellite, lab and field data, MRV and carbon",
          "Privacy by design: runs locally, with no cloud dependency during indexing",
        ],
        idealFit: [
          "Labs and agritech teams whose protocol IP is the core asset",
          "Organizations where each role needs different scientific and commercial context without crossing lines",
          "Teams that need their know-how to stay in the company when people leave",
        ],
        typicalOutcome:
          "Your protocol IP is protected, structured, and queryable. The team stops digging through files and waiting on the one person who knows. Answers arrive in seconds, scoped to each role, and the know-how stays when people leave.",
      },
    },
    {
      icon: "BarChart3",
      title: "Decision and Automation Systems",
      eng: "Decision and Automation Systems",
      description: "The execution layer that runs on top of your knowledge. Dashboards, automations, and assistants that turn your data and protocols into daily decisions and hands-off operations.",
      details: [
        "Decision dashboards: field, lab, and commercial data in one live view, so you act on signals early instead of waiting for month-end.",
        "Automations that remove repetitive work: intake, onboarding, reporting, and handoffs that run without someone chasing them.",
        "AI assistants trained on your business: they answer, qualify, schedule, and route on WhatsApp, email, and web.",
      ],
      imageUrl: "/landing/photos/services/decision-dashboards.jpg",
      animationKey: "dashboards",
      modal: {
        whatItMeans:
          "The working systems that sit on top of your knowledge layer: dashboards to see, automations to run, and assistants to respond. All built on what your business already knows.",
        whyItMatters:
          "A protected brain is only half the value. The other half is acting on it every day without adding headcount. This is where the knowledge turns into faster decisions and fewer dropped balls.",
        whatsIncluded: [
          "KPI and signal definition: what to watch and why",
          "Data consolidation from spreadsheets, databases, sensors, and CRMs into one live view",
          "Automation of core flows: intake, onboarding, reporting, follow-up",
          "AI assistants for support, qualification, scheduling, and quotes",
          "Integrations with WhatsApp, email, and calendars, with a short iteration window after launch",
        ],
        idealFit: [
          "Teams whose data is scattered across tools, files, and field devices",
          "Operations with repetitive manual steps that keep pulling people off real work",
          "You want to act on what you know daily, not reconcile it monthly",
        ],
        typicalOutcome:
          "One live view of the operation, core workflows running on their own, and faster answers for clients and team. Fewer manual tasks, earlier decisions.",
      },
    },
    {
      icon: "Rocket",
      title: "Custom AI and Software Builds",
      eng: "Custom AI and Software Builds",
      description: "From idea to version one. Custom AI tools, agents, and software built for how your operation actually works, with honest guidance on what to build and what to skip.",
      details: [
        "Custom tools and internal software: grower apps, lab tools, client portals, internal agents.",
        "Modern, fast websites and digital experiences that support trust, conversion, and follow-up.",
        "Technical and market validation: the right stack, scalable from day one, without overbuilding.",
      ],
      imageUrl: "/landing/photos/services/websites-digital-experiences.webp",
      animationKey: "software-web",
      modal: {
        whatItMeans:
          "The build partner for innovators who need real tools, not slides. We design and ship the custom software, agents, and web experiences your operation needs, and tell you straight what to build now versus later.",
        whyItMatters:
          "Most agritech and biotech teams don't have a technical founder in the room. That gap costs months and wrong turns. This is that person: someone who has built and shipped real products, deciding what matters and building it with you.",
        whatsIncluded: [
          "Scope and roadmap: what to build now versus later",
          "Custom software, internal tools, and AI agents built around your workflows",
          "Modern websites and digital experiences focused on performance and conversion",
          "Technical and stack decisions that stay defensible as you grow",
          "A launch plan, analytics basics, and a short iteration window after launch",
        ],
        idealFit: [
          "Early-stage agritech and biotech teams shipping something real",
          "Founders without a technical partner who need clarity and momentum",
          "You want tools built for your operation, not off-the-shelf that half-fits",
        ],
        typicalOutcome:
          "A version one you can actually ship and learn from, built on defensible technical choices, with fewer wrong turns and less wasted budget.",
      },
    },
    {
      icon: "CalendarCheck",
      title: "Retreat Ops Systems (Wellness)",
      eng: "Retreat Ops Systems (Wellness)",
      description: "Our wellness track. A complete operations system for retreats: from first booking to final follow-up, with clear workflows for your team and a smooth experience for guests.",
      details: [
        "Bookings, payments, invoicing.",
        "Guest messaging before, during, after.",
        "Itineraries, checklists, feedback, follow-up.",
        "Dashboards for occupancy, revenue, satisfaction.",
      ],
      imageUrl: "/landing/photos/services/health-wellness.jpg",
      animationKey: "retreat-ops",
      modal: {
        whatItMeans:
          "Our wellness track: a retreat ops system covering bookings, payments, messaging, itineraries, checklists, feedback, follow-up, dashboards.",
        whyItMatters: "Less operational chaos. Better guest experience. Fewer dropped details.",
        whatsIncluded: [
          "Intake flow design and booking system setup",
          "Pre-arrival and post-retreat messaging workflows",
          "Itinerary and checklist templates your team can run independently",
          "Feedback and satisfaction capture with follow-up routing",
          "Simple dashboard for occupancy, revenue, and guest satisfaction",
        ],
        idealFit: [
          "Retreat teams running repeatable programs",
          "You want clarity across booking, prep, delivery, follow-up",
          "You want a calmer ops rhythm",
        ],
        typicalOutcome: "Smoother operations. Clearer follow-through. Better guest experience.",
      },
    },
  ],
};
