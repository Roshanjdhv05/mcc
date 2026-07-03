import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'MSF | MCC Digital Experience Platform',
  description: 'Master of Science (Finance) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">The Master of Science (M.Sc.) in Finance is a postgraduate program designed to provide advanced knowledge in financial analysis, investment management, risk assessment, and corporate finance. This program focuses on equipping students with strong analytical and quantitative skills essential for making strategic financial decisions in dynamic business environments.</p>
        <p className="mb-4">The curriculum typically includes subjects like financial markets, portfolio management, derivatives, econometrics, financial modeling, corporate valuation, and international finance. It integrates theoretical concepts with practical applications, preparing students for high-level roles in the financial sector.</p>
        <p className="mb-4">Graduates of M.Sc. in Finance have diverse career opportunities in investment banking, asset management, financial consulting, risk analysis, fintech, corporate finance, and financial research. The program also serves as a strong foundation for pursuing professional certifications such as CFA (Chartered Financial Analyst), FRM (Financial Risk Manager), and CFP (Certified Financial Planner).</p>
        <p className="mb-4">This degree is ideal for individuals who have a keen interest in finance, investment strategies, and financial risk management and aspire to build a career in the global financial industry.</p>
      </>
      }
      title="Master of Science (Finance)"
      description="The Master of Science (Finance) programme details will be updated shortly."
    />
  );
}
