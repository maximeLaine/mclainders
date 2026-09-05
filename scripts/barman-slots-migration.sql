-- ================================================
-- Migration: BARMAN SLOTS
-- ================================================
-- 2 spots, afternoon and evening (fûts & cubis)
-- Run this in your Supabase SQL Editor
-- ================================================

CREATE TABLE IF NOT EXISTS barman_slots (
  id SERIAL PRIMARY KEY,
  spot_index INTEGER NOT NULL,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(spot_index)
);

INSERT INTO barman_slots (spot_index) VALUES (0), (1)
ON CONFLICT (spot_index) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_barman_available ON barman_slots(name) WHERE name IS NULL;

ALTER TABLE barman_slots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON barman_slots;
CREATE POLICY "Allow public read access" ON barman_slots FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public write access" ON barman_slots;
CREATE POLICY "Allow public write access" ON barman_slots FOR ALL USING (true);

SELECT COUNT(*) AS barman_count FROM barman_slots;
