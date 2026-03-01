"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Section 2: Mullai — Forest — Programs / Learning
 * Warm brown gradient. 5 program rows as pill links.
 * Right-side poem overlay (desktop only).
 * @see REQ-202603-001 — Programs section
 */

const PROGRAMS = [
  {
    key: "school" as const,
    icon: "🏫",
    href: "#",
  },
  {
    key: "library" as const,
    icon: "📚",
    href: "#",
  },
  {
    key: "pattarai" as const,
    icon: "🎨",
    href: "#",
  },
  {
    key: "music" as const,
    icon: "🎵",
    href: "#",
  },
  {
    key: "volunteer" as const,
    icon: "🤝",
    href: "#",
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
        padding: "8rem 6rem",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(160deg, #3D2A0A 0%, #7A4F1A 40%, #5C3A0A 100%)",
      }}
      className="px-8 md:px-24"
    >
      {/* Forest silhouette watermark — rows of trees, bottom-anchored */}
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
            opacity: 0.55,
            lineHeight: 1.8,
          }}
        >
          {t("poemTa")}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontStyle: "normal",
            fontSize: "0.8rem",
            opacity: 0.45,
            marginTop: "0.75rem",
            maxWidth: "280px",
            marginLeft: "auto",
            lineHeight: 1.7,
          }}
        >
          {t("poemEn")}
        </p>
      </div>

      {/* Tinai label — shadow backdrop for legibility */}
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignSelf: "flex-start",
          gap: "0.35rem",
          background: "rgba(0,0,0,0.28)",
          backdropFilter: "blur(6px)",
          borderRadius: "8px",
          padding: "0.6rem 1rem",
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

      {/* Heading */}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 4.2vw, 3.8rem)",
          fontWeight: 700,
          fontStyle: "normal",
          lineHeight: 1.15,
          maxWidth: "600px",
          marginBottom: "1.5rem",
          color: "rgba(245, 240, 228, 0.96)",
        }}
      >
        {t("heading")}
      </h2>

      {/* Programs list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginBottom: "2rem",
          maxWidth: "480px",
        }}
      >
        {PROGRAMS.map(({ key, icon, href }) => (
          <Link
            key={key}
            href={href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem 1.25rem",
              background: "rgba(255,255,255,0.07)",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "background 0.2s",
              textDecoration: "none",
              color: "white",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.12)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.07)")
            }
          >
            <span style={{ fontSize: "1.5rem" }} aria-hidden="true">
              {icon}
            </span>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-tamil)",
                  fontSize: "0.8rem",
                  opacity: 0.6,
                }}
              >
                {t(`programs.${key}.ta`)}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  fontWeight: 400,
                }}
              >
                {t(`programs.${key}.en`)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
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
          transition: "all 0.3s",
          background: "#D4930A",
          color: "#3D2A0A",
          width: "fit-content",
        }}
      >
        {t("cta")}
      </Link>
    </section>
  );
}
