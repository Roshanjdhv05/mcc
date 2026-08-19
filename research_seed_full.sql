-- ============================================================
-- MCC Research Full Seed  
-- Run this in Supabase SQL Editor
-- ============================================================

-- Step 1: Ensure table exists (safe to run even if it does)
CREATE TABLE IF NOT EXISTS public.mcc_research (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL,
  content jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 2: Disable RLS so the site can read/write
ALTER TABLE public.mcc_research DISABLE ROW LEVEL SECURITY;

-- Step 3: Clear existing data and re-seed with full content
TRUNCATE TABLE public.mcc_research;

-- Step 4: Insert all sections with full content
INSERT INTO public.mcc_research (slug, name, category, display_order, content) VALUES

-- ── About & Committee ──────────────────────────────────────────────────
('objective', 'Objective', 'About & Committee', 1,
'{
  "about": "Goals and primary objectives driving research within the institution.\nWe aim to foster a culture of innovation, critical thinking, and advanced research methodologies among students and faculty members alike. Our primary objective is to contribute to global knowledge while addressing local and national challenges through rigorous academic inquiry.",
  "objectives_activities": []
}'::jsonb),

('committee-members', 'Committee – List of Members', 'About & Committee', 2,
'{
  "about": "Research Assessment, Promotion & Ethics Committee 2026-27",
  "committee": [
    {"name": "Dr. Rajashri Deshpande", "role": "Chairperson", "phone": "", "email": ""},
    {"name": "Dr. Arjun Lakhe", "role": "Member", "phone": "", "email": ""},
    {"name": "Dr. Shayeree Ghosh", "role": "Member", "phone": "", "email": ""},
    {"name": "Dr. Jyotika Chheda", "role": "Member", "phone": "", "email": ""},
    {"name": "Dr. Knachana Sattur", "role": "Member", "phone": "", "email": ""},
    {"name": "Dr. Sandhya Pandey", "role": "Member", "phone": "", "email": ""}
  ]
}'::jsonb),

('annual-reports', 'Annual Reports', 'About & Committee', 3,
'{
  "important_documents": [
    {"title": "Annual Research Report 2024-2025", "url": ""},
    {"title": "Annual Research Report 2023-2024", "url": ""},
    {"title": "Annual Research Report 2022-2023", "url": ""}
  ]
}'::jsonb),

-- ── Research Centre ────────────────────────────────────────────────────
('research-centre-recognition', 'Research Centre Recognition', 'Research Centre', 4,
'{
  "about": "The Research Centre for PhD in Commerce specializes in Business Economics, fostering a culture of innovation and scholarly inquiry. Established in 2014, our center aims to contribute significantly to research and academic advancement.",
  "stats": [
    {"label": "Established", "value": "2014"},
    {"label": "Guides", "value": "2"},
    {"label": "Students", "value": "11"},
    {"label": "PhD Awarded", "value": "5"}
  ]
}'::jsonb),

('research-guides', 'Research Guides', 'Research Centre', 5,
'{
  "committee": [
    {"name": "Dr. Parvathi Venkatesh", "role": "Research Guide", "phone": "", "email": ""},
    {"name": "Dr. Shivaji Pawar", "role": "Research Guide", "phone": "", "email": ""}
  ]
}'::jsonb),

('research-scholars', 'Research Scholars', 'Research Centre', 6,
'{
  "scholars": [
    {"guide": "Dr. Parvathi Venkatesh", "name": "Dr. Shivaji Pawar", "topic": "Towards a Sustainable Society: The Role of the Self-help Group as a Catalyst for Economic Stability with special reference to SHGs in Maharashtra.", "status": "Awarded"},
    {"guide": "Dr. Parvathi Venkatesh", "name": "Dr. Vijayalaxmi Kannan", "topic": "Mapping of Customer Experience and its impact on Customer Lifetime Value: A study of Agglomerated Retail Stores in Thane and Mulund Cities", "status": "Awarded"},
    {"guide": "Dr. Parvathi Venkatesh", "name": "Dr. Sulbha Dey", "topic": "Impact of Green Policies and Practices on Economic Performance of Green Organized Retailers in Mumbai in 2020", "status": "Awarded"},
    {"guide": "Dr. Parvathi Venkatesh", "name": "Mrs. Riya Dhamapurkar", "topic": "An Assessment of Revenue and Expenditure Pattern of Municipal Corporation in Maharashtra – With Special reference to Municipal Corporation of Greater Mumbai (MCGM), Mumbai.", "status": "Thesis submitted"},
    {"guide": "Dr. Shivaji Pawar", "name": "Dr. Shilpi Deepak Jawake", "topic": "A study of consumer buying intention of Green Product in FMCG sector", "status": "Awarded"},
    {"guide": "Dr. Shivaji Pawar", "name": "Dr. Chetan Mahesh Panchal", "topic": "A Study on Socio-Economic Condition of Fishermen in Mumbai Metropolitan Region", "status": "Awarded"},
    {"guide": "Dr. Shivaji Pawar", "name": "Ms. Pradnya Uddhav Rao Garad", "topic": "Impact Of Bank Merger on Customers and Employees in Thane Region: A Case Study of Merging of Andhra And Corporation Bank in Union Bank of India", "status": "Thesis submitted"},
    {"guide": "Dr. Shivaji Pawar", "name": "Ms. Shrusti Desai", "topic": "A Critical Appraisal of Mumbai Suburban Railway''s SDG-13 Initiatives and Its Impact on Their Economic Performance.", "status": "Work in Progress"},
    {"guide": "Dr. Shivaji Pawar", "name": "Ms. Esha Jhaveri", "topic": "An Analysis of Financial Inclusion and Economic Mobility of Gig Workers in the Mumbai Region", "status": "Work in Progress"},
    {"guide": "Dr. Shivaji Pawar", "name": "Ms. Snehal Pandurang Chavan", "topic": "An Evaluation of the Impact of Farmer Producer Organizations on Socio-Economic Empowerment of Cash Crop Farmers in Nashik District", "status": "Work in Progress"},
    {"guide": "Dr. Shivaji Pawar", "name": "Ms. Gopika M. Pal", "topic": "Measuring the Level of Socio-Economic Vulnerability of Construction Workers in the Unorganised Sector in Thane District", "status": "Work in Progress"}
  ]
}'::jsonb),

('awarded-thesis', 'Awarded Thesis', 'Research Centre', 7,
'{
  "scholars": [
    {"guide": "Dr. Parvathi Venkatesh", "name": "Dr. Shivaji Pawar", "topic": "Towards a Sustainable Society: The Role of the Self-help Group as a Catalyst for Economic Stability with special reference to SHGs in Maharashtra.", "status": "Awarded"},
    {"guide": "Dr. Parvathi Venkatesh", "name": "Dr. Vijayalaxmi Kannan", "topic": "Mapping of Customer Experience and its impact on Customer Lifetime Value: A study of Agglomerated Retail Stores in Thane and Mulund Cities", "status": "Awarded"},
    {"guide": "Dr. Parvathi Venkatesh", "name": "Dr. Sulbha Dey", "topic": "Impact of Green Policies and Practices on Economic Performance of Green Organized Retailers in Mumbai in 2020", "status": "Awarded"},
    {"guide": "Dr. Parvathi Venkatesh", "name": "Mrs. Riya Dhamapurkar", "topic": "An Assessment of Revenue and Expenditure Pattern of Municipal Corporation in Maharashtra.", "status": "Thesis submitted"},
    {"guide": "Dr. Shivaji Pawar", "name": "Dr. Shilpi Deepak Jawake", "topic": "A study of consumer buying intention of Green Product in FMCG sector", "status": "Awarded"},
    {"guide": "Dr. Shivaji Pawar", "name": "Dr. Chetan Mahesh Panchal", "topic": "A Study on Socio-Economic Condition of Fishermen in Mumbai Metropolitan Region", "status": "Awarded"},
    {"guide": "Dr. Shivaji Pawar", "name": "Ms. Pradnya Uddhav Rao Garad", "topic": "Impact Of Bank Merger on Customers and Employees in Thane Region", "status": "Thesis submitted"}
  ]
}'::jsonb),

('application-process', 'Application (Process)', 'Research Centre', 8,
'{
  "about": "To apply for a PhD program at the Research Centre, candidates must follow the University of Mumbai guidelines. Please ensure you have cleared PET or hold an M.Phil/NET/SET qualification.",
  "objectives_activities": [
    {"type": "point", "content": "Check eligibility according to university standards."},
    {"type": "point", "content": "Prepare a preliminary research proposal."},
    {"type": "point", "content": "Submit the application form along with required documents to the center."},
    {"type": "point", "content": "Attend the interview/presentation session scheduled by the committee."}
  ]
}'::jsonb),

-- ── Policies ───────────────────────────────────────────────────────────
('research-policy', 'Research Policy', 'Policies', 9,
'{
  "about": "Our Research Policy provides a framework for conducting ethical, high-quality research. It outlines the responsibilities of researchers, support systems provided by the institution, and guidelines for publications and intellectual property.",
  "important_documents": [
    {"title": "Research Policy Document", "url": ""}
  ]
}'::jsonb),

('plagiarism-policy', 'Plagiarism Policy', 'Policies', 10,
'{
  "about": "The Plagiarism Policy strictly prohibits the unauthorized use of another''s ideas, words, or data without proper attribution. All research submitted must pass stringent similarity checks using university-approved software.",
  "objectives_activities": [
    {"type": "point", "content": "Zero Tolerance: Strict disciplinary action against intentional academic misconduct."},
    {"type": "point", "content": "Permissible Limit: Similarity index must be below 10% excluding standard exclusions."}
  ],
  "important_documents": [
    {"title": "Plagiarism Policy Document", "url": ""}
  ]
}'::jsonb),

('application-plagiarism-check', 'Application for Plagiarism check', 'Policies', 11,
'{
  "about": "To request a formal plagiarism check for your thesis, dissertation, or research paper, please fill out the application form and submit it to the Research Committee office along with your document in digital format.",
  "objectives_activities": [
    {"type": "point", "content": "Download the Application Form below."},
    {"type": "point", "content": "Fill it completely and get it signed by your assigned Research Guide."},
    {"type": "point", "content": "Submit the soft copy of your document (Word/PDF without bibliography/references) via email to the library."}
  ],
  "important_documents": [
    {"title": "Application Form for Plagiarism Check", "url": ""}
  ]
}'::jsonb),

-- ── Competitions ───────────────────────────────────────────────────────
('avishkar', 'Avishkar (University of Mumbai)', 'Competitions', 12,
'{
  "about": "Initiated by the Honorable Governor of Maharashtra, Avishkar is a premier research convention designed to develop a research culture and scientific temper among students. Students from UG, PG, and PhD levels present their innovative ideas and projects at this prestigious university-level competition.",
  "objectives_activities": [
    {"type": "point", "content": "Open For: UG, PG, Post-PG & PhD Students"},
    {"type": "point", "content": "Frequency: Annual Event"},
    {"type": "point", "content": "Level: University & State Level"}
  ]
}'::jsonb),

('shodh', 'Shodh (Inter-collegiate)', 'Competitions', 13,
'{
  "about": "Shodh is an inter-collegiate research competition that provides a platform for budding researchers to showcase their talents. It encourages students from various disciplines across colleges to present their original research, engage in academic discourse, and receive valuable feedback from experts in the field.",
  "objectives_activities": [
    {"type": "point", "content": "Cross-disciplinary project presentations"},
    {"type": "point", "content": "Expert jury panel from academia and industry"},
    {"type": "point", "content": "Cash prizes and certificates for winners"}
  ]
}'::jsonb),

('ptva-conclave', 'PTVA''s Inter-institutional Conclave', 'Competitions', 14,
'{
  "about": "An exclusive conclave bringing together researchers, faculties, and students from all PTVA sister institutions. The event focuses on collaborative research, addressing contemporary socio-economic challenges, and fostering a strong intra-institutional research network."
}'::jsonb),

-- ── Research Journal ───────────────────────────────────────────────────
('about-journal', 'About the Journal', 'Research Journal', 15,
'{
  "about": "The MCC Research Journal is a peer-reviewed, bi-annual academic journal dedicated to publishing high-quality research papers, review articles, and case studies across multidisciplinary domains. It serves as a platform for academicians, researchers, and students to disseminate their scholarly findings.",
  "objectives_activities": [
    {"type": "point", "content": "Frequency: Bi-annual"},
    {"type": "point", "content": "Format: Print & Online"},
    {"type": "point", "content": "Peer Review: Double-blind"},
    {"type": "point", "content": "ISSN: XXXX-XXXX"}
  ]
}'::jsonb),

('board-of-editors', 'Board of Editors', 'Research Journal', 16,
'{
  "committee": [
    {"name": "Dr. Rajashri Deshpande", "role": "Chief Editor", "phone": "", "email": ""},
    {"name": "Dr. Arjun Lakhe", "role": "Co-Editor", "phone": "", "email": ""},
    {"name": "Dr. Shayeree Ghosh", "role": "Associate Editor", "phone": "", "email": ""},
    {"name": "Dr. Jyotika Chheda", "role": "Associate Editor", "phone": "", "email": ""}
  ]
}'::jsonb),

('volume-and-issues', 'Volume and Issues', 'Research Journal', 17,
'{
  "volumes": [
    {"title": "Volume 5, Issue 2", "date": "December 2024", "url": ""},
    {"title": "Volume 5, Issue 1", "date": "June 2024", "url": ""},
    {"title": "Volume 4, Issue 2", "date": "December 2023", "url": ""},
    {"title": "Volume 4, Issue 1", "date": "June 2023", "url": ""}
  ]
}'::jsonb),

('resources', 'Resources', 'Research Journal', 18,
'{
  "important_documents": [
    {"title": "Paper Submission Template", "url": ""},
    {"title": "UGC CARE List", "url": "https://ugccare.unipune.ac.in/"}
  ]
}'::jsonb);

-- Done! All 18 research pages are seeded with full content.
