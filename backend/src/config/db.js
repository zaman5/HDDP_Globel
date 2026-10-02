const mysql = require('mysql2/promise');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

let dbType = 'none';
let mysqlPool = null;
let sqliteDb = null;

const initialJobs = [
  {
    title: 'ICU / Critical Care Registered Nurse',
    department: 'Intensive Care Unit',
    specialty: 'Nursing - ICU / CCU',
    location: 'Chicago, IL (Level 1 Trauma Center)',
    state: 'Illinois',
    compact_eligible: 1,
    job_type: 'Travel Contract (13 Wks)',
    shift: '12h Nights (36h/wk)',
    pay_range: '$3,250 - $3,800 / wk',
    experience_required: '2+ Years ICU Experience',
    urgency_level: 'Immediate Need',
    description: 'Provide high-acuity critical care management, ventilator monitoring, and rapid emergency intervention in a state-of-the-art Level 1 trauma facility.',
    requirements: 'Active RN license, BLS, ACLS, NIHSS required. Compact license accepted. CCRN preferred.',
    is_featured: 1,
    status: 'Open'
  },
  {
    title: 'Emergency Department Staff Nurse',
    department: 'Emergency Medicine',
    specialty: 'Nursing - Emergency Room',
    location: 'Houston, TX (Metro Health System)',
    state: 'Texas',
    compact_eligible: 1,
    job_type: 'Direct Hire / Full Time',
    shift: '12h Rotating / 36h/wk',
    pay_range: '$42.00 - $55.00 / hr + Sign-on',
    experience_required: '1.5+ Years Emergency Dept',
    urgency_level: 'Urgent Need',
    description: 'Manage triage, acute medical crisis assessments, pediatric and adult trauma resuscitation, and coordinate bedside care.',
    requirements: 'Active TX/Compact RN license, BLS, ACLS, PALS, TNCC preferred.',
    is_featured: 1,
    status: 'Open'
  },
  {
    title: 'Operating Room (OR / Surgical) Nurse',
    department: 'Surgical Services',
    specialty: 'Nursing - Perioperative / OR',
    location: 'Phoenix, AZ (Regional Surgery Center)',
    state: 'Arizona',
    compact_eligible: 1,
    job_type: 'Travel Contract (13 Wks)',
    shift: '10h Days / 40h/wk + Call',
    pay_range: '$3,100 - $3,650 / wk',
    experience_required: '2+ Years Circulating & Scrub',
    urgency_level: 'High Priority',
    description: 'Circulate and scrub for orthopedic, general, vascular, and robotic minimally invasive surgical cases.',
    requirements: 'RN License, BLS, ACLS, CNOR preferred. Experience with DaVinci Xi robotic systems a plus.',
    is_featured: 1,
    status: 'Open'
  },
  {
    title: 'EHR Specialist & Clinical Informatics Consultant',
    department: 'Clinical Technology & Operations',
    specialty: 'Healthcare IT & Informatics',
    location: 'Atlanta, GA (Multi-Hospital System)',
    state: 'Georgia',
    compact_eligible: 1,
    job_type: 'Contract-to-Hire',
    shift: '8h Day Shift / Hybrid',
    pay_range: '$55.00 - $72.00 / hr',
    experience_required: '3+ Years Epic/Cerner Implementation',
    urgency_level: 'Active Requirement',
    description: 'Lead clinical workflow integration, optimize Epic / Cerner EHR workflows for nursing staff, and oversee deployment training.',
    requirements: 'Epic or Cerner Certified, Clinical background (RN/BSN/Informatics) highly preferred.',
    is_featured: 1,
    status: 'Open'
  },
  {
    title: 'Cardiovascular Interventional Radiographer',
    department: 'Cath Lab / Interventional',
    specialty: 'Allied Health - Imaging / Cath Lab',
    location: 'Denver, CO (Cardiology Institute)',
    state: 'Colorado',
    compact_eligible: 1,
    job_type: 'Travel Contract (26 Wks)',
    shift: '10h Days / 40h/wk + Call',
    pay_range: '$3,400 - $4,100 / wk',
    experience_required: '2+ Years Cath Lab / EP',
    urgency_level: 'Immediate Need',
    description: 'Assist interventional cardiologists in diagnostic and therapeutic cardiac catheterizations, stenting, and pacemaker insertions.',
    requirements: 'ARRT (R) or RCIS certification, BLS, ACLS.',
    is_featured: 1,
    status: 'Open'
  },
  {
    title: 'Medical-Surgical / Telemetry Float Nurse',
    department: 'Inpatient Medicine',
    specialty: 'Nursing - Med-Surg / Telemetry',
    location: 'Charlotte, NC (Community Hospital)',
    state: 'North Carolina',
    compact_eligible: 1,
    job_type: 'Per Diem / Flexible Contract',
    shift: '12h Flexible / PRN',
    pay_range: '$48.00 - $60.00 / hr',
    experience_required: '1+ Year Acute Care',
    urgency_level: 'Continuous Sourcing',
    description: 'Provide inpatient nursing coverage across acute med-surg and telemetry units with cardiac rhythm strip interpretation.',
    requirements: 'Active NC/Compact RN license, BLS, ACLS.',
    is_featured: 0,
    status: 'Open'
  }
];

async function initDatabase() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'hddp_recruitment';

  console.log(`[DB] Attempting MySQL connection on ${host}:${port} (database: ${database})...`);

  try {
    // 1. Try to connect to MySQL server
    const serverConnection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      connectTimeout: 2000
    });

    await serverConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await serverConnection.end();

    // 2. Create Pool
    mysqlPool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    const conn = await mysqlPool.getConnection();
    console.log(`[DB] Successfully connected to MySQL database: ${database}`);
    conn.release();

    dbType = 'mysql';
    await createMysqlTables();
    await seedMysqlData();
    return;
  } catch (err) {
    console.warn(`[DB WARNING] MySQL is not available or connection failed: ${err.message}`);
    console.log(`[DB] Switching to resilient SQLite database engine for full instant offline operation.`);
    
    // Fallback to SQLite
    const sqlitePath = path.join(__dirname, '..', '..', 'database.sqlite');
    sqliteDb = new Database(sqlitePath);
    sqliteDb.pragma('journal_mode = WAL');
    dbType = 'sqlite';
    createSqliteTables();
    seedSqliteData();
    console.log(`[DB] SQLite database initialized at ${sqlitePath}`);
  }
}

async function createMysqlTables() {
  const queries = [
    `CREATE TABLE IF NOT EXISTS job_positions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      department VARCHAR(100) NOT NULL,
      specialty VARCHAR(100) NOT NULL,
      location VARCHAR(150) NOT NULL,
      state VARCHAR(50) NOT NULL,
      compact_eligible BOOLEAN DEFAULT TRUE,
      job_type VARCHAR(50) DEFAULT 'Travel Contract',
      shift VARCHAR(50) DEFAULT '12h Days',
      pay_range VARCHAR(100) DEFAULT '$2,800 - $3,500 / wk',
      experience_required VARCHAR(50) DEFAULT '2+ Years',
      urgency_level VARCHAR(50) DEFAULT 'Urgent Need',
      description TEXT,
      requirements TEXT,
      is_featured BOOLEAN DEFAULT TRUE,
      status VARCHAR(50) DEFAULT 'Open',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS candidates (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      specialty VARCHAR(100) NOT NULL,
      license_type VARCHAR(100) NOT NULL,
      compact_license BOOLEAN DEFAULT FALSE,
      years_experience VARCHAR(50) NOT NULL,
      preferred_shift VARCHAR(50) DEFAULT 'Flexible',
      desired_pay VARCHAR(100) NULL,
      current_city VARCHAR(100) NULL,
      current_state VARCHAR(50) NULL,
      willing_to_relocate BOOLEAN DEFAULT TRUE,
      resume_filename VARCHAR(255) NULL,
      resume_path VARCHAR(255) NULL,
      notes TEXT NULL,
      status VARCHAR(50) DEFAULT 'New / Under Review',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS talent_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      organization_name VARCHAR(200) NOT NULL,
      contact_name VARCHAR(150) NOT NULL,
      work_email VARCHAR(150) NOT NULL,
      phone_number VARCHAR(50) NOT NULL,
      facility_type VARCHAR(100) NOT NULL,
      facility_city VARCHAR(100) NOT NULL,
      facility_state VARCHAR(50) NOT NULL,
      roles_needed VARCHAR(255) NOT NULL,
      num_positions INT DEFAULT 1,
      urgency_level VARCHAR(50) DEFAULT 'Immediate (Within 48h)',
      shift_requirements VARCHAR(100) DEFAULT '12h Rotating / Days & Nights',
      target_start_date VARCHAR(100) NULL,
      additional_notes TEXT NULL,
      status VARCHAR(50) DEFAULT 'Pending Review',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS partner_applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_name VARCHAR(200) NOT NULL,
      contact_name VARCHAR(150) NOT NULL,
      job_title VARCHAR(100) NOT NULL,
      work_email VARCHAR(150) NOT NULL,
      phone_number VARCHAR(50) NOT NULL,
      organization_type VARCHAR(100) NOT NULL,
      staffing_volume VARCHAR(100) NOT NULL,
      specialized_units VARCHAR(255) NOT NULL,
      geographic_reach VARCHAR(255) NOT NULL,
      message TEXT NULL,
      status VARCHAR(50) DEFAULT 'Pending Intake',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS contact_inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(150) NOT NULL,
      email VARCHAR(150) NOT NULL,
      phone VARCHAR(50) NULL,
      inquiry_type VARCHAR(100) DEFAULT 'General Inquiry',
      subject VARCHAR(200) NOT NULL,
      message TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'Unread',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  ];

  for (const q of queries) {
    await mysqlPool.query(q);
  }
}

async function seedMysqlData() {
  const [rows] = await mysqlPool.query('SELECT COUNT(*) as cnt FROM job_positions');
  if (rows[0].cnt === 0) {
    console.log('[DB] Seeding initial job positions to MySQL...');
    for (const job of initialJobs) {
      await mysqlPool.query(
        `INSERT INTO job_positions (title, department, specialty, location, state, compact_eligible, job_type, shift, pay_range, experience_required, urgency_level, description, requirements, is_featured, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          job.title, job.department, job.specialty, job.location, job.state,
          job.compact_eligible, job.job_type, job.shift, job.pay_range,
          job.experience_required, job.urgency_level, job.description,
          job.requirements, job.is_featured, job.status
        ]
      );
    }
  }
}

function createSqliteTables() {
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS job_positions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      specialty TEXT NOT NULL,
      location TEXT NOT NULL,
      state TEXT NOT NULL,
      compact_eligible INTEGER DEFAULT 1,
      job_type TEXT DEFAULT 'Travel Contract',
      shift TEXT DEFAULT '12h Days',
      pay_range TEXT DEFAULT '$2,800 - $3,500 / wk',
      experience_required TEXT DEFAULT '2+ Years',
      urgency_level TEXT DEFAULT 'Urgent Need',
      description TEXT,
      requirements TEXT,
      is_featured INTEGER DEFAULT 1,
      status TEXT DEFAULT 'Open',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS candidates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      specialty TEXT NOT NULL,
      license_type TEXT NOT NULL,
      compact_license INTEGER DEFAULT 0,
      years_experience TEXT NOT NULL,
      preferred_shift TEXT DEFAULT 'Flexible',
      desired_pay TEXT NULL,
      current_city TEXT NULL,
      current_state TEXT NULL,
      willing_to_relocate INTEGER DEFAULT 1,
      resume_filename TEXT NULL,
      resume_path TEXT NULL,
      notes TEXT NULL,
      status TEXT DEFAULT 'New / Under Review',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS talent_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      organization_name TEXT NOT NULL,
      contact_name TEXT NOT NULL,
      work_email TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      facility_type TEXT NOT NULL,
      facility_city TEXT NOT NULL,
      facility_state TEXT NOT NULL,
      roles_needed TEXT NOT NULL,
      num_positions INTEGER DEFAULT 1,
      urgency_level TEXT DEFAULT 'Immediate (Within 48h)',
      shift_requirements TEXT DEFAULT '12h Rotating / Days & Nights',
      target_start_date TEXT NULL,
      additional_notes TEXT NULL,
      status TEXT DEFAULT 'Pending Review',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS partner_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT NOT NULL,
      contact_name TEXT NOT NULL,
      job_title TEXT NOT NULL,
      work_email TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      organization_type TEXT NOT NULL,
      staffing_volume TEXT NOT NULL,
      specialized_units TEXT NOT NULL,
      geographic_reach TEXT NOT NULL,
      message TEXT NULL,
      status TEXT DEFAULT 'Pending Intake',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NULL,
      inquiry_type TEXT DEFAULT 'General Inquiry',
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'Unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

function seedSqliteData() {
  const row = sqliteDb.prepare('SELECT COUNT(*) as cnt FROM job_positions').get();
  if (row.cnt === 0) {
    console.log('[DB] Seeding initial job positions to SQLite...');
    const insert = sqliteDb.prepare(`
      INSERT INTO job_positions (title, department, specialty, location, state, compact_eligible, job_type, shift, pay_range, experience_required, urgency_level, description, requirements, is_featured, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const job of initialJobs) {
      insert.run(
        job.title, job.department, job.specialty, job.location, job.state,
        job.compact_eligible, job.job_type, job.shift, job.pay_range,
        job.experience_required, job.urgency_level, job.description,
        job.requirements, job.is_featured, job.status
      );
    }
  }
}

/**
 * Universal query runner
 */
async function query(sql, params = []) {
  if (dbType === 'mysql') {
    const [rows, fields] = await mysqlPool.query(sql, params);
    return rows;
  } else if (dbType === 'sqlite') {
    const trimmed = sql.trim();
    if (trimmed.toUpperCase().startsWith('SELECT') || trimmed.toUpperCase().startsWith('PRAGMA')) {
      const stmt = sqliteDb.prepare(sql);
      return stmt.all(...params);
    } else {
      const stmt = sqliteDb.prepare(sql);
      const info = stmt.run(...params);
      return { insertId: info.lastInsertRowid, affectedRows: info.changes };
    }
  } else {
    throw new Error('Database not initialized');
  }
}

function getDatabaseStatus() {
  return {
    engine: dbType,
    isOnline: dbType !== 'none',
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  initDatabase,
  query,
  getDatabaseStatus
};
