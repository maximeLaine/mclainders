-- =====================================================
-- Carpool Offers Table Setup
-- Run this in Supabase SQL Editor
-- =====================================================
-- GDPR Compliant: Email is stored but NOT exposed.
-- WhatsApp is optional and shown only if user agrees.
-- =====================================================

-- Drop existing table and view if they exist (for clean setup)
DROP VIEW IF EXISTS carpool_offers_public;
DROP TABLE IF EXISTS carpool_offers;

-- Create the carpool_offers table
CREATE TABLE carpool_offers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  show_whatsapp BOOLEAN DEFAULT false,
  departure_city TEXT NOT NULL,
  departure_day TEXT NOT NULL,
  departure_time TEXT NOT NULL,
  seats_available INTEGER NOT NULL DEFAULT 1,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE carpool_offers ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- GDPR-SAFE VIEW: Only expose non-sensitive data
-- =====================================================
-- Email is never exposed
-- WhatsApp is only shown if show_whatsapp is true
CREATE VIEW carpool_offers_public AS
SELECT
  id,
  name,
  departure_city,
  departure_day,
  departure_time,
  seats_available,
  comments,
  CASE WHEN show_whatsapp = true THEN whatsapp ELSE NULL END as whatsapp,
  created_at
FROM carpool_offers;

-- Grant access to the public view
GRANT SELECT ON carpool_offers_public TO anon;

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Allow insert (for form submissions)
CREATE POLICY "Allow public insert on carpool_offers"
  ON carpool_offers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Grant insert permission only (not select on main table)
GRANT INSERT ON carpool_offers TO anon;
GRANT USAGE ON SEQUENCE carpool_offers_id_seq TO anon;

-- =====================================================
-- Verification
-- =====================================================
-- After running this script, verify:
-- SELECT * FROM carpool_offers_public;
