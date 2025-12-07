import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { ModalProvider } from "@/components/landing/ui/modal-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Locale } from "@/content/types";
import type { Metadata } from "next";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Detect locale from Accept-Language header
 * Server-side detection prevents hydration mismatch
 */
async function detectServerLocale(): Promise<Locale> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  // Parse Accept-Language header (e.g., "es-CO,es;q=0.9,en;q=0.8")
  const languages = acceptLanguage
    .split(",")
    .map((lang: string) => lang.split(";")[0]?.trim().toLowerCase())
    .filter((lang): lang is string => Boolean(lang));

  // Check for Spanish locales
  for (const lang of languages) {
    if (lang.startsWith("es")) {
      return "es";
    }
  }

  // Default to English
  return "en";
}

export const metadata: Metadata = {
  title: {
    default: "CultivoAI - Consultoria en IA y Automatizacion",
    template: "%s | CultivoAI",
  },
  description:
    "Paul & Rocky - Padre e hijo construyendo soluciones de IA y automatizacion desde Colombia para el mundo. Acceso directo, sin intermediarios.",
  keywords: [
    "IA",
    "AI",
    "Automatizacion",
    "Colombia",
    "Consultoria",
    "Chatbots",
    "CRM",
    "Integraciones",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Paul Ronayne" }, { name: "Rocky Ronayne" }],
  creator: "CultivoAI",
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: "en_US",
    siteName: "CultivoAI",
    title: "CultivoAI - IA y Automatizacion",
    description:
      "Padre e hijo construyendo soluciones de IA desde Colombia para el mundo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CultivoAI - IA y Automatizacion",
    description:
      "Padre e hijo construyendo soluciones de IA desde Colombia para el mundo.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CultivoAI",
  description:
    "Consultoria en IA y automatizacion - Padre e hijo desde Colombia",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://cultivo.ai",
  founders: [
    {
      "@type": "Person",
      name: "Paul Ronayne",
    },
    {
      "@type": "Person",
      name: "Rocky Ronayne",
    },
  ],
  areaServed: "Worldwide",
  knowsLanguage: ["es", "en"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Detect locale server-side to prevent hydration mismatch
  const serverLocale = await detectServerLocale();

  return (
    <html lang={serverLocale} suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <LanguageProvider defaultLocale={serverLocale}>
          <ModalProvider>
            {children}
          </ModalProvider>
        </LanguageProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
