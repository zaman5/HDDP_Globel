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

// Serve static frontend assets
app.use(express.static(staticDir));

// SPA Fallback: Serve index.html for all non-API web routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  const indexPath = path.join(staticDir, 'index.html');
  if (fsExists(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send(`
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
