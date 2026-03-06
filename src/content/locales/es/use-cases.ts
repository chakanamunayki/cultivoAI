import type { SiteContent } from "../../types";

export const esUseCasesContent: Pick<SiteContent, "demosTitle" | "demosSubtitle" | "useCases"> = {
  demosTitle: "IA en Accion",
  demosSubtitle: "Mira ejemplos de asistentes, dashboards y sistemas de trabajo en accion.",
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
            "Bot: Buena pregunta. El precio depende del alcance. Cuentame que necesitas y te indico el mejor siguiente paso.",
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
        { action: "", result: "Que tienes planeado para hoy? Escuela, futbol, algo más?" },
        { action: "Rocky: Escuela hasta las 3, despues entrenamiento de futbol", result: "" },
        { action: "", result: "Guardado en Notion. Te escribo a las 8pm!" },
        { action: "8:00 PM - Como te fue hoy?", result: "" },
        { action: "Rocky: [Nota de voz 30s]", result: "" },
        { action: "", result: "Transcrito y guardado. Buen dia! Descansa." },
      ],
    },
  ],
};
