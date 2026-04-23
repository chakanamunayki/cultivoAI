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
      "The most useful AI rarely reaches the people who need it most.",
      "We build to change that: accessible pricing, mission-driven projects, and a portion of what we earn reinvested into teams that can't pay us yet.",
      "The better we build, the further we can reach.",
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
      "Hi. I am the CultivoAI assistant. Tell me what you are trying to build and where you are stuck. If there is a fit, we can set up a 15-minute project chat with Paul.",
    contextualGreetings: {
      general:
        "Hi. Tell me what you are trying to build and where the bottleneck is right now. We can map the next step together.",
      booking:
        "Perfect. We can set up a 15-minute project chat with Paul. Before that, what are you trying to build and what is the main blocker?",
      story:
        "We are a small family team in Colombia. Direct work, no handoffs, practical systems. What part do you want to understand better: our process, projects, or fit?",
      service:
        "You are looking at {service}. Good place to start. What is the real bottleneck, and what outcome do you need in the next few weeks?",
      partnership:
        "Partnership models depend on scope and timing. What are you building, and what is stopping progress right now?",
      qualification:
        "Let's test fit quickly. What are you building, what timeline matters, and who is involved in the decision?",
      impact:
        "You clicked on purpose-first work. Good fit if you are building something real and need practical execution. What are you trying to build?",
      formFallback: "Prefer a 15-minute project chat? Share your details.",
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
