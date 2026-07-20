"use client";

import { syllabusData, SyllabusSubject } from '@/lib/syllabusData';

interface Props {
  programKey: string;
}

export default function SyllabusRenderer({ programKey }: Props) {
  const data = syllabusData[programKey] || [];
  console.log("Rendering SyllabusRenderer for", programKey, "data length:", data.length);

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">Syllabus data is being updated.</p>
        <p className="text-sm mt-2">Please check back shortly.</p>
      </div>
    );
  }

  // Group by semester preserving order
  const semesterOrder = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  const semesterMap: Record<string, SyllabusSubject[]> = {};
  data.forEach((sub) => {
    if (!semesterMap[sub.semester]) semesterMap[sub.semester] = [];
    semesterMap[sub.semester].push(sub);
  });

  const semesters = semesterOrder.filter((s) => semesterMap[s]);

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#123B6D] border-b pb-4">Program Structure (As per NEP 2020)</h3>
      {semesters.map((sem) => (
        <div key={sem} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-6">
          <div className="bg-[#FFF8E7] px-4 py-3 border-b border-[#E2E8F0]">
            <h4 className="font-bold text-[#D4A017]">Semester {sem}</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#F8FAFC] text-[#123B6D]">
                <tr>
                  <th className="p-3 border">Category</th>
                  <th className="p-3 border">Code</th>
                  <th className="p-3 border">Subject Name</th>
                  <th className="p-3 border">Credit</th>
                  <th className="p-3 border">Type</th>
                  <th className="p-3 border">Major</th>
                </tr>
              </thead>
              <tbody>
                {semesterMap[sem].map((sub, i) => (
                  <tr key={i} className={sub.isElective ? "bg-[#EBF3FF] hover:bg-[#EBF3FF]/80" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-semibold">{sub.subjectCategory} {sub.isElective && <span className="text-[#3B82F6] text-xs ml-1">(Elective)</span>}</td>
                    <td className="p-3 border text-gray-500 text-xs">{sub.subjectCode || '—'}</td>
                    <td className="p-3 border font-medium text-gray-900">{sub.subjectName}</td>
                    <td className="p-3 border text-center">{sub.credit}</td>
                    <td className="p-3 border text-gray-600">{sub.subjectType}</td>
                    <td className="p-3 border text-center">{sub.isMajor ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
