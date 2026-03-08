"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * Shared navigation bar for all admin pages.
 * Includes section links + sign-out button.
 * Used by all /admin/* pages (not login).
 *
 * @see REQ-202603-004 — Admin CMS
 */

const NAV_LINKS = [
  { href: "/en/admin", label: "Dashboard", exact: true },
  { href: "/en/admin/events", label: "Events" },
  { href: "/en/admin/achievements", label: "Achievements" },
  { href: "/en/admin/board", label: "Board" },
  { href: "/en/admin/programs", label: "Programs" },
  { href: "/en/admin/announcements", label: "Announcements" },
  { href: "/en/admin/home", label: "Home Page" },
];

export default function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    console.log("🚪 [AdminNav] Signed out");
    router.push("/en/admin/login");
    router.refresh();
  };

  return (
    <nav
      style={{
        background: "#0D0D0D",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "0 2rem",
        display: "flex",
        alignItems: "center",
        gap: "0",
        height: "56px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.95rem",
          fontWeight: 700,
          color: "#D4930A",
          marginRight: "2.5rem",
          flexShrink: 0,
        }}
      >
        SPTS Admin
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flex: 1 }}>
        {NAV_LINKS.map((link) => {
          const isActive = link.exact
            ? pathname === link.href || pathname === link.href.replace("/en", "/ta")
            : pathname.startsWith(link.href) || pathname.startsWith(link.href.replace("/en", "/ta"));

          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "white" : "rgba(255,255,255,0.45)",
                textDecoration: "none",
                padding: "0.4rem 0.85rem",
                borderRadius: "6px",
                background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                transition: "all 0.15s",
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.78rem",
          fontWeight: 500,
          color: "rgba(255,255,255,0.35)",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "6px",
          padding: "0.35rem 0.85rem",
          cursor: "pointer",
          transition: "all 0.15s",
          flexShrink: 0,
        }}
      >
        Sign out
      </button>
    </nav>
  );
}
