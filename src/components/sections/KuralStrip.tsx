"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Kural } from "@/types";

/**
 * Compact Thirukkural rotating strip — embedded at bottom of LandingHero.
 * Same data source and cache as ThirukkuralSection (CACHE_KEY shared).
 * Replaces the full-viewport ThirukkuralSection with a lean crimson banner.
 *
 * @see REQ-202603-003 — Thirukkural rotation section
 * @see D-007 — Strategic Tamil placement
 */

const KURAL_URL = "https://raw.githubusercontent.com/tk120404/thirukkural/master/thirukkural.json";
const CACHE_KEY = "spts_thirukkural_v2";
const ROTATE_MS = 8000;

const FALLBACK: Kural[] = [
  { Number: 1,   Line1: "அகர முதல எழுத்தெல்லாம் ஆதி",           Line2: "பகவன் முதற்றே உலகு.",          Translation: "As the letter A is the first of all letters, so the eternal God is first in the world." },
  { Number: 391, Line1: "கற்க கசடறக் கற்பவை கற்றபின்",           Line2: "நிற்க அதற்குத் தக.",              Translation: "Learn thoroughly that which must be learned, then live accordingly." },
  { Number: 215, Line1: "தொட்டனைத் தூறும் மணற்கேணி மாந்தர்க்கு", Line2: "கற்றனைத் தூறும் அறிவு.",         Translation: "As a sand-well yields water in proportion to the depth dug, so knowledge flows in proportion to what is learned." },
  { Number: 100, Line1: "இனிய உளவாக இன்னாத கூறல்",               Line2: "கனியிருப்பக் காய்கவர்ந்தற்று.", Translation: "Speaking harshly when kind words exist is like choosing raw fruit when ripe fruit is within reach." },
];

export default function KuralStrip() {
  const [kurals, setKurals] = useState<Kural[]>(FALLBACK);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const data = JSON.parse(cached) as Kural[];
          const arr = Array.isArray(data) ? data : (data as unknown as { kural: Kural[] }).kural;
          if (arr?.length > 100) {
            setKurals(arr);
            setIndex(Math.floor(Math.random() * arr.length));
            setLoaded(true);
            return;
          }
        }
      } catch { /* skip bad cache */ }
      try {
        const res = await fetch(KURAL_URL);
        const json = await res.json() as { kural: Kural[] };
        const data = json.kural;
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch { /* skip */ }
        setKurals(data);
        setIndex(Math.floor(Math.random() * data.length));
        setLoaded(true);
      } catch {
        setLoaded(true);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % kurals.length), ROTATE_MS);
    return () => clearInterval(timer);
  }, [loaded, kurals.length]);

  const kural = kurals[index];

  return (
    <div
      style={{
        background: "#7A1515",
        padding: "3rem 3.5rem",
        textAlign: "center",
      }}
    >
      {/* Label */}
      <div
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.22)" }} />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem", fontWeight: 400,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.38)",
          }}
        >
          Thirukkural · திருக்குறள்
        </span>
        <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.22)" }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Tamil verse */}
          <div
            className="spts-kural-strip-text"
            style={{
              fontFamily: "var(--font-tamil)",
              fontSize: "clamp(0.95rem, 1.8vw, 1.35rem)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.9,
              marginBottom: "1rem",
            }}
          >
            <div>{kural?.Line1}</div>
            <div>{kural?.Line2}</div>
          </div>

          {/* English translation */}
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(0.82rem, 1.3vw, 1rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.75,
              maxWidth: "600px",
              margin: "0 auto 0.75rem",
            }}
          >
            &ldquo;{kural?.Translation}&rdquo;
          </p>

          {/* Verse number */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem", fontWeight: 400,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.22)",
            }}
          >
            Verse {kural?.Number} of 1330
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
