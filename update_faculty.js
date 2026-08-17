require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function run() {
  const { data, error } = await supabase.rpc('exec_sql', { sql: 'ALTER TABLE program_faculty ADD COLUMN IF NOT EXISTS areas_of_interest TEXT, ADD COLUMN IF NOT EXISTS publications_patents TEXT, ADD COLUMN IF NOT EXISTS bio TEXT, ADD COLUMN IF NOT EXISTS google_scholar_or_other TEXT;' });
  if (error) console.error(error);
  else console.log('success:', data);
}
run();
