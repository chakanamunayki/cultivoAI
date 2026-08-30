import type { SiteContent } from "../../types";

export const ptPartnershipsContent: Pick<
  SiteContent,
  "partnershipsTitle" | "partnershipsSubtitle" | "partnerships"
> = {
  partnershipsTitle: "Formas Flexíveis de Trabalhar",
  partnershipsSubtitle:
    "Escopo claro, entrega sênior, com um preço justo. Uma vaga a tarifa de impacto para times com propósito quando faz sentido.",
  partnerships: [
    {
      name: "Sprint de Descoberta Técnica",
      tagline: "Começa com uma ligação gratuita",
      description:
        "Cada projeto é diferente, de uma automação pequena a uma plataforma completa. Por isso começamos com uma ligação gratuita para entender o seu objetivo. Se um Sprint de Descoberta fizer sentido, ele é definido e orçado conforme o trabalho, e você sai com um plano claro e com custos.",
      idealFor: ["Times com IP real e uma decisão a tomar", "Qualquer um que não saiba o que construir primeiro"],
      icon: "Hourglass",
      imageUrl: "/landing/photos/services/startup-advisory.png",
      modal: {
        whatItMeans:
          "Começamos com uma ligação gratuita para entender o seu objetivo. Se um sprint fizer sentido, é um trabalho curto e sênior para mapear a sua arquitetura, proteger a sua IP e definir o escopo do desenvolvimento, antes que alguém escreva código de produção.",
        whyItMatters:
          "A maioria dos projetos de IA falha por um começo difuso. A ligação não custa nada e diz a ambos se há encaixe. O sprint depois te dá um plano com custos, defensável e um primeiro desenvolvimento claro, sem compromisso em aberto.",
        whatsIncluded: [
          "Uma ligação inicial gratuita para entender o seu objetivo e dimensionar o sprint",
          "Mapa de lacunas de arquitetura: o que você tem, o que falta, o que construir",
          "Desenho de isolamento de IP: como proteger protocolos e limitar o acesso por função",
          "Escopo do MVP: o primeiro desenvolvimento útil mais enxuto",
          "Plano de construção com custos: fases, prazos e preço",
        ],
        idealFit: [
          "Times de agritech e biotech que protegem a IP dos seus protocolos",
          "Fundadores que querem um plano antes de um grande compromisso de desenvolvimento",
          "Times que precisam de números reais para aprovar o orçamento",
        ],
        typicalOutcome:
          "Você sai com um documento: um plano claro e com custos sobre o qual pode agir, conosco ou com quem quiser.",
      },
    },
    {
      name: "Projeto Padrão",
      tagline: "Negócios com orçamento",
      description:
        "Escopo claro e entregáveis definidos. Preço fixo acordado antes de começar. Cronograma estabelecido. Suporte incluído pós-entrega.",
      idealFor: ["Empresas que sabem o que precisam", "Recursos para investir"],
      icon: "Briefcase",
      imageUrl: "/landing/photos/partnerships/standard-project.jpg",
      modal: {
        whatItMeans:
          "Uma construção com escopo claro, entregáveis definidos e responsabilidades claras.",
        whyItMatters:
          "Se você precisa de previsibilidade, este modelo mantém decisões rápidas e entrega alinhada a um objetivo claro.",
        whatsIncluded: [
          "Descoberta curta para definir escopo e critérios de sucesso",
          "Plano de entrega com marcos e ownership claro",
          "Construção, testes e lançamento do que foi acordado",
          "Documentação básica e entrega",
          "Janela pequena pós-lançamento para ajustes e correções",
        ],
        idealFit: [
          "Times que já sabem o que precisam (ou podem decidir rápido)",
          "Projetos onde clareza e velocidade importam",
          "Organizações prontas para investir em uma boa entrega",
        ],
        typicalOutcome:
          "Um sistema lançado, com escopo e entrega claros desde o primeiro dia.",
      },
    },
    {
      name: "Tarifas de impacto",
      tagline: "Times com missão",
      description:
        "Mesmo nível de qualidade. Preço reduzido de forma significativa. Condições flexíveis. Em troca: depoimento, estudo de caso, ou indicações.",
      idealFor: ["Startups pré-receita", "Projetos com missão social"],
      icon: "HeartHandshake",
      imageUrl: "/landing/photos/partnerships/impact-friendly.jpg",
      modal: {
        whatItMeans:
          "Tarifas reduzidas para times com missão quando o impacto é real e as expectativas estão claras.",
        whyItMatters:
          "Muito trabalho de alto impacto começa enxuto. Este modelo permite construir sistemas úteis sem esticar o time além do saudável.",
        whatsIncluded: [
          "Mesmo nível de qualidade, com escopo mais enxuto",
          "Prioridades claras: primeira versão primeiro, depois melhorar",
          "Colaboração flexível para restrições reais",
          "Acordo de troca justo (depoimento, estudo de caso, indicações)",
          "Plano para crescer o sistema conforme houver impulso",
        ],
        idealFit: [
          "Times alinhados à missão com orçamento apertado",
          "Projetos onde os resultados importam mais que o acabamento do primeiro dia",
          "Times dispostos a colaborar de perto e iterar",
        ],
        typicalOutcome:
          "Uma primeira versão que arranca com impulso e tem caminho para crescer.",
      },
    },
    {
      name: "Opções de aliança",
      tagline: "Só se houver encaixe real",
      description:
        "Para projetos selecionados com alto potencial de impacto e alinhamento claro, podemos definir termos de aliança personalizados.",
      idealFor: ["Startups de impacto", "Colaborações alinhadas de longo prazo"],
      icon: "PieChart",
      imageUrl: "/landing/photos/partnerships/partnership-options.jpg",
      modal: {
        whatItMeans:
          "Um modelo de colaboração personalizado para casos onde o alinhamento é forte e os incentivos precisam permanecer conectados ao longo do tempo.",
        whyItMatters:
          "Quando um projeto tem impacto real e potencial real, modelos rígidos podem travar. Termos flexíveis mantêm a relação ganha-ganha.",
        whatsIncluded: [
          "Checagem honesta de alinhamento (impacto, execução, expectativas)",
          "Plano por fases com entregáveis claros em cada etapa",
          "Termos que mantêm os incentivos alinhados enquanto evolui",
          "Pontos de revisão regulares para ajustar escopo e prioridades",
          "Foco em utilidade de longo prazo, não em aparências de curto prazo",
        ],
        idealFit: [
          "Startups de impacto com potencial forte e foco claro",
          "Times buscando colaboração de longo prazo, não só um projeto",
          "Situações onde a flexibilidade cria melhores resultados",
        ],
        typicalOutcome:
          "Uma colaboração que cresce por fases, mantém honestidade sobre as decisões e constrói algo útil ao longo do tempo.",
      },
    },
  ],
};
