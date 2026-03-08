"use client";

import { useEffect, useState } from "react";

/**
 * AnnouncementTicker — sticky top ribbon that scrolls announcement text.
 * - Appears only when there are active published announcements
 * - Continuous left-to-right scroll; hover pauses it
 * - Clicking an item with an action_url opens the link in a new tab
 * - Content duplicated for seamless infinite loop
 *
 * @see REQ-202603-009 — External announcement board
 */

interface Announcement {
  id: string;
  title: string;
  body: string | null;
  action_url: string | null;
  action_label: string;
}

export default function AnnouncementTicker() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetch("/api/announcements")
      .then((r) => r.json())
      .then((data: Announcement[]) => setItems(data))
      .catch(() => {}); // Graceful degradation — ticker simply stays hidden
  }, []);

  if (items.length === 0) return null;

  // Duration scales with number of items so each gets ~14s in view
  const duration = Math.max(items.length * 14, 20);

  // Separator between items
  const sep = (
    <span
      aria-hidden
      style={{ margin: "0 3rem", color: "#D4930A", opacity: 0.55, fontSize: "0.6rem" }}
    >
      ◆
    </span>
  );

  // Build one full set of ticker items as React nodes
  const renderItems = (keySuffix: string) =>
    items.map((item, i) => (
      <span key={`${item.id}-${keySuffix}-${i}`} style={{ display: "inline-flex", alignItems: "center" }}>
        {item.action_url ? (
          // Clickable item — stops propagation so hover-pause isn't disrupted
          <a
            href={item.action_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.9)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D4930A")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)")}
          >
            {item.title}
            {item.body && (
              <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
                {" — "}
                {item.body.length > 80 ? item.body.slice(0, 80) + "…" : item.body}
              </span>
            )}
            <span style={{ color: "#D4930A", marginLeft: "0.3rem", fontSize: "0.72rem" }}>→</span>
          </a>
        ) : (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            {item.title}
            {item.body && (
              <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
                {" — "}
                {item.body.length > 80 ? item.body.slice(0, 80) + "…" : item.body}
              </span>
            )}
          </span>
        )}
        {sep}
      </span>
    ));

  return (
    <>
      {/* Inline keyframe — self-contained, no globals.css modification needed */}
      <style>{`
        @keyframes spts-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200, // above Nav (Nav is 100)
          height: "36px",
          background: "rgba(15,6,6,0.97)",
          borderBottom: "1px solid rgba(212,147,10,0.25)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* "ANNOUNCEMENTS" label pill — fixed left */}
        <div
          style={{
            flexShrink: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0 1rem",
            background: "#8B1A1A",
            borderRight: "1px solid rgba(212,147,10,0.3)",
            fontFamily: "var(--font-body)",
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.9)",
            whiteSpace: "nowrap",
            zIndex: 2,
          }}
        >
          Announcements
        </div>

        {/* Scrolling area */}
        <div
          style={{ flex: 1, overflow: "hidden", position: "relative", height: "100%" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left fade edge */}
          <div
            aria-hidden
            style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: "40px", zIndex: 1,
              background: "linear-gradient(to right, rgba(15,6,6,0.97), transparent)",
              pointerEvents: "none",
            }}
          />
          {/* Right fade edge */}
          <div
            aria-hidden
            style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", zIndex: 1,
              background: "linear-gradient(to left, rgba(15,6,6,0.97), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Ticker track — content duplicated so the loop is seamless */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: "100%",
              paddingLeft: "2rem",
              whiteSpace: "nowrap",
              animation: `spts-ticker ${duration}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {/* Two copies for seamless wrap */}
            {renderItems("a")}
            {renderItems("b")}
          </div>
        </div>

        {/* Hover hint — fades in on hover */}
        {paused && (
          <div
            style={{
              position: "absolute",
              right: "1rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.06em",
              pointerEvents: "none",
              zIndex: 3,
            }}
          >
            paused
          </div>
        )}
      </div>
    </>
  );
}
