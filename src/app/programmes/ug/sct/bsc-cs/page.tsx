import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText } from 'lucide-react';
import { renderSyllabusTable } from '@/lib/syllabusData';

export const metadata: Metadata = {
  title: 'B.Sc (CS) | MCC Digital Experience Platform',
  description: 'Bachelor of Science (Computer Science) at Mulund College of Commerce.',
};

const bscCsFaculty = [
  { srNo: 18, name: 'Dr. Reena Deepak Nagda',              additionalRole: 'Examination Co-Controller', designation: 'Assistant Professor' },
  { srNo: 19, name: 'Dr. Vaishnavi Assar',                 additionalRole: 'Coordinator',               designation: 'Assistant Professor' },
  { srNo: 20, name: 'Dr. Pooja Raosaheb Patil',            additionalRole: '—',                         designation: 'Assistant Professor' },
  { srNo: 21, name: 'Ms. Bhumika Shailesh Nakum',          additionalRole: '—',                         designation: 'Assistant Professor' },
  { srNo: 22, name: 'Ms. Pratiksha Siddheshwar Harwalkar', additionalRole: '—',                         designation: 'Assistant Professor' },
  { srNo: 23, name: 'Ms. Bhoomika Ramchandra Pansare',     additionalRole: '—',                         designation: 'Assistant Professor' },
];

export default function CoursePage() {
  return (
    <CourseTemplate 
      festivals="Hack-A-Thon (Col)"
      publication="Tech Anugraha (Col)"
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Science (B.Sc.) in Computer Science is a three-year undergraduate program that focuses on the theoretical and practical aspects of computing, programming, and information technology. This course provides students with a strong foundation in computer programming, algorithms, data structures, software development, databases, networking, and artificial intelligence.</p>
        <p className="mb-4">The curriculum is designed to equip students with problem-solving abilities, analytical thinking, and hands-on experience in programming languages like C, C++, Java, Python, and SQL. It also includes emerging technologies such as machine learning, cybersecurity, cloud computing, and web development, making graduates industry-ready.</p>
        <p className="mb-4">A B.Sc. in Computer Science opens up diverse career opportunities in software development, IT consulting, data analysis, cybersecurity, and system administration. Graduates can also pursue higher studies like M.Sc. in Computer Science, MCA, or specialized certifications to enhance their expertise.</p>
        <p className="mb-4">This program is ideal for students passionate about technology, coding, and innovation, and those looking to build a successful career in the ever-growing field of computer science.</p>
      </>
      }
      title="Bachelor of Science (Computer Science)"
      fundingType="Self Financing"
      courseKey="BSC_CS"
      category="science"
      facultyData={bscCsFaculty}
      syllabusContent={renderSyllabusTable('BSC_CS')}
      quickActionsData={[
        { title: 'Eligibility', icon: <Users className="text-[#3B82F6]" size={18} />, info: '10+2 from any recognised Board with Mathematics/Statistics.' },
        { title: 'Programme Design', icon: <FileText className="text-[#3B82F6]" size={18} />, info: '3 Years (NEP 4 Years), 6/8 Semesters.' },
        { title: 'Timing', icon: <Clock className="text-[#3B82F6]" size={18} />, info: '07:15 AM – 11:40 AM' },
        { title: 'Intake Capacity', icon: <Users className="text-[#3B82F6]" size={18} />, info: '120 Seats' }
      ]}
    />
  );
}

