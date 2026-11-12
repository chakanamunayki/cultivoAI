import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { ModalProvider } from "@/components/landing/ui/modal-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Toaster } from "@/components/ui/sonner";
import { ENABLED_LOCALES, isEnabledLocale } from "@/content/enabled-locales";
import type { Locale } from "@/content/types";
import { buildSiteMetadata, localeFromAcceptLanguage, SITE_URL } from "@/lib/site-metadata";
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
 * Detect locale from the Accept-Language header.
 * Server-side detection prevents hydration mismatch.
 */
async function detectServerLocale(): Promise<Locale> {
  const headersList = await headers();
  return localeFromAcceptLanguage(headersList.get("accept-language") || "", isEnabledLocale("pt"));
}

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata(await detectServerLocale());
}

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cultivo Labs",
  description:
    "Hands-on tech partner for projects that care for land, people and communities. Based in Colombia, working across Latin America and worldwide.",
  url: SITE_URL,
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
