const db = require('../config/db');
const path = require('path');

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
      notes
    } = req.body;

    if (!first_name || !last_name || !email || !phone || !specialty) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields: First Name, Last Name, Email, Phone, and Specialty.'
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
      (first_name, last_name, email, phone, specialty, license_type, compact_license, years_experience, preferred_shift, desired_pay, current_city, current_state, willing_to_relocate, resume_filename, resume_path, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New / Under Review')`,
      [
        first_name,
        last_name,
        email,
        phone,
        specialty,
        license_type || 'RN',
        compact_license === 'true' || compact_license === true || compact_license === 1 ? 1 : 0,
        years_experience || '1-2 Years',
        preferred_shift || 'Flexible',
        desired_pay || '',
        current_city || '',
        current_state || '',
        willing_to_relocate === 'false' || willing_to_relocate === false || willing_to_relocate === 0 ? 0 : 1,
        resumeFilename,
        resumePath,
        notes || ''
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Candidate application and credentials submitted successfully! Our clinical advocate will reach out within 24-48 hours.',
      candidateId: result.insertId
    });
  } catch (error) {
    console.error('Error submitting candidate application:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing application',
      error: error.message
    });
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
