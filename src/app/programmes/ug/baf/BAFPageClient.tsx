"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

const bafFaculty = [
  { srNo: 1, name: 'Ms.Shilpa Thakur',        additionalRole: 'Co-ordinator',      designation: 'Assistant Professor', email: 'shilpa.thakur@mccmulund.ac.in',     education: 'MCom, MPhil',                       teachingExp: '28 yrs' },
  { srNo: 2, name: 'Dr. Rajashri Deshpande',  additionalRole: '—',                 designation: 'Assistant Professor', email: 'rajashri.deshpande@mccmulund.ac.in', education: 'M.Com., MA., NET, Ph.D.',           teachingExp: '18 yrs' },
  { srNo: 3, name: 'Ms.Alpa Katira',          additionalRole: '—',                 designation: 'Assistant Professor', email: 'alpa.katira@mccmulund.ac.in',        education: 'M.Com., B.Ed., SET',               teachingExp: '20 yrs' },
  { srNo: 4, name: 'Ms.Archana Kadam',        additionalRole: '—',                 designation: 'Assistant Professor', email: 'archana.kadam@mccmulund.ac.in',      education: 'M.Com., MA., NET, PGDFM',          teachingExp: '17 yrs' },
  { srNo: 5, name: 'Ms.Seema Attarde',        additionalRole: '—',                 designation: 'Assistant Professor', email: 'seema.attarde@mccmulund.ac.in',      education: 'M.Sc.',                            teachingExp: '26 yrs' },
  { srNo: 6, name: 'Mr.Nitin Pawar',          additionalRole: 'Coordinator',       designation: 'Assistant Professor', email: 'nitin.pawar@mccmulund.ac.in',        education: 'M.Com., M.Phil., MBA., SET',       teachingExp: '16 yrs' },
  { srNo: 7, name: 'Ms.Sneha Prajapati',      additionalRole: '—',                 designation: 'Assistant Professor', email: 'sneha.prajapati@mccmulund.ac.in',    education: 'M.Com., B.Ed., SET, NET',          teachingExp: '8 yrs' },
  { srNo: 8, name: 'Ms.Swapna Acharya',       additionalRole: '—',                 designation: 'Assistant Professor', email: 'swapna.acharya@mccmulund.ac.in',     education: 'M.Com., LLB, SET',                 teachingExp: '8 yrs' },
];

export default function BAFPageClient() {
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
      syllabusContent={<SyllabusRenderer programKey="BAF" />}
      quickActionsData={quickActions}
      courseKey="BAF"
      facultyData={bafFaculty}
    />
  );
}
