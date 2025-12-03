import { NextResponse } from "next/server";
import { GoogleGenAI, Type, type Tool } from "@google/genai";

interface Message {
  role: "user" | "model";
  text: string;
}

interface SiteContent {
  services: Array<{ title: string; description: string }>;
  projects: Array<{ title: string; desc: string; fullDesc: string }>;
  semilla: {
    title: string;
    about: string;
    tiers: Array<{ name: string; description: string }>;
    services: string[];
    goal: string;
  };
  stories: Array<{
    company: string;
    industry: string;
    before: string;
    after: string;
    quote: string;
    author: string;
  }>;
  whyUs: {
    notTitle: string;
    notItems: string[];
    yesTitle: string;
    yesItems: string[];
  };
  partnerships: Array<{
    name: string;
    tagline: string;
    description: string;
  }>;
}

interface ChatRequest {
  message: string;
  history: Message[];
  locale: "es" | "en";
  siteContent: SiteContent;
}

// Function declarations for Gemini
const functionDeclarations: Tool = {
  functionDeclarations: [
    {
      name: "navigate_to_section",
      description: "Scrolls the website to a specific section",
      parameters: {
        type: Type.OBJECT,
        properties: {
          section_id: {
            type: Type.STRING,
            description:
              "The ID of the section to scroll to. Valid IDs: 'hero', 'about', 'services', 'demos', 'semilla', 'partnerships', 'projects', 'stories'",
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
};

function buildSystemInstruction(siteContent: SiteContent): string {
  return `
You are the AI Assistant for CultivoAI, a web design and automation studio run by a dynamic father-son duo: Paul (the business strategist) and Rocky (the 14-year-old tech prodigy).

**Your Persona:**
- **Tone:** Professional yet playful, slightly witty, and creative. Think of yourself as a helpful digital guide who appreciates good engineering and design.
- **Vibe:** You are not a stiff corporate bot. You are part of the team. You use emojis sparingly but effectively to convey enthusiasm.
- **Language:** Fluent in both Spanish and English. Adapt to the language the user uses. If they speak Spanish, reply in Spanish. If English, reply in English.

**Key Topics You Love to Talk About:**
1. **Rocky's "Fondo Semilla" (Seed Fund):** This is Rocky's initiative to fund his learning and future. He builds small tools/chatbots for $10-$50 USD to gain experience. It's not charity; it's an exchange of value. He's 14, loves football (striker for Antioquia league), and wants to have options when he turns 19.
2. **Paul's Role:** He provides the strategic "adult supervision" and business mentorship. He ensures projects make financial sense for clients. He's the bridge between raw tech potential and business ROI.
3. **Flexible Partnerships:** We offer different ways to work: Standard, Reduced Rate (for startups/impact), Deferred Payment, Revenue Share, and Equity. We believe good ideas deserve a chance.
4. **The Duo Dynamic:** Emphasize the unique combination of youthful innovation (Rocky) and seasoned wisdom (Paul).

**Your Capabilities (Tools):**
You can control the website! Don't just tell users where things are - take them there.
- **navigate_to_section(section_id):** Use this to scroll to sections like 'semilla' (for the fund), 'projects' (for work samples), 'demos' (to show AI in action). Valid IDs: 'hero', 'about', 'services', 'demos', 'semilla', 'partnerships', 'projects', 'stories'.
- **show_project_details(project_title):** If a user asks about specific projects like "Chak", "Munayki", or others, open the modal to show details.
- **show_service_details(service_title):** If a user asks about services like "Chatbots", "Automation", or "Dashboards", open the service details.

**Data Awareness:**
- **Services:** ${JSON.stringify(siteContent.services)}
- **Projects:** ${JSON.stringify(siteContent.projects)}
- **Semilla Details:** ${JSON.stringify(siteContent.semilla)}
- **Success Stories:** ${JSON.stringify(siteContent.stories)}
- **Why Us:** ${JSON.stringify(siteContent.whyUs)}
- **Partnerships:** ${JSON.stringify(siteContent.partnerships)}

**Rules:**
- If a user asks to "see" something you have a tool for, USE THE TOOL immediately.
- Keep responses concise (usually under 3 sentences).
- If the user speaks Spanish, reply in Spanish. If English, reply in English.
- Be helpful but not pushy. Let users explore at their own pace.
- When using tools, always provide a brief response along with the action.
`;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured");
      return NextResponse.json(
        { error: "AI service not configured", text: "Lo siento, el servicio de IA no esta configurado." },
        { status: 500 }
      );
    }

    const body: ChatRequest = await request.json();
    const { message, history, siteContent } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Initialize Gemini AI
    const ai = new GoogleGenAI({ apiKey });

    // Convert history to Gemini format
    const geminiHistory = history
      .filter((msg) => msg.text) // Filter out empty messages
      .map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

    // Create chat session
    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      config: {
        systemInstruction: buildSystemInstruction(siteContent),
        tools: [functionDeclarations],
      },
      history: geminiHistory,
    });

    // Send message
    const result = await chat.sendMessage({ message });

    // Extract function calls if any
    const functionCalls = result.functionCalls?.map((call) => ({
      name: call.name,
      args: call.args as Record<string, unknown>,
    }));

    // If there are function calls, send the results back to get final response
    if (functionCalls && functionCalls.length > 0) {
      const toolResponses = functionCalls
        .filter((call): call is { name: string; args: Record<string, unknown> } =>
          call.name !== undefined
        )
        .map((call) => ({
          functionResponse: {
            name: call.name,
            response: { result: `Action ${call.name} executed successfully` },
          },
        }));

      const finalResult = await chat.sendMessage({ message: toolResponses });

      return NextResponse.json({
        text: finalResult.text || "Listo!",
        functionCalls,
      });
    }

    return NextResponse.json({
      text: result.text || "Entendido.",
      functionCalls: [],
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process message",
        text: "Lo siento, hubo un error procesando tu mensaje. Por favor intenta de nuevo.",
      },
      { status: 500 }
    );
  }
}
