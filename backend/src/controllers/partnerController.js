const db = require('../config/db');

exports.submitPartnerApplication = async (req, res) => {
  try {
    const {
      company_name,
      contact_name,
      job_title,
      work_email,
      phone_number,
      organization_type,
      staffing_volume,
      specialized_units,
      geographic_reach,
      message
    } = req.body;

    if (!company_name || !contact_name || !work_email || !phone_number) {
      return res.status(400).json({
        success: false,
        message: 'Company Name, Contact Name, Work Email, and Phone Number are required.'
      });
    }

    const result = await db.query(
      `INSERT INTO partner_applications 
      (company_name, contact_name, job_title, work_email, phone_number, organization_type, staffing_volume, specialized_units, geographic_reach, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending Intake')`,
      [
        company_name,
        contact_name,
        job_title || 'Executive Director / TA Lead',
        work_email,
        phone_number,
        organization_type || 'Healthcare Provider System',
        staffing_volume || '10-50 Monthly Placements',
        specialized_units || 'ICU, Med-Surg, ER',
        geographic_reach || 'Regional / Multi-State',
        message || ''
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Partnership intake application submitted! Our Enterprise Partnership Director will connect with you to review SLA agreements.',
      applicationId: result.insertId
    });
  } catch (error) {
    console.error('Error submitting partner application:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting partnership application',
      error: error.message
    });
  }
};

exports.getAllPartners = async (req, res) => {
  try {
    const partners = await db.query('SELECT * FROM partner_applications ORDER BY id DESC');
    res.json({ success: true, count: partners.length, data: partners });
  } catch (error) {
    console.error('Error fetching partner applications:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving partners', error: error.message });
  }
};
