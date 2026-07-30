'use client';

import React from 'react';
import { Calendar, ClipboardList, TreePine, Users } from 'lucide-react';

const stats = [
  {
    icon: <Calendar size={28} className="text-blue-600" />,
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    value: '18',
    label: 'Upcoming Events',
    color: 'text-blue-600',
  },
  {
    icon: <ClipboardList size={28} className="text-orange-500" />,
    bg: 'bg-orange-50',
    iconBg: 'bg-orange-100',
    value: '4',
    label: 'Examinations',
    color: 'text-orange-500',
  },
  {
    icon: <TreePine size={28} className="text-green-600" />,
    bg: 'bg-green-50',
    iconBg: 'bg-green-100',
    value: '6',
    label: 'College Holidays',
    color: 'text-green-600',
  },
  {
    icon: <Users size={28} className="text-purple-600" />,
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    value: '32',
    label: 'Total Events',
    color: 'text-purple-600',
  },
];

export default function CalendarStats() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 -mt-16 relative z-30">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 flex items-center gap-4 hover:shadow-xl transition-shadow"
          >
            <div className={`${s.iconBg} rounded-xl p-3 flex-shrink-0`}>
              {s.icon}
            </div>
            <div>
              <div className={`text-3xl font-black leading-none ${s.color}`}>{s.value}</div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide leading-tight">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
