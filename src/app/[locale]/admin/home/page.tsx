"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";
import { fetchAdmin } from "@/lib/fetchAdmin";

/**
 * Admin page: edit home page hero content (site_settings table).
 * Fields: hero_story, hero_year, hero_tagline, hero_subtext.
 *
 * @see REQ-202603-010 — Home page admin editing
 * @see 006_create_site_settings.up.sql
 */

interface Setting {
  key: string;
  value: string;
  label: string;
  description: string;
  updated_at: string;
}

const FIELD_ORDER = ["hero_story", "hero_year", "hero_tagline", "hero_subtext"];

export default function AdminHomePage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [edited, setEdited] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdmin("/api/admin/site-settings")
      .then((r) => r.json())
      .then((data: Setting[]) => {
        setSettings(data);
        // Pre-populate edited values from current DB values
        const initial: Record<string, string> = {};
        data.forEach((s) => { initial[s.key] = s.value; });
        setEdited(initial);
      })
      .catch(() => setError("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (key: string) => {
    setSaving((prev) => ({ ...prev, [key]: true }));
    try {
      const res = await fetchAdmin("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: edited[key] ?? "" }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setSaved((prev) => ({ ...prev, [key]: false })), 2500);
      // Update local state
      setSettings((prev) => prev.map((s) => s.key === key ? { ...s, value: edited[key] ?? "" } : s));
      console.log(`✅ [AdminHome] Saved key="${key}"`);
    } catch (err) {
      console.error("❌ [AdminHome] Save error:", err);
      setError("Save failed. Please try again.");
    } finally {
      setSaving((prev) => ({ ...prev, [key]: false }));
    }
  };

  const ordered = FIELD_ORDER
    .map((k) => settings.find((s) => s.key === k))
    .filter(Boolean) as Setting[];

  return (
    <div style={{ minHeight: "100vh", background: "#111010" }}>
      <AdminNav />

      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <Link
            href="/en/admin"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", display: "inline-block", marginBottom: "1.5rem" }}
          >
            ← Back to dashboard
          </Link>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.5rem" }}>
            Home Page
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem,3vw,2.5rem)", fontWeight: 700, color: "white", margin: 0 }}>
            Hero Content
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: "0.5rem", lineHeight: 1.6 }}>
            Edit the text shown in the hero section of the public home page. Changes go live immediately.
          </p>
        </div>

        {error && (
          <div style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.4)", borderRadius: "8px", padding: "0.85rem 1rem", marginBottom: "1.5rem", color: "#e74c3c", fontFamily: "var(--font-body)", fontSize: "0.82rem" }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>Loading settings…</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {ordered.map((setting) => {
              const isMultiLine = setting.key === "hero_story";
              const isDirty = (edited[setting.key] ?? "") !== setting.value;
              return (
                <div
                  key={setting.key}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.5rem" }}
                >
                  <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 600, color: "white", marginBottom: "0.3rem" }}>
                    {setting.label}
                  </label>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: "0.85rem", lineHeight: 1.5 }}>
                    {setting.description}
                  </p>

                  {isMultiLine ? (
                    <textarea
                      value={edited[setting.key] ?? ""}
                      onChange={(e) => setEdited((prev) => ({ ...prev, [setting.key]: e.target.value }))}
                      rows={5}
                      style={{
                        width: "100%", boxSizing: "border-box",
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "8px", padding: "0.75rem 1rem",
                        fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "white",
                        lineHeight: 1.6, resize: "vertical", outline: "none",
                      }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={edited[setting.key] ?? ""}
                      onChange={(e) => setEdited((prev) => ({ ...prev, [setting.key]: e.target.value }))}
                      style={{
                        width: "100%", boxSizing: "border-box",
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "8px", padding: "0.75rem 1rem",
                        fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "white",
                        outline: "none",
                      }}
                    />
                  )}

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.85rem" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "rgba(255,255,255,0.2)" }}>
                      Last updated: {new Date(setting.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <button
                      onClick={() => handleSave(setting.key)}
                      disabled={saving[setting.key] || !isDirty}
                      style={{
                        padding: "0.5rem 1.25rem",
                        borderRadius: "999px",
                        border: "none",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        cursor: saving[setting.key] || !isDirty ? "not-allowed" : "pointer",
                        background: saved[setting.key]
                          ? "#27AE60"
                          : isDirty
                            ? "#D4930A"
                            : "rgba(255,255,255,0.08)",
                        color: isDirty || saved[setting.key] ? "white" : "rgba(255,255,255,0.3)",
                        transition: "all 0.2s",
                      }}
                    >
                      {saving[setting.key] ? "Saving…" : saved[setting.key] ? "✓ Saved" : "Save"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Live preview link */}
        <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link
            href="/en"
            target="_blank"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#D4930A", textDecoration: "none" }}
          >
            View home page ↗
          </Link>
        </div>
      </main>
    </div>
  );
}
