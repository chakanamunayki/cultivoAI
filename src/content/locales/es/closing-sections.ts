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
      "La IA más útil raramente llega a quienes más la necesitan.",
      "Construimos para cambiar eso: precios accesibles, proyectos con misión, y una parte de lo que ganamos reinvertida en equipos que aún no pueden pagarnos.",
      "Mientras más construimos bien, más lejos llegamos.",
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
        title: "Mapeamos tu flujo y proponemos un plan simple",
        description: "Nos enfocamos en cambios prácticos que reducen fricción rápido.",
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
    cta: "Cuéntanos qué estás construyendo.",
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
      "¡Hola! Soy el asistente de CultivoAI. Puedo ayudarte a conocer servicios, mostrar proyectos o conectarte con el equipo. ¿En qué te ayudo?",
    contextualGreetings: {
      general:
        "¡Hola! Soy el asistente de CultivoAI. Puedo ayudarte a conocer servicios, mostrar proyectos o conectarte con el equipo. ¿Qué te trae por aquí hoy?",
      booking:
        "¡Hola! Veo que quieres agendar tiempo con Paul. ¡Me encantaría ayudarte! Primero, ¿cómo te llamas? Y cuéntame un poco sobre lo que te gustaría discutir.",
      story:
        "¡Hola! Puedes conocer mejor nuestra historia en la sección Nosotros. ¿Qué te gustaría saber? Y por cierto, ¿cómo te llamas?",
      semilla:
        "¡Hey! Aquí Rocky (bueno, la versión IA). ¡Me alegra que te interese el Fondo Semilla! Es mi proyecto para ayudar con cosas pequeñas mientras aprendo. ¿Cómo te llamas? ¡Y cuéntame qué tienes en mente!",
      service:
        "¡Hola! Veo que te interesa {service}. ¡Excelente elección! ¿Cómo te llamas? Y cuéntame sobre tu situación actual: ¿qué problema quieres resolver?",
      partnership:
        "¡Hola! Te interesa saber más sobre nuestro modelo de {partnership}. ¡Cada proyecto es diferente! ¿Cómo te llamas? Y cuéntame sobre tu proyecto para explorar las mejores opciones.",
      qualification:
        "¡Hola! Veamos si somos el fit correcto para trabajar juntos. ¿Cómo te llamas? Y cuéntame sobre tu negocio y qué estás buscando lograr.",
      impact:
        "¡Hola! Quiero conocer cómo podrían ayudarme con un sistema de IA práctico y human-first.",
      formFallback: "¿Prefieres llenar un formulario? Haz clic aquí.",
    },
  },

  contactForm: {
    title: "Hablemos",
    subtitle: "No formularios corporativos. Solo una conversación.",
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    whatsappLabel: "WhatsApp (opcional)",
    whatsappPlaceholder: "+57 300 123 4567",
    projectTypeLabel: "¿Qué tipo de proyecto tienes en mente?",
    projectTypes: [
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
    submitButton: "Enviar mensaje",
    chatPrompt: "¿Prefieres chatear? ¡Nuestro asistente IA puede ayudarte!",
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
