"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

const bfmFaculty = [
  { srNo: 1, name: 'Ms. Shilpa Thakur', additionalRole: 'Coordinator', designation: 'Vice-Principal (SFC) & Coordinator', department: 'BFM', education: 'MCom,Mphil', email: 'shilpa.thakur@mccmulund.ac.in', teachingExp: '28 yrs', image: '/Degree College Teachers/Shilpa Thakur.png' },
  { srNo: 2, name: 'Ms.Siddhi Kambli', additionalRole: '—', designation: 'Assistant Professor', department: 'BFM', education: 'M.Com., SET', email: 'Siddhi.kambli@mccmulumd.ac.in', teachingExp: '8 yrs', image: '/Degree College Teachers/Siddhi Kambli.png' },
  { srNo: 3, name: 'Dr.Sipra Routaray', additionalRole: '—', designation: 'Assistant Professor', department: 'BFM', education: 'Ph.D.,M.com., MBA., NET., SET.', email: 'sipra.routray@mccmulund.ac.in', teachingExp: '14 yrs', image: '/Degree College Teachers/Sipra Routray.png' },
  { srNo: 4, name: 'Ms. Archana Patre', additionalRole: '—', designation: 'Assistant Professor', department: 'BFM', education: 'MFM, M.Com', email: 'arch.dalvi@gmail.com', teachingExp: '9 yrs', image: '/Degree College Teachers/Archana Patre.png' },
];

export default function BFMPageClient() {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: '10+2 from any recognised Board in any stream.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years (NEP 4 Years), 6/8 Semesters.' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '12:00 PM – 04:30 PM' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '60 Seats' }
  ];

  return (
    <CourseTemplate
      festivals="Manthan"
      publication="Finanza"
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Commerce (B.Com) in Financial Markets (BFM) is a specialized undergraduate program designed to provide students with a comprehensive understanding of financial markets, investment strategies, and economic environments. This program aims to equip students with the theoretical and practical knowledge required to excel in the fast-paced world of finance and trading.</p>
        <p className="mb-4">The curriculum covers a broad range of subjects including equity markets, debt markets, derivatives, foreign exchange markets, portfolio management, financial risk management, and technical analysis. It also emphasizes the importance of regulatory frameworks and ethical practices in financial operations.</p>
        <p className="mb-4">Graduates of the BFM program have a wide array of career opportunities in areas such as equity research, investment banking, asset management, stockbroking, mutual funds, and corporate finance. The program also serves as an excellent foundation for pursuing higher education, such as an MBA in Finance, CFA (Chartered Financial Analyst), or other professional certifications in the finance sector.</p>
        <p className="mb-4">Ideal for students with a keen interest in finance, economics, and market dynamics, the BFM program prepares them to become skilled professionals capable of making informed and strategic financial decisions.</p>
      </>
      }
      syllabusContent={<SyllabusRenderer programKey="BFM" />}
      courseKey="BFM"
      shortInfo="An intensive course focused on capital markets, investment banking, portfolio management, and financial analytics for the modern financial sector."
      title="Bachelor of Commerce (Financial Markets)"
      fundingType="Self Financing"
      facultyData={bfmFaculty}
      quickActionsData={quickActions}
    />
  );
}

