-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core programmes table
CREATE TABLE IF NOT EXISTS mcc_programmes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    code TEXT,
    category TEXT NOT NULL CHECK (category IN ('UG', 'PG', 'PhD')),
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Overview
CREATE TABLE IF NOT EXISTS program_overview (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE UNIQUE,
    department TEXT,
    degree TEXT,
    description TEXT,
    long_description TEXT,
    banner_image TEXT,
    hero_image TEXT,
    brochure_pdf TEXT,
    apply_now_url TEXT
);

-- Snapshot
CREATE TABLE IF NOT EXISTS program_snapshot (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE UNIQUE,
    duration TEXT,
    semesters INTEGER,
    timing TEXT,
    intake INTEGER,
    mode TEXT DEFAULT 'Full Time',
    campus TEXT DEFAULT 'Main Campus'
);

-- Highlights (Many-to-one)
CREATE TABLE IF NOT EXISTS program_highlights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    highlight TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- Details (Objectives, Outcomes, Skills, Why Choose)
CREATE TABLE IF NOT EXISTS program_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    detail_type TEXT NOT NULL CHECK (detail_type IN ('Objective', 'Outcome', 'Skill', 'WhyChoose')),
    content TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- Eligibility
CREATE TABLE IF NOT EXISTS program_eligibility (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE UNIQUE,
    description TEXT,
    minimum_percentage TEXT,
    required_subjects TEXT,
    reservation_notes TEXT,
    admission_criteria TEXT
);

-- Documents Required
CREATE TABLE IF NOT EXISTS program_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    is_mandatory BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0
);

-- Curriculum - Semesters
CREATE TABLE IF NOT EXISTS program_semesters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    semester_number INTEGER NOT NULL,
    syllabus_pdf TEXT,
    UNIQUE(programme_id, semester_number)
);

-- Curriculum - Subjects
CREATE TABLE IF NOT EXISTS program_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    semester_id UUID REFERENCES program_semesters(id) ON DELETE CASCADE,
    subject_name TEXT NOT NULL,
    credits INTEGER,
    is_elective BOOLEAN DEFAULT false,
    has_lab BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0
);

-- Careers
CREATE TABLE IF NOT EXISTS program_careers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    career_title TEXT NOT NULL,
    description TEXT,
    average_salary TEXT,
    higher_education_options TEXT,
    display_order INTEGER DEFAULT 0
);

-- Recruiters
CREATE TABLE IF NOT EXISTS program_recruiters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    recruiter_name TEXT NOT NULL,
    logo_url TEXT,
    display_order INTEGER DEFAULT 0
);

-- Admission Process
CREATE TABLE IF NOT EXISTS program_admission_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    display_order INTEGER DEFAULT 0
);

-- FAQ
CREATE TABLE IF NOT EXISTS program_faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- SEO
CREATE TABLE IF NOT EXISTS program_seo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE UNIQUE,
    meta_title TEXT,
    meta_description TEXT,
    keywords TEXT,
    open_graph_image TEXT,
    canonical_url TEXT
);

-- Gallery
CREATE TABLE IF NOT EXISTS program_gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type TEXT NOT NULL CHECK (media_type IN ('Image', 'Video', 'PDF', 'Brochure')),
    caption TEXT,
    display_order INTEGER DEFAULT 0
);

-- Disable Row Level Security (RLS) to allow client-side inserts/updates
-- since the Super Admin auth is handled via application state, not Supabase Auth.
ALTER TABLE mcc_programmes DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_overview DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_snapshot DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_highlights DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_details DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_eligibility DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_semesters DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_subjects DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_careers DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_recruiters DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_admission_steps DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_seo DISABLE ROW LEVEL SECURITY;
ALTER TABLE program_gallery DISABLE ROW LEVEL SECURITY;

-- ─── NEW TABLES ───────────────────────────────────────────────────

-- Faculty
CREATE TABLE IF NOT EXISTS program_faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    sr_no INTEGER,
    name TEXT NOT NULL,
    designation TEXT,
    additional_role TEXT,
    department TEXT,
    education TEXT,
    teaching_exp TEXT,
    email TEXT,
    image TEXT,
    display_order INTEGER DEFAULT 0
);
ALTER TABLE program_faculty DISABLE ROW LEVEL SECURITY;

-- Illustrious Alumni
CREATE TABLE IF NOT EXISTS program_alumni (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    programme_name TEXT,
    year TEXT,
    designation TEXT,
    organisation TEXT,
    about TEXT,
    linkedin TEXT,
    image TEXT,
    initials TEXT,
    display_order INTEGER DEFAULT 0
);
ALTER TABLE program_alumni DISABLE ROW LEVEL SECURITY;

-- Industrial Visits
CREATE TABLE IF NOT EXISTS program_industrial_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    visit_date TEXT,
    description TEXT,
    image TEXT,
    display_order INTEGER DEFAULT 0
);
ALTER TABLE program_industrial_visits DISABLE ROW LEVEL SECURITY;

