-- ============================================================
-- Jr College Notices — Full Setup Migration
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Create table if it doesn't already exist
CREATE TABLE IF NOT EXISTS jr_college_notices (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title               TEXT NOT NULL,
  description         TEXT,
  category            TEXT NOT NULL DEFAULT 'Sports',
  show_on_home        BOOLEAN NOT NULL DEFAULT TRUE,
  show_on_notice_page BOOLEAN NOT NULL DEFAULT TRUE,
  attachments         JSONB NOT NULL DEFAULT '[]',
  schedule_time       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expiry_time         TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. If the table already exists, add the missing columns
ALTER TABLE jr_college_notices
  ADD COLUMN IF NOT EXISTS schedule_time TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE jr_college_notices
  ADD COLUMN IF NOT EXISTS expiry_time TIMESTAMPTZ;

-- 3. IMPORTANT: Disable RLS so the superadmin portal (anon key) can insert/update/delete
--    This matches the pattern used by all other tables in this project.
ALTER TABLE jr_college_notices DISABLE ROW LEVEL SECURITY;

-- 4. Also ensure jr_college_events has RLS disabled (for gallery uploads)
ALTER TABLE jr_college_events DISABLE ROW LEVEL SECURITY;
