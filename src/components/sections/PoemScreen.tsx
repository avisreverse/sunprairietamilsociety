"use client";

import { useEffect, useRef } from "react";
import type { Kural } from "@/types";

/**
 * Transition poem screen between tinai sections.
 * Displays a Thirukkural couplet (2 lines: Line1 4 cirs + Line2 3 cirs — Tamil law).
 * Content is injected by ThirukkuralProvider after page load.
 * white-space: pre-line ensures the 2-line structure is preserved.
 *
 * Thirukkural rule (CRITICAL): exactly 2 lines — Line1 (4 cirs) + Line2 (3 cirs).
 * Showing it as multiple lines is a violation of the poetic form.
 *
 * @see REQ-202603-001 — Landing page poem transitions
 */
interface PoemScreenProps {
  /** CSS gradient class for background — one of 4 transition gradients */
  gradientStyle: React.CSSProperties;
  /** Initial kural to display (replaced on load by rotation JS) */
  initialKural?: Kural;
  /** Unique index used for targeting by the kural rotation script */
  screenIndex: number;
}

export default function PoemScreen({
  gradientStyle,
  initialKural,
  screenIndex,
}: PoemScreenProps) {
  return (
    <div
      className="poem-screen"
      data-screen-index={screenIndex}
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 3rem",
        flexDirection: "column",
        gap: "1rem",
        ...gradientStyle,
      }}
    >
      <p
        className="kural-num"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "0.72rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: 0.55,
        }}
      >
        {initialKural
          ? `Thirukkural · ${initialKural.Number}`
          : "Thirukkural · …"}
      </p>

      {/* Tamil couplet — white-space:pre-line enforces Line1\nLine2 structure */}
      <p
        className="ta"
        style={{
          fontFamily: "var(--font-tamil)",
          fontSize: "clamp(1.1rem, 2.4vw, 1.7rem)",
          lineHeight: 1.8,
          whiteSpace: "pre-line",
          display: "inline-block",
        }}
      >
        {initialKural
          ? `${initialKural.Line1}\n${initialKural.Line2}`
          : "…"}
      </p>

      {/* English translation */}
      <p
        className="en"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontStyle: "normal",
          fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
          opacity: 0.75,
          maxWidth: "480px",
          lineHeight: 1.85,
        }}
      >
        {initialKural
          ? `\u201c${initialKural.Translation}\u201d`
          : ""}
      </p>
    </div>
  );
}
