import type { SiteContent } from "../../types";

export const esClosingSectionsContent: Pick<
  SiteContent,
  "values" | "whatHappensNext" | "footer" | "chat" | "contactForm" | "terminal"
> = {
  values: {
    title: "Cómo trabajo",
    subtitle: "Lo que no cambia, sea cual sea el proyecto.",
    values: [
      {
        icon: "HeartHandshake",
        title: "AYNI",
        description:
          "Una palabra andina para la reciprocidad. Yo te ayudo, tú me ayudas, y toda la comunidad se fortalece. Cada acuerdo que acepto tiene que ser bueno para todos.",
      },
      {
        icon: "Sprout",
        title: "CULTIVAR, NO EXTRAER",
        description:
          "Relaciones largas antes que transacciones rápidas. Bueno para la tierra y para la gente que la habita.",
      },
      {
        icon: "Scale",
        title: "HONESTIDAD ANTES QUE VENTAS",
        description:
          "Si no soy la persona indicada, te lo digo. Si hay una forma más simple y barata, te la propongo.",
      },
      {
        icon: "Hammer",
        title: "LAS MANOS EN LA TIERRA",
        description:
          "No te paso a un equipo junior. Lo diseño, lo construyo y voy al terreno. Primera versión rápido, y luego mejor con el uso real.",
      },
    ],
    closing: "No soy neutral sobre lo que construyo.",
  },

  whatHappensNext: {
    title: "¿Qué pasa cuando me escribes?",
    subtitle: "Simple. Sin sorpresas.",
    steps: [
      {
        number: "1",
        title: "Respondo rápido",
        description: "Una respuesta directa y un siguiente paso claro.",
      },
      {
        number: "2",
        title: "Si hay encaje, hablamos 15 minutos",
        description: "Encontramos el cuello de botella real y el paso útil más pequeño.",
      },
      {
        number: "3",
        title: "Si hace falta un plan, hago un Sprint de descubrimiento",
        description: "De dos a cuatro semanas, y un plan costeado que es tuyo.",
      },
      {
        number: "4",
        title: "Construyo la primera versión y la mejoramos juntos",
        description: "",
      },
    ],
    cta: "Empecemos la conversación",
    ctaButton: "Hablemos",
  },

  footer: {
    cta: "¿Qué estás construyendo?",
    ctaButton: "Hablemos",
    copyright:
      "Cultivo Labs. Tecnología para proyectos que cuidan la tierra, las personas y las comunidades. Desde Colombia, para el mundo.",
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
      whatsapp: "+573106172607",
      whatsappDisplay: "+57 310 617 2607",
      location: "Medellín, Colombia",
      locationSecondary: "Worldwide",
    },
    quickLinks: [
      { label: "Inicio", href: "#hero" },
      { label: "Qué construyo", href: "#services" },
      { label: "Con quién trabajo", href: "#who-we-help" },
      { label: "Semillero", href: "#semillero" },
      { label: "Proyectos", href: "#projects" },
      { label: "Quiénes somos", href: "#about" },
      { label: "Formas de trabajar juntos", href: "#partnerships" },
    ],
    quickLinksTitle: "Navegación",
    contactTitle: "Contacto",
    socialTitle: "Sígueme",
  },

  chat: {
    title: "Asistente Cultivo Labs",
    placeholder: "Escribe tu mensaje...",
    sendButton: "Enviar",
    welcomeMessage:
      "¡Hola! Soy el asistente de Cultivo Labs. Cuéntame qué estás construyendo y te ayudo en lo que pueda.",
    contextualGreetings: {
      general:
        "¡Hola! Soy el asistente de Cultivo Labs. Cuéntame qué estás construyendo y te ayudo en lo que pueda.",
      booking:
        "Genial. Podemos agendar una llamada de 15 minutos con Paul. Cuéntame un poco en qué estás trabajando y lo dejo listo.",
      story:
        "Paul es un cofundador de startups que ha lanzado productos a más de 70 países y construyó solo toda la plataforma de un proyecto de biotecnología y agricultura vertical. Trabaja directo contigo, sin intermediarios. ¿Qué te gustaría saber?",
      service:
        "Genial, te interesa {service}. Con gusto te lo explico. ¿Qué te gustaría saber?",
      partnership:
        "Me alegra que te interese trabajar juntos. Cuéntame un poco qué tienes en mente, un proyecto o una innovación, y seguimos desde ahí.",
      qualification:
        "Con gusto vemos si hay encaje. Cuéntame un poco qué estás construyendo.",
      impact:
        "Me encanta que te interese el trabajo con propósito. Cuéntame qué estás construyendo y te ayudo en lo que pueda.",
      formFallback: "¿Prefieres una llamada rápida con Paul? Deja tus datos.",
    },
  },

  contactForm: {
    title: "Agenda una charla de 15 minutos",
    subtitle: "Comparte lo básico y llego preparado.",
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    whatsappLabel: "WhatsApp (opcional)",
    whatsappPlaceholder: "+57 300 123 4567",
    projectTypeLabel: "¿Qué tipo de proyecto tienes en mente?",
    projectTypes: [
      "Software o plataforma",
      "Sistema de datos, conocimiento o IA",
      "Pruebas, seguimiento de impacto o MRV",
      "Preparación para startup o inversión",
      "Semillero: tengo un proyecto",
      "Semillero: tengo una innovación",
      "No estoy seguro, necesito orientación",
      "Otro",
    ],
    descriptionLabel: "Cuéntame brevemente sobre tu proyecto",
    descriptionPlaceholder: "¿Qué estás construyendo? ¿Cómo se vería un buen resultado?",
    submitButton: "Solicitar charla de 15 minutos",
    chatPrompt: "¿Prefieres empezar por chat? Usa el asistente.",
  },

  terminal: {
    sectionTitle: "Así trabajo",
    summary: "Sin caos. Alcance claro. Primera versión rápida. Iteración directa.",
    welcomeLine1: "Último acceso: ",
    welcomeLine2: "Cultivo Labs v3.0.0",
    script: [
      { text: "Iniciando descubrimiento...", type: "command", delay: 800 },
      { text: "Entendiendo cómo funciona el proyecto...", type: "info", delay: 600 },
      { text: "Protegiendo lo que importa...", type: "info", delay: 700 },
      { text: "Diseñando acceso por rol...", type: "ai", delay: 700 },
      { text: "Ordenando datos de campo y laboratorio...", type: "command", delay: 700 },
      { text: "Construyendo la primera versión...", type: "info", delay: 700 },
      { text: "Lanzando y probando...", type: "success", delay: 700 },
      { text: "Midiendo resultados...", type: "event", delay: 700 },
      { text: "Mejorándolo juntos...", type: "success", delay: 2500 },
    ],
  },
};
