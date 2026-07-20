"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

const mcomAAFaculty = [
  { srNo: 1, name: 'Dr. Riya Dhamapurkar', additionalRole: 'Coordinator', designation: 'Assistant Professor' },
];

export default function MComAAPageClient() {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'Graduation in relevant field from a recognised university.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '2 Years, 4 Semesters.' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: 'Contact College Administration.' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'Contact College Administration.' }
  ];

  return (
    <CourseTemplate
      introductionContent={
        <>
        <p className="mb-4">The Master of Commerce (M.Com) in Advanced Accountancy is a specialized postgraduate program designed to provide students with an advanced and rigorous understanding of accounting principles, financial management, and corporate taxation. This program focuses on developing a high level of expertise in analyzing complex financial data and making strategic financial decisions.</p>
        <p className="mb-4">The curriculum includes advanced subjects such as advanced financial accounting, strategic cost accounting, direct and indirect taxes, business valuation, and corporate financial reporting. It aims to equip students with critical analytical skills and a deep understanding of the regulatory frameworks that govern the accounting profession.</p>
        <p className="mb-4">Graduates of the M.Com (Advanced Accountancy) program have promising career prospects in areas like auditing, taxation, financial consulting, corporate finance, and investment banking. It also serves as an excellent foundation for pursuing further professional qualifications such as Chartered Accountancy (CA), Cost and Management Accountancy (CMA), and Certified Public Accountant (CPA).</p>
        <p className="mb-4">This program is ideal for students who have a strong aptitude for numbers and a keen interest in pursuing a successful career in the accounting and finance sectors.</p>
      </>
      }
      syllabusContent={<SyllabusRenderer programKey="MCOM_AA" />}
      courseKey="MCOM_AA"
      title="Master of Commerce (Advanced Accountancy)"
      description="An advanced postgraduate program providing deep expertise in accounting principles, financial management, and corporate taxation."
      facultyData={mcomAAFaculty}
      quickActionsData={quickActions}
    />
  );
}
