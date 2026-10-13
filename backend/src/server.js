const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { initDatabase } = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Angular frontend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploaded CVs are personal data: they are NOT served publicly; use GET /api/candidates/:id/resume

// Mount API routes
app.use('/api', apiRoutes);

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'HDDP Consultants Healthcare Recruitment API is active and operational.',
    endpoints: {
      health: '/api/health',
      stats: '/api/stats',
      jobs: '/api/jobs',
      candidates: '/api/candidates',
      talentRequests: '/api/talent-requests',
      partners: '/api/partners',
      contact: '/api/contact'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  let status = err.status || err.statusCode || 500;
  let message = 'Something went wrong. Please try again.';
  if (err.code === 'LIMIT_FILE_SIZE') { status = 413; message = 'The file is too large. The maximum size is 10 MB.'; }
  else if (err.name === 'MulterError') { status = 400; message = 'The file upload could not be processed.'; }
  else if (err.type === 'entity.parse.failed') { status = 400; message = 'The request data was not valid.'; }
  else if (/Only document files/.test(err.message || '')) { status = 400; message = err.message; }
  if (status >= 500) console.error('[SERVER ERROR]', err);
  res.status(status).json({ success: false, message });
});

// Start Server & Initialize Database
async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(` HDDP Consultants API Server running on port ${PORT}`);
      console.log(` Local URL: http://localhost:${PORT}`);
      console.log(` Health: http://localhost:${PORT}/api/health`);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
