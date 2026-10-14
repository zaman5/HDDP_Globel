const db = require('../config/db');
const { isEmail, fieldTooLong } = require('../utils/validation');

exports.submitContactInquiry = async (req, res) => {
  try {
    const { full_name, email, phone, inquiry_type, subject, message } = req.body;

    if (!full_name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Email, and Message are required.'
      });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }
    if (fieldTooLong(req.body)) {
      return res.status(400).json({ success: false, message: 'One of the fields is too long. Please shorten it and try again.' });
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
      message: 'Thank you for contacting HDDP Consultants. Your message has been received. A member of our team will review your request and contact you if there is a potential fit.',
      inquiryId: result.insertId
    });
  } catch (error) {
    console.error('Error submitting contact inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing contact inquiry'
    });
  }
};

exports.getAllContactInquiries = async (req, res) => {
  try {
    const inquiries = await db.query('SELECT * FROM contact_inquiries ORDER BY id DESC');
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    console.error('Error fetching contact inquiries:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving contact inquiries' });
  }
};
