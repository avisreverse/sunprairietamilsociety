"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Top navigation bar.
 * Transparent on initial load (hero is dark).
 * On scroll past 80px: frosted glass backdrop-filter + subtle border-bottom.
 * Nav links: Tailwind hover classes (no JS handlers — D-003).
 * Mobile: brand + join visible, nav links hidden.
 *
 * @see D-003 — Tailwind CSS (hover via classes, not JS events)
 * @see D-007 — next-intl for Tamil + English
 * @see REQ-202603-001 — Landing page
 */
export default function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Passive listener — no layout thrash
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 150,
        padding: "1.25rem 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        background: scrolled
          ? "rgba(10,15,12,0.82)"
          : "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
      aria-label="Main navigation"
    >
      {/* Brand wordmark */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            fontWeight: 300,
            fontStyle: "normal",
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {t("brand")}
        </span>
        <span
          style={{
            fontFamily: "var(--font-tamil)",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.32)",
            marginTop: "3px",
          }}
        >
          {t("brandTa")}
        </span>
      </div>

      {/* Nav links — Tailwind hover (no JS handlers) */}
      <ul
        className="hidden md:flex"
        style={{ gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}
      >
        {[
          { href: "#mullai",   label: t("programs") },
          { href: "#marutam", label: t("events") },
          { href: "#neytal",  label: t("achievements") },
          { href: "#palai",   label: t("about") },
        ].map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className="nav-link"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                fontWeight: 300,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "white")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.65)")
              }
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Join CTA pill */}
      <Link
        href="#palai"
        style={{
          background: "white",
          color: "#1A1A1A",
          fontFamily: "var(--font-body)",
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
          padding: "0.5rem 1.25rem",
          borderRadius: "999px",
          textDecoration: "none",
          transition: "opacity 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
      >
        {t("join")}
      </Link>
    </nav>
  );
}
