-- Rollback Migration 004: Remove website URL fields from programs table
ALTER TABLE programs
  DROP COLUMN IF EXISTS website_url,
  DROP COLUMN IF EXISTS website_url_visible;
