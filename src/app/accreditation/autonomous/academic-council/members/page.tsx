'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';

const members = [
  { sr: 1,  position: 'Principal – Chairperson',                                     department: '',                                                    name: 'Dr. Minal Mapuskar' },
  { sr: 2,  position: 'All HODs',                                                     department: 'Commerce',                                            name: 'CA Dr. Anuradha Ganesh' },
  { sr: 3,  position: '',                                                              department: 'Accountancy',                                         name: 'Mr. Nikhil Karkhanis' },
  { sr: 4,  position: '',                                                              department: 'Economics',                                            name: 'Dr. S A Pawar' },
  { sr: 5,  position: '',                                                              department: 'Mathematics & Statistics',                             name: 'Ms. Seema Attarde' },
  { sr: 6,  position: '',                                                              department: 'Environmental Studies',                               name: 'Mr. Amit Yadav' },
  { sr: 7,  position: '',                                                              department: 'Law',                                                  name: 'Dr. Pramila D\'Souza' },
  { sr: 8,  position: '',                                                              department: 'English',                                              name: 'Dr. Shayerie Ghosh' },
  { sr: 9,  position: '',                                                              department: 'Information Technology, Data Science & Computer Applications', name: 'Dr. Reena Nagda' },
  { sr: 10, position: '',                                                              department: 'Computer Science',                                     name: 'Ms. Reena Nagda' },
  { sr: 11, position: '',                                                              department: 'Management Studies',                                   name: 'Ms. Seema Ashar' },
  { sr: 12, position: '',                                                              department: 'Mass Media & Business Administration',                  name: 'Dr. Viji Kannan' },
  { sr: 13, position: '',                                                              department: 'Indian Knowledge System',                              name: 'Prin. Dr. Minal Mapuskar' },
  { sr: 14, position: '',                                                              department: 'Accounting & Finance',                                 name: 'Ms. Alpa Katira' },
  { sr: 15, position: '',                                                              department: 'Banking & Insurance / BFSI / Finance',                 name: 'Dr. Rajashri Deshpande' },
  { sr: 16, position: '',                                                              department: 'Financial Market',                                     name: 'Mrs. Shilpa Thakur' },
  { sr: 17, position: '4 Teachers – teaching staff (by rotation, seniority)',        department: '',                                                    name: 'Dr. Sulbha Dey' },
  { sr: 18, position: '',                                                              department: '',                                                    name: 'Ms. Riya Dhamapurkar' },
  { sr: 19, position: '',                                                              department: '',                                                    name: 'Dr. Vaishnavi Absar' },
  { sr: 20, position: '',                                                              department: '',                                                    name: 'Ms. Archana Kadam' },
  { sr: 21, position: '4 Experts / Academicians from outside',                       department: '',                                                    name: 'Mr. Sunil Sathe' },
  { sr: 22, position: '',                                                              department: '',                                                    name: 'Prof. Kavita Laghate' },
  { sr: 23, position: '',                                                              department: '',                                                    name: 'Dr. Mala Lalvani' },
  { sr: 24, position: '',                                                              department: '',                                                    name: 'Prin. (Dr.) Suhasini V. Sant' },
  { sr: 25, position: 'Nominees of University',                                       department: '',                                                    name: 'Prin. (Dr.) Kailash Anekar' },
  { sr: 26, position: '',                                                              department: '',                                                    name: 'Prin. Dr. Ranjan Patra' },
  { sr: 27, position: '',                                                              department: '',                                                    name: 'Prin. (Dr.) Swapna Hemant Samel' },
  { sr: 28, position: 'Faculty member nominated by Principal (Member Secretary)',    department: '',                                                    name: 'Dr. Vaishali Patil' },
];

const bgPalette = [
  'bg-blue-600','bg-purple-600','bg-emerald-600','bg-rose-500',
  'bg-indigo-600','bg-teal-600','bg-orange-500','bg-cyan-600',
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

export default function AcademicCouncilMembersPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#7c3aed] pt-28 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-4">
            Autonomous HEI · Accreditation &amp; Rankings
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-3">
            Academic Council
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
            Members of the Academic Council of Mulund College of Commerce (Autonomous).
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-12 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          {/* Panel Header */}
          <div className="px-6 md:px-10 py-8 border-b flex items-center gap-5 bg-purple-50">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 bg-[#7c3aed]">
              <BookOpen size={28} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#7c3aed] font-[var(--font-heading)]">Academic Council</h2>
              <p className="text-gray-500 mt-0.5 text-sm">{members.length} members</p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F1F5F9]">
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-14">Sr.</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Position / Category</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((m, idx) => (
                  <tr key={m.sr} className="hover:bg-purple-50/30 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-400">{m.sr}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs leading-snug max-w-[200px]">{m.position}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs leading-snug max-w-[220px]">{m.department}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm ${bgPalette[idx % bgPalette.length]}`}>
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
