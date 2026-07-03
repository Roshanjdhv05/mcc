import Image from 'next/image';
import Counter from '@/components/ui/Counter';
import { Target, Eye, Navigation, Users, BookOpen, Briefcase } from 'lucide-react';

export const metadata = {
  title: 'Vision & Mission | MCC Digital Experience Platform',
  description: 'Learn about the vision, mission, and objectives of Mulund College of Commerce.',
};

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

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-16 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content (Vision, Mission, Objectives) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vision */}
              <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Eye size={120} />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#123B6D]/10 flex items-center justify-center mb-6">
                  <Eye className="text-[#123B6D]" size={28} />
                </div>
                <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-4">Our Vision</h2>
                <p className="text-[#64748B] leading-relaxed text-[17px] mb-6">
                  To educate youth to serve the nation with excellence and dedication leading to social, cultural & economic development of India.
                </p>
                <div className="relative w-full h-40 rounded-xl overflow-hidden mt-auto">
                  <Image 
                    src="/vision_card_img.png" 
                    alt="Vision concept" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Navigation size={120} />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#D4A017]/10 flex items-center justify-center mb-6">
                  <Navigation className="text-[#D4A017]" size={28} />
                </div>
                <h2 className="text-2xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-4">Our Mission</h2>
                <div className="text-[#64748B] leading-relaxed text-[15px] space-y-3">
                  <p>
                    To conduct the activities of the College with strict discipline for attaining the goals of intellectual and physical training for moral development and character building of the College.
                  </p>
                  <p>
                    To impart sound, practical and rational education in Commerce, Economics, Business Management, Science, Law, Information Technology, Computer Science and such allied subjects.
                  </p>
                  <p>
                    To plan and work to meet the perennially changing and growing challenges of a globalized world by introducing specialized training leading to professional capabilities and developing in students&apos; different skills for competitive advantage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Image & Stats) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Image Placeholder */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden h-72 relative">
              <Image 
                src="/college_campus_hero.png" 
                alt="Mulund College of Commerce Campus" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <p className="font-bold font-[var(--font-heading)] text-lg">MCC Campus</p>
                  <p className="text-sm opacity-90">A hub of excellence</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-[#123B6D] rounded-3xl shadow-sm p-8 text-white">
              <h3 className="font-bold text-xl font-[var(--font-heading)] mb-6 text-white/90 border-b border-white/10 pb-4">MCC at a Glance</h3>
              <div className="space-y-6">
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#D4A017]">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/70 font-medium">Qualified Teachers</p>
                    <p className="text-2xl font-bold font-[var(--font-heading)]"><Counter target={51} /></p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#D4A017]">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/70 font-medium">Students</p>
                    <p className="text-2xl font-bold font-[var(--font-heading)]"><Counter target={6306} /></p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#D4A017]">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/70 font-medium">Programs</p>
                    <p className="text-2xl font-bold font-[var(--font-heading)]"><Counter target={18} /></p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Objectives (Full Row layout) */}
        <div className="mt-16 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 md:p-12 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-10 justify-center">
            <div className="w-14 h-14 rounded-2xl bg-[#00405b]/10 flex items-center justify-center flex-shrink-0">
              <Target className="text-[#00405b]" size={28} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#123B6D] font-[var(--font-heading)]">Our Objectives</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center text-[#64748B] text-[16px] lg:text-[17px]">
            {/* Left Column (3 points) */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">✓</span>
                <span>To cultivate such qualities in the younger generation which will help them to be responsible members of the society in their adult life.</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">✓</span>
                <span>To impart higher education in Commerce in response to the rising demand of industries and organizations.</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">✓</span>
                <span>To impart higher education in Commerce in response to the rising demand of industries and organizations.</span>
              </div>
            </div>

            {/* Center Column (Square Image) */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-[380px] aspect-square rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <Image 
                  src="/objectives_side_img.png" 
                  alt="Students collaborating" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column (3 points) */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">✓</span>
                <span>To reach great heights in the academic world and to achieve all round progress of the college with a view to develop Mulund College of Commerce as a first-rate institution.</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">✓</span>
                <span>To provide opportunities to teachers to enrich themselves professionally.</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">✓</span>
                <span>To develop relationships between the college and the community around the college and to initiate schemes to provide learning environment to the students and to achieve social welfare with the cooperation of social and cultural organizations.</span>
              </div>
            </div>
          </div>

          {/* Bottom Point (1 point) */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-start gap-4 max-w-5xl mx-auto text-[#64748B] text-[16px] lg:text-[17px]">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">✓</span>
              <span>To ceaselessly pursue excellence by acquiring new dimensions of education, working for the welfare of the students and the society, providing adequate and modern infrastructural facilities, promoting sports, carrying out responsibility towards weaker students and by sincerely responding to the varied demands of the academic community.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
