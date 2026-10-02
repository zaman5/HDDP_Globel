-- HDDP Consultants Healthcare Recruitment Database Schema
-- Compatible with MySQL 5.7+ and MySQL 8.0+

CREATE DATABASE IF NOT EXISTS `hddp_recruitment` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `hddp_recruitment`;

-- 1. Job Positions Table
CREATE TABLE IF NOT EXISTS `job_positions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `specialty` VARCHAR(100) NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `state` VARCHAR(50) NOT NULL,
  `compact_eligible` BOOLEAN DEFAULT TRUE,
  `job_type` VARCHAR(50) DEFAULT 'Travel Contract',
  `shift` VARCHAR(50) DEFAULT '12h Days / 36h/week',
  `pay_range` VARCHAR(100) DEFAULT '$2,800 - $3,450 / wk',
  `experience_required` VARCHAR(50) DEFAULT '2+ Years',
  `urgency_level` VARCHAR(50) DEFAULT 'Urgent Need',
  `description` TEXT,
  `requirements` TEXT,
  `is_featured` BOOLEAN DEFAULT TRUE,
  `status` VARCHAR(50) DEFAULT 'Open',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Candidates / Resumes Table
CREATE TABLE IF NOT EXISTS `candidates` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `specialty` VARCHAR(100) NOT NULL,
  `license_type` VARCHAR(100) NOT NULL,
  `compact_license` BOOLEAN DEFAULT FALSE,
  `years_experience` VARCHAR(50) NOT NULL,
  `preferred_shift` VARCHAR(50) DEFAULT 'Flexible',
  `desired_pay` VARCHAR(100) NULL,
  `current_city` VARCHAR(100) NULL,
  `current_state` VARCHAR(50) NULL,
  `willing_to_relocate` BOOLEAN DEFAULT TRUE,
  `resume_filename` VARCHAR(255) NULL,
  `resume_path` VARCHAR(255) NULL,
  `notes` TEXT NULL,
  `status` VARCHAR(50) DEFAULT 'New / Under Review',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Talent Requests (Hospitals & Staffing Partners Requisitions)
CREATE TABLE IF NOT EXISTS `talent_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `organization_name` VARCHAR(200) NOT NULL,
  `contact_name` VARCHAR(150) NOT NULL,
  `work_email` VARCHAR(150) NOT NULL,
  `phone_number` VARCHAR(50) NOT NULL,
  `facility_type` VARCHAR(100) NOT NULL,
  `facility_city` VARCHAR(100) NOT NULL,
  `facility_state` VARCHAR(50) NOT NULL,
  `roles_needed` VARCHAR(255) NOT NULL,
  `num_positions` INT DEFAULT 1,
  `urgency_level` VARCHAR(50) DEFAULT 'Immediate (Within 48h)',
  `shift_requirements` VARCHAR(100) DEFAULT '12h Rotating / Days & Nights',
  `target_start_date` VARCHAR(100) NULL,
  `additional_notes` TEXT NULL,
  `status` VARCHAR(50) DEFAULT 'Pending Review',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Partner With Us Inquiries (B2B Healthcare Agencies & Systems)
CREATE TABLE IF NOT EXISTS `partner_applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `company_name` VARCHAR(200) NOT NULL,
  `contact_name` VARCHAR(150) NOT NULL,
  `job_title` VARCHAR(100) NOT NULL,
  `work_email` VARCHAR(150) NOT NULL,
  `phone_number` VARCHAR(50) NOT NULL,
  `organization_type` VARCHAR(100) NOT NULL,
  `staffing_volume` VARCHAR(100) NOT NULL,
  `specialized_units` VARCHAR(255) NOT NULL,
  `geographic_reach` VARCHAR(255) NOT NULL,
  `message` TEXT NULL,
  `status` VARCHAR(50) DEFAULT 'Pending Intake',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Contact Inquiries & Consultations
CREATE TABLE IF NOT EXISTS `contact_inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `inquiry_type` VARCHAR(100) DEFAULT 'General Inquiry',
  `subject` VARCHAR(200) NOT NULL,
  `message` TEXT NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Unread',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
