#!/usr/bin/env node

// Simple favicon generator script
const fs = require('fs');
const path = require('path');

console.log('Favicon generator for behindthebrain blog');
console.log('========================================');

const publicDir = path.join(__dirname, 'public');
const logoPath = path.join(publicDir, 'logo.svg');

// Check if logo.svg exists
if (!fs.existsSync(logoPath)) {
  console.error('Error: logo.svg not found in public directory');
  process.exit(1);
}

console.log('Logo found at:', logoPath);

// For now, we'll use the existing favicon.ico and create placeholder PNGs
// In a production setup, you would use sharp or imagemagick to convert the SVG

const requiredSizes = [16, 32, 48, 96, 144, 192, 256, 384, 512];

console.log('Required favicon sizes:', requiredSizes.join(', '));

// Create app.ico in src/app directory if it doesn't exist
const srcAppDir = path.join(__dirname, 'src', 'app');
const appIconPath = path.join(srcAppDir, 'favicon.ico');

if (fs.existsSync(appIconPath)) {
  console.log('favicon.ico already exists in src/app');
} else {
  console.log('Note: You need to generate favicon.ico and place it in src/app/');
}

console.log('');
console.log('Next steps:');
console.log('1. Use an online favicon generator like https://favicon.io or https://realfavicongenerator.net');
console.log('2. Upload your logo.svg file');
console.log('3. Download the generated favicons');
console.log('4. Place them in the public directory');
console.log('5. Update the manifest files with the correct references');

console.log('');
console.log('Files needed in public/:');
requiredSizes.forEach(size => {
  console.log(`- icon-${size}x${size}.png`);
});
console.log('- favicon.ico (also copy to src/app/)');

console.log('');
console.log('Manifest files to update:');
console.log('- public/manifest.json');
console.log('- src/app/manifest.ts');