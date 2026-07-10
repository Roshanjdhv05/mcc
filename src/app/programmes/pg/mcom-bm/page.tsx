import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'M.Com (Business Management) | MCC Digital Experience Platform',
  description: 'Master of Commerce (Business Management) at Mulund College of Commerce.',
};

import MComBMPageClient from './MComBMPageClient';

export default function CoursePage() {
  const syllabus = (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">M.Com (Business Management) — Program Structure</h3>

      {/* Year 1 */}
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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Strategic Management</td><td className="p-3 border">Management Information System</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Business Ethics and Corporate Social Responsibility</td><td className="p-3 border">Management of Business Relations</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Supply Chain Management and Logistics</td><td className="p-3 border">E-commerce</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Family Business Management</td><td className="p-3 border">Office Management</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives)</td><td className="p-3 border">Economics for Business Decisions</td><td className="p-3 border">Macro Economics Concepts and Applications</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives)</td><td className="p-3 border">Tourism Management</td><td className="p-3 border">Corporate Financial Accounting</td></tr>
              <tr><td className="p-3 border font-semibold">Research Methodology</td><td className="p-3 border">Research Methodology for Business</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">OJT</td><td className="p-3 border">-</td><td className="p-3 border">OJT</td></tr>
              <tr><td className="p-3 border font-semibold">FP</td><td className="p-3 border">-</td><td className="p-3 border">FP</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Year 2 */}
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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Human Resource Management</td><td className="p-3 border">Retail Management</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Entrepreneurial Management</td><td className="p-3 border">Advertising and Sales Management</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Organizational Behaviour</td><td className="p-3 border">Digital Marketing</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Principles of Event Management</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives)</td><td className="p-3 border">Monetary Economics</td><td className="p-3 border">Industrial Economics</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives)</td><td className="p-3 border">Commercial Bank Management</td><td className="p-3 border">Business Valuation</td></tr>
              <tr><td className="p-3 border font-semibold">Research Methodology</td><td className="p-3 border">Research Project</td><td className="p-3 border">Research Project</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <MComBMPageClient syllabusContent={syllabus} />;
}
