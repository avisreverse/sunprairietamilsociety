"use client";

import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

/**
 * All programs listing page.
 * Static for now — Admin CMS (REQ-202603-004) will populate from Supabase.
 *
 * @see REQ-202603-002 — Programs section
 */

const PROGRAMS = [
  { slug: "tamil-school", nameEn: "Tamil School", nameTa: "தமிழ்ப் பள்ளி", description: "Language classes for children — reading, writing, and speaking Tamil fluently.", color: "#7A1515" },
  { slug: "library", nameEn: "Library", nameTa: "நூலகம்", description: "Tamil literature, children's books, and community reading programs.", color: "#1A5035" },
  { slug: "music-club", nameEn: "Music Club", nameTa: "இசைக் குழு", description: "Carnatic music, folk songs, and cultural performances for all ages.", color: "#7A4A10" },
  { slug: "tamil-pattarai", nameEn: "Tamil Pattarai", nameTa: "தமிழ்ப் பட்டறை", description: "Creative arts studio — drawing, crafts, and Tamil cultural expression.", color: "#1A2A7A" },
  { slug: "volunteer", nameEn: "Volunteer", nameTa: "தன்னார்வலர்", description: "Give your time. Shape the community. Every contribution matters.", color: "#4A1A7A" },
];

export default function ProgramsPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: "7rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FDF8F0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 3.5rem" }}>

          <div style={{ marginBottom: "3.5rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              ← Back to home
            </Link>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 700, color: "#1A1410", marginTop: "1.25rem", lineHeight: 1.1 }}>
              Our Programs
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300, color: "#4A3828", marginTop: "0.75rem", lineHeight: 1.8 }}>
              Five ways to connect with Tamil language, culture, and community.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.25rem" }}>
            {PROGRAMS.map((prog) => (
              <Link
                key={prog.slug}
                href={`/programs/${prog.slug}`}
                style={{
                  display: "block", padding: "2.25rem",
                  borderRadius: "16px", border: "1px solid rgba(26,20,16,0.08)",
                  background: "white", textDecoration: "none",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 8px 32px rgba(26,20,16,0.10)"; el.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "none"; el.style.transform = "none"; }}
              >
                <div style={{ width: "28px", height: "3px", borderRadius: "2px", background: prog.color, marginBottom: "1.25rem" }} />
                <div style={{ fontFamily: "var(--font-tamil)", fontSize: "0.8rem", color: `${prog.color}88`, marginBottom: "0.3rem" }}>{prog.nameTa}</div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "#1A1410", marginBottom: "0.6rem" }}>{prog.nameEn}</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 300, color: "#4A3828", lineHeight: 1.7 }}>{prog.description}</p>
                <span style={{ display: "block", marginTop: "1.25rem", fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 500, color: prog.color }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
