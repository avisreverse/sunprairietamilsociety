-- 006_create_site_settings.up.sql
-- Site-wide key-value settings for admin-editable home page content.
-- @see REQ-202603-010 — Home page admin editing

CREATE TABLE IF NOT EXISTS site_settings (
  key         VARCHAR(100) PRIMARY KEY,
  value       TEXT         NOT NULL DEFAULT '',
  label       VARCHAR(200) NOT NULL DEFAULT '',
  description VARCHAR(500) NOT NULL DEFAULT '',
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Seed default values (won't override if already present due to ON CONFLICT DO NOTHING)
INSERT INTO site_settings (key, value, label, description) VALUES
  (
    'hero_story',
    'In 2012, Tamil families in Sun Prairie asked a shared question: how do we give our children the language, culture, and belonging we carry? Today, SPTS is that answer.',
    'Hero Story Paragraph',
    'The origin story shown in the hero section below the Tamil heading.'
  ),
  (
    'hero_year',
    '2012',
    'Founding Year',
    'The year displayed prominently on the right side of the hero section.'
  ),
  (
    'hero_tagline',
    'Year founded in Sun Prairie',
    'Hero Tagline',
    'One-line caption shown below the founding year.'
  ),
  (
    'hero_subtext',
    'Five programs · One community',
    'Hero Sub-tagline',
    'Second line of caption shown below the founding year.'
  )
ON CONFLICT (key) DO NOTHING;

-- RLS: admin only
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read (needed for server-side landing page render)
CREATE POLICY "site_settings_public_read"
  ON site_settings FOR SELECT
  USING (true);

-- Only authenticated users (admins) can write
CREATE POLICY "site_settings_admin_write"
  ON site_settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
