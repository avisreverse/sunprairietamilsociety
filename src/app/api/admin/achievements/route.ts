import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/admin/achievements — list all achievements including unapproved
 * POST /api/admin/achievements — create/seed an achievement directly
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

export async function GET() {
  const userId = await verifyAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("achievements")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("❌ [API/admin/achievements] GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const userId = await verifyAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, initials, category, achievement, year, color, bio, is_approved, is_published } = body;

  if (!name || !category || !achievement || !year) {
    return NextResponse.json(
      { error: "name, category, achievement, year are required" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("achievements")
    .insert({
      name,
      initials: initials || name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
      category,
      achievement,
      year,
      color: color || "#C0392B",
      bio: bio || null,
      is_approved: is_approved ?? false,
      is_published: is_published ?? false,
      approved_at: is_approved ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    console.error("❌ [API/admin/achievements] POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
