import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';
import { Users, Clock, FileText } from 'lucide-react';
import { renderSyllabusTable } from '@/lib/syllabusData';

export const metadata: Metadata = {
  title: 'B.Sc (CS) | MCC Digital Experience Platform',
  description: 'Bachelor of Science (Computer Science) at Mulund College of Commerce.',
};

const bscCsFaculty = [
  { srNo: 1, name: 'Dr. Reena Nagda', additionalRole: 'Examination Co-Controller', designation: 'Assistant Professor', department: 'B.Sc. CS', education: 'M.Sc. Mathematics,NET,Ph.D.', email: 'reena.shah@mccmulund.ac.in', teachingExp: '21 yrs' },
  { srNo: 2, name: 'Dr. Vaishnavi Assar', additionalRole: 'Coordinator', designation: 'Assistant Professor', department: 'B.Sc. CS', education: 'M.Sc.,Ph.D', email: 'Vaishnavi.assar@mccmulund.ac.in', teachingExp: '0 yrs', image: '/Degree College Teachers/Vaishnavi Assar.png' },
  { srNo: 3, name: 'Dr. Pooja Patil', additionalRole: '—', designation: 'Assistant Professor', department: 'B.Sc. CS', education: 'M.Sc.(Statistics)', email: 'pooja.patil@mccmulund.ac.in', teachingExp: '0 yrs' },
  { srNo: 4, name: 'Ms. Bhumika Nakum', additionalRole: '—', designation: 'Assistant Professor', department: 'B.Sc. CS', education: 'M.Sc.(IT).,NET', email: 'bhumika.nakum@mccmulund.ac.in', teachingExp: '0 yrs' },
  { srNo: 5, name: 'Ms. Pratiksha Harwalkar', additionalRole: '—', designation: 'Assistant Professor', department: 'B.Sc. CS', education: 'M.Sc.(IT), NET', email: 'pratiksha.harwalkar@mccmulund.ac.in', teachingExp: '', image: '/Degree College Teachers/Pratiksha Harwalkar.png' },
  { srNo: 6, name: 'Ms. Bhoomika Pansare', additionalRole: '—', designation: 'Assistant Professor', department: 'B.Sc. CS', education: 'MSc. (CS)', email: 'bhoomika.pansare@mccmulund.ac.in', teachingExp: '0 yrs', image: '/Degree College Teachers/Bhoomika Pansare.png' }
];

export default function CoursePage() {
  return (
    <CourseTemplate 
      festivals="Hack-A-Thon"
      publication="Tech Anugraha"
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
      shortInfo="A rigorous computing degree focusing on theoretical computer science, algorithms, software engineering, and artificial intelligence."
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

