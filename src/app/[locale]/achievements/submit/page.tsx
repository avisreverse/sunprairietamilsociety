"use client";

import { useState, useRef } from "react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

/**
 * Submit Achievement page.
 * Form to nominate a community member for recognition.
 * Submits to POST /api/achievements/submit (no auth required).
 * Admin reviews at /admin/achievements before publishing.
 *
 * @see REQ-202603-005 — Achievement submit + detail pages
 * @see DEF-202603-009 — Achievement categories not extensible (Other option added)
 */

const CATEGORIES = ["Education", "Arts", "Music", "Community", "Sports", "Professional", "Other"];

const inputStyle = {
  width: "100%", padding: "0.85rem 1rem",
  borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.06)", color: "white",
  fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 300,
  outline: "none", boxSizing: "border-box" as const,
} as const;

export default function SubmitAchievementPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    customCategory: "",
    achievement: "",
    bio: "",
    submitted_by_email: "",
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Load selected file into local preview using object URL.
   * @param e - File input change event
   */
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  }

  /**
   * Submits nomination to POST /api/achievements/submit.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const resolvedCategory = form.category === "Other" ? form.customCategory.trim() : form.category;
    if (!resolvedCategory) {
      setError("Please specify a category.");
      setSubmitting(false);
      return;
    }

    const res = await fetch("/api/achievements/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        category: resolvedCategory,
        achievement: form.achievement,
        bio: form.bio,
        submitted_by_email: form.submitted_by_email,
        year: String(new Date().getFullYear()),
      }),
    });

    if (!res.ok) {
      const d = await res.json() as { error?: string };
      setError(d.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <>
        <Nav />
        <main style={{ paddingTop: "8.5rem", paddingBottom: "6rem", minHeight: "100vh", background: "#111010" }}>
          <div className="spts-inner" style={{ maxWidth: "680px", margin: "0 auto", padding: "0 3.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🏆</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 700, color: "white", marginBottom: "1rem" }}>
              Nomination received!
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Thank you for submitting. The SPTS board will review {form.name}&apos;s nomination and reach out if needed.
              Approved achievements will appear on our community achievements wall.
            </p>
            <Link
              href="/#neytal"
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
              }}
            >
              ← Back to Achievements
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "8.5rem", paddingBottom: "6rem", minHeight: "100vh", background: "#111010" }}>
        <div className="spts-inner" style={{ maxWidth: "680px", margin: "0 auto", padding: "0 3.5rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.78rem" }}>→</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>Submit Achievement</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ width: "36px", height: "3px", borderRadius: "2px", background: "#D4930A", marginBottom: "1.5rem" }} />
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: "0.75rem" }}>
              Submit Achievement
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
              Know someone in our community doing remarkable things? Nominate them to be featured on the SPTS achievements wall.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "2.5rem",
              boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
            }}
          >
            {error && (
              <div style={{
                background: "rgba(192,57,43,0.15)",
                border: "1px solid rgba(192,57,43,0.3)",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
                marginBottom: "1.5rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "#e74c3c",
              }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Name */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#D4930A", marginBottom: "0.5rem" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Person being nominated"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              {/* Category — DEF-202603-009: "Other" free-form option added */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#D4930A", marginBottom: "0.5rem" }}>
                  Category *
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  style={{ ...inputStyle, background: "rgba(26,20,16,0.9)", color: "rgba(255,255,255,0.8)" }}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {/* Show free-form input when "Other" is selected */}
                {form.category === "Other" && (
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dance, Entrepreneurship, Science…"
                    value={form.customCategory}
                    onChange={(e) => setForm((f) => ({ ...f, customCategory: e.target.value }))}
                    style={{ ...inputStyle, marginTop: "0.5rem" }}
                  />
                )}
              </div>

              {/* Achievement */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#D4930A", marginBottom: "0.5rem" }}>
                  Achievement *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. State Bharatanatyam Award 2025"
                  value={form.achievement}
                  onChange={(e) => setForm((f) => ({ ...f, achievement: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              {/* Bio / Tell us more */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#D4930A", marginBottom: "0.5rem" }}>
                  Tell us more
                </label>
                <textarea
                  placeholder="Describe the achievement and why it deserves recognition…"
                  rows={4}
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  style={{ ...inputStyle, resize: "vertical" as const, lineHeight: 1.6 }}
                />
              </div>

              {/* Photo upload — local preview only (admin uploads final photo after approval) */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#D4930A", marginBottom: "0.5rem" }}>
                  Photo (optional — admin will request if needed)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: "100%", padding: photoPreview ? "1rem" : "2rem",
                    borderRadius: "10px",
                    border: photoPreview ? "2px solid rgba(212,147,10,0.4)" : "2px dashed rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.03)",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box" as const,
                  }}
                >
                  {photoPreview ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <img
                        src={photoPreview}
                        alt="Preview"
                        style={{ width: "72px", height: "72px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }}
                      />
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500, color: "#D4930A", marginBottom: "0.2rem" }}>
                          Photo selected
                        </div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>
                          Click to change
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📷</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 300, color: "rgba(255,255,255,0.45)", marginBottom: "0.25rem" }}>
                        Click to select a photo
                      </div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}>
                        JPG, PNG, WEBP — up to 5MB
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Your contact */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#D4930A", marginBottom: "0.5rem" }}>
                  Your Email (so we can follow up)
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.submitted_by_email}
                  onChange={(e) => setForm((f) => ({ ...f, submitted_by_email: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: "1rem 2rem", borderRadius: "999px",
                  background: submitting ? "rgba(139,26,26,0.5)" : "#8B1A1A",
                  color: "white", border: "none",
                  fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500,
                  cursor: submitting ? "not-allowed" : "pointer", marginTop: "0.5rem",
                  transition: "background 0.2s",
                }}
              >
                {submitting ? "Submitting…" : "Submit Nomination →"}
              </button>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 300, color: "rgba(255,255,255,0.25)", lineHeight: 1.6, textAlign: "center" }}>
                All nominations are reviewed by the SPTS board before being published.
              </p>
            </div>
          </form>

          {/* Back */}
          <div style={{ marginTop: "3rem" }}>
            <Link href="/#neytal" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
              ← Back to Achievements
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
