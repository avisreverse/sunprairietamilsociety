"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Top navigation bar — Design D: Warm Cultural.
 * Light parchment background, Tamil crest (crimson circle), DM Sans.
 * On scroll past 60px: frosted parchment backdrop.
 * Mobile: brand + join visible, nav links hidden.
 *
 * @see D-003 — Tailwind CSS
 * @see REQ-202603-001 — Landing page
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 150,
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
        {/* Crimson circle crest with Tamil letter */}
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
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.88rem", fontWeight: 500,
              color: "#1A1410", letterSpacing: "0.01em",
              lineHeight: 1.1,
            }}
          >
            Sun Prairie Tamil Society
          </div>
          <div
            style={{
              fontFamily: "var(--font-tamil)",
              fontSize: "0.6rem", color: "rgba(26,20,16,0.4)",
              marginTop: "1px",
            }}
          >
            சன் ப்ரேரி தமிழ்ச் சமூகம்
          </div>
        </div>
      </Link>

      {/* Nav links */}
      <ul
        className="hidden md:flex"
        style={{ gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}
      >
        {[
          { href: "#mullai",   label: "Programs" },
          { href: "#marutam", label: "Events" },
          { href: "#neytal",  label: "Achievements" },
          { href: "#palai",   label: "About" },
        ].map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem", fontWeight: 400,
                color: "rgba(26,20,16,0.55)",
                textDecoration: "none", transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#1A1410")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(26,20,16,0.55)")}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Join CTA — crimson pill */}
      <Link
        href="#palai"
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.3rem",
          padding: "0.65rem 1.4rem", borderRadius: "999px",
          background: "#7A1515", color: "white",
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem", fontWeight: 500,
          textDecoration: "none", letterSpacing: "0.01em",
          transition: "background 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#6A1010")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#7A1515")}
      >
        Join Us →
      </Link>
    </nav>
  );
}
