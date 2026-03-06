import type { SiteContent } from "../../types";

export const enServicesContent: Pick<SiteContent, "servicesTitle" | "servicesSubtitle" | "services"> = {
servicesTitle: "Our Services",
servicesSubtitle:
  "Not sure where to start? Book a 15-minute call. We will help you find the smallest change that creates real momentum.",
services: [
  {
    icon: "Zap",
    title: "Workflow Optimization",
    eng: "Workflow Optimization",
    description: "Make operations smoother by removing friction and repetitive work.",
    details: [
      "We connect tools like Notion, Slack, Gmail, Airtable, and WhatsApp.",
      "We design flows that work while you sleep.",
      "From automatic invoicing to client onboarding without human intervention.",
    ],
    imageUrl: "/landing/photos/services/workflows-automation.png",
    modal: {
      whatItMeans: "Turn repetitive, manual steps into a simple workflow your team can trust.",
      whyItMatters:
        "Less follow-up chasing, fewer dropped handoffs, and a calmer day-to-day operation.",
      whatsIncluded: [
        "A quick workflow map and friction audit",
        "A simple plan: triggers, responsibilities, fallbacks",
        "Build + test of the core flow(s)",
        "Basic documentation so your team can run it",
        "A short iteration window after launch",
      ],
      idealFit: [
        "Teams with recurring ops: intake, onboarding, follow-ups, reporting",
        "You want reliable systems, not flashy automations",
        "You can assign 1-2 owners to review and approve the flow",
      ],
      typicalOutcome:
        "Fewer manual tasks, fewer things falling through the cracks, and more consistency week to week.",
    },
  },
  {
    icon: "MessageSquare",
    title: "AI Assistants",
    eng: "AI Assistants",
    description: "Keep your data private. Offline setups available when needed.",
    details: [
      "LLM-based assistants trained on your business information.",
      "Customer support. Internal help. Scheduling. Quotes.",
      "Works with WhatsApp, email, calendars.",
    ],
    imageUrl: "/landing/photos/services/ai-assistants.png",
    modal: {
      whatItMeans: "LLM-based assistants trained on your business information.",
      whyItMatters:
        "Customer support, internal help, scheduling, and quotes happen faster without overloading your team.",
      whatsIncluded: [
        "LLM-based assistants trained on your business information",
        "Customer support, internal help, scheduling, quotes",
        "Integrations with WhatsApp, email, calendars",
        "Private data handling with optional offline setup",
        "Launch and iteration based on real conversations",
      ],
      idealFit: [
        "Teams with repeated questions or recurring intake",
        "You care about trust, clarity, and brand voice",
        "You want better qualification before a human steps in",
      ],
      typicalOutcome:
        "Faster response times, fewer repetitive conversations, and a cleaner path to booking or follow-up.",
    },
  },
  {
    icon: "CalendarCheck",
    title: "Retreat Ops Systems",
    eng: "Retreat Ops Systems",
    description: "Ops without chaos. Human experience.",
    details: [
      "Bookings, payments, invoicing.",
      "Guest messaging before, during, after.",
      "Itineraries, checklists, feedback, follow-up.",
      "Dashboards for occupancy, revenue, satisfaction.",
    ],
    imageUrl: "/landing/photos/services/health-wellness.jpg",
    modal: {
      whatItMeans:
        "A retreat ops system covering bookings, payments, messaging, itineraries, checklists, feedback, follow-up, dashboards.",
      whyItMatters: "Less operational chaos. Better guest experience. Fewer dropped details.",
      whatsIncluded: [
        "Bookings, payments, invoicing.",
        "Guest messaging before, during, after.",
        "Itineraries, checklists, feedback, follow-up.",
        "Dashboards for occupancy, revenue, satisfaction.",
        "Ops without chaos. Human experience.",
      ],
      idealFit: [
        "Retreat teams running repeatable programs",
        "You want clarity across booking, prep, delivery, follow-up",
        "You want a calmer ops rhythm",
      ],
      typicalOutcome: "Smoother operations. Clearer follow-through. Better guest experience.",
    },
  },
  {
    icon: "BarChart3",
    title: "Decision Dashboards",
    eng: "Decision Dashboards",
    description: "Visibility that helps you act early and stay focused.",
    details: [
      "We centralize your scattered data (Excel, SQL, CRMs) into clear visual dashboards.",
      "We implement key metrics (KPIs) for real-time business health.",
      "No waiting for end-of-month reports.",
    ],
    imageUrl: "/landing/photos/services/decision-dashboards.jpg",
    modal: {
      whatItMeans:
        "One clear view of what is happening, what is changing, and what needs attention.",
      whyItMatters:
        "Better decisions happen when you stop reconciling spreadsheets and start seeing patterns early.",
      whatsIncluded: [
        "KPI definition (what to track and why)",
        "Data consolidation (where your data lives today)",
        "Dashboard build with clear views for different roles",
        "Alerts or lightweight summaries for key signals",
        "A short training + handoff so it stays useful",
      ],
      idealFit: [
        "Teams with data spread across tools and files",
        "You want clarity without a heavy BI program",
        "You want a simple version one that can grow later",
      ],
      typicalOutcome:
        "A weekly rhythm: check one dashboard, spot issues sooner, and act with confidence.",
    },
  },
  {
    icon: "Layers",
    title: "Knowledge and Content Systems",
    eng: "Knowledge and Content Systems",
    description: "Consistent output without chaos.",
    details: [
      "Market signals plus content system design.",
      "Topic direction based on real demand.",
      "Draft workflow. Review workflow. Publishing workflow.",
    ],
    imageUrl: "/landing/photos/services/knowledge-content-systems.jpg",
    imageFit: "contain",
    modal: {
      whatItMeans:
        "Market signals and content system design create a repeatable path from signal to output.",
      whyItMatters:
        "You prioritize based on real demand, clarify offers and angles, and publish consistently without chaos.",
      whatsIncluded: [
        "Audience pain mapping and keyword signals",
        "Competitor scan and offer clarity checks",
        "Messaging angle selection for priority topics",
        "Draft workflow, review workflow, publishing workflow",
        "Knowledge capture templates that keep output consistent",
      ],
      idealFit: [
        "Teams who publish regularly or need internal documentation",
        "You have expertise, but no consistent system",
        "You want speed without losing quality",
      ],
      typicalOutcome:
        "A repeatable path from market signal to published output, with less chaos and more consistency.",
    },
  },
  {
    icon: "Monitor",
    title: "Software, Websites and Digital Experiences",
    eng: "Software, Websites and Digital Experiences",
    description: "Beautiful design paired with systems that support conversion and follow-up.",
    details: [
      "Modern, fast websites optimized for conversion.",
      "Semantic search and real-time content personalization.",
      "Native chatbots to maximize user retention.",
    ],
    imageUrl: "/landing/photos/services/websites-digital-experiences.webp",
    modal: {
      whatItMeans:
        "A fast, beautiful web experience that supports trust, conversion, and follow-through.",
      whyItMatters:
        "Good design makes your work easier to understand. Good systems make the next step actually happen.",
      whatsIncluded: [
        "Messaging + structure (what to say, what to show, what to cut)",
        "Design and UI direction that feels intentional",
        "Implementation focused on performance and clarity",
        "Analytics basics so you can learn what works",
        "A short iteration window after launch",
      ],
      idealFit: [
        "Teams who need a credible, modern presence",
        "You want your site connected to your workflows and follow-up",
        "You care about tone, trust, and speed",
      ],
      typicalOutcome:
        "A site that feels premium and converts better, with fewer manual follow-ups from your team.",
    },
  },
  {
    icon: "Rocket",
    title: "Startup Advisory",
    eng: "Startup Advisory",
    description: "From idea to version one, with practical systems and honest guidance.",
    details: [
      "Technical and market validation guidance.",
      "We help you choose the right tech stack.",
      "Scalable processes from day one.",
    ],
    imageUrl: "/landing/photos/services/startup-advisory.png",
    modal: {
      whatItMeans: "Straight, practical guidance to ship version one without overbuilding.",
      whyItMatters: "You avoid costly detours, choose what matters now, and get feedback sooner.",
      whatsIncluded: [
        "Scope and roadmap: what to build now vs later",
        "Product and technical decisions (simple, defensible tradeoffs)",
        "System design review to reduce risk",
        "Launch plan and early iteration strategy",
        "Light async support while you execute",
      ],
      idealFit: [
        "Early-stage teams with limited time and budget",
        "Founders who want clarity and momentum",
        "Teams shipping something real (not just slides)",
      ],
      typicalOutcome:
        "A simpler plan, fewer wrong turns, and a version one you can actually ship and learn from.",
    },
  },
],
};
