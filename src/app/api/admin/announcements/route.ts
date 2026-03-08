import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET  /api/admin/announcements — list ALL announcements (including unpublished/expired)
 * POST /api/admin/announcements — create announcement
 *
 * @see REQ-202603-009 — External announcement board
 */

export async function GET(request: NextRequest) {
  const userId = await verifyAdminAuth(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("announcements")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ [API/admin/announcements] GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const userId = await verifyAdminAuth(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("announcements")
    .insert({ ...body })
    .select()
    .single();

  if (error) {
    console.error("❌ [API/admin/announcements] POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`✅ [API/admin/announcements] Created: ${data.title}`);
  return NextResponse.json(data, { status: 201 });
}
