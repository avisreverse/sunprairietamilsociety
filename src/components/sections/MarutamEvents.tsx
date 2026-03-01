import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Section 3: Marutam — Field — Events / Celebration
 * Deep amber gradient. Event list with date column, thumbnail placeholder, RSVP link.
 * @see REQ-202603-001 — Events section
 */

const EVENTS = [
  {
    day: "13",
    month: "Apr",
    titleTa: "தமிழ் புத்தாண்டு",
    titleEn: "Tamil New Year Celebration",
    location: "Sun Prairie Community Center",
    rsvpLabel: "rsvp" as const,
  },
  {
    day: "03",
    month: "May",
    titleTa: "கலை விழா",
    titleEn: "Annual Arts & Culture Festival",
    location: "Whitehorse Auditorium",
    rsvpLabel: "rsvp" as const,
  },
  {
    day: "01",
    month: "Nov",
    titleTa: "கார்த்திகை விளக்கு",
    titleEn: "Karthigai Deepam — Festival of Lights",
    location: "Announcing Soon",
    rsvpLabel: "notify" as const,
  },
] as const;

export default function MarutamEvents() {
  const t = useTranslations("marutam");

  return (
    <section
      id="marutam"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8rem 6rem",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(160deg, #4A2A00 0%, #B36200 40%, #8A4800 100%)",
      }}
      className="px-8 md:px-24"
    >
      {/* Paddy field watermark — rolling waves of grain, bottom-anchored */}
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
          {/* Far-field rolling ground layer */}
          <path d="M0,600 L0,360 Q175,310 350,360 Q525,410 700,360 Q875,310 1050,360 Q1225,410 1400,360 L1400,600 Z" />
          {/* Mid-field stalks row — a second undulating fill */}
          <path d="M0,600 L0,460 Q175,430 350,460 Q525,490 700,460 Q875,430 1050,460 Q1225,490 1400,460 L1400,600 Z" />
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

      {/* Events list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          maxWidth: "520px",
        }}
      >
        {EVENTS.map((event) => (
          <div
            key={event.titleEn}
            style={{
              padding: "1.25rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "flex-start",
              gap: "2rem",
            }}
          >
            {/* Thumbnail placeholder */}
            <div
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "8px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.055)",
                border: "1px dashed rgba(255,255,255,0.18)",
              }}
              aria-hidden="true"
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.5rem",
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                  textAlign: "center",
                }}
              >
                Photo
              </span>
            </div>

            {/* Date column */}
            <div style={{ textAlign: "center", minWidth: "50px" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.7rem",
                  fontWeight: 600,
                  fontStyle: "normal",
                  lineHeight: 1,
                }}
              >
                {event.day}
              </p>
              <p
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: 0.55,
                }}
              >
                {event.month}
              </p>
            </div>

            {/* Event info */}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily: "var(--font-tamil)",
                  fontSize: "0.82rem",
                  opacity: 0.6,
                  marginBottom: "0.2rem",
                }}
              >
                {event.titleTa}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 400,
                  marginBottom: "0.25rem",
                }}
              >
                {event.titleEn}
              </p>
              <p style={{ fontSize: "0.8rem", opacity: 0.62 }}>
                📍 {event.location}
              </p>
            </div>

            {/* RSVP */}
            <Link
              href="#"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                fontWeight: 400,
                color: "#D4930A",
                textDecoration: "none",
                padding: "0.3rem 0.75rem",
                border: "1px solid rgba(212,147,10,0.4)",
                borderRadius: "999px",
                transition: "all 0.2s",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                alignSelf: "center",
              }}
            >
              {t(event.rsvpLabel)}
            </Link>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: "2.5rem" }}>
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
            background: "rgba(255,255,255,0.15)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
