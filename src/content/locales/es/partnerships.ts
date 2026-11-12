import type { SiteContent } from "../../types";

export const esPartnershipsContent: Pick<
  SiteContent,
  "partnershipsTitle" | "partnershipsSubtitle" | "partnerships" | "partnershipsExtras"
> = {
  partnershipsTitle: "Formas de trabajar juntos",
  partnershipsSubtitle:
    "Empieza con una conversación. Luego, tres pasos simples, cada uno con un alcance claro y un precio acordado contigo antes de empezar.",
  partnershipsExtras: {
    termsLabel: "Precio",
    missionLine:
      "¿Un proyecto con propósito o una innovación para Semillero? Los términos pueden ajustarse cuando el encaje es bueno.",
    missionCta: "Cuéntamelo",
    closingCta: "Empecemos con una conversación",
  },
  partnerships: [
    {
      name: "Sprint de descubrimiento",
      tagline: "1 · Empieza aquí",
      description:
        "Primero, una conversación gratis sobre tu objetivo. Si un sprint encaja, paso de dos a cuatro semanas con tu equipo mapeando lo que tienes, lo que falta y qué construir primero. Te llevas un plan costeado que es tuyo.",
      terms: "Precio fijo, acordado contigo después de esa primera conversación.",
      idealFor: ["Proyectos con IP, tierra o datos que proteger", "Cualquiera que no sepa qué construir primero"],
      icon: "Hourglass",
      imageUrl: "/landing/photos/services/startup-advisory.png",
      modal: {
        whatItMeans:
          "Empiezo con una llamada gratis para entender tu objetivo. Si un sprint encaja, es un trabajo corto y senior para mapear tu arquitectura, proteger tu IP y definir el alcance del desarrollo, antes de que nadie escriba código de producción.",
        whyItMatters:
          "La mayoría de los proyectos se tuercen por un inicio difuso. La llamada no te cuesta nada y nos dice a ambos si hay encaje. El sprint luego te da un plan costeado y defendible y un primer desarrollo claro, sin compromiso abierto.",
        whatsIncluded: [
          "Una llamada inicial gratis para entender tu objetivo y dimensionar el sprint",
          "Mapa de brechas de arquitectura: qué tienes, qué falta, qué construir",
          "Diseño de aislamiento de IP: cómo proteger protocolos y limitar el acceso por rol",
          "Alcance del MVP: el primer desarrollo útil más pequeño",
          "Plan de construcción costeado: fases, tiempos y precio",
        ],
        idealFit: [
          "Proyectos con IP, tierra o datos que proteger",
          "Fundadores que quieren un plan antes de un gran compromiso de desarrollo",
          "Equipos que necesitan números reales para aprobar el presupuesto",
        ],
        typicalOutcome:
          "Te vas con un documento: un plan claro y costeado sobre el que puedes actuar, conmigo o con quien quieras.",
      },
    },
    {
      name: "Construcción",
      tagline: "2 · La primera versión",
      description:
        "Construyo la primera versión a partir del plan: software y plataformas, sistemas de datos e IA, o el registro que demuestra tu impacto. Luego mejora con el uso real.",
      terms: "Precio fijo, acordado contigo antes de empezar.",
      idealFor: ["Equipos con un plan o una especificación clara"],
      icon: "Briefcase",
      imageUrl: "/landing/photos/partnerships/standard-project.jpg",
      modal: {
        whatItMeans:
          "La primera versión de lo que se planeó en el sprint, con alcance claro, cronograma y un precio fijo acordado contigo antes de empezar.",
        whyItMatters:
          "Sabes qué recibes, cuándo y cuánto cuesta. Sin facturas abiertas ni sorpresas a mitad de camino.",
        whatsIncluded: [
          "Construido a partir del plan acordado en el sprint",
          "Avances que puedes ver y probar mientras construyo",
          "Construcción, pruebas y lanzamiento del alcance acordado",
          "Documentación y una entrega bien hecha",
          "Un periodo corto después del lanzamiento para corregir y ajustar",
        ],
        idealFit: [
          "Equipos que terminaron un sprint o ya tienen una especificación clara",
          "Proyectos donde lo que más importa es tener una primera versión funcionando",
          "Organizaciones listas para invertir en hacerlo bien",
        ],
        typicalOutcome:
          "Una primera versión funcionando en tus manos, documentada y lista para crecer.",
      },
    },
    {
      name: "Acompañamiento",
      tagline: "3 · Que siga creciendo",
      description:
        "Cuando ya está en marcha, lo mantengo funcionando y mejorando mes a mes. En proyectos más grandes, puedo seguir como tu socio tecnológico, con las manos en el trabajo.",
      terms: "Mensual, acordado contigo. Con 30 días de aviso para ambas partes.",
      idealFor: ["Equipos con un sistema en uso del que dependen"],
      icon: "TrendingUp",
      imageUrl: "/landing/photos/partnerships/partnership-options.jpg",
      modal: {
        whatItMeans:
          "Un acuerdo mensual para mantener tu sistema funcionando, arreglar lo que falle y sumar lo que tu equipo necesite.",
        whyItMatters:
          "Los sistemas que nadie cuida se dejan de usar. Un plan mensual pequeño mantiene el tuyo útil mientras cambian tu trabajo y tu equipo.",
        whatsIncluded: [
          "Monitoreo y correcciones",
          "Actualizaciones cuando cambian tus protocolos, tus datos o tu equipo",
          "Una revisión periódica de lo que funciona y lo que no",
          "Pequeñas mejoras cada mes, acordadas con antelación",
          "En proyectos grandes: yo como tu socio tecnológico, con las manos en el trabajo",
        ],
        idealFit: [
          "Equipos con un sistema en uso del que dependen",
          "Proyectos que siguen creciendo después de la primera versión",
          "Fundadores que quieren un socio técnico sin contratar a alguien a tiempo completo",
        ],
        typicalOutcome:
          "Un sistema que sigue el ritmo de tu trabajo, y una persona que lo conoce a fondo.",
      },
    },
  ],
};
