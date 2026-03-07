-- ============================================================================
-- Seed 001: Initial content from hardcoded component data
-- ============================================================================
-- Run AFTER 001_create_content_tables.up.sql
-- Converts hardcoded arrays in components to DB rows.
-- @see REQ-202603-004 — Admin CMS
-- ============================================================================

-- ─── PROGRAMS (from MullaiPrograms.tsx) ──────────────────────────────────────

INSERT INTO programs (slug, name_en, name_ta, description, color, featured, display_order, is_active) VALUES
  ('tamil-school',  'Tamil School',    'தமிழ்ப் பள்ளி',   'Language classes for children — reading, writing, and speaking Tamil fluently. Weekend classes for all ages.', '#C0392B', true,  1, true),
  ('library',       'Library',         'நூலகம்',           'Tamil literature, children''s books, and community reading programs.',                                           '#27AE60', false, 2, true),
  ('music-club',    'Music Club',      'இசைக் குழு',       'Carnatic music, folk songs, and cultural performances for all ages.',                                            '#E67E22', false, 3, true),
  ('tamil-pattarai','Tamil Pattarai',  'தமிழ்ப் பட்டறை',  'Creative arts studio — drawing, crafts, and cultural expression in the Tamil tradition.',                        '#2980B9', false, 4, true),
  ('volunteer',     'Volunteer',       'தன்னார்வலர்',      'Give your time. Shape the community. Every contribution matters.',                                                '#8E44AD', false, 5, true)
ON CONFLICT (slug) DO NOTHING;

-- ─── BOARD MEMBERS (from PalaiBoard.tsx + board page) ────────────────────────

INSERT INTO board_members (slug, name, initials, role, bio, email, color, display_order, is_active) VALUES
  ('sivasankar', 'Sivasankar A.', 'SA', 'President',         'Leading Sun Prairie Tamil Society with a vision for a thriving Tamil cultural community in Wisconsin. Committed to preserving language, arts, and heritage for future generations.', null, '#C0392B', 1, true),
  ('kavitha',    'Kavitha V.',    'KV', 'Secretary',          'Organizing community events and managing communications for SPTS. Passionate about connecting Tamil families across Sun Prairie and the greater Madison area.',                          null, '#27AE60', 2, true),
  ('murali',     'Murali G.',     'MG', 'Treasurer',          'Managing SPTS finances with transparency and accountability. Background in finance and technology. Dedicated to sustainable community growth.',                                         null, '#E67E22', 3, true),
  ('divya',      'Divya K.',      'DK', 'Programs Director',  'Designing and coordinating all SPTS cultural programs — from Tamil School to music and dance. Bringing creativity and structure to our community offerings.',                          null, '#2980B9', 4, true)
ON CONFLICT (slug) DO NOTHING;

-- ─── ACHIEVEMENTS (from NeytalAchievements.tsx) ───────────────────────────────

INSERT INTO achievements (name, initials, category, achievement, year, color, is_approved, is_published) VALUES
  ('Siva Arumugam', 'SA', 'Education', 'Tamil School Top Student',   '2024', '#C0392B', true, true),
  ('Priya Murugan', 'PM', 'Arts',      'State Bharatanatyam Award',  '2024', '#27AE60', true, true),
  ('Karthik Vel',   'KV', 'Music',     'Carnatic Music Excellence',  '2024', '#E67E22', true, true),
  ('Divya Lakshmi', 'DL', 'Community', 'Volunteer of the Year',      '2023', '#2980B9', true, true),
  ('Arun Raj',      'AR', 'Education', 'Tamil Literature Prize',     '2023', '#8E44AD', true, true),
  ('Meena Nathan',  'MN', 'Arts',      'Kolam Design Champion',      '2023', '#C0392B', true, true);

-- ─── EVENTS (from MarutamEvents.tsx) ─────────────────────────────────────────

INSERT INTO events (title, title_ta, date, time, location, description, featured, rsvp_required, is_published, display_order) VALUES
  ('Tamil New Year — Puthandu',        'புத்தாண்டு விழா',  '2026-04-12', '4:00 PM', 'Sun Prairie Community Center', 'Celebrate the Tamil New Year with traditional music, dance, food, and community. All families welcome.', true,  false, true, 1),
  ('Annual Music & Dance Showcase',    'இசை & நடன விழா',   '2026-05-03', '6:30 PM', 'SPHS Auditorium',              'Students from all SPTS programs perform on stage.',                                                    false, false, true, 2),
  ('Tamil School Year-End Graduation', 'பட்டமளிப்பு விழா', '2026-06-21', '2:00 PM', 'Sun Prairie Community Center', 'Celebrating our students'' achievements in Tamil language learning.',                                  false, false, true, 3);
