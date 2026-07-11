import Image from 'next/image';

export default function VicePrincipalPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] font-[var(--font-heading)] border-l-4 border-[#D4A017] pl-6 leading-relaxed inline-block">
            Vice Principal's Desk
          </h2>
        </div>

        <div className="text-gray-700 leading-relaxed text-[17px] space-y-6">
          <p>
            I feel happy to welcome you to PTVA's Mulund College of Commerce (Autonomous). It is indeed my privilege to work in the position of Vice- Principal, with the dedicated and innovative team that aspires for the highest quality of education for the students.
          </p>

          <p>
            At our college, we focus not just on academic, physical, and mental development but also emotional, social, and cultural values. As envisioned in National Education Policy 2020, which aspires for an inclusive, high-quality education system imbued with Indian culture. We help develop our students to become responsible citizens who will go a long way in the nation’s advancement towards the goal of Viksit Bharat. In alignment with NEP 2020, and guided by the vision of our Management PTVA & Ex-Principal, Dr. Sonali Pednekar, we have successfully implemented its framework, with our first batch of NEP Curriculum proudly graduating in the year 2025–26.
          </p>

          <p>
            Our students are actively taught to uphold values of honesty, loyalty, respect, patriotism, and compassion, all directed towards a larger national goal. With thorough dedication, our management and staff work earnestly to shape students into positive and responsible human beings morally upright, academically enriched, thoughtful, and kind. The collective support and cooperation of teachers, parents, and the entire college community creates a thriving environment where every student flourishes. As Vice- Principal, I stand committed to working alongside each one of you in this shared mission.
          </p>

          <p>
            I encourage everyone to visit our college website to explore the various programs, events, and opportunities available. For any queries or assistance, our administration team is always ready to help. With over 27 years of teaching experience, Education has been a deeply fulfilling journey for me and I look forward to channelize this experience towards the growth and success of every student.
          </p>

          <div className="pt-8 mt-8 border-t border-gray-200 clear-both">
            <p className="font-bold text-[#123B6D] text-xl mt-2">Dr. Shivaji Pawar</p>
            <p className="text-gray-600">Vice - Principal</p>
            <p className="text-gray-600">Mulund College of Commerce</p>
          </div>
        </div>
      </div>
    </div>
  );
}
