-- ============================================================
-- Sub-Admin Access Provider Table
-- Run this in your Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS mcc_subadmins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    allowed_tabs TEXT[] NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    last_active_tab TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- If the table already exists, run these two lines to add the columns:
-- ALTER TABLE mcc_subadmins ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE;
-- ALTER TABLE mcc_subadmins ADD COLUMN IF NOT EXISTS last_active_tab TEXT;

-- Auto-update updated_at on changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mcc_subadmins_updated_at
    BEFORE UPDATE ON mcc_subadmins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE mcc_subadmins ENABLE ROW LEVEL SECURITY;

-- Allow full public access (matches existing pattern of other tables)
CREATE POLICY "Public full access" ON mcc_subadmins
    FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- Example: Insert a sample sub-admin (optional, remove comment to run)
-- ============================================================
-- INSERT INTO mcc_subadmins (name, username, password, allowed_tabs)
-- VALUES ('Roshan', 'roshanjdhv114@gmail.com', 'roshan114', ARRAY['notice', 'home-events']);
