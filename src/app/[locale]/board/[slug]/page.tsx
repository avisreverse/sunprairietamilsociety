"use client";

import { use } from "react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Individual board member detail page.
 * Slug is the member's URL identifier (e.g. "sivasankar").
 * Static data — Admin CMS (REQ-202603-004) will replace with Supabase records.
 *
 * @see REQ-202603-006 — Board member management
 * @see REQ-202603-004 — Admin CMS (backlog)
 */

const BOARD: Record<string, {
  initials: string;
  name: string;
  role: string;
  roleTa: string;
  color: string;
  bio: string;
  since: string;
  contact: string;
  responsibilities: string[];
}> = {
  "sivasankar": {
    initials: "SA",
    name: "Sivasankar A.",
    role: "President",
    roleTa: "தலைவர்",
    color: "#C0392B",
    bio: "Sivasankar has led SPTS since its founding, championing Tamil language education and cultural programs across Sun Prairie. A software engineer by profession, he brings both vision and operational discipline to the society. His goal: to make SPTS a model for Tamil community organizations across the Midwest.",
    since: "2012",
    contact: "president@sunprairietamil.org",
    responsibilities: [
      "Overall leadership and strategic direction of SPTS",
      "External partnerships with Tamil organizations and Wisconsin institutions",
      "Presides over all board meetings and decisions",
      "Represents SPTS at state and national Tamil community events",
    ],
  },
  "kavitha": {
    initials: "KV",
    name: "Kavitha V.",
    role: "Secretary",
    roleTa: "செயலர்",
    color: "#27AE60",
    bio: "Kavitha manages SPTS communications, member records, and coordinates between all program directors. She has been instrumental in growing SPTS membership from a small founding group to the thriving community it is today, and has expanded outreach to Tamil families across the broader Wisconsin region.",
    since: "2014",
    contact: "secretary@sunprairietamil.org",
    responsibilities: [
      "Maintains member registry and contact database",
      "Coordinates inter-program communications",
      "Records and distributes meeting minutes",
      "Manages community outreach and new member onboarding",
    ],
  },
  "murali": {
    initials: "MG",
    name: "Murali G.",
    role: "Treasurer",
    roleTa: "பொருளாளர்",
    color: "#E67E22",
    bio: "Murali oversees SPTS finances, event budgets, and grant applications. His careful stewardship ensures the society can sustain and grow its programs year after year. A CPA by training, he brings professional rigor to volunteer finances — a rare and valued contribution.",
    since: "2016",
    contact: "treasurer@sunprairietamil.org",
    responsibilities: [
      "Manages SPTS annual budget and financial records",
      "Oversees event budgets and vendor payments",
      "Prepares annual financial reports for the board",
      "Leads grant applications and sponsorship discussions",
    ],
  },
  "divya": {
    initials: "DK",
    name: "Divya K.",
    role: "Programs Director",
    roleTa: "திட்ட இயக்குநர்",
    color: "#2980B9",
    bio: "Divya designs and coordinates all SPTS cultural programs — from Tamil School curriculum to Music Club showcases and Tamil Pattarai workshops. Her creativity and energy are the heartbeat of SPTS programming. She has introduced several new program formats that have become annual SPTS traditions.",
    since: "2018",
    contact: "programs@sunprairietamil.org",
    responsibilities: [
      "Designs and coordinates all cultural programs",
      "Manages Tamil School curriculum and teacher volunteers",
      "Directs Music Club practice schedule and annual showcase",
      "Leads Tamil Pattarai arts workshops and youth programming",
    ],
  },
};

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default function BoardMemberPage({ params }: Props) {
  const { slug } = use(params);
  const member = BOARD[slug];

  if (!member) notFound();

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "7rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FDF8F0" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 3.5rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <Link href="/board" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Board
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#1A1410" }}>{member.name}</span>
          </div>

          {/* Person header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", marginBottom: "3rem" }}>
            <div
              style={{
                width: "96px", height: "96px", borderRadius: "50%",
                background: `${member.color}18`,
                border: `3px solid ${member.color}55`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: "2rem", fontWeight: 700, color: member.color,
                flexShrink: 0,
              }}
            >
              {member.initials}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-tamil)", fontSize: "0.85rem", color: `${member.color}99`, marginBottom: "0.3rem" }}>
                {member.roleTa}
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.1, marginBottom: "0.5rem" }}>
                {member.name}
              </h1>
              <div
                style={{
                  display: "inline-block",
                  padding: "0.2rem 0.75rem", borderRadius: "999px",
                  background: `${member.color}15`, border: `1px solid ${member.color}35`,
                  fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase", color: member.color,
                }}
              >
                {member.role}
              </div>
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(26,20,16,0.07)", marginBottom: "2.5rem" }} />

          {/* Bio */}
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300, color: "#3A2818", lineHeight: 1.9, marginBottom: "3rem" }}>
            {member.bio}
          </p>

          {/* Responsibilities + sidebar */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: "3rem", alignItems: "start", marginBottom: "4rem" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "#1A1410", marginBottom: "1.25rem" }}>
                Responsibilities
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {member.responsibilities.map((r, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 300, color: "#3A2818", lineHeight: 1.6 }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: member.color, flexShrink: 0, marginTop: "0.55rem" }} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: "white", borderRadius: "16px", border: "1px solid rgba(26,20,16,0.08)", padding: "1.75rem", boxShadow: "0 2px 16px rgba(26,20,16,0.04)" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.35rem" }}>
                  Board member since
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#1A1410" }}>
                  {member.since}
                </div>
              </div>
              <div style={{ height: "1px", background: "rgba(26,20,16,0.07)", marginBottom: "1.25rem" }} />
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8750A", marginBottom: "0.35rem" }}>
                  Contact
                </div>
                <a href={`mailto:${member.contact}`} style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: member.color, textDecoration: "none", wordBreak: "break-all" }}>
                  {member.contact}
                </a>
              </div>
              <a
                href={`mailto:${member.contact}`}
                style={{ display: "block", textAlign: "center", padding: "0.85rem 1.5rem", borderRadius: "999px", background: member.color, color: "white", fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500, textDecoration: "none" }}
              >
                Send a message →
              </a>
            </div>
          </div>

          {/* Back */}
          <div style={{ paddingTop: "2rem", borderTop: "1px solid rgba(26,20,16,0.08)" }}>
            <Link href="/board" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#8A7060", textDecoration: "none" }}>
              ← All board members
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
