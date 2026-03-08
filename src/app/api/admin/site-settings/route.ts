import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET  /api/admin/site-settings  — returns all site_settings rows
 * PUT  /api/admin/site-settings  — upsert one setting { key, value }
 *
 * @see REQ-202603-010 — Home page admin editing
 */

export async function GET(request: NextRequest) {
  const userId = await verifyAdminAuth(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("site_settings")
    .select("key,value,label,description,updated_at")
    .order("key");

  if (error) {
    console.error("❌ [API/admin/site-settings] GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function PUT(request: NextRequest) {
  const userId = await verifyAdminAuth(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { key, value } = body as { key: string; value: string };

  if (!key || typeof value !== "string") {
    return NextResponse.json({ error: "key and value required" }, { status: 400 });
  }

  const admin = createAdminClient();
  // Upsert: creates the row if it doesn't exist (e.g. migration not yet run),
  // or updates value if it does. onConflict:"key" matches the PRIMARY KEY.
  const { data, error } = await admin
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" })
    .select()
    .single();

  if (error) {
    console.error("❌ [API/admin/site-settings] PUT error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`✅ [API/admin/site-settings] Upserted key="${key}"`);
  return NextResponse.json(data);
}
