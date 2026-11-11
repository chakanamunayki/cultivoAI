import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { ModalProvider } from "@/components/landing/ui/modal-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Toaster } from "@/components/ui/sonner";
import { ENABLED_LOCALES, isEnabledLocale } from "@/content/enabled-locales";
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

  // Accept-Language is a RANKED list (e.g., "en-GB,en;q=0.9,es;q=0.8").
  // We must honor the q-weights and pick the highest-priority language.
  // The old code returned "es" if ANY entry started with "es", so an English
  // browser that merely listed Spanish lower down was wrongly served Spanish.
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const parsedQ = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return {
        tag: tag?.trim().toLowerCase() ?? "",
        q: Number.isNaN(parsedQ) ? 0 : parsedQ,
      };
    })
    .filter((entry) => entry.tag.length > 0)
    .sort((a, b) => b.q - a.q);

  const topLanguage = ranked[0]?.tag ?? "";

  // Honor the user's highest-priority language. Portuguese is served when enabled,
  // otherwise falls back to Spanish (closest). Default to English.
  if (topLanguage.startsWith("pt")) return isEnabledLocale("pt") ? "pt" : "es";
  return topLanguage.startsWith("es") ? "es" : "en";
}

export const metadata: Metadata = {
  title: {
    default: "Cultivo Labs · Tu socio tecnológico para proyectos que cuidan la tierra, las personas y las comunidades",
    template: "%s | Cultivo Labs",
  },
  description:
    "Cofundador de startups que volvió a construir con las manos. Ayudo a buenos proyectos de regeneración, comunidades autosuficientes, salud holística y naturaleza a construir su tecnología, encontrar las innovaciones adecuadas y prepararse para la inversión. Desde Colombia, para Latinoamérica y el mundo.",
  keywords: [
    "Cultivo Labs",
    "Semillero",
    "regeneración",
    "comunidades autosuficientes",
    "salud holística",
    "agritech",
    "MRV",
    "startups",
    "Colombia",
    "Latinoamérica",
  ],
  authors: [{ name: "Paul Ronayne" }],
  creator: "Cultivo Labs",
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US", "pt_BR"],
    siteName: "Cultivo Labs",
    title: "Cultivo Labs · Tu socio tecnológico para proyectos que cuidan la tierra, las personas y las comunidades",
    description:
      "Cofundador de startups que volvió a construir con las manos. Ayudo a buenos proyectos de regeneración, comunidades autosuficientes, salud holística y naturaleza a construir su tecnología, encontrar las innovaciones adecuadas y prepararse para la inversión. Desde Colombia, para Latinoamérica y el mundo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cultivo Labs · Tu socio tecnológico para proyectos que cuidan la tierra, las personas y las comunidades",
    description:
      "Cofundador de startups que volvió a construir con las manos. Ayudo a buenos proyectos de regeneración, comunidades autosuficientes, salud holística y naturaleza a construir su tecnología, encontrar las innovaciones adecuadas y prepararse para la inversión. Desde Colombia, para Latinoamérica y el mundo.",
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
  name: "Cultivo Labs",
  description:
    "Hands-on tech partner for projects that care for land, people and communities. Based in Colombia, working across Latin America and worldwide.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://cultivoai.vercel.app",
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
  knowsLanguage: [...ENABLED_LOCALES],
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
