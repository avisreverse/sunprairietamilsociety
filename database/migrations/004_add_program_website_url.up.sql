-- Migration 004: Add optional website URL fields to programs table
-- REQ-202603-008: Program detail page - admin-configurable external website link
-- website_url:         optional external URL (e.g. https://spts.org/music)
-- website_url_visible: admin checkbox — controls whether URL shows on public detail page

ALTER TABLE programs
  ADD COLUMN IF NOT EXISTS website_url TEXT,
  ADD COLUMN IF NOT EXISTS website_url_visible BOOLEAN NOT NULL DEFAULT false;

-- No data seed needed — existing programs start with NULL / false (hidden)
