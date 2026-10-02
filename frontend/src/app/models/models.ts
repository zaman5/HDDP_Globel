export interface JobPosition {
  id: number;
  title: string;
  department: string;
  specialty: string;
  location: string;
  state: string;
  compact_eligible: number | boolean;
  job_type: string;
  shift: string;
  pay_range: string;
  experience_required: string;
  urgency_level: string;
  description: string;
  requirements: string;
  is_featured: number | boolean;
  status: string;
  created_at?: string;
}

export interface CandidateApplication {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specialty: string;
  license_type: string;
  compact_license: boolean | number;
  years_experience: string;
  preferred_shift?: string;
  desired_pay?: string;
  current_city?: string;
  current_state?: string;
  willing_to_relocate?: boolean | number;
  resume_filename?: string;
  resume_path?: string;
  notes?: string;
  status?: string;
  created_at?: string;
}

export interface TalentRequest {
  id?: number;
  organization_name: string;
  contact_name: string;
  work_email: string;
  phone_number: string;
  facility_type: string;
  facility_city: string;
  facility_state: string;
  roles_needed: string;
  num_positions: number;
  urgency_level: string;
  shift_requirements: string;
  target_start_date?: string;
  additional_notes?: string;
  status?: string;
  created_at?: string;
}

export interface PartnerApplication {
  id?: number;
  company_name: string;
  contact_name: string;
  job_title: string;
  work_email: string;
  phone_number: string;
  organization_type: string;
  staffing_volume: string;
  specialized_units: string;
  geographic_reach: string;
  message?: string;
  status?: string;
  created_at?: string;
}

export interface ContactInquiry {
  id?: number;
  full_name: string;
  email: string;
  phone?: string;
  inquiry_type: string;
  subject: string;
  message: string;
  status?: string;
  created_at?: string;
}

export interface PlatformStats {
  activeOpenings: number;
  totalCandidates: number;
  partnerFacilities: number;
  retentionRate: string;
  avgTurnaround: string;
  statesCovered: number;
  activeRequisitions: number;
  partnerApplications: number;
  dbEngine?: string;
}
