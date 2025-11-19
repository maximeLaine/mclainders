-- ================================================
-- McLainders Analytics Setup Script
-- ================================================
-- This script creates tables and functions for tracking custom events
-- Run this in your Supabase SQL Editor

-- ================================================
-- 1. CREATE ANALYTICS EVENTS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  properties JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- 2. CREATE INDEXES FOR ANALYTICS
-- ================================================
-- Index for querying by event name
CREATE INDEX IF NOT EXISTS idx_analytics_event_name ON analytics_events(event_name);

-- Index for time-based queries
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics_events(timestamp DESC);

-- Index for searching within properties (GIN index for JSONB)
CREATE INDEX IF NOT EXISTS idx_analytics_properties ON analytics_events USING GIN (properties);

-- ================================================
-- 3. ROW LEVEL SECURITY POLICIES
-- ================================================
-- Enable RLS on analytics_events
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow service role and anon to insert events
CREATE POLICY "Allow insert for authenticated users" ON analytics_events
  FOR INSERT
  WITH CHECK (true);

-- Only allow service role to read analytics
CREATE POLICY "Service role can read all" ON analytics_events
  FOR SELECT
  USING (auth.role() = 'service_role');

-- ================================================
-- 4. USEFUL ANALYTICS QUERIES
-- ================================================

-- View to get event counts by type
CREATE OR REPLACE VIEW event_summary AS
SELECT
  event_name,
  COUNT(*) as count,
  MIN(timestamp) as first_seen,
  MAX(timestamp) as last_seen
FROM analytics_events
GROUP BY event_name
ORDER BY count DESC;

-- View to get daily event counts
CREATE OR REPLACE VIEW daily_events AS
SELECT
  DATE(timestamp) as date,
  event_name,
  COUNT(*) as count
FROM analytics_events
GROUP BY DATE(timestamp), event_name
ORDER BY date DESC, count DESC;

-- ================================================
-- 5. GRANT PERMISSIONS
-- ================================================
GRANT SELECT ON event_summary TO anon, authenticated;
GRANT SELECT ON daily_events TO anon, authenticated;

-- ================================================
-- VERIFY TABLE WAS CREATED
-- ================================================
SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'analytics_events'
ORDER BY ordinal_position;