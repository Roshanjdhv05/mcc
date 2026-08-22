# Full Database Schema & Seed Structure for Programmes

This document contains the complete database schema for the Programmes Editor and the structure of how data is seeded for Post Graduate programmes.

## Why changes in the Admin Page don't reflect on the Main Page

Currently, the frontend pages (e.g., `MComBFPageClient.tsx`) have their content **hardcoded** directly into the `PGCourseTemplate` component. 

```tsx
// Current Hardcoded Approach in the Frontend
<PGCourseTemplate
  title="M.Com (Banking & Finance)"
  fundingType="Self Financing"
  seats="60"
  timing="05:30 PM – 08:30 PM"
  // ...
/>
```

When you make changes in the **Programmes Editor**, it correctly saves the updated data to your Supabase database tables (`mcc_programmes`, `program_overview`, etc.). However, because the frontend page is hardcoded, it doesn't automatically fetch the updated data from Supabase. 

**To fix this**, the frontend pages need to be refactored to fetch their data from Supabase (e.g., using `supabase.from('mcc_programmes').select(...)`) and pass that dynamic data into the `PGCourseTemplate`.

---

## 1. Full Database Schema Structure

Here is the full table structure that the Programmes Editor relies on:

```sql
-- Core Programmes Table
CREATE TABLE mcc_programmes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    code TEXT,
    category TEXT NOT NULL CHECK (category IN ('UG', 'PG', 'PhD')),
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0
);

-- Overview Data (Title, Description, etc.)
CREATE TABLE program_overview (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE UNIQUE,
    department TEXT,
    description TEXT,
    long_description TEXT,
    title TEXT,
    funding_type TEXT,
    course_key TEXT,
    eligibility TEXT
);

-- Snapshot Data (Duration, Intake, Timing)
CREATE TABLE program_snapshot (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE UNIQUE,
    duration TEXT,
    semesters INTEGER,
    timing TEXT,
    intake INTEGER,
    mode TEXT DEFAULT 'Full Time',
    campus TEXT DEFAULT 'Main Campus'
);

-- Curriculum (Semesters)
CREATE TABLE program_semesters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    semester_number INTEGER NOT NULL,
    syllabus_pdf TEXT,
    UNIQUE(programme_id, semester_number)
);

-- Curriculum (Subjects under a Semester)
CREATE TABLE program_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    semester_id UUID REFERENCES program_semesters(id) ON DELETE CASCADE,
    subject_name TEXT NOT NULL,
    credits INTEGER,
    is_elective BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0
);
```

*(There are also tables for `program_faculty`, `program_faqs`, `program_gallery`, `program_alumni`, etc., following the same pattern).*

---

## 2. Complete PG Seed Structure

If you need to seed all Post Graduate programmes from scratch, you can run this complete SQL seed in Supabase:

```sql
-- 1. Insert Base Programmes
INSERT INTO mcc_programmes (slug, name, category, status, display_order)
VALUES 
    ('mcom-aa', 'Master of Commerce (Advanced Accountancy)', 'PG', 'Active', 12),
    ('mcom-bm', 'Master of Commerce (Business Management)', 'PG', 'Active', 13),
    ('mcom-bf', 'Master of Commerce (Banking & Finance)', 'PG', 'Active', 14),
    ('msf', 'Master of Science in Finance', 'PG', 'Active', 15),
    ('msc-it', 'Master of Science (Information Technology)', 'PG', 'Active', 16)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Overview & Snapshot Data for MCOM-AA
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'mcom-aa';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, title, funding_type, course_key)
        VALUES (prog_id, 'Advanced studies in accountancy, taxation, and auditing, preparing students for high-level roles in finance and accounting.', 'Master of Commerce (Advanced Accountancy)', 'Self Financing', 'MCOM_AA')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, title = EXCLUDED.title;

        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '2 Years', '05:30 PM – 08:30 PM', 80)
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake;
    END IF;
END $$;

-- 3. Insert Overview & Snapshot Data for MCOM-BM
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'mcom-bm';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, title, funding_type, course_key)
        VALUES (prog_id, 'Focuses on strategic management, organizational behavior, and leadership skills for future business leaders and entrepreneurs.', 'Master of Commerce (Business Management)', 'Self Financing', 'MCOM_BM')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, title = EXCLUDED.title;

        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '2 Years', '05:30 PM – 08:30 PM', 60)
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake;
    END IF;
END $$;

-- 4. Insert Overview & Snapshot Data for MCOM-BF
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'mcom-bf';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, title, funding_type, course_key)
        VALUES (prog_id, 'Specialized postgraduate programme covering advanced concepts in banking, financial markets, and investment management.', 'Master of Commerce (Banking & Finance)', 'Self Financing', 'MCOM_BF')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, title = EXCLUDED.title;

        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '2 Years', '05:30 PM – 08:30 PM', 60)
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake;
    END IF;
END $$;

-- 5. Insert Overview & Snapshot Data for MSF
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'msf';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, title, funding_type, course_key)
        VALUES (prog_id, 'An advanced programme offering deep insights into financial analytics, corporate finance, and global financial systems.', 'Master of Science in Finance', 'Self Financing', 'MSF')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, title = EXCLUDED.title;

        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '2 Years', '', 60)
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake;
    END IF;
END $$;

-- 6. Insert Overview & Snapshot Data for MSC-IT
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'msc-it';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, title, funding_type, course_key)
        VALUES (prog_id, 'Advanced studies in software development, data science, networking, and modern IT infrastructure to build tech experts.', 'Master of Science (Information Technology)', 'Self Financing', 'MSC_IT')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, title = EXCLUDED.title;

        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '2 Years', '', 60)
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake;
    END IF;
END $$;
```
