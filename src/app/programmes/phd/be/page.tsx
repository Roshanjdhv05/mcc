import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'PhD (BE) | MCC Digital Experience Platform',
  description: 'Ph.D. in Business Economics at Mulund College of Commerce.',
};

export default function CoursePage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">A Ph.D. in Business Economics is an advanced research-oriented program that focuses on the intersection of business practices and economic principles. This doctoral degree equips scholars with a deep understanding of economic theories, quantitative methods, and their applications in business decision-making, policy formulation, and market analysis.</p>
        <p className="mb-4">The program covers areas such as microeconomics, macroeconomics, econometrics, corporate finance, industrial organization, international trade, and behavioral economics. It emphasizes empirical research and data analysis to solve complex business and economic challenges.</p>
        <p className="mb-4">Candidates pursuing a Ph.D. in Business Economics are required to conduct original research, contributing to academic literature and practical applications in industries such as banking, consulting, government policy-making, international organizations, and academia. Graduates often work as economists, policy analysts, business consultants, or professors in leading institutions worldwide.</p>
        <p className="mb-4">This program is ideal for individuals with a strong analytical mindset who are passionate about economic research, business strategy, and policy development.</p>
      </>
      }
      title="Ph.D. in Business Economics"
      description="The Ph.D. in Business Economics programme details will be updated shortly."
    />
  );
}
