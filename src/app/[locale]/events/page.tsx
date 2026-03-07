import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

/**
 * All events listing page.
 * Static for now — Admin CMS (REQ-202603-004) will populate from Supabase.
 *
 * @see REQ-202603-001 — Landing page
 */

const EVENTS = [
  { id: "puthandu-2025", title: "Tamil New Year — Puthandu", titleTa: "புத்தாண்டு விழா", month: "Apr", day: "12", year: "2025", time: "4:00 PM", location: "Sun Prairie Community Center", description: "Celebrate the Tamil New Year with traditional music, dance, food, and community. All families welcome.", rsvpUrl: undefined },
  { id: "music-2025", title: "Annual Music & Dance Showcase", titleTa: "இசை & நடன விழா", month: "May", day: "3", year: "2025", time: "6:30 PM", location: "SPHS Auditorium", description: "Students from all SPTS programs perform on stage. A celebration of learning and talent.", rsvpUrl: undefined },
  { id: "graduation-2025", title: "Tamil School Year-End Graduation", titleTa: "பட்டமளிப்பு விழா", month: "Jun", day: "21", year: "2025", time: "2:00 PM", location: "Sun Prairie Community Center", description: "Celebrating our students' achievements in Tamil language learning.", rsvpUrl: undefined },
  { id: "pattarai-2025", title: "Tamil Pattarai Art Exhibition", titleTa: "கலை விழா", month: "Jul", day: "19", year: "2025", time: "3:00 PM", location: "Sun Prairie Public Library", description: "Showcasing artwork created by SPTS Pattarai students — kolam, drawing, and traditional crafts.", rsvpUrl: undefined },
];

const MONTH_COLORS: Record<string, string> = {
  Jan: "#C0392B", Feb: "#E67E22", Mar: "#27AE60", Apr: "#8B1A1A",
  May: "#2980B9", Jun: "#8E44AD", Jul: "#27AE60", Aug: "#E67E22",
  Sep: "#C0392B", Oct: "#D4930A", Nov: "#2980B9", Dec: "#8B1A1A",
};

export default function EventsPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: "7rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FAF5EB" }}>
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
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {EVENTS.map((event, i) => {
              const accentColor = MONTH_COLORS[event.month] ?? "#8B1A1A";
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
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.54rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: "0.15rem" }}>{event.month}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "white", lineHeight: 1 }}>{event.day}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", color: "rgba(255,255,255,0.6)", marginTop: "0.1rem" }}>{event.year}</div>
                  </div>

                  {/* Info */}
                  <div>
                    <div style={{ fontFamily: "var(--font-tamil)", fontSize: "0.75rem", color: `${accentColor}99`, marginBottom: "0.25rem" }}>{event.titleTa}</div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#1A1410", marginBottom: "0.3rem" }}>{event.title}</h2>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 400, color: "#8A7060", marginBottom: "0.5rem" }}>{event.time} · {event.location}</div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 300, color: "#4A3828", lineHeight: 1.65 }}>{event.description}</p>
                  </div>

                  {/* Action */}
                  {event.rsvpUrl ? (
                    <a
                      href={event.rsvpUrl}
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
