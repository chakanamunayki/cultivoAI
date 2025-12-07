import type { SiteContent } from "./types";

export const es: SiteContent = {
  nav: [
    { label: "Inicio", href: "#hero" },
    { label: "Nosotros", href: "#about" },
    { label: "Servicios", href: "#services" },
    { label: "Demos", href: "#demos" },
    { label: "Semilla", href: "#semilla" },
    { label: "Alianzas", href: "#partnerships" },
    { label: "Proyectos", href: "#projects" },
    { label: "Historias", href: "#stories" },
    { label: "Proceso", href: "#what-happens-next" },
  ],

  marquee:
    "Paul & Rocky 🇬🇧🇨🇴  •  Chatbots $100  •  Automatización  •  Marketing IA  •  Dashboards  •  Web+IA  •  Medellín→Mundo  •  Win-Win Siempre  •  Trato Directo  •  Proyectos de Impacto  •  Respuesta 24hrs  •  ",

  hero: {
    tagline: "PARA LOS QUE ESTÁN CAMBIANDO LAS COSAS",
    line1: "INTEGRACIÓN DE IA.",
    services: ["CHATBOTS", "AUTOMATIZACIÓN", "MARKETING", "DASHBOARDS BI"],
    servicesDone: "Hecho.",
    audience: ["Agricultores.", "Autosuficiencia.", "Innovación.", "Sanadores Holísticos.", "Educadores.", "Constructores Sostenibles."],
    line3: "Tarifas de impacto. Enfoque humano. Padre e hijo.",
    cta: "Hablemos",
    secondaryCta: "Conoce nuestra historia",
    noDrama: "SIN DRAMA.",
    noDramaText:
      "Ayudamos a negocios con proposito a usar IA sin perderse en la complejidad.",
    impactSection: {
      text: "Propósito antes que beneficio. Siempre.",
      cta: "Hablemos",
    },
  },

  about: {
    title: "Quienes Somos",
    subtitle: "Una familia construyendo algo significativo desde Colombia",
    viewMoreLabel: "Ver mas",
    footerNote:
      "Para proyectos de mayor impacto, contamos con expertos tecnicos que nos apoyan cuando es necesario.",
    teamMembers: [
      {
        id: "paul",
        name: "Paul Ronayne",
        title: "ESTRATEGIA & NEGOCIOS",
        subtitle: "Co-fundador nbn23 · nagi | Fundador Raiz",
        description:
          "Con mas de 20 anos de experiencia en tecnologia y negocios, Paul ha trabajado en startups, corporaciones y proyectos de impacto. Ahora enfoca su experiencia en ayudar a negocios con proposito a aprovechar la IA de manera practica y accesible.",
        imageUrl:
          "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800",
        accentColor: "bg-[#A855F7]",
        shadowColor: "bg-black",
        linkedinUrl: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        bio: {
          headline: "20+ anos construyendo tecnologia con proposito",
          sections: [
            {
              title: "Trayectoria",
              content:
                "Co-fundador de nbn23 (estadisticas de basquetbol para la NBA) y nagi (asistente de voz IA). Fundador de Raiz Capital, una plataforma de inversion de impacto para agricultura regenerativa. Ha trabajado con startups, corporaciones y proyectos sociales en multiples paises.",
            },
            {
              title: "Enfoque Actual",
              content:
                "Ayudar a negocios con proposito a integrar IA de manera practica, sin la complejidad ni los costos inflados de las agencias tradicionales. Ensenandole a Rocky a construir mientras construye junto a el.",
            },
            {
              title: "Filosofia",
              content:
                "Cree que la tecnologia debe servir a las personas, no al reves. Prefiere relaciones a largo plazo sobre transacciones rapidas. Si un proyecto no es win-win, prefiere no hacerlo.",
            },
          ],
          linkedinUrl: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        },
      },
      {
        id: "rocky",
        name: "Rocky Ronayne",
        title: "TECH & IA",
        badge: "14 anos",
        description:
          "Futbolista, innovador. Rocky esta aprendiendo a construir soluciones con IA mientras balancea el colegio y el futbol. Lidera el Fondo Semilla, donde construye proyectos pequenos para clientes que estan empezando.",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
        accentColor: "bg-[#FFDE00]",
        shadowColor: "bg-[#FFDE00]",
        bio: {
          headline: "Aprendiendo a construir mientras construyo",
          sections: [
            {
              title: "Quien Soy",
              content:
                "Tengo 14 anos. Cumplo 15 en enero. Todavia no se exactamente que quiero hacer con mi vida, y creo que esta bien no saberlo todavia. Me gusta el futbol, los videojuegos, y estoy aprendiendo a construir cosas con IA.",
            },
            {
              title: "Project19",
              content:
                "Mi proyecto personal: un coach de IA que me ayuda a organizar mi dia. Me manda un mensaje en la manana preguntando mis planes, y en la noche me pregunta como me fue. Todo se guarda en Notion automaticamente. Costo: ~$0.30/mes.",
            },
            {
              title: "Fondo Semilla",
              content:
                "Mi iniciativa para ayudar a proyectos pequenos mientras aprendo. Chatbots basicos, automatizaciones simples, organizacion en Notion. Precios accesibles porque yo tambien estoy aprendiendo.",
            },
          ],
          videoUrl: "https://www.youtube.com/watch?v=example",
          videoLabel: "Ver proyecto Samsung",
        },
      },
      {
        id: "marta",
        name: "Marta Ronayne",
        title: "EL ANCLA",
        subtitle: "Terapeuta holistica | Munayki",
        description:
          "Terapeuta holistica y el centro de gravedad de la familia. Marta trae equilibrio y perspectiva humana a todo lo que hacemos. Su practica Munayki es donde Rocky aplica lo que aprende en un contexto real.",
        imageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
        accentColor: "bg-[#10B981]",
        shadowColor: "bg-[#10B981]",
        linkedinUrl: "https://www.linkedin.com/in/marta-ronayne/",
        bio: {
          headline: "Equilibrio y perspectiva humana",
          sections: [
            {
              title: "Munayki",
              content:
                "Practica de bienestar holistico enfocada en sanacion emocional y crecimiento personal. Marta trabaja con clientes de forma individual y en talleres grupales, integrando multiples modalidades terapeuticas.",
            },
            {
              title: "El Ancla",
              content:
                "Mientras Paul y Rocky construyen tecnologia, Marta mantiene los pies en la tierra. Es la voz que pregunta '¿pero esto realmente ayuda a las personas?' antes de lanzar cualquier proyecto.",
            },
            {
              title: "Conexion con CultivoAI",
              content:
                "Munayki es donde Rocky practica lo que aprende. El chatbot de agendamiento, las automatizaciones de seguimiento, todo se prueba primero ahi. Es nuestro laboratorio de impacto real.",
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
          "Solo tomamos proyectos donde ambas partes ganan. Si no podemos agregar valor real, te lo decimos. Si un proyecto no es sostenible para ambos, preferimos no hacerlo. La transparencia es mas importante que cualquier contrato.",
      },
      {
        icon: "Sprout",
        title: "Negocio Holistico",
        description:
          "No solo construimos para clientes. Compartimos lo que aprendemos. Apoyamos proyectos de impacto con tarifas reducidas. Y medimos nuestro exito no solo en dinero, sino en el valor real que creamos.",
      },
      {
        icon: "Users",
        title: "Rocky Aprende en Cada Paso",
        description:
          "Este no es solo un negocio. Es un proyecto educativo. Rocky participa en cada proyecto de alguna forma - a veces liderando, a veces aprendiendo. Cuando trabajas con nosotros, estas contribuyendo a su aprendizaje real.",
        isFullWidth: true,
      },
    ],
  },

  whatWeDo: {
    title: "Como Ayudamos",
    subtitle: "Integracion de IA practica para negocios reales",
    intro:
      "No vendemos humo. No prometemos que la IA va a resolver todos tus problemas. Lo que hacemos es integrar herramientas de IA de manera practica en tu operacion existente. Automatizamos lo que tiene sentido automatizar. Potenciamos lo que ya funciona.",
    columns: [
      {
        title: "OPTIMIZAR",
        items: [
          "Automatizar tareas repetitivas",
          "Conectar herramientas que no se hablan",
          "Centralizar datos dispersos",
          "Reducir friccion en procesos",
        ],
      },
      {
        title: "EXPANDIR",
        items: [
          "Atencion al cliente 24/7",
          "Contenido escalable",
          "Inteligencia de negocio en tiempo real",
          "Nuevos canales de comunicacion",
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
      "Una agencia que te vende y luego te pasa a un junior.",
      "Consultores que cobran por hora mientras 'investigan'.",
      "Vendedores de soluciones que no necesitas.",
      "Expertos que te hacen sentir ignorante.",
    ],
    yesTitle: "Lo que SI somos",
    yesItems: [
      "Un papa ensenandole a su hijo a construir cosas reales.",
      "Gente que ha quebrado proyectos, aprendido, y sigue intentando.",
      "Integradores - conectamos herramientas, no reinventamos la rueda.",
      "Colombianos trabajando para el mundo desde aqui.",
    ],
  },

  servicesTitle: "Nuestros Servicios",
  servicesSubtitle:
    "No estas seguro que necesitas? Agenda una llamada de 15 minutos. Te ayudamos a identificar donde la IA puede hacer la diferencia en tu negocio.",
  services: [
    {
      icon: "Zap",
      title: "Automatizacion de Flujos",
      eng: "Workflow Automation",
      description: "Elimina tareas repetitivas conectando tus apps favoritas.",
      details: [
        "Conectamos herramientas como Notion, Slack, Gmail, Airtable y WhatsApp.",
        "Disenamos flujos que trabajan mientras duermes.",
        "Facturacion automatica hasta on-boarding de clientes sin intervencion humana.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
      pricing: "Desde $100 USD",
    },
    {
      icon: "MessageSquare",
      title: "Asistentes IA y Chatbots",
      eng: "AI Assistants & Chatbots",
      description: "Atencion al cliente 24/7 con personalidad humana.",
      details: [
        "Agentes basados en LLMs entrenados con la informacion de tu negocio.",
        "Pueden agendar citas, responder dudas tecnicas, cotizar servicios.",
        "Escalan casos complejos a humanos cuando sea necesario.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=600",
      pricing: "Desde $100 USD",
    },
    {
      icon: "BarChart3",
      title: "Inteligencia de Negocios",
      eng: "Business Intelligence",
      description: "Dashboards que convierten datos en decisiones.",
      details: [
        "Centralizamos tus datos dispersos (Excel, SQL, CRMs) en tableros visuales claros.",
        "Implementamos metricas clave (KPIs) para la salud de tu negocio en tiempo real.",
        "Sin esperar al reporte de fin de mes.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
      pricing: "Desde $200 USD",
    },
    {
      icon: "Layers",
      title: "Sistemas de Contenido",
      eng: "Content Systems",
      description: "Motores de creacion para escalar tu presencia.",
      details: [
        "Pipelines de contenido asistidos por IA.",
        "Desde ideacion de temas basados en tendencias hasta generacion de borradores.",
        "Blog, redes sociales y newsletters manteniendo tu voz de marca.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
      pricing: "Desde $150 USD",
    },
    {
      icon: "Monitor",
      title: "Desarrollo Web con IA",
      eng: "Website Development + AI",
      description: "Sitios web vivos que aprenden y se adaptan.",
      details: [
        "Sitios web modernos, rapidos y optimizados para conversion.",
        "Busqueda semantica y personalizacion de contenido en tiempo real.",
        "Chatbots nativos para maximizar retencion de usuarios.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600",
      pricing: "Desde $300 USD",
    },
    {
      icon: "Rocket",
      title: "Asesoria para Startups",
      eng: "Startup Advisory",
      description: "De la idea al MVP utilizando herramientas No-Code + IA.",
      details: [
        "Acompanamiento en validacion tecnica y de mercado.",
        "Te ayudamos a elegir el stack tecnologico correcto.",
        "Procesos escalables desde el dia uno.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600",
      pricing: "Desde $50 USD/hora",
    },
  ],

  demosTitle: "IA en Accion",
  demosSubtitle: "Mira como la IA puede transformar diferentes areas de tu negocio",
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
            "Bot: Hola! Nuestros chatbots personalizados empiezan desde $150 USD. Te gustaria ver una demo?",
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
        { action: "", result: "Que tienes planeado para hoy? Escuela, futbol, algo mas?" },
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
      "Tienes un negocio con proposito mas alla de solo ganar dinero",
      "Valoras las relaciones sobre las transacciones",
      "Prefieres trabajar con personas reales, no una agencia impersonal",
      "Entiendes que el buen trabajo toma tiempo",
      "Estas construyendo algo de lo que te sientes orgulloso",
      "Crees que la IA puede ayudar pero no sabes por donde empezar",
      "Aprecias la honestidad, incluso cuando es incomoda",
      "Estas dispuesto a aprender junto con nosotros",
    ],
    notIdealTitle: "Probablemente no somos el fit si...",
    notIdealItems: [
      "Solo buscas 'barato y rapido'",
      "Tu modelo de negocio es puramente extractivo",
      "Tratas a los proveedores de servicio como descartables",
      "No tienes tiempo para una conversacion antes de empezar",
      "Esperas que la IA resuelva todo magicamente sin tu input",
      "Necesitas una agencia grande con equipos rotativos",
    ],
    sectorsTitle: "Sectores que nos encantan",
    sectors: [
      {
        name: "Agritech",
        description: "Hidroponia, acuaponia, agricultura regenerativa",
        icon: "Sprout",
        badge: "Descuentos disponibles",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber mas",
        whoWeHelp: [
          "Granjas urbanas y operaciones de agricultura vertical",
          "Colectivos de agricultura regenerativa y organica",
          "Cooperativas agricolas y granjas familiares",
          "Startups AgTech desarrollando soluciones sostenibles",
        ],
        howWeHelp: [
          "Monitoreo de cultivos con IA y prediccion de rendimiento",
          "Sistemas automatizados de riego y gestion de nutrientes",
          "Optimizacion de cadena de suministro y acceso a mercados",
          "Engagement de clientes y plataformas directo al consumidor",
        ],
        exampleProjects: [
          "Bot de WhatsApp para pedidos granja-a-mesa",
          "Dashboard IoT para monitoreo de invernaderos",
          "Analitica predictiva para planificacion de cosechas",
        ],
      },
      {
        name: "Bienestar holistico",
        description: "Salud mental y fisica fuera del modelo tradicional",
        icon: "Heart",
        badge: "Descuentos disponibles",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber mas",
        whoWeHelp: [
          "Terapeutas y consejeros independientes",
          "Estudios de yoga y centros de meditacion",
          "Practicantes de medicina funcional",
          "Centros de retiro de bienestar",
        ],
        howWeHelp: [
          "Programacion de citas y gestion de clientes",
          "Seguimiento personalizado del viaje de bienestar",
          "Herramientas de intake y evaluacion asistidas por IA",
          "Construccion de comunidad y plataformas de cursos",
        ],
        exampleProjects: [
          "Chatbot de recordatorios y progreso de meditacion",
          "Automatizacion de intake con seguimientos personalizados",
          "Plataforma de comunidad de bienestar con coaching IA",
        ],
      },
      {
        name: "Educacion alternativa",
        description: "Aprendizaje personalizado, desarrollo familiar",
        icon: "GraduationCap",
        badge: "Descuentos disponibles",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber mas",
        whoWeHelp: [
          "Familias y cooperativas de homeschooling",
          "Microescuelas y pods de aprendizaje",
          "Creadores de contenido educativo",
          "Plataformas de aprendizaje alternativo",
        ],
        howWeHelp: [
          "Generacion y seguimiento de curriculo personalizado",
          "Asistentes de tutoria IA para aprendizaje a ritmo propio",
          "Dashboards de monitoreo de progreso para padres",
          "Herramientas de coordinacion comunitaria y recursos compartidos",
        ],
        exampleProjects: [
          "Companero de estudio IA para estudiantes homeschool",
          "Automatizacion de planificacion curricular",
          "Plataforma de comunidad de padres con recursos compartidos",
        ],
      },
      {
        name: "Autosuficiencia",
        description: "Homesteading, vida sostenible, resiliencia local",
        icon: "Home",
        badge: "Descuentos disponibles",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber mas",
        whoWeHelp: [
          "Homesteaders y practicantes de permacultura",
          "Comunidades off-grid y de vida sostenible",
          "Redes locales de alimentos y grupos de compra",
          "Espacios maker y grupos de intercambio de habilidades",
        ],
        howWeHelp: [
          "Gestion del conocimiento y plataformas de intercambio de habilidades",
          "Seguimiento de recursos y gestion de inventario",
          "Coordinacion comunitaria y sistemas de trueque",
          "Planificacion estacional y recordatorios de actividades",
        ],
        exampleProjects: [
          "Gestor de tareas de homestead con recordatorios estacionales",
          "Plataforma de intercambio y trueque local",
          "Directorio comunitario de intercambio de habilidades",
        ],
      },
      {
        name: "Startups con mision",
        description: "Cualquier equipo early-stage haciendo trabajo significativo",
        icon: "Rocket",
        badge: "Descuentos disponibles",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber mas",
        whoWeHelp: [
          "Empresas sociales y B-corps",
          "Startups tech enfocadas en impacto",
          "ONGs con programas innovadores",
          "Organizaciones comunitarias escalando su impacto",
        ],
        howWeHelp: [
          "Desarrollo de MVP y prototipado rapido",
          "Automatizacion para hacer mas con menos",
          "Soporte al cliente y engagement potenciado por IA",
          "Insights de datos y medicion de impacto",
        ],
        exampleProjects: [
          "Automatizacion de engagement de donantes",
          "Dashboard de reportes de impacto",
          "Plataforma de matching y coordinacion comunitaria",
        ],
      },
    ],
    cta: "Te identificas? Nos encantaria saber mas sobre lo que estas construyendo.",
    ctaButton: "Cuentanos sobre tu proyecto",
  },

  semilla: {
    title: "Fondo Semilla",
    subtitle: "El Viaje de Rocky",
    about:
      "Tengo 14 anos. Cumplo 15 en enero. Todavia no se exactamente que quiero hacer con mi vida, y creo que esta bien no saberlo todavia. Pero si se algunas cosas: Me gusta construir. Mi papa me esta ensenando a hacer cosas con IA - chatbots, automatizaciones, cosas asi. A veces el me ensena. A veces yo le enseno a el.",
    tiers: [
      { name: "Semilla ($10-50)", description: "Actualizaciones de progreso, nombre en supporters" },
      { name: "Brote ($50-200)", description: "Acceso temprano a herramientas, input en features" },
      { name: "Crecer ($200-500)", description: "Acceso gratuito de por vida a lo que Rocky construya" },
      { name: "Socio ($500+)", description: "Adaptacion personalizada, involucración directa" },
    ],
    services: [
      "Chatbots basicos para WhatsApp o web",
      "Automatizaciones simples (conectar apps, enviar notificaciones)",
      "Ayuda con Notion y organizacion",
      "Talleres de desarrollo de chatbots",
    ],
    goal: "Para cuando tenga 19 anos quiero tener opciones. Quizas jugar futbol semi-profesional. Quizas tener mi propio negocio. Quizas ambos. El punto es poder elegir.",
    ctaTitle: "Propon un Proyecto",
    ctaDescription: "Tienes algo pequeno que necesitas? Cuentame.",
    ctaButton: "Proponer Proyecto",
  },

  partnershipsTitle: "Formas Flexibles de Trabajar",
  partnershipsSubtitle:
    "Entendemos que no todos los proyectos valiosos vienen con presupuestos corporativos. Hemos disenado diferentes formas de trabajar juntos.",
  partnerships: [
    {
      name: "Proyecto Estandar",
      tagline: "Negocios con presupuesto",
      description:
        "Alcance claro y entregables definidos. Precio fijo acordado antes de empezar. Cronograma establecido. Soporte incluido post-entrega.",
      idealFor: ["Empresas que saben lo que necesitan", "Recursos para invertir"],
      icon: "Briefcase",
    },
    {
      name: "Tarifa Reducida",
      tagline: "Startups & Impacto",
      description:
        "Mismo nivel de calidad. Precio reducido significativamente. Condiciones flexibles. A cambio: testimonial, caso de estudio, o referidos.",
      idealFor: ["Startups pre-revenue", "Proyectos con mision social"],
      icon: "HeartHandshake",
    },
    {
      name: "Pago Diferido",
      tagline: "Paga al despegar",
      description:
        "Precio reducido inicial (o cero). Resto del pago vinculado a hitos o revenue. Compartimos el riesgo contigo. Solo para proyectos en los que creemos.",
      idealFor: ["Founders con gran idea", "Sin runway actual"],
      icon: "Hourglass",
    },
    {
      name: "Revenue Share",
      tagline: "Socios en crecimiento",
      description:
        "Construccion a costo reducido o cero. Porcentaje pequeno de revenue futuro. Alineamos incentivos a largo plazo. Nos convertimos en socios, no proveedores.",
      idealFor: ["Productos recurrentes", "Servicios donde podemos crecer juntos"],
      icon: "TrendingUp",
    },
    {
      name: "Equity",
      tagline: "Alto potencial",
      description:
        "Trabajo significativo a cambio de participacion. Solo proyectos de alta conviccion. Nos involucramos a largo plazo. Traemos red, experiencia y recursos.",
      idealFor: ["Startups con potencial excepcional", "Mision alineada con nuestros valores"],
      icon: "PieChart",
    },
  ],

  projectsTitle: "Lo que Hemos Construido",
  projectsSubtitle: "Proyectos reales con lecciones reales",
  projects: [
    {
      title: "Chak Control Center",
      desc: "Sistema integral de gestion empresarial para pequenas y medianas empresas. Dashboard, inventario, finanzas, CRM y reportes en una sola plataforma.",
      fullDesc:
        "Una solucion completa para PYMES que centraliza la operacion del negocio. Permite a los duenos visualizar en tiempo real el flujo de caja, el estado del inventario y el rendimiento de ventas por canal. Incluye modulos de automatizacion para alertas de stock bajo y reportes semanales automaticos via email.",
      lessons: "Alcance que crece sin control, la diferencia entre lo que los clientes dicen que quieren y lo que realmente usan.",
      status: "En desarrollo activo",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      tags: ["Dashboard", "SaaS"],
    },
    {
      title: "Raiz Capital",
      desc: "Plataforma fintech de impacto para conectar inversores con proyectos de agricultura regenerativa. Modelo de inversion con transparencia total.",
      fullDesc:
        "Plataforma de crowdfunding de equidad enfocada en el agro colombiano. Utilizamos IA para analizar el riesgo de los cultivos basandonos en datos historicos climaticos y de mercado, ofreciendo a los inversores una proyeccion mas clara y a los agricultores acceso a capital justo.",
      lessons: "Validar el mercado antes de construir, estructuras financieras para impacto, timing de mercado.",
      status: "Proyecto en pausa",
      image:
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
      tags: ["Fintech", "Impact"],
    },
    {
      title: "Munayki",
      desc: "Integracion de IA para practica de bienestar holistico. Chatbot, agendamiento y seguimiento de clientes.",
      fullDesc:
        "Un asistente virtual empatico disenado para terapeutas y centros de bienestar. Munayki no solo agenda citas, sino que realiza un triaje previo basico para entender el estado de animo del cliente y preparar al terapeuta antes de la sesion, respetando siempre la privacidad de datos.",
      lessons: "Rocky lidera este proyecto",
      status: "En desarrollo",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
      tags: ["Wellness", "AI Chatbot"],
    },
    {
      title: "Rocky's AI Mentor",
      desc: "Aplicacion de mentoria personalizada potenciada por IA para guiar el aprendizaje de desarrollo y tecnologia.",
      fullDesc:
        "Un tutor de programacion personalizado que adapta su estilo de ensenanza a la edad y nivel del estudiante. A diferencia de ChatGPT generico, este mentor mantiene el contexto de lecciones pasadas, propone ejercicios basados en los intereses del alumno (ej: futbol, videojuegos) y celebra los logros.",
      lessons: "Proyecto personal de Rocky",
      status: "Beta cerrada",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      tags: ["EdTech", "LLMs"],
    },
    {
      title: "cultivoai.co",
      desc: "Este mismo sitio. Next.js, chatbot IA integrado, sistema bilingue, captura de leads automatizada.",
      fullDesc:
        "Nuestra carta de presentacion digital. Construida con tecnologias modernas para ser extremadamente rapida y accesible. Integra un sistema de captura de leads que califica automaticamente a los prospectos y notifica a nuestro equipo solo cuando hay una oportunidad real de colaboracion.",
      lessons: "Codigo abierto",
      status: "Vivo",
      image:
        "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
      tags: ["Open Source", "Next.js"],
    },
  ],

  storiesTitle: "Ejemplos Reales",
  storiesSubtitle: "Como hemos ayudado a negocios como el tuyo",
  stories: [
    {
      company: "Tienda Online",
      industry: "E-commerce",
      before:
        "Pasaban 3 horas diarias copiando pedidos de WhatsApp a Excel, actualizando inventario manualmente y enviando confirmaciones.",
      after:
        "El proceso que tomaba 3 horas ahora toma 0. Los pedidos y el inventario se actualizan solos.",
      quote: "Ahora uso esas 3 horas para buscar nuevos productos.",
      author: "Duena de tienda",
      imageUrl:
        "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=800&auto=format&fit=crop",
      metric: "21 horas/semana recuperadas",
    },
    {
      company: "Centro de Terapia",
      industry: "Salud",
      before:
        "Perdia consultas porque no podia responder WhatsApp mientras estaba en sesion. Los clientes buscaban otro.",
      after:
        "40% mas consultas agendadas. El terapeuta responde mensajes con calma al final del dia.",
      quote: "El chatbot agenda citas mientras yo atiendo pacientes.",
      author: "Terapeuta",
      imageUrl:
        "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=800&auto=format&fit=crop",
      metric: "+40% consultas agendadas",
    },
    {
      company: "Negocio Multicanal",
      industry: "Retail",
      before:
        "Ventas en 3 canales diferentes y nunca sabia realmente cuanto estaba ganando hasta fin de mes.",
      after:
        "Por primera vez, ve el estado del negocio al dia. Descubrio productos que perdian dinero.",
      quote: "Descubri que un producto que pensaba rentable perdia dinero por envio.",
      author: "Dueno de negocio",
      imageUrl:
        "https://images.unsplash.com/photo-1543286386-713df548e9cc?q=80&w=800&auto=format&fit=crop",
      metric: "Visibilidad en tiempo real",
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
      {
        icon: "Hammer",
        title: "APRENDER HACIENDO",
        description:
          "No esperamos a saber todo. Construimos, aprendemos, mejoramos. Cada proyecto es una leccion.",
      },
      {
        icon: "Scale",
        title: "INTEGRAR, NO FRAGMENTAR",
        description:
          "Conectamos lo que ya tienes. No reinventamos la rueda ni creamos dependencias innecesarias.",
      },
      {
        icon: "Mountain",
        title: "CONSTRUIR PARA EL LARGO PLAZO",
        description:
          "Pensamos en 5 anos, no en 5 meses. Las decisiones de hoy deben hacer sentido manana.",
      },
    ],
  },

  mission: {
    title: "Nuestra Mision",
    statement: [
      "No solo estamos construyendo un negocio.",
      "Estamos documentando como un padre le ensena a su hijo a construir desde cero.",
      "Compartimos lo que funciona. Ayudamos a proyectos de impacto a integrar IA.",
      "Creamos valor en cada paso.",
      "Y esperamos inspirar a otras familias y jovenes a hacer lo mismo.",
    ],
    tagline: "Win-win. Siempre.",
  },

  whatHappensNext: {
    title: "Que pasa despues de contactarnos?",
    subtitle: "Asi de simple. Sin sorpresas.",
    steps: [
      {
        number: "1",
        title: "Te respondemos en menos de 24 horas",
        description:
          "Usualmente mucho mas rapido. Somos dos personas, no un equipo de soporte con tickets.",
      },
      {
        number: "2",
        title: "Conversacion inicial - 15 a 30 minutos",
        description:
          "Por videollamada o WhatsApp, lo que prefieras. Queremos entender tu situacion real, no venderte algo.",
      },
      {
        number: "3",
        title: "Te decimos honestamente si podemos ayudar",
        description:
          "Si no somos el fit correcto, te lo decimos. Si conocemos a alguien mejor para tu caso, te referimos.",
      },
      {
        number: "4",
        title: "Propuesta clara",
        description:
          "Si seguimos adelante, recibes un documento con: exactamente que vamos a hacer, cuanto cuesta y por que, cuanto tiempo tomara, y que necesitamos de ti.",
      },
      {
        number: "5",
        title: "Tu decides",
        description:
          "Sin presion. Sin tacticas de 'este precio solo vale hoy'. Tomate el tiempo que necesites.",
      },
    ],
    cta: "Empecemos la conversacion",
    ctaButton: "Hablemos",
  },

  footer: {
    cta: "Tu proyecto puede ser el siguiente. Que podemos construir juntos?",
    ctaButton: "Hablemos",
    copyright: "2025 Cultivo AI. Hecho con carino por Paul y Rocky desde Colombia.",
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
      { label: "Demos", href: "#demos" },
      { label: "Semilla", href: "#semilla" },
      { label: "Alianzas", href: "#partnerships" },
      { label: "Proyectos", href: "#projects" },
      { label: "Historias", href: "#stories" },
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
      "Hola! Soy el asistente de CultivoAI. Puedo ayudarte a conocer nuestros servicios, mostrarte proyectos, o conectarte con Paul y Rocky. En que puedo ayudarte?",
    contextualGreetings: {
      general:
        "Hola! Soy el asistente de CultivoAI. Puedo ayudarte a conocer nuestros servicios, mostrarte proyectos, o conectarte con Paul y Rocky. Que te trae por aqui hoy?",
      booking:
        "Hola! Veo que quieres agendar tiempo con Paul. Me encantaria ayudarte! Primero, como te llamas? Y cuentame un poco sobre lo que te gustaria discutir.",
      story:
        "Hola! Te cuento sobre nuestra historia. Somos Paul y Rocky, padre e hijo trabajando juntos desde Colombia. Paul trae anos de experiencia en startups y tecnologia, y Rocky esta aprendiendo en tiempo real a sus 14 anos. Que te gustaria saber? Y por cierto, como te llamas?",
      semilla:
        "Hey! Aqui Rocky (bueno, la version IA). Me alegra que te interese el Fondo Semilla! Es mi proyecto para ayudar con cosas pequenas mientras aprendo. Como te llamas? Y cuentame que tienes en mente!",
      service:
        "Hola! Veo que te interesa {service}. Excelente eleccion! Como te llamas? Y cuentame sobre tu situacion actual - que problema quieres resolver?",
      partnership:
        "Hola! Te interesa saber mas sobre nuestro modelo de {partnership}. Cada proyecto es diferente! Como te llamas? Y cuentame sobre tu proyecto para explorar las mejores opciones.",
      qualification:
        "Hola! Veamos si somos el fit correcto para trabajar juntos. Como te llamas? Y cuentame sobre tu negocio y que estas buscando lograr.",
      impact:
        "Hola! Hice clic en 'Propósito antes que beneficio' Estoy interesado en aprender sobre cómo pueden ayudar.",
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
      "Automatizacion de flujos",
      "Chatbot / Asistente IA",
      "Inteligencia de negocios",
      "Contenido y marketing",
      "Sitio web con IA",
      "Asesoria startup",
      "Fondo Semilla (proyectos pequenos)",
      "No estoy seguro - necesito orientacion",
      "Otro",
    ],
    descriptionLabel: "Cuentanos brevemente sobre tu proyecto",
    descriptionPlaceholder: "Que problema quieres resolver? Que resultado esperas?",
    submitButton: "Enviar mensaje",
    chatPrompt: "Prefieres chatear? Nuestro asistente IA puede ayudarte!",
  },

  terminal: {
    welcomeLine1: "Ultimo acceso: ",
    welcomeLine2: "Suite de Automatizacion Cultivo AI v2.5.0",
    script: [
      { text: "cultivo start --mode=crecimiento", type: "command", delay: 800 },
      { text: "Inicializando nucleo neuronal v2.5.0...", type: "info", delay: 400 },
      { text: "Autenticando LinkedIn Sales Navigator...", type: "info", delay: 300 },
      { text: "Conectado a LinkedIn Secure Gateway", type: "success", delay: 200 },
      { text: "Conectado a HubSpot CRM", type: "success", delay: 600 },
      { text: "Motor de crecimiento activo. Buscando prospectos...", type: "info", delay: 2000 },
      { text: "Prospecto detectado: Sofia R. (CMO @ TechFlow)", type: "event", delay: 600 },
      { text: "Fuente: LinkedIn | Ubicacion: Bogota", type: "info", delay: 1000, className: "text-slate-400 pl-6" },
      { text: "Analizando perfil y actividad...", type: "info", delay: 1000 },
      { text: "Insight: Alta intencion. Publico sobre 'Automatizacion IA'", type: "ai", delay: 800 },
      { text: "Generando mensaje personalizado...", type: "command", delay: 1000 },
      { text: 'Borrador: "Hola Sofia, vi tu post sobre IA..."', type: "info", delay: 800, className: "text-slate-400 italic pl-6" },
      { text: "Accion: Solicitud de conexion enviada", type: "success", delay: 800, className: "text-emerald-300" },
      { text: "Sincronizando prospecto con HubSpot...", type: "command", delay: 600 },
      { text: "Prospecto creado exitosamente: ID #8842", type: "success", delay: 4000 },
    ],
  },
};
