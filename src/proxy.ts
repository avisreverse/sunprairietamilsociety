/**
 * Next.js 16 uses "proxy" file convention (was "middleware" in <16).
 * Composed middleware: next-intl locale routing + Supabase admin auth guard.
 *
 * Auth guard: any path matching /[locale]/admin/* (except /admin/login)
 * requires an active Supabase session. Unauthenticated → redirect to /en/admin/login.
 *
 * @see D-001 — Next.js 16.1.6 App Router
 * @see D-005 — Supabase Auth with RLS from day 1
 * @see D-007 — next-intl for Tamil + English from day 1
 * @see REQ-202603-004 — Admin CMS
 */

import { createServerClient } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

// Matches /en/admin/... or /ta/admin/... — but NOT /en/admin/login or /ta/admin/login
const ADMIN_PROTECTED_RE = /^\/(en|ta)\/admin(?!\/login)(\/.*)?$/;

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Skip locale routing for API routes ───────────────────────────────────
  // next-intl must not rewrite /api/* paths — they are locale-agnostic.
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // ─── Admin auth guard ─────────────────────────────────────────────────────
  if (ADMIN_PROTECTED_RE.test(pathname)) {
    // Create a mutable response to allow Supabase to refresh cookies if needed
    const response = NextResponse.next();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
            // D-005: propagate refreshed tokens to both request and response
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Not authenticated — redirect to login, preserve intended destination
      const loginUrl = new URL("/en/admin/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      console.log(
        `🔒 [AdminGuard] Unauthenticated access to ${pathname} → redirecting to login`
      );
      return NextResponse.redirect(loginUrl);
    }

    console.log(`✅ [AdminGuard] Authenticated admin access: ${pathname}`);
  }

  // ─── next-intl locale routing ─────────────────────────────────────────────
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    // Match all pathnames except Next.js internals and static files
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
