import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Public announcement detail page — Server Component.
 * Shows poster image, title, full write-up, and action URL button.
 * Linked from the announcement ticker in the Nav.
 *
 * @see REQ-202603-009 — External announcement board
 */

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function AnnouncementDetailPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: item, error } = await supabase
    .from("announcements")
    .select("id,title,body,poster_url,action_url,action_label,expires_at,created_at,is_published")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (error || !item) {
    console.error(`⚠️ [AnnouncementDetailPage] Not found or not published: ${id}`);
    notFound();
  }

  // Format the created date for display
  const createdDate = item.created_at
    ? new Date(item.created_at + "").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  const expiresDate = item.expires_at
    ? new Date(item.expires_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "8.5rem", paddingBottom: "6rem", minHeight: "100vh", background: "#FAF7F0" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 2rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#8A7060", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "#C0A898", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#1A1410" }}>Announcement</span>
          </div>

          {/* Announcement label */}
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B1A1A", marginBottom: "0.75rem" }}>
            Announcement
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.2, marginBottom: "1rem" }}>
            {item.title}
          </h1>

          {/* Meta */}
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {createdDate && (
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#8A7060" }}>
                Posted {createdDate}
              </span>
            )}
            {expiresDate && (
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#8A7060" }}>
                · Open until {expiresDate}
              </span>
            )}
          </div>

          {/* Poster image */}
          {item.poster_url && (
            <div style={{ marginBottom: "2.5rem", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(26,20,16,0.1)" }}>
              <img
                src={item.poster_url}
                alt={item.title}
                style={{ width: "100%", display: "block", maxHeight: "480px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Body / write-up */}
          {item.body && (
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 300, color: "#3A2818", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
                {item.body}
              </p>
            </div>
          )}

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(26,20,16,0.08)", marginBottom: "2.5rem" }} />

          {/* Action button */}
          {item.action_url ? (
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href={item.action_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.9rem 2rem",
                  borderRadius: "999px",
                  background: "#8B1A1A",
                  color: "white",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                }}
              >
                {item.action_label || "Learn More"} →
              </a>
              <Link
                href="/"
                style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#8A7060", textDecoration: "none" }}
              >
                ← Back to home
              </Link>
            </div>
          ) : (
            <Link
              href="/"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#8A7060", textDecoration: "none" }}
            >
              ← Back to home
            </Link>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
