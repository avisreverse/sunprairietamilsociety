import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for use in browser/client components.
 * Must be called inside a component or hook, not at module level.
 * @see D-004 — Supabase PostgreSQL
 * @see D-005 — Supabase Auth with RLS from day 1
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
