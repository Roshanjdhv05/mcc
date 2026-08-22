"use client";

import React from 'react';

export default function ProgramStructureNEP() {
  const structureData = [
    { semester: "I", major: "6", minor: "2", oe: "2", vec: "2", aec: "2", sec: "2", fp: "-", total: "16" },
    { semester: "II", major: "6", minor: "2", oe: "2", vec: "2", aec: "2", sec: "2", fp: "-", total: "16" },
    { semester: "III", major: "8", minor: "2", oe: "2", vec: "-", aec: "2", sec: "2", fp: "2", total: "18" },
    { semester: "IV", major: "8", minor: "2", oe: "2", vec: "-", aec: "2", sec: "-", fp: "2", total: "16" },
    { semester: "V", major: "10", minor: "4", oe: "-", vec: "-", aec: "-", sec: "-", fp: "4", total: "18" },
    { semester: "VI", major: "10", minor: "4", oe: "-", vec: "-", aec: "-", sec: "-", fp: "4", total: "18" },
    { semester: "VII", major: "14", minor: "4", oe: "-", vec: "-", aec: "-", sec: "-", fp: "4", total: "22" },
    { semester: "VIII", major: "14", minor: "4", oe: "-", vec: "-", aec: "-", sec: "-", fp: "4", total: "22" }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-12 border border-[#E2E8F0] shadow-sm">
      <h3 className="text-xl md:text-2xl font-bold text-[#123B6D] border-b pb-4 mb-6">Program Structure (As per NEP 2020)</h3>
      <p className="text-sm text-gray-600 mb-6 font-medium">
        For Bachelor of Commerce (B.Com) / BAF / BBI / BFM / BMS (Under Graduate Programmes) – 3 years and 4 years Honours
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse min-w-[800px]">
          <thead className="bg-[#F8FAFC] text-[#123B6D] border-b-2 border-[#123B6D]">
            <tr>
              <th className="p-3 border font-bold">Semester</th>
              <th className="p-3 border font-bold">Major</th>
              <th className="p-3 border font-bold">Minor</th>
              <th className="p-3 border font-bold">Open Elective (OE)</th>
              <th className="p-3 border font-bold">VEC (Value Education)</th>
              <th className="p-3 border font-bold">AEC (Ability Enhancement)</th>
              <th className="p-3 border font-bold">SEC (Skill Enhancement)</th>
              <th className="p-3 border font-bold">FP (Field Project/OJT/CEP/CC)</th>
              <th className="p-3 border font-bold bg-[#EBF3FF]">Total Credits</th>
            </tr>
          </thead>
          <tbody>
            {structureData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 border-b">
                <td className="p-3 border font-bold text-[#D4A017]">{row.semester}</td>
                <td className="p-3 border text-center">{row.major}</td>
                <td className="p-3 border text-center">{row.minor}</td>
                <td className="p-3 border text-center">{row.oe}</td>
                <td className="p-3 border text-center">{row.vec}</td>
                <td className="p-3 border text-center">{row.aec}</td>
                <td className="p-3 border text-center">{row.sec}</td>
                <td className="p-3 border text-center">{row.fp}</td>
                <td className="p-3 border text-center font-bold bg-[#F8FAFC]">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-gray-500 italic">
        * The above credit distribution is indicative and subject to university guidelines. Credits marked as "-" indicate no subject in that category for the specific semester.
      </div>
    </div>
  );
}
