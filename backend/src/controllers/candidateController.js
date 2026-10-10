const db = require('../config/db');
const path = require('path');
const fs = require('fs');

// Rejected applications must not leave a CV (personal data) behind on disk
function discardUpload(file) {
  if (file && file.path) fs.unlink(file.path, () => {});
}

exports.submitCandidateApplication = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      specialty,
      license_type,
      compact_license,
      years_experience,
      preferred_shift,
      desired_pay,
      current_city,
      current_state,
      willing_to_relocate,
      notes,
      job_id,
      job_title,
      country,
      work_authorization,
      privacy_consent
    } = req.body;

    if (!first_name || !last_name || !email || !phone || !specialty) {
      discardUpload(req.file);
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields: First Name, Last Name, Email, Phone, and Specialty.'
      });
    }

    // Notice-and-consent is required before we store a CV (UK GDPR, PIPEDA / Quebec Law 25, US state privacy laws)
    if (privacy_consent !== 'true' && privacy_consent !== true) {
      discardUpload(req.file);
      return res.status(400).json({
        success: false,
        message: 'Please confirm you have read the Privacy Policy and agree to your application being processed.'
      });
    }

    let resumeFilename = null;
    let resumePath = null;

    if (req.file) {
      resumeFilename = req.file.originalname;
      resumePath = `/uploads/${req.file.filename}`;
    }

    const result = await db.query(
      `INSERT INTO candidates 
      (first_name, last_name, email, phone, specialty, license_type, compact_license, years_experience, preferred_shift, desired_pay, current_city, current_state, willing_to_relocate, resume_filename, resume_path, notes, job_id, job_title, country, work_authorization, privacy_consent_at, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New / Under Review')`,
      [
        first_name,
        last_name,
        email,
        phone,
        specialty,
        license_type || '',
        compact_license === 'true' || compact_license === true || compact_license === 1 ? 1 : 0,
        years_experience || '1-2 Years',
        preferred_shift || 'Flexible',
        desired_pay || '',
        current_city || '',
        current_state || '',
        willing_to_relocate === 'false' || willing_to_relocate === false || willing_to_relocate === 0 ? 0 : 1,
        resumeFilename,
        resumePath,
        notes || '',
        job_id ? Number(job_id) : null,
        job_title || null,
        country || null,
        work_authorization || null,
        new Date().toISOString()
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully. A recruiter will contact you shortly.',
      candidateId: result.insertId
    });
  } catch (error) {
    discardUpload(req.file);
    console.error('Error submitting candidate application:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing application',
      error: error.message
    });
  }
};

exports.downloadResume = async (req, res) => {
  try {
    const rows = await db.query('SELECT * FROM candidates WHERE id = ?', [req.params.id]);
    const candidate = rows && rows[0];
    if (!candidate || !candidate.resume_path) {
      return res.status(404).json({ success: false, message: 'No CV uploaded for this candidate' });
    }

    // resume_path is stored as /uploads/<file>; resolve only the basename to stay inside uploads
    const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(candidate.resume_path));
    res.download(filePath, candidate.resume_filename || path.basename(filePath), (err) => {
      if (err && !res.headersSent) {
        res.status(404).json({ success: false, message: 'CV file not found on server' });
      }
    });
  } catch (error) {
    console.error('Error downloading resume:', error);
    res.status(500).json({ success: false, message: 'Server error downloading CV', error: error.message });
  }
};

exports.getAllCandidates = async (req, res) => {
  try {
    const { specialty, status, limit = 50 } = req.query;
    let sql = 'SELECT * FROM candidates WHERE 1=1';
    const params = [];

    if (specialty) {
      sql += ' AND specialty LIKE ?';
      params.push(`%${specialty}%`);
    }

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    sql += ' ORDER BY id DESC LIMIT ?';
    params.push(Number(limit));

    const candidates = await db.query(sql, params);
    res.json({ success: true, count: candidates.length, data: candidates });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving candidates', error: error.message });
  }
};
