const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) env[parts[0].trim()] = parts.slice(1).join('=').trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SEED_DATA = [
  { slug: 'objective', name: 'Objective', category: 'About & Committee', display_order: 1 },
  { slug: 'committee-members', name: 'Committee – List of Members', category: 'About & Committee', display_order: 2 },
  { slug: 'annual-reports', name: 'Annual Reports', category: 'About & Committee', display_order: 3 },
  { slug: 'research-centre-recognition', name: 'Research Centre Recognition', category: 'Research Centre', display_order: 4 },
  { slug: 'research-guides', name: 'Research Guides', category: 'Research Centre', display_order: 5 },
  { slug: 'research-scholars', name: 'Research Scholars', category: 'Research Centre', display_order: 6 },
  { slug: 'awarded-thesis', name: 'Awarded Thesis', category: 'Research Centre', display_order: 7 },
  { slug: 'application-process', name: 'Application (Process)', category: 'Research Centre', display_order: 8 },
  { slug: 'research-policy', name: 'Research Policy', category: 'Policies', display_order: 9 },
  { slug: 'plagiarism-policy', name: 'Plagiarism Policy', category: 'Policies', display_order: 10 },
  { slug: 'application-plagiarism-check', name: 'Application for Plagiarism check', category: 'Policies', display_order: 11 },
  { slug: 'avishkar', name: 'Avishkar (University of Mumbai)', category: 'Competitions', display_order: 12 },
  { slug: 'shodh', name: 'Shodh (Inter-collegiate)', category: 'Competitions', display_order: 13 },
  { slug: 'ptva-conclave', name: "PTVA's Inter-institutional Conclave", category: 'Competitions', display_order: 14 },
  { slug: 'about-journal', name: 'About the Journal', category: 'Research Journal', display_order: 15 },
  { slug: 'board-of-editors', name: 'Board of Editors', category: 'Research Journal', display_order: 16 },
  { slug: 'volume-and-issues', name: 'Volume and Issues', category: 'Research Journal', display_order: 17 },
  { slug: 'resources', name: 'Resources', category: 'Research Journal', display_order: 18 }
];

async function seed() {
  console.log("Seeding data...");
  const { data, error } = await supabase.from('mcc_research').insert(SEED_DATA).select();
  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log(`Success! Inserted ${data.length} rows.`);
  }
}
seed();
