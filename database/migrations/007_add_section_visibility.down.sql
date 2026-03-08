-- 007_add_section_visibility.down.sql
-- Removes the section visibility flags added in 007 up.
-- @see REQ-202603-011

DELETE FROM site_settings WHERE key IN ('events_section_enabled', 'achievements_section_enabled');
