"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  syllabusContent: React.ReactNode;
}

import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

const bcaFaculty = [
  { srNo: 1, name: 'Dr.Vishal Borude', additionalRole: 'BCA Co-ordinator', designation: 'Assistant Professor', department: 'Not Assigned', education: 'M.Sc.(IT).,Ph.D.', email: 'vishal.borude@mccmulund.ac.in', teachingExp: '0 yrs', image: '/Degree College Teachers/Vishal Borude.png' },
  { srNo: 2, name: 'Dr. Priti Pathak', additionalRole: 'DS Co-Ordinator', designation: 'Assistant Professor', department: 'Not Assigned', education: 'MSc(I.T).,MTech(I.T)., MBA(I.T).,LLB.,Diploma in Cyber Law., Ph.D.', email: 'priti.pathak@mccmulund.ac.in', teachingExp: '', image: '/Degree College Teachers/Priti Pathak.png' },
  { srNo: 3, name: 'Mr. Siddhesh Gotekar', additionalRole: '—', designation: 'Assistant Professor', department: 'Not Assigned', education: 'M.Sc.(IT)', email: 'gotekarsiddhesh@gmail.com', teachingExp: '0 yrs', image: '/Degree College Teachers/Siddhesh Gotekar.png' },
  { srNo: 4, name: 'Dr. Sandhya Pandey', additionalRole: '—', designation: 'Assistant Professor', department: 'Not Assigned', education: 'M.C.A., P.H.D.(Computer Science and Application), M.A.(Sociology)', email: 'sandhya.pandey@mccmulund.ac.in', teachingExp: '17 yrs', image: '/Degree College Teachers/Sandhya Pandey.png' },
];

export default function BCAPageClient({ syllabusContent }: Props) {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'HSC (any stream) with Maths/Stats OR Diploma in IT/CS/allied branches.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years, 6 Semesters (As Per NEP 2020).' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '02:05 PM – 08:10 PM' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '60 Seats' }
  ];

  return (
    <CourseTemplate
      courseKey="BCA"
      shortInfo="An application-oriented IT degree combining computer science fundamentals with software development and programming skills."
      festivals="Hack-A-Thon"
      publication="Tech Anugraha"
      introductionContent={
        <>
          <p className="mb-4">
            Welcome to the <strong>Bachelor of Science (Computer Applications)</strong> program at PTVA's Mulund College of Commerce (Autonomous)! This program is designed to provide students with knowledge and skills to become successful professionals in the field of computing.
          </p>
          <p className="mb-4">
            The B.Sc. (CA) program focuses on computer fundamentals, programming in languages such as C and Java, database management, internet technologies, operating system concepts, and more. The curriculum offers a balanced approach to software development, covering a wide range of topics from design principles to software security.
          </p>
          <p className="mb-4">
            Throughout the program students develop practical skills and apply their knowledge in hands-on projects. This program enables students to create a strong foundation of computing concepts and gets them ready to develop computer applications and websites for organizations.
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
      title="B.Sc. (Computer Applications)"
      fundingType="Self Financing"
      syllabusContent={syllabusContent}
      quickActionsData={quickActions}
      facultyData={bcaFaculty}
    />
  );
}

