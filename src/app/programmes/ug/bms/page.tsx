import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'BMS | MCC Digital Experience Platform',
  description: 'Bachelor of Management Studies (BMS) at Mulund College of Commerce.',
};

export default function BMSPage() {
  return (
    <CourseTemplate 
      title="Bachelor of Management Studies (BMS)"
      description="The BMS programme offers deep insights into management practices, preparing dynamic leaders and entrepreneurs for the future."
      introductionContent={
        <>
          <p className="mb-4">
            <strong>Bachelor of Commerce (B.Com) in Management Studies</strong> is an undergraduate program designed to provide students with in-depth knowledge of business management, financial principles, and organizational strategies. The program combines theoretical and practical aspects of commerce, focusing on business operations, management techniques, and decision-making processes.
          </p>
          <p className="mb-4">
            The course covers core subjects such as <strong>business management, financial accounting, marketing, human resource management, business law, organizational behavior, and strategic management</strong>. It prepares students for leadership roles in various industries by equipping them with analytical, problem-solving, and managerial skills.
          </p>
          <p className="mb-4">
            Graduates of <strong>B.Com in Management Studies</strong> can pursue careers in corporate management, banking, finance, marketing, entrepreneurship, and consulting. They can also opt for higher education like <strong>MBA, M.Com, CFA, or other professional certifications</strong> to enhance their expertise and career prospects.
          </p>
          <p>
            This program is ideal for students who aspire to <strong>develop managerial skills, understand business dynamics, and take on leadership roles in the corporate world.</strong>
          </p>
        </>
      }
    />
  );
}
