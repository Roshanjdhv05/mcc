"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  syllabusContent: React.ReactNode;
}

export default function MComAAPageClient({ syllabusContent }: Props) {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'B.Com from any recognised University in Maharashtra.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '2 Years, 4 Semesters | Aided (80 seats).' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: 'Evening: 5:30 p.m. – 8:30 p.m.' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '80 Seats (Aided).' }
  ];

  return (
    <CourseTemplate
      introductionContent={
        <>
          <p className="mb-4">
            Mulund College of Commerce (MCC) is a well-known brand in commerce education at Mumbai University. In order to quench the thirst of students for post-graduation in commerce, the college started <strong>M.Com (Advanced Accountancy)</strong> in 1980 — an aided course since its very beginning.
          </p>
          <p className="mb-4">
            The post-graduate centre provides all essential facilities. The library is fully computerised and well-equipped with text books, reference books, journals and books on various competitive examinations. The teaching staff is well-experienced and qualified, helping the college achieve excellent results, consistently topping the university merit list.
          </p>
          <p className="mb-4">
            Faculties also mentor students about career planning, placement guidance, and competitive examinations. A professional counsellor is appointed to support students regarding academic and personal problems. All M.Com courses are <strong>evening courses</strong>, providing opportunities for working students to pursue further education.
          </p>

          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Eligibility Criteria</h4>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">Must have passed the <strong>Bachelor of Commerce</strong> examination conducted by any University in Maharashtra.</span>
            </li>
          </ul>
        </>
      }
      title="M.Com (Advanced Accountancy)"
      description="A postgraduate programme specialising in advanced financial reporting, taxation, auditing, and financial management for commerce graduates."
      syllabusContent={syllabusContent}
      quickActionsData={quickActions}
    />
  );
}
