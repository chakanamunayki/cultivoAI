import type { SiteContent } from "../../types";

export const enPartnershipsContent: Pick<
  SiteContent,
  "partnershipsTitle" | "partnershipsSubtitle" | "partnerships" | "partnershipsExtras"
> = {
  partnershipsTitle: "Ways to work together",
  partnershipsSubtitle:
    "It starts with a conversation. Then three simple steps, each with a clear scope and a price agreed with you before any work begins.",
  partnershipsExtras: {
    missionLine:
      "Mission-led project or a Semillero innovation? Terms can flex when the fit is right.",
    missionCta: "Tell me about it",
  },
  partnerships: [
    {
      name: "Discovery Sprint",
      tagline: "1 · Start here",
      description:
        "First, a free conversation about your goal. If a sprint fits, I spend two to four weeks with your team mapping what you have, what's missing and what to build first. You leave with a costed plan that is yours to keep.",
      terms: "Fixed price, agreed with you after that first conversation.",
      idealFor: ["Projects with real IP, land or data to protect", "Anyone unsure what to build first"],
      icon: "Hourglass",
      modal: {
        whatItMeans:
          "I start with a free call to understand your objective. If a sprint fits, it is a short, senior engagement to map your architecture, protect your IP, and scope the build, before anyone writes production code.",
        whyItMatters:
          "Most projects go wrong at a fuzzy start. The call costs you nothing and tells us both whether there is a fit. The sprint then gives you a costed, defensible plan and a clear first build, with no open-ended commitment.",
        whatsIncluded: [
          "A free intro call to understand your objective and size the sprint",
          "Architecture gap map: what you have, what's missing, what to build",
          "IP-isolation design: how to protect protocols and scope access by role",
          "MVP scope: the smallest useful first build",
          "Costed build plan: phases, timeline, and price",
        ],
        idealFit: [
          "Projects with real IP, land or data to protect",
          "Founders who want a plan before a big build commitment",
          "Teams that need real numbers to green-light budget",
        ],
        typicalOutcome:
          "You leave with one document: a clear, costed plan you can act on, build with me or take to anyone.",
      },
    },
    {
      name: "Build",
      tagline: "2 · Version one",
      description:
        "I build version one from the plan: software and platforms, data and AI systems, or the record that proves your impact. Then it gets better with real use.",
      terms: "Fixed price, agreed with you before I start.",
      idealFor: ["Teams with a plan or a clear spec"],
      icon: "Briefcase",
      imageUrl: "/landing/photos/partnerships/standard-project.jpg",
      modal: {
        whatItMeans:
          "Version one of what the sprint planned, with a clear scope, a timeline and a fixed price agreed with you before I start.",
        whyItMatters:
          "You know what you are getting, when, and what it costs. No open-ended bill and no surprises halfway through.",
        whatsIncluded: [
          "Built from the plan agreed in the sprint",
          "Milestones you can see and test as I go",
          "Build, testing and launch of the agreed scope",
          "Documentation and a proper handover",
          "A short window after launch to fix and tune",
        ],
        idealFit: [
          "Teams that have finished a sprint, or already have a clear spec",
          "Projects where a working version one matters most",
          "Organisations ready to invest in doing it properly",
        ],
        typicalOutcome:
          "A working version one in your hands, documented and ready to grow.",
      },
    },
    {
      name: "Ongoing support",
      tagline: "3 · Keep it growing",
      description:
        "Once it is live, I keep it running and improving month by month. For bigger projects, I can stay on as your hands-on tech partner.",
      terms: "Monthly, agreed with you. 30 days' notice either side.",
      idealFor: ["Teams with a live system they rely on"],
      icon: "TrendingUp",
      imageUrl: "/landing/photos/partnerships/partnership-options.jpg",
      modal: {
        whatItMeans:
          "A monthly arrangement to keep your system running, fix what breaks and add what your team needs next.",
        whyItMatters:
          "Systems that nobody looks after stop being used. A small monthly plan keeps yours useful as your work and your team change.",
        whatsIncluded: [
          "Monitoring and fixes",
          "Updates as your protocols, data or team change",
          "A regular review of what is working and what is not",
          "Small improvements each month, agreed in advance",
          "For bigger projects: me as your hands-on tech partner",
        ],
        idealFit: [
          "Teams with a live system they rely on",
          "Projects that keep growing after version one",
          "Founders who want a technical partner without a full-time hire",
        ],
        typicalOutcome:
          "A system that keeps up with your work, and one person who knows it inside out.",
      },
    },
  ],
};
