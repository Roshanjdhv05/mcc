import Image from 'next/image';

export const metadata = {
  title: "Vice-Principal's Desk | Mulund College of Commerce",
  description: "Message from the Vice-Principals of Mulund College of Commerce.",
};

export default function VicePrincipalPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Page Title */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] font-[var(--font-heading)] border-l-4 border-[#D4A017] pl-6 leading-relaxed inline-block">
            VICE-PRINCIPAL'S DESK
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── Aided Section (Dr. Shivaji Pawar) ── */}
          <div className="text-gray-700 leading-relaxed text-[13.5px] xl:text-sm space-y-4 text-justify">
            
            {/* Image Placeholder - Aided */}
            <div className="w-[140px] xl:w-[180px] h-[180px] xl:h-[220px] bg-gray-200 rounded-xl shadow-md border border-gray-200 float-left mr-5 mb-3 mt-1 flex flex-col items-center justify-center text-gray-500 overflow-hidden relative">
              <span className="text-3xl mb-1">📷</span>
              <span className="text-[10px] font-semibold">Photo</span>
              <div className="absolute bottom-0 w-full flex flex-col">
                <div className="bg-white text-gray-800 text-[10px] font-bold text-center py-1 truncate px-1">
                  Dr. Shivaji Pawar
                </div>
                <div className="bg-[#123B6D] text-white text-[10px] font-bold text-center py-1 tracking-widest uppercase">
                  Aided
                </div>
              </div>
            </div>

            <p>
              I feel happy to welcome you to PTVA's Mulund College of Commerce (Autonomous). It is indeed my privilege to work in the position of Vice-Principal, with the dedicated and innovative team that aspires for the highest quality of education for the students.
            </p>

            <p>
              At our college, we focus not just on academic, physical, and mental development but also emotional, social, and cultural values. As envisioned in National Education Policy 2020, which aspires for an inclusive, high-quality education system imbued with Indian culture. We help develop our students to become responsible citizens who will go a long way in the nation's advancement towards the goal of Viksit Bharat. In alignment with NEP 2020, and guided by the vision of our Management PTVA & Ex-Principal, Dr. Sonali Pednekar, we have successfully implemented its framework, with our first batch of NEP Curriculum proudly graduating in the year 2025–26.
            </p>

            <p>
              Our students are actively taught to uphold values of honesty, loyalty, respect, patriotism, and compassion, all directed towards a larger national goal. With thorough dedication, our management and staff work earnestly to shape students into positive and responsible human beings morally upright, academically enriched, thoughtful, and kind. The collective support and cooperation of teachers, parents, and the entire college community creates a thriving environment where every student flourishes. As Vice-Principal, I stand committed to working alongside each one of you in this shared mission.
            </p>

            <p>
              I encourage everyone to visit our college website to explore the various programs, events, and opportunities available. For any queries or assistance, our administration team is always ready to help. With over 27 years of teaching experience, Education has been a deeply fulfilling journey for me and I look forward to channelize this experience towards the growth and success of every student.
            </p>

            <div className="pt-6 mt-6 border-t border-gray-200 clear-both">
              <p className="font-semibold text-gray-900 mb-1">With warm regards,</p>
              <p className="font-bold text-[#123B6D] text-lg">Dr. Shivaji Pawar</p>
              <p className="text-gray-600 font-medium text-sm">Vice-Principal <span className="text-[11px] font-normal bg-gray-100 text-gray-600 px-2 py-0.5 rounded ml-2">Aided</span></p>
              <p className="text-gray-500 text-xs mt-0.5">Mulund College of Commerce</p>
            </div>
          </div>

          {/* ── Self Financing Section (Ms. Shilpa Thakur) ── */}
          <div className="text-gray-700 leading-relaxed text-[13.5px] xl:text-sm space-y-4 text-justify">
            
            {/* Image - Self Financing */}
            <div className="w-[140px] xl:w-[180px] rounded-xl shadow-md border border-gray-200 float-left mr-5 mb-3 mt-1 overflow-hidden relative bg-white pb-10">
              <img 
                src="/Ms.ShilpaThakur.png" 
                alt="Ms. Shilpa Thakur" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 w-full flex flex-col">
                <div className="bg-white text-gray-800 text-[10px] font-bold text-center py-1 truncate px-1 border-t border-gray-100">
                  Ms. Shilpa Thakur
                </div>
                <div className="bg-[#7C3AED] text-white text-[10px] font-bold text-center py-1 tracking-widest uppercase">
                  Self Financing
                </div>
              </div>
            </div>

            <p>
              It is both an honour and a privilege to serve this esteemed institution, which has been synonymous with quality education and academic excellence for over five decades. Having been associated with the college for close to thirty years, I have had the opportunity to witness its remarkable journey of growth, innovation, and transformation from soon after the silver jubilee to the golden jubilee and beyond.
            </p>

            <p>
              The Self Financing Section reflects our commitment to providing industry-relevant, future-ready education while preserving the core values of integrity, inclusivity, and academic rigour. Our objective is to equip students not only with knowledge and professional skills but also with the confidence, character, and adaptability required to thrive in an ever-evolving global environment.
            </p>

            <p>
              At Mulund College of Commerce, learning extends beyond the classroom. We encourage our students to think critically, embrace technology, participate in research, engage with industry, and contribute meaningfully to society. Through a learner-centric approach, experienced faculty, modern infrastructure, and diverse opportunities for academic and personal growth, we strive to create an environment where every student can discover and realise their potential.
            </p>

            <p>
              As educators, we believe that education is a transformative journey. It empowers individuals to become responsible professionals, compassionate leaders, and informed citizens. Our endeavour is to nurture not only successful careers but also values that inspire lifelong learning and social responsibility.
            </p>

            <p>
              I encourage every student to make the most of the opportunities that the college offers, remain curious, face challenges with confidence, and pursue excellence in every endeavour. Success is built on dedication, discipline, and a willingness to learn continuously.
            </p>

            <p>
              I invite you to explore our institution and become a part of a vibrant academic community that is committed to shaping capable professionals and responsible citizens for the future.
            </p>

            <div className="pt-6 mt-6 border-t border-gray-200 clear-both">
              <p className="font-semibold text-gray-900 mb-1">With best wishes,</p>
              <p className="font-bold text-[#123B6D] text-lg">Ms. Shilpa Thakur</p>
              <p className="text-gray-600 font-medium text-sm">Vice-Principal <span className="text-[11px] font-normal bg-purple-100 text-purple-700 px-2 py-0.5 rounded ml-2">Self Financing</span></p>
              <p className="text-gray-500 text-xs mt-0.5">Mulund College of Commerce</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
