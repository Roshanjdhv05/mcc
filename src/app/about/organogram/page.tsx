import Image from 'next/image';
import { Shield, Users, User, Building, Landmark, BookOpen, GraduationCap, Users2, Briefcase, FileCheck, CircleDollarSign, Shapes, ChevronDown, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Organogram | MCC Digital Experience Platform',
  description: 'Organizational structure and governance of Mulund College of Commerce.',
};

const GovPill = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm px-4 md:px-5 py-3 rounded-xl w-full md:w-auto">
    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
      <Icon size={16} />
    </div>
    <span className="font-bold text-gray-700 text-[13px] md:text-sm whitespace-nowrap">{title}</span>
  </div>
);

const AdvisoryPill = ({ title, icon: Icon, color }: { title: string, icon: any, color: 'purple' | 'gold' | 'green' }) => {
  const colors = {
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    gold: "bg-yellow-50 text-yellow-700 border-yellow-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200"
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold shadow-sm transition-transform hover:-translate-y-1 cursor-default ${colors[color]}`}>
      <Icon size={16} />
      <span>{title}</span>
    </div>
  );
};

const TimelineNode = ({ title, type = 'solid', color = 'blue' }: { title: string, type?: 'solid'|'dashed', color?: 'blue'|'green' }) => {
  const isBlue = color === 'blue';
  return (
    <div className="relative">
      <div className={`absolute -left-[25px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 rounded-full ${type === 'dashed' ? 'border-dashed' : ''} ${isBlue ? 'border-blue-500' : 'border-emerald-500'}`}></div>
      <div className={`bg-white p-4 rounded-xl border shadow-sm font-bold text-[14px] md:text-base transition-shadow hover:shadow-md ${type === 'dashed' ? 'border-dashed text-gray-500 border-gray-300' : (isBlue ? 'border-blue-100 text-gray-700' : 'border-emerald-100 text-gray-700')}`}>
        {title}
      </div>
    </div>
  );
};

export default function OrganogramPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-[#123B6D] pt-12 pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-4">Organizational Structure</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">A clear view of the governance and administrative hierarchy driving Mulund College of Commerce.</p>
        </div>
      </div>

      {/* Organogram Container */}
      <div className="max-w-5xl mx-auto px-4 md:px-12 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 md:p-12">
          
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wider mb-3">ORGANOGRAM</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] font-[var(--font-heading)]">How We Operate</h2>
          </div>

          <div className="flex flex-col items-center">
            
            {/* Governance Pathway (Horizontal on Desktop, Vertical on Mobile) */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 w-full">
              <GovPill title="PTVA BOARD" icon={Landmark} />
              <ArrowRight className="hidden md:block text-gray-300 shrink-0" />
              <ChevronDown className="md:hidden text-gray-300 shrink-0" />
              
              <GovPill title="STANDING COMMITTEE" icon={Users} />
              <ArrowRight className="hidden md:block text-gray-300 shrink-0" />
              <ChevronDown className="md:hidden text-gray-300 shrink-0" />
              
              <GovPill title="GOVERNING BODY" icon={Shield} />
            </div>

            {/* Principal Node */}
            <div className="flex flex-col items-center mt-6 md:mt-10 mb-10 w-full">
               <div className="w-0.5 h-10 bg-gray-300 mb-6"></div>
               
               <div className="bg-[#123B6D] text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl shadow-lg border-2 border-[#D4A017] flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <User className="text-[#D4A017]" size={20} />
                  </div>
                  <h3 className="font-bold text-lg md:text-xl tracking-wide">PRINCIPAL</h3>
               </div>
               
               <div className="w-0.5 h-10 bg-gray-300 mt-6 relative z-0"></div>
               
               {/* Advisory row */}
               <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full max-w-3xl border-t-2 border-gray-300 pt-8 mt-[-2px] relative z-0">
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 border-gray-300"></div>
                 <AdvisoryPill title="IQAC" icon={FileCheck} color="purple" />
                 <AdvisoryPill title="VICE PRINCIPAL" icon={User} color="gold" />
                 <AdvisoryPill title="CDC" icon={Building} color="purple" />
                 <AdvisoryPill title="FINANCE" icon={CircleDollarSign} color="green" />
               </div>
            </div>

            {/* Operational Wings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-6">
               
               {/* Academic Wing */}
               <div className="bg-blue-50/40 rounded-3xl p-6 md:p-8 border border-blue-100">
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-blue-200">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <BookOpen size={20} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#123B6D]">Academic Wing</h3>
                  </div>
                  
                  <div className="space-y-5 pl-4 border-l-2 border-blue-200 relative ml-3">
                    <TimelineNode title="Academic Council" color="blue" />
                    <TimelineNode title="Head of Departments" color="blue" />
                    <TimelineNode title="Activity Groups" color="blue" type="dashed" />
                  </div>
               </div>
               
               {/* Administrative Wing */}
               <div className="bg-emerald-50/40 rounded-3xl p-6 md:p-8 border border-emerald-100">
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-emerald-200">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Briefcase size={20} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-emerald-900">Administrative Wing</h3>
                  </div>
                  
                  <div className="space-y-5 pl-4 border-l-2 border-emerald-200 relative ml-3">
                    <TimelineNode title="Administrative Staff" color="green" />
                    <TimelineNode title="Support Staff" color="green" />
                  </div>
               </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
