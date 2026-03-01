"use client";

import { useEffect } from "react";
import type { Kural } from "@/types";

/**
 * Client-side Thirukkural rotation loader.
 * Fetches all 1330 kurals from github.com/tk120404/thirukkural on first load,
 * caches in sessionStorage, then randomly assigns unique kurals to each poem-screen.
 *
 * Thirukkural rule (CRITICAL): exactly 2 lines.
 * Line1 = 4 cirs (words), Line2 = 3 cirs.
 * The source JSON pre-splits at the correct boundary.
 *
 * @see REQ-202603-001 — Thirukkural rotation
 */

const KURAL_URL =
  "https://raw.githubusercontent.com/tk120404/thirukkural/master/thirukkural.json";
const CACHE_KEY = "spts_thirukkural_v1";

/** Verified fallback set — used when network fetch fails */
const FALLBACK: Kural[] = [
  {
    Number: 1,
    Line1: "அகர முதல எழுத்தெல்லாம் ஆதி",
    Line2: "பகவன் முதற்றே உலகு.",
    Translation:
      "As the letter A is the first of all letters, so the eternal God is first in the world.",
  },
  {
    Number: 43,
    Line1: "தென்புலத்தார் தெய்வம் விருந்தொக்கல் தானென்று",
    Line2: "ஐம்புலத்தாறு ஓம்பல் தலை.",
    Translation:
      "To honour ancestors, the divine, guests, kin, and oneself — this is the highest duty.",
  },
  {
    Number: 100,
    Line1: "இனிய உளவாக இன்னாத கூறல்",
    Line2: "கனியிருப்பக் காய்கவர்ந்தற்று.",
    Translation:
      "Speaking harshly when kind words exist is like choosing raw fruit when ripe fruit is within reach.",
  },
  {
    Number: 215,
    Line1: "தொட்டனைத் தூறும் மணற்கேணி மாந்தர்க்கு",
    Line2: "கற்றனைத் தூறும் அறிவு.",
    Translation:
      "As a sand-well yields water in proportion to the depth dug, so knowledge flows in proportion to what is learned.",
  },
  {
    Number: 391,
    Line1: "படைகுடி கூழ்அமைச்சு நட்பரண் ஆறும்",
    Line2: "உடையான் அரசருள் ஏறு.",
    Translation:
      "A king who possesses an army, citizens, wealth, ministers, allies, and fortification is a lion among kings.",
  },
];

/**
 * Picks `count` unique random items from an array.
 */
function pickUnique<T>(arr: T[], count: number): T[] {
  const chosen: T[] = [];
  const used = new Set<number>();
  const max = Math.min(count, arr.length);
  while (chosen.length < max) {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * arr.length);
    } while (used.has(idx));
    used.add(idx);
    chosen.push(arr[idx]);
  }
  return chosen;
}

/**
 * Injects kural content into .poem-screen elements on the page.
 */
function applyKurals(data: Kural[]) {
  const screens = document.querySelectorAll<HTMLElement>(".poem-screen");
  const picked = pickUnique(data, screens.length);

  screens.forEach((screen, i) => {
    const k = picked[i];
    if (!k) return;

    const taEl = screen.querySelector<HTMLElement>(".ta");
    const enEl = screen.querySelector<HTMLElement>(".en");
    const numEl = screen.querySelector<HTMLElement>(".kural-num");

    // Line1 + Line2 separated by newline — white-space:pre-line renders as 2 lines
    if (taEl) taEl.textContent = `${k.Line1}\n${k.Line2}`;
    if (enEl) enEl.textContent = `\u201c${k.Translation}\u201d`;
    if (numEl) numEl.textContent = `Thirukkural \u00b7 ${k.Number}`;
  });
}

export default function ThirukkuralLoader() {
  useEffect(() => {
    async function loadKurals() {
      // 1. Try sessionStorage cache for instant repeat loads
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          applyKurals(JSON.parse(cached) as Kural[]);
          return;
        }
      } catch {
        // sessionStorage unavailable — proceed to fetch
      }

      // 2. Fetch all 1330 from authoritative source
      try {
        const res = await fetch(KURAL_URL);
        const data = (await res.json()) as Kural[];
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
        } catch {
          // sessionStorage full — still display what we fetched
        }
        applyKurals(data);
      } catch {
        // 3. Network unavailable — fall back to curated set
        console.warn(
          "✅ [SPTS] Thirukkural fetch failed, using fallback set."
        );
        applyKurals(FALLBACK);
      }
    }

    loadKurals();
  }, []);

  // This component renders nothing — pure side-effect loader
  return null;
}
