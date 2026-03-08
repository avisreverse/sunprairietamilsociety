import { createClient } from "@/lib/supabase/client";

/**
 * Authenticated fetch for admin client components.
 * Reads the Supabase access token from the browser session and
 * passes it as an Authorization: Bearer header so API route
 * handlers can verify auth without relying on cookie propagation.
 *
 * @see REQ-202603-004 — Admin CMS
 * @see D-005 — Supabase Auth with RLS
 */
export async function fetchAdmin(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(url, { ...options, headers });
}
