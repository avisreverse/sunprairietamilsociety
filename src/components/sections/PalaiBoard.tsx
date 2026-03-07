"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Board / About section — Design D: Warm Cultural.
 * Parchment background. Board member cards with initials avatars.
 * Join CTA and help request chips.
 * Static data — Admin CMS (REQ-202603-004) will replace this.
 *
 * @see REQ-202603-001 — Landing page
 */

const BOARD = [
  { initials: "SA", name: "Sivasankar A.", role: "President", color: "#7A1515" },
  { initials: "KV", name: "Kavitha V.", role: "Secretary", color: "#1A5035" },
  { initials: "MG", name: "Murali G.", role: "Treasurer", color: "#7A4A10" },
  { initials: "DK", name: "Divya K.", role: "Programs Director", color: "#1A2A7A" },
];

const SPRING = { type: "spring", stiffness: 300, damping: 26 } as const;

export default function PalaiBoard() {
  return (
    <section id="palai" style={{ background: "#FDF8F0", padding: "6rem 3.5rem" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>

        {/* Header */}
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
              <div style={{ width: "20px", height: "1px", background: "#B8750A" }} />
              Who We Are
              <div style={{ width: "20px", height: "1px", background: "#B8750A" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: "#1A1410", marginBottom: "1rem" }}>
              Board of Directors
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "#4A3828", maxWidth: "540px", margin: "0 auto" }}>
              Volunteers dedicated to preserving Tamil culture and building community in Sun Prairie, Wisconsin.
            </p>
          </div>
        </ScrollReveal>

        {/* Board grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "4rem" }}>
          {BOARD.map((member, i) => (
            <ScrollReveal key={member.initials} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={SPRING}
                style={{
                  padding: "2.5rem 2rem",
                  borderRadius: "16px",
                  background: "white",
                  border: "1px solid rgba(26,20,16,0.07)",
                  textAlign: "center",
                  boxShadow: "0 2px 16px rgba(26,20,16,0.04)",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(26,20,16,0.10)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(26,20,16,0.04)")}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "64px", height: "64px", borderRadius: "50%",
                    background: `${member.color}18`,
                    border: `2px solid ${member.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem", fontWeight: 700, color: member.color,
                  }}
                >
                  {member.initials}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 500, color: "#1A1410", marginBottom: "0.3rem" }}>{member.name}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: member.color }}>{member.role}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA row */}
        <ScrollReveal delay={0.3}>
          <div
            style={{
              background: "#1A1410",
              borderRadius: "20px",
              padding: "3rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "white", marginBottom: "0.75rem" }}>
                Join the community
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                Whether you want to enroll your child in Tamil School, volunteer, or simply belong — SPTS is your home.
              </p>
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", flexWrap: "wrap" }}>
              <a href="#"
                style={{ display: "inline-block", padding: "0.9rem 2rem", borderRadius: "999px", background: "#7A1515", color: "white", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#6A1010")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#7A1515")}
              >
                Join the Society
              </a>
              <a href="#"
                style={{ display: "inline-block", padding: "0.9rem 2rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 400, textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.4)"; el.style.color = "white"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.15)"; el.style.color = "rgba(255,255,255,0.7)"; }}
              >
                Contact Board →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
