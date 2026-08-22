export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification?: string;
  experience?: string;
  corporateExp?: string;
  researchInterest?: string;
  briefInfo?: string;
  linkedin?: string;
  email?: string;
  image?: string;
  department?: string;
  role?: string;
}

export const newFacultyData: Record<string, Record<string, FacultyMember[]>> = {
  'BCOM': {
    'Accountancy': [
      { id: 'bcom-acc-1', name: 'Mr. Nikhil Dilip Karkhanis', image: '/Degree College Teachers/Nikhil Karkhanis.png', email: 'nikhil@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com, LLB, CS, SET, NET', experience: '15 years', corporateExp: '12 years', researchInterest: 'Corporate Finance, Share Buybacks, Corporate Restructuring, Corporate Governance, Financial Decision-Making, Accounting and Financial Reporting, Business Research Methodology', linkedin: 'https://www.linkedin.com/in/nikhil-karkhanis-44331727/', department: 'Accountancy' },
      { id: 'bcom-acc-2', name: 'Ms. Riya Dhamapurkar', image: '/Degree College Teachers/Riya Dhamapurkar.jfif', email: 'riya.dhamapurkar@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com, B.Ed., NET', experience: '16 years', researchInterest: 'Accountancy, Finance', department: 'Accountancy' },
      { id: 'bcom-acc-4', name: 'Mr. Prathamesh Rajesh Bobhate', image: '/Degree College Teachers/Prathmesh Bobhate.png', email: 'prathamesh.bobhate@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com (Adv. Accountancy), NET (Com.), SET (Com.)', experience: '9 years', corporateExp: '1 year', linkedin: 'http://www.linkedin.com/in/prathamesh-bobhate-9893b7175', department: 'Accountancy' },
      { id: 'bcom-acc-6', name: 'Ms. Suchitra Manjunath Poojari', image: '/Degree College Teachers/Suchitra Poojary.png', email: 'suchitra.poojari@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com, NET, MH-SET, KSET', experience: '5 years', researchInterest: 'Financial Inclusion, Financial Literacy, Entrepreneurship, FinTech, Indian Knowledge Systems (IKS) in Finance', linkedin: 'https://www.linkedin.com/in/suchitra-poojari-0091b51bb', department: 'Accountancy' }
    ],
    'Mathematics and Statistics': [
      { id: 'bcom-math-1', name: 'Ms. Komal Bhatt', image: '/Degree College Teachers/Komal Bhatt.png', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc. Maths', experience: '7 years', researchInterest: 'Applications of Mathematics & Statistics, Operations Research, Data Analytics, Decision-making and Education', linkedin: 'https://www.linkedin.com/in/komal-bhatt-555b47227', department: 'Mathematics and Statistics' },
      { id: 'bcom-math-2', name: 'Ms. Neha Pal', image: '/Degree College Teachers/Neha Pal.png', email: 'neha.pal@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc. , B.Ed.', experience: '5 years', corporateExp: '2 months', department: 'Mathematics and Statistics' },
      { id: 'bcom-math-3', name: 'Ms. Gauri Atre', image: '/Degree College Teachers/Gauri Atre.png', email: 'gauri.atre@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc (Mathematics), M. Phil, B.Ed', experience: '24 years', researchInterest: 'Pure Mathematics, Graph Theory and Combinatorics, Applied Mathematics, Statistics', linkedin: 'https://www.linkedin.com/in/gauri-atre-85410b231/', department: 'Mathematics and Statistics' },
      { id: 'bcom-math-4', name: 'Ms. Chetna Shailesh Panchal', image: '/Degree College Teachers/Chetna Panachal.png', email: 'chetna.panchal@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc, B.Ed', experience: '18 years', researchInterest: 'Mathematics', department: 'Mathematics and Statistics' },
      { id: 'bcom-math-5', name: 'Ms. Seema Mahendra Attarde', image: '/Degree College Teachers/Seema Attarde.png', email: 'seema.attarde@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc. (Industrial Statistics)', experience: '28 years', corporateExp: '0 years', researchInterest: 'Interested In research related to statistics and social sciences', department: 'Mathematics and Statistics' }
    ],
    'Commerce': [
      { id: 'bcom-com-1', name: 'CA Dr. Anuradha Ganesh', image: '/Degree College Teachers/Anuradha Ganesh.jfif', email: 'anuradha.ganesh@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com, C.A., PhD', experience: '23 years', corporateExp: '9 years', researchInterest: 'Finance, Marketing, Behavioural finance', department: 'Commerce' },
      { id: 'bcom-com-2', name: 'Dr. Sulbha Aloke Dey', email: 'sulbha.dey@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com., B.Ed., NET, SET, Ph.D.', experience: '18 years', corporateExp: '12 years', researchInterest: 'Marketing', department: 'Commerce' },
      { id: 'bcom-com-3', name: 'Dr. Vaishali J. Patil', email: 'vaishali.patil@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com., MBA, NET, SET, M.Phil., Ph.D.', experience: '19 years', corporateExp: '0 years', researchInterest: 'Human Resource Management, Marketing, Business and Industry Trends', linkedin: 'https://www.linkedin.com/in/vaishali-patil-002088261', department: 'Commerce' },
      { id: 'bcom-com-4', name: 'Ms. Dhanvi Rajesh Mehta', image: '/Degree College Teachers/Dhanvi Mehta.png', email: 'dhanvi.mehta@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com (Bus. Mgmt.), NET (Commerce)', experience: '2 years', corporateExp: '1 year', researchInterest: 'Marketing, Advertising, Leadership, Human Resource Management', linkedin: 'https://www.linkedin.com/in/dhanvimehta', department: 'Commerce' }
    ],
    'Economics': [
      { id: 'bcom-eco-3', name: 'Ms. Gopika M. Pal', image: '/Degree College Teachers/Gopika Pal.png', email: 'gopika.pal@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.A. (Economics), SET', experience: '8 years', corporateExp: '2 years', researchInterest: 'Uorganised Sector and Informal Economy', department: 'Economics' }
    ],
    'English and Indian Languages': [
      { id: 'bcom-eng-1', name: 'Dr. Shayeree Ghosh', image: '/Degree College Teachers/Shayeree Ghosh.png', email: 'shayeree.ghosh@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'MA (English), MA (Sociology), Ph.D. NET, B.Mus.', experience: '13 years', researchInterest: 'communication, English Literature and Linguistic Sociology', department: 'English and Indian Languages' },
      { id: 'bcom-eng-2', name: 'Mr. Jayanta Ghorpade', image: '/Degree College Teachers/Jayanta Ghorpade.png', email: 'jayanta.ghorpade@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.A., B.Ed., MPhil, NET (Eng.)', experience: '22 years', researchInterest: 'English Language and Literature', department: 'English and Indian Languages' },
      { id: 'bcom-eng-4', name: 'Ms. Vaani Vazirani', image: '/Degree College Teachers/vaani vaazirani.jpeg', email: 'vaani.vazirani@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.A., SET', experience: '6 years', corporateExp: '6 years', researchInterest: 'Postcolonialism, Corporeal Studies, Film Studies, Gender Studies', linkedin: 'https://www.linkedin.com/in/vaani-vazirani-239485361', department: 'English and Indian Languages' }
    ],
    'Environmental Studies': [
      { id: 'bcom-env-1', name: 'Mr. Amit Yadav', image: '/Degree College Teachers/Amit Yadav.jpeg', email: 'amit@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc., NET, PGDEL (NLSUI), LLB', experience: '17 years', researchInterest: 'Environmental Movements, Waste Management, Citizen Science, Sustainability', linkedin: 'https://www.linkedin.com/in/amit-y-2285a59/', department: 'Environmental Studies' }
    ],
    'IKS': [
      { id: 'bcom-iks-1', name: 'Prof. Dr. Minal Anand Mapuskar', image: "/Degree College Teachers/Minal Mapuskar.png", email: 'principal@mccmulund.ac.in', designation: 'PRINCIPAL & HEAD', qualification: 'M.A. (Political Science), NET, SET, Ph.D.', experience: '20 years', researchInterest: 'Policy, Governance', linkedin: 'https://www.linkedin.com/in/minal-mapuskar-a4705a14b', department: 'IKS' },
      { id: 'bcom-iks-2', name: 'Ms. Jui Kadvekar', image: "/Degree College Teachers/Jui Kudvekar.png", email: 'juikadvekar@gmail.com', designation: 'ASSISTANT PROFESSOR', qualification: 'M.A. (History), NET', experience: '3 years', researchInterest: 'History of Mumbai and Suburban Mumbai, Indian Knowledge Systems, History of Indian Culture, Society and Cinema', linkedin: 'https://www.linkedin.com/in/jui-kadvekar-3831a95a', department: 'IKS' }
    ],
    'Law': [
      { id: 'bcom-law-1', name: "Dr. Pramila D'Souza", image: "/Degree College Teachers/Pramila D'Souza.png", email: 'pramiladsouza@mulund.ac.in', designation: 'HEAD & ASSISTANT PROFESSOR', qualification: 'B.A., L.L.M., NET, Ph.D.', experience: '20 years', researchInterest: 'Human Rights', department: 'Law' }
    ],
    'Business Economics': [
      { id: 'bcom-buseco-1', name: 'Dr. Shivaji Pawar', image: '/Degree College Teachers/Shivaji Pawar.png', email: 'shivaji.pawar@mccmulund.ac.in', designation: 'VICE-PRINCIPAL & HEAD', qualification: 'M.A., B.Ed., M.Phil., Ph.D., NET', department: 'Business Economics' },
      { id: 'bcom-buseco-2', name: 'Dr. Arjun Lakhe', image: '/Degree College Teachers/Arjun Lakhe.png', email: 'arjun.lakhe@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.A., M.Phil., Ph.D.', experience: '12 yrs.', department: 'Business Economics' }
    ]
  },
  'BSC_CA': {
    'All': [
      { id: 'bca-1', name: 'Dr. Vishal D. Borude', image: '/Degree College Teachers/Vishal Borude.png', email: 'vishal.borude@mccmulund.ac.in', designation: 'COORDINATOR', role: 'Coordinator', qualification: 'M.Sc (IT), Ph.D.', experience: '12 years', corporateExp: '0 years', researchInterest: 'Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision', department: 'B.Sc. CA' },
      { id: 'bca-2', name: 'Mr. Siddhesh Santosh Gotekar', image: '/Degree College Teachers/Siddhesh Gotekar.png', email: 'siddhesh.gotekar@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc. (IT)', experience: '3 years', corporateExp: '3 years', researchInterest: 'Generative AI in Health Care', linkedin: 'https://www.linkedin.com/in/siddhesh-gotekar-965218120', department: 'B.Sc. CA' }
    ]
  },
  'BSC_CS': {
    'All': [
      { id: 'cs-1', name: 'Dr. Reena Deepak Nagda', image: '/Degree College Teachers/Reena Shah.png', email: 'reena.shah@mccmulund.ac.in', designation: 'EXAMINATION CO-CONTROLLER', qualification: 'M.Sc., MPhil, NET, Ph.D.', experience: '20 years', researchInterest: 'Mathematics, Statistics, Learning Analytics', linkedin: 'https://www.linkedin.com/in/dr-reena-shah-nagda-96929676', department: 'B.Sc. CS' },
      { id: 'cs-2', name: 'Dr. Vaishnavi Assar', image: '/Degree College Teachers/Vaishnavi Assar.png', email: 'vaishnavi.assar@mccmulund.ac.in', designation: 'COORDINATOR', role: 'Coordinator', qualification: 'M.Sc., Ph.D.', experience: '19 years', researchInterest: 'Security and Cyber Forensics', linkedin: 'https://www.linkedin.com/in/dr-vaishnavi-assar-1a207831', department: 'B.Sc. CS' },
      { id: 'cs-3', name: 'Dr. Pooja Patil', email: 'pooja.patil@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc., Ph.D.', experience: '17 years', researchInterest: 'Statistics, Data Science, Computer Science', linkedin: 'https://www.linkedin.com/in/dr-pooja-patil-014764217', department: 'B.Sc. CS' },
      { id: 'cs-4', name: 'Ms. Bhumika Mithilesh Chauhan', email: 'bhumika.nakum@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc. (IT), NET', experience: '12 years', researchInterest: 'Computer Science and Application', linkedin: 'https://www.linkedin.com/in/bhumika-nakum-07b22798', department: 'B.Sc. CS' },
      { id: 'cs-5', name: 'Ms. Pratiksha Harwalkar', image: '/Degree College Teachers/Pratiksha Harwalkar.png', email: 'pratiksha.harwalkar@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc. (IT), NET', experience: '8 years', researchInterest: 'AI and ML', linkedin: 'https://www.linkedin.com/in/pratiksha-harwalkar-168831233', department: 'B.Sc. CS' },
      { id: 'cs-6', name: 'Ms. Bhoomika Pansare', image: '/Degree College Teachers/Bhoomika Pansare.png', email: 'bhoomika.pansare@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc. (CS)', experience: '4 years', researchInterest: 'Cloud Computing, Internet of Things, Algorithms, Computer Networks', linkedin: 'https://www.linkedin.com/in/bhoomikapansare2', department: 'B.Sc. CS' }
    ]
  },
  'BSC_DS': {
    'All': [
      { id: 'ds-1', name: 'Dr. Priti Pathak', image: '/Degree College Teachers/Priti Pathak.png', email: 'priti.pathak@mccmulund.ac.in', designation: 'COORDINATOR', role: 'Coordinator', qualification: 'M.Sc. (I.T), M.Tech (I.T), MBA (I.T), LLB, Diploma in Cyber Law, Ph.D', experience: '16 years', researchInterest: 'Artificial Intelligence, Machine Learning, Data Science, Blockchain Technology, & Predictive Analytics.', department: 'B.Sc. DS' },
      { id: 'ds-2', name: 'Mr. Avinash Dongare', image: '/Degree College Teachers/Avinash Dongre.png', email: 'avinash.dongare@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc., NET', experience: '9 years', corporateExp: '0 years', researchInterest: 'Artificial Intelligence: Developing intelligent systems', linkedin: 'https://www.linkedin.com/in/avinash-dongare-905143236', department: 'B.Sc. DS' },
      { id: 'ds-3', name: 'Dr. Deepa Nyayadhish', image: '/Degree College Teachers/Deepa Nyayadhish.png', email: 'deepa.nyayadhish@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'MCA, M. Phil, Ph. D.', experience: '17 years', corporateExp: '3 years', researchInterest: 'DataWarehousing and Mining, NoSQL databases', linkedin: 'https://www.linkedin.com/in/dr-deepa-nyayadhish-19942a31a', department: 'B.Sc. DS' }
    ]
  },
  'BSC_IT': {
    'All': [
      { id: 'it-4', name: 'Dr. Jyotika Chheda', image: '/Degree College Teachers/Jyotika Chheda.png', email: 'jyotika.chheda@mccmulund.ac.in', designation: 'COORDINATOR', role: 'Coordinator', qualification: 'MCA, NET, Ph.D.', experience: '16 years', researchInterest: 'Computer Netwoks and Information Security', department: 'B.Sc. IT' },
      { id: 'it-5', name: 'Dr. Sandhya Pandey', image: '/Degree College Teachers/Sandhya Pandey.png', email: 'sandhya.pandey@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.C.A., Ph.D., M.A.', experience: '18 years', corporateExp: '1 year', researchInterest: 'Web technology, Artificial intelligence', linkedin: 'https://www.linkedin.com/in/dr-sandhya-pandey-bab340197', department: 'B.Sc. IT' },
      { id: 'it-6', name: 'Ms. Suvarna Ramesh Sawant', image: '/Degree College Teachers/Suvarna Sawant.png', email: 'suvarna.sawant@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'MCA', experience: '12 years', researchInterest: 'Computer', department: 'B.Sc. IT' },
      { id: 'it-7', name: 'Ms. Nikhita Tejas Khedekar', image: '/Degree College Teachers/Nikhita Khedekar.png', email: 'nikhita.khedekar@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'MSc. (IT), SET', experience: '5 years', researchInterest: 'Python,AI', linkedin: 'https://www.linkedin.com/in/nikhita-amonkar-khedekar-b52b10121', department: 'B.Sc. IT' }
    ]
  },
  'BAF': {
    'All': [
      { id: 'baf-5', name: 'Mr. Nitin Pawar', image: '/Degree College Teachers/Nitin Pawar.png', email: 'nitin.pawar@mccmulund.ac.in', designation: 'COORDINATOR', role: 'Coordinator', qualification: 'M.Com, M.Phil, MBA (Finance), SET', experience: '16 years', researchInterest: 'Financial Analysis, Financial Planning, Banking', linkedin: 'https://www.linkedin.com/in/mr-nitin-pawar-3aa2863b3', department: 'BAF' },
      { id: 'baf-2', name: 'Ms. Alpa Katira', image: '/Degree College Teachers/Alpa Katira.png', email: 'alpa.katira@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M. Com, B.Ed., SET', experience: '20 years', linkedin: 'https://www.linkedin.com/in/alpa-katira-659400281', department: 'BAF' },
      { id: 'baf-6', name: 'Ms. Swapna Acharya', image: '/Degree College Teachers/Swapana Acharya.png', email: 'swapna.acharya@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com, LLB, SET', experience: '8 years', corporateExp: '2 years', researchInterest: 'Finance, Law, Corporate Governance', linkedin: 'https://www.linkedin.com/in/swapna-acharya-796386122', department: 'BAF' },
      { id: 'baf-7', name: 'Dr. Sneha Prajapati', image: '/Degree College Teachers/Sneha Prajapati.png', email: 'sneha.prajapati@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com, B.Ed., SET, NET, Ph.D', experience: '8 years', researchInterest: 'Consumer Behaviour, Retail Management', linkedin: 'https://www.linkedin.com/in/dr-sneha-prajapati-183658125', department: 'BAF' }
    ]
  },
  'BAMMC': {
    'All': [
      { id: 'bammc-1', name: 'Dr. Shriya Shenoy', image: '/Degree College Teachers/Shriya Shenoy.png', email: 'shriya.shenoy@mccmulund.ac.in', designation: 'COORDINATOR', role: 'Coordinator', qualification: 'MACJ, SET, Ph.D.', experience: '9 years', corporateExp: '4 years', researchInterest: 'Mass Media, Journalism, Social Media, Mental Health', linkedin: 'https://www.linkedin.com/in/dr-shriya-s-33236733/', department: 'BAMMC' },
      { id: 'bammc-2', name: 'Dr. Nimisha Parag Gadkari', image: '/Degree College Teachers/Nimisha Gadkari.png', email: 'nimisha.gadkari@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'MA (Advertising & Films), Ph.D.', experience: '7 years', corporateExp: '1 year', researchInterest: 'Advertising, Theatre, Media, Art', department: 'BAMMC' },
      { id: 'bammc-3', name: 'Ms. Sanika Ratnaparkhi', image: '/Degree College Teachers/Sanika Ratnaparkhi.png', email: 'sanika.ratnaparkhi@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'MA (English Litt.), PGDM', experience: '2 years', corporateExp: '3 years', researchInterest: 'English Literature, Media Studies', linkedin: 'https://www.linkedin.com/in/sanika-ratnaparkhi-b105131a0', department: 'BAMMC' }
    ]
  },
  'BBI': {
    'All': [
      { id: 'bbi-1', name: 'Ms. Shilpa Thakur', image: '/Degree College Teachers/Shilpa Thakur.png', email: 'shilpa.thakur@mccmulund.ac.in', designation: 'VICE-PRINCIPAL (SFC), COORDINATOR', role: 'Coordinator', qualification: 'M.Com, M.Phil', experience: '33 years', corporateExp: '3 years', researchInterest: 'Commerce, Human Resource', department: 'BBI' },
      { id: 'bbi-2', name: 'Dr. Rajashri Deshpande', image: '/Degree College Teachers/Rajashree Deshpande.png', email: 'rajashri.deshpande@mccmulund.ac.in', designation: 'COORDINATOR', role: 'Coordinator', qualification: 'M.Com, M.A (Eco), NET, Ph.D', experience: '19 years', researchInterest: 'Banking & Finance', department: 'BBI' },
      { id: 'bbi-4', name: 'Ms. Archana Ananda Kadam', image: '/Degree College Teachers/Archana Kadam.png', email: 'archana.kadam@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M. Com, B. Ed, NET, M. A., PGDFM', experience: '16 years', corporateExp: '11 years', researchInterest: 'Financial Inclusion, Behavioural Finance, Banking', linkedin: 'https://www.linkedin.com/in/archana-kadam-a0539850/', department: 'BBI' },
      { id: 'bbi-5', name: 'Ms. Seema Mahendra Attarde', image: '/Degree College Teachers/Seema Attarde.png', email: 'seema.attarde@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Sc. (Industrial Statistics)', experience: '28 years', researchInterest: 'Interested In research related to statistics and social sciences', department: 'BBI' }
    ]
  },
  'BCOM_BA': {
    'All': [
      { id: 'bcomba-1', name: 'Dr. Vijayalakshmi Kannan', image: '/Degree College Teachers/Viji Kannan.png', designation: 'COORDINATOR', role: 'Coordinator', qualification: 'BCS, MBA, NET, PhD', experience: '24 years', department: 'BCOM BA' },
      { id: 'bcomba-2', name: 'Ms. Prajakta Khamkar', image: '/Degree College Teachers/Prajakta Khamkar.png', email: 'prajakta.khamkar@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'MBA', experience: '10 years', corporateExp: '5 years', researchInterest: 'FinTech', linkedin: 'https://www.linkedin.com/in/prajakta-khamkar-mcc-b49952386', department: 'BCOM BA' },
      { id: 'bcomba-4', name: 'Ms. Rutuja Birje', image: '/Degree College Teachers/Rutuja Birje.png', designation: 'ASSISTANT PROFESSOR', qualification: 'MCom (Accountancy) , NET, CS', experience: '9 years', department: 'BCOM BA' }
    ]
  },
  'BCOM_MS': {
    'All': [
      { id: 'bcomms-3', name: 'Dr. Kanchana Sattur', image: '/Degree College Teachers/Kanchana Sattur.png', email: 'kanchana.sattur@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com (Buss. Mgmt), M.B.A. (Finance), NET (Com.), NET (Mgmt.), Ph.D', experience: '17 years', corporateExp: '2 years', researchInterest: 'Commerce, Management, Social Science', linkedin: 'https://www.linkedin.com/in/dr-kanchana-nayak-sattur-034a83185', department: 'BCOM MS' },
      { id: 'bcomms-4', name: 'Dr. Soumya George', image: '/Degree College Teachers/Soumya George.png', email: 'soumya.george@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'MA (Economics), MBA, M.Com (B&I), MJMC, Ph.D (Economics)', experience: '14 years', corporateExp: '2 years', researchInterest: 'Business Economics, Entrepreneurship, Marketing Management', linkedin: 'https://www.linkedin.com/in/dr-kanchana-nayak-sattur-034a83185', department: 'BCOM MS' },
      { id: 'bcomms-5', name: 'Dr. Shilpi Jawake', image: '/Degree College Teachers/Shilpi Juwake.png', email: 'shilpi.jawake@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'Ph.D, NET', experience: '13 years', corporateExp: '6 years', researchInterest: 'Sustainable Business and Management', linkedin: 'https://www.linkedin.com/in/dr-shilpi-surjan-b0ab4832', department: 'BCOM MS' },
      { id: 'bcomms-6', name: 'Dr. Abhilasha N', image: '/Degree College Teachers/Abilasha N.png', email: 'abhilasha.n@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com, MBA (FinTech), MPHIL (Com), SET (Com), NET (Com), PH.D', experience: '13 years', researchInterest: 'Behavioural Biases, ESG, FinTech, CSR, Green Finance', linkedin: 'http://www.linkedin.com/in/abilasha2309', department: 'BCOM MS' },
      { id: 'bcomms-7', name: 'Mr. Felix Anthonysamy', image: '/Degree College Teachers/Felix Anthonysamy.png', email: 'felix@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com, MBA, MA, B.Ed, NET, SET', experience: '10 years', corporateExp: '1 year', researchInterest: 'Investment Management, Taxation', linkedin: 'https://www.linkedin.com/in/felix-anthony-18a41529a', department: 'BCOM MS' }
    ]
  },
  'BFM': {
    'All': [
      { id: 'bfm-3', name: 'Ms. Siddhi Kambli', image: '/Degree College Teachers/Siddhi Kambli.png', email: 'siddhi.kambli@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com., SET', experience: '8 years', corporateExp: '2 years', researchInterest: 'Finance, Insurance, Business Economics', department: 'BFM' },
      { id: 'bfm-4', name: 'Dr. Sipra Routaray', image: '/Degree College Teachers/Sipra Routray.png', email: 'sipra.routray@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com, NET, MBA, Ph.D.', experience: '13 years', corporateExp: '3 years', researchInterest: 'Financial Markets, Digital Payments, FinTech', linkedin: 'https://www.linkedin.com/in/dr-sipra-routaray-345a0162', department: 'BFM' },
      { id: 'bfm-5', name: 'Ms. Archana Patre', image: '/Degree College Teachers/Archana Patre.png', email: 'abf.records@mccmulund.ac.in', designation: 'ASSISTANT PROFESSOR', qualification: 'M.Com, MFM', experience: '12 years', corporateExp: '8 years', researchInterest: 'Finance, Financial Literacy', department: 'BFM' }
    ]
  }
};
