import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'M.Sc. Finance | MCC Digital Experience Platform',
  description: 'Master of Science (Finance) at Mulund College of Commerce.',
};

import MSFPageClient from './MSFPageClient';

export default function MSFPage() {
  const syllabus = (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">Program Structure: M.Sc in Finance (As per NEP 2020)</h3>

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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Financial Economics</td><td className="p-3 border">Econometrics and Financial Modelling</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Quantitative Tools for finance</td><td className="p-3 border">Corporate Finance</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Accounting and Financial Reporting</td><td className="p-3 border">Financial Markets and Institutions</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Practical 1: Quantitative Tools for Finance</td><td className="p-3 border">Practical 2: Econometrics and Financial Modelling</td></tr>
              <tr><td className="p-3 border font-semibold">Major Elective</td><td className="p-3 border">Financial Management</td><td className="p-3 border">Fixed Income Securities</td></tr>
              <tr><td className="p-3 border font-semibold">RM</td><td className="p-3 border">Research Methodology</td><td className="p-3 border">OJT / FP (INTERNSHIP)</td></tr>
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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Technical Analysis</td><td className="p-3 border">Mergers, Acquisitions and Corporate Restructuring</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Portfolio Analysis and Management</td><td className="p-3 border">Structured Finance</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Derivatives</td><td className="p-3 border">Risk Management</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Corporate Governance & Regulatory Environment</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">Major Elective</td><td className="p-3 border">AI & Fintech</td><td className="p-3 border">International Finance</td></tr>
              <tr><td className="p-3 border font-semibold">RM</td><td className="p-3 border">Research Project (VIVA + HARD COPY)</td><td className="p-3 border">Research Project II (Dissertation)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <MSFPageClient syllabusContent={syllabus} />;
}
