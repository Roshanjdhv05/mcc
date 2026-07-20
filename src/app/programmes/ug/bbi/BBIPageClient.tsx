"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

const bbiFaculty = [
  { srNo: 1, name: 'Ms.Shilpa Thakur',       additionalRole: 'Co-ordinator',  designation: 'Assistant Professor', email: 'shilpa.thakur@mccmulund.ac.in',     education: 'MCom, MPhil',                teachingExp: '28 yrs' },
  { srNo: 2, name: 'Dr. Rajashri Deshpande', additionalRole: '—',             designation: 'Assistant Professor', email: 'rajashri.deshpande@mccmulund.ac.in', education: 'M.Com., MA., NET, Ph.D.',    teachingExp: '18 yrs' },
  { srNo: 3, name: 'Ms.Alpa Katira',         additionalRole: '—',             designation: 'Assistant Professor', email: 'alpa.katira@mccmulund.ac.in',        education: 'M.Com., B.Ed., SET',        teachingExp: '20 yrs' },
  { srNo: 4, name: 'Ms.Archana Kadam',       additionalRole: '—',             designation: 'Assistant Professor', email: 'archana.kadam@mccmulund.ac.in',      education: 'M.Com., MA., NET, PGDFM',   teachingExp: '17 yrs' },
  { srNo: 5, name: 'Ms.Seema Attarde',       additionalRole: '—',             designation: 'Assistant Professor', email: 'seema.attarde@mccmulund.ac.in',      education: 'M.Sc.',                     teachingExp: '26 yrs' },
  { srNo: 6, name: 'Mr.Nitin Pawar',         additionalRole: '—',             designation: 'Assistant Professor', email: 'nitin.pawar@mccmulund.ac.in',        education: 'M.Com., M.Phil., MBA., SET', teachingExp: '16 yrs' },
  { srNo: 7, name: 'Ms.Sneha Prajapati',     additionalRole: '—',             designation: 'Assistant Professor', email: 'sneha.prajapati@mccmulund.ac.in',    education: 'M.Com., B.Ed., SET, NET',   teachingExp: '8 yrs' },
  { srNo: 8, name: 'Ms.Swapna Acharya',      additionalRole: '—',             designation: 'Assistant Professor', email: 'swapna.acharya@mccmulund.ac.in',     education: 'M.Com., LLB, SET',          teachingExp: '8 yrs' },
];

export default function BBIPageClient() {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: '10+2 from any recognised Board.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years (NEP 4 Years), 6/8 Semesters.' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: 'Contact College Administration.' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'Contact College Administration.' }
  ];

  return (
    <CourseTemplate
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Commerce (B.Com) in Banking & Insurance (BBI) is a specialized undergraduate program designed to provide students with comprehensive knowledge of the banking, finance, and insurance sectors. This course focuses on key financial concepts, risk management, investment strategies, and regulatory frameworks that govern the banking and insurance industries.</p>
        <p className="mb-4">The curriculum includes subjects such as financial accounting, banking law and operations, insurance management, investment banking, risk assessment, financial markets, and corporate finance. It aims to equip students with analytical and problem-solving skills essential for making strategic financial decisions.</p>
        <p className="mb-4">Graduates of B.Com in Banking & Insurance can explore career opportunities in commercial and investment banking, insurance companies, financial consultancies, stock markets, and regulatory institutions. They can also pursue higher education, such as MBA in Finance, M.Com, Chartered Financial Analyst (CFA), or professional certifications like CAIIB (Certified Associate of the Indian Institute of Bankers).</p>
        <p className="mb-4">This program is ideal for students who aspire to build a career in banking, finance, and insurance, and seek in-depth knowledge of financial risk management and economic policies.</p>
      </>
      }
      syllabusContent={<SyllabusRenderer programKey="BBI" />}
      courseKey="BBI"
      title="Bachelor of Commerce (Banking & Insurance)"
      description="A specialized undergraduate program designed to provide comprehensive knowledge of the banking, finance, and insurance sectors."
      facultyData={bbiFaculty}
      quickActionsData={quickActions}
    />
  );
}
