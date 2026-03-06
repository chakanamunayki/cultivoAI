import type { SiteContent } from "../../types";

export const enProjectsContent: Pick<SiteContent, "projectsTitle" | "projectsSubtitle" | "projects"> = {
projectsTitle: "What We've Built",
projectsSubtitle: "Selected projects from our current work",
projects: [
  {
    title: "Chak - Creation of life, with the help of AI",
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
};
