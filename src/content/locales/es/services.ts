import type { SiteContent } from "../../types";

export const esServicesContent: Pick<SiteContent, "servicesTitle" | "servicesSubtitle" | "services"> = {
  servicesTitle: "Nuestros Servicios",
  servicesSubtitle:
    "No vendemos humo. Construimos sistemas prácticos que hacen más fácil ejecutar buen trabajo. ¿No sabes por dónde empezar? Una llamada de 15 minutos es suficiente.",
  services: [
    {
      icon: "Brain",
      title: "Cerebro de Empresa: Capa de Conocimiento Protegida",
      eng: "Company Brain: Protected Knowledge Layer",
      description: "La capa de conocimiento para tu IP científica y operativa. Protocolos, procesos y datos de campo se convierten en un solo cerebro estructurado y consultable, con la capa de conocimiento aislada de la capa de ejecución para que tu IP quede protegida y con acceso por rol. Listo para IoT, satélite, datos de laboratorio y campo, MRV y carbono.",
      details: [
        "Protege la IP de tus protocolos. Tu know-how se vuelve una capa de conocimiento estructurada y versionada, no PDFs sueltos ni la cabeza de las personas.",
        "La capa de conocimiento está aislada de la capa de ejecución. Lo que el sistema sabe se limita por tenant, proyecto y rol, para que nada se filtre entre ellos.",
        "Acceso por rol: el técnico de laboratorio ve protocolos, el equipo comercial ve clientes y propuestas, el director ve todo. Nadie ve lo que no le corresponde.",
        "Evidencia científica estructurada, construida para escalar de 400 documentos a decenas de miles, y lista para ingerir datos de IoT, satélite, laboratorio y campo para MRV y carbono.",
        "Privacidad por diseño: corre localmente cuando hace falta. Ningún documento tuyo sale de tu sistema al indexar.",
      ],
      imageUrl: "/landing/photos/services/ai-assistants.png",
      animationKey: "company-brain",
      modal: {
        whatItMeans:
          "Una capa de conocimiento protegida construida sobre tu IP científica y operativa real: protocolos, procesos, historial de proyectos, datos comerciales. Tu equipo pregunta en lenguaje natural y el cerebro responde con lo que tu negocio ya sabe, limitado a su rol.",
        whyItMatters:
          "La IP de tus protocolos es tu ventaja, y hoy está atrapada en PDFs, en la cabeza de personas clave, en WhatsApp. Cuando alguien no está disponible se pierde, cuando llega alguien nuevo empieza desde cero, y sin aislamiento se filtra entre roles y clientes. El Company Brain que construimos para una plataforma de producción agri-biotech en Colombia resolvió exactamente esto y sigue aprendiendo cada día que el equipo lo usa.",
        whatsIncluded: [
          "Ingesta de tu IP real: protocolos, procesos, comercial, proyectos (PDF, Word, Excel)",
          "Capa de conocimiento aislada de la capa de ejecución, limitada por tenant, proyecto y rol",
          "Acceso por rol: cada persona llega a su dominio, nada más",
          "Listo para IoT, satélite, datos de laboratorio y campo, MRV y carbono",
          "Privacidad por diseño: corre localmente, sin dependencia de la nube para indexar",
        ],
        idealFit: [
          "Laboratorios y equipos agritech cuya IP de protocolos es el activo central",
          "Organizaciones donde cada rol necesita contexto científico y comercial distinto sin cruzar líneas",
          "Equipos que necesitan que su know-how se quede en la empresa cuando las personas se van",
        ],
        typicalOutcome:
          "Tu IP de protocolos queda protegida, estructurada y consultable. El equipo deja de buscar en archivos y de esperar a la única persona que sabe. Las respuestas llegan en segundos, limitadas a cada rol, y el know-how se queda cuando las personas se van.",
      },
    },
    {
      icon: "BarChart3",
      title: "Sistemas de Decisión y Automatización",
      eng: "Decision and Automation Systems",
      description: "La capa de ejecución que corre sobre tu conocimiento. Dashboards, automatizaciones y asistentes que convierten tus datos y protocolos en decisiones diarias y operaciones sin intervención manual.",
      details: [
        "Dashboards de decisión: datos de campo, laboratorio y comercial en una sola vista en vivo, para actuar sobre las señales temprano en vez de esperar al cierre de mes.",
        "Automatizaciones que quitan trabajo repetitivo: acogida, onboarding, reportes y transiciones que corren sin que alguien los persiga.",
        "Asistentes de IA entrenados con tu negocio: responden, califican, agendan y enrutan en WhatsApp, email y web.",
      ],
      imageUrl: "/landing/photos/services/decision-dashboards.jpg",
      animationKey: "dashboards",
      modal: {
        whatItMeans:
          "Los sistemas de trabajo que se apoyan sobre tu capa de conocimiento: dashboards para ver, automatizaciones para ejecutar y asistentes para responder. Todo construido sobre lo que tu negocio ya sabe.",
        whyItMatters:
          "Un cerebro protegido es solo la mitad del valor. La otra mitad es actuar sobre él cada día sin sumar personal. Aquí es donde el conocimiento se convierte en decisiones más rápidas y menos cosas que se caen.",
        whatsIncluded: [
          "Definición de KPIs y señales: qué observar y por qué",
          "Consolidación de datos desde hojas de cálculo, bases de datos, sensores y CRMs en una sola vista en vivo",
          "Automatización de flujos clave: acogida, onboarding, reportes, seguimiento",
          "Asistentes de IA para soporte, calificación, agenda y cotizaciones",
          "Integraciones con WhatsApp, email y calendarios, con una ventana corta de iteración tras el lanzamiento",
        ],
        idealFit: [
          "Equipos cuyos datos están repartidos entre herramientas, archivos y dispositivos de campo",
          "Operaciones con pasos manuales repetitivos que siguen sacando a la gente del trabajo real",
          "Quieres actuar sobre lo que sabes a diario, no reconciliarlo cada mes",
        ],
        typicalOutcome:
          "Una sola vista en vivo de la operación, flujos clave corriendo solos y respuestas más rápidas para clientes y equipo. Menos tareas manuales, decisiones más tempranas.",
      },
    },
    {
      icon: "Rocket",
      title: "Desarrollos de IA y Software a Medida",
      eng: "Custom AI and Software Builds",
      description: "De la idea a la primera versión. Herramientas de IA, agentes y software a medida, construidos para cómo funciona tu operación de verdad, con guía honesta sobre qué construir y qué dejar fuera.",
      details: [
        "Herramientas y software interno a medida: apps para productores, herramientas de laboratorio, portales de clientes, agentes internos.",
        "Sitios web modernos y rápidos y experiencias digitales que apoyan confianza, conversión y seguimiento.",
        "Validación técnica y de mercado: el stack correcto, escalable desde el día uno, sin sobreconstruir.",
      ],
      imageUrl: "/landing/photos/services/websites-digital-experiences.webp",
      animationKey: "software-web",
      modal: {
        whatItMeans:
          "El socio de construcción para innovadores que necesitan herramientas reales, no slides. Diseñamos y lanzamos el software, los agentes y las experiencias web a medida que tu operación necesita, y te decimos claro qué construir ahora y qué después.",
        whyItMatters:
          "La mayoría de los equipos agritech y biotech no tienen un fundador técnico en la sala. Ese vacío cuesta meses y vueltas incorrectas. Esta es esa persona: alguien que ha construido y lanzado productos reales, decidiendo qué importa y construyéndolo contigo.",
        whatsIncluded: [
          "Alcance y ruta: qué construir ahora y qué después",
          "Software a medida, herramientas internas y agentes de IA construidos alrededor de tus flujos",
          "Sitios web modernos y experiencias digitales enfocadas en performance y conversión",
          "Decisiones técnicas y de stack que se mantienen defendibles a medida que creces",
          "Un plan de lanzamiento, analítica básica y una ventana corta de iteración tras el lanzamiento",
        ],
        idealFit: [
          "Equipos agritech y biotech en etapa temprana construyendo algo real",
          "Fundadores sin socio técnico que necesitan claridad e impulso",
          "Quieres herramientas construidas para tu operación, no soluciones genéricas que encajan a medias",
        ],
        typicalOutcome:
          "Una primera versión que sí puedes lanzar y de la que aprender, construida sobre decisiones técnicas defendibles, con menos vueltas incorrectas y menos presupuesto desperdiciado.",
      },
    },
    {
      icon: "CalendarCheck",
      title: "Sistemas para Retiros (Bienestar)",
      eng: "Retreat Ops Systems (Wellness)",
      description:
        "Nuestra línea de bienestar. Un sistema operativo completo para retiros: desde la primera reserva hasta el seguimiento final, con flujos claros para el equipo y una experiencia fluida para los huéspedes.",
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
          "Nuestra línea de bienestar: un sistema de operación para retiros. Reservas, pagos, mensajería, itinerarios, checklists, feedback, seguimiento, dashboards.",
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
  ],
};
