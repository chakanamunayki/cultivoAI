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
          "Your protocol IP is your moat, and today it is trapped in PDFs, in key people's heads, in WhatsApp. When someone is unavailable it disappears, when someone new joins they start from zero, and without isolation it leaks across roles and clients. Chak Brain, the system we built for Chak Foodtech, solved exactly this and keeps learning every day the team uses it.",
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
      animationKey: "workflow",
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
      description: "An AI assistant that knows your business and handles real conversations with clients or your internal team.",
      details: [
        "An AI assistant built around your services, tone, and processes.",
        "Customer support. Internal help. Scheduling. Quotes.",
        "Works with WhatsApp, email, calendars.",
      ],
      imageUrl: "/landing/photos/services/ai-assistants.png",
      animationKey: "ai-assistants",
      modal: {
        whatItMeans: "An AI assistant built on your business knowledge: your services, processes, and tone.",
        whyItMatters:
          "Customer support, internal help, scheduling, and quotes happen faster without overloading your team.",
        whatsIncluded: [
          "An AI assistant built on your services, tone, and processes",
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
      description: "A complete operations system for retreats: from first booking to final follow-up, with clear workflows for your team and a smooth experience for guests.",
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
          "A retreat ops system covering bookings, payments, messaging, itineraries, checklists, feedback, follow-up, dashboards.",
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
    {
      icon: "BarChart3",
      title: "Decision Dashboards",
      eng: "Decision Dashboards",
      description: "Visibility that helps you act early and stay focused.",
      details: [
        "We bring together your scattered data (spreadsheets, databases, CRMs) into one clear visual dashboard.",
        "We implement key metrics (KPIs) for real-time business health.",
        "No waiting for end-of-month reports.",
      ],
      imageUrl: "/landing/photos/services/decision-dashboards.jpg",
      animationKey: "dashboards",
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
      description: "A system that turns your expertise into consistent, publishable content, without the scramble.",
      details: [
        "We map what your audience is actually looking for and build a content system around it.",
        "Topics are chosen based on real demand, not guesses.",
        "A clear path from idea to published: drafting, reviewing, and publishing without the chaos.",
      ],
      imageUrl: "/landing/photos/services/knowledge-content-systems.jpg",
      imageFit: "contain",
      animationKey: "knowledge",
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
        "Smart search and content that adapts to each visitor.",
        "Native chatbots to maximize user retention.",
      ],
      imageUrl: "/landing/photos/services/websites-digital-experiences.webp",
      animationKey: "software-web",
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
      imageFit: "contain",
      animationKey: "startup",
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
