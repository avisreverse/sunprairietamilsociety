import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Section 4: Neytal — Sea — Stories / Achievements
 * Deep ocean blue gradient. 2×2 achievement card grid with photo placeholders.
 * Award text in sky blue (#38BDF8). Fourth card is a "submit achievement" CTA.
 * @see REQ-202603-001 — Achievements section
 */

const ACHIEVEMENTS = [
  {
    award: "1st Place",
    name: "Priya Krishnaswamy",
    competition: "Tamil Oratory · Senior Division",
  },
  {
    award: "Best Essay",
    name: "Arjun Ramalingam",
    competition: "National Tamil Youth Conference",
  },
  {
    award: "Gold Medal",
    name: "Kavitha & Sundari Balaji",
    competition: "Midwest Carnatic Festival",
  },
] as const;

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
        padding: "8rem 6rem",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(160deg, #0A1E3D 0%, #0A4A6B 50%, #051520 100%)",
      }}
      className="px-8 md:px-24"
    >
      {/* Ocean waves watermark — layered wave fills, bottom-anchored */}
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
          style={{ width: "100%", height: "85%" }}
        >
          {/* Deep swell — back */}
          <path d="M0,600 L0,310 C200,260 400,360 600,300 C800,240 1000,360 1200,290 C1300,255 1360,270 1400,260 L1400,600 Z" />
          {/* Mid wave */}
          <path d="M0,600 L0,420 C180,390 360,440 540,410 C720,380 900,430 1080,400 C1200,380 1300,405 1400,390 L1400,600 Z" />
          {/* Shore wave — front */}
          <path d="M0,600 L0,510 C175,495 350,520 525,505 C700,490 875,515 1050,500 C1175,490 1300,508 1400,500 L1400,600 Z" />
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

      {/* Body copy */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "1.05rem",
          maxWidth: "520px",
          lineHeight: 1.85,
          opacity: 0.82,
          marginBottom: "2rem",
        }}
      >
        {t("body")}
      </p>

      {/* Achievement cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          maxWidth: "520px",
        }}
        className="grid-cols-1 sm:grid-cols-2"
      >
        {ACHIEVEMENTS.map((a) => (
          <div
            key={a.name}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: 0,
              overflow: "hidden",
            }}
          >
            {/* Photo placeholder */}
            <div
              style={{
                width: "100%",
                height: "66px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.055)",
                border: "none",
                borderBottom: "1px dashed rgba(255,255,255,0.18)",
              }}
              aria-hidden="true"
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.5rem",
                  fontWeight: 300,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                }}
              >
                Photo
              </span>
            </div>
            <div style={{ padding: "1rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  fontStyle: "normal",
                  color: "#38BDF8",
                }}
              >
                {a.award}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  fontWeight: 400,
                  marginTop: "0.5rem",
                }}
              >
                {a.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  fontWeight: 300,
                  opacity: 0.65,
                  marginTop: "0.2rem",
                }}
              >
                {a.competition}
              </p>
            </div>
          </div>
        ))}

        {/* Submit achievement CTA card */}
        <div
          style={{
            background: "rgba(14,165,233,0.1)",
            border: "1px solid rgba(14,165,233,0.3)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            cursor: "pointer",
            padding: "1.25rem",
            minHeight: "120px",
          }}
        >
          <p
            style={{
              opacity: 0.6,
              fontSize: "0.85rem",
              fontFamily: "var(--font-body)",
              fontWeight: 300,
            }}
          >
            {t("submitAchievement")}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: "2rem" }}>
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
            background: "#0EA5E9",
            color: "white",
          }}
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
