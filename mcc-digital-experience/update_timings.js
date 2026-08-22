const fs = require("fs");
const path = require("path");

const basePath = "c:/Users/hp/OneDrive/Desktop/MCC/mcc-digital-experience/src/app/programmes";

const updates = [
  { matchFiles: ["ug/bcom/BComPageClient.tsx", "ug/bcom/page.tsx"], timing: "7:15 AM to 10:40 AM", intake: "600" },
  { matchFiles: ["ug/baf/BAFPageClient.tsx", "ug/baf/page.tsx"], timing: "7:15 AM to 11:40 AM", intake: "120" },
  { matchFiles: ["ug/bbi/BBIPageClient.tsx", "ug/bbi/page.tsx"], timing: "7:15 AM to 11:40 AM", intake: "160" },
  { matchFiles: ["ug/sct/bsc-cs/page.tsx"], timing: "7:15 AM to 11:40 AM", intake: "120" },
  { matchFiles: ["ug/bms/BMSPageClient.tsx", "ug/bms/page.tsx", "ug/bcom-ms/page.tsx"], timing: "12:00 PM to 4:30 PM", intake: "120" },
  { matchFiles: ["ug/bba/BBAPageClient.tsx", "ug/bba/page.tsx", "ug/bcom-ba/page.tsx"], timing: "12:00 PM to 4:30 PM", intake: "60" },
  { matchFiles: ["ug/bfm/BFMPageClient.tsx", "ug/bfm/page.tsx"], timing: "12:00 PM to 4:30 PM", intake: "60" },
  { matchFiles: ["ug/ba-mmc/page.tsx"], timing: "12:00 PM to 4:30 PM", intake: "60" },
  { matchFiles: ["ug/bscit/BScITPageClient.tsx", "ug/bscit/page.tsx", "ug/sct/bsc-it/page.tsx"], timing: "10:40 AM to 4:15 PM", intake: "120" },
  { matchFiles: ["ug/bca/BCAPageClient.tsx", "ug/bca/page.tsx", "ug/sct/bsc-ca/page.tsx"], timing: "2:05 PM to 8:10 PM", intake: "60" },
  { matchFiles: ["ug/ds/DSPageClient.tsx", "ug/ds/page.tsx", "ug/sct/bsc-ds/page.tsx"], timing: "2:05 PM to 8:10 PM", intake: "60" },
  { matchFiles: ["pg/mcom-aa/MComAAPageClient.tsx", "pg/mcom-aa/page.tsx"], timing: "5:30 PM to 8:30 PM", intake: "80" },
  { matchFiles: ["pg/mcom-bm/MComBMPageClient.tsx", "pg/mcom-bm/page.tsx"], timing: "5:30 PM to 8:30 PM", intake: "60" },
  { matchFiles: ["pg/mcom-bf/MComBFPageClient.tsx", "pg/mcom-bf/page.tsx"], timing: "5:30 PM to 8:30 PM", intake: "60" }
];

updates.forEach(u => {
  u.matchFiles.forEach(subPath => {
    const fullPath = path.join(basePath, subPath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, "utf-8");
      let changed = false;

      // Update timing prop for PGCourseTemplate
      if (/timing="[^"]*"/.test(content)) {
        content = content.replace(/timing="[^"]*"/, `timing="${u.timing}"`);
        changed = true;
      }

      // Update seats prop for PGCourseTemplate
      if (/seats="[^"]*"/.test(content)) {
        content = content.replace(/seats="[^"]*"/, `seats="${u.intake}"`);
        changed = true;
      }
      
      // Update quickActionsData for Timing
      // Match { title: 'Timing', ... info: 'Morning Batches.' }
      if (/\{\s*title:\s*['"]Timings?['"][\s\S]*?info:\s*['"][^'"]*['"]/.test(content)) {
        content = content.replace(/(\{\s*title:\s*['"]Timings?['"][\s\S]*?info:\s*['"])[^'"]*(['"])/, `$1${u.timing}$2`);
        changed = true;
      }

      // Update quickActionsData for Intake Capacity
      if (/\{\s*title:\s*['"]Intake Capacity['"][\s\S]*?info:\s*['"][^'"]*['"]/.test(content)) {
        content = content.replace(/(\{\s*title:\s*['"]Intake Capacity['"][\s\S]*?info:\s*['"])[^'"]*(['"])/, `$1${u.intake} Seats$2`);
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, "utf-8");
        console.log(`Updated ${subPath}`);
      } else {
        console.log(`No match in ${subPath}`);
      }
    }
  });
});
console.log("Done.");
