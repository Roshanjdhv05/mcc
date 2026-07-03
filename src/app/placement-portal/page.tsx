'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Briefcase, Building2 } from 'lucide-react';

const categories = ['All', 'Tech & AI', 'IT Services', 'Finance & Banking', 'FMCG & Retail', 'Automotive', 'Indian Companies'];

const companies = [
  // ── Tech & AI ──
  {
    name: 'Google', category: 'Tech & AI', color: '#4285F4',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
    href: 'https://www.google.com/about/careers/applications/',
  },
  {
    name: 'OpenAI', category: 'Tech & AI', color: '#10a37f',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1280px-OpenAI_Logo.svg.png',
    href: 'https://openai.com/careers/',
  },
  {
    name: 'Anthropic', category: 'Tech & AI', color: '#c96442',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Anthropic_logo.svg/1280px-Anthropic_logo.svg.png',
    href: 'https://www.anthropic.com/careers',
  },
  {
    name: 'Microsoft', category: 'Tech & AI', color: '#00a4ef',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
    href: 'https://careers.microsoft.com/v2/global/en/home.html',
  },
  {
    name: 'Apple', category: 'Tech & AI', color: '#555555',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/814px-Apple_logo_black.svg.png',
    href: 'https://www.apple.com/careers/us/',
  },
  {
    name: 'Amazon', category: 'Tech & AI', color: '#FF9900',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
    href: 'https://www.amazon.jobs/en/',
  },
  {
    name: 'Meta', category: 'Tech & AI', color: '#0082FB',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1280px-Meta_Platforms_Inc._logo.svg.png',
    href: 'https://www.metacareers.com/',
  },
  {
    name: 'Salesforce', category: 'Tech & AI', color: '#00A1E0',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1280px-Salesforce.com_logo.svg.png',
    href: 'https://www.salesforce.com/company/careers/',
  },
  {
    name: 'Oracle', category: 'Tech & AI', color: '#F80000',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/2560px-Oracle_logo.svg.png',
    href: 'https://www.oracle.com/careers/',
  },
  {
    name: 'SAP', category: 'Tech & AI', color: '#0FAAFF',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/1280px-SAP_2011_logo.svg.png',
    href: 'https://jobs.sap.com/',
  },
  {
    name: 'Cisco', category: 'Tech & AI', color: '#1BA0D7',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1280px-Cisco_logo_blue_2016.svg.png',
    href: 'https://careers.cisco.com/global/en',
  },
  {
    name: 'Intel', category: 'Tech & AI', color: '#0071C5',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1005px-Intel_logo_%282006-2020%29.svg.png',
    href: 'https://intel.wd1.myworkdayjobs.com/External/page/',
  },
  {
    name: 'NVIDIA', category: 'Tech & AI', color: '#76B900',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/1280px-Nvidia_logo.svg.png',
    href: 'https://www.nvidia.com/en-us/about-nvidia/careers/',
  },
  // ── IT Services ──
  {
    name: 'Accenture', category: 'IT Services', color: '#A100FF',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/1280px-Accenture.svg.png',
    href: 'https://www.accenture.com/in-en/careers',
  },
  {
    name: 'IBM', category: 'IT Services', color: '#006699',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1280px-IBM_logo.svg.png',
    href: 'https://www.ibm.com/careers',
  },
  {
    name: 'TCS', category: 'IT Services', color: '#000080',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png',
    href: 'https://www.tcs.com/careers',
  },
  {
    name: 'Infosys', category: 'IT Services', color: '#007CC3',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png',
    href: 'https://www.infosys.com/careers/',
  },
  {
    name: 'Wipro', category: 'IT Services', color: '#3F1F68',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/1280px-Wipro_Primary_Logo_Color_RGB.svg.png',
    href: 'https://careers.wipro.com/',
  },
  {
    name: 'HCLTech', category: 'IT Services', color: '#007DC5',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/HCL_Technologies_official_logo.svg/1280px-HCL_Technologies_official_logo.svg.png',
    href: 'https://careers.hcltech.com/',
  },
  {
    name: 'Capgemini', category: 'IT Services', color: '#003189',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Capgemini_logo.svg/1280px-Capgemini_logo.svg.png',
    href: 'https://www.capgemini.com/careers/',
  },
  // ── Finance & Banking ──
  {
    name: 'JPMorgan', category: 'Finance & Banking', color: '#003087',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/J_P_Morgan_Logo_2008_1.svg/1280px-J_P_Morgan_Logo_2008_1.svg.png',
    href: 'https://www.jpmorganchase.com/careers',
  },
  {
    name: 'Goldman Sachs', category: 'Finance & Banking', color: '#6B9AC4',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/1280px-Goldman_Sachs.svg.png',
    href: 'https://www.goldmansachs.com/careers',
  },
  {
    name: 'HSBC', category: 'Finance & Banking', color: '#DB0011',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/1280px-HSBC_logo_%282018%29.svg.png',
    href: 'https://www.hsbc.com/careers',
  },
  {
    name: 'HDFC Bank', category: 'Finance & Banking', color: '#004C97',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1280px-HDFC_Bank_Logo.svg.png',
    href: 'https://www.hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f/?folder=WPS-APL-WCM-AADHAR&filename=careers.html',
  },
  {
    name: 'Visa', category: 'Finance & Banking', color: '#1A1F71',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1280px-Visa_Inc._logo.svg.png',
    href: 'https://corporate.visa.com/en/careers.html',
  },
  {
    name: 'Mastercard', category: 'Finance & Banking', color: '#EB001B',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png',
    href: 'https://careers.mastercard.com/us/en',
  },
  // ── FMCG & Retail ──
  {
    name: 'Unilever', category: 'FMCG & Retail', color: '#003087',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Unilever_logo.svg/1280px-Unilever_logo.svg.png',
    href: 'https://careers.unilever.com/en',
  },
  {
    name: 'Nestlé', category: 'FMCG & Retail', color: '#C8102E',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Nestl%C3%A9.svg/1280px-Nestl%C3%A9.svg.png',
    href: 'https://www.nestle.com/jobs',
  },
  {
    name: 'P&G', category: 'FMCG & Retail', color: '#003DA5',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Procter_%26_Gamble_logo.svg/1280px-Procter_%26_Gamble_logo.svg.png',
    href: 'https://www.pgcareers.com/in/en',
  },
  {
    name: 'Walmart', category: 'FMCG & Retail', color: '#007DC6',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Walmart_Spark.svg/1024px-Walmart_Spark.svg.png',
    href: 'https://careers.walmart.com/us/en/home',
  },
  // ── Automotive ──
  {
    name: 'Tesla', category: 'Automotive', color: '#CC0000',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/800px-Tesla_T_symbol.svg.png',
    href: 'https://www.tesla.com/careers',
  },
  {
    name: 'Toyota', category: 'Automotive', color: '#EB0A1E',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1024px-Toyota_carlogo.svg.png',
    href: 'https://global.toyota/en/company/recruit/',
  },
  {
    name: 'BMW', category: 'Automotive', color: '#1C69D4',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1280px-BMW.svg.png',
    href: 'https://www.bmwgroup.jobs/en.html',
  },
  // ── Indian Companies ──
  {
    name: 'Flipkart', category: 'Indian Companies', color: '#2874F0',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Flipkart_logo_%282015%29.svg/1280px-Flipkart_logo_%282015%29.svg.png',
    href: 'https://www.flipkartcareers.com/',
  },
  {
    name: 'PhonePe', category: 'Indian Companies', color: '#5F259F',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1280px-PhonePe_Logo.svg.png',
    href: 'https://www.phonepe.com/careers/',
  },
  {
    name: 'Razorpay', category: 'Indian Companies', color: '#2D81E0',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1280px-Razorpay_logo.svg.png',
    href: 'https://razorpay.com/careers/',
  },
  {
    name: 'Swiggy', category: 'Indian Companies', color: '#FC8019',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/1280px-Swiggy_logo.svg.png',
    href: 'https://careers.swiggy.com/#/',
  },
  {
    name: 'Reliance', category: 'Indian Companies', color: '#003087',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Reliance_Industries_Logo.svg/1280px-Reliance_Industries_Logo.svg.png',
    href: 'https://www.ril.com/careers',
  },
  {
    name: 'Tata Group', category: 'Indian Companies', color: '#003087',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/1280px-Tata_logo.svg.png',
    href: 'https://www.tata.com/careers',
  },
];

function CompanyCard({ company, index }: { company: typeof companies[0]; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.a
      href={company.href}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: Math.min(index * 0.03, 0.4) }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top colour bar */}
      <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: company.color }} />

      <div className="flex flex-col items-center text-center p-6 flex-1">
        {/* Logo / Fallback */}
        <div className="w-20 h-14 flex items-center justify-center mb-4">
          {imgError ? (
            <span
              className="text-2xl font-extrabold tracking-tight"
              style={{ color: company.color }}
            >
              {company.name.slice(0, 2).toUpperCase()}
            </span>
          ) : (
            <img
              src={company.logo}
              alt={company.name}
              className="max-w-full max-h-full object-contain"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Name */}
        <h3 className="font-bold text-[#1E293B] text-sm leading-tight mb-1">{company.name}</h3>

        {/* Category */}
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-4"
          style={{ color: company.color, backgroundColor: `${company.color}15` }}
        >
          {company.category}
        </span>

        {/* CTA */}
        <div className="mt-auto flex items-center gap-1.5 text-xs font-bold text-gray-400 group-hover:text-[#123B6D] transition-colors">
          <span>View Careers</span>
          <ExternalLink size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.a>
  );
}

export default function PlacementPortalPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => companies.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }), [search, activeCategory]);

  return (
    <div className="bg-[#F0F4F8] min-h-screen pb-24">

      {/* ── HERO ── */}
      <div className="bg-[#123B6D] relative overflow-hidden pt-28 pb-24">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1a5296] rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl opacity-15" />

        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Briefcase size={14} /> MCC Placement Cell
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-white font-[var(--font-heading)] mb-3 leading-tight">
            Placement Portal
          </motion.h1>
          <div className="w-20 h-1.5 bg-[#D4A017] rounded-full mx-auto mb-5" />

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/65 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Explore career opportunities at top global companies. Click any card to visit the official careers page.
          </motion.p>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Search companies…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/35 focus:outline-none focus:border-[#D4A017]/60 focus:bg-white/15 transition-all text-sm"
            />
          </motion.div>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-8 mb-10 relative z-10">
        <div className="grid grid-cols-4 gap-4">
          {[
            { value: `${companies.length}+`, label: 'Companies' },
            { value: `${categories.length - 1}`, label: 'Industries' },
            { value: '100%', label: 'Free Access' },
            { value: '24/7', label: 'Available' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 text-center shadow-lg border border-white">
              <div className="text-2xl font-extrabold text-[#123B6D]">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1 font-semibold uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-wrap gap-2 items-center">
          <Building2 size={15} className="text-gray-400 shrink-0 mr-1" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? 'bg-[#123B6D] text-white border-[#123B6D] shadow-md'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-[#123B6D] hover:text-[#123B6D]'
              }`}
            >
              {cat}
              {cat === 'All' && <span className="ml-1.5 opacity-60">({companies.length})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 text-gray-400">
              <Search size={44} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg font-semibold">No companies match &ldquo;{search}&rdquo;</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map((company, idx) => (
                <CompanyCard key={company.name} company={company} index={idx} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-gray-400 mt-10">
          Showing {filtered.length} of {companies.length} companies · All links open official careers pages in a new tab
        </p>
      </div>
    </div>
  );
}
