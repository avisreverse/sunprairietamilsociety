import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/admin/rsvp/[eventId] — list all RSVPs for an event (admin only)
 * DELETE /api/admin/rsvp/[eventId]?rsvpId=[id] — remove a specific RSVP
 *
 * @see REQ-202603-004 — Admin CMS
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const userId = await verifyAdminAuth(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { eventId } = await params;
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("rsvp_responses")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(`❌ [API/admin/rsvp/${eventId}] GET error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const totalGuests = data.reduce((sum, r) => sum + (r.guest_count || 1), 0);

  return NextResponse.json({ rsvps: data, totalGuests, count: data.length });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const userId = await verifyAdminAuth(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { eventId } = await params;
  const { searchParams } = new URL(request.url);
  const rsvpId = searchParams.get("rsvpId");

  if (!rsvpId) {
    return NextResponse.json({ error: "rsvpId query param required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("rsvp_responses")
    .delete()
    .eq("id", rsvpId)
    .eq("event_id", eventId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
