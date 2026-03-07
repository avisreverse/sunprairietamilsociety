import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LandingHero from "@/components/sections/LandingHero";
import MullaiPrograms from "@/components/sections/MullaiPrograms";
import ThirukkuralSection from "@/components/sections/ThirukkuralSection";
import MarutamEvents from "@/components/sections/MarutamEvents";
import NeytalAchievements from "@/components/sections/NeytalAchievements";
import PalaiBoard from "@/components/sections/PalaiBoard";

/**
 * Landing page — Design D: Warm Cultural.
 *
 * Section order:
 *   Nav → Hero → Programs (dark) → Thirukkural (crimson) →
 *   Events (parchment) → Achievements (dark) → Board (parchment) → Footer
 *
 * Alternating light/dark rhythm creates visual breathing room.
 * ThirukkuralSection is self-contained (fetches + rotates).
 * All sections are static — Admin CMS (REQ-202603-004) will make them dynamic.
 *
 * @see REQ-202603-001 — Landing page
 * @see REQ-202603-002 — Programs section
 * @see REQ-202603-003 — Thirukkural rotation
 * @see REQ-202603-004 — Admin CMS (backlog)
 */
export default function HomePage() {
  return (
    <>
      <Nav />

      {/* Hero — parchment, Tamil script dominant visual */}
      <LandingHero />

      {/* Programs — dark ink, bento grid, spring physics */}
      <MullaiPrograms />

      {/* Thirukkural — crimson, rotating all 1330 */}
      <ThirukkuralSection />

      {/* Events — parchment, featured + list rows */}
      <MarutamEvents />

      {/* Achievements — dark ink, initials avatars */}
      <NeytalAchievements />

      {/* Board / About — parchment, join CTA */}
      <PalaiBoard />

      <Footer />
    </>
  );
}
