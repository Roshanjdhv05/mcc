-- Auto-generated Faculty Seed SQL for MCC Programmes

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


DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bammc';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 1, 'Dr. Shriya Shenoy', 'Assistant Professor', 'Coordinator', 'BAMMC', 'PhD, SET -M, MA (Mass Communication & Journalism).', '10 yrs', 'shriya.shenoy@mccmulund.ac.in', '/Degree College Teachers/Shriya Shenoy.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 2, 'Dr.Nimisha Gadkari', 'Assistant Professor', '—', 'BAMMC', 'PhD in Mass Communication & Journalism, MA in Entertainment, Media & Marketing', '7 yrs', 'nimisha.gadkari@mccmulund.ac.in', '/Degree College Teachers/Nimisha Gadkari.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 3, 'Ms. Sanika Ratnaparkhi', 'Assistant Professor', '—', 'BAMMC', 'BA and MA in English Literature and PGDM in Journalism and Mass communication, pursuing a PhD in literature', '1 yrs', 'sanika.ratnaparkhi@mccmulund.ac.in', '/Degree College Teachers/Sanika Ratnaparkhi.png', 2);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'baf';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 1, 'Ms.Alpa Katira', 'Assistant Professor', '—', 'BAF', 'M.Com.,B.Ed., SET', '20 yrs', 'alpa.katira@mccmulund.ac.in', '/Degree College Teachers/Alpa Katira.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 2, 'Mr.Nitin Pawar', 'Assistant Professor', 'Coordinator', 'BAF', 'M.Com.,M.Phil., MBA., SET', '16 yrs', 'nitin.pawar@mccmulund.ac.in', '/Degree College Teachers/Nitin Pawar.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 3, 'Ms.Swapna Acharya', 'Assistant Professor', '—', 'BAF', 'M.Com.,LLB, SET', '8 yrs', 'swapna.acharya@mccmulund.ac.in', '/Degree College Teachers/Swapana Acharya.png', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 4, 'Dr.Sneha Prajapati', 'Assistant Professor', '—', 'BAF', 'M.Com.,B.Ed., SET,NET', '8 yrs', 'sneha.prajapati@mccmulund.ac.in', '/Degree College Teachers/Sneha Prajapati.png', 3);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bbi';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 1, 'Ms.Shilpa Thakur', 'Assistant Professor', 'Vice-Principal (SFC), Coordinatore', 'BBI', 'MCom,Mphil', '28 yrs', 'shilpa.thakur@mccmulund.ac.in', '/Degree College Teachers/Shilpa Thakur.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 2, 'Dr. Rajashri Deshpande', 'Assistant Professor', 'Coordinator', 'BBI', 'M.Com.,MA., NET, Ph.D.', '18 yrs', 'rajashri.deshpande@mccmulund.ac.in', '', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 3, 'Ms.Archana Kadam', 'Assistant Professor', '—', 'BBI', 'M.Com.,MA., NET, PGDFM', '17 yrs', 'archana.kadam@mccmulund.ac.in', '/Degree College Teachers/Archana Kadam.png', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 4, 'Ms.Seema Attarde', 'Assistant Professor', '—', 'BBI', 'M.Sc.', '26 yrs', 'seema.attarde@mccmulund.ac.in', '/Degree College Teachers/Seema Attarde.png', 3);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bca';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 1, 'Dr.Vishal Borude', 'Assistant Professor', 'BCA Co-ordinator', 'Not Assigned', 'M.Sc.(IT).,Ph.D.', '0 yrs', 'vishal.borude@mccmulund.ac.in', '/Degree College Teachers/Vishal Borude.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 2, 'Dr. Priti Pathak', 'Assistant Professor', 'DS Co-Ordinator', 'Not Assigned', 'MSc(I.T).,MTech(I.T)., MBA(I.T).,LLB.,Diploma in Cyber Law., Ph.D.', '', 'priti.pathak@mccmulund.ac.in', '/Degree College Teachers/Priti Pathak.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 3, 'Mr. Siddhesh Gotekar', 'Assistant Professor', '—', 'Not Assigned', 'M.Sc.(IT)', '0 yrs', 'gotekarsiddhesh@gmail.com', '/Degree College Teachers/Siddhesh Gotekar.png', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 4, 'Dr. Sandhya Pandey', 'Assistant Professor', '—', 'Not Assigned', 'M.C.A., P.H.D.(Computer Science and Application), M.A.(Sociology)', '17 yrs', 'sandhya.pandey@mccmulund.ac.in', '/Degree College Teachers/Sandhya Pandey.png', 3);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bcom';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 1, 'Mr.Nikhil Karkhanis', 'Assistant Professor', 'Advanced Accountancy Co-ordinator', 'Accountancy', 'M.Com., CS., NET., SET., LLB', '', 'nikhil.karkhanis@mccmulund.ac.in', '/Degree College Teachers/Nikhil Karkhanis.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 2, 'Ms.Riya Dhamaprukar', 'Assistant Professor', '—', 'Accountancy', 'M.Com., B.Ed., NET.,SET', '0 yrs', 'riya.dhamapurkar@mccmulund.ac.in', '', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 3, 'Ms.Snehal Chavan', 'Assistant Professor', '—', 'Accountancy', 'M.Com.,CA.,CMA., ,NET.', '0 yrs', 'snehal.chavan@mccmulund.ac.in', '/Degree College Teachers/Snehal Chavan.png', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 4, 'Ms.Shweta Ghare', 'Assistant Professor', '—', 'Accountancy', 'M. Com.,SET', '0 yrs', 'shweta.ghare@mccmulund.ac.in', '', 3);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 5, 'Mr.Prathamesh Bobhate', 'Assistant Professor', '—', 'Accountancy', 'M. Com,NET', '0 yrs', 'prathamesh.bobhate@mccmulund.ac.in', '/Degree College Teachers/Prathmesh Bobhate.png', 4);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 6, 'Suchitra Poojari', 'Assistant Professor', '—', 'Accountancy', 'M.Com, NET, MH-SET, KSET', '', 'suchitra.poojari@mccmulund.ac.in', '/Degree College Teachers/Suchitra Poojary.png', 5);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 7, 'Dr.Shivaji Pawar', 'Principal', 'Vice-Principal & Head', 'Business Economics', 'M.A.,B.Ed.,M.Phil., Ph.D.,NET', '', 'shivaji.pawar@mccmulund.ac.in', '/Degree College Teachers/Shivaji Pawar.png', 6);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 8, 'Dr.Arjun Lakhe', 'Assistant Professor', '—', 'Business Economics', 'M.A.,M.Phil.,Ph.D.', '12 yrs', 'arjun.lakhe@mccmulund.ac.in', '/Degree College Teachers/Arjun Lakhe.png', 7);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 9, 'Ms.Gopika Pal', 'Assistant Professor', '—', 'Business Economics', 'M.A.,Post Graduate Diploma in Finance management and Post Graduate Diploma in Banking Operations,SET', '0 yrs', 'gopika.pal@mccmulund.ac.in', '/Degree College Teachers/Gopika Pal.png', 8);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 10, 'Dr.Anuradha Ganesh', 'Assistant Professor', 'Head & Assistant Professor', 'Commerce', 'M.Com,CA., NET,Ph.D', '0 yrs', 'anuradha.ganesh@mccmulund.ac.in', '', 9);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 11, 'Dr.Sulbha Dey', 'Assistant Professor', '—', 'Commerce', 'M.Com,B.Ed., NET,Ph.D', '0 yrs', 'sulbha.dey@mccmulund.ac.in', '', 10);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 12, 'Dr.Vaishali Patil', 'Assistant Professor', '—', 'Commerce', 'M.Com.,MBA,NET,SET,M.Phil.,Ph.D.', '19 yrs', 'vaisahali.patil@mccmulund.ac.in', '', 11);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 13, 'Ms.Divya Iyer', 'Assistant Professor', '—', 'Commerce', 'M. Com,SET', '0 yrs', 'divya@mccmulund.ac.in', '', 12);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 14, 'Ms. Dhanvi Mehta', 'Assistant Professor', '—', 'Commerce', 'Master of Commerce (Business Management), UGC NET', '2 yrs', 'dhanviedu@gmail.com', '/Degree College Teachers/Dhanvi Mehta.png', 13);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 15, 'Dr.Shayeree Ghosh', 'Assistant Professor', 'Head & Assistant Professor', 'English', 'M.A., M.Phil., NET., Ph.D.', '', 'shayeree.ghosh@mccmulund.ac.in', '/Degree College Teachers/Shayeree Ghosh.png', 14);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 16, 'Mr.Jayanta Ghorpade', 'Assistant Professor', '—', 'English', 'M.A., B.Ed., M.Phil., NET.', '', 'jayanta.ghorpade@mccmulund.ac.in', '/Degree College Teachers/Jayanta Ghorpade.png', 15);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 17, 'Mr.Amit Yadav', 'Assistant Professor', 'Head & Assistant Professor', 'Environmental Studies', 'M.Sc., NET., LLB.,P.G.D.E.L. (NLSIU)', '17 yrs', 'amit.yadav@mccmulund.ac.in', '', 16);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 18, 'Dr. Minal Mapuskar', 'Principal', 'Principal & head', 'IKS', 'M.A,NET,SLET,PhD.', '20 yrs', 'principal@mccmulund.ac.in', '/Degree College Teachers/Minal Mapuskar.png', 17);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 19, 'Ms .Jui Kadvwekar', 'Assistant Professor', '—', 'IKS', 'MA., NET', '', 'juikadvekar@gmail.com', '/Degree College Teachers/Jui Kudvekar.png', 18);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 20, 'Dr.Pramila D''souza', 'Assistant Professor', 'Head & Assistant Professor', 'Law', 'LLB., LLM., Ph.D., NET', '0 yrs', 'pramiladsouza@mulund.ac.in', '/Degree College Teachers/Pramila D''Souza.png', 19);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 21, 'Ms. Seema Attarde', 'Assistant Professor', 'HOD', 'Mathematics, Statistics and Computer Applications', 'M.Sc. (Statistics)', '26 yrs', 'seema.attarde@mccmulund.ac.in', '/Degree College Teachers/Seema Attarde.png', 20);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 22, 'Ms.Komal Bhatt', 'Assistant Professor', '—', 'Mathematics, Statistics and Computer Applications', 'M.Sc. (Mathematics)', '0 yrs', 'komal.bhat@mccmulund.ac.in', '/Degree College Teachers/Komal Bhatt.png', 21);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 23, 'Ms. Neha Rajendraprasad Pal', 'Assistant Professor', '—', 'Mathematics, Statistics and Computer Applications', 'M.Sc. (Mathematics), B. Ed', '0 yrs', 'neha.pal@mccmulund.ac.in', '/Degree College Teachers/Neha Pal.png', 22);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 24, 'Ms. Chetna Shailesh Panchal', 'Assistant Professor', '—', 'Mathematics, Statistics and Computer Applications', 'M.Sc. (Mathematics), B.Ed.', '0 yrs', 'chetna.panchal@mccmulund.ac.in', '/Degree College Teachers/Chetna Panachal.png', 23);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 25, 'Mrs. Gauri A. Atre', 'Assistant Professor', '—', 'Mathematics, Statistics and Computer Applications', 'Msc(Mathematics). B. Ed. Mphil', '20 yrs', 'gauri.atre@mccmulund.ac.in', '/Degree College Teachers/Gauri Atre.png', 24);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bfm';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 1, 'Ms.Siddhi Kambli', 'Assistant Professor', '—', 'BFM', 'M.Com., SET', '8 yrs', 'Siddhi.kambli@mccmulumd.ac.in', '/Degree College Teachers/Siddhi Kambli.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 2, 'Dr.Sipra Routaray', 'Assistant Professor', '—', 'BFM', 'Ph.D.,M.com., MBA., NET., SET.', '14 yrs', 'sipra.routray@mccmulund.ac.in', '/Degree College Teachers/Sipra Routray.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 3, 'Ms. Archana Patre', 'Assistant Professor', '—', 'BFM', 'MFM, M.Com', '9 yrs', 'arch.dalvi@gmail.com', '/Degree College Teachers/Archana Patre.png', 2);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bcom-ms';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 1, 'Dr. Kanchana Sattur', 'Assistant Professor', 'HOD', 'Bachelor of Commerce (Management Studies)', 'MCom, M.B.A, NET(Comm& Mgmt), PhD.,', '15 yrs', 'kanchana.sattur@mccmulund.ac.in', '/Degree College Teachers/Kanchana Sattur.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 2, 'Dr. Soumya George', 'Assistant Professor', '—', 'Bachelor of Commerce (Management Studies)', 'MA (Economics), MBA, MCOM, MJMC, PhD (Economics)', '14 yrs', 'soumya.george@mccmulund.ac.in', '/Degree College Teachers/Soumya George.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 3, 'Dr. Shilpi Jawake', 'Assistant Professor', '—', 'Bachelor of Commerce (Management Studies)', 'MBA, MCOM, NET, SET, Pursuing PhD', '12 yrs', 'shilpi.jawake@mccmulund.ac.in', '/Degree College Teachers/Shilpi Juwake.png', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 4, 'Dr. Abilasha N', 'Assistant Professor', '—', 'Bachelor of Commerce (Management Studies)', 'M. Com, MPhil, NET, PhD', '12 yrs', 'abhilasha.n@mccmulund.ac.in', '/Degree College Teachers/Abilasha N.png', 3);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 5, 'Mr.Felix Anthonysamy', 'Assistant Professor', '—', 'Bachelor of Commerce (Management Studies)', 'M.Com., B.Ed., MBA ., MA NET., SET.,', '10 yrs', 'felix@mccmulund.ac.in', '/Degree College Teachers/Felix Anthonysamy.png', 4);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bsc-it';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 1, 'Dr.Jyotika Chheda', 'Assistant Professor', 'IT Co-ordinator', 'SCT (School of Computing and Technology)', 'MCA., NET., Ph.D.', '', 'jyotika.chheda@mccmulund.ac.in', '/Degree College Teachers/Jyotika Chheda.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 2, 'Dr.Vishal Borude', 'Assistant Professor', '—', 'SCT (School of Computing and Technology)', 'M.Sc.(IT).,Ph.D.', '12 yrs', 'vishal.borude@mccmulund.ac.in', '/Degree College Teachers/Vishal Borude.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 3, 'Dr.Priti Pathak', 'Assistant Professor', 'DS Co-Ordinator', 'SCT (School of Computing and Technology)', 'MSc(I.T).,MTech(I.T)., MBA(I.T).,LLB.,Diploma in Cyber Law., Ph.D.', '', 'priti.pathak@mccmulund.ac.in', '/Degree College Teachers/Priti Pathak.png', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 4, 'Ms. Suvarna Ramesh Sawant', 'Assistant Professor', '—', 'SCT (School of Computing and Technology)', 'Master in Computer Application', '', 'suvarna.sawant@mccmulund.ac.in', '/Degree College Teachers/Suvarna Sawant.png', 3);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 5, 'Dr. Sandhya Pandey', 'Assistant Professor', '—', 'SCT (School of Computing and Technology)', 'M.C.A., P.H.D.(Computer Science and Application), M.A.(Sociology)', '17 yrs', 'sandhya.pandey@mccmulund.ac.in', '/Degree College Teachers/Sandhya Pandey.png', 4);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 6, 'Mr.Siddhesh Gotekar', 'Assistant Professor', '—', 'SCT (School of Computing and Technology)', 'M.Sc.(IT)', '3 yrs', 'gotekarsiddhesh@gmail.com', '/Degree College Teachers/Siddhesh Gotekar.png', 5);
    END IF;
END $$;

DO $$
DECLARE
    prog_id UUID;
BEGIN
    SELECT id INTO prog_id FROM mcc_programmes WHERE slug = 'bsc-ds';
    IF prog_id IS NOT NULL THEN
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 1, 'Dr.Priti Pathak', 'Assistant Professor', 'DS Co-ordinator', 'Not Assigned', 'MSc(I.T).,MTech(I.T)., MBA(I.T).,LLB.,Diploma in Cyber Law., Ph.D.', '0 yrs', 'priti.pathak@mccmulund.ac.in', '/Degree College Teachers/Priti Pathak.png', 0);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 2, 'Dr.Vishal Borude', 'Assistant Professor', '—', 'Not Assigned', 'M.Sc.(IT).,Ph.D.', '0 yrs', 'vishal.borude@mccmulund.ac.in', '/Degree College Teachers/Vishal Borude.png', 1);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 3, 'Dr.Reena Nagda', 'Assistant Professor', 'SCT Co-ordinator', 'Not Assigned', 'M.Sc. Mathematics,NET,Ph.D.', '', 'reena.shah@mccmulund.ac.in', '', 2);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 4, 'Dr. Sandhya Pandey', 'Assistant Professor', '—', 'Not Assigned', 'M.C.A., P.H.D.(Computer Science and Application), M.A.(Sociology)', '', 'sandhya.pandey@mccmulund.ac.in', '/Degree College Teachers/Sandhya Pandey.png', 3);
        INSERT INTO program_faculty (programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order) VALUES (prog_id, 5, 'Mr.Siddhesh Gotekar', 'Assistant Professor', '—', 'Not Assigned', 'M.Sc.(IT)', '0 yrs', 'gotekarsiddhesh@gmail.com', '/Degree College Teachers/Siddhesh Gotekar.png', 4);
    END IF;
END $$;
