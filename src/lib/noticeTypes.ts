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
    id: 'jr_college',
    label: 'Junior College',
    courses: [
      { id: 'jr-college', label: 'Junior College' },
    ],
  },
  {
    id: 'ug_programmes',
    label: 'Undergraduate (Degree)',
    courses: [
      { id: 'BCOM', label: 'BCOM' },
      { id: 'BCOM.AF', label: 'BCOM.AF' },
      { id: 'BCOM.BI', label: 'BCOM.BI' },
      { id: 'BCOM.FM', label: 'BCOM.FM' },
      { id: 'BCOM.MS', label: 'BCOM.MS' },
      { id: 'BCOM.BA', label: 'BCOM.BA' },
      { id: 'BSC.CS', label: 'BSC.CS' },
      { id: 'BSC.IT', label: 'BSC.IT' },
      { id: 'BSC.DS', label: 'BSC.DS' },
      { id: 'BSC.CA', label: 'BSC.CA' },
      { id: 'BAMMC', label: 'BAMMC' },
      { id: 'BCOM.BFSI', label: 'BCOM.BFSI' },
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
