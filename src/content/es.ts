import { esAbout } from "./locales/es/about";
import { esClosingSectionsContent } from "./locales/es/closing-sections";
import { esPartnershipsContent } from "./locales/es/partnerships";
import { esProjectsContent } from "./locales/es/projects";
import { esSemillaContent } from "./locales/es/semilla";
import { esServicesContent } from "./locales/es/services";
import { esStoriesContent } from "./locales/es/stories";
import { esUseCasesContent } from "./locales/es/use-cases";
import { esWhoWeHelpContent } from "./locales/es/who-we-help";
import type { SiteContent } from "./types";

export const es: SiteContent = {
  nav: [
    { label: "Nosotros", href: "#about" },
    { label: "Servicios", href: "#services" },
    { label: "Alianzas", href: "#partnerships" },
    { label: "Proyectos", href: "#projects" },
    { label: "Proceso", href: "#what-happens-next" },
  ],

  marquee: [
    "IA human-first",
    "Dashboards",
    "Asistentes útiles",
    "Operación de retiros",
    "Sistemas de conocimiento vivos",
    "Automatización",
    "Datos privados",
    "Offline",
    "Colaboración directa",
    "Respuesta en 24h",
  ],

  hero: {
    tagline: "PARA BUENOS PROYECTOS",
    line1: "Sistemas de IA para hacer crecer el trabajo que importa",
    subheadline: "IA práctica para proyectos que cuidan, regeneran y sanan.",
    services: [],
    servicesDone: "",
    audience: [],
    outcomes: ["Menos trabajo manual", "Decisiones más claras", "Mejor seguimiento"],
    audienceLabel: "Hecho para:",
    audienceChips: [
      "Startups de impacto",
      "Retiros wellness",
      "Comunidades off-grid",
      "Hidroponía",
      "Bienestar holístico",
      "Proyectos regenerativos",
    ],
    tertiaryCta: "Ver servicios",
    microcopy:
      "Datos privados. Configuración offline cuando haga falta. Plantillas compartidas para reducir costos.",
    terminalLabel: "Así trabajamos:",
    line3: "",
    cta: "Hablemos",
    secondaryCta: "Ver proyectos",
    noDrama: "Sin caos.",
    noDramaText: "Alcance claro. Primera versión rápida. Iteración directa.",
    impactSection: {
      text: "Desde Colombia, trabajando para todo el mundo. Colaboración directa. Alcance claro.",
      cta: "Hablemos",
    },
  },

  about: esAbout,

  howWeWork: {
    title: "Cómo Trabajamos",
    subtitle: "Principios que guían cada proyecto",
    pillars: [
      {
        icon: "RefreshCw",
        title: "Win-Win o No Hay Trato",
        description:
          "Solo tomamos proyectos donde las expectativas son claras y ambas partes ganan. Si no podemos agregar valor real, lo diremos desde el inicio.",
      },
      {
        icon: "Sprout",
        title: "Sistemas Holísticos",
        description:
          "Pensamos de punta a punta. Software, flujos, datos, decisiones, comunicación y diseño deben funcionar juntos, no como piezas sueltas.",
      },
      {
        icon: "Users",
        title: "Siempre humanos",
        description:
          "La IA es una herramienta que usamos para el bien. Construimos cuidando tono, confianza y a las personas del otro lado de la pantalla.",
        isFullWidth: true,
      },
    ],
  },

  whatWeDo: {
    title: "Cómo Ayudamos",
    subtitle: "Integración de IA práctica para negocios reales",
    intro:
      "No vendemos humo. Construimos sistemas prácticos que hacen más fácil ejecutar buen trabajo. El objetivo es claridad y momentum, no complejidad.",
    columns: [
      {
        title: "OPTIMIZAR",
        items: [
          "Reducir trabajo repetitivo",
          "Crear una sola fuente de verdad",
          "Mejorar handoffs y seguimiento",
          "Automatizar reportes",
        ],
      },
      {
        title: "EXPANDIR",
        items: [
          "Respuestas más rápidas sin perder cercanía",
          "Contenido y conocimiento consistentes",
          "Mejores decisiones con señales reales",
          "Nuevas formas de apoyar usuarios y clientes",
        ],
      },
    ],
    servicesPreview: {
      title: "Nuestros servicios incluyen:",
      linkText: "Ver todos los servicios",
    },
  },

  whyUs: {
    notTitle: "Lo que NO somos",
    notItems: [
      "Una agencia grande con handoffs y entrega junior.",
      "Consultores guiados por hype vendiendo una tendencia.",
      "Un equipo que te hace sentir confundido a propósito.",
    ],
    yesTitle: "Lo que SÍ somos",
    yesItems: [
      "Un equipo senior pequeño que trabaja directo contigo.",
      "Constructores de sistemas que lanzan versión uno rápido y luego mejoran.",
      "Builders human-first que cuidan tono, confianza y resultados.",
      "Desde Colombia, trabajando para el mundo.",
    ],
  },

  ...esServicesContent,

  ...esUseCasesContent,

  ...esWhoWeHelpContent,

  ...esSemillaContent,

  ...esPartnershipsContent,

  ...esProjectsContent,

  ...esStoriesContent,

  ...esClosingSectionsContent,
};
