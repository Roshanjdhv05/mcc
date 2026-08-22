-- ============================================================
--  MCC Statutory Bodies — Setup SQL
--  Run this in your Supabase SQL Editor
-- ============================================================

-- ──────────────────────────────────────────────────────────
--  1. CREATE TABLE
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.mcc_statutory_bodies (
  id                  uuid          DEFAULT gen_random_uuid() PRIMARY KEY,
  slug                text          NOT NULL UNIQUE,
  name                text          NOT NULL,
  title               text,                          -- page display title
  cell_type           text          NOT NULL DEFAULT 'Statutory Cell',
  status              text          NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  display_order       integer       NOT NULL DEFAULT 0,

  -- Rich content
  about               text,
  instagram_link      text,
  banner_image        text,

  -- JSONB arrays
  committee           jsonb         DEFAULT '[]'::jsonb,
  objectives          jsonb         DEFAULT '[]'::jsonb,
  important_documents jsonb         DEFAULT '[]'::jsonb,
  contact_us          jsonb         DEFAULT '[]'::jsonb,

  -- Timestamps
  created_at          timestamptz   DEFAULT now(),
  updated_at          timestamptz   DEFAULT now()
);

-- ──────────────────────────────────────────────────────────
--  2. ROW-LEVEL SECURITY
-- ──────────────────────────────────────────────────────────
ALTER TABLE public.mcc_statutory_bodies ENABLE ROW LEVEL SECURITY;

-- Allow public read (website visitors can view)
CREATE POLICY "Public read statutory bodies"
  ON public.mcc_statutory_bodies
  FOR SELECT USING (true);

-- Allow all writes (superadmin writes via anon key — tighten for production)
CREATE POLICY "Allow all writes statutory bodies"
  ON public.mcc_statutory_bodies
  FOR ALL USING (true) WITH CHECK (true);

-- ──────────────────────────────────────────────────────────
--  3. STORAGE — allow PDF + image uploads
--     (assumes bucket 'event-images' already exists)
-- ──────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read on the bucket objects
CREATE POLICY "Public read event-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-images');

-- Allow authenticated + anon uploads to statutory-bodies folder
CREATE POLICY "Allow uploads statutory-bodies"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'event-images'
    AND (name LIKE 'statutory-bodies/%'));

-- ──────────────────────────────────────────────────────────
--  4. SEED DATA — 7 Statutory Bodies
-- ──────────────────────────────────────────────────────────
INSERT INTO public.mcc_statutory_bodies
  (slug, name, title, cell_type, status, display_order, about, committee, objectives, important_documents, contact_us)
VALUES

-- 1. Grievance Cell
(
  'grievance-cell',
  'Grievance Cell',
  'Student Grievance Cell – MCC',
  'Statutory Cell',
  'Active',
  1,
  'The Grievance Cell at Mulund College of Commerce is established to provide a fair, transparent, and efficient mechanism for students to voice their grievances. The cell ensures that all complaints are addressed with impartiality and within a reasonable timeframe, maintaining the dignity of the complainant throughout the process.',
  '[
    {"name": "Dr. Priya Mehta",   "role": "Chairperson",  "phone": "9876543210", "email": "priya.mehta@mcc.edu"},
    {"name": "Prof. Rajan Desai", "role": "Member",       "phone": "9765432109", "email": "rajan.desai@mcc.edu"},
    {"name": "Ms. Sunita Patil",  "role": "Member Secretary","phone": "9654321098","email": "sunita.patil@mcc.edu"}
  ]'::jsonb,
  '[
    {"type": "point", "content": "To provide a formal channel for students to lodge academic and non-academic grievances."},
    {"type": "point", "content": "To ensure prompt and unbiased redressal of all student complaints."},
    {"type": "point", "content": "To maintain confidentiality of the complainant and all parties involved."},
    {"type": "point", "content": "To create a conducive and harmonious environment within the college campus."},
    {"type": "paragraph", "content": "The cell meets monthly to review pending grievances and takes necessary action in coordination with the college administration."}
  ]'::jsonb,
  '[
    {"title": "Grievance Redressal Policy 2024", "pdf_url": ""},
    {"title": "Grievance Submission Form",       "pdf_url": ""}
  ]'::jsonb,
  '[
    {"name": "Dr. Priya Mehta", "email": "grievance@mcc.edu", "phone": "9876543210"}
  ]'::jsonb
),

-- 2. Internal Complaint Committee
(
  'internal-complaint-committee',
  'Internal Complaint Committee',
  'Internal Complaint Committee (ICC) – MCC',
  'Statutory Committee',
  'Active',
  2,
  'The Internal Complaint Committee (ICC) at MCC is constituted as per the Sexual Harassment of Women at Workplace (Prevention, Prohibition, and Redressal) Act, 2013. The ICC ensures a safe, respectful, and dignified environment for all female staff and students on campus.',
  '[
    {"name": "Dr. Anjali Sharma",  "role": "Presiding Officer", "phone": "9123456789", "email": "anjali.sharma@mcc.edu"},
    {"name": "Prof. Meena Kulkarni","role": "Member",            "phone": "9234567890", "email": "meena.kulkarni@mcc.edu"},
    {"name": "Mr. Vikram Joshi",   "role": "Member (NGO Nominee)","phone": "9345678901","email": "vikram.ngo@example.com"}
  ]'::jsonb,
  '[
    {"type": "point", "content": "To receive and inquire into complaints of sexual harassment at the workplace/campus."},
    {"type": "point", "content": "To ensure compliance with the POSH Act, 2013."},
    {"type": "point", "content": "To conduct awareness programs and sensitization workshops for students and staff."},
    {"type": "point", "content": "To recommend appropriate action to the management based on inquiry findings."},
    {"type": "paragraph", "content": "All complaints are treated with strict confidentiality. The ICC follows a time-bound inquiry process of 90 days as mandated by law."}
  ]'::jsonb,
  '[
    {"title": "POSH Act 2013 – Key Provisions", "pdf_url": ""},
    {"title": "ICC Annual Report 2023–24",       "pdf_url": ""},
    {"title": "Complaint Filing Procedure",      "pdf_url": ""}
  ]'::jsonb,
  '[
    {"name": "Dr. Anjali Sharma", "email": "icc@mcc.edu", "phone": "9123456789"}
  ]'::jsonb
),

-- 3. Anti-Ragging Committee
(
  'anti-ragging-committee',
  'Anti-Ragging Committee',
  'Anti-Ragging Committee – MCC',
  'Statutory Committee',
  'Active',
  3,
  'The Anti-Ragging Committee at Mulund College of Commerce is constituted as per UGC regulations to prevent and eliminate ragging in all its forms. The college maintains a strict zero-tolerance policy towards ragging and ensures the safety and well-being of all students, especially freshers.',
  '[
    {"name": "Dr. Sanjay Patil",   "role": "Chairperson",    "phone": "9456789012", "email": "sanjay.patil@mcc.edu"},
    {"name": "Mr. Aakash Verma",   "role": "Nodal Officer",  "phone": "9567890123", "email": "aakash.verma@mcc.edu"},
    {"name": "Ms. Rekha Nair",     "role": "Member",         "phone": "9678901234", "email": "rekha.nair@mcc.edu"},
    {"name": "Mr. Ravi Gaikwad",   "role": "Student Representative","phone": "9789012345","email": "ravi.student@mcc.edu"}
  ]'::jsonb,
  '[
    {"type": "point", "content": "To create awareness among students about the harmful effects of ragging."},
    {"type": "point", "content": "To take immediate cognizance of ragging complaints and initiate disciplinary action."},
    {"type": "point", "content": "To establish a helpline and complaint box for anonymous reporting."},
    {"type": "point", "content": "To conduct orientation programs for fresh admissions on anti-ragging measures."},
    {"type": "paragraph", "content": "The college has registered on the National Anti-Ragging Helpline portal (1800-180-5522). All new students must fill and submit the anti-ragging undertaking form."}
  ]'::jsonb,
  '[
    {"title": "UGC Anti-Ragging Regulations 2009", "pdf_url": ""},
    {"title": "Anti-Ragging Undertaking Form",     "pdf_url": ""},
    {"title": "Punishment & Disciplinary Norms",   "pdf_url": ""}
  ]'::jsonb,
  '[
    {"name": "Dr. Sanjay Patil",    "email": "antiragging@mcc.edu", "phone": "9456789012"},
    {"name": "National Helpline",   "email": "",                     "phone": "1800-180-5522"}
  ]'::jsonb
),

-- 4. Counselling Cell
(
  'counselling-cell',
  'Counselling Cell',
  'Student Counselling Cell – MCC',
  'Support Cell',
  'Active',
  4,
  'The Counselling Cell at MCC provides professional and empathetic support to students facing academic stress, personal challenges, career dilemmas, or mental health concerns. Trained counsellors offer confidential one-on-one sessions, group workshops, and peer support programs to foster holistic student development.',
  '[
    {"name": "Ms. Kavya Iyer",     "role": "Lead Counsellor",    "phone": "9890123456", "email": "kavya.iyer@mcc.edu"},
    {"name": "Dr. Rohan Bhatt",    "role": "Psychologist (Visiting)","phone": "9901234567","email": "rohan.bhatt@mcc.edu"}
  ]'::jsonb,
  '[
    {"type": "point", "content": "To provide free, confidential counselling sessions to all enrolled students."},
    {"type": "point", "content": "To address academic anxiety, examination stress, and peer relationship issues."},
    {"type": "point", "content": "To promote mental health awareness through workshops and seminars."},
    {"type": "point", "content": "To identify students in distress and refer them to appropriate support services."},
    {"type": "paragraph", "content": "Counselling sessions are available by prior appointment (Monday–Friday, 10 AM–4 PM). All interactions are strictly confidential."}
  ]'::jsonb,
  '[
    {"title": "Mental Health Awareness Guide", "pdf_url": ""},
    {"title": "Counselling Session Request Form", "pdf_url": ""}
  ]'::jsonb,
  '[
    {"name": "Ms. Kavya Iyer", "email": "counselling@mcc.edu", "phone": "9890123456"}
  ]'::jsonb
),

-- 5. Career Katta (Govt of Maharashtra)
(
  'career-katta',
  'Career Katta (Govt of Maharashtra)',
  'Career Katta – Government of Maharashtra Initiative at MCC',
  'Govt. Initiative',
  'Active',
  5,
  'Career Katta is a flagship initiative by the Government of Maharashtra designed to bridge the gap between students and career opportunities. At MCC, this initiative provides students with access to career guidance, skill development workshops, industry interactions, government job information, and competitive examination coaching.',
  '[
    {"name": "Prof. Nilesh Shinde", "role": "Coordinator",     "phone": "9012345678", "email": "nilesh.shinde@mcc.edu"},
    {"name": "Ms. Pallavi Chopra",  "role": "Co-coordinator",  "phone": "9123450987", "email": "pallavi.chopra@mcc.edu"}
  ]'::jsonb,
  '[
    {"type": "point", "content": "To provide career counselling and guidance to students at the UG and PG level."},
    {"type": "point", "content": "To organize industry interactions, guest lectures, and job fairs."},
    {"type": "point", "content": "To disseminate information about government schemes, scholarships, and employment opportunities."},
    {"type": "point", "content": "To prepare students for competitive examinations like UPSC, MPSC, and banking exams."},
    {"type": "paragraph", "content": "Career Katta sessions are held monthly and are open to all students. Special sessions are organized before placement drives and higher education application deadlines."}
  ]'::jsonb,
  '[
    {"title": "Career Katta Brochure 2024",         "pdf_url": ""},
    {"title": "Government Scholarship Schemes List", "pdf_url": ""},
    {"title": "Competitive Exam Preparation Guide",  "pdf_url": ""}
  ]'::jsonb,
  '[
    {"name": "Prof. Nilesh Shinde", "email": "careerkatta@mcc.edu", "phone": "9012345678"}
  ]'::jsonb
),

-- 6. Special Cell
(
  'special-cell',
  'Special Cell',
  'Special Cell (SC / ST / OBC / Minorities) – MCC',
  'Welfare Cell',
  'Active',
  6,
  'The Special Cell at MCC is dedicated to the welfare of students from Scheduled Castes, Scheduled Tribes, Other Backward Classes, Economically Weaker Sections, and Minority communities. The cell works to ensure equal educational opportunities and assists students in availing government schemes, scholarships, and reserved benefits.',
  '[
    {"name": "Dr. Baburao Kamble",  "role": "Chairperson",        "phone": "9234561234", "email": "baburao.kamble@mcc.edu"},
    {"name": "Ms. Sushma Salve",    "role": "Member",             "phone": "9345672345", "email": "sushma.salve@mcc.edu"},
    {"name": "Mr. Rajesh Jadhav",   "role": "Student Coordinator","phone": "9456783456", "email": "rajesh.student@mcc.edu"}
  ]'::jsonb,
  '[
    {"type": "point", "content": "To assist SC/ST/OBC/Minority students in accessing government scholarships and fee concessions."},
    {"type": "point", "content": "To conduct remedial coaching and extra academic support for students from disadvantaged communities."},
    {"type": "point", "content": "To address discrimination complaints and ensure a supportive campus environment."},
    {"type": "point", "content": "To organize orientation programs highlighting rights and entitlements of students."},
    {"type": "paragraph", "content": "The Special Cell maintains a register of all SC/ST/OBC/Minority students and tracks their academic progress throughout the year."}
  ]'::jsonb,
  '[
    {"title": "SC/ST Scholarship Application Guide",   "pdf_url": ""},
    {"title": "OBC Non-Creamy Layer Certificate Info", "pdf_url": ""},
    {"title": "Minority Scholarship Schemes 2024–25",  "pdf_url": ""}
  ]'::jsonb,
  '[
    {"name": "Dr. Baburao Kamble", "email": "specialcell@mcc.edu", "phone": "9234561234"}
  ]'::jsonb
),

-- 7. Remedial Coaching Cell
(
  'remedial-coaching-cell',
  'Remedial Coaching Cell',
  'Remedial Coaching Cell – MCC',
  'Academic Support Cell',
  'Active',
  7,
  'The Remedial Coaching Cell at MCC provides additional academic support to students who are struggling with their coursework. The cell identifies weak students through internal assessments and provides focused coaching sessions, doubt-clearing classes, and study material to help them improve their academic performance.',
  '[
    {"name": "Prof. Geeta Shetty",  "role": "Coordinator",    "phone": "9567894567", "email": "geeta.shetty@mcc.edu"},
    {"name": "Mr. Suresh Rane",     "role": "Co-coordinator", "phone": "9678905678", "email": "suresh.rane@mcc.edu"}
  ]'::jsonb,
  '[
    {"type": "point", "content": "To identify academically weak students through regular assessments and faculty feedback."},
    {"type": "point", "content": "To conduct extra coaching classes and doubt-clearing sessions for identified students."},
    {"type": "point", "content": "To provide study materials, notes, and practice papers tailored to students'' needs."},
    {"type": "point", "content": "To track and monitor the academic progress of students enrolled in the program."},
    {"type": "paragraph", "content": "Remedial classes are scheduled after regular college hours and on weekends. Attendance is mandatory for students identified for remedial coaching by the principal''s office."}
  ]'::jsonb,
  '[
    {"title": "Remedial Coaching Schedule 2024–25",     "pdf_url": ""},
    {"title": "Study Material – Foundation Commerce",   "pdf_url": ""}
  ]'::jsonb,
  '[
    {"name": "Prof. Geeta Shetty", "email": "remedial@mcc.edu", "phone": "9567894567"}
  ]'::jsonb
);

-- ──────────────────────────────────────────────────────────
--  5. VERIFY — should return 7 rows
-- ──────────────────────────────────────────────────────────
SELECT id, slug, name, cell_type, status, display_order
FROM public.mcc_statutory_bodies
ORDER BY display_order;
