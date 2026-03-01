/**
 * Root layout — minimal shell. next-intl locale layouts live in app/[locale]/layout.tsx.
 * This file exists to satisfy Next.js App Router requirements.
 * @see D-001 — Next.js App Router
 * @see D-007 — next-intl for Tamil + English
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
