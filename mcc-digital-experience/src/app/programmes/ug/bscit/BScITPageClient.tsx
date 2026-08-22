"use client";

import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  syllabusContent: React.ReactNode;
}

const bscitFaculty = [
  { srNo: 1, name: 'Dr.Jyotika Chheda', additionalRole: 'IT Co-ordinator', designation: 'Assistant Professor', department: 'SCT (School of Computing and Technology)', education: 'MCA., NET., Ph.D.', email: 'jyotika.chheda@mccmulund.ac.in', teachingExp: '', image: '/Degree College Teachers/Jyotika Chheda.png' },
  { srNo: 2, name: 'Dr.Vishal Borude', additionalRole: '—', designation: 'Assistant Professor', department: 'SCT (School of Computing and Technology)', education: 'M.Sc.(IT).,Ph.D.', email: 'vishal.borude@mccmulund.ac.in', teachingExp: '12 yrs', image: '/Degree College Teachers/Vishal Borude.png' },
  { srNo: 3, name: 'Dr.Priti Pathak', additionalRole: 'DS Co-Ordinator', designation: 'Assistant Professor', department: 'SCT (School of Computing and Technology)', education: 'MSc(I.T).,MTech(I.T)., MBA(I.T).,LLB.,Diploma in Cyber Law., Ph.D.', email: 'priti.pathak@mccmulund.ac.in', teachingExp: '', image: '/Degree College Teachers/Priti Pathak.png' },
  { srNo: 4, name: 'Ms. Suvarna Ramesh Sawant', additionalRole: '—', designation: 'Assistant Professor', department: 'SCT (School of Computing and Technology)', education: 'Master in Computer Application', email: 'suvarna.sawant@mccmulund.ac.in', teachingExp: '', image: '/Degree College Teachers/Suvarna Sawant.png' },
  { srNo: 5, name: 'Dr. Sandhya Pandey', additionalRole: '—', designation: 'Assistant Professor', department: 'SCT (School of Computing and Technology)', education: 'M.C.A., P.H.D.(Computer Science and Application), M.A.(Sociology)', email: 'sandhya.pandey@mccmulund.ac.in', teachingExp: '17 yrs', image: '/Degree College Teachers/Sandhya Pandey.png' },
  { srNo: 6, name: 'Mr.Siddhesh Gotekar', additionalRole: '—', designation: 'Assistant Professor', department: 'SCT (School of Computing and Technology)', education: 'M.Sc.(IT)', email: 'gotekarsiddhesh@gmail.com', teachingExp: '3 yrs', image: '/Degree College Teachers/Siddhesh Gotekar.png' },
];

export default function BScITPageClient({ syllabusContent }: Props) {
  const quickActions = [
    { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'HSC (any stream) with Mathematics OR 3-yr Diploma from MSBTE.' },
    { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years, 6 Semesters (As Per NEP 2020).' },
    { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '10:40 AM – 04:15 PM' },
    { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '120 Seats' }
  ];

  return (
    <CourseTemplate
      courseKey="BSC_IT"
      shortInfo="A technology-driven programme preparing students for software development, IT consulting, and network administration."
      festivals="Hack-A-Thon"
      publication="Tech Anugraha"
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
      fundingType="Self Financing"
      syllabusContent={syllabusContent}
      quickActionsData={quickActions}
      facultyData={bscitFaculty}
    />
  );
}

