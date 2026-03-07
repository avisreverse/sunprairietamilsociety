"use client";

// Note: params unwrapped via React.use() since this is a Client Component
import { use } from "react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Individual program detail page.
 * Static for now — Admin CMS (REQ-202603-004) will populate from Supabase.
 *
 * @see REQ-202603-002 — Programs section
 */

const PROGRAMS: Record<string, {
  nameEn: string;
  nameTa: string;
  tagline: string;
  description: string;
  color: string;
  details: string[];
  schedule: string;
  contact: string;
}> = {
  "tamil-school": {
    nameEn: "Tamil School",
    nameTa: "தமிழ்ப் பள்ளி",
    tagline: "Language, culture, and identity — for every child.",
    description:
      "Our Tamil School offers structured language classes for children of all ages. Students learn to read, write, and speak Tamil fluently through a curriculum that blends grammar, literature, and cultural context. Classes are taught by experienced volunteer teachers who are passionate about preserving the language for the next generation.",
    color: "#7A1515",
    details: [
      "Weekly Saturday classes for ages 5–16",
      "Levels from beginner to advanced",
      "Annual Tamil Sangam graduation ceremony",
      "Homework support and parent resources",
    ],
    schedule: "Saturdays, 10:00 AM – 12:30 PM",
    contact: "tamilschool@sunprairietamil.org",
  },
  "library": {
    nameEn: "Library",
    nameTa: "நூலகம்",
    tagline: "Thousands of Tamil books, right in Sun Prairie.",
    description:
      "The SPTS Library is a curated collection of Tamil literature, children's books, magazines, and cultural references — available to all community members. Our library program also hosts reading circles, storytime for young children, and an annual Tamil book fair.",
    color: "#1A5035",
    details: [
      "Over 500 Tamil books across genres",
      "Children's section with illustrated stories",
      "Monthly community reading circles",
      "Book donation and exchange program",
    ],
    schedule: "Open during Tamil School hours and events",
    contact: "library@sunprairietamil.org",
  },
  "music-club": {
    nameEn: "Music Club",
    nameTa: "இசைக் குழு",
    tagline: "The songs that connect generations.",
    description:
      "The SPTS Music Club brings together enthusiasts of Carnatic classical music, Tamil folk songs, and film music. Members of all skill levels meet regularly to practice, perform, and learn from each other. The club performs at all major SPTS cultural events and produces an annual showcase.",
    color: "#7A4A10",
    details: [
      "Carnatic vocal and instrumental practice",
      "Tamil folk and devotional music",
      "Annual Music & Dance Showcase performance",
      "Workshops with visiting artists",
    ],
    schedule: "Bi-weekly practice sessions — check events calendar",
    contact: "music@sunprairietamil.org",
  },
  "tamil-pattarai": {
    nameEn: "Tamil Pattarai",
    nameTa: "தமிழ்ப் பட்டறை",
    tagline: "Where culture becomes art.",
    description:
      "Tamil Pattarai is our creative arts studio — a space for drawing, painting, crafts, and cultural expression rooted in Tamil aesthetics. From Kolam design to traditional crafts, Pattarai nurtures creativity while deepening cultural connection. Open to children and adults alike.",
    color: "#1A2A7A",
    details: [
      "Kolam and rangoli workshops",
      "Tamil-themed drawing and painting sessions",
      "Festival decoration projects",
      "Youth art showcase at annual events",
    ],
    schedule: "Monthly workshops — check events calendar",
    contact: "pattarai@sunprairietamil.org",
  },
  "volunteer": {
    nameEn: "Volunteer",
    nameTa: "தன்னார்வலர்",
    tagline: "The community runs on care — yours included.",
    description:
      "Every program SPTS runs is made possible by volunteers. Whether you can teach, organize, cook, translate, design, photograph, or simply show up and help set up for events — there is a place for you. Volunteering with SPTS is one of the most direct ways to shape what Tamil community looks like in Sun Prairie.",
    color: "#4A1A7A",
    details: [
      "Event setup and coordination roles",
      "Tamil School teaching assistants",
      "Communications and social media help",
      "Food committee for cultural celebrations",
    ],
    schedule: "Flexible — based on events and programs",
    contact: "volunteer@sunprairietamil.org",
  },
};

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default function ProgramDetailPage({ params }: Props) {
  // Client Component: use React.use() to unwrap the params Promise
  const { slug } = use(params);
  const program = PROGRAMS[slug];

  if (!program) notFound();

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "7rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FDF8F0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 3.5rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <Link href="/programs" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Programs
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#1A1410" }}>{program.nameEn}</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ width: "40px", height: "4px", borderRadius: "2px", background: program.color, marginBottom: "1.5rem" }} />
            <div style={{ fontFamily: "var(--font-tamil)", fontSize: "1rem", color: `${program.color}99`, marginBottom: "0.5rem" }}>
              {program.nameTa}
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.1, marginBottom: "1rem" }}>
              {program.nameEn}
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", fontWeight: 300, color: "#6A5040", lineHeight: 1.7 }}>
              {program.tagline}
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(26,20,16,0.08)", marginBottom: "3rem" }} />

          {/* Description */}
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300, color: "#3A2818", lineHeight: 1.9, marginBottom: "3rem" }}>
            {program.description}
          </p>

          {/* Details + sidebar grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "3rem", alignItems: "start" }}>

            {/* Details list */}
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#1A1410", marginBottom: "1.25rem" }}>
                What to expect
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {program.details.map((item, i) => (
                  <li
                    key={i}
                    style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontFamily: "var(--font-body)", fontSize: "0.92rem", fontWeight: 300, color: "#3A2818", lineHeight: 1.6 }}
                  >
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: program.color, flexShrink: 0, marginTop: "0.55rem" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar card */}
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                border: "1px solid rgba(26,20,16,0.08)",
                padding: "2rem",
                boxShadow: "0 2px 16px rgba(26,20,16,0.04)",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.4rem" }}>
                  Schedule
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "#1A1410", lineHeight: 1.5 }}>
                  {program.schedule}
                </div>
              </div>
              <div style={{ height: "1px", background: "rgba(26,20,16,0.07)", marginBottom: "1.5rem" }} />
              <div style={{ marginBottom: "1.75rem" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.4rem" }}>
                  Contact
                </div>
                <a
                  href={`mailto:${program.contact}`}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: program.color, textDecoration: "none" }}
                >
                  {program.contact}
                </a>
              </div>
              <a
                href="#"
                style={{
                  display: "block", textAlign: "center",
                  padding: "0.9rem 1.5rem", borderRadius: "999px",
                  background: program.color, color: "white",
                  fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Get involved →
              </a>
            </div>
          </div>

          {/* Back link */}
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(26,20,16,0.08)" }}>
            <Link
              href="/programs"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#8A7060", textDecoration: "none" }}
            >
              ← All programs
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

// generateStaticParams not used — Client Component renders dynamically
