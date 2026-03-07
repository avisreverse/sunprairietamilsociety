import Nav from "@/components/layout/Nav";
import DotNav from "@/components/layout/DotNav";
import Footer from "@/components/layout/Footer";
import LandingHero from "@/components/sections/LandingHero";
import KurinciHero from "@/components/sections/KurinciHero";
import MullaiPrograms from "@/components/sections/MullaiPrograms";
import MarutamEvents from "@/components/sections/MarutamEvents";
import NeytalAchievements from "@/components/sections/NeytalAchievements";
import PalaiBoard from "@/components/sections/PalaiBoard";
import PoemScreen from "@/components/sections/PoemScreen";
import ThirukkuralLoader from "@/components/sections/ThirukkuralLoader";
import KolamDivider from "@/components/ui/KolamDivider";

/**
 * Landing page — The Sangam Scroll.
 *
 * Structure:
 *   Nav → LandingHero → KolamDivider → PoemScreen → KurinciHero
 *   → KolamDivider → PoemScreen → MullaiPrograms
 *   → KolamDivider → PoemScreen → MarutamEvents
 *   → KolamDivider → PoemScreen → NeytalAchievements
 *   → KolamDivider → PoemScreen → PalaiBoard → Footer
 *
 * KolamDivider: decorative gold dot-line between every section transition.
 * ThirukkuralLoader: client-side, fetches all 1330 kurals and randomises.
 *
 * @see REQ-202603-001 — Landing page / community hub home
 * @see D-007 — next-intl (Tamil + English, strategic placement)
 * @see D-013 — Framer Motion (scroll-reveal in each section component)
 */
export default function HomePage() {
  return (
    <>
      {/* Fixed navigation layers */}
      <Nav />
      <DotNav />

      {/* Thirukkural rotation — client-side, injects into poem-screen slots */}
      <ThirukkuralLoader />

      {/* ── Section 0: Landing — Society identity ── */}
      <LandingHero />

      <KolamDivider />

      {/* Poem transition 0→1: Landing dark to forest green */}
      <PoemScreen
        screenIndex={4}
        gradientStyle={{ background: "linear-gradient(to bottom, #0A0F0C 0%, #0B3D2E 100%)" }}
      />

      <KolamDivider />

      {/* ── Section 1: Kurinci — Mountain — Union ── */}
      <KurinciHero />

      <KolamDivider />

      {/* Poem transition 1→2: Kurinci forest green to warm brown */}
      <PoemScreen
        screenIndex={0}
        gradientStyle={{ background: "linear-gradient(to bottom, #1A6B4A 0%, #3D2A0A 100%)" }}
      />

      <KolamDivider />

      {/* ── Section 2: Mullai — Forest — Learning ── */}
      <MullaiPrograms />

      <KolamDivider />

      {/* Poem transition 2→3: Mullai warm brown to amber */}
      <PoemScreen
        screenIndex={1}
        gradientStyle={{ background: "linear-gradient(to bottom, #7A4F1A 0%, #4A2A00 100%)" }}
      />

      <KolamDivider />

      {/* ── Section 3: Marutam — Field — Celebration ── */}
      <MarutamEvents />

      <KolamDivider />

      {/* Poem transition 3→4: Marutam amber to ocean blue */}
      <PoemScreen
        screenIndex={2}
        gradientStyle={{ background: "linear-gradient(to bottom, #8A4800 0%, #0A1E3D 100%)" }}
      />

      <KolamDivider />

      {/* ── Section 4: Neytal — Sea — Achievements ── */}
      <NeytalAchievements />

      <KolamDivider />

      {/* Poem transition 4→5: Neytal ocean blue to sienna */}
      <PoemScreen
        screenIndex={3}
        gradientStyle={{ background: "linear-gradient(to bottom, #0A4A6B 0%, #2E1800 100%)" }}
      />

      <KolamDivider />

      {/* ── Section 5: Palai — Desert — Welcome ── */}
      <PalaiBoard />

      {/* Footer */}
      <Footer />
    </>
  );
}
