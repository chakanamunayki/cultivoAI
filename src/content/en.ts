import { enAbout } from "./locales/en/about";
import { enPartnershipsContent } from "./locales/en/partnerships";
import { enProjectsContent } from "./locales/en/projects";
import { enSemillaContent } from "./locales/en/semilla";
import { enServicesContent } from "./locales/en/services";
import { enStoriesContent } from "./locales/en/stories";
import { enUseCasesContent } from "./locales/en/use-cases";
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

  ...enUseCasesContent,

  ...enWhoWeHelpContent,

  ...enSemillaContent,

  ...enPartnershipsContent,

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
