import { Target, Eye, Navigation } from 'lucide-react';

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



      </div>
    </div>
  );
}
