import type { SiteContent } from "../../types";

export const ptStoriesContent: Pick<SiteContent, "storiesTitle" | "storiesSubtitle" | "stories"> = {
storiesTitle: "Exemplos Reais",
storiesSubtitle: "Como já ajudamos negócios como o seu",
stories: [
  {
    company: "Fazenda Hidropônica",
    industry: "Agricultura",
    before:
      "Media pH, EC e temperatura manualmente 4 vezes por dia. Ia à estufa às 6h e às 22h. Um fim de semana fora significava pedir a um vizinho que não entendia o sistema.",
    after:
      "Sensores alimentam um dashboard. Alertas no WhatsApp quando algo está errado. Resumo semanal de IA com tendências e recomendações.",
    quote:
      "Detectei um desvio de pH às 2h da manhã que teria matado uma plantação de alface. Agora tiro os fins de semana de folga.",
    author: "Dono da Fazenda",
    imageUrl:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop",
    metric: "Liberdade nos fins de semana",
  },
  {
    company: "Prática de Bem-estar Holístico",
    industry: "Saúde e Bem-estar",
    before:
      "Clientes mandavam mensagens a toda hora perguntando sobre tipos de sessão, preços, disponibilidade. Não conseguia responder durante as sessões. Perdia reservas para praticantes que respondiam mais rápido.",
    after:
      "Bot de WhatsApp explica serviços, responde perguntas sobre Reiki vs. terapia sonora vs. respiração, consulta a agenda e reserva direto. Caloroso, não robótico.",
    quote:
      "40% mais sessões reservadas. Respondo perguntas complexas quando estou centrada, não no meio da sessão.",
    author: "Praticante de Bem-estar",
    imageUrl:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop",
    metric: "+40% sessões reservadas",
  },
  {
    company: "Família de Educação em Casa",
    industry: "Educação",
    before:
      "A mãe passava as noites de domingo planejando a semana. Acompanhava o progresso de 3 crianças em planilhas. Sem ideia se elas realmente retinham o conteúdo.",
    after:
      "A IA ajuda a gerar planos semanais com base no ritmo de cada criança. Progresso acompanhado automaticamente. Lacunas sinalizadas antes de virarem problemas.",
    quote:
      "Planejamento de domingo: de 3 horas para 45 minutos. As crianças recebem mais atenção personalizada, menos estresse administrativo.",
    author: "Pai Educador em Casa",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    metric: "3 horas -> 45 minutos por semana",
  },
  {
    company: "Sítio Familiar",
    industry: "Agricultura",
    before:
      "Vendas de ovos, vegetais, inscrições em oficinas, tudo acompanhado de forma diferente. Uma parte no caderno. Outra no WhatsApp. Sem ideia do que era realmente rentável.",
    after:
      "Dashboard simples conecta os canais de venda. Vê quais produtos dão dinheiro, quais não. Acompanha clientes recorrentes.",
    quote:
      "Descobri que as vendas de geleia davam prejuízo depois de contabilizar o tempo. Subi os preços, foquei no que funcionava.",
    author: "Agricultor Familiar",
    imageUrl:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
    metric: "Visibilidade real de rentabilidade",
  },
  {
    company: "Comunidade Autossustentável",
    industry: "Gestão Comunitária",
    before:
      "30 famílias, recursos compartilhados, zero sistema central. Biblioteca de ferramentas no caderno. Turnos de trabalho coordenados por um caos de grupo de conversa. Colheitas da floresta de alimentos para quem chegasse primeiro. Disputas sobre justiça.",
    after:
      "Portal simples para membros. A IA ajuda a programar rodízios de trabalho de forma justa, acompanha o empréstimo de ferramentas, avisa o que está pronto para colher e sugere uma distribuição equitativa. Envia lembretes suaves, não chatos.",
    quote:
      "Menos drama administrativo, mais comunidade. Decisões baseadas em dados, não em quem fala mais alto.",
    author: "Coordenador Comunitário",
    imageUrl:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop",
    metric: "30 famílias coordenadas",
  },
  {
    company: "Startup de Impacto",
    industry: "Startup de Tecnologia",
    before:
      "Fundador fazendo tudo. Perguntas de clientes, updates para investidores, conteúdo, operação. Sem sistema. As coisas caíam no vão o tempo todo.",
    after:
      "Leads capturados e qualificados automaticamente. FAQ tratada pelo chatbot. Relatório de métricas semanal gerado automaticamente. O fundador foca em produto e captação.",
    quote:
      "Parei de perder leads. Os investidores começaram a comentar como os updates estavam organizados.",
    author: "Fundador de Startup",
    imageUrl:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
    metric: "Zero leads perdidos",
  },
  {
    company: "Operação de Aquaponia",
    industry: "Agricultura",
    before:
      "Alimentação dos peixes, qualidade da água, saúde das plantas, tudo monitorado separadamente. Dados em três apps diferentes. Correlacionar problemas levava horas de trabalho de detetive.",
    after:
      "Dashboard unificado. A IA sinaliza quando comportamento dos peixes + temperatura da água + crescimento das plantas sugerem um problema surgindo.",
    quote:
      "Previ um problema de filtro 3 dias antes de o sistema colapsar. Um dashboard em vez de três apps.",
    author: "Agricultor de Aquaponia",
    imageUrl:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop",
    metric: "3 apps -> 1 dashboard",
  },
  {
    company: "Centro de Terapia Alternativa",
    industry: "Saúde e Bem-estar",
    before:
      "4 praticantes, 4 agendas separadas, clientes confusos sobre quem faz o quê. A recepcionista passava metade do dia só encaminhando dúvidas.",
    after:
      "Sistema único de reservas com IA que pergunta o que o cliente precisa e o conecta ao praticante certo. Trata conflitos de horário automaticamente.",
    quote:
      "A recepcionista agora faz acompanhamento de clientes em vez de tetris de agendas. Erros de reserva caíram para quase zero.",
    author: "Gerente do Centro",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    metric: "Quase zero erros de reserva",
  },
  {
    company: "Escola de Idiomas",
    industry: "Educação",
    before:
      "O administrador passava mais de 2 horas por dia respondendo as mesmas perguntas. Preços, horários, níveis, formas de pagamento. De novo e de novo.",
    after:
      "Chatbot trata 80% das dúvidas. Conhece os cursos, consulta a disponibilidade, envia links de inscrição, responde em português ou inglês.",
    quote:
      "O administrador foca na experiência do aluno. As inscrições subiram porque as respostas acontecem na hora, não no próximo dia útil.",
    author: "Administrador da Escola",
    imageUrl:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
    metric: "80% das dúvidas automatizadas",
  },
  {
    company: "Consultor de Agricultura Regenerativa",
    industry: "Consultoria",
    before:
      "Dados das fazendas dos clientes espalhados em e-mails, PDFs e áudios. Preparar um relatório de saúde do solo significava vasculhar meses de mensagens.",
    after:
      "Os clientes enviam dados por um formulário simples. A IA organiza tudo, sinaliza anomalias, redige a estrutura inicial do relatório.",
    quote:
      "Tempo de preparação de relatórios reduzido pela metade. Mais tempo no campo, menos tempo no e-mail.",
    author: "Consultor Agrícola",
    imageUrl:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
    metric: "50% menos tempo em relatórios",
  },
  {
    company: "Projeto de Permacultura",
    industry: "Agricultura",
    before:
      "O plano de 5 anos da floresta de alimentos existia quase todo na cabeça do fundador. Voluntários chegavam sem saber o que fazer. Consórcios de plantas, fluxos de água, tarefas sazonais espalhados em cadernos, PDFs e conversas mal lembradas. O conhecimento ia embora com pessoas-chave.",
    after:
      "Sistema central acompanha o que está plantado onde, o que precisa ser feito neste mês e por quê. Os voluntários recebem tarefas claras conforme suas habilidades. A IA ajuda a responder 'o que deveria ir junto do consórcio da macieira?' com base nos próprios dados do local.",
    quote:
      "Novos voluntários produtivos desde o primeiro dia. O conhecimento institucional permanece mesmo quando as pessoas saem.",
    author: "Fundador do Projeto",
    imageUrl:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop",
    metric: "Conhecimento institucional preservado",
  },
],
};
