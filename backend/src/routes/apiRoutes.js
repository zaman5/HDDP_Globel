const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const jobController = require('../controllers/jobController');
const candidateController = require('../controllers/candidateController');
const talentRequestController = require('../controllers/talentRequestController');
const partnerController = require('../controllers/partnerController');
const contactController = require('../controllers/contactController');
const statsController = require('../controllers/statsController');
const db = require('../config/db');

// Multer Storage Configuration
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `resume-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.rtf', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only document files (.pdf, .doc, .docx, .rtf, .txt) are permitted.'));
    }
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  const status = db.getDatabaseStatus();
  res.json({
    status: 'ok',
    app: 'HDDP Consultants Healthcare Recruitment API',
    version: '1.0.0',
    database: status
  });
});

// Platform Statistics
router.get('/stats', statsController.getStats);

// Job Positions
router.get('/jobs', jobController.getAllJobs);
router.get('/jobs/:id', jobController.getJobById);
router.post('/jobs', jobController.createJob);

// Candidates & Resumes
router.post('/candidates/apply', upload.single('resume'), candidateController.submitCandidateApplication);
router.get('/candidates', candidateController.getAllCandidates);

// Talent Requisitions (Hospitals & Staffing Partners)
router.post('/talent-requests', talentRequestController.submitTalentRequest);
router.get('/talent-requests', talentRequestController.getAllTalentRequests);

// Partner Applications
router.post('/partners', partnerController.submitPartnerApplication);
router.get('/partners', partnerController.getAllPartners);

// Contact Inquiries
router.post('/contact', contactController.submitContactInquiry);
router.get('/contact', contactController.getAllContactInquiries);

module.exports = router;
