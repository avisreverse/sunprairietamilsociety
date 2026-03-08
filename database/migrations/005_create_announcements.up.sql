-- Migration 005: Create announcements table
-- REQ-202603-009: External announcement board
-- Admin can add posters (image), title, write-up, URL, expiry date
-- Public: floating dismissible cards shown when active announcements exist
-- Multiple announcements supported; auto-hide after expires_at

CREATE TABLE announcements (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT NOT NULL,
  body           TEXT,
  poster_url     TEXT,
  action_url     TEXT,
  action_label   TEXT DEFAULT 'Learn More',
  is_published   BOOLEAN NOT NULL DEFAULT false,
  expires_at     TIMESTAMPTZ,
  display_order  INT NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on any row change
CREATE TRIGGER announcements_updated_at
  BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS: public can read published, non-expired announcements
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active announcements" ON announcements
  FOR SELECT USING (
    is_published = true
    AND (expires_at IS NULL OR expires_at > NOW())
  );

CREATE POLICY "Service role full access to announcements" ON announcements
  USING (auth.role() = 'service_role');

-- Index for public query performance
CREATE INDEX idx_announcements_published ON announcements (is_published, expires_at, display_order);
