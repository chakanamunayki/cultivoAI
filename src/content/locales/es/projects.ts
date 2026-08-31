import type { SiteContent } from "../../types";

export const esProjectsContent: Pick<SiteContent, "projectsTitle" | "projectsSubtitle" | "projects"> = {
projectsTitle: "Lo que Hemos Construido",
projectsSubtitle: "Proyectos seleccionados de nuestro trabajo actual",
projects: [
  {
    title: "Company Brain: La IP de los Protocolos, Protegida en la Ejecución",
    desc: "Construimos el software de una plataforma de producción agri-biotech en Colombia: un constructor de protocolos donde los científicos crean y gestionan cada receta, y un Company Brain que guía paso a paso a quien lo ejecuta, sin exponer nunca el protocolo completo. La IP se queda en el sistema, no en el teléfono de alguien.",
    fullDesc:
      "La plataforma convierte un objetivo biológico en un proceso de producción vegetal controlado, medible y reproducible, y construimos el software que lo hace funcionar de punta a punta. Primero, el constructor de protocolos: los científicos y líderes de laboratorio crean, versionan y gestionan el protocolo completo en un solo lugar, cada paso, parámetro y secuencia. Esa biblioteca de protocolos es la IP. Segundo, el Company Brain: cuando llega el momento de ejecutar un protocolo, el Brain guía a quien hace el trabajo paso a paso, qué hacer ahora, los parámetros, la frecuencia, la asepsia, y captura sus observaciones contra ese paso. El operador ejecuta sin tener nunca la receta completa. El acceso es por rol: el técnico de laboratorio es guiado por los pasos, el equipo comercial ve clientes, el director ve todo. Creación y ejecución son un solo loop, y el protocolo completo y los datos acumulados se quedan en el sistema, no en las manos del operador.",
    lessons: "Quien ejecuta un protocolo no necesita el protocolo completo. Necesita el paso actual. Creación y ejecución son un solo loop, y la receta completa, la IP real, nunca tiene que salir del sistema.",
    status: "Activo",
    image: "",
    animationKey: "company-brain",
    tags: ["Company Brain", "Constructor de protocolos", "Agri-biotech"],
    modal: {
      whatItMeans:
        "Una plataforma de dos partes sobre una operación agri-biotech real. Un constructor de protocolos donde los científicos crean, versionan y gestionan la biblioteca completa de recetas, y un Company Brain que guía paso a paso a quienes ejecutan y trae de vuelta sus observaciones. Todo limitado a cada rol, y el protocolo completo nunca sale del sistema.",
      whyItMatters:
        "En la producción basada en ciencia, el protocolo es la IP. Si entregas la receta completa a todos los que la ejecutan, se filtra entre roles y se va por la puerta. El Company Brain guía la ejecución paso a paso, así el operador recibe exactamente lo que necesita para hacer el trabajo y nunca el protocolo completo. La IP se queda estructurada, con acceso por rol y en manos de la empresa.",
      whatsIncluded: [
        "Constructor y gestor de protocolos donde los científicos y líderes de laboratorio crean, versionan y actualizan la biblioteca completa de protocolos: pasos, parámetros, secuencia",
        "Guía de ejecución paso a paso: el operador ve el paso actual, sus parámetros y frecuencia, nada más",
        "Observaciones capturadas contra cada paso a medida que se hace el trabajo",
        "Acceso por rol, para que el protocolo completo y los datos se queden protegidos en el sistema",
      ],
      idealFit: [
        "Laboratorios y equipos agri-biotech cuya IP de protocolos es el activo central",
        "Operaciones que necesitan que el personal de campo o laboratorio ejecute protocolos con precisión sin entregar la receta completa",
        "Equipos que necesitan que el know-how y los datos se queden en la empresa cuando cambian las personas",
      ],
      typicalOutcome:
        "Los protocolos se ejecutan con consistencia en el terreno, las observaciones regresan estructuradas, y la receta completa, la IP real, se queda dentro de la empresa en lugar del teléfono de alguien.",
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
    url: "https://holisticsoul.vercel.app/",
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
