require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const now = new Date().toISOString();
  console.log('Current time:', now);

  const { data, error } = await s
    .from('examination_documents')
    .select('id,title,category,schedule_time,notice_expiry_time,file_url,courses')
    .lte('schedule_time', now)
    .or(`notice_expiry_time.is.null,notice_expiry_time.gt.${now}`)
    .order('schedule_time', { ascending: false });

  if (error) {
    console.error('ERROR:', error);
  } else {
    console.log('Total exam docs that should show on /notices:', data.length);
    data.forEach(d => {
      console.log(`- [${d.category}] "${d.title}" | schedule: ${d.schedule_time} | expiry: ${d.notice_expiry_time} | file: ${d.file_url ? 'YES' : 'MISSING'}`);
    });
  }
}
run();
