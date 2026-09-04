"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  syllabusContent: React.ReactNode;
}

const bscCSFaculty = [
  { srNo: 1, name: 'Dr. Jyotika Chheda', additionalRole: 'CS Co-ordinator', designation: 'Assistant Professor', department: 'SCT (School of Computing and Technology)', education: 'MCA., NET., Ph.D.', email: 'jyotika.chheda@mccmulund.ac.in', teachingExp: '16 yrs', image: '/Degree College Teachers/Jyotika Chheda.png' },
  { srNo: 2, name: 'Dr. Vishal Borude', additionalRole: '—', designation: 'Assistant Professor', department: 'SCT (School of Computing and Technology)', education: 'M.Sc.(IT), Ph.D.', email: 'vishal.borude@mccmulund.ac.in', teachingExp: '12 yrs', image: '/Degree College Teachers/Vishal Borude.png' },
  { srNo: 3, name: 'Dr. Priti Pathak', additionalRole: '—', designation: 'Assistant Professor', department: 'SCT (School of Computing and Technology)', education: 'MSc(I.T), MTech(I.T), MBA(I.T), LLB, Diploma in Cyber Law, Ph.D.', email: 'priti.pathak@mccmulund.ac.in', teachingExp: '15 yrs', image: '/Degree College Teachers/Priti Pathak.png' },
  { srNo: 4, name: 'Dr. Sandhya Pandey', additionalRole: '—', designation: 'Assistant Professor', department: 'SCT (School of Computing and Technology)', education: 'M.C.A., Ph.D. (Computer Science & Application), M.A. (Sociology)', email: 'sandhya.pandey@mccmulund.ac.in', teachingExp: '18 yrs', image: '/Degree College Teachers/Sandhya Pandey.png' },
  { srNo: 5, name: 'Ms. Suvarna Ramesh Sawant', additionalRole: '—', designation: 'Assistant Professor', department: 'SCT (School of Computing and Technology)', education: 'Master in Computer Application', email: 'suvarna.sawant@mccmulund.ac.in', teachingExp: '12 yrs', image: '/Degree College Teachers/Suvarna Sawant.png' },
];

export default function BScCSPageClient({ syllabusContent }: Props) {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#7C3AED]" size={18} />, info: 'HSC (Science stream) with Mathematics / HSC (any stream) with Mathematics from a recognized board.' },
    { title: 'Programme Design', icon: <FileText className="text-[#7C3AED]" size={18} />, info: '3 Years, 6 Semesters (As Per NEP 2020).' },
    { title: 'Timing', icon: <Clock className="text-[#7C3AED]" size={18} />, info: '10:40 AM – 04:15 PM' },
    { title: 'Intake Capacity', icon: <Users className="text-[#7C3AED]" size={18} />, info: '60 Seats' }
  ];

  return (
    <CourseTemplate
      courseKey="BSC_CS"
      shortInfo="A rigorous computing degree focused on theoretical computer science, algorithms, software engineering, and artificial intelligence."
      festivals="TechFest"
      publication="CS Spectrum"
      introductionContent={
        <>
          <p className="mb-4">
            The B.Sc. (Computer Science) is a three-year full-time undergraduate degree programme divided into six semesters. It is designed to provide students with a solid grounding in the theoretical and practical aspects of computer science, equipping them to meet the growing demands of the technology industry.
          </p>
          <p className="mb-4">
            The programme covers a wide range of subjects including Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Software Engineering, Artificial Intelligence, Machine Learning, and Cybersecurity. Students gain hands-on experience through laboratory sessions, project work, and industrial visits.
          </p>
          <p className="mb-4">
            With a strong emphasis on problem-solving, analytical thinking, and innovation, graduates of this programme are well-prepared for careers in software development, research, data science, system design, and more.
          </p>

          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Eligibility Criteria</h4>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#7C3AED] shrink-0 mt-0.5 fill-[#F3EEFF]" size={16} />
              <span className="leading-snug">HSC (Science stream) with <strong>Mathematics</strong> as one of the subjects from a recognized board.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#7C3AED] shrink-0 mt-0.5 fill-[#F3EEFF]" size={16} />
              <span className="leading-snug">HSC (any stream) with Mathematics OR 3-year Diploma from MSBTE or equivalent.</span>
            </li>
          </ul>

          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Programme Timings</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="bg-[#F8FAFC] rounded-lg p-3 border"><strong>First Year:</strong> Practicals: 10:30 a.m. – 12:30 p.m. | Lectures: 12:40 p.m. – 6:00 p.m.</div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 border"><strong>Second Year:</strong> Lectures: Mon/Wed/Fri: 10:50 a.m. – 4:10 p.m. | Tue/Thu/Sat: 10:50 a.m. – 2:00 p.m. | Practicals: Tue/Thu/Sat: 2:30 p.m. – 6:00 p.m.</div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 border"><strong>Third Year:</strong> Lectures: Mon/Wed/Fri: 10:50 a.m. – 2:00 p.m. | Tue/Thu/Sat: 10:50 a.m. – 4:10 p.m. | Practicals: Mon/Wed/Fri: 2:30 p.m. – 6:00 p.m.</div>
          </div>
        </>
      }
      title="B.Sc. (Computer Science)"
      fundingType="Self Financing"
      syllabusContent={syllabusContent}
      quickActionsData={quickActions}
      facultyData={bscCSFaculty}
    />
  );
}
