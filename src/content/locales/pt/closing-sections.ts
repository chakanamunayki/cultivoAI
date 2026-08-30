import type { SiteContent } from "../../types";

export const ptClosingSectionsContent: Pick<
  SiteContent,
  "values" | "mission" | "whatHappensNext" | "footer" | "chat" | "contactForm" | "terminal"
> = {
  values: {
    title: "Nossos Valores",
    subtitle: "O que não muda, independentemente do projeto",
    values: [
      {
        icon: "Sprout",
        title: "CULTIVAR, NÃO EXTRAIR",
        description:
          "Construímos para o longo prazo. Preferimos relações que crescem a transações rápidas. Se no próximo ano não houver nada para melhorar, algo deu errado.",
      },
      {
        icon: "Scale",
        title: "HONESTIDADE ANTES DA VENDA",
        description:
          "Se não formos o encaixe certo, dizemos. Se houver uma solução mais simples e barata, propomos. Não construímos o que você não precisa.",
      },
      {
        icon: "Hammer",
        title: "O PROCESSO É O PRODUTO",
        description:
          "Um sistema útil exige descoberta real, primeiras versões que falham e decisões honestas. Não existe a solução mágica de duas semanas. Mas existe, sim, uma primeira versão sólida que dá para melhorar.",
      },
    ],
  },

  mission: {
    title: "Por Que Existimos",
    statement: [
      "Construímos para times que fazem trabalho social e ambiental real: agritech, biotech, restauração, a ciência que de fato move a agulha.",
      "O difícil é proteger a IP e transformar os dados de laboratório e campo em decisões. É isso que construímos, bem feito, para quem constrói algo que importa.",
      "Quanto melhor construímos, mais longe o impacto chega.",
    ],
    tagline: "Não somos neutros no que construímos",
  },

  whatHappensNext: {
    title: "O que acontece depois que você entra em contato?",
    subtitle: "Simples assim. Sem surpresas.",
    steps: [
      {
        number: "1",
        title: "Respondemos rápido",
        description: "Você recebe uma resposta direta e um próximo passo claro.",
      },
      {
        number: "2",
        title: "Se houver encaixe, fazemos uma conversa de 15 minutos",
        description: "Mapeamos o gargalo real e propomos o próximo passo mais útil.",
      },
      {
        number: "3",
        title: "Construímos a versão um e iteramos",
        description: "Depois melhoramos com você com base no uso real.",
      },
    ],
    cta: "Vamos começar a conversa",
    ctaButton: "Vamos conversar",
  },

  footer: {
    cta: "Conta pra gente o que você está de fato tentando construir.",
    ctaButton: "Vamos conversar",
    copyright: "2026 Cultivo AI. Da Colômbia, trabalhando para o mundo.",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        label: "LinkedIn",
      },
      {
        platform: "whatsapp",
        url: "https://wa.me/573106172607",
        label: "WhatsApp",
      },
      {
        platform: "instagram",
        url: "#",
        label: "Instagram",
        comingSoon: true,
      },
      {
        platform: "facebook",
        url: "#",
        label: "Facebook",
        comingSoon: true,
      },
    ],
    contactInfo: {
      email: "hola@cultivoai.co",
      whatsapp: "+573106172607",
      whatsappDisplay: "+57 310 617 2607",
      location: "Medellín, Colômbia",
      locationSecondary: "Worldwide",
    },
    quickLinks: [
      { label: "Início", href: "#hero" },
      { label: "Sobre", href: "#about" },
      { label: "Serviços", href: "#services" },
      { label: "Parcerias", href: "#partnerships" },
      { label: "Projetos", href: "#projects" },
      { label: "Processo", href: "#what-happens-next" },
    ],
    quickLinksTitle: "Navegação",
    contactTitle: "Contato",
    socialTitle: "Siga a gente",
  },

  chat: {
    title: "Assistente CultivoAI",
    placeholder: "Digite a sua mensagem...",
    sendButton: "Enviar",
    welcomeMessage:
      "Olá. Sou o assistente da CultivoAI. Me conta o que você está tentando construir e onde está travado. Se houver encaixe, agendamos uma conversa de 15 minutos com o Paul.",
    contextualGreetings: {
      general:
        "Olá. Me conta o que você está tentando construir e qual é o gargalo agora. Eu ajudo a mapear o próximo passo.",
      booking:
        "Perfeito. Podemos agendar uma conversa de 15 minutos com o Paul. Antes disso, o que você está construindo e qual é o bloqueio principal?",
      story:
        "O Paul é um fundador técnico que já lançou produtos em mais de 70 países e construiu o CHAK Brain sozinho. Time pequeno e sênior, trabalho direto, sem handoffs. O que você quer entender: o processo, os projetos ou o encaixe?",
      service:
        "Vi que você tem interesse em {service}. Bom ponto de partida. Qual é o gargalo real e que resultado você precisa nas próximas semanas?",
      partnership:
        "Os modelos de parceria dependem de escopo e prazos. O que você está construindo e o que está freando o avanço agora?",
      qualification:
        "Vamos fazer um teste rápido de encaixe. O que você constrói, que prazo você tem e quem decide?",
      impact:
        "Vi que você tem interesse em trabalho com propósito. Se você está construindo algo real e precisa de execução prática, estamos no caminho. O que você está construindo?",
      formFallback: "Prefere uma conversa de 15 minutos? Deixa os seus dados.",
    },
  },

  contactForm: {
    title: "Agende uma conversa de 15 minutos",
    subtitle: "Compartilhe o básico e a gente chega preparado.",
    nameLabel: "Nome",
    namePlaceholder: "Seu nome",
    emailLabel: "E-mail",
    emailPlaceholder: "voce@email.com",
    whatsappLabel: "WhatsApp (opcional)",
    whatsappPlaceholder: "+55 11 91234 5678",
    projectTypeLabel: "Que tipo de projeto você tem em mente?",
    projectTypes: [
      "Company Brain / camada de conhecimento protegida",
      "Plataforma de dados agritech",
      "Otimização de fluxos",
      "Chatbot / Assistente de IA",
      "Dashboard de decisão",
      "Sistema de conhecimento e conteúdo",
      "Software / Site",
      "Consultoria para startup",
      "Não tenho certeza, preciso de orientação",
      "Outro",
    ],
    descriptionLabel: "Conta pra gente rapidamente sobre o seu projeto",
    descriptionPlaceholder: "Que problema você quer resolver? Que resultado você espera?",
    submitButton: "Solicitar conversa de 15 minutos",
    chatPrompt: "Prefere começar pelo chat? Use o assistente.",
  },

  terminal: {
    sectionTitle: "É assim que trabalhamos",
    summary: "Sem caos. Escopo claro. Versão um rápida. Iteração direta.",
    welcomeLine1: "Último acesso: ",
    welcomeLine2: "Suíte de Automação Cultivo AI v2.5.0",
    script: [
      { text: "Iniciando descoberta...", type: "command", delay: 800 },
      { text: "Mapeando os seus protocolos...", type: "info", delay: 600 },
      { text: "Isolando a camada de IP...", type: "info", delay: 700 },
      { text: "Desenhando o acesso por função...", type: "ai", delay: 700 },
      { text: "Estruturando dados de laboratório e campo...", type: "command", delay: 700 },
      { text: "Construindo a camada de conhecimento...", type: "info", delay: 700 },
      { text: "Lançando e testando...", type: "success", delay: 700 },
      { text: "Medindo resultados...", type: "event", delay: 700 },
      { text: "Iterando com o seu time...", type: "success", delay: 2500 },
    ],
  },
};
