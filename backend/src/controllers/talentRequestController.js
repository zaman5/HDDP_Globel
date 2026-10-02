const db = require('../config/db');

exports.submitTalentRequest = async (req, res) => {
  try {
    const {
      organization_name,
      contact_name,
      work_email,
      phone_number,
      facility_type,
      facility_city,
      facility_state,
      roles_needed,
      num_positions,
      urgency_level,
      shift_requirements,
      target_start_date,
      additional_notes
    } = req.body;

    if (!organization_name || !contact_name || !work_email || !phone_number || !roles_needed) {
      return res.status(400).json({
        success: false,
        message: 'Organization Name, Contact Name, Work Email, Phone, and Roles Needed are required.'
      });
    }

    const result = await db.query(
      `INSERT INTO talent_requests 
      (organization_name, contact_name, work_email, phone_number, facility_type, facility_city, facility_state, roles_needed, num_positions, urgency_level, shift_requirements, target_start_date, additional_notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending Review')`,
      [
        organization_name,
        contact_name,
        work_email,
        phone_number,
        facility_type || 'Acute Care Hospital',
        facility_city || '',
        facility_state || '',
        roles_needed,
        num_positions ? Number(num_positions) : 1,
        urgency_level || 'Immediate (Within 48h)',
        shift_requirements || '12h Rotating',
        target_start_date || '',
        additional_notes || ''
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Talent requisition received successfully! Your dedicated HDDP Account Director is matching verified profiles and will contact you promptly.',
      requestId: result.insertId
    });
  } catch (error) {
    console.error('Error submitting talent request:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing talent request',
      error: error.message
    });
  }
};

exports.getAllTalentRequests = async (req, res) => {
  try {
    const requests = await db.query('SELECT * FROM talent_requests ORDER BY id DESC');
    res.json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    console.error('Error fetching talent requests:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving talent requests', error: error.message });
  }
};
