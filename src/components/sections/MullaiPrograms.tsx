"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Programs section — Design D: Warm Cultural.
 * Bento grid layout: featured card (Tamil School) + 4 regular + "View all" tile.
 * Each card links to /programs/[slug] for a dedicated detail page.
 * Spring physics on hover (antigravity feel).
 * Dark ink background — matches Design D programs section.
 *
 * Adding more programs to PROGRAMS array auto-expands the grid.
 * Admin CMS will replace this static array — see REQ-202603-004.
 *
 * @see REQ-202603-002 — Programs section
 * @see D-013 — Framer Motion spring physics
 */

const PROGRAMS = [
  {
    slug: "tamil-school",
    nameEn: "Tamil School",
    nameTa: "தமிழ்ப் பள்ளி",
    description:
      "Language classes for children — reading, writing, and speaking Tamil fluently. Weekend classes for all ages.",
    color: "#7A1515",
    featured: true,
  },
  {
    slug: "library",
    nameEn: "Library",
    nameTa: "நூலகம்",
    description:
      "Tamil literature, children's books, and community reading programs.",
    color: "#1A5035",
    featured: false,
  },
  {
    slug: "music-club",
    nameEn: "Music Club",
    nameTa: "இசைக் குழு",
    description:
      "Carnatic music, folk songs, and cultural performances for all ages.",
    color: "#7A4A10",
    featured: false,
  },
  {
    slug: "tamil-pattarai",
    nameEn: "Tamil Pattarai",
    nameTa: "தமிழ்ப் பட்டறை",
    description:
      "Creative arts studio — drawing, crafts, and cultural expression in the Tamil tradition.",
    color: "#1A2A7A",
    featured: false,
  },
  {
    slug: "volunteer",
    nameEn: "Volunteer",
    nameTa: "தன்னார்வலர்",
    description:
      "Give your time. Shape the community. Every contribution matters.",
    color: "#4A1A7A",
    featured: false,
  },
] as const;

/** Spring config for the antigravity card hover */
const SPRING = { type: "spring", stiffness: 340, damping: 28 } as const;

export default function MullaiPrograms() {
  const featured = PROGRAMS[0];
  const rest = PROGRAMS.slice(1);

  return (
    <section
      id="mullai"
      style={{
        background: "#1A1410",
        padding: "6rem 3.5rem",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>

        {/* ── Section header ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "#B8750A",
                marginBottom: "0.6rem",
                display: "flex", alignItems: "center", gap: "0.75rem",
              }}
            >
              <div style={{ width: "20px", height: "1px", background: "#B8750A" }} />
              What We Offer
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 700, color: "white", lineHeight: 1.15,
              }}
            >
              Five ways to belong
            </h2>
          </div>
          <Link
            href="/programs"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem", fontWeight: 400,
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#B8750A")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
          >
            View all programs →
          </Link>
        </div>

        {/* ── Bento grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto auto",
            gap: "1rem",
          }}
        >
          {/* Featured card — tall, spans 2 rows */}
          <motion.div
            style={{ gridColumn: "1", gridRow: "1 / 3" }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={SPRING}
          >
            <Link
              href={`/programs/${featured.slug}`}
              style={{
                display: "flex", flexDirection: "column",
                height: "100%", minHeight: "420px",
                padding: "2.5rem",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.07)",
                background: `linear-gradient(160deg, ${featured.color}22 0%, rgba(26,20,16,0) 60%)`,
                textDecoration: "none",
                position: "relative", overflow: "hidden",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${featured.color}66`)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)")}
            >
              {/* Color accent top bar */}
              <div
                style={{
                  width: "32px", height: "3px", borderRadius: "2px",
                  background: featured.color, marginBottom: "auto",
                }}
              />

              {/* Photo placeholder */}
              <div
                style={{
                  width: "100%", aspectRatio: "4/3",
                  borderRadius: "10px",
                  background: `${featured.color}18`,
                  border: `1px dashed ${featured.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-tamil)",
                    fontSize: "2rem", color: `${featured.color}66`,
                  }}
                >
                  {featured.nameTa.charAt(0)}
                </span>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.65rem", fontWeight: 400, letterSpacing: "0.15em",
                    textTransform: "uppercase", color: `${featured.color}cc`,
                    marginBottom: "0.5rem",
                  }}
                >
                  Featured · {featured.nameTa}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem", fontWeight: 700, color: "white",
                    marginBottom: "0.75rem", lineHeight: 1.2,
                  }}
                >
                  {featured.nameEn}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.7,
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {featured.description}
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem", fontWeight: 500,
                    color: `${featured.color}cc`,
                    display: "flex", alignItems: "center", gap: "0.4rem",
                  }}
                >
                  Learn more →
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Regular cards */}
          {rest.map((prog, i) => (
            <motion.div
              key={prog.slug}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ ...SPRING, delay: i * 0.02 }}
            >
              <Link
                href={`/programs/${prog.slug}`}
                style={{
                  display: "flex", flexDirection: "column",
                  height: "100%", minHeight: "190px",
                  padding: "2rem",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: `linear-gradient(135deg, ${prog.color}18 0%, rgba(26,20,16,0) 70%)`,
                  textDecoration: "none",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${prog.color}55`)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)")}
              >
                <div
                  style={{
                    width: "24px", height: "3px", borderRadius: "2px",
                    background: prog.color, marginBottom: "1rem",
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-tamil)",
                    fontSize: "0.78rem", color: `${prog.color}88`,
                    marginBottom: "0.35rem",
                  }}
                >
                  {prog.nameTa}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem", fontWeight: 700, color: "white",
                    marginBottom: "0.6rem", lineHeight: 1.2, flex: 1,
                  }}
                >
                  {prog.nameEn}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.6,
                    color: "rgba(255,255,255,0.38)",
                  }}
                >
                  {prog.description}
                </p>
                <span
                  style={{
                    display: "block", marginTop: "1rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.72rem", fontWeight: 400,
                    color: `${prog.color}99`,
                  }}
                >
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
