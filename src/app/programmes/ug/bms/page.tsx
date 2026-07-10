import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';
import CourseFeeStructure from '@/components/ui/CourseFeeStructure';

export const metadata: Metadata = {
  title: 'BMS | MCC Digital Experience Platform',
  description: 'Bachelor of Management Studies (BMS) at Mulund College of Commerce.',
};

import BMSPageClient from './BMSPageClient';

export default function BMSPage() {
  const syllabus = (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">Program Structure: B. Com in Management Studies (As Per NEP 2020)</h3>
      
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
              <tr><td className="p-3 border font-semibold">Majors (Mandatory)</td><td className="p-3 border">1. Group Dynamics & Org. Culture<br/>2. Fundamentals of Financial Accounts<br/>3. Introduction to Enterprise Economics</td><td className="p-3 border">1. Principles of Management<br/>2. Marketing Management Principles & Practices<br/>3. Essence of Human Resource Management</td></tr>
              <tr><td className="p-3 border font-semibold">Minor (Choose Any One)</td><td className="p-3 border">-</td><td className="p-3 border">1. Green Marketing<br/>2. Indian Financial System & Markets</td></tr>
              <tr><td className="p-3 border font-semibold">GE I (Any One)</td><td className="p-3 border">1. Introduction to Legal Studies<br/>2. Contemporary Indian Society</td><td className="p-3 border">1. Understanding Legal Environment<br/>2. Content Writing</td></tr>
              <tr><td className="p-3 border font-semibold">GE II (Any One)</td><td className="p-3 border">1. Foundations of Statistics<br/>2. Indian Political System</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">VSC</td><td className="p-3 border">-</td><td className="p-3 border">Unleash Your Potential</td></tr>
              <tr><td className="p-3 border font-semibold">SEC (Any One)</td><td className="p-3 border">1. Applied Mathematical Concepts<br/>2. Arbitration Skills</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">AEC</td><td className="p-3 border">Business Communication</td><td className="p-3 border">Administrative and Collaborative Communication</td></tr>
              <tr><td className="p-3 border font-semibold">IKS</td><td className="p-3 border">Fundamentals of Indian Knowledge System</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">VEC</td><td className="p-3 border">Digital Empowerment</td><td className="p-3 border">Sustainable Management of Bio Diversity</td></tr>
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
              <tr><td className="p-3 border font-semibold">Majors (Mandatory)</td><td className="p-3 border">1. Business Planning & Entrepreneurship Management<br/>2. Accounting for Managerial Decisions<br/>3. Business Environment</td><td className="p-3 border">1. Organisational Effectiveness<br/>2. Advanced Managerial Economics<br/>3. Strategic Management for Business</td></tr>
              <tr><td className="p-3 border font-semibold">Minor (Choose Any one)</td><td className="p-3 border">1. Consumer Behaviour<br/>2. Corporate Finance</td><td className="p-3 border">1. Advertising & IMC<br/>2. Cost Accounting</td></tr>
              <tr><td className="p-3 border font-semibold">GE I (Any One)</td><td className="p-3 border">1. Content Creation<br/>2. Data Analysis Using Advance Excel</td><td className="p-3 border">1. Statistics for Research<br/>2. Swayam courses</td></tr>
              <tr><td className="p-3 border font-semibold">VSC</td><td className="p-3 border">-</td><td className="p-3 border">Commercial Banking and Financial Services</td></tr>
              <tr><td className="p-3 border font-semibold">SEC (Any One)</td><td className="p-3 border">1. Advanced Marketing Theory & Application<br/>2. Stress Management</td><td className="p-3 border">1. Social Media Marketing<br/>2. Fundamentals of Generative AI</td></tr>
              <tr><td className="p-3 border font-semibold">AEC</td><td className="p-3 border">Hindi / Marathi / Sanskrit Basics</td><td className="p-3 border">Applied Hindi / Marathi / Sanskrit Proficiency</td></tr>
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
              <tr><td className="p-3 border font-semibold">Major</td><td className="p-3 border">Operations Research<br/>Logistics & Supply Chain Management</td><td className="p-3 border">Corporate Communication & PR<br/>Indian Management Thoughts and Practices</td></tr>
              <tr><td className="p-3 border font-semibold">Minor (Any One)</td><td className="p-3 border">International Marketing<br/>Investment Analysis & Portfolio Management</td><td className="p-3 border">Brand Management<br/>International Finance</td></tr>
              <tr><td className="p-3 border font-semibold">VSEC</td><td className="p-3 border">Business Research Methodology</td><td className="p-3 border">Get Corporate Ready</td></tr>
              <tr><td className="p-3 border font-semibold">School Specific Elective 1</td><td className="p-3 border">Service Marketing<br/>Commodity Derivatives Market<br/>Performance management and Career Planning</td><td className="p-3 border">Retail Marketing<br/>Innovative Financial Services<br/>Organization Development</td></tr>
              <tr><td className="p-3 border font-semibold">School Specific Elective 2</td><td className="p-3 border">Ecommerce<br/>Direct Tax<br/>Talent and Competency management</td><td className="p-3 border">Customer Relationship Management<br/>Strategic Financial Management<br/>Strategic HRM</td></tr>
              <tr><td className="p-3 border font-semibold">IAPC</td><td className="p-3 border">OJT/ Project</td><td className="p-3 border">OJT/ Project</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <CourseFeeStructure courseKey="BMS" category="commerce" />
    </div>
  );

  return <BMSPageClient syllabusContent={syllabus} />;
}
