import type { ChatContextType, Locale } from "@/content/types";

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
  locale: Locale;
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
        text: "Como protegemos la IP de nuestros protocolos?",
        action: "send",
      },
      {
        id: "general-2",
        text: "Que es el Company Brain?",
        action: "send",
      },
      {
        id: "general-3",
        text: "Como funciona el Sprint de Descubrimiento?",
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
        text: "Que servicio protege mejor nuestro conocimiento?",
        action: "send",
      },
      {
        id: "services-2",
        text: "Como aislamos la IP de la ejecucion?",
        action: "send",
      },
      {
        id: "services-3",
        text: "Cual es la primera version util?",
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
        text: "Como empieza el Sprint de Descubrimiento?",
        action: "send",
      },
      {
        id: "partnership-2",
        text: "Que incluye la llamada gratis de scoping?",
        action: "send",
      },
      {
        id: "partnership-3",
        text: "Que entregable me llevo del sprint?",
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
        text: "Trabajan con equipos con mision real?",
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
        text: "How do we protect our protocol IP?",
        action: "send",
      },
      {
        id: "general-2",
        text: "What is the Company Brain?",
        action: "send",
      },
      {
        id: "general-3",
        text: "How does the Discovery Sprint work?",
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
        text: "Which service best protects our know-how?",
        action: "send",
      },
      {
        id: "services-2",
        text: "How do we isolate IP from execution?",
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
        text: "How does the Discovery Sprint start?",
        action: "send",
      },
      {
        id: "partnership-2",
        text: "What does the free scoping call include?",
        action: "send",
      },
      {
        id: "partnership-3",
        text: "What deliverable do I leave with?",
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
        text: "Do you work with genuinely mission-led teams?",
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
  pt: {
    general: [
      {
        id: "general-1",
        text: "Como protegemos a IP dos nossos protocolos?",
        action: "send",
      },
      {
        id: "general-2",
        text: "O que é o Company Brain?",
        action: "send",
      },
      {
        id: "general-3",
        text: "Como funciona o Sprint de Descoberta?",
        action: "send",
      },
      {
        id: "general-4",
        text: "Deixar nome + e-mail",
        action: "capture_contact",
      },
      {
        id: "general-5",
        text: "Passar para o WhatsApp",
        action: "open_whatsapp",
      },
    ],
    booking: [
      {
        id: "booking-1",
        text: "Agendamos 15 min? Bloqueio principal: [X].",
        action: "send",
      },
      {
        id: "booking-2",
        text: "Dá pra uma conversa de projeto esta semana?",
        action: "send",
      },
      {
        id: "booking-3",
        text: "O que enviamos antes da ligação?",
        action: "send",
      },
      {
        id: "booking-4",
        text: "Deixar nome + e-mail",
        action: "capture_contact",
      },
      {
        id: "booking-5",
        text: "Passar para o WhatsApp",
        action: "open_whatsapp",
      },
    ],
    services: [
      {
        id: "services-1",
        text: "Qual serviço protege melhor o nosso conhecimento?",
        action: "send",
      },
      {
        id: "services-2",
        text: "Como isolamos a IP da execução?",
        action: "send",
      },
      {
        id: "services-3",
        text: "Qual é a primeira versão útil?",
        action: "send",
      },
      {
        id: "services-4",
        text: "Deixar nome + e-mail",
        action: "capture_contact",
      },
      {
        id: "services-5",
        text: "Passar para o WhatsApp",
        action: "open_whatsapp",
      },
    ],
    partnership: [
      {
        id: "partnership-1",
        text: "Como começa o Sprint de Descoberta?",
        action: "send",
      },
      {
        id: "partnership-2",
        text: "O que inclui a ligação gratuita de scoping?",
        action: "send",
      },
      {
        id: "partnership-3",
        text: "Que entregável eu levo do sprint?",
        action: "send",
      },
      {
        id: "partnership-4",
        text: "Deixar nome + e-mail",
        action: "capture_contact",
      },
      {
        id: "partnership-5",
        text: "Passar para o WhatsApp",
        action: "open_whatsapp",
      },
    ],
    qualification: [
      {
        id: "qualification-1",
        text: "Seja direto: somos um encaixe?",
        action: "send",
      },
      {
        id: "qualification-2",
        text: "O que torna um lead prioridade?",
        action: "send",
      },
      {
        id: "qualification-3",
        text: "O que costuma indicar que não é encaixe?",
        action: "send",
      },
      {
        id: "qualification-4",
        text: "Deixar nome + e-mail",
        action: "capture_contact",
      },
      {
        id: "qualification-5",
        text: "Passar para o WhatsApp",
        action: "open_whatsapp",
      },
    ],
    impact: [
      {
        id: "impact-1",
        text: "Projeto com propósito. Dá pra andar rápido?",
        action: "send",
      },
      {
        id: "impact-2",
        text: "Como equilibram impacto e realidade de negócio?",
        action: "send",
      },
      {
        id: "impact-3",
        text: "Trabalham com times de missão real?",
        action: "send",
      },
      {
        id: "impact-4",
        text: "Deixar nome + e-mail",
        action: "capture_contact",
      },
      {
        id: "impact-5",
        text: "Passar para o WhatsApp",
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
