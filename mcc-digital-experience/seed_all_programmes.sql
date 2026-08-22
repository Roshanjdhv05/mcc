-- ══════════════════════════════════════════════════════════════════════════════
-- MASTER SEED: All MCC Programmes — Overview, Snapshot, Faculty, Meta
-- Run this ONCE in Supabase SQL Editor to pre-populate all admin fields
-- ══════════════════════════════════════════════════════════════════════════════

-- Recreate program_overview correctly linked to mcc_programmes
DROP TABLE IF EXISTS program_overview CASCADE;
CREATE TABLE program_overview (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE UNIQUE,
    department TEXT,
    degree TEXT,
    description TEXT,
    long_description TEXT,
    banner_image TEXT,
    hero_image TEXT,
    brochure_pdf TEXT,
    apply_now_url TEXT,
    title TEXT,
    funding_type TEXT,
    festivals TEXT,
    publication TEXT,
    course_key TEXT,
    eligibility TEXT
);
ALTER TABLE program_overview DISABLE ROW LEVEL SECURITY;

-- Recreate program_snapshot correctly linked to mcc_programmes
DROP TABLE IF EXISTS program_snapshot CASCADE;
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
ALTER TABLE program_snapshot DISABLE ROW LEVEL SECURITY;

-- Recreate program_faculty correctly linked to mcc_programmes
DROP TABLE IF EXISTS program_faculty CASCADE;
CREATE TABLE program_faculty (
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


-- ──────────────── MCOM-AA ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'mcom-aa';
    IF prog_id IS NOT NULL THEN

        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, '', '', 'Master of Commerce (Advanced Accountancy)', 'Self Financing', '', '', '', '')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '', '', 0)
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
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, '', '', 'M.Com (Banking & Finance)', 'Self Financing', '', '', '', '')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '', '', 0)
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
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, '', '', 'M.Com (Business Management)', 'Self Financing', '', '', '', '')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '', '', 0)
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
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, '', '', 'M.Sc. (Information Technology)', 'Self Financing', '', '', '', 'B.Sc. IT / CS / BCA / B.E. IT / CS / Electronics & allied branches.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '2 Years, 4 Semesters | 60 Seats.', '8:00 a.m. – 12:30 p.m. (incl. Sundays & Holidays).', 60)
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
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, '', '', 'Master of Science (Finance)', 'Self Financing', '', '', '', 'Graduate with 50% min & Math at HSC or UG first year.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '2 Years, 4 Semesters (104 Credits).', 'Weekdays: 6pm-9pm | Sat: 5pm-9pm | Sun: 8am-1pm.', 30)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;

    END IF;
END $$;

-- ──────────────── BAMMC ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bammc';
    IF prog_id IS NOT NULL THEN

        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, 'An interdisciplinary media programme covering journalism, advertising, public relations, and digital media — preparing students for dynamic careers in the fast-paced world of mass communication.', '', 'Bachelor of Arts (Multimedia and Mass Communication)', 'Self Financing', '', 'Shutter Speed', 'BAMMC', '10+2 from any recognised Board in any stream.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '3 Years (NEP 4 Years), 6/8 Semesters.', '12:00 PM – 04:30 PM', 60)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;

        -- Faculty (delete existing, then re-insert)
        DELETE FROM program_faculty WHERE programme_id = prog_id;
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 1, 'Dr. Shriya Shenoy', 'Assistant Professor', 'Coordinator', 'BAMMC', 'PhD, SET -M, MA (Mass Communication & Journalism).', '10 yrs', 'shriya.shenoy@mccmulund.ac.in', '/Degree College Teachers/Shriya Shenoy.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 2, 'Dr.Nimisha Gadkari', 'Assistant Professor', '—', 'BAMMC', 'PhD in Mass Communication & Journalism, MA in Entertainment, Media & Marketing', '7 yrs', 'nimisha.gadkari@mccmulund.ac.in', '/Degree College Teachers/Nimisha Gadkari.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 3, 'Ms. Sanika Ratnaparkhi', 'Assistant Professor', '—', 'BAMMC', 'BA and MA in English Literature and PGDM in Journalism and Mass communication, pursuing a PhD in literature', '1 yrs', 'sanika.ratnaparkhi@mccmulund.ac.in', '/Degree College Teachers/Sanika Ratnaparkhi.png', 2);

    END IF;
END $$;

-- ──────────────── BAF ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'baf';
    IF prog_id IS NOT NULL THEN

        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, 'A specialized commerce programme that trains students in financial accounting, auditing, taxation, and cost management — ideal for careers in CA, finance consulting, and corporate accounting.', 'The Bachelor of Commerce (Accounting & Finance) degree program is a three-year undergraduate course divided into six semesters. This course offers in-depth knowledge in accounting & financial subjects by adopting both traditional as well as innovative pedagogy of classroom teaching, seminars, projects practical training, industrial visits, conferences, expert talks, etc.

The program enables the learner to prepare for essential life skills for employment as well as self-employment. This is the most sought program for students who are planning to pursue CA, CWA and CS, since the entire syllabus is suitably designed for such professional programs.

This program with a blend of theoretical and practical knowledge brings out analytical financial acumen and makes a learner Industry ready. This program helps industries by providing suitably trained professionals in the field of accounting & finance.', 'B.COM (Accounting & Finance)', 'Self Financing', 'Manthan (Col)', 'Pratibimb (Col.)', 'BAF', 'HSC (Std. XII) passed from Maharashtra Board or equivalent.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '3 Years, 6 Semesters (As Per NEP 2020).', '07:15 AM – 11:40 AM', 120)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;

        -- Faculty (delete existing, then re-insert)
        DELETE FROM program_faculty WHERE programme_id = prog_id;
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 1, 'Ms.Alpa Katira', 'Assistant Professor', '—', 'BAF', 'M.Com.,B.Ed., SET', '20 yrs', 'alpa.katira@mccmulund.ac.in', '/Degree College Teachers/Alpa Katira.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 2, 'Mr.Nitin Pawar', 'Assistant Professor', 'Coordinator', 'BAF', 'M.Com.,M.Phil., MBA., SET', '16 yrs', 'nitin.pawar@mccmulund.ac.in', '/Degree College Teachers/Nitin Pawar.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 3, 'Ms.Swapna Acharya', 'Assistant Professor', '—', 'BAF', 'M.Com.,LLB, SET', '8 yrs', 'swapna.acharya@mccmulund.ac.in', '/Degree College Teachers/Swapana Acharya.png', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 4, 'Dr.Sneha Prajapati', 'Assistant Professor', '—', 'BAF', 'M.Com.,B.Ed., SET,NET', '8 yrs', 'sneha.prajapati@mccmulund.ac.in', '/Degree College Teachers/Sneha Prajapati.png', 3);

    END IF;
END $$;

-- ──────────────── BCOM-BA ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bcom-ba';
    IF prog_id IS NOT NULL THEN

        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, 'A dynamic business and entrepreneurship-driven program tailored to develop tomorrow', 'Bachelor of Commerce (Business Administration) or BBA is one of the most popular undergraduate degree programs. The BBA program is Business & Entrepreneurship driven. It has a dynamic array of Major, Minor courses, Electives, Vocational skill-based courses and Ability Enrichment courses, Value Education Courses, Digital fluency and Skill enhancement courses.

The school of Business is focused towards transforming young aspiring minds into tomorrow''s managerial professionals all geared to take on challenges of the corporate world. One of the best pedagogies would be "Grooming & Transforming" – developing the potential of students, guiding and empowering them to create a cutting edge for themselves.

This program helps in nurturing every student and budding entrepreneur to understand their innate abilities, strengths and work on the needed skill areas. Each and every subject will be dealt with case studies, Role plays, Real life challenges and simulation models.', 'B.Com (Business Administration)', 'Self Financing', '', '', '', 'HSC / Diploma in Engg. Admission based on merit.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '3 Years, 6 Semesters (As Per NEP 2020).', '12:00 PM – 04:30 PM', 60)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;

    END IF;
END $$;

-- ──────────────── BBI ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bbi';
    IF prog_id IS NOT NULL THEN

        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, 'A specialized programme focused on the banking and insurance sectors, equipping students with deep knowledge of financial services, risk management, and banking operations.', 'The Bachelor of Commerce (B.Com) in Banking & Insurance (BBI) is a specialized undergraduate program designed to provide students with comprehensive knowledge of the banking, finance, and insurance sectors. This course focuses on key financial concepts, risk management, investment strategies, and regulatory frameworks that govern the banking and insurance industries.

The curriculum includes subjects such as financial accounting, banking law and operations, insurance management, investment banking, risk assessment, financial markets, and corporate finance. It aims to equip students with analytical and problem-solving skills essential for making strategic financial decisions.

Graduates of B.Com in Banking & Insurance can explore career opportunities in commercial and investment banking, insurance companies, financial consultancies, stock markets, and regulatory institutions. They can also pursue higher education, such as MBA in Finance, M.Com, Chartered Financial Analyst (CFA), or professional certifications like CAIIB (Certified Associate of the Indian Institute of Bankers).

This program is ideal for students who aspire to build a career in banking, finance, and insurance, and seek in-depth knowledge of financial risk management and economic policies.', 'Bachelor of Commerce (Banking & Insurance)', 'Self Financing', 'Manthan (Col) + Shodh (Col)', 'Pratibimb (Col.)', 'BBI', '10+2 from any recognised Board.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '3 Years (NEP 4 Years), 6/8 Semesters.', '07:15 AM – 11:40 AM', 160)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;

        -- Faculty (delete existing, then re-insert)
        DELETE FROM program_faculty WHERE programme_id = prog_id;
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 1, 'Ms.Shilpa Thakur', 'Assistant Professor', 'Vice-Principal (SFC), Coordinatore', 'BBI', 'MCom,Mphil', '28 yrs', 'shilpa.thakur@mccmulund.ac.in', '/Degree College Teachers/Shilpa Thakur.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 2, 'Dr. Rajashri Deshpande', 'Assistant Professor', 'Coordinator', 'BBI', 'M.Com.,MA., NET, Ph.D.', '18 yrs', 'rajashri.deshpande@mccmulund.ac.in', '', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 3, 'Ms.Archana Kadam', 'Assistant Professor', '—', 'BBI', 'M.Com.,MA., NET, PGDFM', '17 yrs', 'archana.kadam@mccmulund.ac.in', '/Degree College Teachers/Archana Kadam.png', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 4, 'Ms.Seema Attarde', 'Assistant Professor', '—', 'BBI', 'M.Sc.', '26 yrs', 'seema.attarde@mccmulund.ac.in', '/Degree College Teachers/Seema Attarde.png', 3);

    END IF;
END $$;

-- ──────────────── BCA ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bca';
    IF prog_id IS NOT NULL THEN

        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, 'An application-oriented IT degree combining computer science fundamentals with software development and programming skills.', 'Welcome to the Bachelor of Science (Computer Applications) program at PTVA''s Mulund College of Commerce (Autonomous)! This program is designed to provide students with knowledge and skills to become successful professionals in the field of computing.

The B.Sc. (CA) program focuses on computer fundamentals, programming in languages such as C and Java, database management, internet technologies, operating system concepts, and more. The curriculum offers a balanced approach to software development, covering a wide range of topics from design principles to software security.

Throughout the program students develop practical skills and apply their knowledge in hands-on projects. This program enables students to create a strong foundation of computing concepts and gets them ready to develop computer applications and websites for organizations.', 'B.Sc. (Computer Applications)', 'Self Financing', 'Hack-A-Thon (Col)', 'Tech Anugraha (Col)', 'BCA', 'HSC (any stream) with Maths/Stats OR Diploma in IT/CS/allied branches.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '3 Years, 6 Semesters (As Per NEP 2020).', '02:05 PM – 08:10 PM', 60)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;

        -- Faculty (delete existing, then re-insert)
        DELETE FROM program_faculty WHERE programme_id = prog_id;
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 1, 'Dr.Vishal Borude', 'Assistant Professor', 'BCA Co-ordinator', 'Not Assigned', 'M.Sc.(IT).,Ph.D.', '0 yrs', 'vishal.borude@mccmulund.ac.in', '/Degree College Teachers/Vishal Borude.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 2, 'Dr. Priti Pathak', 'Assistant Professor', 'DS Co-Ordinator', 'Not Assigned', 'MSc(I.T).,MTech(I.T)., MBA(I.T).,LLB.,Diploma in Cyber Law., Ph.D.', '', 'priti.pathak@mccmulund.ac.in', '/Degree College Teachers/Priti Pathak.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 3, 'Mr. Siddhesh Gotekar', 'Assistant Professor', '—', 'Not Assigned', 'M.Sc.(IT)', '0 yrs', 'gotekarsiddhesh@gmail.com', '/Degree College Teachers/Siddhesh Gotekar.png', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 4, 'Dr. Sandhya Pandey', 'Assistant Professor', '—', 'Not Assigned', 'M.C.A., P.H.D.(Computer Science and Application), M.A.(Sociology)', '17 yrs', 'sandhya.pandey@mccmulund.ac.in', '/Degree College Teachers/Sandhya Pandey.png', 3);

    END IF;
END $$;

-- ──────────────── BCOM ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bcom';
    IF prog_id IS NOT NULL THEN

        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, 'A comprehensive commerce education providing a strong foundation in accounting, business management, economics, and finance — preparing students for diverse corporate roles.', 'The Bachelor of Commerce (B.Com) program is a versatile and widely recognized undergraduate degree that provides students with a solid foundation in business, accounting, economics, and finance. It is designed to equip students with the necessary skills and knowledge to succeed in various corporate and financial roles.

The curriculum covers core subjects such as financial accounting, corporate law, business economics, business communication, taxation, and auditing. It blends theoretical knowledge with practical applications, allowing students to develop critical thinking, problem-solving, and analytical skills.

Graduates of the B.Com program have diverse career opportunities across industries. They can pursue roles in accounting, banking, financial management, human resources, marketing, and taxation. Additionally, a B.Com degree serves as an excellent stepping stone for professional courses like Chartered Accountancy (CA), Company Secretary (CS), Cost and Management Accountancy (CMA), and Master of Business Administration (MBA).

This program is ideal for students seeking a comprehensive understanding of business operations and aiming to build a successful career in the dynamic world of commerce and industry.', 'Bachelor of Commerce (B.Com)', 'Aided', '', '', 'BCOM', '10+2 from any recognised Board in any stream.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '3 Years (NEP 4 Years), 6/8 Semesters.', '07:15 AM – 10:40 AM', 600)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;

        -- Faculty (delete existing, then re-insert)
        DELETE FROM program_faculty WHERE programme_id = prog_id;
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 1, 'Mr.Nikhil Karkhanis', 'Assistant Professor', 'Advanced Accountancy Co-ordinator', 'Accountancy', 'M.Com., CS., NET., SET., LLB', '', 'nikhil.karkhanis@mccmulund.ac.in', '/Degree College Teachers/Nikhil Karkhanis.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 2, 'Ms.Riya Dhamaprukar', 'Assistant Professor', '—', 'Accountancy', 'M.Com., B.Ed., NET.,SET', '0 yrs', 'riya.dhamapurkar@mccmulund.ac.in', '', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 3, 'Ms.Snehal Chavan', 'Assistant Professor', '—', 'Accountancy', 'M.Com.,CA.,CMA., ,NET.', '0 yrs', 'snehal.chavan@mccmulund.ac.in', '/Degree College Teachers/Snehal Chavan.png', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 4, 'Ms.Shweta Ghare', 'Assistant Professor', '—', 'Accountancy', 'M. Com.,SET', '0 yrs', 'shweta.ghare@mccmulund.ac.in', '', 3);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 5, 'Mr.Prathamesh Bobhate', 'Assistant Professor', '—', 'Accountancy', 'M. Com,NET', '0 yrs', 'prathamesh.bobhate@mccmulund.ac.in', '/Degree College Teachers/Prathmesh Bobhate.png', 4);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 6, 'Suchitra Poojari', 'Assistant Professor', '—', 'Accountancy', 'M.Com, NET, MH-SET, KSET', '', 'suchitra.poojari@mccmulund.ac.in', '/Degree College Teachers/Suchitra Poojary.png', 5);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 7, 'Dr.Shivaji Pawar', 'Principal', 'Vice-Principal & Head', 'Business Economics', 'M.A.,B.Ed.,M.Phil., Ph.D.,NET', '', 'shivaji.pawar@mccmulund.ac.in', '/Degree College Teachers/Shivaji Pawar.png', 6);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 8, 'Dr.Arjun Lakhe', 'Assistant Professor', '—', 'Business Economics', 'M.A.,M.Phil.,Ph.D.', '12 yrs', 'arjun.lakhe@mccmulund.ac.in', '/Degree College Teachers/Arjun Lakhe.png', 7);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 9, 'Ms.Gopika Pal', 'Assistant Professor', '—', 'Business Economics', 'M.A.,Post Graduate Diploma in Finance management and Post Graduate Diploma in Banking Operations,SET', '0 yrs', 'gopika.pal@mccmulund.ac.in', '/Degree College Teachers/Gopika Pal.png', 8);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 10, 'Dr.Anuradha Ganesh', 'Assistant Professor', 'Head & Assistant Professor', 'Commerce', 'M.Com,CA., NET,Ph.D', '0 yrs', 'anuradha.ganesh@mccmulund.ac.in', '', 9);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 11, 'Dr.Sulbha Dey', 'Assistant Professor', '—', 'Commerce', 'M.Com,B.Ed., NET,Ph.D', '0 yrs', 'sulbha.dey@mccmulund.ac.in', '', 10);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 12, 'Dr.Vaishali Patil', 'Assistant Professor', '—', 'Commerce', 'M.Com.,MBA,NET,SET,M.Phil.,Ph.D.', '19 yrs', 'vaisahali.patil@mccmulund.ac.in', '', 11);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 13, 'Ms.Divya Iyer', 'Assistant Professor', '—', 'Commerce', 'M. Com,SET', '0 yrs', 'divya@mccmulund.ac.in', '', 12);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 14, 'Ms. Dhanvi Mehta', 'Assistant Professor', '—', 'Commerce', 'Master of Commerce (Business Management), UGC NET', '2 yrs', 'dhanviedu@gmail.com', '/Degree College Teachers/Dhanvi Mehta.png', 13);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 15, 'Dr.Shayeree Ghosh', 'Assistant Professor', 'Head & Assistant Professor', 'English', 'M.A., M.Phil., NET., Ph.D.', '', 'shayeree.ghosh@mccmulund.ac.in', '/Degree College Teachers/Shayeree Ghosh.png', 14);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 16, 'Mr.Jayanta Ghorpade', 'Assistant Professor', '—', 'English', 'M.A., B.Ed., M.Phil., NET.', '', 'jayanta.ghorpade@mccmulund.ac.in', '/Degree College Teachers/Jayanta Ghorpade.png', 15);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 17, 'Mr.Amit Yadav', 'Assistant Professor', 'Head & Assistant Professor', 'Environmental Studies', 'M.Sc., NET., LLB.,P.G.D.E.L. (NLSIU)', '17 yrs', 'amit.yadav@mccmulund.ac.in', '', 16);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 18, 'Dr. Minal Mapuskar', 'Principal', 'Principal & head', 'IKS', 'M.A,NET,SLET,PhD.', '20 yrs', 'principal@mccmulund.ac.in', '/Degree College Teachers/Minal Mapuskar.png', 17);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 19, 'Ms .Jui Kadvwekar', 'Assistant Professor', '—', 'IKS', 'MA., NET', '', 'juikadvekar@gmail.com', '/Degree College Teachers/Jui Kudvekar.png', 18);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 20, 'Dr.Pramila D\', 'Assistant Professor', 'Head & Assistant Professor', 'Law', 'LLB., LLM., Ph.D., NET', '0 yrs', 'pramiladsouza@mulund.ac.in', '/Degree College Teachers/Pramila D', 19);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 21, 'Ms. Seema Attarde', 'Assistant Professor', 'HOD', 'Mathematics, Statistics and Computer Applications', 'M.Sc. (Statistics)', '26 yrs', 'seema.attarde@mccmulund.ac.in', '/Degree College Teachers/Seema Attarde.png', 20);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 22, 'Ms.Komal Bhatt', 'Assistant Professor', '—', 'Mathematics, Statistics and Computer Applications', 'M.Sc. (Mathematics)', '0 yrs', 'komal.bhat@mccmulund.ac.in', '/Degree College Teachers/Komal Bhatt.png', 21);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 23, 'Ms. Neha Rajendraprasad Pal', 'Assistant Professor', '—', 'Mathematics, Statistics and Computer Applications', 'M.Sc. (Mathematics), B. Ed', '0 yrs', 'neha.pal@mccmulund.ac.in', '/Degree College Teachers/Neha Pal.png', 22);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 24, 'Ms. Chetna Shailesh Panchal', 'Assistant Professor', '—', 'Mathematics, Statistics and Computer Applications', 'M.Sc. (Mathematics), B.Ed.', '0 yrs', 'chetna.panchal@mccmulund.ac.in', '/Degree College Teachers/Chetna Panachal.png', 23);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 25, 'Mrs. Gauri A. Atre', 'Assistant Professor', '—', 'Mathematics, Statistics and Computer Applications', 'Msc(Mathematics). B. Ed. Mphil', '20 yrs', 'gauri.atre@mccmulund.ac.in', '/Degree College Teachers/Gauri Atre.png', 24);

    END IF;
END $$;

-- ──────────────── BFM ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bfm';
    IF prog_id IS NOT NULL THEN

        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, 'An intensive course focused on capital markets, investment banking, portfolio management, and financial analytics for the modern financial sector.', 'The Bachelor of Commerce (B.Com) in Financial Markets (BFM) is a specialized undergraduate program designed to provide students with a comprehensive understanding of financial markets, investment strategies, and economic environments. This program aims to equip students with the theoretical and practical knowledge required to excel in the fast-paced world of finance and trading.

The curriculum covers a broad range of subjects including equity markets, debt markets, derivatives, foreign exchange markets, portfolio management, financial risk management, and technical analysis. It also emphasizes the importance of regulatory frameworks and ethical practices in financial operations.

Graduates of the BFM program have a wide array of career opportunities in areas such as equity research, investment banking, asset management, stockbroking, mutual funds, and corporate finance. The program also serves as an excellent foundation for pursuing higher education, such as an MBA in Finance, CFA (Chartered Financial Analyst), or other professional certifications in the finance sector.

Ideal for students with a keen interest in finance, economics, and market dynamics, the BFM program prepares them to become skilled professionals capable of making informed and strategic financial decisions.', 'Bachelor of Commerce (Financial Markets)', 'Self Financing', 'Manthan (Col)', 'Finanza', 'BFM', '10+2 from any recognised Board in any stream.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '3 Years (NEP 4 Years), 6/8 Semesters.', '12:00 PM – 04:30 PM', 60)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;

        -- Faculty (delete existing, then re-insert)
        DELETE FROM program_faculty WHERE programme_id = prog_id;
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 1, 'Ms.Siddhi Kambli', 'Assistant Professor', '—', 'BFM', 'M.Com., SET', '8 yrs', 'Siddhi.kambli@mccmulumd.ac.in', '/Degree College Teachers/Siddhi Kambli.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 2, 'Dr.Sipra Routaray', 'Assistant Professor', '—', 'BFM', 'Ph.D.,M.com., MBA., NET., SET.', '14 yrs', 'sipra.routray@mccmulund.ac.in', '/Degree College Teachers/Sipra Routray.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 3, 'Ms. Archana Patre', 'Assistant Professor', '—', 'BFM', 'MFM, M.Com', '9 yrs', 'arch.dalvi@gmail.com', '/Degree College Teachers/Archana Patre.png', 2);

    END IF;
END $$;

-- ──────────────── BFSI ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bfsi';
    IF prog_id IS NOT NULL THEN

        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, 'A highly specialized program equipping students with core competencies in commercial banking, investment analysis, and risk management.', 'The Bachelor of Commerce (B.Com) in Banking, Financial Services, and Insurance (BFSI) is a specialized undergraduate program designed to provide students with a strong foundation in the financial sector. This program focuses on the principles and practices of banking, investment, risk management, insurance, and financial services, equipping students with the necessary skills to excel in the dynamic world of finance.

The curriculum covers essential subjects such as financial accounting, banking regulations, risk assessment, investment analysis, insurance laws, financial markets, and economic policies. It prepares students for careers in commercial banking, investment banking, insurance companies, financial consultancies, and regulatory bodies.

With the increasing demand for skilled professionals in the financial sector, B.Com (BFSI) offers excellent career opportunities in banks, financial institutions, mutual funds, stock markets, and fintech companies. Graduates can also pursue further studies such as MBA in Finance, Chartered Financial Analyst (CFA), Certified Financial Planner (CFP), or professional banking and insurance certifications.

This program is ideal for students who are interested in financial management, investment strategies, risk assessment, and the functioning of banking and insurance sectors.', 'Bachelor of Commerce (Banking, Financial Services and Insurance)', 'Self Financing', '', '', '', '10+2 from any recognised Board in any stream.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '6 Years, 8 Semesters.', '04:30 PM – 08:30 PM', 60)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;

    END IF;
END $$;

-- ──────────────── BCOM-MS ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bcom-ms';
    IF prog_id IS NOT NULL THEN

        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, 'A holistic management programme developing future business leaders with skills in marketing, finance, HR, and strategic management.', 'Bachelor of Commerce (B.Com) in Management Studies is an undergraduate program designed to provide students with in-depth knowledge of business management, financial principles, and organizational strategies.

Mulund College of Commerce introduced BMS since its inception at Mumbai University in June 1999. The curriculum has been specially designed by keeping in mind the requirements of industry and in order to equip students with the skills of business leadership. The students are to select any one of the specializations viz. Marketing, Finance & HR.

Graduates can pursue careers in corporate management, banking, finance, marketing, entrepreneurship, and consulting. They can also opt for higher education like MBA, M.Com, CFA, or other professional certifications.', 'B.Com (Management Studies)', 'Self Financing', 'Inspira (Col)', 'Inspira', 'BMS', 'HSC / Diploma in Engg. Admission based on merit weightage.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '3 Years, 6 Semesters (As Per NEP 2020).', '12:00 PM – 04:30 PM', 120)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;

        -- Faculty (delete existing, then re-insert)
        DELETE FROM program_faculty WHERE programme_id = prog_id;
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 1, 'Dr. Kanchana Sattur', 'Assistant Professor', 'HOD', 'Bachelor of Commerce (Management Studies)', 'MCom, M.B.A, NET(Comm& Mgmt), PhD.,', '15 yrs', 'kanchana.sattur@mccmulund.ac.in', '/Degree College Teachers/Kanchana Sattur.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 2, 'Dr. Soumya George', 'Assistant Professor', '—', 'Bachelor of Commerce (Management Studies)', 'MA (Economics), MBA, MCOM, MJMC, PhD (Economics)', '14 yrs', 'soumya.george@mccmulund.ac.in', '/Degree College Teachers/Soumya George.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 3, 'Dr. Shilpi Jawake', 'Assistant Professor', '—', 'Bachelor of Commerce (Management Studies)', 'MBA, MCOM, NET, SET, Pursuing PhD', '12 yrs', 'shilpi.jawake@mccmulund.ac.in', '/Degree College Teachers/Shilpi Juwake.png', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 4, 'Dr. Abilasha N', 'Assistant Professor', '—', 'Bachelor of Commerce (Management Studies)', 'M. Com, MPhil, NET, PhD', '12 yrs', 'abhilasha.n@mccmulund.ac.in', '/Degree College Teachers/Abilasha N.png', 3);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 5, 'Mr.Felix Anthonysamy', 'Assistant Professor', '—', 'Bachelor of Commerce (Management Studies)', 'M.Com., B.Ed., MBA ., MA NET., SET.,', '10 yrs', 'felix@mccmulund.ac.in', '/Degree College Teachers/Felix Anthonysamy.png', 4);

    END IF;
END $$;

-- ──────────────── BSC-IT ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bsc-it';
    IF prog_id IS NOT NULL THEN

        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, 'A technology-driven programme preparing students for software development, IT consulting, and network administration.', 'The BSc (IT) is a three-year full-time degree program divided into six semesters, preparing students to meet the information and communication technology needs of government, business, healthcare, universities, and other types of organizations.

The application of computers and telecommunication systems to produce, manipulate, store, organize, retrieve, and transmit data is known as Information Technology (IT). It entails the creation, installation, implementation, management, and upkeep of computer hardware and software within businesses and organizations.

Programming, Database Management, Networking, Artificial Intelligence, Software Engineering, Electronics, and Applied Mathematics are among the topics covered. Taking into consideration the current trend, the course has made room for new technologies such as Android Programming, Green Computing, and so on.', 'B.Sc. (Information Technology)', 'Self Financing', 'Hack-A-Thon (Col)', 'Tech Anugraha (Col)', 'BSC_IT', 'HSC (any stream) with Mathematics OR 3-yr Diploma from MSBTE.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '3 Years, 6 Semesters (As Per NEP 2020).', '10:40 AM – 04:15 PM', 120)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;

        -- Faculty (delete existing, then re-insert)
        DELETE FROM program_faculty WHERE programme_id = prog_id;
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 1, 'Dr.Jyotika Chheda', 'Assistant Professor', 'IT Co-ordinator', 'SCT (School of Computing and Technology)', 'MCA., NET., Ph.D.', '', 'jyotika.chheda@mccmulund.ac.in', '/Degree College Teachers/Jyotika Chheda.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 2, 'Dr.Vishal Borude', 'Assistant Professor', '—', 'SCT (School of Computing and Technology)', 'M.Sc.(IT).,Ph.D.', '12 yrs', 'vishal.borude@mccmulund.ac.in', '/Degree College Teachers/Vishal Borude.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 3, 'Dr.Priti Pathak', 'Assistant Professor', 'DS Co-Ordinator', 'SCT (School of Computing and Technology)', 'MSc(I.T).,MTech(I.T)., MBA(I.T).,LLB.,Diploma in Cyber Law., Ph.D.', '', 'priti.pathak@mccmulund.ac.in', '/Degree College Teachers/Priti Pathak.png', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 4, 'Ms. Suvarna Ramesh Sawant', 'Assistant Professor', '—', 'SCT (School of Computing and Technology)', 'Master in Computer Application', '', 'suvarna.sawant@mccmulund.ac.in', '/Degree College Teachers/Suvarna Sawant.png', 3);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 5, 'Dr. Sandhya Pandey', 'Assistant Professor', '—', 'SCT (School of Computing and Technology)', 'M.C.A., P.H.D.(Computer Science and Application), M.A.(Sociology)', '17 yrs', 'sandhya.pandey@mccmulund.ac.in', '/Degree College Teachers/Sandhya Pandey.png', 4);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 6, 'Mr.Siddhesh Gotekar', 'Assistant Professor', '—', 'SCT (School of Computing and Technology)', 'M.Sc.(IT)', '3 yrs', 'gotekarsiddhesh@gmail.com', '/Degree College Teachers/Siddhesh Gotekar.png', 5);

    END IF;
END $$;

-- ──────────────── BSC-DS ────────────────
DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bsc-ds';
    IF prog_id IS NOT NULL THEN

        -- Overview
        INSERT INTO program_overview (programme_id, description, long_description, title, funding_type, festivals, publication, course_key, eligibility)
        VALUES (prog_id, 'A cutting-edge course focused on data analytics, machine learning, and statistical modeling to solve real-world business problems.', 'The BSc (Data Science) is a three-year full-time degree program divided into six semesters. The goal of this course is to provide a study program that combines data science, machine learning, statistics, and mathematics. The program employs a rigorous approach, a mathematical focus, and involves the application of data science to the social sciences.

This program provides in-depth training in the statistical foundations of data science, as well as a solid foundation in the computing skills and algorithmic reasoning required for modern data analysis. The BSc in Data Science meets the needs of IT, market research, and advanced hi-tech companies for providing valuable insights, decisions, or solutions from large amounts of data required for organizational growth.', 'B.Sc. (Data Science)', 'Self Financing', 'Hack-A-Thon (Col)', 'Tech Anugraha (Col)', 'DS', 'HSC (any stream) with Maths/Stats OR Diploma in IT/CS/allied branches.')
        ON CONFLICT (programme_id) DO UPDATE SET
            description    = EXCLUDED.description,
            long_description = EXCLUDED.long_description,
            title          = EXCLUDED.title,
            funding_type   = EXCLUDED.funding_type,
            festivals      = EXCLUDED.festivals,
            publication    = EXCLUDED.publication,
            course_key     = EXCLUDED.course_key,
            eligibility    = EXCLUDED.eligibility;

        -- Snapshot
        INSERT INTO program_snapshot (programme_id, duration, timing, intake)
        VALUES (prog_id, '3 Years, 6 Semesters (As Per NEP 2020).', '02:05 PM – 08:10 PM', 60)
        ON CONFLICT (programme_id) DO UPDATE SET
            duration = EXCLUDED.duration,
            timing   = EXCLUDED.timing,
            intake   = EXCLUDED.intake;

        -- Faculty (delete existing, then re-insert)
        DELETE FROM program_faculty WHERE programme_id = prog_id;
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 1, 'Dr.Priti Pathak', 'Assistant Professor', 'DS Co-ordinator', 'Not Assigned', 'MSc(I.T).,MTech(I.T)., MBA(I.T).,LLB.,Diploma in Cyber Law., Ph.D.', '0 yrs', 'priti.pathak@mccmulund.ac.in', '/Degree College Teachers/Priti Pathak.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 2, 'Dr.Vishal Borude', 'Assistant Professor', '—', 'Not Assigned', 'M.Sc.(IT).,Ph.D.', '0 yrs', 'vishal.borude@mccmulund.ac.in', '/Degree College Teachers/Vishal Borude.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 3, 'Dr.Reena Nagda', 'Assistant Professor', 'SCT Co-ordinator', 'Not Assigned', 'M.Sc. Mathematics,NET,Ph.D.', '', 'reena.shah@mccmulund.ac.in', '', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 4, 'Dr. Sandhya Pandey', 'Assistant Professor', '—', 'Not Assigned', 'M.C.A., P.H.D.(Computer Science and Application), M.A.(Sociology)', '', 'sandhya.pandey@mccmulund.ac.in', '/Degree College Teachers/Sandhya Pandey.png', 3);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order)
        VALUES (prog_id, 5, 'Mr.Siddhesh Gotekar', 'Assistant Professor', '—', 'Not Assigned', 'M.Sc.(IT)', '0 yrs', 'gotekarsiddhesh@gmail.com', '/Degree College Teachers/Siddhesh Gotekar.png', 4);

    END IF;
END $$;
