-- 007_add_section_visibility.up.sql
-- Adds two boolean flags to site_settings so admin can hide the
-- Events and Achievements sections on the homepage when empty.
-- Values stored as "true"/"false" strings (consistent with existing site_settings pattern).
-- @see REQ-202603-011 — Section visibility toggles

INSERT INTO site_settings (key, value, label, description) VALUES
  (
    'events_section_enabled',
    'true',
    'Show Events Section',
    'When off, the upcoming events section is hidden from the homepage.'
  ),
  (
    'achievements_section_enabled',
    'true',
    'Show Achievements Section',
    'When off, the achievements section is hidden from the homepage. The /achievements/submit form remains accessible.'
  )
ON CONFLICT (key) DO NOTHING;
