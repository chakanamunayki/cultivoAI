import type { SiteContent } from "../../types";

export const enSemillaContent: Pick<SiteContent, "semilla"> = {
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
};
