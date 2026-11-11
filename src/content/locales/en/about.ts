import type { AboutCopy } from "../../types";

export const enAbout: AboutCopy = {
    title: "Who I am",
    subtitle: "A founder who went back to the land.",
    viewMoreLabel: "View more",
    footerNote: "**For bigger projects I bring in trusted specialists from my network.**",
    teamMembers: [
      {
        id: "paul",
        name: "Paul Ronayne",
        title: "Founder. Startup builder. Hands in the soil.",
        description:
          "20+ years building companies. I co-founded NBN23, a sports-data platform with FIBA in 70+ countries, and Nagi, aquatic-safety tech used in schools and pools. Today I live in Colombia and build tech for projects that care for land, people and communities.",
        imageUrl: "/landing/photos/team/paul.jpg",
        accentColor: "bg-primary",
        shadowColor: "bg-black",
        linkedinUrl: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        bio: {
          headline:
            "Startup co-founder turned hands-on builder for projects that care for land, people and communities.",
          sections: [
            {
              title: "Where I come from",
              content:
                "Twenty years co-founding and building companies: NBN23 (sports data, FIBA partner, 70+ countries) and Nagi (aquatic-safety and performance tech, featured on national Spanish TV, used in schools and pools).",
            },
            {
              title: "What I do now",
              content:
                "I live in Colombia and build the tech behind good projects: software, data and knowledge systems, impact records, and the business case for investors. I built the full platform for a biotech and vertical farming project end to end, solo.",
            },
            {
              title: "How I work",
              content:
                "I design it, build it and show up in the field. No account managers, no juniors. Version one fast, then better with real use.",
            },
            {
              title: "Who I work with",
              content:
                "Good people with good projects in regeneration, self-sufficient communities, holistic health and nature and agritech, across Latin America and worldwide.",
            },
            {
              title: "Beyond the build",
              content:
                "Through Semillero I connect innovators with projects that need them, so good people and good innovations grow together.",
            },
          ],
          linkedinUrl: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        },
      },
      {
        id: "rocky",
        name: "Rocky Ronayne",
        title: "Young builder. AI tools. Semilla.",
        description:
          "The next generation. Rocky builds with AI tools alongside Paul: demo apps, websites and video. He's learning how an idea becomes a real business, one real project at a time. He also runs Semilla, his own fund for good projects.",
        imageUrl: "/landing/photos/team/rocky.jpeg",
        accentColor: "bg-primary",
        shadowColor: "bg-black",
        // No pop-up: the card already says everything there is to say.
      },
      {
        id: "marta",
        name: "Marta Ronayne",
        title: "Holistic practitioner. Founder of Munayki.",
        description:
          "Holistic practitioner and founder of Munayki, from munay, the Quechua word for love. Marta works with Reiki, meditation and natural products she makes by hand, bringing ancestral wisdom and simple science together. She leads the work in holistic and ancestral medicine for wellness.",
        imageUrl: "/landing/photos/team/marta.jpg",
        accentColor: "bg-primary",
        shadowColor: "bg-black",
        bio: {
          headline: "Holistic practitioner and founder of Munayki.",
          sections: [
            {
              title: "Munayki",
              content:
                "Munayki comes from munay, the Quechua word for love. It's where I share Reiki, meditation and the natural products I make by hand.",
            },
            {
              title: "What I lead",
              content:
                "I lead the work in natural products and holistic and ancestral medicine for wellness, so projects in this world are guided by someone who lives it.",
            },
          ],
        },
      },
    ],
  };
