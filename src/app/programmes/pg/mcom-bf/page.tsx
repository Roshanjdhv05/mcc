import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'M.Com (BF) | MCC Digital Experience Platform',
  description: 'Master of Commerce (Banking & Finance) at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">Master of Commerce (M.Com) in Banking & Finance is a postgraduate program designed to provide advanced knowledge in banking, financial management, investment strategies, and risk assessment. The course equips students with expertise in financial markets, monetary policies, corporate finance, and banking regulations, preparing them for high-level roles in the financial sector.</p>
        <p className="mb-4">The curriculum includes key subjects such as financial accounting, banking laws, international finance, risk management, investment analysis, and financial institutions management. It focuses on developing analytical and decision-making skills required for managing financial operations efficiently.</p>
        <p className="mb-4">Graduates of M.Com in Banking & Finance can explore career opportunities in commercial and investment banking, financial consulting, risk management, stock markets, corporate finance, and government financial institutions. They can also pursue certifications like CFA, FRM, or Ph.D. for further specialization.</p>
        <p className="mb-4">This program is ideal for students looking to build a career in finance, banking, investment management, and financial planning, offering a strong foundation for leadership roles in the financial industry.</p>
      </>
      }
      title="Master of Commerce (Banking & Finance)"
      description="The Master of Commerce (Banking & Finance) programme details will be updated shortly."
    />
  );
}
