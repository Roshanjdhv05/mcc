'use client';

import React from 'react';

const milestones = [
  { year: '1970', title: 'College Founded', desc: 'Mulund College of Commerce was founded by Parle Tilak Vidyalaya Association.' },
  { year: '1976', title: 'Junior College', desc: 'Junior College was established.' },
  { year: '1980', title: 'PG Teaching Center', desc: 'Establishment of the Post Graduate teaching center for Masters in Commerce under the Department of Commerce, University of Mumbai.' },
  { year: '1994', title: 'Computer Age', desc: 'MCC moved into the "Computer Age" by starting the Computrain Centre with a view to enhance the computer skills of its students.' },
  { year: '1999', title: 'B.M.S. Introduced', desc: 'Bachelors of Management Studies (B.M.S.) was introduced.' },
  { year: '2000', title: 'Vocational Courses', desc: "With the advent of Vocationalisation and emphasis on 'On-the-job training', MCC opted for B. Com (Vocational) in Computer Applications." },
  { year: '2001', title: 'IT & CS Programmes', desc: 'B.Sc. Computer Science and B.Sc. Information Technology were introduced. Information Technology was introduced at Junior College.' },
  { year: '2003', title: 'New B.Com. Specialisations', desc: 'Introduced: B.Com. (Vocational) with Tax practice and Procedures, B.Com. (Accounts and Finance), and B.Com (Banking and Insurance).' },
  { year: '2004', title: 'NAAC A Grade & M.Sc. IT', desc: "Accredited with 'A' grade by NAAC. Introduced M.Sc. (Information Technology) affiliated to the University of Mumbai." },
  { year: '2007', title: 'M.C.A. (I.D.E.)', desc: 'Initiated M.C.A. (I.D.E.), Personal Contact Programs affiliated to the University of Mumbai.' },
  { year: '2008', title: 'MCCE & B.Com. FM', desc: 'Introduced B.Com. (Financial Markets). Mulund Centre for Commercial Education (MCCE) was started to groom students for better employability.' },
  { year: '2011', title: 'Re-accredited by NAAC', desc: "Re-accredited by National Assessment and Accreditation Council with 'A' grade." },
  { year: '2012', title: 'M.Com. (Management)', desc: 'Introduced M.Com. (Management), affiliated to the University of Mumbai.' },
  { year: '2013', title: 'Dual Degree System', desc: 'Started Diploma and Post-graduate Diploma courses under Dual Degree System in collaboration with Garware Institute of Career Education and Development.' },
  { year: '2014', title: 'Best College Award & Ph.D. Centre', desc: 'Received Best College Award (Urban Area) (2012-13) from University of Mumbai. Started Ph.D. Research Centre in Commerce with Specialization in Business Economics.' },
  { year: '2016', title: 'M.Com. (B&F) & NAAC Re-accreditation', desc: "Introduced M.Com. (Banking & Finance). Re-accredited by NAAC with 'A' grade." },
  { year: '2017', title: 'B.M.M. Introduced', desc: 'Started Bachelor of Mass Media.' },
  { year: '2019', title: 'Golden Jubilee', desc: 'MCC celebrated its Golden Jubilee Year.' },
  { year: '2020', title: 'PTVA Centenary', desc: 'PTVA celebrated its Centenary Year.' },
  { year: '2021', title: 'Academic Autonomy', desc: 'The College was conferred Academic Autonomy by UGC and entered the 4th Cycle of NAAC accreditation with A Grade (3.26 score).' },
  { year: '2022', title: 'New Science & Finance Programs', desc: 'B.Sc. (Data Science) and M.Sc. (Finance) programs were introduced. Several credits based short term courses were introduced to increase the employability of learners.' },
  { year: '2023', title: 'NEP 2020 Implementation', desc: 'Bachelors of Computer Science (BCA) and Bachelors of Business Administration (BBA) programs were introduced. National Education Policy (NEP) 2020 implemented across all the programs.' },
  { year: '2024', title: 'BFSI Program', desc: 'B.com Banking Financial Services and Insurance (BFSI) Program was introduced.' },
];

export default function MilestonesPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#123B6D] pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">Our Milestones</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">A journey of excellence, from our inception to the present day.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 md:p-12">
          
          {/* Desktop/Tablet Horizontal Snake Layout */}
          <div className="hidden lg:block relative">
            <div className="flex flex-col gap-12">
              {Array.from({ length: Math.ceil(milestones.length / 4) }).map((_, rowIndex) => {
                const isEven = rowIndex % 2 === 0;
                const rowMilestones = milestones.slice(rowIndex * 4, rowIndex * 4 + 4);
                const hasNextRow = rowIndex < Math.ceil(milestones.length / 4) - 1;
                
                return (
                  <div key={rowIndex} className={`relative flex items-center w-full ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                    
                    {/* Horizontal line passing through the dots */}
                    <div 
                      className={`absolute top-[15px] h-1 bg-[#E2E8F0] z-0 ${isEven ? 'left-[12.5%]' : 'right-[12.5%]'}`} 
                      style={{ width: `${(rowMilestones.length - 1) * 25}%` }}
                    ></div>
                    
                    {/* Vertical drop connector to next row */}
                    {hasNextRow && (
                      <div className={`absolute top-[15px] h-[calc(100%+3rem)] w-1 bg-[#E2E8F0] z-0 ${isEven ? 'right-[12.5%]' : 'left-[12.5%]'}`}></div>
                    )}

                    <div className={`flex w-full ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                      {rowMilestones.map((m, index) => (
                        <div key={m.year} className="w-1/4 px-4 relative z-10 flex flex-col items-center">
                          {/* Dot: 32px height, center is at 16px */}
                          <div className="w-8 h-8 rounded-full bg-[#123B6D] border-4 border-white shadow-md flex items-center justify-center relative mb-6">
                            <div className="w-2 h-2 bg-[#D4A017] rounded-full"></div>
                          </div>
                          
                          {/* Card */}
                          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm text-center w-full h-full flex flex-col group hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                            <div className="text-[#D4A017] font-bold text-xl mb-2 font-[var(--font-heading)]">{m.year}</div>
                            <h3 className="font-bold text-[#1E293B] text-sm mb-2">{m.title}</h3>
                            <p className="text-xs text-[#64748B] leading-relaxed">{m.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Vertical Layout */}
          <div className="lg:hidden relative">
            <div className="absolute left-8 transform -translate-x-0.5 h-full w-1 bg-[#E2E8F0]" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative flex items-start gap-6">
                  <div className="w-8 h-8 rounded-full bg-[#123B6D] border-4 border-white shadow-md flex items-center justify-center flex-shrink-0 relative z-10 mt-1 ml-4">
                    <div className="w-2 h-2 bg-[#D4A017] rounded-full"></div>
                  </div>
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 flex-1 hover:shadow-lg transition-shadow">
                    <div className="text-[#D4A017] font-bold text-lg font-[var(--font-heading)]">{m.year}</div>
                    <div className="font-bold text-[#1E293B] mb-2">{m.title}</div>
                    <div className="text-sm text-[#64748B]">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
