import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'BAF | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (Accounting & Finance) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Commerce (B.Com) in Accounting & Finance is an undergraduate program designed to provide students with a strong foundation in financial management, accounting principles, and business operations. This course equips students with technical knowledge, analytical skills, and financial expertise required in the corporate and financial sectors.</p>
        <p className="mb-4">The curriculum covers key subjects such as financial accounting, cost accounting, taxation, auditing, financial management, business law, economics, and investment analysis. It prepares students for careers in banking, taxation, auditing, corporate finance, investment management, and financial consulting.</p>
        <p className="mb-4">Graduates of this program can pursue professional courses like CA (Chartered Accountancy), CFA (Chartered Financial Analyst), ACCA, CPA, or MBA in Finance to further enhance their career prospects. With increasing demand for financial experts, B.Com (Accounting & Finance) serves as a gateway to a wide range of opportunities in both corporate and government sectors.</p>
      </>
      }
      title="Bachelor of Commerce (Accounting & Finance)"
      description="The Bachelor of Commerce (Accounting & Finance) programme details will be updated shortly."
    />
  );
}
