import type { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Space_Grotesk, Outfit, Noto_Serif_Tamil } from "next/font/google";
import "../globals.css";

/**
 * Fonts loaded via next/font for zero-FOUT, self-hosted subset delivery.
 * Space Grotesk → display headings (zenith pattern, D-003)
 * Outfit → body + UI text (zenith pattern, D-003)
 * Noto Serif Tamil → Tamil script (D-007)
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
  display: "swap",
  weight: ["400", "600", "700"],
});

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
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${outfit.variable} ${notoSerifTamil.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <PageTransition>
            {children}
          </PageTransition>
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
