-- ================================================================
-- SEED: Programme Event Cards
-- Run this in your Supabase SQL Editor
-- ================================================================

INSERT INTO events (
  title, description, category, department,
  images, programme, programme_section,
  publish_programme, publish_home, publish_gallery, publish_calendar,
  status, published_at
) VALUES

-- BAF
(
  'Manthan 2024 – The Annual Commerce Festival',
  'Manthan is the flagship annual festival of the BAF department at MCC, celebrating excellence in commerce, finance, and accounting through competitions, workshops, and cultural events. Students participate in Case Study Analysis, Mock Stock Exchange, and the Finance Quiz Championship.',
  'Festivals', 'Manthan',
  ARRAY[]::text[], 'BAF', 'Manthan',
  true, false, false, false,
  'published', NOW() - INTERVAL '30 days'
),
(
  'Pratibimb – Annual Commerce Journal 2024',
  'Pratibimb is the official publication of the BAF programme — a student-curated commerce and finance journal showcasing research articles, case studies, and industry analyses. This edition features ESG investing, sustainable finance, and blockchain in accounting.',
  'Publication', 'Pratibimb',
  ARRAY[]::text[], 'BAF', 'Pratibimb',
  true, false, false, false,
  'published', NOW() - INTERVAL '20 days'
),

-- BBI
(
  'Manthan 2024 – BBI Banking Horizons Track',
  'BBI students participated in Manthan with a Banking & Insurance track featuring Mock RBI Policy Meet, Insurance Product Design Challenge, and a Fintech Startup Pitch. The track attracted professionals from leading banks and insurance companies.',
  'Festivals', 'Manthan + Shodh',
  ARRAY[]::text[], 'BBI', 'Manthan + Shodh',
  true, false, false, false,
  'published', NOW() - INTERVAL '32 days'
),
(
  'Shodh 2024 – BBI Research Conclave',
  'Shodh is the annual research conclave for BBI. Students present research papers on microfinance, credit risk modelling, and digital banking. The conclave features a guest lecture series from banking professionals.',
  'Festivals', 'Manthan + Shodh',
  ARRAY[]::text[], 'BBI', 'Manthan + Shodh',
  true, false, false, false,
  'published', NOW() - INTERVAL '15 days'
),
(
  'Pratibimb – BBI Edition 2024',
  'The BBI contribution to Pratibimb features analyses of India''s banking sector reforms, insurance penetration challenges, and student experiences from industrial visits to SEBI and BSE.',
  'Publication', 'Pratibimb',
  ARRAY[]::text[], 'BBI', 'Pratibimb',
  true, false, false, false,
  'published', NOW() - INTERVAL '10 days'
),

-- BFM
(
  'Manthan 2024 – Financial Markets Track',
  'The BFM track at Manthan featured a Mock Stock Market simulation, Derivatives Trading Challenge, and a Bloomberg Terminal Workshop. Students competed in reading market signals and building portfolios judged by equity analysts.',
  'Festivals', 'Manthan',
  ARRAY[]::text[], 'BFM', 'Manthan',
  true, false, false, false,
  'published', NOW() - INTERVAL '28 days'
),
(
  'Finanza 2024 – Annual Finance Magazine',
  'Finanza is the flagship publication of the BFM programme. This year covers cryptocurrency regulation in India, the impact of Fed rate hikes on emerging markets, and an examination of India''s bond market — written and designed entirely by BFM students.',
  'Publication', 'Finanza',
  ARRAY[]::text[], 'BFM', 'Finanza',
  true, false, false, false,
  'published', NOW() - INTERVAL '8 days'
),

-- BMS
(
  'Inspira 2024 – Annual Management Festival',
  'Inspira is the annual management festival showcasing management talent through B-Plan, HR Simulation, Supply Chain Challenge, and Creative Advertising. This year''s edition was themed "Lead Tomorrow" with keynotes from startup founders and corporate leaders.',
  'Festivals', 'Inspira',
  ARRAY[]::text[], 'BMS', 'Inspira',
  true, false, false, false,
  'published', NOW() - INTERVAL '25 days'
),
(
  'Inspira Magazine 2024 – The Management Journal',
  'Inspira Magazine features case studies on entrepreneurship, brand management analyses, student essays on leadership, and industrial visit reports from the BMS department.',
  'Publication', 'Inspira',
  ARRAY[]::text[], 'BMS', 'Inspira',
  true, false, false, false,
  'published', NOW() - INTERVAL '12 days'
),

-- BSc CS
(
  'Hack-A-Thon 2024 – BSc Computer Science',
  'The BSc CS department hosted the annual Hack-A-Thon — a 24-hour coding challenge with themes of AI, Open Source, and Social Impact. Over 80 teams competed, with winning projects presented to professionals from TCS, Infosys, and Google.',
  'Festivals', 'Hack-A-Thon',
  ARRAY[]::text[], 'BSC-CS', 'Hack-A-Thon',
  true, false, false, false,
  'published', NOW() - INTERVAL '22 days'
),
(
  'Tech Anugraha 2024 – CS Edition',
  'Tech Anugraha CS edition covers machine learning algorithms, cloud-native development, cybersecurity case studies, and final year capstone project showcases.',
  'Publication', 'Tech Anugraha',
  ARRAY[]::text[], 'BSC-CS', 'Tech Anugraha',
  true, false, false, false,
  'published', NOW() - INTERVAL '6 days'
),

-- BSc IT
(
  'Hack-A-Thon 2024 – BSc Information Technology',
  'BSc IT students participated in the Hack-A-Thon with a dedicated track on Web Technologies, IoT Applications, and Mobile App Development. 60+ teams built and pitched working prototypes within 24 hours.',
  'Festivals', 'Hack-A-Thon',
  ARRAY[]::text[], 'BSC-IT', 'Hack-A-Thon',
  true, false, false, false,
  'published', NOW() - INTERVAL '22 days'
),
(
  'Tech Anugraha 2024 – IT Edition',
  'The IT edition of Tech Anugraha features articles on full-stack development, network security, database optimization, and emerging trends like edge computing and quantum networking.',
  'Publication', 'Tech Anugraha',
  ARRAY[]::text[], 'BSC-IT', 'Tech Anugraha',
  true, false, false, false,
  'published', NOW() - INTERVAL '5 days'
),

-- BSc DS
(
  'Hack-A-Thon 2024 – Data Science Datathon',
  'The BSc DS team organized a Datathon — a 24-hour data challenge where participants built predictive models and AI-driven insights from real-world datasets. Mentored by data scientists from KPMG and Deloitte.',
  'Festivals', 'Hack-A-Thon',
  ARRAY[]::text[], 'BSC-DS', 'Hack-A-Thon',
  true, false, false, false,
  'published', NOW() - INTERVAL '22 days'
),
(
  'Tech Anugraha 2024 – Data Science Edition',
  'The DS edition explores Generative AI, time-series forecasting, NLP applications, and ethical dimensions of big data. Features capstone project summaries and interviews with data science professionals.',
  'Publication', 'Tech Anugraha',
  ARRAY[]::text[], 'BSC-DS', 'Tech Anugraha',
  true, false, false, false,
  'published', NOW() - INTERVAL '4 days'
),

-- BCA
(
  'Hack-A-Thon 2024 – BCA Coding Marathon',
  'BCA students participated in the annual Hack-A-Thon with an application development track. Teams built desktop and mobile apps solving real-world problems in healthcare, education, and logistics across 24 hours.',
  'Festivals', 'Hack-A-Thon',
  ARRAY[]::text[], 'BCA', 'Hack-A-Thon',
  true, false, false, false,
  'published', NOW() - INTERVAL '22 days'
),
(
  'Tech Anugraha 2024 – BCA Edition',
  'The BCA edition features articles on software architecture, agile development, object-oriented design patterns, and UI/UX principles. Includes student project spotlights and interviews with software engineers.',
  'Publication', 'Tech Anugraha',
  ARRAY[]::text[], 'BCA', 'Tech Anugraha',
  true, false, false, false,
  'published', NOW() - INTERVAL '4 days'
),

-- BCOM
(
  'Annual Commerce Festival 2024 – B.Com',
  'The B.Com Annual Festival featured Commerce Quiz, Mock Parliament, Debate Championship, and a Career Fair with participation from over 30 companies. Students from across commerce streams competed in events spanning a full week.',
  'Festivals', 'Festivals',
  ARRAY[]::text[], 'B.COM', 'Festivals',
  true, false, false, false,
  'published', NOW() - INTERVAL '35 days'
),
(
  'B.Com Annual Publication 2024',
  'The B.Com Annual Publication features articles on taxation, GST, corporate governance, and the evolving role of the chartered accountant. Includes student travelogues from industrial visits and alumni success stories.',
  'Publication', 'Publication',
  ARRAY[]::text[], 'B.COM', 'Publication',
  true, false, false, false,
  'published', NOW() - INTERVAL '18 days'
),

-- BBA (BCOM-BA)
(
  'Annual Business Festival 2024 – BBA',
  'The BBA Annual Festival featured inter-college competitions in business strategy, marketing, and entrepreneurship. The highlight was the "Dragons Den" B-Plan where student startups pitched to angel investors and venture capitalists.',
  'Festivals', 'Festivals',
  ARRAY[]::text[], 'BBA', 'Festivals',
  true, false, false, false,
  'published', NOW() - INTERVAL '35 days'
),
(
  'BBA Annual Publication 2024',
  'The BBA Annual Publication compiles student research on digital marketing, supply chain disruptions, HR analytics, and consumer behavior. Features a special section on student entrepreneurship and social enterprises.',
  'Publication', 'Publication',
  ARRAY[]::text[], 'BBA', 'Publication',
  true, false, false, false,
  'published', NOW() - INTERVAL '16 days'
),

-- BAMMC
(
  'Annual Mass Media Festival 2024 – BAMMC',
  'The BAMMC Annual Festival celebrated creativity across journalism, advertising, filmmaking, and public relations. Events included Ad Mad, Short Film Screening, RJ Competition, and a Photography Walk through Mulund.',
  'Festivals', 'Festivals',
  ARRAY[]::text[], 'BAMMC', 'Festivals',
  true, false, false, false,
  'published', NOW() - INTERVAL '40 days'
),
(
  'Shutter Speed 2024 – BAMMC Photography & Media Journal',
  'Shutter Speed is the flagship annual publication of the BAMMC programme, showcasing student photography, documentary writing, feature articles, and media critiques. The 2024 edition features a photo essay on Mumbai''s vanishing heritage, film reviews, and interviews with working journalists and filmmakers.',
  'Publication', 'Shutter Speed',
  ARRAY[]::text[], 'BAMMC', 'Shutter Speed',
  true, false, false, false,
  'published', NOW() - INTERVAL '14 days'
);
