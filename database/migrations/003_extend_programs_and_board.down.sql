-- Rollback migration 003: Remove extended columns from programs and board_members
ALTER TABLE programs
  DROP COLUMN IF EXISTS tagline,
  DROP COLUMN IF EXISTS schedule,
  DROP COLUMN IF EXISTS contact_email,
  DROP COLUMN IF EXISTS details;

ALTER TABLE board_members
  DROP COLUMN IF EXISTS role_ta,
  DROP COLUMN IF EXISTS responsibilities,
  DROP COLUMN IF EXISTS since_year;
