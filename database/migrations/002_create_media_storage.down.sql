-- ============================================================================
-- Migration 002 DOWN: Drop Media Storage Bucket
-- ============================================================================
-- WARNING: This deletes the bucket and all stored files.
-- Run only in dev/rollback scenarios.
-- ============================================================================

DROP POLICY IF EXISTS "media_public_read"  ON storage.objects;
DROP POLICY IF EXISTS "media_admin_insert" ON storage.objects;
DROP POLICY IF EXISTS "media_admin_update" ON storage.objects;
DROP POLICY IF EXISTS "media_admin_delete" ON storage.objects;

DELETE FROM storage.buckets WHERE id = 'media';
