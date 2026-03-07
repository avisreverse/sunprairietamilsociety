import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

/**
 * Board of Directors page.
 * Full details for each board member — role, bio, photo.
 * Photos and bios served from Supabase (Admin CMS REQ-202603-004).
 * Static placeholder until admin panel ships.
 *
 * @see REQ-202603-001 — Landing page
 * @see REQ-202603-004 — Admin CMS (backlog)
 */

const BOARD = [
  {
    initials: "SA",
    name: "Sivasankar A.",
    role: "President",
    color: "#C0392B",
    bio: "Sivasankar has led SPTS since its founding, championing Tamil language education and cultural programs across Sun Prairie. A software engineer by profession, he brings both vision and operational discipline to the society.",
    since: "2012",
    contact: "president@sunprairietamil.org",
  },
  {
    initials: "KV",
    name: "Kavitha V.",
    role: "Secretary",
    color: "#27AE60",
    bio: "Kavitha manages SPTS communications, member records, and coordinates between all program directors. She has been instrumental in growing SPTS membership and expanding outreach to the broader Wisconsin Tamil community.",
    since: "2014",
    contact: "secretary@sunprairietamil.org",
  },
  {
    initials: "MG",
    name: "Murali G.",
    role: "Treasurer",
    color: "#E67E22",
    bio: "Murali oversees SPTS finances, event budgets, and grant applications. His careful stewardship ensures the society can sustain and grow its programs year after year.",
    since: "2016",
    contact: "treasurer@sunprairietamil.org",
  },
  {
    initials: "DK",
    name: "Divya K.",
    role: "Programs Director",
    color: "#2980B9",
    bio: "Divya designs and coordinates all SPTS cultural programs — from Tamil School curriculum to Music Club showcases and Tamil Pattarai workshops. Her creativity and energy are the heartbeat of SPTS programming.",
    since: "2018",
    contact: "programs@sunprairietamil.org",
  },
];

export default function BoardPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: "7rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FDF8F0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 3.5rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#1A1410" }}>Board of Directors</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ width: "36px", height: "3px", borderRadius: "2px", background: "#B8750A", marginBottom: "1.5rem" }} />
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.1, marginBottom: "0.75rem" }}>
              Board of Directors
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300, color: "#4A3828", lineHeight: 1.8, maxWidth: "560px" }}>
              SPTS is run entirely by volunteers who believe in Tamil language, culture, and community. Meet the people who make it all possible.
            </p>
          </div>

          {/* Board members */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "5rem" }}>
            {BOARD.map((member, i) => (
              <div
                key={member.initials}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  border: `1px solid ${member.color}20`,
                  padding: "2.5rem",
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: "2rem",
                  alignItems: "flex-start",
                  boxShadow: "0 4px 28px rgba(26,20,16,0.07)",
                  animation: `fadeInUp 0.4s ease ${i * 0.08}s both`,
                }}
              >
                {/* Avatar */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "80px", height: "80px", borderRadius: "50%",
                      background: `${member.color}18`,
                      border: `2px solid ${member.color}55`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem", fontWeight: 700, color: member.color,
                    }}
                  >
                    {member.initials}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,20,16,0.4)", textAlign: "center" }}>
                    Since {member.since}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: member.color, marginBottom: "0.4rem" }}>
                    {member.role}
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 700, color: "#1A1410", marginBottom: "0.75rem" }}>
                    {member.name}
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 300, color: "#3A2818", lineHeight: 1.8, marginBottom: "1rem" }}>
                    {member.bio}
                  </p>
                  <a
                    href={`mailto:${member.contact}`}
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: member.color, textDecoration: "none" }}
                  >
                    {member.contact}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Join CTA */}
          <div
            style={{
              background: "#1A1410",
              borderRadius: "20px",
              padding: "3rem",
              textAlign: "center",
              boxShadow: "0 8px 48px rgba(26,20,16,0.15)",
            }}
          >
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: "0.75rem" }}>
              Want to get involved?
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "440px", margin: "0 auto 2rem" }}>
              SPTS is always looking for passionate community members to help lead and grow our programs.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/join"
                style={{ display: "inline-block", padding: "0.9rem 2rem", borderRadius: "999px", background: "#8B1A1A", color: "white", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#6A1010")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#8B1A1A")}
              >
                Join the Society
              </Link>
              <a
                href="mailto:president@sunprairietamil.org"
                style={{ display: "inline-block", padding: "0.9rem 2rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 400, textDecoration: "none" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.45)"; el.style.color = "white"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.18)"; el.style.color = "rgba(255,255,255,0.75)"; }}
              >
                Contact the Board →
              </a>
            </div>
          </div>

          <div style={{ marginTop: "3rem" }}>
            <Link href="/#palai" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#8A7060", textDecoration: "none" }}>
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
