"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Events section — Design D: Warm Cultural.
 * Featured hero event + compact list rows.
 * Data from Supabase via page.tsx server fetch (REQ-202603-004).
 * rsvp_url is optional per event — set by admin. D-016.
 *
 * @see REQ-202603-001 — Landing page
 * @see REQ-202603-004 — Admin CMS
 * @see D-016 — RSVP is admin-optional per event
 */

interface DbEvent {
  id: string;
  title: string;
  title_ta: string | null;
  date: string;       // YYYY-MM-DD from DB
  time: string | null;
  location: string | null;
  description: string | null;
  featured: boolean;
  rsvp_url: string | null;
  rsvp_required: boolean;
}

interface Props {
  events: DbEvent[];
}

// DEF-202603-001 pattern: use T12:00:00 to avoid UTC timezone shift on date display
function parseDateParts(dateStr: string): { month: string; day: string } {
  const d = new Date(dateStr + "T12:00:00");
  return {
    month: d.toLocaleString("en-US", { month: "short" }),
    day: String(d.getDate()),
  };
}

const SPRING = { type: "spring", stiffness: 320, damping: 28 } as const;

export default function MarutamEvents({ events }: Props) {
  const featured = events.find((e) => e.featured) ?? events[0] ?? null;
  const rest = events.filter((e) => e.id !== featured?.id);

  if (events.length === 0) {
    return (
      <section id="marutam" style={{ background: "#FAF5EB", padding: "6rem 3.5rem" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.6rem" }}>Coming Up</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: "#1A1410", marginBottom: "1rem" }}>Upcoming Events</h2>
          <p style={{ fontFamily: "var(--font-body)", color: "#8A7060", fontWeight: 300 }}>Events will be posted soon. Check back shortly.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="marutam" style={{ background: "#FAF5EB", padding: "6rem 3.5rem" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>

        {/* Header */}
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
            <Link
              href="/events"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(26,20,16,0.4)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7A1515")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(26,20,16,0.4)")}
            >
              View all events →
            </Link>
          </div>
        </ScrollReveal>

        {/* Featured event */}
        {featured && (() => {
          const { month, day } = parseDateParts(featured.date);
          return (
            <ScrollReveal delay={0.1}>
              <motion.div
                style={{ boxShadow: "0 8px 40px rgba(26,20,16,0.12)", borderRadius: "18px" }}
                whileHover={{ y: -5, boxShadow: "0 20px 64px rgba(26,20,16,0.20)" }}
                transition={SPRING}
              >
                <div style={{ background: "#1A1410", borderRadius: "18px", padding: "2.5rem", marginBottom: "1rem", display: "grid", gridTemplateColumns: "110px 1fr auto", gap: "2rem", alignItems: "center" }}>
                  <div style={{ background: "#7A1515", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "0.2rem" }}>{month}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 700, color: "white", lineHeight: 1 }}>{day}</div>
                  </div>
                  <div>
                    {featured.title_ta && <div style={{ fontFamily: "var(--font-tamil)", fontSize: "0.78rem", color: "rgba(212,147,10,0.8)", marginBottom: "0.3rem" }}>{featured.title_ta}</div>}
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 700, color: "white", marginBottom: "0.35rem", lineHeight: 1.2 }}>{featured.title}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 300, color: "rgba(255,255,255,0.5)", marginBottom: "0.35rem" }}>{featured.time}{featured.location && ` · ${featured.location}`}</p>
                    {featured.description && <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 300, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{featured.description}</p>}
                  </div>
                  {/* D-016: RSVP only shown if rsvp_url is set by admin */}
                  {featured.rsvp_url ? (
                    <a
                      href={featured.rsvp_url}
                      target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-block", padding: "0.8rem 1.6rem", borderRadius: "999px", background: "#7A1515", color: "white", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#6A1010")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#7A1515")}
                    >
                      RSVP →
                    </a>
                  ) : (
                    <div style={{ padding: "0.8rem 1.4rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)", fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>
                      Details TBA
                    </div>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          );
        })()}

        {/* List rows */}
        {rest.map((event, i) => {
          const { month, day } = parseDateParts(event.date);
          return (
            <ScrollReveal key={event.id} delay={0.15 + i * 0.08}>
              <motion.div style={{ borderRadius: "12px" }} whileHover={{ x: 4 }} transition={SPRING}>
                <div style={{ display: "grid", gridTemplateColumns: "90px 1fr auto", gap: "2rem", alignItems: "center", padding: "1.6rem 0", borderBottom: "1px solid rgba(26,20,16,0.08)" }}>
                  <div style={{ background: "white", border: "1px solid rgba(26,20,16,0.08)", borderRadius: "10px", padding: "0.7rem", textAlign: "center", boxShadow: "0 2px 12px rgba(26,20,16,0.06)" }}>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.54rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A1515" }}>{month}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 700, color: "#1A1410", lineHeight: 1.1 }}>{day}</div>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#1A1410", marginBottom: "0.25rem" }}>{event.title}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 300, color: "#8A7060" }}>{event.time}{event.location && ` · ${event.location}`}</p>
                  </div>
                  {event.rsvp_url ? (
                    <a
                      href={event.rsvp_url}
                      target="_blank" rel="noopener noreferrer"
                      style={{ padding: "0.55rem 1.3rem", borderRadius: "999px", border: "1px solid rgba(26,20,16,0.15)", fontFamily: "var(--font-body)", fontSize: "0.76rem", color: "#1A1410", textDecoration: "none", whiteSpace: "nowrap" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#1A1410"; el.style.color = "white"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#1A1410"; }}
                    >
                      RSVP →
                    </a>
                  ) : (
                    <Link
                      href="/events"
                      style={{ padding: "0.55rem 1.3rem", borderRadius: "999px", border: "1px solid rgba(26,20,16,0.12)", fontFamily: "var(--font-body)", fontSize: "0.76rem", color: "rgba(26,20,16,0.5)", textDecoration: "none", whiteSpace: "nowrap" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(26,20,16,0.3)"; el.style.color = "#1A1410"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(26,20,16,0.12)"; el.style.color = "rgba(26,20,16,0.5)"; }}
                    >
                      Details →
                    </Link>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
