const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data: progs } = await supabase.from('mcc_programmes').select('id, slug, code');
  const files = [];
  function getFiles(dir) {
    fs.readdirSync(dir).forEach(f => {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) getFiles(p);
      else if (p.endsWith('PageClient.tsx') || p.endsWith('page.tsx')) files.push(p);
    });
  }
  getFiles('./src/app/programmes');
  let count = 0;
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const match = content.match(/const\s+\w+Faculty\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
      try {
        let arrStr = match[1]
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
          .replace(/'/g, '"')
          .replace(/—/g, '-')
          .replace(/\?"/g, '-')
          .replace(/,\s*]/g, ']');
        const arr = JSON.parse(arrStr);
        const slugMatch = file.toLowerCase().match(/\\ug\\([a-zA-Z0-9_-]+)\\/) || file.toLowerCase().match(/\\pg\\([a-zA-Z0-9_-]+)\\/);
        let slug = slugMatch ? slugMatch[1] : null;
        if (slug === 'sct') slug = file.toLowerCase().match(/\\sct\\([a-zA-Z0-9_-]+)\\/)?.[1];
        if (slug) {
          const p = progs.find(p => p.slug === slug || p.code?.toLowerCase() === slug);
          if (p) {
            console.log('Found', arr.length, 'faculty for', p.slug);
            const toInsert = arr.map((f, i) => ({
              programme_id: p.id, name: f.name, designation: f.designation,
              additional_role: f.additionalRole, department: f.department,
              education: f.education, teaching_exp: f.teachingExp, email: f.email,
              image: f.image, display_order: i
            }));
            await supabase.from('program_faculty').delete().eq('programme_id', p.id);
            const { error } = await supabase.from('program_faculty').insert(toInsert);
            if (error) console.error('Error inserting for', p.slug, error);
            else count++;
          }
        }
      } catch(e) {
        console.error('Failed to parse in', file, e.message);
      }
    }
  }
  console.log('Successfully seeded faculty for', count, 'programmes');
}
run();
