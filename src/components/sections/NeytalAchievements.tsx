"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Achievements section — Design D: Warm Cultural.
 * Dark ink background. Floating cards. Submit achievement links to dedicated page.
 * Static data — Admin CMS (REQ-202603-004) will replace this.
 *
 * @see REQ-202603-001 — Landing page
 */

const ACHIEVEMENTS = [
  { initials: "SA", name: "Siva Arumugam", category: "Education", achievement: "Tamil School Top Student", year: "2024", color: "#C0392B" },
  { initials: "PM", name: "Priya Murugan", category: "Arts", achievement: "State Bharatanatyam Award", year: "2024", color: "#27AE60" },
  { initials: "KV", name: "Karthik Vel", category: "Music", achievement: "Carnatic Music Excellence", year: "2024", color: "#E67E22" },
  { initials: "DL", name: "Divya Lakshmi", category: "Community", achievement: "Volunteer of the Year", year: "2023", color: "#2980B9" },
  { initials: "AR", name: "Arun Raj", category: "Education", achievement: "Tamil Literature Prize", year: "2023", color: "#8E44AD" },
  { initials: "MN", name: "Meena Nathan", category: "Arts", achievement: "Kolam Design Champion", year: "2023", color: "#C0392B" },
];

const SPRING = { type: "spring", stiffness: 300, damping: 26 } as const;

export default function NeytalAchievements() {
  return (
    <section id="neytal" style={{ background: "#111010", padding: "6rem 3.5rem" }}>
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
            <Link
              href="/achievements/submit"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D4930A")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
            >
              Submit achievement →
            </Link>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {ACHIEVEMENTS.map((item, i) => (
            <ScrollReveal key={item.initials + i} delay={i * 0.07}>
              <motion.div
                style={{
                  padding: "2rem",
                  borderRadius: "16px",
                  border: `1px solid ${item.color}25`,
                  background: `linear-gradient(135deg, ${item.color}15 0%, #1A1A1A 70%)`,
                  cursor: "default",
                  boxShadow: "0 6px 28px rgba(0,0,0,0.45)",
                }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: `0 20px 60px rgba(0,0,0,0.65)` }}
                transition={SPRING}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${item.color}55`)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${item.color}25`)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
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
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
