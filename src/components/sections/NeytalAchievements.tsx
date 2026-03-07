"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Achievements section — Design D: Warm Cultural.
 * Dark ink background. Initials avatars. Gold category tags.
 * Static data — Admin CMS (REQ-202603-004) will replace this.
 *
 * @see REQ-202603-001 — Landing page
 */

const ACHIEVEMENTS = [
  { initials: "SA", name: "Siva Arumugam", category: "Education", achievement: "Tamil School Top Student", year: "2024", color: "#7A1515" },
  { initials: "PM", name: "Priya Murugan", category: "Arts", achievement: "State Bharatanatyam Award", year: "2024", color: "#1A5035" },
  { initials: "KV", name: "Karthik Vel", category: "Music", achievement: "Carnatic Music Excellence", year: "2024", color: "#7A4A10" },
  { initials: "DL", name: "Divya Lakshmi", category: "Community", achievement: "Volunteer of the Year", year: "2023", color: "#1A2A7A" },
  { initials: "AR", name: "Arun Raj", category: "Education", achievement: "Tamil Literature Prize", year: "2023", color: "#4A1A7A" },
  { initials: "MN", name: "Meena Nathan", category: "Arts", achievement: "Kolam Design Champion", year: "2023", color: "#7A1515" },
];

const SPRING = { type: "spring", stiffness: 300, damping: 26 } as const;

export default function NeytalAchievements() {
  return (
    <section id="neytal" style={{ background: "#1A1410", padding: "6rem 3.5rem" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>

        {/* Header */}
        <ScrollReveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "20px", height: "1px", background: "#B8750A" }} />
                Our Community
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: "white" }}>
                Community Achievements
              </h2>
            </div>
            <a href="#"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#B8750A")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
            >
              Submit achievement →
            </a>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {ACHIEVEMENTS.map((item, i) => (
            <ScrollReveal key={item.initials + i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={SPRING}
                style={{
                  padding: "2rem",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  cursor: "default",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${item.color}55`)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                  {/* Initials avatar */}
                  <div
                    style={{
                      width: "48px", height: "48px", borderRadius: "50%",
                      background: `${item.color}33`,
                      border: `1px solid ${item.color}66`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem", fontWeight: 700, color: item.color,
                      flexShrink: 0,
                    }}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 500, color: "white", lineHeight: 1.2 }}>{item.name}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 400, color: "rgba(255,255,255,0.3)", marginTop: "0.2rem" }}>{item.year}</div>
                  </div>
                </div>

                {/* Category tag */}
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem", borderRadius: "999px",
                    background: `${item.color}22`, border: `1px solid ${item.color}44`,
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: item.color,
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.category}
                </div>

                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 400, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>
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
