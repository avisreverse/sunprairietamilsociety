import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

/**
 * Board of Directors listing page — Server Component.
 * Fetches from Supabase board_members table (active only, ordered by display_order).
 * Shows uploaded headshot photo if available, else initials avatar.
 * Replaced hardcoded BOARD array (DEF-202603-016).
 *
 * @see REQ-202603-006 — Board management
 * @see REQ-202603-004 — Admin CMS
 * @see DEF-202603-016 — Programs/board pages not DB-driven
 */

export default async function BoardPage() {
  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from("board_members")
    .select("id,slug,name,initials,role,bio,color,photo_url,since_year")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("⚠️ [BoardPage] DB fetch failed:", error.message);
  }

  const list = members ?? [];

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "8.5rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FDF8F0" }}>
        <div className="spts-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 3.5rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#1A1410" }}>Board of Directors</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ width: "36px", height: "3px", borderRadius: "2px", background: "#B8750A", marginBottom: "1.5rem" }} />
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.1, marginBottom: "0.75rem" }}>
              Board of Directors
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300, color: "#4A3828", lineHeight: 1.8, maxWidth: "560px" }}>
              SPTS is run entirely by volunteers who believe in Tamil language, culture, and community. Meet the people who make it all possible.
            </p>
          </div>

          {/* Board members grid — centered flex so orphaned last cards center (DEF-202603-003) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "5rem" }}>
            {list.map((member, index) => (
              <Link
                key={member.id}
                href={`/board/${member.slug}`}
                style={{
                  display: "block",
                  background: "white",
                  borderRadius: "20px",
                  border: `1px solid ${member.color}20`,
                  padding: "2rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 28px rgba(26,20,16,0.07)",
                  /* DEF: last orphaned card spans full width when count%3===1 */
                  gridColumn: index === list.length - 1 && list.length % 3 === 1 ? "1 / -1" : undefined,
                  maxWidth: index === list.length - 1 && list.length % 3 === 1 ? "380px" : undefined,
                  justifySelf: index === list.length - 1 && list.length % 3 === 1 ? "center" : undefined,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.25rem" }}>
                  {/* Photo or initials avatar */}
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      style={{
                        width: "64px", height: "64px", borderRadius: "50%",
                        objectFit: "cover",
                        border: `2px solid ${member.color}55`,
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "64px", height: "64px", borderRadius: "50%",
                        background: `${member.color}18`,
                        border: `2px solid ${member.color}55`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-display)",
                        fontSize: "1.3rem", fontWeight: 700, color: member.color,
                        flexShrink: 0,
                      }}
                    >
                      {member.initials}
                    </div>
                  )}
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: member.color, marginBottom: "0.3rem" }}>
                      {member.role}
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "#1A1410" }}>
                      {member.name}
                    </div>
                    {member.since_year && (
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: "rgba(26,20,16,0.4)", marginTop: "0.15rem" }}>
                        Since {member.since_year}
                      </div>
                    )}
                  </div>
                </div>
                {member.bio && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.83rem", fontWeight: 300, color: "#4A3828", lineHeight: 1.7, marginBottom: "1rem" }}>
                    {member.bio}
                  </p>
                )}
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 500, color: member.color }}>
                  View profile →
                </span>
              </Link>
            ))}
          </div>

          {/* Join CTA */}
          <div
            style={{
              background: "#1A1410",
              borderRadius: "20px",
              padding: "3rem",
              textAlign: "center",
              boxShadow: "0 8px 48px rgba(26,20,16,0.15)",
            }}
          >
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: "0.75rem" }}>
              Want to get involved?
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "440px", margin: "0 auto 2rem" }}>
              SPTS is always looking for passionate community members to help lead and grow our programs.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/join"
                style={{ display: "inline-block", padding: "0.9rem 2rem", borderRadius: "999px", background: "#8B1A1A", color: "white", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, textDecoration: "none" }}
              >
                Join the Society
              </Link>
              <a
                href="mailto:president@sunprairietamil.org"
                style={{ display: "inline-block", padding: "0.9rem 2rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 400, textDecoration: "none" }}
              >
                Contact the Board →
              </a>
            </div>
          </div>

          <div style={{ marginTop: "3rem" }}>
            <Link href="/#palai" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#8A7060", textDecoration: "none" }}>
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
