'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { Download, Info, ChevronDown, ChevronUp, IndianRupee, BookOpen, FlaskConical, GraduationCap, Layers } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

type CourseKey =
  | 'BAF' | 'BBI' | 'BFM' | 'BMS' | 'BAMMC'
  | 'BSC_IT' | 'BSC_CS' | 'BSC_DS' | 'BSC_CA' | 'BBA' | 'BFSI';

type FeeRow = { head: string; starred?: boolean; isSection?: boolean };

// ── COMMERCE COURSES ─────────────────────────────────────────────────────────

const commerceCourses: Record<CourseKey, string> = {
  BAF: 'B.Com A/C & Fin (BAF)',
  BBI: 'B.Com Bank & Ins (BBI)',
  BFM: 'B.Com Fin Mkts (BFM)',
  BMS: 'B.Com Mgt Study (BMS)',
  BAMMC: 'B.A. Mass Media (BAMMC)',
  BSC_IT: '', BSC_CS: '', BSC_DS: '', BSC_CA: '', BBA: '', BFSI: '',
};

const commerceKeys: CourseKey[] = ['BAF', 'BBI', 'BFM', 'BMS', 'BAMMC'];

// ── SCIENCE / PROFESSIONAL COURSES ───────────────────────────────────────────

const scienceCourses: Record<CourseKey, string> = {
  BSC_IT: 'B.Sc. IT',
  BSC_CS: 'B.Sc. Comp. Sci',
  BSC_DS: 'B.Sc. Data Sci.',
  BSC_CA: 'B.Sc. CA',
  BBA: 'BBA',
  BFSI: 'BFSI',
  BAF: '', BBI: '', BFM: '', BMS: '', BAMMC: '',
};

const scienceKeys: CourseKey[] = ['BSC_IT', 'BSC_CS', 'BSC_DS', 'BSC_CA', 'BBA', 'BFSI'];

// ── RESERVED CATEGORY COURSES ─────────────────────────────────────────────

const reservedCourses: Record<CourseKey, string> = {
  BAF: 'B.Com BAF',
  BBI: 'B.Com BBI',
  BFM: 'B.Com BFM',
  BMS: 'B.Com BMS',
  BAMMC: 'BAMMC',
  BSC_IT: 'B.Sc. IT',
  BSC_CS: 'B.Sc. Comp. Sci',
  BSC_DS: '', BSC_CA: '', BBA: '', BFSI: '',
};

const reservedKeys: CourseKey[] = ['BAF', 'BBI', 'BFM', 'BMS', 'BAMMC', 'BSC_IT', 'BSC_CS'];

// ── FEE TABLES ────────────────────────────────────────────────────────────────

// Commerce – Year 1
const commerceY1Rows: FeeRow[] = [
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

const commerceY1Data: Record<CourseKey, (number | string)[]> = {
  BAF:   [14400,600,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,1500,62,0,1000,500,250,882,220,150,250,400,100,10,300,500,400,150,0,300,1000,300,1000,250,3000],
  BBI:   [14400,600,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,2500,62,0,1000,500,250,882,220,150,250,500,100,10,300,500,400,150,0,300,1000,300,1000,250,3000],
  BFM:   [14400,600,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,1500,62,100,1000,500,250,882,220,150,250,400,100,10,300,500,400,150,0,300,1000,300,1000,250,3000],
  BMS:   [14400,300,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,1500,62,100,1000,500,250,882,220,150,250,400,100,10,300,500,400,150,0,300,1000,300,1000,250,3000],
  BAMMC: [14400,300,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,1500,62,100,1000,500,250,882,220,150,250,400,100,10,300,500,400,150,0,300,1000,300,1000,250,3000],
  BSC_IT:'', BSC_CS:'', BSC_DS:'', BSC_CA:'', BBA:'', BFSI:'',
} as any;

const commerceY1Totals: Record<CourseKey, number> = {
  BAF: 33094, BBI: 34194, BFM: 33194, BMS: 32894, BAMMC: 32894,
  BSC_IT: 0, BSC_CS: 0, BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
};

// Commerce – Year 2
const commerceY2Rows: FeeRow[] = [
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

const commerceY2Data: Record<CourseKey, number[]> = {
  BAF:   [14400,600,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,1500,62,0,1000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BBI:   [14400,600,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,2500,62,0,1000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BFM:   [14400,600,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,1500,62,100,1000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BMS:   [14400,300,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,1500,62,100,1000,500,250,882,400,100,10,1200,300,500,400,150,0,300,1500,300,1000,250,3000],
  BAMMC: [14400,300,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,1500,62,100,1000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BSC_IT: [], BSC_CS: [], BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
};

const commerceY2Totals: Record<CourseKey, number> = {
  BAF: 32974, BBI: 33974, BFM: 33074, BMS: 33974, BAMMC: 32774,
  BSC_IT: 0, BSC_CS: 0, BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
};

// Commerce – Year 3
const commerceY3Rows: FeeRow[] = [
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

const commerceY3Data: Record<CourseKey, number[]> = {
  BAF:   [14400,600,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,250,500,1500,62,500,1000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BBI:   [14400,600,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,250,500,1500,62,500,1000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BFM:   [14400,600,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,250,500,1500,62,500,1000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BMS:   [14400,300,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,250,500,1500,62,500,1000,500,250,882,400,100,10,2400,300,500,400,150,0,300,1500,300,1000,250,3000],
  BAMMC: [14400,300,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,250,500,1500,62,500,1000,500,250,882,400,100,10,2400,300,500,400,150,0,300,1500,300,1000,250,3000],
  BSC_IT: [], BSC_CS: [], BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
};

const commerceY3Totals: Record<CourseKey, number> = {
  BAF: 33724, BBI: 34724, BFM: 33724, BMS: 35824, BAMMC: 35824,
  BSC_IT: 0, BSC_CS: 0, BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
};

// Science – Year 1
const scienceY1Rows: FeeRow[] = [
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

const scienceY1Data: Record<CourseKey, number[]> = {
  BSC_IT: [14400,1200,400,365,200,100,100,50,20,36,20,10,59,25,500,300,30,60,3045,50,500,1500,62,1000,6000,500,250,882,220,150,250,400,100,10,300,500,400,150,0,300,1000,300,1000,250,3000],
  BSC_CS: [16000,1200,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,2000,62,2000,6000,500,250,882,220,150,250,400,100,10,300,500,400,150,400,300,1000,300,1000,250,3000],
  BSC_DS: [30000,2000,400,365,200,100,100,50,20,36,20,10,59,25,500,300,30,60,3045,50,500,4200,62,1000,15000,500,250,882,220,150,250,400,100,10,300,500,400,150,0,300,1000,300,1000,250,3000],
  BSC_CA: [30000,2000,400,365,200,100,100,50,20,36,20,10,59,25,500,300,30,60,3045,50,500,4200,62,2000,10000,500,250,882,220,150,250,400,100,10,300,500,400,150,0,300,1000,300,1000,250,3000],
  BBA:    [40000,2000,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,1500,62,6000,1000,500,250,882,220,150,250,400,100,10,300,500,400,150,0,300,1000,300,1000,250,3000],
  BFSI:   [40000,2000,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,1500,62,6000,1000,500,250,882,220,150,250,400,100,10,300,500,400,150,0,300,1000,300,1000,250,3000],
  BAF: [], BBI: [], BFM: [], BMS: [], BAMMC: [],
};

const scienceY1Totals: Record<CourseKey, number> = {
  BSC_IT: 39994, BSC_CS: 43194, BSC_DS: 68094, BSC_CA: 64094, BBA: 66094, BFSI: 66094,
  BAF: 0, BBI: 0, BFM: 0, BMS: 0, BAMMC: 0,
};

// Science – Year 2
const scienceY2Rows: FeeRow[] = [
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

const scienceY2Data: Record<CourseKey, number[]> = {
  BSC_IT: [14400,1200,400,365,200,100,100,50,20,36,20,10,59,25,500,300,30,60,3045,50,500,1500,62,1000,6000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BSC_CS: [18000,1200,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,2000,62,2000,6000,500,250,882,400,100,10,0,300,500,400,150,400,300,1500,300,1000,250,3000],
  BSC_DS: [30000,2000,400,365,200,100,100,50,20,36,20,10,59,25,500,300,30,60,3045,50,500,4200,62,1000,15000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BSC_CA: [30000,2000,400,365,200,100,100,50,20,36,20,10,59,25,500,300,30,60,3045,50,500,4200,62,2000,10000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BBA:    [40000,2000,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,1500,62,6000,1000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BFSI:   [40000,2000,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,500,1500,62,6000,1000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BAF: [], BBI: [], BFM: [], BMS: [], BAMMC: [],
};

const scienceY2Totals: Record<CourseKey, number> = {
  BSC_IT: 39874, BSC_CS: 45074, BSC_DS: 67974, BSC_CA: 63974, BBA: 65974, BFSI: 65974,
  BAF: 0, BBI: 0, BFM: 0, BMS: 0, BAMMC: 0,
};

// Science – Year 3
const scienceY3Rows: FeeRow[] = scienceY2Rows.map(r =>
  r.head === 'Marksheet' ? { head: 'Marksheet' } : r
).map((r, i) => i === 19 ? r : r);  // same structure but with Convocation added
// Reuse Y2 rows but note the difference: Y3 has Convocation Fee; for simplicity we add it
const scienceY3RowsFull: FeeRow[] = [
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

const scienceY3Data: Record<CourseKey, number[]> = {
  BSC_IT: [14400,1200,400,365,200,100,100,50,20,36,20,10,59,25,500,300,30,60,3045,50,250,500,2500,62,1900,6000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BSC_CS: [20000,1200,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,250,500,2000,62,2000,6000,500,250,882,400,100,10,0,300,500,400,150,400,300,1500,300,1000,250,3000],
  BSC_DS: [30000,2000,400,365,200,100,100,50,20,36,20,10,59,25,500,300,30,60,3045,50,250,500,4200,62,1000,15000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BSC_CA: [30000,2000,400,365,200,100,100,50,20,36,20,10,59,25,500,300,30,60,3045,50,250,500,4200,62,2000,10000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BBA:    [40000,2000,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,250,500,1500,62,6000,1000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BFSI:   [40000,2000,400,365,200,100,100,50,20,36,20,10,59,25,500,0,30,60,3045,50,250,500,1500,62,6000,1000,500,250,882,400,100,10,0,300,500,400,150,0,300,1500,300,1000,250,3000],
  BAF: [], BBI: [], BFM: [], BMS: [], BAMMC: [],
};

const scienceY3Totals: Record<CourseKey, number> = {
  BSC_IT: 42024, BSC_CS: 47324, BSC_DS: 68224, BSC_CA: 64224, BBA: 66224, BFSI: 66224,
  BAF: 0, BBI: 0, BFM: 0, BMS: 0, BAMMC: 0,
};

// Reserved – Year 1
const reservedY1Rows: FeeRow[] = [
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

const reservedY1Data: Record<CourseKey, number[]> = {
  BAF:    [3045,50,500,62,150,250,400,0,500,250,20,20,10,25,30,100,10,60,500,0,500,59,300,500,400,150,1000,300,3000,0,300,1000,250],
  BBI:    [3045,50,500,62,150,250,500,0,500,250,20,20,10,25,30,100,10,60,500,0,500,59,300,500,400,150,1000,300,3000,0,300,1000,250],
  BFM:    [3045,50,500,62,150,250,400,100,500,250,20,20,10,25,30,100,10,60,500,0,500,59,300,500,400,150,1000,300,3000,0,300,1000,250],
  BMS:    [3045,50,500,62,150,250,400,100,500,250,20,20,10,25,30,100,10,60,500,0,500,59,300,500,400,150,1000,300,3000,0,300,1000,250],
  BAMMC:  [3045,50,500,62,150,250,400,100,500,250,20,20,10,25,30,100,10,60,500,0,500,59,300,500,400,150,1000,300,3000,0,300,1000,250],
  BSC_IT: [3045,50,500,62,150,250,400,1000,500,250,20,20,10,25,30,100,10,60,500,300,500,59,300,500,400,150,1000,300,3000,0,300,1000,250],
  BSC_CS: [3045,50,500,62,150,250,400,2000,500,250,20,20,10,25,30,100,10,60,500,0,500,59,300,500,400,150,1000,300,3000,400,300,1000,250],
  BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
};

const reservedY1Totals: Record<CourseKey, number> = {
  BAF: 13741, BBI: 13841, BFM: 13841, BMS: 13841, BAMMC: 13841, BSC_IT: 15041, BSC_CS: 16141,
  BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
};

// Reserved – Year 2
const reservedY2Rows: FeeRow[] = [
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

const reservedY2Data: Record<CourseKey, number[]> = {
  BAF:    [3045,50,500,62,400,0,500,250,20,20,10,25,30,100,10,60,500,0,0,500,59,300,500,400,150,1500,300,3000,0,300,1000,250],
  BBI:    [3045,50,500,62,400,0,500,250,20,20,10,25,30,100,10,60,500,0,0,500,59,300,500,400,150,1500,300,3000,0,300,1000,250],
  BFM:    [3045,50,500,62,400,100,500,250,20,20,10,25,30,100,10,60,500,0,0,500,59,300,500,400,150,1500,300,3000,0,300,1000,250],
  BMS:    [3045,50,500,62,400,100,500,250,20,20,10,25,30,100,10,60,500,0,1200,500,59,300,500,400,150,1500,300,3000,0,300,1000,250],
  BAMMC:  [3045,50,500,62,400,100,500,250,20,20,10,25,30,100,10,60,500,0,0,500,59,300,500,400,150,1500,300,3000,0,300,1000,250],
  BSC_IT: [3045,50,500,62,400,1000,500,250,20,20,10,25,30,100,10,60,500,300,0,500,59,300,500,400,150,1500,300,3000,0,300,1000,250],
  BSC_CS: [3045,50,500,62,400,2000,0,250,20,20,10,25,30,100,10,60,500,0,0,500,59,300,500,400,150,1500,300,3000,400,300,1000,250],
  BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
};

const reservedY2Totals: Record<CourseKey, number> = {
  BAF: 13841, BBI: 13841, BFM: 13941, BMS: 15141, BAMMC: 13941, BSC_IT: 15141, BSC_CS: 15741,
  BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
};

// Reserved – Year 3
const reservedY3Rows: FeeRow[] = [
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

const reservedY3Data: Record<CourseKey, number[]> = {
  BAF:    [3045,50,250,500,62,400,500,500,250,20,20,10,25,30,100,10,60,500,0,0,500,59,300,500,400,150,1500,300,3000,0,300,1000,250],
  BBI:    [3045,50,250,500,62,400,500,500,250,20,20,10,25,30,100,10,60,500,0,0,500,59,300,500,400,150,1500,300,3000,0,300,1000,250],
  BFM:    [3045,50,250,500,62,400,500,500,250,20,20,10,25,30,100,10,60,500,0,0,500,59,300,500,400,150,1500,300,3000,0,300,1000,250],
  BMS:    [3045,50,250,500,62,400,500,500,250,20,20,10,25,30,100,10,60,500,0,2400,500,59,300,500,400,150,1500,300,3000,0,300,1000,250],
  BAMMC:  [3045,50,250,500,62,400,500,500,250,20,20,10,25,30,100,10,60,500,0,2400,500,59,300,500,400,150,1500,300,3000,0,300,1000,250],
  BSC_IT: [3045,50,250,500,62,400,1900,0,250,20,20,10,25,30,100,10,60,500,300,0,500,59,300,500,400,150,1500,300,3000,0,300,1000,250],
  BSC_CS: [3045,50,250,500,62,400,2000,0,250,20,20,10,25,30,100,10,60,500,0,0,500,59,300,500,400,150,1500,300,3000,400,300,1000,250],
  BSC_DS: [], BSC_CA: [], BBA: [], BFSI: [],
};

const reservedY3Totals: Record<CourseKey, number> = {
  BAF: 14591, BBI: 14591, BFM: 14591, BMS: 16991, BAMMC: 16991, BSC_IT: 15791, BSC_CS: 15991,
  BSC_DS: 0, BSC_CA: 0, BBA: 0, BFSI: 0,
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function fmt(n: number | string): string {
  if (typeof n === 'string' || n === 0) return n === 0 ? '—' : String(n);
  return `₹${n.toLocaleString('en-IN')}`;
}

function fmtNum(n: number): string {
  if (n === 0) return '—';
  return `₹${n.toLocaleString('en-IN')}`;
}

interface FeeTableProps {
  rows: FeeRow[];
  keys: CourseKey[];
  courseNames: Record<CourseKey, string>;
  data: Record<CourseKey, (number | string)[]>;
  totals: Record<CourseKey, number>;
}

function FeeTable({ rows, keys, courseNames, data, totals }: FeeTableProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0] shadow-sm bg-white">
      <table className="w-full text-sm border-collapse min-w-[700px]">
        <thead>
          <tr className="bg-[#123B6D] text-white">
            <th className="text-left px-4 py-3 font-semibold rounded-tl-2xl w-56 sticky left-0 bg-[#123B6D]">
              Fee Head
            </th>
            {keys.map((k, i) => (
              <th
                key={k}
                className={`text-center px-3 py-3 font-semibold text-xs ${i === keys.length - 1 ? 'rounded-tr-2xl' : ''}`}
              >
                {courseNames[k]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            if (row.isSection) {
              return (
                <tr key={ri} className="bg-[#D4A017]/10 border-y border-[#D4A017]/30">
                  <td
                    colSpan={keys.length + 1}
                    className="px-4 py-2 font-bold text-[#9a7511] text-xs uppercase tracking-wider"
                  >
                    {row.head} {row.starred && <span className="text-[#D4A017]">*</span>}
                  </td>
                </tr>
              );
            }
            return (
              <tr
                key={ri}
                className={`border-b border-[#E2E8F0] transition-colors ${ri % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'} hover:bg-[#EFF6FF]`}
              >
                <td className="px-4 py-2.5 text-[#1E293B] font-medium sticky left-0 bg-inherit">
                  <span>{row.head}</span>
                  {row.starred && (
                    <span className="ml-1 text-[#D4A017] font-bold text-xs">*</span>
                  )}
                </td>
                {keys.map((k) => {
                  const val = data[k]?.[ri] ?? 0;
                  return (
                    <td
                      key={k}
                      className={`text-center px-3 py-2.5 tabular-nums ${val === 0 ? 'text-[#94A3B8]' : 'text-[#1E293B]'}`}
                    >
                      {fmtNum(val as number)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {/* Total row */}
          <tr className="bg-[#123B6D] text-white font-bold border-t-2 border-[#D4A017]">
            <td className="px-4 py-3 rounded-bl-2xl sticky left-0 bg-[#123B6D]">
              Total (A + B)
            </td>
            {keys.map((k, i) => (
              <td
                key={k}
                className={`text-center px-3 py-3 text-[#D4A017] ${i === keys.length - 1 ? 'rounded-br-2xl' : ''}`}
              >
                {totals[k] > 0 ? `₹${totals[k].toLocaleString('en-IN')}` : '—'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// YEAR SECTION
// ─────────────────────────────────────────────────────────────────────────────

interface YearSectionProps {
  year: string;
  rows: FeeRow[];
  keys: CourseKey[];
  courseNames: Record<CourseKey, string>;
  data: Record<CourseKey, (number | string)[]>;
  totals: Record<CourseKey, number>;
}

function YearSection({ year, rows, keys, courseNames, data, totals }: YearSectionProps) {
  const [open, setOpen] = useState(year === 'First Year');

  return (
    <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-[#F1F5F9] transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#123B6D]/10 flex items-center justify-center group-hover:bg-[#123B6D]/20 transition-colors">
            <GraduationCap size={16} className="text-[#123B6D]" />
          </div>
          <span className="font-bold text-[#123B6D] text-lg font-[var(--font-heading)]">{year}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {keys.map(k => totals[k] > 0 && (
              <span
                key={k}
                className="hidden md:inline-block text-xs bg-[#123B6D]/10 text-[#123B6D] px-2 py-0.5 rounded-full font-medium"
              >
                {courseNames[k]}: ₹{totals[k].toLocaleString('en-IN')}
              </span>
            ))}
          </div>
          {open ? <ChevronUp size={20} className="text-[#64748B]" /> : <ChevronDown size={20} className="text-[#64748B]" />}
        </div>
      </button>
      {open && (
        <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <FeeTable rows={rows} keys={keys} courseNames={courseNames} data={data} totals={totals} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

type TabKey = 'commerce' | 'science' | 'reserved';

const TABS: { key: TabKey; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    key: 'commerce',
    label: 'Commerce Courses',
    icon: <BookOpen size={18} />,
    desc: 'BAF · BBI · BFM · BMS · BAMMC',
  },
  {
    key: 'science',
    label: 'Sci. & Professional',
    icon: <FlaskConical size={18} />,
    desc: 'BSc IT · BSc CS · BSc DS · BSc CA · BBA · BFSI',
  },
  {
    key: 'reserved',
    label: 'Reserved Category',
    icon: <Layers size={18} />,
    desc: 'Commerce & Science streams (Govt. fee waiver)',
  },
];

export default function FeeStructurePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('commerce');

  const NB = (
    <div className="mt-6 rounded-xl border border-[#D4A017]/30 bg-[#D4A017]/5 px-5 py-4 text-sm text-[#5a4a0a] space-y-1">
      <p className="font-semibold text-[#9a7511] mb-1 flex items-center gap-1.5">
        <Info size={14} /> Notes
      </p>
      <p>1) The fees are as per Finance Committee Meeting dated <strong>17.04.2026</strong> vide Notification of Higher and Technical Education Department, Government of Maharashtra dated 14th January 2019 and University of Mumbai Circular Nos. <strong>2026APR/AAMS-III/(C-8)/37894</strong> &amp; <strong>2026APR/AAMS-III/(C-6)/37361</strong> dated 16.04.2026.</p>
      <p>2) Fee heads marked with <span className="text-[#D4A017] font-bold">*</span> will be reviewed every year.</p>
    </div>
  );

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="relative bg-[#123B6D] pt-10 pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4A017] opacity-10 blur-3xl" />
          <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-[#4DA8DA] opacity-10 blur-3xl" />
          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A017]/20 text-[#D4A017] text-sm font-semibold mb-5 border border-[#D4A017]/30">
            Academic Year 2026–27
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4 max-w-3xl leading-tight">
            Fee Structure — Self-Financing Courses
          </h1>
          <p className="text-white/70 text-lg max-w-xl mb-8">
            Transparent, detailed fee breakdowns for all undergraduate programmes offered at Mulund College of Commerce.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Programmes', value: '11' },
              { label: 'Lowest Fee (Commerce)', value: '₹32,894' },
              { label: 'Academic Session', value: '2026–27' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-white">
                <p className="text-xs text-white/60 mb-0.5">{s.label}</p>
                <p className="font-bold text-lg font-[var(--font-heading)]">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 -mt-12 pb-20">

        {/* Tab selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-2xl border p-5 text-left transition-all shadow-sm hover:shadow-md ${
                activeTab === tab.key
                  ? 'bg-[#123B6D] border-[#123B6D] text-white shadow-lg shadow-[#123B6D]/20'
                  : 'bg-white border-[#E2E8F0] text-[#1E293B] hover:border-[#123B6D]/40'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${activeTab === tab.key ? 'bg-white/20' : 'bg-[#123B6D]/10'}`}>
                <span className={activeTab === tab.key ? 'text-white' : 'text-[#123B6D]'}>{tab.icon}</span>
              </div>
              <p className={`font-bold font-[var(--font-heading)] mb-1 ${activeTab === tab.key ? 'text-white' : 'text-[#123B6D]'}`}>
                {tab.label}
              </p>
              <p className={`text-xs ${activeTab === tab.key ? 'text-white/70' : 'text-[#64748B]'}`}>
                {tab.desc}
              </p>
            </button>
          ))}
        </div>

        {/* ── COMMERCE ─────────────────────────────────────────────── */}
        {activeTab === 'commerce' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)]">
                Commerce Courses — General Category
              </h2>
              <span className="text-xs text-[#64748B] bg-[#E2E8F0] px-3 py-1 rounded-full">
                Approved: 17.04.2026
              </span>
            </div>

            <YearSection
              year="First Year"
              rows={commerceY1Rows}
              keys={commerceKeys}
              courseNames={commerceCourses}
              data={commerceY1Data}
              totals={commerceY1Totals}
            />
            <YearSection
              year="Second Year"
              rows={commerceY2Rows}
              keys={commerceKeys}
              courseNames={commerceCourses}
              data={commerceY2Data}
              totals={commerceY2Totals}
            />
            <YearSection
              year="Third Year"
              rows={commerceY3Rows}
              keys={commerceKeys}
              courseNames={commerceCourses}
              data={commerceY3Data}
              totals={commerceY3Totals}
            />

            {NB}
          </div>
        )}

        {/* ── SCIENCE / PROFESSIONAL ──────────────────────────────── */}
        {activeTab === 'science' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)]">
                Science &amp; Professional Courses — General Category
              </h2>
              <span className="text-xs text-[#64748B] bg-[#E2E8F0] px-3 py-1 rounded-full">
                Approved: 17.04.2026
              </span>
            </div>

            <YearSection
              year="First Year"
              rows={scienceY1Rows}
              keys={scienceKeys}
              courseNames={scienceCourses}
              data={scienceY1Data}
              totals={scienceY1Totals}
            />
            <YearSection
              year="Second Year"
              rows={scienceY2Rows}
              keys={scienceKeys}
              courseNames={scienceCourses}
              data={scienceY2Data}
              totals={scienceY2Totals}
            />
            <YearSection
              year="Third Year"
              rows={scienceY3RowsFull}
              keys={scienceKeys}
              courseNames={scienceCourses}
              data={scienceY3Data}
              totals={scienceY3Totals}
            />

            <div className="mt-6 rounded-xl border border-[#4DA8DA]/30 bg-[#4DA8DA]/5 px-5 py-4 text-sm text-[#1E4E6E] space-y-1">
              <p className="font-semibold text-[#2980b9] mb-1 flex items-center gap-1.5">
                <Info size={14} /> Notes
              </p>
              <p>1) The fees are as per Finance Committee Meeting dated <strong>17.04.2026</strong> vide Notification of Higher and Technical Education Department, Government of Maharashtra dated 14th January 2019 and University of Mumbai Circular No. <strong>2026APR/AAMS-III/(C-10)/38043</strong> dated 16.04.2026.</p>
              <p>2) Fee heads marked with <span className="text-[#D4A017] font-bold">*</span> will be reviewed every year.</p>
            </div>
          </div>
        )}

        {/* ── RESERVED ─────────────────────────────────────────────── */}
        {activeTab === 'reserved' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)]">
                Reserved Category
              </h2>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                Govt. Fee Waiver Applied
              </span>
            </div>
            <p className="text-sm text-[#64748B] -mt-1 mb-4">
              Only mandatory statutory fees are charged. Tuition &amp; other institutional fees are waived as per Government of Maharashtra norms.
            </p>

            <YearSection
              year="First Year"
              rows={reservedY1Rows}
              keys={reservedKeys}
              courseNames={reservedCourses}
              data={reservedY1Data}
              totals={reservedY1Totals}
            />
            <YearSection
              year="Second Year"
              rows={reservedY2Rows}
              keys={reservedKeys}
              courseNames={reservedCourses}
              data={reservedY2Data}
              totals={reservedY2Totals}
            />
            <YearSection
              year="Third Year"
              rows={reservedY3Rows}
              keys={reservedKeys}
              courseNames={reservedCourses}
              data={reservedY3Data}
              totals={reservedY3Totals}
            />

            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800 space-y-1">
              <p className="font-semibold mb-1 flex items-center gap-1.5">
                <Info size={14} /> Notes
              </p>
              <p>1) The fees are as per Finance Committee Meeting dated <strong>17.04.2026</strong> vide Notification of Higher and Technical Education Department, Government of Maharashtra dated 14th January 2019 and University of Mumbai Circular Nos. <strong>2026APR/AAMS-III/(C-6)/37361</strong>, <strong>2026APR/AAMS-III/(C-8)/37894</strong> &amp; <strong>2026APR/AAMS-III/(C-10)/38043</strong> dated 16.04.2026.</p>
              <p>2) Fee heads marked with <span className="text-[#D4A017] font-bold">*</span> will be reviewed every year.</p>
            </div>
          </div>
        )}

        {/* ── LEGEND ───────────────────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: <IndianRupee size={16} />,
              title: 'Payment Modes',
              body: 'Fees can be paid online via the college portal, NEFT/RTGS, or at the college cash counter.',
              color: 'bg-blue-50 border-blue-200 text-blue-800',
              iconBg: 'bg-blue-100 text-blue-600',
            },
            {
              icon: <Info size={16} />,
              title: 'Starred (*) Fees',
              body: 'Fee heads marked with * are subject to revision every academic year as per University / Government notification.',
              color: 'bg-amber-50 border-amber-200 text-amber-800',
              iconBg: 'bg-amber-100 text-amber-600',
            },
            {
              icon: <GraduationCap size={16} />,
              title: 'Scholarship & Waiver',
              body: 'Students belonging to SC/ST/OBC/SEBC/NT/SBC categories are eligible for fee waivers under the Reserved Category structure.',
              color: 'bg-green-50 border-green-200 text-green-800',
              iconBg: 'bg-green-100 text-green-600',
            },
          ].map(c => (
            <div key={c.title} className={`rounded-2xl border p-5 ${c.color}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${c.iconBg}`}>
                {c.icon}
              </div>
              <p className="font-bold mb-1">{c.title}</p>
              <p className="text-sm opacity-80 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
