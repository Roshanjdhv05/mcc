import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'M.Com (Banking & Finance) | MCC Digital Experience Platform',
  description: 'Master of Commerce (Banking & Finance) at Mulund College of Commerce.',
};

import MComBFPageClient from './MComBFPageClient';

export default function CoursePage() {
  const syllabus = (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">M.Com (Banking & Finance) — Program Structure</h3>

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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Banking Practices and Procedures</td><td className="p-3 border">Legal Framework of Banking</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Insurance – Principles and Practices</td><td className="p-3 border">Commodity Markets</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Financial Markets</td><td className="p-3 border">Financial Management</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Merger and Acquisition</td><td className="p-3 border">Risk Management</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Behavioral Finance</td><td className="p-3 border">Corporate Financial Accounting</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives)</td><td className="p-3 border">Economics for Business Decisions</td><td className="p-3 border">Macro Economics Concepts and Applications</td></tr>
              <tr><td className="p-3 border font-semibold">Research Methodology</td><td className="p-3 border">Research Methodology for Business</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">OJT</td><td className="p-3 border">-</td><td className="p-3 border">On-the-job Training</td></tr>
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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Accounting for Banking Sector</td><td className="p-3 border">International Finance</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Ethics & Governance in Financial Sector</td><td className="p-3 border">Financial Services</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Debt Market</td><td className="p-3 border">Investment Management</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Banking Technology & Management</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives)</td><td className="p-3 border">Valuation of Financial Instruments</td><td className="p-3 border">Entrepreneurial Finance</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives)</td><td className="p-3 border">Data Analytics</td><td className="p-3 border">International Taxation</td></tr>
              <tr><td className="p-3 border font-semibold">Research Methodology</td><td className="p-3 border">Research Project</td><td className="p-3 border">Research Project</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <MComBFPageClient syllabusContent={syllabus} />;
}
