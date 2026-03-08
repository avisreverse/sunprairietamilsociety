import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Individual board member detail page — Server Component.
 * Fetches by slug from Supabase board_members table.
 * Shows headshot photo if uploaded, else initials avatar.
 * Replaced hardcoded BOARD object (DEF-202603-016).
 *
 * @see REQ-202603-006 — Board management
 * @see REQ-202603-004 — Admin CMS
 * @see DEF-202603-016 — Programs/board pages not DB-driven
 */

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function BoardMemberPage({ params }: Props) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: member, error } = await supabase
    .from("board_members")
    .select("id,slug,name,initials,role,role_ta,bio,email,photo_url,color,responsibilities,since_year,is_active")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !member) {
    console.error(`⚠️ [BoardMemberPage] Not found: ${slug}`);
    notFound();
  }

  const responsibilities: string[] = Array.isArray(member.responsibilities)
    ? (member.responsibilities as string[])
    : [];

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "8.5rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FDF8F0" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 3.5rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <Link href="/board" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Board
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#1A1410" }}>{member.name}</span>
          </div>

          {/* Person header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", marginBottom: "3rem" }}>
            {/* Photo or initials avatar */}
            {member.photo_url ? (
              <img
                src={member.photo_url}
                alt={member.name}
                style={{
                  width: "96px", height: "96px", borderRadius: "50%",
                  objectFit: "cover",
                  border: `3px solid ${member.color}55`,
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: "96px", height: "96px", borderRadius: "50%",
                  background: `${member.color}18`,
                  border: `3px solid ${member.color}55`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem", fontWeight: 700, color: member.color,
                  flexShrink: 0,
                }}
              >
                {member.initials}
              </div>
            )}
            <div>
              {member.role_ta && (
                <div style={{ fontFamily: "var(--font-tamil)", fontSize: "0.85rem", color: `${member.color}99`, marginBottom: "0.3rem" }}>
                  {member.role_ta}
                </div>
              )}
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.1, marginBottom: "0.5rem" }}>
                {member.name}
              </h1>
              <div
                style={{
                  display: "inline-block",
                  padding: "0.2rem 0.75rem", borderRadius: "999px",
                  background: `${member.color}15`, border: `1px solid ${member.color}35`,
                  fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase", color: member.color,
                }}
              >
                {member.role}
              </div>
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(26,20,16,0.07)", marginBottom: "2.5rem" }} />

          {/* Bio */}
          {member.bio && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300, color: "#3A2818", lineHeight: 1.9, marginBottom: "3rem" }}>
              {member.bio}
            </p>
          )}

          {/* Responsibilities + sidebar */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: "3rem", alignItems: "start", marginBottom: "4rem" }}>
            {responsibilities.length > 0 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "#1A1410", marginBottom: "1.25rem" }}>
                  Responsibilities
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {responsibilities.map((r, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 300, color: "#3A2818", lineHeight: 1.6 }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: member.color, flexShrink: 0, marginTop: "0.55rem" }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ background: "white", borderRadius: "16px", border: "1px solid rgba(26,20,16,0.08)", padding: "1.75rem", boxShadow: "0 2px 16px rgba(26,20,16,0.04)" }}>
              {member.since_year && (
                <div style={{ marginBottom: "1.25rem" }}>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.35rem" }}>
                    Board member since
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#1A1410" }}>
                    {member.since_year}
                  </div>
                </div>
              )}
              {member.since_year && member.email && (
                <div style={{ height: "1px", background: "rgba(26,20,16,0.07)", marginBottom: "1.25rem" }} />
              )}
              {member.email && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.35rem" }}>
                    Contact
                  </div>
                  <a href={`mailto:${member.email}`} style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: member.color, textDecoration: "none", wordBreak: "break-all" }}>
                    {member.email}
                  </a>
                </div>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  style={{ display: "block", textAlign: "center", padding: "0.85rem 1.5rem", borderRadius: "999px", background: member.color, color: "white", fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500, textDecoration: "none" }}
                >
                  Send a message →
                </a>
              )}
            </div>
          </div>

          {/* Back */}
          <div style={{ paddingTop: "2rem", borderTop: "1px solid rgba(26,20,16,0.08)" }}>
            <Link href="/board" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#8A7060", textDecoration: "none" }}>
              ← All board members
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
