import type { SiteContent } from "../../types";

export const esServicesContent: Pick<SiteContent, "servicesTitle" | "servicesSubtitle" | "services"> = {
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
      animationKey: "workflow",
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
      icon: "Brain",
      title: "Cerebro de Empresa",
      eng: "Company Brain",
      description: "Todo lo que sabe tu empresa, disponible al instante. Sin app nueva. Sin capacitacion. Tu equipo solo habla.",
      details: [
        "Una capa de conocimiento sobre tus documentos, protocolos y proyectos, accesible por conversacion. Escala desde pocos archivos hasta decenas de miles.",
        "Agentes de fondo que optimizan el cerebro y aprenden con el tiempo.",
        "Agentes especializados por rol: operaciones, comercial, laboratorio, proyectos.",
        "Entregado donde tu equipo ya trabaja: Telegram, web o API.",
      ],
      imageUrl: "/landing/photos/services/ai-assistants.png",
      animationKey: "company-brain",
      modal: {
        whatItMeans:
          "Un cerebro de IA construido sobre el conocimiento real de tu empresa. Tu equipo hace preguntas, el cerebro responde con lo que tu negocio ya sabe.",
        whyItMatters:
          "El conocimiento de tu empresa existe. Esta en documentos, protocolos, decisiones y proyectos. El problema es que no es accesible. Cerebro de Empresa lo hace conversacional.",
        whatsIncluded: [
          "Una capa de conocimiento sobre tus documentos, protocolos y proyectos",
          "Agentes de fondo que aprenden y optimizan con el uso",
          "Agentes por rol: cada miembro del equipo tiene su acceso especializado",
          "Canal de entrega a tu medida: Telegram, web, API o lo que necesites",
          "Diseno a la medida de tu negocio, no una plantilla",
        ],
        idealFit: [
          "Equipos con conocimiento disperso que no se puede consultar rapido",
          "Negocios donde cada area necesita contexto diferente",
          "Organizaciones que quieren aprendizaje continuo, no una herramienta estatica",
        ],
        typicalOutcome:
          "El equipo deja de buscar en archivos. Las respuestas llegan en segundos, con el contexto correcto, desde el conocimiento real de la empresa.",
      },
    },
    {
      icon: "MessageSquare",
      title: "Asistentes IA",
      eng: "AI Assistants",
      description: "Asistentes utiles y con tono humano para clientes o equipos internos.",
      details: [
        "Un asistente de IA construido con el conocimiento real de tu negocio: servicios, procesos y tono.",
        "Pueden agendar citas, responder dudas tecnicas, cotizar servicios.",
        "Escalan casos complejos a humanos cuando sea necesario.",
      ],
      imageUrl: "/landing/photos/services/ai-assistants.png",
      animationKey: "ai-assistants",
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
        "Un sistema operativo completo para retiros: desde la primera reserva hasta el seguimiento final, con flujos claros para el equipo y una experiencia fluida para los huespedes.",
      details: [
        "Reservas, pagos, facturación",
        "Mensajería pre, durante, post retiro",
        "Itinerarios, checklists, roles",
        "Feedback, NPS, seguimiento",
        "Dashboard de ocupación, ingresos, satisfacción",
      ],
      imageUrl: "/landing/photos/services/health-wellness.jpg",
      animationKey: "retreat-ops",
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
        "Reunimos tus datos dispersos (hojas de calculo, bases de datos, CRMs) en un tablero visual claro.",
        "Implementamos metricas clave (KPIs) para la salud de tu negocio en tiempo real.",
        "Sin esperar al reporte de fin de mes.",
      ],
      imageUrl: "/landing/photos/services/decision-dashboards.jpg",
      animationKey: "dashboards",
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
      description: "Un sistema que convierte tu conocimiento en contenido consistente y publicable, sin el caos habitual.",
      details: [
        "Mapeamos lo que tu audiencia busca y construimos un sistema de contenido alrededor de eso.",
        "Los temas se eligen por demanda real, no por intuicion.",
        "Blog, redes sociales y newsletters manteniendo tu voz de marca.",
      ],
      imageUrl: "/landing/photos/services/knowledge-content-systems.jpg",
      imageFit: "contain",
      animationKey: "knowledge",
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
        "Busqueda inteligente y contenido que se adapta a cada visitante.",
        "Asistentes integrados que ayudan a los visitantes a dar el siguiente paso.",
      ],
      imageUrl: "/landing/photos/services/websites-digital-experiences.webp",
      animationKey: "software-web",
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
      imageFit: "contain",
      animationKey: "startup",
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
};
