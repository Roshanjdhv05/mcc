import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'BFSI | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (Banking, Financial Services and Insurance) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Commerce (B.Com) in Banking, Financial Services, and Insurance (BFSI) is a specialized undergraduate program designed to provide students with a strong foundation in the financial sector. This program focuses on the principles and practices of banking, investment, risk management, insurance, and financial services, equipping students with the necessary skills to excel in the dynamic world of finance.</p>
        <p className="mb-4">The curriculum covers essential subjects such as financial accounting, banking regulations, risk assessment, investment analysis, insurance laws, financial markets, and economic policies. It prepares students for careers in commercial banking, investment banking, insurance companies, financial consultancies, and regulatory bodies.</p>
        <p className="mb-4">With the increasing demand for skilled professionals in the financial sector, B.Com (BFSI) offers excellent career opportunities in banks, financial institutions, mutual funds, stock markets, and fintech companies. Graduates can also pursue further studies such as MBA in Finance, Chartered Financial Analyst (CFA), Certified Financial Planner (CFP), or professional banking and insurance certifications.</p>
        <p className="mb-4">This program is ideal for students who are interested in financial management, investment strategies, risk assessment, and the functioning of banking and insurance sectors.</p>
      </>
      }
      title="Bachelor of Commerce (Banking, Financial Services and Insurance)"
      description="The Bachelor of Commerce (Banking, Financial Services and Insurance) programme details will be updated shortly."
    />
  );
}
