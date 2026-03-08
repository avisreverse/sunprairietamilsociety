"use client";

import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

/**
 * Join SPTS page — membership/contact form.
 * Static form; backend via Supabase + email when Admin CMS ships (REQ-202603-004).
 *
 * @see REQ-202603-001 — Landing page
 */

const WAYS_TO_JOIN = [
  { emoji: "📚", title: "Enroll in Tamil School", desc: "Register your child for weekly Tamil language classes." },
  { emoji: "🎵", title: "Join Music Club", desc: "Participate in Carnatic and folk music practice sessions." },
  { emoji: "🎨", title: "Tamil Pattarai", desc: "Join our arts studio for cultural creative workshops." },
  { emoji: "🤝", title: "Volunteer", desc: "Help run events, teach, organize, or support programs." },
  { emoji: "📖", title: "Library Member", desc: "Access our Tamil book collection and reading programs." },
];

export default function JoinPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: "8.5rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FDF8F0" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 3.5rem" }}>

          {/* Breadcrumb */}
          <div style={{ marginBottom: "3rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              ← Back to home
            </Link>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "4rem", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-tamil)", fontSize: "1.1rem", color: "#B8750A", marginBottom: "0.75rem" }}>
              தமிழ்ச் சமூகம்
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.1, marginBottom: "1rem" }}>
              Join the Society
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300, color: "#4A3828", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto" }}>
              Sun Prairie Tamil Society is your community — open to all Tamil families in Wisconsin who want to stay connected to language, culture, and belonging.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>

            {/* Ways to join */}
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#1A1410", marginBottom: "1.5rem" }}>
                How you can get involved
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {WAYS_TO_JOIN.map((way) => (
                  <div
                    key={way.title}
                    style={{
                      background: "white",
                      borderRadius: "14px",
                      padding: "1.25rem 1.5rem",
                      border: "1px solid rgba(26,20,16,0.07)",
                      display: "flex", alignItems: "flex-start", gap: "1rem",
                      boxShadow: "0 2px 16px rgba(26,20,16,0.05)",
                    }}
                  >
                    <span style={{ fontSize: "1.4rem", flexShrink: 0, lineHeight: 1.2 }}>{way.emoji}</span>
                    <div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 600, color: "#1A1410", marginBottom: "0.25rem" }}>{way.title}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 300, color: "#4A3828", lineHeight: 1.6 }}>{way.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                border: "1px solid rgba(26,20,16,0.07)",
                padding: "2.5rem",
                boxShadow: "0 6px 40px rgba(26,20,16,0.09)",
              }}
            >
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#1A1410", marginBottom: "0.5rem" }}>
                Get in touch
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 300, color: "#8A7060", lineHeight: 1.6, marginBottom: "2rem" }}>
                Tell us how you'd like to connect and we'll reach out.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.45rem" }}>
                    Your Name *
                  </label>
                  <input type="text" placeholder="Full name" style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid rgba(26,20,16,0.12)", background: "#FAF7F0", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#1A1410", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.45rem" }}>
                    Email *
                  </label>
                  <input type="email" placeholder="your@email.com" style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid rgba(26,20,16,0.12)", background: "#FAF7F0", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#1A1410", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.45rem" }}>
                    Interested in
                  </label>
                  <select style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid rgba(26,20,16,0.12)", background: "#FAF7F0", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#1A1410", outline: "none", boxSizing: "border-box" }}>
                    <option value="">Select a program</option>
                    <option value="school">Tamil School (child enrollment)</option>
                    <option value="library">Library membership</option>
                    <option value="music">Music Club</option>
                    <option value="pattarai">Tamil Pattarai</option>
                    <option value="volunteer">Volunteering</option>
                    <option value="general">General membership</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.45rem" }}>
                    Message
                  </label>
                  <textarea placeholder="Anything you'd like us to know..." rows={3} style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid rgba(26,20,16,0.12)", background: "#FAF7F0", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#1A1410", outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }} />
                </div>
                <button
                  type="button"
                  style={{ padding: "0.95rem 2rem", borderRadius: "999px", background: "#8B1A1A", color: "white", border: "none", fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500, cursor: "pointer" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#6A1010")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#8B1A1A")}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
