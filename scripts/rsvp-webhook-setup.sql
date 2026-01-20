-- =====================================================
-- RSVP Webhook Setup for Supabase
-- =====================================================
-- This creates a database webhook that calls your Netlify
-- function whenever a new RSVP is inserted.
-- =====================================================

-- IMPORTANT: Supabase Database Webhooks are configured via the Dashboard
-- Go to: Database > Webhooks > Create a new webhook

-- Configuration:
-- 1. Name: rsvp_notification
-- 2. Table: rsvp
-- 3. Events: INSERT (only)
-- 4. Type: HTTP Request
-- 5. Method: POST
-- 6. URL: https://mclainders.netlify.app/.netlify/functions/rsvpWebhook
-- 7. Headers:
--    Content-Type: application/json
-- 8. Timeout: 5000ms

-- =====================================================
-- Alternative: Using pg_net extension (if webhooks not available)
-- =====================================================

-- Enable pg_net extension (required for HTTP calls from database)
-- CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to call webhook
-- CREATE OR REPLACE FUNCTION notify_rsvp_webhook()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   PERFORM net.http_post(
--     url := 'https://mclainders.netlify.app/.netlify/functions/rsvpWebhook',
--     headers := '{"Content-Type": "application/json"}'::jsonb,
--     body := json_build_object(
--       'type', 'INSERT',
--       'table', 'rsvp',
--       'record', row_to_json(NEW),
--       'schema', 'public'
--     )::jsonb
--   );
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
-- CREATE TRIGGER on_rsvp_insert
--   AFTER INSERT ON rsvp
--   FOR EACH ROW
--   EXECUTE FUNCTION notify_rsvp_webhook();

-- =====================================================
-- Verification
-- =====================================================
-- After setup, test by inserting a test RSVP:
-- INSERT INTO rsvp (first_name, last_name, email, attendance)
-- VALUES ('Test', 'User', 'your-email@example.com', 'yes');
