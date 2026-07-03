import Image from 'next/image';

export default function PrincipalPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] font-[var(--font-heading)] italic border-l-4 border-[#D4A017] pl-6 leading-relaxed inline-block">
            “Welcome to Mulund College of Commerce – Empowering Minds & Shaping Futures”
          </h2>
        </div>

        <div className="text-gray-700 leading-relaxed text-[17px] space-y-6">
          <img 
            src="/Dr. Minal Mapuskar (Principal).jpeg" 
            alt="Dr. Minal Mapuskar - Principal of Mulund College of Commerce" 
            className="w-full sm:w-1/2 md:w-[400px] h-auto object-contain rounded-xl shadow-md border border-gray-200 float-left mr-8 mb-4 mt-2"
          />

          <p>
            We believe education is the most powerful tool for transformation. Our mission is to nurture not just brilliant students, but brilliant human beings, fostering critical thinking, creativity, and character. At Mulund College, where we blend academic rigor with compassion to prepare the student for the challenges of tomorrow.
          </p>

          <p>
            We provide a platform that empowers young minds to discover their dormant talents and achieve all-around excellence. Through dedicated mentoring, state-of-the-art facilities, and a supportive environment, we shape responsible citizens ready to lead.
          </p>

          <p>
            Our aim is to foster a culture of integrity, discipline, and passion for learning. Whether in academics, sports, or arts, we strive to ignite the fire within every student to excel.
          </p>

          <p>
            Mulund College of Commerce - a place where ambition meets opportunity. Our mission is to foster an academic environment that empowers students to achieve their full potential—academically, socially, and emotionally. We believe in a holistic approach, combining rigorous education with character building to prepare students for the complexities of a changing world.
          </p>

          <p>
            Our dedicated faculty are mentors who ignite curiosity and foster critical thinking. Together, let us cultivate knowledge, discipline, and a passion for excellence.
          </p>

          <p>
            Education is not just about acquiring knowledge but about leading a purposeful life. Here, At Mulund College of Commerce, we strive to ignite curiosity and build a community where every student thrives. My goal is to ensure this institution remains a beacon of learning, creativity, and integrity. Let’s embark on this journey of discovery together.
          </p>

          <div className="pt-8 mt-8 border-t border-gray-200 clear-both">
            <p className="font-semibold text-gray-900">Warm regards,</p>
            <p className="font-bold text-[#123B6D] text-xl mt-2">Dr. Minal Mapuskar</p>
            <p className="text-gray-600">Principal</p>
            <p className="text-gray-600">Mulund College of Commerce</p>
          </div>
        </div>
      </div>
    </div>
  );
}
