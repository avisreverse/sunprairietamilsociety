"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Section 0: Landing Hero — complete visual rebuild.
 *
 * Layout: split grid on desktop (text left | illustration right).
 * Mobile: single column, Thiruvalluvar as atmospheric backdrop.
 *
 * Key design decisions:
 * - No fake/small stats. Identity pillars replace numbers (Est. 2012, 5 Programs, etc.)
 * - Thiruvalluvar illustration: gold-tinted, detailed, right column — commanding presence.
 * - Animated Kolam ring orbits the Thiruvalluvar (CSS stroke-dasharray draw-in).
 * - Kolam dot-grid background texture at 2.5% opacity.
 * - Framer Motion cinematic entrance: each text element staggers in on mount.
 * - Mobile: illustration becomes atmospheric background at 7% opacity.
 *
 * @see REQ-202603-001 — Landing page
 * @see D-007 — Strategic Tamil placement (no full i18n, English primary)
 * @see D-013 — Framer Motion for animations
 */

/** Apple/Linear-style spring easing */
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Identity pillars — replaces fake student/year counts.
 * All four values are factually accurate for SPTS.
 */
const PILLARS = [
  { value: "Est. 2012", label: "Founded" },
  { value: "5",         label: "Programs" },
  { value: "Sun Prairie", label: "Wisconsin" },
  { value: "Tamil",    label: "Heritage" },
] as const;

/* ─────────────────────────────────────────────────────────────────────────────
   Sub-components — defined here, used only in this file
───────────────────────────────────────────────────────────────────────────── */

/**
 * Detailed Thiruvalluvar SVG illustration.
 * Classical Tamil scholar seated in padmasana, holding palm-leaf manuscript (olai).
 * Two-tone: white for the main figure, gold (#D4930A) for nimbus, ornaments, palm leaf.
 * Opacities are set per-element so gold reads slightly warmer than the body.
 */
function ThiruvalluvarIllustration() {
  return (
    <svg
      viewBox="0 0 280 420"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    >
      {/* ── Gold accent layer: halo, ornaments, palm leaf ── */}
      <g>
        {/* Nimbus / halo ring */}
        <circle cx="140" cy="72" r="54" fill="none" stroke="#D4930A" strokeWidth="2.0" opacity="0.60" />
        {/* 7 small ornamental dots on halo at 45° intervals (bottom omitted — hidden by body) */}
        <polygon points="140,14 143.2,18 140,22 136.8,18" fill="#D4930A" opacity="0.70" />
        <circle cx="178" cy="34"  r="2.8" fill="#D4930A" opacity="0.58" />
        <circle cx="194" cy="72"  r="2.8" fill="#D4930A" opacity="0.58" />
        <circle cx="178" cy="110" r="2.8" fill="#D4930A" opacity="0.58" />
        <circle cx="86"  cy="72"  r="2.8" fill="#D4930A" opacity="0.58" />
        <circle cx="102" cy="34"  r="2.8" fill="#D4930A" opacity="0.58" />
        {/* Ear ornaments */}
        <circle cx="111" cy="80" r="5.5" fill="#D4930A" opacity="0.48" />
        <circle cx="169" cy="80" r="5.5" fill="#D4930A" opacity="0.48" />
        {/* Necklace */}
        <path d="M122,135 Q140,151 158,135" fill="none" stroke="#D4930A" strokeWidth="1.6" opacity="0.50" />
        <circle cx="140" cy="151" r="3.5" fill="#D4930A" opacity="0.50" />
        {/* Palm-leaf (olai) manuscript in right hand — tilted ~22° */}
        <ellipse cx="252" cy="238" rx="27" ry="9" transform="rotate(22 252 238)" fill="#D4930A" opacity="0.45" />
        {/* Three text-lines on the olai */}
        <line x1="234" y1="228" x2="266" y2="238" stroke="white" strokeWidth="0.9" opacity="0.20" />
        <line x1="234" y1="234" x2="266" y2="244" stroke="white" strokeWidth="0.9" opacity="0.20" />
        <line x1="234" y1="240" x2="266" y2="250" stroke="white" strokeWidth="0.9" opacity="0.20" />
      </g>

      {/* ── White main figure — low opacity for ethereal, translucent look ── */}
      <g fill="white">
        {/* Topknot / hair bun */}
        <path d="M126,50 Q132,36 140,40 Q148,36 154,50 Q150,64 140,67 Q130,64 126,50 Z" opacity="0.22" />
        {/* Head */}
        <ellipse cx="140" cy="76" rx="30" ry="36" opacity="0.20" />
        {/* Neck */}
        <rect x="133" y="110" width="14" height="18" rx="4" opacity="0.18" />
        {/* Angavastram — shoulder drape cloth */}
        <path
          d="M80,132 Q108,120 140,124 Q172,120 200,132
             Q194,147 166,141 Q151,137 140,139
             Q129,137 114,141 Q86,147 80,132 Z"
          opacity="0.16"
        />
        {/* Main robe / torso body */}
        <path
          d="M80,132 Q68,168 66,220 Q64,274 60,318
             Q98,344 140,350 Q182,344 220,318
             Q216,274 214,220 Q212,168 200,132
             Q174,122 140,120 Q106,122 80,132 Z"
          opacity="0.18"
        />
        {/* Left arm */}
        <path
          d="M80,132 Q60,160 46,196 Q40,218 42,230
             Q54,233 62,222 Q70,208 78,182 Q86,160 84,140 Z"
          opacity="0.16"
        />
        {/* Left hand */}
        <path d="M42,230 Q36,242 40,252 Q48,257 58,251 Q64,240 62,222 Q52,224 42,230 Z" opacity="0.14" />
        {/* Right arm */}
        <path
          d="M200,132 Q220,160 234,196 Q240,218 238,230
             Q226,233 218,222 Q210,208 202,182 Q194,160 196,140 Z"
          opacity="0.16"
        />
        {/* Right hand */}
        <path d="M238,230 Q244,242 240,252 Q232,257 222,251 Q216,240 218,222 Q228,224 238,230 Z" opacity="0.14" />
        {/* Lotus-position legs — padmasana */}
        <path
          d="M60,318 Q84,294 112,308 Q128,318 140,322
             Q152,318 168,308 Q196,294 220,318
             Q205,350 140,358 Q75,350 60,318 Z"
          opacity="0.17"
        />
        {/* Left foot */}
        <path
          d="M60,318 Q48,332 52,350 Q70,364 88,356
             Q98,342 88,322 Q76,312 60,318 Z"
          opacity="0.13"
        />
        {/* Right foot */}
        <path
          d="M220,318 Q232,332 228,350 Q210,364 192,356
             Q182,342 192,322 Q204,312 220,318 Z"
          opacity="0.13"
        />
      </g>

      {/* ── Fabric fold detail strokes — slightly more visible now that fill is lighter ── */}
      <g fill="none" stroke="white" strokeLinecap="round">
        <path d="M90,186 Q114,198 140,194 Q166,190 190,186" strokeWidth="1.0" opacity="0.18" />
        <path d="M86,224 Q112,234 140,230 Q168,226 194,224" strokeWidth="1.0" opacity="0.18" />
        <path d="M82,264 Q110,272 140,268 Q170,264 198,264" strokeWidth="1.0" opacity="0.18" />
        <path d="M76,300 Q106,308 140,304 Q174,300 204,300" strokeWidth="1.0" opacity="0.18" />
        <path d="M84,160 Q100,167 118,163"                  strokeWidth="0.9" opacity="0.15" />
        <path d="M196,160 Q180,167 162,163"                 strokeWidth="0.9" opacity="0.15" />
        <path d="M202,165 Q224,175 235,194"                 strokeWidth="0.9" opacity="0.13" />
      </g>
    </svg>
  );
}

/**
 * Animated Kolam ring — three concentric SVG rings with evenly-spaced dot ornaments.
 * Rings draw themselves in using CSS stroke-dashoffset animation (see globals.css).
 * Circumferences: outer r=240 → 1508, mid r=192 → 1207, inner r=144 → 905.
 * Center: 8-pointed star in the Tamil geometric tradition.
 */
function KolamRing() {
  // Outer ring dots: 16 equally spaced at r=240 from center (270,270)
  const outerDots = Array.from({ length: 16 }, (_, i) => {
    const a = ((i * 360) / 16 - 90) * (Math.PI / 180);
    return { x: 270 + 240 * Math.cos(a), y: 270 + 240 * Math.sin(a) };
  });
  // Mid ring dots: 12 at r=192
  const midDots = Array.from({ length: 12 }, (_, i) => {
    const a = ((i * 360) / 12 - 90) * (Math.PI / 180);
    return { x: 270 + 192 * Math.cos(a), y: 270 + 192 * Math.sin(a) };
  });
  // Inner ring dots: 8 at r=144
  const innerDots = Array.from({ length: 8 }, (_, i) => {
    const a = ((i * 360) / 8 - 90) * (Math.PI / 180);
    return { x: 270 + 144 * Math.cos(a), y: 270 + 144 * Math.sin(a) };
  });

  return (
    <svg
      viewBox="0 0 540 540"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <g opacity="0.22">
        {/* Outer ring — draws in via .kolam-ring-outer CSS animation */}
        <circle
          cx="270" cy="270" r="240"
          fill="none" stroke="#D4930A" strokeWidth="0.8"
          className="kolam-ring-outer"
        />
        {outerDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="3.2" fill="#D4930A" opacity="0.75" />
        ))}

        {/* Mid ring */}
        <circle
          cx="270" cy="270" r="192"
          fill="none" stroke="#D4930A" strokeWidth="0.6"
          className="kolam-ring-mid"
        />
        {midDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="2.4" fill="#D4930A" opacity="0.65" />
        ))}

        {/* Inner ring */}
        <circle
          cx="270" cy="270" r="144"
          fill="none" stroke="#D4930A" strokeWidth="0.4"
          className="kolam-ring-inner"
        />
        {innerDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="1.9" fill="#D4930A" opacity="0.60" />
        ))}

        {/* Center 8-pointed star — Tamil geometric tradition */}
        <path
          d="M270,198 L283.8,236.8 L320.9,219.1 L303.3,256.2
             L342,270   L303.3,283.8 L320.9,320.9 L283.8,303.2
             L270,342   L256.2,303.2 L219.1,320.9 L236.7,283.8
             L198,270   L236.7,256.2 L219.1,219.1 L256.2,236.8 Z"
          fill="none"
          stroke="#D4930A"
          strokeWidth="0.7"
          opacity="0.45"
        />
      </g>
    </svg>
  );
}

/**
 * Very subtle kolam dot-grid texture — repeating 3×3 dot pattern with
 * connecting curves at 2.5% opacity. Creates depth without distraction.
 */
function KolamBackgroundTexture() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.025,
      }}
    >
      <defs>
        <pattern id="kolam-bg" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1.2" fill="white" />
          <circle cx="30" cy="10" r="1.2" fill="white" />
          <circle cx="50" cy="10" r="1.2" fill="white" />
          <circle cx="10" cy="30" r="1.2" fill="white" />
          <circle cx="30" cy="30" r="1.2" fill="white" />
          <circle cx="50" cy="30" r="1.2" fill="white" />
          <circle cx="10" cy="50" r="1.2" fill="white" />
          <circle cx="30" cy="50" r="1.2" fill="white" />
          <circle cx="50" cy="50" r="1.2" fill="white" />
          <path d="M10,10 Q20,20 30,10 Q40,0 50,10"  fill="none" stroke="white" strokeWidth="0.4" />
          <path d="M10,30 Q20,20 30,30 Q40,40 50,30"  fill="none" stroke="white" strokeWidth="0.4" />
          <path d="M10,10 Q0,20 10,30 Q20,40 10,50"   fill="none" stroke="white" strokeWidth="0.4" />
          <path d="M30,10 Q40,20 30,30 Q20,40 30,50"  fill="none" stroke="white" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kolam-bg)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────────────────── */

export default function LandingHero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(150deg, #0A0F0C 0%, #111A14 50%, #080D0A 100%)",
        color: "white",
      }}
    >
      {/* Kolam dot-grid background */}
      <KolamBackgroundTexture />

      {/* Ambient radial glows */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "radial-gradient(circle at 18% 55%, rgba(212,147,10,0.05) 0%, transparent 48%)",
            "radial-gradient(circle at 82% 35%, rgba(27,94,59,0.07) 0%, transparent 48%)",
          ].join(", "),
          pointerEvents: "none",
        }}
      />

      {/* ── Main two-column grid ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          minHeight: "100vh",
          maxWidth: "1280px",
          margin: "0 auto",
          alignItems: "center",
          gap: "3rem",
        }}
        className="px-8 md:px-16 py-32 grid grid-cols-1 lg:grid-cols-2"
      >

        {/* ── Left column: text content ── */}
        <div>
          {/* Location + founding year */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 300,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.36)",
              marginBottom: "1.5rem",
            }}
          >
            Sun Prairie, Wisconsin &nbsp;·&nbsp; Est. 2012
          </motion.p>

          {/* Society name — two lines, staggered entrance */}
          <h1 style={{ margin: "0 0 0.5rem 0", lineHeight: 1.05 }}>
            <motion.span
              initial={{ opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)",
                fontWeight: 700,
                fontStyle: "normal",
                color: "rgba(245,240,228,0.97)",
              }}
            >
              Sun Prairie
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.36 }}
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)",
                fontWeight: 700,
                fontStyle: "normal",
                color: "rgba(245,240,228,0.97)",
              }}
            >
              Tamil Society
            </motion.span>
          </h1>

          {/* Tamil name — gold */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.60 }}
            style={{
              fontFamily: "var(--font-tamil)",
              fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
              color: "#D4930A",
              letterSpacing: "0.04em",
              marginBottom: "1.75rem",
            }}
          >
            சன் ப்ரேரி தமிழ்ச் சமூகம்
          </motion.p>

          {/* Gold divider — expands from 0 width */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.82 }}
            style={{
              width: "52px",
              height: "2px",
              background: "#D4930A",
              borderRadius: "2px",
              marginBottom: "1.75rem",
            }}
          />

          {/* Founding story */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.0 }}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: "rgba(245,240,228,0.66)",
              marginBottom: "2.5rem",
              maxWidth: "460px",
            }}
          >
            In 2012, Tamil families in Sun Prairie asked a shared question:
            how do we give our children the language, the culture, and the
            belonging we carry in our hearts? Today, SPTS is that answer —
            a home for Tamil culture, alive in Wisconsin.
          </motion.p>

          {/* Identity pillars — factual anchors, no inflated numbers */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
            style={{
              display: "flex",
              gap: "2rem",
              paddingTop: "1.75rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            {PILLARS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 1.25 + i * 0.07 }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.2rem",
                    fontWeight: 400,
                    color: "rgba(245,240,228,0.95)",
                    lineHeight: 1.1,
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.62rem",
                    color: "rgba(255,255,255,0.36)",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginTop: "0.3rem",
                  }}
                >
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.55 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <Link
              href="#palai"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.9rem 1.875rem",
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
                padding: "0.9rem 1.875rem",
                borderRadius: "999px",
                fontSize: "0.88rem",
                fontWeight: 400,
                fontFamily: "var(--font-body)",
                textDecoration: "none",
                color: "rgba(255,255,255,0.70)",
                border: "1px solid rgba(255,255,255,0.20)",
              }}
            >
              Explore five landscapes ↓
            </Link>
          </motion.div>
        </div>

        {/* ── Right column: Thiruvalluvar + Kolam ring (desktop only) ── */}
        <div
          className="hidden lg:block"
          style={{
            position: "relative",
            height: "520px",
          }}
        >
          {/* Kolam ring — animates in via CSS, behind the figure */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.9 }}
            style={{
              position: "absolute",
              inset: "-40px",
              pointerEvents: "none",
            }}
          >
            <KolamRing />
          </motion.div>

          {/* Thiruvalluvar illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.85 }}
            style={{
              position: "absolute",
              inset: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThiruvalluvarIllustration />
          </motion.div>
        </div>
      </div>

      {/* ── Mobile: Thiruvalluvar as atmospheric background ── */}
      <div
        className="lg:hidden"
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-8%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "78vw",
          maxWidth: "360px",
          opacity: 0.07,
          pointerEvents: "none",
        }}
      >
        <ThiruvalluvarIllustration />
      </div>

      {/* Scroll invitation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.32 }}
        transition={{ duration: 1.0, delay: 2.2 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            fontWeight: 300,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Scroll through five Tamil landscapes
        </p>
        <span className="animate-bounce-hint" style={{ fontSize: "0.85rem" }}>
          ↓
        </span>
      </motion.div>
    </section>
  );
}
