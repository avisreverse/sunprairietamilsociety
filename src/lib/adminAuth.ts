import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * Verifies the request comes from an authenticated user.
 * Checks Authorization: Bearer header first (client components),
 * then falls back to cookie-based session (server components).
 *
 * Returns the user ID string on success, null on failure.
 *
 * @see REQ-202603-004 — Admin CMS
 * @see D-005 — Supabase Auth with RLS
 */
export async function verifyAdminAuth(
  request: NextRequest
): Promise<string | null> {
  // 1. Try Authorization header (sent by fetchAdmin utility)
  const authHeader = request.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const admin = createAdminClient();
    const {
      data: { user },
    } = await admin.auth.getUser(token);
    if (user?.id) return user.id;
  }

  // 2. Fallback: cookie-based session (server component / direct navigation)
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}
