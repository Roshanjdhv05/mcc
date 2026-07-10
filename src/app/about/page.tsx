import type { Metadata } from 'next';
import { Target, BookOpen, Users, Award, Calendar, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About MCC | MCC Digital Experience Platform',
  description: 'Learn about Mulund College of Commerce — vision, mission, history, and leadership.',
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

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#123B6D] pt-10 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">About MCC</h1>
          <p className="text-white/75 text-lg max-w-2xl">
            Mulund College of Commerce (Autonomous) has been a beacon of academic excellence in Mumbai for over 60 years.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-10 pb-16 space-y-14">
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Target, title: 'Our Vision', color: 'bg-blue-50 text-[#123B6D]',
              text: 'To be a premier educational institution recognized for academic excellence, ethical values, and social responsibility, producing graduates who contribute meaningfully to society and the global economy.'
            },
            {
              icon: BookOpen, title: 'Our Mission', color: 'bg-amber-50 text-amber-700',
              text: 'To provide quality higher education through innovative teaching methods, research, and co-curricular activities that develop intellectual curiosity, critical thinking, and professional competence in students.'
            },
          ].map(({ icon: Icon, title, color, text }) => (
            <div key={title} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8">
              <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <h2 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-3">{title}</h2>
              <p className="text-[#64748B] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Principal Message */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 relative h-80 md:h-auto">
            <img src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&q=80" alt="Principal" className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center">
            <div className="text-4xl text-[#D4A017] mb-4 font-serif">"</div>
            <p className="text-[#64748B] leading-relaxed mb-6 text-lg">
              At Mulund College of Commerce, we believe education is not merely about acquiring knowledge but about transforming lives. Our autonomous status empowers us to design a curriculum that is both academically rigorous and industry-relevant, preparing students for the challenges of tomorrow.
            </p>
            <div className="border-l-4 border-[#D4A017] pl-4">
              <p className="font-bold text-[#123B6D] font-[var(--font-heading)]">Dr. Sonali Mahajan</p>
              <p className="text-sm text-[#94A3B8]">Principal, MCC (Autonomous)</p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-8 text-center">Our Milestones</h2>
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

        {/* Management */}
        <div>
          <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-6">Management & Leadership</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { name: 'Shri. R.K. Vora', role: 'President', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
              { name: 'Shri. M.D. Shah', role: 'Secretary', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
              { name: 'Dr. Sonali Mahajan', role: 'Principal', img: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&q=80' },
              { name: 'Dr. A.B. Kulkarni', role: 'Vice Principal', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80' },
            ].map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-[#E2E8F0]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-semibold text-[#1E293B] text-sm font-[var(--font-heading)]">{p.name}</p>
                <p className="text-xs text-[#94A3B8] mt-1">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
