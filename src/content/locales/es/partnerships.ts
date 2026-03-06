import type { SiteContent } from "../../types";

export const esPartnershipsContent: Pick<
  SiteContent,
  "partnershipsTitle" | "partnershipsSubtitle" | "partnerships"
> = {
  partnershipsTitle: "Formas Flexibles de Trabajar",
  partnershipsSubtitle:
    "No todos los proyectos valiosos vienen con gran presupuesto. Si el impacto es real, podemos empezar lean y crecer desde ahi.",
  partnerships: [
    {
      name: "Proyecto Estandar",
      tagline: "Negocios con presupuesto",
      description:
        "Alcance claro y entregables definidos. Precio fijo acordado antes de empezar. Cronograma establecido. Soporte incluido post-entrega.",
      idealFor: ["Empresas que saben lo que necesitan", "Recursos para invertir"],
      icon: "Briefcase",
      imageUrl: "/landing/photos/partnerships/standard-project.jpg",
      modal: {
        whatItMeans:
          "Una construccion con alcance claro, entregables definidos y responsabilidades claras.",
        whyItMatters:
          "Si necesitas previsibilidad, este modelo mantiene decisiones rapidas y entrega alineada a un objetivo claro.",
        whatsIncluded: [
          "descubrimiento corto para definir alcance y criterios de exito",
          "Plan de entrega con hitos y ownership claro",
          "Construccion, pruebas y lanzamiento de lo acordado",
          "Documentacion basica y handoff",
          "Ventana pequena post-lanzamiento para ajustes y fixes",
        ],
        idealFit: [
          "Equipos que ya saben lo que necesitan (o pueden decidir rapido)",
          "Proyectos donde claridad y velocidad importan",
          "Organizaciones listas para invertir en buena entrega",
        ],
        typicalOutcome:
          "Un sistema lanzado con alcance claro, handoff claro y base para iterar con responsabilidad.",
      },
    },
    {
      name: "Tarifas de impacto",
      tagline: "Equipos con mision",
      description:
        "Mismo nivel de calidad. Precio reducido significativamente. Condiciones flexibles. A cambio: testimonial, caso de estudio, o referidos.",
      idealFor: ["Startups pre-revenue", "Proyectos con mision social"],
      icon: "HeartHandshake",
      imageUrl: "/landing/photos/partnerships/impact-friendly.jpg",
      modal: {
        whatItMeans:
          "Tarifas reducidas para equipos con mision cuando el impacto es real y las expectativas estan claras.",
        whyItMatters:
          "Mucho trabajo de alto impacto empieza lean. Este modelo permite construir sistemas utiles sin estirar al equipo más de lo saludable.",
        whatsIncluded: [
          "Mismo nivel de calidad, con alcance más lean",
          "Prioridades claras: versión uno primero, luego mejorar",
          "Colaboracion flexible para restricciones reales",
          "Acuerdo de intercambio justo (testimonial, caso de estudio, referidos)",
          "Plan para crecer el sistema a medida que haya momentum",
        ],
        idealFit: [
          "Equipos alineados a mision con presupuesto ajustado",
          "Proyectos donde resultados importan más que polish el dia uno",
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
        "Para proyectos seleccionados con alto potencial de impacto y alineacion clara, podemos definir terminos de alianza personalizados.",
      idealFor: ["Startups de impacto", "Colaboraciones alineadas de largo plazo"],
      icon: "PieChart",
      imageUrl: "/landing/photos/partnerships/partnership-options.jpg",
      modal: {
        whatItMeans:
          "Un modelo de colaboracion personalizado para casos donde la alineacion es fuerte y los incentivos deben permanecer conectados en el tiempo.",
        whyItMatters:
          "Cuando un proyecto tiene impacto real y potencial real, los modelos rigidos pueden frenar. Terminos flexibles mantienen la relacion win-win.",
        whatsIncluded: [
          "Chequeo honesto de alineacion (impacto, ejecucion, expectativas)",
          "Plan por fases con entregables claros en cada etapa",
          "Terminos que mantienen incentivos alineados mientras evoluciona",
          "Puntos de revision regulares para ajustar alcance y prioridades",
          "Enfoque en utilidad a largo plazo, no en optics a corto plazo",
        ],
        idealFit: [
          "Startups de impacto con potencial fuerte y foco claro",
          "Equipos buscando colaboracion de largo plazo, no solo un proyecto",
          "Situaciones donde la flexibilidad crea mejores resultados",
        ],
        typicalOutcome:
          "Una alianza que lanza por fases, mantiene honestidad sobre tradeoffs, y construye un sistema util con el tiempo.",
      },
    },
  ],
};
