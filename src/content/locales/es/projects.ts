import type { SiteContent } from "../../types";

export const esProjectsContent: Pick<SiteContent, "projectsTitle" | "projectsSubtitle" | "projects"> = {
projectsTitle: "Lo que Hemos Construido",
projectsSubtitle: "Proyectos seleccionados de nuestro trabajo actual",
projects: [
  {
    title: "Chak: De SaaS a Cerebro",
    desc: "V1: plataforma SaaS completa con constructor de protocolos, gestión de proyectos e IOT. V2: Chak Brain, un sistema conversacional con RAG que cubre todo el equipo.",
    fullDesc:
      "Chak trabaja con vida. Protocolos de laboratorio, cultivos, proyectos con impacto real en salud y naturaleza. Chak v1 fue una plataforma operativa completa: constructor de protocolos, gestión de proyectos e integración IOT construida junto a la Universidad de Envigado. Chak v2 es Chak Brain: un sistema conversacional con RAG que cubre todo el equipo, desde operaciones y protocolos hasta comercial y prospectos. La evolución de SaaS complejo a cerebro conversacional es el aprendizaje real.",
    lessons: "Agregar funciones resuelve el problema equivocado. La pregunta correcta: ¿puede el equipo acceder a lo que sabe la empresa en una sola conversación?",
    status: "Activo",
    image: "/landing/photos/project-screenshots/Screenshot_chak-foodtech.com.jpeg",
    images: [
      "/landing/photos/project-screenshots/Screenshot_chak-foodtech.com.jpeg",
    ],
    url: "https://chak-foodtech.com",
    tags: ["IA", "RAG", "SaaS"],
    modal: {
      whatItMeans:
        "Dos capítulos, un aprendizaje clave: cuando dejamos de agregar funciones y empezamos a construir un cerebro, todo se simplificó.",
      whyItMatters:
        "Chak v1 demostró que los sistemas complejos tienen un techo. Chak Brain demostró que un equipo puede acceder a todo lo que sabe su empresa con una sola conversación. Ese es el salto real.",
      whatsIncluded: [
        "V1: constructor de protocolos, gestión de proyectos e IOT con Universidad de Envigado",
        "V2: sistema conversacional con RAG para operaciones, protocolos, comercial y prospectos",
        "Agentes de fondo que optimizan el conocimiento y aprenden con el uso",
        "Acceso conversacional a toda la base de conocimiento del equipo",
      ],
      idealFit: [
        "Equipos con procesos documentados que nadie puede consultar rápido",
        "Negocios cansados de buscar en archivos dispersos",
        "Organizaciones que quieren IA que aprende con ellos, no una herramienta estática",
      ],
      typicalOutcome:
        "El equipo deja de buscar, deja de preguntar y empieza a actuar con lo que ya sabe la empresa.",
    },
  },
  {
    title: "RaizCapitalColombia.co",
    desc: "Proyectos y propiedades en Colombia combinando datos y creatividad para proponer modelos de negocio realistas.",
    fullDesc:
      "Una plataforma de estrategia e información que organiza oportunidades con claridad y ayuda a evaluar decisiones con fundamentos prácticos.",
    lessons: "La claridad de framing y la calidad de datos mejoran decisiones.",
    status: "Activo",
    image: "/landing/photos/project-screenshots/Screenshot_www.raizcapital.co.jpeg",
    images: [
      "/landing/photos/project-screenshots/Screenshot_www.raizcapital.co.jpeg",
    ],
    url: "https://www.raizcapital.co/",
    tags: ["Datos", "Estrategia"],
    modal: {
      whatItMeans:
        "Una capa de estrategia e información que hace más fácil comparar oportunidades y defender decisiones.",
      whyItMatters:
        "Cuando todo es difuso, el equipo se queda en opiniones. Framing claro + datos limpios mejora la calidad de decisión.",
      whatsIncluded: [
        "Estructura de información clara (qué importa y qué no)",
        "Forma consistente de comparar oportunidades",
        "Vistas simples para conversaciones de decisión",
        "Un sistema que puede evolucionar a medida que crece el proyecto",
      ],
      idealFit: [
        "Equipos evaluando múltiples oportunidades o direcciones",
        "Proyectos que necesitan claridad más que hype",
        "Tomadores de decisión que valoran pensamiento estructurado",
      ],
      typicalOutcome:
        "Evaluación más rápida, tradeoffs más claros y menos discusiones circulares.",
    },
  },
  {
    title: "SetaSouls. Sitio web de marca holística",
    desc: "98 en rendimiento. 100 en SEO. 100 en buenas prácticas. Diseño, velocidad y posicionamiento construidos juntos desde el inicio.",
    fullDesc:
      "Un sitio de marca wellness construido y optimizado sobre Vercel. Cada decisión de arquitectura, rendimiento e imagen fue parte del diseño desde el primer día, no un parche al final. El resultado: 98 en rendimiento, 96 en accesibilidad, 100 en buenas prácticas y 100 en SEO técnico.",
    lessons: "Lighthouse no es el objetivo. Es la prueba de que las decisiones correctas se tomaron desde el principio.",
    status: "En desarrollo",
    image: "/landing/photos/project-screenshots/Screenshot_SetaSouls.app.jpeg",
    images: [
      "/landing/photos/project-screenshots/Screenshot_SetaSouls.app.jpeg",
    ],
    url: "https://setasouls.app",
    tags: ["Web", "Vercel"],
    stats: [
      { label: "Rendimiento", value: "98" },
      { label: "SEO", value: "100" },
      { label: "Buenas Prácticas", value: "100" },
      { label: "Accesibilidad", value: "96" },
    ],
    modal: {
      whatItMeans:
        "Un sitio moderno, rápido y posicionado que representa la marca con claridad y confianza.",
      whyItMatters:
        "98 en rendimiento, 100 en SEO, 100 en buenas prácticas. No es suerte. Es el resultado de construir con criterio desde el inicio.",
      whatsIncluded: [
        "Arquitectura de rendimiento: 98/100 en Lighthouse",
        "SEO técnico completo: 100/100, con estructura, metadatos y schema",
        "Accesibilidad: 96/100",
        "Diseño de marca y experiencia de usuario",
        "Desplegado y optimizado sobre Vercel",
      ],
      idealFit: [
        "Marcas que necesitan presencia digital de nivel premium",
        "Proyectos donde performance y diseño son igual de importantes",
        "Equipos que quieren resultados reales, no solo promesas",
      ],
      typicalOutcome:
        "Un sitio que carga en fracciones de segundo, aparece en búsquedas y se siente bien construido.",
    },
  },
],
};
