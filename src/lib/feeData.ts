export type CourseKey =
  | 'BAF' | 'BBI' | 'BFM' | 'BMS' | 'BAMMC'
  | 'BSC_IT' | 'BSC_CS' | 'BSC_DS' | 'BSC_CA' | 'BBA' | 'BFSI';

export type FeeRow = { head: string; starred?: boolean; isSection?: boolean };

// ── COMMERCE COURSES ─────────────────────────────────────────────────────────

export const commerceCourses: Record<CourseKey, string> = {
  BAF: 'B.Com A/C & Fin (BAF)',
  BBI: 'B.Com Bank & Ins (BBI)',
  BFM: 'B.Com Fin Mkts (BFM)',
  BMS: 'B.Com Mgt Study (BMS)',
  BAMMC: 'B.A. Mass Media (BAMMC)',
  BSC_IT: '', BSC_CS: '', BSC_DS: '', BSC_CA: '', BBA: '', BFSI: '',
};

export const commerceKeys: CourseKey[] = ['BAF', 'BBI', 'BFM', 'BMS', 'BAMMC'];

// ── SCIENCE / PROFESSIONAL COURSES ───────────────────────────────────────────

export const scienceCourses: Record<CourseKey, string> = {
  BSC_IT: 'B.Sc. IT',
  BSC_CS: 'B.Sc. Comp. Sci',
  BSC_DS: 'B.Sc. Data Sci.',
  BSC_CA: 'B.Sc. CA',
  BBA: 'BBA',
  BFSI: 'BFSI',
  BAF: '', BBI: '', BFM: '', BMS: '', BAMMC: '',
};

export const scienceKeys: CourseKey[] = ['BSC_IT', 'BSC_CS', 'BSC_DS', 'BSC_CA', 'BBA', 'BFSI'];

// ── RESERVED CATEGORY COURSES ─────────────────────────────────────────────

export const reservedCourses: Record<CourseKey, string> = {
  BAF: 'B.Com BAF',
  BBI: 'B.Com BBI',
  BFM: 'B.Com BFM',
  BMS: 'B.Com BMS',
  BAMMC: 'BAMMC',
  BSC_IT: 'B.Sc. IT',
  BSC_CS: 'B.Sc. Comp. Sci',
  BSC_DS: '', BSC_CA: '', BBA: '', BFSI: '',
};

export const reservedKeys: CourseKey[] = ['BAF', 'BBI', 'BFM', 'BMS', 'BAMMC', 'BSC_IT', 'BSC_CS'];

// ── FEE TABLES ────────────────────────────────────────────────────────────────

// Commerce – Year 1
export const commerceY1Rows: FeeRow[] = [
  { head: 'A — Institutional Fees', isSection: true },
  { head: 'Tuition Fee', starred: true },
  { head: 'Library Fee' },
  { head: 'Gym. Fee' },
  { head: 'Other Fee / E.C.A.' },
  { head: 'Admi. Proc.' },
  { head: 'Magazine Fee' },
  { head: 'ID Card & Lib. Card Fee' },
  { head: 'Student Welfare Fund' },
  { head: 'VC Fund' },
  { head: 'Uni. Sports & Cultural' },
  { head: 'E-Charges' },
  { head: 'Disaster Relief Fund' },
  { head: 'E-Suvidha' },
  { head: 'Alumni Association Fee' },
  { head: 'Student Club Fees' },
  { head: 'Journal' },
  { head: 'NSS Fee' },
  { head: 'Sports Contribution' },
  { head: 'Exam Fee', starred: true },
  { head: 'Marksheet' },
  { head: 'Exam Stationery Charges', starred: true },
  { head: 'Comp. Practical / Internet Fee' },
  { head: 'Insu. Fee' },
  { head: 'Proj. Fee' },
  { head: 'Lab. Fee' },
  { head: 'Ind. Visit Fee' },
  { head: 'Utility Fee' },
  { head: 'Devl. Fee', starred: true },
  { head: 'Enrol. Fee' },
  { head: 'Caution Money' },
  { head: 'Library Dep.' },
  { head: 'Laboratory Dep.' },
  { head: 'Admission Form Fees' },
  { head: 'Entrepreneurship Dev. Cell Fee' },
  { head: 'Student DB Management Fees', starred: true },
  { head: 'Infrastructure Upgradation Fees', starred: true },
  { head: 'E-Content Development Fees', starred: true },
  { head: 'E-Governance Fees' },
  { head: 'Document Verification' },
  { head: 'Festival Fees', starred: true },
  { head: 'I/A/OJT/PT Training Fee', starred: true },
  { head: 'Security Process Fee', starred: true },
  { head: 'Elective Vocational Skill Courses Fee', starred: true },
  { head: 'Facility Services Fee', starred: true },
  { head: 'B — Elective Courses Fees', isSection: true, starred: true },
];

export const commerceY1Data: Record<CourseKey, (number | string)[]> = {
  BAF: [], BBI: [], BFM: [], BMS: [], BAMMC: [],
  BSC_IT:'', BSC_CS:'', BSC_DS:'', BSC_CA:'', BBA:'', BFSI:'',
} as any;

export const commerceY1Totals: Record<CourseKey, number> = {
  BAF: 0, BBI: 0, BFM: 0, BMS: 0, BAMMC: 0,
  BSC_IT: 0, BSC_CS: 0, BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
};

// Commerce – Year 2
export const commerceY2Rows: FeeRow[] = [
  { head: 'Tuition Fee', starred: true },
  { head: 'Library Fee' },
  { head: 'Gym. Fee' },
  { head: 'Other Fee / E.C.A.' },
  { head: 'Admi. Proc.' },
  { head: 'Magazine Fee' },
  { head: 'ID Card & Lib. Card Fee' },
  { head: 'Student Welfare Fund' },
  { head: 'VC Fund' },
  { head: 'Uni. Sports & Cultural' },
  { head: 'E-Charges' },
  { head: 'Disaster Relief Fund' },
  { head: 'E-Suvidha' },
  { head: 'Alumni Association Fee' },
  { head: 'Student Club Fees' },
  { head: 'Journal' },
  { head: 'NSS Fee' },
  { head: 'Sports Contribution' },
  { head: 'Exam Fee', starred: true },
  { head: 'Marksheet' },
  { head: 'Exam Stationery Charges', starred: true },
  { head: 'Comp. Practical / Internet Fee' },
  { head: 'Insu. Fee' },
  { head: 'Proj. Fee' },
  { head: 'Lab. Fee' },
  { head: 'Ind. Visit Fee' },
  { head: 'Utility Fee' },
  { head: 'Devl. Fee', starred: true },
  { head: 'Laboratory Dep.' },
  { head: 'Admission Form Fees' },
  { head: 'Entrepreneurship Dev. Cell Fee' },
  { head: 'Specialization Subject Fees' },
  { head: 'Student DB Management Fees', starred: true },
  { head: 'Infrastructure Upgradation Fees' },
  { head: 'E-Content Development Fees', starred: true },
  { head: 'E-Governance Fees' },
  { head: 'Document Verification' },
  { head: 'Festival Fees', starred: true },
  { head: 'I/A/OJT/PT Training Fee', starred: true },
  { head: 'Security Process Fee', starred: true },
  { head: 'Elective Vocational Skill Courses Fee', starred: true },
  { head: 'Facility Services Fee', starred: true },
  { head: 'Elective Courses Fees', starred: true },
];

export const commerceY2Data: Record<CourseKey, number[]> = {
  BAF: [], BBI: [], BFM: [], BMS: [], BAMMC: [],
  BSC_IT: [], BSC_CS: [], BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
};

export const commerceY2Totals: Record<CourseKey, number> = {
  BAF: 0, BBI: 0, BFM: 0, BMS: 0, BAMMC: 0,
  BSC_IT: 0, BSC_CS: 0, BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
};

// Commerce – Year 3
export const commerceY3Rows: FeeRow[] = [
  { head: 'Tuition Fee', starred: true },
  { head: 'Library Fee' },
  { head: 'Gym. Fee' },
  { head: 'Other Fee / E.C.A.' },
  { head: 'Admi. Proc.' },
  { head: 'Magazine Fee' },
  { head: 'ID Card & Lib. Card Fee' },
  { head: 'Student Welfare Fund' },
  { head: 'VC Fund' },
  { head: 'Uni. Sports & Cultural' },
  { head: 'E-Charges' },
  { head: 'Disaster Relief Fund' },
  { head: 'E-Suvidha' },
  { head: 'Alumni Association Fee' },
  { head: 'Student Club Fees' },
  { head: 'Journal' },
  { head: 'NSS Fee' },
  { head: 'Sports Contribution' },
  { head: 'Exam Fee', starred: true },
  { head: 'Marksheet' },
  { head: 'Convocation Fee' },
  { head: 'Exam Stationery Charges', starred: true },
  { head: 'Comp. Practical / Internet Fee' },
  { head: 'Insu. Fee' },
  { head: 'Proj. Fee' },
  { head: 'Lab. Fee' },
  { head: 'Ind. Visit Fee' },
  { head: 'Utility Fee' },
  { head: 'Devl. Fee', starred: true },
  { head: 'Laboratory Dep.' },
  { head: 'Admission Form Fees' },
  { head: 'Entrepreneurship Dev. Cell Fee' },
  { head: 'Specialization Subject Fees' },
  { head: 'Student DB Management Fees', starred: true },
  { head: 'Infrastructure Upgradation Fees' },
  { head: 'E-Content Development Fees', starred: true },
  { head: 'E-Governance Fees' },
  { head: 'Document Verification' },
  { head: 'Festival Fees', starred: true },
  { head: 'I/A/OJT/PT Training Fee', starred: true },
  { head: 'Security Process Fee', starred: true },
  { head: 'Elective Vocational Skill Courses Fee', starred: true },
  { head: 'Facility Services Fee', starred: true },
  { head: 'Elective Courses Fees', starred: true },
];

export const commerceY3Data: Record<CourseKey, number[]> = {
  BAF: [], BBI: [], BFM: [], BMS: [], BAMMC: [],
  BSC_IT: [], BSC_CS: [], BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
};

export const commerceY3Totals: Record<CourseKey, number> = {
  BAF: 0, BBI: 0, BFM: 0, BMS: 0, BAMMC: 0,
  BSC_IT: 0, BSC_CS: 0, BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
};

// Science – Year 1
export const scienceY1Rows: FeeRow[] = [
  { head: 'A — Institutional Fees', isSection: true },
  { head: 'Tuition Fee', starred: true },
  { head: 'Library Fee' },
  { head: 'Gym. Fee' },
  { head: 'Other Fee / E.C.A.' },
  { head: 'Admi. Proc.' },
  { head: 'Magazine Fee' },
  { head: 'ID Card & Lib. Card Fee' },
  { head: 'Student Welfare Fund' },
  { head: 'VC Fund' },
  { head: 'Uni. Sports & Cultural' },
  { head: 'E-Charges' },
  { head: 'Disaster Relief Fund' },
  { head: 'E-Suvidha' },
  { head: 'Alumni Association Fee' },
  { head: 'Student Club Fees' },
  { head: 'Journal' },
  { head: 'NSS Fee' },
  { head: 'Sports Contribution' },
  { head: 'Exam Fee', starred: true },
  { head: 'Marksheet' },
  { head: 'Exam Stationery Charges', starred: true },
  { head: 'Comp. Practical / Internet Fee' },
  { head: 'Insu. Fee' },
  { head: 'Proj. Fee' },
  { head: 'Lab. Fee' },
  { head: 'Ind. Visit Fee' },
  { head: 'Utility Fee' },
  { head: 'Devl. Fee', starred: true },
  { head: 'Enrol. Fee' },
  { head: 'Caution Money' },
  { head: 'Library Dep.' },
  { head: 'Laboratory Dep.' },
  { head: 'Admission Form Fees' },
  { head: 'Entrepreneurship Dev. Cell Fee' },
  { head: 'Student DB Management Fees', starred: true },
  { head: 'Infrastructure Upgradation Fees', starred: true },
  { head: 'E-Content Development Fees', starred: true },
  { head: 'E-Governance Fees' },
  { head: 'Document Verification' },
  { head: 'Festival Fees', starred: true },
  { head: 'I/A/OJT/PT Training Fee', starred: true },
  { head: 'Security Process Fee', starred: true },
  { head: 'Elective Vocational Skill Courses Fee', starred: true },
  { head: 'Facility Services Fee', starred: true },
  { head: 'B — Elective Courses Fees', isSection: true, starred: true },
];

export const scienceY1Data: Record<CourseKey, number[]> = {
  BSC_IT: [], BSC_CS: [], BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
  BAF: [], BBI: [], BFM: [], BMS: [], BAMMC: [],
};

export const scienceY1Totals: Record<CourseKey, number> = {
  BSC_IT: 0, BSC_CS: 0, BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
  BAF: 0, BBI: 0, BFM: 0, BMS: 0, BAMMC: 0,
};

// Science – Year 2
export const scienceY2Rows: FeeRow[] = [
  { head: 'Tuition Fee', starred: true },
  { head: 'Library Fee' },
  { head: 'Gym. Fee' },
  { head: 'Other Fee / E.C.A.' },
  { head: 'Admi. Proc.' },
  { head: 'Magazine Fee' },
  { head: 'ID Card & Lib. Card Fee' },
  { head: 'Student Welfare Fund' },
  { head: 'VC Fund' },
  { head: 'Uni. Sports & Cultural' },
  { head: 'E-Charges' },
  { head: 'Disaster Relief Fund' },
  { head: 'E-Suvidha' },
  { head: 'Alumni Association Fee' },
  { head: 'Student Club Fees' },
  { head: 'Journal' },
  { head: 'NSS Fee' },
  { head: 'Sports Contribution' },
  { head: 'Exam Fee', starred: true },
  { head: 'Marksheet' },
  { head: 'Exam Stationery Charges', starred: true },
  { head: 'Comp. Practical / Internet Fee' },
  { head: 'Insu. Fee' },
  { head: 'Proj. Fee' },
  { head: 'Lab. Fee' },
  { head: 'Ind. Visit Fee' },
  { head: 'Utility Fee' },
  { head: 'Devl. Fee', starred: true },
  { head: 'Laboratory Dep.' },
  { head: 'Admission Form Fees' },
  { head: 'Entrepreneurship Dev. Cell Fee' },
  { head: 'Specialization Subject Fees' },
  { head: 'Student DB Management Fees', starred: true },
  { head: 'Infrastructure Upgradation Fees' },
  { head: 'E-Content Development Fees', starred: true },
  { head: 'E-Governance Fees' },
  { head: 'Document Verification' },
  { head: 'Festival Fees', starred: true },
  { head: 'I/A/OJT/PT Training Fee', starred: true },
  { head: 'Security Process Fee', starred: true },
  { head: 'Elective Vocational Skill Courses Fee', starred: true },
  { head: 'Facility Services Fee', starred: true },
  { head: 'Elective Courses Fees', starred: true },
];

export const scienceY2Data: Record<CourseKey, number[]> = {
  BSC_IT: [], BSC_CS: [], BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
  BAF: [], BBI: [], BFM: [], BMS: [], BAMMC: [],
};

export const scienceY2Totals: Record<CourseKey, number> = {
  BSC_IT: 0, BSC_CS: 0, BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
  BAF: 0, BBI: 0, BFM: 0, BMS: 0, BAMMC: 0,
};

// Science – Year 3
export const scienceY3Rows: FeeRow[] = scienceY2Rows.map(r =>
  r.head === 'Marksheet' ? { head: 'Marksheet' } : r
).map((r, i) => i === 19 ? r : r);  // same structure but with Convocation added
// Reuse Y2 rows but note the difference: Y3 has Convocation Fee; for simplicity we add it
export const scienceY3RowsFull: FeeRow[] = [
  { head: 'Tuition Fee', starred: true },
  { head: 'Library Fee' },
  { head: 'Gym. Fee' },
  { head: 'Other Fee / E.C.A.' },
  { head: 'Admi. Proc.' },
  { head: 'Magazine Fee' },
  { head: 'ID Card & Lib. Card Fee' },
  { head: 'Student Welfare Fund' },
  { head: 'VC Fund' },
  { head: 'Uni. Sports & Cultural' },
  { head: 'E-Charges' },
  { head: 'Disaster Relief Fund' },
  { head: 'E-Suvidha' },
  { head: 'Alumni Association Fee' },
  { head: 'Student Club Fees' },
  { head: 'Journal' },
  { head: 'NSS Fee' },
  { head: 'Sports Contribution' },
  { head: 'Exam Fee', starred: true },
  { head: 'Marksheet' },
  { head: 'Convocation Fee' },
  { head: 'Exam Stationery Charges', starred: true },
  { head: 'Comp. Practical / Internet Fee' },
  { head: 'Insu. Fee' },
  { head: 'Proj. Fee' },
  { head: 'Lab. Fee' },
  { head: 'Ind. Visit Fee' },
  { head: 'Utility Fee' },
  { head: 'Devl. Fee', starred: true },
  { head: 'Laboratory Dep.' },
  { head: 'Admission Form Fees' },
  { head: 'Entrepreneurship Dev. Cell Fee' },
  { head: 'Specialization Subject Fees' },
  { head: 'Student DB Management Fees', starred: true },
  { head: 'Infrastructure Upgradation Fees' },
  { head: 'E-Content Development Fees', starred: true },
  { head: 'E-Governance Fees' },
  { head: 'Document Verification' },
  { head: 'Festival Fees', starred: true },
  { head: 'I/A/OJT/PT Training Fee', starred: true },
  { head: 'Security Process Fee', starred: true },
  { head: 'Elective Vocational Skill Courses Fee', starred: true },
  { head: 'Facility Services Fee', starred: true },
  { head: 'Elective Courses Fees', starred: true },
];

export const scienceY3Data: Record<CourseKey, number[]> = {
  BSC_IT: [], BSC_CS: [], BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
  BAF: [], BBI: [], BFM: [], BMS: [], BAMMC: [],
};

export const scienceY3Totals: Record<CourseKey, number> = {
  BSC_IT: 0, BSC_CS: 0, BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
  BAF: 0, BBI: 0, BFM: 0, BMS: 0, BAMMC: 0,
};

// Reserved – Year 1
export const reservedY1Rows: FeeRow[] = [
  { head: 'Exam Fees', starred: true },
  { head: 'Marksheet' },
  { head: 'Exam Stationery Charges', starred: true },
  { head: 'Insu. Fee' },
  { head: 'Caution Money' },
  { head: 'Library Dep.' },
  { head: 'Laboratory Dep.' },
  { head: 'Project Fees' },
  { head: 'Comp. Practical / Internet Fee' },
  { head: 'Utility Fees' },
  { head: 'VC Fund' },
  { head: 'E-Charges' },
  { head: 'Disaster Relief Fund' },
  { head: 'Alumni Association Fee' },
  { head: 'NSS Fee' },
  { head: 'Admission Form Fees' },
  { head: 'Entrepreneurship Dev. Cell Fee' },
  { head: 'Sports Contribution' },
  { head: 'Student Club Fees' },
  { head: 'Journal' },
  { head: 'Ind. Visit Fee' },
  { head: 'E-Suvidha' },
  { head: 'Student DB Management Fees', starred: true },
  { head: 'Infrastructure Upgradation Fees', starred: true },
  { head: 'E-Content Development Fees', starred: true },
  { head: 'E-Governance Fees', starred: true },
  { head: 'I/A/OJT/PT Training Fee', starred: true },
  { head: 'Festival Fees', starred: true },
  { head: 'Elective Courses Fees', starred: true },
  { head: 'Document Verification' },
  { head: 'Security Process Fee', starred: true },
  { head: 'Elective Vocational Skill Courses Fee', starred: true },
  { head: 'Facility Services Fee', starred: true },
];

export const reservedY1Data: Record<CourseKey, number[]> = {
  BAF: [], BBI: [], BFM: [], BMS: [], BAMMC: [],
  BSC_IT: [], BSC_CS: [], BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
};

export const reservedY1Totals: Record<CourseKey, number> = {
  BAF: 0, BBI: 0, BFM: 0, BMS: 0, BAMMC: 0, BSC_IT: 0, BSC_CS: 0,
  BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
};

// Reserved – Year 2
export const reservedY2Rows: FeeRow[] = [
  { head: 'Exam Fees', starred: true },
  { head: 'Marksheet' },
  { head: 'Exam Stationery Charges', starred: true },
  { head: 'Insu. Fee' },
  { head: 'Laboratory Dep.' },
  { head: 'Project Fees' },
  { head: 'Comp. Practical / Internet Fee' },
  { head: 'Utility Fees' },
  { head: 'VC Fund' },
  { head: 'E-Charges' },
  { head: 'Disaster Relief Fund' },
  { head: 'Alumni Association Fee' },
  { head: 'NSS Fee' },
  { head: 'Admission Form Fees' },
  { head: 'Entrepreneurship Dev. Cell Fee' },
  { head: 'Sports Contribution' },
  { head: 'Student Club Fees' },
  { head: 'Journal' },
  { head: 'Specialization Subject Fees' },
  { head: 'Ind. Visit Fee' },
  { head: 'E-Suvidha' },
  { head: 'Student DB Management Fees', starred: true },
  { head: 'Infrastructure Upgradation Fees', starred: true },
  { head: 'E-Content Development Fees', starred: true },
  { head: 'E-Governance Fees' },
  { head: 'I/A/OJT/PT Training Fee', starred: true },
  { head: 'Festival Fees', starred: true },
  { head: 'Elective Courses Fees', starred: true },
  { head: 'Document Verification' },
  { head: 'Security Process Fee', starred: true },
  { head: 'Elective Vocational Skill Courses Fee', starred: true },
  { head: 'Facility Services Fee', starred: true },
];

export const reservedY2Data: Record<CourseKey, number[]> = {
  BAF: [], BBI: [], BFM: [], BMS: [], BAMMC: [],
  BSC_IT: [], BSC_CS: [], BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
};

export const reservedY2Totals: Record<CourseKey, number> = {
  BAF: 0, BBI: 0, BFM: 0, BMS: 0, BAMMC: 0, BSC_IT: 0, BSC_CS: 0,
  BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
};

// Reserved – Year 3
export const reservedY3Rows: FeeRow[] = [
  { head: 'Exam Fee', starred: true },
  { head: 'Marksheet' },
  { head: 'Convocation Fee' },
  { head: 'Exam Stationery Charges', starred: true },
  { head: 'Insu. Fee' },
  { head: 'Laboratory Dep.' },
  { head: 'Project Fees' },
  { head: 'Comp. Practical / Internet Fee' },
  { head: 'Utility Fees' },
  { head: 'VC Fund' },
  { head: 'E-Charges' },
  { head: 'Disaster Relief Fund' },
  { head: 'Alumni Association Fee' },
  { head: 'NSS Fee' },
  { head: 'Admission Form Fees' },
  { head: 'Entrepreneurship Dev. Cell Fee' },
  { head: 'Sports Contribution' },
  { head: 'Student Club Fees' },
  { head: 'Journal' },
  { head: 'Specialization Subject Fees' },
  { head: 'Ind. Visit Fee' },
  { head: 'E-Suvidha' },
  { head: 'Student DB Management Fees', starred: true },
  { head: 'Infrastructure Upgradation Fees', starred: true },
  { head: 'E-Content Development Fees', starred: true },
  { head: 'E-Governance Fees' },
  { head: 'I/A/OJT/PT Training Fee', starred: true },
  { head: 'Festival Fees', starred: true },
  { head: 'Elective Courses Fees', starred: true },
  { head: 'Document Verification' },
  { head: 'Security Process Fee', starred: true },
  { head: 'Elective Vocational Skill Courses Fee', starred: true },
  { head: 'Facility Services Fee', starred: true },
];

export const reservedY3Data: Record<CourseKey, number[]> = {
  BAF: [], BBI: [], BFM: [], BMS: [], BAMMC: [],
  BSC_IT: [], BSC_CS: [], BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
};

export const reservedY3Totals: Record<CourseKey, number> = {
  BAF: 0, BBI: 0, BFM: 0, BMS: 0, BAMMC: 0, BSC_IT: 0, BSC_CS: 0,
  BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
};
