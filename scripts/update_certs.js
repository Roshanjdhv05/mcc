const fs = require('fs');
const path = require('path');

const dirs = [
  'c:/Users/hp/OneDrive/Desktop/MCC/mcc-digital-experience/src/app/forms',
  'c:/Users/hp/OneDrive/Desktop/MCC/mcc-digital-experience/src/app/administrative-service'
];

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Replace PTVA header
      content = content.replace(/<h1 className=\"font-bold text-\[(12px|13px)\] mb-0\.5\">PTVA'S MULUND COLLEGE OF COMMERCE \(AUTONOMOUS\)<\/h1>\r?\n\s*/g, '');
      
      // Replace NAME OF THE STUDENT/ALUMNI
      content = content.replace(
        /<p className=\"font-bold uppercase\">\{formData\.name \|\| '\(NAME OF THE STUDENT\/ALUMNI\)'\}<\/p>/g,
        `<p className=\"font-bold uppercase\">{formData.name || 'NAME OF THE STUDENT/ALUM'}</p>`
      );
      
      // Replace Phone No.
      content = content.replace(
        /<p>\(\{formData\.phone \|\| 'Phone No\. of the Student\/Alumni'\}\)<\/p>/g,
        `<p>{formData.phone || 'Phone No. of the Student/Alum'}</p>`
      );
      
      // Replace Email ID
      content = content.replace(
        /<p>\(\{formData\.email \|\| 'Email ID of the Student\/Alumni'\}\)<\/p>/g,
        `<p>{formData.email || 'Email ID of the Student/Alum'}</p>`
      );
      
      // Replace Signature block
      content = content.replace(
        /<p className=\"font-bold( mt-4)? mb-[35]\">Signature of approving authority:<\/p>/g,
        `<div className=\"flex justify-between font-bold mb-5\">\n                      <p>Signature of approving authority:</p>\n                      <p>Signature of the office personnel:</p>\n                    </div>`
      );
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated: ' + fullPath);
      }
    }
  }
}

dirs.forEach(processDir);
