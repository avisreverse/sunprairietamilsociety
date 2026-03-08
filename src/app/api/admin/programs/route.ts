import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/admin/programs — list all programs
 * POST /api/admin/programs — create a new program
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
    .from("programs")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("❌ [API/admin/programs] GET error:", error);
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
  const { slug, name_en, name_ta, description, tagline, schedule, contact_email, details, color, featured, display_order, is_active } = body;

  if (!slug || !name_en) {
    return NextResponse.json({ error: "slug and name_en are required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("programs")
    .insert({
      slug, name_en, name_ta: name_ta || null,
      description: description || null,
      tagline: tagline || null,
      schedule: schedule || null,
      contact_email: contact_email || null,
      details: Array.isArray(details) ? details : [],
      color: color || "#C0392B",
      featured: featured ?? false,
      display_order: display_order ?? 0,
      is_active: is_active ?? true,
    })
    .select()
    .single();

  if (error) {
    console.error("❌ [API/admin/programs] POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
