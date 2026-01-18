-- ================================================
-- McLainders Volunteer Slots Setup Script
-- ================================================
-- This script creates tables for volunteer sign-ups
-- Run this in your Supabase SQL Editor
-- ================================================

-- ================================================
-- 1. VOITURIER (VALET PARKING) TABLE
-- ================================================
-- 3 spots available, arrival at 13h30

CREATE TABLE IF NOT EXISTS voiturier_slots (
  id SERIAL PRIMARY KEY,
  spot_index INTEGER NOT NULL,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(spot_index)
);

-- Insert 3 empty spots
INSERT INTO voiturier_slots (spot_index) VALUES (0), (1), (2)
ON CONFLICT (spot_index) DO NOTHING;

-- Index for checking availability
CREATE INDEX IF NOT EXISTS idx_voiturier_available ON voiturier_slots(name) WHERE name IS NULL;

-- ================================================
-- 2. ACCUEIL (HOST/HOSTESS) TABLE
-- ================================================
-- 3 spots available, at 13h00

CREATE TABLE IF NOT EXISTS accueil_slots (
  id SERIAL PRIMARY KEY,
  spot_index INTEGER NOT NULL,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(spot_index)
);

-- Insert 3 empty spots
INSERT INTO accueil_slots (spot_index) VALUES (0), (1), (2)
ON CONFLICT (spot_index) DO NOTHING;

-- Index for checking availability
CREATE INDEX IF NOT EXISTS idx_accueil_available ON accueil_slots(name) WHERE name IS NULL;

-- ================================================
-- 3. RESPO CAFE TABLE
-- ================================================
-- 2 spots available, at 10h

CREATE TABLE IF NOT EXISTS cafe_slots (
  id SERIAL PRIMARY KEY,
  spot_index INTEGER NOT NULL,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(spot_index)
);

-- Insert 2 empty spots
INSERT INTO cafe_slots (spot_index) VALUES (0), (1)
ON CONFLICT (spot_index) DO NOTHING;

-- Index for checking availability
CREATE INDEX IF NOT EXISTS idx_cafe_available ON cafe_slots(name) WHERE name IS NULL;

-- ================================================
-- 4. RANGEMENT (CLEANUP) TABLE
-- ================================================
-- Unlimited spots (we'll start with 10 and can add more)

CREATE TABLE IF NOT EXISTS rangement_slots (
  id SERIAL PRIMARY KEY,
  spot_index INTEGER NOT NULL,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(spot_index)
);

-- Insert 10 initial empty spots (can be expanded)
INSERT INTO rangement_slots (spot_index)
VALUES (0), (1), (2), (3), (4), (5), (6), (7), (8), (9)
ON CONFLICT (spot_index) DO NOTHING;

-- Index for checking availability
CREATE INDEX IF NOT EXISTS idx_rangement_available ON rangement_slots(name) WHERE name IS NULL;

-- ================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ================================================
-- Allow public read access, write through serverless functions

ALTER TABLE voiturier_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE accueil_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE cafe_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE rangement_slots ENABLE ROW LEVEL SECURITY;

-- Read policy for all tables (public can read)
CREATE POLICY "Allow public read access" ON voiturier_slots FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON accueil_slots FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON cafe_slots FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON rangement_slots FOR SELECT USING (true);

-- Write policy (allow all for now, should be restricted in production)
CREATE POLICY "Allow public write access" ON voiturier_slots FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON accueil_slots FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON cafe_slots FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON rangement_slots FOR ALL USING (true);

-- ================================================
-- VERIFY TABLES WERE CREATED
-- ================================================
SELECT
  table_name,
  (SELECT COUNT(*) FROM voiturier_slots) as voiturier_count,
  (SELECT COUNT(*) FROM accueil_slots) as accueil_count,
  (SELECT COUNT(*) FROM cafe_slots) as cafe_count,
  (SELECT COUNT(*) FROM rangement_slots) as rangement_count
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('voiturier_slots', 'accueil_slots', 'cafe_slots', 'rangement_slots')
LIMIT 1;
