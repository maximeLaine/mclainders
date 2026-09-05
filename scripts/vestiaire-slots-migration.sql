-- ================================================
-- Migration: VESTIAIRE SLOTS
-- ================================================
-- 2 spots, guest arrival (coat check)
-- Run this in your Supabase SQL Editor
-- ================================================

CREATE TABLE IF NOT EXISTS vestiaire_slots (
  id SERIAL PRIMARY KEY,
  spot_index INTEGER NOT NULL,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(spot_index)
);

INSERT INTO vestiaire_slots (spot_index) VALUES (0), (1)
ON CONFLICT (spot_index) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_vestiaire_available ON vestiaire_slots(name) WHERE name IS NULL;

ALTER TABLE vestiaire_slots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON vestiaire_slots;
CREATE POLICY "Allow public read access" ON vestiaire_slots FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public write access" ON vestiaire_slots;
CREATE POLICY "Allow public write access" ON vestiaire_slots FOR ALL USING (true);

SELECT COUNT(*) AS vestiaire_count FROM vestiaire_slots;
