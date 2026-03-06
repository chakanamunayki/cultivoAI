import type { SiteContent } from "../../types";

export const esStoriesContent: Pick<SiteContent, "storiesTitle" | "storiesSubtitle" | "stories"> = {
storiesTitle: "Ejemplos Reales",
storiesSubtitle: "Como hemos ayudado a negocios como el tuyo",
stories: [
  {
    company: "Granja Hidroponica",
    industry: "Agricultura",
    before:
      "Revisaba pH, EC y temperatura manualmente 4 veces al dia. Iba al invernadero a las 6am y 10pm. Un fin de semana fuera significaba pedirle a un vecino que no entendia el sistema.",
    after:
      "Sensores alimentan un dashboard. Alertas a WhatsApp cuando algo esta mal. Resumen semanal de IA con tendencias y recomendaciones.",
    quote:
      "Detecte una deriva de pH a las 2am que habria matado un cultivo de lechugas. Ahora tomo fines de semana libres.",
    author: "Dueno de Granja",
    imageUrl:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop",
    metric: "Libertad de fines de semana",
  },
  {
    company: "Practica de Bienestar Holistico",
    industry: "Salud y Bienestar",
    before:
      "Clientes enviaban mensajes a todas horas preguntando sobre tipos de sesiones, precios, disponibilidad. No podia responder durante sesiones. Perdia reservas ante practicantes que respondian más rapido.",
    after:
      "Bot de WhatsApp explica servicios, responde preguntas sobre Reiki vs. sanacion sonora vs. respiracion, revisa calendario y reserva directamente. Calido, no robotico.",
    quote:
      "40% más sesiones reservadas. Respondo preguntas complejas cuando estoy centrada, no en medio de sesion.",
    author: "Practicante de Bienestar",
    imageUrl:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop",
    metric: "+40% sesiones reservadas",
  },
  {
    company: "Familia Educacion en Casa",
    industry: "Educacion",
    before:
      "Mama pasaba noches de domingo planificando la semana. Seguimiento del progreso de 3 ninos en hojas de calculo. Sin idea si realmente retenian el material.",
    after:
      "IA ayuda a generar planes semanales basados en el ritmo de cada nino. Progreso rastreado automaticamente. Brechas senaladas antes de convertirse en problemas.",
    quote:
      "Planificacion dominical: 3 horas a 45 minutos. Los ninos reciben más atencion personalizada, menos estres administrativo.",
    author: "Padre Educador en Casa",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    metric: "3 horas -> 45 minutos semanales",
  },
  {
    company: "Finca Familiar",
    industry: "Agricultura",
    before:
      "Ventas de huevos, vegetales, inscripciones a talleres todo rastreado diferente. Algo en cuaderno. Algo en WhatsApp. Sin idea de que era realmente rentable.",
    after:
      "Dashboard simple conecta canales de venta. Ve que productos dan dinero, cuales no. Rastrea clientes recurrentes.",
    quote:
      "Descubri que las ventas de mermelada perdian dinero despues de contabilizar tiempo. Subi precios, me enfoque en lo que funcionaba.",
    author: "Agricultor Familiar",
    imageUrl:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
    metric: "Visibilidad real de rentabilidad",
  },
  {
    company: "Comunidad Autosostenible",
    industry: "Gestion Comunitaria",
    before:
      "30 familias, recursos compartidos, cero sistema central. Biblioteca de herramientas en cuaderno. Turnos de trabajo coordinados via caos de chat grupal. Cosechas del bosque de alimentos para quien llegara primero. Disputas sobre equidad.",
    after:
      "Portal simple para miembros. IA ayuda a programar rotaciones de trabajo equitativamente, rastrea prestamo de herramientas, anuncia que esta listo para cosechar y sugiere distribucion equitativa. Envia recordatorios suaves, no molestos.",
    quote:
      "Menos drama administrativo, más comunidad. Decisiones basadas en datos, no en quien habla más fuerte.",
    author: "Coordinador Comunitario",
    imageUrl:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop",
    metric: "30 familias coordinadas",
  },
  {
    company: "Startup de Impacto",
    industry: "Startup Tecnologica",
    before:
      "Fundador haciendo todo. Preguntas de clientes, actualizaciones a inversionistas, contenido, ops. Sin sistema. Las cosas caian constantemente por las grietas.",
    after:
      "Leads auto-capturados y calificados. FAQ manejadas por chatbot. Reporte de metricas semanal generado automaticamente. Fundador se enfoca en producto y recaudacion.",
    quote:
      "Deje de perder leads. Los inversionistas empezaron a comentar lo organizadas que eran las actualizaciones.",
    author: "Fundador de Startup",
    imageUrl:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
    metric: "Cero leads perdidos",
  },
  {
    company: "Operacion de Acuaponia",
    industry: "Agricultura",
    before:
      "Alimentacion de peces, calidad del agua, salud de plantas todo monitoreado por separado. Datos en tres apps diferentes. Correlacionar problemas tomaba horas de trabajo detectivesco.",
    after:
      "Dashboard unificado. IA senala cuando comportamiento de peces + temperatura del agua + crecimiento de plantas sugieren un problema gestandose.",
    quote:
      "Predije un problema de filtro 3 dias antes de que colapsara el sistema. Un dashboard en lugar de tres apps.",
    author: "Agricultor Acuaponico",
    imageUrl:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop",
    metric: "3 apps -> 1 dashboard",
  },
  {
    company: "Centro de Terapia Alternativa",
    industry: "Salud y Bienestar",
    before:
      "4 practicantes, 4 calendarios separados, clientes confundidos sobre quien hace que. Recepcionista pasaba mitad del dia solo enrutando consultas.",
    after:
      "Sistema de reservas unico con IA que pregunta que necesita el cliente y los empareja con el practicante correcto. Maneja conflictos de horarios automaticamente.",
    quote:
      "La recepcionista ahora hace seguimiento de clientes en lugar de tetris de calendarios. Errores de reserva cayeron a casi cero.",
    author: "Gerente de Centro",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    metric: "Casi cero errores de reserva",
  },
  {
    company: "Escuela de Idiomas",
    industry: "Educacion",
    before:
      "Administrador pasaba más de 2 horas diarias respondiendo las mismas preguntas. Precios, horarios, niveles, metodos de pago. Una y otra vez.",
    after:
      "Chatbot maneja 80% de consultas. Conoce cursos, revisa disponibilidad, envia enlaces de inscripcion, responde en espanol o ingles.",
    quote:
      "El administrador se enfoca en experiencia del estudiante. Inscripcion subio porque respuestas ocurren instantaneamente, no el siguiente dia habil.",
    author: "Administrador de Escuela",
    imageUrl:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
    metric: "80% consultas automatizadas",
  },
  {
    company: "Consultor Agricultura Regenerativa",
    industry: "Consultoria",
    before:
      "Datos de granjas de clientes dispersos en correos, PDFs y notas de voz. Preparar un reporte de salud del suelo significaba buscar en meses de mensajes.",
    after:
      "Clientes envian datos a traves de un formulario simple. IA los organiza, senala anomalias, redacta la estructura inicial del reporte.",
    quote:
      "Tiempo de preparacion de reportes reducido a la mitad. más tiempo en el campo, menos tiempo en correo.",
    author: "Consultor Agricola",
    imageUrl:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
    metric: "50% menos tiempo en reportes",
  },
  {
    company: "Proyecto de Permacultura",
    industry: "Agricultura",
    before:
      "Plan de bosque de alimentos de 5 años existia mayormente en la cabeza del fundador. Voluntarios llegaban sin saber que hacer. Gremios de plantas, flujos de agua, tareas estacionales dispersos en cuadernos, PDFs y conversaciones medio recordadas. Conocimiento se iba con personas clave.",
    after:
      "Sistema central rastrea que esta plantado donde, que necesita hacerse este mes y por que. Voluntarios reciben tareas claras segun sus habilidades. IA ayuda a responder 'que deberia ir junto al gremio de manzanas?' basado en los datos propios del sitio.",
    quote:
      "Nuevos voluntarios productivos desde el dia uno. Conocimiento institucional permanece incluso cuando personas se van.",
    author: "Fundador de Proyecto",
    imageUrl:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop",
    metric: "Conocimiento institucional preservado",
  },
],
};
