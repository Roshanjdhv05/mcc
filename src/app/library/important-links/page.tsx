'use client';
import { useState, useEffect } from 'react';
import { University, ChevronRight, ExternalLink, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LibraryNav from '@/components/library/LibraryNav';


const sidebarLinks = [
  { id: 'useful', label: 'Useful Links' },
  { id: 'marathi', label: 'Marathi Important Links' },
  { id: 'international', label: 'National / International Links' },
  { id: 'national', label: 'National Important Links' },
];

const usefulLinks = [
  { title: 'UGC New Delhi', href: 'https://www.ugc.ac.in/' },
  { title: 'University of Mumbai', href: 'https://mu.ac.in/' },
  { title: 'Maharashtra Govt. GR', href: 'https://www.maharashtra.gov.in/1145/Government-Resolutions' },
  { title: 'Census of India', href: 'http://www.censusindia.gov.in/' },
  { title: 'The Institute of Chartered Accountants of India (ICAI)', href: 'https://www.icai.org/indexbkp.html' },
  { title: 'The Institute of Company Secretaries of India (ICSI)', href: 'https://www.icsi.edu/home/' },
  { title: 'Junior College e-Text Books', href: 'https://books.ebalbharati.in/' },
];

const marathiLinks = [
  { title: 'मराठी विश्वकोश', href: 'https://marathivishwakosh.org/' },
  { title: 'भाषा संचालनालय, महाराष्ट्र राज्य, मुंबई', href: 'https://directorate.marathi.gov.in/' },
  { title: 'मराठी भाषा विभाग, महाराष्ट्र शासन', href: 'https://shabdakosh.marathi.gov.in/' },
  { title: 'संत साहित्य', href: 'https://www.santsahitya.in/' },
  { title: 'राज्य मराठी विकास संस्था – प्रकाशने (E-Books)', href: 'https://rmvs.marathi.gov.in/category/publications' },
  { title: 'ई साहित्य प्रतिष्ठान', href: 'http://www.esahity.com/' },
  { title: 'महाराष्ट्र राज्य साहित्य आणि संस्कृती मंडळ – मराठी E-Books', href: 'https://sahitya.marathi.gov.in/' },
  { title: 'राज्य मराठी विकास संस्था – श्राव्य पुस्तके', href: 'https://rmvs.marathi.gov.in/category/audio-books' },
  { title: 'ई-पुस्तकालय', href: 'https://epustakalay.com/' },
  { title: 'राज्य मराठी विकास संस्था – दृक्श्राव्य प्रकाशने', href: 'https://rmvs.marathi.gov.in/category/video-books' },
  { title: 'राज्य मराठी विकास संस्था – दुर्मिळ ग्रंथ (E-Books)', href: 'https://rmvs.marathi.gov.in/books' },
];

const internationalLinks = [
  { title: 'WORLD BANK', href: 'https://www.worldbank.org/' },
  { title: 'INTERNATIONAL MONETARY FUND', href: 'https://www.imf.org/' },
  { title: 'DATA.OECD', href: 'https://data.oecd.org/' },
  { title: 'UNITED NATION DEVELOPMENT PROGRAMME', href: 'https://www.undp.org/' },
  { title: 'UNITED NATION ENVIRONMENT PROGRAMME', href: 'https://www.unep.org/' },
  { title: 'AUSTRALIAN DATA ARCHIVE (ADA)', href: 'https://ada.edu.au/' },
  { title: 'DATABASE ON INDIAN ECONOMICS', href: 'https://dbie.rbi.org.in/' },
  { title: 'INDIA UNION BUDGET / ECONOMIC SURVEY', href: 'https://www.indiabudget.gov.in/' },
  { title: 'GOVERNMENT OF INDIA MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION', href: 'https://mospi.gov.in/' },
  { title: 'NITI AAYOG', href: 'https://www.niti.gov.in/' },
  { title: 'NITI AAYOG: STATE STATISTICS', href: 'https://www.niti.gov.in/state-statistics' },
  { title: 'DIRECTORATE OF ECONOMICS AND STATISTICS INDIA', href: 'https://mospi.gov.in/' },
  { title: 'DIRECTORATE OF ECONOMICS AND STATISTICS MAHARASHTRA', href: 'https://mahades.maharashtra.gov.in/' },
  { title: 'INDIA GOV.IN – NATIONAL PORTAL OF INDIA', href: 'https://www.india.gov.in/' },
  { title: 'ABHILEKH PATAL (NATIONAL ARCHIVES OF INDIA)', href: 'https://www.abhilekh-patal.in/' },
  { title: 'ACADEMIA', href: 'https://www.academia.edu/' },
  { title: 'BASE – BIELEFELD ACADEMIC SEARCH ENGINE', href: 'https://www.base-search.net/' },
  { title: 'BHARATIYA KRITI SAMPADA (NATIONAL MISSION FOR MANUSCRIPTS)', href: 'https://namami.gov.in/' },
  { title: 'BOMBAY HIGH COURT JUDGES LIBRARY', href: 'https://bombayhighcourt.nic.in/' },
  { title: 'BOOKYARDS', href: 'https://www.bookyards.com/' },
  { title: 'COMMONS OPEN EDUCATIONAL RESOURCES', href: 'https://oercommons.org/' },
  { title: 'CORE', href: 'https://core.ac.uk/' },
  { title: 'COURSERA', href: 'https://www.coursera.org/' },
  { title: 'DART-EUROPE E-THESES PORTAL', href: 'https://www.dart-europe.org/' },
  { title: 'EBSCO OPEN DISSERTATIONS', href: 'https://biblioboard.com/opendissertations/' },
  { title: 'ECONOMIC SURVEY – MINISTRY OF FINANCE', href: 'https://www.indiabudget.gov.in/economicsurvey/' },
  { title: 'EDX', href: 'https://www.edx.org/' },
  { title: 'E-PATHSHALA OF NCERT', href: 'https://epathshala.nic.in/' },
  { title: 'E-PG PATHSHALA', href: 'https://epgp.inflibnet.ac.in/' },
  { title: 'ETHOS', href: 'https://ethos.bl.uk/' },
  { title: 'FOLGER SHAKESPEARE LIBRARY', href: 'https://www.folger.edu/' },
  { title: 'FREE BOOK NOTES', href: 'https://www.freebooknotes.com/' },
  { title: 'FREE LEGAL DATABASES', href: 'https://www.worldlii.org/' },
  { title: 'FREE-EBOOKS.NET', href: 'https://www.free-ebooks.net/' },
  { title: 'FREETECHBOOKS', href: 'https://www.freetechbooks.com/' },
  { title: 'FUTURELEARN', href: 'https://www.futurelearn.com/' },
  { title: 'GITA SUPERSITE', href: 'https://www.gitasupersite.iitk.ac.in/' },
  { title: 'HATHITRUST DIGITAL LIBRARY', href: 'https://www.hathitrust.org/' },
  { title: 'ILO LIBRARY – LABOUR DISCOVERY', href: 'https://www.ilo.org/library' },
  { title: 'INDIAN CULTURE', href: 'https://indianculture.gov.in/' },
  { title: 'INDIAN MANUSCRIPTS', href: 'https://namami.gov.in/' },
  { title: 'INTECHOPEN', href: 'https://www.intechopen.com/' },
  { title: 'IMF ELIBRARY', href: 'https://www.elibrary.imf.org/' },
  { title: 'IMF PUBLICATIONS', href: 'https://www.imf.org/en/Publications' },
  { title: 'JOVE ENCYCLOPEDIA OF EXPERIMENTS – BIOLOGY', href: 'https://www.jove.com/science-education' },
  { title: 'JOVE JOURNAL', href: 'https://www.jove.com/' },
  { title: 'LOYALBOOKS', href: 'https://www.loyalbooks.com/' },
  { title: 'MAHARASHTRA PUBLIC SERVICE COMMISSION', href: 'https://mpsc.gov.in/' },
  { title: 'MAHARASHTRA STATE GAZETTEERS', href: 'https://gazetteers.maharashtra.gov.in/' },
  { title: 'MANYBOOKS', href: 'https://manybooks.net/' },
  { title: 'MICROSOFT ACADEMIC (Archived)', href: 'https://academic.microsoft.com/' },
  { title: 'MPSC PREVIOUS YEAR QUESTION PAPERS', href: 'https://mpsc.gov.in/' },
  { title: 'MUKTABODHA ONLINE DIGITAL LIBRARY', href: 'https://muktalib7.org/' },
  { title: 'NCERT BOOKS', href: 'https://ncert.nic.in/textbook.php' },
  { title: 'NPTEL', href: 'https://nptel.ac.in/' },
  { title: 'OAPEN', href: 'https://www.oapen.org/' },
  { title: 'OPEN ACCESS THESES AND DISSERTATIONS', href: 'https://oatd.org/' },
  { title: 'OPEN TEXTBOOK LIBRARY', href: 'https://open.umn.edu/opentextbooks' },
  { title: 'OPENSTAX', href: 'https://openstax.org/' },
  { title: 'OPENTHESIS', href: 'http://www.openthesis.org/' },
  { title: 'LOK SABHA DIGITAL LIBRARY', href: 'https://eparlib.nic.in/' },
  { title: 'PDFDRIVE', href: 'https://www.pdfdrive.com/' },
  { title: 'PROJECT GUTENBERG', href: 'https://www.gutenberg.org/' },
  { title: 'RARE BOOK ROOM', href: 'https://www.rarebookroom.org/' },
  { title: 'RARE BOOK SOCIETY OF INDIA', href: 'https://www.rarebooksocietyofindia.org/' },
  { title: 'RESEARCHGATE', href: 'https://www.researchgate.net/' },
  { title: 'SOURCE MATERIAL FOR HISTORY OF THE FREEDOM MOVEMENT IN INDIA', href: 'https://www.nationalarchives.nic.in/' },
  { title: 'SUGAMYA PUSTAKALAY', href: 'https://sugamyapustakalaya.in/' },
  { title: 'SWAYAM', href: 'https://swayam.gov.in/' },
  { title: 'SWAYAM PRABHA', href: 'https://www.swayamprabha.gov.in/' },
  { title: 'THE ALEXANDRIA DIGITAL LIBRARY', href: 'https://www.alexandria.ucsb.edu/' },
  { title: 'THE GAZETTE OF INDIA', href: 'https://egazette.nic.in/' },
  { title: 'UDEMY', href: 'https://www.udemy.com/' },
  { title: 'UGC MOOCs', href: 'https://ugcmoocs.inflibnet.ac.in/' },
  { title: 'UK DATA SERVICE', href: 'https://ukdataservice.ac.uk/' },
  { title: 'UNACADEMY', href: 'https://unacademy.com/' },
  { title: 'UNESCO DATA CENTER', href: 'https://data.unesco.org/' },
  { title: 'UNESCO DIGITAL LIBRARY (UNESDOC)', href: 'https://unesdoc.unesco.org/' },
  { title: 'UNICEF RESEARCH AND REPORTS', href: 'https://www.unicef.org/research-and-reports' },
  { title: 'UNION PUBLIC SERVICE COMMISSION', href: 'https://upsc.gov.in/' },
  { title: 'UNITED NATIONS OFFICIAL DOCUMENTS SYSTEM (ODS)', href: 'https://documents.un.org/' },
  { title: 'UPSC PREVIOUS YEAR QUESTION PAPERS', href: 'https://upsc.gov.in/examinations/previous-question-papers' },
  { title: 'VIDYA-MITRA', href: 'https://vidyamitra.inflibnet.ac.in/' },
  { title: 'WORLD BANK OPEN DATA', href: 'https://data.worldbank.org/' },
  { title: 'WORLD DIGITAL LIBRARY (Archived)', href: 'https://www.loc.gov/collections/world-digital-library/' },
  { title: 'WTO DOCUMENTS AND RESOURCES', href: 'https://www.wto.org/' },
];

const nationalLinks = [
  { title: 'Database on Indian Economy', href: 'https://dbie.rbi.org.in/DBIE/dbie.rbi?site=home' },
  { title: 'India Union Budget / Economic Survey', href: 'https://www.indiabudget.gov.in/' },
  { title: 'Ministry of Statistics & Programme Implementation', href: 'http://www.mospi.gov.in/' },
  { title: 'NITI Aayog', href: 'http://www.niti.gov.in/state-statistics' },
  { title: 'Down To Earth', href: 'https://www.downtoearth.org.in/' },
  { title: 'India Environmental Portal', href: 'http://www.indiaenvironmentportal.org.in/' },
  { title: 'India Energy Portal', href: 'http://www.indiaenergyportal.org/' },
  { title: 'India Water Portal', href: 'https://www.indiawaterportal.org/' },
  { title: 'India Biodiversity Portal', href: 'https://indiabiodiversity.org/' },
  { title: 'Environmental Information System', href: 'http://www.envis.nic.in/' },
  { title: 'Ministry of Environment, Forest & Climate Change', href: 'http://envfor.nic.in/' },
  { title: 'India Meteorological Department', href: 'http://www.imd.gov.in/Welcome%20To%20IMD/Welcome.php' },
  { title: 'Centre for Environment Education', href: 'https://www.ceeindia.org/' },
  { title: "People's Archive of Rural India", href: 'https://ruralindiaonline.org' },
  { title: 'Nature Conservation Foundation', href: 'http://ncf-india.org/' },
  { title: 'Ashoka Trust for Research in Ecology & Environment', href: 'https://www.atree.org/' },
  { title: 'Bombay Natural History Society', href: 'http://www.bnhs.org/' },
  { title: 'Sanctuary Asia', href: 'http://www.sanctuaryasia.com/' },
  { title: 'Arghyam', href: 'http://arghyam.org/' },
  { title: 'Kalpavriksh', href: 'https://kalpavriksh.org/' },
  { title: 'WWF India', href: 'https://www.wwfindia.org/' },
  { title: 'M.C. Mehta Environmental Foundation', href: 'https://mcmef.org/' },
  { title: 'MigrantWatch India', href: 'http://www.migrantwatch.in/' },
  { title: 'OER Commons', href: 'https://www.oercommons.org/' },
  { title: 'Khan Academy', href: 'https://www.khanacademy.org/' },
  { title: 'Greenpeace', href: 'https://www.greenpeace.org/international/' },
  { title: 'Earthwatch Institute', href: 'https://earthwatch.org/' },
  { title: 'Rainforest Alliance', href: 'https://www.rainforest-alliance.org/' },
  { title: 'BirdLife International', href: 'https://www.birdlife.org/' },
  { title: 'Amphibians', href: 'http://www.amphibians.org/' },
];

const LinkRow = ({ index, title, href }: { index: number; title: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 px-4 py-3 hover:bg-green-50 rounded-lg group transition-colors border-b border-gray-50 last:border-0"
  >
    <span className="w-7 h-7 rounded-full bg-[#014d4e]/10 text-[#014d4e] text-xs font-bold flex items-center justify-center shrink-0">
      {index}
    </span>
    <span className="flex-1 text-sm font-semibold text-gray-700 group-hover:text-[#014d4e] transition-colors">
      {title}
    </span>
    <ExternalLink size={14} className="text-gray-300 group-hover:text-[#008e59] transition-colors shrink-0" />
  </a>
);

const SearchableList = ({ items }: { items: { title: string; href: string }[] }) => {
  const [query, setQuery] = useState('');
  const filtered = items.filter(i => i.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <div className="flex items-center gap-3 mb-4 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search links..."
          className="bg-transparent flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
        />
        <span className="text-xs text-gray-400 shrink-0">{filtered.length} results</span>
      </div>
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No links found for "{query}"</div>
        ) : (
          filtered.map((item, i) => <LinkRow key={i} index={i + 1} title={item.title} href={item.href} />)
        )}
      </div>
    </div>
  );
};

export default function ImportantLinksPage() {
  const [activeTab, setActiveTab] = useState('useful');
  const [activeMobile, setActiveMobile] = useState<boolean>(true);
  const [showSticky, setShowSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setShowSticky(false);
      } else if (currentScrollY < lastScrollY) {
        if (currentScrollY > 300) setShowSticky(true);
      }
      if (currentScrollY <= 300) setShowSticky(false);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const renderMobileDropdown = (isSticky = false) => (
    <div className={`relative ${isSticky ? '' : 'z-30'}`}>
      <button
        onClick={() => setActiveMobile(!activeMobile)}
        className={`w-full flex items-center justify-between bg-[#014d4e] text-white px-5 py-4 font-bold text-sm tracking-widest uppercase ${isSticky ? 'shadow-md' : 'rounded-t-2xl'}`}
      >
        <span>IMPORTANT LINKS</span>
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${activeMobile ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {activeMobile && (
          <motion.div
            key="cat-dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`overflow-hidden absolute w-full bg-white border border-[#E2E8F0] shadow-xl ${isSticky ? 'border-t-0 rounded-b-xl' : 'border-t-0 rounded-b-2xl'} z-50`}
          >
            <div className="flex flex-col divide-y divide-[#E2E8F0] max-h-[60vh] overflow-y-auto p-2">
              {sidebarLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setActiveMobile(false);
                      setTimeout(() => {
                        const el = document.getElementById('content-area');
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 140;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }, 300);
                    }}
                    className={`flex items-center gap-3 px-3 py-3.5 rounded-lg text-sm font-semibold transition-colors text-left ${
                      isActive 
                        ? 'bg-green-50 text-[#008e59]' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#014d4e]'
                    }`}
                  >
                    <span className="flex-1 pr-2">{link.label}</span>
                    <ChevronRight size={15} className={isActive ? 'text-[#008e59]' : 'text-gray-300'} />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12 font-sans">
      <LibraryNav />

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* MOBILE: Categories dropdown bar */}
        <div className="lg:hidden mb-4 relative">
          {/* Fixed Sticky Categories Bar (Only shows on scroll up) */}
          <AnimatePresence>
            {showSticky && (
              <motion.div
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed top-28 left-0 w-full z-30 px-4"
              >
                {renderMobileDropdown(true)}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Normal In-Flow Categories Bar */}
          {renderMobileDropdown(false)}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-2 sticky top-24 self-start">
          <div className="bg-[#014d4e] text-white font-bold px-4 py-3 rounded-t-xl shadow-md">
            IMPORTANT LINKS
          </div>
          <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 flex flex-col p-2 gap-1">
            {sidebarLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button key={link.id} onClick={() => {
                  setActiveTab(link.id);
                  const el = document.getElementById('content-area');
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 140;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left leading-tight group ${isActive ? 'bg-green-50 text-[#008e59] border-l-4 border-[#008e59]' : 'text-gray-600 hover:bg-gray-50 hover:text-[#014d4e] border-l-4 border-transparent'}`}>
                  <span className="flex-1 pr-2">{link.label}</span>
                  <ChevronRight size={14} className={`shrink-0 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div id="content-area" className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[500px]">
            <h1 className="text-2xl font-bold text-[#123B6D] mb-6 pb-2 border-b-2 border-gray-100">
              {sidebarLinks.find(s => s.id === activeTab)?.label?.toUpperCase()}
            </h1>

            {activeTab === 'useful' && (
              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                {usefulLinks.map((item, i) => <LinkRow key={i} index={i + 1} title={item.title} href={item.href} />)}
              </div>
            )}

            {activeTab === 'marathi' && (
              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                {marathiLinks.map((item, i) => <LinkRow key={i} index={i + 1} title={item.title} href={item.href} />)}
              </div>
            )}

            {activeTab === 'international' && (
              <>
                <p className="text-sm text-gray-500 mb-4">86 international academic and research resources — use the search to find quickly.</p>
                <SearchableList items={internationalLinks} />
              </>
            )}

            {activeTab === 'national' && (
              <>
                <p className="text-sm text-gray-500 mb-4">30 India-specific research and environment resources.</p>
                <SearchableList items={nationalLinks} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Library Footer */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 mt-12">
        <div className="bg-[#014d4e] w-full rounded-xl py-4 px-6 flex items-center gap-4 text-white/90 text-sm shadow-md">
          <University size={20} className="shrink-0" />
          {/* Copyright removed */}
        </div>
      </div>
    </div>
  );
}
