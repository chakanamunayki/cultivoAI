import type { SiteContent } from "../../types";

export const enClosingSectionsContent: Pick<
  SiteContent,
  "values" | "whatHappensNext" | "footer" | "chat" | "contactForm"
> = {
  values: {
    title: "How we work",
    subtitle: "What doesn't change, whatever the project.",
    values: [
      {
        icon: "HeartHandshake",
        title: "AYNI",
        description:
          "An Andean word for reciprocity. I help you, you help me, and the whole community gets stronger. Every deal I take has to be good for everyone in it.",
      },
      {
        icon: "Sprout",
        title: "CULTIVATE, NOT EXTRACT",
        description:
          "Long relationships over quick transactions. Good for the land, good for the people on it.",
      },
      {
        icon: "Scale",
        title: "HONESTY BEFORE SALES",
        description:
          "If I'm not the right fit, I'll tell you. If there's a simpler, cheaper way, I'll propose it.",
      },
      {
        icon: "Hammer",
        title: "HANDS IN THE DIRT",
        description:
          "I don't hand you to juniors. I design it, build it, and show up in the field. Version one fast, then better with real use.",
      },
    ],
    closing: "I'm not neutral about what I build.",
  },

  whatHappensNext: {
    title: "What happens after you get in touch?",
    subtitle: "Simple. No surprises.",
    steps: [
      {
        number: "1",
        title: "We reply quickly",
        description: "A direct answer and a clear next step.",
      },
      {
        number: "2",
        title: "If there's a fit, we have a 15-minute chat",
        description: "We find the real bottleneck and the smallest useful next step.",
      },
      {
        number: "3",
        title: "If you need a plan, we run a Discovery Sprint",
        description: "As long as it needs, and a costed plan that is yours to keep.",
      },
      {
        number: "4",
        title: "We build version one and improve it together",
        description: "",
      },
    ],
    cta: "Let's start the conversation",
    ctaButton: "Let's talk",
  },

  footer: {
    cta: "What are you building?",
    ctaButton: "Let's talk",
    copyright:
      "Cultivo Labs. Tech for projects that care for land, people and communities. Colombia, working worldwide.",
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
    ],
    contactInfo: {
      whatsapp: "+573106172607",
      whatsappDisplay: "+57 310 617 2607",
      location: "Medellín, Colombia",
      locationSecondary: "Worldwide",
    },
    quickLinks: [
      { label: "Home", href: "#hero" },
      { label: "What we build", href: "#services" },
      { label: "Who we work with", href: "#who-we-help" },
      { label: "Semillero", href: "#semillero" },
      { label: "Projects", href: "#projects" },
      { label: "Who we are", href: "#about" },
      { label: "How to start", href: "#partnerships" },
    ],
    quickLinksTitle: "Navigation",
    contactTitle: "Contact",
    socialTitle: "Follow",
  },

  chat: {
    title: "Cultivo Labs Assistant",
    placeholder: "Type your message...",
    sendButton: "Send",
    welcomeMessage:
      "Hi! I'm the Cultivo Labs assistant. Tell me what you're building and I'll help however I can.",
    contextualGreetings: {
      general:
        "Hi! I'm the Cultivo Labs assistant. Tell me what you're building and I'll help however I can.",
      booking:
        "Great. We can set up a 15-minute call with Paul. Tell me a bit about what you're working on and I'll get it ready.",
      story:
        "Paul is a startup co-founder who has shipped products to 70+ countries and built the full platform for a biotech and vertical farming project, solo. You work directly with us, no handoffs. What would you like to know?",
      service:
        "Nice, you're looking at {service}. Happy to walk you through it. What would you like to know?",
      partnership:
        "Glad you're curious about working together. Tell me a bit about what you have in mind, a project or an innovation, and I'll take it from there.",
      partnershipNamed:
        "Nice, you're looking at the {partnership} step. Tell me a bit about what you have in mind and I'll explain how it works.",
      project:
        "Nice, you were looking at our work on {project}. What are you building? Tell us and we'll see if something similar fits.",
      qualification:
        "Happy to see if there's a fit. Tell me a little about what you're building.",
      qualificationSector:
        "Nice, you're looking at {sector}. Tell me a little about what you're building and we'll see if there's a fit.",
      impact:
        "Love that you're drawn to purpose-first work. Tell me what you're building and I'll help however I can.",
      formFallback: "Prefer a quick call with Paul? Share your details.",
    },
  },

  contactForm: {
    title: "Book a 15-minute project chat",
    subtitle: "Share the basics and I'll come prepared.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    whatsappLabel: "WhatsApp (optional)",
    whatsappPlaceholder: "+1 555 123 4567",
    projectTypeLabel: "What kind of project do you have in mind?",
    projectTypes: [
      "Software or platform",
      "Data, knowledge or AI system",
      "Proof, impact tracking or MRV",
      "Startup or investment readiness",
      "Semillero: I have a project",
      "Semillero: I have an innovation",
      "Not sure, I need guidance",
      "Other",
    ],
    descriptionLabel: "Tell me briefly about your project",
    descriptionPlaceholder: "What are you building? What would a good outcome look like?",
    submitButton: "Request 15-minute chat",
    chatPrompt: "Prefer to start in chat first? Use the assistant.",
  },

};
