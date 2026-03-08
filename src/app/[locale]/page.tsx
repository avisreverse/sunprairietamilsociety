import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LandingHero from "@/components/sections/LandingHero";
import MullaiPrograms from "@/components/sections/MullaiPrograms";
import MarutamEvents from "@/components/sections/MarutamEvents";
import NeytalAchievements from "@/components/sections/NeytalAchievements";
import PalaiBoard from "@/components/sections/PalaiBoard";
import { createClient } from "@/lib/supabase/server";

/**
 * Landing page — Design D: Warm Cultural.
 * Server Component: fetches all dynamic content from Supabase,
 * passes as props to client section components.
 *
 * Section order:
 *   Nav → Hero+KuralStrip (parchment→crimson) → Programs (dark) →
 *   Events (parchment) → Achievements (dark) → Board (parchment) → Footer
 *
 * Falls back gracefully if DB is unavailable (empty arrays → sections show nothing).
 *
 * @see REQ-202603-001 — Landing page
 * @see REQ-202603-002 — Programs section
 * @see REQ-202603-003 — Thirukkural rotation
 * @see REQ-202603-004 — Admin CMS
 * @see D-005 — Supabase Auth with RLS — public policies return published rows only
 */
export default async function HomePage() {
  const supabase = await createClient();

  // Fetch all dynamic content in parallel — public RLS policies apply (published only)
  const [eventsRes, achievementsRes, boardRes, programsRes, siteSettingsRes] = await Promise.allSettled([
    supabase
      .from("events")
      .select("id,title,title_ta,date,time,location,description,featured,rsvp_url,rsvp_required")
      .eq("is_published", true)
      .order("date", { ascending: true }),

    supabase
      .from("achievements")
      .select("id,name,initials,category,achievement,year,color,photo_url")
      .eq("is_approved", true)
      .eq("is_published", true)
      .order("year", { ascending: false })
      .limit(6),

    supabase
      .from("board_members")
      .select("id,slug,name,initials,role,color,photo_url")
      .eq("is_active", true)
      .order("display_order", { ascending: true }),

    supabase
      .from("programs")
      .select("id,slug,name_en,name_ta,description,color,featured")
      .eq("is_active", true)
      .order("display_order", { ascending: true }),

    supabase
      .from("site_settings")
      .select("key,value"),
  ]);

  // Extract data — fall back gracefully if Supabase tables not yet created
  const events = eventsRes.status === "fulfilled" ? (eventsRes.value.data ?? []) : [];
  const achievements = achievementsRes.status === "fulfilled" ? (achievementsRes.value.data ?? []) : [];
  const board = boardRes.status === "fulfilled" ? (boardRes.value.data ?? []) : [];
  const programs = programsRes.status === "fulfilled" ? (programsRes.value.data ?? []) : [];

  // site_settings: convert rows to a keyed object; fall back to hardcoded defaults
  const rawSettings = siteSettingsRes.status === "fulfilled" ? (siteSettingsRes.value.data ?? []) : [];
  const settingsMap: Record<string, string> = {};
  rawSettings.forEach((row: { key: string; value: string }) => { settingsMap[row.key] = row.value; });
  // Programs count is always live from DB — not a site_setting (REQ-202603-010)
  const programCount = programs.length;
  const heroContent = {
    story:        settingsMap["hero_story"]   ?? "In 2012, Tamil families in Sun Prairie asked a shared question: how do we give our children the language, culture, and belonging we carry? Today, SPTS is that answer.",
    year:         settingsMap["hero_year"]    ?? "2012",
    tagline:      settingsMap["hero_tagline"] ?? "Year founded in Sun Prairie",
    subtext:      settingsMap["hero_subtext"] ?? "One community",
    programCount,
  };

  if (eventsRes.status === "rejected") console.error("⚠️ [page] events fetch failed:", eventsRes.reason);
  if (achievementsRes.status === "rejected") console.error("⚠️ [page] achievements fetch failed:", achievementsRes.reason);
  if (boardRes.status === "rejected") console.error("⚠️ [page] board fetch failed:", boardRes.reason);
  if (programsRes.status === "rejected") console.error("⚠️ [page] programs fetch failed:", programsRes.reason);
  if (siteSettingsRes.status === "rejected") console.warn("⚠️ [page] site_settings fetch failed — using defaults");

  return (
    <>
      <Nav />

      {/* Hero — parchment, Tamil script dominant visual */}
      <LandingHero heroContent={heroContent} />

      {/* Programs — dark ink, bento grid, spring physics */}
      <MullaiPrograms programs={programs} />

      {/* Events — parchment, featured + list rows */}
      <MarutamEvents events={events} />

      {/* Achievements — dark ink, initials avatars */}
      <NeytalAchievements achievements={achievements} />

      {/* Board / About — parchment, join CTA */}
      <PalaiBoard board={board} />

      <Footer foundingYear={heroContent.year} />

    </>
  );
}
