import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * GET /api/announcements/[id] — fetch a single published, non-expired announcement.
 * Used by the public announcement detail page.
 *
 * @see REQ-202603-009 — External announcement board
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("announcements")
    .select("id,title,body,poster_url,action_url,action_label,expires_at,created_at")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
