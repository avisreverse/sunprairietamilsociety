import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Individual program detail page — Server Component.
 * Fetches by slug from Supabase programs table.
 * Replaced hardcoded PROGRAMS object (DEF-202603-016).
 *
 * @see REQ-202603-002 — Programs section
 * @see REQ-202603-004 — Admin CMS
 * @see DEF-202603-016 — Programs/board pages not DB-driven
 */

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: program, error } = await supabase
    .from("programs")
    .select("id,slug,name_en,name_ta,description,tagline,schedule,contact_email,details,color,is_active,website_url,website_url_visible")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !program) {
    console.error(`⚠️ [ProgramDetailPage] Not found: ${slug}`);
    notFound();
  }

  const details: string[] = Array.isArray(program.details) ? (program.details as string[]) : [];

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "8.5rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FDF8F0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 3.5rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <Link href="/programs" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Programs
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#1A1410" }}>{program.name_en}</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ width: "40px", height: "4px", borderRadius: "2px", background: program.color, marginBottom: "1.5rem" }} />
            {program.name_ta && (
              <div style={{ fontFamily: "var(--font-tamil)", fontSize: "1rem", color: `${program.color}99`, marginBottom: "0.5rem" }}>
                {program.name_ta}
              </div>
            )}
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.1, marginBottom: "1rem" }}>
              {program.name_en}
            </h1>
            {program.tagline && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", fontWeight: 300, color: "#6A5040", lineHeight: 1.7 }}>
                {program.tagline}
              </p>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(26,20,16,0.08)", marginBottom: "3rem" }} />

          {/* Description */}
          {program.description && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300, color: "#3A2818", lineHeight: 1.9, marginBottom: "3rem" }}>
              {program.description}
            </p>
          )}

          {/* Details + sidebar grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "3rem", alignItems: "start" }}>

            {/* Details list */}
            {details.length > 0 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#1A1410", marginBottom: "1.25rem" }}>
                  What to expect
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {details.map((item, i) => (
                    <li
                      key={i}
                      style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontFamily: "var(--font-body)", fontSize: "0.92rem", fontWeight: 300, color: "#3A2818", lineHeight: 1.6 }}
                    >
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: program.color, flexShrink: 0, marginTop: "0.55rem" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sidebar card */}
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                border: "1px solid rgba(26,20,16,0.08)",
                padding: "2rem",
                boxShadow: "0 2px 16px rgba(26,20,16,0.04)",
              }}
            >
              {program.schedule && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.4rem" }}>
                    Schedule
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "#1A1410", lineHeight: 1.5 }}>
                    {program.schedule}
                  </div>
                </div>
              )}
              {program.schedule && program.contact_email && (
                <div style={{ height: "1px", background: "rgba(26,20,16,0.07)", marginBottom: "1.5rem" }} />
              )}
              {program.contact_email && (
                <div style={{ marginBottom: "1.75rem" }}>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.4rem" }}>
                    Contact
                  </div>
                  <a
                    href={`mailto:${program.contact_email}`}
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: program.color, textDecoration: "none" }}
                  >
                    {program.contact_email}
                  </a>
                </div>
              )}

              {/* REQ-202603-008: Website URL — show only if admin marked it visible */}
              {program.website_url && program.website_url_visible && (
                <>
                  {program.contact_email && (
                    <div style={{ height: "1px", background: "rgba(26,20,16,0.07)", marginBottom: "1.5rem" }} />
                  )}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.4rem" }}>
                      Website
                    </div>
                    <a
                      href={program.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: program.color, textDecoration: "none" }}
                    >
                      Visit website →
                    </a>
                  </div>
                </>
              )}

              <Link
                href="/join"
                style={{
                  display: "block", textAlign: "center",
                  padding: "0.9rem 1.5rem", borderRadius: "999px",
                  background: program.color, color: "white",
                  fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Get involved →
              </Link>
            </div>
          </div>

          {/* Back link */}
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(26,20,16,0.08)" }}>
            <Link
              href="/programs"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#8A7060", textDecoration: "none" }}
            >
              ← All programs
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
