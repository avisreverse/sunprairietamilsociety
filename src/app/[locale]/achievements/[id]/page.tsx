import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Individual achievement detail page — Server Component.
 * Fetches by UUID from Supabase achievements table (published + approved only).
 * Replaces hardcoded array that caused 404 for all DB UUIDs.
 *
 * @see REQ-202603-005 — Achievement submit + detail pages
 * @see REQ-202603-004 — Admin CMS
 * @see DEF-202603-014 — hardcoded array → 404 on UUID; now DB-driven
 */

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function AchievementDetailPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: item, error } = await supabase
    .from("achievements")
    .select("id,name,initials,category,achievement,year,color,bio,photo_url")
    .eq("id", id)
    .eq("is_approved", true)
    .eq("is_published", true)
    .single();

  if (error || !item) {
    console.error(`⚠️ [AchievementDetailPage] Not found or not published: ${id}`);
    notFound();
  }

  const color = item.color || "#C0392B";

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "8.5rem", paddingBottom: "6rem", minHeight: "100vh", background: "#111010" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 3.5rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>Achievements</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-block",
                padding: "0.25rem 0.75rem", borderRadius: "999px",
                background: `${color}22`, border: `1px solid ${color}44`,
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em",
                textTransform: "uppercase", color,
                marginBottom: "1.5rem",
              }}
            >
              {item.category}
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: "0.75rem" }}>
              {item.achievement}
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 300, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
              {item.year}
            </p>
          </div>

          {/* Person card */}
          <div
            style={{
              background: `linear-gradient(135deg, ${color}15 0%, rgba(255,255,255,0.04) 70%)`,
              border: `1px solid ${color}30`,
              borderRadius: "20px",
              padding: "2.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem" }}>
              {/* Photo or initials avatar */}
              {item.photo_url ? (
                <img
                  src={item.photo_url}
                  alt={item.name}
                  style={{
                    width: "72px", height: "72px", borderRadius: "50%",
                    objectFit: "cover",
                    border: `2px solid ${color}70`,
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "72px", height: "72px", borderRadius: "50%",
                    background: `${color}30`,
                    border: `2px solid ${color}70`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem", fontWeight: 700, color,
                    flexShrink: 0,
                  }}
                >
                  {item.initials}
                </div>
              )}
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "white" }}>{item.name}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 400, color: "rgba(255,255,255,0.35)", marginTop: "0.2rem" }}>Sun Prairie Tamil Society · {item.year}</div>
              </div>
            </div>

            {item.bio && (
              <>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 300, color: "rgba(255,255,255,0.7)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                  {item.bio}
                </p>

                {/* Highlight callout — uses the first sentence of bio as pull quote */}
                <div
                  style={{
                    borderLeft: `3px solid ${color}`,
                    paddingLeft: "1.25rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    fontWeight: 400,
                    color,
                    lineHeight: 1.7,
                  }}
                >
                  {item.bio.split(". ")[0] + "."}
                </div>
              </>
            )}
          </div>

          {/* Submit your own CTA */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              marginBottom: "3rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: "0.35rem" }}>
                Know someone remarkable?
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                Nominate a community member. Submissions are reviewed by the SPTS board.
              </div>
            </div>
            <Link
              href="/achievements/submit"
              style={{
                display: "inline-block",
                padding: "0.85rem 1.75rem", borderRadius: "999px",
                background: "#8B1A1A", color: "white",
                fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500,
                textDecoration: "none", flexShrink: 0,
              }}
            >
              Submit Nomination →
            </Link>
          </div>

          {/* Back */}
          <Link href="/#neytal" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
            ← Back to Achievements
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
