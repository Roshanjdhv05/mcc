const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function run() {
  const { data: progs } = await supabase.from('mcc_programmes').select('id, slug, code');
  const file = 'src/app/programmes/ug/bcom/BComPageClient.tsx';
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/const\s+\w+Faculty\s*=\s*(\[[\s\S]*?\]);/);
  if (match) {
    try {
      let arrStr = match[1].replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":').replace(/'/g, '"').replace(/—/g, '-').replace(/\?"/g, '-').replace(/,\s*]/g, ']');
      const arr = JSON.parse(arrStr);
      const p = progs.find(p => p.slug === 'bcom');
      if (p) {
        const toInsert = arr.map((f, i) => ({ programme_id: p.id, name: f.name, designation: f.designation, additional_role: f.additionalRole, department: f.department, education: f.education, teaching_exp: f.teachingExp, email: f.email, image: f.image, display_order: i }));
        await supabase.from('program_faculty').delete().eq('programme_id', p.id);
        await supabase.from('program_faculty').insert(toInsert);
        console.log('Successfully seeded bcom');
      }
    } catch(e) {
      console.error('Failed to parse', e.message);
    }
  }
}
run();
