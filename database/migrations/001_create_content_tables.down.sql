-- ============================================================================
-- Migration 001: DROP Content Tables (Rollback)
-- ============================================================================
-- WARNING: Destroys all events, achievements, board members, programs, RSVPs.
-- @see REQ-202603-004 — Admin CMS
-- ============================================================================

DROP TRIGGER IF EXISTS programs_updated_at      ON programs;
DROP TRIGGER IF EXISTS board_members_updated_at ON board_members;
DROP TRIGGER IF EXISTS achievements_updated_at  ON achievements;
DROP TRIGGER IF EXISTS events_updated_at        ON events;

DROP FUNCTION IF EXISTS update_updated_at();

DROP TABLE IF EXISTS rsvp_responses;
DROP TABLE IF EXISTS achievements;
DROP TABLE IF EXISTS board_members;
DROP TABLE IF EXISTS programs;
DROP TABLE IF EXISTS events;
