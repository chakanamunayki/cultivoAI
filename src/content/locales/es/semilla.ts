import type { SiteContent } from "../../types";

export const esSemillaContent: Pick<SiteContent, "semilla"> = {
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
};
