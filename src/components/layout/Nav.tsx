"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Top navigation bar — Design D: Warm Cultural.
 * Light parchment background, Tamil crest (crimson circle).
 * On scroll past 60px: frosted parchment backdrop.
 * Mobile: brand + join visible, nav links hidden.
 *
 * REQ-202603-009: AnnouncementTicker is rendered INSIDE this fixed wrapper,
 * above the nav bar, so both scroll together as one unit with no overlap.
 *
 * @see D-003 — Tailwind CSS
 * @see REQ-202603-001 — Landing page
 * @see REQ-202603-009 — External announcements
 */

interface Announcement {
  id: string;
  title: string;
  body: string | null;
  action_url: string | null;
  action_label: string;
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/announcements")
      .then((r) => r.json())
      .then((data: Announcement[]) => setAnnouncements(data))
      .catch(() => {}); // Graceful degradation
  }, []);

  // Duration scales with content so each item gets ~14s in view
  const duration = Math.max(announcements.length * 14, 20);

  const sep = (
    <span aria-hidden style={{ margin: "0 2.5rem", color: "#D4930A", opacity: 0.5, fontSize: "0.55rem" }}>
      ◆
    </span>
  );

  // All ticker items link to the internal /announcements/[id] detail page
  // which shows the poster, full write-up, and the external action URL as a button.
  const renderItems = (keySuffix: string) =>
    announcements.map((item, i) => (
      <span key={`${item.id}-${keySuffix}-${i}`} style={{ display: "inline-flex", alignItems: "center" }}>
        <a
          href={`/announcements/${item.id}`}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.88)", textDecoration: "none", cursor: "pointer", transition: "color 0.15s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D4930A")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.88)")}
        >
          {item.title}
          {item.body && (
            <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>
              {" — "}{item.body.length > 80 ? item.body.slice(0, 80) + "…" : item.body}
            </span>
          )}
          <span style={{ color: "#D4930A", marginLeft: "0.3rem" }}>→</span>
        </a>
        {sep}
      </span>
    ));

  return (
    <>
      {/* Ticker keyframe — only injected when announcements exist */}
      {announcements.length > 0 && (
        <style>{`
          @keyframes spts-ticker {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      )}

      {/*
       * Fixed wrapper holds BOTH the ticker strip and the nav bar.
       * They move as one unit so the ticker never conflicts with the nav.
       * REQ-202603-009: ticker strip only renders when announcements exist.
       */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 150,
        }}
      >
        {/* ── Announcement ticker strip ── */}
        {announcements.length > 0 && (
          <div
            style={{
              height: "38px",
              background: "rgba(15,6,6,0.97)",
              borderBottom: "1px solid rgba(212,147,10,0.2)",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {/* "ANNOUNCEMENTS" label */}
            <div
              style={{
                flexShrink: 0,
                height: "100%",
                display: "flex",
                alignItems: "center",
                padding: "0 0.85rem",
                background: "#8B1A1A",
                borderRight: "1px solid rgba(212,147,10,0.25)",
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "white",
                whiteSpace: "nowrap",
              }}
            >
              Announcements
            </div>

            {/* Scrolling area */}
            <div
              style={{ flex: 1, overflow: "hidden", position: "relative", height: "100%", display: "flex", alignItems: "center" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Left fade edge */}
              <div aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "30px", zIndex: 1, background: "linear-gradient(to right, rgba(15,6,6,0.97), transparent)", pointerEvents: "none" }} />
              {/* Right fade edge */}
              <div aria-hidden style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "50px", zIndex: 1, background: "linear-gradient(to left, rgba(15,6,6,0.97), transparent)", pointerEvents: "none" }} />

              {/* Ticker track — duplicated content for seamless loop */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: "100%",
                  paddingLeft: "1.5rem",
                  whiteSpace: "nowrap",
                  animation: `spts-ticker ${duration}s linear infinite`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              >
                {renderItems("a")}
                {renderItems("b")}
              </div>

              {/* Pause hint */}
              {paused && (
                <div style={{ position: "absolute", right: "0.75rem", fontFamily: "var(--font-body)", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", zIndex: 2, pointerEvents: "none" }}>
                  paused
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Main navigation bar ── */}
        <nav
          className="spts-nav-bar"
          style={{
            padding: "1.25rem 3.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "background 0.35s, box-shadow 0.35s",
            background: scrolled
              ? "rgba(253,248,240,0.92)"
              : "rgba(253,248,240,0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: scrolled
              ? "1px solid rgba(26,20,16,0.07)"
              : "1px solid transparent",
          }}
          aria-label="Main navigation"
        >
          {/* Brand — Tamil crest + name */}
          <Link href="#hero" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <div
              style={{
                width: "34px", height: "34px", borderRadius: "50%",
                background: "#7A1515",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-tamil)",
                fontSize: "0.75rem", fontWeight: 600, color: "white",
                flexShrink: 0,
              }}
            >
              த
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 500, color: "#1A1410", letterSpacing: "0.01em", lineHeight: 1.1 }}>
                Sun Prairie Tamil Society
              </div>
              <div style={{ fontFamily: "var(--font-tamil)", fontSize: "0.6rem", color: "rgba(26,20,16,0.4)", marginTop: "1px" }}>
                சன் ப்ரேரி தமிழ்ச் சமூகம்
              </div>
            </div>
          </Link>

          {/* Nav links */}
          <ul className="hidden md:flex" style={{ gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
            {[
              { href: "#mullai",   label: "Programs" },
              { href: "#marutam", label: "Events" },
              { href: "#neytal",  label: "Achievements" },
              { href: "#palai",   label: "About" },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 400, color: "rgba(26,20,16,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#1A1410")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(26,20,16,0.55)")}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Admin link */}
          <Link
            href="/admin"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 400, color: "rgba(26,20,16,0.3)", textDecoration: "none", transition: "color 0.2s" }}
            className="hidden md:inline"
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D4930A")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(26,20,16,0.3)")}
          >
            Admin
          </Link>

          {/* Join CTA — crimson pill */}
          <Link
            href="#palai"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.65rem 1.4rem", borderRadius: "999px",
              background: "#7A1515", color: "white",
              fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 500,
              textDecoration: "none", letterSpacing: "0.01em",
              transition: "background 0.2s", whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#6A1010")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#7A1515")}
          >
            Join Us →
          </Link>
        </nav>
      </div>
    </>
  );
}
