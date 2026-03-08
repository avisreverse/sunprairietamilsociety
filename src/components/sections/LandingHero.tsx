"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import KuralStrip from "./KuralStrip";

/**
 * Section 0: Landing Hero — Design D: Warm Cultural.
 *
 * Visual concept: Tamil script as the dominant hero artwork.
 * "தமிழ்ச் சமூகம்" fills the viewport as a gold gradient typographic sculpture.
 * English headline overlays the Tamil text at center.
 * Parchment (#FDF8F0) background — warm, grounded, cultural.
 *
 * No Thiruvalluvar illustration. No Kolam ring. Typography IS the art.
 *
 * Layout:
 *   1. Overline: location + founding year
 *   2. Tamil art block: giant gold-gradient Tamil text + English overlay
 *   3. Diamond horizontal rule
 *   4. Three-column footer: story | CTA | stats
 *
 * @see REQ-202603-001 — Landing page
 * @see D-007 — Strategic Tamil placement
 * @see D-013 — Framer Motion
 */

const EASE = [0.22, 1, 0.36, 1] as const;

interface HeroContent {
  story: string;
  year: string;
  tagline: string;
  subtext: string;
}

interface Props {
  heroContent: HeroContent;
}

export default function LandingHero({ heroContent }: Props) {
  return (
    <section
      id="hero"
      style={{
        background: "linear-gradient(180deg, #FDF8F0 0%, #FAF3E4 100%)",
        paddingTop: "8.5rem",
        paddingBottom: 0,
        overflow: "hidden",
        position: "relative",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          flex: 1,
          overflow: "hidden",
        }}
        className="px-6 md:px-14"
      >

        {/* ── Overline ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            display: "flex", alignItems: "center", gap: "1.25rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ width: "32px", height: "1px", background: "#B8750A" }} />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.68rem", fontWeight: 400,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(26,20,16,0.45)",
            }}
          >
            Sun Prairie, Wisconsin &nbsp;·&nbsp; Est. {heroContent.year}
          </span>
        </motion.div>

        {/* ── Tamil art block ── */}
        <div style={{ position: "relative", textAlign: "center", paddingBottom: "0.5rem" }}>

          {/* Giant Tamil script — the visual hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-tamil)",
              fontSize: "clamp(3.5rem, 10vw, 10rem)",
              fontWeight: 700,
              lineHeight: 1.18,
              letterSpacing: "0.04em",
              background: "linear-gradient(180deg, rgba(184,117,10,0.88) 0%, rgba(184,117,10,0.28) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            தமிழ்ச் சமூகம்
          </motion.div>

          {/* English headline overlaid at center */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.35 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 3.2vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "#1A1410",
                textAlign: "center",
              }}
            >
              Sun Prairie<br />
              <strong style={{ fontWeight: 900 }}>Tamil Society</strong>
            </h1>

            <div
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                marginTop: "0.85rem",
              }}
            >
              <div style={{ width: "20px", height: "1px", background: "rgba(26,20,16,0.35)" }} />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.68rem", fontWeight: 400,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(26,20,16,0.45)",
                }}
              >
                Sun Prairie · Wisconsin · Est. {heroContent.year}
              </span>
              <div style={{ width: "20px", height: "1px", background: "rgba(26,20,16,0.35)" }} />
            </div>
          </motion.div>
        </div>

        {/* ── Diamond rule ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
          style={{
            display: "flex", alignItems: "center", gap: "1.5rem",
            margin: "1.25rem 0",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "rgba(26,20,16,0.1)" }} />
          <div
            style={{
              width: "6px", height: "6px",
              background: "#B8750A",
              transform: "rotate(45deg)", flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, height: "1px", background: "rgba(26,20,16,0.1)" }} />
        </motion.div>

        {/* ── Three-column footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "3rem",
            alignItems: "center",
            padding: "2rem 0 3.5rem",
          }}
          className="spts-hero-footer"
        >
          {/* Left: story text — editable from /admin/home */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.85,
              color: "#4A3828",
              maxWidth: "380px",
            }}
          >
            {heroContent.story}
          </p>

          {/* Center: CTAs */}
          <div
            style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: "0.75rem",
              textAlign: "center",
            }}
          >
            <Link
              href="#palai"
              style={{
                display: "inline-block",
                padding: "1rem 2.5rem", borderRadius: "999px",
                background: "#7A1515", color: "white",
                fontFamily: "var(--font-body)",
                fontSize: "0.88rem", fontWeight: 500,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: "0 4px 20px rgba(122,21,21,0.22)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(122,21,21,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(122,21,21,0.22)";
              }}
            >
              Join the Society
            </Link>
            <a
              href="#mullai"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem", fontWeight: 400,
                color: "rgba(26,20,16,0.45)",
                textDecoration: "none", display: "flex",
                alignItems: "center", gap: "0.3rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#1A1410")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(26,20,16,0.45)")}
            >
              Explore programs ↓
            </a>
          </div>

          {/* Right: stats — editable from /admin/home */}
          <div
            className="spts-hero-footer-right"
            style={{
              textAlign: "right",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem", fontWeight: 300,
              color: "rgba(26,20,16,0.5)",
              lineHeight: 1.9,
            }}
          >
            <strong
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "2.2rem", fontWeight: 700,
                color: "#1A1410", lineHeight: 1,
                marginBottom: "0.25rem",
              }}
            >
              {heroContent.year}
            </strong>
            {heroContent.tagline}<br />
            {heroContent.subtext}
          </div>
        </motion.div>
      </div>

      {/* Thirukkural strip — compact rotating verse, embedded at hero bottom */}
      <KuralStrip />
    </section>
  );
}
