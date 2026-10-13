const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });

const { initDatabase } = require('./backend/src/config/db');
const apiRoutes = require('./backend/src/routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded documents
app.use('/uploads', express.static(path.join(__dirname, 'backend', 'uploads')));

// Mount API routes
app.use('/api', apiRoutes);

// Static Angular frontend locations (multi-fallback for all hosting layouts)
const possibleStaticPaths = [
  path.join(__dirname, 'frontend', 'dist', 'frontend', 'browser'),
  path.join(__dirname, 'frontend', 'dist', 'frontend'),
  path.join(__dirname, 'public_html'),
  path.join(__dirname)
];

let staticDir = possibleStaticPaths.find(p => fsExists(path.join(p, 'index.html'))) || __dirname;

function fsExists(p) {
  try {
    return require('fs').existsSync(p);
  } catch (e) {
    return false;
  }
}

const SITE_URL = (process.env.SITE_URL || 'https://hddpconsultants.com').replace(/\/$/, '');
const STATIC_PAGES = [
  ['/', '1.0', 'weekly'], ['/services', '0.9', 'monthly'], ['/who-we-serve', '0.9', 'monthly'],
  ['/how-it-works', '0.8', 'monthly'], ['/jobs', '0.9', 'daily'], ['/staffing-agency-consulting', '0.8', 'monthly'], ['/about-us', '0.6', 'monthly'],
  ['/contact-us', '0.7', 'yearly'], ['/privacy-policy', '0.2', 'yearly'], ['/cookie-policy', '0.2', 'yearly'],
  ['/sitemap', '0.3', 'monthly']
];

// Live sitemap: static pages plus every open job, so new jobs are discovered quickly
app.get('/sitemap.xml', async (req, res) => {
  const { query } = require('./backend/src/config/db');
  let jobs = [];
  try {
    jobs = await query('SELECT * FROM job_positions WHERE status = ?', ['Open']);
  } catch (e) {
    console.error('[sitemap] could not load jobs:', e.message);
  }
  const day = d => (d ? new Date(d) : new Date()).toISOString().slice(0, 10);
  const urls = [
    ...STATIC_PAGES.map(([p, priority, freq]) => `<url><loc>${SITE_URL}${p}</loc><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`),
    ...jobs.map(j => `<url><loc>${SITE_URL}/jobs/${j.id}</loc><lastmod>${day(j.updated_at || j.created_at)}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`)
  ];
  res.type('application/xml').send(
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.join('\n') +
    '\n</urlset>\n'
  );
});

// One URL per page: /services/ -> /services
app.use((req, res, next) => {
  if (req.path.length > 1 && req.path.endsWith('/') && !req.path.startsWith('/api')) {
    const q = req.originalUrl.slice(req.path.length);
    return res.redirect(301, req.path.replace(/\/+$/, '') + q);
  }
  next();
});

// Serve static frontend assets. Hashed build files are cached for a year; HTML is revalidated.
app.use(express.static(staticDir, {
  redirect: false,
  setHeaders: (res, filePath) => {
    if (/-[A-Z0-9]{8}\.(js|css)$/.test(filePath)) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    else if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
  }
}));

// Old addresses -> new ones (permanent, so search engines move rankings across)
const REDIRECTS = [
  [/^\/healthcare-solutions$/, '/services'],
  [/^\/partner-with-us$/, '/who-we-serve'],
  [/^\/process$/, '/how-it-works'],
  [/^\/candidates$/, '/jobs'],
  [/^\/candidates\/(\d+)(\/apply)?$/, '/jobs/$1$2']
];
app.use((req, res, next) => {
  for (const [from, to] of REDIRECTS) {
    if (from.test(req.path)) {
      return res.redirect(301, req.path.replace(from, to) + req.originalUrl.slice(req.path.length));
    }
  }
  next();
});

const { renderJobHead, renderNoIndex } = require('./seo-job-page');

// Prerendered pages (/services -> services/index.html), job pages with server-filled
// SEO tags, the admin app, and a real 404 status for anything else.
app.get('*', async (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  const prerendered = path.join(staticDir, req.path, 'index.html');
  if (req.path !== '/' && prerendered.startsWith(staticDir) && fsExists(prerendered)) {
    return res.sendFile(prerendered);
  }

  const shellPath = [path.join(staticDir, 'index.csr.html'), path.join(staticDir, 'index.html')].find(fsExists);
  if (!shellPath) {
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>HDDP Consultants</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1>HDDP Consultants Platform</h1>
          <p>Application is initializing. Please run build or check backend status.</p>
        </body>
      </html>
    `);
  }
  const shell = require('fs').readFileSync(shellPath, 'utf8');
  res.setHeader('Cache-Control', 'no-cache');

  const jobMatch = req.path.match(/^\/jobs\/(\d+)(\/apply)?$/);
  if (jobMatch) {
    let job = null;
    try {
      const { query } = require('./backend/src/config/db');
      job = (await query('SELECT * FROM job_positions WHERE id = ?', [Number(jobMatch[1])]))[0];
    } catch (e) {
      console.error('[job page] could not load job:', e.message);
    }
    if (job && job.status === 'Open') {
      const html = renderJobHead(shell, job, SITE_URL);
      return res.send(jobMatch[2] ? renderNoIndex(html) : html);
    }
    // Filled or removed job: tell search engines it is gone
    return res.status(404).send(renderNoIndex(shell));
  }

  if (req.path === '/admin') {
    return res.send(renderNoIndex(shell));
  }
  res.status(404).send(renderNoIndex(shell));
});

// Start Server
async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(` HDDP Full-Stack Production Server Active`);
      console.log(` Listening on Port: ${PORT}`);
      console.log(` Serving Frontend from: ${staticDir}`);
      console.log(`====================================================`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
