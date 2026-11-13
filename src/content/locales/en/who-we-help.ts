import type { SiteContent } from "../../types";

export const enWhoWeHelpContent: Pick<SiteContent, "whoWeHelp"> = {
  whoWeHelp: {
    title: "Who I work with",
    subtitle: "Good people with good projects and good intentions. Four worlds I know well:",
    // Fit lists are not in the v1 copy; empty arrays hide that block.
    idealTitle: "",
    idealItems: [],
    notIdealTitle: "",
    notIdealItems: [],
    sectorsTitle: "", // the subtitle already introduces the four worlds
    sectors: [
      {
        name: "Land and regeneration",
        description:
          "Restoration, regenerative farming, biochar and carbon, mine closure. Projects that have to prove the land is coming back.",
        icon: "Sprout",
        imageUrl: "/landing/photos/sectors/sustainability-regenerative.jpg",
        chatButtonLabel: "Let's talk",
      },
      {
        name: "Self-sufficient communities",
        description:
          "Off-grid villages, eco-communities and rural cooperatives building their own food, energy and water. I help with the systems that keep them running and growing.",
        icon: "Home",
        imageUrl: "/landing/photos/sectors/communities.jpg",
        chatButtonLabel: "Let's talk",
      },
      {
        name: "Holistic health and natural products, with Munayki",
        description:
          "Innovation around natural products and holistic and ancestral medicine for wellness. This lane is led by Marta through Munayki, the power of love (munay is Quechua for love, ki is Japanese for power).",
        icon: "Heart",
        imageUrl: "/landing/photos/sectors/munayki-logo-dark.jpg",
        badge: "Munayki",
        chatButtonLabel: "Let's talk",
      },
      {
        name: "Nature and agritech innovators",
        description:
          "Biotech, vertical and controlled-environment farming, sensors, field tools. Founders with strong science who need the tech and data layer built right.",
        icon: "Sprout",
        imageUrl: "/landing/photos/sectors/sustainability-regenerative.webp",
        chatButtonLabel: "Let's talk",
      },
    ],
    cta: "Not sure you fit? Tell me what you're building.",
    ctaButton: "Tell me about your project",
  },
};
