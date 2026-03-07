"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * Admin login page — email + password via Supabase Auth.
 * Redirects to /en/admin (or redirectTo param) on success.
 * Standalone page — not wrapped in admin layout.
 *
 * Auth note: All authenticated users = admins for community site.
 * When D-017 is implemented (spts-clean Supabase share), this page
 * will use the school's Supabase — same code, different env vars.
 *
 * @see D-005 — Supabase Auth with RLS from day 1
 * @see D-017 — Admin auth via spts-clean Supabase (deferred, PL-004)
 * @see REQ-202603-004 — Admin CMS
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/en/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    });

    if (authError) {
      console.error("❌ [AdminLogin] Auth error:", authError.message);
      setError(
        authError.message.includes("Invalid login")
          ? "Invalid email or password."
          : authError.message
      );
      setLoading(false);
      return;
    }

    console.log("✅ [AdminLogin] Signed in, redirecting to:", redirectTo);
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0D0D0D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#D4930A",
              marginBottom: "0.5rem",
            }}
          >
            Sun Prairie Tamil Society
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "white",
              margin: 0,
            }}
          >
            Admin Portal
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "2rem",
          }}
        >
          {error && (
            <div
              style={{
                background: "rgba(192,57,43,0.15)",
                border: "1px solid rgba(192,57,43,0.4)",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                marginBottom: "1.5rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "#e74c3c",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: "1.25rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "0.5rem",
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@example.com"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                color: "white",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.75rem" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "0.5rem",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                color: "white",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "rgba(212,147,10,0.4)" : "#D4930A",
              border: "none",
              borderRadius: "8px",
              padding: "0.85rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: loading ? "rgba(255,255,255,0.5)" : "#0D0D0D",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          SPTS Admin access only
        </p>
      </div>
    </main>
  );
}
