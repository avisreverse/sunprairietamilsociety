"use client";

import { useEffect, useState, useCallback } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { fetchAdmin } from "@/lib/fetchAdmin";

/**
 * Admin Achievements page — approve, reject, publish, edit community achievements.
 * Submitted publicly via /achievements/submit; admin decides what goes live.
 *
 * @see REQ-202603-004 — Admin CMS
 * @see REQ-202603-005 — Achievement submit + detail pages
 */

interface Achievement {
  id: string;
  name: string;
  initials: string;
  category: string;
  achievement: string;
  year: string;
  color: string;
  bio: string | null;
  is_approved: boolean;
  is_published: boolean;
  submitted_by_name: string | null;
  submitted_by_email: string | null;
  submitted_at: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Education: "#C0392B", Arts: "#27AE60", Music: "#E67E22",
  Community: "#2980B9", Sports: "#8E44AD", Other: "#7F8C8D",
};

const CATEGORIES = ["Education", "Arts", "Music", "Community", "Sports", "Other"];

const S = {
  label: { fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.35rem" },
  input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "7px", padding: "0.6rem 0.85rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "white", outline: "none", boxSizing: "border-box" as const },
  btn: (color: string, bg: string) => ({ background: bg, border: `1px solid ${color}`, borderRadius: "7px", padding: "0.4rem 0.9rem", fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, color, cursor: "pointer" }),
};

const EMPTY = { name: "", initials: "", category: "Education", achievement: "", year: new Date().getFullYear().toString(), color: "#C0392B", bio: "", is_approved: false, is_published: false };

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Achievement | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetchAdmin("/api/admin/achievements");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = items.filter((a) => {
    if (filter === "pending") return !a.is_approved;
    if (filter === "approved") return a.is_approved;
    return true;
  });

  const approve = async (a: Achievement) => {
    await fetchAdmin(`/api/admin/achievements/${a.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_approved: true, is_published: true }),
    });
    await load();
  };

  const togglePublish = async (a: Achievement) => {
    await fetchAdmin(`/api/admin/achievements/${a.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !a.is_published }),
    });
    await load();
  };

  const del = async (a: Achievement) => {
    if (!confirm(`Delete "${a.achievement}" by ${a.name}?`)) return;
    await fetchAdmin(`/api/admin/achievements/${a.id}`, { method: "DELETE" });
    await load();
  };

  const openEdit = (a: Achievement) => { setEditing(a); setForm({ ...a, bio: a.bio || "", color: a.color || "#C0392B" }); setShowForm(true); };
  const openAdd = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const cancel = () => { setShowForm(false); setEditing(null); };

  const save = async () => {
    setSaving(true);
    const url = editing ? `/api/admin/achievements/${editing.id}` : "/api/admin/achievements";
    const method = editing ? "PATCH" : "POST";
    const payload = {
      ...form,
      initials: form.initials || form.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
      color: CATEGORY_COLORS[form.category] || form.color,
    };
    const res = await fetchAdmin(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { await load(); setShowForm(false); }
    setSaving(false);
  };

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const pending = items.filter((a) => !a.is_approved).length;

  return (
    <div style={{ minHeight: "100vh", background: "#111010" }}>
      <AdminNav />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.25rem" }}>Admin</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "white", margin: 0 }}>
              Achievements
              {pending > 0 && <span style={{ marginLeft: "0.75rem", background: "rgba(192,57,43,0.2)", border: "1px solid rgba(192,57,43,0.4)", borderRadius: "999px", padding: "0.15rem 0.7rem", fontSize: "0.65rem", fontWeight: 700, color: "#e74c3c", verticalAlign: "middle" }}>{pending} pending</span>}
            </h1>
          </div>
          <button style={S.btn("#D4930A", "rgba(212,147,10,0.15)")} onClick={openAdd}>+ Add Achievement</button>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.75rem" }}>
          {(["all", "pending", "approved"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ ...S.btn(filter === f ? "white" : "rgba(255,255,255,0.35)", filter === f ? "rgba(255,255,255,0.1)" : "transparent"), textTransform: "capitalize" }}>
              {f}
            </button>
          ))}
        </div>

        {/* Form */}
        {showForm && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "1.5rem" }}>{editing ? "Edit Achievement" : "Add Achievement"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={S.label}>Person Name *</label>
                <input style={S.input} value={form.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Initials (2 chars)</label>
                <input style={S.input} maxLength={2} value={form.initials} onChange={(e) => set("initials", e.target.value.toUpperCase())} placeholder="Auto" />
              </div>
              <div>
                <label style={S.label}>Category *</label>
                <select style={S.input} value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={S.label}>Year *</label>
                <input style={S.input} value={form.year} onChange={(e) => set("year", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Achievement / Award *</label>
                <input style={S.input} value={form.achievement} onChange={(e) => set("achievement", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Bio (optional)</label>
                <textarea style={{ ...S.input, minHeight: "70px", resize: "vertical" }} value={form.bio} onChange={(e) => set("bio", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1", display: "flex", gap: "2rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={form.is_approved} onChange={(e) => set("is_approved", e.target.checked)} />
                  Approved
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={form.is_published} onChange={(e) => set("is_published", e.target.checked)} />
                  Published (visible on site)
                </label>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button style={S.btn("#D4930A", "#D4930A")} onClick={save} disabled={saving}><span style={{ color: "#0D0D0D" }}>{saving ? "Saving…" : "Save"}</span></button>
              <button style={S.btn("rgba(255,255,255,0.3)", "transparent")} onClick={cancel}>Cancel</button>
            </div>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)", textAlign: "center", padding: "3rem 0" }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)", textAlign: "center", padding: "3rem 0" }}>No achievements in this view.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {filtered.map((a) => {
              const color = CATEGORY_COLORS[a.category] || "#888";
              return (
                <div key={a.id} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${a.is_approved ? "rgba(255,255,255,0.07)" : "rgba(192,57,43,0.25)"}`, borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: `${color}25`, border: `2px solid ${color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color, flexShrink: 0 }}>{a.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 600, color: "white" }}>{a.name}</span>
                      <span style={{ background: `${color}20`, borderRadius: "999px", padding: "0.08rem 0.5rem", fontSize: "0.62rem", fontWeight: 700, color, textTransform: "uppercase" }}>{a.category}</span>
                      {!a.is_approved && <span style={{ background: "rgba(192,57,43,0.2)", border: "1px solid rgba(192,57,43,0.35)", borderRadius: "999px", padding: "0.08rem 0.5rem", fontSize: "0.62rem", fontWeight: 700, color: "#e74c3c", textTransform: "uppercase" }}>Pending</span>}
                      {a.is_approved && !a.is_published && <span style={{ background: "rgba(255,255,255,0.06)", borderRadius: "999px", padding: "0.08rem 0.5rem", fontSize: "0.62rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Hidden</span>}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>{a.achievement} · {a.year}</div>
                    {a.submitted_by_name && <div style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", marginTop: "0.15rem" }}>Submitted by {a.submitted_by_name}</div>}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    {!a.is_approved && <button style={S.btn("#27AE60", "rgba(39,174,96,0.15)")} onClick={() => approve(a)}>Approve</button>}
                    {a.is_approved && <button style={S.btn("rgba(255,255,255,0.35)", "transparent")} onClick={() => togglePublish(a)}>{a.is_published ? "Hide" : "Show"}</button>}
                    <button style={S.btn("#D4930A", "rgba(212,147,10,0.1)")} onClick={() => openEdit(a)}>Edit</button>
                    <button style={S.btn("#e74c3c", "rgba(192,57,43,0.1)")} onClick={() => del(a)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
