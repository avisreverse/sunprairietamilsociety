import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import RsvpForm from "@/components/events/RsvpForm";

/**
 * Public RSVP form page for a specific event.
 * Only renders when the event has rsvp_required = true.
 * Submits to POST /api/rsvp/[eventId] — no auth required.
 *
 * @see REQ-202603-007 — RSVP page
 * @see DEF-202603-008 — RSVP page not built (fixed)
 * @see D-016 — RSVP is admin-optional per event
 */

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

const MONTH_COLORS: Record<string, string> = {
  Jan: "#C0392B", Feb: "#E67E22", Mar: "#27AE60", Apr: "#8B1A1A",
  May: "#2980B9", Jun: "#8E44AD", Jul: "#27AE60", Aug: "#E67E22",
  Sep: "#C0392B", Oct: "#D4930A", Nov: "#2980B9", Dec: "#8B1A1A",
};

/**
 * Parses a YYYY-MM-DD date string for display.
 * Uses T12:00:00 to avoid UTC→local timezone shift (spts-clean DEF-202510-001).
 */
function parseDateDisplay(dateStr: string): { month: string; day: string; year: string; full: string } {
  const d = new Date(dateStr + "T12:00:00");
  return {
    month: d.toLocaleString("en-US", { month: "short" }),
    day:   String(d.getDate()),
    year:  String(d.getFullYear()),
    full:  d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
  };
}

export default async function EventRsvpPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: event, error } = await supabase
    .from("events")
    .select("id,title,title_ta,date,time,location,rsvp_required,is_published")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (error || !event) {
    console.error(`⚠️ [EventRsvpPage] Not found: ${id}`);
    notFound();
  }

  // Only show RSVP form if event has rsvp_required flag
  if (!event.rsvp_required) {
    notFound();
  }

  const { month, day, year, full: fullDate } = parseDateDisplay(event.date);
  const accentColor = MONTH_COLORS[month] ?? "#8B1A1A";

  return (
    <>
      <Nav />
      <main className="spts-inner" style={{ paddingTop: "8.5rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FAF7F0" }}>
        <div style={{ maxWidth: "620px", margin: "0 auto", padding: "0 2rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <Link href="/events" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>Events</Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <Link href={`/events/${id}`} style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>{event.title}</Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#1A1410" }}>RSVP</span>
          </div>

          {/* Event info header */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ width: "36px", height: "3px", borderRadius: "2px", background: accentColor, marginBottom: "1.25rem" }} />
            {event.title_ta && (
              <div style={{ fontFamily: "var(--font-tamil)", fontSize: "0.85rem", color: `${accentColor}99`, marginBottom: "0.35rem" }}>
                {event.title_ta}
              </div>
            )}
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,3.5vw,2.2rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.2, marginBottom: "0.75rem" }}>
              RSVP — {event.title}
            </h1>
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#4A3828" }}>
                📅 {fullDate}
              </div>
              {event.time && (
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#4A3828" }}>
                  🕐 {event.time}
                </div>
              )}
              {event.location && (
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#4A3828" }}>
                  📍 {event.location}
                </div>
              )}
            </div>
          </div>

          {/* Date badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
            <div style={{ flexShrink: 0, background: accentColor, borderRadius: "12px", padding: "0.75rem 1rem", textAlign: "center", minWidth: "72px" }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: "0.15rem" }}>{month}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "white", lineHeight: 1 }}>{day}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.56rem", color: "rgba(255,255,255,0.6)", marginTop: "0.1rem" }}>{year}</div>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 300, color: "#4A3828", lineHeight: 1.7 }}>
              Fill out the form below to reserve your spot. We look forward to celebrating with you!
            </p>
          </div>

          {/* RSVP form — client component */}
          <RsvpForm eventId={id} accentColor={accentColor} />

          {/* Back */}
          <div style={{ marginTop: "2rem" }}>
            <Link href={`/events/${id}`} style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#8A7060", textDecoration: "none" }}>
              ← Back to event details
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
