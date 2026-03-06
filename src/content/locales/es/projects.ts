import type { SiteContent } from "../../types";

export const esProjectsContent: Pick<SiteContent, "projectsTitle" | "projectsSubtitle" | "projects"> = {
projectsTitle: "Lo que Hemos Construido",
projectsSubtitle: "Proyectos seleccionados de nuestro trabajo actual",
projects: [
  {
    title: "Chak - Creacion de vida, con ayuda de IA",
    desc: "Sistemas para impulsar trabajo enfocado en salud con claridad, estructura y momentum.",
    fullDesc:
      "Un sistema en evolucion que integra flujos operativos, ejecucion de servicios y visibilidad para decisiones, reduciendo fricción en equipos enfocados en salud.",
    lessons: "Primero se construye para uso real, luego se expande con confianza.",
    status: "Activo",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
    ],
    tags: ["Salud", "Sistemas"],
    modal: {
      whatItMeans:
        "Un sistema operativo practico para un equipo enfocado en salud: flujos claros, handoffs claros y visibilidad clara.",
      whyItMatters:
        "Cuando la entrega es inconsistente, los resultados sufren. Los sistemas crean consistencia sin perder el toque humano.",
      whatsIncluded: [
        "Mapa de flujo para entrega y seguimiento",
        "Dashboard versión uno para visibilidad y decisiones",
        "Base de conocimiento liviana para mantener alineacion",
        "Iteracion basada en uso real (no supuestos)",
      ],
      idealFit: [
        "Equipos de salud y bienestar entregando servicios en crecimiento",
        "Proyectos donde el seguimiento y la confianza importan",
        "Equipos que quieren versión uno simple y luego mejorar",
      ],
      typicalOutcome:
        "Entrega más consistente, menos pasos perdidos y aprendizaje más rapido via iteracion.",
    },
  },
  {
    title: "RaizCapitalColombia.co",
    desc: "Proyectos y propiedades en Colombia combinando datos y creatividad para proponer modelos de negocio realistas.",
    fullDesc:
      "Una plataforma de estrategia e informacion que organiza oportunidades con claridad y ayuda a evaluar decisiones con fundamentos practicos.",
    lessons: "La claridad de framing y la calidad de datos mejoran decisiones.",
    status: "Activo",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1600&auto=format&fit=crop",
    ],
    tags: ["Datos", "Estrategia"],
    modal: {
      whatItMeans:
        "Una capa de estrategia e informacion que hace más facil comparar oportunidades y defender decisiones.",
      whyItMatters:
        "Cuando todo es difuso, el equipo se queda en opiniones. Framing claro + datos limpios mejora la calidad de decision.",
      whatsIncluded: [
        "Estructura de informacion clara (que importa y que no)",
        "Forma consistente de comparar oportunidades",
        "Vistas simples para conversaciones de decision",
        "Un sistema que puede evolucionar a medida que crece el proyecto",
      ],
      idealFit: [
        "Equipos evaluando multiples oportunidades o direcciones",
        "Proyectos que necesitan claridad más que hype",
        "Tomadores de decision que valoran pensamiento estructurado",
      ],
      typicalOutcome:
        "Evaluacion más rapida, tradeoffs más claros y menos discusiones circulares.",
    },
  },
  {
    title: "Proyecto de salud con hongos junto a OpenClaw",
    desc: "Agentes IA especializados para investigacion, contenido, inteligencia de negocio y base de conocimiento viva.",
    fullDesc:
      "Un sistema modular de agentes para investigacion y operacion en salud, con conocimiento estructurado y flujos iterativos de mejora continua.",
    lessons: "La arquitectura de conocimiento acelera todo a largo plazo.",
    status: "En desarrollo",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1600&auto=format&fit=crop",
    ],
    tags: ["Investigacion", "Agentes IA"],
    modal: {
      whatItMeans:
        "Un sistema modular que apoya investigacion y operacion con conocimiento reutilizable y flujos practicos.",
      whyItMatters:
        "Los equipos de investigacion avanzan más rapido cuando el conocimiento esta estructurado y las decisiones se apoyan en un sistema vivo, no en archivos dispersos.",
      whatsIncluded: [
        "Base de conocimiento que crece con el aprendizaje del proyecto",
        "Flujos repetibles para investigacion, escritura y actualizaciones internas",
        "Vistas de soporte a decisiones para prioridades y siguientes acciones",
        "Enfoque modular para que cada parte evolucione por separado",
      ],
      idealFit: [
        "Equipos de salud e investigacion con flujos de informacion complejos",
        "Proyectos donde la documentacion y consistencia son cuello de botella",
        "Equipos que quieren construir un sistema que puedan seguir usando",
      ],
      typicalOutcome:
        "Menos tiempo buscando y reescribiendo, iteraciones más rapidas y entendimiento compartido más claro en el equipo.",
    },
  },
],
};
