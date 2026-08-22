const fs = require('fs');
const path = require('path');
const rootDir = 'src/app/programmes/ug';
const dirs = ['baf', 'bammc', 'bba', 'bbi', 'bca', 'bcom', 'bcom-ba', 'bcom-ms', 'bfm', 'bfsi', 'bms', 'bscit', 'ds', 'sct/bsc-ca', 'sct/bsc-cs', 'sct/bsc-ds', 'sct/bsc-it'];
let results = [];
dirs.forEach(d => {
  const p = path.join(rootDir, d);
  let files = fs.readdirSync(p);
  let clientFile = files.find(f => f.includes('Client.tsx'));
  let pageFile = files.find(f => f === 'page.tsx');
  let targetFile = clientFile ? path.join(p, clientFile) : (pageFile ? path.join(p, pageFile) : null);
  if(targetFile) {
    let content = fs.readFileSync(targetFile, 'utf8');
    let titleMatch = content.match(/title=[\"'](.*?)[\"']/);
    let titleMatch2 = content.match(/title=\{[\"'\`](.*?)[\"'\`]\}/);
    let keyMatch = content.match(/courseKey=[\"'](.*?)[\"']/);
    let shortMatch = content.match(/shortInfo=[\"'](.*?)[\"']/);
    if(titleMatch || titleMatch2 || keyMatch) {
      results.push({
        course_key: keyMatch ? keyMatch[1] : d.toUpperCase().replace('-', '_'),
        title: titleMatch ? titleMatch[1] : (titleMatch2 ? titleMatch2[1] : d.toUpperCase()),
        short_info: shortMatch ? shortMatch[1] : '',
        category: 'Undergraduate',
        funding_type: 'Self Financing',
        overview_content: [],
        programme_snapshot: [],
        faculty_data: [],
        alumni_data: [],
        festivals_tab_name: '',
        publication_tab_name: ''
      });
    }
  }
});
fs.writeFileSync('src/lib/defaultProgrammesData.json', JSON.stringify(results, null, 2));
console.log('Extraction complete');
