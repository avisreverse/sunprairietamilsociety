"use client";

import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

/**
 * Reusable scroll-triggered reveal wrapper using Framer Motion.
 * Wraps any content in a motion.div that fades + slides in when entering viewport.
 * Uses once:true so it animates only on first appearance (no re-trigger on scroll up).
 *
 * @param delay   - stagger offset in seconds (default 0)
 * @param direction - "up" | "left" | "right" | "none" (default "up")
 * @see D-013 — Framer Motion for animations
 * @see REQ-202603-001 — Landing page
 */
interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
  style?: CSSProperties;
  /** Distance in px to move from. Default 32. */
  distance?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
  style,
  distance = 32,
}: ScrollRevealProps) {
  const initial = {
    opacity: 0,
    y: direction === "up" ? distance : 0,
    x: direction === "left" ? -distance : direction === "right" ? distance : 0,
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
