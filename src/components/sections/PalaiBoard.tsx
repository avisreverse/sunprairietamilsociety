import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Section 5: Palai — Desert — Welcome / Board / Volunteer
 * Deep sienna/brown gradient. Board cards with circle photo placeholders.
 * Help request chips below board. CTA: "Join the community".
 * @see REQ-202603-001 — About / board section
 */

const BOARD_MEMBERS = [
  { role: "president" as const, name: "Suresh Arunachalam" },
  { role: "vicePresident" as const, name: "Kavitha Venkataraman" },
  { role: "secretary" as const, name: "Mohan Gopalaswamy" },
] as const;

const HELP_REQUESTS = [
  "Tamil-speaking dentist near Sun Prairie?",
  "Rides to Sunday Tamil school from Madison",
  "First Wisconsin state tax filing help",
] as const;

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
        padding: "8rem 6rem",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(160deg, #2E1800 0%, #8B4513 50%, #4A2A00 100%)",
      }}
      className="px-8 md:px-24"
    >
      {/* Desert dunes watermark — smooth undulating dune fills, bottom-anchored */}
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
          {/* Far dune ridge — tallest */}
          <path d="M0,600 L0,420 Q200,330 500,370 Q700,395 900,320 Q1100,250 1250,300 Q1340,330 1400,310 L1400,600 Z" />
          {/* Mid dune — softer curve */}
          <path d="M0,600 L0,510 Q250,470 500,495 Q650,510 800,470 Q1000,430 1150,460 Q1300,485 1400,470 L1400,600 Z" />
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

      {/* Board members */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        {BOARD_MEMBERS.map(({ role, name }) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem 1.5rem",
              background: "rgba(255,255,255,0.07)",
              borderRadius: "12px",
            }}
          >
            {/* Circle photo placeholder */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: "rgba(255,255,255,0.055)",
                border: "1px dashed rgba(255,255,255,0.18)",
              }}
              aria-hidden="true"
            />
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  opacity: 0.7,
                }}
              >
                {t(`board.${role}`)}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  fontWeight: 400,
                }}
              >
                {name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Help requests */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p
          style={{
            fontSize: "0.78rem",
            opacity: 0.5,
            marginBottom: "0.75rem",
            letterSpacing: "0.1em",
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
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                padding: "0.6rem 1rem",
                fontSize: "0.78rem",
                maxWidth: "200px",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
              }}
            >
              {req}
            </div>
          ))}
        </div>
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
          background: "white",
          color: "#4A2A00",
          width: "fit-content",
        }}
      >
        {t("cta")}
      </Link>
    </section>
  );
}
