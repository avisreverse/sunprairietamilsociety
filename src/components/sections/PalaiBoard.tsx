"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Section 5: Palai — Desert — Community Welcome / Board / Help Requests
 * Board member cards now use initial-based circular avatars (honest until
 * real photos and confirmed names are available — see BUILD_SUMMARY.md).
 * Help request chips kept — they add authentic community texture.
 * Final CTA: "Join the community" — page's ultimate call-to-action.
 * Scroll-reveal on all sub-sections.
 *
 * PLACEHOLDER NOTE: Names and roles below are not real.
 * Replace with confirmed board member data when available.
 *
 * @see REQ-202603-001 — About / board section
 * @see D-013 — Framer Motion scroll-reveal
 */

const BOARD_MEMBERS = [
  { role: "president"     as const, name: "Suresh Arunachalam",   initials: "SA" },
  { role: "vicePresident" as const, name: "Kavitha Venkataraman", initials: "KV" },
  { role: "secretary"     as const, name: "Mohan Gopalaswamy",    initials: "MG" },
] as const;

const HELP_REQUESTS = [
  "Tamil-speaking dentist near Sun Prairie?",
  "Rides to Sunday Tamil school from Madison",
  "First Wisconsin state tax filing help",
] as const;

/**
 * Circular avatar showing initials — gold letter on dark amber circle.
 * Used for board members until real photos are available.
 *
 * @param initials - Two-letter string (e.g. "SA")
 * @param size     - Diameter in px (default 48)
 */
function BoardAvatar({ initials, size = 48 }: { initials: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(212,147,10,0.20)",
        border: "1.5px solid rgba(212,147,10,0.38)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: size * 0.30,
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

export default function PalaiBoard() {
  const t = useTranslations("palai");

  return (
    <section
      id="palai"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #2E1800 0%, #8B4513 50%, #4A2A00 100%)",
      }}
      className="px-8 md:px-24 py-32"
    >
      {/* Desert dunes watermark */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", opacity: 0.06, pointerEvents: "none" }}
      >
        <svg viewBox="0 0 1400 600" fill="white" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "80%" }}>
          <path d="M0,600 L0,420 Q200,330 500,370 Q700,395 900,320 Q1100,250 1250,300 Q1340,330 1400,310 L1400,600 Z" />
          <path d="M0,600 L0,510 Q250,470 500,495 Q650,510 800,470 Q1000,430 1150,460 Q1300,485 1400,470 L1400,600 Z" />
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
            marginBottom: "1rem",
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

      {/* ── Board members ── */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        {BOARD_MEMBERS.map(({ role, name, initials }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.18 + i * 0.09 }}
          >
            <motion.div
              whileHover={{ y: -3, background: "rgba(255,255,255,0.12)" }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 1.25rem",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "14px",
              }}
            >
              <BoardAvatar initials={initials} size={48} />
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    opacity: 0.62,
                    marginBottom: "0.2rem",
                  }}
                >
                  {t(`board.${role}`)}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 400 }}>
                  {name}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Help requests ── */}
      <ScrollReveal delay={0.24}>
        <div style={{ marginBottom: "2rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              opacity: 0.46,
              marginBottom: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
            }}
          >
            {t("helpRequestsLabel")}
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {HELP_REQUESTS.map((req) => (
              <div
                key={req}
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "8px",
                  padding: "0.65rem 1rem",
                  fontSize: "0.78rem",
                  maxWidth: "210px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  lineHeight: 1.5,
                }}
              >
                {req}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Final CTA — page's primary action */}
      <ScrollReveal delay={0.3}>
        <Link
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.95rem 2.25rem",
            borderRadius: "999px",
            fontSize: "0.95rem",
            fontWeight: 600,
            fontFamily: "var(--font-body)",
            textDecoration: "none",
            background: "white",
            color: "#4A2A00",
            width: "fit-content",
          }}
        >
          {t("cta")} →
        </Link>
      </ScrollReveal>
    </section>
  );
}
