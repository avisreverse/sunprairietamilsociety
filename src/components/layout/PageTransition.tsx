"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Page transition wrapper — fades + slides content in on route change.
 * Keyed by pathname so React mounts a fresh motion.div on each navigation.
 * No AnimatePresence/exit — App Router shared layouts don't unmount children,
 * so exit animations cause a flash. Simple enter-only is smooth and reliable.
 *
 * @see D-013 — Framer Motion
 * @see D-001 — Next.js App Router
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Disable browser scroll restoration so every page load/refresh starts at top.
  // Without this, the browser restores the previous scroll position on refresh,
  // which drops the user mid-page after navigating to an anchor section.
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
