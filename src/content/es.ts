import { esAbout } from "./locales/es/about";
import { esProjectsContent } from "./locales/es/projects";
import { esServicesContent } from "./locales/es/services";
import { esStoriesContent } from "./locales/es/stories";
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

  demosTitle: "IA en Accion",
  demosSubtitle: "Mira ejemplos de asistentes, dashboards y sistemas de trabajo en accion.",
  useCases: [
    {
      id: "chat",
      title: "Chatbot Inteligente",
      description: "Atencion al cliente automatica 24/7. Responde, califica y agenda.",
      scenario: "Un cliente pregunta sobre precios de chatbots",
      steps: [
        { action: "Cliente: Hola, que precio tienen los chatbots?", result: "" },
        { action: "IA: Analizando contexto...", result: "" },
        {
          action: "",
          result:
            "Bot: Buena pregunta. El precio depende del alcance. Cuentame que necesitas y te indico el mejor siguiente paso.",
        },
        { action: "Cliente: Si, por favor.", result: "" },
        { action: "", result: "Enviando demo interactiva..." },
      ],
    },
    {
      id: "lead",
      title: "Filtrado de Leads",
      description: "Califica prospectos automaticamente antes de que hables con ellos.",
      scenario: "Nuevo lead llega desde LinkedIn",
      steps: [
        { action: "Nuevo Lead: Juan Perez (LinkedIn)", result: "" },
        { action: "IA: Enriqueciendo perfil...", result: "" },
        { action: "", result: "{ Role: CEO, Size: 50-100, Loc: Bog }" },
        { action: "", result: "Score: 92/100. Alta probabilidad." },
        { action: "", result: "Movido a columna 'Prioridad Alta'" },
      ],
    },
    {
      id: "web",
      title: "Constructor Web",
      description: "Genera estructuras web y copy optimizado en segundos.",
      scenario: "Generando landing page para cafeteria",
      steps: [
        { action: "Usuario: Landing para cafeteria moderna", result: "" },
        { action: "IA: Generando componentes React...", result: "" },
        { action: "", result: '<Hero title="Cafe de Origen" />' },
        { action: "", result: '<Features list={["Tostion Media", "Organico"]} />' },
        { action: "", result: "Sitio desplegado en Vercel" },
      ],
    },
    {
      id: "dash",
      title: "Business Dashboard",
      description: "Convierte datos crudos en graficos de decision en tiempo real.",
      scenario: "Sincronizando Stripe y Shopify",
      steps: [
        { action: "Sync Stripe & Shopify", result: "" },
        { action: "IA: Detectando anomalias...", result: "" },
        { action: "", result: "Ventas Hoy: $2,450 (+15%)" },
        { action: "", result: "Actualizando widget de ingresos" },
        { action: "", result: "Insight: El producto B esta trending." },
      ],
    },
    {
      id: "social",
      title: "Social Media Flow",
      description: "Multiplica tu contenido. De una idea a todas las redes.",
      scenario: "Creando contenido sobre IA en Pymes",
      steps: [
        { action: "Usuario: Post sobre 'IA en Pymes'", result: "" },
        { action: "IA: Adaptando a formatos...", result: "" },
        { action: "", result: "Instagram: Carrusel 5 slides" },
        { action: "", result: "Twitter: Hilo de 3 tweets" },
        { action: "", result: "LinkedIn: Articulo profesional" },
      ],
    },
    {
      id: "project19",
      title: "Project19 Coach",
      description: "Coach personal de IA via WhatsApp. Briefing matutino y check-in nocturno.",
      scenario: "Un dia con el coach de Rocky",
      steps: [
        { action: "7:00 AM - Buenos dias Rocky!", result: "" },
        { action: "", result: "Que tienes planeado para hoy? Escuela, futbol, algo más?" },
        { action: "Rocky: Escuela hasta las 3, despues entrenamiento de futbol", result: "" },
        { action: "", result: "Guardado en Notion. Te escribo a las 8pm!" },
        { action: "8:00 PM - Como te fue hoy?", result: "" },
        { action: "Rocky: [Nota de voz 30s]", result: "" },
        { action: "", result: "Transcrito y guardado. Buen dia! Descansa." },
      ],
    },
  ],

  ...esWhoWeHelpContent,

  semilla: {
    title: "Fondo Semilla",
    subtitle: "El Viaje de Rocky",
    about:
      "Tengo 14 años. Cumplo 15 en enero. Todavia no se exactamente que quiero hacer con mi vida, y creo que esta bien no saberlo todavia. Pero si se algunas cosas: Me gusta construir. Mi papa me esta ensenando a hacer cosas con IA - chatbots, automatizaciones, cosas asi. A veces el me ensena. A veces yo le enseno a el.",
    tiers: [
      {
        name: "Semilla ($10-50)",
        description: "Actualizaciones de progreso, nombre en supporters",
      },
      { name: "Brote ($50-200)", description: "Acceso temprano a herramientas, input en features" },
      {
        name: "Crecer ($200-500)",
        description: "Acceso gratuito de por vida a lo que Rocky construya",
      },
      { name: "Socio ($500+)", description: "Adaptacion personalizada, involucracion directa" },
    ],
    services: [
      "Chatbots basicos para WhatsApp o web",
      "Automatizaciones simples (conectar apps, enviar notificaciones)",
      "Ayuda con Notion y organizacion",
      "Talleres de desarrollo de chatbots",
    ],
    goal: "Para cuando tenga 19 años quiero tener opciones. Quizas jugar futbol semi-profesional. Quizas tener mi propio negocio. Quizas ambos. El punto es poder elegir.",
    ctaTitle: "Propon un Proyecto",
    ctaDescription: "Tienes algo pequeno que necesitas? Cuentame.",
    ctaButton: "Proponer Proyecto",
  },

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
