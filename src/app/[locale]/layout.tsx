import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

/**
 * Root metadata for the SPTS community hub.
 * @see REQ-202603-001 — Landing page / community hub home
 */
export const metadata: Metadata = {
  title: "Sun Prairie Tamil Society — Tamil Culture in Wisconsin",
  description:
    "SPTS is Sun Prairie's Tamil community hub — Tamil school, library, arts, music, and more. Tamil culture, alive in Wisconsin since 2012.",
  keywords: ["Tamil", "Sun Prairie", "Wisconsin", "Tamil School", "SPTS"],
  openGraph: {
    siteName: "Sun Prairie Tamil Society",
    locale: "en_US",
    type: "website",
  },
};

/**
 * Locale-aware root layout.
 * Sets html lang, provides next-intl messages to client components.
 * @see D-001 — Next.js App Router
 * @see D-007 — next-intl for Tamil + English from day 1
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale — return 404 for unsupported values
  if (!routing.locales.includes(locale as "en" | "ta")) {
    notFound();
  }

  // Fetch locale messages for client-side provider
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Preconnect for Google Fonts performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

/**
 * Generate static params for supported locales.
 * Enables static rendering for locale routes.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
