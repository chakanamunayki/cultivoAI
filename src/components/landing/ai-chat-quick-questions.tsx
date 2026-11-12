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
  project: "general",
};

const QUICK_QUESTIONS: Record<
  AIChatQuickQuestionsProps["locale"],
  Record<QuickQuestionSet, QuickQuestion[]>
> = {
  es: {
    general: [
      {
        id: "general-1",
        text: "¿Qué construye Paul?",
        action: "send",
      },
      {
        id: "general-2",
        text: "¿Qué es Semillero?",
        action: "send",
      },
      {
        id: "general-3",
        text: "¿Cómo funciona el Sprint de Descubrimiento?",
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
        text: "¿Puedo agendar 15 minutos con Paul?",
        action: "send",
      },
      {
        id: "booking-2",
        text: "¿Puedo hablar con Paul esta semana?",
        action: "send",
      },
      {
        id: "booking-3",
        text: "¿Qué envío antes de la llamada?",
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
        text: "¿Qué servicio protege mejor nuestro conocimiento?",
        action: "send",
      },
      {
        id: "services-2",
        text: "¿Cómo demuestro el impacto de mi proyecto?",
        action: "send",
      },
      {
        id: "services-3",
        text: "¿Cuál es la primera versión útil?",
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
        text: "¿Cómo empieza el Sprint de Descubrimiento?",
        action: "send",
      },
      {
        id: "partnership-2",
        text: "¿Qué incluye la llamada gratis de scoping?",
        action: "send",
      },
      {
        id: "partnership-3",
        text: "¿Qué entregable me llevo del sprint?",
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
        text: "Sé directo: ¿mi proyecto encaja?",
        action: "send",
      },
      {
        id: "qualification-2",
        text: "¿Qué tipo de proyectos acepta Paul?",
        action: "send",
      },
      {
        id: "qualification-3",
        text: "¿Cuándo Paul no es la persona indicada?",
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
        text: "Proyecto con propósito. ¿Podemos movernos rápido?",
        action: "send",
      },
      {
        id: "impact-2",
        text: "¿Cómo equilibra Paul impacto y negocio?",
        action: "send",
      },
      {
        id: "impact-3",
        text: "¿Paul trabaja con proyectos con propósito real?",
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
        text: "What does Paul build?",
        action: "send",
      },
      {
        id: "general-2",
        text: "What is Semillero?",
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
        text: "Can I book 15 minutes with Paul?",
        action: "send",
      },
      {
        id: "booking-2",
        text: "Can I talk to Paul this week?",
        action: "send",
      },
      {
        id: "booking-3",
        text: "What should I send before the call?",
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
        text: "How can I prove my project's impact?",
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
        text: "Be direct: is my project a fit?",
        action: "send",
      },
      {
        id: "qualification-2",
        text: "What kind of projects does Paul take on?",
        action: "send",
      },
      {
        id: "qualification-3",
        text: "When is Paul not the right fit?",
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
        text: "How does Paul balance impact and business?",
        action: "send",
      },
      {
        id: "impact-3",
        text: "Does Paul work with genuinely mission-led projects?",
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
