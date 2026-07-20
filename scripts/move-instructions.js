const fs = require('fs');
const path = require('path');

const formsDir = 'c:/Users/hp/OneDrive/Desktop/MCC/mcc-digital-experience/src/app/forms';
const formsToUpdate = [
  'bonafide-certificate',
  'character-certificate',
  'transfer-certificate',
  'migration-certificate',
  'duplicate-marksheet',
  'caste-validity',
  'form-112-attestation'
];

for (const form of formsToUpdate) {
  const filePath = path.join(formsDir, form, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Find the instructions panel
    const startIdx = content.indexOf('        {/* Instructions Panel */}');
    if (startIdx === -1) {
       console.log('No instructions panel found for ' + form);
       continue;
    }
    
    // Find the end of the instructions panel (just before the grid)
    const endStr = '        <div className=\"grid grid-cols-1 lg:grid-cols-12 gap-6\">';
    const endIdx = content.indexOf(endStr);
    
    if (endIdx !== -1) {
      const instructionsPanel = content.substring(startIdx, endIdx);
      
      // Remove it from the original location
      content = content.slice(0, startIdx) + content.slice(endIdx);
      
      // We want to insert it after the end of the grid. 
      // The grid ends right before the second to last </div> in the file.
      // So we can find the end of the Live Preview column:
      //           </div>
      //
      //         </div>
      const searchRegExp = /          <\/div>\r?\n\r?\n        <\/div>/;
      const match = content.match(searchRegExp);
      
      if (match) {
         const insertPos = match.index + match[0].length;
         content = content.slice(0, insertPos) + '\n\n' + instructionsPanel.trimEnd() + '\n' + content.slice(insertPos);
         fs.writeFileSync(filePath, content);
         console.log('Successfully updated ' + form);
      } else {
         console.log('Could not find insertion point for ' + form);
      }
    }
  }
}
