"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

const bbiFaculty = [
  { srNo: 1, name: 'Dr. Rajashri Deshpande', additionalRole: 'Coordinator', designation: 'Assistant Professor', department: 'BBI', education: 'M.Com.,MA., NET, Ph.D.', email: 'rajashri.deshpande@mccmulund.ac.in', teachingExp: '18 yrs' },
  { srNo: 2, name: 'Ms.Shilpa Thakur', additionalRole: 'Vice-Principal (SFC)', designation: 'Assistant Professor', department: 'BBI', education: 'MCom,Mphil', email: 'shilpa.thakur@mccmulund.ac.in', teachingExp: '28 yrs', image: '/Degree College Teachers/Shilpa Thakur.png' },
  { srNo: 3, name: 'Ms.Archana Kadam', additionalRole: '—', designation: 'Assistant Professor', department: 'BBI', education: 'M.Com.,MA., NET, PGDFM', email: 'archana.kadam@mccmulund.ac.in', teachingExp: '17 yrs', image: '/Degree College Teachers/Archana Kadam.png' },
  { srNo: 4, name: 'Ms.Seema Attarde', additionalRole: '—', designation: 'Assistant Professor', department: 'BBI', education: 'M.Sc.', email: 'seema.attarde@mccmulund.ac.in', teachingExp: '26 yrs', image: '/Degree College Teachers/Seema Attarde.png' },
];

export default function BBIPageClient() {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: '10+2 from any recognised Board.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years (NEP 4 Years), 6/8 Semesters.' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '07:15 AM – 11:40 AM' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '60 Seats' }
  ];

  return (
    <CourseTemplate
      festivals="Manthan + Shodh"
      publication="Pratibimb"
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
      shortInfo="A specialized programme focused on the banking and insurance sectors, equipping students with deep knowledge of financial services, risk management, and banking operations."
      title="Bachelor of Commerce (Banking & Insurance)"
      fundingType="Self Financing"
      facultyData={bbiFaculty}
      quickActionsData={quickActions}
    />
  );
}

