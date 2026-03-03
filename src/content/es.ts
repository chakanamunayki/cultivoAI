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
    subheadline:
      "Automatizamos lo repetitivo.\nMostramos lo que importa en dashboards.\nConvertimos tu conocimiento en un sistema reutilizable.",
    services: [],
    servicesDone: "",
    audience: [],
    outcomes: ["Menos trabajo manual", "Decisiones más claras", "Mejor seguimiento"],
    audienceLabel: "Hecho para:",
    audienceChips: [
      "Retiros wellness",
      "Comunidades off-grid",
      "Proyectos de autosuficiencia",
      "Hidroponía",
      "Bienestar holístico",
      "Proyectos regenerativos",
      "Startups de impacto",
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

  about: {
    title: "Quienes Somos",
    subtitle: "Una familia construyendo algo significativo desde Colombia",
    viewMoreLabel: "Ver más",
    footerNote:
      "**Para proyectos de mayor impacto, contamos con expertos técnicos que nos apoyan cuando es necesario.**",
    teamMembers: [
      {
        id: "paul",
        name: "Paul Ronayne",
        title: "Desarrollador y consultor de IA",
        subtitle: "Cofundador de nbn23.com y nagi.es en Espana",
        description:
          "Llevo mas de 20 anos en tecnologia, incluyendo la cofundacion de dos negocios tech/data en Espana: nbn23.com y nagi.es. Hoy uno disciplina startup con IA human-first para ayudar a negocios holisticos a crecer con claridad y cuidado.",
        imageUrl: "/landing/photos/team/paul.jpg",
        accentColor: "bg-primary",
        shadowColor: "bg-black",
        linkedinUrl: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        bio: {
          headline:
            "Integro experiencia startup y de datos con IA aterrizada y human-first para negocios holisticos",
          sections: [
            {
              title: "Que significa",
              content:
                "Empiezo escuchando a fondo como trabaja tu equipo y como se siente tu cliente, y desde ahi diseno sistemas de IA que cuidan operacion y conexion humana.",
            },
            {
              title: "Por que importa",
              content:
                "Muchos equipos wellness y holisticos cargan demasiado. La IA correcta trae calma, consistencia y capacidad para servir mejor sin agotarse.",
            },
            {
              title: "Que incluye",
              content:
                "Estrategia aplicada, roadmap de IA, diseno de flujos y asistentes, y acompanamiento real de delivery. Definimos alcance juntos, lanzamos por fases y medimos impacto de negocio.",
            },
            {
              title: "Ideal para",
              content:
                "Fundadores y equipos pequenos en bienestar, holistico e impacto que quieren alma y estructura: cuidado humano con ejecucion tipo startup.",
            },
            {
              title: "Resultado tipico",
              content:
                "Operacion mas tranquila, decisiones mas claras, crecimiento mas sano y mas tiempo para el trabajo humano de mayor valor con clientes y comunidad.",
            },
          ],
          linkedinUrl: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        },
      },
      {
        id: "rocky",
        name: "Rocky Ronayne",
        title: "Especialista en sistemas IA",
        description:
          "Rocky construye flujos, asistentes y dashboards de IA que ayudan a los equipos a avanzar más rapido y con consistencia. Practico, con criterio de diseno y enfoque en resultados.",
        imageUrl: "/landing/photos/team/rocky.jpg",
        accentColor: "bg-primary",
        shadowColor: "bg-black",
        bio: {
          headline: "Sistemas de IA practicos enfocados en resultados reales",
          sections: [
            {
              title: "Que significa",
              content:
                "Construyo flujos, asistentes y dashboards de IA que ayudan a equipos a mantener consistencia y reducir trabajo repetitivo.",
            },
            {
              title: "Por que importa",
              content:
                "Un sistema solo sirve si la gente lo usa. Me enfoco en claridad, confiabilidad y en que el siguiente paso sea obvio.",
            },
            {
              title: "Que incluye",
              content:
                "versión uno simple, construida y probada de punta a punta. Notas de handoff claras e iteracion segun lo que aprendamos del uso real.",
            },
            {
              title: "Ideal para",
              content:
                "Equipos que quieren ayuda practica con IA sin complejidad, y que cuidan experiencia de usuario y tono.",
            },
            {
              title: "Resultado tipico",
              content:
                "Un flujo o asistente que reduce trabajo manual y mejora seguimiento de forma consistente semana a semana.",
            },
          ],
        },
      },
      {
        id: "marta",
        name: "Marta Ronayne",
        title: "Diseno centrado en personas y contexto wellness",
        description:
          "Marta aporta una mirada humana y aterrizada para construir tono, confianza y experiencia de usuario, especialmente en proyectos de bienestar.",
        imageUrl: "/landing/photos/team/marta.jpg",
        accentColor: "bg-primary",
        shadowColor: "bg-black",
        linkedinUrl: "https://www.linkedin.com/in/marta-ronayne/",
        bio: {
          headline: "Tono, confianza y usabilidad que se sienten humanos",
          sections: [
            {
              title: "Que significa",
              content:
                "Ayudo a definir como se siente el sistema: lenguaje, flujo y esos detalles humanos que construyen confianza.",
            },
            {
              title: "Por que importa",
              content:
                "Si la experiencia se siente fria o confusa, la gente se desconecta. El diseno centrado en personas mantiene el trabajo usable y respetuoso.",
            },
            {
              title: "Que incluye",
              content:
                "Guia de copy y tono, input de UX, y feedback real sobre lo que si (y no) funcionara para las personas.",
            },
            {
              title: "Ideal para",
              content:
                "Equipos de bienestar, salud y sostenibilidad que quieren una experiencia calida, clara y confiable.",
            },
            {
              title: "Resultado tipico",
              content:
                "Un sistema que se siente claro y humano, para que la gente se quede y haga seguimiento.",
            },
          ],
          linkedinUrl: "https://www.linkedin.com/in/marta-ronayne/",
        },
      },
    ],
  },

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

  servicesTitle: "Nuestros Servicios",
  servicesSubtitle:
    "No sabes por donde empezar? Agenda una llamada de 15 minutos. Te ayudamos a encontrar el cambio más pequeno que genere momentum real.",
  services: [
    {
      icon: "Zap",
      title: "Optimizacion de Flujos",
      eng: "Workflow Optimization",
      description: "Haz la operacion más fluida quitando fricción y trabajo repetitivo.",
      details: [
        "Conectamos herramientas como Notion, Slack, Gmail, Airtable y WhatsApp.",
        "Diseñamos flujos que trabajan mientras duermes.",
        "Facturacion automatica hasta on-boarding de clientes sin intervencion humana.",
      ],
      imageUrl: "/landing/photos/services/workflows-automation.png",
      modal: {
        whatItMeans:
          "Convertimos pasos repetitivos y manuales en un flujo simple en el que tu equipo puede confiar.",
        whyItMatters:
          "Menos seguimiento, menos handoffs perdidos y una operacion diaria más tranquila.",
        whatsIncluded: [
          "Mapa rapido del flujo y auditoria de fricción",
          "Plan simple: disparadores, responsables y fallbacks",
          "Construccion + pruebas del flujo principal",
          "Documentacion basica para que el equipo lo pueda operar",
          "Ventana corta de iteracion despues del lanzamiento",
        ],
        idealFit: [
          "Equipos con operaciones recurrentes: intake, onboarding, seguimiento, reportes",
          "Quieres sistemas confiables, no automatizaciones solo para impresionar",
          "Puedes asignar 1-2 responsables para revisar y aprobar el flujo",
        ],
        typicalOutcome:
          "Menos trabajo manual, menos cosas que se caen y más consistencia semana a semana.",
      },
    },
    {
      icon: "MessageSquare",
      title: "Asistentes IA",
      eng: "AI Assistants",
      description: "Asistentes utiles y con tono humano para clientes o equipos internos.",
      details: [
        "Agentes basados en LLMs entrenados con la informacion de tu negocio.",
        "Pueden agendar citas, responder dudas tecnicas, cotizar servicios.",
        "Escalan casos complejos a humanos cuando sea necesario.",
      ],
      imageUrl: "/landing/photos/services/ai-assistants.png",
      modal: {
        whatItMeans:
          "Un asistente que responde, enruta y apoya al equipo con un tono humano y claro.",
        whyItMatters:
          "Respondes más rapido sin quemar a tu equipo, y las personas reciben proximos pasos claros en vez de callejones sin salida.",
        whatsIncluded: [
          "Definicion de alcance y tono (que si y que no hace)",
          "Setup de fuentes de conocimiento (docs, FAQs, notas internas)",
          "Flujos de conversacion: ayuda, calificacion y handoff a humano",
          "Reglas de seguridad y rutas de escalamiento",
          "Lanzamiento + mejoras basadas en conversaciones reales",
        ],
        idealFit: [
          "Equipos con preguntas repetidas o intake recurrente",
          "Te importa la confianza, claridad y voz de marca",
          "Quieres mejor calificacion antes de que entre un humano",
        ],
        typicalOutcome:
          "Respuestas más rapidas, menos conversaciones repetitivas y un camino más claro hacia agenda o seguimiento.",
      },
    },
    {
      icon: "CalendarCheck",
      title: "Sistemas para Retiros",
      eng: "Retreat Ops Systems",
      description:
        "Reservas, pagos, mensajes, itinerarios, checklists, feedback, seguimiento, dashboards. Operación sin caos. Experiencia humana.",
      details: [
        "Reservas, pagos, facturación",
        "Mensajería pre, durante, post retiro",
        "Itinerarios, checklists, roles",
        "Feedback, NPS, seguimiento",
        "Dashboard de ocupación, ingresos, satisfacción",
      ],
      imageUrl: "/landing/photos/services/health-wellness.jpg",
      modal: {
        whatItMeans:
          "Un sistema de operación para retiros. Reservas, pagos, mensajería, itinerarios, checklists, feedback, seguimiento, dashboards.",
        whyItMatters:
          "Menos caos operativo. Mejor experiencia para huéspedes. El equipo recupera foco.",
        whatsIncluded: [
          "Reservas, pagos, facturación",
          "Mensajería pre, durante, post retiro",
          "Itinerarios, checklists, roles",
          "Feedback, NPS, seguimiento",
          "Dashboard de ocupación, ingresos, satisfacción",
        ],
        idealFit: [
          "Retiros con operación repetible",
          "Quieres menos mensajes sueltos, más claridad",
          "Necesitas seguimiento sin fricción para huéspedes",
        ],
        typicalOutcome:
          "Una operación más clara. Menos caos. Seguimiento consistente. Mejor experiencia.",
      },
    },
    {
      icon: "BarChart3",
      title: "Dashboards de Decision",
      eng: "Decision Dashboards",
      description: "Visibilidad para actuar antes y mantener foco.",
      details: [
        "Centralizamos tus datos dispersos (Excel, SQL, CRMs) en tableros visuales claros.",
        "Implementamos metricas clave (KPIs) para la salud de tu negocio en tiempo real.",
        "Sin esperar al reporte de fin de mes.",
      ],
      imageUrl: "/landing/photos/services/decision-dashboards.jpg",
      modal: {
        whatItMeans:
          "Una sola vista clara de lo que esta pasando, lo que esta cambiando y lo que requiere atencion.",
        whyItMatters:
          "Las mejores decisiones llegan cuando dejas de reconciliar hojas de calculo y empiezas a ver senales temprano.",
        whatsIncluded: [
          "Definicion de KPIs (que medir y por que)",
          "Consolidacion de datos (donde viven hoy)",
          "Construccion del dashboard con vistas por rol",
          "Alertas o resumenes livianos para senales clave",
          "Entrenamiento corto + handoff para que siga siendo util",
        ],
        idealFit: [
          "Equipos con datos repartidos entre herramientas y archivos",
          "Quieres claridad sin un programa pesado de BI",
          "Quieres una versión uno simple que pueda crecer despues",
        ],
        typicalOutcome:
          "Un ritmo semanal: revisas un dashboard, detectas problemas antes y actuas con más confianza.",
      },
    },
    {
      icon: "Layers",
      title: "Sistemas de Conocimiento y Contenido",
      eng: "Knowledge and Content Systems",
      description: "Organiza conocimiento y crea salida consistente sin caos.",
      details: [
        "Pipelines de contenido asistidos por IA.",
        "Desde ideacion de temas basados en tendencias hasta generacion de borradores.",
        "Blog, redes sociales y newsletters manteniendo tu voz de marca.",
      ],
      imageUrl: "/landing/photos/services/knowledge-content-systems.jpg",
      modal: {
        whatItMeans:
          "Un sistema que captura conocimiento y lo convierte en salida consistente y util.",
        whyItMatters:
          "Dejas de reinventar la rueda, el onboarding se vuelve más facil, y el contenido se mantiene on-brand mientras creces.",
        whatsIncluded: [
          "Estructura simple de base de conocimiento que el equipo puede mantener",
          "Plantillas para capturar y reutilizar aprendizajes clave",
          "Flujo de contenido: idea, borrador, revision, publicacion",
          "Automatizacion liviana para reducir copiar/pegar y cambios de contexto",
          "Lineamientos para mantener tono consistente",
        ],
        idealFit: [
          "Equipos que publican regularmente o necesitan documentacion interna",
          "Tienes expertise, pero no un sistema consistente",
          "Quieres velocidad sin perder calidad",
        ],
        typicalOutcome:
          "Un proceso repetible de conocimiento a salida, con menos caos y más consistencia.",
      },
    },
    {
      icon: "Monitor",
      title: "Software, Sitios Web y Experiencias Digitales",
      eng: "Software, Websites and Digital Experiences",
      description: "Diseno bonito con sistemas que apoyan conversion y seguimiento.",
      details: [
        "Sitios web modernos, rapidos y optimizados para conversion.",
        "Busqueda semantica y personalizacion de contenido en tiempo real.",
        "Chatbots nativos para maximizar retencion de usuarios.",
      ],
      imageUrl: "/landing/photos/services/websites-digital-experiences.webp",
      modal: {
        whatItMeans:
          "Una experiencia web rapida y bien disenada que apoya confianza, conversion y seguimiento.",
        whyItMatters:
          "El buen diseno hace tu trabajo más facil de entender. Los sistemas hacen que el siguiente paso realmente ocurra.",
        whatsIncluded: [
          "Mensajes + estructura (que decir, que mostrar, que quitar)",
          "Direccion de diseno y UI con criterio",
          "Implementacion enfocada en performance y claridad",
          "Analitica basica para aprender que funciona",
          "Ventana corta de iteracion despues del lanzamiento",
        ],
        idealFit: [
          "Equipos que necesitan una presencia moderna y creible",
          "Quieres tu sitio conectado a flujos y seguimiento",
          "Te importan tono, confianza y velocidad",
        ],
        typicalOutcome:
          "Un sitio que se siente premium y convierte mejor, con menos seguimiento manual del equipo.",
      },
    },
    {
      icon: "Rocket",
      title: "Asesoria para Startups",
      eng: "Startup Advisory",
      description: "De la idea a versión uno con sistemas practicos y guia honesta.",
      details: [
        "Acompanamiento en validacion tecnica y de mercado.",
        "Te ayudamos a elegir el stack tecnologico correcto.",
        "Procesos escalables desde el dia uno.",
      ],
      imageUrl: "/landing/photos/services/startup-advisory.png",
      modal: {
        whatItMeans: "Guia directa y practica para lanzar versión uno sin sobreconstruir.",
        whyItMatters:
          "Evitas desvíos costosos, eliges lo que importa ahora y obtienes feedback más rapido.",
        whatsIncluded: [
          "Alcance y roadmap: que construir ahora vs despues",
          "Decisiones de producto y tecnica (tradeoffs simples y defendibles)",
          "Revision de arquitectura para reducir riesgo",
          "Plan de lanzamiento e iteracion temprana",
          "Soporte asincrono liviano mientras ejecutas",
        ],
        idealFit: [
          "Equipos tempranos con tiempo y presupuesto limitados",
          "Fundadores buscando claridad y momentum",
          "Equipos construyendo algo real (no solo slides)",
        ],
        typicalOutcome:
          "Un plan más simple, menos vueltas incorrectas y una versión uno que si puedes lanzar y aprender.",
      },
    },
  ],

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

  whoWeHelp: {
    title: "Somos el fit correcto?",
    idealTitle: "Somos ideales para ti si...",
    idealItems: [
      "Estas construyendo en salud, sostenibilidad o trabajo con mision.",
      "Quieres sistemas practicos, no hype.",
      "Valoras claridad, diseno y comunicación humana.",
      "Quieres una relacion directa con quienes construyen.",
    ],
    notIdealTitle: "Probablemente no somos fit si...",
    notIdealItems: [
      "Quieres barato e inmediato por encima de calidad.",
      "Quieres cero involucramiento y resultados magicos.",
      "Necesitas una agencia grande con equipo rotativo.",
    ],
    sectorsTitle: "Donde hacemos nuestro mejor trabajo",
    sectors: [
      {
        name: "Salud y bienestar",
        description: "Equipos que apoyan bienestar humano real.",
        icon: "Heart",
        imageUrl: "/landing/photos/sectors/health-wellness.jpg",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber más",
        modal: {
          whatItMeans:
            "Sistemas que ayudan a equipos de salud y bienestar a entregar un servicio consistente: intake claro, seguimiento claro y tono humano.",
          whyItMatters:
            "En trabajo de salud, retrasos e inconsistencia bajan la confianza. Un sistema simple reduce pasos perdidos y libera al equipo para enfocarse en personas.",
          whatsIncluded: [
            "Flujos para intake, agenda y seguimiento",
            "Asistentes con tono humano para FAQs, triage y enrutamiento",
            "Dashboards para visibilidad (retencion, pipeline, operacion)",
            "Sistemas de conocimiento para mantener alineacion",
          ],
          idealFit: [
            "Clinicas, programas y profesionales con servicios recurrentes",
            "Equipos con complejidad de intake, agenda y seguimiento",
            "Organizaciones donde tono, confianza y consistencia importan",
          ],
          typicalOutcome:
            "Respuesta más rapida, handoffs más claros y una operacion más calmada que se siente para el cliente.",
        },
        whoWeHelp: [
          "Clinicas, programas y profesionales con servicios recurrentes",
          "Equipos con complejidad de intake, agenda y seguimiento",
          "Organizaciones donde tono, confianza y consistencia importan",
        ],
        howWeHelp: [
          "Flujos para intake, agenda y seguimiento",
          "Asistentes con tono humano para FAQs, triage y enrutamiento",
          "Dashboards para visibilidad (retencion, pipeline, operacion)",
          "Sistemas de conocimiento para mantener alineacion",
        ],
        exampleProjects: [
          "Flujo de entrega de servicio + dashboard simple",
          "Asistente que califica y enruta solicitudes a la persona correcta",
          "Refresh web conectado a seguimiento y siguientes pasos",
        ],
      },
      {
        name: "Sostenibilidad y proyectos regenerativos",
        description: "Proyectos que cuidan ecosistemas y resiliencia local.",
        icon: "Sprout",
        imageUrl: "/landing/photos/sectors/sustainability-regenerative.jpg",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber más",
        modal: {
          whatItMeans:
            "Sistemas practicos para coordinacion, reportes y seguimiento para que el trabajo se mantenga real en el terreno, no solo en documentos.",
          whyItMatters:
            "Equipos de sostenibilidad coordinan aliados, trabajo en campo y rendicion de cuentas. Un sistema claro mantiene el momentum alto y la confusion baja.",
          whatsIncluded: [
            "Sistemas simples para coordinacion y accountability",
            "Dashboards para decisiones y reportes",
            "Captura de conocimiento para que el aprendizaje no se pierda",
            "Experiencias web que comuniquen credibilidad e impacto",
          ],
          idealFit: [
            "Proyectos regenerativos coordinando aliados y trabajo en campo",
            "Equipos balanceando metas de impacto con operacion real",
            "Organizaciones que necesitan mejor reporte y seguimiento",
          ],
          typicalOutcome:
            "Menos caos, reportes más claros y un equipo que ejecuta de forma consistente entre personas y aliados.",
        },
        whoWeHelp: [
          "Proyectos regenerativos coordinando aliados y trabajo en campo",
          "Equipos balanceando metas de impacto con operacion real",
          "Organizaciones que necesitan mejor reporte y seguimiento",
        ],
        howWeHelp: [
          "Sistemas simples para coordinacion y accountability",
          "Dashboards para decisiones y reportes",
          "Captura de conocimiento para que el aprendizaje no se pierda",
          "Experiencias web que comuniquen credibilidad e impacto",
        ],
        exampleProjects: [
          "Dashboard de operacion + ritmo de reporte",
          "Base de conocimiento para procesos, aliados y aprendizajes",
          "Sitio de proyecto que hace el trabajo facil de entender y apoyar",
        ],
      },
      {
        name: "Educacion alternativa",
        description: "Modelos de aprendizaje centrados en personas.",
        icon: "GraduationCap",
        imageUrl: "/landing/photos/sectors/alternative-education.jpg",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber más",
        modal: {
          whatItMeans:
            "Sistemas que apoyan a estudiantes y staff: mejor comunicación, siguientes pasos claros y menos coordinacion manual.",
          whyItMatters:
            "Los programas educativos ganan por consistencia. Cuando la operacion es confusa, el estudiante lo siente. Un sistema simple protege la experiencia.",
          whatsIncluded: [
            "Flujos de intake e inscripcion que reduzcan trabajo manual",
            "Asistentes para soporte, FAQs y enrutamiento",
            "Dashboards para ver progreso, capacidad y necesidades de seguimiento",
            "Sistemas de contenido y conocimiento para comunicación consistente",
          ],
          idealFit: [
            "Programas con instructores, cohorts y comunicación constante",
            "Equipos manejando inscripciones, agendas y soporte a estudiantes",
            "Organizaciones que necesitan una experiencia humana y consistente",
          ],
          typicalOutcome:
            "Un journey de estudiante más fluido, menos mensajes perdidos y más tiempo para que el equipo ensene.",
        },
        whoWeHelp: [
          "Programas con instructores, cohorts y comunicación constante",
          "Equipos manejando inscripciones, agendas y soporte a estudiantes",
          "Organizaciones que necesitan una experiencia humana y consistente",
        ],
        howWeHelp: [
          "Flujos de intake e inscripcion que reduzcan trabajo manual",
          "Asistentes para soporte, FAQs y enrutamiento",
          "Dashboards para ver progreso, capacidad y necesidades de seguimiento",
          "Sistemas de contenido y conocimiento para comunicación consistente",
        ],
        exampleProjects: [
          "Flujo de inscripcion + asistente de soporte",
          "Dashboard de programa para operacion y seguimiento",
          "Sistema web y contenido para mensajes consistentes",
        ],
      },
      {
        name: "Startups con mision",
        description: "Equipos tempranos creando productos utiles con propósito.",
        icon: "Rocket",
        imageUrl: "/landing/photos/sectors/mission-led-startups.webp",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber más",
        modal: {
          whatItMeans:
            "Un partner senior y practico para enviar versión uno, mantener el alcance tight y evitar detours costosos.",
          whyItMatters:
            "Las startups mueren en el gap entre idea y ejecucion. Alcance claro y feedback rapido mantienen el momentum vivo.",
          whatsIncluded: [
            "versión uno con alcance tight y defendible",
            "Flujos y dashboards para claridad operativa",
            "Asistentes y sistemas de conocimiento para escalar soporte",
            "Asesoria de producto para evitar sobreconstruir",
          ],
          idealFit: [
            "Equipos tempranos que necesitan versión uno, rapido y usable",
            "Fundadores que quieren tradeoffs honestos y prioridades claras",
            "Equipos construyendo en salud, sostenibilidad o bien publico",
          ],
          typicalOutcome:
            "Un v1 enviado con ownership claro y un plan para iterar basado en uso real.",
        },
        whoWeHelp: [
          "Equipos tempranos que necesitan versión uno, rapido y usable",
          "Fundadores que quieren tradeoffs honestos y prioridades claras",
          "Equipos construyendo en salud, sostenibilidad o bien publico",
        ],
        howWeHelp: [
          "versión uno con alcance tight y defendible",
          "Flujos y dashboards para claridad operativa",
          "Asistentes y sistemas de conocimiento para escalar soporte",
          "Asesoria de producto para evitar sobreconstruir",
        ],
        exampleProjects: [
          "MVP + flujo para intake y seguimiento",
          "Dashboard de decision para prioridades y metricas",
          "Base de conocimiento que crece con el producto",
        ],
      },
    ],
    cta: "Hacemos espacio para equipos de alto impacto, incluso con presupuestos ajustados.",
    ctaButton: "Cuentanos sobre tu proyecto",
  },

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

  projectsTitle: "Lo que Hemos Construido",
  projectsSubtitle: "Proyectos seleccionados de nuestro trabajo actual",
  projects: [
    {
      title: "Chak",
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

  storiesTitle: "Ejemplos Reales",
  storiesSubtitle: "Como hemos ayudado a negocios como el tuyo",
  stories: [
    {
      company: "Granja Hidroponica",
      industry: "Agricultura",
      before:
        "Revisaba pH, EC y temperatura manualmente 4 veces al dia. Iba al invernadero a las 6am y 10pm. Un fin de semana fuera significaba pedirle a un vecino que no entendia el sistema.",
      after:
        "Sensores alimentan un dashboard. Alertas a WhatsApp cuando algo esta mal. Resumen semanal de IA con tendencias y recomendaciones.",
      quote:
        "Detecte una deriva de pH a las 2am que habria matado un cultivo de lechugas. Ahora tomo fines de semana libres.",
      author: "Dueno de Granja",
      imageUrl:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop",
      metric: "Libertad de fines de semana",
    },
    {
      company: "Practica de Bienestar Holistico",
      industry: "Salud y Bienestar",
      before:
        "Clientes enviaban mensajes a todas horas preguntando sobre tipos de sesiones, precios, disponibilidad. No podia responder durante sesiones. Perdia reservas ante practicantes que respondian más rapido.",
      after:
        "Bot de WhatsApp explica servicios, responde preguntas sobre Reiki vs. sanacion sonora vs. respiracion, revisa calendario y reserva directamente. Calido, no robotico.",
      quote:
        "40% más sesiones reservadas. Respondo preguntas complejas cuando estoy centrada, no en medio de sesion.",
      author: "Practicante de Bienestar",
      imageUrl:
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop",
      metric: "+40% sesiones reservadas",
    },
    {
      company: "Familia Educacion en Casa",
      industry: "Educacion",
      before:
        "Mama pasaba noches de domingo planificando la semana. Seguimiento del progreso de 3 ninos en hojas de calculo. Sin idea si realmente retenian el material.",
      after:
        "IA ayuda a generar planes semanales basados en el ritmo de cada nino. Progreso rastreado automaticamente. Brechas senaladas antes de convertirse en problemas.",
      quote:
        "Planificacion dominical: 3 horas a 45 minutos. Los ninos reciben más atencion personalizada, menos estres administrativo.",
      author: "Padre Educador en Casa",
      imageUrl:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      metric: "3 horas -> 45 minutos semanales",
    },
    {
      company: "Finca Familiar",
      industry: "Agricultura",
      before:
        "Ventas de huevos, vegetales, inscripciones a talleres todo rastreado diferente. Algo en cuaderno. Algo en WhatsApp. Sin idea de que era realmente rentable.",
      after:
        "Dashboard simple conecta canales de venta. Ve que productos dan dinero, cuales no. Rastrea clientes recurrentes.",
      quote:
        "Descubri que las ventas de mermelada perdian dinero despues de contabilizar tiempo. Subi precios, me enfoque en lo que funcionaba.",
      author: "Agricultor Familiar",
      imageUrl:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
      metric: "Visibilidad real de rentabilidad",
    },
    {
      company: "Comunidad Autosostenible",
      industry: "Gestion Comunitaria",
      before:
        "30 familias, recursos compartidos, cero sistema central. Biblioteca de herramientas en cuaderno. Turnos de trabajo coordinados via caos de chat grupal. Cosechas del bosque de alimentos para quien llegara primero. Disputas sobre equidad.",
      after:
        "Portal simple para miembros. IA ayuda a programar rotaciones de trabajo equitativamente, rastrea prestamo de herramientas, anuncia que esta listo para cosechar y sugiere distribucion equitativa. Envia recordatorios suaves, no molestos.",
      quote:
        "Menos drama administrativo, más comunidad. Decisiones basadas en datos, no en quien habla más fuerte.",
      author: "Coordinador Comunitario",
      imageUrl:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop",
      metric: "30 familias coordinadas",
    },
    {
      company: "Startup de Impacto",
      industry: "Startup Tecnologica",
      before:
        "Fundador haciendo todo. Preguntas de clientes, actualizaciones a inversionistas, contenido, ops. Sin sistema. Las cosas caian constantemente por las grietas.",
      after:
        "Leads auto-capturados y calificados. FAQ manejadas por chatbot. Reporte de metricas semanal generado automaticamente. Fundador se enfoca en producto y recaudacion.",
      quote:
        "Deje de perder leads. Los inversionistas empezaron a comentar lo organizadas que eran las actualizaciones.",
      author: "Fundador de Startup",
      imageUrl:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
      metric: "Cero leads perdidos",
    },
    {
      company: "Operacion de Acuaponia",
      industry: "Agricultura",
      before:
        "Alimentacion de peces, calidad del agua, salud de plantas todo monitoreado por separado. Datos en tres apps diferentes. Correlacionar problemas tomaba horas de trabajo detectivesco.",
      after:
        "Dashboard unificado. IA senala cuando comportamiento de peces + temperatura del agua + crecimiento de plantas sugieren un problema gestandose.",
      quote:
        "Predije un problema de filtro 3 dias antes de que colapsara el sistema. Un dashboard en lugar de tres apps.",
      author: "Agricultor Acuaponico",
      imageUrl:
        "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop",
      metric: "3 apps -> 1 dashboard",
    },
    {
      company: "Centro de Terapia Alternativa",
      industry: "Salud y Bienestar",
      before:
        "4 practicantes, 4 calendarios separados, clientes confundidos sobre quien hace que. Recepcionista pasaba mitad del dia solo enrutando consultas.",
      after:
        "Sistema de reservas unico con IA que pregunta que necesita el cliente y los empareja con el practicante correcto. Maneja conflictos de horarios automaticamente.",
      quote:
        "La recepcionista ahora hace seguimiento de clientes en lugar de tetris de calendarios. Errores de reserva cayeron a casi cero.",
      author: "Gerente de Centro",
      imageUrl:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
      metric: "Casi cero errores de reserva",
    },
    {
      company: "Escuela de Idiomas",
      industry: "Educacion",
      before:
        "Administrador pasaba más de 2 horas diarias respondiendo las mismas preguntas. Precios, horarios, niveles, metodos de pago. Una y otra vez.",
      after:
        "Chatbot maneja 80% de consultas. Conoce cursos, revisa disponibilidad, envia enlaces de inscripcion, responde en espanol o ingles.",
      quote:
        "El administrador se enfoca en experiencia del estudiante. Inscripcion subio porque respuestas ocurren instantaneamente, no el siguiente dia habil.",
      author: "Administrador de Escuela",
      imageUrl:
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
      metric: "80% consultas automatizadas",
    },
    {
      company: "Consultor Agricultura Regenerativa",
      industry: "Consultoria",
      before:
        "Datos de granjas de clientes dispersos en correos, PDFs y notas de voz. Preparar un reporte de salud del suelo significaba buscar en meses de mensajes.",
      after:
        "Clientes envian datos a traves de un formulario simple. IA los organiza, senala anomalias, redacta la estructura inicial del reporte.",
      quote:
        "Tiempo de preparacion de reportes reducido a la mitad. más tiempo en el campo, menos tiempo en correo.",
      author: "Consultor Agricola",
      imageUrl:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
      metric: "50% menos tiempo en reportes",
    },
    {
      company: "Proyecto de Permacultura",
      industry: "Agricultura",
      before:
        "Plan de bosque de alimentos de 5 años existia mayormente en la cabeza del fundador. Voluntarios llegaban sin saber que hacer. Gremios de plantas, flujos de agua, tareas estacionales dispersos en cuadernos, PDFs y conversaciones medio recordadas. Conocimiento se iba con personas clave.",
      after:
        "Sistema central rastrea que esta plantado donde, que necesita hacerse este mes y por que. Voluntarios reciben tareas claras segun sus habilidades. IA ayuda a responder 'que deberia ir junto al gremio de manzanas?' basado en los datos propios del sitio.",
      quote:
        "Nuevos voluntarios productivos desde el dia uno. Conocimiento institucional permanece incluso cuando personas se van.",
      author: "Fundador de Proyecto",
      imageUrl:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop",
      metric: "Conocimiento institucional preservado",
    },
  ],

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
        url: "https://wa.me/573106172706",
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
      whatsapp: "+573106172706",
      whatsappDisplay: "+57 310 617 2706",
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
