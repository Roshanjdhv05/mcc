ALTER TABLE public.program_overview ADD COLUMN IF NOT EXISTS activities_intros JSONB DEFAULT '[]'::jsonb;
