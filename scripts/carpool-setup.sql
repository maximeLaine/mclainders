-- =====================================================
-- Carpool Offers Table Setup
-- Run this in Supabase SQL Editor
-- =====================================================
-- GDPR Compliant: Email and phone are stored but NOT
-- exposed via public API. Contact goes through your email.
-- =====================================================

-- Create the carpool_offers table
CREATE TABLE IF NOT EXISTS carpool_offers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  departure_city TEXT NOT NULL,
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
-- This view hides email and phone from public access
CREATE OR REPLACE VIEW carpool_offers_public AS
SELECT
  id,
  name,
  departure_city,
  departure_time,
  seats_available,
  comments,
  created_at
FROM carpool_offers;

-- Grant access to the public view
GRANT SELECT ON carpool_offers_public TO anon;

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- NO public read access on the main table (use view instead)
-- This prevents exposure of email/phone

-- Allow insert (for form submissions via serverless function)
CREATE POLICY "Allow public insert on carpool_offers"
  ON carpool_offers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Grant insert permission only (not select on main table)
GRANT INSERT ON carpool_offers TO anon;
GRANT USAGE ON SEQUENCE carpool_offers_id_seq TO anon;

-- =====================================================
-- IMPORTANT: Update your frontend hook
-- =====================================================
-- Change useSupabaseData call from:
--   useSupabaseData('carpool_offers', ...)
-- To:
--   useSupabaseData('carpool_offers_public', ...)
-- =====================================================

-- Verification
-- After running this script, verify:
-- SELECT * FROM carpool_offers_public; -- Should work (no email/phone)
-- SELECT * FROM carpool_offers;         -- Should fail for anon users
