import type { SiteContent } from "../../types";

export const enClosingSectionsContent: Pick<
  SiteContent,
  "values" | "mission" | "whatHappensNext" | "footer" | "chat" | "contactForm" | "terminal"
> = {
  values: {
    title: "Our Values",
    subtitle: "What doesn't change regardless of the project",
    values: [
      {
        icon: "Sprout",
        title: "CULTIVATE, NOT EXTRACT",
        description:
          "We build for the long term. We prefer relationships that grow over quick transactions. If there's nothing left to improve a year from now, something went wrong.",
      },
      {
        icon: "Scale",
        title: "HONESTY BEFORE SALES",
        description:
          "If we're not the right fit, we say so. If there's a simpler, cheaper solution, we propose it. We don't build what you don't need.",
      },
      {
        icon: "Hammer",
        title: "THE PROCESS IS THE PRODUCT",
        description:
          "A useful system requires real discovery, early versions that fail, and honest decisions. The two-week magic solution doesn't exist. But you can build a solid version one and improve from there.",
      },
    ],
  },

  mission: {
    title: "Why We Exist",
    statement: [
      "We build for teams doing real social and environmental work: agritech, biotech, restoration, the science that actually moves the needle.",
      "The hard part is protecting the IP and turning lab and field data into decisions. That is what we build, properly, for people building something that matters.",
      "The better we build, the further the impact reaches.",
    ],
    tagline: "We are not neutral about what we build",
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
        title: "If there is a fit, we do a 15-minute project chat",
        description: "We map the real bottleneck and propose the smallest useful next step.",
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
    cta: "Tell us what you're actually trying to build.",
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
      "Hi! I'm the CultivoAI assistant. How can I help you today?",
    contextualGreetings: {
      general:
        "Hi! I'm the CultivoAI assistant. How can I help you today?",
      booking:
        "Great. We can set up a 15-minute call with Paul. Tell me a bit about what you're working on and I'll get it ready.",
      story:
        "Paul is a technical founder who has shipped products to 70+ countries and built CHAK Brain solo. Small senior team, direct work, no handoffs. What would you like to know?",
      service:
        "Nice, you're looking at {service}. Happy to walk you through it. What would you like to know?",
      partnership:
        "Glad you're curious about partnering with CultivoAI. Tell me a bit about what you have in mind and I'll take it from there.",
      qualification:
        "Happy to see if there's a fit. Tell me a little about what you're building.",
      impact:
        "Love that you're drawn to purpose-first work. Tell me what you're building and I'll help however I can.",
      formFallback: "Prefer a quick call with Paul? Share your details.",
    },
  },

  contactForm: {
    title: "Book a 15-minute project chat",
    subtitle: "Share the basics and we will come prepared.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    whatsappLabel: "WhatsApp (optional)",
    whatsappPlaceholder: "+1 555 123 4567",
    projectTypeLabel: "What type of project do you have in mind?",
    projectTypes: [
      "Company Brain / protected knowledge layer",
      "Agritech data platform",
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
    submitButton: "Request 15-minute chat",
    chatPrompt: "Prefer to start in chat first? Use the assistant.",
  },

  terminal: {
    sectionTitle: "How we work",
    summary: "No chaos. Clear scope. Fast version one. Direct iteration.",
    welcomeLine1: "Last login: ",
    welcomeLine2: "Cultivo AI Automation Suite v2.5.0",
    script: [
      { text: "Starting discovery...", type: "command", delay: 800 },
      { text: "Mapping your protocols...", type: "info", delay: 600 },
      { text: "Isolating the IP layer...", type: "info", delay: 700 },
      { text: "Designing role-gated access...", type: "ai", delay: 700 },
      { text: "Structuring lab and field data...", type: "command", delay: 700 },
      { text: "Building the knowledge layer...", type: "info", delay: 700 },
      { text: "Shipping and testing...", type: "success", delay: 700 },
      { text: "Measuring results...", type: "event", delay: 700 },
      { text: "Iterating with your team...", type: "success", delay: 2500 },
    ],
  },
};
