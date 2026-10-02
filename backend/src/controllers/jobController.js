const db = require('../config/db');

exports.getAllJobs = async (req, res) => {
  try {
    const { search, specialty, state, job_type, limit = 50 } = req.query;
    let sql = 'SELECT * FROM job_positions WHERE status = ?';
    const params = ['Open'];

    if (search) {
      sql += ' AND (title LIKE ? OR department LIKE ? OR location LIKE ? OR requirements LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    if (specialty) {
      sql += ' AND specialty LIKE ?';
      params.push(`%${specialty}%`);
    }

    if (state) {
      sql += ' AND (state LIKE ? OR location LIKE ?)';
      params.push(`%${state}%`, `%${state}%`);
    }

    if (job_type) {
      sql += ' AND job_type LIKE ?';
      params.push(`%${job_type}%`);
    }

    sql += ' ORDER BY is_featured DESC, id DESC LIMIT ?';
    params.push(Number(limit));

    const jobs = await db.query(sql, params);
    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving jobs', error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = await db.query('SELECT * FROM job_positions WHERE id = ?', [id]);
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ success: false, message: 'Job position not found' });
    }
    res.json({ success: true, data: jobs[0] });
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving job details', error: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const {
      title, department, specialty, location, state,
      compact_eligible = 1, job_type = 'Travel Contract', shift,
      pay_range, experience_required, urgency_level = 'Immediate Need',
      description, requirements, is_featured = 1
    } = req.body;

    if (!title || !specialty || !location) {
      return res.status(400).json({ success: false, message: 'Title, specialty, and location are required fields' });
    }

    const result = await db.query(
      `INSERT INTO job_positions 
      (title, department, specialty, location, state, compact_eligible, job_type, shift, pay_range, experience_required, urgency_level, description, requirements, is_featured, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Open')`,
      [
        title, department || 'General Clinical', specialty, location, state || 'National',
        compact_eligible ? 1 : 0, job_type, shift || '12h Days',
        pay_range || 'Competitive Compensation', experience_required || '1+ Year',
        urgency_level, description || '', requirements || '', is_featured ? 1 : 0
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Job position published successfully',
      jobId: result.insertId
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ success: false, message: 'Server error publishing job position', error: error.message });
  }
};
