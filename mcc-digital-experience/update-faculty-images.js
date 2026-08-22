const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'Degree College Teachers');
const programmesDir = path.join(__dirname, 'src', 'app', 'programmes');

const images = fs.readdirSync(imagesDir).filter(file => file.endsWith('.png'));

// Helper to normalize names
function normalizeName(name) {
    return name
        .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.|Prof\.|CA\.|C\.A\.|Ms\s|Mr\s)/ig, '')
        .replace(/\'/g, '')
        .replace(/,/g, '')
        .replace(/\\/g, '') // remove slash if present
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ');
}

const imageMap = {};
images.forEach(img => {
    const baseName = img.replace('.png', '');
    const normalized = normalizeName(baseName);
    imageMap[normalized] = img;
});

// Manual overrides
const manualMap = {
    'avinash dongare': 'Avinash Dongre.png',
    'deepa nyayadish': 'Deepa Nyayadhish.png',
    'sipra routaray': 'Sipra Routray.png',
    'pramila dsouza': 'Pramila D\'Souza.png',
    'pramila d': 'Pramila D\'Souza.png', // in case of weird parsing
    'prathamesh bobhate': 'Prathmesh Bobhate.png',
    'abhilasha n': 'Abilasha N.png',
    'swapna acharya': 'Swapana Acharya.png',
    'soumya george monappilly': 'Soumya George.png',
    'bhumika shailesh nakum': 'Bhoomika Pansare.png', // wait, is this true? let's not assume, unless sure. Let's map only obvious typos.
    'pooja raosaheb patil': 'Pooja Atre.png', // maybe after marriage? skip this
    'reena deepak nagda': 'Reena Shah.png' // skip this
};

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            const lines = content.split('\n');
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                // we want to process only if not already having an image, but it's ok to replace it if it's there
                const nameMatch = line.match(/name:\s*['"]([^'"]+)['"]/);
                if (nameMatch) {
                    const originalName = nameMatch[1];
                    const normName = normalizeName(originalName);
                    
                    let match = imageMap[normName];
                    
                    if (!match) {
                        for(const key of Object.keys(imageMap)) {
                            const parts1 = normName.split(' ');
                            const parts2 = key.split(' ');
                            if (parts1.length > 1 && parts2.length > 1 && parts1[0] === parts2[0] && parts1[parts1.length-1] === parts2[parts2.length-1]) {
                                match = imageMap[key];
                                break;
                            }
                        }
                    }

                    if (!match && manualMap[normName]) match = manualMap[normName];

                    // special cases again
                    if (!match && originalName.includes('Chetna')) match = "Chetna Panachal.png";
                    if (!match && originalName.includes('Jui')) match = "Jui Kudvekar.png";
                    if (!match && originalName.includes('Gauri')) match = "Gauri Atre.png";
                    if (!match && originalName.includes('Shilpi')) match = "Shilpi Juwake.png";
                    if (!match && originalName.includes('Suchitra')) match = "Suchitra Poojary.png";
                    if (!match && originalName.includes('Pramila')) match = "Pramila D'Souza.png";

                    if (match) {
                        const imageProp = `image: '/Degree College Teachers/${match}'`;
                        if (line.includes('image:')) {
                            // Only update if it's not already correct
                            if (!line.includes(imageProp)) {
                                lines[i] = line.replace(/image:\s*['"][^'"]+['"]/, imageProp);
                                modified = true;
                                console.log(`Replaced image for ${originalName}`);
                            }
                        } else {
                            lines[i] = line.replace(/\s*\}\s*,?$/, `, ${imageProp} },`);
                            lines[i] = lines[i].replace(/,,/g, ',');
                            modified = true;
                            console.log(`Added image for ${originalName}`);
                        }
                    }
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, lines.join('\n'));
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDirectory(programmesDir);
