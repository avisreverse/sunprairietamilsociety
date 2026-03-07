"use client";

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
