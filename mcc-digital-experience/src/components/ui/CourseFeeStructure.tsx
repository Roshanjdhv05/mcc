"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, GraduationCap, Info } from 'lucide-react';
import {
  CourseKey, FeeRow,
  commerceKeys, scienceKeys, reservedKeys,
  commerceY1Rows, commerceY1Data, commerceY1Totals,
  commerceY2Rows, commerceY2Data, commerceY2Totals,
  commerceY3Rows, commerceY3Data, commerceY3Totals,
  scienceY1Rows, scienceY1Data, scienceY1Totals,
  scienceY2Rows, scienceY2Data, scienceY2Totals,
  scienceY3Rows, scienceY3Data, scienceY3Totals,
  reservedY1Rows, reservedY1Data, reservedY1Totals,
  reservedY2Rows, reservedY2Data, reservedY2Totals,
  reservedY3Rows, reservedY3Data, reservedY3Totals,
} from '@/lib/feeData';

function fmtNum(n: number | string): string {
  if (n === 0 || n === '') return '—';
  if (typeof n === 'string') return n;
  return `₹${n.toLocaleString('en-IN')}`;
}

interface FeeTableProps {
  rows: FeeRow[];
  courseKey: CourseKey;
  data: Record<CourseKey, (number | string)[]>;
  total: number;
}

function FeeTable({ rows, courseKey, data, total }: FeeTableProps) {
  let dataIndex = 0; // separate counter — section rows don't consume data slots

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0] shadow-sm bg-white">
      <table className="w-full text-xs md:text-sm border-collapse">
        <thead>
          <tr className="bg-[#123B6D] text-white">
            <th className="text-left px-3 md:px-4 py-2.5 md:py-3 font-semibold rounded-tl-2xl w-3/5 md:w-auto">
              Fee Head
            </th>
            <th className="text-right md:text-center px-3 md:px-4 py-2.5 md:py-3 font-semibold rounded-tr-2xl whitespace-nowrap">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            if (row.isSection) {
              return (
                <tr key={ri} className="bg-[#D4A017]/10 border-y border-[#D4A017]/30">
                  <td
                    colSpan={2}
                    className="px-3 md:px-4 py-2 font-bold text-[#9a7511] text-[10px] md:text-xs uppercase tracking-wider"
                  >
                    {row.head} {row.starred && <span className="text-[#D4A017]">*</span>}
                  </td>
                </tr>
              );
            }
            const val = data[courseKey]?.[dataIndex] ?? 0;
            dataIndex++;
            return (
              <tr
                key={ri}
                className={`border-b border-[#E2E8F0] transition-colors ${ri % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'} hover:bg-[#EFF6FF]`}
              >
                <td className="px-3 md:px-4 py-2 md:py-2.5 text-[#1E293B] font-medium leading-tight">
                  <span>{row.head}</span>
                  {row.starred && (
                    <span className="ml-1 text-[#D4A017] font-bold">*</span>
                  )}
                </td>
                <td
                  className={`text-right md:text-center px-3 md:px-4 py-2 md:py-2.5 tabular-nums whitespace-nowrap ${val === 0 ? 'text-[#94A3B8]' : 'text-[#1E293B]'}`}
                >
                  {fmtNum(val)}
                </td>
              </tr>
            );
          })}
          {/* Total row */}
          <tr className="bg-[#123B6D] text-white font-bold border-t-2 border-[#D4A017]">
            <td className="px-3 md:px-4 py-2.5 md:py-3 rounded-bl-2xl text-xs md:text-sm">
              Total (A + B)
            </td>
            <td className="text-right md:text-center px-3 md:px-4 py-2.5 md:py-3 text-[#D4A017] rounded-br-2xl whitespace-nowrap text-xs md:text-sm">
              {total > 0 ? `₹${total.toLocaleString('en-IN')}` : '—'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

interface YearSectionProps {
  year: string;
  rows: FeeRow[];
  courseKey: CourseKey;
  data: Record<CourseKey, (number | string)[]>;
  total: number;
}

function YearSection({ year, rows, courseKey, data, total }: YearSectionProps) {
  const [open, setOpen] = useState(year === 'First Year');

  return (
    <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-[#F1F5F9] transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#123B6D]/10 flex items-center justify-center group-hover:bg-[#123B6D]/20 transition-colors">
            <GraduationCap size={16} className="text-[#123B6D]" />
          </div>
          <span className="font-bold text-[#123B6D] text-lg font-[var(--font-heading)]">{year}</span>
        </div>
        <div className="flex items-center gap-3">
          {total > 0 && (
            <span className="hidden md:inline-block text-xs bg-[#123B6D]/10 text-[#123B6D] px-3 py-1.5 rounded-full font-bold">
              Total: ₹{total.toLocaleString('en-IN')}
            </span>
          )}
          {open ? <ChevronUp size={20} className="text-[#64748B]" /> : <ChevronDown size={20} className="text-[#64748B]" />}
        </div>
      </button>
      {open && (
        <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <FeeTable rows={rows} courseKey={courseKey} data={data} total={total} />
        </div>
      )}
    </div>
  );
}

export default function CourseFeeStructure({ courseKey, category: _category }: { courseKey: CourseKey; category?: 'commerce' | 'science' }) {
  const category = commerceKeys.includes(courseKey) ? 'commerce' : scienceKeys.includes(courseKey) ? 'science' : 'commerce';
  
  const y1Rows = category === 'commerce' ? commerceY1Rows : scienceY1Rows;
  const y1Data = category === 'commerce' ? commerceY1Data : scienceY1Data;
  const y1Totals = category === 'commerce' ? commerceY1Totals : scienceY1Totals;

  const y2Rows = category === 'commerce' ? commerceY2Rows : scienceY2Rows;
  const y2Data = category === 'commerce' ? commerceY2Data : scienceY2Data;
  const y2Totals = category === 'commerce' ? commerceY2Totals : scienceY2Totals;

  const y3Rows = category === 'commerce' ? commerceY3Rows : scienceY3Rows;
  const y3Data = category === 'commerce' ? commerceY3Data : scienceY3Data;
  const y3Totals = category === 'commerce' ? commerceY3Totals : scienceY3Totals;

  const hasReserved = reservedKeys.includes(courseKey) && reservedY1Totals[courseKey] > 0;

  return (
    <div className="mt-12 space-y-8">
      <div className="border-b pb-4">
        <h3 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Regular Fee Structure 2026-27</h3>
        <p className="text-gray-500 text-sm mt-1">Detailed breakdown of regular fees for all years.</p>
      </div>
      
      <div className="space-y-4">
        {y1Totals[courseKey] > 0 && (
          <YearSection year="First Year" rows={y1Rows} courseKey={courseKey} data={y1Data} total={y1Totals[courseKey]} />
        )}
        {y2Totals[courseKey] > 0 && (
          <YearSection year="Second Year" rows={y2Rows} courseKey={courseKey} data={y2Data} total={y2Totals[courseKey]} />
        )}
        {y3Totals[courseKey] > 0 && (
          <YearSection year="Third Year" rows={y3Rows} courseKey={courseKey} data={y3Data} total={y3Totals[courseKey]} />
        )}
      </div>

      {hasReserved && (
        <>
          <div className="border-b pb-4 mt-12">
            <h3 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Reserved Category Fee Structure 2026-27</h3>
            <p className="text-gray-500 text-sm mt-1">Fee structure applicable for reserved category students (SC/ST/OBC/VJNT/SBC).</p>
          </div>
          <div className="space-y-4">
            {reservedY1Totals[courseKey] > 0 && (
              <YearSection year="First Year" rows={reservedY1Rows} courseKey={courseKey} data={reservedY1Data} total={reservedY1Totals[courseKey]} />
            )}
            {reservedY2Totals[courseKey] > 0 && (
              <YearSection year="Second Year" rows={reservedY2Rows} courseKey={courseKey} data={reservedY2Data} total={reservedY2Totals[courseKey]} />
            )}
            {reservedY3Totals[courseKey] > 0 && (
              <YearSection year="Third Year" rows={reservedY3Rows} courseKey={courseKey} data={reservedY3Data} total={reservedY3Totals[courseKey]} />
            )}
          </div>
        </>
      )}

      <div className="bg-[#FFF8E7] rounded-xl p-4 border border-[#FDE68A] mt-8">
        <h4 className="font-bold text-[#9a7511] text-sm mb-2">Reserved Category Students</h4>
        <p className="text-xs text-[#9a7511]/80 leading-relaxed">
          Students belonging to reserved categories (SC/ST/OBC/VJNT/SBC) may be eligible for scholarships or freeships as per Government of Maharashtra rules. Please contact the college office for the specific fee structure applicable to your category.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-[#D4A017]/30 bg-[#D4A017]/5 px-5 py-4 text-sm text-[#5a4a0a] space-y-1">
        <p className="font-semibold text-[#9a7511] mb-1 flex items-center gap-1.5">
          <Info size={14} /> Notes
        </p>
        <p>1) The fees are as per Finance Committee Meeting dated <strong>17.04.2026</strong> vide Notification of Higher and Technical Education Department, Government of Maharashtra dated 14th January 2019 and University of Mumbai Circular Nos. <strong>2026APR/AAMS-III/(C-8)/37894</strong> &amp; <strong>2026APR/AAMS-III/(C-6)/37361</strong> dated 16.04.2026.</p>
        <p>2) Fee heads marked with <span className="text-[#D4A017] font-bold">*</span> will be reviewed every year.</p>
      </div>
    </div>
  );
}
