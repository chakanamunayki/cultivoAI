import type { SiteContent } from "../../types";

export const ptProjectsContent: Pick<SiteContent, "projectsTitle" | "projectsSubtitle" | "projects"> = {
projectsTitle: "O que Já Construímos",
projectsSubtitle: "Projetos selecionados do nosso trabalho atual",
projects: [
  {
    title: "CHAK FoodTech: A IP dos Protocolos, Protegida na Execução",
    desc: "Construímos a camada digital de uma plataforma de produção agri-biotech. Os cientistas criam o protocolo; o CHAK Brain guia passo a passo quem o executa, sem nunca expor o protocolo completo. A IP fica no sistema.",
    fullDesc:
      "A CHAK FoodTech transforma um objetivo biológico em um processo de produção vegetal controlado, mensurável e reprodutível. Nós construímos a camada digital, e ela funciona como um único loop. Os cientistas e líderes de laboratório criam o protocolo no construtor: cada passo, parâmetro e sequência. Esse protocolo completo é a IP. Quando chega a hora de executá-lo, o CHAK Brain guia quem faz o trabalho passo a passo: o que fazer agora, os parâmetros, a frequência, a assepsia, e captura as observações dessa pessoa contra aquele passo. O operador executa o protocolo sem nunca ter o documento completo. O acesso é por função: o técnico de laboratório é guiado pelos passos, o time comercial vê clientes, o diretor vê tudo. O protocolo completo e os dados acumulados ficam no sistema, não nas mãos do operador, não no WhatsApp, não saindo pela porta.",
    lessons: "Quem executa um protocolo não precisa do protocolo completo. Precisa do passo atual. Criação e execução são um único loop, e a receita completa, a IP de verdade, nunca precisa sair do sistema.",
    status: "Ativo",
    image: "/landing/photos/project-screenshots/Screenshot_chak-foodtech.com.jpeg",
    images: [
      "/landing/photos/project-screenshots/Screenshot_chak-foodtech.com.jpeg",
    ],
    url: "https://chak-foodtech.com",
    tags: ["Agri-biotech", "IP de Protocolos", "RAG"],
    modal: {
      whatItMeans:
        "Um único loop sobre uma operação agri-biotech real. Os cientistas criam os protocolos no construtor; quem executa é guiado passo a passo e suas observações voltam ao sistema. Tudo limitado a cada função, e o protocolo completo nunca sai do sistema.",
      whyItMatters:
        "Na produção baseada em ciência, o protocolo é a IP. Se você entrega a receita completa a todos que a executam, ela vaza entre funções e vai embora pela porta. O CHAK Brain guia a execução passo a passo, então o operador recebe exatamente o que precisa para fazer o trabalho e nunca o protocolo completo. A IP fica estruturada, com acesso por função e nas mãos da empresa.",
      whatsIncluded: [
        "Construtor onde os cientistas e líderes de laboratório criam o protocolo completo: passos, parâmetros, sequência",
        "Guia de execução passo a passo: o operador vê o passo atual, seus parâmetros e frequência, nada além disso",
        "Observações capturadas contra cada passo conforme o trabalho é feito",
        "Acesso por função, para que o protocolo completo e os dados fiquem protegidos no sistema",
      ],
      idealFit: [
        "Laboratórios e times agri-biotech cuja IP de protocolos é o ativo central",
        "Operações que precisam que o pessoal de campo ou laboratório execute protocolos com precisão sem entregar a receita completa",
        "Times que precisam que o know-how e os dados fiquem na empresa quando as pessoas mudam",
      ],
      typicalOutcome:
        "Os protocolos são executados com consistência no campo, as observações voltam estruturadas, e a receita completa, a IP de verdade, fica dentro da empresa em vez do telefone de alguém.",
    },
  },
  {
    title: "RaizCapitalColombia.co",
    desc: "Projetos e imóveis na Colômbia combinando dados e criatividade para propor modelos de negócio realistas.",
    fullDesc:
      "Uma plataforma de estratégia e informação que organiza oportunidades com clareza e ajuda a avaliar decisões com fundamentos práticos.",
    lessons: "A clareza do enquadramento e a qualidade dos dados melhoram as decisões.",
    status: "Ativo",
    image: "/landing/photos/project-screenshots/Screenshot_www.raizcapital.co.jpeg",
    images: [
      "/landing/photos/project-screenshots/Screenshot_www.raizcapital.co.jpeg",
    ],
    url: "https://www.raizcapital.co/",
    tags: ["Dados", "Estratégia"],
    modal: {
      whatItMeans:
        "Uma camada de estratégia e informação que facilita comparar oportunidades e defender decisões.",
      whyItMatters:
        "Quando tudo é difuso, o time fica preso em opiniões. Enquadramento claro + dados limpos melhora a qualidade da decisão.",
      whatsIncluded: [
        "Estrutura de informação clara (o que importa e o que não)",
        "Forma consistente de comparar oportunidades",
        "Visões simples para conversas de decisão",
        "Um sistema que pode evoluir conforme o projeto cresce",
      ],
      idealFit: [
        "Times avaliando múltiplas oportunidades ou direções",
        "Projetos que precisam de clareza mais do que de hype",
        "Tomadores de decisão que valorizam pensamento estruturado",
      ],
      typicalOutcome:
        "Avaliação mais rápida, trade-offs mais claros e menos discussões circulares.",
    },
  },
  {
    title: "SetaSouls. Site de marca holística",
    desc: "98 em performance. 100 em SEO. 100 em boas práticas. Design, velocidade e posicionamento construídos juntos desde o início.",
    fullDesc:
      "Um site de marca de bem-estar construído e otimizado sobre a Vercel. Cada decisão de arquitetura, performance e imagem foi parte do design desde o primeiro dia, não um remendo no final. O resultado: 98 em performance, 96 em acessibilidade, 100 em boas práticas e 100 em SEO técnico.",
    lessons: "O Lighthouse não é o objetivo. É a prova de que as decisões certas foram tomadas desde o começo.",
    status: "Em desenvolvimento",
    image: "/landing/photos/project-screenshots/Screenshot_SetaSouls.app.jpeg",
    images: [
      "/landing/photos/project-screenshots/Screenshot_SetaSouls.app.jpeg",
    ],
    url: "https://holisticsoul.vercel.app/",
    tags: ["Web", "Vercel"],
    stats: [
      { label: "Performance", value: "98" },
      { label: "SEO", value: "100" },
      { label: "Boas Práticas", value: "100" },
      { label: "Acessibilidade", value: "96" },
    ],
    modal: {
      whatItMeans:
        "Um site moderno, rápido e posicionado que representa a marca com clareza e confiança.",
      whyItMatters:
        "98 em performance, 100 em SEO, 100 em boas práticas. Não é sorte. É o resultado de construir com critério desde o início.",
      whatsIncluded: [
        "Arquitetura de performance: 98/100 no Lighthouse",
        "SEO técnico completo: 100/100, com estrutura, metadados e schema",
        "Acessibilidade: 96/100",
        "Design de marca e experiência do usuário",
        "Publicado e otimizado sobre a Vercel",
      ],
      idealFit: [
        "Marcas que precisam de presença digital de nível premium",
        "Projetos onde performance e design são igualmente importantes",
        "Times que querem resultados reais, não só promessas",
      ],
      typicalOutcome:
        "Um site que carrega em frações de segundo, aparece nas buscas e passa a sensação de bem construído.",
    },
  },
],
};
