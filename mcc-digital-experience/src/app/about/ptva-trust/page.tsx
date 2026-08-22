import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PTVA Trust | MCC Digital Experience Platform',
  description: 'About Parle Tilak Vidyalaya Association (PTVA) Trust and its legacy of education.',
};

export default function PTVATrustPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#123B6D] font-[var(--font-heading)] italic border-l-4 border-[#D4A017] pl-6 leading-relaxed inline-block">
            Parle Tilak Vidyalaya Association
          </h2>
        </div>

        <div className="text-gray-700 leading-relaxed text-[17px] space-y-6">
          <img 
            src="/ptvatrust.jpg" 
            alt="Parle Tilak Vidyalaya Association" 
            className="w-full sm:w-1/2 md:w-[400px] h-auto object-contain rounded-xl shadow-md border border-gray-200 float-left mr-8 mb-4 mt-2"
          />

          <p className="font-medium text-[#123B6D]">
            A value based premier educational Institution In Mumbai with focus on character building.
          </p>

          <p>
            A learned scholar, a great mathematician, philosopher, teacher and orator, Lokmanya Bal Gangadhar Tilak left for his heavenly abode on 1st August 1920.
          </p>

          <p>
            A group of eminent personalities and other residents of Parle made a commitment that they would continue the great work of Lokmanya Tilak. As the first step in this direction, they decided to start a school in Vile Parle. Thus on 9th June 1921, Parle Tilak Vidyalaya Association's Marathi Medium School began in one room with just 7 students.
          </p>

          <p>
            Eventually, Parle Tilak Vidyalaya (Marathi Medium) Primary and Secondary School was started in 1923. The local stalwarts from Vile Parle contributed generously, despite difficult times to construct the school buildings. The Students strength increased and the management soon realized the need for facilities for higher education beyond school level. This led to the establishment of Parle College of Science and Arts in 1959.
          </p>

          <p>
            The management soon felt that a Science and Arts College was not enough. In order to meet the growing demand for Commerce, the Parle College of Commerce was started in 1960 which was later named "M.L.Dahanukar College of Commerce". The Parle Tilak Vidyalaya Association also made its presence felt in the central suburbs when it started "Mulund College of Commerce" in 1970. Also in 1970, in a nearby suburb Andheri. Parle Tilak Vidyalaya Association opened another Marathi Medium school, named as "Paranjape Vidyalaya" both Primary and Secondary School. Very soon, that school also became a force to reckon with students featuring regularly in the merit lists.
          </p>

          <p>
            In 1982, the Parle Tilak Vidyalaya Association took two very important steps. Firstly, it introduced a much needed commerce faculty in Parle College and Secondly established Parle Tilak Vidyalaya (English medium) Primary and Secondary School (SSC curriculam).
          </p>

          <p>
            To cater to ever growing demand for English Medium School, PTVA's English Medium School was started in 2017 in Andheri in its Marathi Medium school.
          </p>

          <p>
            Parle College was renamed "Sathaye College" in 1994.
          </p>

          <p>
            In 2008 new I.C.S.E.School was started in the English Medidum School building Now the school has been relocated in a Separate Building. The first batch of 10th Passed in the year 2014-2015.
          </p>

          <p>
            The Parle Tilak Vidyalaya Association also started a Management Institute known as PTVA's Institute of Management in 2008 which is affiliated to Mumbai University. This Institute offers 2 year Degree course MMS and also conducts 3 year part time courses in Masters in Finance, Marketing and HR.
          </p>

          <p>
            The Association also runs a Sports academy for the benefit of their students.currently it concentrates on Cricket and conducts coaching for School Children. As a result of professional coaching our schools have done very well in Haris and Guiles Shield tournaments.
          </p>

          <p className="font-semibold text-[#123B6D] pb-8 clear-both">
            At present Parle Tilak Vidyalaya Association under its umbrella is imparting quality education to nearly 26,000 students through different institutions from Primary to Post Graduate degree courses.
          </p>
        </div>
      </div>
    </div>
  );
}
