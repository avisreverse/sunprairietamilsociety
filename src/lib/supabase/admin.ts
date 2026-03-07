import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client using the service role key.
 * Bypasses RLS — ONLY use in server-side API routes after verifying auth.
 * NEVER import or use this in client components.
 *
 * @returns Supabase admin client
 * @throws Error if env vars are missing
 * @see D-004 — Supabase PostgreSQL
 * @see D-005 — Supabase Auth with RLS from day 1
 * @see REQ-202603-004 — Admin CMS
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "❌ [Admin] SUPABASE_SERVICE_ROLE_KEY is required. Check Vercel env vars."
    );
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
