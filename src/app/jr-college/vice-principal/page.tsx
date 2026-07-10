import React from 'react';

export default function VicePrincipalDeskPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] font-[var(--font-heading)] italic border-l-4 border-[#D4A017] pl-6 leading-relaxed inline-block">
            THE JUNIOR COLLEGE VICE PRINCIPAL'S DESK
          </h2>
        </div>

        <div className="text-gray-700 leading-relaxed text-[17px] space-y-6 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
          <p>
            Our college continues to uphold its unwavering commitment to academics. This year, students achieved impressive results, surpassing new benchmarks in board exam performance. The dedication of our teaching faculty, combined with the resilience of our students, has fostered a learning environment that balances intellectual growth with practical application. Beyond the regular curriculum, specialized workshops and guest lectures have kept students ahead of the curve, with many securing top positions in prestigious competitions and earning internships and placements in renowned organizations.
          </p>

          <p>
            The college campus thrived with cultural energy as students enthusiastically participated in dance, drama, music, art, and literary activities. The Annual Cultural Festival served as a celebrated platform for showcasing creativity, fostering teamwork, cultural exchange, and a sense of belongingness. Students also represented the college at inter-collegiate and national-level competitions, earning well-deserved accolades. A standout highlight was Tarang Fest 2025, organized entirely by Junior College students, celebrating Marathi culture and heritage under the theme "Swarajya" - dedicated to Chhatrapati Shivaji Maharaj and Bal Gangadhar Tilak.
          </p>

          <p>
            Our college has built a strong reputation for nurturing athletic talent alongside academic excellence. Students excelled across diverse disciplines - including swimming, table tennis, aerial silk, karate, carrom, football, athletics, Khelo India Beach Games, and badminton. The sportsmanship, discipline, and determination displayed by our athletes remain a true testament to the college's commitment to holistic development.
          </p>

          <p>
            This year Junior College was awarded the prestigious A+ Grade by MSCERT under the School Quality Assessment and Assurance Framework (SQAAF). Beyond academics, culture, and sports, we launched meaningful initiatives on mental well-being, career counselling, and social outreach, fostering responsibility and social awareness among students. Our core mission remains steadfast to nurture well-rounded individuals who excel academically, contribute meaningfully to society, and thrive confidently in any field they choose.
          </p>

          <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <p className="font-semibold text-gray-900 mb-1">Thank you</p>
              <p className="font-bold text-[#123B6D] text-xl mt-2">Mr. M. W. Patil</p>
              <p className="text-gray-600 font-medium">Vice-Principal (Junior College)</p>
              <p className="text-gray-500 text-sm">Mulund College of Commerce</p>
            </div>
            
            <div className="bg-[#f0fdf4] border border-green-100 rounded-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl">
                A+
              </div>
              <div>
                <p className="text-xs font-bold text-green-800">MSCERT SQAAF Grade</p>
                <p className="text-[10px] text-green-700">Awarded to Junior College</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
