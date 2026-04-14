import type { SiteContent } from "../../types";

export const esProjectsContent: Pick<SiteContent, "projectsTitle" | "projectsSubtitle" | "projects"> = {
projectsTitle: "Lo que Hemos Construido",
projectsSubtitle: "Proyectos seleccionados de nuestro trabajo actual",
projects: [
  {
    title: "Chak: De SaaS a Cerebro",
    desc: "V1: plataforma SaaS completa con constructor de protocolos, gestion de proyectos e IOT. V2: Chak Brain, un sistema conversacional con RAG que cubre todo el equipo.",
    fullDesc:
      "Chak trabaja con vida. Protocolos de laboratorio, cultivos, proyectos con impacto real en salud y naturaleza. Chak v1 fue una plataforma operativa completa: constructor de protocolos, gestion de proyectos e integracion IOT construida junto a la Universidad de Envigado. Chak v2 es Chak Brain: un sistema conversacional con RAG que cubre todo el equipo, desde operaciones y protocolos hasta comercial y prospectos. La evolucion de SaaS complejo a cerebro conversacional es el aprendizaje real.",
    lessons: "Agregar funciones resuelve el problema equivocado. La pregunta correcta: puede el equipo acceder a lo que sabe la empresa en una sola conversacion?",
    status: "Activo",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
    ],
    tags: ["IA", "RAG", "SaaS"],
    modal: {
      whatItMeans:
        "Dos capitulos, un aprendizaje clave: cuando dejamos de agregar funciones y empezamos a construir un cerebro, todo se simplifico.",
      whyItMatters:
        "Chak v1 demostro que los sistemas complejos tienen un techo. Chak Brain demostro que un equipo puede acceder a todo lo que sabe su empresa con una sola conversacion. Ese es el salto real.",
      whatsIncluded: [
        "V1: constructor de protocolos, gestion de proyectos e IOT con Universidad de Envigado",
        "V2: sistema conversacional con RAG para operaciones, protocolos, comercial y prospectos",
        "Agentes de fondo que optimizan el conocimiento y aprenden con el uso",
        "Acceso conversacional a toda la base de conocimiento del equipo",
      ],
      idealFit: [
        "Equipos con procesos documentados que nadie puede consultar rapido",
        "Negocios cansados de buscar en archivos dispersos",
        "Organizaciones que quieren IA que aprende con ellos, no una herramienta estatica",
      ],
      typicalOutcome:
        "El equipo deja de buscar, deja de preguntar y empieza a actuar con lo que ya sabe la empresa.",
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
    url: "https://www.raizcapital.co/",
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
    title: "SetaSouls. Sitio web de marca holistica",
    desc: "98 en rendimiento. 100 en SEO. 100 en buenas practicas. Diseno, velocidad y posicionamiento construidos juntos desde el inicio.",
    fullDesc:
      "Un sitio de marca wellness construido y optimizado sobre Vercel. Cada decision de arquitectura, rendimiento e imagen fue parte del diseno desde el primer dia, no un parche al final. El resultado: 98 en rendimiento, 96 en accesibilidad, 100 en buenas practicas y 100 en SEO tecnico.",
    lessons: "Lighthouse no es el objetivo. Es la prueba de que las decisiones correctas se tomaron desde el principio.",
    status: "En desarrollo",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1600",
    ],
    tags: ["Web", "Vercel"],
    stats: [
      { label: "Rendimiento", value: "98" },
      { label: "SEO", value: "100" },
      { label: "Buenas Practicas", value: "100" },
      { label: "Accesibilidad", value: "96" },
    ],
    modal: {
      whatItMeans:
        "Un sitio moderno, rapido y posicionado que representa la marca con claridad y confianza.",
      whyItMatters:
        "98 en rendimiento, 100 en SEO, 100 en buenas practicas. No es suerte. Es el resultado de construir con criterio desde el inicio.",
      whatsIncluded: [
        "Arquitectura de rendimiento: 98/100 en Lighthouse",
        "SEO tecnico completo: 100/100, con estructura, metadatos y schema",
        "Accesibilidad: 96/100",
        "Diseno de marca y experiencia de usuario",
        "Desplegado y optimizado sobre Vercel",
      ],
      idealFit: [
        "Marcas que necesitan presencia digital de nivel premium",
        "Proyectos donde performance y diseno son igual de importantes",
        "Equipos que quieren resultados reales, no solo promesas",
      ],
      typicalOutcome:
        "Un sitio que carga en fracciones de segundo, aparece en busquedas y se siente bien construido.",
    },
  },
],
};
