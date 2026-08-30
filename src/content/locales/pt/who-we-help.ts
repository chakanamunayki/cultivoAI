import type { SiteContent } from "../../types";

export const ptWhoWeHelpContent: Pick<SiteContent, "whoWeHelp"> = {
  whoWeHelp: {
    title: "Somos um bom encaixe?",
    idealTitle: "Somos ideais para você se...",
    idealItems: [
      "Você está construindo em agritech, biotech ou trabalho científico com impacto real.",
      "Você quer sistemas práticos, não hype.",
      "Você valoriza clareza, design e comunicação humana.",
      "Você quer uma relação direta com quem constrói.",
    ],
    notIdealTitle: "Provavelmente não somos um bom encaixe se...",
    notIdealItems: [
      "Você quer barato e imediato acima da qualidade.",
      "Você quer zero envolvimento e resultados mágicos.",
      "Você precisa de uma agência grande com time que fica trocando.",
    ],
    sectorsTitle: "Onde fazemos o nosso melhor trabalho",
    sectors: [
      {
        name: "Agritech e biotech",
        description: "A produção baseada em ciência funciona com protocolos e dados. Construímos a camada que protege a IP dos seus protocolos, guia a execução por função e transforma os dados de laboratório e campo em decisões.",
        icon: "Sprout",
        imageUrl: "/landing/photos/sectors/sustainability-regenerative.webp",
        chatButtonLabel: "Vamos conversar",
        detailsButtonLabel: "Saber mais",
        modal: {
          whatItMeans:
            "A camada digital de uma operação baseada em ciência: protocolos criados, execução com acesso por função e dados de laboratório e campo estruturados em um único sistema protegido.",
          whyItMatters:
            "Em agritech e biotech, a IP dos protocolos é o ativo. Nós a mantemos estruturada e com acesso por função, guiamos a execução passo a passo sem expor a receita completa, e transformamos os seus dados em decisões.",
          whatsIncluded: [
            "Uma camada de conhecimento protegida sobre protocolos, observações e experimentos",
            "Guia de execução passo a passo sem expor o protocolo completo",
            "Pipelines de dados prontos para IoT, satélite, laboratório e campo, MRV e carbono",
            "Acesso por função para que ninguém veja o que não é da sua alçada",
          ],
          idealFit: [
            "Laboratórios e times de agritech cuja IP de protocolos é o ativo central",
            "Operações de ambiente controlado, micropropagação e restauração",
            "Times que transformam dados de laboratório e campo em decisões",
          ],
          typicalOutcome:
            "Os protocolos são executados com consistência, a IP fica protegida e os seus dados viram decisões em vez de arquivos espalhados.",
        },
        whoWeHelp: [
          "Laboratórios e times de agritech cuja IP de protocolos é o ativo central",
          "Operações de ambiente controlado, micropropagação e restauração",
          "Times que transformam dados de laboratório e campo em decisões",
        ],
        howWeHelp: [
          "Uma camada de conhecimento protegida sobre protocolos, observações e experimentos",
          "Guia de execução passo a passo sem expor o protocolo completo",
          "Pipelines de dados prontos para IoT, satélite, laboratório e campo, MRV e carbono",
          "Acesso por função para que ninguém veja o que não é da sua alçada",
        ],
        exampleProjects: [
          "Camada de conhecimento protegida + execução de protocolos por função",
          "Pipeline de dados de laboratório e campo alimentando um dashboard de decisão",
          "Captura de experimentos que transforma ensaios em IP estruturada",
        ],
      },
      {
        name: "Sustentabilidade e projetos regenerativos",
        description: "Regenerar solo, ecossistemas ou comunidades leva anos, coordenação e paciência. Construímos os sistemas que mantêm o time alinhado, os parceiros informados e os relatórios em dia, para que o trabalho de campo não se perca em documentos.",
        icon: "Sprout",
        imageUrl: "/landing/photos/sectors/sustainability-regenerative.jpg",
        chatButtonLabel: "Vamos conversar",
        detailsButtonLabel: "Saber mais",
        modal: {
          whatItMeans:
            "Sistemas práticos para coordenação, relatórios e acompanhamento para que o trabalho continue real no campo, não só em documentos.",
          whyItMatters:
            "Times de sustentabilidade coordenam parceiros, trabalho de campo e prestação de contas. Um sistema claro mantém o impulso alto e a confusão baixa.",
          whatsIncluded: [
            "Sistemas simples para coordenação e prestação de contas",
            "Dashboards para decisões e relatórios",
            "Captura de conhecimento para que o aprendizado não se perca",
            "Experiências web que comuniquem credibilidade e impacto",
          ],
          idealFit: [
            "Projetos regenerativos coordenando parceiros e trabalho de campo",
            "Times equilibrando metas de impacto com operação real",
            "Organizações que precisam de melhor relatório e acompanhamento",
          ],
          typicalOutcome:
            "Menos caos, relatórios mais claros e um time que executa de forma consistente entre pessoas e parceiros.",
        },
        whoWeHelp: [
          "Projetos regenerativos coordenando parceiros e trabalho de campo",
          "Times equilibrando metas de impacto com operação real",
          "Organizações que precisam de melhor relatório e acompanhamento",
        ],
        howWeHelp: [
          "Sistemas simples para coordenação e prestação de contas",
          "Dashboards para decisões e relatórios",
          "Captura de conhecimento para que o aprendizado não se perca",
          "Experiências web que comuniquem credibilidade e impacto",
        ],
        exampleProjects: [
          "Dashboard de operação + ritmo de relatório",
          "Base de conhecimento para processos, parceiros e aprendizados",
          "Site de projeto que torna o trabalho fácil de entender e apoiar",
        ],
      },
      {
        name: "Educação alternativa",
        description: "Um aluno lembra como foi feito se sentir, não a plataforma que usaram. Construímos os sistemas que mantêm os alunos apoiados e os instrutores focados em ensinar.",
        icon: "GraduationCap",
        imageUrl: "/landing/photos/sectors/alternative-education.jpg",
        chatButtonLabel: "Vamos conversar",
        detailsButtonLabel: "Saber mais",
        modal: {
          whatItMeans:
            "Sistemas que apoiam alunos e equipe: melhor comunicação, próximos passos claros e menos coordenação manual.",
          whyItMatters:
            "Programas educacionais ganham com consistência. Quando a operação é confusa, o aluno sente. Um sistema simples protege a experiência.",
          whatsIncluded: [
            "Fluxos de acolhida e matrícula que reduzam trabalho manual",
            "Assistentes para suporte, FAQs e encaminhamento",
            "Dashboards para ver progresso, capacidade e necessidades de acompanhamento",
            "Sistemas de conteúdo e conhecimento para comunicação consistente",
          ],
          idealFit: [
            "Programas com instrutores, turmas e comunicação constante",
            "Times cuidando de matrículas, agendas e suporte a alunos",
            "Organizações que precisam de uma experiência humana e consistente",
          ],
          typicalOutcome:
            "Uma jornada do aluno mais fluida, menos mensagens perdidas e mais tempo para o time ensinar.",
        },
        whoWeHelp: [
          "Programas com instrutores, turmas e comunicação constante",
          "Times cuidando de matrículas, agendas e suporte a alunos",
          "Organizações que precisam de uma experiência humana e consistente",
        ],
        howWeHelp: [
          "Fluxos de acolhida e matrícula que reduzam trabalho manual",
          "Assistentes para suporte, FAQs e encaminhamento",
          "Dashboards para ver progresso, capacidade e necessidades de acompanhamento",
          "Sistemas de conteúdo e conhecimento para comunicação consistente",
        ],
        exampleProjects: [
          "Fluxo de matrícula + assistente de suporte",
          "Dashboard de programa para operação e acompanhamento",
          "Sistema web e de conteúdo para mensagens consistentes",
        ],
      },
      {
        name: "Startups com missão",
        description: "A sua ideia pode mudar algo real, mas primeiro ela precisa existir e funcionar. Ajudamos você a construir a primeira versão certa: focada e pronta para aprender.",
        icon: "Rocket",
        imageUrl: "/landing/photos/sectors/mission-led-startups.webp",
        chatButtonLabel: "Vamos conversar",
        detailsButtonLabel: "Saber mais",
        modal: {
          whatItMeans:
            "Um parceiro sênior e prático para lançar a primeira versão, manter o escopo focado e evitar desvios caros.",
          whyItMatters:
            "As startups morrem na lacuna entre ideia e execução. Escopo claro e feedback rápido mantêm o impulso vivo.",
          whatsIncluded: [
            "Primeira versão com escopo focado e defensável",
            "Fluxos e dashboards para clareza operacional",
            "Assistentes e sistemas de conhecimento para escalar o suporte",
            "Consultoria de produto para evitar construir demais",
          ],
          idealFit: [
            "Times iniciais que precisam de uma primeira versão, rápida e utilizável",
            "Fundadores que querem decisões honestas e prioridades claras",
            "Times construindo em saúde, sustentabilidade ou bem público",
          ],
          typicalOutcome:
            "Uma primeira versão lançada com responsabilidade clara e um plano para iterar com base no uso real.",
        },
        whoWeHelp: [
          "Times iniciais que precisam de uma primeira versão, rápida e utilizável",
          "Fundadores que querem decisões honestas e prioridades claras",
          "Times construindo em saúde, sustentabilidade ou bem público",
        ],
        howWeHelp: [
          "Primeira versão com escopo focado e defensável",
          "Fluxos e dashboards para clareza operacional",
          "Assistentes e sistemas de conhecimento para escalar o suporte",
          "Consultoria de produto para evitar construir demais",
        ],
        exampleProjects: [
          "MVP + fluxo para acolhida e acompanhamento",
          "Dashboard de decisão para prioridades e métricas",
          "Base de conhecimento que cresce com o produto",
        ],
      },
      {
        name: "Saúde e bem-estar",
        description: "O seu time sustenta pessoas em momentos vulneráveis. Nós sustentamos a operação. Construímos sistemas que cuidam da administração, comunicação e acompanhamento, para que o time foque no que veio fazer.",
        icon: "Heart",
        imageUrl: "/landing/photos/sectors/health-wellness.jpg",
        chatButtonLabel: "Vamos conversar",
        detailsButtonLabel: "Saber mais",
        modal: {
          whatItMeans:
            "Sistemas que ajudam times de saúde e bem-estar a entregar um serviço consistente: acolhida clara, acompanhamento claro e tom humano.",
          whyItMatters:
            "No trabalho de saúde, os atrasos e a inconsistência derrubam a confiança. Um sistema simples reduz passos perdidos e libera o time para focar nas pessoas.",
          whatsIncluded: [
            "Fluxos de acolhida, agenda e acompanhamento",
            "Assistentes com tom humano para FAQs, triagem e encaminhamento",
            "Dashboards para visibilidade (retenção, pipeline, operação)",
            "Sistemas de conhecimento para manter o alinhamento",
          ],
          idealFit: [
            "Clínicas, programas e profissionais com serviços recorrentes",
            "Times com complexidade em acolhida, agenda e acompanhamento",
            "Organizações onde tom, confiança e consistência importam",
          ],
          typicalOutcome:
            "Resposta mais rápida, transições mais claras e uma operação mais calma que o cliente sente.",
        },
        whoWeHelp: [
          "Clínicas, programas e profissionais com serviços recorrentes",
          "Times com complexidade em acolhida, agenda e acompanhamento",
          "Organizações onde tom, confiança e consistência importam",
        ],
        howWeHelp: [
          "Fluxos de acolhida, agenda e acompanhamento",
          "Assistentes com tom humano para FAQs, triagem e encaminhamento",
          "Dashboards para visibilidade (retenção, pipeline, operação)",
          "Sistemas de conhecimento para manter o alinhamento",
        ],
        exampleProjects: [
          "Fluxo de entrega de serviço + dashboard simples",
          "Assistente que qualifica e encaminha solicitações à pessoa certa",
          "Renovação web conectada a acompanhamento e próximos passos",
        ],
      },
    ],
    cta: "Aceitamos um número limitado de projetos e vamos a fundo. Conta pra gente o que você está construindo.",
    ctaButton: "Conta sobre o seu projeto",
  },
};
