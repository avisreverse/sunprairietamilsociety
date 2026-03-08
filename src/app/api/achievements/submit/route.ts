import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/achievements/submit — public achievement nomination.
 * No auth required. Inserts with is_approved=false, is_published=false.
 * Admin reviews and approves via /admin/achievements.
 *
 * @see REQ-202603-005 — Achievement submit + detail pages
 * @see DEF-202603-009 — Achievement categories not extensible (free-form "Other" added)
 * @see D-005 — Supabase Auth with RLS from day 1
 */
export async function POST(request: NextRequest) {
  const body = await request.json() as {
    name?: string;
    category?: string;
    achievement?: string;
    bio?: string;
    submitted_by_email?: string;
    year?: string;
  };

  const { name, category, achievement, bio, submitted_by_email, year } = body;

  // Validate required fields
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!category?.trim()) {
    return NextResponse.json({ error: "Category is required" }, { status: 400 });
  }
  if (!achievement?.trim()) {
    return NextResponse.json({ error: "Achievement is required" }, { status: 400 });
  }

  // Compute 2-char initials from name (first letter of first and last word)
  const words = name.trim().split(/\s+/);
  const initials = words.length >= 2
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : (words[0].substring(0, 2)).toUpperCase();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("achievements")
    .insert({
      name: name.trim(),
      initials,
      category: category.trim(),
      achievement: achievement.trim(),
      bio: bio?.trim() || null,
      year: year ?? String(new Date().getFullYear()),
      is_approved: false,
      is_published: false,
      submitted_by_name: name.trim(),
      submitted_by_email: submitted_by_email?.trim().toLowerCase() || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("❌ [API/achievements/submit] Insert error:", error.message);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }

  console.log(`✅ [API/achievements/submit] Nomination submitted id=${data.id} name="${name.trim()}"`);
  return NextResponse.json({ success: true, id: data.id });
}
