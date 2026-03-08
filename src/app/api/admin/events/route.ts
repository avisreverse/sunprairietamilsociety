import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/admin/events — list all events (admin, unpublished included)
 * POST /api/admin/events — create a new event
 *
 * Protected: requires authenticated Supabase session (Bearer token or cookie).
 * Uses service role client to bypass RLS for admin reads.
 *
 * @see REQ-202603-004 — Admin CMS
 * @see D-005 — Supabase Auth with RLS from day 1
 */

export async function GET(request: NextRequest) {
  const userId = await verifyAdminAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("❌ [API/admin/events] GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`✅ [API/admin/events] GET — returned ${data.length} events`);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const userId = await verifyAdminAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    title, title_ta, date, time, location, description,
    featured, rsvp_url, rsvp_required, is_published, display_order,
  } = body;

  if (!title || !date) {
    return NextResponse.json({ error: "title and date are required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("events")
    .insert({
      title, title_ta, date, time, location, description,
      featured: featured ?? false,
      rsvp_url: rsvp_url || null,
      rsvp_required: rsvp_required ?? false,
      is_published: is_published ?? true,
      display_order: display_order ?? 0,
    })
    .select()
    .single();

  if (error) {
    console.error("❌ [API/admin/events] POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`✅ [API/admin/events] POST — created event: ${data.id}`);
  return NextResponse.json(data, { status: 201 });
}
