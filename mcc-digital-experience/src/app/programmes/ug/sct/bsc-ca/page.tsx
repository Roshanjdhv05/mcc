import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';
import { renderSyllabusTable } from '@/lib/syllabusData';
import { Users, Clock, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'B.Sc. (CA) | MCC Digital Experience Platform',
  description: 'Bachelor of Science (Computer Applications) at Mulund College of Commerce.',
};

const bscCaFaculty = [
  { srNo: 1, name: 'Dr. Vishal Borude', additionalRole: 'Coordinator', designation: 'Assistant Professor', department: 'B.Sc. CA', education: 'M.Sc.(IT).,Ph.D.', email: 'vishal.borude@mccmulund.ac.in', teachingExp: '0 yrs', image: '/Degree College Teachers/Vishal Borude.png' },
  { srNo: 2, name: 'Mr. Siddhesh Gotekar', additionalRole: '—', designation: 'Assistant Professor', department: 'B.Sc. CA', education: 'M.Sc.(IT)', email: 'gotekarsiddhesh@gmail.com', teachingExp: '0 yrs', image: '/Degree College Teachers/Siddhesh Gotekar.png' },
];

const quickActions = [
  { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: 'HSC (any stream) with Maths/Stats OR Diploma in IT/CS/allied branches.' },
  { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years, 6 Semesters (As Per NEP 2020).' },
  { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '02:05 PM – 08:10 PM' },
  { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '60 Seats' },
];

export default function CoursePage() {
  return (
    <CourseTemplate 
      festivals="Hack-A-Thon"
      publication="Tech Anugraha"
      introductionContent={
        <>
        <p className="mb-4">Bachelor of Science (B.Sc.) in Computer Applications is an undergraduate program that blends computer science principles with practical application development. This course is designed to provide students with a strong foundation in programming, software development, database management, networking, and system analysis.</p>
        <p className="mb-4">The curriculum includes core subjects such as Data Structures, Web Development, Operating Systems, Cloud Computing, Cybersecurity, Artificial Intelligence, and Mobile Application Development. Students gain hands-on experience through practical labs, projects, and internships, preparing them for the rapidly evolving tech industry.</p>
        <p className="mb-4">Graduates of this program can pursue careers in software development, IT consulting, system administration, web and mobile application development, cybersecurity, and data analytics. They can also opt for higher studies such as M.Sc. in Computer Science, MCA, MBA (IT), or professional certifications like AWS, Google Cloud, or Microsoft certifications.</p>
        <p className="mb-4">This course is ideal for students who are passionate about technology, coding, and problem-solving and want to build a career in the dynamic field of computer applications and software development.</p>
      </>
      }
      title="Bachelor of Science (Computer Applications)"
      fundingType="Self Financing"
      courseKey="BSC_CA"
      shortInfo="An undergraduate program blending computer science principles with practical application development for the modern tech industry."
      category="science"
      facultyData={bscCaFaculty}
      syllabusContent={renderSyllabusTable('BCA')}
      quickActionsData={quickActions}
    />
  );
}

