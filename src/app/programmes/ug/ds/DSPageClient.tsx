"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  syllabusContent: React.ReactNode;
}

export default function DSPageClient({ syllabusContent }: Props) {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'HSC (any stream) with Maths/Stats OR Diploma in IT/CS/allied branches.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years, 6 Semesters (As Per NEP 2020).' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '2:30 p.m. – 8:30 p.m.' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '60 Seats.' }
  ];

  return (
    <CourseTemplate
      introductionContent={
        <>
          <p className="mb-4">
            The BSc (Data Science) is a three-year full-time degree program divided into six semesters. The goal of this course is to provide a study program that combines data science, machine learning, statistics, and mathematics. The program employs a rigorous approach, a mathematical focus, and involves the application of data science to the social sciences.
          </p>
          <p className="mb-4">
            This program provides in-depth training in the statistical foundations of data science, as well as a solid foundation in the computing skills and algorithmic reasoning required for modern data analysis. The BSc in Data Science meets the needs of IT, market research, and advanced hi-tech companies for providing valuable insights, decisions, or solutions from large amounts of data required for organizational growth.
          </p>

          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Eligibility Criteria</h4>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">HSC or equivalent in Arts / Science / Commerce / MCVC with <strong>Mathematics or Statistics</strong> as one of the subjects.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">Diploma in IT / CS / Electrical / Electronics / Mechanical / Civil / Electronics and Telecommunication / Instrumentation and allied branches from MSBTE or equivalent.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">Students from HSC <strong>without Mathematics or Statistics</strong> must undergo a <strong>30-hour bridge course</strong> on Mathematics and Statistics.</span>
            </li>
          </ul>
        </>
      }
      title="B.Sc. (Data Science)"
      description="A programme that combines data science, machine learning, statistics, and mathematics to produce industry-ready data professionals."
      syllabusContent={syllabusContent}
      quickActionsData={quickActions}
    />
  );
}
