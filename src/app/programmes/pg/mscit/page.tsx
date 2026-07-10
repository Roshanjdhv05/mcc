import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MSc IT | MCC Digital Experience Platform',
  description: 'Master of Science in Information Technology (MSc IT) at Mulund College of Commerce.',
};

import MScITPageClient from './MScITPageClient';

export default function MScITPage() {
  const syllabus = (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">Program Structure: Master of Science (Information Technology)</h3>

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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Data Science<br/><span className="text-gray-500 text-xs">+ Data Science Practical</span></td><td className="p-3 border">Big Data Analytics<br/><span className="text-gray-500 text-xs">+ Big Data Analytics Practical</span></td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Soft Computing Techniques<br/><span className="text-gray-500 text-xs">+ Soft Computing Techniques Practical</span></td><td className="p-3 border">Modern Networking<br/><span className="text-gray-500 text-xs">+ Modern Networking Practical</span></td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Cloud Computing</td><td className="p-3 border">Microservices Architecture</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives)</td><td className="p-3 border">Security Breaches Counter Measures & Practical<br/>Data Center Technologies<br/>Image Processing</td><td className="p-3 border">Malware Analysis<br/>Cloud Management Practical<br/>Computer Vision Practical</td></tr>
              <tr><td className="p-3 border font-semibold">Research Methodology</td><td className="p-3 border">Research Methodology</td><td className="p-3 border">-</td></tr>
              <tr><td className="p-3 border font-semibold">OJT / RP</td><td className="p-3 border">-</td><td className="p-3 border">OJT / RP</td></tr>
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
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Advanced Artificial Intelligence<br/><span className="text-gray-500 text-xs">+ Advanced AI Practical</span></td><td className="p-3 border">Blockchain<br/><span className="text-gray-500 text-xs">+ Blockchain Practical</span></td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Machine Learning<br/><span className="text-gray-500 text-xs">+ Machine Learning Practical</span></td><td className="p-3 border">Advanced Deep Learning<br/><span className="text-gray-500 text-xs">+ Advanced Deep Learning Practical</span></td></tr>
              <tr><td className="p-3 border font-semibold">Major (Mandatory)</td><td className="p-3 border">Storage as a Service</td><td className="p-3 border">Robotic Process Automation</td></tr>
              <tr><td className="p-3 border font-semibold">Major (Electives – Any One)</td><td className="p-3 border">1. Natural Language Processing Practical<br/>2. Cloud Application Development<br/>3. Server Virtualization on VMWare Platform Practical</td><td className="p-3 border">1. Robotic Process Automation Practical<br/>2. Cyber Forensics Practical<br/>3. Advanced IoT Practical</td></tr>
              <tr><td className="p-3 border font-semibold">RP</td><td className="p-3 border">-</td><td className="p-3 border">RP</td></tr>
              <tr><td className="p-3 border font-semibold">OJT / RP</td><td className="p-3 border">OJT / RP</td><td className="p-3 border">-</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <MScITPageClient syllabusContent={syllabus} />;
}
