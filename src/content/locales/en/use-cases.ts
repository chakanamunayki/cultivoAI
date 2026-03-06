import type { SiteContent } from "../../types";

export const enUseCasesContent: Pick<SiteContent, "demosTitle" | "demosSubtitle" | "useCases"> = {
  demosTitle: "AI in Action",
  demosSubtitle: "See examples of assistants, dashboards, and workflow systems in action.",
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
            "Bot: Great question. Pricing depends on scope. Want to tell me what you are trying to do so I can point you to the best next step?",
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
        {
          action: "",
          result: "What do you have planned for today? School, soccer, anything else?",
        },
        { action: "Rocky: School until 3, then soccer practice", result: "" },
        { action: "", result: "Saved to Notion. I'll text you at 8pm!" },
        { action: "8:00 PM - How was your day?", result: "" },
        { action: "Rocky: [Voice note 30s]", result: "" },
        { action: "", result: "Transcribed and saved. Good day! Get some rest." },
      ],
    },
  ],
};
