interface AIChatQuickQuestionsProps {
  locale: "es" | "en";
  onQuestionClick: (question: string) => void;
}

const QUICK_QUESTIONS: Record<AIChatQuickQuestionsProps["locale"], string[]> = {
  es: [
    "Quiero automatizar tareas repetitivas. Por donde empezamos?",
    "Necesito un asistente de IA para mi web. Que recomiendan?",
    "Quiero crear una solucion de software a medida. Como lo plantearian?",
  ],
  en: [
    "I want to automate repetitive tasks. Where should we start?",
    "I need an AI assistant for my website. What do you recommend?",
    "I want to build custom software for my team. How would you approach it?",
  ],
};

export function AIChatQuickQuestions({
  locale,
  onQuestionClick,
}: AIChatQuickQuestionsProps) {
  const questions = QUICK_QUESTIONS[locale];

  return (
    <div className="border-black/20 bg-white px-3 py-3 border-t-2">
      <div className="flex flex-wrap justify-center gap-2">
        {questions.map((question) => (
          <button
            key={question}
            onClick={() => onQuestionClick(question)}
            className="bg-muted hover:bg-primary hover:text-primary-foreground border-2 border-black px-3 py-1.5 text-center text-xs font-bold transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
