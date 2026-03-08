import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

/**
 * All events listing page — Server Component.
 * Fetches from Supabase events table (published only, ordered by date).
 * Replaces the hardcoded 2025 static array.
 *
 * @see REQ-202603-001 — Landing page
 * @see REQ-202603-004 — Admin CMS
 * @see DEF-202603-013 — /en/events was hardcoded; now DB-driven
 */

const MONTH_COLORS: Record<string, string> = {
  Jan: "#C0392B", Feb: "#E67E22", Mar: "#27AE60", Apr: "#8B1A1A",
  May: "#2980B9", Jun: "#8E44AD", Jul: "#27AE60", Aug: "#E67E22",
  Sep: "#C0392B", Oct: "#D4930A", Nov: "#2980B9", Dec: "#8B1A1A",
};

/**
 * Parses a YYYY-MM-DD date string into display parts.
 * Uses T12:00:00 to avoid UTC→local timezone shift (spts-clean DEF-202510-001).
 */
function parseDateDisplay(dateStr: string): { month: string; day: string; year: string } {
  const d = new Date(dateStr + "T12:00:00");
  return {
    month: d.toLocaleString("en-US", { month: "short" }),
    day: String(d.getDate()),
    year: String(d.getFullYear()),
  };
}

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("id,title,title_ta,date,time,location,description,rsvp_url,is_published")
    .eq("is_published", true)
    .order("date", { ascending: true });

  if (error) {
    console.error("⚠️ [EventsPage] DB fetch failed:", error.message);
  }

  const list = events ?? [];

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "8.5rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FAF5EB" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 3.5rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#1A1410" }}>Events</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ width: "36px", height: "3px", borderRadius: "2px", background: "#B8750A", marginBottom: "1.5rem" }} />
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.1, marginBottom: "0.75rem" }}>
              Upcoming Events
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 300, color: "#4A3828", lineHeight: 1.8 }}>
              Join us for Tamil cultural celebrations, student showcases, and community gatherings throughout the year.
            </p>
          </div>

          {/* Events list */}
          {list.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", fontFamily: "var(--font-body)", color: "#8A7060" }}>
              No upcoming events at this time. Check back soon.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {list.map((event, i) => {
                const { month, day, year } = parseDateDisplay(event.date);
                const accentColor = MONTH_COLORS[month] ?? "#8B1A1A";
                return (
                  <div
                    key={event.id}
                    style={{
                      background: "white",
                      borderRadius: "16px",
                      border: `1px solid ${accentColor}18`,
                      padding: "1.75rem 2rem",
                      display: "grid",
                      gridTemplateColumns: "88px 1fr auto",
                      gap: "2rem",
                      alignItems: "center",
                      boxShadow: "0 4px 24px rgba(26,20,16,0.07)",
                      animation: `fadeIn 0.3s ease ${i * 0.06}s both`,
                    }}
                  >
                    {/* Date card */}
                    <div style={{ background: accentColor, borderRadius: "12px", padding: "0.75rem", textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.54rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: "0.15rem" }}>{month}</div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "white", lineHeight: 1 }}>{day}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", color: "rgba(255,255,255,0.6)", marginTop: "0.1rem" }}>{year}</div>
                    </div>

                    {/* Info */}
                    <div>
                      {event.title_ta && (
                        <div style={{ fontFamily: "var(--font-tamil)", fontSize: "0.75rem", color: `${accentColor}99`, marginBottom: "0.25rem" }}>{event.title_ta}</div>
                      )}
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#1A1410", marginBottom: "0.3rem" }}>{event.title}</h2>
                      {(event.time || event.location) && (
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 400, color: "#8A7060", marginBottom: "0.5rem" }}>
                          {[event.time, event.location].filter(Boolean).join(" · ")}
                        </div>
                      )}
                      {event.description && (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 300, color: "#4A3828", lineHeight: 1.65 }}>{event.description}</p>
                      )}
                    </div>

                    {/* Action */}
                    {event.rsvp_url ? (
                      <a
                        href={event.rsvp_url}
                        target="_blank" rel="noopener noreferrer"
                        style={{ padding: "0.65rem 1.4rem", borderRadius: "999px", background: accentColor, color: "white", fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap" }}
                      >
                        RSVP →
                      </a>
                    ) : (
                      <div style={{ padding: "0.65rem 1.2rem", borderRadius: "999px", border: "1px solid rgba(26,20,16,0.1)", fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(26,20,16,0.4)", whiteSpace: "nowrap" }}>
                        Details TBA
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Back */}
          <div style={{ marginTop: "3rem" }}>
            <Link href="/#marutam" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#8A7060", textDecoration: "none" }}>
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
