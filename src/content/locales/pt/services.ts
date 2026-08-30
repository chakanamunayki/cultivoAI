import type { SiteContent } from "../../types";

export const ptServicesContent: Pick<SiteContent, "servicesTitle" | "servicesSubtitle" | "services"> = {
  servicesTitle: "Nossos Serviços",
  servicesSubtitle:
    "Não vendemos fumaça. Construímos sistemas práticos que facilitam executar um bom trabalho. Não sabe por onde começar? Uma conversa de 15 minutos já basta.",
  services: [
    {
      icon: "Brain",
      title: "Cérebro da Empresa: Camada de Conhecimento Protegida",
      eng: "Company Brain: Protected Knowledge Layer",
      description: "A camada de conhecimento para a sua IP científica e operacional. Protocolos, processos e dados de campo se transformam em um único cérebro estruturado e consultável, com a camada de conhecimento isolada da camada de execução para que a sua IP fique protegida e com acesso por função. Pronto para IoT, satélite, dados de laboratório e campo, MRV e carbono.",
      details: [
        "Protege a IP dos seus protocolos. Seu know-how vira uma camada de conhecimento estruturada e versionada, não PDFs soltos nem a cabeça das pessoas.",
        "A camada de conhecimento fica isolada da camada de execução. O que o sistema sabe é limitado por tenant, projeto e função, para que nada vaze entre eles.",
        "Acesso por função: o técnico de laboratório vê protocolos, o time comercial vê clientes e propostas, o diretor vê tudo. Ninguém vê o que não é da sua alçada.",
        "Evidência científica estruturada, construída para escalar de 400 documentos a dezenas de milhares, e pronta para ingerir dados de IoT, satélite, laboratório e campo para MRV e carbono.",
        "Privacidade por design: roda localmente quando é preciso. Nenhum documento seu sai do seu sistema ao indexar.",
      ],
      imageUrl: "/landing/photos/services/ai-assistants.png",
      animationKey: "company-brain",
      modal: {
        whatItMeans:
          "Uma camada de conhecimento protegida construída sobre a sua IP científica e operacional real: protocolos, processos, histórico de projetos, dados comerciais. Seu time pergunta em linguagem natural e o cérebro responde com o que o seu negócio já sabe, limitado à função de cada um.",
        whyItMatters:
          "A IP dos seus protocolos é a sua vantagem, e hoje ela está presa em PDFs, na cabeça de pessoas-chave, no WhatsApp. Quando alguém não está disponível ela se perde, quando chega alguém novo começa do zero, e sem isolamento vaza entre funções e clientes. O CHAK Brain, o sistema que construímos para a CHAK FoodTech, resolveu exatamente isso e segue aprendendo a cada dia que o time o usa.",
        whatsIncluded: [
          "Ingestão da sua IP real: protocolos, processos, comercial, projetos (PDF, Word, Excel)",
          "Camada de conhecimento isolada da camada de execução, limitada por tenant, projeto e função",
          "Acesso por função: cada pessoa chega ao seu domínio, nada além disso",
          "Pronto para IoT, satélite, dados de laboratório e campo, MRV e carbono",
          "Privacidade por design: roda localmente, sem dependência da nuvem para indexar",
        ],
        idealFit: [
          "Laboratórios e times de agritech cuja IP de protocolos é o ativo central",
          "Organizações onde cada função precisa de contexto científico e comercial distinto sem cruzar as linhas",
          "Times que precisam que o seu know-how fique na empresa quando as pessoas saem",
        ],
        typicalOutcome:
          "A sua IP de protocolos fica protegida, estruturada e consultável. O time para de vasculhar arquivos e de esperar a única pessoa que sabe. As respostas chegam em segundos, limitadas a cada função, e o know-how fica quando as pessoas saem.",
      },
    },
    {
      icon: "BarChart3",
      title: "Sistemas de Decisão e Automação",
      eng: "Decision and Automation Systems",
      description: "A camada de execução que roda sobre o seu conhecimento. Dashboards, automações e assistentes que transformam seus dados e protocolos em decisões diárias e operações sem intervenção manual.",
      details: [
        "Dashboards de decisão: dados de campo, laboratório e comercial em uma única visão ao vivo, para agir sobre os sinais cedo em vez de esperar o fechamento do mês.",
        "Automações que tiram o trabalho repetitivo: acolhida, onboarding, relatórios e transições que rodam sem que alguém fique correndo atrás.",
        "Assistentes de IA treinados com o seu negócio: respondem, qualificam, agendam e encaminham no WhatsApp, e-mail e web.",
      ],
      imageUrl: "/landing/photos/services/decision-dashboards.jpg",
      animationKey: "dashboards",
      modal: {
        whatItMeans:
          "Os sistemas de trabalho que se apoiam sobre a sua camada de conhecimento: dashboards para ver, automações para executar e assistentes para responder. Tudo construído sobre o que o seu negócio já sabe.",
        whyItMatters:
          "Um cérebro protegido é só metade do valor. A outra metade é agir sobre ele todos os dias sem aumentar a equipe. É aqui que o conhecimento vira decisões mais rápidas e menos coisas caindo no vão.",
        whatsIncluded: [
          "Definição de KPIs e sinais: o que observar e por quê",
          "Consolidação de dados de planilhas, bancos de dados, sensores e CRMs em uma única visão ao vivo",
          "Automação de fluxos-chave: acolhida, onboarding, relatórios, acompanhamento",
          "Assistentes de IA para suporte, qualificação, agenda e orçamentos",
          "Integrações com WhatsApp, e-mail e calendários, com uma janela curta de iteração após o lançamento",
        ],
        idealFit: [
          "Times cujos dados estão espalhados entre ferramentas, arquivos e dispositivos de campo",
          "Operações com passos manuais repetitivos que seguem tirando as pessoas do trabalho de verdade",
          "Você quer agir sobre o que sabe todos os dias, não reconciliar isso todo mês",
        ],
        typicalOutcome:
          "Uma única visão ao vivo da operação, fluxos-chave rodando sozinhos e respostas mais rápidas para clientes e time. Menos tarefas manuais, decisões mais cedo.",
      },
    },
    {
      icon: "Rocket",
      title: "Desenvolvimentos de IA e Software sob Medida",
      eng: "Custom AI and Software Builds",
      description: "Da ideia à primeira versão. Ferramentas de IA, agentes e software sob medida, construídos para como a sua operação funciona de verdade, com orientação honesta sobre o que construir e o que deixar de fora.",
      details: [
        "Ferramentas e software interno sob medida: apps para produtores, ferramentas de laboratório, portais de clientes, agentes internos.",
        "Sites modernos e rápidos e experiências digitais que apoiam confiança, conversão e acompanhamento.",
        "Validação técnica e de mercado: o stack certo, escalável desde o primeiro dia, sem construir demais.",
      ],
      imageUrl: "/landing/photos/services/websites-digital-experiences.webp",
      animationKey: "software-web",
      modal: {
        whatItMeans:
          "O parceiro de construção para inovadores que precisam de ferramentas reais, não de slides. Desenhamos e lançamos o software, os agentes e as experiências web sob medida que a sua operação precisa, e dizemos claramente o que construir agora e o que depois.",
        whyItMatters:
          "A maioria dos times de agritech e biotech não tem um fundador técnico na sala. Esse vazio custa meses e caminhos errados. Essa é essa pessoa: alguém que já construiu e lançou produtos reais, decidindo o que importa e construindo com você.",
        whatsIncluded: [
          "Escopo e rota: o que construir agora e o que depois",
          "Software sob medida, ferramentas internas e agentes de IA construídos em torno dos seus fluxos",
          "Sites modernos e experiências digitais focadas em performance e conversão",
          "Decisões técnicas e de stack que se mantêm defensáveis conforme você cresce",
          "Um plano de lançamento, analytics básico e uma janela curta de iteração após o lançamento",
        ],
        idealFit: [
          "Times de agritech e biotech em estágio inicial construindo algo real",
          "Fundadores sem parceiro técnico que precisam de clareza e impulso",
          "Você quer ferramentas construídas para a sua operação, não soluções genéricas que encaixam pela metade",
        ],
        typicalOutcome:
          "Uma primeira versão que você realmente pode lançar e aprender com ela, construída sobre decisões técnicas defensáveis, com menos caminhos errados e menos orçamento desperdiçado.",
      },
    },
    {
      icon: "CalendarCheck",
      title: "Sistemas para Retiros (Bem-estar)",
      eng: "Retreat Ops Systems (Wellness)",
      description:
        "A nossa linha de bem-estar. Um sistema operacional completo para retiros: da primeira reserva ao acompanhamento final, com fluxos claros para o time e uma experiência fluida para os hóspedes.",
      details: [
        "Reservas, pagamentos, faturamento",
        "Mensagens pré, durante, pós retiro",
        "Itinerários, checklists, funções",
        "Feedback, NPS, acompanhamento",
        "Dashboard de ocupação, receita, satisfação",
      ],
      imageUrl: "/landing/photos/services/health-wellness.jpg",
      animationKey: "retreat-ops",
      modal: {
        whatItMeans:
          "A nossa linha de bem-estar: um sistema de operação para retiros. Reservas, pagamentos, mensagens, itinerários, checklists, feedback, acompanhamento, dashboards.",
        whyItMatters:
          "Menos caos operacional. Melhor experiência para hóspedes. O time recupera o foco.",
        whatsIncluded: [
          "Reservas, pagamentos, faturamento",
          "Mensagens pré, durante, pós retiro",
          "Itinerários, checklists, funções",
          "Feedback, NPS, acompanhamento",
          "Dashboard de ocupação, receita, satisfação",
        ],
        idealFit: [
          "Retiros com operação repetível",
          "Você quer menos mensagens soltas, mais clareza",
          "Você precisa de acompanhamento sem atrito para os hóspedes",
        ],
        typicalOutcome:
          "Uma operação mais clara. Menos caos. Acompanhamento consistente. Melhor experiência.",
      },
    },
  ],
};
