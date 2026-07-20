import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';
import SyllabusRenderer from '@/components/ui/SyllabusRenderer';

export const metadata: Metadata = {
  title: 'B.Com (MS) | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (Management Studies) at Mulund College of Commerce.',
};

const bcomMsFaculty = [
  { srNo: 12, name: 'Dr. Kanchana Nikhil Sattur',    additionalRole: '—', designation: 'Assistant Professor' },
  { srNo: 13, name: 'Dr. Soumya George Monappilly',  additionalRole: '—', designation: 'Assistant Professor' },
  { srNo: 14, name: 'Dr. Shilpi Deepak Jawake',      additionalRole: '—', designation: 'Assistant Professor' },
  { srNo: 15, name: 'Dr. Abhilasha N',               additionalRole: '—', designation: 'Assistant Professor' },
  { srNo: 34, name: 'Mr. Felix Anthonysamy',         additionalRole: '—', designation: 'Assistant Professor' },
];

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">Bachelor of Commerce (B.Com) in Management Studies is an undergraduate program designed to provide students with in-depth knowledge of business management, financial principles, and organizational strategies. The program combines theoretical and practical aspects of commerce, focusing on business operations, management techniques, and decision-making processes.</p>
        <p className="mb-4">The course covers core subjects such as business management, financial accounting, marketing, human resource management, business law, organizational behavior, and strategic management. It prepares students for leadership roles in various industries by equipping them with analytical, problem-solving, and managerial skills.</p>
        <p className="mb-4">Graduates of B.Com in Management Studies can pursue careers in corporate management, banking, finance, marketing, entrepreneurship, and consulting. They can also opt for higher education like MBA, M.Com, CFA, or other professional certifications to enhance their expertise and career prospects.</p>
        <p className="mb-4">This program is ideal for students who aspire to develop managerial skills, understand business dynamics, and take on leadership roles in the corporate world.</p>
      </>
      }
      syllabusContent={<SyllabusRenderer programKey="BMS" />}
      title="Bachelor of Commerce (Management Studies)"
      description="The Bachelor of Commerce (Management Studies) programme details will be updated shortly."
      facultyData={bcomMsFaculty}
    />
  );
}
