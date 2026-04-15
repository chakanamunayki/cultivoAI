import type { SiteContent } from "../../types";

export const esUseCasesContent: Pick<SiteContent, "demosTitle" | "demosSubtitle" | "useCases"> = {
  demosTitle: "IA en Acción",
  demosSubtitle: "Mira ejemplos de asistentes, dashboards y sistemas de trabajo en acción.",
  useCases: [
    {
      id: "chat",
      title: "Chatbot Inteligente",
      description: "Atención al cliente automática 24/7. Responde, califica y agenda.",
      scenario: "Un cliente pregunta sobre precios de chatbots",
      steps: [
        { action: "Cliente: Hola, ¿qué precio tienen los chatbots?", result: "" },
        { action: "IA: Analizando contexto...", result: "" },
        {
          action: "",
          result:
            "Bot: Buena pregunta. El precio depende del alcance. Cuéntame qué necesitas y te indico el mejor siguiente paso.",
        },
        { action: "Cliente: Sí, por favor.", result: "" },
        { action: "", result: "Enviando demo interactiva..." },
      ],
    },
    {
      id: "lead",
      title: "Filtrado de Leads",
      description: "Califica prospectos automáticamente antes de que hables con ellos.",
      scenario: "Nuevo lead llega desde LinkedIn",
      steps: [
        { action: "Nuevo Lead: Juan Pérez (LinkedIn)", result: "" },
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
      scenario: "Generando landing page para cafetería",
      steps: [
        { action: "Usuario: Landing para cafetería moderna", result: "" },
        { action: "IA: Generando componentes React...", result: "" },
        { action: "", result: '<Hero title="Café de Origen" />' },
        { action: "", result: '<Features list={["Tostión Media", "Orgánico"]} />' },
        { action: "", result: "Sitio desplegado en Vercel" },
      ],
    },
    {
      id: "dash",
      title: "Business Dashboard",
      description: "Convierte datos crudos en gráficos de decisión en tiempo real.",
      scenario: "Sincronizando Stripe y Shopify",
      steps: [
        { action: "Sync Stripe & Shopify", result: "" },
        { action: "IA: Detectando anomalías...", result: "" },
        { action: "", result: "Ventas Hoy: $2,450 (+15%)" },
        { action: "", result: "Actualizando widget de ingresos" },
        { action: "", result: "Insight: El producto B está trending." },
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
        { action: "", result: "LinkedIn: Artículo profesional" },
      ],
    },
    {
      id: "project19",
      title: "Project19 Coach",
      description: "Coach personal de IA vía WhatsApp. Briefing matutino y check-in nocturno.",
      scenario: "Un día con el coach de Rocky",
      steps: [
        { action: "7:00 AM - ¡Buenos días Rocky!", result: "" },
        { action: "", result: "¿Qué tienes planeado para hoy? ¿Escuela, fútbol, algo más?" },
        { action: "Rocky: Escuela hasta las 3, después entrenamiento de fútbol", result: "" },
        { action: "", result: "Guardado en Notion. ¡Te escribo a las 8pm!" },
        { action: "8:00 PM - ¿Cómo te fue hoy?", result: "" },
        { action: "Rocky: [Nota de voz 30s]", result: "" },
        { action: "", result: "Transcrito y guardado. ¡Buen día! Descansa." },
      ],
    },
  ],
};
