import type { SiteContent } from "../../types";

export const esWhoWeHelpContent: Pick<SiteContent, "whoWeHelp"> = {
  whoWeHelp: {
    title: "¿Somos el fit correcto?",
    idealTitle: "Somos ideales para ti si...",
    idealItems: [
      "Estás construyendo en salud, sostenibilidad o trabajo con misión.",
      "Quieres sistemas prácticos, no hype.",
      "Valoras claridad, diseño y comunicación humana.",
      "Quieres una relación directa con quienes construyen.",
    ],
    notIdealTitle: "Probablemente no somos fit si...",
    notIdealItems: [
      "Quieres barato e inmediato por encima de calidad.",
      "Quieres cero involucramiento y resultados mágicos.",
      "Necesitas una agencia grande con equipo rotativo.",
    ],
    sectorsTitle: "Dónde hacemos nuestro mejor trabajo",
    sectors: [
      {
        name: "Salud y bienestar",
        description: "Los equipos de salud y bienestar cargan mucho. Construimos sistemas que manejan la administración, comunicación y seguimiento para que el equipo se enfoque en lo que realmente importa.",
        icon: "Heart",
        imageUrl: "/landing/photos/sectors/health-wellness.jpg",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber más",
        modal: {
          whatItMeans:
            "Sistemas que ayudan a equipos de salud y bienestar a entregar un servicio consistente: intake claro, seguimiento claro y tono humano.",
          whyItMatters:
            "En trabajo de salud, retrasos e inconsistencia bajan la confianza. Un sistema simple reduce pasos perdidos y libera al equipo para enfocarse en personas.",
          whatsIncluded: [
            "Flujos para intake, agenda y seguimiento",
            "Asistentes con tono humano para FAQs, triage y enrutamiento",
            "Dashboards para visibilidad (retención, pipeline, operación)",
            "Sistemas de conocimiento para mantener alineación",
          ],
          idealFit: [
            "Clínicas, programas y profesionales con servicios recurrentes",
            "Equipos con complejidad de intake, agenda y seguimiento",
            "Organizaciones donde tono, confianza y consistencia importan",
          ],
          typicalOutcome:
            "Respuesta más rápida, handoffs más claros y una operación más calmada que se siente para el cliente.",
        },
        whoWeHelp: [
          "Clínicas, programas y profesionales con servicios recurrentes",
          "Equipos con complejidad de intake, agenda y seguimiento",
          "Organizaciones donde tono, confianza y consistencia importan",
        ],
        howWeHelp: [
          "Flujos para intake, agenda y seguimiento",
          "Asistentes con tono humano para FAQs, triage y enrutamiento",
          "Dashboards para visibilidad (retención, pipeline, operación)",
          "Sistemas de conocimiento para mantener alineación",
        ],
        exampleProjects: [
          "Flujo de entrega de servicio + dashboard simple",
          "Asistente que califica y enruta solicitudes a la persona correcta",
          "Refresh web conectado a seguimiento y siguientes pasos",
        ],
      },
      {
        name: "Sostenibilidad y proyectos regenerativos",
        description: "El trabajo de sostenibilidad requiere mucha coordinación. Construimos los sistemas que mantienen al equipo alineado, los aliados informados y los reportes claros.",
        icon: "Sprout",
        imageUrl: "/landing/photos/sectors/sustainability-regenerative.jpg",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber más",
        modal: {
          whatItMeans:
            "Sistemas prácticos para coordinación, reportes y seguimiento para que el trabajo se mantenga real en el terreno, no solo en documentos.",
          whyItMatters:
            "Equipos de sostenibilidad coordinan aliados, trabajo en campo y rendición de cuentas. Un sistema claro mantiene el momentum alto y la confusión baja.",
          whatsIncluded: [
            "Sistemas simples para coordinación y accountability",
            "Dashboards para decisiones y reportes",
            "Captura de conocimiento para que el aprendizaje no se pierda",
            "Experiencias web que comuniquen credibilidad e impacto",
          ],
          idealFit: [
            "Proyectos regenerativos coordinando aliados y trabajo en campo",
            "Equipos balanceando metas de impacto con operación real",
            "Organizaciones que necesitan mejor reporte y seguimiento",
          ],
          typicalOutcome:
            "Menos caos, reportes más claros y un equipo que ejecuta de forma consistente entre personas y aliados.",
        },
        whoWeHelp: [
          "Proyectos regenerativos coordinando aliados y trabajo en campo",
          "Equipos balanceando metas de impacto con operación real",
          "Organizaciones que necesitan mejor reporte y seguimiento",
        ],
        howWeHelp: [
          "Sistemas simples para coordinación y accountability",
          "Dashboards para decisiones y reportes",
          "Captura de conocimiento para que el aprendizaje no se pierda",
          "Experiencias web que comuniquen credibilidad e impacto",
        ],
        exampleProjects: [
          "Dashboard de operación + ritmo de reporte",
          "Base de conocimiento para procesos, aliados y aprendizajes",
          "Sitio de proyecto que hace el trabajo fácil de entender y apoyar",
        ],
      },
      {
        name: "Educación alternativa",
        description: "Los programas educativos ganan o pierden por consistencia. Construimos los sistemas de operación y comunicación que mantienen a los estudiantes apoyados y a los instructores enfocados en enseñar.",
        icon: "GraduationCap",
        imageUrl: "/landing/photos/sectors/alternative-education.jpg",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber más",
        modal: {
          whatItMeans:
            "Sistemas que apoyan a estudiantes y staff: mejor comunicación, siguientes pasos claros y menos coordinación manual.",
          whyItMatters:
            "Los programas educativos ganan por consistencia. Cuando la operación es confusa, el estudiante lo siente. Un sistema simple protege la experiencia.",
          whatsIncluded: [
            "Flujos de intake e inscripción que reduzcan trabajo manual",
            "Asistentes para soporte, FAQs y enrutamiento",
            "Dashboards para ver progreso, capacidad y necesidades de seguimiento",
            "Sistemas de contenido y conocimiento para comunicación consistente",
          ],
          idealFit: [
            "Programas con instructores, cohorts y comunicación constante",
            "Equipos manejando inscripciones, agendas y soporte a estudiantes",
            "Organizaciones que necesitan una experiencia humana y consistente",
          ],
          typicalOutcome:
            "Un journey de estudiante más fluido, menos mensajes perdidos y más tiempo para que el equipo enseñe.",
        },
        whoWeHelp: [
          "Programas con instructores, cohorts y comunicación constante",
          "Equipos manejando inscripciones, agendas y soporte a estudiantes",
          "Organizaciones que necesitan una experiencia humana y consistente",
        ],
        howWeHelp: [
          "Flujos de intake e inscripción que reduzcan trabajo manual",
          "Asistentes para soporte, FAQs y enrutamiento",
          "Dashboards para ver progreso, capacidad y necesidades de seguimiento",
          "Sistemas de contenido y conocimiento para comunicación consistente",
        ],
        exampleProjects: [
          "Flujo de inscripción + asistente de soporte",
          "Dashboard de programa para operación y seguimiento",
          "Sistema web y contenido para mensajes consistentes",
        ],
      },
      {
        name: "Startups con misión",
        description: "Los equipos tempranos avanzan más rápido con alcance claro y decisiones honestas. Te ayudamos a construir la versión uno correcta: ajustada, usable y lista para aprender.",
        icon: "Rocket",
        imageUrl: "/landing/photos/sectors/mission-led-startups.webp",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber más",
        modal: {
          whatItMeans:
            "Un partner senior y práctico para enviar versión uno, mantener el alcance tight y evitar detours costosos.",
          whyItMatters:
            "Las startups mueren en el gap entre idea y ejecución. Alcance claro y feedback rápido mantienen el momentum vivo.",
          whatsIncluded: [
            "Versión uno con alcance tight y defendible",
            "Flujos y dashboards para claridad operativa",
            "Asistentes y sistemas de conocimiento para escalar soporte",
            "Asesoría de producto para evitar sobreconstruir",
          ],
          idealFit: [
            "Equipos tempranos que necesitan versión uno, rápido y usable",
            "Fundadores que quieren tradeoffs honestos y prioridades claras",
            "Equipos construyendo en salud, sostenibilidad o bien público",
          ],
          typicalOutcome:
            "Un v1 enviado con ownership claro y un plan para iterar basado en uso real.",
        },
        whoWeHelp: [
          "Equipos tempranos que necesitan versión uno, rápido y usable",
          "Fundadores que quieren tradeoffs honestos y prioridades claras",
          "Equipos construyendo en salud, sostenibilidad o bien público",
        ],
        howWeHelp: [
          "Versión uno con alcance tight y defendible",
          "Flujos y dashboards para claridad operativa",
          "Asistentes y sistemas de conocimiento para escalar soporte",
          "Asesoría de producto para evitar sobreconstruir",
        ],
        exampleProjects: [
          "MVP + flujo para intake y seguimiento",
          "Dashboard de decisión para prioridades y métricas",
          "Base de conocimiento que crece con el producto",
        ],
      },
    ],
    cta: "Hacemos espacio para equipos de alto impacto, incluso con presupuestos ajustados.",
    ctaButton: "Cuéntanos sobre tu proyecto",
  },
};
