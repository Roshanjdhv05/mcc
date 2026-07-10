"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  syllabusContent: React.ReactNode;
}

export default function BComPageClient({ syllabusContent }: Props) {
  const quickActions = [
    { title: 'Eligibility', icon: Users, info: 'HSC (Std. XII) passed from Maharashtra Board or equivalent.' },
    { title: 'Programme Design', icon: FileText, info: '3 Years, 6 Semesters (As Per NEP 2020).' },
    { title: 'Timing', icon: Clock, info: '07:15 a.m. - 10:51 a.m. (Tutorials/Practicals till 12:30)' },
    { title: 'Intake Capacity', icon: Users, info: '600 Seats (Fully aided by the Government).' }
  ];

  return (
    <CourseTemplate 
      introductionContent={
        <>
          <p className="mb-4">The Bachelor of Commerce (B.Com) program is a 3-year (6 semesters) degree as per NEP 2020. Fully aided by the Government, it offers subsidized quality education delivered by highly qualified faculty.</p>
          <p className="mb-4">A graduate in B.Com is adequately exposed and trained in various disciplines including Finance, Accounting, Banking, Insurance, Management, Marketing, and Law. Our curriculum also incorporates Mathematics and Environmental Studies to aid students in competitive examinations.</p>
          
          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Programme Highlights</h4>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug"><strong>The 'CA Factory':</strong> Conducive environment to pursue professional courses like CA, CS, CMA and ACCA.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug"><strong>Competitive Exams:</strong> Specialized mentoring for UPSC, MPSC, IBPS, SSC, and RRB.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug"><strong>Alumni & Industry Linkage:</strong> Rich network of illustrious alumni willing to mentor new batches.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug"><strong>Skill & Value Based:</strong> Additional courses that hone competencies for immediate job-readiness.</span>
            </li>
          </ul>

          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Eligibility Criteria</h4>
          <p className="mb-2 text-sm text-gray-700">Passed Higher Secondary School Certificate (Std. XII) examination conducted by different Divisional Boards of Maharashtra State Board.</p>
          <p className="mb-2 text-sm text-gray-700">OR Passed HSC (Std. XII) with vocational subjects/minimum competency based vocational course.</p>
          <p className="mb-4 text-sm text-gray-700">OR Passed examination of another University or Body recognized as equivalent to HSC (Std. XII).</p>
        </>
      }
      title="Bachelor of Commerce (B.Com)"
      description="The oldest and most prestigious program of the college, preparing students for diverse careers in commerce, finance, and competitive examinations."
      syllabusContent={syllabusContent}
      quickActionsData={quickActions}
    />
  );
}
