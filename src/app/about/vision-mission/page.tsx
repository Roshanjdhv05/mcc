import { Target, Eye, Navigation } from 'lucide-react';

export const metadata = {
  title: 'Vision & Mission | MCC Digital Experience Platform',
  description: 'Learn about the vision, mission, and objectives of Mulund College of Commerce.',
};

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

export default function VisionMissionPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Page Header */}
      <div className="bg-[#123B6D] pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">Vision & Mission</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">Guiding principles and objectives that drive excellence at Mulund College of Commerce.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-16 relative z-20 pb-20 space-y-8">
        
        {/* Box 1: Vision & Mission */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Vision Section */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#123B6D]/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="text-[#123B6D]" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Our Vision</h2>
              </div>
              <div className="space-y-4 text-[#64748B] text-[16px]">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] flex items-center justify-center mt-0.5 text-sm font-bold">✓</span>
                  <span>To educate youth to serve the nation with excellence and dedication.</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#123B6D]/10 text-[#123B6D] flex items-center justify-center mt-0.5 text-sm font-bold">✓</span>
                  <span>To lead to the social, cultural & economic development of India.</span>
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#D4A017]/10 flex items-center justify-center flex-shrink-0">
                  <Navigation className="text-[#D4A017]" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">Our Mission</h2>
              </div>
              <div className="space-y-4 text-[#64748B] text-[16px]">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4A017]/10 text-[#D4A017] flex items-center justify-center mt-0.5 text-sm font-bold">1</span>
                  <span>To conduct the activities of the College with strict discipline for intellectual and physical training.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4A017]/10 text-[#D4A017] flex items-center justify-center mt-0.5 text-sm font-bold">2</span>
                  <span>To impart sound, practical education in Commerce, Science, Law, and IT.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4A017]/10 text-[#D4A017] flex items-center justify-center mt-0.5 text-sm font-bold">3</span>
                  <span>To meet the challenges of a globalized world by introducing specialized professional training.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Box 2: Objectives */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 md:p-12 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-[#00405b]/10 flex items-center justify-center flex-shrink-0">
              <Target className="text-[#00405b]" size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] font-[var(--font-heading)]">Our Objectives</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-[#64748B] text-[16px]">
            {/* Left Column (4 points) */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#123B6D] text-white flex items-center justify-center mt-0.5 text-xs font-bold">1</span>
                <span>To cultivate such qualities in the younger generation which will help them to be responsible members of the society in their adult life.</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#123B6D] text-white flex items-center justify-center mt-0.5 text-xs font-bold">2</span>
                <span>To impart higher education in Commerce in response to the rising demand of industries and organizations.</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#123B6D] text-white flex items-center justify-center mt-0.5 text-xs font-bold">3</span>
                <span>To reach great heights in the academic world and to achieve all round progress of the college with a view to develop Mulund College of Commerce as a first-rate institution.</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#123B6D] text-white flex items-center justify-center mt-0.5 text-xs font-bold">4</span>
                <span>To provide opportunities to teachers to enrich themselves professionally.</span>
              </div>
            </div>

            {/* Right Column (3 points) */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#123B6D] text-white flex items-center justify-center mt-0.5 text-xs font-bold">5</span>
                <span>To develop relationships between the college and the community around the college.</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#123B6D] text-white flex items-center justify-center mt-0.5 text-xs font-bold">6</span>
                <span>To initiate schemes to provide learning environment to the students and to achieve social welfare with the cooperation of social and cultural organizations.</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#123B6D] text-white flex items-center justify-center mt-0.5 text-xs font-bold">7</span>
                <span>To ceaselessly pursue excellence by acquiring new dimensions of education, working for the welfare of the students and the society, providing adequate and modern infrastructural facilities, and promoting sports.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-8 text-center pt-8">Our Milestones</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-[#E2E8F0] hidden md:block" />
            <div className="space-y-6 md:space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex gap-6 md:gap-0 md:items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 inline-block text-left md:text-inherit">
                      <div className="text-[#D4A017] font-bold text-lg font-[var(--font-heading)]">{m.year}</div>
                      <div className="font-bold text-[#1E293B] font-[var(--font-heading)]">{m.title}</div>
                      <div className="text-sm text-[#64748B]">{m.desc}</div>
                    </div>
                  </div>
                  <div className="hidden md:flex w-6 h-6 rounded-full bg-[#123B6D] border-4 border-white shadow z-10 flex-shrink-0" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
