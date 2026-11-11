import type { SiteContent } from "../../types";

export const esServicesContent: Pick<
  SiteContent,
  "servicesTitle" | "servicesTagline" | "servicesSubtitle" | "services"
> = {
  servicesTitle: "Qué construyo",
  servicesTagline:
    "La tecnología detrás de los buenos proyectos, desde la primera idea hasta la prueba de que funciona.",
  servicesSubtitle:
    "Sin humo. Construyo sistemas prácticos que ayudan a los buenos proyectos a funcionar bien. ¿No sabes por dónde empezar? Quince minutos bastan.",
  services: [
    {
      icon: "Monitor",
      title: "Software y plataformas",
      eng: "Software and platforms",
      description:
        "Sitios web, apps y herramientas internas, bien hechas y rápido. Una primera versión en semanas, que luego mejora con el uso real.",
      details: [
        "Sitios web que explican tu proyecto con claridad y generan confianza.",
        "Apps y herramientas internas hechas para cómo trabaja tu equipo de verdad.",
        "Primera versión en semanas, que luego mejora con el uso real.",
      ],
      imageUrl: "/landing/photos/services/websites-digital-experiences.webp",
      animationKey: "software-web",
      modal: {
        whatItMeans:
          "Diseño y construyo el software que tu proyecto necesita: sitios web, apps, herramientas de campo, portales para clientes y herramientas internas. Te digo claro qué construir ahora y qué puede esperar.",
        whyItMatters:
          "La mayoría de los buenos proyectos no tienen un fundador técnico en la mesa. Ese vacío cuesta meses y caminos equivocados. He cofundado y construido startups, así que puedo tomar las decisiones técnicas y construir contigo.",
        whatsIncluded: [
          "Alcance y hoja de ruta: qué construir ahora y qué después",
          "Sitios web, apps y herramientas internas hechas alrededor de tus flujos de trabajo",
          "Decisiones técnicas que se sostienen a medida que creces",
          "Lanzamiento, analítica básica y un periodo corto de mejoras después del lanzamiento",
        ],
        idealFit: [
          "Proyectos que necesitan herramientas reales, no presentaciones",
          "Fundadores sin socio técnico que necesitan claridad y avance",
          "Equipos que quieren herramientas hechas para su trabajo, no software genérico que encaja a medias",
        ],
        typicalOutcome:
          "Una primera versión que puedes lanzar y de la que puedes aprender, construida sobre decisiones técnicas sólidas, con menos desvíos y menos presupuesto perdido.",
      },
    },
    {
      icon: "Layers",
      title: "Sistemas de datos, conocimiento e IA",
      eng: "Data, knowledge and AI systems",
      description:
        "Un solo lugar para tu conocimiento, tus datos y tus decisiones. Protocolos protegidos, datos de campo y laboratorio ordenados, e IA donde de verdad ayuda.",
      details: [
        "Tu conocimiento en un solo lugar protegido y fácil de consultar, con acceso por rol.",
        "Datos de campo, laboratorio y sensores ordenados en vistas para decidir.",
        "Automatizaciones y asistentes donde ahorran tiempo real. IA solo donde ayuda.",
      ],
      imageUrl: "/landing/photos/services/ai-assistants.png",
      animationKey: "company-brain",
      modal: {
        whatItMeans:
          "Una capa protegida de conocimiento y datos construida sobre lo que tu proyecto de verdad sabe: protocolos, procesos, datos de campo y laboratorio, historia. Encima, los dashboards, automatizaciones y asistentes que lo convierten en decisiones diarias.",
        whyItMatters:
          "Tu conocimiento suele ser tu activo más valioso, y hoy vive en PDFs, en la cabeza de las personas y en WhatsApp. Cuando alguien se va, se va con esa persona. Construí exactamente esta capa para un proyecto de biotecnología y agricultura vertical, y se vuelve más útil cada día que el equipo la usa.",
        whatsIncluded: [
          "Tus protocolos, procesos y documentos convertidos en una capa de conocimiento ordenada y versionada",
          "Acceso por rol: cada persona ve lo que necesita, nada más",
          "Datos de campo, laboratorio, sensores y satélite en una sola vista en vivo",
          "Automatizaciones y asistentes de IA para el trabajo repetitivo",
          "Privacidad desde el diseño: corre en tu propia infraestructura cuando hace falta",
        ],
        idealFit: [
          "Equipos cuyos protocolos o conocimiento son el activo central",
          "Proyectos con datos dispersos entre archivos, herramientas y equipos de campo",
          "Equipos que quieren que su conocimiento se quede cuando las personas se van",
        ],
        typicalOutcome:
          "Tu conocimiento queda protegido y fácil de encontrar, tus datos se convierten en decisiones, y el equipo deja de esperar a la única persona que sabe.",
      },
    },
    {
      icon: "BarChart3",
      title: "Pruebas y registros",
      eng: "Proof and records",
      description:
        "Financiadores, compradores y socios quieren evidencia. Construyo el registro que muestra lo que hiciste y que funcionó: seguimiento de impacto, MRV para carbono y biochar, datos de restauración y supervivencia, un solo historial auditable.",
      details: [
        "Seguimiento de impacto en el que financiadores y socios pueden confiar.",
        "MRV para carbono y biochar, datos de restauración y supervivencia.",
        "Un solo historial auditable de lo que hiciste y lo que lograste.",
      ],
      imageUrl: "/landing/photos/services/decision-dashboards.jpg",
      animationKey: "dashboards",
      modal: {
        whatItMeans:
          "Un sistema que registra lo que tu proyecto hace en el terreno y lo que logra, de una forma que financiadores, compradores, certificadores y socios pueden verificar.",
        whyItMatters:
          "Un buen trabajo que no se puede demostrar es difícil de financiar y de vender. Compradores de carbono, inversores de impacto y fondos piden evidencia. Un registro limpio y auditable convierte tu trabajo en algo a lo que pueden decir que sí.",
        whatsIncluded: [
          "Definición de qué medir y por qué, según quién lo va a leer",
          "Captura de datos de campo: parcelas, siembras, supervivencia, suelo, fotos, GPS",
          "Flujos de MRV para carbono y biochar",
          "Reportes y dashboards para financiadores, compradores y socios",
          "Un solo historial auditable, listo para verificación",
        ],
        idealFit: [
          "Proyectos de restauración, agricultura regenerativa, biochar y carbono",
          "Equipos que reportan a financiadores, compradores o certificadores",
          "Proyectos que tienen que demostrar que la tierra se está recuperando",
        ],
        typicalOutcome:
          "Evidencia que puedes entregar a un financiador o comprador con confianza, y mucho menos tiempo armando reportes a mano.",
      },
    },
    {
      icon: "Rocket",
      title: "Preparación para startups e inversión",
      eng: "Startup and investment readiness",
      description:
        "He estado en la silla del cofundador. Te ayudo a darle forma al modelo, los números y la historia para que inversores y financiadores puedan decir que sí.",
      details: [
        "Un modelo de negocio que aguanta preguntas difíciles.",
        "Números que inversores y financiadores pueden seguir.",
        "Una historia clara, una presentación y el plan técnico que la respalda.",
      ],
      imageUrl: "/landing/photos/services/startup-advisory.png",
      animationKey: "startup",
      modal: {
        whatItMeans:
          "Ayuda práctica para preparar tu proyecto ante inversores, financiadores y socios: el modelo, los números, la historia y el plan técnico que lo respalda.",
        whyItMatters:
          "Muchos buenos proyectos se frenan porque la idea es fuerte pero el caso para invertir no lo es. He cofundado y construido startups, así que conozco las preguntas que hacen los inversores y cómo responderlas con honestidad.",
        whatsIncluded: [
          "Revisión del modelo de negocio y la lógica de ingresos",
          "Modelo financiero y números clave",
          "Historia y presentación para inversores",
          "Plan técnico y hoja de ruta con costos",
          "Presentaciones a través de mi red cuando el encaje es bueno",
        ],
        idealFit: [
          "Fundadores que se preparan para levantar capital o aplicar a financiación",
          "Proyectos con impacto fuerte que necesitan un caso de negocio más fuerte",
          "Equipos que quieren la mirada de un cofundador con experiencia sin contratar uno",
        ],
        typicalOutcome:
          "Un modelo, unos números y una historia que se sostienen frente a inversores y financiadores, y un plan claro de lo que va a construir el dinero.",
      },
    },
  ],
};
