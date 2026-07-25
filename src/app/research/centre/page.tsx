import React from 'react';
import { Building2, Users, GraduationCap, Award, FileText, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function ResearchCentrePage() {
  const students = [
    { guide: 'Dr. Parvathi Venkatesh', name: 'Dr. Shivaji Pawar', topic: 'Towards a Sustainable Society: The Role of the Self-help Group as a Catalyst for Economic Stability with special reference to SHGs in Maharashtra.', status: 'Awarded' },
    { guide: 'Dr. Parvathi Venkatesh', name: 'Dr. Vijayalaxmi Kannan', topic: 'Mapping of Customer Experience and its impact on Customer Lifetime Value: A study of Agglomerated Retail Stores in Thane and Mulund Cities', status: 'Awarded' },
    { guide: 'Dr. Parvathi Venkatesh', name: 'Dr. Sulbha Dey', topic: 'Impact of Green Policies and Practices on Economic Performance of Green Organized Retailers in Mumbai "in 2020', status: 'Awarded' },
    { guide: 'Dr. Parvathi Venkatesh', name: 'Mrs. Riya Dhamapurkar', topic: 'An Assessment of Revenue and Expenditure Pattern of Municipal Corporation in Maharashtra – With Special reference to Municipal Corporation of Greater Mumbai (MCGM), Mumbai.', status: 'Thesis submitted' },
    { guide: 'Dr. Shivaji Pawar', name: 'Dr. Shilpi Deepak Jawake', topic: 'A study of consumer buying intention of Green Product in FMCG sector', status: 'Awarded' },
    { guide: 'Dr. Shivaji Pawar', name: 'Dr. Chetan Mahesh Panchal', topic: 'A Study on Socio-Economic Condition of Fishermen in Mumbai Metropolitan Region', status: 'Awarded' },
    { guide: 'Dr. Shivaji Pawar', name: 'Ms. Pradnya Uddhav Rao Garad', topic: 'Impact Of Bank Merger on Customers and Employees in Thane Region: A Case Study of Merging of Andhra And Corporation Bank in Union Bank of India', status: 'Thesis submitted' },
    { guide: 'Dr. Shivaji Pawar', name: 'Ms. Shrusti Desai', topic: 'A Critical Appraisal of Mumbai Suburban Railway’s SDG-13 Initiatives and Its Impact on Their Economic Performance.', status: 'Work in Progress' },
    { guide: 'Dr. Shivaji Pawar', name: 'Ms. Esha Jhaveri', topic: 'An Analysis of Financial Inclusion and Economic Mobility of Gig Workers in the Mumbai Region', status: 'Work in Progress' },
    { guide: 'Dr. Shivaji Pawar', name: 'Ms. Snehal Pandurang Chavan', topic: 'An Evaluation of the Impact of Farmer Producer Organizations on Socio-Economic Empowerment of Cash Crop Farmers in Nashik District', status: 'Work in Progress' },
    { guide: 'Dr. Shivaji Pawar', name: 'Ms. Gopika M .Pal', topic: 'Measuring the Level of Socio-Economic Vulnerability of Construction Workers in the Unorganised Sector in Thane District', status: 'Work in Progress' }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 font-sans">
      
      {/* Hero Section */}
      <div className="bg-[#123B6D] text-white py-16 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-[#D4A017] mb-3">
              <Link href="/research" className="hover:text-white transition-colors">RESEARCH</Link> 
              <span>/</span> 
              <span>CENTRE</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-[var(--font-heading)] leading-tight mb-4">
              Research Centre for PhD in Commerce
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Specializing in Business Economics, fostering a culture of innovation and scholarly inquiry.
            </p>
          </div>
          <div className="hidden md:flex bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 items-center gap-6 shadow-xl">
            <Building2 size={48} className="text-[#D4A017]" />
            <div>
              <div className="text-sm text-white/70 font-semibold uppercase tracking-wider mb-1">Establishment</div>
              <div className="text-4xl font-bold font-mono">2014</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-12">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-start gap-4">
            <div className="bg-[#EBF3FF] p-3 rounded-xl text-[#123B6D]">
              <Users size={24} />
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1E293B]">2</div>
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">Research Guides</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-start gap-4">
            <div className="bg-[#EBF3FF] p-3 rounded-xl text-[#123B6D]">
              <GraduationCap size={24} />
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1E293B]">11</div>
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">Students Registered</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-start gap-4">
            <div className="bg-[#EBF3FF] p-3 rounded-xl text-[#123B6D]">
              <Award size={24} />
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1E293B]">5</div>
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">Awarded PhD</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-start gap-4">
            <div className="bg-[#EBF3FF] p-3 rounded-xl text-[#123B6D]">
              <FileText size={24} />
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1E293B]">2</div>
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">Thesis Submitted</div>
            </div>
          </div>
        </div>

        {/* Guides Section */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#123B6D] mb-6 flex items-center gap-3">
            <Users size={24} className="text-[#D4A017]" />
            Research Guides
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl px-6 py-4 font-semibold text-[#1E293B] flex-1 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#123B6D]"></div>
              Dr. Parvathi Venkatesh
            </div>
            <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl px-6 py-4 font-semibold text-[#1E293B] flex-1 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#123B6D]"></div>
              Dr. Shivaji Pawar
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <div className="p-8 pb-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-[#123B6D] flex items-center gap-3">
              <FileText size={24} className="text-[#D4A017]" />
              Research Scholars & Topics
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                  <th className="px-6 py-4 font-bold">Research Guide</th>
                  <th className="px-6 py-4 font-bold">Research Student Name</th>
                  <th className="px-6 py-4 font-bold min-w-[300px]">Topic of Research</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[15px]">
                {students.map((student, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAFC]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1E293B] whitespace-nowrap">
                      {student.guide}
                    </td>
                    <td className="px-6 py-5 text-gray-700 font-medium">
                      {student.name}
                    </td>
                    <td className="px-6 py-5 text-gray-600 leading-relaxed">
                      {student.topic}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                        student.status === 'Awarded' 
                          ? 'bg-green-100 text-green-700' 
                          : student.status === 'Thesis submitted'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {student.status}
                      </span>
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
