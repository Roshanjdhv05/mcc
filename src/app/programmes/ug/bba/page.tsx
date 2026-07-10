import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';

export const metadata: Metadata = {
  title: 'BBA | MCC Digital Experience Platform',
  description: 'Bachelor of Business Administration (BBA) at Mulund College of Commerce.',
};

import BBAPageClient from './BBAPageClient';

export default function BBAPage() {
  const syllabus = (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">Program Structure: B. Com (Business Administration)</h3>
      
      {/* First Year */}
      <div>
        <h4 className="font-bold text-[#D4A017] mb-4 bg-[#FFF8E7] px-4 py-2 rounded-lg">First Year (Semester I & II)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F8FAFC] text-[#123B6D]">
              <tr>
                <th className="p-3 border">Vertical</th>
                <th className="p-3 border">Semester I</th>
                <th className="p-3 border">Semester II</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border font-semibold">Majors (Mandatory)</td><td className="p-3 border">1. Organisational Behavior<br/>2. Financial Accounting for Business<br/>3. Introduction to leadership in business</td><td className="p-3 border">1. Principles and Practices of Micro Economics<br/>2. Marketing Management in Business<br/>3. Financial Services & Markets</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">-</td><td className="p-3 border">Data Analysis using Advance Excel</td></tr>
              <tr><td className="p-3 border font-semibold">GE I (Any One)</td><td className="p-3 border">1. Practical Approach to Mathematics<br/>2. Indian Political System</td><td className="p-3 border">1. Legal Aspects & Policies<br/>2. Contemporary Indian Society</td></tr>
              <tr><td className="p-3 border font-semibold">GE II (Any one)</td><td className="p-3 border">-</td><td className="p-3 border">1. Visual Communication<br/>2. Quantitative Techniques</td></tr>
              <tr><td className="p-3 border font-semibold">VSC</td><td className="p-3 border">Unleash Your Potential</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">SEC (Any One)</td><td className="p-3 border">-</td><td className="p-3 border">1. Applied Statistics<br/>2. Content Writing</td></tr>
              <tr><td className="p-3 border font-semibold">AEC</td><td className="p-3 border">Organizational Communication</td><td className="p-3 border">Language for Leadership</td></tr>
              <tr><td className="p-3 border font-semibold">IKS</td><td className="p-3 border">Fundamentals of Indian Knowledge System</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">VEC</td><td className="p-3 border">Sustainable Urban Development</td><td className="p-3 border">Digital Empowerment</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Second Year */}
      <div>
        <h4 className="font-bold text-[#D4A017] mb-4 bg-[#FFF8E7] px-4 py-2 rounded-lg">Second Year (Semester III & IV)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F8FAFC] text-[#123B6D]">
              <tr>
                <th className="p-3 border">Vertical</th>
                <th className="p-3 border">Semester III</th>
                <th className="p-3 border">Semester IV</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border font-semibold">Majors (Mandatory)</td><td className="p-3 border">1. Market Dynamics & Strategic Decisions<br/>2. Fintech for Business<br/>3. AI Powered Marketing</td><td className="p-3 border">1. Start-Up Ecosystem & Foundations of Entrepreneurship<br/>2. Cost & Management Accounting<br/>3. Financial & Risk Management</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">Business Intelligence</td><td className="p-3 border">AI in Business & Python Programming</td></tr>
              <tr><td className="p-3 border font-semibold">GE I (Any One)</td><td className="p-3 border">1. Power of Negotiation<br/>2. Science of Wellness</td><td className="p-3 border">1. AI in Business & Python Programming<br/>2. Swayam Courses</td></tr>
              <tr><td className="p-3 border font-semibold">VSC</td><td className="p-3 border">Digital Marketing</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">SEC (Any one)</td><td className="p-3 border">1. Family Business Management<br/>2. Business Leadership</td><td className="p-3 border">1. Social Media Marketing<br/>2. Innovation & Creativity in Business</td></tr>
              <tr><td className="p-3 border font-semibold">AEC</td><td className="p-3 border">Hindi Lekhan Kaushal / Marathi Lekhan Kaushalya / Sanskritam Parichayah- Sanskrit Basics</td><td className="p-3 border">Vyavaharik Hindi Lekhan, Baatcheet aur Prastuti / Vyavaharik Va Upayojik Marathi Lekhan, Sambhashan Va Sadarikaral / Sanskrit Pravinta Pathyakaram (Sanskrit Proficiency Course)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Third Year */}
      <div>
        <h4 className="font-bold text-[#D4A017] mb-4 bg-[#FFF8E7] px-4 py-2 rounded-lg">Third Year (Semester V & VI)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F8FAFC] text-[#123B6D]">
              <tr>
                <th className="p-3 border">Vertical</th>
                <th className="p-3 border">Semester V</th>
                <th className="p-3 border">Semester VI</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">1. Optimization Techniques (OR)<br/>2. Corporate Finance</td><td className="p-3 border">1. Global Supply Chain Management<br/>2. Global Brand Management</td></tr>
              <tr><td className="p-3 border font-semibold">School Specific Elective I (Any One)</td><td className="p-3 border">1. Investment Strategy<br/>2. Service Marketing</td><td className="p-3 border">1. Venture Capital<br/>2. Service Marketing Operations</td></tr>
              <tr><td className="p-3 border font-semibold">School Specific Elective II (Any One)</td><td className="p-3 border">1. Direct Tax<br/>2. Retail Marketing</td><td className="p-3 border">1. International Marketing<br/>2. Investment Analysis & Portfolio Management</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">Data Visualization & Power BI</td><td className="p-3 border">Block Chain Technology for Business</td></tr>
              <tr><td className="p-3 border font-semibold">Vocational Skill Course</td><td className="p-3 border">Research Methodology for Business</td><td className="p-3 border">Get Corporate Ready</td></tr>
              <tr><td className="p-3 border font-semibold">IAPC</td><td className="p-3 border">Internship OJT</td><td className="p-3 border">Cap Stone Project</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <BBAPageClient syllabusContent={syllabus} />;
}
