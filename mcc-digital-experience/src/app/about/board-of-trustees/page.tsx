import type { Metadata } from 'next';
import { Users, Landmark } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Board of Trustees | Mulund College of Commerce (AUTONOMOUS)',
  description: 'Meet the esteemed Board of Trustees of the Parle Tilak Vidyalaya Association (PTVA).',
};

const trustees = [
  { name: 'CA Anil B. Ganu', role: 'President', img: '/BOARD OF DIRECTORS/CA Anil B. Ganu (PRESIDENT).png' },
  { name: 'Mr. Vinay Jog', role: 'Vice-President', img: '/BOARD OF DIRECTORS/Mr. Vinay Jog (VICE-PRESIDENT).png' },
  { name: 'Mr. Dilip M. Pethe', role: 'Hon. Secretary', img: '/BOARD OF DIRECTORS/Mr. Dilip M. Pethe (HON. SECRETARY).png' },
  { name: 'Mr. Hemant K. Bhatawadekar', role: 'Hon. Joint Secretary', img: '/BOARD OF DIRECTORS/Mr. Hemant K. Bhatawadekar (HON. JOINT SECRETARY).png' },
  { name: 'Mr. Bansidhar Dhurandhar', role: 'Hon. Treasurer', img: '/BOARD OF DIRECTORS/Mr. Bansidhar Dhurandhar (HON. TREASURER).png' },
  { name: 'Dr. Ajit Dandekar', role: 'Director', img: '/BOARD OF DIRECTORS/Dr. Ajit Dandekar (Director).png' },
  { name: 'Mr. Dhananjay Sathaye', role: 'Director', img: '/BOARD OF DIRECTORS/Mr. Dhananjay Sathaye (Director).png' },
  { name: 'Mr. Mukund Chitale', role: 'Director', img: '/BOARD OF DIRECTORS/Mr. Mukund Chitale (Director).png' },
  { name: 'Mr. Pramod Lele', role: 'Director', img: '/BOARD OF DIRECTORS/Mr. Pramod Lele (Director).png' },
  { name: 'Mr. Shashank Paranjape', role: 'Director', img: '/BOARD OF DIRECTORS/Mr. Shashank Paranjape (Director).png' },
  { name: 'Mr. Shrikant Paranjape', role: 'Director', img: '/BOARD OF DIRECTORS/Mr. Shrikant Paranjape (Director).png' },
];

export default function BoardOfTrusteesPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header */}
      <div className="relative pt-24 pb-32 overflow-hidden bg-[#0F2040] flex flex-col items-center justify-center min-h-[350px]">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url('/banner1.png')` }}
        />
        <div className="absolute inset-0 z-0 bg-[#0F2040]/70" />

        {/* Logo Watermark */}
        <div className="absolute left-0 lg:left-10 top-1/2 -translate-y-1/2 opacity-10 z-0 pointer-events-none hidden md:block">
          <img src="/trustlogo.png" alt="" className="w-80 lg:w-96 h-auto" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-12 text-center flex flex-col items-center mt-6">
          <div className="flex items-center gap-3 text-[#D4A017] font-bold text-sm tracking-[0.25em] uppercase mb-6">
            <span>Trust</span> <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]"></span>
            <span>Leadership</span> <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]"></span>
            <span>Legacy</span>
          </div>

          <div className="flex items-center gap-6 mb-6">
             <span className="text-[#D4A017] hidden sm:block opacity-80"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m13 15 5-5-5-5"/><path d="M4 10h14"/></svg></span>
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-[var(--font-heading)]" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
               Board of Trustees
             </h1>
             <span className="text-[#D4A017] hidden sm:block opacity-80"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m11 9-5 5 5 5"/><path d="M20 14H6"/></svg></span>
          </div>
          
          <p className="text-gray-200 max-w-2xl mx-auto text-base md:text-lg mb-10 leading-relaxed font-medium">
            The visionary leaders behind Parle Tilak Vidyalaya Association,<br className="hidden md:block"/> guiding its mission of excellence in education.
          </p>

          <div className="flex items-center justify-center gap-4 mb-10 w-full max-w-xs">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-[#D4A017]"></div>
            <div className="w-2.5 h-2.5 rotate-45 bg-[#D4A017]"></div>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-[#D4A017]"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
            <button className="bg-[#D4A017] hover:bg-[#B8860B] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_4px_14px_rgba(212,160,23,0.4)] hover:shadow-[0_6px_20px_rgba(212,160,23,0.6)] hover:-translate-y-0.5">
              <Users size={20} />
              Explore Trustees
            </button>
            <Link href="/about/ptva-trust" className="bg-transparent hover:bg-white/10 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all border border-white/40 backdrop-blur-md hover:border-white/80">
              <Landmark size={20} />
              About PTVA Trust
            </Link>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-10 text-[#F8FAFC]">
          <svg className="relative block w-full h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" fill="currentColor" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V120H0Z" fill="currentColor" opacity=".5"></path>
            
            {/* Gold border layer */}
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V120H0Z" fill="#D4A017" transform="translate(0, -3)"></path>
            {/* Main white wave */}
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V120H0Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 relative z-20">
          
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#123B6D]">
              <Users size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] font-[var(--font-heading)]">
              Board of Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {trustees.map((person) => (
              <div key={person.name} className="flex flex-col items-center group">
                <div className="relative w-48 h-48 mb-4 overflow-hidden rounded-full border-4 border-gray-100 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-100 group-hover:shadow-lg">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#1E293B] font-[var(--font-heading)] text-center transition-colors group-hover:text-[#123B6D]">
                  {person.name}
                </h3>
                <p className="text-sm font-medium text-[#D4A017] text-center mt-1 uppercase tracking-wide">
                  {person.role}
                </p>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
