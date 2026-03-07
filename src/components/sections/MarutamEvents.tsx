"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Section 3: Marutam — Field — Events / Celebration
 * Redesigned from plain date-list → featured hero event + smaller secondary list.
 * Featured event: full-width card, large date, prominent RSVP.
 * Secondary events: compact rows beneath, staggered scroll-reveal.
 *
 * @see REQ-202603-001 — Events section
 * @see D-013 — Framer Motion scroll-reveal + entrance
 */

const EVENTS = [
  {
    day: "13",
    month: "Apr",
    year: "2026",
    titleTa: "தமிழ் புத்தாண்டு",
    titleEn: "Tamil New Year Celebration",
    location: "Sun Prairie Community Center",
    rsvpLabel: "rsvp" as const,
    featured: true,
  },
  {
    day: "03",
    month: "May",
    year: "2026",
    titleTa: "கலை விழா",
    titleEn: "Annual Arts & Culture Festival",
    location: "Whitehorse Auditorium",
    rsvpLabel: "rsvp" as const,
    featured: false,
  },
  {
    day: "01",
    month: "Nov",
    year: "2026",
    titleTa: "கார்த்திகை விளக்கு",
    titleEn: "Karthigai Deepam — Festival of Lights",
    location: "Announcing Soon",
    rsvpLabel: "notify" as const,
    featured: false,
  },
] as const;

export default function MarutamEvents() {
  const t = useTranslations("marutam");

  const featured = EVENTS[0];
  const secondary = EVENTS.slice(1);

  return (
    <section
      id="marutam"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #4A2A00 0%, #B36200 40%, #8A4800 100%)",
      }}
      className="px-8 md:px-24 py-32"
    >
      {/* Paddy field watermark */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", opacity: 0.06, pointerEvents: "none" }}
      >
        <svg viewBox="0 0 1400 600" fill="white" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "80%" }}>
          <path d="M0,600 L0,360 Q175,310 350,360 Q525,410 700,360 Q875,310 1050,360 Q1225,410 1400,360 L1400,600 Z" />
          <path d="M0,600 L0,460 Q175,430 350,460 Q525,490 700,460 Q875,430 1050,460 Q1225,490 1400,460 L1400,600 Z" />
        </svg>
      </div>

      {/* Right-side poem overlay */}
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

      {/* ── Featured event card ── */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
        style={{ maxWidth: "560px", marginBottom: "1rem" }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.16)",
            borderLeft: "3px solid #D4930A",
            borderRadius: "16px",
            padding: "1.75rem",
            display: "flex",
            gap: "1.75rem",
            alignItems: "flex-start",
          }}
        >
          {/* Large date block */}
          <div style={{ textAlign: "center", minWidth: "64px", flexShrink: 0 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "3rem", fontWeight: 600, lineHeight: 1, color: "#D4930A" }}>
              {featured.day}
            </p>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.65, marginTop: "0.2rem" }}>
              {featured.month} {featured.year}
            </p>
          </div>

          {/* Event info */}
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "var(--font-tamil)", fontSize: "0.88rem", opacity: 0.65, marginBottom: "0.3rem" }}>
              {featured.titleTa}
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, fontStyle: "normal", marginBottom: "0.5rem", lineHeight: 1.2 }}>
              {featured.titleEn}
            </p>
            <p style={{ fontSize: "0.82rem", opacity: 0.60, marginBottom: "1.25rem" }}>
              📍 {featured.location}
            </p>
            <Link
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.6rem 1.5rem",
                borderRadius: "999px",
                fontSize: "0.82rem",
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                textDecoration: "none",
                background: "#D4930A",
                color: "#2A1500",
                letterSpacing: "0.03em",
              }}
            >
              {t(featured.rsvpLabel)} →
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── Secondary events list ── */}
      <div style={{ maxWidth: "560px", marginBottom: "2.5rem" }}>
        {secondary.map((event, i) => (
          <motion.div
            key={event.titleEn}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.22 + i * 0.10 }}
            style={{
              padding: "1rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.09)",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            {/* Compact date */}
            <div style={{ textAlign: "center", minWidth: "48px", flexShrink: 0 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.5rem", fontWeight: 600, lineHeight: 1 }}>
                {event.day}
              </p>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.50 }}>
                {event.month}
              </p>
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "var(--font-tamil)", fontSize: "0.78rem", opacity: 0.58, marginBottom: "0.15rem" }}>
                {event.titleTa}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", fontWeight: 400 }}>
                {event.titleEn}
              </p>
              <p style={{ fontSize: "0.75rem", opacity: 0.55, marginTop: "0.15rem" }}>
                📍 {event.location}
              </p>
            </div>

            {/* RSVP pill */}
            <Link
              href="#"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.68rem",
                fontWeight: 400,
                color: "#D4930A",
                textDecoration: "none",
                padding: "0.3rem 0.85rem",
                border: "1px solid rgba(212,147,10,0.38)",
                borderRadius: "999px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {t(event.rsvpLabel)}
            </Link>
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
            background: "rgba(255,255,255,0.14)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.28)",
            width: "fit-content",
          }}
        >
          {t("cta")} →
        </Link>
      </ScrollReveal>
    </section>
  );
}
