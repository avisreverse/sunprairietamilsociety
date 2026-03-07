"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Section 2: Mullai — Forest — Programs / Learning
 * Redesigned from emoji pill links → card grid.
 * Each card: line-art SVG icon + Tamil name + English name + 2-line description.
 * Hover: card lifts 4px + gold left-border accent (Framer Motion whileHover).
 *
 * @see REQ-202603-001 — Programs section
 * @see D-013 — Framer Motion for hover + scroll-reveal
 */

/* ── Line-art program icons (32×32 viewBox, stroke-only) ── */
function SchoolIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <path d="M2,13 L16,7 L30,13 L16,19 Z" />
      <path d="M8,15.5 L8,23 Q16,27 24,23 L24,15.5" />
      <line x1="30" y1="13" x2="30" y2="22" />
      <circle cx="30" cy="23" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LibraryIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <path d="M16,6 Q10,8 6,10 L6,26 Q10,24 16,26 Q22,24 26,26 L26,10 Q22,8 16,6 Z" />
      <line x1="16" y1="6" x2="16" y2="26" />
      <path d="M10,14 Q13,13 16,14" />
      <path d="M10,18 Q13,17 16,18" />
      <path d="M16,14 Q19,13 22,14" />
      <path d="M16,18 Q19,17 22,18" />
    </svg>
  );
}

function PattaraiIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ width: 28, height: 28 }}>
      <circle cx="16" cy="16" r="2.5" />
      <circle cx="16" cy="6"  r="1.5" />
      <circle cx="16" cy="26" r="1.5" />
      <circle cx="6"  cy="16" r="1.5" />
      <circle cx="26" cy="16" r="1.5" />
      <circle cx="9"  cy="9"  r="1.5" />
      <circle cx="23" cy="9"  r="1.5" />
      <circle cx="9"  cy="23" r="1.5" />
      <circle cx="23" cy="23" r="1.5" />
      <path d="M16,13.5 L16,6 M16,18.5 L16,26 M13.5,16 L6,16 M18.5,16 L26,16" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <ellipse cx="9"  cy="23" rx="4" ry="3" transform="rotate(-15 9 23)" />
      <ellipse cx="22" cy="20" rx="4" ry="3" transform="rotate(-15 22 20)" />
      <path d="M13,22 L13,8 L26,5 L26,19" />
    </svg>
  );
}

function VolunteerIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <path d="M16,10 Q14,6 10,6 Q6,6 6,10 Q6,14 16,22 Q26,14 26,10 Q26,6 22,6 Q18,6 16,10 Z" />
      <path d="M10,25 L8,28" />
      <path d="M22,25 L24,28" />
      <path d="M6,22 Q10,27 16,27 Q22,27 26,22" />
    </svg>
  );
}

/* ── Program data — descriptions inline (not in i18n to avoid type changes) ── */
const PROGRAMS = [
  {
    key:  "school"    as const,
    Icon: SchoolIcon,
    href: "#",
    desc: "Weekly Sunday classes, K through High School. Tamil language, script, and classical literature.",
  },
  {
    key:  "library"   as const,
    Icon: LibraryIcon,
    href: "#",
    desc: "Tamil books, classics, and children's stories. Borrow, read, and explore.",
  },
  {
    key:  "pattarai"  as const,
    Icon: PattaraiIcon,
    href: "#",
    desc: "Arts, crafts, and cultural expression — a creative workshop for all ages.",
  },
  {
    key:  "music"     as const,
    Icon: MusicIcon,
    href: "#",
    desc: "Classical Carnatic music and South Indian arts tradition. All levels welcome.",
  },
  {
    key:  "volunteer" as const,
    Icon: VolunteerIcon,
    href: "#",
    desc: "Events, mentorship, and community outreach. Give your time, shape our community.",
  },
] as const;

export default function MullaiPrograms() {
  const t = useTranslations("mullai");

  return (
    <section
      id="mullai"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #3D2A0A 0%, #7A4F1A 40%, #5C3A0A 100%)",
      }}
      className="px-8 md:px-24 py-32"
    >
      {/* Forest silhouette watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          opacity: 0.06,
          pointerEvents: "none",
        }}
      >
        <svg
          viewBox="0 0 1400 600"
          fill="white"
          preserveAspectRatio="xMidYMid slice"
          style={{ width: "100%", height: "80%" }}
        >
          <path d="M0,600 L0,450 L40,450 L40,370 L20,370 L55,300 L30,300 L70,220 L90,200 L110,220 L150,300 L125,300 L160,370 L140,370 L140,450 L200,450 L200,350 L175,350 L220,260 L190,260 L240,160 L265,135 L290,160 L340,260 L310,260 L355,350 L330,350 L330,450 L400,450 L400,410 L385,410 L410,355 L390,355 L418,290 L440,270 L462,290 L490,355 L468,355 L496,410 L478,410 L478,450 L540,450 L540,350 L510,350 L565,230 L530,230 L590,110 L620,80 L650,110 L710,230 L675,230 L730,350 L700,350 L700,450 L775,450 L775,380 L755,380 L790,310 L765,310 L805,235 L830,210 L855,235 L895,310 L870,310 L905,380 L885,380 L885,450 L950,450 L950,360 L922,360 L978,240 L942,240 L1005,110 L1035,75 L1065,110 L1128,240 L1092,240 L1148,360 L1120,360 L1120,450 L1190,450 L1190,400 L1170,400 L1205,335 L1180,335 L1218,265 L1242,240 L1266,265 L1305,335 L1280,335 L1318,400 L1298,400 L1298,450 L1400,450 L1400,600 Z" />
        </svg>
      </div>

      {/* Right-side poem overlay — desktop only */}
      <div
        style={{ position: "absolute", right: "6rem", top: "50%", transform: "translateY(-50%)", textAlign: "right" }}
        className="hidden lg:block"
        aria-hidden="true"
      >
        <p style={{ fontFamily: "var(--font-tamil)", fontSize: "clamp(1rem,2.5vw,1.6rem)", opacity: 0.5, lineHeight: 1.8 }}>
          {t("poemTa")}
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontStyle: "normal", fontSize: "0.8rem", opacity: 0.4, marginTop: "0.75rem", maxWidth: "280px", marginLeft: "auto", lineHeight: 1.7 }}>
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
            marginBottom: "2rem",
            color: "rgba(245,240,228,0.96)",
          }}
        >
          {t("heading")}
        </h2>
      </ScrollReveal>

      {/* Programs card grid — 2 columns, staggered reveal */}
      <div
        style={{
          display: "grid",
          gap: "1rem",
          maxWidth: "600px",
          marginBottom: "2.5rem",
        }}
        className="grid grid-cols-1 sm:grid-cols-2"
      >
        {PROGRAMS.map(({ key, Icon, href, desc }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
          >
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                padding: "1.25rem",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "14px",
                cursor: "pointer",
                borderLeft: "2px solid rgba(212,147,10,0)",
                height: "100%",
              }}
              whileHover={{
                y: -4,
                borderLeftColor: "rgba(212,147,10,0.85)",
                boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
              }}
              transition={{ duration: 0.22 }}
            >
              <Link href={href} style={{ textDecoration: "none", color: "white", display: "flex", flexDirection: "column", gap: "0.75rem", height: "100%" }}>
                {/* Icon */}
                <div style={{ color: "rgba(212,147,10,0.85)" }}>
                  <Icon />
                </div>
                {/* Names */}
                <div>
                  <p style={{ fontFamily: "var(--font-tamil)", fontSize: "0.78rem", opacity: 0.6, marginBottom: "0.15rem" }}>
                    {t(`programs.${key}.ta`)}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", fontWeight: 600 }}>
                    {t(`programs.${key}.en`).split(" — ")[0].split(" · ")[0]}
                  </p>
                </div>
                {/* Description */}
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.78rem", lineHeight: 1.65, opacity: 0.62 }}>
                  {desc}
                </p>
                {/* Arrow */}
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#D4930A", marginTop: "auto", opacity: 0.75 }}>
                  Learn more →
                </p>
              </Link>
            </motion.div>
          </motion.div>
        ))}
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
            background: "#D4930A",
            color: "#3D2A0A",
            width: "fit-content",
          }}
        >
          {t("cta")}
        </Link>
      </ScrollReveal>
    </section>
  );
}
