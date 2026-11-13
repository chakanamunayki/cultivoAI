import { ptAbout } from "./locales/pt/about";
import { ptClosingSectionsContent } from "./locales/pt/closing-sections";
import { ptPartnershipsContent } from "./locales/pt/partnerships";
import { ptProjectsContent } from "./locales/pt/projects";
import { ptServicesContent } from "./locales/pt/services";
import { ptStoriesContent } from "./locales/pt/stories";
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
    audience: [],
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
    cta: "Vamos conversar",
    secondaryCta: "Ver projetos",
    noDramaText: "Escopo claro. Primeira versão rápida. Iteração direta.",
  },

  about: ptAbout,

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

  semillero: {
    title: "Semillero",
    subtitle: "Espanhol para viveiro de sementes. Onde bons projetos crescem juntos.",
    body:
      "Converso toda semana com inovadores do mundo todo: novas tecnologias de energia, solo, água e saúde que procuram lugares reais para funcionar. E conheço projetos na América Latina que precisam exatamente disso. O Semillero une os dois, para que boas pessoas e boas inovações se fortaleçam juntas.",
    projectCta: "Tenho um projeto",
    innovationCta: "Tenho uma inovação",
  },

  ...ptServicesContent,


  ...ptWhoWeHelpContent,

  ...ptPartnershipsContent,

  ...ptProjectsContent,

  ...ptStoriesContent,

  ...ptClosingSectionsContent,
};
