"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  syllabusContent: React.ReactNode;
}

export default function MScITPageClient({ syllabusContent }: Props) {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'B.Sc. IT / CS / BCA / B.E. IT / CS / Electronics & allied branches.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '2 Years, 4 Semesters | 60 Seats.' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '8:00 a.m. – 12:30 p.m. (incl. Sundays & Holidays).' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '60 Seats.' }
  ];

  return (
    <CourseTemplate
      introductionContent={
        <>
          <p className="mb-4">
            <strong>M.Sc. Information Technology (IT)</strong> focuses on developing a student's technical competence in information technology theory, application, and research-related aspects. It is a two-year full-time postgraduate program divided into four semesters, with two semesters per year.
          </p>
          <p className="mb-4">
            The program's goal is to prepare students for careers in the IT industry as well as research. Candidates enrolled in the course are trained to be productive in the industry and to pursue good career opportunities in the future.
          </p>
          <p className="mb-4">
            The program aims to provide technology-oriented students with the knowledge and ability to develop creative solutions, as well as a better understanding of the effects of future computer system and technology developments on people and society.
          </p>

          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Eligibility Criteria</h4>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">B.Sc. (IT) / B.Sc. (CS) / B.Sc. (Data Science) / B.Sc. (Artificial Intelligence) / B.Sc. (Cloud Computing) / B.Sc. Mathematics / B.Sc. Physics / B.Sc. Statistics / B.Sc. Electronics / B.Sc. (Computer Applications) and allied branches.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">B.E. (Information Technology) / B.E. (Computer Science) / B.E. (Electronics) and allied branches.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">BCA from a recognised university.</span>
            </li>
          </ul>

          <div className="bg-[#FFF8E7] border border-[#D4A017]/30 rounded-xl p-4 text-sm text-gray-700">
            <strong className="text-[#D4A017]">Note:</strong> Practical timings may vary from time to time. Classes are held including Sundays and Holidays.
          </div>
        </>
      }
      title="M.Sc. (Information Technology)"
      description="A two-year postgraduate programme developing advanced technical competence in AI, ML, Cloud Computing, Data Science, and emerging IT technologies."
      syllabusContent={syllabusContent}
      quickActionsData={quickActions}
    />
  );
}
