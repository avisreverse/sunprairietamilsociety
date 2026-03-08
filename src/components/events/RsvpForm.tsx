"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Client-side RSVP form component.
 * Submits to POST /api/rsvp/[eventId].
 * Shown when an event has rsvp_required = true.
 *
 * @see REQ-202603-007 — RSVP page
 * @see DEF-202603-008 — RSVP page not built (fixed)
 */

interface Props {
  eventId: string;
  accentColor: string;
}

const S = {
  label: {
    display: "block" as const,
    fontFamily: "var(--font-body)",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#8A7060",
    marginBottom: "0.5rem",
  },
  input: (accent: string) => ({
    width: "100%",
    padding: "0.85rem 1rem",
    borderRadius: "10px",
    border: `1px solid rgba(26,20,16,0.12)`,
    background: "white",
    color: "#1A1410",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    fontWeight: 300,
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
    accentColor: accent,
  }),
};

export default function RsvpForm({ eventId, accentColor }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", guest_count: 1, notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  /**
   * Submits the RSVP form to the public API endpoint.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch(`/api/rsvp/${eventId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
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
      <div style={{
        background: "white",
        border: `2px solid ${accentColor}30`,
        borderRadius: "20px",
        padding: "3rem 2.5rem",
        textAlign: "center",
        boxShadow: "0 8px 48px rgba(26,20,16,0.08)",
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#1A1410", marginBottom: "0.75rem" }}>
          You&apos;re registered!
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 300, color: "#4A3828", lineHeight: 1.7, marginBottom: "2rem" }}>
          Thanks, {form.name}! We&apos;ve received your RSVP for {form.guest_count} {form.guest_count === 1 ? "person" : "people"}.<br />
          A confirmation has been noted. See you there!
        </p>
        <button
          onClick={() => router.push("/events")}
          style={{
            padding: "0.75rem 2rem",
            borderRadius: "999px",
            background: accentColor,
            color: "white",
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
          }}
        >
          View all events →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: "white",
      border: "1px solid rgba(26,20,16,0.08)",
      borderRadius: "20px",
      padding: "2.5rem",
      boxShadow: "0 8px 48px rgba(26,20,16,0.08)",
    }}>
      {error && (
        <div style={{
          background: "#FEE2E2",
          border: "1px solid #FCA5A5",
          borderRadius: "10px",
          padding: "0.75rem 1rem",
          marginBottom: "1.5rem",
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          color: "#991B1B",
        }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Name */}
        <div>
          <label style={S.label}>Full Name *</label>
          <input
            type="text"
            required
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            style={S.input(accentColor)}
          />
        </div>

        {/* Email */}
        <div>
          <label style={S.label}>Email *</label>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            style={S.input(accentColor)}
          />
        </div>

        {/* Guest count */}
        <div>
          <label style={S.label}>Number of attendees</label>
          <select
            value={form.guest_count}
            onChange={(e) => setForm((f) => ({ ...f, guest_count: Number(e.target.value) }))}
            style={{ ...S.input(accentColor), cursor: "pointer" }}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label style={S.label}>Any special notes? (optional)</label>
          <textarea
            placeholder="Dietary restrictions, accessibility needs, etc."
            rows={3}
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            style={{ ...S.input(accentColor), resize: "vertical" as const, lineHeight: 1.6 }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "1rem 2rem",
            borderRadius: "999px",
            background: submitting ? "rgba(26,20,16,0.15)" : accentColor,
            color: "white",
            border: "none",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: submitting ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {submitting ? "Submitting…" : "Confirm RSVP →"}
        </button>
      </div>
    </form>
  );
}
