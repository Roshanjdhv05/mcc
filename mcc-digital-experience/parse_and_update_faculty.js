const fs = require('fs');
const path = require('path');

const data = fs.readFileSync('faculty_data.txt', 'utf8');

const programs = {};
let currentProgram = null;
let currentFaculty = null;
let currentFacultyList = [];

const lines = data.split('\n');

for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line === 'School of Computing and Technology') {
        continue;
    }

    if (line.match(/^(Accountancy|Business Economics|Commerce|English|Environmental Studies|IKS|Law|Mathematics, Statistics and Computer Applications)$/)) {
        continue;
    }

    if (line.startsWith('Bachelor of ') || line.startsWith('Master of ')) {
        // Special case: we don't want to skip 'Bachelor of Commerce'
        if (currentProgram && currentFacultyList.length > 0) {
            programs[currentProgram] = currentFacultyList;
        }
        currentProgram = line;
        currentFacultyList = [];
        continue;
    }

    let nameMatch = line.match(/^(\d+\.\s*)?((Dr\.|Mr\.|Ms\.|Mrs\.)?\s*.*)$/i);
    if (nameMatch && !line.startsWith('Designation:') && !line.startsWith('Department:') && !line.startsWith('Education:') && !line.startsWith('Email:') && !line.startsWith('Teaching Exp') && !line.startsWith('About Me:')) {
        let name = nameMatch[2].trim();
        currentFaculty = { name, srNo: currentFacultyList.length + 1 };
        currentFacultyList.push(currentFaculty);
        continue;
    }

    if (currentFaculty) {
        if (line.startsWith('Designation:')) currentFaculty.additionalRole = line.replace('Designation:', '').trim();
        if (line.startsWith('Department:')) currentFaculty.department = line.replace('Department:', '').trim();
        if (line.startsWith('Education:')) currentFaculty.education = line.replace('Education:', '').trim();
        if (line.startsWith('Email:')) currentFaculty.email = line.replace('Email:', '').trim();
        if (line.startsWith('Teaching Exp.:')) currentFaculty.teachingExp = line.replace('Teaching Exp.:', '').trim();
    }
}

if (currentProgram && currentFacultyList.length > 0) {
    programs[currentProgram] = currentFacultyList;
}

const fileMapping = {
    'Bachelor of Commerce': ['bcom/BComPageClient.tsx']
};

const ugDir = path.join(__dirname, 'src', 'app', 'programmes', 'ug');

for (const [progName, facultyList] of Object.entries(programs)) {
    const relPaths = fileMapping[progName];
    if (!relPaths) {
        continue; // Only update BCom this time
    }

    for (const relPath of relPaths) {
        const fullPath = path.join(ugDir, relPath);
        if (!fs.existsSync(fullPath)) {
            console.log("File not found:", fullPath);
            continue;
        }

        let content = fs.readFileSync(fullPath, 'utf8');
        const regex = /const\s+\w+Faculty\s*=\s*\[([\s\S]*?)\];/;
        const match = content.match(regex);

        if (match) {
            const formattedList = facultyList.map(f => {
                let role = f.additionalRole || '—';
                let desig = 'Assistant Professor';
                if (role.toLowerCase() === 'assistant professor') {
                    desig = 'Assistant Professor';
                    role = '—';
                } else if (role.toLowerCase() === 'associate professor') {
                    desig = 'Associate Professor';
                    role = '—';
                } else if (role.toLowerCase().includes('principal')) {
                    desig = 'Principal';
                } else if (role.toLowerCase().includes('asst prof')) {
                    desig = 'Assistant Professor';
                    role = '—';
                }

                const safeName = f.name.replace(/'/g, "\\'");
                const safeRole = role.replace(/'/g, "\\'");
                const safeDesig = desig.replace(/'/g, "\\'");
                const safeDept = (f.department || 'Not Assigned').replace(/'/g, "\\'");
                const safeEdu = (f.education || '').replace(/'/g, "\\'");
                const safeEmail = (f.email || '').replace(/'/g, "\\'");
                const safeExp = (f.teachingExp || '').replace(/'/g, "\\'");

                return `  { srNo: ${f.srNo}, name: '${safeName}', additionalRole: '${safeRole}', designation: '${safeDesig}', department: '${safeDept}', education: '${safeEdu}', email: '${safeEmail}', teachingExp: '${safeExp}' }`;
            });

            const newArrayStr = `const ${match[0].split(' ')[1]} = [\n${formattedList.join(',\n')}\n];`;
            
            content = content.replace(regex, newArrayStr);
            fs.writeFileSync(fullPath, content);
            console.log(`Updated ${fullPath}`);
        } else {
            console.log(`Could not find faculty array in ${fullPath}`);
        }
    }
}
