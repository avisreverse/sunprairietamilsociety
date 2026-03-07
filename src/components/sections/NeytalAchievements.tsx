"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Section 4: Neytal — Sea — Achievements
 * Redesigned from small 2×2 grid → 3-column celebratory gallery.
 * Each card has an initial-based circular avatar (gold letter on dark circle)
 * instead of placeholder photo boxes — honest and visually elegant.
 * Award label in sky blue. 4th slot is "submit your achievement" CTA.
 * Scroll-reveal with slight rotation entrance for cinematic feel.
 *
 * @see REQ-202603-001 — Achievements section
 * @see D-013 — Framer Motion scroll-reveal
 */

const ACHIEVEMENTS = [
  {
    award: "1st Place",
    name: "Priya Krishnaswamy",
    initials: "PK",
    competition: "Tamil Oratory · Senior Division",
  },
  {
    award: "Best Essay",
    name: "Arjun Ramalingam",
    initials: "AR",
    competition: "National Tamil Youth Conference",
  },
  {
    award: "Gold Medal",
    name: "Kavitha & Sundari Balaji",
    initials: "KB",
    competition: "Midwest Carnatic Festival",
  },
] as const;

/**
 * Circular avatar with gold initials on dark background.
 * Replaces placeholder photo box — honest until real photos are available.
 *
 * @param initials - Two-letter initials string (e.g. "PK")
 * @param size     - Diameter in px (default 56)
 */
function InitialsAvatar({ initials, size = 56 }: { initials: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(212,147,10,0.18)",
        border: "1.5px solid rgba(212,147,10,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: size * 0.3,
          fontWeight: 600,
          color: "#D4930A",
          letterSpacing: "0.04em",
        }}
      >
        {initials}
      </span>
    </div>
  );
}

export default function NeytalAchievements() {
  const t = useTranslations("neytal");

  return (
    <section
      id="neytal"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #0A1E3D 0%, #0A4A6B 50%, #051520 100%)",
      }}
      className="px-8 md:px-24 py-32"
    >
      {/* Ocean waves watermark */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", opacity: 0.06, pointerEvents: "none" }}
      >
        <svg viewBox="0 0 1400 600" fill="white" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "85%" }}>
          <path d="M0,600 L0,310 C200,260 400,360 600,300 C800,240 1000,360 1200,290 C1300,255 1360,270 1400,260 L1400,600 Z" />
          <path d="M0,600 L0,420 C180,390 360,440 540,410 C720,380 900,430 1080,400 C1200,380 1300,405 1400,390 L1400,600 Z" />
          <path d="M0,600 L0,510 C175,495 350,520 525,505 C700,490 875,515 1050,500 C1175,490 1300,508 1400,500 L1400,600 Z" />
        </svg>
      </div>

      {/* Right-side poem overlay */}
      <div
        style={{ position: "absolute", right: "6rem", top: "50%", transform: "translateY(-50%)", textAlign: "right" }}
        className="hidden lg:block"
        aria-hidden="true"
      >
        <p style={{ fontFamily: "var(--font-tamil)", fontSize: "clamp(1rem,2.5vw,1.6rem)", opacity: 0.50, lineHeight: 1.8 }}>
          {t("poemTa")}
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontStyle: "normal", fontSize: "0.8rem", opacity: 0.40, marginTop: "0.75rem", maxWidth: "280px", marginLeft: "auto", lineHeight: 1.7 }}>
          {t("poemEn")}
        </p>
      </div>

      {/* Tinai label */}
      <ScrollReveal delay={0}>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignSelf: "flex-start",
            gap: "0.35rem",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.75, fontFamily: "var(--font-body)", margin: 0 }}>
            {t("tinaiLabel")}
          </p>
          <p style={{ fontFamily: "var(--font-tamil)", fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
            {t("tinaiTa")}
          </p>
        </div>
      </ScrollReveal>

      {/* Heading */}
      <ScrollReveal delay={0.08}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 4.2vw, 3.8rem)",
            fontWeight: 700,
            fontStyle: "normal",
            lineHeight: 1.15,
            maxWidth: "600px",
            marginBottom: "0.75rem",
            color: "rgba(245,240,228,0.96)",
          }}
        >
          {t("heading")}
        </h2>
      </ScrollReveal>

      {/* Body copy */}
      <ScrollReveal delay={0.14}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "1.05rem",
            maxWidth: "520px",
            lineHeight: 1.85,
            opacity: 0.78,
            marginBottom: "2rem",
          }}
        >
          {t("body")}
        </p>
      </ScrollReveal>

      {/* ── Achievement cards — 3 columns + submit slot ── */}
      <div
        style={{
          display: "grid",
          gap: "1rem",
          maxWidth: "600px",
          marginBottom: "2rem",
        }}
        className="grid grid-cols-1 sm:grid-cols-3"
      >
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, y: 28, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.1 }}
          >
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 10px 32px rgba(0,0,0,0.3)" }}
              transition={{ duration: 0.2 }}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "14px",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                height: "100%",
              }}
            >
              {/* Avatar */}
              <InitialsAvatar initials={a.initials} size={52} />

              {/* Award */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#38BDF8",
                  lineHeight: 1.2,
                }}
              >
                {a.award}
              </p>

              {/* Name */}
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 400 }}>
                {a.name}
              </p>

              {/* Competition */}
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", fontWeight: 300, opacity: 0.60, lineHeight: 1.5 }}>
                {a.competition}
              </p>
            </motion.div>
          </motion.div>
        ))}

        {/* Submit achievement CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <motion.div
            whileHover={{ y: -4, background: "rgba(14,165,233,0.15)" }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(14,165,233,0.08)",
              border: "1px dashed rgba(14,165,233,0.30)",
              borderRadius: "14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "1.5rem 1.25rem",
              minHeight: "160px",
              cursor: "pointer",
              height: "100%",
            }}
          >
            <p style={{ fontSize: "1.6rem", marginBottom: "0.5rem", opacity: 0.6 }}>✦</p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                fontWeight: 400,
                opacity: 0.65,
                lineHeight: 1.6,
              }}
            >
              {t("submitAchievement")}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA */}
      <ScrollReveal delay={0.3}>
        <Link
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.875rem 2rem",
            borderRadius: "999px",
            fontSize: "0.9rem",
            fontWeight: 600,
            fontFamily: "var(--font-body)",
            textDecoration: "none",
            background: "#0EA5E9",
            color: "white",
            width: "fit-content",
          }}
        >
          {t("cta")} →
        </Link>
      </ScrollReveal>
    </section>
  );
}
