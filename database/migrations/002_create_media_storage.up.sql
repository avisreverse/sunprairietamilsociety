-- ============================================================================
-- Migration 002: Create Media Storage Bucket — SPTS Community Hub
-- ============================================================================
-- Creates a single public "media" bucket with folder prefixes:
--   board/        → board member headshots
--   achievements/ → achievement photos
--
-- File limits: 5 MB max, JPEG/PNG/WebP only.
-- Public bucket: images served directly via URL, no signed URLs needed.
--
-- Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/gzdndcytxpmhjuxwnsxv/sql
--
-- @see REQ-202603-005 — Achievement submit + detail pages
-- @see REQ-202603-006 — Board management
-- @see DEF-202603-004 — Admin board — no photo upload
-- @see DEF-202603-006 — Admin achievements — no photo upload
-- ============================================================================

-- ─── BUCKET ──────────────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  5242880,  -- 5 MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- ─── STORAGE RLS POLICIES ────────────────────────────────────────────────────

-- Anyone can read/view images (public CDN delivery)
CREATE POLICY "media_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

-- Authenticated users (admins) can upload new files
CREATE POLICY "media_admin_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

-- Authenticated users can overwrite existing files (re-upload headshot)
CREATE POLICY "media_admin_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media');

-- Authenticated users can delete files
CREATE POLICY "media_admin_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');
