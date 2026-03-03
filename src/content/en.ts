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
    subheadline:
      "We automate repetitive work.\nWe surface what matters in dashboards.\nWe turn your knowledge into a reusable system.",
    services: [],
    servicesDone: "",
    audience: [],
    outcomes: ["Less manual work", "Clearer decisions", "Better follow-through"],
    audienceLabel: "Built for:",
    audienceChips: [
      "Wellness retreats",
      "Off-grid communities",
      "Self-sufficiency projects",
      "Hydroponics",
      "Holistic wellbeing",
      "Regenerative projects",
      "Impact startups",
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

  about: {
    title: "Who We Are",
    subtitle: "A family building something meaningful from Colombia",
    viewMoreLabel: "View more",
    footerNote:
      "**For larger impact projects, we have technical experts who support us when needed.**",
    teamMembers: [
      {
        id: "paul",
        name: "Paul Ronayne",
        title: "AI developer and consultant",
        subtitle: "Co-founder of nbn23.com and nagi.es in Spain",
        description:
          "I've spent 20+ years in tech, including co-founding two tech/data businesses in Spain: nbn23.com and nagi.es. Today I blend startup discipline with human-first AI to help holistic businesses grow with clarity and care.",
        imageUrl: "/landing/photos/team/paul.jpg",
        accentColor: "bg-primary",
        shadowColor: "bg-black",
        linkedinUrl: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        bio: {
          headline:
            "I combine startup and data experience with grounded, human-first AI for holistic businesses",
          sections: [
            {
              title: "What it means",
              content:
                "I start by listening deeply to how your team works and how your clients feel, then design AI systems that support both operations and human connection.",
            },
            {
              title: "Why it matters",
              content:
                "Many wellness and holistic teams carry too much. The right AI creates calm, consistency, and capacity so you can serve better without burning out.",
            },
            {
              title: "What's included",
              content:
                "Hands-on strategy, AI roadmap, workflow and assistant design, and practical delivery support. We define scope together, ship in phases, and track real business outcomes.",
            },
            {
              title: "Ideal fit",
              content:
                "Founders and small teams in wellness, holistic, and purpose-led spaces who want both soul and structure: human care plus startup-level execution.",
            },
            {
              title: "Typical outcome",
              content:
                "Calmer operations, clearer decisions, healthier growth, and more time for high-value human work with your clients and community.",
            },
          ],
          linkedinUrl: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        },
      },
      {
        id: "rocky",
        name: "Rocky Ronayne",
        title: "AI systems specialist",
        description:
          "Rocky builds AI workflows, assistants, and dashboards that help teams move faster and stay consistent. Practical, design-aware, and focused on real outcomes.",
        imageUrl: "/landing/photos/team/rocky.jpg",
        accentColor: "bg-primary",
        shadowColor: "bg-black",
        bio: {
          headline: "Practical AI systems that support real outcomes",
          sections: [
            {
              title: "What it means",
              content:
                "I build AI workflows, assistants, and dashboards that help teams stay consistent and reduce repetitive work.",
            },
            {
              title: "Why it matters",
              content:
                "A system is only useful if people actually use it. I focus on clarity, reliability, and making the next step obvious.",
            },
            {
              title: "What's included",
              content:
                "A simple version one, built and tested end-to-end. Clear handoff notes, and iteration based on what we learn from real use.",
            },
            {
              title: "Ideal fit",
              content:
                "Teams who want practical AI help without complexity, and who care about the user experience and tone.",
            },
            {
              title: "Typical outcome",
              content:
                "A workflow or assistant that reduces manual work and keeps follow-through consistent week to week.",
            },
          ],
        },
      },
      {
        id: "marta",
        name: "Marta Ronayne",
        title: "Human-centered design and wellness context",
        description:
          "Marta brings a grounded human perspective, helping shape tone, trust, and user experience, especially for wellness and wellbeing projects.",
        imageUrl: "/landing/photos/team/marta.jpg",
        accentColor: "bg-primary",
        shadowColor: "bg-black",
        linkedinUrl: "https://www.linkedin.com/in/marta-ronayne/",
        bio: {
          headline: "Tone, trust, and usability that feels human",
          sections: [
            {
              title: "What it means",
              content:
                "I help shape how systems feel: language, flow, and the human moments that build trust.",
            },
            {
              title: "Why it matters",
              content:
                "If the experience feels cold or confusing, people disengage. Human-centered design keeps the work usable and respectful.",
            },
            {
              title: "What's included",
              content:
                "Copy and tone guidance, UX input, and real-world feedback on what will (and will not) work for people.",
            },
            {
              title: "Ideal fit",
              content:
                "Wellness, health, and sustainability teams who want a warm, clear, trustworthy experience.",
            },
            {
              title: "Typical outcome",
              content:
                "A system that feels clear and human, so people actually stick with it and follow through.",
            },
          ],
          linkedinUrl: "https://www.linkedin.com/in/marta-ronayne/",
        },
      },
    ],
  },

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
      "We do not sell hype. We build practical systems that make good work easier to run. The goal is clarity and momentum, not complexity.",
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

  demosTitle: "AI in Action",
  demosSubtitle: "See examples of assistants, dashboards, and workflow systems in action.",
  useCases: [
    {
      id: "chat",
      title: "Smart Chatbot",
      description: "Automatic 24/7 customer service. Responds, qualifies, and schedules.",
      scenario: "A customer asks about chatbot pricing",
      steps: [
        { action: "Customer: Hi, what do your chatbots cost?", result: "" },
        { action: "AI: Analyzing context...", result: "" },
        {
          action: "",
          result:
            "Bot: Great question. Pricing depends on scope. Want to tell me what you are trying to do so I can point you to the best next step?",
        },
        { action: "Customer: Yes, please.", result: "" },
        { action: "", result: "Sending interactive demo..." },
      ],
    },
    {
      id: "lead",
      title: "Lead Filtering",
      description: "Automatically qualify prospects before you talk to them.",
      scenario: "New lead arrives from LinkedIn",
      steps: [
        { action: "New Lead: Juan Perez (LinkedIn)", result: "" },
        { action: "AI: Enriching profile...", result: "" },
        { action: "", result: "{ Role: CEO, Size: 50-100, Loc: Bog }" },
        { action: "", result: "Score: 92/100. High probability." },
        { action: "", result: "Moved to 'High Priority' column" },
      ],
    },
    {
      id: "web",
      title: "Web Builder",
      description: "Generate web structures and optimized copy in seconds.",
      scenario: "Generating landing page for coffee shop",
      steps: [
        { action: "User: Landing for modern coffee shop", result: "" },
        { action: "AI: Generating React components...", result: "" },
        { action: "", result: '<Hero title="Origin Coffee" />' },
        { action: "", result: '<Features list={["Medium Roast", "Organic"]} />' },
        { action: "", result: "Site deployed to Vercel" },
      ],
    },
    {
      id: "dash",
      title: "Business Dashboard",
      description: "Turn raw data into real-time decision charts.",
      scenario: "Syncing Stripe and Shopify",
      steps: [
        { action: "Sync Stripe & Shopify", result: "" },
        { action: "AI: Detecting anomalies...", result: "" },
        { action: "", result: "Sales Today: $2,450 (+15%)" },
        { action: "", result: "Updating revenue widget" },
        { action: "", result: "Insight: Product B is trending." },
      ],
    },
    {
      id: "social",
      title: "Social Media Flow",
      description: "Multiply your content. From one idea to all networks.",
      scenario: "Creating content about AI in SMBs",
      steps: [
        { action: "User: Post about 'AI in SMBs'", result: "" },
        { action: "AI: Adapting to formats...", result: "" },
        { action: "", result: "Instagram: 5-slide carousel" },
        { action: "", result: "Twitter: 3-tweet thread" },
        { action: "", result: "LinkedIn: Professional article" },
      ],
    },
    {
      id: "project19",
      title: "Project19 Coach",
      description: "Personal AI coach via WhatsApp. Morning briefing and evening check-in.",
      scenario: "A day with Rocky's coach",
      steps: [
        { action: "7:00 AM - Good morning Rocky!", result: "" },
        {
          action: "",
          result: "What do you have planned for today? School, soccer, anything else?",
        },
        { action: "Rocky: School until 3, then soccer practice", result: "" },
        { action: "", result: "Saved to Notion. I'll text you at 8pm!" },
        { action: "8:00 PM - How was your day?", result: "" },
        { action: "Rocky: [Voice note 30s]", result: "" },
        { action: "", result: "Transcribed and saved. Good day! Get some rest." },
      ],
    },
  ],

  whoWeHelp: {
    title: "Are we the right fit?",
    idealTitle: "We're ideal for you if...",
    idealItems: [
      "You are building in health, sustainability, or mission-led work.",
      "You want practical systems, not hype.",
      "You value clarity, design, and human communication.",
      "You want a direct relationship with the builders.",
    ],
    notIdealTitle: "Probably not a fit if...",
    notIdealItems: [
      "You want instant over quality.",
      "You want zero involvement and magical results.",
      "You need a big agency and a rotating team.",
    ],
    sectorsTitle: "Where we do our best work",
    sectors: [
      {
        name: "Health and wellness",
        description: "Teams supporting real human wellbeing.",
        icon: "Heart",
        imageUrl: "/landing/photos/sectors/health-wellness.jpg",
        chatButtonLabel: "Let's talk",
        detailsButtonLabel: "Learn more",
        modal: {
          whatItMeans:
            "Systems that help health and wellness teams deliver consistent service: clear intake, clear follow-up, and a human tone.",
          whyItMatters:
            "In health work, delays and inconsistency erode trust. A simple system reduces missed steps and frees your team to focus on people, not admin.",
          whatsIncluded: [
            "Workflow design for intake, scheduling, and follow-up",
            "Human-toned assistants for FAQ, triage, and routing",
            "Dashboards for visibility (retention, pipeline, operations)",
            "Knowledge systems so the team stays aligned",
          ],
          idealFit: [
            "Clinics, programs, and practitioners delivering recurring services",
            "Teams with intake, scheduling, and follow-up complexity",
            "Organizations where tone, trust, and consistency matter",
          ],
          typicalOutcome:
            "Faster response, cleaner handoffs, and a calmer operation that clients can feel.",
        },
        whoWeHelp: [
          "Clinics, programs, and practitioners delivering recurring services",
          "Teams with intake, scheduling, and follow-up complexity",
          "Organizations where tone, trust, and consistency matter",
        ],
        howWeHelp: [
          "Workflow design for intake, scheduling, and follow-up",
          "Human-toned assistants for FAQ, triage, and routing",
          "Dashboards for visibility (retention, pipeline, operations)",
          "Knowledge systems so the team stays aligned",
        ],
        exampleProjects: [
          "Service delivery workflow + simple dashboard",
          "Assistant that qualifies and routes requests to the right person",
          "Website refresh connected to follow-up and next steps",
        ],
      },
      {
        name: "Sustainability and regenerative projects",
        description: "Projects protecting ecosystems and local resilience.",
        icon: "Sprout",
        imageUrl: "/landing/photos/sectors/sustainability-regenerative.jpg",
        chatButtonLabel: "Let's talk",
        detailsButtonLabel: "Learn more",
        modal: {
          whatItMeans:
            "Practical systems for coordination, reporting, and follow-through so the work stays real on the ground, not just on paper.",
          whyItMatters:
            "Sustainability teams juggle partners, field work, and accountability. Clear systems keep momentum high and confusion low.",
          whatsIncluded: [
            "Simple systems for coordination and accountability",
            "Dashboards for decisions and reporting",
            "Knowledge capture so learning does not get lost",
            "Web experiences that communicate credibility and impact",
          ],
          idealFit: [
            "Regenerative projects coordinating partners and field work",
            "Teams balancing impact goals with operational reality",
            "Organizations needing clearer reporting and follow-through",
          ],
          typicalOutcome:
            "Less chaos, clearer reporting, and a team that can execute consistently across people and partners.",
        },
        whoWeHelp: [
          "Regenerative projects coordinating partners and field work",
          "Teams balancing impact goals with operational reality",
          "Organizations needing clearer reporting and follow-through",
        ],
        howWeHelp: [
          "Simple systems for coordination and accountability",
          "Dashboards for decisions and reporting",
          "Knowledge capture so learning does not get lost",
          "Web experiences that communicate credibility and impact",
        ],
        exampleProjects: [
          "Operations dashboard + reporting rhythm",
          "Knowledge base for processes, partners, and learnings",
          "Project site that makes the work easy to understand and support",
        ],
      },
      {
        name: "Alternative education",
        description: "Learning models that prioritize people and context.",
        icon: "GraduationCap",
        imageUrl: "/landing/photos/sectors/alternative-education.jpg",
        chatButtonLabel: "Let's talk",
        detailsButtonLabel: "Learn more",
        modal: {
          whatItMeans:
            "Systems that support learners and staff: better communication, clearer next steps, and less manual coordination.",
          whyItMatters:
            "Education programs win on consistency. When ops are messy, learners feel it. A simple system protects the experience.",
          whatsIncluded: [
            "Intake and enrollment flows that reduce manual work",
            "Assistants for support, FAQs, and routing",
            "Dashboards to see progress, capacity, and follow-up needs",
            "Content and knowledge systems for consistent communication",
          ],
          idealFit: [
            "Programs with instructors, cohorts, and ongoing communication",
            "Teams handling enrollment, scheduling, and learner support",
            "Organizations that need a consistent, human experience",
          ],
          typicalOutcome:
            "A smoother learner journey, fewer dropped messages, and more time for educators to teach.",
        },
        whoWeHelp: [
          "Programs with instructors, cohorts, and ongoing communication",
          "Teams handling enrollment, scheduling, and learner support",
          "Organizations that need a consistent, human experience",
        ],
        howWeHelp: [
          "Intake and enrollment flows that reduce manual work",
          "Assistants for support, FAQs, and routing",
          "Dashboards to see progress, capacity, and follow-up needs",
          "Content and knowledge systems for consistent communication",
        ],
        exampleProjects: [
          "Enrollment workflow + support assistant",
          "Program dashboard for operations and follow-up",
          "Website and content system for consistent messaging",
        ],
      },
      {
        name: "Mission-led startups",
        description: "Early teams creating useful products with purpose.",
        icon: "Rocket",
        imageUrl: "/landing/photos/sectors/mission-led-startups.webp",
        chatButtonLabel: "Let's talk",
        detailsButtonLabel: "Learn more",
        modal: {
          whatItMeans:
            "A senior, practical build partner to ship version one, keep scope tight, and avoid expensive detours.",
          whyItMatters:
            "Startups die in the gap between ideas and execution. Clear scope and fast feedback keep momentum alive.",
          whatsIncluded: [
            "Version-one builds with a tight, defensible scope",
            "Workflows and dashboards that create operational clarity",
            "Assistants and knowledge systems that scale support",
            "Product advisory to avoid overbuilding",
          ],
          idealFit: [
            "Early teams who need version one, fast and usable",
            "Founders who want honest tradeoffs and clear priorities",
            "Teams building in health, sustainability, or public good",
          ],
          typicalOutcome:
            "A shipped v1 with clear ownership and a plan to iterate based on real usage.",
        },
        whoWeHelp: [
          "Early teams who need version one, fast and usable",
          "Founders who want honest tradeoffs and clear priorities",
          "Teams building in health, sustainability, or public good",
        ],
        howWeHelp: [
          "Version-one builds with a tight, defensible scope",
          "Workflows and dashboards that create operational clarity",
          "Assistants and knowledge systems that scale support",
          "Product advisory to avoid overbuilding",
        ],
        exampleProjects: [
          "MVP + workflow system for intake and follow-up",
          "Decision dashboard for priorities and metrics",
          "Knowledge base that grows with the product",
        ],
      },
    ],
    cta: "We make room for high-impact teams, even when budgets are tight.",
    ctaButton: "Tell us about your project",
  },

  semilla: {
    title: "Semilla Fund",
    subtitle: "Rocky's Journey",
    about:
      "I'm 14 years old. I turn 15 in January. I still don't know exactly what I want to do with my life, and I think that's okay. But I do know some things: I like to build. My dad is teaching me to make things with AI - chatbots, automations, stuff like that. Sometimes he teaches me. Sometimes I teach him.",
    tiers: [
      { name: "Seed ($10-50)", description: "Progress updates, name on supporters page" },
      { name: "Sprout ($50-200)", description: "Early access to tools, input on features" },
      { name: "Grow ($200-500)", description: "Free lifetime access to what Rocky builds" },
      { name: "Partner ($500+)", description: "Custom adaptation, direct involvement" },
    ],
    services: [
      "Basic chatbots for WhatsApp or web",
      "Simple automations (connect apps, send notifications)",
      "Help with Notion and organization",
      "Chatbot development workshops",
    ],
    goal: "By the time I'm 19, I want to have options. Maybe play semi-professional soccer. Maybe have my own business. Maybe both. The point is being able to choose.",
    ctaTitle: "Propose a Project",
    ctaDescription: "Have something small you need? Tell me about it.",
    ctaButton: "Propose Project",
  },

  partnershipsTitle: "Flexible Ways to Work Together",
  partnershipsSubtitle:
    "Not every valuable project comes with a big budget. If the impact is real, we can start lean and grow from there.",
  partnerships: [
    {
      name: "Standard Project",
      tagline: "Businesses with budget",
      description:
        "Clear scope and defined deliverables. Fixed price agreed before starting. Established timeline. Post-delivery support included.",
      idealFor: ["Companies that know what they need", "Resources to invest"],
      icon: "Briefcase",
      imageUrl: "/landing/photos/partnerships/standard-project.jpg",
      modal: {
        whatItMeans:
          "A clear-scope build with defined deliverables, timeline, and responsibilities.",
        whyItMatters:
          "If you need predictability, this model keeps decision-making fast and delivery aligned to a clear target.",
        whatsIncluded: [
          "A short discovery to define scope and success criteria",
          "A delivery plan with milestones and clear ownership",
          "Build, test, and launch of the agreed deliverables",
          "Basic documentation and handoff",
          "A small post-launch support window for fixes and tuning",
        ],
        idealFit: [
          "Teams who know what they need (or can decide quickly)",
          "Projects where clarity and speed matter",
          "Organizations ready to invest in quality delivery",
        ],
        typicalOutcome:
          "A shipped system with clear scope, clear handoff, and the foundation to iterate responsibly.",
      },
    },
    {
      name: "Impact-friendly rates",
      tagline: "Mission-aligned teams",
      description:
        "Same quality level. Significantly reduced price. Flexible conditions. In exchange: testimonial, case study, or referrals.",
      idealFor: ["Pre-revenue startups", "Projects with social mission"],
      icon: "HeartHandshake",
      imageUrl: "/landing/photos/partnerships/impact-friendly.jpg",
      modal: {
        whatItMeans:
          "Reduced rates for mission-led teams when the impact is real and expectations are clear.",
        whyItMatters:
          "High-impact work often starts lean. This model makes it possible to build useful systems without stretching the team past their limits.",
        whatsIncluded: [
          "The same delivery quality, with a leaner scope",
          "Clear priorities: version one first, then improve",
          "Flexible collaboration to match real constraints",
          "Agreement on a fair exchange (testimonial, case study, referrals)",
          "A plan to grow the system as momentum builds",
        ],
        idealFit: [
          "Mission-aligned teams with tight budgets",
          "Projects where outcomes matter more than polish on day one",
          "Teams willing to collaborate closely and iterate",
        ],
        typicalOutcome:
          "A focused version one that creates momentum, with a clear path to expand when resources allow.",
      },
    },
    {
      name: "Partnership options",
      tagline: "Right fit only",
      description:
        "For selected projects with strong impact potential and clear alignment, we can define custom partnership terms.",
      idealFor: ["Impact startups", "Long-term aligned collaborations"],
      icon: "PieChart",
      imageUrl: "/landing/photos/partnerships/partnership-options.jpg",
      modal: {
        whatItMeans:
          "A custom collaboration model for the rare cases where alignment is strong and incentives should stay connected over time.",
        whyItMatters:
          "When a project has real upside and real impact, rigid models can slow progress. Custom terms keep the relationship win-win.",
        whatsIncluded: [
          "A candid alignment check (impact, execution, and expectations)",
          "A phased plan with clear deliverables at each step",
          "Terms that keep incentives aligned as the project evolves",
          "Regular review points to adjust scope and priorities",
          "A focus on long-term usefulness, not short-term optics",
        ],
        idealFit: [
          "Impact startups with strong potential and clear focus",
          "Teams looking for long-term collaboration, not a one-off",
          "Situations where flexibility creates better outcomes",
        ],
        typicalOutcome:
          "A partnership that ships in phases, stays honest about tradeoffs, and grows a useful system over time.",
      },
    },
  ],

  projectsTitle: "What We've Built",
  projectsSubtitle: "Selected projects from our current work",
  projects: [
    {
      title: "Chak",
      desc: "Systems built to support health-focused work with clarity, structure, and momentum.",
      fullDesc:
        "An evolving system that combines operational workflows, service delivery, and decision visibility so health-focused teams can work with less friction and better follow-through.",
      lessons: "Build for real usage first, then expand with confidence.",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
      ],
      tags: ["Health", "Systems"],
      modal: {
        whatItMeans:
          "A practical operating system for a health-focused team: clear workflows, clear handoffs, and clear visibility.",
        whyItMatters:
          "When service delivery is inconsistent, outcomes suffer. Systems create consistency without losing the human touch.",
        whatsIncluded: [
          "Workflow map for delivery and follow-up",
          "A version-one dashboard for visibility and decision support",
          "A lightweight knowledge base so the team stays aligned",
          "Iteration based on real use (not assumptions)",
        ],
        idealFit: [
          "Health and wellbeing teams delivering services at growing volume",
          "Projects where follow-through and trust matter",
          "Teams that want simple version one, then improve",
        ],
        typicalOutcome:
          "More consistent delivery, fewer missed steps, and faster learning through iteration.",
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
  ],

  storiesTitle: "Real Examples",
  storiesSubtitle: "How we've helped businesses like yours",
  stories: [
    {
      company: "Hydroponics Farm",
      industry: "Agriculture",
      before:
        "Checking pH, EC, and temperature manually 4x daily. Drove to the greenhouse at 6am and 10pm. One weekend away meant asking a neighbor who didn't really understand the system.",
      after:
        "Sensors feed into a dashboard. Alerts go to WhatsApp when something's off. Weekly AI summary of trends and recommendations.",
      quote:
        "Caught a pH drift at 2am that would have killed a lettuce crop. Now takes weekends off.",
      author: "Farm Owner",
      imageUrl:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop",
      metric: "Weekend freedom restored",
    },
    {
      company: "Holistic Wellness Practice",
      industry: "Health & Wellness",
      before:
        "Clients messaged at all hours asking about session types, prices, availability. Couldn't respond during sessions. Lost bookings to practitioners who replied faster.",
      after:
        "WhatsApp bot explains services, answers questions about Reiki vs. sound healing vs. breathwork, checks calendar, and books directly. Warm, not robotic.",
      quote:
        "40% more sessions booked. I respond to complex questions when centered, not mid-session.",
      author: "Wellness Practitioner",
      imageUrl:
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop",
      metric: "+40% sessions booked",
    },
    {
      company: "Homeschool Family",
      industry: "Education",
      before:
        "Mom spent Sunday nights planning the week. Tracking progress across 3 kids in spreadsheets. No idea if they were actually retaining material.",
      after:
        "AI helps generate weekly plans based on each kid's pace. Progress tracked automatically. Gaps flagged before they become problems.",
      quote:
        "Sunday planning: 3 hours down to 45 minutes. Kids get more personalized attention, less admin stress.",
      author: "Homeschool Parent",
      imageUrl:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      metric: "3 hours -> 45 minutes weekly",
    },
    {
      company: "Homestead & Small Farm",
      industry: "Agriculture",
      before:
        "Egg sales, vegetables, workshop signups all tracked differently. Some in a notebook. Some in WhatsApp. No idea what was actually profitable.",
      after:
        "Simple dashboard connects sales channels. Sees which products make money, which don't. Tracks repeat customers.",
      quote:
        "Discovered jam sales lost money after accounting for time. Raised prices, focused on what worked.",
      author: "Homesteader",
      imageUrl:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
      metric: "Real profitability visibility",
    },
    {
      company: "Self-Sustainable Community",
      industry: "Community Management",
      before:
        "30 families, shared resources, zero central system. Tool library tracked in a notebook. Work shifts coordinated via group chat chaos. Food forest harvests went to whoever showed up first. Disputes over fairness.",
      after:
        "Simple member portal. AI helps schedule work rotations fairly, tracks tool borrowing, announces what's ready to harvest and suggests equitable distribution. Sends gentle reminders, not nagging.",
      quote:
        "Less admin drama, more community. Decisions based on data, not whoever talks loudest.",
      author: "Community Coordinator",
      imageUrl:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop",
      metric: "30 families coordinated",
    },
    {
      company: "Impact Startup",
      industry: "Tech Startup",
      before:
        "Founder doing everything. Customer questions, investor updates, content, ops. No system. Things fell through cracks constantly.",
      after:
        "Leads auto-captured and scored. FAQ handled by chatbot. Weekly metrics report generated automatically. Founder focuses on product and fundraising.",
      quote:
        "Stopped losing leads. Investors started commenting on how organized the updates were.",
      author: "Startup Founder",
      imageUrl:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
      metric: "Zero leads lost",
    },
    {
      company: "Aquaponics Operation",
      industry: "Agriculture",
      before:
        "Fish feeding, water quality, plant health all monitored separately. Data in three different apps. Correlating problems took hours of detective work.",
      after:
        "Unified dashboard. AI flags when fish behavior + water temp + plant growth suggest a problem brewing.",
      quote:
        "Predicted a filter issue 3 days before it would have crashed the system. One dashboard instead of three apps.",
      author: "Aquaponics Farmer",
      imageUrl:
        "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop",
      metric: "3 apps -> 1 dashboard",
    },
    {
      company: "Alternative Therapy Center",
      industry: "Health & Wellness",
      before:
        "4 practitioners, 4 separate calendars, clients confused about who does what. Receptionist spent half her day just routing inquiries.",
      after:
        "Single booking system with AI that asks what the client needs and matches them to the right practitioner. Handles scheduling conflicts automatically.",
      quote:
        "Receptionist now does client follow-up instead of calendar tetris. Booking errors dropped to near zero.",
      author: "Center Manager",
      imageUrl:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
      metric: "Near-zero booking errors",
    },
    {
      company: "Language School",
      industry: "Education",
      before:
        "Admin spent 2+ hours daily answering the same questions. Prices, schedules, levels, payment methods. Over and over.",
      after:
        "Chatbot handles 80% of inquiries. Knows courses, checks availability, sends enrollment links, answers in Spanish or English.",
      quote:
        "Admin focuses on student experience. Enrollment up because responses happen instantly, not next business day.",
      author: "School Administrator",
      imageUrl:
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
      metric: "80% inquiries automated",
    },
    {
      company: "Regenerative Agriculture Consultant",
      industry: "Consulting",
      before:
        "Client farm data scattered across emails, PDFs, and voice notes. Preparing a soil health report meant hunting through months of messages.",
      after:
        "Clients submit data through a simple form. AI organizes it, flags anomalies, drafts the initial report structure.",
      quote: "Report prep time cut in half. More time in the field, less time in email.",
      author: "Agriculture Consultant",
      imageUrl:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
      metric: "50% less report prep time",
    },
    {
      company: "Permaculture Project",
      industry: "Agriculture",
      before:
        "5-year food forest plan existed mostly in the founder's head. Volunteers showed up not knowing what to do. Plant guilds, water flows, seasonal tasks scattered across notebooks, PDFs, and half-remembered conversations. Knowledge walked out the door when key people left.",
      after:
        "Central system tracks what's planted where, what needs doing this month, and why. Volunteers get clear tasks matched to their skills. AI helps answer 'what should go next to the apple guild?' based on the site's own data.",
      quote:
        "New volunteers productive on day one. Institutional knowledge stays even when people move on.",
      author: "Project Founder",
      imageUrl:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop",
      metric: "Institutional knowledge preserved",
    },
  ],

  values: {
    title: "Our Values",
    subtitle: "What defines us",
    values: [
      {
        icon: "Sprout",
        title: "CULTIVATE, NOT EXTRACT",
        description:
          "We build for the long term. We prefer relationships that grow over quick transactions.",
      },
      {
        icon: "Handshake",
        title: "WIN-WIN OR NO DEAL",
        description:
          "We only take on projects where both sides win. If we can't add real value, we say so.",
      },
      {
        icon: "User",
        title: "ALWAYS HUMAN",
        description:
          "AI is a tool, not a replacement. We prioritize human connection in everything we do.",
      },
    ],
  },

  mission: {
    title: "Our Mission",
    statement: [
      "We build AI systems that help good work scale.",
      "A portion of what we earn is reinvested into impact-aligned projects.",
      "The more we build, the more we can support.",
    ],
    tagline: "Propose an impact project",
  },

  whatHappensNext: {
    title: "What happens after you contact us?",
    subtitle: "That simple. No surprises.",
    steps: [
      {
        number: "1",
        title: "We reply quickly",
        description: "You get a direct response and a clear next step.",
      },
      {
        number: "2",
        title: "We map your workflow and propose a simple plan",
        description: "We focus on practical changes that reduce friction fast.",
      },
      {
        number: "3",
        title: "We build version one and iterate",
        description: "Then we improve with your team based on real usage.",
      },
    ],
    cta: "Let's start the conversation",
    ctaButton: "Let's Talk",
  },

  footer: {
    cta: "Tell us what you are building.",
    ctaButton: "Let's Talk",
    copyright: "2026 Cultivo AI. Colombia-based, working worldwide.",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        label: "LinkedIn",
      },
      {
        platform: "whatsapp",
        url: "https://wa.me/573106172706",
        label: "WhatsApp",
      },
      {
        platform: "instagram",
        url: "#",
        label: "Instagram",
        comingSoon: true,
      },
      {
        platform: "facebook",
        url: "#",
        label: "Facebook",
        comingSoon: true,
      },
    ],
    contactInfo: {
      email: "hola@cultivoai.co",
      whatsapp: "+573106172706",
      whatsappDisplay: "+57 310 617 2706",
      location: "Medellin, Colombia",
      locationSecondary: "Worldwide",
    },
    quickLinks: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Partners", href: "#partnerships" },
      { label: "Projects", href: "#projects" },
      { label: "Process", href: "#what-happens-next" },
    ],
    quickLinksTitle: "Navigation",
    contactTitle: "Contact",
    socialTitle: "Follow Us",
  },

  chat: {
    title: "CultivoAI Assistant",
    placeholder: "Type your message...",
    sendButton: "Send",
    welcomeMessage:
      "Hi! I'm the CultivoAI assistant. I can help you learn about our services, show you projects, or connect you with the team. How can I help you?",
    contextualGreetings: {
      general:
        "Hi! I'm the CultivoAI assistant. I can help you learn about our services, show you projects, or connect you with the team. What brings you here today?",
      booking:
        "Hi! I see you want to book time with Paul. I'd love to help you with that! First, what's your name? And tell me a bit about what you'd like to discuss.",
      story:
        "Hi! You can learn more about our team story in the About section. What would you like to know? And by the way, what's your name?",
      semilla:
        "Hey! Rocky here (well, the AI version). I'm glad you're interested in the Semilla Fund! It's my project to help with small things while I learn. What's your name? And tell me what you have in mind!",
      service:
        "Hi! I see you're interested in {service}. Great choice! What's your name? And tell me about your current situation - what problem are you trying to solve?",
      partnership:
        "Hi! You're interested in learning more about our {partnership} model. Every project is different! What's your name? And tell me about your project so we can explore the best options.",
      qualification:
        "Hi! Let's see if we're the right fit to work together. What's your name? And tell me about your business and what you're looking to achieve.",
      impact: "Hi! I want to learn how you can help with a practical, human-first AI system.",
      formFallback: "Prefer to fill out a form? Click here.",
    },
  },

  contactForm: {
    title: "Let's Talk",
    subtitle: "No corporate forms. Just a conversation.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    whatsappLabel: "WhatsApp (optional)",
    whatsappPlaceholder: "+1 555 123 4567",
    projectTypeLabel: "What type of project do you have in mind?",
    projectTypes: [
      "Workflow optimization",
      "Chatbot / AI Assistant",
      "Decision dashboard",
      "Knowledge and content system",
      "Software / Website experience",
      "Startup advisory",
      "Not sure - need guidance",
      "Other",
    ],
    descriptionLabel: "Tell us briefly about your project",
    descriptionPlaceholder: "What problem do you want to solve? What outcome do you expect?",
    submitButton: "Send message",
    chatPrompt: "Prefer to chat? Our AI assistant can help!",
  },

  terminal: {
    sectionTitle: "How we work",
    summary: "No chaos. Clear scope. Fast version one. Direct iteration.",
    welcomeLine1: "Last login: ",
    welcomeLine2: "Cultivo AI Automation Suite v2.5.0",
    script: [
      { text: "Starting discovery...", type: "command", delay: 800 },
      { text: "Mapping your workflow...", type: "info", delay: 600 },
      { text: "Finding friction points...", type: "info", delay: 700 },
      { text: "Designing a simple version one...", type: "ai", delay: 700 },
      { text: "Building the dashboard...", type: "command", delay: 700 },
      { text: "Creating a living knowledge base...", type: "info", delay: 700 },
      { text: "Shipping and testing...", type: "success", delay: 700 },
      { text: "Measuring results...", type: "event", delay: 700 },
      { text: "Iterating with your team...", type: "success", delay: 2500 },
    ],
  },
};
