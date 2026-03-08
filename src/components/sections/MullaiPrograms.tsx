"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Programs section — Design D: Warm Cultural.
 * Bento grid layout: featured card (Tamil School) + regular cards.
 * Cards have persistent floating shadows for depth.
 * Spring physics on hover (antigravity feel).
 * Data from Supabase via page.tsx server fetch (REQ-202603-004).
 *
 * @see REQ-202603-002 — Programs section
 * @see REQ-202603-004 — Admin CMS
 * @see D-013 — Framer Motion spring physics
 */

interface DbProgram {
  id: string;
  slug: string;
  name_en: string;
  name_ta: string | null;
  description: string | null;
  color: string;
  featured: boolean;
}

interface Props {
  programs: DbProgram[];
}

const SPRING = { type: "spring", stiffness: 320, damping: 26 } as const;

export default function MullaiPrograms({ programs }: Props) {
  const featured = programs.find((p) => p.featured) ?? programs[0] ?? null;
  const rest = programs.filter((p) => p.id !== featured?.id);

  if (programs.length === 0) {
    return (
      <section id="mullai" style={{ background: "#111010", padding: "6rem 3.5rem" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.6rem" }}>What We Offer</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: "white" }}>Programs coming soon</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="mullai" style={{ background: "#111010", padding: "6rem 3.5rem" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "20px", height: "1px", background: "#D4930A" }} />
              What We Offer
            </div>
            {/* DEF-202603-011: dynamic count instead of hardcoded "Five" */}
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "white", lineHeight: 1.15 }}>
              {programs.length} way{programs.length !== 1 ? "s" : ""} to belong
            </h2>
          </div>
          <Link
            href="/programs"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 400, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D4930A")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
          >
            View all programs →
          </Link>
        </div>

        {/* Bento grid — DEF-202603-010: 2-col layout so rest cards auto-wrap for any count */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.25rem", alignItems: "stretch" }}>

          {/* Featured card — left column, full height */}
          <motion.div
            style={{
              boxShadow: "0 8px 40px rgba(0,0,0,0.55)",
              borderRadius: "18px",
            }}
            whileHover={{ y: -10, boxShadow: "0 28px 80px rgba(0,0,0,0.75)" }}
            transition={SPRING}
          >
            <Link
              href={`/programs/${featured.slug}`}
              style={{
                display: "flex", flexDirection: "column",
                height: "100%", minHeight: "440px",
                padding: "2.5rem",
                borderRadius: "18px",
                border: `1px solid ${featured.color}40`,
                background: `linear-gradient(160deg, ${featured.color}28 0%, #1E1A18 60%)`,
                textDecoration: "none",
                position: "relative", overflow: "hidden",
              }}
            >
              <div style={{ width: "32px", height: "3px", borderRadius: "2px", background: featured.color, marginBottom: "auto" }} />
              <div
                style={{
                  width: "100%", aspectRatio: "4/3",
                  borderRadius: "12px",
                  background: `${featured.color}15`,
                  border: `1px dashed ${featured.color}50`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.75rem",
                }}
              >
                <span style={{ fontFamily: "var(--font-tamil)", fontSize: "2.5rem", color: `${featured.color}80` }}>
                  {featured.name_ta ? featured.name_ta.charAt(0) : featured.name_en.charAt(0)}
                </span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: `${featured.color}dd`, marginBottom: "0.5rem" }}>
                  Featured · {featured.name_ta ?? featured.name_en}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "white", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                  {featured.name_en}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", marginBottom: "1.5rem" }}>
                  {featured.description}
                </p>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 500, color: `${featured.color}ee` }}>
                  Learn more →
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Regular cards — right column sub-grid, 2-col, wraps for any count */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", alignContent: "start" }}>
            {rest.map((prog, i) => (
              <motion.div
                key={prog.slug}
                style={{ boxShadow: "0 6px 28px rgba(0,0,0,0.5)", borderRadius: "16px" }}
                whileHover={{ y: -8, boxShadow: "0 22px 60px rgba(0,0,0,0.7)" }}
                transition={{ ...SPRING, delay: i * 0.02 }}
              >
                <Link
                  href={`/programs/${prog.slug}`}
                  style={{
                    display: "flex", flexDirection: "column",
                    height: "100%", minHeight: "200px",
                    padding: "2rem",
                    borderRadius: "16px",
                    border: `1px solid ${prog.color}30`,
                    background: `linear-gradient(135deg, ${prog.color}20 0%, #1E1A18 70%)`,
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${prog.color}60`)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${prog.color}30`)}
                >
                  <div style={{ width: "24px", height: "3px", borderRadius: "2px", background: prog.color, marginBottom: "1rem" }} />
                  {prog.name_ta && (
                    <div style={{ fontFamily: "var(--font-tamil)", fontSize: "0.8rem", color: `${prog.color}aa`, marginBottom: "0.35rem" }}>
                      {prog.name_ta}
                    </div>
                  )}
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "white", marginBottom: "0.6rem", lineHeight: 1.2, flex: 1 }}>
                    {prog.name_en}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 300, lineHeight: 1.65, color: "rgba(255,255,255,0.5)" }}>
                    {prog.description}
                  </p>
                  <span style={{ display: "block", marginTop: "1rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, color: `${prog.color}cc` }}>
                    Explore →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
