import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

/**
 * All programs listing page — Server Component.
 * Fetches from Supabase programs table (active only, ordered by display_order).
 * Replaced hardcoded PROGRAMS array (DEF-202603-016).
 *
 * @see REQ-202603-002 — Programs section
 * @see REQ-202603-004 — Admin CMS
 * @see DEF-202603-016 — Programs/board pages not DB-driven
 */

export default async function ProgramsPage() {
  const supabase = await createClient();

  const { data: programs, error } = await supabase
    .from("programs")
    .select("id,slug,name_en,name_ta,description,color")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("⚠️ [ProgramsPage] DB fetch failed:", error.message);
  }

  const list = programs ?? [];

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "8.5rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FDF8F0" }}>
        <div className="spts-inner" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 3.5rem" }}>

          <div style={{ marginBottom: "3.5rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              ← Back to home
            </Link>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 700, color: "#1A1410", marginTop: "1.25rem", lineHeight: 1.1 }}>
              Our Programs
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300, color: "#4A3828", marginTop: "0.75rem", lineHeight: 1.8 }}>
              {list.length} way{list.length !== 1 ? "s" : ""} to connect with Tamil language, culture, and community.
            </p>
          </div>

          {list.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", fontFamily: "var(--font-body)", color: "#8A7060" }}>
              No programs at this time. Check back soon.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem", alignItems: "stretch" }}>
              {list.map((prog) => (
                <Link
                  key={prog.slug}
                  href={`/programs/${prog.slug}`}
                  className="spts-prog-card"
                  style={{
                    display: "flex", flexDirection: "column",
                    padding: "2.25rem", height: "100%",
                    borderRadius: "16px", border: "1px solid rgba(26,20,16,0.08)",
                    background: "white", textDecoration: "none",
                  }}
                >
                  <div style={{ width: "28px", height: "3px", borderRadius: "2px", background: prog.color, marginBottom: "1.25rem" }} />
                  {prog.name_ta && (
                    <div style={{ fontFamily: "var(--font-tamil)", fontSize: "0.8rem", color: `${prog.color}88`, marginBottom: "0.3rem" }}>{prog.name_ta}</div>
                  )}
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "#1A1410", marginBottom: "0.6rem" }}>{prog.name_en}</h2>
                  {/* flex: 1 pushes "Learn more" to the card bottom — uniform alignment regardless of description length */}
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 300, color: "#4A3828", lineHeight: 1.7, flex: 1 }}>
                    {prog.description ?? ""}
                  </p>
                  <span style={{ display: "block", marginTop: "1.25rem", fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 500, color: prog.color }}>Learn more →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
