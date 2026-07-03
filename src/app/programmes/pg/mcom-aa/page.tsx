import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'M.Com (AA) | MCC Digital Experience Platform',
  description: 'Master of Commerce (Advanced Accountancy) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">Master of Commerce (M.Com) in Advanced Accountancy is a postgraduate program designed for students who wish to specialize in financial and accounting principles. This course provides in-depth knowledge of accounting standards, taxation, auditing, financial management, cost accounting, and corporate governance.</p>
        <p className="mb-4">The program focuses on advanced financial reporting, analysis, and decision-making, equipping students with the necessary skills to handle complex accounting tasks in various industries. It also emphasizes research methodologies, strategic financial planning, and regulatory compliance, preparing graduates for roles in corporate finance, banking, taxation, auditing, and consultancy.</p>
        <p className="mb-4">M.Com in Advanced Accountancy is an ideal choice for students who want to pursue careers as Chartered Accountants (CA), Certified Management Accountants (CMA), Cost Accountants, Tax Consultants, Financial Analysts, or Academicians. The course also serves as a strong foundation for those planning to pursue Ph.D. or professional certifications like ACCA, CFA, and CPA.</p>
        <p className="mb-4">With a blend of theoretical and practical applications, this program develops analytical, problem-solving, and decision-making abilities, making graduates highly valuable in the financial and business sectors.</p>
      </>
      }
      title="Master of Commerce (Advanced Accountancy)"
      description="The Master of Commerce (Advanced Accountancy) programme details will be updated shortly."
    />
  );
}
