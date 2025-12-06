/**
 * Admin Dashboard TypeScript Types
 * Phase 4 - Analytics Dashboard & Admin
 */

// ============================================
// Dashboard Stats Types
// ============================================

export interface DashboardStats {
  leads: {
    total: number;
    byStatus: {
      new: number;
      warm: number;
      hot: number;
      priority: number;
      contacted: number;
      converted: number;
    };
    bySource: Record<string, number>;
    thisWeek: number;
    thisMonth: number;
  };
  conversations: {
    total: number;
    avgMessages: number;
    avgDurationMinutes: number;
    withLeadCapture: number;
    withEscalation: number;
    thisWeek: number;
  };
  engagement: {
    whatsappClicks: number;
    formOpens: number;
    leadCaptureRate: number;
  };
}

// ============================================
// Lead Types
// ============================================

export type LeadStatus = "new" | "warm" | "hot" | "priority" | "contacted" | "converted";
export type QualificationLevel = "cold" | "warm" | "hot" | "priority";

export interface Lead {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  name: string | null;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  preferredLanguage: string | null;
  projectType: string | null;
  projectDescription: string | null;
  budgetRange: string | null;
  timeline: string | null;
  source: string | null;
  status: string | null;
  notes: string | null;
  qualificationScore: number | null;
  qualificationLevel: string | null;
  interests: string | null;
  conversationSummary: string | null;
  hasBudget: boolean | null;
  hasTimeline: boolean | null;
  hasClearUseCase: boolean | null;
  isDecisionMaker: boolean | null;
  isSectorFit: boolean | null;
}

export interface LeadWithConversations extends Lead {
  conversationCount: number;
  lastConversationAt: string | null;
}

export interface LeadsListResponse {
  leads: LeadWithConversations[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// ============================================
// Conversation Types
// ============================================

export interface Message {
  id: string;
  createdAt: string | null;
  role: string;
  content: string;
  modelUsed: string | null;
  tokensUsed: number | null;
  latencyMs: number | null;
}

export interface Conversation {
  id: string;
  leadId: string | null;
  sessionId: string | null;
  startedAt: string | null;
  endedAt: string | null;
  lastMessageAt: string | null;
  language: string | null;
  pageUrl: string | null;
  entryContext: string | null;
  summary: string | null;
  intentDetected: string | null;
  sentiment: string | null;
  messageCount: number | null;
  totalTokensUsed: number | null;
  escalatedToHuman: boolean | null;
  escalationMethod: string | null;
  leadCaptured: boolean | null;
  whatsappClicked: boolean | null;
  formOpened: boolean | null;
  functionCallsUsed: string[];
  durationMinutes: number | null;
  // Joined lead info
  leadName: string | null;
  leadEmail: string | null;
  leadQualificationLevel: string | null;
}

export interface ConversationWithMessages extends Omit<Conversation, "leadName" | "leadEmail" | "leadQualificationLevel"> {
  messages: Message[];
}

export interface ConversationsListResponse {
  conversations: Conversation[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasMore: boolean;
  };
  metrics: {
    avgMessages: number;
    avgDurationMinutes: number;
    avgTokens: number;
    escalationCount: number;
    leadCaptureCount: number;
    escalationRate: number;
    leadCaptureRate: number;
  };
}

// ============================================
// Lead Details Types
// ============================================

export interface TimelineEvent {
  type: "lead_created" | "conversation" | "status_change" | "escalation";
  timestamp: string;
  description: string;
  metadata?: Record<string, unknown>;
}

export interface LeadDetailsResponse {
  lead: Lead;
  conversations: ConversationWithMessages[];
  timeline: TimelineEvent[];
}

// ============================================
// Filter Types
// ============================================

export interface LeadsFilter {
  status?: string;
  source?: string;
  qualificationLevel?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: "createdAt" | "name" | "email" | "qualificationScore";
  sortOrder?: "asc" | "desc";
}

export interface ConversationsFilter {
  dateFrom?: string;
  dateTo?: string;
  withEscalation?: boolean;
  withLeadCapture?: boolean;
  language?: string;
  entryContext?: string;
}

// ============================================
// Action Types
// ============================================

export interface UpdateLeadRequest {
  leadId: string;
  status?: string;
  notes?: string;
  assignedTo?: string;
}

export interface ExportFilters {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  format?: "csv" | "json";
}
