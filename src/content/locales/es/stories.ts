import type { SiteContent } from "../../types";

export const esStoriesContent: Pick<SiteContent, "storiesTitle" | "storiesSubtitle" | "stories"> = {
storiesTitle: "Ejemplos Reales",
storiesSubtitle: "Cómo hemos ayudado a negocios como el tuyo",
stories: [
  {
    company: "Granja Hidropónica",
    industry: "Agricultura",
    before:
      "Revisaba pH, EC y temperatura manualmente 4 veces al día. Iba al invernadero a las 6am y 10pm. Un fin de semana fuera significaba pedirle a un vecino que no entendía el sistema.",
    after:
      "Sensores alimentan un dashboard. Alertas a WhatsApp cuando algo está mal. Resumen semanal de IA con tendencias y recomendaciones.",
    quote:
      "Detecté una deriva de pH a las 2am que habría matado un cultivo de lechugas. Ahora tomo fines de semana libres.",
    author: "Dueño de Granja",
    imageUrl:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop",
    metric: "Libertad de fines de semana",
  },
  {
    company: "Práctica de Bienestar Holístico",
    industry: "Salud y Bienestar",
    before:
      "Clientes enviaban mensajes a todas horas preguntando sobre tipos de sesiones, precios, disponibilidad. No podía responder durante sesiones. Perdía reservas ante practicantes que respondían más rápido.",
    after:
      "Bot de WhatsApp explica servicios, responde preguntas sobre Reiki vs. sanación sonora vs. respiración, revisa calendario y reserva directamente. Cálido, no robótico.",
    quote:
      "40% más sesiones reservadas. Respondo preguntas complejas cuando estoy centrada, no en medio de sesión.",
    author: "Practicante de Bienestar",
    imageUrl:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop",
    metric: "+40% sesiones reservadas",
  },
  {
    company: "Familia Educación en Casa",
    industry: "Educación",
    before:
      "Mamá pasaba noches de domingo planificando la semana. Seguimiento del progreso de 3 niños en hojas de cálculo. Sin idea si realmente retenían el material.",
    after:
      "IA ayuda a generar planes semanales basados en el ritmo de cada niño. Progreso rastreado automáticamente. Brechas señaladas antes de convertirse en problemas.",
    quote:
      "Planificación dominical: 3 horas a 45 minutos. Los niños reciben más atención personalizada, menos estrés administrativo.",
    author: "Padre Educador en Casa",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    metric: "3 horas -> 45 minutos semanales",
  },
  {
    company: "Finca Familiar",
    industry: "Agricultura",
    before:
      "Ventas de huevos, vegetales, inscripciones a talleres todo rastreado diferente. Algo en cuaderno. Algo en WhatsApp. Sin idea de qué era realmente rentable.",
    after:
      "Dashboard simple conecta canales de venta. Ve qué productos dan dinero, cuáles no. Rastrea clientes recurrentes.",
    quote:
      "Descubrí que las ventas de mermelada perdían dinero después de contabilizar tiempo. Subí precios, me enfoqué en lo que funcionaba.",
    author: "Agricultor Familiar",
    imageUrl:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
    metric: "Visibilidad real de rentabilidad",
  },
  {
    company: "Comunidad Autosostenible",
    industry: "Gestión Comunitaria",
    before:
      "30 familias, recursos compartidos, cero sistema central. Biblioteca de herramientas en cuaderno. Turnos de trabajo coordinados vía caos de chat grupal. Cosechas del bosque de alimentos para quien llegara primero. Disputas sobre equidad.",
    after:
      "Portal simple para miembros. IA ayuda a programar rotaciones de trabajo equitativamente, rastrea préstamo de herramientas, anuncia qué está listo para cosechar y sugiere distribución equitativa. Envía recordatorios suaves, no molestos.",
    quote:
      "Menos drama administrativo, más comunidad. Decisiones basadas en datos, no en quien habla más fuerte.",
    author: "Coordinador Comunitario",
    imageUrl:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop",
    metric: "30 familias coordinadas",
  },
  {
    company: "Startup de Impacto",
    industry: "Startup Tecnológica",
    before:
      "Fundador haciendo todo. Preguntas de clientes, actualizaciones a inversionistas, contenido, ops. Sin sistema. Las cosas caían constantemente por las grietas.",
    after:
      "Leads auto-capturados y calificados. FAQ manejadas por chatbot. Reporte de métricas semanal generado automáticamente. Fundador se enfoca en producto y recaudación.",
    quote:
      "Dejé de perder leads. Los inversionistas empezaron a comentar lo organizadas que eran las actualizaciones.",
    author: "Fundador de Startup",
    imageUrl:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
    metric: "Cero leads perdidos",
  },
  {
    company: "Operación de Acuaponía",
    industry: "Agricultura",
    before:
      "Alimentación de peces, calidad del agua, salud de plantas todo monitoreado por separado. Datos en tres apps diferentes. Correlacionar problemas tomaba horas de trabajo detectivesco.",
    after:
      "Dashboard unificado. IA señala cuándo comportamiento de peces + temperatura del agua + crecimiento de plantas sugieren un problema gestándose.",
    quote:
      "Predije un problema de filtro 3 días antes de que colapsara el sistema. Un dashboard en lugar de tres apps.",
    author: "Agricultor Acuapónico",
    imageUrl:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop",
    metric: "3 apps -> 1 dashboard",
  },
  {
    company: "Centro de Terapia Alternativa",
    industry: "Salud y Bienestar",
    before:
      "4 practicantes, 4 calendarios separados, clientes confundidos sobre quién hace qué. Recepcionista pasaba mitad del día solo enrutando consultas.",
    after:
      "Sistema de reservas único con IA que pregunta qué necesita el cliente y los empareja con el practicante correcto. Maneja conflictos de horarios automáticamente.",
    quote:
      "La recepcionista ahora hace seguimiento de clientes en lugar de tetris de calendarios. Errores de reserva cayeron a casi cero.",
    author: "Gerente de Centro",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    metric: "Casi cero errores de reserva",
  },
  {
    company: "Escuela de Idiomas",
    industry: "Educación",
    before:
      "Administrador pasaba más de 2 horas diarias respondiendo las mismas preguntas. Precios, horarios, niveles, métodos de pago. Una y otra vez.",
    after:
      "Chatbot maneja 80% de consultas. Conoce cursos, revisa disponibilidad, envía enlaces de inscripción, responde en español o inglés.",
    quote:
      "El administrador se enfoca en experiencia del estudiante. Inscripción subió porque respuestas ocurren instantáneamente, no el siguiente día hábil.",
    author: "Administrador de Escuela",
    imageUrl:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
    metric: "80% consultas automatizadas",
  },
  {
    company: "Consultor Agricultura Regenerativa",
    industry: "Consultoría",
    before:
      "Datos de granjas de clientes dispersos en correos, PDFs y notas de voz. Preparar un reporte de salud del suelo significaba buscar en meses de mensajes.",
    after:
      "Clientes envían datos a través de un formulario simple. IA los organiza, señala anomalías, redacta la estructura inicial del reporte.",
    quote:
      "Tiempo de preparación de reportes reducido a la mitad. Más tiempo en el campo, menos tiempo en correo.",
    author: "Consultor Agrícola",
    imageUrl:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
    metric: "50% menos tiempo en reportes",
  },
  {
    company: "Proyecto de Permacultura",
    industry: "Agricultura",
    before:
      "Plan de bosque de alimentos de 5 años existía mayormente en la cabeza del fundador. Voluntarios llegaban sin saber qué hacer. Gremios de plantas, flujos de agua, tareas estacionales dispersos en cuadernos, PDFs y conversaciones medio recordadas. Conocimiento se iba con personas clave.",
    after:
      "Sistema central rastrea qué está plantado dónde, qué necesita hacerse este mes y por qué. Voluntarios reciben tareas claras según sus habilidades. IA ayuda a responder '¿qué debería ir junto al gremio de manzanas?' basado en los datos propios del sitio.",
    quote:
      "Nuevos voluntarios productivos desde el día uno. Conocimiento institucional permanece incluso cuando personas se van.",
    author: "Fundador de Proyecto",
    imageUrl:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop",
    metric: "Conocimiento institucional preservado",
  },
],
};
