import type { SiteContent } from "../../types";

export const enPartnershipsContent: Pick<
  SiteContent,
  "partnershipsTitle" | "partnershipsSubtitle" | "partnerships"
> = {
  partnershipsTitle: "Flexible Ways to Work Together",
  partnershipsSubtitle:
    "Clear scope, senior delivery, priced properly. One impact-rate slot for mission-led teams when it's the right fit.",
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
};
