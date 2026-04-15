import type { SiteContent } from "../../types";

export const esSemillaContent: Pick<SiteContent, "semilla"> = {
  semilla: {
    title: "Fondo Semilla",
    subtitle: "El Viaje de Rocky",
    about:
      "Tengo 14 años. Cumplo 15 en enero. Todavía no sé exactamente qué quiero hacer con mi vida, y creo que está bien no saberlo todavía. Pero sí sé algunas cosas: me gusta construir. Mi papá me está enseñando a hacer cosas con IA: chatbots, automatizaciones, cosas así. A veces él me enseña. A veces yo le enseño a él.",
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
      { name: "Socio ($500+)", description: "Adaptación personalizada, involucración directa" },
    ],
    services: [
      "Chatbots básicos para WhatsApp o web",
      "Automatizaciones simples (conectar apps, enviar notificaciones)",
      "Ayuda con Notion y organización",
      "Talleres de desarrollo de chatbots",
    ],
    goal: "Para cuando tenga 19 años quiero tener opciones. Quizás jugar fútbol semi-profesional. Quizás tener mi propio negocio. Quizás ambos. El punto es poder elegir.",
    ctaTitle: "Propón un Proyecto",
    ctaDescription: "¿Tienes algo pequeño que necesitas? Cuéntame.",
    ctaButton: "Proponer Proyecto",
  },
};
