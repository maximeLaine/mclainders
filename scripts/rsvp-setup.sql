-- ================================================
-- McLainders RSVP Table Setup Script
-- ================================================
-- This script creates/recreates the RSVP table
-- Run this in your Supabase SQL Editor
-- ================================================

-- Drop existing table if it exists (CAREFUL: this will delete all existing data!)
DROP TABLE IF EXISTS rsvp;

-- ================================================
-- CREATE RSVP TABLE
-- ================================================
CREATE TABLE rsvp (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  presence_saturday BOOLEAN NOT NULL DEFAULT false,
  presence_sunday BOOLEAN NOT NULL DEFAULT false,
  with_children BOOLEAN NOT NULL DEFAULT false,
  children_count INTEGER DEFAULT 0,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- CREATE INDEXES
-- ================================================
-- Index for email lookups (to check for duplicate submissions)
CREATE INDEX idx_rsvp_email ON rsvp(email);

-- Index for filtering by presence
CREATE INDEX idx_rsvp_saturday ON rsvp(presence_saturday);
CREATE INDEX idx_rsvp_sunday ON rsvp(presence_sunday);

-- ================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ================================================
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for form submissions)
CREATE POLICY "Allow public insert" ON rsvp FOR INSERT WITH CHECK (true);

-- Allow public read (optional - remove if you want to restrict access)
CREATE POLICY "Allow public read" ON rsvp FOR SELECT USING (true);

-- ================================================
-- USEFUL QUERIES FOR STATISTICS
-- ================================================

-- Count total responses
-- SELECT COUNT(*) as total_responses FROM rsvp;

-- Count people coming Saturday
-- SELECT COUNT(*) as saturday_count FROM rsvp WHERE presence_saturday = true;

-- Count people coming Sunday
-- SELECT COUNT(*) as sunday_count FROM rsvp WHERE presence_sunday = true;

-- Count total children
-- SELECT SUM(children_count) as total_children FROM rsvp WHERE with_children = true;

-- Full summary
-- SELECT
--   COUNT(*) as total_responses,
--   COUNT(*) FILTER (WHERE presence_saturday = true) as saturday_yes,
--   COUNT(*) FILTER (WHERE presence_sunday = true) as sunday_yes,
--   COUNT(*) FILTER (WHERE with_children = true) as with_children,
--   COALESCE(SUM(children_count), 0) as total_children
-- FROM rsvp;

-- ================================================
-- VERIFY TABLE WAS CREATED
-- ================================================
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'rsvp'
ORDER BY ordinal_position;
