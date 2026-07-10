"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  syllabusContent: React.ReactNode;
}

export default function BMSPageClient({ syllabusContent }: Props) {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'HSC / Diploma in Engg. Admission based on merit weightage.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years, 6 Semesters (As Per NEP 2020).' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '11:00 a.m. - 5:00 p.m.' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '120 Seats.' }
  ];

  return (
    <CourseTemplate 
      introductionContent={
        <>
          <p className="mb-4">
            <strong>Bachelor of Commerce (B.Com) in Management Studies</strong> is an undergraduate program designed to provide students with in-depth knowledge of business management, financial principles, and organizational strategies.
          </p>
          <p className="mb-4">
            Mulund College of Commerce introduced BMS since its inception at Mumbai University in June 1999. The curriculum has been specially designed by keeping in mind the requirements of industry and in order to equip students with the skills of business leadership. The students are to select any one of the specializations viz. Marketing, Finance & HR.
          </p>
          <p className="mb-4">
            Graduates can pursue careers in corporate management, banking, finance, marketing, entrepreneurship, and consulting. They can also opt for higher education like MBA, M.Com, CFA, or other professional certifications.
          </p>
          
          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Eligibility & Admissions</h4>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">Passed H.S.C. Examination of the Maharashtra Board or its equivalent examination OR Diploma in any Engineering branches with 2 or 3 years duration after S.S.C. in one attempt.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">Admissions are purely based on merit with stream-wise weightage: <strong>Commerce (45%), Arts (25%), Science (25%), Others & Diploma in Engineering (5%)</strong>.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">Vacant seats from any specific stream quota are transferred to other streams sequentially (e.g. from Diploma/Others to Commerce) ensuring optimal capacity utilization.</span>
            </li>
          </ul>
        </>
      }
      title="B.Com (Management Studies)"
      description="The BMS programme offers deep insights into management practices, preparing dynamic leaders and entrepreneurs for the future."
      syllabusContent={syllabusContent}
      quickActionsData={quickActions}
      courseKey="BMS"
    />
  );
}
