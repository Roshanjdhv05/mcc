-- Auto-generated Seed SQL for MCC Programmes

-- 1. Fix old table constraints by dropping and recreating them to point to mcc_programmes
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
    apply_now_url TEXT
);
ALTER TABLE program_overview DISABLE ROW LEVEL SECURITY;

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

-- 2. Insert Data

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'mcom-aa';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, '', 'The Master of Commerce (M.Com) in Advanced Accountancy is a specialized postgraduate program designed to provide students with an advanced and rigorous understanding of accounting principles, financial management, and corporate taxation. This program focuses on developing a high level of expertise in analyzing complex financial data and making strategic financial decisions.

The curriculum includes advanced subjects such as advanced financial accounting, strategic cost accounting, direct and indirect taxes, business valuation, and corporate financial reporting. It aims to equip students with critical analytical skills and a deep understanding of the regulatory frameworks that govern the accounting profession.

Graduates of the M.Com (Advanced Accountancy) program have promising career prospects in areas like auditing, taxation, financial consulting, corporate finance, and investment banking. It also serves as an excellent foundation for pursuing further professional qualifications such as Chartered Accountancy (CA), Cost and Management Accountancy (CMA), and Certified Public Accountant (CPA).

This program is ideal for students who have a strong aptitude for numbers and a keen interest in pursuing a successful career in the accounting and finance sectors.')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '', '', 0, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'mcom-bf';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, '', '')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '', '', 0, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'mcom-bm';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, '', '')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '', '', 0, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'msc-it';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, '', '')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '2 Years, 4 Semesters | 60 Seats.', '8:00 a.m. – 12:30 p.m. (incl. Sundays & Holidays).', 60, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'msf';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, '', '')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '2 Years, 4 Semesters (104 Credits).', 'Weekdays: 6pm-9pm | Sat: 5pm-9pm | Sun: 8am-1pm.', 30, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bammc';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, 'An interdisciplinary media programme covering journalism, advertising, public relations, and digital media — preparing students for dynamic careers in the fast-paced world of mass communication.', '')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '3 Years (NEP 4 Years), 6/8 Semesters.', '12:00 PM – 04:30 PM', 60, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'baf';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, 'A specialized commerce programme that trains students in financial accounting, auditing, taxation, and cost management — ideal for careers in CA, finance consulting, and corporate accounting.', 'The Bachelor of Commerce (Accounting & Finance) degree program is a three-year undergraduate course divided into six semesters. This course offers in-depth knowledge in accounting & financial subjects by adopting both traditional as well as innovative pedagogy of classroom teaching, seminars, projects practical training, industrial visits, conferences, expert talks, etc.

The program enables the learner to prepare for essential life skills for employment as well as self-employment. This is the most sought program for students who are planning to pursue CA, CWA and CS, since the entire syllabus is suitably designed for such professional programs.

This program with a blend of theoretical and practical knowledge brings out analytical financial acumen and makes a learner Industry ready. This program helps industries by providing suitably trained professionals in the field of accounting & finance.')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '3 Years, 6 Semesters (As Per NEP 2020).', '07:15 AM – 11:40 AM', 120, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bcom-ba';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, 'A dynamic business and entrepreneurship-driven program tailored to develop tomorrow''s managerial leaders through practical case studies and simulations.', '')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '3 Years, 6 Semesters (As Per NEP 2020).', '12:00 PM – 04:30 PM', 60, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bbi';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, 'A specialized programme focused on the banking and insurance sectors, equipping students with deep knowledge of financial services, risk management, and banking operations.', 'The Bachelor of Commerce (B.Com) in Banking & Insurance (BBI) is a specialized undergraduate program designed to provide students with comprehensive knowledge of the banking, finance, and insurance sectors. This course focuses on key financial concepts, risk management, investment strategies, and regulatory frameworks that govern the banking and insurance industries.

The curriculum includes subjects such as financial accounting, banking law and operations, insurance management, investment banking, risk assessment, financial markets, and corporate finance. It aims to equip students with analytical and problem-solving skills essential for making strategic financial decisions.

Graduates of B.Com in Banking & Insurance can explore career opportunities in commercial and investment banking, insurance companies, financial consultancies, stock markets, and regulatory institutions. They can also pursue higher education, such as MBA in Finance, M.Com, Chartered Financial Analyst (CFA), or professional certifications like CAIIB (Certified Associate of the Indian Institute of Bankers).

This program is ideal for students who aspire to build a career in banking, finance, and insurance, and seek in-depth knowledge of financial risk management and economic policies.')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '3 Years (NEP 4 Years), 6/8 Semesters.', '07:15 AM – 11:40 AM', 160, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bca';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, 'An application-oriented IT degree combining computer science fundamentals with software development and programming skills.', '')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '3 Years, 6 Semesters (As Per NEP 2020).', '02:05 PM – 08:10 PM', 60, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bcom';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, 'A comprehensive commerce education providing a strong foundation in accounting, business management, economics, and finance — preparing students for diverse corporate roles.', 'The Bachelor of Commerce (B.Com) program is a versatile and widely recognized undergraduate degree that provides students with a solid foundation in business, accounting, economics, and finance. It is designed to equip students with the necessary skills and knowledge to succeed in various corporate and financial roles.

The curriculum covers core subjects such as financial accounting, corporate law, business economics, business communication, taxation, and auditing. It blends theoretical knowledge with practical applications, allowing students to develop critical thinking, problem-solving, and analytical skills.

Graduates of the B.Com program have diverse career opportunities across industries. They can pursue roles in accounting, banking, financial management, human resources, marketing, and taxation. Additionally, a B.Com degree serves as an excellent stepping stone for professional courses like Chartered Accountancy (CA), Company Secretary (CS), Cost and Management Accountancy (CMA), and Master of Business Administration (MBA).

This program is ideal for students seeking a comprehensive understanding of business operations and aiming to build a successful career in the dynamic world of commerce and industry.')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '3 Years (NEP 4 Years), 6/8 Semesters.', '07:15 AM – 10:40 AM', 600, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bfm';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, 'An intensive course focused on capital markets, investment banking, portfolio management, and financial analytics for the modern financial sector.', 'The Bachelor of Commerce (B.Com) in Financial Markets (BFM) is a specialized undergraduate program designed to provide students with a comprehensive understanding of financial markets, investment strategies, and economic environments. This program aims to equip students with the theoretical and practical knowledge required to excel in the fast-paced world of finance and trading.

The curriculum covers a broad range of subjects including equity markets, debt markets, derivatives, foreign exchange markets, portfolio management, financial risk management, and technical analysis. It also emphasizes the importance of regulatory frameworks and ethical practices in financial operations.

Graduates of the BFM program have a wide array of career opportunities in areas such as equity research, investment banking, asset management, stockbroking, mutual funds, and corporate finance. The program also serves as an excellent foundation for pursuing higher education, such as an MBA in Finance, CFA (Chartered Financial Analyst), or other professional certifications in the finance sector.

Ideal for students with a keen interest in finance, economics, and market dynamics, the BFM program prepares them to become skilled professionals capable of making informed and strategic financial decisions.')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '3 Years (NEP 4 Years), 6/8 Semesters.', '12:00 PM – 04:30 PM', 60, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bcom-ms';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, 'A holistic management programme developing future business leaders with skills in marketing, finance, HR, and strategic management.', '')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '3 Years, 6 Semesters (As Per NEP 2020).', '12:00 PM – 04:30 PM', 120, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bsc-it';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, 'A technology-driven programme preparing students for software development, IT consulting, and network administration.', '')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '3 Years, 6 Semesters (As Per NEP 2020).', '10:40 AM – 04:15 PM', 120, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bsc-ds';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_overview (programme_id, description, long_description)
        VALUES (prog_id, 'A cutting-edge course focused on data analytics, machine learning, and statistical modeling to solve real-world business problems.', '')
        ON CONFLICT (programme_id) DO UPDATE SET description = EXCLUDED.description, long_description = EXCLUDED.long_description;
        
        INSERT INTO program_snapshot (programme_id, duration, timing, intake, mode)
        VALUES (prog_id, '3 Years, 6 Semesters (As Per NEP 2020).', '02:05 PM – 08:10 PM', 60, 'Full Time')
        ON CONFLICT (programme_id) DO UPDATE SET duration = EXCLUDED.duration, timing = EXCLUDED.timing, intake = EXCLUDED.intake, mode = EXCLUDED.mode;
    END IF;
END $$;
