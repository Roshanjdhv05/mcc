"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  syllabusContent: React.ReactNode;
}

const bscitFaculty = [
  { srNo: 1, name: 'Dr.Jyotika Chheda',        additionalRole: 'IT Co-ordinator',  designation: 'Assistant Professor', email: 'jyotika.chheda@mccmulund.ac.in',  education: 'MCA., NET., Ph.D.',                                                              teachingExp: '' },
  { srNo: 2, name: 'Dr.Vishal Borude',          additionalRole: '—',               designation: 'Assistant Professor', email: 'vishal.borude@mccmulund.ac.in',   education: 'M.Sc.(IT)., Ph.D.',                                                             teachingExp: '12 yrs' },
  { srNo: 3, name: 'Dr.Priti Pathak',           additionalRole: 'DS Co-Ordinator', designation: 'Assistant Professor', email: 'priti.pathak@mccmulund.ac.in',    education: 'MSc(I.T)., MTech(I.T)., MBA(I.T)., LLB., Diploma in Cyber Law., Ph.D.',     teachingExp: '' },
  { srNo: 4, name: 'Ms. Suvarna Ramesh Sawant', additionalRole: '—',               designation: 'Assistant Professor', email: 'suvarna.sawant@mccmulund.ac.in',   education: 'Master in Computer Application',                                               teachingExp: '' },
  { srNo: 5, name: 'Dr. Sandhya Pandey',        additionalRole: '—',               designation: 'Assistant Professor', email: 'sandhya.pandey@mccmulund.ac.in',  education: 'M.C.A., Ph.D. (Computer Science), M.A.(Sociology)',                          teachingExp: '17 yrs' },
  { srNo: 6, name: 'Mr.Siddhesh Gotekar',       additionalRole: '—',               designation: 'Assistant Professor', email: 'gotekarsiddhesh@gmail.com',        education: 'M.Sc.(IT)',                                                                     teachingExp: '3 yrs' },
];

export default function BScITPageClient({ syllabusContent }: Props) {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'HSC (any stream) with Mathematics OR 3-yr Diploma from MSBTE.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years, 6 Semesters (As Per NEP 2020).' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: 'FY: 10:30 a.m. – 6:00 p.m. | SY & TY: 10:50 a.m. – 6:00 p.m.' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '120 Seats.' }
  ];

  return (
    <CourseTemplate
      introductionContent={
        <>
          <p className="mb-4">
            The BSc (IT) is a three-year full-time degree program divided into six semesters, preparing students to meet the information and communication technology needs of government, business, healthcare, universities, and other types of organizations.
          </p>
          <p className="mb-4">
            The application of computers and telecommunication systems to produce, manipulate, store, organize, retrieve, and transmit data is known as Information Technology (IT). It entails the creation, installation, implementation, management, and upkeep of computer hardware and software within businesses and organizations.
          </p>
          <p className="mb-4">
            Programming, Database Management, Networking, Artificial Intelligence, Software Engineering, Electronics, and Applied Mathematics are among the topics covered. Taking into consideration the current trend, the course has made room for new technologies such as Android Programming, Green Computing, and so on.
          </p>

          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Eligibility Criteria</h4>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">HSC or equivalent from <strong>any stream</strong> with Mathematics as one of the subjects.</span>
            </li>
            <li className="flex items-start gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-0.5 fill-[#EBF3FF]" size={16} />
              <span className="leading-snug">3-year Diploma from MSBTE or equivalent.</span>
            </li>
          </ul>

          <h4 className="font-bold text-[#1E293B] mt-6 mb-3 text-lg">Program Timings</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="bg-[#F8FAFC] rounded-lg p-3 border"><strong>First Year:</strong> Practicals: 10:30 a.m. – 12:30 p.m. | Lectures: 12:40 p.m. – 6:00 p.m.</div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 border"><strong>Second Year:</strong> Lectures: Mon/Wed/Fri: 10:50 a.m. – 4:10 p.m. | Tue/Thu/Sat: 10:50 a.m. – 2:00 p.m. | Practicals: Tue/Thu/Sat: 2:30 p.m. – 6:00 p.m.</div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 border"><strong>Third Year:</strong> Lectures: Mon/Wed/Fri: 10:50 a.m. – 2:00 p.m. | Tue/Thu/Sat: 10:50 a.m. – 4:10 p.m. | Practicals: Mon/Wed/Fri: 2:30 p.m. – 6:00 p.m.</div>
          </div>
        </>
      }
      title="B.Sc. (Information Technology)"
      description="A three-year full-time programme preparing students to meet the ICT needs of government, business, healthcare, and other organisations."
      syllabusContent={syllabusContent}
      quickActionsData={quickActions}
      facultyData={bscitFaculty}
    />
  );
}
