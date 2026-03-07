"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Section 1: Kurinci — Mountain — Union
 * Pure tinai landscape section. The spirit of union, belonging, and roots.
 * No stats, no founding story — those live in LandingHero.
 *
 * Scroll-reveal added (Framer Motion via ScrollReveal wrapper).
 * CTA added: "Enroll a child" — primary action for the mountain/union section.
 *
 * @see REQ-202603-001 — Landing page
 * @see D-007 — Strategic Tamil placement
 * @see D-013 — Framer Motion scroll-reveal
 */
export default function KurinciHero() {
  const t = useTranslations("kurinci");

  return (
    <section
      id="kurinci"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #0B3D2E 0%, #1A6B4A 40%, #0A2E1A 100%)",
      }}
      className="px-8 md:px-24 py-32"
    >
      {/* Mountain range watermark — background silhouette */}
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
          <path d="M0,600 L0,380 L80,260 L160,330 L280,160 L400,250 L520,100 L640,70 L760,140 L880,240 L1000,130 L1120,200 L1240,90 L1320,170 L1400,140 L1400,600 Z" />
        </svg>
      </div>

      {/* Right-side poem overlay — desktop only */}
      <div
        style={{
          position: "absolute",
          right: "6rem",
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "right",
        }}
        className="hidden lg:block"
        aria-hidden="true"
      >
        <p
          style={{
            fontFamily: "var(--font-tamil)",
            fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
            opacity: 0.38,
            lineHeight: 1.8,
          }}
        >
          குறிஞ்சி — மலை
          <br />
          ஒருமைப்பாடு
        </p>
      </div>

      {/* Tinai label — shadow backdrop */}
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
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              opacity: 0.75,
              fontFamily: "var(--font-body)",
              margin: 0,
            }}
          >
            {t("tinaiLabel")}
          </p>
          <p
            style={{
              fontFamily: "var(--font-tamil)",
              fontSize: "0.9rem",
              opacity: 0.8,
              margin: 0,
            }}
          >
            {t("tinaiTa")}
          </p>
        </div>
      </ScrollReveal>

      {/* Section heading */}
      <ScrollReveal delay={0.1}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 4.2vw, 3.8rem)",
            fontWeight: 700,
            fontStyle: "normal",
            lineHeight: 1.15,
            maxWidth: "600px",
            marginBottom: "1.5rem",
            color: "rgba(245,240,228,0.96)",
          }}
        >
          {t("heading")}
        </h2>
      </ScrollReveal>

      {/* Body */}
      <ScrollReveal delay={0.2}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "1.05rem",
            maxWidth: "520px",
            lineHeight: 1.85,
            opacity: 0.76,
            marginBottom: "2.5rem",
          }}
        >
          {t("body")}
        </p>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal delay={0.3}>
        <Link
          href="#mullai"
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
            background: "rgba(255,255,255,0.12)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.25)",
            width: "fit-content",
          }}
        >
          Explore our programs ↓
        </Link>
      </ScrollReveal>

      {/* Mountain silhouette — decorative bottom edge */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "#1A4A34",
          clipPath:
            "polygon(0 60%, 20% 20%, 40% 60%, 60% 10%, 80% 50%, 100% 30%, 100% 100%, 0 100%)",
        }}
      />
    </section>
  );
}
