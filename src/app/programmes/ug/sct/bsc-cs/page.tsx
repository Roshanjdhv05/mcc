import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';
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
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Science (B.Sc.) in Computer Science is a three-year undergraduate program that focuses on the theoretical and practical aspects of computing, programming, and information technology. This course provides students with a strong foundation in computer programming, algorithms, data structures, software development, databases, networking, and artificial intelligence.</p>
        <p className="mb-4">The curriculum is designed to equip students with problem-solving abilities, analytical thinking, and hands-on experience in programming languages like C, C++, Java, Python, and SQL. It also includes emerging technologies such as machine learning, cybersecurity, cloud computing, and web development, making graduates industry-ready.</p>
        <p className="mb-4">A B.Sc. in Computer Science opens up diverse career opportunities in software development, IT consulting, data analysis, cybersecurity, and system administration. Graduates can also pursue higher studies like M.Sc. in Computer Science, MCA, or specialized certifications to enhance their expertise.</p>
        <p className="mb-4">This program is ideal for students passionate about technology, coding, and innovation, and those looking to build a successful career in the ever-growing field of computer science.</p>
      </>
      }
      title="Bachelor of Science (Computer Science)"
      description="The Bachelor of Science (Computer Science) programme focuses on computing and modern technologies."
      courseKey="BSC_CS"
      category="science"
      facultyData={bscCsFaculty}
      syllabusContent={renderSyllabusTable('BSC_CS')}
    />
  );
}
