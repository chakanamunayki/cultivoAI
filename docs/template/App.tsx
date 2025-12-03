
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type, Tool } from "@google/genai";
import { 
  Sparkles, 
  Zap, 
  Rocket,
  MessageSquare,
  X,
  Check,
  DollarSign,
  HeartHandshake,
  BarChart3,
  Layers,
  Monitor,
  User,
  ArrowRight,
  Code2,
  Cpu,
  Globe,
  Bot,
  Database,
  Mail,
  Frown,
  PartyPopper,
  Hammer,
  Menu,
  Phone,
  Github,
  Linkedin,
  BrainCircuit,
  Terminal,
  Sprout,
  Leaf,
  GraduationCap,
  Target,
  Send,
  Loader2,
  Minimize2,
  Maximize2,
  FileText,
  Filter,
  Briefcase,
  TrendingUp,
  PieChart,
  Hourglass,
  Share2,
  Instagram,
  Twitter,
  LayoutTemplate,
  Smartphone
} from 'lucide-react';

// --- Types ---
type Theme = 'brutalist' | 'rocket';

// --- Content Constants ---
const NAV_ITEMS = [
  { label: 'Inicio', id: 'hero' },
  { label: 'Nosotros', id: 'about' },
  { label: 'Servicios', id: 'services' },
  { label: 'Demos', id: 'demos' },
  { label: 'Semilla', id: 'semilla' },
  { label: 'Alianzas', id: 'partnerships' },
  { label: 'Proyectos', id: 'projects' },
  { label: 'Historias', id: 'stories' }
];

const SEMILLA_CONTENT = {
  about: {
    title: "Sobre Mí",
    text: [
      "Tengo 14 años. Cumplo 15 en enero.",
      "Todavía no sé exactamente qué quiero hacer con mi vida, y creo que está bien no saberlo todavía. Pero sí sé algunas cosas:",
      "Me gusta construir. Mi papá me está enseñando a hacer cosas con IA — chatbots, automatizaciones, cosas así. A veces él me enseña. A veces yo le enseño a él.",
      "El fútbol es mi otra vida. Soy delantero. Juego en la liga de Antioquia y estamos en los 16 finales. Quiero ver hasta dónde puedo llegar.",
      "En el colegio fui parte de un proyecto de innovación con Samsung. Hicimos un biodigestor que convierte basura en energía. Llegamos a las finales. Fue la primera vez que sentí que podía crear algo que realmente sirviera.",
      "También me gustan los videojuegos, las películas, y cocinar. Soy colombiano — esto es mi casa y aquí quiero estar."
    ]
  },
  fund: {
    title: "El Fondo Semilla",
    subtitle: "¿Qué es?",
    description: "Es mi proyecto. Si tienes algo pequeño que necesitas construir — un chatbot simple, una automatización básica — yo lo hago. Estoy aprendiendo, así que cobro lo que puedas pagar.",
    howItWorks: [
      "Me cuentas qué necesitas",
      "Vemos si puedo ayudarte",
      "Tú contribuyes lo que puedas (desde $10 USD)",
      "Yo lo construyo",
      "Todo lo que creo se comparte para que otros aprendan también"
    ],
    note: "No es caridad. Es un intercambio. Tú obtienes algo útil. Yo obtengo experiencia real."
  },
  services: {
    title: "Lo Que Puedo Hacer",
    now: ["Chatbots básicos para WhatsApp o web", "Automatizaciones simples (conectar apps, enviar notificaciones)", "Ayudar con Notion y organización"],
    learning: ["Dashboards e inteligencia de negocios", "Integraciones más complejas", "Desarrollo web básico"],
    workshops: "También doy talleres de desarrollo de chatbots. Si tu equipo quiere aprender a hacer sus propios asistentes de IA, puedo enseñarles lo básico. Mi papá supervisa, pero yo facilito."
  },
  tiers: [
    { name: "Semilla", price: "$10-50 USD", benefit: "Actualizaciones de mi progreso, tu nombre en la página de supporters" },
    { name: "Brote", price: "$50-200 USD", benefit: "Acceso temprano a lo que construyo, puedes dar input en features" },
    { name: "Crecer", price: "$200-500 USD", benefit: "Acceso gratuito de por vida a todo lo que construya" },
    { name: "Socio", price: "$500+ USD", benefit: "Adaptación personalizada para tu caso, involucración directa" }
  ],
  goal: {
    title: "Mi Meta",
    text: "Para cuando tenga 19 años quiero tener opciones. Quizás jugar fútbol semi-profesional. Quizás tener mi propio negocio. Quizás ambos. El punto es poder elegir. No que las circunstancias elijan por mí. Cada proyecto que hago, cada cosa que aprendo, me acerca a eso."
  },
  form: {
    title: "Propón un Proyecto",
    subtitle: "¿Tienes algo pequeño que necesitas? Cuéntame."
  }
};

const PARTNERSHIPS = [
  {
    id: 'standard',
    title: "Proyecto Estándar",
    short: "Negocios con presupuesto.",
    desc: "Alcance claro y entregables definidos. Precio fijo acordado antes de empezar. Cronograma establecido. Soporte incluido post-entrega.",
    ideal: "Empresas que saben lo que necesitan y tienen recursos para invertir.",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: 'reduced',
    title: "Tarifa Reducida",
    short: "Startups & Impacto.",
    desc: "Mismo nivel de calidad. Precio reducido significativamente. Condiciones flexibles. A cambio: testimonial, caso de estudio, o referidos.",
    ideal: "Startups pre-revenue o proyectos con fuerte misión social.",
    icon: HeartHandshake,
    color: "bg-red-100 text-red-700"
  },
  {
    id: 'deferred',
    title: "Pago Diferido",
    short: "Paga al despegar.",
    desc: "Precio reducido inicial (o cero). Resto del pago vinculado a hitos o revenue. Compartimos el riesgo contigo. Solo para proyectos en los que creemos.",
    ideal: "Founders con gran idea pero sin runway.",
    icon: Hourglass,
    color: "bg-orange-100 text-orange-700"
  },
  {
    id: 'revenue',
    title: "Revenue Share",
    short: "Socios en crecimiento.",
    desc: "Construcción a costo reducido o cero. Porcentaje pequeño de revenue futuro. Alineamos incentivos a largo plazo. Nos convertimos en socios, no proveedores.",
    ideal: "Productos o servicios recurrentes donde podemos crecer juntos.",
    icon: TrendingUp,
    color: "bg-green-100 text-green-700"
  },
  {
    id: 'equity',
    title: "Equity",
    short: "Alto potencial.",
    desc: "Trabajo significativo a cambio de participación. Solo proyectos de alta convicción. Nos involucramos a largo plazo. Traemos red, experiencia y recursos.",
    ideal: "Startups con potencial excepcional y misión alineada con nuestros valores.",
    icon: PieChart,
    color: "bg-purple-100 text-purple-700"
  }
];

const COPY = {
  hero: {
    title: "Somos Paul y Rocky — padre e hijo.",
    subtitle: "No somos una agencia. No tenemos un equipo de 50 personas que te pasan de mano en mano. Somos nosotros. Trabajando contigo directamente desde Colombia.",
    desc: "Ayudamos a negocios con propósito a usar IA sin perderse en la complejidad — ni en presupuestos inflados.",
    cta1: "Agenda 15 minutos con Paul",
    cta2: "Conoce nuestra historia"
  },
  services_cta: "¿No estás seguro qué necesitas? Agenda una llamada de 15 minutos. Te ayudamos a identificar dónde la IA puede hacer la diferencia en tu negocio."
};

const PROJECTS = [
  {
    title: "Chak Control Center",
    desc: "Sistema integral de gestión empresarial para pequeñas y medianas empresas. Dashboard, inventario, finanzas, CRM y reportes en una sola plataforma.",
    lessons: "Alcance que crece sin control, la diferencia entre lo que los clientes dicen que quieren y lo que realmente usan.",
    status: "En desarrollo activo",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["Dashboard", "SaaS"],
    fullDesc: "Una solución completa para PYMES que centraliza la operación del negocio. Permite a los dueños visualizar en tiempo real el flujo de caja, el estado del inventario y el rendimiento de ventas por canal. Incluye módulos de automatización para alertas de stock bajo y reportes semanales automáticos vía email."
  },
  {
    title: "Raíz Capital",
    desc: "Plataforma fintech de impacto para conectar inversores con proyectos de agricultura regenerativa. Modelo de inversión con transparencia total.",
    lessons: "Validar el mercado antes de construir, estructuras financieras para impacto, timing de mercado.",
    status: "Proyecto en pausa",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
    tags: ["Fintech", "Impact"],
    fullDesc: "Plataforma de crowdfunding de equidad enfocada en el agro colombiano. Utilizamos IA para analizar el riesgo de los cultivos basándonos en datos históricos climáticos y de mercado, ofreciendo a los inversores una proyección más clara y a los agricultores acceso a capital justo."
  },
  {
    title: "Munayki",
    desc: "Integración de IA para práctica de bienestar holístico. Chatbot, agendamiento y seguimiento de clientes.",
    lessons: "Rocky lidera este proyecto",
    status: "En desarrollo",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    tags: ["Wellness", "AI Chatbot"],
    fullDesc: "Un asistente virtual empático diseñado para terapeutas y centros de bienestar. Munayki no solo agenda citas, sino que realiza un triaje previo básico para entender el estado de ánimo del cliente y preparar al terapeuta antes de la sesión, respetando siempre la privacidad de datos."
  },
  {
    title: "Rocky's AI Mentor",
    desc: "Aplicación de mentoría personalizada potenciada por IA para guiar el aprendizaje de desarrollo y tecnología.",
    lessons: "Proyecto personal de Rocky",
    status: "Beta cerrada",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    tags: ["EdTech", "LLMs"],
    fullDesc: "Un tutor de programación personalizado que adapta su estilo de enseñanza a la edad y nivel del estudiante. A diferencia de ChatGPT genérico, este mentor mantiene el contexto de lecciones pasadas, propone ejercicios basados en los intereses del alumno (ej: fútbol, videojuegos) y celebra los logros."
  },
  {
    title: "cultivoai.co",
    desc: "Este mismo sitio. Next.js, chatbot IA integrado, sistema bilingüe, captura de leads automatizada.",
    lessons: "Código abierto",
    status: "Vivo",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
    tags: ["Open Source", "Next.js"],
    fullDesc: "Nuestra carta de presentación digital. Construida con tecnologías modernas para ser extremadamente rápida y accesible. Integra un sistema de captura de leads que califica automáticamente a los prospectos y notifica a nuestro equipo solo cuando hay una oportunidad real de colaboración."
  }
];

const SERVICES = [
  { 
    title: "Automatización de Flujos", 
    eng: "Workflow Automation",
    desc: "Elimina tareas repetitivas conectando tus apps favoritas.", 
    icon: Zap,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    details: "Conectamos herramientas como Notion, Slack, Gmail, Airtable y WhatsApp. Diseñamos flujos que trabajan mientras duermes: desde facturación automática hasta on-boarding de clientes sin intervención humana."
  },
  { 
    title: "Asistentes IA y Chatbots", 
    eng: "AI Assistants & Chatbots",
    desc: "Atención al cliente 24/7 con personalidad humana.", 
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=600",
    details: "Desarrollamos agentes basados en LLMs (Modelos de Lenguaje) entrenados específicamente con la información de tu negocio. Pueden agendar citas, responder dudas técnicas, cotizar servicios y escalar casos complejos a humanos cuando sea necesario."
  },
  { 
    title: "Inteligencia de Negocios", 
    eng: "Business Intelligence",
    desc: "Dashboards que convierten datos en decisiones.", 
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    details: "Centralizamos tus datos dispersos (Excel, SQL, CRMs) en tableros visuales claros. Implementamos métricas clave (KPIs) para que sepas exactamente la salud de tu negocio en tiempo real, sin esperar al reporte de fin de mes."
  },
  { 
    title: "Sistemas de Contenido", 
    eng: "Content Systems",
    desc: "Motores de creación para escalar tu presencia.", 
    icon: Layers,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
    details: "Creamos pipelines de contenido asistidos por IA. Desde la ideación de temas basados en tendencias, hasta la generación de borradores para blog, redes sociales y newsletters, manteniendo siempre tu voz de marca única."
  },
  { 
    title: "Desarrollo Web con IA", 
    eng: "Website Development + AI",
    desc: "Sitios web vivos que aprenden y se adaptan.", 
    icon: Monitor,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600",
    details: "Sitios web modernos, rápidos y optimizados para conversión. Integramos elementos de IA como búsqueda semántica, personalización de contenido en tiempo real y chatbots nativos para maximizar la retención de usuarios."
  },
  { 
    title: "Asesoría para Startups", 
    eng: "Startup Advisory",
    desc: "De la idea al MVP utilizando herramientas No-Code + IA.", 
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600",
    details: "Te acompañamos en la validación técnica y de mercado. Te ayudamos a elegir el stack tecnológico correcto para no gastar de más al inicio, y a implementar procesos escalables desde el día uno."
  },
];

const USE_CASES = [
  {
    id: 'chat',
    visual: 'chat',
    title: 'Chatbot Inteligente',
    description: 'Atención al cliente automática 24/7. Responde, califica y agenda.',
    icon: MessageSquare,
    steps: [
      { type: 'user', text: 'Hola, ¿qué precio tienen los chatbots?' },
      { type: 'ai', text: 'Analizando contexto...', isProcessing: true },
      { type: 'bot', text: '¡Hola! Nuestros chatbots personalizados empiezan desde $150 USD. ¿Te gustaría ver una demo?' },
      { type: 'user', text: 'Sí, por favor.' },
      { type: 'action', text: '🚀 Enviando demo interactiva...' }
    ]
  },
  {
    id: 'lead',
    visual: 'crm',
    title: 'Filtrado de Leads',
    description: 'Califica prospectos automáticamente antes de que hables con ellos.',
    icon: Filter,
    steps: [
      { type: 'trigger', text: '👤 Nuevo Lead: Juan Pérez (LinkedIn)' },
      { type: 'ai', text: 'Enriqueciendo perfil...', isProcessing: true },
      { type: 'data', text: '{ Role: CEO, Size: 50-100, Loc: Bog }' },
      { type: 'bot', text: 'Score: 92/100. Alta probabilidad.' },
      { type: 'action', text: '🔥 Movido a columna "Prioridad Alta"' }
    ]
  },
  {
    id: 'web',
    visual: 'code',
    title: 'Constructor Web',
    description: 'Genera estructuras web y copy optimizado en segundos.',
    icon: LayoutTemplate,
    steps: [
      { type: 'user', text: 'Landing para cafetería moderna' },
      { type: 'ai', text: 'Generando componentes React...', isProcessing: true },
      { type: 'data', text: '<Hero title="Café de Origen" />' },
      { type: 'data', text: '<Features list={["Tostión Media", "Orgánico"]} />' },
      { type: 'action', text: '⚡ Sitio desplegado en Vercel' }
    ]
  },
  {
    id: 'dash',
    visual: 'dashboard',
    title: 'Business Dashboard',
    description: 'Convierte datos crudos en gráficos de decisión en tiempo real.',
    icon: PieChart,
    steps: [
      { type: 'trigger', text: '📊 Sync Stripe & Shopify' },
      { type: 'ai', text: 'Detectando anomalías...', isProcessing: true },
      { type: 'data', text: 'Ventas Hoy: $2,450 (+15%)' },
      { type: 'action', text: '📈 Actualizando widget de ingresos' },
      { type: 'bot', text: 'Insight: El producto B está trending.' }
    ]
  },
  {
    id: 'social',
    visual: 'mobile',
    title: 'Social Media Flow',
    description: 'Multiplica tu contenido. De una idea a todas las redes.',
    icon: Smartphone,
    steps: [
      { type: 'user', text: 'Post sobre "IA en Pymes"' },
      { type: 'ai', text: 'Adaptando a formatos...', isProcessing: true },
      { type: 'action', text: '📸 Instagram: Carrusel 5 slides' },
      { type: 'action', text: '🐦 Twitter: Hilo de 3 tweets' },
      { type: 'action', text: '💼 LinkedIn: Artículo profesional' }
    ]
  }
];

const REAL_STORIES = [
  {
    title: "Automatización",
    icon: Zap,
    color: "bg-blue-50 text-blue-600 border-blue-100",
    iconColor: "bg-blue-500",
    problem: "Una tienda online pasaba 3 horas diarias copiando pedidos de WhatsApp a Excel, actualizando inventario manualmente y enviando confirmaciones.",
    solution: "Conectamos WhatsApp → Google Sheets → sistema de inventario → respuestas automáticas.",
    result: "El proceso que tomaba 3 horas ahora toma 0. Los pedidos y el inventario se actualizan solos. La dueña usa ese tiempo para crecer.",
    image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Chatbot Inteligente",
    icon: MessageSquare,
    color: "bg-purple-50 text-purple-600 border-purple-100",
    iconColor: "bg-purple-500",
    problem: "Un terapeuta perdía consultas porque no podía responder WhatsApp mientras estaba en sesión. Los pacientes buscaban otro.",
    solution: "Chatbot que responde dudas frecuentes, explica servicios y agenda directamente en el calendario. Solo escala lo urgente.",
    result: "40% más consultas agendadas. El terapeuta responde mensajes con calma al final del día.",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Dashboard de Control",
    icon: BarChart3,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    iconColor: "bg-emerald-500",
    problem: "Un negocio con 3 canales de venta (físico, Instagram, MercadoLibre) nunca sabía cuánto ganaba realmente hasta fin de mes.",
    solution: "Dashboard unificado que conecta las 3 fuentes y muestra ventas, costos y margen en tiempo real.",
    result: "Por primera vez, ve el estado del negocio al día. Descubrió productos que perdían dinero por envío.",
    image: "https://images.unsplash.com/photo-1543286386-713df548e9cc?q=80&w=800&auto=format&fit=crop"
  }
];

const WHY_US = {
  title: "¿Por qué Cultivo AI?",
  not: {
    title: "Lo que NO somos",
    items: [
      "Una agencia que te vende y luego te pasa a un junior.",
      "Consultores que cobran por hora mientras 'investigan'.",
      "Vendedores de soluciones que no necesitas.",
      "Expertos que te hacen sentir ignorante."
    ]
  },
  yes: {
    title: "Lo que SÍ somos",
    items: [
      "Un papá enseñándole a su hijo a construir cosas reales.",
      "Gente que ha quebrado proyectos, aprendido, y sigue intentando.",
      "Integradores — conectamos herramientas, no reinventamos la rueda.",
      "Colombianos trabajando para el mundo desde aquí."
    ]
  },
  features: [
    {
      title: "Precios reales",
      desc: "Proyectos simples desde $100 USD.",
      icon: DollarSign
    },
    {
      title: "Trato directo",
      desc: "Sin intermediarios. Nos escribes, te respondemos nosotros.",
      icon: User
    },
    {
      title: "Flexibilidad real",
      desc: "¿Startup sin presupuesto? ¿Proyecto social? Hablemos.",
      icon: HeartHandshake
    }
  ]
};

// --- AI Chat Logic & Components ---

// System Instruction Construction
const SYSTEM_INSTRUCTION = `
You are the AI Assistant for CultivoAI, a web design and automation studio run by a dynamic father-son duo: Paul (the business strategist) and Rocky (the 14-year-old tech prodigy).

**Your Persona:**
- **Tone:** Professional yet playful, slightly witty, and creative. Think of yourself as a helpful digital guide who appreciates good engineering and design.
- **Vibe:** You are not a stiff corporate bot. You are part of the team. You use emojis sparingly but effectively to convey enthusiasm.
- **Language:** Fluent in both Spanish and English (adapt to the user). The site content is mixed, but primarily Spanish/English friendly.

**Key Topics You Love to Talk About:**
1.  **Rocky's "Fondo Semilla" (Seed Fund):** This is Rocky's initiative to fund his learning and future. He builds small tools/chatbots for $10-$50 USD to gain experience. It's not charity; it's an exchange of value. He's 14, loves football (striker for Antioquia league), and wants to have options when he turns 19.
2.  **Paul's Role:** He provides the strategic "adult supervision" and business mentorship. He ensures projects make financial sense for clients. He's the bridge between raw tech potential and business ROI.
3.  **Flexible Partnerships:** We offer different ways to work: Standard, Reduced Rate (for startups/impact), Deferred Payment, Revenue Share, and Equity. We believe good ideas deserve a chance.
4.  **The Duo Dynamic:** Emphasize the unique combination of youthful innovation (Rocky) and seasoned wisdom (Paul).

**Your Capabilities (Tools):**
You can control the website! Don't just tell users where things are—take them there.
- **navigate_to_section(section_id):** Use this to scroll to sections like 'semilla' (for the fund), 'projects' (for work samples), 'demos' (to show AI in action). IDs: 'hero', 'about', 'services', 'demos', 'semilla', 'projects', 'stories', 'partnerships'.
- **show_project_details(project_title):** If a user asks about "Chak", "Munayki", or specific work, open the modal.
- **show_service_details(service_title):** If a user asks about "Chatbots", "Automation", or "Dashboards", open the service details.

**Data Awareness:**
- **Services:** ${JSON.stringify(SERVICES.map(s => ({ title: s.title, desc: s.desc })))}
- **Projects:** ${JSON.stringify(PROJECTS.map(p => ({ title: p.title, desc: p.desc, fullDesc: p.fullDesc })))}
- **Semilla Details:** ${JSON.stringify(SEMILLA_CONTENT)}
- **Success Stories:** ${JSON.stringify(REAL_STORIES)}
- **Why Us:** ${JSON.stringify(WHY_US)}
- **Partnerships:** ${JSON.stringify(PARTNERSHIPS)}

**Rules:**
- If a user asks to "see" something you have a tool for, USE THE TOOL immediately.
- Keep responses concise (usually under 3 sentences).
- If the user speaks Spanish, reply in Spanish. If English, reply in English.
`;

interface AIChatWidgetProps {
  theme: Theme;
  onNavigate: (id: string) => void;
  onOpenModal: (type: 'project' | 'service', data: any) => void;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

const AIChatWidget: React.FC<AIChatWidgetProps> = ({ theme, onNavigate, onOpenModal, isOpen, onToggle }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: '¡Hola! Soy el asistente IA de Cultivo. ¿Quieres saber sobre los proyectos de Rocky, nuestros servicios o modelos de alianza?' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use a ref to store the chat session
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    // Check if API KEY is present in process.env safely
    const tools: Tool[] = [
      {
        functionDeclarations: [
          {
            name: "navigate_to_section",
            description: "Scrolls the website to a specific section",
            parameters: {
              type: Type.OBJECT,
              properties: {
                section_id: {
                  type: Type.STRING,
                  description: "The ID of the section to scroll to (hero, about, services, demos, semilla, projects, stories, partnerships)",
                },
              },
              required: ["section_id"],
            },
          },
          {
            name: "show_project_details",
            description: "Opens a modal with full details about a specific project",
            parameters: {
              type: Type.OBJECT,
              properties: {
                project_title: {
                  type: Type.STRING,
                  description: "The title of the project to show",
                },
              },
              required: ["project_title"],
            },
          },
          {
            name: "show_service_details",
            description: "Opens a modal with full details about a specific service",
            parameters: {
              type: Type.OBJECT,
              properties: {
                service_title: {
                  type: Type.STRING,
                  description: "The title of the service to show",
                },
              },
              required: ["service_title"],
            },
          },
        ],
      },
    ];

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
          console.warn("API Key missing");
          return;
      }
      const ai = new GoogleGenAI({ apiKey });
      // Create chat instance with tools config using the correct SDK method
      chatSessionRef.current = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: tools
        }
      });
    } catch (e) {
      console.error("Failed to initialize AI", e);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // Ensure chat session is initialized
    if (!chatSessionRef.current) {
        setMessages(prev => [...prev, { role: 'model', text: "Lo siento, la IA no se pudo conectar. Verifica tu API Key." }]);
        return;
    }
    
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const chat = chatSessionRef.current;
      const result = await chat.sendMessage({ message: userMsg });
      
      const functionCalls = result.functionCalls;
      let responseText = result.text;

      // Handle Function Calls
      if (functionCalls && functionCalls.length > 0) {
        const toolResponses = [];
        
        for (const call of functionCalls) {
          const args = call.args;
          let toolResult = { result: "Action performed." };

          // Execute Tool
          if (call.name === "navigate_to_section") {
             const sectionId = args.section_id as string;
             onNavigate(sectionId);
             toolResult = { result: `Navigated to section ${sectionId}` };
          } else if (call.name === "show_project_details") {
             const title = args.project_title as string;
             const project = PROJECTS.find(p => p.title.toLowerCase().includes(title.toLowerCase()));
             if (project) {
               onOpenModal('project', project);
               toolResult = { result: `Opened modal for project ${project.title}` };
             } else {
               toolResult = { result: "Project not found" };
             }
          } else if (call.name === "show_service_details") {
             const title = args.service_title as string;
             const service = SERVICES.find(s => s.title.toLowerCase().includes(title.toLowerCase()));
             if (service) {
               onOpenModal('service', service);
               toolResult = { result: `Opened modal for service ${service.title}` };
             } else {
               toolResult = { result: "Service not found" };
             }
          }
          
          toolResponses.push({
            functionResponse: {
               name: call.name,
               response: toolResult,
               id: call.id
            }
          });
        }

        // Send tool results back to model to get final text response
        const nextResult = await chat.sendMessage({ message: toolResponses });
        responseText = nextResult.text;
      }

      setMessages(prev => [...prev, { role: 'model', text: responseText || "Entendido." }]);

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Lo siento, tuve un error de conexión momentáneo. Por favor intenta de nuevo." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Styling based on Theme
  const isBrutalist = theme === 'brutalist';

  const containerClass = isBrutalist 
    ? "fixed bottom-6 right-6 z-[60] flex flex-col items-end font-grotesk" 
    : "fixed bottom-8 right-8 z-[60] flex flex-col items-end font-display";

  const windowClass = isBrutalist
    ? "bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-80 md:w-96 mb-4 flex flex-col transition-all duration-300 origin-bottom-right"
    : "bg-white rounded-[2rem] shadow-2xl border border-neutral-100 w-80 md:w-96 mb-4 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right";

  const headerClass = isBrutalist
    ? "bg-[#FFC805] border-b-4 border-black p-4 flex justify-between items-center"
    : "bg-[#1a1a1a] p-4 text-white flex justify-between items-center bg-gradient-to-r from-neutral-900 to-neutral-800";

  const buttonClass = isBrutalist
    ? `bg-black text-white p-4 border-4 border-transparent hover:border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 font-bold uppercase`
    : `bg-[#1a1a1a] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform hover:shadow-xl flex items-center justify-center`;

  if (!isOpen) {
    return (
      <div className={containerClass}>
        <button onClick={() => onToggle(true)} className={buttonClass}>
          {isBrutalist ? (
             <>
               <MessageSquare size={24} />
               <span>Chat AI</span>
             </>
          ) : (
             <Sparkles size={24} className="text-[#FFC805]" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className={`${windowClass} h-[500px] max-h-[80vh]`}>
        {/* Header */}
        <div className={headerClass}>
          <div className="flex items-center gap-2">
            {isBrutalist ? <Bot size={24} className="text-black" /> : <Sparkles size={20} className="text-[#FFC805]" />}
            <span className={`font-bold ${isBrutalist ? 'text-black uppercase' : 'text-white'}`}>
              Cultivo Assistant
            </span>
          </div>
          <button onClick={() => onToggle(false)} className={isBrutalist ? "text-black hover:scale-110" : "text-white/80 hover:text-white"}>
            <Minimize2 size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isBrutalist ? 'bg-[#F3F4F6]' : 'bg-gray-50'}`}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 text-sm ${
                msg.role === 'user' 
                  ? isBrutalist 
                    ? "bg-black text-white font-bold border-2 border-transparent"
                    : "bg-[#1a1a1a] text-white rounded-2xl rounded-tr-sm shadow-md"
                  : isBrutalist
                    ? "bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_#A855F7]"
                    : "bg-white text-neutral-800 rounded-2xl rounded-tl-sm shadow-sm border border-neutral-100"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className={isBrutalist ? "bg-[#FFDE00] border-2 border-black p-2" : "bg-white p-3 rounded-2xl shadow-sm"}>
                <Loader2 size={16} className="animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={`p-3 ${isBrutalist ? 'bg-white border-t-4 border-black' : 'bg-white border-t border-neutral-100'}`}>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pregunta algo..."
              className={`flex-1 p-2 outline-none ${
                isBrutalist 
                  ? "bg-[#F3F4F6] border-2 border-black focus:shadow-[2px_2px_0px_0px_#A855F7] font-bold" 
                  : "bg-gray-100 rounded-xl px-4 focus:ring-2 focus:ring-[#FFC805]/50 transition-all"
              }`}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`p-2 ${
                isBrutalist
                  ? "bg-[#A855F7] text-white border-2 border-black hover:bg-[#9333EA] disabled:opacity-50"
                  : "bg-[#1a1a1a] text-white rounded-xl hover:bg-neutral-800 disabled:opacity-50 transition-colors"
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Components ---

interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}

const Reveal: React.FC<RevealProps> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Modal Components ---

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    theme: Theme;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, theme }) => {
    if (!isOpen) return null;
    
    const overlayClass = theme === 'brutalist' 
        ? "bg-black/80 backdrop-blur-sm" 
        : "bg-neutral-900/60 backdrop-blur-md";
        
    const containerClass = theme === 'brutalist'
        ? "bg-white border-4 border-black shadow-[16px_16px_0px_0px_#A855F7] p-0 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        : "bg-white rounded-[40px] shadow-2xl p-0 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto";

    const closeBtnClass = theme === 'brutalist'
        ? "absolute top-4 right-4 bg-red-500 text-white border-2 border-black p-2 hover:bg-red-600 hover:translate-y-1 transition-all z-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
        : "absolute top-6 right-6 bg-neutral-100 text-neutral-500 p-2 rounded-full hover:bg-neutral-200 transition-all z-50 cursor-pointer";

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center ${overlayClass}`} onClick={onClose}>
            <div className={`relative ${containerClass} animate-in fade-in zoom-in-95 duration-300`} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className={closeBtnClass} aria-label="Close modal">
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

const ProjectModalContent: React.FC<{ project: any, theme: Theme }> = ({ project, theme }) => {
    const isBrutalist = theme === 'brutalist';

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className={`w-full h-full object-cover ${isBrutalist ? 'filter grayscale contrast-125 border-b-4 md:border-b-0 md:border-r-4 border-black' : ''}`}
                />
            </div>
            <div className={`w-full md:w-1/2 p-8 md:p-12 ${isBrutalist ? 'bg-white' : 'bg-white'}`}>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className={isBrutalist 
                            ? "bg-black text-white px-3 py-1 font-bold text-xs uppercase shadow-[3px_3px_0px_0px_#A855F7]" 
                            : "px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold uppercase"
                        }>
                            {tag}
                        </span>
                    ))}
                </div>
                
                <h2 className={`text-3xl md:text-4xl font-black uppercase mb-4 leading-tight ${isBrutalist ? '' : 'text-neutral-800'}`}>
                    {project.title}
                </h2>
                
                <div className={`inline-block mb-6 ${isBrutalist ? 'bg-[#FFDE00] border-2 border-black px-3 py-1 font-bold uppercase text-xs' : 'bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-xs uppercase'}`}>
                    {project.status}
                </div>

                <p className="text-lg font-medium leading-relaxed mb-8 opacity-90">
                    {project.fullDesc || project.desc}
                </p>

                <div className={isBrutalist 
                    ? "bg-[#F3F4F6] border-l-8 border-black p-6" 
                    : "bg-[#FFF8E1] p-6 rounded-2xl border border-yellow-200"
                }>
                    <span className={`font-bold text-xs uppercase block mb-2 ${isBrutalist ? 'text-neutral-500' : 'text-yellow-700'}`}>Lesson Learned</span>
                    <p className={`font-medium italic ${isBrutalist ? '' : 'text-yellow-900'}`}>"{project.lessons}"</p>
                </div>
            </div>
        </div>
    );
};

const ServiceModalContent: React.FC<{ service: any, theme: Theme }> = ({ service, theme }) => {
    const isBrutalist = theme === 'brutalist';

    return (
        <div className="relative overflow-hidden">
             {/* Header Background */}
             <div className={`h-48 md:h-64 relative overflow-hidden ${isBrutalist ? 'border-b-4 border-black' : ''}`}>
                <div className={`absolute inset-0 ${isBrutalist ? 'bg-black/40' : 'bg-black/20'} z-10`}></div>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-6 left-6 z-20 flex items-end gap-4">
                    <div className={isBrutalist 
                        ? "p-4 bg-[#A855F7] border-4 border-black text-white shadow-[6px_6px_0px_0px_white]" 
                        : "w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-[#FFC805]"
                    }>
                        <service.icon size={isBrutalist ? 32 : 40} />
                    </div>
                </div>
             </div>

             <div className="p-8 md:p-12">
                <h2 className={`text-3xl md:text-5xl font-black uppercase mb-2 ${isBrutalist ? 'text-black' : 'text-neutral-800'}`}>
                    {service.title}
                </h2>
                <h3 className={`text-lg font-bold uppercase mb-8 tracking-wider ${isBrutalist ? 'text-[#A855F7]' : 'text-neutral-400'}`}>
                    {service.eng}
                </h3>

                <div className="prose prose-lg max-w-none">
                    <p className={`text-xl font-medium leading-relaxed mb-6 ${isBrutalist ? 'border-l-4 border-black pl-6' : ''}`}>
                        {service.desc}
                    </p>
                    <p className="text-base md:text-lg opacity-80 leading-relaxed">
                        {service.details || "Contáctanos para saber más detalles sobre cómo este servicio puede transformar tu operación."}
                    </p>
                </div>

                <div className="mt-12 flex gap-4">
                     <button className={isBrutalist 
                        ? "w-full md:w-auto bg-[#FFDE00] text-black border-4 border-black px-8 py-4 font-black uppercase hover:shadow-[8px_8px_0px_0px_black] hover:-translate-y-1 transition-all" 
                        : "w-full md:w-auto bg-[#FFC805] text-[#1a1a1a] px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg"
                     }>
                        Estoy interesado
                     </button>
                </div>
             </div>
        </div>
    );
};

const PartnershipModalContent: React.FC<{ partnership: any, theme: Theme, onChat: () => void }> = ({ partnership, theme, onChat }) => {
    const isBrutalist = theme === 'brutalist';

    return (
        <div className={`p-8 md:p-12 ${isBrutalist ? 'bg-white' : 'bg-white'}`}>
             <div className={`flex items-center gap-4 mb-6 ${isBrutalist ? 'border-b-4 border-black pb-6' : 'border-b border-gray-100 pb-6'}`}>
                <div className={`p-4 ${isBrutalist ? 'bg-black text-white' : partnership.color + ' rounded-2xl'}`}>
                   <partnership.icon size={32} />
                </div>
                <div>
                   <h2 className={`text-3xl md:text-4xl font-black uppercase leading-none ${isBrutalist ? 'text-black' : 'text-neutral-800'}`}>
                       {partnership.title}
                   </h2>
                   <p className={`font-bold ${isBrutalist ? 'text-[#A855F7] uppercase' : 'text-neutral-500'}`}>{partnership.short}</p>
                </div>
             </div>

             <div className="prose prose-lg max-w-none mb-8">
                 <p className="text-xl font-medium leading-relaxed mb-8">{partnership.desc}</p>
                 
                 <div className={isBrutalist 
                     ? "bg-[#F3F4F6] border-4 border-black p-6" 
                     : "bg-gray-50 p-6 rounded-2xl border border-gray-100"
                 }>
                     <h4 className={`font-black uppercase text-sm mb-2 ${isBrutalist ? 'text-black' : 'text-neutral-400'}`}>Ideal Para:</h4>
                     <p className={`font-bold text-lg ${isBrutalist ? 'text-black' : 'text-neutral-700'}`}>{partnership.ideal}</p>
                 </div>
             </div>

             <button 
                onClick={onChat}
                className={isBrutalist 
                ? "w-full bg-[#10B981] text-black border-4 border-black px-8 py-4 font-black uppercase hover:shadow-[8px_8px_0px_0px_black] hover:-translate-y-1 transition-all flex items-center justify-center gap-2" 
                : "w-full bg-[#1a1a1a] text-white px-10 py-4 rounded-full font-bold hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2"
             }>
                <MessageSquare size={20} />
                Hablemos de esto
             </button>
        </div>
    );
};

// --- AI Demo Renderers ---

const CodeView: React.FC<{ steps: any[], theme: Theme }> = ({ steps, theme }) => {
    return (
        <div className="h-full bg-[#1e1e1e] font-mono p-4 text-sm overflow-hidden flex flex-col">
            <div className="flex gap-2 mb-4 border-b border-gray-700 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-gray-500 text-xs">app.tsx</span>
            </div>
            <div className="space-y-2 flex-1 overflow-y-auto">
                {steps.map((step, i) => (
                    <Reveal key={i} delay={i * 300}>
                        <div className="flex gap-2">
                            <span className="text-gray-600 select-none">{i + 1}</span>
                            <div className="flex-1">
                                {step.type === 'user' && <span className="text-blue-400">// Request: {step.text}</span>}
                                {step.type === 'ai' && <span className="text-purple-400 animate-pulse">/* {step.text} */</span>}
                                {step.type === 'data' && <span className="text-green-300">{step.text}</span>}
                                {step.type === 'action' && <span className="text-yellow-300">{`console.log("${step.text}")`}</span>}
                            </div>
                        </div>
                    </Reveal>
                ))}
                <div className="animate-pulse">_</div>
            </div>
        </div>
    );
};

const MobileView: React.FC<{ steps: any[], theme: Theme }> = ({ steps, theme }) => {
    return (
        <div className="h-full bg-gray-100 flex items-center justify-center py-4">
            <div className="w-64 h-[500px] bg-white rounded-3xl border-8 border-gray-900 overflow-hidden shadow-xl flex flex-col relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-xl z-20"></div>
                
                {/* Status Bar */}
                <div className="bg-gray-50 p-2 pt-6 flex justify-between items-center text-[10px] text-gray-500 font-bold px-4 border-b">
                    <span>9:41</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                        <div className="w-3 h-3 bg-black rounded-full opacity-50"></div>
                    </div>
                </div>

                {/* Feed */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                    {steps.map((step, i) => (
                         <Reveal key={i} delay={i * 400}>
                             {step.type === 'user' && (
                                 <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tr-sm text-xs mb-2 shadow-sm">
                                     <p className="font-bold mb-1">New Idea 💡</p>
                                     {step.text}
                                 </div>
                             )}
                             {step.type === 'action' && (
                                 <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                     <div className="flex items-center gap-2 mb-2 border-b pb-2">
                                        {step.text.includes('Instagram') && <Instagram size={14} className="text-pink-500" />}
                                        {step.text.includes('Twitter') && <Twitter size={14} className="text-blue-400" />}
                                        {step.text.includes('LinkedIn') && <Linkedin size={14} className="text-blue-700" />}
                                        <span className="text-[10px] font-bold text-gray-400">Just now</span>
                                     </div>
                                     <div className="h-16 bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-gray-300 text-xs">
                                         Image Preview
                                     </div>
                                     <div className="h-2 bg-gray-100 w-3/4 rounded mb-1"></div>
                                     <div className="h-2 bg-gray-100 w-1/2 rounded"></div>
                                 </div>
                             )}
                             {step.type === 'ai' && (
                                 <div className="flex items-center justify-center gap-2 py-2">
                                     <Loader2 size={12} className="animate-spin text-purple-500" />
                                     <span className="text-[10px] text-purple-500 font-bold uppercase tracking-wide">Generating Content...</span>
                                 </div>
                             )}
                         </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

const DashboardView: React.FC<{ steps: any[], theme: Theme }> = ({ steps, theme }) => {
    return (
        <div className="h-full bg-gray-50 p-4 grid grid-cols-2 grid-rows-3 gap-3">
             {/* Static Widgets */}
             <div className="col-span-1 bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                 <span className="text-xs text-gray-400 font-bold uppercase">Total Revenue</span>
                 <div className="text-2xl font-bold text-gray-800">$12,450</div>
                 <div className="text-xs text-green-500 flex items-center gap-1"><TrendingUp size={10} /> +12%</div>
             </div>
             <div className="col-span-1 bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                 <span className="text-xs text-gray-400 font-bold uppercase">Active Users</span>
                 <div className="text-2xl font-bold text-gray-800">1,204</div>
                 <div className="h-1 w-full bg-gray-100 rounded-full mt-2"><div className="h-full w-2/3 bg-blue-500 rounded-full"></div></div>
             </div>

             {/* Live Updates Area */}
             <div className="col-span-2 row-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-3 overflow-hidden relative">
                 <div className="text-xs font-bold text-gray-400 uppercase mb-2 flex justify-between">
                     <span>Live Activity Log</span>
                     <span className="flex items-center gap-1 text-green-500"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Live</span>
                 </div>
                 <div className="space-y-2 overflow-y-auto max-h-[140px]">
                     {steps.map((step, i) => (
                         <Reveal key={i} delay={i * 500}>
                             <div className={`text-xs p-2 rounded-lg flex items-center gap-2 ${
                                 step.type === 'bot' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : 
                                 step.type === 'data' ? 'bg-green-50 text-green-700 border border-green-100' : 
                                 'bg-gray-50 text-gray-600'
                             }`}>
                                 {step.type === 'trigger' && <Zap size={10} />}
                                 {step.type === 'bot' && <Bot size={10} />}
                                 {step.type === 'data' && <Database size={10} />}
                                 {step.text}
                             </div>
                         </Reveal>
                     ))}
                 </div>
             </div>
        </div>
    );
};

const CRMView: React.FC<{ steps: any[], theme: Theme }> = ({ steps, theme }) => {
    return (
        <div className="h-full bg-slate-100 p-4 flex gap-3 overflow-x-auto">
             {['New Leads', 'Contacted', 'Qualified'].map((col, idx) => (
                 <div key={col} className="w-1/3 min-w-[120px] bg-slate-200/50 rounded-lg p-2 flex flex-col gap-2">
                     <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{col}</div>
                     {idx === 0 && (
                         <div className="bg-white p-2 rounded shadow-sm border-l-4 border-blue-500">
                             <div className="w-8 h-8 bg-gray-200 rounded-full mb-2"></div>
                             <div className="h-2 bg-gray-200 w-3/4 rounded mb-1"></div>
                             <div className="h-2 bg-gray-200 w-1/2 rounded"></div>
                         </div>
                     )}
                     
                     {/* Dynamic Step Injection */}
                     {idx === 0 && steps.map((step, i) => (
                         <Reveal key={i} delay={i * 600}>
                            {step.type === 'trigger' && (
                                <div className="bg-white p-2 rounded shadow-sm border-l-4 border-purple-500 animate-in slide-in-from-left duration-300">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="font-bold text-xs text-gray-800">Juan Pérez</div>
                                        <div className="text-[8px] bg-blue-100 text-blue-600 px-1 rounded">LinkedIn</div>
                                    </div>
                                    <div className="text-[10px] text-gray-500">CEO @ TechCorp</div>
                                </div>
                            )}
                         </Reveal>
                     ))}

                     {idx === 2 && steps.map((step, i) => (
                         <Reveal key={i} delay={i * 600}>
                            {step.type === 'action' && (
                                <div className="bg-white p-2 rounded shadow-md ring-2 ring-green-400 border-l-4 border-green-500">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="font-bold text-xs text-gray-800">Juan Pérez</div>
                                        <div className="text-[8px] bg-green-100 text-green-600 px-1 rounded">92/100</div>
                                    </div>
                                    <div className="text-[10px] text-gray-500">High Priority Lead</div>
                                </div>
                            )}
                         </Reveal>
                     ))}
                 </div>
             ))}
        </div>
    );
};

// --- AI Demo Component ---
const AIUseCases: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState(0);
  const isBrutalist = theme === 'brutalist';
  const activeCase = USE_CASES[activeTab];

  const renderVisual = () => {
      switch(activeCase.visual) {
          case 'code': return <CodeView steps={activeCase.steps} theme={theme} />;
          case 'mobile': return <MobileView steps={activeCase.steps} theme={theme} />;
          case 'dashboard': return <DashboardView steps={activeCase.steps} theme={theme} />;
          case 'crm': return <CRMView steps={activeCase.steps} theme={theme} />;
          case 'chat':
          default: 
            return (
                <div className="p-6 md:p-8 flex-1 bg-gray-50/30 space-y-6 overflow-y-auto max-h-[600px]">
                    {activeCase.steps.map((step, i) => (
                        <Reveal key={`${activeTab}-${i}`} delay={i * 400}>
                        <div className={`flex gap-4 ${step.type === 'user' || step.type === 'trigger' ? 'justify-end' : 'justify-start'}`}>
                            {step.type !== 'user' && step.type !== 'trigger' && (
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                                    step.type === 'ai' ? 'bg-blue-600 text-white' : 
                                    step.type === 'action' ? 'bg-green-500 text-white' : 
                                    step.type === 'data' ? 'bg-orange-500 text-white' :
                                    'bg-[#1a1a1a] text-white'
                                } ${isBrutalist && 'border-2 border-black rounded-none shadow-[4px_4px_0px_0px_black]'}`}>
                                    {step.type === 'ai' ? <BrainCircuit size={18} /> : 
                                    step.type === 'action' ? <Check size={18} /> : 
                                    step.type === 'data' ? <Database size={18} /> :
                                    <Bot size={18} />
                                    }
                                </div>
                            )}
                            
                            <div className={`max-w-[85%] p-5 text-sm md:text-base ${
                                step.type === 'user' || step.type === 'trigger'
                                    ? isBrutalist 
                                    ? 'bg-black text-white font-bold shadow-[4px_4px_0px_0px_#A855F7]' 
                                    : 'bg-[#1a1a1a] text-white shadow-md rounded-2xl rounded-tr-sm'
                                    : isBrutalist
                                    ? step.type === 'ai' ? 'bg-white border-2 border-black font-mono' : 'bg-[#FFDE00] border-2 border-black font-bold'
                                    : step.type === 'ai' ? 'bg-white border border-gray-100 text-gray-700 rounded-2xl shadow-sm' : 'bg-white border border-l-4 border-l-[#FFC805] text-gray-800 shadow-sm rounded-r-2xl rounded-bl-2xl'
                            }`}>
                                {step.isProcessing && (
                                    <div className="flex items-center gap-2 mb-2 opacity-60 text-[10px] uppercase tracking-wider font-bold">
                                        <Loader2 size={12} className="animate-spin" /> Procesando
                                    </div>
                                )}
                                <div className={step.type === 'data' ? 'font-mono text-xs md:text-sm' : ''}>{step.text}</div>
                            </div>

                            {(step.type === 'user' || step.type === 'trigger') && (
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isBrutalist ? 'bg-white border-2 border-black text-black' : 'bg-gray-200 text-gray-500'} ${isBrutalist && 'rounded-none'}`}>
                                    <User size={20} />
                                </div>
                            )}
                        </div>
                        </Reveal>
                    ))}
                </div>
            );
      }
  };

  return (
    <div id="demos" className={`py-20 md:py-32 ${isBrutalist ? 'bg-white border-b-4 border-black' : 'bg-neutral-50'}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-6xl font-black uppercase mb-4 ${isBrutalist ? 'text-black' : 'text-[#1a1a1a] tracking-tight'}`}>
              AI en Acción
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isBrutalist ? 'font-bold border-b-4 border-black inline-block pb-1' : 'text-neutral-500 font-medium'}`}>
              Prueba nuestros agentes digitales. Selecciona un caso de uso:
            </p>
          </div>
        </Reveal>

        {/* Navigation Menu */}
        <div className="mb-12">
            <div className="flex overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide gap-3 md:flex-wrap md:justify-center">
                 {USE_CASES.map((useCase, index) => {
                    const isActive = activeTab === index;
                    return (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`flex items-center gap-2 px-5 py-3 transition-all whitespace-nowrap shrink-0 ${
                                isActive
                                ? isBrutalist
                                    ? 'bg-[#A855F7] text-white border-4 border-black shadow-[4px_4px_0px_0px_black] -translate-y-1'
                                    : 'bg-[#1a1a1a] text-white shadow-lg scale-105 rounded-full ring-2 ring-offset-2 ring-[#FFC805]'
                                : isBrutalist
                                    ? 'bg-white text-black border-4 border-black hover:bg-gray-100'
                                    : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50 shadow-sm rounded-full border border-gray-100'
                            }`}
                        >
                            <useCase.icon size={18} />
                            <span className="font-bold text-sm uppercase tracking-wide">{useCase.title}</span>
                        </button>
                    )
                 })}
            </div>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Description Panel */}
            <div className="lg:col-span-4">
                <Reveal key={`desc-${activeTab}`}>
                    <div className={`p-8 h-full flex flex-col justify-center ${
                        isBrutalist 
                        ? 'bg-[#FFDE00] border-4 border-black shadow-[8px_8px_0px_0px_black]' 
                        : 'bg-white rounded-[32px] shadow-xl border border-neutral-100'
                    }`}>
                        <div className={`w-16 h-16 flex items-center justify-center mb-6 ${
                            isBrutalist 
                            ? 'bg-black text-white border-2 border-black' 
                            : 'bg-gradient-to-br from-[#FFC805] to-orange-400 text-white rounded-2xl shadow-lg'
                        }`}>
                            {React.createElement(activeCase.icon, { size: 32 })}
                        </div>
                        
                        <h3 className={`text-2xl md:text-3xl font-black uppercase mb-4 leading-none ${
                            isBrutalist ? 'text-black' : 'text-neutral-800'
                        }`}>
                            {activeCase.title}
                        </h3>
                        
                        <p className={`font-medium text-lg mb-8 leading-relaxed ${
                             isBrutalist ? 'text-black' : 'text-neutral-500'
                        }`}>
                            {activeCase.description}
                        </p>

                        <div className={`mt-auto text-sm font-bold uppercase tracking-widest flex items-center gap-2 ${
                            isBrutalist ? 'text-black opacity-50' : 'text-neutral-300'
                        }`}>
                            <div className={`w-2 h-2 rounded-full ${isBrutalist ? 'bg-black' : 'bg-green-500 animate-pulse'}`}></div>
                            Live Demo Active
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Simulation Window */}
            <div className="lg:col-span-8">
                 <div className={`relative overflow-hidden min-h-[500px] flex flex-col ${
                    isBrutalist 
                      ? 'bg-white border-4 border-black shadow-[12px_12px_0px_0px_#10B981]' 
                      : 'bg-white rounded-[32px] shadow-2xl border border-gray-100 ring-4 ring-gray-50'
                 }`}>
                    {/* Header */}
                    <div className={`p-4 flex items-center justify-between border-b ${
                       isBrutalist 
                         ? 'bg-[#10B981] border-black border-b-4' 
                         : 'bg-white border-gray-100'
                    }`}>
                       <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${isBrutalist ? 'bg-black' : 'bg-red-400'}`}></div>
                          <div className={`w-3 h-3 rounded-full ${isBrutalist ? 'bg-black' : 'bg-yellow-400'}`}></div>
                          <div className={`w-3 h-3 rounded-full ${isBrutalist ? 'bg-black' : 'bg-green-400'}`}></div>
                       </div>
                       <div className={`font-mono text-xs uppercase ${isBrutalist ? 'text-black font-black' : 'text-gray-400 bg-gray-50 px-2 py-1 rounded'}`}>
                          {activeCase.id.toUpperCase()}_AGENT_V2.4.exe
                       </div>
                    </div>

                    {/* Dynamic Content Based on Type */}
                    <div className="flex-1 bg-white relative">
                        {renderVisual()}
                    </div>
                 </div>
              </div>
        </div>
      </div>
    </div>
  );
};

const DesignViewer: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('brutalist');

  const themes: { id: Theme; name: string; color: string }[] = [
    { id: 'rocket', name: 'Playful', color: 'bg-yellow-400' },
    { id: 'brutalist', name: 'Brutal', color: 'bg-purple-500' },
  ];

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-white overflow-hidden font-sans">
      {/* Viewer Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-neutral-800 bg-neutral-950 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Sprout size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline">Cultivo<span className="text-emerald-500">AI</span> <span className="text-neutral-500 text-sm font-normal ml-2">Design Studio</span></span>
          <span className="font-bold text-lg tracking-tight sm:hidden">Cultivo<span className="text-emerald-500">AI</span></span>
        </div>
        
        <div className="flex gap-2 bg-neutral-900 p-1 rounded-full border border-neutral-800">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setCurrentTheme(t.id)}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                currentTheme === t.id 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${t.color}`} />
              {t.name}
            </button>
          ))}
        </div>
      </header>

      {/* Main Preview Area */}
      <main className="flex-1 overflow-y-auto relative bg-white">
        <ThemeRenderer theme={currentTheme} />
      </main>
    </div>
  );
};

const ThemeRenderer: React.FC<{ theme: Theme }> = ({ theme }) => {
  switch (theme) {
    case 'brutalist': return <BrutalistDesign />;
    case 'rocket': return <RocketDesign />;
    default: return <RocketDesign />;
  }
};

// ==========================================
// DESIGN 1: BRUTALIST (Neo-Brutalism)
// ==========================================
const BrutalistDesign = () => {
  const [modalData, setModalData] = useState<{type: 'project' | 'service' | 'partnership', data: any} | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-full bg-[#F3F4F6] text-black font-grotesk selection:bg-[#FFDE00] selection:text-black">
      <Modal 
        isOpen={!!modalData} 
        onClose={() => setModalData(null)} 
        theme="brutalist"
      >
        {modalData?.type === 'project' && <ProjectModalContent project={modalData.data} theme="brutalist" />}
        {modalData?.type === 'service' && <ServiceModalContent service={modalData.data} theme="brutalist" />}
        {modalData?.type === 'partnership' && <PartnershipModalContent partnership={modalData.data} theme="brutalist" onChat={() => {
            setModalData(null);
            setIsChatOpen(true);
        }} />}
      </Modal>

      <AIChatWidget 
        theme="brutalist" 
        onNavigate={scrollTo}
        onOpenModal={(type, data) => setModalData({ type, data })}
        isOpen={isChatOpen}
        onToggle={setIsChatOpen}
      />

      {/* Top Bar Marquee */}
      <div className="bg-black text-[#FFDE00] overflow-hidden whitespace-nowrap py-2 md:py-3 border-b-4 border-black">
         <div className="animate-marquee inline-block font-black tracking-widest uppercase text-xs md:text-sm">
            Paul & Rocky — Direct Access — No Middlemen — AI for Purpose — Colombia to the World — Paul & Rocky — Direct Access — No Middlemen — AI for Purpose — Colombia to the World —
         </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black">
        <div className="flex justify-between items-stretch relative bg-white z-50">
             {/* Logo Section */}
             <div 
                className="p-3 md:p-4 border-r-4 border-black flex items-center gap-3 cursor-pointer group hover:bg-gray-50 transition-colors"
                onClick={() => scrollTo('hero')}
             >
                <div className="w-10 h-10 bg-[#FFC805] border-2 border-black rounded-xl flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-6 group-hover:rotate-0 transition-transform">
                    <Sprout size={24} fill="currentColor" />
                </div>
                <span className="font-black text-2xl tracking-tight leading-none">
                    Cultivo<span className="text-[#A855F7]">AI</span>
                </span>
             </div>

             {/* Mobile Burger Button */}
             <button 
                className="lg:hidden px-6 border-l-4 border-black hover:bg-[#FFDE00] transition-colors flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
             </button>

             {/* Desktop Links */}
             <div className="hidden lg:flex flex-1">
               {NAV_ITEMS.map((item) => (
                 <button 
                   key={item.label} 
                   onClick={() => scrollTo(item.id)} 
                   className="flex-1 px-4 border-r-4 border-black font-bold uppercase hover:bg-[#FFDE00] transition-colors text-sm last:border-r-0"
                 >
                   {item.label}
                 </button>
               ))}
             </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b-4 border-black animate-in slide-in-from-top-2 duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] z-40">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => {
                            scrollTo(item.id);
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left p-4 border-b-4 border-black font-black uppercase hover:bg-[#FFDE00] hover:pl-6 transition-all last:border-b-0 text-lg"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        )}
      </nav>

      {/* Section 1: Hero */}
      <div id="hero" className="grid lg:grid-cols-2 min-h-[85vh]">
         {/* Updated to match the orange requested (#FFC805) instead of the previous yellow (#FFDE00) */}
         <div className="bg-[#FFC805] p-6 md:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <Reveal>
              <div className="bg-white border-4 border-black p-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] w-max mb-6 md:mb-8 transform hover:rotate-0 transition-transform duration-300">
                 <span className="font-black uppercase tracking-tight text-sm md:text-base">Padre e Hijo</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-8xl font-black uppercase leading-[0.9] md:leading-[0.85] mb-6 md:mb-8 tracking-tighter">
                {COPY.hero.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-bold border-l-8 border-black pl-4 md:pl-6 mb-8 md:mb-10 bg-white/50 py-4 max-w-xl">
                {COPY.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <button className="bg-black text-white px-6 md:px-8 py-4 md:py-5 font-black uppercase shadow-[8px_8px_0px_0px_#A855F7] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#A855F7] transition-all border-2 border-transparent text-base md:text-lg">
                   {COPY.hero.cta1}
                 </button>
                 <button className="bg-white text-black border-4 border-black px-6 md:px-8 py-4 md:py-5 font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-base md:text-lg">
                   {COPY.hero.cta2}
                 </button>
              </div>
            </Reveal>
         </div>

         <div className="bg-[#A855F7] p-8 md:p-16 border-b-4 border-black flex items-center justify-center relative overflow-hidden min-h-[400px]">
            {/* Abstract Shapes */}
            <div className="absolute top-10 left-10 w-16 md:w-24 h-16 md:h-24 bg-white border-4 border-black rounded-full animate-bounce duration-[3000ms]"></div>
            
            {/* Changed from #FFDE00 to #FFC805 to match the left hero section as requested */}
            <div className="absolute bottom-20 right-10 w-32 md:w-48 h-32 md:h-48 bg-[#FFC805] border-4 border-black rotate-12 transition-transform hover:rotate-45 duration-700 z-0"></div>
            
            {/* Positioned AI text to the left of the orange square */}
            <div className="absolute bottom-24 right-[160px] md:right-[240px] opacity-20 font-black text-[100px] md:text-[200px] leading-none text-white pointer-events-none select-none z-0">
               AI
            </div>
            
            {/* Added Rocket Image positioned to look like it's flying up from behind the SIN DRAMA box */}
            <img 
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" 
              alt="Rocket" 
              className="absolute left-1/2 top-1/2 w-48 md:w-64 -translate-x-1/2 -translate-y-[135%] -rotate-45 z-0 animate-[pulse_3s_infinite]"
            />

            <Reveal delay={200} className="relative z-10 w-full max-w-md">
              <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rotate-3 hover:rotate-0 transition-transform duration-500 relative z-20">
                 <h3 className="font-black text-2xl md:text-3xl mb-4 bg-black text-white inline-block px-3 py-1 -rotate-2">SIN DRAMA.</h3>
                 <p className="font-bold text-lg md:text-xl leading-tight border-t-4 border-black pt-4">
                   Ayudamos a negocios con propósito a usar IA sin perderse en la complejidad.
                 </p>
              </div>
            </Reveal>
         </div>
      </div>

      {/* Section 2: About Us (Images) */}
      <div id="about" className="bg-white border-b-4 border-black p-6 md:p-12 lg:p-24 relative overflow-hidden">
         <div className="max-w-[1600px] mx-auto">
            <Reveal>
               <div className="flex flex-col md:flex-row gap-6 mb-12 md:mb-16 items-start">
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none bg-black text-white px-4 py-2 inline-block rotate-1">
                     El Equipo
                  </h2>
                  <p className="text-lg md:text-xl font-bold max-w-xl md:mt-2 border-l-4 border-[#A855F7] pl-4 md:pl-6">
                    Paul aporta la experiencia de décadas en negocios. Rocky trae la innovación técnica. Juntos somos imparables.
                  </p>
               </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-24">
               {/* Paul */}
               <Reveal delay={100}>
                  <div className="relative group">
                     <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"></div>
                     <div className="relative border-4 border-black bg-white p-4 h-full transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="aspect-[4/5] border-4 border-black overflow-hidden mb-6 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500">
                           <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" alt="Paul" className="object-cover w-full h-full" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black uppercase mb-2">Paul</h3>
                        <div className="bg-[#A855F7] text-white font-bold text-xs md:text-sm inline-block px-3 py-1 mb-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                           ESTRATEGIA & NEGOCIOS
                        </div>
                        <p className="font-bold text-base md:text-lg leading-tight">"La tecnología sin propósito es solo un juguete caro. Buscamos rentabilidad real."</p>
                     </div>
                  </div>
               </Reveal>

               {/* Rocky */}
               <Reveal delay={200}>
                  <div className="relative group mt-8 md:mt-0">
                     <div className="absolute inset-0 bg-[#FFDE00] translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"></div>
                     <div className="relative border-4 border-black bg-white p-4 h-full transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="aspect-[4/5] border-4 border-black overflow-hidden mb-6 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500">
                           <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" alt="Rocky" className="object-cover w-full h-full" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black uppercase mb-2">Rocky</h3>
                        <div className="bg-[#FFDE00] text-black font-bold text-xs md:text-sm inline-block px-3 py-1 mb-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                           TECH & AI LEAD
                        </div>
                        <p className="font-bold text-base md:text-lg leading-tight">"Construyo puentes entre lo imposible y lo práctico. El código es mi herramienta."</p>
                     </div>
                  </div>
               </Reveal>
            </div>
         </div>
      </div>

      {/* Section 3: Why Us */}
      <div className="border-b-4 border-black bg-white">
         <div className="grid md:grid-cols-2">
            {/* Negative */}
            <div className="p-8 md:p-12 lg:p-20 border-b-4 md:border-b-0 md:border-r-4 border-black bg-neutral-100">
               <Reveal>
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-8 md:mb-12 decoration-4 md:decoration-8 underline decoration-red-500 underline-offset-4 md:underline-offset-8">
                    {WHY_US.not.title}
                 </h2>
                 <ul className="space-y-4 md:space-y-6 font-bold text-lg md:text-xl">
                    {WHY_US.not.items.map((item, i) => (
                       <li key={i} className="flex gap-4 md:gap-6 items-start group">
                          <X size={28} className="shrink-0 text-white border-4 border-black bg-red-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform md:w-9 md:h-9" />
                          <span className="group-hover:text-red-600 transition-colors pt-1 text-base md:text-xl">{item}</span>
                       </li>
                    ))}
                 </ul>
               </Reveal>
            </div>
            {/* Positive */}
            <div className="p-8 md:p-12 lg:p-20 bg-[#C4F9E0]">
               <Reveal delay={200}>
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-8 md:mb-12 decoration-4 md:decoration-8 underline decoration-green-600 underline-offset-4 md:underline-offset-8">
                    {WHY_US.yes.title}
                 </h2>
                 <ul className="space-y-4 md:space-y-6 font-bold text-lg md:text-xl">
                    {WHY_US.yes.items.map((item, i) => (
                       <li key={i} className="flex gap-4 md:gap-6 items-start group">
                          <Check size={28} className="shrink-0 text-white border-4 border-black bg-green-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform md:w-9 md:h-9" />
                          <span className="group-hover:text-green-800 transition-colors pt-1 text-base md:text-xl">{item}</span>
                       </li>
                    ))}
                 </ul>
               </Reveal>
            </div>
         </div>
      </div>

      {/* Section 4: Services (Brutalist Grid) */}
      <div id="services" className="border-b-4 border-black bg-[#FFDE00]">
         <div className="p-6 md:p-12 lg:p-24 max-w-[1600px] mx-auto">
            <Reveal>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8 border-b-4 border-black pb-8">
                 <h2 className="text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                    Nuestros<br/><span className="text-white text-stroke-3 text-stroke-black">Servicios</span>
                 </h2>
                 <div className="bg-black text-white px-4 md:px-6 py-2 md:py-3 font-bold uppercase rotate-2 text-lg md:text-xl shadow-[4px_4px_0px_0px_white]">
                    Full Stack + AI
                 </div>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {SERVICES.map((s, i) => (
                  <Reveal key={i} delay={i * 100}>
                    <div 
                        className="group relative h-full cursor-pointer"
                        onClick={() => setModalData({ type: 'service', data: s })}
                    >
                       <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300"></div>
                       <div className="relative border-4 border-black bg-white p-6 md:p-8 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                          <div>
                            <div className="flex justify-between items-start mb-6">
                              <div className="p-3 bg-[#A855F7] border-2 border-black rounded-none group-hover:bg-[#FFDE00] transition-colors duration-300 group-hover:animate-bounce">
                                 <s.icon size={28} className="text-white group-hover:text-black transition-colors md:w-8 md:h-8" />
                              </div>
                              <span className="font-black text-4xl md:text-5xl opacity-10 text-black">0{i+1}</span>
                            </div>
                            <h3 className="font-black text-xl md:text-2xl uppercase mb-2 leading-none">{s.title}</h3>
                            <p className="font-bold text-xs uppercase mb-6 text-[#A855F7] tracking-wider">{s.eng}</p>
                          </div>
                          <p className="font-bold border-t-4 border-black pt-4 text-base md:text-lg leading-snug">{s.desc}</p>
                       </div>
                    </div>
                  </Reveal>
               ))}
            </div>

            {/* Brutalist CTA */}
            <Reveal delay={300} className="mt-16 md:mt-24">
              <div className="bg-black text-white p-6 md:p-8 lg:p-12 border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] md:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.5)] flex flex-col lg:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
                 <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#FFDE00] rounded-full blur-xl opacity-20 animate-pulse"></div>
                 
                 <div className="flex-1 z-10 w-full">
                    <div className="flex items-center gap-4 mb-4 text-[#FFDE00]">
                       <Code2 size={24} />
                       <span className="font-mono font-bold text-base md:text-lg">SYSTEM.INIT_CALL()</span>
                    </div>
                    <p className="font-bold text-xl md:text-2xl lg:text-3xl leading-tight">
                       {COPY.services_cta}
                    </p>
                 </div>
                 
                 <button className="w-full lg:w-auto relative z-10 bg-[#FFDE00] text-black font-black uppercase text-lg md:text-xl px-6 md:px-10 py-4 md:py-6 border-4 border-transparent hover:border-white hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_#A855F7] md:shadow-[8px_8px_0px_0px_#A855F7]">
                    Agenda 15 Minutos
                 </button>
              </div>
            </Reveal>
         </div>
      </div>

      {/* NEW SECTION: AI Demos */}
      <AIUseCases theme="brutalist" />

      {/* Section 5: Semilla Section (Brutalist) */}
      <div id="semilla" className="bg-[#10B981] border-b-4 border-black">
        <div className="p-6 md:p-12 lg:p-24 max-w-[1600px] mx-auto">
          <Reveal>
             <div className="bg-black text-white p-4 inline-block transform rotate-1 mb-12 shadow-[8px_8px_0px_0px_white]">
               <h2 className="text-3xl md:text-5xl font-black uppercase flex items-center gap-4">
                 <Leaf className="text-[#10B981]" size={32} />
                 Rocky's Semilla
               </h2>
             </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
             {/* Left Column: Story */}
             <Reveal>
               <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                 <h3 className="text-2xl font-black uppercase mb-6 bg-[#FFDE00] inline-block px-2 border-2 border-black">{SEMILLA_CONTENT.about.title}</h3>
                 <div className="space-y-4 font-bold text-lg">
                   {SEMILLA_CONTENT.about.text.map((p, i) => (
                     <p key={i}>{p}</p>
                   ))}
                 </div>
               </div>

               <div className="mt-12 bg-black text-white p-8 border-4 border-white shadow-[12px_12px_0px_0px_#A855F7]">
                 <h3 className="text-2xl font-black uppercase mb-4 text-[#A855F7]">{SEMILLA_CONTENT.fund.title}</h3>
                 <p className="font-bold text-xl mb-6">{SEMILLA_CONTENT.fund.description}</p>
                 <ul className="space-y-3 font-mono text-sm md:text-base">
                   {SEMILLA_CONTENT.fund.howItWorks.map((step, i) => (
                     <li key={i} className="flex gap-4">
                       <span className="text-[#10B981] font-black">0{i+1}.</span>
                       {step}
                     </li>
                   ))}
                 </ul>
                 <p className="mt-6 pt-6 border-t-2 border-white/20 font-bold italic text-[#FFDE00]">
                   "{SEMILLA_CONTENT.fund.note}"
                 </p>
               </div>
             </Reveal>

             {/* Right Column: Offer & Form */}
             <Reveal delay={200}>
               {/* What I can do */}
               <div className="mb-12">
                 <h3 className="text-3xl font-black uppercase mb-6 text-white text-stroke-2 text-stroke-black">{SEMILLA_CONTENT.services.title}</h3>
                 <div className="space-y-6">
                   <div className="bg-[#FFDE00] border-4 border-black p-6 hover:-translate-y-1 transition-transform">
                     <h4 className="font-black uppercase mb-2 flex items-center gap-2"><Zap size={20}/> Ahora Mismo</h4>
                     <ul className="list-disc list-inside font-bold">
                       {SEMILLA_CONTENT.services.now.map((item, i) => <li key={i}>{item}</li>)}
                     </ul>
                   </div>
                   <div className="bg-white border-4 border-black p-6 hover:-translate-y-1 transition-transform">
                     <h4 className="font-black uppercase mb-2 flex items-center gap-2"><GraduationCap size={20}/> Aprendiendo</h4>
                     <ul className="list-disc list-inside font-bold">
                       {SEMILLA_CONTENT.services.learning.map((item, i) => <li key={i}>{item}</li>)}
                     </ul>
                   </div>
                 </div>
               </div>

               {/* Tiers */}
               <div className="grid grid-cols-2 gap-4 mb-12">
                 {SEMILLA_CONTENT.tiers.map((tier, i) => (
                   <div key={i} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_black] hover:bg-[#A855F7] hover:text-white transition-colors group">
                     <div className="font-black text-xl uppercase mb-1">{tier.name}</div>
                     <div className="font-mono text-sm bg-black text-white inline-block px-1 mb-2 group-hover:bg-white group-hover:text-black">{tier.price}</div>
                     <p className="text-xs font-bold leading-tight">{tier.benefit}</p>
                   </div>
                 ))}
               </div>

               {/* Form */}
               <div className="bg-[#F3F4F6] border-4 border-black p-8 relative">
                 <div className="absolute -top-4 -right-4 bg-red-500 text-white border-4 border-black px-4 py-2 font-black uppercase rotate-3">
                   ¡Escríbeme!
                 </div>
                 <h3 className="text-2xl font-black uppercase mb-2">{SEMILLA_CONTENT.form.title}</h3>
                 <p className="font-bold mb-6">{SEMILLA_CONTENT.form.subtitle}</p>
                 <div className="space-y-4">
                   <input type="text" placeholder="Nombre" className="w-full bg-white border-4 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#A855F7]" />
                   <input type="email" placeholder="Email" className="w-full bg-white border-4 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#A855F7]" />
                   <textarea placeholder="¿Qué necesitas?" rows={3} className="w-full bg-white border-4 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#A855F7]"></textarea>
                   <button className="w-full bg-black text-white border-4 border-transparent p-4 font-black uppercase hover:bg-white hover:text-black hover:border-black transition-all flex justify-center items-center gap-2">
                     Enviar <Send size={20} />
                   </button>
                 </div>
               </div>
             </Reveal>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Flexible Partnerships (Brutalist) */}
      <div id="partnerships" className="bg-[#E5E7EB] border-b-4 border-black">
         <div className="p-6 md:p-12 lg:p-24 max-w-[1600px] mx-auto">
             <Reveal>
                 <div className="mb-12 md:mb-16">
                     <div className="inline-block bg-[#FFDE00] border-4 border-black p-4 shadow-[6px_6px_0px_0px_black] rotate-1 mb-6">
                         <h2 className="text-3xl md:text-5xl font-black uppercase">Formas Flexibles de Trabajar</h2>
                     </div>
                     <p className="font-bold text-lg md:text-xl max-w-2xl border-l-8 border-[#A855F7] pl-6 py-2 bg-white/50">
                         Entendemos que no todos los proyectos valiosos vienen con presupuestos corporativos. Las buenas ideas merecen una oportunidad.
                     </p>
                 </div>
             </Reveal>

             <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                 {PARTNERSHIPS.map((partner, i) => (
                     <Reveal key={i} delay={i * 100}>
                         <div 
                             onClick={() => setModalData({ type: 'partnership', data: partner })}
                             className="group bg-white border-4 border-black p-6 h-full hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_black] transition-all cursor-pointer flex flex-col justify-between"
                         >
                             <div>
                                 <div className="mb-4 bg-black text-white p-3 inline-block transform -rotate-2 group-hover:rotate-0 transition-transform">
                                     <partner.icon size={24} />
                                 </div>
                                 <h3 className="font-black text-xl uppercase leading-tight mb-2">{partner.title}</h3>
                                 <p className="font-bold text-sm text-neutral-600 border-t-4 border-black pt-2 mb-4">{partner.short}</p>
                             </div>
                             <div className="bg-[#A855F7] text-white font-black uppercase text-xs p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 Ver Detalles
                             </div>
                         </div>
                     </Reveal>
                 ))}
             </div>

             <Reveal delay={300} className="mt-12 text-center">
                 <button 
                    onClick={() => setIsChatOpen(true)}
                    className="bg-black text-white border-4 border-transparent px-8 py-4 font-black uppercase text-lg shadow-[8px_8px_0px_0px_#A855F7] hover:bg-white hover:text-black hover:border-black hover:shadow-[4px_4px_0px_0px_#A855F7] transition-all"
                 >
                     ¿Presupuesto Limitado? Hablemos.
                 </button>
             </Reveal>
         </div>
      </div>

      {/* Section 6: Projects */}
      <div id="projects" className="bg-white border-b-4 border-black">
         {/* Title Header */}
         <div className="p-8 md:p-16 border-b-4 border-black bg-neutral-900 text-white">
            <Reveal>
               <h2 className="text-4xl md:text-5xl lg:text-8xl font-black uppercase tracking-tight text-center md:text-left">
                  Construcciones<span className="text-[#A855F7]">.</span>
               </h2>
            </Reveal>
         </div>
         
         {/* Projects List */}
         <div>
            {PROJECTS.map((project, i) => (
               <div 
                    key={i} 
                    className="group border-b-4 border-black last:border-b-0 grid lg:grid-cols-12 bg-white hover:bg-neutral-50 transition-colors cursor-pointer"
                    onClick={() => setModalData({ type: 'project', data: project })}
               >
                  <div className="lg:col-span-7 p-6 md:p-8 lg:p-16 flex flex-col justify-center order-2 lg:order-1 border-t-4 lg:border-t-0 border-black lg:border-r-4">
                     <Reveal>
                        <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                           {project.tags.map(tag => (
                              <span key={tag} className="bg-black text-white px-3 py-1 font-bold text-xs md:text-sm uppercase shadow-[3px_3px_0px_0px_#A855F7]">
                                 {tag}
                              </span>
                           ))}
                           <span className="bg-[#FFDE00] text-black border-2 border-black px-3 py-1 font-bold text-xs md:text-sm uppercase">
                              {project.status}
                           </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 md:mb-6 leading-tight group-hover:text-[#A855F7] transition-colors">
                           {project.title}
                        </h3>
                        <p className="text-lg md:text-xl font-bold mb-6 md:mb-8 max-w-2xl">
                           {project.desc}
                        </p>
                        <div className="bg-[#F3F4F6] border-l-8 border-black p-4 md:p-6">
                           <span className="font-black text-xs uppercase text-neutral-500 block mb-2">Lesson Learned:</span>
                           <p className="font-medium italic text-sm md:text-base">"{project.lessons}"</p>
                        </div>
                     </Reveal>
                  </div>
                  <div className="lg:col-span-5 h-[300px] md:h-[400px] lg:h-auto relative overflow-hidden order-1 lg:order-2 border-b-4 lg:border-b-0 border-black lg:border-l-0">
                     <div className="absolute inset-0 bg-[#A855F7] mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10 pointer-events-none"></div>
                     <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-700" 
                     />
                     <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                         <ArrowRight size={48} className="text-white drop-shadow-md" />
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Section 7: Stories / Testimonials */}
      <div id="stories" className="bg-[#A855F7] p-6 md:p-12 lg:p-24 border-b-4 border-black">
         <Reveal>
            <div className="bg-black text-white p-4 inline-block transform -rotate-2 mb-8 md:mb-12 shadow-[6px_6px_0px_0px_white] md:shadow-[8px_8px_0px_0px_white]">
               <h2 className="text-2xl md:text-3xl lg:text-5xl font-black uppercase">Resultados Reales</h2>
            </div>
         </Reveal>

         <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {REAL_STORIES.map((story, i) => (
               <Reveal key={i} delay={i * 150}>
                  <div className="bg-white border-4 border-black h-full shadow-[8px_8px_0px_0px_black] md:shadow-[12px_12px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 md:hover:translate-x-2 md:hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_black] transition-all duration-200 flex flex-col group overflow-hidden">
                     {/* Image Header */}
                     <div className="h-40 md:h-48 border-b-4 border-black overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                        />
                        <div className={`absolute top-4 left-4 z-20 w-10 h-10 md:w-12 md:h-12 ${story.iconColor} border-4 border-black flex items-center justify-center text-white`}>
                           <story.icon size={20} className="md:w-6 md:h-6" />
                        </div>
                     </div>

                     <div className="p-6 md:p-8 flex flex-col flex-1">
                        <h3 className="text-xl md:text-2xl font-black uppercase mb-4 md:mb-6 bg-black text-white inline-block px-2 self-start transform -rotate-1 group-hover:rotate-0 transition-transform">{story.title}</h3>
                        
                        <div className="space-y-4 md:space-y-6 flex-1">
                            <div>
                              <div className="font-black text-[10px] md:text-xs uppercase bg-red-500 text-white inline-block px-2 mb-2 border-2 border-black">Antes</div>
                              <p className="font-bold text-sm leading-snug border-l-4 border-red-500 pl-3">{story.problem}</p>
                            </div>
                            <div>
                              <div className="font-black text-[10px] md:text-xs uppercase bg-green-600 text-white inline-block px-2 mb-2 border-2 border-black">Después</div>
                              <p className="font-bold text-sm leading-snug border-l-4 border-green-600 pl-3">{story.result}</p>
                            </div>
                        </div>
                     </div>
                  </div>
               </Reveal>
            ))}
         </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-white p-8 md:p-16 text-center border-t-4 border-[#A855F7]">
         <Reveal>
           <h2 className="text-3xl md:text-4xl lg:text-7xl font-black uppercase mb-6 md:mb-8 hover:text-[#A855F7] transition-colors cursor-pointer tracking-tight">
              ¿Hablamos?
           </h2>
           <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 font-mono text-[#FFDE00] text-sm md:text-base">
              <span>BOGOTÁ, COLOMBIA</span>
              <span className="hidden md:inline text-white">→</span>
              <span>WORLDWIDE</span>
           </div>
           <p className="mt-8 md:mt-12 text-neutral-600 text-xs md:text-sm font-bold uppercase">CultivoAI © 2024</p>
         </Reveal>
      </div>
    </div>
  );
};

// ==========================================
// DESIGN 2: ROCKET (Playful / 3D)
// ==========================================
const RocketDesign = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalData, setModalData] = useState<{type: 'project' | 'service' | 'partnership', data: any} | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Intro', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'A.I. Benefits', id: 'features' },
    { label: 'Live Demos', id: 'demos' },
    { label: 'Semilla', id: 'semilla' },
    { label: 'Alianzas', id: 'partnerships' },
    { label: 'Solutions', id: 'projects' }, 
    { label: 'Testimonials', id: 'stories' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <div className="min-h-full bg-[#FFC805] text-[#1a1a1a] font-display relative selection:bg-white selection:text-[#FFC805]">
      
      <Modal 
        isOpen={!!modalData} 
        onClose={() => setModalData(null)} 
        theme="rocket"
      >
        {modalData?.type === 'project' && <ProjectModalContent project={modalData.data} theme="rocket" />}
        {modalData?.type === 'service' && <ServiceModalContent service={modalData.data} theme="rocket" />}
        {modalData?.type === 'partnership' && <PartnershipModalContent partnership={modalData.data} theme="rocket" onChat={() => {
            setModalData(null);
            setIsChatOpen(true);
        }} />}
      </Modal>

      <AIChatWidget 
        theme="rocket" 
        onNavigate={scrollTo}
        onOpenModal={(type, data) => setModalData({ type, data })}
        isOpen={isChatOpen}
        onToggle={setIsChatOpen}
      />

      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 lg:px-12 py-4 bg-[#FFC805]/90 backdrop-blur-md border-b border-black/5 shadow-sm transition-all">
         <div className="flex items-center gap-2 relative z-50 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#FFC805] shadow-sm transform -rotate-6">
              <Sprout size={24} fill="currentColor" />
            </div>
            <span className="font-black text-2xl tracking-tight text-white drop-shadow-sm">Cultivo<span className="text-white/80">AI</span></span>
         </div>
         
         {/* Desktop Nav */}
         <div className="hidden lg:flex gap-10 font-bold text-sm text-[#1a1a1a]">
            <button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">Advisers</button>
            <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">About us</button>
         </div>

         <div className="hidden lg:flex items-center gap-6">
            <span className="hidden xl:block font-bold text-white text-sm">(858) 322 87 6512</span>
            <button className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg">
               Contact Sales
            </button>
         </div>

         {/* Mobile Menu Toggle */}
         <button 
            className="lg:hidden relative z-50 p-2 text-[#1a1a1a]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
         >
            {isMobileMenuOpen ? <X size={32} className="text-white" /> : <Menu size={32} className="text-[#1a1a1a]" />}
         </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1a1a1a] z-40 flex flex-col justify-center items-center animate-in fade-in duration-200">
           <div className="flex flex-col gap-6 text-center">
             {navLinks.map((item) => (
               <button 
                 key={item.label}
                 onClick={() => scrollTo(item.id)}
                 className="text-3xl font-black text-white hover:text-[#FFC805] transition-colors"
               >
                 {item.label}
               </button>
             ))}
             <button className="mt-8 bg-[#FFC805] text-[#1a1a1a] px-8 py-3 rounded-full font-bold text-lg">
               Contact Sales
             </button>
           </div>
        </div>
      )}

      {/* Right Sidebar Navigation (Scrolling Menu - Desktop Only) */}
      <div className="hidden xl:flex fixed right-12 top-1/2 -translate-y-1/2 flex-col items-end gap-6 z-50 pointer-events-none">
         <div className="font-black text-xs text-[#1a1a1a] mb-2 uppercase tracking-widest opacity-40 pr-2">Menu</div>
         <div className="pointer-events-auto flex flex-col items-end gap-4">
           {navLinks.map((item) => (
              <button 
                key={item.label} 
                onClick={() => scrollTo(item.id)}
                className={`group flex items-center gap-3 transition-all hover:translate-x-[-10px]`}
              >
                 <span className={`font-bold text-lg transition-colors ${item.label === 'Contact' ? 'text-white/50 text-base mt-4' : 'text-white group-hover:text-[#1a1a1a]'}`}>
                    {item.label}
                 </span>
                 <div className={`w-2 h-2 rounded-full transition-colors ${item.label === 'Contact' ? 'bg-white/50' : 'bg-white group-hover:bg-[#1a1a1a]'}`}></div>
              </button>
           ))}
         </div>
      </div>

      {/* Hero Section */}
      <div id="hero" className="relative min-h-[85vh] flex flex-col justify-center px-6 lg:px-12 max-w-[1920px] mx-auto overflow-hidden">
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/3 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-yellow-300 rounded-full blur-[100px] md:blur-[150px] mix-blend-overlay opacity-50 -z-10"></div>

         <div className="grid lg:grid-cols-12 gap-8 items-center relative">
            
            {/* Scroll Indicator (Left) */}
            <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-end h-96 opacity-50 text-[#1a1a1a]">
               <div className="writing-vertical-lr text-xs font-bold uppercase tracking-widest mb-4 transform -rotate-180">Scroll</div>
               <ArrowRight className="rotate-90 animate-bounce" size={20} />
            </div>

            {/* Main Text Area */}
            <div className="lg:col-span-6 relative z-10 pt-10 lg:pt-0">
               <Reveal>
                 <span className="font-bold text-[#1a1a1a] mb-2 block tracking-tight text-lg pl-1">Let our AI platform</span>
                 <h1 className="text-5xl md:text-7xl xl:text-9xl font-black text-white leading-[0.9] md:leading-[0.85] tracking-tighter mb-6 md:mb-8 drop-shadow-sm">
                    Cultivo<br/>
                    <span className="text-white/95">your business</span>
                 </h1>
                 <p className="text-[#1a1a1a] font-medium text-base md:text-lg max-w-md leading-relaxed opacity-80 pl-2 border-l-2 border-[#1a1a1a]/20">
                    {COPY.hero.subtitle}
                 </p>
               </Reveal>
            </div>

            {/* Visual Centerpiece */}
            <div className="lg:col-span-5 relative h-[400px] lg:h-[700px] flex items-center justify-center mt-8 lg:mt-0">
               {/* 3D Character Placeholder */}
               <div className="relative z-20 w-full h-full flex items-center justify-center animate-[bounce_4s_infinite]">
                  <img 
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" 
                    alt="3D Rocket Character" 
                    className="w-3/4 md:w-full max-w-[500px] object-contain drop-shadow-2xl filter hover:brightness-110 transition-all duration-500 transform rotate-[-10deg]"
                  />
                  {/* Clouds/Smoke effect base */}
                  <div className="absolute bottom-10 left-10 w-24 md:w-32 h-24 md:h-32 bg-white rounded-full blur-xl opacity-60"></div>
                  <div className="absolute bottom-0 right-20 w-32 md:w-48 h-32 md:h-48 bg-white/80 rounded-full blur-2xl opacity-40"></div>
               </div>
               
               {/* Floating Card: How it works */}
               <div className="absolute bottom-10 md:bottom-32 left-0 md:-left-20 bg-[#FFC805] border border-white/40 backdrop-blur-xl p-4 md:p-6 rounded-3xl max-w-[200px] md:max-w-xs shadow-xl z-30 hidden sm:block rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                     <div className="bg-white p-2 rounded-full shadow-sm"><Zap size={16} className="text-[#FFC805] fill-current" /></div>
                     <h3 className="font-bold text-[#1a1a1a] text-xs md:text-sm">How does it work?</h3>
                  </div>
                  <p className="text-[10px] md:text-xs text-[#1a1a1a]/80 font-bold leading-relaxed">
                     From websites and online stores to marketing tools and analytics, CultivoAI is the all in one platform to build a beautiful presence.
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* About Us (Me and Rocky) */}
      <div id="about" className="bg-white rounded-t-[40px] md:rounded-t-[60px] relative z-20 pt-16 md:pt-32 pb-16 md:pb-20 px-6 lg:px-12 -mt-12 md:-mt-20">
         <div className="max-w-[1600px] mx-auto">
             <Reveal>
                 <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                     <div>
                         <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest">About Us</span>
                         <h2 className="text-4xl md:text-6xl font-black mt-6 mb-8 text-[#1a1a1a] tracking-tight">Padre e Hijo.<br/><span className="text-neutral-300">Equipo Real.</span></h2>
                         <p className="text-base md:text-lg text-neutral-500 font-medium leading-relaxed mb-8">
                             Paul aporta la experiencia de décadas en negocios y estrategia. Rocky trae la innovación técnica y la visión de IA. Juntos, cerramos la brecha entre "qué es posible" y "qué es rentable".
                         </p>
                         <button className="flex items-center gap-3 font-bold text-[#1a1a1a] hover:gap-5 transition-all">
                            Conoce nuestra historia completa <ArrowRight size={20} className="text-[#FFC805]" />
                         </button>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-4 mt-8 md:mt-12">
                             <div className="aspect-[3/4] rounded-[30px] md:rounded-[40px] overflow-hidden relative group">
                                 <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" alt="Paul" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform">
                                     <p className="font-bold">Paul</p>
                                     <p className="text-xs text-white/70">Estrategia & Negocios</p>
                                 </div>
                             </div>
                         </div>
                         <div className="space-y-4">
                             <div className="aspect-[3/4] rounded-[30px] md:rounded-[40px] overflow-hidden relative group">
                                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" alt="Rocky" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform">
                                     <p className="font-bold">Rocky</p>
                                     <p className="text-xs text-white/70">Tech & AI Lead</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </Reveal>
         </div>
      </div>

      {/* Services Section (Features) */}
      <div id="features" className="bg-[#F8F8F8] py-20 md:py-32 px-6 lg:px-12">
         <div className="max-w-[1800px] mx-auto">
            <Reveal>
              <div className="text-center mb-16 md:mb-24 relative">
                 <span className="bg-white px-6 py-2 text-neutral-400 font-bold text-sm uppercase tracking-widest border border-neutral-100 rounded-full shadow-sm">A.I. Benefits</span>
                 <h2 className="text-4xl md:text-7xl font-black mt-8 md:mt-12 text-[#1a1a1a] tracking-tight">Potencia Real.</h2>
              </div>
            </Reveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {SERVICES.map((s, i) => (
                  <Reveal key={i} delay={i * 100}>
                    <div 
                        className="bg-white rounded-[40px] overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-300 group h-full border border-transparent hover:border-neutral-100 hover:-translate-y-2 flex flex-col cursor-pointer"
                        onClick={() => setModalData({ type: 'service', data: s })}
                    >
                       {/* Image Header */}
                       <div className="h-40 md:h-48 overflow-hidden relative">
                          <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                          <img src={s.image} alt={s.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 backdrop-blur rounded-2xl flex items-center justify-center shadow-lg z-20">
                             <s.icon size={24} className="text-[#FFC805] group-hover:scale-110 transition-transform" />
                          </div>
                       </div>
                       
                       <div className="p-6 md:p-8 pt-6 flex-1 flex flex-col">
                          <h3 className="text-xl md:text-2xl font-bold mb-3 text-neutral-800">{s.title}</h3>
                          <p className="text-neutral-500 font-medium leading-relaxed flex-1 text-sm md:text-base">{s.desc}</p>
                          <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center gap-2 text-sm font-bold text-neutral-400 group-hover:text-[#FFC805] transition-colors">
                             Ver más <ArrowRight size={16} />
                          </div>
                       </div>
                    </div>
                  </Reveal>
               ))}
            </div>
         </div>
      </div>

      {/* NEW SECTION: AI Demos */}
      <AIUseCases theme="rocket" />

      {/* Semilla Section (Rocket) */}
      <div id="semilla" className="bg-white py-20 md:py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-100/50 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-[1800px] mx-auto">
            <Reveal>
                <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest mb-6">Rocky's Initiative</span>
                    <h2 className="text-4xl md:text-7xl font-black text-[#1a1a1a] tracking-tight">Fondo Semilla</h2>
                </div>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-5 space-y-8">
                    <Reveal>
                        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-neutral-100">
                             <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                 <span className="bg-yellow-100 p-2 rounded-full text-yellow-600">👋</span>
                                 {SEMILLA_CONTENT.about.title}
                             </h3>
                             <div className="space-y-4 text-neutral-600 font-medium">
                                 {SEMILLA_CONTENT.about.text.slice(0,3).map((p,i) => <p key={i}>{p}</p>)}
                             </div>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                         <div className="bg-[#FFC805]/10 p-8 rounded-[40px] border border-[#FFC805]/20">
                             <h3 className="text-xl font-bold mb-3 text-neutral-800">{SEMILLA_CONTENT.goal.title}</h3>
                             <p className="text-neutral-600 font-medium leading-relaxed">
                                {SEMILLA_CONTENT.goal.text}
                             </p>
                         </div>
                    </Reveal>
                </div>
                
                <div className="lg:col-span-7 space-y-8">
                    <Reveal delay={150}>
                        <div className="bg-neutral-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
                             <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-4">{SEMILLA_CONTENT.fund.title}</h3>
                                <p className="text-lg opacity-80 mb-8 leading-relaxed max-w-2xl">{SEMILLA_CONTENT.fund.description}</p>
                                
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {SEMILLA_CONTENT.fund.howItWorks.slice(0,4).map((step, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-green-500 text-black font-bold flex items-center justify-center shrink-0">{i+1}</div>
                                            <p className="font-medium text-sm pt-1">{step}</p>
                                        </div>
                                    ))}
                                </div>
                             </div>
                             <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
                        </div>
                    </Reveal>

                    <Reveal delay={200}>
                         <h3 className="text-2xl font-bold mb-6 ml-4">Niveles de Apoyo</h3>
                         <div className="grid sm:grid-cols-2 gap-4">
                             {SEMILLA_CONTENT.tiers.map((tier, i) => (
                                 <div key={i} className="bg-white p-6 rounded-[30px] shadow-sm border border-neutral-100 hover:shadow-lg hover:border-green-200 transition-all cursor-default">
                                     <div className="flex justify-between items-start mb-2">
                                         <h4 className="font-black text-lg">{tier.name}</h4>
                                         <span className="bg-[#1a1a1a] text-white px-2 py-1 rounded-lg text-xs font-bold">{tier.price}</span>
                                     </div>
                                     <p className="text-sm text-neutral-500 font-medium leading-snug">{tier.benefit}</p>
                                 </div>
                             ))}
                         </div>
                    </Reveal>
                </div>
            </div>
        </div>
      </div>

      {/* NEW SECTION: Flexible Partnerships (Rocket) */}
      <div id="partnerships" className="bg-[#F3F4F6] py-20 md:py-32 px-6 lg:px-12 relative overflow-hidden">
          {/* Abstract blobs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          <div className="max-w-[1800px] mx-auto relative z-10">
              <Reveal>
                  <div className="text-center mb-16">
                      <span className="bg-white text-neutral-500 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest shadow-sm">Formas de Trabajo</span>
                      <h2 className="text-4xl md:text-7xl font-black text-[#1a1a1a] mt-6 mb-6 tracking-tight">Alianzas Flexibles.</h2>
                      <p className="text-lg md:text-xl text-neutral-500 font-medium max-w-2xl mx-auto leading-relaxed">
                          Entendemos que no todos los proyectos valiosos vienen con presupuestos corporativos. Creemos que las buenas ideas merecen una oportunidad.
                      </p>
                  </div>
              </Reveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {PARTNERSHIPS.map((partner, i) => (
                      <Reveal key={i} delay={i * 100}>
                          <div 
                              onClick={() => setModalData({ type: 'partnership', data: partner })}
                              className="bg-white rounded-[32px] p-8 h-full shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer border border-neutral-100 flex flex-col items-center text-center group"
                          >
                              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${partner.color}`}>
                                  <partner.icon size={32} />
                              </div>
                              <h3 className="font-bold text-xl mb-2 text-neutral-800">{partner.title}</h3>
                              <p className="text-sm font-medium text-neutral-500 leading-relaxed mb-4">{partner.short}</p>
                              <div className="mt-auto pt-4 border-t border-neutral-100 w-full text-xs font-bold text-neutral-400 uppercase tracking-wide group-hover:text-[#FFC805] transition-colors">
                                  Ver Más
                              </div>
                          </div>
                      </Reveal>
                  ))}
              </div>
              
              <Reveal delay={300} className="mt-16 text-center">
                  <button 
                      onClick={() => setIsChatOpen(true)}
                      className="bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto"
                  >
                      <MessageSquare size={20} className="text-[#FFC805]" />
                      ¿Tienes una idea? Hablemos.
                  </button>
              </Reveal>
          </div>
      </div>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-12 px-6 border-t border-neutral-100">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
               <h2 className="text-4xl md:text-8xl font-black text-[#1a1a1a] tracking-tight hover:text-[#FFC805] transition-colors cursor-pointer mb-8">
                  Let's Talk.
               </h2>
               <div className="flex gap-8 mb-12">
                   <button className="bg-[#1a1a1a] text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform"><Github size={20} /></button>
                   <button className="bg-[#1a1a1a] text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform"><Linkedin size={20} /></button>
                   <button className="bg-[#1a1a1a] text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform"><Mail size={20} /></button>
               </div>
               <p className="text-neutral-400 font-bold text-sm">© 2024 CULTIVO AI. BOGOTÁ, COLOMBIA.</p>
          </div>
      </footer>
    </div>
  );
};

export default function App() {
  return <DesignViewer />;
}
