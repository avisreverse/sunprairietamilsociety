"use client";

import { useEffect, useState, useCallback } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { fetchAdmin } from "@/lib/fetchAdmin";
import { createClient } from "@/lib/supabase/client";

/**
 * Admin Announcements page — manage external announcements shown as
 * floating dismissible cards on the public landing page.
 *
 * Features:
 * - Multiple simultaneous announcements (ordered by display_order)
 * - Optional poster image upload to Supabase Storage
 * - Optional external action URL + label
 * - Auto-expire by date (expires_at), or manually unpublish
 *
 * @see REQ-202603-009 — External announcement board
 */

interface Announcement {
  id: string;
  title: string;
  body: string | null;
  poster_url: string | null;
  action_url: string | null;
  action_label: string;
  is_published: boolean;
  expires_at: string | null;
  display_order: number;
}

const EMPTY: Omit<Announcement, "id"> = {
  title: "", body: "", poster_url: null, action_url: "", action_label: "Learn More",
  is_published: true, expires_at: "", display_order: 0,
};

const S = {
  label: { fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.35rem" },
  input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "7px", padding: "0.6rem 0.85rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "white", outline: "none", boxSizing: "border-box" as const },
  btn: (color: string, bg: string) => ({ background: bg, border: `1px solid ${color}`, borderRadius: "7px", padding: "0.45rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, color, cursor: "pointer" }),
};

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState<Omit<Announcement, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    // Fetch ALL announcements for admin (including unpublished/expired)
    const res = await fetchAdmin("/api/admin/announcements");
    if (res.ok) setAnnouncements(await res.json());
    setLoading(false);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { void load(); }, []); // load is stable (useCallback with no deps)

  const openAdd = () => { setEditing(null); setForm(EMPTY); setShowForm(true); setError(null); };
  const openEdit = (a: Announcement) => {
    setEditing(a);
    // Trim expires_at to date-only format for the date input
    const expiresDate = a.expires_at ? a.expires_at.split("T")[0] : "";
    setForm({ ...a, expires_at: expiresDate });
    setShowForm(true);
    setError(null);
  };
  const cancel = () => { setShowForm(false); setEditing(null); setError(null); };

  /**
   * Upload poster image directly to Supabase Storage media/announcements/ folder.
   * Uses timestamp as filename for uniqueness.
   * @see DEF-202603-015 — Supabase Storage media bucket pattern
   */
  const uploadPoster = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `announcements/${Date.now()}.${ext}`;
    const supabase = createClient();
    const { error: upErr } = await supabase.storage.from("media").upload(path, file, { upsert: true });
    if (upErr) { setError(`Upload failed: ${upErr.message}`); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
    setForm((f) => ({ ...f, poster_url: publicUrl }));
    setUploading(false);
  };

  const save = async () => {
    if (!form.title.trim()) { setError("Title is required."); return; }
    setSaving(true);
    setError(null);
    const url = editing ? `/api/admin/announcements/${editing.id}` : "/api/admin/announcements";
    const method = editing ? "PATCH" : "POST";
    // Convert empty expires_at to null; add end-of-day time so the full day is covered
    const payload = {
      ...form,
      body: form.body || null,
      action_url: form.action_url || null,
      poster_url: form.poster_url || null,
      expires_at: form.expires_at ? `${form.expires_at}T23:59:59Z` : null,
    };
    const res = await fetchAdmin(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Save failed");
    } else {
      await load();
      setShowForm(false);
    }
    setSaving(false);
  };

  const togglePublish = async (a: Announcement) => {
    await fetchAdmin(`/api/admin/announcements/${a.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !a.is_published }),
    });
    await load();
  };

  const del = async (a: Announcement) => {
    if (!confirm(`Delete "${a.title}"? This cannot be undone.`)) return;
    await fetchAdmin(`/api/admin/announcements/${a.id}`, { method: "DELETE" });
    await load();
  };

  const set = (k: keyof typeof EMPTY, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const isExpired = (a: Announcement) =>
    a.expires_at ? new Date(a.expires_at) < new Date() : false;

  return (
    <div style={{ minHeight: "100vh", background: "#111010" }}>
      <AdminNav />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.25rem" }}>Admin</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "white", margin: 0 }}>Announcements</h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", marginTop: "0.4rem" }}>
              Floating cards shown on the public landing page. Set an expiry date or unpublish manually.
            </p>
          </div>
          <button style={S.btn("#D4930A", "rgba(212,147,10,0.15)")} onClick={openAdd}>+ Add Announcement</button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,147,10,0.25)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "1.5rem" }}>
              {editing ? "Edit Announcement" : "New Announcement"}
            </h2>

            {error && (
              <div style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: "8px", padding: "0.65rem 1rem", marginBottom: "1rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#e74c3c" }}>
                {error}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Title *</label>
                <input style={S.input} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Tamil Heritage Youth Competition 2026" />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Write-up / Body</label>
                <textarea style={{ ...S.input, minHeight: "90px", resize: "vertical" }} value={form.body || ""} onChange={(e) => set("body", e.target.value)} placeholder="Details about the announcement, who it is for, key dates, etc." />
              </div>

              {/* Poster image upload */}
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Poster / Image (optional)</label>
                {form.poster_url && (
                  <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img src={form.poster_url} alt="poster" style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }} />
                    <button style={S.btn("rgba(255,255,255,0.35)", "transparent")} onClick={() => set("poster_url", null)}>Remove</button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={uploading}
                  onChange={(e) => { if (e.target.files?.[0]) uploadPoster(e.target.files[0]); }}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}
                />
                {uploading && <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#D4930A", marginTop: "0.35rem" }}>Uploading…</div>}
              </div>

              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Action URL (optional — link when user clicks / taps)</label>
                <input type="url" style={S.input} value={form.action_url || ""} onChange={(e) => set("action_url", e.target.value)} placeholder="https://forms.google.com/competition-registration" />
              </div>
              <div>
                <label style={S.label}>Action Button Label</label>
                <input style={S.input} value={form.action_label} onChange={(e) => set("action_label", e.target.value)} placeholder="Learn More" />
              </div>
              <div>
                <label style={S.label}>Expiry Date (auto-hides after this date)</label>
                <input type="date" style={S.input} value={form.expires_at || ""} onChange={(e) => set("expires_at", e.target.value)} />
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", marginTop: "0.25rem" }}>Leave blank for no auto-expiry</div>
              </div>
              <div>
                <label style={S.label}>Display Order</label>
                <input type="number" style={S.input} value={form.display_order} onChange={(e) => set("display_order", parseInt(e.target.value) || 0)} />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={form.is_published} onChange={(e) => set("is_published", e.target.checked)} />
                  Published (visible on site)
                </label>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button style={S.btn("#D4930A", "#D4930A")} onClick={save} disabled={saving || uploading}>
                <span style={{ color: "#0D0D0D" }}>{saving ? "Saving…" : "Save Announcement"}</span>
              </button>
              <button style={S.btn("rgba(255,255,255,0.3)", "transparent")} onClick={cancel}>Cancel</button>
            </div>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)", padding: "3rem 0", textAlign: "center" }}>Loading…</div>
        ) : announcements.length === 0 ? (
          <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)", padding: "3rem 0", textAlign: "center" }}>No announcements yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {announcements.map((a) => (
              <div
                key={a.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  opacity: a.is_published && !isExpired(a) ? 1 : 0.5,
                }}
              >
                {a.poster_url && (
                  <img src={a.poster_url} alt="" style={{ width: "64px", height: "44px", objectFit: "cover", borderRadius: "6px", flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.2rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 600, color: "white" }}>{a.title}</span>
                    {!a.is_published && <span style={{ background: "rgba(255,255,255,0.06)", borderRadius: "999px", padding: "0.08rem 0.5rem", fontSize: "0.6rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Draft</span>}
                    {isExpired(a) && <span style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: "999px", padding: "0.08rem 0.5rem", fontSize: "0.6rem", fontWeight: 700, color: "#e74c3c", textTransform: "uppercase" }}>Expired</span>}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
                    {a.expires_at ? `Expires ${a.expires_at.split("T")[0]}` : "No expiry"}{a.action_url ? " · Has link" : ""}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button style={S.btn("rgba(255,255,255,0.35)", "transparent")} onClick={() => togglePublish(a)}>{a.is_published ? "Unpublish" : "Publish"}</button>
                  <button style={S.btn("#D4930A", "rgba(212,147,10,0.1)")} onClick={() => openEdit(a)}>Edit</button>
                  <button style={S.btn("#e74c3c", "rgba(192,57,43,0.1)")} onClick={() => del(a)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
