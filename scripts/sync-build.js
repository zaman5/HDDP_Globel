const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const browserDir = path.join(rootDir, 'frontend', 'dist', 'frontend', 'browser');
const baseDir = path.join(rootDir, 'frontend', 'dist', 'frontend');
const publicHtmlDir = path.join(rootDir, 'public_html');
const htaccessSrc = path.join(rootDir, 'frontend', 'public', '.htaccess');

const targets = [baseDir, publicHtmlDir, rootDir];

for (const target of targets) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
}

// index.html is the prerendered home page. Routes that aren't prerendered (job pages,
// unknown URLs) need an empty app shell instead, or they would briefly show home-page
// content and the home page's canonical tag to crawlers.
const prerenderedHome = path.join(browserDir, 'index.html');
if (fs.existsSync(prerenderedHome)) {
  const shell = fs.readFileSync(prerenderedHome, 'utf8')
    .replace(/<app-root[\s\S]*<\/app-root>/, '<app-root></app-root>')
    .replace(/\s*<link rel="canonical"[^>]*>/, '')
    .replace(/\s*<meta property="og:url"[^>]*>/, '');
  fs.writeFileSync(path.join(browserDir, 'index.csr.html'), shell);
  console.log('[BUILD-SYNC] Wrote index.csr.html app shell for non-prerendered routes.');
}

if (fs.existsSync(browserDir)) {
  console.log('[BUILD-SYNC] Copying browser build artifacts to all hosting targets...');
  const files = fs.readdirSync(browserDir);
  for (const file of files) {
    const src = path.join(browserDir, file);
    
    // Copy to frontend/dist/frontend
    fs.cpSync(src, path.join(baseDir, file), { recursive: true });
    
    // Copy to public_html (for cPanel/Hostinger default web roots)
    fs.cpSync(src, path.join(publicHtmlDir, file), { recursive: true });

    // Copy to repository root (for root-level hosting without output dir setting)
    if (file !== 'node_modules' && file !== 'src' && file !== 'backend' && file !== 'frontend') {
      fs.cpSync(src, path.join(rootDir, file), { recursive: true });
    }
  }
}

// Copy .htaccess to all locations
if (fs.existsSync(htaccessSrc)) {
  fs.copyFileSync(htaccessSrc, path.join(rootDir, '.htaccess'));
  fs.copyFileSync(htaccessSrc, path.join(baseDir, '.htaccess'));
  fs.copyFileSync(htaccessSrc, path.join(publicHtmlDir, '.htaccess'));
  if (fs.existsSync(browserDir)) {
    fs.copyFileSync(htaccessSrc, path.join(browserDir, '.htaccess'));
  }
}

console.log('[BUILD-SYNC] Synchronized all build outputs, public_html, and .htaccess files successfully.');
