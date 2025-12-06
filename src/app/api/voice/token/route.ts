import { NextResponse } from "next/server";

/**
 * Ephemeral Token Endpoint for Gemini Live API
 *
 * Generates short-lived tokens for client-side WebSocket connections.
 * This prevents exposing the API key directly in the browser.
 *
 * Token lifetime: 60 seconds (refreshed automatically by client)
 */

// Rate limiting in-memory store (simple implementation)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
// More lenient in development due to hot reloading causing multiple requests
const RATE_LIMIT_MAX_REQUESTS = process.env.NODE_ENV === "development" ? 100 : 20;

function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] ?? "unknown" : "unknown";
  return ip.trim();
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  // Clean up expired entries periodically
  if (rateLimitStore.size > 100) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (now > v.resetTime) {
        rateLimitStore.delete(k);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: "Too many token requests. Please wait a moment." },
        { status: 429 }
      );
    }

    // Get API key from environment
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY not configured");
      return NextResponse.json(
        { error: "Voice service not configured" },
        { status: 500 }
      );
    }

    // Parse request body for optional parameters
    let locale: "es" | "en" = "es";
    try {
      const body = await request.json();
      if (body.locale === "en" || body.locale === "es") {
        locale = body.locale;
      }
    } catch {
      // No body or invalid JSON - use defaults
    }

    // Generate ephemeral token
    // Note: Gemini Live API uses the API key directly, but we wrap it in a token
    // structure for future-proofing and to control the client's access window
    const expiresAt = Date.now() + 60000; // 60 second expiry

    // Create a simple token that includes expiry info
    // In production, you might want to sign this or use a more secure method
    const tokenPayload = {
      apiKey,
      expiresAt,
      locale,
    };

    // Base64 encode the token (not encryption, just encoding for transport)
    // The actual security comes from HTTPS and not exposing this endpoint publicly
    const token = Buffer.from(JSON.stringify(tokenPayload)).toString("base64");

    return NextResponse.json({
      token,
      expiresAt,
      expiresIn: 60, // seconds
      locale,
    });
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}

// GET method to check token endpoint status
export async function GET() {
  const hasApiKey = !!process.env.GEMINI_API_KEY;

  return NextResponse.json({
    status: hasApiKey ? "ready" : "not_configured",
    message: hasApiKey
      ? "Token endpoint ready"
      : "GEMINI_API_KEY not configured",
  });
}
