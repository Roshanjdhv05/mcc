import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'B.Com (MS) | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (Management Studies) at Mulund College of Commerce.',
};

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
      title="Bachelor of Commerce (Management Studies)"
      description="The Bachelor of Commerce (Management Studies) programme details will be updated shortly."
    />
  );
}
