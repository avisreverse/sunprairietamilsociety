import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/admin/board — list all board members (active and inactive)
 * POST /api/admin/board — add a new board member
 *
 * @see REQ-202603-004 — Admin CMS
 */

export async function GET(request: NextRequest) {
  const userId = await verifyAdminAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("board_members")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("❌ [API/admin/board] GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const userId = await verifyAdminAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { slug, name, initials, role, role_ta, bio, email, photo_url, color, responsibilities, since_year, display_order, is_active } = body;

  if (!slug || !name || !role) {
    return NextResponse.json(
      { error: "slug, name, and role are required" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("board_members")
    .insert({
      slug,
      name,
      initials: initials || name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
      role,
      role_ta: role_ta || null,
      bio: bio || null,
      email: email || null,
      photo_url: photo_url || null,
      color: color || "#C0392B",
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
      since_year: since_year ? parseInt(since_year) : null,
      display_order: display_order ?? 0,
      is_active: is_active ?? true,
    })
    .select()
    .single();

  if (error) {
    console.error("❌ [API/admin/board] POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`✅ [API/admin/board] POST — created member: ${data.id}`);
  return NextResponse.json(data, { status: 201 });
}
