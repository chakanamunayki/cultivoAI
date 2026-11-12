import type { SiteContent } from "../../types";

export const enServicesContent: Pick<
  SiteContent,
  "servicesTitle" | "servicesTagline" | "servicesSubtitle" | "services"
> = {
  servicesTitle: "What I build",
  servicesTagline: "The tech behind good projects, from first idea to proof that it works.",
  servicesSubtitle:
    "No hype. I build practical systems that help good projects work well. Not sure where to start? Fifteen minutes is enough.",
  services: [
    {
      icon: "Monitor",
      title: "Software and platforms",
      eng: "Software and platforms",
      description:
        "Websites, apps and internal tools, built properly and fast. Version one in weeks, then improved with real use.",
      details: [
        "Websites that explain your project clearly and build trust.",
        "Apps and internal tools built around how your team actually works.",
        "Version one in weeks, then improved with real use.",
      ],
      imageUrl: "/landing/photos/services/websites-digital-experiences.webp",
      animationKey: "software-web",
      modal: {
        whatItMeans:
          "I design and build the software your project needs: websites, apps, field tools, client portals and internal tools. I tell you straight what to build now and what can wait.",
        whyItMatters:
          "Most good projects don't have a technical founder in the room. That gap costs months and wrong turns. I've co-founded and built startups, so I can make the technical calls and build with you.",
        whatsIncluded: [
          "Scope and roadmap: what to build now versus later",
          "Websites, apps and internal tools built around your workflows",
          "Technical and stack decisions that hold up as you grow",
          "Launch, basic analytics and a short iteration window after launch",
        ],
        idealFit: [
          "Projects that need real tools, not slides",
          "Founders without a technical partner who need clarity and momentum",
          "Teams that want tools built for their work, not off-the-shelf software that half fits",
        ],
        typicalOutcome:
          "A version one you can ship and learn from, built on sound technical choices, with fewer wrong turns and less wasted budget.",
      },
    },
    {
      icon: "Layers",
      title: "Data, knowledge and AI systems",
      eng: "Data, knowledge and AI systems",
      description:
        "One shared brain for your project: your know-how, your business and market knowledge, your data and your decisions. Protocols protected, field and lab data structured, AI used where it actually helps.",
      details: [
        "One shared brain with access by role: each person sees their part, whoever runs the project sees the whole picture.",
        "Field, lab and sensor data structured into views you can decide from.",
        "Talk to it on WhatsApp or Telegram: ask, log field notes and get the next step.",
      ],
      imageUrl: "/landing/photos/services/ai-assistants.png",
      animationKey: "company-brain",
      modal: {
        whatItMeans:
          "A protected, shared brain built on what your project really knows: protocols and processes, field and lab data, business and market knowledge, history. On top of it, the dashboards, automations and assistants that turn it into daily decisions.",
        whyItMatters:
          "Your know-how is often your most valuable asset, and today it lives in PDFs, in people's heads and in WhatsApp. When someone leaves, it leaves with them. And most people won't open another dashboard, so the brain comes to the chat app they already use. I built exactly this layer for a biotech and vertical farming project, and it keeps getting more useful every day the team uses it.",
        whatsIncluded: [
          "Your protocols, processes, documents and business and market knowledge turned into one structured, versioned brain",
          "Access by role: each person sees the part they need, and whoever runs it sees the full picture across one project or several",
          "Field, lab, sensor and satellite data in one live view",
          "Talk to it on WhatsApp or Telegram, with skills for your own workflows and connections to your other apps and devices",
          "Automations and AI assistants for the repetitive work",
          "Privacy by design: runs on your own infrastructure when it needs to",
        ],
        idealFit: [
          "Teams whose protocols or know-how are the core asset",
          "Projects with data scattered across files, tools and field devices",
          "Teams that want their knowledge to stay when people leave",
        ],
        typicalOutcome:
          "Your know-how is protected and easy to find, your data turns into decisions, and the team stops waiting on the one person who knows.",
      },
    },
    {
      icon: "BarChart3",
      title: "Proof and records",
      eng: "Proof and records",
      description:
        "Funders, buyers and partners want evidence. I build the record that shows what you did and that it worked: impact tracking, MRV for carbon and biochar, restoration and survival data, one auditable history.",
      details: [
        "Impact tracking that funders and partners can trust.",
        "MRV for carbon and biochar, restoration and survival data.",
        "One auditable history of what you did and what it achieved.",
      ],
      imageUrl: "/landing/photos/services/decision-dashboards.jpg",
      animationKey: "dashboards",
      modal: {
        whatItMeans:
          "A system that records what your project does in the field and what it achieves, in a form funders, buyers, certifiers and partners can check.",
        whyItMatters:
          "Good work that can't be proven is hard to fund and hard to sell. Carbon buyers, impact investors and grant makers all ask for evidence. A clean, auditable record turns your work into something they can say yes to.",
        whatsIncluded: [
          "Definition of what to measure and why, matched to who will read it",
          "Field data capture: plots, plantings, survival, soil, photos, GPS",
          "MRV workflows for carbon and biochar",
          "Reports and dashboards for funders, buyers and partners",
          "One auditable history, ready for verification",
        ],
        idealFit: [
          "Restoration, regenerative farming, biochar and carbon projects",
          "Teams reporting to funders, buyers or certifiers",
          "Projects that need to show the land is coming back",
        ],
        typicalOutcome:
          "Evidence you can hand to a funder or buyer with confidence, and far less time spent building reports by hand.",
      },
    },
    {
      icon: "Rocket",
      title: "Startup and investment readiness",
      eng: "Startup and investment readiness",
      description:
        "I've sat in the co-founder seat. I help you shape the model, the numbers and the story so investors and funders can say yes.",
      details: [
        "A business model that holds up to hard questions.",
        "Numbers investors and funders can follow.",
        "A clear story, a deck and the tech plan behind it.",
      ],
      imageUrl: "/landing/photos/services/startup-advisory.png",
      animationKey: "startup",
      modal: {
        whatItMeans:
          "Hands-on help getting your project ready for investors, funders and partners: the model, the numbers, the story and the technical plan that backs it up.",
        whyItMatters:
          "Many good projects stall because the idea is strong but the case for investing isn't. I've co-founded and built startups, so I know the questions investors ask and how to answer them honestly.",
        whatsIncluded: [
          "Business model and revenue logic review",
          "Financial model and key numbers",
          "Pitch story and deck",
          "Technical plan and costed roadmap",
          "Introductions through my network when the fit is right",
        ],
        idealFit: [
          "Founders preparing to raise or apply for funding",
          "Projects with strong impact that need a stronger business case",
          "Teams that want an experienced co-founder view without hiring one",
        ],
        typicalOutcome:
          "A model, numbers and story that hold up in front of investors and funders, and a clear plan for what the money will build.",
      },
    },
  ],
};
