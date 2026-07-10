"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  syllabusContent: React.ReactNode;
}

export default function BAFPageClient({ syllabusContent }: Props) {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'HSC (Std. XII) passed from Maharashtra Board or equivalent.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years, 6 Semesters (As Per NEP 2020).' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '07:15 a.m. - 12:00 p.m.' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '120 Seats.' }
  ];

  return (
    <CourseTemplate 
      introductionContent={
        <>
          <p className="mb-4">The Bachelor of Commerce (Accounting & Finance) degree program is a three-year undergraduate course divided into six semesters. This course offers in-depth knowledge in accounting & financial subjects by adopting both traditional as well as innovative pedagogy of classroom teaching, seminars, projects practical training, industrial visits, conferences, expert talks, etc.</p>
          <p className="mb-4">The program enables the learner to prepare for essential life skills for employment as well as self-employment. This is the most sought program for students who are planning to pursue CA, CWA and CS, since the entire syllabus is suitably designed for such professional programs.</p>
          <p className="mb-4">This program with a blend of theoretical and practical knowledge brings out analytical financial acumen and makes a learner Industry ready. This program helps industries by providing suitably trained professionals in the field of accounting & finance.</p>
          
          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Eligibility Criteria</h4>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">Passed XII (HSC) Examination of the Maharashtra Board of Higher Secondary Education or its equivalent in one and the same sitting.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">Every candidate admitted to the degree course shall have to register himself / herself with the university.</span>
            </li>
          </ul>
        </>
      }
      title="B.COM (Accounting & Finance)"
      description="An in-depth program bringing out analytical financial acumen and making a learner Industry ready for the accounting & finance sectors."
      syllabusContent={syllabusContent}
      quickActionsData={quickActions}
      courseKey="BAF"
    />
  );
}
