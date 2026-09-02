"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

const bafFaculty = [
  { srNo: 1, name: 'Ms.Alpa Katira', additionalRole: '—', designation: 'Assistant Professor', department: 'BAF', education: 'M.Com.,B.Ed., SET', email: 'alpa.katira@mccmulund.ac.in', teachingExp: '20 yrs', image: '/Degree College Teachers/Alpa Katira.png' },
  { srNo: 2, name: 'Ms. Shilpa Thakur', additionalRole: '—', designation: 'Vice-Principal (SFC)', department: 'BAF', education: 'MCom, MPhil', email: 'shilpa.thakur@mccmulund.ac.in', teachingExp: '28 yrs', image: '/Degree College Teachers/Shilpa Thakur.png' },
  { srNo: 3, name: 'Mr.Nitin Pawar', additionalRole: 'Coordinator', designation: 'Assistant Professor', department: 'BAF', education: 'M.Com.,M.Phil., MBA., SET', email: 'nitin.pawar@mccmulund.ac.in', teachingExp: '16 yrs', image: '/Degree College Teachers/Nitin Pawar.png' },
  { srNo: 4, name: 'Ms.Swapna Acharya', additionalRole: '—', designation: 'Assistant Professor', department: 'BAF', education: 'M.Com.,LLB, SET', email: 'swapna.acharya@mccmulund.ac.in', teachingExp: '8 yrs', image: '/Degree College Teachers/Swapana Acharya.png' },
  { srNo: 5, name: 'Dr.Sneha Prajapati', additionalRole: '—', designation: 'Assistant Professor', department: 'BAF', education: 'M.Com.,B.Ed., SET,NET', email: 'sneha.prajapati@mccmulund.ac.in', teachingExp: '8 yrs', image: '/Degree College Teachers/Sneha Prajapati.png' },
];

export default function BAFPageClient() {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'HSC (Std. XII) passed from Maharashtra Board or equivalent.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years, 6 Semesters (As Per NEP 2020).' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '07:15 AM – 11:40 AM' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '120 Seats' }
  ];

  return (
    <CourseTemplate 
      festivals="Manthan"
      publication="Pratibimb"
      introductionContent={
        <>
          <p className="mb-4">The Bachelor of Commerce (Accounting & Finance) degree program is a three-year undergraduate course divided into six semesters. This course offers in-depth knowledge in accounting & financial subjects by adopting both traditional as well as innovative pedagogy of classroom teaching, seminars, projects practical training, industrial visits, conferences, expert talks, etc.</p>
          <p className="mb-4">The program enables the learner to prepare for essential life skills for employment as well as self-employment. This is the most sought program for students who are planning to pursue CA, CWA and CS, since the entire syllabus is suitably designed for such professional programs.</p>
          <p className="mb-4">This program with a blend of theoretical and practical knowledge brings out analytical financial acumen and makes a learner Industry ready. This program helps industries by providing suitably trained professionals in the field of accounting & finance.</p>
          
        </>
      }
      title="B.COM (Accounting & Finance)"
      fundingType="Self Financing"
      syllabusContent={<SyllabusRenderer programKey="BAF" />}
      quickActionsData={quickActions}
      courseKey="BAF"
      shortInfo="A specialized commerce programme that trains students in financial accounting, auditing, taxation, and cost management — ideal for careers in CA, finance consulting, and corporate accounting."
      facultyData={bafFaculty}
    />
  );
}

