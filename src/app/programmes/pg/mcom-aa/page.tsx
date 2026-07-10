import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'M.Com (Advanced Accountancy) | MCC Digital Experience Platform',
  description: 'Master of Commerce (Advanced Accountancy) at Mulund College of Commerce.',
};

import MComAAPageClient from './MComAAPageClient';

export default function CoursePage() {
  const syllabus = (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">M.Com (Advanced Accountancy) — Program Structure</h3>

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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Advanced Financial Accounting</td><td className="p-3 border">Corporate Financial Accounting</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Advanced Auditing</td><td className="p-3 border">Strategic Cost Accounting</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Direct Tax</td><td className="p-3 border">Indirect Taxes</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Mergers & Acquisition</td><td className="p-3 border">Business Valuation</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives)</td><td className="p-3 border">Economics for Business Decisions</td><td className="p-3 border">Macro Economics Concepts and Application</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives)</td><td className="p-3 border">Behavioural Finance</td><td className="p-3 border">Financial Management</td></tr>
              <tr><td className="p-3 border font-semibold">Research Methodology</td><td className="p-3 border">Research Methodology for Finance</td><td className="p-3 border">-</td></tr>
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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Financial Reporting</td><td className="p-3 border">International Financial Reporting</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Advanced Financial Management</td><td className="p-3 border">International Taxation</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Financial Risk Management</td><td className="p-3 border">International Finance</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Indian Financial Thoughts</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives)</td><td className="p-3 border">Financial Modelling</td><td className="p-3 border">Business Applications of AI and ML</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives)</td><td className="p-3 border">Data Analytics for Finance</td><td className="p-3 border">Strategic Business Development</td></tr>
              <tr><td className="p-3 border font-semibold">Research Methodology</td><td className="p-3 border">Research Project</td><td className="p-3 border">Research Project</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <MComAAPageClient syllabusContent={syllabus} />;
}
