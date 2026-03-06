import { enAbout } from "./locales/en/about";
import { enProjectsContent } from "./locales/en/projects";
import { enServicesContent } from "./locales/en/services";
import { enStoriesContent } from "./locales/en/stories";
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

  ...enServicesContent,

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

  ...enWhoWeHelpContent,

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

  ...enProjectsContent,

  ...enStoriesContent,

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
        url: "https://wa.me/573106172607",
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
      whatsapp: "+573106172607",
      whatsappDisplay: "+57 310 617 2607",
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
