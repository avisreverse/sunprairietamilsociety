"use client";

import { use } from "react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Individual achievement detail page.
 * Static data — Admin CMS (REQ-202603-004) will replace with Supabase records.
 * Achievement ID is the array index (0-based).
 *
 * @see REQ-202603-001 — Landing page
 * @see REQ-202603-004 — Admin CMS (backlog)
 */

const ACHIEVEMENTS = [
  {
    initials: "SA",
    name: "Siva Arumugam",
    category: "Education",
    achievement: "Tamil School Top Student",
    year: "2024",
    color: "#C0392B",
    description:
      "Siva demonstrated outstanding dedication to learning Tamil language throughout the 2023–2024 academic year. He consistently scored at the top of his class, mastered reading and writing at the advanced level, and represented SPTS at the Wisconsin Tamil School Symposium.",
    highlight: "Received the annual Tamil School Excellence Award at the 2024 graduation ceremony.",
  },
  {
    initials: "PM",
    name: "Priya Murugan",
    category: "Arts",
    achievement: "State Bharatanatyam Award",
    year: "2024",
    color: "#27AE60",
    description:
      "Priya has been training in classical Bharatanatyam for over eight years. In 2024, she was awarded the State-level Bharatanatyam recognition by the Wisconsin Cultural Arts Council — a first for a Sun Prairie Tamil community member.",
    highlight: "First Sun Prairie Tamil artist to receive the Wisconsin Cultural Arts Council recognition.",
  },
  {
    initials: "KV",
    name: "Karthik Vel",
    category: "Music",
    achievement: "Carnatic Music Excellence",
    year: "2024",
    color: "#E67E22",
    description:
      "Karthik has been a dedicated member of the SPTS Music Club since age 10. In 2024, he performed a full classical Carnatic concert — a major milestone — earning wide recognition from the Tamil music community in the Midwest.",
    highlight: "Performed a full-length Carnatic concert at the 2024 SPTS Annual Music Showcase.",
  },
  {
    initials: "DL",
    name: "Divya Lakshmi",
    category: "Community",
    achievement: "Volunteer of the Year",
    year: "2023",
    color: "#2980B9",
    description:
      "Divya has volunteered over 200 hours in 2023 alone — coordinating events, mentoring Tamil School students, and organizing the annual Pongal and Diwali celebrations. Her energy and commitment inspire everyone around her.",
    highlight: "Over 200 volunteer hours in 2023. Recognized at the SPTS Annual Celebration.",
  },
  {
    initials: "AR",
    name: "Arun Raj",
    category: "Education",
    achievement: "Tamil Literature Prize",
    year: "2023",
    color: "#8E44AD",
    description:
      "Arun's original Tamil short story, written in his second year of advanced Tamil School, won the regional Tamil Literature Prize in 2023. His writing blends classical Tamil verse with modern storytelling — a rare talent.",
    highlight: "Winner of the 2023 Regional Tamil Youth Literature Prize.",
  },
  {
    initials: "MN",
    name: "Meena Nathan",
    category: "Arts",
    achievement: "Kolam Design Champion",
    year: "2023",
    color: "#C0392B",
    description:
      "Meena has been creating Kolam patterns since childhood. In 2023, her large-scale Kolam installation at the SPTS Pongal celebration drew widespread admiration — and she went on to win the regional Kolam championship that same year.",
    highlight: "2023 Regional Kolam Championship winner. Featured in the Wisconsin Tamil Community Magazine.",
  },
];

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default function AchievementDetailPage({ params }: Props) {
  const { id } = use(params);
  const index = parseInt(id, 10);
  const item = ACHIEVEMENTS[index];

  if (!item || isNaN(index)) notFound();

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "7rem", paddingBottom: "6rem", minHeight: "100vh", background: "#111010" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 3.5rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>Achievements</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-block",
                padding: "0.25rem 0.75rem", borderRadius: "999px",
                background: `${item.color}22`, border: `1px solid ${item.color}44`,
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em",
                textTransform: "uppercase", color: item.color,
                marginBottom: "1.5rem",
              }}
            >
              {item.category}
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: "0.75rem" }}>
              {item.achievement}
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 300, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
              {item.year}
            </p>
          </div>

          {/* Person card */}
          <div
            style={{
              background: `linear-gradient(135deg, ${item.color}15 0%, rgba(255,255,255,0.04) 70%)`,
              border: `1px solid ${item.color}30`,
              borderRadius: "20px",
              padding: "2.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem" }}>
              <div
                style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: `${item.color}30`,
                  border: `2px solid ${item.color}70`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem", fontWeight: 700, color: item.color,
                  flexShrink: 0,
                }}
              >
                {item.initials}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "white" }}>{item.name}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 400, color: "rgba(255,255,255,0.35)", marginTop: "0.2rem" }}>Sun Prairie Tamil Society · {item.year}</div>
              </div>
            </div>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 300, color: "rgba(255,255,255,0.7)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
              {item.description}
            </p>

            {/* Highlight callout */}
            <div
              style={{
                borderLeft: `3px solid ${item.color}`,
                paddingLeft: "1.25rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.88rem",
                fontWeight: 400,
                color: item.color,
                lineHeight: 1.7,
              }}
            >
              {item.highlight}
            </div>
          </div>

          {/* Submit your own CTA */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              marginBottom: "3rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: "0.35rem" }}>
                Know someone remarkable?
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                Nominate a community member. Submissions are reviewed by the SPTS board.
              </div>
            </div>
            <Link
              href="/achievements/submit"
              style={{
                display: "inline-block",
                padding: "0.85rem 1.75rem", borderRadius: "999px",
                background: "#8B1A1A", color: "white",
                fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500,
                textDecoration: "none", flexShrink: 0,
              }}
            >
              Submit Nomination →
            </Link>
          </div>

          {/* Back */}
          <Link href="/#neytal" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
            ← Back to Achievements
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
