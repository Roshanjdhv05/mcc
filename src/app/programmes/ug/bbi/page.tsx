import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'BBI | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (Banking & Insurance) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Commerce (B.Com) in Banking & Insurance (BBI) is a specialized undergraduate program designed to provide students with comprehensive knowledge of the banking, finance, and insurance sectors. This course focuses on key financial concepts, risk management, investment strategies, and regulatory frameworks that govern the banking and insurance industries.</p>
        <p className="mb-4">The curriculum includes subjects such as financial accounting, banking law and operations, insurance management, investment banking, risk assessment, financial markets, and corporate finance. It aims to equip students with analytical and problem-solving skills essential for making strategic financial decisions.</p>
        <p className="mb-4">Graduates of B.Com in Banking & Insurance can explore career opportunities in commercial and investment banking, insurance companies, financial consultancies, stock markets, and regulatory institutions. They can also pursue higher education, such as MBA in Finance, M.Com, Chartered Financial Analyst (CFA), or professional certifications like CAIIB (Certified Associate of the Indian Institute of Bankers).</p>
        <p className="mb-4">This program is ideal for students who aspire to build a career in banking, finance, and insurance, and seek in-depth knowledge of financial risk management and economic policies.</p>
      </>
      }
      title="Bachelor of Commerce (Banking & Insurance)"
      description="The Bachelor of Commerce (Banking & Insurance) programme details will be updated shortly."
    />
  );
}
