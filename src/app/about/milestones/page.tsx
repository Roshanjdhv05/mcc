import Image from 'next/image';
import { Trophy, History, Building2, BookOpen, GraduationCap, CheckCircle2, Calendar, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Milestones & Achievements | MCC Digital Experience Platform',
  description: 'A timeline of achievements and institutions under Parle Tilak Vidyalaya Association.',
};

const milestones = [
  {
    period: "2020 - Present",
    color: "blue",
    events: [
      { year: "2024", desc: "Introduced Apprenticeship Embedded Degree Programme (BFSI), B.Com (Management Studies), B.Com (Business Admin), B.Sc. (Computer Applications)." },
      { year: "2023", desc: "Implemented NEP 2020. Introduced BCA and BBA programmes." },
      { year: "2022", desc: "Introduced B.Sc. (Data Science) and M.Sc. (Finance). Launched employability short-term courses." },
      { year: "2021", desc: "Conferred Autonomy by UGC." },
      { year: "2020", desc: "PTVA celebrated its Centenary Year." }
    ]
  },
  {
    period: "2010 - 2019",
    color: "gold",
    events: [
      { year: "2019", desc: "MCC celebrated its Golden Jubilee Year." },
      { year: "2016", desc: "Introduced M.Com (Banking & Finance) and BAMMC. Re-accredited by NAAC with A-grade." },
      { year: "2014", desc: "Started Ph.D. Research Center in Commerce. Received Best College Award (Urban Area) from Mumbai University." },
      { year: "2013", desc: "Launched Diploma and PG Diploma courses in collaboration with Garware Institute." },
      { year: "2012", desc: "Introduced M.Com (Business Management)." },
      { year: "2011", desc: "Re-accredited by NAAC with 'A' grade." }
    ]
  },
  {
    period: "2000 - 2009",
    color: "emerald",
    events: [
      { year: "2008", desc: "Launched MCCE. Introduced B.Com (Financial Markets)." },
      { year: "2007", desc: "Initiated MCA (IDE) and Personal Contact Programmes under IDOL." },
      { year: "2004", desc: "Accredited with 'A' grade by NAAC. Introduced M.Sc. (IT)." },
      { year: "2003", desc: "Introduced B.Com (Vocational), B.Com (A&F), and B.Com (B&I)." },
      { year: "2001", desc: "Introduced B.Sc. (Computer Science) and B.Sc. (IT)." },
      { year: "2000", desc: "Opted for B.Com (Vocational) in Computer Applications." }
    ]
  },
  {
    period: "1970 - 1999",
    color: "purple",
    events: [
      { year: "1999", desc: "Introduced Bachelor of Management Studies (B.M.S)." },
      { year: "1994", desc: "Established Computrain Center for enhancing computer skills." },
      { year: "1980", desc: "Established Postgraduate teaching center for Masters in Commerce." },
      { year: "1976", desc: "Junior College was established." },
      { year: "1970", desc: "Mulund College of Commerce was founded." }
    ]
  }
];

const institutions = {
  marathi: [
    "Parle Tilak Vidyalaya Primary School, Vile-Parle (E)",
    "Parle Tilak Vidyalaya Secondary School, Andheri",
    "Paranjape Vidyalaya Primary School, Andheri",
    "Paranjape Vidyalaya Secondary School, Andheri"
  ],
  english: [
    "Sathaye College (Degree & Junior), Vile-Parle (E)",
    "M.L. Dahanukar College of Commerce (Degree & Junior), Vile-Parle (E)",
    "ICSE School, Vile Parle (E)",
    "Parle Tilak Vidyalaya Primary & Secondary School No. 2, Vile-Parle (E)",
    "Mulund College of Commerce (Degree & Junior), Mulund (W)",
    "Institute of Management Studies, Vile Parle (E)"
  ]
};

export default function MilestonesPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-[#123B6D] pt-12 pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">Milestones & Achievements</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">A journey of excellence, growth, and institutional pride spanning over five decades.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-20 relative z-20">
        
        {/* Achievements Section (Grouped by Decade for compactness) */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 md:p-10 mb-12">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Trophy className="text-[#D4A017]" size={32} />
            <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] font-[var(--font-heading)]">Our Journey</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {milestones.map((decade, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white
                    ${decade.color === 'blue' ? 'bg-blue-600' : 
                      decade.color === 'gold' ? 'bg-[#D4A017]' : 
                      decade.color === 'emerald' ? 'bg-emerald-600' : 'bg-purple-600'}`}>
                    <Calendar size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 tracking-wide">{decade.period}</h3>
                </div>

                <div className="space-y-4">
                  {decade.events.map((event, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-16 shrink-0 pt-0.5">
                        <span className={`font-bold text-sm ${decade.color === 'blue' ? 'text-blue-600' : decade.color === 'gold' ? 'text-[#D4A017]' : decade.color === 'emerald' ? 'text-emerald-600' : 'text-purple-600'}`}>
                          {event.year}
                        </span>
                      </div>
                      <div className="flex-1 text-sm text-gray-600 leading-snug pt-0.5">
                        {event.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PTVA Institutions Section */}
        <div className="bg-[#123B6D] rounded-3xl border border-[#123B6D] shadow-lg p-6 md:p-12 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5">
            <Building2 size={300} />
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-sm font-semibold tracking-wider mb-3">PTVA FAMILY</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[var(--font-heading)]">Institutions Run by Parle Tilak Vidyalaya Association</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Marathi Medium */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <BookOpen size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Marathi Medium</h3>
                </div>
                <ul className="space-y-4">
                  {institutions.marathi.map((inst, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                      <CheckCircle2 size={18} className="text-[#D4A017] shrink-0 mt-0.5" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* English Medium */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <GraduationCap size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">English Medium</h3>
                </div>
                <ul className="space-y-4">
                  {institutions.english.map((inst, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                      <CheckCircle2 size={18} className="text-[#D4A017] shrink-0 mt-0.5" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
