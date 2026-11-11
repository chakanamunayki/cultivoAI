import type { SiteContent } from "../../types";

export const esWhoWeHelpContent: Pick<SiteContent, "whoWeHelp"> = {
  whoWeHelp: {
    title: "Con quién trabajo",
    subtitle:
      "Buena gente con buenos proyectos y buenas intenciones. Cuatro mundos que conozco bien:",
    // Las listas de encaje no están en la copia v1; los arrays vacíos ocultan ese bloque.
    idealTitle: "",
    idealItems: [],
    notIdealTitle: "",
    notIdealItems: [],
    sectorsTitle: "", // el subtítulo ya presenta los cuatro mundos
    sectors: [
      {
        name: "Tierra y regeneración",
        description:
          "Restauración, agricultura regenerativa, biochar y carbono, cierre de minas. Proyectos que tienen que demostrar que la tierra se está recuperando.",
        icon: "Sprout",
        imageUrl: "/landing/photos/sectors/sustainability-regenerative.jpg",
        chatButtonLabel: "Hablemos",
      },
      {
        name: "Comunidades autosuficientes",
        description:
          "Aldeas fuera de la red, ecocomunidades y cooperativas rurales que producen su propia comida, energía y agua. Ayudo con los sistemas que las mantienen funcionando y creciendo.",
        icon: "Home",
        chatButtonLabel: "Hablemos",
      },
      {
        name: "Salud holística y productos naturales, con Munayki",
        description:
          "Innovación alrededor de productos naturales y medicina holística y ancestral para el bienestar. Este camino lo lidera Marta a través de Munayki, de munay, la palabra quechua para el amor.",
        icon: "Heart",
        imageUrl: "/landing/photos/sectors/health-wellness.jpg",
        badge: "Munayki",
        chatButtonLabel: "Hablemos",
      },
      {
        name: "Innovadores en naturaleza y agritech",
        description:
          "Biotecnología, agricultura vertical y en ambiente controlado, sensores, herramientas de campo. Fundadores con ciencia sólida que necesitan la capa de tecnología y datos bien construida.",
        icon: "Sprout",
        imageUrl: "/landing/photos/sectors/sustainability-regenerative.webp",
        chatButtonLabel: "Hablemos",
      },
    ],
    cta: "¿No sabes si encajas? Cuéntame qué estás construyendo.",
    ctaButton: "Cuéntame tu proyecto",
  },
};
