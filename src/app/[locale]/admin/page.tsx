"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";
import { fetchAdmin } from "@/lib/fetchAdmin";

/**
 * Admin dashboard — shows counts and quick links for all content sections.
 *
 * @see REQ-202603-004 — Admin CMS
 */

interface Stats {
  events: number;
  achievements: number;
  pendingAchievements: number;
  board: number;
  programs: number;
  announcements: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [eventsRes, achievementsRes, boardRes, programsRes, announcementsRes] = await Promise.all([
          fetchAdmin("/api/admin/events"),
          fetchAdmin("/api/admin/achievements"),
          fetchAdmin("/api/admin/board"),
          fetchAdmin("/api/admin/programs"),
          fetchAdmin("/api/admin/announcements"),
        ]);

        const [events, achievements, board, programs, announcements] = await Promise.all([
          eventsRes.json(),
          achievementsRes.json(),
          boardRes.json(),
          programsRes.json(),
          announcementsRes.json(),
        ]);

        setStats({
          events: Array.isArray(events) ? events.length : 0,
          achievements: Array.isArray(achievements) ? achievements.filter((a: Record<string, unknown>) => a.is_published).length : 0,
          pendingAchievements: Array.isArray(achievements) ? achievements.filter((a: Record<string, unknown>) => !a.is_approved).length : 0,
          board: Array.isArray(board) ? board.filter((b: Record<string, unknown>) => b.is_active).length : 0,
          programs: Array.isArray(programs) ? programs.filter((p: Record<string, unknown>) => p.is_active).length : 0,
          announcements: Array.isArray(announcements) ? announcements.length : 0,
        });
      } catch (err) {
        console.error("❌ [AdminDashboard] Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const SECTIONS = [
    {
      href: "/en/admin/events",
      label: "Events",
      desc: "Add, edit, delete events. Set RSVP links.",
      count: stats?.events,
      color: "#E67E22",
    },
    {
      href: "/en/admin/achievements",
      label: "Achievements",
      desc: "Approve and publish community achievements.",
      count: stats?.achievements,
      badge: stats?.pendingAchievements ? `${stats.pendingAchievements} pending` : null,
      color: "#2980B9",
    },
    {
      href: "/en/admin/board",
      label: "Board Members",
      desc: "Manage board members, bios, and roles.",
      count: stats?.board,
      color: "#8E44AD",
    },
    {
      href: "/en/admin/programs",
      label: "Programs",
      desc: "Edit program descriptions and visibility.",
      count: stats?.programs,
      color: "#27AE60",
    },
    {
      href: "/en/admin/announcements",
      label: "Announcements",
      desc: "Publish ticker announcements shown on all pages.",
      count: stats?.announcements,
      color: "#16A085",
    },
    {
      href: "/en/admin/home",
      label: "Home Page",
      desc: "Edit hero story, tagline, and founding details.",
      count: null,
      color: "#B8750A",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#111010" }}>
      <AdminNav />

      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#D4930A",
              marginBottom: "0.5rem",
            }}
          >
            Content Management
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem,3vw,2.5rem)",
              fontWeight: 700,
              color: "white",
              margin: 0,
            }}
          >
            Dashboard
          </h1>
        </div>

        {/* Section cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.25rem",
          }}
        >
          {SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${section.color}25`,
                  borderRadius: "16px",
                  padding: "1.75rem",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${section.color}55`;
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${section.color}25`;
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {section.label}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    {section.badge && (
                      <span
                        style={{
                          background: "rgba(192,57,43,0.2)",
                          border: "1px solid rgba(192,57,43,0.4)",
                          borderRadius: "999px",
                          padding: "0.15rem 0.65rem",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          color: "#e74c3c",
                        }}
                      >
                        {section.badge}
                      </span>
                    )}
                    {!loading && section.count !== undefined && (
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          color: section.color,
                        }}
                      >
                        {section.count}
                      </span>
                    )}
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {section.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to site */}
        <div style={{ marginTop: "3rem" }}>
          <Link
            href="/en"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.25)",
              textDecoration: "none",
            }}
          >
            ← Back to public site
          </Link>
        </div>
      </main>
    </div>
  );
}
