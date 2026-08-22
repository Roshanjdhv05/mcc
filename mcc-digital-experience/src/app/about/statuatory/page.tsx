'use client';

import React, { useState, useEffect } from 'react';
import { Users, BookOpen, CircleDollarSign, ShieldCheck, ChevronRight } from 'lucide-react';

const committees = [
  {
    id: 'standing-committee',
    label: 'Standing Committee',
    icon: Users,
    color: 'blue',
    accent: '#123B6D',
    light: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    ring: 'ring-blue-400',
    members: [
      { sr: 1, name: 'Mr. Dilip M. Pethe', position: 'Hon. Secretary, PTVA' },
      { sr: 2, name: 'Mr. Bansidhar Dhurandhar', position: 'Hon. Treasurer, PTVA' },
      { sr: 3, name: 'Mr. Dhananjay M. Sathaye', position: 'Director, PTVA' },
      { sr: 4, name: 'Dr. Minal Mapuskar', position: 'Principal, Mulund College of Commerce' },
    ]
  },
  {
    id: 'academic-council',
    label: 'Academic Council',
    icon: BookOpen,
    color: 'purple',
    accent: '#7c3aed',
    light: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    ring: 'ring-purple-400',
    members: [
      { sr: 1, name: 'Dr. Minal Mapuskar', position: 'Principal' },
      { sr: 2, name: 'Mr. Nikhil Karkhanis', position: 'Chairperson, BOS- Accountancy' },
      { sr: 3, name: 'CA Dr. Anuradha Ganesh', position: 'Chairperson, BOS- Commerce' },
      { sr: 4, name: 'Dr. S A Pawar', position: 'Chairperson, BOS- Business Economics' },
      { sr: 5, name: 'Ms. Seema Attarde', position: 'In-charge Chairperson, BOS- Maths & Stats' },
      { sr: 6, name: 'Mr. Amit Yadav', position: 'Chairperson, BOS- Environmental Studies' },
      { sr: 7, name: 'Dr. Pramila D\'Souza', position: 'Chairperson, BOS- Law' },
      { sr: 8, name: 'Dr. Shayeree Ghosh', position: 'Chairperson, BOS- English' },
      { sr: 9, name: 'Ms. Reena Shah', position: 'Chairperson, BOS- Computer Science' },
      { sr: 10, name: 'Dr. Jyotika Chedda', position: 'Chairperson, BOS- Information Technology' },
      { sr: 11, name: 'Dr. Vishal Borude', position: 'Chairperson, BOS- Computer Applications' },
      { sr: 12, name: 'Dr. Priti Phatake', position: 'Chairperson, BOS- Data Science' },
      { sr: 13, name: 'Dr. Viji Kannan', position: 'Chairperson, BOS- Business Administration & Mass Media' },
      { sr: 14, name: 'Dr. Minal Mapuskar', position: 'Chairperson, BOS- IKS' },
      { sr: 15, name: 'Ms. Alpa Katira', position: 'Chairperson, BOS- Accounting and Finance' },
      { sr: 16, name: 'Dr. Rajashri Deshpande', position: 'Chairperson, BOS- Banking & Insurance' },
      { sr: 17, name: 'Mrs. Shilpa Thakur', position: 'Chairperson, BOS- Financial Market' },
      { sr: 18, name: 'Ms. Archana Kadam', position: 'Teacher Nominee' },
      { sr: 19, name: 'Dr. Sulbha Dey', position: 'Teacher Nominee' },
      { sr: 20, name: 'Dr. Vaishnavi Assar', position: 'Teacher Nominee' },
      { sr: 21, name: 'Ms. Riya Dhamapurkar', position: 'Teacher Nominee' },
      { sr: 22, name: 'Dr. Mala Lalvani', position: 'Governing Body Nominee' },
      { sr: 23, name: 'Prin. (Dr.) Suhasini V. Sant', position: 'Governing Body Nominee' },
      { sr: 24, name: 'Prin. Dr. Sapna Hemant Same', position: 'Governing Body Nominee' },
      { sr: 25, name: 'Prof. Kavita Laghate', position: 'University Nominee' },
      { sr: 26, name: 'Prin. Dr. Kailash Anekar', position: 'University Nominee' },
      { sr: 27, name: 'Prin. Dr. Ranjan Patra', position: 'University Nominee' },
      { sr: 28, name: 'Dr. Vaishali Patil', position: 'Faculty, Member Secretary' },
    ]
  },
  {
    id: 'finance-committee',
    label: 'Finance Committee',
    icon: CircleDollarSign,
    color: 'emerald',
    accent: '#059669',
    light: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    ring: 'ring-emerald-400',
    members: [
      { sr: 1, name: 'CA Mukund Chitale', position: 'Management Representative' },
      { sr: 2, name: 'Dr. Minal Mapuskar', position: 'Principal' },
      { sr: 3, name: 'Mr. Ashok Phalnikar', position: 'Finance and Accounts Officer, University of Mumbai' },
      { sr: 4, name: 'Dr. Shivaji Pawar', position: 'Senior Teacher' },
    ]
  },
  {
    id: 'iqac',
    label: 'IQAC',
    icon: ShieldCheck,
    color: 'gold',
    accent: '#D4A017',
    light: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-700',
    ring: 'ring-yellow-400',
    members: [
      { sr: 1, name: 'Principal Dr. Minal Mapuskar', position: 'Chairperson' },
      { sr: 2, name: 'CA Shri A. B. Ganu', position: 'Hon. President, PTVA' },
      { sr: 3, name: 'Shri B. S. Dhurandhar', position: 'Hon. Treasurer, PTVA' },
      { sr: 4, name: 'CA V. V. Joshi', position: 'Nominee of Local Society' },
      { sr: 5, name: 'Dr. Vinay Bhole', position: 'Nominee of Local Society' },
      { sr: 6, name: 'Mr. Chandrashekhar Tilak', position: 'Nominee from Employers/Industry/Stakeholders' },
      { sr: 7, name: 'Mr. Satish Utekar', position: 'Nominee from Employers/Industry/Stakeholders' },
      { sr: 8, name: 'Mr. Nikhil Karkhanis', position: 'Co-ordinator' },
      { sr: 9, name: 'CA Dr. Anuradha Ganesh', position: 'Senior Teacher' },
      { sr: 10, name: 'Dr. Arjun Lakhe', position: 'Senior Teacher' },
      { sr: 11, name: 'Dr. Viji Kannan', position: 'Senior Teacher' },
      { sr: 12, name: 'Mr. Amit Yadav', position: 'Senior Teacher' },
      { sr: 13, name: 'Mrs. Shilpa Thakur', position: 'Senior Teacher' },
      { sr: 14, name: 'Dr. Shayaree Ghosh', position: 'Senior Teacher' },
      { sr: 15, name: 'Dr. Sulbha Dey', position: 'Senior Teacher' },
    ]
  },
];

function getInitials(name: string) {
  return name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|CA|Prin\.|Prof\.|Shri)\.?\s*/i, '')
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
}

const bgPalette = [
  'bg-blue-600', 'bg-purple-600', 'bg-emerald-600', 'bg-rose-500',
  'bg-indigo-600', 'bg-teal-600', 'bg-orange-500', 'bg-cyan-600',
];

export default function StatuatoryPage() {
  const [active, setActive] = useState(committees[0].id);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && committees.find(c => c.id === hash)) setActive(hash);
  }, []);

  const handleTabChange = (id: string) => {
    setActive(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  const current = committees.find(c => c.id === active) || committees[0];
  const Icon = current.icon;

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#123B6D] pt-12 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white font-[var(--font-heading)] mb-3">
            Statutory Bodies
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
            Governing committees that uphold academic excellence and institutional integrity at MCC.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Tabs */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-4 lg:sticky lg:top-24">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 pt-2 pb-3">Committees</p>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {committees.map(c => {
                  const CIcon = c.icon;
                  const isActive = active === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleTabChange(c.id)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-all duration-300 text-left shrink-0 lg:w-full
                        ${isActive
                          ? `${c.light} ${c.border} shadow-sm`
                          : 'bg-white border-transparent hover:bg-gray-50'
                        }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all
                        ${isActive ? `text-white shadow-md` : 'bg-gray-100 text-gray-500'}`}
                        style={isActive ? { backgroundColor: c.accent } : {}}>
                        <CIcon size={18} />
                      </div>
                      <span className={`font-semibold text-sm leading-tight whitespace-nowrap lg:whitespace-normal
                        ${isActive ? c.text : 'text-gray-600'}`}>
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content Panel */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">

              {/* Panel Header */}
              <div className={`px-6 md:px-10 py-8 border-b flex items-center gap-5 ${current.light}`}
                style={{ borderColor: `${current.accent}22` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0"
                  style={{ backgroundColor: current.accent }}>
                  <Icon size={28} />
                </div>
                <div>
                  <h2 className="text-lg md:text-2xl font-bold font-[var(--font-heading)]"
                    style={{ color: current.accent }}>
                    {current.label}
                  </h2>
                  <p className="text-gray-500 mt-0.5 text-sm">{current.members.length} member{current.members.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Members Grid */}
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {current.members.map((m, idx) => (
                    <div
                      key={m.sr}
                      className={`flex items-center gap-4 p-4 rounded-2xl border bg-gray-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}
                    >
                      {/* Avatar */}
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm ${bgPalette[idx % bgPalette.length]}`}>
                        {getInitials(m.name)}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-800 text-xs md:text-sm leading-snug break-words">{m.name}</p>
                        <p className="text-gray-500 text-[11px] md:text-xs leading-snug mt-0.5 break-words">{m.position}</p>
                      </div>

                      {/* SR badge */}
                      <div className="ml-auto shrink-0 w-7 h-7 rounded-full border text-xs font-bold flex items-center justify-center text-gray-400 border-gray-200">
                        {m.sr}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
