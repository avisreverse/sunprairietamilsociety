import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * GET /api/announcements — public route, returns published + non-expired announcements.
 * Used by the floating AnnouncementBar component on the public landing page.
 *
 * No auth required — RLS on the announcements table enforces published+non-expired filter.
 *
 * @see REQ-202603-009 — External announcement board
 */
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("id,title,body,poster_url,action_url,action_label,expires_at,display_order")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("⚠️ [API/announcements] GET error:", error);
    return NextResponse.json([], { status: 200 }); // Graceful degradation
  }

  return NextResponse.json(data ?? []);
}
