import type { SiteContent } from "../../types";

export const esClosingSectionsContent: Pick<
  SiteContent,
  "values" | "mission" | "whatHappensNext" | "footer" | "chat" | "contactForm" | "terminal"
> = {
  values: {
    title: "Nuestros Valores",
    subtitle: "Lo que no cambia sin importar el proyecto",
    values: [
      {
        icon: "Sprout",
        title: "CULTIVAR, NO EXTRAER",
        description:
          "Construimos para el largo plazo. Preferimos relaciones que crecen sobre transacciones rápidas. Si el próximo año no hay nada que mejorar, algo salió mal.",
      },
      {
        icon: "Scale",
        title: "HONESTIDAD ANTES QUE VENTAS",
        description:
          "Si no somos el fit correcto, lo decimos. Si hay una solución más simple y barata, la proponemos. No construimos lo que no necesitas.",
      },
      {
        icon: "Hammer",
        title: "EL PROCESO ES EL PRODUCTO",
        description:
          "Un sistema útil requiere descubrimiento real, primeras versiones que fallan y decisiones honestas. No existe la solución mágica de dos semanas. Pero sí existe una primera versión sólida que se puede mejorar.",
      },
    ],
  },

  mission: {
    title: "Por Qué Existimos",
    statement: [
      "Construimos para equipos que hacen trabajo social y ambiental real: agritech, biotech, restauración, la ciencia que de verdad mueve la aguja.",
      "Lo difícil es proteger la IP y convertir los datos de laboratorio y campo en decisiones. Eso es lo que construimos, bien hecho, para quienes construyen algo que importa.",
      "Mientras mejor construimos, más lejos llega el impacto.",
    ],
    tagline: "No somos neutrales en lo que construimos",
  },

  whatHappensNext: {
    title: "¿Qué pasa después de contactarnos?",
    subtitle: "Así de simple. Sin sorpresas.",
    steps: [
      {
        number: "1",
        title: "Respondemos rápido",
        description: "Recibes respuesta directa y un siguiente paso claro.",
      },
      {
        number: "2",
        title: "Si hay fit, hacemos una charla de 15 minutos",
        description: "Mapeamos el cuello de botella real y proponemos el siguiente paso más útil.",
      },
      {
        number: "3",
        title: "Construimos versión uno e iteramos",
        description: "Luego mejoramos contigo en base a uso real.",
      },
    ],
    cta: "Empecemos la conversación",
    ctaButton: "Hablemos",
  },

  footer: {
    cta: "Cuéntanos qué estás intentando construir de verdad.",
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
      location: "Medellín, Colombia",
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
    quickLinksTitle: "Navegación",
    contactTitle: "Contacto",
    socialTitle: "Síguenos",
  },

  chat: {
    title: "Asistente CultivoAI",
    placeholder: "Escribe tu mensaje...",
    sendButton: "Enviar",
    welcomeMessage:
      "¡Hola! Soy el asistente de CultivoAI. ¿En qué te puedo ayudar?",
    contextualGreetings: {
      general:
        "¡Hola! Soy el asistente de CultivoAI. ¿En qué te puedo ayudar?",
      booking:
        "Genial. Podemos agendar una llamada de 15 minutos con Paul. Cuéntame un poco en qué estás trabajando y lo dejo listo.",
      story:
        "Paul es un fundador técnico que ha lanzado productos a más de 70 países y construyó CHAK Brain solo. Equipo pequeño y senior, trabajo directo, sin handoffs. ¿Qué te gustaría saber?",
      service:
        "Genial, te interesa {service}. Con gusto te lo explico. ¿Qué te gustaría saber?",
      partnership:
        "Me alegra que te interese una alianza con CultivoAI. Cuéntame un poco qué tienes en mente y seguimos desde ahí.",
      qualification:
        "Con gusto vemos si hay fit. Cuéntame un poco qué estás construyendo.",
      impact:
        "Me encanta que te interese el trabajo con propósito. Cuéntame qué estás construyendo y te ayudo en lo que pueda.",
      formFallback: "¿Prefieres una llamada rápida con Paul? Deja tus datos.",
    },
  },

  contactForm: {
    title: "Agenda una charla de 15 minutos",
    subtitle: "Comparte lo básico y llegamos preparados.",
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    whatsappLabel: "WhatsApp (opcional)",
    whatsappPlaceholder: "+57 300 123 4567",
    projectTypeLabel: "¿Qué tipo de proyecto tienes en mente?",
    projectTypes: [
      "Company Brain / capa de conocimiento protegida",
      "Plataforma de datos agritech",
      "Optimización de flujos",
      "Chatbot / Asistente IA",
      "Dashboard de decisión",
      "Sistema de conocimiento y contenido",
      "Software / Sitio web",
      "Asesoría startup",
      "No estoy seguro, necesito orientación",
      "Otro",
    ],
    descriptionLabel: "Cuéntanos brevemente sobre tu proyecto",
    descriptionPlaceholder: "¿Qué problema quieres resolver? ¿Qué resultado esperas?",
    submitButton: "Solicitar charla de 15 minutos",
    chatPrompt: "¿Prefieres empezar por chat? Usa el asistente.",
  },

  terminal: {
    sectionTitle: "Así trabajamos",
    summary: "Sin caos. Alcance claro. Versión uno rápida. Iteración directa.",
    welcomeLine1: "Último acceso: ",
    welcomeLine2: "Suite de Automatización Cultivo AI v2.5.0",
    script: [
      { text: "Iniciando descubrimiento...", type: "command", delay: 800 },
      { text: "Mapeando tus protocolos...", type: "info", delay: 600 },
      { text: "Aislando la capa de IP...", type: "info", delay: 700 },
      { text: "Diseñando acceso por rol...", type: "ai", delay: 700 },
      { text: "Estructurando datos de laboratorio y campo...", type: "command", delay: 700 },
      { text: "Construyendo la capa de conocimiento...", type: "info", delay: 700 },
      { text: "Lanzando y probando...", type: "success", delay: 700 },
      { text: "Midiendo resultados...", type: "event", delay: 700 },
      { text: "Iterando con tu equipo...", type: "success", delay: 2500 },
    ],
  },
};
