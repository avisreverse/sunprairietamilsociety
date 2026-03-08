"use client";

import { useEffect, useState, useCallback } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { fetchAdmin } from "@/lib/fetchAdmin";

/**
 * Admin Programs page — edit program descriptions, visibility, display order.
 *
 * @see REQ-202603-002 — Programs section
 * @see REQ-202603-004 — Admin CMS
 */

interface Program {
  id: string;
  slug: string;
  name_en: string;
  name_ta: string | null;
  description: string | null;
  color: string;
  featured: boolean;
  display_order: number;
  is_active: boolean;
}

const S = {
  label: { fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.35rem" },
  input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "7px", padding: "0.6rem 0.85rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "white", outline: "none", boxSizing: "border-box" as const },
  btn: (color: string, bg: string) => ({ background: bg, border: `1px solid ${color}`, borderRadius: "7px", padding: "0.4rem 0.9rem", fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, color, cursor: "pointer" }),
};

const COLOR_OPTIONS = ["#C0392B", "#27AE60", "#E67E22", "#2980B9", "#8E44AD", "#1B5E3B"];

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Program | null>(null);
  const [form, setForm] = useState<Partial<Program>>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetchAdmin("/api/admin/programs");
    if (res.ok) setPrograms(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openEdit = (p: Program) => { setEditing(p); setForm({ ...p }); };
  const cancel = () => { setEditing(null); setForm({}); };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const res = await fetchAdmin(`/api/admin/programs/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { await load(); setEditing(null); }
    setSaving(false);
  };

  const toggle = async (p: Program, field: "is_active" | "featured") => {
    await fetchAdmin(`/api/admin/programs/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !p[field] }),
    });
    await load();
  };

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={{ minHeight: "100vh", background: "#111010" }}>
      <AdminNav />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.25rem" }}>Admin</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "white", margin: 0 }}>Programs</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", marginTop: "0.5rem" }}>Edit program descriptions, Tamil names, colors, and visibility. Programs are seeded from code — add new ones via the form below.</p>
        </div>

        {/* Edit inline form */}
        {editing && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${editing.color}35`, borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "white", marginBottom: "1.5rem" }}>Editing: {editing.name_en}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={S.label}>Name (English)</label>
                <input style={S.input} value={form.name_en || ""} onChange={(e) => set("name_en", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Name (Tamil)</label>
                <input style={S.input} value={form.name_ta || ""} onChange={(e) => set("name_ta", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Description</label>
                <textarea style={{ ...S.input, minHeight: "70px", resize: "vertical" }} value={form.description || ""} onChange={(e) => set("description", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Display Order</label>
                <input type="number" style={S.input} value={form.display_order ?? 0} onChange={(e) => set("display_order", parseInt(e.target.value) || 0)} />
              </div>
              <div>
                <label style={S.label}>Color</label>
                <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.25rem" }}>
                  {COLOR_OPTIONS.map((c) => (
                    <button key={c} onClick={() => set("color", c)} style={{ width: "30px", height: "30px", borderRadius: "50%", background: c, border: form.color === c ? "3px solid white" : "3px solid transparent", cursor: "pointer" }} />
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: "1/-1", display: "flex", gap: "2rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={form.featured ?? false} onChange={(e) => set("featured", e.target.checked)} />
                  Featured (large bento card)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={form.is_active ?? true} onChange={(e) => set("is_active", e.target.checked)} />
                  Active (visible on site)
                </label>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button style={S.btn("#D4930A", "#D4930A")} onClick={save} disabled={saving}><span style={{ color: "#0D0D0D" }}>{saving ? "Saving…" : "Save Changes"}</span></button>
              <button style={S.btn("rgba(255,255,255,0.3)", "transparent")} onClick={cancel}>Cancel</button>
            </div>
          </div>
        )}

        {/* Programs list */}
        {loading ? (
          <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)", textAlign: "center", padding: "3rem 0" }}>Loading…</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {programs.map((p) => (
              <div key={p.id} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${p.color}20`, borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", opacity: p.is_active ? 1 : 0.5 }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 600, color: "white" }}>{p.name_en}</span>
                    {p.name_ta && <span style={{ fontFamily: "'Noto Serif Tamil', serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.45)" }}>{p.name_ta}</span>}
                    {p.featured && <span style={{ background: "rgba(212,147,10,0.2)", border: "1px solid rgba(212,147,10,0.35)", borderRadius: "999px", padding: "0.08rem 0.5rem", fontSize: "0.6rem", fontWeight: 700, color: "#D4930A", textTransform: "uppercase" }}>Featured</span>}
                    {!p.is_active && <span style={{ background: "rgba(255,255,255,0.05)", borderRadius: "999px", padding: "0.08rem 0.5rem", fontSize: "0.6rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Hidden</span>}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>/{p.slug} · Order #{p.display_order}</div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button style={S.btn("rgba(255,255,255,0.35)", "transparent")} onClick={() => toggle(p, "featured")}>{p.featured ? "Unfeature" : "Feature"}</button>
                  <button style={S.btn("rgba(255,255,255,0.35)", "transparent")} onClick={() => toggle(p, "is_active")}>{p.is_active ? "Hide" : "Show"}</button>
                  <button style={S.btn("#D4930A", "rgba(212,147,10,0.1)")} onClick={() => openEdit(p)}>Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
