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

/**
 * Landing page — The Sangam Scroll.
 * Five tinai sections separated by Thirukkural poem screens.
 * Structure: Nav → Kurinci → Poem → Mullai → Poem → Marutam → Poem → Neytal → Poem → Palai → Footer
 *
 * Thirukkural rotation: ThirukkuralLoader (client) fetches all 1330 kurals on load,
 * picks unique random ones for each poem-screen, injects into DOM.
 *
 * @see REQ-202603-001 — Landing page / community hub home
 * @see D-007 — next-intl for Tamil + English
 */
export default function HomePage() {
  return (
    <>
      {/* Fixed navigation layers */}
      <Nav />
      <DotNav />

      {/* Thirukkural rotation — client-side, fetches all 1330 and randomises */}
      <ThirukkuralLoader />

      {/* ── Section 0: Landing — Society identity ── */}
      <LandingHero />

      {/* Poem transition 0→1: Landing to Kurinci */}
      <PoemScreen
        screenIndex={4}
        gradientStyle={{
          background:
            "linear-gradient(to bottom, #0A0F0C 0%, #0B3D2E 100%)",
        }}
      />

      {/* ── Section 1: Kurinci — Mountain — Union ── */}
      <KurinciHero />

      {/* Poem transition 1→2: Kurinci to Mullai */}
      <PoemScreen
        screenIndex={0}
        gradientStyle={{
          background:
            "linear-gradient(to bottom, #1A6B4A 0%, #3D2A0A 100%)",
        }}
      />

      {/* ── Section 2: Mullai — Forest — Learning ── */}
      <MullaiPrograms />

      {/* Poem transition 2→3: Mullai to Marutam */}
      <PoemScreen
        screenIndex={1}
        gradientStyle={{
          background:
            "linear-gradient(to bottom, #7A4F1A 0%, #4A2A00 100%)",
        }}
      />

      {/* ── Section 3: Marutam — Field — Celebration ── */}
      <MarutamEvents />

      {/* Poem transition 3→4: Marutam to Neytal */}
      <PoemScreen
        screenIndex={2}
        gradientStyle={{
          background:
            "linear-gradient(to bottom, #8A4800 0%, #0A1E3D 100%)",
        }}
      />

      {/* ── Section 4: Neytal — Sea — Achievements ── */}
      <NeytalAchievements />

      {/* Poem transition 4→5: Neytal to Palai */}
      <PoemScreen
        screenIndex={3}
        gradientStyle={{
          background:
            "linear-gradient(to bottom, #0A4A6B 0%, #2E1800 100%)",
        }}
      />

      {/* ── Section 5: Palai — Desert — Welcome ── */}
      <PalaiBoard />

      {/* Footer */}
      <Footer />
    </>
  );
}
