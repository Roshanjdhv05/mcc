-- Drop the table if it already exists to start fresh
DROP TABLE IF EXISTS public.mcc_research;

-- Create the mcc_research table
CREATE TABLE public.mcc_research (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL,
  content jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  display_order integer NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_mcc_research_mod_time()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mcc_research_mod_time
    BEFORE UPDATE
    ON public.mcc_research
    FOR EACH ROW
EXECUTE PROCEDURE update_mcc_research_mod_time();

-- Insert seed data
INSERT INTO public.mcc_research (slug, name, category, display_order) VALUES
-- About & Committee
('objective', 'Objective', 'About & Committee', 1),
('committee-members', 'Committee – List of Members', 'About & Committee', 2),
('annual-reports', 'Annual Reports', 'About & Committee', 3),

-- Research Centre
('research-centre-recognition', 'Research Centre Recognition', 'Research Centre', 4),
('research-guides', 'Research Guides', 'Research Centre', 5),
('research-scholars', 'Research Scholars', 'Research Centre', 6),
('awarded-thesis', 'Awarded Thesis', 'Research Centre', 7),
('application-process', 'Application (Process)', 'Research Centre', 8),

-- Policies
('research-policy', 'Research Policy', 'Policies', 9),
('plagiarism-policy', 'Plagiarism Policy', 'Policies', 10),
('application-plagiarism-check', 'Application for Plagiarism check', 'Policies', 11),

-- Competitions
('avishkar', 'Avishkar (University of Mumbai)', 'Competitions', 12),
('shodh', 'Shodh (Inter-collegiate)', 'Competitions', 13),
('ptva-conclave', 'PTVA''s Inter-institutional Conclave', 'Competitions', 14),

-- Research Journal
('about-journal', 'About the Journal', 'Research Journal', 15),
('board-of-editors', 'Board of Editors', 'Research Journal', 16),
('volume-and-issues', 'Volume and Issues', 'Research Journal', 17),
('resources', 'Resources', 'Research Journal', 18);
