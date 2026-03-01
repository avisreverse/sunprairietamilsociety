"use client";

import { useEffect, useState } from "react";

/**
 * Fixed right-side dot navigation — one dot per tinai section.
 * Active dot fills white and scales up (IntersectionObserver-based).
 * Hidden on mobile (right: 1rem on small screens).
 * @see REQ-202603-001 — Landing page navigation
 */
const SECTIONS = [
  { id: "hero", title: "Home" },
  { id: "kurinci", title: "Kurinci — Mountain" },
  { id: "mullai", title: "Mullai — Forest" },
  { id: "marutam", title: "Marutam — Field" },
  { id: "neytal", title: "Neytal — Sea" },
  { id: "palai", title: "Palai — Desert" },
] as const;

export default function DotNav() {
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      style={{
        position: "fixed",
        right: "2rem",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        zIndex: 200,
      }}
      className="hidden sm:flex"
    >
      {SECTIONS.map(({ id, title }) => (
        <a
          key={id}
          href={`#${id}`}
          title={title}
          aria-label={title}
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            border: `2px solid ${activeId === id ? "white" : "rgba(255,255,255,0.4)"}`,
            display: "block",
            transition: "all 0.3s",
            background:
              activeId === id ? "white" : "transparent",
            transform: activeId === id ? "scale(1.3)" : "scale(1)",
          }}
        />
      ))}
    </nav>
  );
}
