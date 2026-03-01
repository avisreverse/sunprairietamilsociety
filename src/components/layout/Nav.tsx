"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Top navigation bar — fixed position, gradient background fading to transparent.
 * Brand: Poppins 300 uppercase (discreet wordmark, not stylized).
 * Nav links: Poppins 300, 0.78rem.
 * Join CTA: white pill button, Poppins 600.
 * Mobile: nav items hidden, brand + join visible.
 * @see D-007 — next-intl for Tamil + English
 * @see REQ-202603-001 — Landing page
 */
export default function Nav() {
  const t = useTranslations("nav");

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
        background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
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
            color: "rgba(255,255,255,0.35)",
            marginTop: "3px",
          }}
        >
          {t("brandTa")}
        </span>
      </div>

      {/* Nav links — hidden on mobile */}
      <ul
        className="hidden md:flex"
        style={{
          gap: "2rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {[
          { href: "#mullai", label: t("programs") },
          { href: "#marutam", label: t("events") },
          { href: "#neytal", label: t("achievements") },
          { href: "#palai", label: t("about") },
        ].map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                fontWeight: 300,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "white")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  "rgba(255,255,255,0.7)")
              }
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Join CTA */}
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
          transition: "all 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.85)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "white")
        }
      >
        {t("join")}
      </Link>
    </nav>
  );
}
