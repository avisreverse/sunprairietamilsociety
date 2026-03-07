"use client";

import { useState, useRef } from "react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

/**
 * Submit Achievement page.
 * Form to nominate a community member for recognition.
 * Photo upload handled by Supabase Storage (REQ-202603-004).
 * Currently static form — backend integration in Admin CMS phase.
 *
 * @see REQ-202603-001 — Landing page
 * @see REQ-202603-004 — Admin CMS (backlog)
 */

export default function SubmitAchievementPage() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Load selected file into local preview using object URL.
   * No server upload until Admin CMS / Supabase Storage is wired.
   * @param e - File input change event
   */
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  }

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "7rem", paddingBottom: "6rem", minHeight: "100vh", background: "#111010" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 3.5rem" }}>

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
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "2.5rem",
              boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Name */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.5rem" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Person being nominated"
                  style={{
                    width: "100%", padding: "0.85rem 1rem",
                    borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)", color: "white",
                    fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 300,
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Category */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.5rem" }}>
                  Category *
                </label>
                <select
                  style={{
                    width: "100%", padding: "0.85rem 1rem",
                    borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(26,20,16,0.9)", color: "rgba(255,255,255,0.8)",
                    fontFamily: "var(--font-body)", fontSize: "0.9rem",
                    outline: "none", boxSizing: "border-box",
                  }}
                >
                  <option value="">Select a category</option>
                  <option value="education">Education</option>
                  <option value="arts">Arts</option>
                  <option value="music">Music</option>
                  <option value="community">Community</option>
                  <option value="sports">Sports</option>
                  <option value="professional">Professional</option>
                </select>
              </div>

              {/* Achievement */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.5rem" }}>
                  Achievement *
                </label>
                <input
                  type="text"
                  placeholder="e.g. State Bharatanatyam Award 2025"
                  style={{
                    width: "100%", padding: "0.85rem 1rem",
                    borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)", color: "white",
                    fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 300,
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.5rem" }}>
                  Tell us more
                </label>
                <textarea
                  placeholder="Describe the achievement and why it deserves recognition..."
                  rows={4}
                  style={{
                    width: "100%", padding: "0.85rem 1rem",
                    borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)", color: "white",
                    fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 300,
                    outline: "none", resize: "vertical", boxSizing: "border-box",
                    lineHeight: 1.6,
                  }}
                />
              </div>

              {/* Photo upload — functional local preview */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.5rem" }}>
                  Photo (optional)
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
                    boxSizing: "border-box",
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
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.5rem" }}>
                  Your Email (so we can follow up)
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    width: "100%", padding: "0.85rem 1rem",
                    borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)", color: "white",
                    fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 300,
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="button"
                style={{
                  padding: "1rem 2rem", borderRadius: "999px",
                  background: "#8B1A1A", color: "white", border: "none",
                  fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500,
                  cursor: "pointer", marginTop: "0.5rem",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#6A1010")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#8B1A1A")}
              >
                Submit Nomination
              </button>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 300, color: "rgba(255,255,255,0.25)", lineHeight: 1.6, textAlign: "center" }}>
                All nominations are reviewed by the SPTS board before being published.
              </p>
            </div>
          </div>

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
