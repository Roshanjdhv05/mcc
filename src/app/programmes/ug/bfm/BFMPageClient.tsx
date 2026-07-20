"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

const bfmFaculty = [
  { srNo: 1, name: 'Ms.Shilpa Thakur',  additionalRole: 'Co-ordinator', designation: 'Assistant Professor', email: 'shilpa.thakur@mccmulund.ac.in',  education: 'MCom., MPhil.',                                 teachingExp: '28 yrs' },
  { srNo: 2, name: 'Ms.Siddhi Kambli',  additionalRole: '—',            designation: 'Assistant Professor', email: 'Siddhi.kambli@mccmulumd.ac.in',  education: 'M.Com., SET',                                   teachingExp: '8 yrs' },
  { srNo: 3, name: 'Ms. Archana Patre', additionalRole: '—',            designation: 'Assistant Professor', email: 'arch.dalvi@gmail.com',           education: 'MFM, M.Com',                                    teachingExp: '9 yrs' },
  { srNo: 4, name: 'Dr.Sipra Routaray', additionalRole: '—',            designation: 'Assistant Professor', email: 'sipra.routray@mccmulund.ac.in',  education: 'Ph.D., M.Com., MBA., NET., SET.',               teachingExp: '14 yrs' },
];

export default function BFMPageClient() {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: '10+2 from any recognised Board in any stream.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years (NEP 4 Years), 6/8 Semesters.' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: 'Morning / Afternoon Batches.' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'Contact College Administration.' }
  ];

  return (
    <CourseTemplate
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
      title="Bachelor of Commerce (Financial Markets)"
      description="A specialized undergraduate program providing comprehensive understanding of financial markets, investment strategies, and economic environments."
      facultyData={bfmFaculty}
      quickActionsData={quickActions}
    />
  );
}
