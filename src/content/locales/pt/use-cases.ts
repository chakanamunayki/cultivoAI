import type { SiteContent } from "../../types";

export const ptUseCasesContent: Pick<SiteContent, "demosTitle" | "demosSubtitle" | "useCases"> = {
  demosTitle: "IA em Ação",
  demosSubtitle: "Veja exemplos de assistentes, dashboards e sistemas de trabalho em ação.",
  useCases: [
    {
      id: "chat",
      title: "Chatbot Inteligente",
      description: "Atendimento ao cliente automático 24/7. Responde, qualifica e agenda.",
      scenario: "Um cliente pergunta sobre preços de chatbots",
      steps: [
        { action: "Cliente: Oi, qual o preço dos chatbots?", result: "" },
        { action: "IA: Analisando contexto...", result: "" },
        {
          action: "",
          result:
            "Bot: Boa pergunta. O preço depende do escopo. Me conta o que você precisa e eu indico o melhor próximo passo.",
        },
        { action: "Cliente: Sim, por favor.", result: "" },
        { action: "", result: "Enviando demo interativa..." },
      ],
    },
    {
      id: "lead",
      title: "Filtragem de Leads",
      description: "Qualifica prospects automaticamente antes de você falar com eles.",
      scenario: "Novo lead chega do LinkedIn",
      steps: [
        { action: "Novo Lead: Juan Pérez (LinkedIn)", result: "" },
        { action: "IA: Enriquecendo perfil...", result: "" },
        { action: "", result: "{ Role: CEO, Size: 50-100, Loc: Bog }" },
        { action: "", result: "Score: 92/100. Alta probabilidade." },
        { action: "", result: "Movido para a coluna 'Prioridade Alta'" },
      ],
    },
    {
      id: "web",
      title: "Construtor Web",
      description: "Gera estruturas web e copy otimizado em segundos.",
      scenario: "Gerando landing page para cafeteria",
      steps: [
        { action: "Usuário: Landing para cafeteria moderna", result: "" },
        { action: "IA: Gerando componentes React...", result: "" },
        { action: "", result: '<Hero title="Café de Origem" />' },
        { action: "", result: '<Features list={["Torra Média", "Orgânico"]} />' },
        { action: "", result: "Site publicado na Vercel" },
      ],
    },
    {
      id: "dash",
      title: "Business Dashboard",
      description: "Transforma dados brutos em gráficos de decisão em tempo real.",
      scenario: "Sincronizando Stripe e Shopify",
      steps: [
        { action: "Sync Stripe & Shopify", result: "" },
        { action: "IA: Detectando anomalias...", result: "" },
        { action: "", result: "Vendas Hoje: $2.450 (+15%)" },
        { action: "", result: "Atualizando widget de receita" },
        { action: "", result: "Insight: O produto B está em alta." },
      ],
    },
    {
      id: "social",
      title: "Social Media Flow",
      description: "Multiplica o seu conteúdo. De uma ideia a todas as redes.",
      scenario: "Criando conteúdo sobre IA em PMEs",
      steps: [
        { action: "Usuário: Post sobre 'IA em PMEs'", result: "" },
        { action: "IA: Adaptando aos formatos...", result: "" },
        { action: "", result: "Instagram: Carrossel de 5 slides" },
        { action: "", result: "Twitter: Thread de 3 tweets" },
        { action: "", result: "LinkedIn: Artigo profissional" },
      ],
    },
    {
      id: "project19",
      title: "Project19 Coach",
      description: "Coach pessoal de IA via WhatsApp. Briefing pela manhã e check-in à noite.",
      scenario: "Um dia com o coach do Rocky",
      steps: [
        { action: "7:00 - Bom dia, Rocky!", result: "" },
        { action: "", result: "O que você tem planejado para hoje? Escola, futebol, mais alguma coisa?" },
        { action: "Rocky: Escola até as 15h, depois treino de futebol", result: "" },
        { action: "", result: "Salvo no Notion. Te escrevo às 20h!" },
        { action: "20:00 - Como foi o seu dia?", result: "" },
        { action: "Rocky: [Áudio de 30s]", result: "" },
        { action: "", result: "Transcrito e salvo. Bom dia! Descansa." },
      ],
    },
  ],
};
