import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

/**
 * PATCH /api/admin/board/[id] — update board member
 * DELETE /api/admin/board/[id] — remove board member
 *
 * @see REQ-202603-004 — Admin CMS
 */

async function verifyAuth(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await verifyAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("board_members")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`❌ [API/admin/board/${id}] PATCH error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await verifyAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const admin = createAdminClient();
  const { error } = await admin.from("board_members").delete().eq("id", id);

  if (error) {
    console.error(`❌ [API/admin/board/${id}] DELETE error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
