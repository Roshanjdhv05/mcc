import type { Metadata } from 'next';
import CourseTemplate from '@/components/layout/CourseTemplate';
import CourseFeeStructure from '@/components/ui/CourseFeeStructure';

export const metadata: Metadata = {
  title: 'BAF | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (Accounting & Finance) at Mulund College of Commerce.',
};

import BAFPageClient from './BAFPageClient';

export default function CoursePage() {
  const syllabus = (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">Program Structure: B.COM (Accounting and Finance) (As Per NEP 2020)</h3>
      
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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Financial Accounting - I</td><td className="p-3 border">Financial Accounting - II</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Introduction and Elements of Cost Accounting</td><td className="p-3 border">An Overview of Financial System</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">-</td><td className="p-3 border">Practices of Macro Economics</td></tr>
              <tr><td className="p-3 border font-semibold">GE I (Any One)</td><td className="p-3 border">A) Principles of Micro Economics<br/>B) Economics of Growth and Development</td><td className="p-3 border">A) The Law of Contracts<br/>B) Essentials of Negotiable Instrument Act</td></tr>
              <tr><td className="p-3 border font-semibold">GE II (Any One)</td><td className="p-3 border">A) Contemporary Indian Political System<br/>B) Contemporary Indian Society</td><td className="p-3 border">A) Contemporary Indian Society<br/>B) Contemporary Indian Political System</td></tr>
              <tr><td className="p-3 border font-semibold">VSC</td><td className="p-3 border">Business Environment</td><td className="p-3 border">Basics of Auditing</td></tr>
              <tr><td className="p-3 border font-semibold">SEC (Any One)</td><td className="p-3 border">A) Basic Mathematics for Finance<br/>B) Basic Statistical Techniques</td><td className="p-3 border">A) Information Technology in Accountancy<br/>B) Artificial intelligence</td></tr>
              <tr><td className="p-3 border font-semibold">VEC</td><td className="p-3 border">Effective Communication</td><td className="p-3 border">Communication Skills for Business</td></tr>
              <tr><td className="p-3 border font-semibold">AEC</td><td className="p-3 border">Environment Conservation</td><td className="p-3 border">Environmental Issues and Management</td></tr>
              <tr><td className="p-3 border font-semibold">IKS</td><td className="p-3 border">Fundamentals of Indian Knowledge System</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">CC</td><td className="p-3 border"></td><td className="p-3 border"></td></tr>
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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Financial Accounting III</td><td className="p-3 border">Financial Accounting IV</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Cost Accounting II (Methods of Cost Accounting)</td><td className="p-3 border">Management Accounting</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">Financial Management - I</td><td className="p-3 border">Management Concepts and Functions</td></tr>
              <tr><td className="p-3 border font-semibold">GE I (Any One)</td><td className="p-3 border">A) Company Law<br/>B) Regulatory Framework of Partnership and LLP</td><td className="p-3 border">A) Laws Relating to the Rights of Protection of Intellectual Property Rights<br/>B) Legal Framework for Competition and Consumer Protection</td></tr>
              <tr><td className="p-3 border font-semibold">VSC</td><td className="p-3 border">Direct Tax</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">SEC (Any One)</td><td className="p-3 border">-</td><td className="p-3 border">A) Direct Tax: Computation of Income & Taxability<br/>B) Block Chain</td></tr>
              <tr><td className="p-3 border font-semibold">AEC</td><td className="p-3 border">Hindi / Marathi / Sanskrit Basics</td><td className="p-3 border">Applied Hindi / Marathi / Sanskrit Proficiency</td></tr>
              <tr><td className="p-3 border font-semibold">FP / CEP</td><td className="p-3 border">Field Project</td><td className="p-3 border">NSS or Any type of Community Engagement Program</td></tr>
              <tr><td className="p-3 border font-semibold">CC</td><td className="p-3 border"></td><td className="p-3 border"></td></tr>
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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Corporate Accounting – I</td><td className="p-3 border">Corporate Accounting - II</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Cost Accounting – III</td><td className="p-3 border">Cost Accounting - IV</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">-</td><td className="p-3 border">Indirect Taxes II</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Elective)</td><td className="p-3 border">Financial Management II<br/>Security Analysis & Portfolio Management</td><td className="p-3 border">Financial Management III – Strategic Financial Management</td></tr>
              <tr><td className="p-3 border font-semibold">Minor</td><td className="p-3 border">Management Applications</td><td className="p-3 border">Economics Paper - III (Indian Economy)</td></tr>
              <tr><td className="p-3 border font-semibold">VSC</td><td className="p-3 border">Indirect Taxes - I</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">FP / CEP</td><td className="p-3 border">Field Project / Community Engagement Project</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">OJT</td><td className="p-3 border">-</td><td className="p-3 border">On the Job Training</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <CourseFeeStructure courseKey="BAF" category="commerce" />
    </div>
  );

  return <BAFPageClient syllabusContent={syllabus} />;
}
