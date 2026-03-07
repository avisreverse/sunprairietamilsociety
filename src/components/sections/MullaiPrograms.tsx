"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Programs section — Design D: Warm Cultural.
 * Bento grid layout: featured card (Tamil School) + 4 regular.
 * Cards have persistent floating shadows for depth.
 * Spring physics on hover (antigravity feel).
 *
 * @see REQ-202603-002 — Programs section
 * @see D-013 — Framer Motion spring physics
 */

const PROGRAMS = [
  {
    slug: "tamil-school",
    nameEn: "Tamil School",
    nameTa: "தமிழ்ப் பள்ளி",
    description: "Language classes for children — reading, writing, and speaking Tamil fluently. Weekend classes for all ages.",
    color: "#C0392B",
    featured: true,
  },
  {
    slug: "library",
    nameEn: "Library",
    nameTa: "நூலகம்",
    description: "Tamil literature, children's books, and community reading programs.",
    color: "#27AE60",
    featured: false,
  },
  {
    slug: "music-club",
    nameEn: "Music Club",
    nameTa: "இசைக் குழு",
    description: "Carnatic music, folk songs, and cultural performances for all ages.",
    color: "#E67E22",
    featured: false,
  },
  {
    slug: "tamil-pattarai",
    nameEn: "Tamil Pattarai",
    nameTa: "தமிழ்ப் பட்டறை",
    description: "Creative arts studio — drawing, crafts, and cultural expression in the Tamil tradition.",
    color: "#2980B9",
    featured: false,
  },
  {
    slug: "volunteer",
    nameEn: "Volunteer",
    nameTa: "தன்னார்வலர்",
    description: "Give your time. Shape the community. Every contribution matters.",
    color: "#8E44AD",
    featured: false,
  },
] as const;

const SPRING = { type: "spring", stiffness: 320, damping: 26 } as const;

export default function MullaiPrograms() {
  const featured = PROGRAMS[0];
  const rest = PROGRAMS.slice(1);

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
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "white", lineHeight: 1.15 }}>
              Five ways to belong
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

        {/* Bento grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "auto auto", gap: "1.25rem" }}>

          {/* Featured card — spans 2 rows */}
          <motion.div
            style={{
              gridColumn: "1", gridRow: "1 / 3",
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
                  {featured.nameTa.charAt(0)}
                </span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: `${featured.color}dd`, marginBottom: "0.5rem" }}>
                  Featured · {featured.nameTa}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "white", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                  {featured.nameEn}
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

          {/* Regular cards */}
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
                <div style={{ fontFamily: "var(--font-tamil)", fontSize: "0.8rem", color: `${prog.color}aa`, marginBottom: "0.35rem" }}>
                  {prog.nameTa}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "white", marginBottom: "0.6rem", lineHeight: 1.2, flex: 1 }}>
                  {prog.nameEn}
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
    </section>
  );
}
