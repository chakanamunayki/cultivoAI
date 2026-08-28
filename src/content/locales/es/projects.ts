import type { SiteContent } from "../../types";

export const esProjectsContent: Pick<SiteContent, "projectsTitle" | "projectsSubtitle" | "projects"> = {
projectsTitle: "Lo que Hemos Construido",
projectsSubtitle: "Proyectos seleccionados de nuestro trabajo actual",
projects: [
  {
    title: "CHAK FoodTech: De SaaS a Cerebro Protegido",
    desc: "Construimos CHAK Brain, la capa de conocimiento de una plataforma de producción agri-biotech. Acceso por rol a protocolos científicos y datos de experimentos, aislado de la capa de ejecución para que la IP se quede en la empresa.",
    fullDesc:
      "CHAK FoodTech convierte un objetivo biológico en un proceso de producción vegetal controlado, medible y reproducible. Nosotros construimos la capa digital. V1 fue la plataforma de ejecución: constructor de protocolos, gestión de proyectos e IoT, construida junto a la Universidad de Envigado. V2 es CHAK Brain, la capa de conocimiento sobre los documentos reales de la operación: protocolos, observaciones de laboratorio, experimentos, comercial. El acceso es por rol, el técnico de laboratorio ve protocolos, el equipo comercial ve clientes, el director ve todo. La capa de conocimiento está aislada de la capa de ejecución, así la infraestructura, el proveedor, incluso el cultivo pueden cambiar, pero los protocolos, los datos y el know-how acumulado se quedan protegidos dentro de la empresa.",
    lessons: "La infraestructura ejecuta. Los protocolos, los datos de experimentos y el know-how acumulado son el activo real, y le pertenecen a la empresa, no a quien opera el hardware.",
    status: "Activo",
    image: "/landing/photos/project-screenshots/Screenshot_chak-foodtech.com.jpeg",
    images: [
      "/landing/photos/project-screenshots/Screenshot_chak-foodtech.com.jpeg",
    ],
    url: "https://chak-foodtech.com",
    tags: ["Agri-biotech", "RAG", "IP de Protocolos"],
    modal: {
      whatItMeans:
        "Una capa de conocimiento protegida sobre una operación agri-biotech real: protocolos, observaciones, experimentos y datos comerciales, consultables en lenguaje natural y limitados a cada rol.",
      whyItMatters:
        "En la producción basada en ciencia, la IP de los protocolos es la ventaja. Atrapada en PDFs, WhatsApp y la cabeza de las personas, se filtra entre roles y se va por la puerta. CHAK Brain la mantiene estructurada, con acceso por rol y en manos de la empresa.",
      whatsIncluded: [
        "V1 plataforma de ejecución: constructor de protocolos, gestión de proyectos e IoT, con Universidad de Envigado",
        "V2 CHAK Brain: capa de conocimiento sobre protocolos, observaciones, experimentos y comercial",
        "Acceso por rol: cada rol llega a su dominio, nada más",
        "Capa de conocimiento aislada de la capa de ejecución, para que la IP se quede en la empresa",
      ],
      idealFit: [
        "Laboratorios y equipos agri-biotech cuya IP de protocolos es el activo central",
        "Operaciones donde cada rol necesita contexto científico y comercial distinto",
        "Equipos que necesitan que su know-how se quede cuando cambian personas o proveedores",
      ],
      typicalOutcome:
        "La IP de los protocolos queda protegida, estructurada y consultable. El equipo actúa con lo que la operación ya sabe, y el know-how se queda cuando las personas se van.",
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
