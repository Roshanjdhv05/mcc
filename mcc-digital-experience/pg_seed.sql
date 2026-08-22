-- ══════════════════════════════════════════════════════════════════════════════
-- SEED: PG Programmes — Overview, Snapshot
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════════════════════

-- First, ensure the base programmes exist in mcc_programmes if they don't already
INSERT INTO mcc_programmes (slug, name, category, status)
VALUES 
    ('mcom-aa', 'Master of Commerce (Advanced Accountancy)', 'PG', 'Active'),
    ('mcom-bm', 'Master of Commerce (Business Management)', 'PG', 'Active'),
    ('mcom-bf', 'Master of Commerce (Banking & Finance)', 'PG', 'Active'),
    ('msf', 'Master of Science in Finance', 'PG', 'Active'),
    ('msc-it', 'Master of Science (Information Technology)', 'PG', 'Active')
ON CONFLICT (slug) DO NOTHING;

-- ──────────────── MCOM-AA ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'mcom-aa';
    IF prog_id IS NOT NULL THEN
        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, course_key, eligibility)
        VALUES (prog_id, 'Advanced studies in accountancy, taxation, and auditing, preparing students for high-level roles in finance and accounting.', '', 'Master of Commerce (Advanced Accountancy)', 'Self Financing', 'MCOM_AA', '')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            course_key     = EXCLUDED.course_key;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '2 Years', '05:30 PM – 08:30 PM', 80)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;
    END IF;
END $$;

-- ──────────────── MCOM-BM ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'mcom-bm';
    IF prog_id IS NOT NULL THEN
        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, course_key, eligibility)
        VALUES (prog_id, 'Focuses on strategic management, organizational behavior, and leadership skills for future business leaders and entrepreneurs.', '', 'Master of Commerce (Business Management)', 'Self Financing', 'MCOM_BM', '')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            course_key     = EXCLUDED.course_key;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '2 Years', '05:30 PM – 08:30 PM', 60)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;
    END IF;
END $$;

-- ──────────────── MCOM-BF ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'mcom-bf';
    IF prog_id IS NOT NULL THEN
        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, course_key, eligibility)
        VALUES (prog_id, 'Specialized postgraduate programme covering advanced concepts in banking, financial markets, and investment management.', '', 'Master of Commerce (Banking & Finance)', 'Self Financing', 'MCOM_BF', '')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            course_key     = EXCLUDED.course_key;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '2 Years', '05:30 PM – 08:30 PM', 60)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;
    END IF;
END $$;

-- ──────────────── MSF ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'msf';
    IF prog_id IS NOT NULL THEN
        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, course_key, eligibility)
        VALUES (prog_id, 'An advanced programme offering deep insights into financial analytics, corporate finance, and global financial systems.', '', 'Master of Science in Finance', 'Self Financing', 'MSF', '')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            course_key     = EXCLUDED.course_key;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '2 Years', '', 60)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;
    END IF;
END $$;

-- ──────────────── MSC-IT ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'msc-it';
    IF prog_id IS NOT NULL THEN
        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, course_key, eligibility)
        VALUES (prog_id, 'Advanced studies in software development, data science, networking, and modern IT infrastructure to build tech experts.', '', 'Master of Science (Information Technology)', 'Self Financing', 'MSC_IT', '')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            course_key     = EXCLUDED.course_key;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '2 Years', '', 60)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;
    END IF;
END $$;
