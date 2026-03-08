"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AnnouncementBar — floating dismissible announcement cards.
 * Appears bottom-right when there are active announcements.
 * Multiple announcements shown as a stack; each can be dismissed individually.
 * Dismissed state stored in sessionStorage (reappears on new visit).
 *
 * @see REQ-202603-009 — External announcement board
 */

interface Announcement {
  id: string;
  title: string;
  body: string | null;
  poster_url: string | null;
  action_url: string | null;
  action_label: string;
  expires_at: string | null;
}

export default function AnnouncementBar() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load previously dismissed IDs from sessionStorage
    const stored = sessionStorage.getItem("spts_dismissed_announcements");
    const alreadyDismissed: string[] = stored ? JSON.parse(stored) : [];
    setDismissed(new Set(alreadyDismissed));

    // Fetch active announcements
    fetch("/api/announcements")
      .then((r) => r.json())
      .then((data: Announcement[]) => {
        // Filter out already-dismissed and locally-expired ones
        const now = new Date();
        const active = data.filter(
          (a) =>
            !alreadyDismissed.includes(a.id) &&
            (!a.expires_at || new Date(a.expires_at) > now)
        );
        setItems(active);
        setLoaded(true);
      })
      .catch(() => setLoaded(true)); // Graceful degradation
  }, []);

  const dismiss = (id: string) => {
    setDismissed((prev) => {
      const next = new Set(prev);
      next.add(id);
      sessionStorage.setItem("spts_dismissed_announcements", JSON.stringify([...next]));
      return next;
    });
    setItems((prev) => prev.filter((a) => a.id !== id));
  };

  const visible = items.filter((a) => !dismissed.has(a.id));

  if (!loaded || visible.length === 0) return null;

  return (
    // Fixed bottom-right floating stack
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        maxWidth: "360px",
        width: "calc(100vw - 3rem)",
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {visible.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{ pointerEvents: "all" }}
          >
            <div
              style={{
                background: "rgba(26,20,16,0.97)",
                border: "1px solid rgba(212,147,10,0.35)",
                borderRadius: "16px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,147,10,0.1)",
                overflow: "hidden",
              }}
            >
              {/* Poster image */}
              {item.poster_url && (
                <img
                  src={item.poster_url}
                  alt={item.title}
                  style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }}
                />
              )}

              <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
                {/* Header with dismiss */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: item.body ? "0.6rem" : "0" }}>
                  <div>
                    {/* Announcement label */}
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4930A", marginBottom: "0.3rem" }}>
                      Announcement
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 700, color: "white", lineHeight: 1.3 }}>
                      {item.title}
                    </div>
                  </div>
                  <button
                    onClick={() => dismiss(item.id)}
                    aria-label="Dismiss announcement"
                    style={{
                      flexShrink: 0,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "50%",
                      width: "28px", height: "28px",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "1rem", lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </div>

                {/* Body text */}
                {item.body && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 300, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: item.action_url ? "1rem" : "0", marginTop: "0.5rem" }}>
                    {item.body}
                  </p>
                )}

                {/* Action button */}
                {item.action_url && (
                  <a
                    href={item.action_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "0.55rem 1.25rem",
                      borderRadius: "999px",
                      background: "#8B1A1A",
                      color: "white",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    {item.action_label || "Learn More"} →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
