"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Kural } from "@/types";

/**
 * Standalone Thirukkural rotation section.
 * Displays one kural at a time, rotates every 8 seconds.
 * Left watermark: Book name (Aram/Porul/Inbam) + chapter name from 133-chapter lookup.
 * Right watermark: Kural number.
 *
 * @see REQ-202603-003 — Thirukkural rotation section
 * @see D-007 — Strategic Tamil placement
 */

const KURAL_URL =
  "https://raw.githubusercontent.com/tk120404/thirukkural/master/thirukkural.json";
const CACHE_KEY = "spts_thirukkural_v2";
const ROTATE_MS = 8000;

// ─── 133 chapter names (Tamil) — indexed 1–133 ──────────────────────────────
const CHAPTER_NAMES: string[] = [
  // Aram / அறத்துப்பால் — chapters 1–38
  "கடவுள் வாழ்த்து",        "வான் சிறப்பு",             "நீத்தார் பெருமை",
  "அறன் வலியுறுத்தல்",      "இல்வாழ்க்கை",             "வாழ்க்கைத் துணைநலம்",
  "மக்கட்பேறு",               "அன்புடைமை",               "விருந்தோம்பல்",
  "இனியவை கூறல்",           "செய்ந்நன்றி அறிதல்",     "நடுவு நிலைமை",
  "அடக்கமுடைமை",            "ஒழுக்கமுடைமை",           "பிறனில் விழையாமை",
  "பொறையுடைமை",             "அழுக்காறாமை",              "வெஃகாமை",
  "புறங்கூறாமை",              "பயனில சொல்லாமை",         "தீவினையச்சம்",
  "ஒப்புரவறிதல்",              "ஈகை",                        "புகழ்",
  "அருளுடைமை",               "புலான்மறுத்தல்",            "தவம்",
  "கூடாவொழுக்கம்",           "கள்ளாமை",                   "வாய்மை",
  "வெகுளாமை",                  "இன்னாசெய்யாமை",           "கொல்லாமை",
  "நிலையாமை",                  "துறவு",                        "மெய்யுணர்தல்",
  "அவாவறுத்தல்",               "ஊழ்",
  // Porul / பொருட்பால் — chapters 39–108
  "இறைமாட்சி",                 "கல்வி",                        "கல்லாமை",
  "கேள்வி",                      "அறிவுடைமை",               "குற்றங்கடிதல்",
  "பெரியாரைத் துணைக்கோடல்", "சிற்றினஞ்சேராமை",       "தெரிந்துசெயல்வகை",
  "வலியறிதல்",                  "காலமறிதல்",                  "இடனறிதல்",
  "தெரிந்துதெளிதல்",           "தெரிந்துவினையாடல்",      "சுற்றந்தழால்",
  "பொச்சாவாமை",               "செங்கோன்மை",               "கொடுங்கோன்மை",
  "வெருவந்தசெய்யாமை",       "கண்ணோட்டம்",               "ஒற்றாடல்",
  "உய்த்துணர்தல்",              "மடியின்மை",                  "ஆள்வினையுடைமை",
  "இடுக்கணழியாமை",           "அமைச்சு",                     "சொல்வன்மை",
  "வினைத்தூய்மை",              "வினைத்திட்பம்",              "வினைசெயல்வகை",
  "தூது",                         "மன்னரைச் சேர்ந்தொழுகல்", "குறிப்பறிதல்",
  "அவையறிதல்",               "அவையஞ்சாமை",             "நாடு",
  "அரண்",                        "பொருள்செயல்வகை",          "படைமாட்சி",
  "படைச்செருக்கு",              "நட்பு",                         "நட்பாராய்தல்",
  "பழைமை",                     "தீநட்பு",                       "கூடாநட்பு",
  "பேதைமை",                    "புல்லறிவாண்மை",            "இகல்",
  "பகைமாட்சி",                   "பகைத்திறந்தெரிதல்",         "உட்பகை",
  "பெரியாரைப் பிழையாமை",   "பெண்வழிச்சேறல்",           "வரைவின்மகளிர்",
  "கள்ளுண்ணாமை",              "சூது",                          "மருந்து",
  "குடிமை",                       "மானம்",                       "பெருமை",
  "சான்றாண்மை",               "பண்புடைமை",               "நன்றியில்செல்வம்",
  "நாணுடைமை",               "குடியாண்மை",               "உழவு",
  "நல்குரவு",                     "இரவு",                          "இரவச்சம்",
  "கயமை",
  // Inbam / காமத்துப்பால் — chapters 109–133
  "தகையணங்குறுத்தல்",         "குறிப்பறிதல்",                 "புணர்ச்சிமகிழ்தல்",
  "நலம்புனைந்துரைத்தல்",      "காதற்சிறப்புரைத்தல்",        "நாணுத்துறவுரைத்தல்",
  "அலர்அறிவுறுத்தல்",          "பிரிவாற்றாமை",               "படர்மெலிந்திரங்கல்",
  "கண்விதுப்பழிதல்",             "பசப்புறுபருவரல்",             "தனிப்படர்மிகுதி",
  "நினைந்தவர்புலம்பல்",        "கனவுநிலையுரைத்தல்",        "பொழுதுகண்டிரங்கல்",
  "உறுப்புநலனழிதல்",            "நெஞ்சொடுகிளத்தல்",         "நிறையழிதல்",
  "அவர்வயின்விதும்பல்",        "குறிப்பறிவுறுத்தல்",           "புணர்ச்சிவிதும்பல்",
  "நெஞ்சொடுபுலத்தல்",          "புலவி",                          "புலவி நுணுக்கம்",
  "ஊடலுவகை",
];

/** Derive the 3 high-level books from kural number */
function getBook(n: number): { en: string; ta: string } {
  if (n <= 380)  return { en: "Aram",   ta: "அறத்துப்பால்" };
  if (n <= 1080) return { en: "Porul",  ta: "பொருட்பால்" };
  return                 { en: "Inbam", ta: "காமத்துப்பால்" };
}

/** Derive chapter name (1-indexed) from kural number */
function getChapterName(n: number): string {
  const chapterIndex = Math.ceil(n / 10) - 1; // 0-indexed
  return CHAPTER_NAMES[chapterIndex] ?? "";
}

const FALLBACK: Kural[] = [
  { Number: 1,   Line1: "அகர முதல எழுத்தெல்லாம் ஆதி",      Line2: "பகவன் முதற்றே உலகு.",          Translation: "As the letter A is the first of all letters, so the eternal God is first in the world." },
  { Number: 215, Line1: "தொட்டனைத் தூறும் மணற்கேணி மாந்தர்க்கு", Line2: "கற்றனைத் தூறும் அறிவு.",      Translation: "As a sand-well yields water in proportion to the depth dug, so knowledge flows in proportion to what is learned." },
  { Number: 391, Line1: "கற்க கசடறக் கற்பவை கற்றபின்",      Line2: "நிற்க அதற்குத் தக.",              Translation: "Learn thoroughly that which must be learned, then live accordingly." },
  { Number: 100, Line1: "இனிய உளவாக இன்னாத கூறல்",          Line2: "கனியிருப்பக் காய்கவர்ந்தற்று.", Translation: "Speaking harshly when kind words exist is like choosing raw fruit when ripe fruit is within reach." },
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
        // GitHub JSON: { kural: [...] } — must unwrap
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
  const chapterName = getChapterName(kural?.Number ?? 1);

  return (
    <section
      id="kural"
      style={{
        background: "#7A1515",
        padding: "6rem 3.5rem",
        position: "relative",
        overflow: "hidden",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Right watermark — large faded kural number */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "4%",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-tamil)",
          fontSize: "20rem",
          fontWeight: 700,
          color: "rgba(255,255,255,0.035)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {kural?.Number}
      </div>

      {/* Left watermark — Book name + Chapter name, vertical */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "2rem",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {/* Book name in Tamil — large, vertical */}
        <div
          style={{
            fontFamily: "var(--font-tamil)",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.1)",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            letterSpacing: "0.2em",
          }}
        >
          {book.ta}
        </div>
        {/* Book name in English — medium, vertical */}
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.08)",
            writingMode: "vertical-rl",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          {book.en}
        </div>
        {/* Chapter name — smaller, vertical */}
        {chapterName && (
          <div
            style={{
              fontFamily: "var(--font-tamil)",
              fontSize: "1rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.07)",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              letterSpacing: "0.15em",
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
            {/* Tamil text — Line1 and Line2 as separate elements to prevent 3-line wrap issues */}
            <div
              className="spts-kural-text"
              style={{
                fontFamily: "var(--font-tamil)",
                fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.9,
                marginBottom: "1.5rem",
              }}
            >
              <div>{kural?.Line1}</div>
              <div>{kural?.Line2}</div>
            </div>

            {/* English translation */}
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                maxWidth: "680px",
                margin: "0 auto 1.5rem",
              }}
            >
              &ldquo;{kural?.Translation}&rdquo;
            </p>

            {/* Kural number + chapter label */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.68rem", fontWeight: 400, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
                }}
              >
                Verse {kural?.Number} of 1330
              </p>
              {chapterName && (
                <p
                  style={{
                    fontFamily: "var(--font-tamil)",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.22)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {chapterName} · {book.ta}
                </p>
              )}
            </div>
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
