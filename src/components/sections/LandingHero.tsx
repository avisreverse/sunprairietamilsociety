"use client";

import Link from "next/link";

/**
 * Section 0: Landing Hero — Organization identity.
 * The very first viewport. No tinai/landscape content here.
 * Contains everything unique to this section:
 *   - Society name (English + Tamil)
 *   - Location + founding year
 *   - The 2012 founding story (single source of truth)
 *   - Stats (single source of truth — not repeated in Kurinci)
 *   - Two CTAs
 *   - Community photo placeholder
 *   - Scroll invitation
 *
 * Background watermark: Thiruvalluvar (seated scholar) SVG silhouette.
 * The five tinai landscape sections begin after this.
 *
 * @see REQ-202603-001 — Landing page
 * @see D-007 — Strategic Tamil placement
 */
export default function LandingHero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8rem 6rem",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(150deg, #0A0F0C 0%, #111A14 50%, #080D0A 100%)",
        color: "white",
      }}
      className="px-8 md:px-24"
    >
      {/* Thiruvalluvar silhouette watermark — centred, very subtle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.055,
          pointerEvents: "none",
        }}
      >
        <svg
          viewBox="0 0 240 300"
          fill="white"
          style={{ width: "clamp(280px, 38vw, 560px)", height: "auto" }}
        >
          {/* Head */}
          <ellipse cx="120" cy="48" rx="30" ry="34" />
          {/* Beard */}
          <path d="M100,68 Q120,95 140,68 Q132,85 120,92 Q108,85 100,68 Z" />
          {/* Neck */}
          <rect x="113" y="80" width="14" height="14" rx="3" />
          {/* Body / draped robe */}
          <path d="M72,96 C52,108 44,155 48,210 L92,202 L92,96 Q106,90 120,88 Q134,90 148,96 L148,202 L192,210 C196,155 188,108 168,96 Q145,86 120,84 Q95,86 72,96 Z" />
          {/* Left arm extended, holding palm leaf */}
          <path d="M72,115 Q48,108 24,96 Q18,110 26,120 Q48,118 72,128 Z" />
          {/* Right arm extended, holding palm leaf */}
          <path d="M168,115 Q192,108 216,96 Q222,110 214,120 Q192,118 168,128 Z" />
          {/* Palm leaf — left */}
          <ellipse cx="16" cy="94" rx="18" ry="6" transform="rotate(-18 16 94)" />
          <line x1="8" y1="91" x2="34" y2="97" stroke="white" strokeWidth="1.5" />
          <line x1="10" y1="95" x2="32" y2="93" stroke="white" strokeWidth="1" />
          {/* Palm leaf — right */}
          <ellipse cx="224" cy="94" rx="18" ry="6" transform="rotate(18 224 94)" />
          <line x1="210" y1="91" x2="238" y2="97" stroke="white" strokeWidth="1.5" />
          <line x1="212" y1="95" x2="236" y2="93" stroke="white" strokeWidth="1" />
          {/* Legs in lotus position */}
          <path d="M52,208 Q38,232 44,256 Q80,264 120,266 Q160,264 196,256 Q202,232 188,208 Q160,222 120,226 Q80,222 52,208 Z" />
          {/* Dhoti drape folds — subtle lines */}
          <path d="M92,140 Q106,160 92,185" stroke="white" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M148,140 Q134,160 148,185" stroke="white" strokeWidth="1.2" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(212,147,10,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(27,94,59,0.07) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Right-side community photo placeholder */}
      <div
        style={{
          position: "absolute",
          right: "5vw",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(200px, 22vw, 320px)",
          aspectRatio: "4/5",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(255,255,255,0.03)",
          border: "1px dashed rgba(255,255,255,0.12)",
          overflow: "hidden",
        }}
        className="hidden lg:flex"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.55rem",
            fontWeight: 300,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.18)",
            textAlign: "center",
            lineHeight: 1.7,
            padding: "2.5rem 1rem 0",
          }}
        >
          Community
          <br />
          Photo
        </span>
        <div
          style={{
            padding: "1rem 1.25rem",
            width: "100%",
            background: "rgba(0,0,0,0.25)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-tamil)",
              fontSize: "0.82rem",
              color: "#D4930A",
              opacity: 0.55,
            }}
          >
            சன் ப்ரேரி தமிழ்ச் சமூகம்
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: "580px", position: "relative", zIndex: 1 }}>

        {/* Location + founding year */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            fontWeight: 300,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "1.5rem",
          }}
        >
          Sun Prairie, Wisconsin &nbsp;·&nbsp; Est. 2012
        </p>

        {/* Society name */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
            fontWeight: 700,
            fontStyle: "normal",
            lineHeight: 1.05,
            color: "rgba(245, 240, 228, 0.97)",
            margin: "0 0 0.5rem 0",
          }}
        >
          Sun Prairie
          <br />
          Tamil Society
        </h1>

        {/* Tamil name */}
        <p
          style={{
            fontFamily: "var(--font-tamil)",
            fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
            color: "#D4930A",
            letterSpacing: "0.05em",
            marginBottom: "1.75rem",
          }}
        >
          சன் ப்ரேரி தமிழ்ச் சமூகம்
        </p>

        {/* Gold divider */}
        <div
          style={{
            width: "48px",
            height: "2px",
            background: "#D4930A",
            borderRadius: "2px",
            marginBottom: "1.75rem",
          }}
        />

        {/* Founding story — single source of truth, not repeated in Kurinci */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "1.05rem",
            lineHeight: 1.85,
            color: "rgba(245, 240, 228, 0.7)",
            marginBottom: "2.5rem",
          }}
        >
          In 2012, Tamil families in Sun Prairie asked a shared question:
          how do we give our children the language, the culture, and the
          belonging we carry in our hearts? Today, SPTS is that answer —
          a home for Tamil culture, alive in Wisconsin.
        </p>

        {/* Stats strip — single source of truth, not repeated in Kurinci */}
        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            paddingTop: "1.75rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "120+", label: "Students" },
            { num: "12", label: "Years" },
            { num: "5", label: "Programs" },
            { num: "1", label: "Community" },
          ].map(({ num, label }) => (
            <div key={label}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.8rem",
                  fontWeight: 400,
                  color: "rgba(245,240,228,0.95)",
                  lineHeight: 1,
                }}
              >
                {num}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginTop: "0.4rem",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            href="#palai"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.875rem 1.75rem",
              borderRadius: "999px",
              fontSize: "0.88rem",
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              textDecoration: "none",
              background: "white",
              color: "#0A0F0C",
              letterSpacing: "0.02em",
            }}
          >
            Join the Society
          </Link>
          <Link
            href="#kurinci"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.875rem 1.75rem",
              borderRadius: "999px",
              fontSize: "0.88rem",
              fontWeight: 400,
              fontFamily: "var(--font-body)",
              textDecoration: "none",
              color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            Explore five landscapes ↓
          </Link>
        </div>
      </div>

      {/* Scroll invitation */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          opacity: 0.35,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.62rem",
            fontWeight: 300,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Scroll through five Tamil landscapes
        </p>
        <span className="animate-bounce-hint" style={{ fontSize: "0.9rem" }}>↓</span>
      </div>
    </section>
  );
}
