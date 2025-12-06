/**
 * Admin Dashboard Content
 * Bilingual support for Spanish (es) and English (en)
 */

import type { Locale } from "./types";

export interface AdminContent {
  title: string;
  subtitle: string;
  nav: {
    dashboard: string;
    leads: string;
    conversations: string;
    export: string;
    backToSite: string;
  };
  stats: {
    totalLeads: string;
    thisWeek: string;
    thisMonth: string;
    conversations: string;
    avgMessages: string;
    avgDuration: string;
    leadCapture: string;
    whatsappClicks: string;
  };
  leadStatus: {
    new: string;
    warm: string;
    hot: string;
    priority: string;
    contacted: string;
    converted: string;
  };
  qualificationLevel: {
    cold: string;
    warm: string;
    hot: string;
    priority: string;
  };
  table: {
    name: string;
    email: string;
    phone: string;
    status: string;
    score: string;
    source: string;
    date: string;
    actions: string;
    noData: string;
    loading: string;
  };
  actions: {
    viewDetails: string;
    whatsapp: string;
    email: string;
    changeStatus: string;
    export: string;
    exportCSV: string;
    refresh: string;
    search: string;
    filter: string;
    clearFilters: string;
  };
  leadDetails: {
    title: string;
    qualificationBreakdown: string;
    budget: string;
    timeline: string;
    useCase: string;
    decisionMaker: string;
    sectorFit: string;
    conversationHistory: string;
    timelineSection: string;
    noConversations: string;
    summary: string;
    intent: string;
    sentiment: string;
    messages: string;
    duration: string;
    escalated: string;
    projectInfo: string;
    contactInfo: string;
    notes: string;
    notesPlaceholder: string;
    saveNotes: string;
  };
  timeAgo: {
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    daysAgo: string;
    weeksAgo: string;
  };
  exportPage: {
    title: string;
    description: string;
    filterByStatus: string;
    filterByDate: string;
    allStatuses: string;
    from: string;
    to: string;
    downloadCSV: string;
    downloadJSON: string;
  };
}

export const adminContent: Record<Locale, AdminContent> = {
  es: {
    title: "Panel de Administracion",
    subtitle: "Gestion de leads y conversaciones",
    nav: {
      dashboard: "Dashboard",
      leads: "Leads",
      conversations: "Conversaciones",
      export: "Exportar",
      backToSite: "Volver al sitio",
    },
    stats: {
      totalLeads: "Total Leads",
      thisWeek: "Esta semana",
      thisMonth: "Este mes",
      conversations: "Conversaciones",
      avgMessages: "Promedio mensajes",
      avgDuration: "Duracion promedio",
      leadCapture: "Captura de leads",
      whatsappClicks: "Clics WhatsApp",
    },
    leadStatus: {
      new: "Nuevo",
      warm: "Tibio",
      hot: "Caliente",
      priority: "Prioritario",
      contacted: "Contactado",
      converted: "Convertido",
    },
    qualificationLevel: {
      cold: "Frio",
      warm: "Tibio",
      hot: "Caliente",
      priority: "Prioritario",
    },
    table: {
      name: "Nombre",
      email: "Email",
      phone: "Telefono",
      status: "Estado",
      score: "Puntuacion",
      source: "Fuente",
      date: "Fecha",
      actions: "Acciones",
      noData: "No hay leads todavia",
      loading: "Cargando...",
    },
    actions: {
      viewDetails: "Ver detalles",
      whatsapp: "WhatsApp",
      email: "Email",
      changeStatus: "Cambiar estado",
      export: "Exportar",
      exportCSV: "Exportar CSV",
      refresh: "Actualizar",
      search: "Buscar por nombre o email...",
      filter: "Filtrar",
      clearFilters: "Limpiar filtros",
    },
    leadDetails: {
      title: "Detalles del Lead",
      qualificationBreakdown: "Desglose de Calificacion",
      budget: "Indico presupuesto",
      timeline: "Tiene timeline",
      useCase: "Caso de uso claro",
      decisionMaker: "Tomador de decisiones",
      sectorFit: "Encaja en sector",
      conversationHistory: "Historial de Conversaciones",
      timelineSection: "Timeline",
      noConversations: "Sin conversaciones registradas",
      summary: "Resumen",
      intent: "Intencion",
      sentiment: "Sentimiento",
      messages: "mensajes",
      duration: "min duracion",
      escalated: "Escalado",
      projectInfo: "Informacion del Proyecto",
      contactInfo: "Informacion de Contacto",
      notes: "Notas",
      notesPlaceholder: "Agregar notas sobre este lead...",
      saveNotes: "Guardar notas",
    },
    timeAgo: {
      justNow: "Ahora mismo",
      minutesAgo: "hace {n} min",
      hoursAgo: "hace {n} horas",
      daysAgo: "hace {n} dias",
      weeksAgo: "hace {n} semanas",
    },
    exportPage: {
      title: "Exportar Leads",
      description: "Descarga tus leads en formato CSV o JSON",
      filterByStatus: "Filtrar por estado",
      filterByDate: "Filtrar por fecha",
      allStatuses: "Todos los estados",
      from: "Desde",
      to: "Hasta",
      downloadCSV: "Descargar CSV",
      downloadJSON: "Descargar JSON",
    },
  },
  en: {
    title: "Admin Dashboard",
    subtitle: "Lead and conversation management",
    nav: {
      dashboard: "Dashboard",
      leads: "Leads",
      conversations: "Conversations",
      export: "Export",
      backToSite: "Back to site",
    },
    stats: {
      totalLeads: "Total Leads",
      thisWeek: "This week",
      thisMonth: "This month",
      conversations: "Conversations",
      avgMessages: "Avg messages",
      avgDuration: "Avg duration",
      leadCapture: "Lead capture",
      whatsappClicks: "WhatsApp clicks",
    },
    leadStatus: {
      new: "New",
      warm: "Warm",
      hot: "Hot",
      priority: "Priority",
      contacted: "Contacted",
      converted: "Converted",
    },
    qualificationLevel: {
      cold: "Cold",
      warm: "Warm",
      hot: "Hot",
      priority: "Priority",
    },
    table: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      status: "Status",
      score: "Score",
      source: "Source",
      date: "Date",
      actions: "Actions",
      noData: "No leads yet",
      loading: "Loading...",
    },
    actions: {
      viewDetails: "View details",
      whatsapp: "WhatsApp",
      email: "Email",
      changeStatus: "Change status",
      export: "Export",
      exportCSV: "Export CSV",
      refresh: "Refresh",
      search: "Search by name or email...",
      filter: "Filter",
      clearFilters: "Clear filters",
    },
    leadDetails: {
      title: "Lead Details",
      qualificationBreakdown: "Qualification Breakdown",
      budget: "Has budget",
      timeline: "Has timeline",
      useCase: "Clear use case",
      decisionMaker: "Decision maker",
      sectorFit: "Sector fit",
      conversationHistory: "Conversation History",
      timelineSection: "Timeline",
      noConversations: "No conversations recorded",
      summary: "Summary",
      intent: "Intent",
      sentiment: "Sentiment",
      messages: "messages",
      duration: "min duration",
      escalated: "Escalated",
      projectInfo: "Project Information",
      contactInfo: "Contact Information",
      notes: "Notes",
      notesPlaceholder: "Add notes about this lead...",
      saveNotes: "Save notes",
    },
    timeAgo: {
      justNow: "Just now",
      minutesAgo: "{n} min ago",
      hoursAgo: "{n} hours ago",
      daysAgo: "{n} days ago",
      weeksAgo: "{n} weeks ago",
    },
    exportPage: {
      title: "Export Leads",
      description: "Download your leads in CSV or JSON format",
      filterByStatus: "Filter by status",
      filterByDate: "Filter by date",
      allStatuses: "All statuses",
      from: "From",
      to: "To",
      downloadCSV: "Download CSV",
      downloadJSON: "Download JSON",
    },
  },
};
