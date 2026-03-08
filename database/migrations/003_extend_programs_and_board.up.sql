-- Migration 003: Extend programs and board_members tables
-- Adds missing fields so all public page content is admin-editable.
-- Programs: tagline, schedule, contact_email, details (JSONB array)
-- Board members: role_ta (Tamil role title), responsibilities (JSONB array), since_year
--
-- @see REQ-202603-002 — Programs section
-- @see REQ-202603-006 — Board management
-- @see DEF-202603-016 — Programs/board public pages not DB-driven

-- ─── programs ────────────────────────────────────────────────
ALTER TABLE programs
  ADD COLUMN IF NOT EXISTS tagline       TEXT,
  ADD COLUMN IF NOT EXISTS schedule      TEXT,
  ADD COLUMN IF NOT EXISTS contact_email TEXT,
  ADD COLUMN IF NOT EXISTS details       JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Seed existing 5 programs with real data from hardcoded arrays
UPDATE programs SET
  tagline       = 'Language, culture, and identity — for every child.',
  schedule      = 'Saturdays, 10:00 AM – 12:30 PM',
  contact_email = 'tamilschool@sunprairietamil.org',
  details       = '["Weekly Saturday classes for ages 5–16","Levels from beginner to advanced","Annual Tamil Sangam graduation ceremony","Homework support and parent resources"]'::jsonb
WHERE slug = 'tamil-school';

UPDATE programs SET
  tagline       = 'Thousands of Tamil books, right in Sun Prairie.',
  schedule      = 'Open during Tamil School hours and events',
  contact_email = 'library@sunprairietamil.org',
  details       = '["Over 500 Tamil books across genres","Children''s section with illustrated stories","Monthly community reading circles","Book donation and exchange program"]'::jsonb
WHERE slug = 'library';

UPDATE programs SET
  tagline       = 'The songs that connect generations.',
  schedule      = 'Bi-weekly practice sessions — check events calendar',
  contact_email = 'music@sunprairietamil.org',
  details       = '["Carnatic vocal and instrumental practice","Tamil folk and devotional music","Annual Music & Dance Showcase performance","Workshops with visiting artists"]'::jsonb
WHERE slug = 'music-club';

UPDATE programs SET
  tagline       = 'Where culture becomes art.',
  schedule      = 'Monthly workshops — check events calendar',
  contact_email = 'pattarai@sunprairietamil.org',
  details       = '["Kolam and rangoli workshops","Tamil-themed drawing and painting sessions","Festival decoration projects","Youth art showcase at annual events"]'::jsonb
WHERE slug = 'tamil-pattarai';

UPDATE programs SET
  tagline       = 'The community runs on care — yours included.',
  schedule      = 'Flexible — based on events and programs',
  contact_email = 'volunteer@sunprairietamil.org',
  details       = '["Event setup and coordination roles","Tamil School teaching assistants","Communications and social media help","Food committee for cultural celebrations"]'::jsonb
WHERE slug = 'volunteer';

-- ─── board_members ────────────────────────────────────────────
ALTER TABLE board_members
  ADD COLUMN IF NOT EXISTS role_ta         TEXT,
  ADD COLUMN IF NOT EXISTS responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS since_year      INTEGER;

-- Seed existing 4 board members with real data from hardcoded arrays
UPDATE board_members SET
  role_ta         = 'தலைவர்',
  since_year      = 2012,
  responsibilities = '["Overall leadership and strategic direction of SPTS","External partnerships with Tamil organizations and Wisconsin institutions","Presides over all board meetings and decisions","Represents SPTS at state and national Tamil community events"]'::jsonb
WHERE slug = 'sivasankar';

UPDATE board_members SET
  role_ta         = 'செயலர்',
  since_year      = 2014,
  responsibilities = '["Maintains member registry and contact database","Coordinates inter-program communications","Records and distributes meeting minutes","Manages community outreach and new member onboarding"]'::jsonb
WHERE slug = 'kavitha';

UPDATE board_members SET
  role_ta         = 'பொருளாளர்',
  since_year      = 2016,
  responsibilities = '["Manages SPTS annual budget and financial records","Oversees event budgets and vendor payments","Prepares annual financial reports for the board","Leads grant applications and sponsorship discussions"]'::jsonb
WHERE slug = 'murali';

UPDATE board_members SET
  role_ta         = 'திட்ட இயக்குநர்',
  since_year      = 2018,
  responsibilities = '["Designs and coordinates all cultural programs","Manages Tamil School curriculum and teacher volunteers","Directs Music Club practice schedule and annual showcase","Leads Tamil Pattarai arts workshops and youth programming"]'::jsonb
WHERE slug = 'divya';
