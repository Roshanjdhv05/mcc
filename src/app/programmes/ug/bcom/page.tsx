import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'B.Com | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (B.Com) at Mulund College of Commerce.',
};

export default function BComPage() {
  return (
    <CourseTemplate 
      introductionContent={
        <>
        <p className="mb-4">The Bachelor of Commerce (B.Com) is a three-year undergraduate degree program that provides students with a strong foundation in commerce, finance, business management, and economics. It is designed to develop analytical, managerial, and problem-solving skills essential for the corporate and business world.</p>
        <p className="mb-4">The program covers core subjects such as Accounting, Business Law, Economics, Marketing, Taxation, Banking, and Financial Management. B.Com graduates gain expertise in financial decision-making, business strategies, and market analysis, making them well-equipped for careers in banking, finance, accounting, taxation, auditing, and management.</p>
        <p className="mb-4">B.Com also serves as a stepping stone for professional courses such as Chartered Accountancy (CA), Company Secretary (CS), Cost and Management Accountancy (CMA), MBA, and CFA. It is an ideal choice for students who aspire to build a career in commerce, finance, or entrepreneurship and pursue higher studies in business-related fields.</p>
      </>
      }
      title="Bachelor of Commerce (B.Com)"
      description="The B.Com programme is designed to provide students with a wide range of managerial skills and understanding in streams like finance, accounting, taxation and management."
    />
  );
}
