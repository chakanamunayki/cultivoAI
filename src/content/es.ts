import { esAbout } from "./locales/es/about";
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
    line1: "Sistemas de IA para escalar trabajo valioso",
    subheadline: "Reduce tareas repetitivas. Ve lo que importa.",
    services: [],
    servicesDone: "",
    audience: [],
    outcomes: ["Menos trabajo manual", "Decisiones más claras", "Mejor seguimiento"],
    audienceLabel: "Hecho para:",
    audienceChips: [
      "Startups de impacto",
      "Retiros wellness",
      "Comunidades off-grid",
      "Hidroponia",
      "Bienestar holistico",
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
    noDramaText: "Alcance claro. Versión uno rápida. Iteración directa.",
    impactSection: {
      text: "Desde Colombia, trabajando para todo el mundo. Colaboración directa. Alcance claro.",
      cta: "Hablemos",
    },
  },

  about: esAbout,

  howWeWork: {
    title: "Como Trabajamos",
    subtitle: "Principios que guian cada proyecto",
    pillars: [
      {
        icon: "RefreshCw",
        title: "Win-Win o No Hay Trato",
        description:
          "Solo tomamos proyectos donde las expectativas son claras y ambas partes ganan. Si no podemos agregar valor real, lo diremos desde el inicio.",
      },
      {
        icon: "Sprout",
        title: "Sistemas Holisticos",
        description:
          "Pensamos de punta a punta. Software, flujos, datos, decisiones, comunicación y diseno deben funcionar juntos, no como piezas sueltas.",
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
    title: "Como Ayudamos",
    subtitle: "Integracion de IA practica para negocios reales",
    intro:
      "No vendemos humo. Construimos sistemas practicos que hacen más facil ejecutar buen trabajo. El objetivo es claridad y momentum, no complejidad.",
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
          "Respuestas más rapidas sin perder cercania",
          "Contenido y conocimiento consistentes",
          "Mejores decisiones con senales reales",
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
    yesTitle: "Lo que SI somos",
    yesItems: [
      "Un equipo senior pequeno que trabaja directo contigo.",
      "Constructores de sistemas que lanzan versión uno rapido y luego mejoran.",
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

  values: {
    title: "Nuestros Valores",
    subtitle: "Lo que nos define",
    values: [
      {
        icon: "Sprout",
        title: "CULTIVAR, NO EXTRAER",
        description:
          "Construimos para el largo plazo. Preferimos relaciones que crecen sobre transacciones rapidas.",
      },
      {
        icon: "Handshake",
        title: "WIN-WIN O NO HAY TRATO",
        description:
          "Solo tomamos proyectos donde ambas partes ganan. Si no podemos agregar valor real, lo decimos.",
      },
      {
        icon: "User",
        title: "SIEMPRE HUMANOS",
        description:
          "La IA es una herramienta, no un reemplazo. Priorizamos la conexion humana en todo lo que hacemos.",
      },
    ],
  },

  mission: {
    title: "Nuestra Mision",
    statement: [
      "Construimos sistemas de IA que ayudan a escalar trabajo valioso.",
      "Una parte de lo que ganamos se reinvierte en proyectos alineados a impacto.",
      "Mientras más construimos, más podemos apoyar.",
    ],
    tagline: "Propon un proyecto de impacto",
  },

  whatHappensNext: {
    title: "Que pasa despues de contactarnos?",
    subtitle: "Asi de simple. Sin sorpresas.",
    steps: [
      {
        number: "1",
        title: "Respondemos rapido",
        description: "Recibes respuesta directa y un siguiente paso claro.",
      },
      {
        number: "2",
        title: "Mapeamos tu flujo y proponemos un plan simple",
        description: "Nos enfocamos en cambios practicos que reducen fricción rapido.",
      },
      {
        number: "3",
        title: "Construimos versión uno e iteramos",
        description: "Luego mejoramos contigo en base a uso real.",
      },
    ],
    cta: "Empecemos la conversacion",
    ctaButton: "Hablemos",
  },

  footer: {
    cta: "Cuentanos que estas construyendo.",
    ctaButton: "Hablemos",
    copyright: "2026 Cultivo AI. Desde Colombia, trabajando para el mundo.",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        label: "LinkedIn",
      },
      {
        platform: "whatsapp",
        url: "https://wa.me/573106172607",
        label: "WhatsApp",
      },
      {
        platform: "instagram",
        url: "#",
        label: "Instagram",
        comingSoon: true,
      },
      {
        platform: "facebook",
        url: "#",
        label: "Facebook",
        comingSoon: true,
      },
    ],
    contactInfo: {
      email: "hola@cultivoai.co",
      whatsapp: "+573106172607",
      whatsappDisplay: "+57 310 617 2607",
      location: "Medellin, Colombia",
      locationSecondary: "Worldwide",
    },
    quickLinks: [
      { label: "Inicio", href: "#hero" },
      { label: "Nosotros", href: "#about" },
      { label: "Servicios", href: "#services" },
      { label: "Alianzas", href: "#partnerships" },
      { label: "Proyectos", href: "#projects" },
      { label: "Proceso", href: "#what-happens-next" },
    ],
    quickLinksTitle: "Navegacion",
    contactTitle: "Contacto",
    socialTitle: "Siguenos",
  },

  chat: {
    title: "Asistente CultivoAI",
    placeholder: "Escribe tu mensaje...",
    sendButton: "Enviar",
    welcomeMessage:
      "Hola! Soy el asistente de CultivoAI. Puedo ayudarte a conocer servicios, mostrar proyectos o conectarte con el equipo. En que te ayudo?",
    contextualGreetings: {
      general:
        "Hola! Soy el asistente de CultivoAI. Puedo ayudarte a conocer servicios, mostrar proyectos o conectarte con el equipo. Que te trae por aqui hoy?",
      booking:
        "Hola! Veo que quieres agendar tiempo con Paul. Me encantaria ayudarte! Primero, como te llamas? Y cuentame un poco sobre lo que te gustaria discutir.",
      story:
        "Hola! Puedes conocer mejor nuestra historia en la seccion Nosotros. Que te gustaria saber? Y por cierto, como te llamas?",
      semilla:
        "Hey! Aqui Rocky (bueno, la versión IA). Me alegra que te interese el Fondo Semilla! Es mi proyecto para ayudar con cosas pequenas mientras aprendo. Como te llamas? Y cuentame que tienes en mente!",
      service:
        "Hola! Veo que te interesa {service}. Excelente eleccion! Como te llamas? Y cuentame sobre tu situacion actual - que problema quieres resolver?",
      partnership:
        "Hola! Te interesa saber más sobre nuestro modelo de {partnership}. Cada proyecto es diferente! Como te llamas? Y cuentame sobre tu proyecto para explorar las mejores opciones.",
      qualification:
        "Hola! Veamos si somos el fit correcto para trabajar juntos. Como te llamas? Y cuentame sobre tu negocio y que estas buscando lograr.",
      impact:
        "Hola! Quiero conocer como podrian ayudarme con un sistema de IA practico y human-first.",
      formFallback: "Prefieres llenar un formulario? Haz clic aqui.",
    },
  },

  contactForm: {
    title: "Hablemos",
    subtitle: "No formularios corporativos. Solo una conversacion.",
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    whatsappLabel: "WhatsApp (opcional)",
    whatsappPlaceholder: "+57 300 123 4567",
    projectTypeLabel: "Que tipo de proyecto tienes en mente?",
    projectTypes: [
      "Optimizacion de flujos",
      "Chatbot / Asistente IA",
      "Dashboard de decision",
      "Sistema de conocimiento y contenido",
      "Software / Sitio web",
      "Asesoria startup",
      "No estoy seguro - necesito orientacion",
      "Otro",
    ],
    descriptionLabel: "Cuentanos brevemente sobre tu proyecto",
    descriptionPlaceholder: "Que problema quieres resolver? Que resultado esperas?",
    submitButton: "Enviar mensaje",
    chatPrompt: "Prefieres chatear? Nuestro asistente IA puede ayudarte!",
  },

  terminal: {
    sectionTitle: "Así trabajamos",
    summary: "Sin caos. Alcance claro. Versión uno rápida. Iteración directa.",
    welcomeLine1: "Último acceso: ",
    welcomeLine2: "Suite de Automatización Cultivo AI v2.5.0",
    script: [
      { text: "Iniciando descubrimiento...", type: "command", delay: 800 },
      { text: "Mapeando tu flujo de trabajo...", type: "info", delay: 600 },
      { text: "Detectando puntos de fricción...", type: "info", delay: 700 },
      { text: "Diseñando una versión uno simple...", type: "ai", delay: 700 },
      { text: "Construyendo el dashboard...", type: "command", delay: 700 },
      { text: "Creando una base de conocimiento viva...", type: "info", delay: 700 },
      { text: "Lanzando y probando...", type: "success", delay: 700 },
      { text: "Midiendo resultados...", type: "event", delay: 700 },
      { text: "Iterando con tu equipo...", type: "success", delay: 2500 },
    ],
  },
};
