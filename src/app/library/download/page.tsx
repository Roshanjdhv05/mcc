'use client';
import { useState, useEffect } from 'react';
import { FileText, BookOpen, Database, FolderOpen, ExternalLink } from 'lucide-react';
import LibraryNav from '@/components/library/LibraryNav';

const downloadLinks = [
  {
    title: 'Old Question Paper',
    description: 'Access previous years\' university question papers for reference and exam preparation.',
    href: 'https://drive.google.com/drive/u/4/folders/1A3Rc1j3nozvIp5EzKzcC_xiRqkWBMdrB',
    icon: <FileText size={40} className="text-[#008e59] group-hover:text-white transition-colors" />
  },
  {
    title: 'College Magazine ‘Vision’',
    description: 'Digitized copies of the Mulund College of Commerce annual magazine covering the last 55 years.',
    href: 'https://drive.google.com/drive/folders/15q6lsDIdoitN6yP_S0B5GDbDK_kCtRWH',
    icon: <BookOpen size={40} className="text-[#008e59] group-hover:text-white transition-colors" />
  },
  {
    title: 'Various Forms',
    description: 'Download essential library forms, application formats, and other relevant documents.',
    href: 'https://drive.google.com/drive/folders/1bkvFwoM_NakdsPUnaABo8qvpZIxkpM21',
    icon: <FolderOpen size={40} className="text-[#008e59] group-hover:text-white transition-colors" />
  },
  {
    title: 'I.R. (Institutional Repository)',
    description: 'Access audio and video lectures delivered by faculty members and other institutional resources.',
    href: 'https://drive.google.com/drive/folders/1bes4sOXN9ePGCVSgdTQ2ZtPg-pYQWyju',
    icon: <Database size={40} className="text-[#008e59] group-hover:text-white transition-colors" />
  }
];

export default function LibraryDownloadPage() {
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setNavVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12 font-sans">
      <LibraryNav />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 mt-12">
        <h1 className="text-3xl font-bold text-[#123B6D] mb-8 text-center pb-4 border-b-2 border-gray-200">
          LIBRARY DOWNLOADS
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {downloadLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 p-4 bg-green-50 rounded-full group-hover:bg-[#014d4e] group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#123B6D] mb-3 group-hover:text-[#008e59] transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                {item.description}
              </p>
              <span className="inline-flex items-center gap-2 text-[#008e59] font-bold text-sm">
                Access Resource <ExternalLink size={16} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
