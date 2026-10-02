const fs = require('fs');
const path = require('path');

const browserDir = path.join(__dirname, '..', 'frontend', 'dist', 'frontend', 'browser');
const baseDir = path.join(__dirname, '..', 'frontend', 'dist', 'frontend');
const htaccessSrc = path.join(__dirname, '..', 'frontend', 'public', '.htaccess');

if (fs.existsSync(browserDir)) {
  console.log('[BUILD-SYNC] Copying browser output to root dist directory...');
  const files = fs.readdirSync(browserDir);
  for (const file of files) {
    const src = path.join(browserDir, file);
    const dest = path.join(baseDir, file);
    fs.cpSync(src, dest, { recursive: true });
  }
}

// Ensure .htaccess is in both dist locations
if (fs.existsSync(htaccessSrc)) {
  fs.copyFileSync(htaccessSrc, path.join(baseDir, '.htaccess'));
  if (fs.existsSync(browserDir)) {
    fs.copyFileSync(htaccessSrc, path.join(browserDir, '.htaccess'));
  }
}

console.log('[BUILD-SYNC] Synchronized all build files and .htaccess successfully.');
