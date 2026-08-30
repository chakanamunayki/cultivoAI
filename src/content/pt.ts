import { ptAbout } from "./locales/pt/about";
import { ptClosingSectionsContent } from "./locales/pt/closing-sections";
import { ptPartnershipsContent } from "./locales/pt/partnerships";
import { ptProjectsContent } from "./locales/pt/projects";
import { ptServicesContent } from "./locales/pt/services";
import { ptStoriesContent } from "./locales/pt/stories";
import { ptUseCasesContent } from "./locales/pt/use-cases";
import { ptWhoWeHelpContent } from "./locales/pt/who-we-help";
import type { SiteContent } from "./types";

export const pt: SiteContent = {
  nav: [
    { label: "Sobre", href: "#about" },
    { label: "Serviços", href: "#services" },
    { label: "Parcerias", href: "#partnerships" },
    { label: "Projetos", href: "#projects" },
    { label: "Processo", href: "#what-happens-next" },
  ],

  marquee: [
    "Agritech",
    "Biotech",
    "IP de protocolos protegida",
    "Dados de laboratório e campo",
    "MRV e carbono",
    "Acesso por função",
    "Roda na sua infraestrutura",
    "Parceiro técnico sênior",
    "Colaboração direta",
    "Da Colômbia, para o mundo",
  ],

  hero: {
    tagline: "SISTEMAS DE IA E DADOS PARA AGRITECH E BIOTECH",
    line1: "O parceiro técnico para inovadores em agritech e biotech",
    subheadline: "Construímos a camada de dados e IA por trás da ciência séria. Protocolos protegidos, evidência estruturada e dados de laboratório e campo sobre os quais o seu time pode agir.",
    services: [],
    servicesDone: "",
    audience: [],
    outcomes: ["IP de protocolos protegida", "Evidência científica estruturada", "Dados prontos para decidir"],
    audienceLabel: "Feito para:",
    audienceChips: [
      "Agritech",
      "Biotech e laboratórios de pesquisa",
      "Agricultura de ambiente controlado",
      "Regenerativo, MRV e carbono",
      "Startups com propósito",
      "Bem-estar e holístico",
    ],
    tertiaryCta: "Ver serviços",
    microcopy:
      "Dados privados. Roda na sua infraestrutura quando é preciso. Um parceiro técnico sênior, do início ao fim.",
    terminalLabel: "É assim que trabalhamos:",
    line3: "",
    cta: "Vamos conversar",
    secondaryCta: "Ver projetos",
    noDrama: "Sem caos.",
    noDramaText: "Escopo claro. Primeira versão rápida. Iteração direta.",
    impactSection: {
      text: "Da Colômbia, trabalhando para o mundo inteiro. Colaboração direta. Escopo claro.",
      cta: "Vamos conversar",
    },
  },

  about: ptAbout,

  howWeWork: {
    title: "Como Trabalhamos",
    subtitle: "Princípios que guiam cada projeto",
    pillars: [
      {
        icon: "RefreshCw",
        title: "Ganha-Ganha ou Sem Acordo",
        description:
          "Só aceitamos projetos onde as expectativas são claras e os dois lados ganham. Se não pudermos agregar valor real, dizemos desde o início.",
      },
      {
        icon: "Sprout",
        title: "Sistemas de Ponta a Ponta",
        description:
          "Pensamos de ponta a ponta. Software, fluxos, dados, decisões, comunicação e design precisam funcionar juntos, não como peças soltas.",
      },
      {
        icon: "Users",
        title: "Sempre humanos",
        description:
          "A IA é uma ferramenta que usamos para o bem. Construímos com cuidado com o tom, a confiança e as pessoas do outro lado da tela.",
        isFullWidth: true,
      },
    ],
  },

  whatWeDo: {
    title: "Como Ajudamos",
    subtitle: "Integração de IA prática para negócios reais",
    intro:
      "Trabalhamos com times de agritech e biotech que geram impacto social e ambiental real. Entendemos como a operação funciona, conectamos o que já existe, protegemos a IP e damos a cada pessoa acesso apenas ao que é da sua alçada. O que construímos depende do projeto: a camada de conhecimento, plataformas de dados, automação, IA, integrações.",
    columns: [
      {
        title: "OTIMIZAR",
        items: [
          "Reduzir trabalho repetitivo",
          "Criar uma única fonte de verdade",
          "Melhorar a coordenação e o acompanhamento",
          "Automatizar relatórios",
        ],
      },
      {
        title: "EXPANDIR",
        items: [
          "Respostas mais rápidas sem perder proximidade",
          "Conteúdo e conhecimento consistentes",
          "Melhores decisões com sinais reais",
          "Novas formas de apoiar usuários e clientes",
        ],
      },
    ],
    servicesPreview: {
      title: "Os nossos serviços incluem:",
      linkText: "Ver todos os serviços",
    },
  },

  whyUs: {
    notTitle: "O que NÃO somos",
    notItems: [
      "Uma agência grande com handoffs e entrega júnior.",
      "Consultores guiados por hype vendendo uma tendência.",
      "Um time que faz você se sentir confuso de propósito.",
    ],
    yesTitle: "O que SOMOS",
    yesItems: [
      "Um time sênior pequeno que trabalha direto com você.",
      "Construtores de sistemas que lançam a versão um rápido e depois melhoram.",
      "Builders human-first que cuidam do tom, da confiança e dos resultados.",
      "Da Colômbia, trabalhando para o mundo.",
    ],
  },

  ...ptServicesContent,

  ...ptUseCasesContent,

  ...ptWhoWeHelpContent,

  ...ptPartnershipsContent,

  ...ptProjectsContent,

  ...ptStoriesContent,

  ...ptClosingSectionsContent,
};
