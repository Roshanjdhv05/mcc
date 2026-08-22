const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputImage = path.join(__dirname, '../public/mcclogo.png');
const outputDir = path.join(__dirname, '../public/icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [192, 256, 384, 512];

async function generateIcons() {
  try {
    for (const size of sizes) {
      await sharp(inputImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 } // White background for the JPG logo
        })
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
      console.log(`Generated icon-${size}x${size}.png`);
    }

    // Apple Touch Icon (180x180)
    await sharp(inputImage)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log('Generated apple-touch-icon.png');

    // Maskable Icon (512x512 with safe zone padding)
    await sharp(inputImage)
      .resize(384, 384, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .extend({
        top: 64,
        bottom: 64,
        left: 64,
        right: 64,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFile(path.join(outputDir, 'icon-maskable-512x512.png'));
    console.log('Generated icon-maskable-512x512.png');

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
