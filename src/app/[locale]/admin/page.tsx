"use client";

import Link from "next/link";

/**
 * Admin CMS landing page — placeholder until Supabase backend is wired.
 * Full admin: REQ-202603-004 — programs, events, achievements, board, hero content.
 *
 * @see REQ-202603-004 — Admin CMS
 */

const SECTIONS = [
  {
    title: "Hero / Home Content",
    desc: "Edit the tagline, founding year, organization description, and hero Tamil text.",
    status: "coming_soon",
    color: "#C0392B",
    icon: "🏠",
  },
  {
    title: "Programs",
    desc: "Add, edit, or reorder programs. Upload program photos. Toggle visibility.",
    status: "coming_soon",
    color: "#27AE60",
    icon: "📚",
  },
  {
    title: "Events",
    desc: "Create events with date, time, location, photo, and optional RSVP link.",
    status: "coming_soon",
    color: "#E67E22",
    icon: "📅",
  },
  {
    title: "Achievements",
    desc: "Review and publish community achievement nominations. Upload photos.",
    status: "coming_soon",
    color: "#2980B9",
    icon: "🏆",
  },
  {
    title: "Board Members",
    desc: "Update board member names, roles, bios, and photos.",
    status: "coming_soon",
    color: "#8E44AD",
    icon: "👥",
  },
  {
    title: "Thirukkural Settings",
    desc: "Feature specific kurals, set rotation speed, add custom translations.",
    status: "coming_soon",
    color: "#C0392B",
    icon: "📜",
  },
];

export default function AdminPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0D0D0D", padding: "5rem 3.5rem" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.75rem" }}>
            SPTS Admin
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: "0.75rem" }}>
            Content Management
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: "500px" }}>
            This is your admin panel for managing all content on the Sun Prairie Tamil Society website. Full database integration is in progress.
          </p>
        </div>

        {/* Status banner */}
        <div
          style={{
            background: "rgba(212,147,10,0.12)",
            border: "1px solid rgba(212,147,10,0.3)",
            borderRadius: "12px",
            padding: "1.25rem 1.5rem",
            marginBottom: "3rem",
            display: "flex", alignItems: "flex-start", gap: "1rem",
          }}
        >
          <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>🚧</span>
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 600, color: "#D4930A", marginBottom: "0.3rem" }}>
              Admin CMS — In Development
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
              The database and authentication are being set up (REQ-202603-004). Once complete, you will be able to edit all website content from this page without touching any code. Until then, content is managed directly in the codebase.
            </div>
          </div>
        </div>

        {/* Section cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "3rem" }}>
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${section.color}20`,
                borderRadius: "16px",
                padding: "1.75rem",
                opacity: section.status === "coming_soon" ? 0.7 : 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.3rem" }}>{section.icon}</span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "white" }}>
                  {section.title}
                </div>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: "1rem" }}>
                {section.desc}
              </p>
              <div
                style={{
                  display: "inline-block",
                  padding: "0.2rem 0.75rem", borderRadius: "999px",
                  background: "rgba(212,147,10,0.15)", border: "1px solid rgba(212,147,10,0.3)",
                  fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase", color: "#D4930A",
                }}
              >
                Coming soon
              </div>
            </div>
          ))}
        </div>

        {/* Current workaround */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "1rem" }}>
            How to update content right now
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { file: "src/components/sections/MarutamEvents.tsx", what: "Events — add/edit event titles, dates, locations, RSVP links" },
              { file: "src/components/sections/NeytalAchievements.tsx", what: "Achievements — add/edit community achievement cards" },
              { file: "src/components/sections/PalaiBoard.tsx", what: "Board — update board member names and roles" },
              { file: "src/app/[locale]/board/page.tsx", what: "Board details — full bios and contact emails" },
              { file: "src/components/sections/MullaiPrograms.tsx", what: "Programs — add/edit program cards" },
              { file: "src/components/sections/LandingHero.tsx", what: "Hero — tagline, Tamil text, stats" },
            ].map((item) => (
              <div key={item.file} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <code style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#D4930A", background: "rgba(212,147,10,0.1)", padding: "0.2rem 0.5rem", borderRadius: "4px", flexShrink: 0, marginTop: "0.1rem" }}>
                  {item.file}
                </code>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 300, color: "rgba(255,255,255,0.5)" }}>{item.what}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back */}
        <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
          ← Back to site
        </Link>
      </div>
    </main>
  );
}
