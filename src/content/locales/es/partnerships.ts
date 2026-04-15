import type { SiteContent } from "../../types";

export const esPartnershipsContent: Pick<
  SiteContent,
  "partnershipsTitle" | "partnershipsSubtitle" | "partnerships"
> = {
  partnershipsTitle: "Formas Flexibles de Trabajar",
  partnershipsSubtitle:
    "No todos los proyectos valiosos vienen con gran presupuesto. Si el impacto es real, podemos empezar lean y crecer desde ahí.",
  partnerships: [
    {
      name: "Proyecto Estándar",
      tagline: "Negocios con presupuesto",
      description:
        "Alcance claro y entregables definidos. Precio fijo acordado antes de empezar. Cronograma establecido. Soporte incluido post-entrega.",
      idealFor: ["Empresas que saben lo que necesitan", "Recursos para invertir"],
      icon: "Briefcase",
      imageUrl: "/landing/photos/partnerships/standard-project.jpg",
      modal: {
        whatItMeans:
          "Una construcción con alcance claro, entregables definidos y responsabilidades claras.",
        whyItMatters:
          "Si necesitas previsibilidad, este modelo mantiene decisiones rápidas y entrega alineada a un objetivo claro.",
        whatsIncluded: [
          "Descubrimiento corto para definir alcance y criterios de éxito",
          "Plan de entrega con hitos y ownership claro",
          "Construcción, pruebas y lanzamiento de lo acordado",
          "Documentación básica y handoff",
          "Ventana pequeña post-lanzamiento para ajustes y fixes",
        ],
        idealFit: [
          "Equipos que ya saben lo que necesitan (o pueden decidir rápido)",
          "Proyectos donde claridad y velocidad importan",
          "Organizaciones listas para invertir en buena entrega",
        ],
        typicalOutcome:
          "Un sistema lanzado con alcance claro, handoff claro y base para iterar con responsabilidad.",
      },
    },
    {
      name: "Tarifas de impacto",
      tagline: "Equipos con misión",
      description:
        "Mismo nivel de calidad. Precio reducido significativamente. Condiciones flexibles. A cambio: testimonial, caso de estudio, o referidos.",
      idealFor: ["Startups pre-revenue", "Proyectos con misión social"],
      icon: "HeartHandshake",
      imageUrl: "/landing/photos/partnerships/impact-friendly.jpg",
      modal: {
        whatItMeans:
          "Tarifas reducidas para equipos con misión cuando el impacto es real y las expectativas están claras.",
        whyItMatters:
          "Mucho trabajo de alto impacto empieza lean. Este modelo permite construir sistemas útiles sin estirar al equipo más de lo saludable.",
        whatsIncluded: [
          "Mismo nivel de calidad, con alcance más lean",
          "Prioridades claras: versión uno primero, luego mejorar",
          "Colaboración flexible para restricciones reales",
          "Acuerdo de intercambio justo (testimonial, caso de estudio, referidos)",
          "Plan para crecer el sistema a medida que haya momentum",
        ],
        idealFit: [
          "Equipos alineados a misión con presupuesto ajustado",
          "Proyectos donde resultados importan más que polish el día uno",
          "Equipos dispuestos a colaborar de cerca e iterar",
        ],
        typicalOutcome:
          "Una versión uno enfocada que crea momentum, con un camino claro para expandir cuando haya recursos.",
      },
    },
    {
      name: "Opciones de alianza",
      tagline: "Solo si hay fit real",
      description:
        "Para proyectos seleccionados con alto potencial de impacto y alineación clara, podemos definir términos de alianza personalizados.",
      idealFor: ["Startups de impacto", "Colaboraciones alineadas de largo plazo"],
      icon: "PieChart",
      imageUrl: "/landing/photos/partnerships/partnership-options.jpg",
      modal: {
        whatItMeans:
          "Un modelo de colaboración personalizado para casos donde la alineación es fuerte y los incentivos deben permanecer conectados en el tiempo.",
        whyItMatters:
          "Cuando un proyecto tiene impacto real y potencial real, los modelos rígidos pueden frenar. Términos flexibles mantienen la relación win-win.",
        whatsIncluded: [
          "Chequeo honesto de alineación (impacto, ejecución, expectativas)",
          "Plan por fases con entregables claros en cada etapa",
          "Términos que mantienen incentivos alineados mientras evoluciona",
          "Puntos de revisión regulares para ajustar alcance y prioridades",
          "Enfoque en utilidad a largo plazo, no en optics a corto plazo",
        ],
        idealFit: [
          "Startups de impacto con potencial fuerte y foco claro",
          "Equipos buscando colaboración de largo plazo, no solo un proyecto",
          "Situaciones donde la flexibilidad crea mejores resultados",
        ],
        typicalOutcome:
          "Una alianza que lanza por fases, mantiene honestidad sobre tradeoffs, y construye un sistema útil con el tiempo.",
      },
    },
  ],
};
