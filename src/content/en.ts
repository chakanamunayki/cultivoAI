import type { SiteContent } from "./types";

export const en: SiteContent = {
  nav: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Demos", href: "#demos" },
    { label: "Semilla", href: "#semilla" },
    { label: "Partners", href: "#partnerships" },
    { label: "Projects", href: "#projects" },
    { label: "Stories", href: "#stories" },
    { label: "Process", href: "#what-happens-next" },
  ],

  marquee:
    "Paul & Rocky 🇬🇧🇨🇴  •  Chatbots $100  •  Automation  •  AI Marketing  •  Dashboards  •  Web+AI  •  Medellín→World  •  Win-Win Always  •  Direct Deal  •  Impact Projects  •  24hr Reply  •  ",

  hero: {
    tagline: "FOR THE ONES CHANGING THINGS",
    line1: "AI INTEGRATION.",
    services: [
      "Workflow Automation",
      "AI Assistants & Chatbots",
      "Business Intelligence",
      "Content Systems",
      "Website Development + AI",
      "Startup Advisory"
    ],
    servicesDone: "Done.",
    audience: ["Farmers.", "Self sustainability.", "Innovation.", "Holistic Healers.", "Educators.", "Sustainable Builders."],
    line3: "Impact rates. Human approach. Father & son.",
    cta: "Let's talk",
    secondaryCta: "Read our story",
    noDrama: "NO DRAMA.",
    noDramaText:
      "We help purpose-driven businesses use AI without getting lost in the complexity.",
    impactSection: {
      text: "Purpose over profit. Always.",
      cta: "Let's talk",
    },
  },

  about: {
    title: "Who We Are",
    subtitle: "A family building something meaningful from Colombia",
    viewMoreLabel: "View more",
    footerNote:
      "For larger impact projects, we have technical experts who support us when needed.",
    teamMembers: [
      {
        id: "paul",
        name: "Paul Ronayne",
        title: "STRATEGY & BUSINESS",
        subtitle: "Co-founder nbn23 · nagi | Founder Raiz",
        description:
          "With over 20 years of experience in technology and business, Paul has worked in startups, corporations, and impact projects. Now he focuses his experience on helping purpose-driven businesses leverage AI in practical, accessible ways.",
        imageUrl:
          "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800",
        accentColor: "bg-[#A855F7]",
        shadowColor: "bg-black",
        linkedinUrl: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        bio: {
          headline: "20+ years building technology with purpose",
          sections: [
            {
              title: "Background",
              content:
                "Co-founder of nbn23 (basketball stats for the NBA) and nagi (AI voice assistant). Founder of Raiz Capital, an impact investment platform for regenerative agriculture. Has worked with startups, corporations, and social projects across multiple countries.",
            },
            {
              title: "Current Focus",
              content:
                "Helping purpose-driven businesses integrate AI in practical ways, without the complexity or inflated costs of traditional agencies. Teaching Rocky to build while building alongside him.",
            },
            {
              title: "Philosophy",
              content:
                "Believes technology should serve people, not the other way around. Prefers long-term relationships over quick transactions. If a project isn't win-win, he'd rather not do it.",
            },
          ],
          linkedinUrl: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        },
      },
      {
        id: "rocky",
        name: "Rocky Ronayne",
        title: "TECH & AI",
        badge: "14 years old",
        description:
          "Footballer, innovator. Rocky is learning to build AI solutions while balancing school and soccer. He leads the Semilla Fund, building small projects for clients who are just starting out.",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
        accentColor: "bg-[#FFDE00]",
        shadowColor: "bg-[#FFDE00]",
        bio: {
          headline: "Learning to build while building",
          sections: [
            {
              title: "Who I Am",
              content:
                "I'm 14 years old. I turn 15 in January. I still don't know exactly what I want to do with my life, and I think that's okay. I like football, video games, and I'm learning to build things with AI.",
            },
            {
              title: "Project19",
              content:
                "My personal project: an AI coach that helps me organize my day. It sends me a message in the morning asking about my plans, and at night asks how it went. Everything saves to Notion automatically. Cost: ~$0.30/month.",
            },
            {
              title: "Semilla Fund",
              content:
                "My initiative to help small projects while I learn. Basic chatbots, simple automations, Notion organization. Accessible prices because I'm also learning.",
            },
          ],
          videoUrl: "https://www.youtube.com/watch?v=example",
          videoLabel: "Watch Samsung project",
        },
      },
      {
        id: "marta",
        name: "Marta Ronayne",
        title: "THE ANCHOR",
        subtitle: "Holistic Therapist | Munayki",
        description:
          "Holistic therapist and the family's center of gravity. Marta brings balance and human perspective to everything we do. Her practice Munayki is where Rocky applies what he learns in a real context.",
        imageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
        accentColor: "bg-[#10B981]",
        shadowColor: "bg-[#10B981]",
        linkedinUrl: "https://www.linkedin.com/in/marta-ronayne/",
        bio: {
          headline: "Balance and human perspective",
          sections: [
            {
              title: "Munayki",
              content:
                "Holistic wellness practice focused on emotional healing and personal growth. Marta works with clients individually and in group workshops, integrating multiple therapeutic modalities.",
            },
            {
              title: "The Anchor",
              content:
                "While Paul and Rocky build technology, Marta keeps everyone grounded. She's the voice that asks 'but does this actually help people?' before launching any project.",
            },
            {
              title: "Connection to CultivoAI",
              content:
                "Munayki is where Rocky practices what he learns. The scheduling chatbot, follow-up automations, everything gets tested there first. It's our real-impact laboratory.",
            },
          ],
          linkedinUrl: "https://www.linkedin.com/in/marta-ronayne/",
        },
      },
    ],
  },

  howWeWork: {
    title: "How We Work",
    subtitle: "Principles that guide every project",
    pillars: [
      {
        icon: "RefreshCw",
        title: "Win-Win or No Deal",
        description:
          "We only take on projects where both sides win. If we can't add real value, we'll tell you. If a project isn't sustainable for both of us, we'd rather not do it. Transparency is more important than any contract.",
      },
      {
        icon: "Sprout",
        title: "Holistic Business",
        description:
          "We don't just build for clients. We share what we learn. We support impact projects with reduced rates. And we measure our success not just in money, but in the real value we create.",
      },
      {
        icon: "Users",
        title: "Rocky Learns in Every Step",
        description:
          "This isn't just a business. It's an educational project. Rocky participates in every project in some way - sometimes leading, sometimes learning. When you work with us, you're contributing to his real-world education.",
        isFullWidth: true,
      },
    ],
  },

  whatWeDo: {
    title: "How We Help",
    subtitle: "Practical AI integration for real businesses",
    intro:
      "We don't sell hype. We don't promise that AI will solve all your problems. What we do is integrate AI tools practically into your existing operations. We automate what makes sense to automate. We enhance what already works.",
    columns: [
      {
        title: "OPTIMIZE",
        items: [
          "Automate repetitive tasks",
          "Connect tools that don't talk to each other",
          "Centralize scattered data",
          "Reduce friction in processes",
        ],
      },
      {
        title: "EXPAND",
        items: [
          "24/7 customer service",
          "Scalable content",
          "Real-time business intelligence",
          "New communication channels",
        ],
      },
    ],
    servicesPreview: {
      title: "Our services include:",
      linkText: "View all services",
    },
  },

  whyUs: {
    notTitle: "What we're NOT",
    notItems: [
      "An agency that sells you then hands you to a junior.",
      "Consultants who bill by the hour while 'researching'.",
      "Salespeople pushing solutions you don't need.",
      "Experts who make you feel ignorant.",
    ],
    yesTitle: "What we ARE",
    yesItems: [
      "A dad teaching his son to build real things.",
      "People who've failed at projects, learned, and keep trying.",
      "Integrators - we connect tools, we don't reinvent the wheel.",
      "Colombians working for the world from here.",
    ],
  },

  servicesTitle: "Our Services",
  servicesSubtitle:
    "Not sure what you need? Schedule a 15-minute call. We'll help you identify where AI can make a difference in your business.",
  services: [
    {
      icon: "Zap",
      title: "Workflow Automation",
      eng: "Workflow Automation",
      description: "Eliminate repetitive tasks by connecting your favorite apps.",
      details: [
        "We connect tools like Notion, Slack, Gmail, Airtable, and WhatsApp.",
        "We design flows that work while you sleep.",
        "From automatic invoicing to client onboarding without human intervention.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
      pricing: "From $100 USD",
    },
    {
      icon: "MessageSquare",
      title: "AI Assistants & Chatbots",
      eng: "AI Assistants & Chatbots",
      description: "24/7 customer service with human personality.",
      details: [
        "LLM-based agents trained specifically with your business information.",
        "They can schedule appointments, answer technical questions, quote services.",
        "They escalate complex cases to humans when necessary.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=600",
      pricing: "From $100 USD",
    },
    {
      icon: "BarChart3",
      title: "Business Intelligence",
      eng: "Business Intelligence",
      description: "Dashboards that turn data into decisions.",
      details: [
        "We centralize your scattered data (Excel, SQL, CRMs) into clear visual dashboards.",
        "We implement key metrics (KPIs) for real-time business health.",
        "No waiting for end-of-month reports.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
      pricing: "From $200 USD",
    },
    {
      icon: "Layers",
      title: "Content Systems",
      eng: "Content Systems",
      description: "Creation engines to scale your presence.",
      details: [
        "AI-assisted content pipelines.",
        "From trend-based topic ideation to draft generation.",
        "Blog, social media, and newsletters maintaining your brand voice.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
      pricing: "From $150 USD",
    },
    {
      icon: "Monitor",
      title: "Website Development + AI",
      eng: "Website Development + AI",
      description: "Living websites that learn and adapt.",
      details: [
        "Modern, fast websites optimized for conversion.",
        "Semantic search and real-time content personalization.",
        "Native chatbots to maximize user retention.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600",
      pricing: "From $300 USD",
    },
    {
      icon: "Rocket",
      title: "Startup Advisory",
      eng: "Startup Advisory",
      description: "From idea to MVP using No-Code + AI tools.",
      details: [
        "Technical and market validation guidance.",
        "We help you choose the right tech stack.",
        "Scalable processes from day one.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600",
      pricing: "From $50 USD/hour",
    },
  ],

  demosTitle: "AI in Action",
  demosSubtitle: "See how AI can transform different areas of your business",
  useCases: [
    {
      id: "chat",
      title: "Smart Chatbot",
      description: "Automatic 24/7 customer service. Responds, qualifies, and schedules.",
      scenario: "A customer asks about chatbot pricing",
      steps: [
        { action: "Customer: Hi, what do your chatbots cost?", result: "" },
        { action: "AI: Analyzing context...", result: "" },
        {
          action: "",
          result:
            "Bot: Hi! Our custom chatbots start from $150 USD. Would you like to see a demo?",
        },
        { action: "Customer: Yes, please.", result: "" },
        { action: "", result: "Sending interactive demo..." },
      ],
    },
    {
      id: "lead",
      title: "Lead Filtering",
      description: "Automatically qualify prospects before you talk to them.",
      scenario: "New lead arrives from LinkedIn",
      steps: [
        { action: "New Lead: Juan Perez (LinkedIn)", result: "" },
        { action: "AI: Enriching profile...", result: "" },
        { action: "", result: "{ Role: CEO, Size: 50-100, Loc: Bog }" },
        { action: "", result: "Score: 92/100. High probability." },
        { action: "", result: "Moved to 'High Priority' column" },
      ],
    },
    {
      id: "web",
      title: "Web Builder",
      description: "Generate web structures and optimized copy in seconds.",
      scenario: "Generating landing page for coffee shop",
      steps: [
        { action: "User: Landing for modern coffee shop", result: "" },
        { action: "AI: Generating React components...", result: "" },
        { action: "", result: '<Hero title="Origin Coffee" />' },
        { action: "", result: '<Features list={["Medium Roast", "Organic"]} />' },
        { action: "", result: "Site deployed to Vercel" },
      ],
    },
    {
      id: "dash",
      title: "Business Dashboard",
      description: "Turn raw data into real-time decision charts.",
      scenario: "Syncing Stripe and Shopify",
      steps: [
        { action: "Sync Stripe & Shopify", result: "" },
        { action: "AI: Detecting anomalies...", result: "" },
        { action: "", result: "Sales Today: $2,450 (+15%)" },
        { action: "", result: "Updating revenue widget" },
        { action: "", result: "Insight: Product B is trending." },
      ],
    },
    {
      id: "social",
      title: "Social Media Flow",
      description: "Multiply your content. From one idea to all networks.",
      scenario: "Creating content about AI in SMBs",
      steps: [
        { action: "User: Post about 'AI in SMBs'", result: "" },
        { action: "AI: Adapting to formats...", result: "" },
        { action: "", result: "Instagram: 5-slide carousel" },
        { action: "", result: "Twitter: 3-tweet thread" },
        { action: "", result: "LinkedIn: Professional article" },
      ],
    },
    {
      id: "project19",
      title: "Project19 Coach",
      description: "Personal AI coach via WhatsApp. Morning briefing and evening check-in.",
      scenario: "A day with Rocky's coach",
      steps: [
        { action: "7:00 AM - Good morning Rocky!", result: "" },
        { action: "", result: "What do you have planned for today? School, soccer, anything else?" },
        { action: "Rocky: School until 3, then soccer practice", result: "" },
        { action: "", result: "Saved to Notion. I'll text you at 8pm!" },
        { action: "8:00 PM - How was your day?", result: "" },
        { action: "Rocky: [Voice note 30s]", result: "" },
        { action: "", result: "Transcribed and saved. Good day! Get some rest." },
      ],
    },
  ],

  whoWeHelp: {
    title: "Are we the right fit?",
    idealTitle: "We're ideal for you if...",
    idealItems: [
      "You have a business with purpose beyond just making money",
      "You value relationships over transactions",
      "You prefer working with real people, not an impersonal agency",
      "You understand that good work takes time",
      "You're building something you're proud of",
      "You believe AI can help but don't know where to start",
      "You appreciate honesty, even when uncomfortable",
      "You're willing to learn alongside us",
    ],
    notIdealTitle: "We're probably not the fit if...",
    notIdealItems: [
      "You're just looking for 'cheap and fast'",
      "Your business model is purely extractive",
      "You treat service providers as disposable",
      "You don't have time for a conversation before starting",
      "You expect AI to solve everything magically without your input",
      "You need a large agency with rotating teams",
    ],
    sectorsTitle: "Sectors we love",
    sectors: [
      {
        name: "Agritech",
        description: "Hydroponics, aquaponics, regenerative agriculture",
        icon: "Sprout",
        badge: "Discounts available",
        chatButtonLabel: "Let's talk",
        detailsButtonLabel: "Learn more",
        whoWeHelp: [
          "Urban farms and vertical agriculture operations",
          "Regenerative and organic farming collectives",
          "Agricultural cooperatives and family farms",
          "AgTech startups developing sustainable solutions",
        ],
        howWeHelp: [
          "AI-powered crop monitoring and yield prediction",
          "Automated irrigation and nutrient management systems",
          "Supply chain optimization and market access tools",
          "Customer engagement and direct-to-consumer platforms",
        ],
        exampleProjects: [
          "WhatsApp bot for farm-to-table ordering",
          "IoT dashboard for greenhouse monitoring",
          "Predictive analytics for harvest planning",
        ],
      },
      {
        name: "Holistic wellness",
        description: "Mental and physical health outside traditional models",
        icon: "Heart",
        badge: "Discounts available",
        chatButtonLabel: "Let's talk",
        detailsButtonLabel: "Learn more",
        whoWeHelp: [
          "Independent therapists and counselors",
          "Yoga studios and meditation centers",
          "Functional medicine practitioners",
          "Wellness retreat centers",
        ],
        howWeHelp: [
          "Appointment scheduling and client management",
          "Personalized wellness journey tracking",
          "AI-assisted intake and assessment tools",
          "Community building and course platforms",
        ],
        exampleProjects: [
          "Meditation reminder and progress chatbot",
          "Client intake automation with personalized follow-ups",
          "Wellness community platform with AI coaching",
        ],
      },
      {
        name: "Alternative education",
        description: "Personalized learning, family-led development",
        icon: "GraduationCap",
        badge: "Discounts available",
        chatButtonLabel: "Let's talk",
        detailsButtonLabel: "Learn more",
        whoWeHelp: [
          "Homeschooling families and co-ops",
          "Microschools and learning pods",
          "Educational content creators",
          "Alternative learning platforms",
        ],
        howWeHelp: [
          "Personalized curriculum generation and tracking",
          "AI tutoring assistants for self-paced learning",
          "Progress monitoring dashboards for parents",
          "Community coordination and resource sharing tools",
        ],
        exampleProjects: [
          "AI study buddy for homeschool students",
          "Curriculum planning automation",
          "Parent community platform with resource sharing",
        ],
      },
      {
        name: "Self-sufficiency",
        description: "Homesteading, sustainable living, local resilience",
        icon: "Home",
        badge: "Discounts available",
        chatButtonLabel: "Let's talk",
        detailsButtonLabel: "Learn more",
        whoWeHelp: [
          "Homesteaders and permaculture practitioners",
          "Off-grid and sustainable living communities",
          "Local food networks and buying clubs",
          "Maker spaces and skill-sharing groups",
        ],
        howWeHelp: [
          "Knowledge management and skill-sharing platforms",
          "Resource tracking and inventory management",
          "Community coordination and barter systems",
          "Seasonal planning and activity reminders",
        ],
        exampleProjects: [
          "Homestead task manager with seasonal reminders",
          "Local exchange and barter platform",
          "Skill-sharing community directory",
        ],
      },
      {
        name: "Mission-driven startups",
        description: "Any early-stage team doing meaningful work",
        icon: "Rocket",
        badge: "Discounts available",
        chatButtonLabel: "Let's talk",
        detailsButtonLabel: "Learn more",
        whoWeHelp: [
          "Social enterprises and B-corps",
          "Impact-focused tech startups",
          "Non-profits with innovative programs",
          "Community organizations scaling their impact",
        ],
        howWeHelp: [
          "MVP development and rapid prototyping",
          "Automation to do more with less",
          "AI-powered customer support and engagement",
          "Data insights and impact measurement",
        ],
        exampleProjects: [
          "Donor engagement automation",
          "Impact reporting dashboard",
          "Community matching and coordination platform",
        ],
      },
    ],
    cta: "Sound like you? We'd love to hear more about what you're building.",
    ctaButton: "Tell us about your project",
  },

  semilla: {
    title: "Semilla Fund",
    subtitle: "Rocky's Journey",
    about:
      "I'm 14 years old. I turn 15 in January. I still don't know exactly what I want to do with my life, and I think that's okay. But I do know some things: I like to build. My dad is teaching me to make things with AI - chatbots, automations, stuff like that. Sometimes he teaches me. Sometimes I teach him.",
    tiers: [
      { name: "Seed ($10-50)", description: "Progress updates, name on supporters page" },
      { name: "Sprout ($50-200)", description: "Early access to tools, input on features" },
      { name: "Grow ($200-500)", description: "Free lifetime access to what Rocky builds" },
      { name: "Partner ($500+)", description: "Custom adaptation, direct involvement" },
    ],
    services: [
      "Basic chatbots for WhatsApp or web",
      "Simple automations (connect apps, send notifications)",
      "Help with Notion and organization",
      "Chatbot development workshops",
    ],
    goal: "By the time I'm 19, I want to have options. Maybe play semi-professional soccer. Maybe have my own business. Maybe both. The point is being able to choose.",
    ctaTitle: "Propose a Project",
    ctaDescription: "Have something small you need? Tell me about it.",
    ctaButton: "Propose Project",
  },

  partnershipsTitle: "Flexible Ways to Work Together",
  partnershipsSubtitle:
    "We understand that not all valuable projects come with corporate budgets. We've designed different ways to work together.",
  partnerships: [
    {
      name: "Standard Project",
      tagline: "Businesses with budget",
      description:
        "Clear scope and defined deliverables. Fixed price agreed before starting. Established timeline. Post-delivery support included.",
      idealFor: ["Companies that know what they need", "Resources to invest"],
      icon: "Briefcase",
    },
    {
      name: "Reduced Rate",
      tagline: "Startups & Impact",
      description:
        "Same quality level. Significantly reduced price. Flexible conditions. In exchange: testimonial, case study, or referrals.",
      idealFor: ["Pre-revenue startups", "Projects with social mission"],
      icon: "HeartHandshake",
    },
    {
      name: "Deferred Payment",
      tagline: "Pay when you take off",
      description:
        "Reduced initial price (or zero). Rest of payment tied to milestones or revenue. We share the risk with you. Only for projects we believe in.",
      idealFor: ["Founders with great ideas", "No current runway"],
      icon: "Hourglass",
    },
    {
      name: "Revenue Share",
      tagline: "Partners in growth",
      description:
        "Build at reduced or zero cost. Small percentage of future revenue. We align long-term incentives. We become partners, not vendors.",
      idealFor: ["Recurring products", "Services where we can grow together"],
      icon: "TrendingUp",
    },
    {
      name: "Equity",
      tagline: "High potential",
      description:
        "Significant work in exchange for ownership. Only high-conviction projects. We get involved long-term. We bring network, experience, and resources.",
      idealFor: ["Startups with exceptional potential", "Mission aligned with our values"],
      icon: "PieChart",
    },
  ],

  projectsTitle: "What We've Built",
  projectsSubtitle: "Real projects with real lessons",
  projects: [
    {
      title: "Chak Control Center",
      desc: "Comprehensive business management system for small and medium businesses. Dashboard, inventory, finances, CRM, and reports in one platform.",
      fullDesc:
        "A complete solution for SMBs that centralizes business operations. Allows owners to visualize cash flow, inventory status, and sales performance by channel in real-time. Includes automation modules for low stock alerts and automatic weekly reports via email.",
      lessons: "Scope creep is real, the difference between what clients say they want and what they actually use.",
      status: "In active development",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      tags: ["Dashboard", "SaaS"],
    },
    {
      title: "Raiz Capital",
      desc: "Impact fintech platform to connect investors with regenerative agriculture projects. Investment model with total transparency.",
      fullDesc:
        "An equity crowdfunding platform focused on Colombian agriculture. We use AI to analyze crop risk based on historical climate and market data, offering investors a clearer projection and farmers access to fair capital.",
      lessons: "Validate market before building, financial structures for impact, market timing is crucial.",
      status: "Project on pause",
      image:
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
      tags: ["Fintech", "Impact"],
    },
    {
      title: "Munayki",
      desc: "AI integration for holistic wellness practice. Chatbot, scheduling, and client follow-up.",
      fullDesc:
        "An empathetic virtual assistant designed for therapists and wellness centers. Munayki not only schedules appointments but performs basic pre-triage to understand the client's mood and prepare the therapist before the session, always respecting data privacy.",
      lessons: "Rocky leads this project",
      status: "In development",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
      tags: ["Wellness", "AI Chatbot"],
    },
    {
      title: "Rocky's AI Mentor",
      desc: "AI-powered personalized mentoring app to guide development and technology learning.",
      fullDesc:
        "A personalized programming tutor that adapts its teaching style to the student's age and level. Unlike generic ChatGPT, this mentor maintains context from past lessons, proposes exercises based on the student's interests (e.g., football, video games) and celebrates achievements.",
      lessons: "Rocky's personal project",
      status: "Closed beta",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      tags: ["EdTech", "LLMs"],
    },
    {
      title: "cultivoai.co",
      desc: "This very site. Next.js, integrated AI chatbot, bilingual system, automated lead capture.",
      fullDesc:
        "Our digital business card. Built with modern technologies to be extremely fast and accessible. Integrates a lead capture system that automatically qualifies prospects and notifies our team only when there's a real collaboration opportunity.",
      lessons: "Open source",
      status: "Live",
      image:
        "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
      tags: ["Open Source", "Next.js"],
    },
  ],

  storiesTitle: "Real Examples",
  storiesSubtitle: "How we've helped businesses like yours",
  stories: [
    {
      company: "Online Store",
      industry: "E-commerce",
      before:
        "Spent 3 hours daily copying orders from WhatsApp to Excel, manually updating inventory, and sending confirmations.",
      after:
        "The process that took 3 hours now takes 0. Orders and inventory update automatically.",
      quote: "Now I use those 3 hours to find new products.",
      author: "Store Owner",
      imageUrl:
        "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=800&auto=format&fit=crop",
      metric: "21 hours/week recovered",
    },
    {
      company: "Therapy Center",
      industry: "Health",
      before:
        "Lost consultations because couldn't respond to WhatsApp while in session. Clients looked elsewhere.",
      after:
        "40% more consultations booked. The therapist responds to messages calmly at the end of the day.",
      quote: "The chatbot schedules appointments while I see patients.",
      author: "Therapist",
      imageUrl:
        "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=800&auto=format&fit=crop",
      metric: "+40% consultations booked",
    },
    {
      company: "Multi-channel Business",
      industry: "Retail",
      before:
        "Sales in 3 different channels and never really knew how much was being made until end of month.",
      after:
        "For the first time, sees the business status daily. Discovered products that were losing money.",
      quote: "I discovered a product I thought was profitable was losing money on shipping.",
      author: "Business Owner",
      imageUrl:
        "https://images.unsplash.com/photo-1543286386-713df548e9cc?q=80&w=800&auto=format&fit=crop",
      metric: "Real-time visibility",
    },
  ],

  values: {
    title: "Our Values",
    subtitle: "What defines us",
    values: [
      {
        icon: "Sprout",
        title: "CULTIVATE, NOT EXTRACT",
        description:
          "We build for the long term. We prefer relationships that grow over quick transactions.",
      },
      {
        icon: "Handshake",
        title: "WIN-WIN OR NO DEAL",
        description:
          "We only take on projects where both sides win. If we can't add real value, we say so.",
      },
      {
        icon: "User",
        title: "ALWAYS HUMAN",
        description:
          "AI is a tool, not a replacement. We prioritize human connection in everything we do.",
      },
      {
        icon: "Hammer",
        title: "LEARN BY DOING",
        description:
          "We don't wait to know everything. We build, we learn, we improve. Every project is a lesson.",
      },
      {
        icon: "Scale",
        title: "INTEGRATE, NOT FRAGMENT",
        description:
          "We connect what you already have. We don't reinvent the wheel or create unnecessary dependencies.",
      },
      {
        icon: "Mountain",
        title: "BUILD FOR THE LONG TERM",
        description:
          "We think in 5 years, not 5 months. Today's decisions must make sense tomorrow.",
      },
    ],
  },

  mission: {
    title: "Our Mission",
    statement: [
      "We're not just building a business.",
      "We're documenting how a father teaches his son to build from scratch.",
      "We share what works. We help impact projects integrate AI.",
      "We create value in every step.",
      "And we hope to inspire other families and young people to do the same.",
    ],
    tagline: "Win-win. Always.",
  },

  whatHappensNext: {
    title: "What happens after you contact us?",
    subtitle: "That simple. No surprises.",
    steps: [
      {
        number: "1",
        title: "We respond within 24 hours",
        description:
          "Usually much faster. We're two people, not a support team with tickets.",
      },
      {
        number: "2",
        title: "Initial conversation - 15 to 30 minutes",
        description:
          "Video call or WhatsApp, whatever you prefer. We want to understand your real situation, not sell you something.",
      },
      {
        number: "3",
        title: "We honestly tell you if we can help",
        description:
          "If we're not the right fit, we'll tell you. If we know someone better for your case, we'll refer you.",
      },
      {
        number: "4",
        title: "Clear proposal",
        description:
          "If we move forward, you receive a document with: exactly what we'll do, how much it costs and why, how long it will take, and what we need from you.",
      },
      {
        number: "5",
        title: "You decide",
        description:
          "No pressure. No 'this price only valid today' tactics. Take the time you need.",
      },
    ],
    cta: "Let's start the conversation",
    ctaButton: "Let's Talk",
  },

  footer: {
    cta: "Your project could be next. What can we build together?",
    ctaButton: "Let's Talk",
    copyright: "2025 Cultivo AI. Made with love by Paul and Rocky from Colombia.",
    socialLinks: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/paul-ronayne-69b37010a/",
        label: "LinkedIn",
      },
      {
        platform: "whatsapp",
        url: "https://wa.me/573106172706",
        label: "WhatsApp",
      },
      {
        platform: "instagram",
        url: "#",
        label: "Instagram",
        comingSoon: true,
      },
      {
        platform: "facebook",
        url: "#",
        label: "Facebook",
        comingSoon: true,
      },
    ],
    contactInfo: {
      email: "hola@cultivoai.co",
      whatsapp: "+573106172706",
      whatsappDisplay: "+57 310 617 2706",
      location: "Medellin, Colombia",
      locationSecondary: "Worldwide",
    },
    quickLinks: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Demos", href: "#demos" },
      { label: "Semilla", href: "#semilla" },
      { label: "Partners", href: "#partnerships" },
      { label: "Projects", href: "#projects" },
      { label: "Stories", href: "#stories" },
      { label: "Process", href: "#what-happens-next" },
    ],
    quickLinksTitle: "Navigation",
    contactTitle: "Contact",
    socialTitle: "Follow Us",
  },

  chat: {
    title: "CultivoAI Assistant",
    placeholder: "Type your message...",
    sendButton: "Send",
    welcomeMessage:
      "Hi! I'm the CultivoAI assistant. I can help you learn about our services, show you projects, or connect you with Paul and Rocky. How can I help you?",
    contextualGreetings: {
      general:
        "Hi! I'm the CultivoAI assistant. I can help you learn about our services, show you projects, or connect you with Paul and Rocky. What brings you here today?",
      booking:
        "Hi! I see you want to book time with Paul. I'd love to help you with that! First, what's your name? And tell me a bit about what you'd like to discuss.",
      story:
        "Hi! Let me tell you about our story. We're Paul and Rocky, father and son working together from Colombia. Paul brings years of experience in startups and technology, and Rocky is learning in real-time at 14. What would you like to know? And by the way, what's your name?",
      semilla:
        "Hey! Rocky here (well, the AI version). I'm glad you're interested in the Semilla Fund! It's my project to help with small things while I learn. What's your name? And tell me what you have in mind!",
      service:
        "Hi! I see you're interested in {service}. Great choice! What's your name? And tell me about your current situation - what problem are you trying to solve?",
      partnership:
        "Hi! You're interested in learning more about our {partnership} model. Every project is different! What's your name? And tell me about your project so we can explore the best options.",
      qualification:
        "Hi! Let's see if we're the right fit to work together. What's your name? And tell me about your business and what you're looking to achieve.",
      impact:
        "Hi! I clicked 'Purpose over profit' I'm interested in learning about how you can help.",
      formFallback: "Prefer to fill out a form? Click here.",
    },
  },

  contactForm: {
    title: "Let's Talk",
    subtitle: "No corporate forms. Just a conversation.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    whatsappLabel: "WhatsApp (optional)",
    whatsappPlaceholder: "+1 555 123 4567",
    projectTypeLabel: "What type of project do you have in mind?",
    projectTypes: [
      "Workflow automation",
      "Chatbot / AI Assistant",
      "Business intelligence",
      "Content and marketing",
      "Website with AI",
      "Startup advisory",
      "Semilla Fund (small projects)",
      "Not sure - need guidance",
      "Other",
    ],
    descriptionLabel: "Tell us briefly about your project",
    descriptionPlaceholder: "What problem do you want to solve? What outcome do you expect?",
    submitButton: "Send message",
    chatPrompt: "Prefer to chat? Our AI assistant can help!",
  },

  terminal: {
    welcomeLine1: "Last login: ",
    welcomeLine2: "Cultivo AI Automation Suite v2.5.0",
    script: [
      { text: "cultivo start --mode=growth", type: "command", delay: 800 },
      { text: "Initializing neural core v2.5.0...", type: "info", delay: 400 },
      { text: "Authenticating LinkedIn Sales Navigator...", type: "info", delay: 300 },
      { text: "Connected to LinkedIn Secure Gateway", type: "success", delay: 200 },
      { text: "Connected to HubSpot CRM", type: "success", delay: 600 },
      { text: "Growth engine active. Scouting leads...", type: "info", delay: 2000 },
      { text: "Prospect detected: Sofia R. (CMO @ TechFlow)", type: "event", delay: 600 },
      { text: "Source: LinkedIn | Location: Bogota", type: "info", delay: 1000, className: "text-slate-400 pl-6" },
      { text: "Analyzing profile & activity...", type: "info", delay: 1000 },
      { text: "Insight: High intent. Posted about 'AI Automation'", type: "ai", delay: 800 },
      { text: "Generating personalized outreach...", type: "command", delay: 1000 },
      { text: 'Draft: "Hola Sofia, vi tu post sobre IA..."', type: "info", delay: 800, className: "text-slate-400 italic pl-6" },
      { text: "Action: Connection request sent", type: "success", delay: 800, className: "text-emerald-300" },
      { text: "Syncing lead to HubSpot...", type: "command", delay: 600 },
      { text: "Lead successfully created: ID #8842", type: "success", delay: 4000 },
    ],
  },
};
