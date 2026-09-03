// Notice System Types
export type NoticeCategory =
  | 'Admissions'
  | 'Examinations'
  | 'Academics'
  | 'Scholarships & Prize Distribution & DDC'
  | 'Events'
  | 'Sports and Gymkhana'
  | 'Cultural'
  | 'Library'
  | 'Research'
  | 'Student Forums, Clubs and Committees'
  | 'Training & Placement'
  | 'Administration'
  | 'Other';

export type Department = 'jr_college' | 'ug_programmes' | 'pg_programmes' | 'phd';

export const NOTICE_CATEGORIES: NoticeCategory[] = [
  'Admissions',
  'Examinations',
  'Academics',
  'Scholarships & Prize Distribution & DDC',
  'Events',
  'Sports and Gymkhana',
  'Cultural',
  'Library',
  'Research',
  'Student Forums, Clubs and Committees',
  'Training & Placement',
  'Administration',
  'Other',
];

export const DEPARTMENTS = [
  {
    id: 'ug_programmes',
    label: 'Undergraduate (Degree)',
    courses: [
      { id: 'B.COM', label: 'B.COM' },
      { id: 'BAF', label: 'BAF' },
      { id: 'BMS', label: 'BMS' },
      { id: 'BFM', label: 'BFM' },
      { id: 'BFSI', label: 'BFSI' },
      { id: 'BBI', label: 'BBI' },
      { id: 'BCOM-BA', label: 'BCOM-BA' },
      { id: 'BCOM-MS', label: 'BCOM-MS' },
      { id: 'BSC-IT', label: 'BSC-IT' },
      { id: 'BCA', label: 'BCA' },
      { id: 'BSC-DS', label: 'BSC-DS' },
      { id: 'BBA', label: 'BBA' },
      { id: 'BAMMC', label: 'BAMMC' },
    ],
  },
  {
    id: 'pg_programmes',
    label: 'Postgraduate (Degree)',
    courses: [
      { id: 'MCOM.AA', label: 'MCOM.AA' },
      { id: 'MCOM.BM', label: 'MCOM.BM' },
      { id: 'MCOM.BF', label: 'MCOM.BF' },
      { id: 'MSC.IT', label: 'MSC.IT' },
      { id: 'MSC.FIN', label: 'MSC.FIN' },
    ],
  },
  {
    id: 'phd',
    label: 'PhD',
    courses: [{ id: 'phd', label: 'PhD Programme' }],
  },
  {
    id: 'junior_college',
    label: 'Junior College',
    courses: [
      { id: 'junior_college', label: 'Junior College' }
    ],
  },
];

// All course IDs flattened (used for "General" notices to auto-select all)
export const ALL_COURSE_IDS = DEPARTMENTS.flatMap(d => d.courses.map(c => c.id));
export const ALL_DEPT_IDS = DEPARTMENTS.map(d => d.id);

export const SEMESTERS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export interface Notice {
  id?: string;
  title: string;
  description: string;
  is_general: boolean;
  categories: string[];
  departments: string[];
  courses: string[];
  semesters: string[];
  schedule_time: string;
  expiry_time: string;
  attachments: { name: string; url: string; type: string }[];
  created_at?: string;
  created_by?: string;
  // Calendar integration
  publish_calendar?: boolean;
  is_calendar_only?: boolean;
  calendar_title?: string | null;
  calendar_category?: string | null;
  calendar_date?: string | null;
  calendar_venue?: string | null;
  calendar_time?: string | null;
}

export const CALENDAR_CATEGORIES = [
  'Academic', 'Examination', 'Holiday', 'Seminar',
  'Workshop', 'Sports', 'Cultural', 'NSS', 'NCC', 'Event',
];
