import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Individual event detail page — Server Component.
 * Shows full event info: title, date/time/location, description, RSVP button.
 * Linked from /events list and from landing page MarutamEvents section.
 *
 * Routing: /events/[id] where id is the UUID from the events table.
 * Events use UUID routing (no slug field on events table).
 *
 * @see REQ-202603-001 — Landing page
 * @see REQ-202603-004 — Admin CMS
 * @see D-016 — RSVP is admin-optional per event
 */

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

/** Month → accent color map, consistent with /events list page */
const MONTH_COLORS: Record<string, string> = {
  Jan: "#C0392B", Feb: "#E67E22", Mar: "#27AE60", Apr: "#8B1A1A",
  May: "#2980B9", Jun: "#8E44AD", Jul: "#27AE60", Aug: "#E67E22",
  Sep: "#C0392B", Oct: "#D4930A", Nov: "#2980B9", Dec: "#8B1A1A",
};

/**
 * Parses a YYYY-MM-DD date string into display parts.
 * Uses T12:00:00 to avoid UTC→local timezone shift (spts-clean DEF-202510-001).
 */
function parseDateDisplay(dateStr: string): { month: string; day: string; year: string; full: string } {
  const d = new Date(dateStr + "T12:00:00");
  return {
    month: d.toLocaleString("en-US", { month: "short" }),
    day: String(d.getDate()),
    year: String(d.getFullYear()),
    full: d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: event, error } = await supabase
    .from("events")
    .select("id,title,title_ta,date,time,location,description,rsvp_url,rsvp_required,is_published,featured")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (error || !event) {
    console.error(`⚠️ [EventDetailPage] Not found or not published: ${id}`);
    notFound();
  }

  const { month, day, year, full: fullDate } = parseDateDisplay(event.date);
  const accentColor = MONTH_COLORS[month] ?? "#8B1A1A";

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "8.5rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FAF7F0" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 2rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <Link href="/events" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Events
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#1A1410" }}>{event.title}</span>
          </div>

          {/* Event label */}
          {event.featured && (
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: accentColor, marginBottom: "0.75rem" }}>
              Featured Event
            </div>
          )}

          {/* Tamil title */}
          {event.title_ta && (
            <div style={{ fontFamily: "var(--font-tamil)", fontSize: "1rem", color: `${accentColor}99`, marginBottom: "0.5rem" }}>
              {event.title_ta}
            </div>
          )}

          {/* Title */}
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.15, marginBottom: "2rem" }}>
            {event.title}
          </h1>

          {/* Date card + meta row */}
          <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            {/* Date card */}
            <div style={{ flexShrink: 0, background: accentColor, borderRadius: "14px", padding: "1rem 1.4rem", textAlign: "center", minWidth: "90px" }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: "0.2rem" }}>
                {month}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 700, color: "white", lineHeight: 1 }}>
                {day}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", color: "rgba(255,255,255,0.6)", marginTop: "0.15rem" }}>
                {year}
              </div>
            </div>

            {/* Meta details */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "#1A1410", fontWeight: 500, marginBottom: "0.4rem" }}>
                {fullDate}
              </div>
              {event.time && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                  <span style={{ fontSize: "0.75rem" }}>🕐</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 300, color: "#4A3828" }}>{event.time}</span>
                </div>
              )}
              {event.location && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem" }}>📍</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 300, color: "#4A3828" }}>{event.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(26,20,16,0.08)", marginBottom: "2.5rem" }} />

          {/* Description */}
          {event.description && (
            <div style={{ marginBottom: "3rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300, color: "#3A2818", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
                {event.description}
              </p>
            </div>
          )}

          {/* RSVP / action */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            {event.rsvp_url ? (
              <a
                href={event.rsvp_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.9rem 2rem",
                  borderRadius: "999px",
                  background: accentColor,
                  color: "white",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                }}
              >
                RSVP →
              </a>
            ) : (
              <div style={{
                display: "inline-block",
                padding: "0.9rem 2rem",
                borderRadius: "999px",
                border: "1px solid rgba(26,20,16,0.12)",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "rgba(26,20,16,0.4)",
              }}>
                RSVP details coming soon
              </div>
            )}
            <Link
              href="/events"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#8A7060", textDecoration: "none" }}
            >
              ← All events
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
