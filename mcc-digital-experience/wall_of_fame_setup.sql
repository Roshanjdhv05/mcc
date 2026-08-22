-- Run this script in your Supabase SQL editor

CREATE TYPE wall_of_fame_category AS ENUM (
  'Professional Courses',
  'Culturals',
  'Sports',
  'Research',
  'Entrepreneurship',
  'Academics'
);

CREATE TABLE IF NOT EXISTS public.mcc_wall_of_fame (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name text,
  description text,
  category wall_of_fame_category NOT NULL,
  image_url text NOT NULL,
  expiry_date date,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup RLS
ALTER TABLE public.mcc_wall_of_fame ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to mcc_wall_of_fame"
ON public.mcc_wall_of_fame
FOR SELECT
USING (true);

-- Allow all writes (superadmin writes via anon key — tighten for production)
CREATE POLICY "Allow all writes to mcc_wall_of_fame"
ON public.mcc_wall_of_fame
FOR ALL
USING (true)
WITH CHECK (true);
