import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { NextRequest, NextResponse } from "next/server";

/**
 * PATCH /api/admin/achievements/[id] — update/approve/publish achievement
 * DELETE /api/admin/achievements/[id] — delete achievement
 *
 * @see REQ-202603-004 — Admin CMS
 */

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await verifyAdminAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  // Set approved_at timestamp when approving
  if (body.is_approved === true) {
    body.approved_at = new Date().toISOString();
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("achievements")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`❌ [API/admin/achievements/${id}] PATCH error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`✅ [API/admin/achievements/${id}] PATCH — updated`);
  return NextResponse.json(data);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await verifyAdminAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const admin = createAdminClient();
  const { error } = await admin.from("achievements").delete().eq("id", id);

  if (error) {
    console.error(`❌ [API/admin/achievements/${id}] DELETE error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
