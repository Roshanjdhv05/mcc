"use client";

import React from 'react';
import { Shield, User, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RTIPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-12 font-sans">
      {/* ── Hero ── */}
      <div className="bg-[#123B6D] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-widest border border-white/20">
            <Shield size={14} /> Statutory Information
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Right to Information Act 2005
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Information regarding the Appellate Authority and Information Officer at Mulund College of Commerce under the RTI Act, 2005.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="p-6 md:p-10 border-b border-gray-100 bg-blue-50/30">
            <h2 className="text-2xl font-bold text-[#123B6D] flex items-center gap-3">
              <FileText className="text-[#D4A017]" size={24} />
              RTI Officials
            </h2>
          </div>

          <div className="p-6 md:p-10 grid md:grid-cols-2 gap-8">
            
            {/* Appellate Authority */}
            <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-blue-50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-in-out" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#123B6D]/10 text-[#123B6D] rounded-xl flex items-center justify-center mb-6">
                  <User size={24} />
                </div>
                <div className="text-xs font-bold text-[#D4A017] uppercase tracking-wider mb-2">
                  Appellate Authority
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-1">Prof. Dr. Minal Mapuskar</h3>
                <p className="text-gray-600 font-medium">Principal</p>
              </div>
            </div>

            {/* Information Officer */}
            <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-blue-50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-in-out" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#123B6D]/10 text-[#123B6D] rounded-xl flex items-center justify-center mb-6">
                  <User size={24} />
                </div>
                <div className="text-xs font-bold text-[#D4A017] uppercase tracking-wider mb-2">
                  Information Officer <span className="text-gray-400 font-medium ml-1 text-[10px]">(Under RTI Act 2005)</span>
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-1">Shri. Devendrasing Rajput</h3>
                <p className="text-gray-600 font-medium">Head Clerk</p>
              </div>
            </div>

          </div>

          <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              For more information about the RTI Act, you can visit the official government RTI portal.
            </p>
            <a 
              href="https://rti.gov.in/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#123B6D] hover:bg-[#0f2e56] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0"
            >
              Official RTI Portal <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
