'use client';

import React from 'react';
import { CircleDollarSign } from 'lucide-react';

const members = [
  { sr: 1, category: 'Management', nature: 'One person to be nominated by the Governing Body for a period of two years.', name: 'Shri Hemant Bhatawadekar' },
  { sr: 2, category: 'Principal', nature: 'Chairman', name: 'Dr. Minal Mapuskar' },
  { sr: 3, category: 'Senior Teacher', nature: 'One senior most faculty member nominated in rotation by the Principal for two years.', name: 'Dr. S.A.Pawar' },
  { sr: 4, category: 'Administrative Staff', nature: 'Finance Officer / Officer in-charge of Finance and Accounts (Member Secretary)', name: 'Mrs. Shraddha Salunke' },
];

const bgPalette = [
  'bg-blue-600','bg-purple-600','bg-emerald-600','bg-rose-500',
];

function getInitials(name: string) {
  return name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|CA|Prin\.|Prof\.|Shri)\.*\s*/i, '')
    .split(' ')
    .slice(0, 2)
    .map(w => w[0] || '')
    .join('')
    .toUpperCase();
}

export default function FinanceCommitteeMembersPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#059669] pt-28 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-4">
            Autonomous HEI · Accreditation &amp; Rankings
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-3">
            Finance Committee
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
            Members of the Finance Committee of Mulund College of Commerce (Autonomous).
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-12 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          {/* Panel Header */}
          <div className="px-6 md:px-10 py-8 border-b flex items-center gap-5 bg-emerald-50">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 bg-[#059669]">
              <CircleDollarSign size={28} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#059669] font-[var(--font-heading)]">Finance Committee</h2>
              <p className="text-gray-500 mt-0.5 text-sm">{members.length} members</p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F1F5F9]">
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-14">Sr.</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Nature</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((m, idx) => (
                  <tr key={m.sr} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-4 py-4 font-bold text-gray-400">{m.sr}</td>
                    <td className="px-4 py-4 font-semibold text-gray-700 text-xs">{m.category}</td>
                    <td className="px-4 py-4 text-gray-500 text-xs leading-relaxed max-w-xs">{m.nature}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm ${bgPalette[idx % bgPalette.length]}`}>
                          {getInitials(m.name)}
                        </div>
                        <span className="font-semibold text-gray-800 text-xs leading-snug">{m.name}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
