// Notice System Types
export type NoticeCategory =
  | 'Admissions'
  | 'Examinations'
  | 'Academics'
  | 'Scholarships'
  | 'Events'
  | 'Sports'
  | 'Cultural'
  | 'Placement'
  | 'Library'
  | 'Administration';

export type Department = 'jr_college' | 'ug_programmes' | 'pg_programmes' | 'phd';

export const NOTICE_CATEGORIES: NoticeCategory[] = [
  'Admissions',
  'Examinations',
  'Academics',
  'Scholarships',
  'Events',
  'Sports',
  'Cultural',
  'Placement',
  'Library',
  'Administration',
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
      { id: 'bcom', label: 'B.Com' },
      { id: 'baf', label: 'B.A.F (Accounting & Finance)' },
      { id: 'bfm', label: 'B.F.M (Financial Markets)' },
      { id: 'bbi', label: 'B.B.I (Banking & Insurance)' },
      { id: 'bms', label: 'B.M.S (Management Studies)' },
      { id: 'bammc', label: 'B.A.M.M.C (Mass Media)' },
      { id: 'bsc-cs', label: 'B.Sc (Computer Science)' },
      { id: 'bsc-it', label: 'B.Sc (Information Technology)' },
      { id: 'bsc-ds', label: 'B.Sc (Data Science)' },
      { id: 'bca', label: 'B.Sc (Computer Application)' },
    ],
  },
  {
    id: 'pg_programmes',
    label: 'Postgraduate (Degree)',
    courses: [
      { id: 'mcom', label: 'M.Com' },
      { id: 'msc-it', label: 'M.Sc (Information Technology)' },
      { id: 'msc-finance', label: 'M.Sc (Finance)' },
    ],
  },
  {
    id: 'phd',
    label: 'PhD',
    courses: [{ id: 'phd', label: 'PhD Programme' }],
  },
];

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
