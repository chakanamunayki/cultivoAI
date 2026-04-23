import type { ChatContextType } from "@/content/types";

export type QuickQuestionAction = "send" | "capture_contact" | "open_whatsapp";

export interface QuickQuestion {
  id: string;
  text: string;
  action: QuickQuestionAction;
}

type QuickQuestionSet =
  | "general"
  | "booking"
  | "services"
  | "partnership"
  | "qualification"
  | "impact";

interface AIChatQuickQuestionsProps {
  locale: "es" | "en";
  contextType?: ChatContextType;
  onQuestionClick: (question: QuickQuestion) => void;
  isLoading?: boolean;
}

const ENTRY_CONTEXT_TO_SET: Record<ChatContextType, QuickQuestionSet> = {
  general: "general",
  booking: "booking",
  story: "general",
  service: "services",
  partnership: "partnership",
  qualification: "qualification",
  impact: "impact",
};

const QUICK_QUESTIONS: Record<
  AIChatQuickQuestionsProps["locale"],
  Record<QuickQuestionSet, QuickQuestion[]>
> = {
  es: {
    general: [
      {
        id: "general-1",
        text: "No se por donde empezar. Que arreglamos primero?",
        action: "send",
      },
      {
        id: "general-2",
        text: "Nuestro cuello de botella es [X]. Primer paso?",
        action: "send",
      },
      {
        id: "general-3",
        text: "Que podemos automatizar en 2-4 semanas?",
        action: "send",
      },
      {
        id: "general-4",
        text: "Dejar nombre + email",
        action: "capture_contact",
      },
      {
        id: "general-5",
        text: "Pasar a WhatsApp",
        action: "open_whatsapp",
      },
    ],
    booking: [
      {
        id: "booking-1",
        text: "Agendamos 15 min? Bloqueo principal: [X].",
        action: "send",
      },
      {
        id: "booking-2",
        text: "Hay fit para charla de proyecto esta semana?",
        action: "send",
      },
      {
        id: "booking-3",
        text: "Que enviamos antes de la llamada?",
        action: "send",
      },
      {
        id: "booking-4",
        text: "Dejar nombre + email",
        action: "capture_contact",
      },
      {
        id: "booking-5",
        text: "Pasar a WhatsApp",
        action: "open_whatsapp",
      },
    ],
    services: [
      {
        id: "services-1",
        text: "Que servicio encaja con nuestro cuello de botella?",
        action: "send",
      },
      {
        id: "services-2",
        text: "Primero automatizacion, chatbot o dashboard?",
        action: "send",
      },
      {
        id: "services-3",
        text: "Version uno minima y util?",
        action: "send",
      },
      {
        id: "services-4",
        text: "Dejar nombre + email",
        action: "capture_contact",
      },
      {
        id: "services-5",
        text: "Pasar a WhatsApp",
        action: "open_whatsapp",
      },
    ],
    partnership: [
      {
        id: "partnership-1",
        text: "Que modelo de alianza encaja con nuestra etapa?",
        action: "send",
      },
      {
        id: "partnership-2",
        text: "Sirve tarifa reducida o pago diferido?",
        action: "send",
      },
      {
        id: "partnership-3",
        text: "Que alcance es viable para ambos lados?",
        action: "send",
      },
      {
        id: "partnership-4",
        text: "Dejar nombre + email",
        action: "capture_contact",
      },
      {
        id: "partnership-5",
        text: "Pasar a WhatsApp",
        action: "open_whatsapp",
      },
    ],
    qualification: [
      {
        id: "qualification-1",
        text: "Se directo: somos fit?",
        action: "send",
      },
      {
        id: "qualification-2",
        text: "Que vuelve a un lead prioridad?",
        action: "send",
      },
      {
        id: "qualification-3",
        text: "Que suele indicar no fit?",
        action: "send",
      },
      {
        id: "qualification-4",
        text: "Dejar nombre + email",
        action: "capture_contact",
      },
      {
        id: "qualification-5",
        text: "Pasar a WhatsApp",
        action: "open_whatsapp",
      },
    ],
    impact: [
      {
        id: "impact-1",
        text: "Proyecto con proposito. Podemos movernos rapido?",
        action: "send",
      },
      {
        id: "impact-2",
        text: "Como equilibran impacto y realidad de negocio?",
        action: "send",
      },
      {
        id: "impact-3",
        text: "Pueden trabajar con presupuesto ajustado y proposito claro?",
        action: "send",
      },
      {
        id: "impact-4",
        text: "Dejar nombre + email",
        action: "capture_contact",
      },
      {
        id: "impact-5",
        text: "Pasar a WhatsApp",
        action: "open_whatsapp",
      },
    ],
  },
  en: {
    general: [
      {
        id: "general-1",
        text: "Not sure where to start. What do we fix first?",
        action: "send",
      },
      {
        id: "general-2",
        text: "Our bottleneck is [X]. First move?",
        action: "send",
      },
      {
        id: "general-3",
        text: "What can we automate in 2-4 weeks?",
        action: "send",
      },
      {
        id: "general-4",
        text: "Leave name + email",
        action: "capture_contact",
      },
      {
        id: "general-5",
        text: "Move to WhatsApp",
        action: "open_whatsapp",
      },
    ],
    booking: [
      {
        id: "booking-1",
        text: "Book 15 min? Main blocker: [X].",
        action: "send",
      },
      {
        id: "booking-2",
        text: "Fit for a project chat this week?",
        action: "send",
      },
      {
        id: "booking-3",
        text: "What should we send before the call?",
        action: "send",
      },
      {
        id: "booking-4",
        text: "Leave name + email",
        action: "capture_contact",
      },
      {
        id: "booking-5",
        text: "Move to WhatsApp",
        action: "open_whatsapp",
      },
    ],
    services: [
      {
        id: "services-1",
        text: "Which service fits our bottleneck?",
        action: "send",
      },
      {
        id: "services-2",
        text: "Automation, chatbot, or dashboard first?",
        action: "send",
      },
      {
        id: "services-3",
        text: "What is the smallest useful v1?",
        action: "send",
      },
      {
        id: "services-4",
        text: "Leave name + email",
        action: "capture_contact",
      },
      {
        id: "services-5",
        text: "Move to WhatsApp",
        action: "open_whatsapp",
      },
    ],
    partnership: [
      {
        id: "partnership-1",
        text: "Which partnership model fits our stage?",
        action: "send",
      },
      {
        id: "partnership-2",
        text: "Could reduced rate or deferred terms work?",
        action: "send",
      },
      {
        id: "partnership-3",
        text: "What scope is viable for both sides?",
        action: "send",
      },
      {
        id: "partnership-4",
        text: "Leave name + email",
        action: "capture_contact",
      },
      {
        id: "partnership-5",
        text: "Move to WhatsApp",
        action: "open_whatsapp",
      },
    ],
    qualification: [
      {
        id: "qualification-1",
        text: "Be direct: are we a fit?",
        action: "send",
      },
      {
        id: "qualification-2",
        text: "What makes a lead high priority?",
        action: "send",
      },
      {
        id: "qualification-3",
        text: "What usually signals no fit?",
        action: "send",
      },
      {
        id: "qualification-4",
        text: "Leave name + email",
        action: "capture_contact",
      },
      {
        id: "qualification-5",
        text: "Move to WhatsApp",
        action: "open_whatsapp",
      },
    ],
    impact: [
      {
        id: "impact-1",
        text: "Mission-driven project. Can we move fast?",
        action: "send",
      },
      {
        id: "impact-2",
        text: "How do you balance impact and business reality?",
        action: "send",
      },
      {
        id: "impact-3",
        text: "Can you work with tight budget and clear purpose?",
        action: "send",
      },
      {
        id: "impact-4",
        text: "Leave name + email",
        action: "capture_contact",
      },
      {
        id: "impact-5",
        text: "Move to WhatsApp",
        action: "open_whatsapp",
      },
    ],
  },
};

export function AIChatQuickQuestions({
  locale,
  contextType = "general",
  onQuestionClick,
  isLoading = false,
}: AIChatQuickQuestionsProps) {
  const contextSet = ENTRY_CONTEXT_TO_SET[contextType] ?? "general";
  const questions = QUICK_QUESTIONS[locale][contextSet];

  return (
    <div className="border-black/20 bg-white px-3 py-3 border-t-2">
      <div className="flex flex-wrap justify-center gap-2">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onQuestionClick(question)}
            disabled={isLoading}
            className="bg-muted hover:bg-primary hover:text-primary-foreground border-2 border-black px-3 py-1.5 text-center text-xs font-bold transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-muted disabled:hover:text-current disabled:hover:shadow-none"
          >
            {question.text}
          </button>
        ))}
      </div>
    </div>
  );
}
