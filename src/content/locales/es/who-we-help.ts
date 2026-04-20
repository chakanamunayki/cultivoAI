import type { SiteContent } from "../../types";

export const esWhoWeHelpContent: Pick<SiteContent, "whoWeHelp"> = {
  whoWeHelp: {
    title: "¿Somos un buen encaje?",
    idealTitle: "Somos ideales para ti si...",
    idealItems: [
      "Estás construyendo en salud, sostenibilidad o trabajo con misión.",
      "Quieres sistemas prácticos, no hype.",
      "Valoras claridad, diseño y comunicación humana.",
      "Quieres una relación directa con quienes construyen.",
    ],
    notIdealTitle: "Probablemente no somos un buen encaje si...",
    notIdealItems: [
      "Quieres barato e inmediato por encima de calidad.",
      "Quieres cero involucramiento y resultados mágicos.",
      "Necesitas una agencia grande con equipo rotativo.",
    ],
    sectorsTitle: "Dónde hacemos nuestro mejor trabajo",
    sectors: [
      {
        name: "Salud y bienestar",
        description: "Tu equipo sostiene a personas en momentos vulnerables. Nosotros sostenemos la operación. Construimos sistemas que manejan administración, comunicación y seguimiento, para que el equipo se enfoque en lo que vino a hacer.",
        icon: "Heart",
        imageUrl: "/landing/photos/sectors/health-wellness.jpg",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber más",
        modal: {
          whatItMeans:
            "Sistemas que ayudan a equipos de salud y bienestar a entregar un servicio consistente: acogida clara, seguimiento claro y tono humano.",
          whyItMatters:
            "En trabajo de salud, los retrasos y la inconsistencia bajan la confianza. Un sistema simple reduce pasos perdidos y libera al equipo para enfocarse en personas.",
          whatsIncluded: [
            "Flujos de acogida, agenda y seguimiento",
            "Asistentes con tono humano para FAQs, triage y enrutamiento",
            "Dashboards para visibilidad (retención, pipeline, operación)",
            "Sistemas de conocimiento para mantener alineación",
          ],
          idealFit: [
            "Clínicas, programas y profesionales con servicios recurrentes",
            "Equipos con complejidad en acogida, agenda y seguimiento",
            "Organizaciones donde tono, confianza y consistencia importan",
          ],
          typicalOutcome:
            "Respuesta más rápida, transiciones más claras y una operación más calmada que se siente para el cliente.",
        },
        whoWeHelp: [
          "Clínicas, programas y profesionales con servicios recurrentes",
          "Equipos con complejidad en acogida, agenda y seguimiento",
          "Organizaciones donde tono, confianza y consistencia importan",
        ],
        howWeHelp: [
          "Flujos de acogida, agenda y seguimiento",
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
        description: "Regenerar suelo, ecosistemas o comunidades toma años, coordinación y paciencia. Construimos los sistemas que mantienen al equipo alineado, a los aliados informados y los reportes al día, para que el trabajo en campo no se pierda en documentos.",
        icon: "Sprout",
        imageUrl: "/landing/photos/sectors/sustainability-regenerative.jpg",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber más",
        modal: {
          whatItMeans:
            "Sistemas prácticos para coordinación, reportes y seguimiento para que el trabajo se mantenga real en el terreno, no solo en documentos.",
          whyItMatters:
            "Equipos de sostenibilidad coordinan aliados, trabajo en campo y rendición de cuentas. Un sistema claro mantiene el impulso alto y la confusión baja.",
          whatsIncluded: [
            "Sistemas simples para coordinación y rendición de cuentas",
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
          "Sistemas simples para coordinación y rendición de cuentas",
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
        description: "Un estudiante recuerda cómo lo hicieron sentir, no la plataforma que usaron. Construimos los sistemas que mantienen a los estudiantes apoyados y a los instructores enfocados en enseñar.",
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
            "Flujos de acogida e inscripción que reduzcan trabajo manual",
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
            "Un recorrido del estudiante más fluido, menos mensajes perdidos y más tiempo para que el equipo enseñe.",
        },
        whoWeHelp: [
          "Programas con instructores, cohorts y comunicación constante",
          "Equipos manejando inscripciones, agendas y soporte a estudiantes",
          "Organizaciones que necesitan una experiencia humana y consistente",
        ],
        howWeHelp: [
          "Flujos de acogida e inscripción que reduzcan trabajo manual",
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
        description: "Tu idea puede cambiar algo real, pero primero tiene que existir y funcionar. Te ayudamos a construir la primera versión correcta: enfocada y lista para aprender.",
        icon: "Rocket",
        imageUrl: "/landing/photos/sectors/mission-led-startups.webp",
        chatButtonLabel: "Hablemos",
        detailsButtonLabel: "Saber más",
        modal: {
          whatItMeans:
            "Un partner senior y práctico para lanzar la primera versión, mantener el alcance enfocado y evitar desvíos costosos.",
          whyItMatters:
            "Las startups mueren en la brecha entre idea y ejecución. Alcance claro y feedback rápido mantienen el impulso vivo.",
          whatsIncluded: [
            "Primera versión con alcance enfocado y defendible",
            "Flujos y dashboards para claridad operativa",
            "Asistentes y sistemas de conocimiento para escalar soporte",
            "Asesoría de producto para evitar sobreconstruir",
          ],
          idealFit: [
            "Equipos tempranos que necesitan una primera versión, rápida y usable",
            "Fundadores que quieren decisiones honestas y prioridades claras",
            "Equipos construyendo en salud, sostenibilidad o bien público",
          ],
          typicalOutcome:
            "Una primera versión lanzada con responsabilidad clara y un plan para iterar basado en uso real.",
        },
        whoWeHelp: [
          "Equipos tempranos que necesitan una primera versión, rápida y usable",
          "Fundadores que quieren decisiones honestas y prioridades claras",
          "Equipos construyendo en salud, sostenibilidad o bien público",
        ],
        howWeHelp: [
          "Primera versión con alcance enfocado y defendible",
          "Flujos y dashboards para claridad operativa",
          "Asistentes y sistemas de conocimiento para escalar soporte",
          "Asesoría de producto para evitar sobreconstruir",
        ],
        exampleProjects: [
          "MVP + flujo para acogida y seguimiento",
          "Dashboard de decisión para prioridades y métricas",
          "Base de conocimiento que crece con el producto",
        ],
      },
    ],
    cta: "Hacemos espacio para equipos de alto impacto, incluso con presupuestos ajustados.",
    ctaButton: "Cuéntanos sobre tu proyecto",
  },
};
