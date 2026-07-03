import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'BFM | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (Financial Markets) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">Bachelor of Commerce in Financial Markets (B.Com FM) is an undergraduate program that focuses on the study of financial markets, investments, banking, risk management, and stock trading. This course provides students with a strong foundation in financial concepts, market operations, and economic policies that influence global and domestic financial systems.</p>
        <p className="mb-4">The curriculum includes subjects like financial accounting, investment analysis, financial management, risk management, corporate finance, stock market operations, and regulatory frameworks. Students gain practical exposure to financial instruments, stock exchanges, and trading strategies, preparing them for dynamic roles in the financial sector.</p>
        <p className="mb-4">Graduates of B.Com in Financial Markets can pursue careers in banking, investment banking, stockbroking, wealth management, financial consulting, and corporate finance. They can also opt for further studies such as MBA (Finance), CFA, FRM, or other professional certifications to enhance their expertise.</p>
        <p className="mb-4">This program is ideal for students interested in financial markets, investment strategies, and economic trends, preparing them for a rewarding career in the finance industry.</p>
      </>
      }
      title="Bachelor of Commerce (Financial Markets)"
      description="The Bachelor of Commerce (Financial Markets) programme details will be updated shortly."
    />
  );
}
