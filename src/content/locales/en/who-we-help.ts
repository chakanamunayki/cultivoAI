import type { SiteContent } from "../../types";

export const enWhoWeHelpContent: Pick<SiteContent, "whoWeHelp"> = {
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
        description: "Health and wellness teams carry a lot. We build systems that handle the admin, communication, and follow-up so your team can focus on the work that actually matters.",
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
        description: "Sustainability work is coordination-heavy. We build the systems that keep your team aligned, your partners informed, and your reporting clear.",
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
        description: "Education programs live or die by consistency. We build the ops and communication systems that keep learners supported and instructors focused on teaching.",
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
        description: "Early-stage teams move fastest with a clear scope and honest tradeoffs. We help you build version one right: tight, usable, and ready to learn from.",
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
};
