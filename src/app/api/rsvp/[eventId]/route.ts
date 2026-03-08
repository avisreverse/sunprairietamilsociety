import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/rsvp/[eventId] — public RSVP submission.
 * No auth required — RLS policy "public_submit_rsvp" allows anonymous INSERT.
 * Only works for events with rsvp_required = true.
 *
 * @see REQ-202603-007 — RSVP page
 * @see DEF-202603-008 — RSVP page not built (this fixes it)
 * @see D-005 — Supabase Auth with RLS from day 1
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;

  const body = await request.json() as {
    name?: string;
    email?: string;
    guest_count?: number;
    notes?: string;
  };

  const { name, email, guest_count = 1, notes } = body;

  // Validate required fields
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  const guestCount = Number(guest_count);
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 20) {
    return NextResponse.json({ error: "Guest count must be 1–20" }, { status: 400 });
  }

  const supabase = await createClient();

  // Verify event exists, is published, and has rsvp_required = true
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, title, rsvp_required, is_published")
    .eq("id", eventId)
    .eq("is_published", true)
    .single();

  if (eventError || !event) {
    console.error(`❌ [API/rsvp/${eventId}] Event not found:`, eventError?.message);
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  if (!event.rsvp_required) {
    return NextResponse.json({ error: "This event does not accept RSVPs" }, { status: 400 });
  }

  // Insert RSVP — RLS policy "public_submit_rsvp" allows this without auth
  const { data, error } = await supabase
    .from("rsvp_responses")
    .insert({
      event_id: eventId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      guest_count: guestCount,
      notes: notes?.trim() || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error(`❌ [API/rsvp/${eventId}] Insert error:`, error.message);
    return NextResponse.json({ error: "Failed to submit RSVP. Please try again." }, { status: 500 });
  }

  console.log(`✅ [API/rsvp/${eventId}] RSVP submitted id=${data.id} name="${name}" guests=${guestCount}`);
  return NextResponse.json({ success: true, id: data.id });
}
