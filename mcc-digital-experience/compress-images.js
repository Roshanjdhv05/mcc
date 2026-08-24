const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SOURCE_DIR = "./public";
const BACKUP_DIR = "./public-backup-" + Date.now();
const TARGET_SIZE_KB = 300;
const TARGET_BYTES = TARGET_SIZE_KB * 1024;
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

let totalBefore = 0;
let totalAfter = 0;
let processedCount = 0;
let skippedCount = 0;
const report = [];

function walk(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

function backupFile(srcPath) {
  const relative = path.relative(SOURCE_DIR, srcPath);
  const backupPath = path.join(BACKUP_DIR, relative);
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.copyFileSync(srcPath, backupPath);
}

async function compressFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!IMAGE_EXTENSIONS.includes(ext)) {
    skippedCount++;
    return;
  }

  const beforeSize = fs.statSync(filePath).size;
  if (beforeSize <= TARGET_BYTES) {
    skippedCount++;
    return; // Already small enough
  }

  backupFile(filePath);

  try {
    const inputBuffer = fs.readFileSync(filePath);
    let image = sharp(inputBuffer);
    const metadata = await image.metadata();
    
    let currentWidth = metadata.width;
    let quality = 80;
    let buffer = inputBuffer;
    
    // Iteratively compress
    while (buffer.length > TARGET_BYTES && quality >= 20 && currentWidth >= 400) {
      let pipeline = sharp(inputBuffer).resize({
        width: currentWidth,
        withoutEnlargement: true,
      });

      if (ext === ".jpg" || ext === ".jpeg") {
        buffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
      } else if (ext === ".png") {
        buffer = await pipeline.png({ quality, compressionLevel: 9, palette: true }).toBuffer();
      } else if (ext === ".webp") {
        buffer = await pipeline.webp({ quality }).toBuffer();
      }
      
      if (buffer.length > TARGET_BYTES) {
        if (quality > 40) {
          quality -= 10;
        } else {
          currentWidth = Math.floor(currentWidth * 0.8);
        }
      }
    }

    if (buffer.length < beforeSize && buffer.length <= TARGET_BYTES * 1.05) { // allowing up to 5% margin if it can't perfectly hit 300kb
      fs.writeFileSync(filePath, buffer);
      const afterSize = buffer.length;
      totalBefore += beforeSize;
      totalAfter += afterSize;
      processedCount++;
      report.push({
        file: path.relative(SOURCE_DIR, filePath),
        beforeKB: (beforeSize / 1024).toFixed(0),
        afterKB: (afterSize / 1024).toFixed(0),
        savedPercent: (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1),
      });
    } else {
      skippedCount++;
    }
  } catch (err) {
    console.error(`FAILED on ${filePath}:`, err.message);
    skippedCount++;
  }
}

async function main() {
  console.log(`Backing up and compressing images in ${SOURCE_DIR} to <= ${TARGET_SIZE_KB}KB...`);
  console.log(`Originals will be preserved in ${BACKUP_DIR}\n`);

  const files = [];
  walk(SOURCE_DIR, (f) => files.push(f));

  for (const file of files) {
    await compressFile(file);
  }

  console.log("\n=== Compression report ===");
  report
    .sort((a, b) => b.beforeKB - a.beforeKB)
    .forEach((r) => {
      console.log(
        `${r.file}: ${r.beforeKB}KB -> ${r.afterKB}KB (-${r.savedPercent}%)`
      );
    });

  console.log(`\nProcessed: ${processedCount} files`);
  console.log(`Skipped (already <= ${TARGET_SIZE_KB}KB or error): ${skippedCount} files`);
  console.log(
    `Total size of processed files: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`
  );
  console.log(`Originals safely backed up at: ${BACKUP_DIR}`);
}

main();
