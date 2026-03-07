/**
 * KolamDivider — decorative horizontal section divider.
 * A thin gold line with a small kolam dot-motif at the center.
 * Used between major page sections to signal transition without breaking flow.
 *
 * @see REQ-202603-001 — Landing page visual design
 * @see D-003 — Tailwind + Shadcn/UI + Framer Motion
 */
export default function KolamDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "28px",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 900 28"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "28px" }}
      >
        {/* Left arm */}
        <line
          x1="0"
          y1="14"
          x2="400"
          y2="14"
          stroke="rgba(212,147,10,0.20)"
          strokeWidth="0.5"
        />
        {/* Center kolam motif — cross-dot pattern */}
        <circle cx="450" cy="14" r="4.5" fill="none" stroke="rgba(212,147,10,0.38)" strokeWidth="0.8" />
        <circle cx="450" cy="14" r="1.5" fill="rgba(212,147,10,0.42)" />
        {/* Cardinal dots */}
        <circle cx="437" cy="14" r="1.4" fill="rgba(212,147,10,0.26)" />
        <circle cx="463" cy="14" r="1.4" fill="rgba(212,147,10,0.26)" />
        <circle cx="450" cy="1"  r="1.4" fill="rgba(212,147,10,0.26)" />
        <circle cx="450" cy="27" r="1.4" fill="rgba(212,147,10,0.26)" />
        {/* Diagonal dots */}
        <circle cx="440.8" cy="5.8"  r="1.1" fill="rgba(212,147,10,0.18)" />
        <circle cx="459.2" cy="5.8"  r="1.1" fill="rgba(212,147,10,0.18)" />
        <circle cx="440.8" cy="22.2" r="1.1" fill="rgba(212,147,10,0.18)" />
        <circle cx="459.2" cy="22.2" r="1.1" fill="rgba(212,147,10,0.18)" />
        {/* Right arm */}
        <line
          x1="500"
          y1="14"
          x2="900"
          y2="14"
          stroke="rgba(212,147,10,0.20)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
