-- Auto-generated Structure Seed SQL for MCC Programmes

DROP TABLE IF EXISTS program_subjects CASCADE;
DROP TABLE IF EXISTS program_semesters CASCADE;

CREATE TABLE program_semesters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES mcc_programmes(id) ON DELETE CASCADE,
    semester_number INTEGER NOT NULL,
    syllabus_pdf TEXT,
    UNIQUE(programme_id, semester_number)
);
ALTER TABLE program_semesters DISABLE ROW LEVEL SECURITY;

CREATE TABLE program_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    semester_id UUID REFERENCES program_semesters(id) ON DELETE CASCADE,
    subject_name TEXT NOT NULL,
    subject_code TEXT,
    credits INTEGER,
    is_elective BOOLEAN DEFAULT false,
    subject_type TEXT,
    display_order INTEGER DEFAULT 0
);
ALTER TABLE program_subjects DISABLE ROW LEVEL SECURITY;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bsc-cs';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PROGRAMMING WITH PYTHON', 'MCCCSCT101', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF COMPUTERS', 'MCCCSCT106', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DATABASE MANAGEMENT SYSTEMS', 'MCCCSCT109', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DISCRETE MATHEMATICS', 'MCCCMATH105', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'E-COMMERCE & DIGITAL MARKETING', 'MCCCSB11A', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENHANCING SOFT SKILLS', 'MCCCENG108', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'HARNESSING GREEN IT', 'MCCCSCTEV5102', 4, false, 'BOTH', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ADVANCED PYTHON PROGRAMMING', 'MCCCSCT201', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMPUTER NETWORKS', 'MCCCSCT110', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'OBJECT ORIENTED PROGRAMMING WITH C++', 'MCCCSCT104', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ADVANCED CALCULUS', 'MCCCMATH104', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PRINCIPLES OF ACCOUNTING', 'MCCCAF107', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PRACTICAL ACCOUNTING', 'MCCCAF108', 2, true, 'PRACTICAL', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENGLISH TECHNICAL WRITING SKILLS', 'MCCCENG110', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF INDIAN KNOWLEDGE SYSTEM', 'MCCCS101', 2, false, 'THEORY', 7);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'JAVA PROGRAMMING', 'MCCCSCT203', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DATA STRUCTURES & ALGORITHMS', 'MCCCSCT213', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'OPERATING SYSTEMS', 'MCCCSCT212', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'NUMERICAL METHODS', 'MCCCMATH106', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ADVANCED TALLY', 'MCCCAF222', 2, true, 'PRACTICAL', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'IT RETURN FILING', 'MCCCAF221', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PROGRAMMING WITH PL/SQL', 'MCCCSCT207', 2, true, 'BOTH', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CRYPTOGRAPHY & NETWORK SECURITY', 'MCCCSCT216', 2, true, 'BOTH', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'HINDI LEKHAN KAUSHAL', 'MCCCLANG208', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MARATHI LEKHAN KAUSHALYA', 'MCCCLANG202', 2, true, 'THEORY', 9);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRITAM PARICHAYAH - SANSKRIT BASICS', 'MCCCLANG209', 2, true, 'THEORY', 10);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'WEB PROGRAMMING', 'MCCCSCT204', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'THEORY OF COMPUTATION', 'MCCCSCT223', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'AGILE SCRUM', 'MCCCSCT215', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'LINEAR ALGEBRA', 'MCCCMATH202', 2, false, 'BOTH', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'STARTUP & ENTREPRENEURSHIP SKILLS', 'MCCSDB223', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MOBILE APP TECHNOLOGIES', 'MCCCSCT211', 2, true, 'PRACTICAL', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'UNITY PROGRAMMING', 'MCCCSCT210', 2, true, 'PRACTICAL', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK HINDI LEKHAN, BATCHEET AUR PRASTUTI', 'MCCCLANG206', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK VA UPAYOJIK MARATHI LEKHAN, SAMBHASHA VA SADARIKARAN', 'MCCCLANG205', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRIT PRAVINTA PATHYAKRAM (SANSKRIT PROFICIENCY COURSE)', 'MCCCLANG207', 2, true, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 5) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'AI AND ML', 'MCCCSCT301', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MERN', 'MCCCSCT401', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INFORMATION RETRIEVAL', 'MCCCSCT302', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'STATISTICS FOR COMPUTER SCIENCE', 'MCCCSTAT101', 4, false, 'BOTH', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ETHICAL HACKING', 'MCCCSCT303', 4, true, 'BOTH', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PROJECT', 'MCCCSCTPRJ401', 2, true, 'PRACTICAL', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ON JOB TRAINING', 'MCCCOJTSCT302', 2, true, 'PRACTICAL', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 6) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DATA SCIENCE FUNDAMENTALS', 'MCCCSCT405', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'WEB SERVICES & CLOUD COMPUTING', 'MCCCSCT416', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTRODUCTION TO BLOCKCHAIN', 'MCCCSCT305', 2, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTERNET OF THINGS', 'MCCCSCT306', 4, false, 'BOTH', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DIGITAL FORENSICS', 'MCCCSCT308', 4, true, 'BOTH', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CAPSTONE PROJECT', 'MCCCSCTPRJ402', 4, false, 'PRACTICAL', 5);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bsc-it';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Imperative Programming', '', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Web Technologies', '', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Digital Electronics', '', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Numerical Methods', '', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Essentials of Management / Group Dynamics & Leadership Skills', '', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Enhancing Soft Skills', '', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Green Computing', '', 2, false, 'THEORY', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Object Oriented Programming with C++', '', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Database Management Systems', '', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Microprocessors', '', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Discrete Mathematics', '', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Principles of Accounting / Economics', '', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Practical Accounting / Economic Modelling', '', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'English Technical Writing Skills', '', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Fundamentals of Indian Knowledge System', '', 2, false, 'THEORY', 7);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Python Programming', '', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Operating Systems', '', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Computer Networks', '', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Statistical Techniques', '', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Advanced Tally / Personal Finance Management', '', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'C#.NET Core', '', 2, false, 'BOTH', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Hindi Lekhan Kaushal / Marathi / Sanskrit', '', 2, true, 'THEORY', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Full Stack Development with Java', '', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Data Structures and Algorithms', '', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Agile Scrum', '', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Applied Mathematics and MAD Practical', '', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'E-commerce & Digital Marketing / Start-Up & Entrepreneurship / IT Returns', '', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Graphics Primitives', '', 2, false, 'BOTH', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Vyavaharik Hindi / Marathi / Sanskrit Proficiency', '', 2, true, 'THEORY', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 5) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DevOps', '', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ASP. NET Core', '', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Big Data and NOSQL / Enterprise Java', '', 4, true, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Internet of Things', '', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Artificial Intelligence / Virtual Reality & Augmented Reality', '', 2, true, 'BOTH', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'OJT / Project', '', 2, false, 'PRACTICAL', 5);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 6) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Computer Security', '', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Business Intelligence', '', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Advanced Mobile Programming Practical', '', 4, false, 'PRACTICAL', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Principles of GIS / Cloud Computing Fundamentals', '', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'IT Service Management / Cyber Laws and Patents', '', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'EARN / Linux Administration', '', 2, true, 'BOTH', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CAPSTONE Project', '', 2, false, 'PRACTICAL', 6);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bcom';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Introduction to Accountancy', 'MCCCAC101', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Introduction to Business Studies', 'MCCCCOM105', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Fundamentals of Indian Knowledge System', 'MCCIKS101', 2, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Introduction to Statistics', 'MCCMATH119', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Professional Competency in English', 'MCCENG101', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Environmental Conservation', 'MCCEVS101', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Professional Communication', 'MCCENG127', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Organisational Communication', 'MCCENG126', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Environmental Disasters and Risk Reduction', 'MCCEVS104', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Introduction to Human Rights', 'MCCLAW102', 2, true, 'THEORY', 9);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Short Story Appreciation', 'MCCENG112', 2, true, 'THEORY', 10);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Tourism Development and Sustainability', 'MCCEVS105', 2, true, 'THEORY', 11);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Life Skills for Professionals', 'MCCENG128', 2, true, 'THEORY', 12);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Co-Curricular Course - I', 'MCCCC100', 2, false, 'THEORY', 13);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Accountancy and Financial Management', 'MCCCAC103', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Service Sector', 'MCCCCOM106', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Economics for Professionals', 'MCCECO113', 2, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Micro Economics', 'MCCECO101', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Quantitative Business Techniques', 'MCCMATH118', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Creative Writing in English', 'MCCENG106', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Environmental Issues & Management', 'MCCEVS102', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Executive Communication', 'MCCENG129', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Corporate Communication', 'MCCENG118', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Introduction to Constitution of India', 'MCCLAW101', 2, true, 'THEORY', 9);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Environmental Disasters and Risk Reduction', 'MCCEVS104', 2, true, 'THEORY', 10);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Global Etiquettes and Socialization', 'MCCENG121', 2, true, 'THEORY', 11);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Tourism Development and Sustainability', 'MCCEVS105', 2, true, 'THEORY', 12);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Translation Studies', 'MCCENG111', 2, true, 'THEORY', 13);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Co-curricular Course - II', 'MCCCC150', 2, false, 'THEORY', 14);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Accounting for Partnership Firm', 'MCCCAC201', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Management Studies', 'MCCCCOM201', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Economic Laws', 'MCCECO202', 4, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Macro Economics', 'MCCECO201', 4, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Financial Mathematics', 'MCCMATH201', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Hindi Lekhan Kaushal', 'MCCLANG208', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Sanskritam Parichayah - Sanskrit Basics', 'MCCLANG209', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Marathi Lekhan Kaushalya', 'MCCLANG202', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Criminal Justice System in India', 'MCCLAW204', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Principles of Business Obligations', 'MCCLAW201', 2, true, 'THEORY', 9);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Field Project - I', 'MCCFP201', 2, false, 'THEORY', 10);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Co-curricular Course - III', 'MCCCC200', 2, false, 'THEORY', 11);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Corporate Accounting', 'MCCCAC202', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Advertising & Media Management', 'MCCCCOM202', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Urban Economics', 'MCCECO204', 4, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Fundamentals of Public finance', 'MCCECO203', 4, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Operation Research', 'MCCSCT201', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Computer Applications in Business', 'MCCMATH202', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Vyavaharik Hindi Lekhan, Baatcheet aur Prastuti', 'MCCLANG206', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Vyavaharik Va Upayojik Marathi Lekhan, Sambhashan Va Sadarikaran', 'MCCLANG205', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Sanskrit Pravinta Pathyakram (Sanskrit Proficiency Course)', 'MCCLANG207', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Principles of Corporate Governance', 'MCCLAW205', 2, true, 'THEORY', 9);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Criminal Justice System in India', 'MCCLAW204', 2, true, 'THEORY', 10);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Community Engagement Project - I', 'MCCCEP200', 2, false, 'THEORY', 11);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Co-curricular Course - IV', 'MCCCC250', 2, false, 'THEORY', 12);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 5) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Financial Accounting - I', 'MCCCAC301', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Introduction to Cost Accounting', 'MCCCAC302', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Marketing Management', 'MCCCCOM301', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Direct & Indirect Taxation - I', 'MCCCAC303', 4, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Export Marketing', 'MCCCCOM302', 4, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Indian Economy', 'MCCECO301', 4, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Economics of Money and Banking', 'MCCECO302', 4, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Research Techniques - A Statistical Approach', 'MCCMATH301', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Field Project - II', 'MCCFP300', 2, false, 'THEORY', 8);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 6) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Financial Accounting - II', 'MCCCAC304', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Elements of Cost', 'MCCCAC305', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Human Resource Management', 'MCCCCOM303', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Direct & Indirect Taxation - II (Introduction to GST)', 'MCCCAC306', 4, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Indian Financial System', 'MCCCCOM304', 4, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'International Economics', 'MCCECO303', 4, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Economics of Sustainable Development', 'MCCECO304', 4, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'On the Job Training', 'MCCOJT301', 4, false, 'PRACTICAL', 7);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'baf';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTRODUCTION AND ELEMENTS OF COST ACCOUNTING', 'MCCAF102', 2, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PRINCIPLES OF MICRO ECONOMICS', 'MCCECO102', 2, true, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CONTEMPORARY INDIAN POLITICAL SYSTEM', 'MCCARF101', 2, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BUSINESS ENVIRONMENT', 'MCCAF105', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BASIC MATHEMATICS FOR FINANCE', 'MCCMATH107', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'EFFECTIVE COMMUNICATION', 'MCCENG105', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENVIRONMENTAL CONSERVATION', 'MCCEVS101', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF INDIAN KNOWLEDGE SYSTEM', 'MCCIKS101', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - I', 'MCCCC100', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL ACCOUNTING I', 'MCCAF109', 4, false, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'AN OVERVIEW OF FINANCIAL SYSTEM', 'MCCAF104', 2, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PRACTICES OF MACRO ECONOMICS', 'MCCECO108', 2, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'THE LAW OF CONTRACTS', 'MCCLAW104', 2, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CONTEMPORARY INDIAN SOCIETY', 'MCCABF102', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BASICS OF AUDITING', 'MCCAF106', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INFORMATION TECHNOLOGY IN ACCOUNTANCY', 'MCCSCT151', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMMUNICATION SKILLS FOR BUSINESS', 'MCCENG106', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENVIRONMENTAL ISSUES & MANAGEMENT', 'MCCEVS102', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - II', 'MCCCC150', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL ACCOUNTING II', 'MCCAF110', 4, false, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL ACCOUNTING – III (ACCOUNTING OF FIRMS)', 'MCCAF201', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COST ACCOUNTING – II (METHODS OF COST ACCOUNTING)', 'MCCAF202', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL MANAGEMENT - I', 'MCCAF203', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMPANY LAW', 'MCCLAW113', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DIRECT TAX', 'MCCAF204', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRITAM PARICHAYAH - SANSKRIT BASICS', 'MCCLANG209', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'HINDI LEKHAN KAUSHAL', 'MCCLANG208', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MARATHI LEKHAN KAUSHALYA', 'MCCLANG202', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - III', 'MCCCC200', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FIELD PROJECT - I', 'MCCFP201', 2, false, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL ACCOUNTING – IV', 'MCCAF205', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MANAGEMENT ACCOUNTING', 'MCCAF206', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MANAGEMENT CONCEPTS AND FUNCTIONS', 'MCCAF207', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'LAWS RELATING TO THE PROTECTION OF INTELLECTUAL PROPERTY RIGHTS', 'MCCLAW110', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DIRECT TAX: COMPUTATION OF INCOME & TAXABILITY', 'MCCAF208', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRIT PRAVINTA PATHYAKRAM (SANSKRIT PROFICIENCY COURSE)', 'MCCLANG207', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK HINDI LEKHAN, BATCHEET AUR PRASTUTI', 'MCCLANG206', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK VA UPAYOJIK MARATHI LEKHAN, SAMBHASHAN VA SADARIKARAN', 'MCCLANG205', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMMUNITY ENGAGEMENT PROJECT - I', 'MCCCEP200', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - IV', 'MCCCC250', 2, true, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 5) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CORPORATE ACCOUNTING - I', 'MCCAF301', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COST ACCOUNTING – III', 'MCCAF302', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL MANAGEMENT – II', 'MCCAF303', 4, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MANAGEMENT -II (MANAGEMENT APPLICATIONS)', 'MCCAF305', 4, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INDIRECT TAX - I', 'MCCAF306', 4, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FIELD PROJECT - II', 'MCCFP300', 2, false, 'THEORY', 5);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 6) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CORPORATE ACCOUNTING – II', 'MCCAF307', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COST ACCOUNTING - IV', 'MCCAF308', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INDIRECT TAX - II', 'MCCAF309', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL MANAGEMENT - III', 'MCCAF310', 4, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ECONOMICS PAPER – III (INDIAN ECONOMY)', 'MCCAF312', 4, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ON THE JOB TRAINING', 'MCCOJT301', 4, false, 'PRACTICAL', 5);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bbi';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENVIRONMENT AND MANAGEMENT OF FINANCIAL SERVICES', 'MCCBI101', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BASICS OF FINANCIAL ACCOUNTING', 'MCCBI102', 2, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ELEMENTS OF MICRO ECONOMICS', 'MCCECO103', 2, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CONTEMPORARY INDIAN POLITICAL SYSTEM', 'MCCABF101', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BASICS OF MANAGEMENT', 'MCCBI103', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BASIC STATISTICAL TECHNIQUES', 'MCCMATH108', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'EFFECTIVE COMMUNICATION', 'MCCENG105', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENVIRONMENTAL CONSERVATION', 'MCCEVS101', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF INDIAN KNOWLEDGE SYSTEM', 'MCCIKS101', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - I', 'MCCCC100', 2, true, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PRINCIPLES & PRACTICES OF BANKING & INSURANCE', 'MCCBI104', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF CORPORATE ACCOUNTING', 'MCCBI105', 2, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ORGANISATIONAL BEHAVIOUR', 'MCCBI106', 2, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'THE LAW OF CONTRACTS', 'MCCLAW104', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CONTEMPORARY INDIAN SOCIETY', 'MCCABF102', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MANAGEMENT ACCOUNTING', 'MCCBI107', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ADVANCED STATISTICAL TECHNIQUES', 'MCCMATH109', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMMUNICATION SKILLS FOR BUSINESS', 'MCCENG106', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENVIRONMENTAL ISSUES & MANAGEMENT', 'MCCEVS102', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - II', 'MCCCC150', 2, true, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL MARKETS', 'MCCBI201', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'AN OVERVIEW OF BANKING SECTOR', 'MCCBI202', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ORGANISATIONAL BEHAVIOUR: CONCEPTS & PRACTICES', 'MCCBI203', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BASICS OF MACRO ECONOMICS', 'MCCECO114', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INFORMATION TECHNOLOGY IN B & I', 'MCCSCT115', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'HINDI LEKHAN KAUSHAL', 'MCCLANG208', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MARATHI LEKHAN KAUSHALYA', 'MCCLANG202', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRITAM PARICHAYAH - SANSKRIT BASICS', 'MCCLANG209', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - III', 'MCCCC200', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FIELD PROJECT - I', 'MCCFP201', 2, false, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'AN OVERVIEW OF INSURANCE SECTOR', 'MCCBI204', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL SERVICES MANAGEMENT', 'MCCBI205', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COST ACCOUNTING', 'MCCBI206', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMPANY LAW', 'MCCLAW108', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INFORMATION TECHNOLOGY IN BANKING & INSURANCE', 'MCCSCT116', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK HINDI LEKHAN, BATCHEET AUR PRASTUTI', 'MCCLANG206', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK VA UPAYOJIK MARATHI LEKHAN, SAMBHASHAN', 'MCCLANG205', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRIT PRAVINTA PATHYAKRAM (SANSKRIT PROFICIENCY)', 'MCCLANG207', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMMUNITY ENGAGEMENT PROJECT - I', 'MCCCEP200', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - IV', 'MCCCC250', 2, true, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 5) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CENTRAL BANKING', 'MCCBI301', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'STRATEGIC MANAGEMENT', 'MCCBI302', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL MANAGEMENT', 'MCCBI303', 4, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BUSINESS ETHICS & CORPORATE GOVERNANCE', 'MCCBI305', 4, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DIRECT TAXES', 'MCCBI306', 4, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FIED PROJECT - II', 'MCCFP300', 2, false, 'THEORY', 5);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 6) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTERNATIONAL BANKING & FINANCE', 'MCCBI307', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL REPORTING ANALYSIS', 'MCCBI308', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENTREPRENEURSHIP MANAGEMENT', 'MCCBI309', 2, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'HUMAN RESOURCE MANAGEMENT', 'MCCBI310', 4, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'TURNAROUND MANAGEMENT', 'MCCBI312', 4, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ON THE JOB TRAINING', 'MCCOJT301', 4, false, 'PRACTICAL', 5);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bfm';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTRODUCTION TO FINANCIAL SYSTEM', 'MCCFM101', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTRODUCTION TO FINANCIAL ACCOUNTING', 'MCCFM102', 2, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BASICS OF MICRO ECONOMICS', 'MCCECO104', 2, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CONTEMPORARY INDIAN POLITICAL SYSTEM', 'MCCABF101', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF MANAGEMENT', 'MCCFM106', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMMERCIAL MATHEMATICS', 'MCCMATH110', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'EFFECTIVE COMMUNICATION', 'MCCENG105', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENVIRONMENTAL CONSERVATION', 'MCCEVS101', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF INDIAN KNOWLEDGE SYSTEM', 'MCCIKS101', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - I', 'MCCCC100', 2, false, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'OVERVIEW OF INSURANCE', 'MCCFM103', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTRODUCTION TO CORPORATE ACCOUNTING', 'MCCFM104', 2, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF MARKETING', 'MCCFM105', 2, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTRODUCTION TO MACRO ECONOMICS', 'MCCECO106', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CONTEMPORARY INDIAN SOCIETY', 'MCCABF102', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BUSINESS ENVIRONMENT', 'MCCAF105', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL STATISTICS', 'MCCMATH111', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMMUNICATION SKILLS FOR BUSINESS', 'MCCENG106', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENVIRONMENTAL ISSUES AND MANAGEMENT', 'MCCEVS102', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - II', 'MCCCC150', 2, false, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BASICS OF EQUITY MARKET', 'MCCFM201', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DEBT MARKET', 'MCCFM202', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MANAGEMENT ACCOUNTING', 'MCCFM203', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'THE LAW OF CONTRACT', 'MCCLAW104', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BASIC COMPUTER SKILLS', 'MCCSCT113', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'HINDI LEKHAN KAUSHAL', 'MCCLANG208', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MARATHI LEKHAN KAUSHALYA', 'MCCLANG202', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRITAM PARICHAYAH - SANSKRIT BASICS', 'MCCLANG209', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - III', 'MCCCC200', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FIELD PROJECT - I', 'MCCFP201', 2, false, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ADVANCE EQUITY MARKET', 'MCCFM204', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FIXED INCOME SECURITIES MARKET', 'MCCFM205', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CORPORATE FINANCE', 'MCCFM206', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMPANY LAW', 'MCCLAW108', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ADVANCED COMPUTER SKILLS', 'MCCSCT114', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRIT PRAVINTA PATHYAKRAM (SANSKRIT PROFICIENCY)', 'MCCLANG207', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK HINDI LEKHAN, BATCHEET AUR PRASTUTI', 'MCCLANG206', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK VA UPAYOJIK MARATHI LEKHAN, SAMBHASHAN VA SADARIKARAN', 'MCCLANG205', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMMUNITY ENGAGEMENT PROJECT - I', 'MCCCEP200', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - IV', 'MCCCC250', 2, false, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 5) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL DERIVATIVES', 'MCCFM301', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FOREIGN EXCHANGE MARKET', 'MCCFM302', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'TECHNICAL ANALYSIS', 'MCCFM303', 4, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ADVANCE CORPORATE ACCOUNTING', 'MCCFM304', 4, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BUSINESS ETHICS AND CORPORATE GOVERNANCE', 'MCCFM305', 4, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FIELD PROJECT - II', 'MCCFP300', 2, false, 'THEORY', 5);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 6) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'RISK MANAGEMENT', 'MCCFM306', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMMODITY DERIVATIVES', 'MCCFM307', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PORTFOLIO MANAGEMENT', 'MCCFM308', 2, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MUTUAL FUND MANAGEMENT', 'MCCFM309', 4, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'EQUITY RESEARCH', 'MCCFM310', 4, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ON THE JOB TRAINING', 'MCCOJT301', 4, false, 'PRACTICAL', 5);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bcom-ms';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF FINANCIAL ACCOUNTS', 'MCCCB121', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'GROUP DYNAMICS & ORGANISATION CULTURE', 'MCCCB122', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTRODUCTION TO ENTERPRISE ECONOMICS', 'MCCCB123', 4, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTRODUCTION TO LEGAL STUDIES', 'MCCLAW110', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'APPLIED MATHEMATICAL CONCEPTS', 'MCCMATH120', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BUSINESS COMMUNICATION', 'MCCCENG113', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DIGITAL EMPOWERMENT', 'MCCCSCT112', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF INDIAN KNOWLEDGE SYSTEM', 'MCCIKS101', 2, false, 'THEORY', 7);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PRINCIPLES OF MANAGEMENT', 'MCCSB110', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MARKETING MANAGEMENT PRINCIPLES & PRACTICES', 'MCCSB113', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ESSENCE OF HUMAN RESOURCE MANAGEMENT', 'MCCSB127', 2, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'GREEN MARKETING', 'MCCSB110', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INDIAN FINANCIAL SYSTEM & MARKETS', 'MCCSB111', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'UNDERSTANDING LEGAL ENVIRONMENT', 'MCCLAW112', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FOUNDATION OF STATISTICS', 'MCCCSTAT103', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'UNLEASH YOUR POTENTIAL', 'MCCCENG117', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ADMINISTRATIVE AND COLLABORATIVE COMMUNICATION', 'MCCCENG114', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SUSTAINABLE MANAGEMENT OF BIO DIVERSITY', 'MCCEVS105', 2, false, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BUSINESS PLANNING & ENTREPRENEURSHIP MANAGEMENT', 'MCCSB201', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ACCOUNTING FOR MANAGERIAL DECISIONS', 'MCCSB202', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BUSINESS ENVIRONMENT', 'MCCSB203', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CONSUMER BEHAVIOR', 'MCCSB207', 4, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CORPORATE FINANCE', 'MCCSB208', 4, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DATA ANALYSIS USING ADVANCE EXCEL', 'MCCCSCT113', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ADVANCED MARKETING THEORY & APPLICATION', 'MCCSB209', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'STRESS MANAGEMENT', 'MCCSB210', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRITAM PARICHAYAH - SANSKRIT BASICS', 'MCCLANG209', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'HINDI LEKHAN KAUSHAL', 'MCCLANG208', 2, true, 'THEORY', 9);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MARATHI LEKHAN KAUSHALYA', 'MCCLANG202', 2, true, 'THEORY', 10);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ADVANCED MANAGERIAL ECONOMICS', 'MCCCB205', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'STRATEGIC MANAGEMENT FOR BUSINESS', 'MCCSB213', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ORGANIZATIONAL EFFECTIVENESS', 'MCCSB214', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ADVERTISING & IMC', 'MCCSB218', 4, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COST ACCOUNTING', 'MCCSB219', 4, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'STATISTICS FOR RESEARCH', 'MCCCSTAT201', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMMERCIAL BANKING AND FINANCIAL SERVICES', 'MCCSB220', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF GENERATIVE AI', 'MCCCSCT126', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRIT PRAVINTA PATHYAKRAM', 'MCCLANG207', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK HINDI LEKHAN', 'MCCLANG206', 2, true, 'THEORY', 9);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK VA UPAYOJIK MARATHI LEKHAN', 'MCCLANG205', 2, true, 'THEORY', 10);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 5) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'OPERATIONS RESEARCH', 'MCCMATH302', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'LOGISTICS & SUPPLY CHAIN MANAGEMENT', 'MCCSB301', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SERVICE MARKETING', 'MCCSB302', 2, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMMODITY & DERIVATIVES MARKETING', 'MCCSB303', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'E-COMMERCE & DIGITAL MARKETING', 'MCCSB304', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DIRECT TAX', 'MCCSB311', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTERNATIONAL MARKETING', 'MCCSB306', 4, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INVESTMENT ANALYSIS & PORTFOLIO MANAGEMENT', 'MCCSB307', 4, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BUSINESS RESEARCH METHODOLOGY', 'MCCSB308', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PROJECT WORK', 'MCCSB323', 4, false, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 6) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CORPORATE COMMUNICATION & PR', 'MCCSB313', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INDIAN MANAGEMENT THOUGHTS AND PRACTICES', 'MCCSB314', 2, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'RETAIL MANAGEMENT', 'MCCSB312', 2, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INNOVATIVE FINANCIAL SERVICES', 'MCCSB318', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CUSTOMER RELATIONSHIP MANAGEMENT', 'MCCSB319', 4, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'STRATEGIC FINANCIAL MANAGEMENT', 'MCCSB315', 4, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BRAND MANAGEMENT', 'MCCSB316', 4, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTERNATIONAL FINANCE', 'MCCSB317', 4, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'GET CORPORATE READY', 'MCCSB322', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ON THE JOB TRAINING', 'MCCOJT301', 4, false, 'THEORY', 9);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bammc';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ESSENTIALS OF JOURNALISM', 'MCCMS101', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF MASS COMMUNICATION', 'MCCMS103', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ECONOMICS', 'MCCCEO111', 2, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MARKETING BLUEPRINT', 'MCCSB115', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'UNLEASH YOUR POTENTIAL', 'MCCCENG117', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VISUAL COMMUNICATION', 'MCCMS106', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'EFFECTIVE COMMUNICATION SKILLS', 'MCCCENG118', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF INDIAN KNOWLEDGE SYSTEM', 'MCCIHS101', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BIO ETHICS', 'MCCCV5109', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - I', 'MCCCV100', 2, false, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF ADVERTISING', 'MCCMS103', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SOCIOLOGY, MEDIA & MEDIA PSYCHOLOGY', 'MCCMS104', 2, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'GREEN MARKETING', 'MCCMS110', 2, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ESSENTIALS OF MANAGEMENT', 'MCCSB115', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENVIRONMENTAL JOURNALISM', 'MCCSB105', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENTREPRENUERSHIP/CURATORSHIP', 'MCCSB132', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CONTENT WRITING', 'MCCMS107', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CONTENT CREATION', 'MCCMS108', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MEDIA COMMUNICATION', 'MCCMS109', 2, false, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DIGITAL EMPOWERMENT', 'MCCCST112', 2, false, 'THEORY', 9);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - II', 'MCCCCC150', 2, false, 'THEORY', 10);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MEDIA GENDER & CULTURE', 'MCCMS201', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MEDIA LAW & ETHICS', 'MCCMS202', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MC & ADVERTISING', 'MCCMS203', 2, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FEATURES & OPINION', 'MCCMS204', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INFOCOMM PROFESSIONALS', 'MCCCST232', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'WRITING & EDITING FOR MEDIA', 'MCCMS205', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRITAM PARICHAYAH - SANSKRIT BASICS', 'MCCLANG209', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'HINDI LEKHAN KAUSHAL', 'MCCLANG208', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MARATHI LEKHAN KAUSHALYA', 'MCCLANG202', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - III', 'MCCCCC200', 2, false, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MASS MEDIA RESEARCH', 'MCCMS207', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MASS COMMUNICATION: THEORY & PRACTICE', 'MCCMS208', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CONSUMER BEHAVIOUR', 'MCCMS209', 2, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'GLOBAL MEDIA', 'MCCMS210', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MANAGEMENT AND CREATIVITY', 'MCCMS211', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PHOTOGRAPHY', 'MCCMS212', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRIT PRAVINTA PATHYAKRAM', 'MCCLANG207', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK HINDI LEKHAN, BATCHEET AUR PRASTUTI', 'MCCLANG206', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK VA UPAYOJIK MARATHI LEKHAN, SAMBHASHA VA SADARIKARAN', 'MCCLANG205', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMMUNITY ENGAGEMENT PROJECT - I', 'MCCCEP201', 2, false, 'THEORY', 9);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CO-CURRICULAR COURSE - IV', 'MCCCC250', 2, false, 'THEORY', 10);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 5) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CORPORATE & PUBLIC RELATION', 'MCCMS301', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CLASSICS – THE ART OF FILM COMMUNICATION', 'MCCMS302', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DIRECT MARKETING', 'MCCMS304', 2, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CONTENT MANAGEMENT & MARKETING', 'MCCMS305', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MOBILE JOURNALISM', 'MCCMS306', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COPYWRITING', 'MCCMS307', 4, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'EVENT MANAGEMENT', 'MCCMS308', 4, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MEDIA ETHICS', 'MCCMS309', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PODCAST SERIES', 'MCCFP311', 2, false, 'THEORY', 8);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 6) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MEDIA IN CONTEMPORARY SOCIETY', 'MCCMS311', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BRAND MANAGEMENT', 'MCCMS312', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'LIFESTYLE JOURNALISM', 'MCCMS313', 2, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'RETAIL & MERCHANDISING', 'MCCMS314', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'REPORTING AND FACT-CHECKING', 'MCCMS316', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'AD DESIGN', 'MCCMS317', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'NEWSPAPER & MAGAZINE MAKING', 'MCCMS318', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ON THE JOB TRAINING', 'MCCCIT301', 2, false, 'THEORY', 7);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bsc-ds';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Python for Data Science', '', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Web Technologies', '', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Descriptive Statistics', '', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Precalculus', '', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Essentials of Management / Group Dynamics & Leadership Skills', '', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Enhancing Soft Skills', '', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Green Computing', '', 2, false, 'THEORY', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'R-Programming', '', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Database Management Systems', '', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Probability and Distributions', '', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Calculus', '', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Principles of Accounting / Economics', '', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Practical Accounting / Economic Modelling', '', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'English Technical Writing Skills', '', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Fundamentals of Indian Knowledge System', '', 2, false, 'THEORY', 7);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Data Structures and Algorithms', '', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Data Warehousing', '', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Testing of Hypothesis', '', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Discrete Mathematics', '', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Advanced Tally / Personal Finance Management', '', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Programming with PL/SQL / Scala', '', 2, true, 'BOTH', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Hindi Lekhan Kaushal / Marathi / Sanskrit', '', 2, true, 'THEORY', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'AI and ML', '', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Big Data', '', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Data Mining', '', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Linear Algebra', '', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'E-commerce & Digital Marketing / IT Returns Filing', '', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Numerical Methods / Introduction to RPA', '', 2, true, 'BOTH', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Vyavaharik Hindi / Marathi / Sanskrit Proficiency', '', 2, true, 'THEORY', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 5) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Data Engineering', '', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Data Visualisation', '', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Generative AI', '', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Marketing and Retail Analytics', '', 4, true, 'BOTH', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Computer Vision', '', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Campus to Corporate', '', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Social Media Analytics / Information Retrieval', '', 2, true, 'BOTH', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Project / OJT', '', 2, false, 'PRACTICAL', 7);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 6) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Deep Learning', '', 4, false, 'BOTH', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Exploratory Data Analysis', '', 4, false, 'BOTH', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Sports Analytics', '', 4, false, 'BOTH', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Healthcare Analytics / Data Governance', '', 4, true, 'BOTH', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Internet of Things', '', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Applied Business Analytics / Business Forecasting', '', 2, true, 'BOTH', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CAPSTONE Project', '', 2, false, 'PRACTICAL', 6);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'mcom-aa';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Advanced Financial Accounting', 'MCCACC504', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Advanced Auditing', 'MCCACC505', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Direct Tax', 'MCCACC506', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Mergers & Acquisition', 'MCCACC501', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Economics for Business Decisions', 'MCCECO502', 4, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Behavioural Finance', 'MCCCOM503', 4, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Research Methodology for Finance', 'MCCACC507', 4, false, 'THEORY', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Corporate Financial Accounting', 'MCCACC503', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Strategic Cost Accounting', 'MCCACC508', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Indirect Taxes', 'MCCACC509', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Business Valuation', 'MCCACC510', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Macro Economics Concepts and Application', 'MCCECO505', 4, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Financial Management', 'MCCACC502', 4, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'OJT/FP', 'MCCOJT/FP501', 4, false, 'PRACTICAL', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Financial Reporting', 'MCCACC603', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Advanced Financial Management', 'MCCACC604', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Financial Risk Management', 'MCCACC605', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Indian Financial Thoughts', 'MCCACC606', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Financial Modelling', 'MCCACC607', 4, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Data Analytics for Finance', 'MCCACC608', 4, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Research Project', 'MCCRP601', 4, false, 'PRACTICAL', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'International Financial Reporting', 'MCCACC609', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'International Taxation', 'MCCACC601', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'International Finance', 'MCCACC610', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Business Applications of AI and ML', 'MCCACC611', 4, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Strategic Business Development', 'MCCACC612', 4, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'Research Project', 'MCCRP602', 6, false, 'PRACTICAL', 5);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'mcom-bf';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BANKING PRACTICES AND PROCEDURES', 'MCCCON1', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INSURANCE – PRINCIPLES AND PRACTICES', 'MCCCON1', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL MARKETS', 'MCCCON1', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MERGER AND ACQUISITION', 'MCCCON1', 4, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BEHAVIOURAL FINANCE', 'MCCCON1', 4, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ECONOMICS FOR BUSINESS DECISIONS', 'MCCCON1', 4, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'RESEARCH METHODOLOGY FOR BUSINESS', '', 4, false, 'THEORY', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'LEGAL FRAMEWORK OF BANKING', 'MCCCON1', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COMMODITY MARKETS', 'MCCCON1', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL MANAGEMENT', 'MCCCON1', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'RISK MANAGEMENT', 'MCCCON1', 4, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CORPORATE FINANCIAL ACCOUNTING', 'MCCCON1', 4, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MACRO ECONOMICS CONCEPTS AND APPLICATIONS', 'MCCCON2', 4, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ON THE JOB TRAINING', '', 4, false, 'PRACTICAL', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ACCOUNTING FOR BANKING SECTOR', 'MCCCON3', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ETHICS & GOVERNANCE IN FINANCIAL SECTOR', 'MCCCON3', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DEBT MARKET', 'MCCCON3', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BANKING TECHNOLOGY & MANAGEMENT', 'MCCCON3', 4, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VALUATION OF FINANCIAL INSTRUMENTS', 'MCCCON3', 4, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DATA ANALYTICS', 'MCCCON3', 4, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'RESEARCH PROJECT', '', 4, false, 'PRACTICAL', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTERNATIONAL FINANCE', 'MCCCON4', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL SERVICES', 'MCCCON4', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INVESTMENT MANAGEMENT', 'MCCCON4', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENTREPRENEURIAL FINANCE', 'MCCCON4', 4, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTERNATIONAL TAXATION', 'MCCCON4', 4, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'RESEARCH PROJECT', 'NECTBMC', 8, false, 'PRACTICAL', 5);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bcom-ba';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ORGANISATIONAL BEHAVIOUR', 'MCCSB103', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL ACCOUNTING FOR BUSINESS', 'MCCSB104', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTRODUCTION TO LEADERSHIP IN BUSINESS', 'MCCSB123', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PRACTICAL APPROACH TO MATHEMATICS', 'MCCMATH121', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'UNLEASH YOUR POTENTIAL', 'MCCCENG117', 2, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ORGANISATIONAL COMMUNICATION', 'MCCCENG120', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SUSTAINABLE URBAN DEVELOPMENT', 'MCCEVS103', 2, false, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FUNDAMENTALS OF INDIAN KNOWLEDGE SYSTEM', 'MCCIKS101', 2, false, 'THEORY', 7);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PRINCIPLES & PRACTICES OF MICRO ECONOMICS', 'MCCECO113', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MARKETING MANAGEMENT IN BUSINESS', 'MCCSD128', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL SERVICES AND MARKETS', 'MCCSD131', 2, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DATA ANALYSIS USING ADVANCE EXCEL', 'MCCCSCT113', 2, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'LEGAL ASPECTS & POLICIES', 'MCCLAW111', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VISUAL COMMUNICATION', 'MCCMS106', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'APPLIED STATISTICS', 'MCCCSTAT104', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'LANGUAGE FOR LEADERSHIP', 'MCCCENG116', 2, false, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DIGITAL EMPOWERMENT', 'MCCCSCT112', 2, false, 'THEORY', 8);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MARKET DYNAMICS & STRATEGIC DECISIONS', 'MCCSB204', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINTECH FOR BUSINESS', 'MCCSD205', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'AI POWERED MARKETING', 'MCCSD206', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BUSINESS INTELLIGENCE', 'MCCCSCT211', 4, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'POWER OF NEGOTIATION', 'MCCOE201', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DIGITAL MARKETING', 'MCCCSCT212', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FAMILY BUSINESS MANAGEMENT', 'MCCSB211', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRITAM PARICHAYAH - SANSKRIT BASICS', 'MCCLANG209', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'HINDI LEKHAN KAUSHAL', 'MCCLANG208', 2, true, 'THEORY', 8);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MARATHI LEKHAN KAUSHALYA', 'MCCLANG202', 2, true, 'THEORY', 9);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'START-UP ECOSYSTEM & FOUNDATIONS OF ENTREPRENEURSHIP', 'MCCSB215', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'COST & MANAGEMENT ACCOUNTING', 'MCCSB216', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL & RISK MANAGEMENT', 'MCCSB223', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'AI IN BUSINESS & PHYTON PROGRAMMING', 'MCCCSCT210', 4, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INNOVATION & CREATIVITY IN BUSINESS', 'MCCSB222', 2, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DESIGN THINKING', 'MCCSB224', 2, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SANSKRIT PRAVINTA PATHYAKRAM (SANSKRIT PROFICIENCY)', 'MCCLANG207', 2, true, 'THEORY', 6);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK HINDI LEKHAN, BATCHEET AUR PRASTUTI', 'MCCLANG206', 2, true, 'THEORY', 7);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'VYAVAHARIK VA UPAYOJIK MARATHI LEKHAN, SAMBHASHAN', 'MCCLANG205', 2, true, 'THEORY', 8);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 5) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'OPTIMIZATION TECHNIQUES', 'MCCMATH303', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CORPORATE FINANCE', 'MCCSB309', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SERVICE MARKETING', 'MCCSB302', 2, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DIRECT TAX', 'MCCSB311', 2, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DATA VISUALIZATION & POWER BI', 'MCCCSCT326', 4, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BUSINESS RESEARCH METHODOLOGY', 'MCCSB308', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ON THE JOB TRAINING', 'MCCOJT301', 4, false, 'THEORY', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 6) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'GLOBAL SUPPLY CHAIN MANAGEMENT', 'MCCSB318', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'GLOBAL BRAND MANAGEMENT', 'MCCSB319', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'SERVICE MARKETING OPERATIONS', 'MCCSB321', 2, true, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INVESTMENT ANALYSIS AND PORTFOLIO MANAGEMENT', 'MCCSB307', 4, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'BLOCKCHAIN FOR BUSINESS', 'MCCCSCT327', 4, false, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'GET CORPORATE READY', 'MCCSB322', 2, false, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CAP STONE PROJECT', 'MCCSB323', 4, false, 'THEORY', 6);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
    sem_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'msf';
    IF prog_id IS NOT NULL THEN

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 1) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL ECONOMICS', 'MCCMSF501', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'QUANTITATIVE TOOLS FOR FINANCE', 'MCCMSF502', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ACCOUNTING FOR FINANCIAL REPORTING', 'MCCMSF503', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PRACTICAL 1: QUANTITATIVE TOOLS FOR FINANCE', 'MCCMSF502', 1, false, 'PRACTICAL', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL MANAGEMENT', 'MCCMSF504', 4, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'RESEARCH METHODOLOGY', 'MCCMSF505', 4, false, 'THEORY', 5);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 2) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CORPORATE FINANCE', 'MCCMSF506', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FINANCIAL MARKETS AND INSTITUTIONS', 'MCCMSF507', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PRACTICAL 2: ECONOMETRICS AND FINANCIAL MODELING', 'MCCMSF508', 1, false, 'PRACTICAL', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ECONOMETRICS AND FINANCIAL MODELLING', 'MCCMSF508', 4, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'FIXED INCOME SECURITIES', 'MCCMSF509', 4, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'OJT / FP (INTERNSHIP)', '', 4, false, 'PRACTICAL', 5);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 3) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'TECHNICAL ANALYSIS', 'MCCMSF601', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'PORTFOLIO ANALYSIS AND MANAGEMENT', 'MCCMSF602', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'DERIVATIVES', 'MCCMSF603', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'CORPORATE GOVERNANCE & REGULATORY ENVIRONMENT', 'MCCMSF604', 4, false, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ENTREPRENEURSHIP', 'MCCMSF804', 4, true, 'THEORY', 4);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'ARTIFICIAL INTELLIGENCE & FINTECH', 'MCCMSF805', 4, true, 'THEORY', 5);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'RESEARCH PROJECT (VIVA + HARD COPY)', '', 4, false, 'PRACTICAL', 6);

        INSERT INTO program_semesters (programme_id, semester_number) VALUES (prog_id, 4) RETURNING id INTO sem_id;
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'MERGERS, ACQUISITIONS AND CORPORATE RESTRUCTURING', 'MCCMSF807', 4, false, 'THEORY', 0);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'STRUCTURED FINANCE', 'MCCMSF808', 4, false, 'THEORY', 1);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'RISK MANAGEMENT', 'MCCMSF809', 4, false, 'THEORY', 2);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'INTERNATIONAL FINANCE', 'MCCMSF811', 4, true, 'THEORY', 3);
        INSERT INTO program_subjects (semester_id, subject_name, subject_code, credits, is_elective, subject_type, display_order) VALUES (sem_id, 'RESEARCH PROJECT II (DISSERTATION)', 'MCCMSF', 6, false, 'PRACTICAL', 4);
    END IF;
END $$;

