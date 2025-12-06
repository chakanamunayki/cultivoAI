import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/landing/ui/modal-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Toaster } from "@/components/ui/sonner";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
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
        <LanguageProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </LanguageProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
