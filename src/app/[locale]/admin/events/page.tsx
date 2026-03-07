"use client";

import { useEffect, useState, useCallback } from "react";
import AdminNav from "@/components/admin/AdminNav";

/**
 * Admin Events page — list, add, edit, delete events. Set RSVP.
 *
 * @see REQ-202603-004 — Admin CMS
 * @see D-016 — RSVP is admin-optional per event
 */

interface Event {
  id: string;
  title: string;
  title_ta: string | null;
  date: string;
  time: string | null;
  location: string | null;
  description: string | null;
  featured: boolean;
  rsvp_url: string | null;
  rsvp_required: boolean;
  is_published: boolean;
  display_order: number;
}

const EMPTY: Omit<Event, "id"> = {
  title: "", title_ta: "", date: "", time: "", location: "", description: "",
  featured: false, rsvp_url: "", rsvp_required: false, is_published: true, display_order: 0,
};

const S = {
  label: { fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.35rem" },
  input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "7px", padding: "0.6rem 0.85rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "white", outline: "none", boxSizing: "border-box" as const },
  btn: (color: string, bg: string) => ({ background: bg, border: `1px solid ${color}`, borderRadius: "7px", padding: "0.45rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, color, cursor: "pointer" }),
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState<Omit<Event, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/events");
    if (res.ok) setEvents(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setShowForm(true); setError(null); };
  const openEdit = (ev: Event) => { setEditing(ev); setForm({ ...ev }); setShowForm(true); setError(null); };
  const cancel = () => { setShowForm(false); setEditing(null); setError(null); };

  const save = async () => {
    setSaving(true);
    setError(null);
    const url = editing ? `/api/admin/events/${editing.id}` : "/api/admin/events";
    const method = editing ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, rsvp_url: form.rsvp_url || null }),
    });
    if (!res.ok) {
      const d = await res.json();
      setError(d.error || "Save failed");
    } else {
      await load();
      setShowForm(false);
    }
    setSaving(false);
  };

  const togglePublish = async (ev: Event) => {
    await fetch(`/api/admin/events/${ev.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !ev.is_published }),
    });
    await load();
  };

  const toggleFeatured = async (ev: Event) => {
    await fetch(`/api/admin/events/${ev.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !ev.featured }),
    });
    await load();
  };

  const del = async (ev: Event) => {
    if (!confirm(`Delete "${ev.title}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/events/${ev.id}`, { method: "DELETE" });
    await load();
  };

  const set = (k: keyof typeof EMPTY, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={{ minHeight: "100vh", background: "#111010" }}>
      <AdminNav />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.25rem" }}>Admin</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "white", margin: 0 }}>Events</h1>
          </div>
          <button style={S.btn("#D4930A", "rgba(212,147,10,0.15)")} onClick={openAdd}>+ Add Event</button>
        </div>

        {/* Form modal */}
        {showForm && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "1.5rem" }}>
              {editing ? "Edit Event" : "New Event"}
            </h2>

            {error && <div style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: "8px", padding: "0.65rem 1rem", marginBottom: "1rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#e74c3c" }}>{error}</div>}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Title (English) *</label>
                <input style={S.input} value={form.title} onChange={(e) => set("title", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Title (Tamil)</label>
                <input style={S.input} value={form.title_ta || ""} onChange={(e) => set("title_ta", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Date *</label>
                <input type="date" style={S.input} value={form.date} onChange={(e) => set("date", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Time</label>
                <input style={S.input} placeholder="e.g. 4:00 PM" value={form.time || ""} onChange={(e) => set("time", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Location</label>
                <input style={S.input} value={form.location || ""} onChange={(e) => set("location", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Description</label>
                <textarea style={{ ...S.input, minHeight: "80px", resize: "vertical" }} value={form.description || ""} onChange={(e) => set("description", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>RSVP URL (external link, optional)</label>
                <input style={S.input} placeholder="https://forms.google.com/..." value={form.rsvp_url || ""} onChange={(e) => set("rsvp_url", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1", display: "flex", gap: "2rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
                  Featured event
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={form.rsvp_required} onChange={(e) => set("rsvp_required", e.target.checked)} />
                  RSVP required (internal form)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={form.is_published} onChange={(e) => set("is_published", e.target.checked)} />
                  Published
                </label>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button style={S.btn("#D4930A", "#D4930A")} onClick={save} disabled={saving}>
                <span style={{ color: "#0D0D0D" }}>{saving ? "Saving…" : "Save Event"}</span>
              </button>
              <button style={S.btn("rgba(255,255,255,0.3)", "transparent")} onClick={cancel}>Cancel</button>
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)", padding: "3rem 0", textAlign: "center" }}>Loading…</div>
        ) : events.length === 0 ? (
          <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)", padding: "3rem 0", textAlign: "center" }}>No events yet. Add one above.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {events.map((ev) => (
              <div key={ev.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.25rem" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.98rem", fontWeight: 600, color: "white" }}>{ev.title}</span>
                    {ev.featured && <span style={{ background: "rgba(212,147,10,0.2)", border: "1px solid rgba(212,147,10,0.4)", borderRadius: "999px", padding: "0.1rem 0.55rem", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", color: "#D4930A", textTransform: "uppercase" }}>Featured</span>}
                    {!ev.is_published && <span style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.1rem 0.55rem", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Draft</span>}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>
                    {ev.date} {ev.time && `· ${ev.time}`} {ev.location && `· ${ev.location}`}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button style={S.btn("rgba(255,255,255,0.35)", "transparent")} onClick={() => toggleFeatured(ev)}>{ev.featured ? "Unfeature" : "Feature"}</button>
                  <button style={S.btn("rgba(255,255,255,0.35)", "transparent")} onClick={() => togglePublish(ev)}>{ev.is_published ? "Unpublish" : "Publish"}</button>
                  <button style={S.btn("#D4930A", "rgba(212,147,10,0.1)")} onClick={() => openEdit(ev)}>Edit</button>
                  <button style={S.btn("#e74c3c", "rgba(192,57,43,0.1)")} onClick={() => del(ev)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
