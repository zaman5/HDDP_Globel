# HDDP Consultants - Enterprise Healthcare Staffing Platform

Full-stack enterprise recruitment and healthcare staffing web application built with **Angular 18**, **Node.js / Express REST API**, and **MySQL Database** (with automatic zero-config fallback to embedded SQLite for instant plug-and-play development).

---

## 🏗️ Tech Stack
- **Frontend**: Angular 18 (Standalone Components, Signals, Reactive Forms, Tailwind CSS design system, Google Fonts, Material Symbols)
- **Backend**: Node.js, Express.js, Multer (Document upload), CORS, Dotenv
- **Database**: MySQL 5.7+ / 8.0+ (with connection pooling and automatic schema migration & seeding) + SQLite resilient fallback
- **Design System**: *Clinical Trust & Deployment System* (Authoritative clinical blue, deep navy, clinical teal, and amber accents)

---

## 🚀 Quick Start Instructions

### 1. Start Backend API Server
```bash
cd backend
npm install
npm start
```
> The API will be accessible at: `http://localhost:5000`
> Health check endpoint: `http://localhost:5000/api/health`

### 2. Start Frontend Angular Client
```bash
cd frontend
npm start
```
> Open your browser at: `http://localhost:4200`

---

## 🗄️ Database Configuration (MySQL)
The backend is configured in `backend/.env`:
```env
PORT=5000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=hddp_recruitment
```
- When your MySQL server is running, the app automatically connects, creates the `hddp_recruitment` database, builds the 5 core tables, and seeds initial jobs.
- If MySQL is stopped or unavailable, the backend automatically switches to SQLite (`backend/database.sqlite`) so that everything runs with zero interruptions.

---

## 🌟 Application Features
1. **Home (`/`)**: Hero section, trust metrics, 4 service pillars, live job board preview, client retention stats.
2. **Healthcare Solutions (`/healthcare-solutions`)**: 6 clinical service divisions (Travel Nursing, Per Diem, Allied Health, Locum Tenens, EHR Informatics, Crisis Surge) and 10-point credentialing matrix.
3. **Partner With Us (`/partner-with-us`)**: B2B staffing agency and hospital intake portal with automated database recording.
4. **Candidates & Careers (`/candidates`)**: Live job board with keyword search, specialty & job-type filters, 1-click apply, and candidate resume upload.
5. **Process (`/process`)**: Interactive 5-step Clinical Trust & Deployment timeline with turnaround SLAs.
6. **About Us (`/about-us`)**: Mission, values, clinical governance board, and 25+ years track record.
7. **Contact Us (`/contact-us`)**: Enterprise inquiry form, department routing, and live consultation scheduling.
8. **Admin Command Center (`/admin`)**: Portal to view all submitted candidates, hospital requisitions, partner applications, contact messages, and publish new job postings in real time.
