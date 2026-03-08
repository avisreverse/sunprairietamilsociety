"use client";

import { useEffect, useState, useCallback } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { fetchAdmin } from "@/lib/fetchAdmin";
import { createClient } from "@/lib/supabase/client";

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
  role_ta: string | null;
  bio: string | null;
  email: string | null;
  photo_url: string | null;
  color: string;
  responsibilities: string[];
  since_year: number | null;
  display_order: number;
  is_active: boolean;
}

const S = {
  label: { fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.35rem" },
  input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "7px", padding: "0.6rem 0.85rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "white", outline: "none", boxSizing: "border-box" as const },
  btn: (color: string, bg: string) => ({ background: bg, border: `1px solid ${color}`, borderRadius: "7px", padding: "0.4rem 0.9rem", fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, color, cursor: "pointer" }),
};

const COLOR_OPTIONS = ["#C0392B", "#27AE60", "#E67E22", "#2980B9", "#8E44AD", "#1B5E3B"];

/** Default empty state for board member form. @see REQ-202603-006 */
const EMPTY: Record<string, unknown> = { slug: "", name: "", initials: "", role: "", role_ta: "", bio: "", email: "", photo_url: "", color: "#C0392B", responsibilities: "", since_year: "", display_order: 0, is_active: true };

export default function AdminBoardPage() {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BoardMember | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetchAdmin("/api/admin/board");
    if (res.ok) setMembers(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    const nextOrder = members.length + 1;
    setEditing(null); setForm({ ...EMPTY, display_order: nextOrder }); setShowForm(true); setError(null);
  };
  const openEdit = (m: BoardMember) => {
    setEditing(m);
    setForm({
      ...m,
      bio: m.bio || "",
      email: m.email || "",
      photo_url: m.photo_url || "",
      role_ta: m.role_ta || "",
      // Convert responsibilities array → newline-joined string for textarea
      responsibilities: Array.isArray(m.responsibilities) ? (m.responsibilities as unknown as string[]).join("\n") : "",
      since_year: m.since_year ?? "",
    });
    setShowForm(true);
    setError(null);
  };
  const cancel = () => { setShowForm(false); setEditing(null); setError(null); };

  const save = async () => {
    setSaving(true);
    setError(null);
    // Auto-generate slug from name if empty
    const nameStr = String(form.name || "");
    const slug = String(form.slug || nameStr.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
    const initials = String(form.initials || nameStr.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase());
    const url = editing ? `/api/admin/board/${editing.id}` : "/api/admin/board";
    const method = editing ? "PATCH" : "POST";
    const res = await fetchAdmin(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        slug,
        initials,
        bio: form.bio || null,
        email: form.email || null,
        role_ta: form.role_ta || null,
        since_year: form.since_year ? parseInt(String(form.since_year)) : null,
        responsibilities: typeof form.responsibilities === "string"
          ? (form.responsibilities as string).split("\n").map((s: string) => s.trim()).filter(Boolean)
          : (form.responsibilities ?? []),
      }),
    });
    if (!res.ok) { const d = await res.json(); setError(d.error || "Save failed"); }
    else { await load(); setShowForm(false); }
    setSaving(false);
  };

  const toggleActive = async (m: BoardMember) => {
    await fetchAdmin(`/api/admin/board/${m.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_active: !m.is_active }) });
    await load();
  };

  const del = async (m: BoardMember) => {
    if (!confirm(`Remove ${m.name} from the board?`)) return;
    await fetchAdmin(`/api/admin/board/${m.id}`, { method: "DELETE" });
    await load();
  };

  /**
   * Uploads a photo to Supabase Storage media/board/ folder.
   * Uses slug as filename so re-upload overwrites the old headshot.
   * @see DEF-202603-004 — Board photo upload
   */
  const uploadPhoto = async (file: File) => {
    const nameStr = String(form.name || "");
    const slug = String(form.slug || nameStr.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
    if (!slug) { setError("Enter a name or slug before uploading a photo."); return; }
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `board/${slug}.${ext}`;
    const supabase = createClient();
    const { error: upErr } = await supabase.storage.from("media").upload(path, file, { upsert: true });
    if (upErr) { setError(`Upload failed: ${upErr.message}`); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
    setForm((f) => ({ ...f, photo_url: publicUrl }));
    setUploading(false);
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
                <input style={S.input} value={String(form.name ?? "")} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Role / Title *</label>
                <input style={S.input} value={String(form.role ?? "")} onChange={(e) => set("role", e.target.value)} placeholder="President, Secretary..." />
              </div>
              <div>
                <label style={S.label}>Role in Tamil (தமிழ்)</label>
                <input style={{ ...S.input, fontFamily: "'Noto Serif Tamil', serif" }} value={String(form.role_ta ?? "")} onChange={(e) => set("role_ta", e.target.value)} placeholder="தலைவர், செயலர்..." />
              </div>
              <div>
                <label style={S.label}>Slug (URL) — auto if blank</label>
                <input style={S.input} value={String(form.slug ?? "")} onChange={(e) => set("slug", e.target.value)} placeholder="e.g. sivasankar" />
              </div>
              <div>
                <label style={S.label}>Initials (2 chars) — auto</label>
                <input style={S.input} maxLength={2} value={String(form.initials ?? "")} onChange={(e) => set("initials", e.target.value.toUpperCase())} placeholder="Auto" />
              </div>
              <div>
                <label style={S.label}>Email</label>
                <input type="email" style={S.input} value={String(form.email ?? "")} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Member Since (Year)</label>
                <input type="number" style={S.input} value={String(form.since_year ?? "")} onChange={(e) => set("since_year", e.target.value)} placeholder="e.g. 2018" />
              </div>
              <div>
                <label style={S.label}>Display Order</label>
                <input type="number" style={S.input} value={Number(form.display_order ?? 0)} onChange={(e) => set("display_order", parseInt(e.target.value) || 0)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Bio</label>
                <textarea style={{ ...S.input, minHeight: "80px", resize: "vertical" }} value={String(form.bio ?? "")} onChange={(e) => set("bio", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Responsibilities (one per line)</label>
                <textarea style={{ ...S.input, minHeight: "90px", resize: "vertical" }} value={String(form.responsibilities ?? "")} onChange={(e) => set("responsibilities", e.target.value)} placeholder={"Overall leadership of SPTS\nExternal partnerships"} />
              </div>
              {/* DEF-202603-004: Photo upload field */}
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Headshot Photo</label>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {form.photo_url ? (
                    <img src={String(form.photo_url)} alt="headshot preview" style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${String(form.color)}55` }} />
                  ) : (
                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: `${String(form.color)}25`, border: `2px solid ${String(form.color)}55`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: String(form.color) }}>
                      {String(form.initials || String(form.name || "").split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase() || "?")}
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      disabled={uploading}
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPhoto(f); }}
                      style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}
                    />
                    {uploading && <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#D4930A", marginTop: "0.3rem" }}>Uploading…</div>}
                    {Boolean(form.photo_url) && !uploading && (
                      <button onClick={() => set("photo_url", "")} style={{ ...S.btn("rgba(255,255,255,0.3)", "transparent"), marginTop: "0.3rem", fontSize: "0.72rem" }}>Remove photo</button>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Avatar Color</label>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  {COLOR_OPTIONS.map((c) => (
                    <button key={c} onClick={() => set("color", c)} style={{ width: "32px", height: "32px", borderRadius: "50%", background: c, border: String(form.color) === c ? "3px solid white" : "3px solid transparent", cursor: "pointer" }} />
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={Boolean(form.is_active)} onChange={(e) => set("is_active", e.target.checked)} />
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
