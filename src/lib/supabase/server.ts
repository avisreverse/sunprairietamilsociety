import { createServerClient, type CookieMethodsServer } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * Creates a Supabase client for use in Server Components, Server Actions, and Route Handlers.
 * Reads cookies from the incoming request for session handling.
 * @see D-004 — Supabase PostgreSQL
 * @see D-005 — Supabase Auth with RLS from day 1
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: Array<{ name: string; value: string; options?: Partial<ResponseCookie> }>
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component — cookie writes are handled by middleware
          }
        },
      },
    }
  );
}
