"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Achievements section — Design D: Warm Cultural.
 * Dark ink background. Floating cards. Submit achievement links to dedicated page.
 * Data from Supabase via page.tsx server fetch (REQ-202603-004).
 * Admin approves + publishes before they appear here.
 *
 * @see REQ-202603-001 — Landing page
 * @see REQ-202603-004 — Admin CMS
 * @see REQ-202603-005 — Achievement submit + detail pages
 */

interface DbAchievement {
  id: string;
  name: string;
  initials: string;
  category: string;
  achievement: string;
  year: string;
  color: string;
  /** DEF-202603-017: photo_url was missing from landing page query + interface */
  photo_url?: string | null;
}

interface Props {
  achievements: DbAchievement[];
}

const SPRING = { type: "spring", stiffness: 300, damping: 26 } as const;

export default function NeytalAchievements({ achievements }: Props) {
  return (
    <section id="neytal" className="spts-section" style={{ background: "#111010", padding: "6rem 3.5rem", minHeight: "100dvh" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>

        {/* Header */}
        <ScrollReveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "20px", height: "1px", background: "#D4930A" }} />
                Our Community
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: "white" }}>
                Community Achievements
              </h2>
            </div>
            <a
              href="/achievements/submit"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D4930A")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
            >
              Submit achievement →
            </a>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="spts-ach-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {achievements.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem 0", fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.25)" }}>
              Achievements coming soon.
            </div>
          )}
          {achievements.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.07}>
              <motion.a
                href={`/achievements/${item.id}`}
                style={{
                  padding: "2rem",
                  borderRadius: "16px",
                  border: `1px solid ${item.color}25`,
                  background: `linear-gradient(135deg, ${item.color}15 0%, #1A1A1A 70%)`,
                  cursor: "pointer",
                  boxShadow: "0 6px 28px rgba(0,0,0,0.45)",
                  display: "block",
                  textDecoration: "none",
                }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: `0 20px 60px rgba(0,0,0,0.65)` }}
                transition={SPRING}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${item.color}55`)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${item.color}25`)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                  {/* DEF-202603-017: Show photo if uploaded, else initials avatar */}
                  {item.photo_url ? (
                    <img
                      src={item.photo_url}
                      alt={item.name}
                      style={{
                        width: "48px", height: "48px", borderRadius: "50%",
                        objectFit: "cover",
                        border: `2px solid ${item.color}70`,
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "48px", height: "48px", borderRadius: "50%",
                        background: `${item.color}30`,
                        border: `2px solid ${item.color}70`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-display)",
                        fontSize: "1rem", fontWeight: 700, color: item.color,
                        flexShrink: 0,
                      }}
                    >
                      {item.initials}
                    </div>
                  )}
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 600, color: "white", lineHeight: 1.2 }}>{item.name}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 400, color: "rgba(255,255,255,0.35)", marginTop: "0.2rem" }}>{item.year}</div>
                  </div>
                </div>

                <div
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem", borderRadius: "999px",
                    background: `${item.color}22`, border: `1px solid ${item.color}44`,
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: item.color,
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.category}
                </div>

                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 400, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                  {item.achievement}
                </p>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
