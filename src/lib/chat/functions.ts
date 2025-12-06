/**
 * Gemini Function Calling Definitions
 * Phase 3A.4 - Enhanced Function Calling for Lead Capture
 */

import { Type, type Tool } from "@google/genai";

// ============================================
// Function Declarations for Gemini
// ============================================

export const chatFunctionDeclarations: Tool = {
  functionDeclarations: [
    // =========== NAVIGATION FUNCTIONS ===========
    {
      name: "navigate_to_section",
      description:
        "Scrolls the website to a specific section. Use this when users want to see a section or ask about content on the page.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          section_id: {
            type: Type.STRING,
            description:
              "The ID of the section to scroll to. Valid IDs: 'hero', 'about', 'services', 'demos', 'semilla', 'partnerships', 'projects', 'stories', 'who-we-help', 'what-happens-next'",
          },
        },
        required: ["section_id"],
      },
    },
    {
      name: "show_project_details",
      description:
        "Opens a modal with full details about a specific project. Use when users ask about specific projects like 'Chak', 'Munayki', 'Raiz Capital', etc.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          project_title: {
            type: Type.STRING,
            description: "The title of the project to show details for",
          },
        },
        required: ["project_title"],
      },
    },
    {
      name: "show_service_details",
      description:
        "Opens a modal with full details about a specific service. Use when users ask about services like 'Chatbots', 'Automation', 'Dashboards', etc.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          service_title: {
            type: Type.STRING,
            description: "The title of the service to show details for",
          },
        },
        required: ["service_title"],
      },
    },

    // =========== LEAD CAPTURE FUNCTIONS ===========
    {
      name: "collect_lead_info",
      description:
        "Captures contact information when the user shows genuine interest in being contacted, scheduling a call, or receiving a proposal. Only call this AFTER the user has expressed clear interest and provided their information voluntarily.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "The user's name",
          },
          email: {
            type: Type.STRING,
            description: "The user's email address",
          },
          company: {
            type: Type.STRING,
            description: "The user's company name (optional)",
          },
          phone: {
            type: Type.STRING,
            description: "The user's phone number (optional)",
          },
          interested_services: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description:
              "Array of service names the user is interested in based on conversation",
          },
          project_description: {
            type: Type.STRING,
            description: "Brief description of what the user wants to build or solve",
          },
        },
        required: ["name", "email"],
      },
    },
    {
      name: "qualify_lead",
      description:
        "Assesses and scores a lead based on conversation signals. Call this after gathering enough information about the user's needs. Each factor adds 1 point to the qualification score (0-5).",
      parameters: {
        type: Type.OBJECT,
        properties: {
          budget_indicator: {
            type: Type.BOOLEAN,
            description:
              "True if the user mentioned having a budget or is willing to discuss pricing",
          },
          timeline: {
            type: Type.BOOLEAN,
            description:
              "True if the user has an urgent need or clear timeline (within 1-3 months)",
          },
          use_case: {
            type: Type.BOOLEAN,
            description:
              "True if the user described a specific, clear use case or problem to solve",
          },
          decision_maker: {
            type: Type.BOOLEAN,
            description:
              "True if the user is the decision maker or has direct access to them",
          },
          sector_fit: {
            type: Type.BOOLEAN,
            description:
              "True if the user's sector aligns with our values (agritech, wellness, education, startups with mission, etc.)",
          },
          conversation_summary: {
            type: Type.STRING,
            description:
              "A brief summary of the conversation and user's needs for follow-up",
          },
        },
        required: [
          "budget_indicator",
          "timeline",
          "use_case",
          "decision_maker",
          "sector_fit",
        ],
      },
    },
    {
      name: "suggest_service",
      description:
        "Recommends a specific service based on the user's needs. Use this when you've identified a clear match between user needs and a service.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          service_name: {
            type: Type.STRING,
            description:
              "The name of the service to recommend (e.g., 'Workflow Automation', 'AI Assistants & Chatbots', 'Business Intelligence', 'Content Systems', 'Website Development + AI', 'Startup Advisory')",
          },
          reason: {
            type: Type.STRING,
            description: "Brief explanation of why this service fits their needs",
          },
        },
        required: ["service_name", "reason"],
      },
    },
    {
      name: "offer_whatsapp",
      description:
        "Offers to continue the conversation on WhatsApp for more direct communication. Use this after qualifying a lead, when the user asks for direct contact, or if they seem to prefer messaging over forms/calls.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          context_message: {
            type: Type.STRING,
            description:
              "A brief context message that will be pre-filled in WhatsApp, summarizing what the user is interested in",
          },
        },
        required: ["context_message"],
      },
    },
    {
      name: "schedule_call",
      description:
        "Suggests scheduling a call with Paul. Use this for qualified leads (score 3+) who have complex projects or need detailed discussion.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          reason: {
            type: Type.STRING,
            description: "Brief explanation of what the call would cover",
          },
          urgency: {
            type: Type.STRING,
            description:
              "Urgency level: 'asap' (within days), 'soon' (within weeks), 'flexible' (no rush)",
          },
        },
        required: ["reason"],
      },
    },
  ],
};

// ============================================
// Function Response Types
// ============================================

export interface FunctionCallResult {
  name: string;
  args: Record<string, unknown>;
}

export interface LeadInfo {
  name: string;
  email: string;
  company?: string | undefined;
  phone?: string | undefined;
  interestedServices?: string[] | undefined;
  projectDescription?: string | undefined;
}

export interface QualificationData {
  budgetIndicator: boolean;
  timeline: boolean;
  useCase: boolean;
  decisionMaker: boolean;
  sectorFit: boolean;
  conversationSummary?: string | undefined;
}

// ============================================
// Function Call Handlers (for client-side)
// ============================================

export type FunctionCallHandler = (
  name: string,
  args: Record<string, unknown>
) => Promise<string> | string;

/**
 * Creates a map of function handlers for client-side execution
 */
export function createFunctionHandlers(options: {
  onNavigate: (sectionId: string) => void;
  onOpenProjectModal: (projectTitle: string) => void;
  onOpenServiceModal: (serviceTitle: string) => void;
  onCollectLead: (info: LeadInfo) => Promise<{ success: boolean; leadId?: string }>;
  onQualifyLead: (data: QualificationData) => Promise<{ score: number }>;
  onOfferWhatsApp: (contextMessage: string) => void;
  onScheduleCall: (reason: string, urgency?: string) => void;
  onSuggestService: (serviceName: string, reason: string) => void;
}): FunctionCallHandler {
  return async (name: string, args: Record<string, unknown>): Promise<string> => {
    switch (name) {
      case "navigate_to_section": {
        const sectionId = args.section_id as string;
        options.onNavigate(sectionId);
        return `Navigated to section: ${sectionId}`;
      }

      case "show_project_details": {
        const projectTitle = args.project_title as string;
        options.onOpenProjectModal(projectTitle);
        return `Opened project modal: ${projectTitle}`;
      }

      case "show_service_details": {
        const serviceTitle = args.service_title as string;
        options.onOpenServiceModal(serviceTitle);
        return `Opened service modal: ${serviceTitle}`;
      }

      case "collect_lead_info": {
        const leadInfo: LeadInfo = {
          name: args.name as string,
          email: args.email as string,
          company: args.company as string | undefined,
          phone: args.phone as string | undefined,
          interestedServices: args.interested_services as string[] | undefined,
          projectDescription: args.project_description as string | undefined,
        };
        const result = await options.onCollectLead(leadInfo);
        return result.success
          ? `Lead information captured successfully (ID: ${result.leadId})`
          : "Failed to capture lead information";
      }

      case "qualify_lead": {
        const qualificationData: QualificationData = {
          budgetIndicator: args.budget_indicator as boolean,
          timeline: args.timeline as boolean,
          useCase: args.use_case as boolean,
          decisionMaker: args.decision_maker as boolean,
          sectorFit: args.sector_fit as boolean,
          conversationSummary: args.conversation_summary as string | undefined,
        };
        const result = await options.onQualifyLead(qualificationData);
        return `Lead qualified with score: ${result.score}/5`;
      }

      case "suggest_service": {
        const serviceName = args.service_name as string;
        const reason = args.reason as string;
        options.onSuggestService(serviceName, reason);
        return `Suggested service: ${serviceName}`;
      }

      case "offer_whatsapp": {
        const contextMessage = args.context_message as string;
        options.onOfferWhatsApp(contextMessage);
        return `WhatsApp contact offered with context: ${contextMessage}`;
      }

      case "schedule_call": {
        const reason = args.reason as string;
        const urgency = args.urgency as string | undefined;
        options.onScheduleCall(reason, urgency);
        return `Call scheduling suggested: ${reason}`;
      }

      default:
        return `Unknown function: ${name}`;
    }
  };
}

// ============================================
// Validation Helpers
// ============================================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Allow various phone formats
  const phoneRegex = /^\+?[\d\s-()]{7,20}$/;
  return phoneRegex.test(phone);
}

export function sanitizeLeadInfo(info: LeadInfo): LeadInfo {
  return {
    name: info.name.trim(),
    email: info.email.trim().toLowerCase(),
    company: info.company?.trim(),
    phone: info.phone?.trim(),
    interestedServices: info.interestedServices?.map((s) => s.trim()),
    projectDescription: info.projectDescription?.trim(),
  };
}
