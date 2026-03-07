"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Events section — Design D: Warm Cultural.
 * Parchment background. Featured hero event + list rows with date cards.
 * Static data — Admin CMS (REQ-202603-004) will replace this.
 *
 * @see REQ-202603-001 — Landing page
 */

const EVENTS = [
  {
    id: "puthandu-2025",
    title: "Tamil New Year — Puthandu",
    titleTa: "புத்தாண்டு விழா",
    month: "Apr", day: "12",
    time: "4:00 PM", location: "Sun Prairie Community Center",
    description: "Celebrate the Tamil New Year with traditional music, dance, food, and community. All families welcome.",
    featured: true,
  },
  {
    id: "music-2025",
    title: "Annual Music & Dance Showcase",
    titleTa: "இசை & நடன விழா",
    month: "May", day: "3",
    time: "6:30 PM", location: "SPHS Auditorium",
    description: "Students from all SPTS programs perform on stage.",
    featured: false,
  },
  {
    id: "graduation-2025",
    title: "Tamil School Year-End Graduation",
    titleTa: "பட்டமளிப்பு விழா",
    month: "Jun", day: "21",
    time: "2:00 PM", location: "Sun Prairie Community Center",
    description: "Celebrating our students' achievements in Tamil language learning.",
    featured: false,
  },
];

const SPRING = { type: "spring", stiffness: 320, damping: 28 } as const;

export default function MarutamEvents() {
  const featured = EVENTS[0];
  const rest = EVENTS.slice(1);

  return (
    <section id="marutam" style={{ background: "#FAF5EB", padding: "6rem 3.5rem" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <ScrollReveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "20px", height: "1px", background: "#B8750A" }} />
                Coming Up
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: "#1A1410" }}>
                Upcoming Events
              </h2>
            </div>
            <Link href="/events"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(26,20,16,0.4)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7A1515")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(26,20,16,0.4)")}
            >
              View all events →
            </Link>
          </div>
        </ScrollReveal>

        {/* ── Featured event ── */}
        <ScrollReveal delay={0.1}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={SPRING}
            style={{ background: "#1A1410", borderRadius: "16px", padding: "2.5rem", marginBottom: "1rem", display: "grid", gridTemplateColumns: "110px 1fr auto", gap: "2rem", alignItems: "center" }}
          >
            <div style={{ background: "#7A1515", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "0.2rem" }}>{featured.month}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 900, color: "white", lineHeight: 1 }}>{featured.day}</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-tamil)", fontSize: "0.78rem", color: "rgba(184,117,10,0.7)", marginBottom: "0.3rem" }}>{featured.titleTa}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 700, color: "white", marginBottom: "0.35rem", lineHeight: 1.2 }}>{featured.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 300, color: "rgba(255,255,255,0.45)", marginBottom: "0.35rem" }}>{featured.time} · {featured.location}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 300, color: "rgba(255,255,255,0.32)", lineHeight: 1.6 }}>{featured.description}</p>
            </div>
            <a href="#"
              style={{ display: "inline-block", padding: "0.8rem 1.6rem", borderRadius: "999px", background: "#7A1515", color: "white", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#6A1010")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#7A1515")}
            >
              RSVP →
            </a>
          </motion.div>
        </ScrollReveal>

        {/* ── List rows ── */}
        {rest.map((event, i) => (
          <ScrollReveal key={event.id} delay={0.15 + i * 0.08}>
            <motion.div
              whileHover={{ x: 4 }}
              transition={SPRING}
              style={{ display: "grid", gridTemplateColumns: "90px 1fr auto", gap: "2rem", alignItems: "center", padding: "1.6rem 0", borderBottom: "1px solid rgba(26,20,16,0.08)" }}
            >
              <div style={{ background: "white", border: "1px solid rgba(26,20,16,0.08)", borderRadius: "10px", padding: "0.7rem", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.54rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A1515" }}>{event.month}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 700, color: "#1A1410", lineHeight: 1.1 }}>{event.day}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#1A1410", marginBottom: "0.25rem" }}>{event.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 300, color: "#8A7060" }}>{event.time} · {event.location}</p>
              </div>
              <a href="#"
                style={{ padding: "0.55rem 1.3rem", borderRadius: "999px", border: "1px solid rgba(26,20,16,0.15)", fontFamily: "var(--font-body)", fontSize: "0.76rem", color: "#1A1410", textDecoration: "none", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#1A1410"; el.style.color = "white"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#1A1410"; }}
              >
                RSVP →
              </a>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
