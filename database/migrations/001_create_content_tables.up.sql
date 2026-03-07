-- ============================================================================
-- Migration 001: Create Content Tables — SPTS Community Hub
-- ============================================================================
-- Created: 2026-03-09
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/gzdndcytxpmhjuxwnsxv/sql
-- @see REQ-202603-004 — Admin CMS
-- ============================================================================

-- ─── EVENTS ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  title_ta      TEXT,
  date          DATE NOT NULL,
  time          TEXT,
  location      TEXT,
  description   TEXT,
  featured      BOOLEAN DEFAULT false,
  rsvp_url      TEXT,            -- external link (e.g. Google Forms) set by admin
  rsvp_required BOOLEAN DEFAULT false, -- true = internal RSVP form on site
  is_published  BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE events IS 'Community events. Admin manages via CMS. REQ-202603-004.';
COMMENT ON COLUMN events.rsvp_url IS 'External RSVP link. Shown as button if set. D-016.';
COMMENT ON COLUMN events.rsvp_required IS 'If true, internal RSVP form is shown on event page.';

-- ─── ACHIEVEMENTS ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS achievements (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name               TEXT NOT NULL,
  initials           TEXT NOT NULL,          -- 2-char avatar fallback
  category           TEXT NOT NULL,          -- Education, Arts, Music, Community
  achievement        TEXT NOT NULL,          -- award title / achievement description
  year               TEXT NOT NULL,          -- "2024"
  color              TEXT DEFAULT '#C0392B', -- hex for avatar/card accent
  bio                TEXT,
  photo_url          TEXT,
  is_approved        BOOLEAN DEFAULT false,  -- admin approves before publish
  is_published       BOOLEAN DEFAULT false,  -- admin controls public visibility
  submitted_by_name  TEXT,
  submitted_by_email TEXT,
  submitted_at       TIMESTAMPTZ DEFAULT NOW(),
  approved_at        TIMESTAMPTZ,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE achievements IS 'Community achievements. Submitted publicly, approved+published by admin. REQ-202603-004.';

-- ─── BOARD MEMBERS ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS board_members (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,   -- URL slug for /board/[slug]
  name          TEXT NOT NULL,
  initials      TEXT NOT NULL,          -- 2-char avatar fallback
  role          TEXT NOT NULL,
  bio           TEXT,
  email         TEXT,
  photo_url     TEXT,
  color         TEXT DEFAULT '#C0392B', -- hex for avatar accent
  display_order INT DEFAULT 0,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE board_members IS 'Board of directors. Admin manages via CMS. REQ-202603-004.';

-- ─── PROGRAMS ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS programs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,   -- URL slug for /programs/[slug]
  name_en       TEXT NOT NULL,
  name_ta       TEXT,
  description   TEXT,
  color         TEXT DEFAULT '#C0392B',
  featured      BOOLEAN DEFAULT false,  -- featured card in bento grid
  display_order INT DEFAULT 0,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE programs IS 'Community programs. Admin manages via CMS. REQ-202603-004.';

-- ─── RSVP RESPONSES ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS rsvp_responses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  guest_count INT DEFAULT 1 CHECK (guest_count >= 1 AND guest_count <= 20),
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE rsvp_responses IS 'RSVP submissions for events with rsvp_required=true. Admin views only. REQ-202603-004.';

-- ─── INDEXES ─────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_events_date           ON events(date DESC);
CREATE INDEX IF NOT EXISTS idx_events_published      ON events(is_published);
CREATE INDEX IF NOT EXISTS idx_events_featured       ON events(featured, is_published);
CREATE INDEX IF NOT EXISTS idx_achievements_status   ON achievements(is_approved, is_published);
CREATE INDEX IF NOT EXISTS idx_board_order           ON board_members(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_programs_order        ON programs(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_rsvp_event            ON rsvp_responses(event_id, created_at);

-- ─── UPDATED_AT TRIGGER ──────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER achievements_updated_at
  BEFORE UPDATE ON achievements FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER board_members_updated_at
  BEFORE UPDATE ON board_members FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER programs_updated_at
  BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────────────────
-- D-005: RLS from day 1 — public read published, authenticated = admin full access

ALTER TABLE events         ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements   ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_members  ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Public: read published/approved content only
CREATE POLICY "public_read_events"
  ON events FOR SELECT
  USING (is_published = true);

CREATE POLICY "public_read_achievements"
  ON achievements FOR SELECT
  USING (is_approved = true AND is_published = true);

CREATE POLICY "public_read_board"
  ON board_members FOR SELECT
  USING (is_active = true);

CREATE POLICY "public_read_programs"
  ON programs FOR SELECT
  USING (is_active = true);

-- Public: submit RSVP (insert only, no read)
CREATE POLICY "public_submit_rsvp"
  ON rsvp_responses FOR INSERT
  WITH CHECK (true);

-- Authenticated users (admins): full access to all content
CREATE POLICY "admin_all_events"
  ON events FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "admin_all_achievements"
  ON achievements FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "admin_all_board"
  ON board_members FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "admin_all_programs"
  ON programs FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "admin_read_rsvp"
  ON rsvp_responses FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_delete_rsvp"
  ON rsvp_responses FOR DELETE TO authenticated
  USING (true);
