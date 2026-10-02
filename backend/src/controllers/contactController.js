const db = require('../config/db');

exports.submitContactInquiry = async (req, res) => {
  try {
    const { full_name, email, phone, inquiry_type, subject, message } = req.body;

    if (!full_name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Email, and Message are required.'
      });
    }

    const result = await db.query(
      `INSERT INTO contact_inquiries (full_name, email, phone, inquiry_type, subject, message, status)
       VALUES (?, ?, ?, ?, ?, ?, 'Unread')`,
      [
        full_name,
        email,
        phone || '',
        inquiry_type || 'General Inquiry',
        subject || 'Inquiry from HDDP Website',
        message
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. Your message has been routed to our team and we will reply promptly within 24 hours.',
      inquiryId: result.insertId
    });
  } catch (error) {
    console.error('Error submitting contact inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing contact inquiry',
      error: error.message
    });
  }
};

exports.getAllContactInquiries = async (req, res) => {
  try {
    const inquiries = await db.query('SELECT * FROM contact_inquiries ORDER BY id DESC');
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    console.error('Error fetching contact inquiries:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving contact inquiries', error: error.message });
  }
};
