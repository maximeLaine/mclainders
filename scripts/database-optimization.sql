-- ================================================
-- McLainders Database Optimization Script
-- ================================================
-- This script creates indexes to improve query performance
-- Run this in your Supabase SQL Editor
-- Execution time: < 1 second
-- Expected performance improvement: 10-100x faster queries

-- ================================================
-- 1. ACCOMMODATIONS TABLE
-- ================================================
-- Index for filtering by accommodation type (Gîte, Airbnb, etc.)
CREATE INDEX IF NOT EXISTS idx_accommodations_type ON accommodations(type);

-- ================================================
-- 2. ATTRACTIONS TABLE
-- ================================================
-- Index for filtering attractions by category
CREATE INDEX IF NOT EXISTS idx_attractions_category ON attractions(category);

-- ================================================
-- 3. DJ SPOTS TABLE
-- ================================================
-- Composite index for time_slot + spot_index (used together in WHERE clauses)
CREATE INDEX IF NOT EXISTS idx_dj_spots_time_spot ON dj_spots(time_slot, spot_index);

-- Partial index for checking availability (spots without names)
CREATE INDEX IF NOT EXISTS idx_dj_spots_available ON dj_spots(name) WHERE name IS NULL;

-- ================================================
-- 4. BRUNCH COOKING SLOTS TABLE
-- ================================================
-- Composite index for time_slot + spot_index
CREATE INDEX IF NOT EXISTS idx_brunch_slots_time_spot ON brunch_cooking_slots(time_slot, spot_index);

-- Partial index for available slots
CREATE INDEX IF NOT EXISTS idx_brunch_slots_available ON brunch_cooking_slots(name) WHERE name IS NULL;

-- ================================================
-- 5. RSVP TABLE (Optional but Recommended)
-- ================================================
-- Index for finding RSVPs by email (useful for duplicate checking)
CREATE INDEX IF NOT EXISTS idx_rsvp_email ON rsvp(email);

-- Index for filtering by attendance status
CREATE INDEX IF NOT EXISTS idx_rsvp_attendance ON rsvp(attendance);

-- Index for chronological sorting
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp(created_at DESC);

-- ================================================
-- VERIFY INDEXES WERE CREATED
-- ================================================
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND indexname LIKE 'idx_%'
ORDER BY tablename, indexname;