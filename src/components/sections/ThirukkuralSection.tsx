"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Kural } from "@/types";

/**
 * Standalone Thirukkural rotation section.
 * Displays one kural at a time, rotates every 8 seconds.
 * Fetches all 1330 from cache (shared with ThirukkuralLoader) or fetches fresh.
 * Crimson background. Tamil text large, English translation below.
 *
 * @see REQ-202603-003 — Thirukkural rotation section
 * @see D-007 — Strategic Tamil placement
 */

/** Derive the 3 high-level books from kural number */
function getBook(n: number): { en: string; ta: string } {
  if (n <= 380) return { en: "Aram", ta: "அறத்துப்பால்" };
  if (n <= 1080) return { en: "Porul", ta: "பொருட்பால்" };
  return { en: "Inbam", ta: "காமத்துப்பால்" };
}

const KURAL_URL =
  "https://raw.githubusercontent.com/tk120404/thirukkural/master/thirukkural.json";
const CACHE_KEY = "spts_thirukkural_v1";
const ROTATE_MS = 8000;

const FALLBACK: Kural[] = [
  {
    Number: 1,
    Line1: "அகர முதல எழுத்தெல்லாம் ஆதி",
    Line2: "பகவன் முதற்றே உலகு.",
    Translation:
      "As the letter A is the first of all letters, so the eternal God is first in the world.",
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
    Line1: "கற்க கசடறக் கற்பவை கற்றபின்",
    Line2: "நிற்க அதற்குத் தக.",
    Translation: "Learn thoroughly that which must be learned, then live accordingly.",
  },
  {
    Number: 100,
    Line1: "இனிய உளவாக இன்னாத கூறல்",
    Line2: "கனியிருப்பக் காய்கவர்ந்தற்று.",
    Translation:
      "Speaking harshly when kind words exist is like choosing raw fruit when ripe fruit is within reach.",
  },
];

export default function ThirukkuralSection() {
  const [kurals, setKurals] = useState<Kural[]>(FALLBACK);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  /* ── Load kurals ── */
  useEffect(() => {
    async function load() {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const data = JSON.parse(cached) as Kural[];
          // Validate it's an array (not the old { kural: [] } shape stored in cache)
          const arr = Array.isArray(data) ? data : (data as unknown as { kural: Kural[] }).kural;
          setKurals(arr);
          setIndex(Math.floor(Math.random() * arr.length));
          setLoaded(true);
          return;
        }
      } catch { /* skip */ }

      try {
        const res = await fetch(KURAL_URL);
        // GitHub JSON structure: { kural: [...] } — must unwrap
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

  /* ── Auto-rotate ── */
  useEffect(() => {
    if (!loaded) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % kurals.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [loaded, kurals.length]);

  const kural = kurals[index];
  const book = getBook(kural?.Number ?? 1);
  const chapterName = kural?.Chapter ?? `Chapter ${Math.ceil((kural?.Number ?? 1) / 10)}`;

  return (
    <section
      id="kural"
      style={{
        background: "#7A1515",
        padding: "6rem 3.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Right watermark — large faded kural number */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-tamil)",
          fontSize: "18rem",
          fontWeight: 700,
          color: "rgba(255,255,255,0.03)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {kural?.Number}
      </div>

      {/* Left watermark — book name (vertical) + chapter name */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "2.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.6rem",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {/* Book name — Tamil, large, rotated vertical */}
        <div
          style={{
            fontFamily: "var(--font-tamil)",
            fontSize: "1.05rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.07)",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            letterSpacing: "0.18em",
          }}
        >
          {book.ta}
        </div>
        {/* Book name — English */}
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.05)",
            writingMode: "vertical-rl",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          {book.en}
        </div>
        {/* Chapter name */}
        {chapterName && (
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.55rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.04)",
              writingMode: "vertical-rl",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginTop: "0.5rem",
            }}
          >
            {chapterName}
          </div>
        )}
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative" }}>

        {/* Label */}
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.3)" }} />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem", fontWeight: 400, letterSpacing: "0.25em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
            }}
          >
            Thirukkural · திருக்குறள்
          </span>
          <div style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.3)" }} />
        </div>

        {/* Rotating kural */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tamil text */}
            <p
              style={{
                fontFamily: "var(--font-tamil)",
                fontSize: "clamp(1.3rem, 2.8vw, 2rem)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
                whiteSpace: "pre-line",
              }}
            >
              {kural ? `${kural.Line1}\n${kural.Line2}` : ""}
            </p>

            {/* English translation */}
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                maxWidth: "680px",
                margin: "0 auto 1.5rem",
              }}
            >
              "{kural?.Translation}"
            </p>

            {/* Kural number */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.68rem", fontWeight: 400, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
              }}
            >
              Verse {kural?.Number} of 1330
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div
          style={{
            display: "flex", justifyContent: "center", gap: "0.4rem",
            marginTop: "2rem",
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              onClick={() => setIndex((index + i) % kurals.length)}
              style={{
                width: i === 0 ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                border: "none",
                background: i === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s",
              }}
              aria-label={`Jump ${i} kurals forward`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
