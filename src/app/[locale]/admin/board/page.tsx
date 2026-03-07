"use client";

import { useEffect, useState, useCallback } from "react";
import AdminNav from "@/components/admin/AdminNav";

/**
 * Admin Board Members page — add, edit, remove board members.
 *
 * @see REQ-202603-004 — Admin CMS
 * @see REQ-202603-006 — Board management
 */

interface BoardMember {
  id: string;
  slug: string;
  name: string;
  initials: string;
  role: string;
  bio: string | null;
  email: string | null;
  color: string;
  display_order: number;
  is_active: boolean;
}

const S = {
  label: { fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.35rem" },
  input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "7px", padding: "0.6rem 0.85rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "white", outline: "none", boxSizing: "border-box" as const },
  btn: (color: string, bg: string) => ({ background: bg, border: `1px solid ${color}`, borderRadius: "7px", padding: "0.4rem 0.9rem", fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, color, cursor: "pointer" }),
};

const COLOR_OPTIONS = ["#C0392B", "#27AE60", "#E67E22", "#2980B9", "#8E44AD", "#1B5E3B"];

const EMPTY = { slug: "", name: "", initials: "", role: "", bio: "", email: "", color: "#C0392B", display_order: 0, is_active: true };

export default function AdminBoardPage() {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BoardMember | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/board");
    if (res.ok) setMembers(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    const nextOrder = members.length + 1;
    setEditing(null); setForm({ ...EMPTY, display_order: nextOrder }); setShowForm(true); setError(null);
  };
  const openEdit = (m: BoardMember) => { setEditing(m); setForm({ ...m, bio: m.bio || "", email: m.email || "" }); setShowForm(true); setError(null); };
  const cancel = () => { setShowForm(false); setEditing(null); setError(null); };

  const save = async () => {
    setSaving(true);
    setError(null);
    // Auto-generate slug from name if empty
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const initials = form.initials || form.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const url = editing ? `/api/admin/board/${editing.id}` : "/api/admin/board";
    const method = editing ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, slug, initials, bio: form.bio || null, email: form.email || null }),
    });
    if (!res.ok) { const d = await res.json(); setError(d.error || "Save failed"); }
    else { await load(); setShowForm(false); }
    setSaving(false);
  };

  const toggleActive = async (m: BoardMember) => {
    await fetch(`/api/admin/board/${m.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_active: !m.is_active }) });
    await load();
  };

  const del = async (m: BoardMember) => {
    if (!confirm(`Remove ${m.name} from the board?`)) return;
    await fetch(`/api/admin/board/${m.id}`, { method: "DELETE" });
    await load();
  };

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={{ minHeight: "100vh", background: "#111010" }}>
      <AdminNav />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.25rem" }}>Admin</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "white", margin: 0 }}>Board Members</h1>
          </div>
          <button style={S.btn("#D4930A", "rgba(212,147,10,0.15)")} onClick={openAdd}>+ Add Member</button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "1.5rem" }}>{editing ? "Edit Board Member" : "Add Board Member"}</h2>
            {error && <div style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: "8px", padding: "0.65rem 1rem", marginBottom: "1rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#e74c3c" }}>{error}</div>}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={S.label}>Full Name *</label>
                <input style={S.input} value={form.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Role / Title *</label>
                <input style={S.input} value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="President, Secretary..." />
              </div>
              <div>
                <label style={S.label}>Slug (URL) — auto if blank</label>
                <input style={S.input} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="e.g. sivasankar" />
              </div>
              <div>
                <label style={S.label}>Initials (2 chars) — auto</label>
                <input style={S.input} maxLength={2} value={form.initials} onChange={(e) => set("initials", e.target.value.toUpperCase())} placeholder="Auto" />
              </div>
              <div>
                <label style={S.label}>Email</label>
                <input type="email" style={S.input} value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Display Order</label>
                <input type="number" style={S.input} value={form.display_order} onChange={(e) => set("display_order", parseInt(e.target.value) || 0)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Bio</label>
                <textarea style={{ ...S.input, minHeight: "80px", resize: "vertical" }} value={form.bio} onChange={(e) => set("bio", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Avatar Color</label>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  {COLOR_OPTIONS.map((c) => (
                    <button key={c} onClick={() => set("color", c)} style={{ width: "32px", height: "32px", borderRadius: "50%", background: c, border: form.color === c ? "3px solid white" : "3px solid transparent", cursor: "pointer" }} />
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} />
                  Active (shown on site)
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
        ) : members.length === 0 ? (
          <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)", textAlign: "center", padding: "3rem 0" }}>No board members yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {members.map((m) => (
              <div key={m.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", opacity: m.is_active ? 1 : 0.5 }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: `${m.color}25`, border: `2px solid ${m.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: m.color, flexShrink: 0 }}>{m.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 600, color: "white" }}>{m.name}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>{m.role} · /{m.slug} · Order #{m.display_order}</div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button style={S.btn("rgba(255,255,255,0.35)", "transparent")} onClick={() => toggleActive(m)}>{m.is_active ? "Deactivate" : "Activate"}</button>
                  <button style={S.btn("#D4930A", "rgba(212,147,10,0.1)")} onClick={() => openEdit(m)}>Edit</button>
                  <button style={S.btn("#e74c3c", "rgba(192,57,43,0.1)")} onClick={() => del(m)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
