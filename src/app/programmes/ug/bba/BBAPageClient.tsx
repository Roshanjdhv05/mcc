"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

export default function BBAPageClient() {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'HSC / Diploma in Engg. Admission based on merit.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years, 6 Semesters (As Per NEP 2020).' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '12:00 p.m. - 6:00 p.m.' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '60 Seats.' }
  ];

  return (
    <CourseTemplate 
      introductionContent={
        <>
          <p className="mb-4">
            <strong>Bachelor of Commerce (Business Administration)</strong> or BBA is one of the most popular undergraduate degree programs. The BBA program is Business & Entrepreneurship driven. It has a dynamic array of Major, Minor courses, Electives, Vocational skill-based courses and Ability Enrichment courses, Value Education Courses, Digital fluency and Skill enhancement courses.
          </p>
          <p className="mb-4">
            The school of Business is focused towards transforming young aspiring minds into tomorrow's managerial professionals all geared to take on challenges of the corporate world. One of the best pedagogies would be "Grooming & Transforming" – developing the potential of students, guiding and empowering them to create a cutting edge for themselves.
          </p>
          <p className="mb-4">
            This program helps in nurturing every student and budding entrepreneur to understand their innate abilities, strengths and work on the needed skill areas. Each and every subject will be dealt with case studies, Role plays, Real life challenges and simulation models.
          </p>
          
          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Eligibility Criteria</h4>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">Passed H.S.C. Examination of the Maharashtra Board or its equivalent examination OR Diploma in any Engineering branches with 2 or 3 years duration after S.S.C. in one attempt.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">The admissions are purely based on merit duly following the reservation policy as per the norms of Government of Maharashtra.</span>
            </li>
          </ul>
        </>
      }
      title="B.Com (Business Administration)"
      description="The BBA programme provides a fundamental education in business and management principles, preparing students for leadership roles in the corporate sector."
      syllabusContent={<SyllabusRenderer programKey="BBA" />}
      quickActionsData={quickActions}
    />
  );
}
