const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

let dbType = 'none';
let mysqlPool = null;

// Pure JS Embedded File Database (zero native compilation required)
const jsonDbPath = path.join(__dirname, '..', '..', 'hddp_local_data.json');
let inMemoryData = {
  job_positions: [],
  candidates: [],
  talent_requests: [],
  partner_applications: [],
  contact_inquiries: []
};

const initialJobs = [
  {
    id: 1,
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
    status: 'Open',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
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
    status: 'Open',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
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
    status: 'Open',
    created_at: new Date().toISOString()
  },
  {
    id: 4,
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
    status: 'Open',
    created_at: new Date().toISOString()
  },
  {
    id: 5,
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
    status: 'Open',
    created_at: new Date().toISOString()
  },
  {
    id: 6,
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
    status: 'Open',
    created_at: new Date().toISOString()
  }
];

function loadJsonDb() {
  try {
    if (fs.existsSync(jsonDbPath)) {
      const content = fs.readFileSync(jsonDbPath, 'utf8');
      inMemoryData = JSON.parse(content);
    } else {
      inMemoryData.job_positions = [...initialJobs];
      saveJsonDb();
    }
  } catch (e) {
    inMemoryData.job_positions = [...initialJobs];
  }
}

function saveJsonDb() {
  try {
    fs.writeFileSync(jsonDbPath, JSON.stringify(inMemoryData, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write JSON DB:', e.message);
  }
}

async function initDatabase() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'hddp_recruitment';

  console.log(`[DB] Connecting to MySQL on ${host}:${port}...`);

  try {
    // 1. Connect to MySQL server
    const serverConnection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      connectTimeout: 2000
    });

    await serverConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await serverConnection.end();

    // 2. Create Connection Pool
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

    const conn = await mysqlPool.getConnection();
    console.log(`[DB] Connected to MySQL database: ${database}`);
    conn.release();

    dbType = 'mysql';
    await createMysqlTables();
    await seedMysqlData();
    return;
  } catch (err) {
    console.warn(`[DB NOTICE] MySQL connection offline (${err.message}). Using resilient pure-JS database.`);
    loadJsonDb();
    dbType = 'json_store';
    console.log(`[DB] Pure-JS data store active at ${jsonDbPath}`);
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

/**
 * Universal Query Engine
 */
async function query(sql, params = []) {
  if (dbType === 'mysql') {
    const [rows] = await mysqlPool.query(sql, params);
    return rows;
  } else {
    // Pure JS Query Processor
    const trimmed = sql.trim();
    const upper = trimmed.toUpperCase();

    if (upper.startsWith('SELECT COUNT(*)')) {
      const match = trimmed.match(/FROM\s+([a-zA-Z_0-9]+)/i);
      const tableName = match ? match[1] : '';
      const list = inMemoryData[tableName] || [];
      return [{ count: list.length, cnt: list.length }];
    }

    if (upper.startsWith('SELECT')) {
      const match = trimmed.match(/FROM\s+([a-zA-Z_0-9]+)/i);
      const tableName = match ? match[1] : '';
      let list = [...(inMemoryData[tableName] || [])];

      if (trimmed.includes('WHERE id = ?')) {
        const id = Number(params[0]);
        list = list.filter(item => item.id === id);
      } else if (trimmed.includes('WHERE status = ?')) {
        list = list.filter(item => item.status === params[0]);
      }

      list.sort((a, b) => (b.id || 0) - (a.id || 0));
      return list;
    }

    if (upper.startsWith('INSERT INTO')) {
      const match = trimmed.match(/INSERT INTO\s+([a-zA-Z_0-9]+)/i);
      const tableName = match ? match[1] : '';
      if (!inMemoryData[tableName]) {
        inMemoryData[tableName] = [];
      }

      const newId = (inMemoryData[tableName].length > 0)
        ? Math.max(...inMemoryData[tableName].map(i => i.id || 0)) + 1
        : 1;

      let record = { id: newId, created_at: new Date().toISOString() };

      if (tableName === 'job_positions') {
        record = {
          ...record,
          title: params[0],
          department: params[1],
          specialty: params[2],
          location: params[3],
          state: params[4],
          compact_eligible: params[5],
          job_type: params[6],
          shift: params[7],
          pay_range: params[8],
          experience_required: params[9],
          urgency_level: params[10],
          description: params[11],
          requirements: params[12],
          is_featured: params[13],
          status: 'Open'
        };
      } else if (tableName === 'candidates') {
        record = {
          ...record,
          first_name: params[0],
          last_name: params[1],
          email: params[2],
          phone: params[3],
          specialty: params[4],
          license_type: params[5],
          compact_license: params[6],
          years_experience: params[7],
          preferred_shift: params[8],
          desired_pay: params[9],
          current_city: params[10],
          current_state: params[11],
          willing_to_relocate: params[12],
          resume_filename: params[13],
          resume_path: params[14],
          notes: params[15],
          status: 'New / Under Review'
        };
      } else if (tableName === 'talent_requests') {
        record = {
          ...record,
          organization_name: params[0],
          contact_name: params[1],
          work_email: params[2],
          phone_number: params[3],
          facility_type: params[4],
          facility_city: params[5],
          facility_state: params[6],
          roles_needed: params[7],
          num_positions: params[8],
          urgency_level: params[9],
          shift_requirements: params[10],
          target_start_date: params[11],
          additional_notes: params[12],
          status: 'Pending Review'
        };
      } else if (tableName === 'partner_applications') {
        record = {
          ...record,
          company_name: params[0],
          contact_name: params[1],
          job_title: params[2],
          work_email: params[3],
          phone_number: params[4],
          organization_type: params[5],
          staffing_volume: params[6],
          specialized_units: params[7],
          geographic_reach: params[8],
          message: params[9],
          status: 'Pending Intake'
        };
      } else if (tableName === 'contact_inquiries') {
        record = {
          ...record,
          full_name: params[0],
          email: params[1],
          phone: params[2],
          inquiry_type: params[3],
          subject: params[4],
          message: params[5],
          status: 'Unread'
        };
      }

      inMemoryData[tableName].push(record);
      saveJsonDb();
      return { insertId: newId, affectedRows: 1 };
    }

    return [];
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
