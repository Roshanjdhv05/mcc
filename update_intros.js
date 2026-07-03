const fs = require('fs');
const path = require('path');

const updates = {
  "ug/bcom-ms": [
    "Bachelor of Commerce (B.Com) in Management Studies is an undergraduate program designed to provide students with in-depth knowledge of business management, financial principles, and organizational strategies. The program combines theoretical and practical aspects of commerce, focusing on business operations, management techniques, and decision-making processes.",
    "The course covers core subjects such as business management, financial accounting, marketing, human resource management, business law, organizational behavior, and strategic management. It prepares students for leadership roles in various industries by equipping them with analytical, problem-solving, and managerial skills.",
    "Graduates of B.Com in Management Studies can pursue careers in corporate management, banking, finance, marketing, entrepreneurship, and consulting. They can also opt for higher education like MBA, M.Com, CFA, or other professional certifications to enhance their expertise and career prospects.",
    "This program is ideal for students who aspire to develop managerial skills, understand business dynamics, and take on leadership roles in the corporate world."
  ],
  "ug/ba-mmc": [
    "The Bachelor of Arts (BA) in Multimedia and Mass Communication is an undergraduate program that focuses on the dynamic fields of media, journalism, digital content creation, and communication strategies. This interdisciplinary course blends journalism, advertising, public relations, film studies, digital media, and multimedia production, equipping students with the skills needed for the fast-evolving media industry.",
    "The program covers key subjects such as news reporting, media ethics, digital marketing, photography, videography, scriptwriting, graphic design, and social media management. Students gain hands-on experience through practical assignments, internships, and industry collaborations, allowing them to develop storytelling, creative, and technical expertise.",
    "Graduates of this course can pursue careers in journalism, filmmaking, digital marketing, public relations, corporate communications, advertising, and content creation. The program also serves as a foundation for higher studies like Master’s in Mass Communication, Media Studies, or specialized certifications in digital media.",
    "This degree is ideal for individuals passionate about storytelling, media production, and communication, and who wish to make a mark in the ever-growing media and entertainment industry."
  ],
  "ug/bcom": [
    "The Bachelor of Commerce (B.Com) is a three-year undergraduate degree program that provides students with a strong foundation in commerce, finance, business management, and economics. It is designed to develop analytical, managerial, and problem-solving skills essential for the corporate and business world.",
    "The program covers core subjects such as Accounting, Business Law, Economics, Marketing, Taxation, Banking, and Financial Management. B.Com graduates gain expertise in financial decision-making, business strategies, and market analysis, making them well-equipped for careers in banking, finance, accounting, taxation, auditing, and management.",
    "B.Com also serves as a stepping stone for professional courses such as Chartered Accountancy (CA), Company Secretary (CS), Cost and Management Accountancy (CMA), MBA, and CFA. It is an ideal choice for students who aspire to build a career in commerce, finance, or entrepreneurship and pursue higher studies in business-related fields."
  ],
  "ug/bbi": [
    "The Bachelor of Commerce (B.Com) in Banking & Insurance (BBI) is a specialized undergraduate program designed to provide students with comprehensive knowledge of the banking, finance, and insurance sectors. This course focuses on key financial concepts, risk management, investment strategies, and regulatory frameworks that govern the banking and insurance industries.",
    "The curriculum includes subjects such as financial accounting, banking law and operations, insurance management, investment banking, risk assessment, financial markets, and corporate finance. It aims to equip students with analytical and problem-solving skills essential for making strategic financial decisions.",
    "Graduates of B.Com in Banking & Insurance can explore career opportunities in commercial and investment banking, insurance companies, financial consultancies, stock markets, and regulatory institutions. They can also pursue higher education, such as MBA in Finance, M.Com, Chartered Financial Analyst (CFA), or professional certifications like CAIIB (Certified Associate of the Indian Institute of Bankers).",
    "This program is ideal for students who aspire to build a career in banking, finance, and insurance, and seek in-depth knowledge of financial risk management and economic policies."
  ],
  "ug/bfsi": [
    "The Bachelor of Commerce (B.Com) in Banking, Financial Services, and Insurance (BFSI) is a specialized undergraduate program designed to provide students with a strong foundation in the financial sector. This program focuses on the principles and practices of banking, investment, risk management, insurance, and financial services, equipping students with the necessary skills to excel in the dynamic world of finance.",
    "The curriculum covers essential subjects such as financial accounting, banking regulations, risk assessment, investment analysis, insurance laws, financial markets, and economic policies. It prepares students for careers in commercial banking, investment banking, insurance companies, financial consultancies, and regulatory bodies.",
    "With the increasing demand for skilled professionals in the financial sector, B.Com (BFSI) offers excellent career opportunities in banks, financial institutions, mutual funds, stock markets, and fintech companies. Graduates can also pursue further studies such as MBA in Finance, Chartered Financial Analyst (CFA), Certified Financial Planner (CFP), or professional banking and insurance certifications.",
    "This program is ideal for students who are interested in financial management, investment strategies, risk assessment, and the functioning of banking and insurance sectors."
  ],
  "ug/bcom-ba": [
    "The Bachelor of Commerce (B.Com) in Business Administration is an undergraduate degree program designed to provide students with a strong foundation in business management, finance, economics, and organizational strategies. It equips students with the necessary skills and knowledge to manage and operate businesses efficiently in a dynamic economic environment.",
    "This program covers a wide range of subjects, including accounting, marketing, human resource management, business law, financial management, entrepreneurship, and corporate governance. It prepares students for careers in various industries, including banking, finance, retail, consulting, and entrepreneurship.",
    "The B.Com in Business Administration program focuses on developing critical thinking, leadership, and decision-making skills, making graduates well-suited for managerial roles in organizations. Additionally, the program lays a strong academic foundation for those who wish to pursue higher studies, such as an MBA or specialized postgraduate diplomas in business-related fields.",
    "Overall, this course is ideal for students looking to build a career in business, administration, and management while gaining a comprehensive understanding of the corporate world."
  ],
  "ug/sct/bsc-cs": [
    "The Bachelor of Science (B.Sc.) in Computer Science is a three-year undergraduate program that focuses on the theoretical and practical aspects of computing, programming, and information technology. This course provides students with a strong foundation in computer programming, algorithms, data structures, software development, databases, networking, and artificial intelligence.",
    "The curriculum is designed to equip students with problem-solving abilities, analytical thinking, and hands-on experience in programming languages like C, C++, Java, Python, and SQL. It also includes emerging technologies such as machine learning, cybersecurity, cloud computing, and web development, making graduates industry-ready.",
    "A B.Sc. in Computer Science opens up diverse career opportunities in software development, IT consulting, data analysis, cybersecurity, and system administration. Graduates can also pursue higher studies like M.Sc. in Computer Science, MCA, or specialized certifications to enhance their expertise.",
    "This program is ideal for students passionate about technology, coding, and innovation, and those looking to build a successful career in the ever-growing field of computer science."
  ],
  "ug/sct/bsc-ds": [
    "Bachelor of Science (B.Sc.) in Data Science is an undergraduate program that focuses on the study of data analysis, machine learning, statistics, and computational techniques to extract meaningful insights from large datasets. This interdisciplinary course combines elements of mathematics, computer science, and business intelligence, preparing students for the growing field of data-driven decision-making.",
    "The curriculum covers key subjects such as statistics, programming (Python, R), data visualization, database management, big data analytics, artificial intelligence, and cloud computing. It emphasizes practical learning through real-world projects, case studies, and internships.",
    "With the increasing demand for data scientists, analysts, and AI professionals, graduates of B.Sc. in Data Science can pursue careers in diverse industries, including finance, healthcare, e-commerce, technology, and government sectors. They can also opt for advanced studies like M.Sc. in Data Science, AI, or certifications in machine learning and business analytics to enhance their expertise.",
    "This program is ideal for students interested in problem-solving, predictive modeling, and leveraging data to drive innovation and business growth in the digital era."
  ],
  "ug/sct/bsc-it": [
    "Bachelor of Science in Information Technology (B.Sc. IT) is an undergraduate program that focuses on the study of computing, software development, networking, data management, and cybersecurity. The course is designed to equip students with technical and analytical skills to solve real-world IT challenges and drive innovation in the digital era.",
    "The curriculum covers programming languages, database management, web development, cloud computing, artificial intelligence, cybersecurity, and IT infrastructure. Students gain hands-on experience through practical labs, projects, and internships, making them industry-ready professionals.",
    "Graduates of B.Sc. IT can pursue careers in software development, system administration, IT consulting, cybersecurity, data analytics, and cloud computing. They can also advance their education through M.Sc. IT, MCA, or certifications like AWS, CCNA, and ethical hacking to specialize in various IT domains.",
    "This program is ideal for individuals passionate about technology, problem-solving, and innovation in the rapidly evolving IT industry."
  ],
  "ug/sct/bsc-ca": [
    "Bachelor of Science (B.Sc.) in Computer Applications is an undergraduate program that blends computer science principles with practical application development. This course is designed to provide students with a strong foundation in programming, software development, database management, networking, and system analysis.",
    "The curriculum includes core subjects such as Data Structures, Web Development, Operating Systems, Cloud Computing, Cybersecurity, Artificial Intelligence, and Mobile Application Development. Students gain hands-on experience through practical labs, projects, and internships, preparing them for the rapidly evolving tech industry.",
    "Graduates of this program can pursue careers in software development, IT consulting, system administration, web and mobile application development, cybersecurity, and data analytics. They can also opt for higher studies such as M.Sc. in Computer Science, MCA, MBA (IT), or professional certifications like AWS, Google Cloud, or Microsoft certifications.",
    "This course is ideal for students who are passionate about technology, coding, and problem-solving and want to build a career in the dynamic field of computer applications and software development."
  ],
  "ug/baf": [
    "The Bachelor of Commerce (B.Com) in Accounting & Finance is an undergraduate program designed to provide students with a strong foundation in financial management, accounting principles, and business operations. This course equips students with technical knowledge, analytical skills, and financial expertise required in the corporate and financial sectors.",
    "The curriculum covers key subjects such as financial accounting, cost accounting, taxation, auditing, financial management, business law, economics, and investment analysis. It prepares students for careers in banking, taxation, auditing, corporate finance, investment management, and financial consulting.",
    "Graduates of this program can pursue professional courses like CA (Chartered Accountancy), CFA (Chartered Financial Analyst), ACCA, CPA, or MBA in Finance to further enhance their career prospects. With increasing demand for financial experts, B.Com (Accounting & Finance) serves as a gateway to a wide range of opportunities in both corporate and government sectors."
  ],
  "ug/bfm": [
    "Bachelor of Commerce in Financial Markets (B.Com FM) is an undergraduate program that focuses on the study of financial markets, investments, banking, risk management, and stock trading. This course provides students with a strong foundation in financial concepts, market operations, and economic policies that influence global and domestic financial systems.",
    "The curriculum includes subjects like financial accounting, investment analysis, financial management, risk management, corporate finance, stock market operations, and regulatory frameworks. Students gain practical exposure to financial instruments, stock exchanges, and trading strategies, preparing them for dynamic roles in the financial sector.",
    "Graduates of B.Com in Financial Markets can pursue careers in banking, investment banking, stockbroking, wealth management, financial consulting, and corporate finance. They can also opt for further studies such as MBA (Finance), CFA, FRM, or other professional certifications to enhance their expertise.",
    "This program is ideal for students interested in financial markets, investment strategies, and economic trends, preparing them for a rewarding career in the finance industry."
  ],
  "pg/mcom-aa": [
    "Master of Commerce (M.Com) in Advanced Accountancy is a postgraduate program designed for students who wish to specialize in financial and accounting principles. This course provides in-depth knowledge of accounting standards, taxation, auditing, financial management, cost accounting, and corporate governance.",
    "The program focuses on advanced financial reporting, analysis, and decision-making, equipping students with the necessary skills to handle complex accounting tasks in various industries. It also emphasizes research methodologies, strategic financial planning, and regulatory compliance, preparing graduates for roles in corporate finance, banking, taxation, auditing, and consultancy.",
    "M.Com in Advanced Accountancy is an ideal choice for students who want to pursue careers as Chartered Accountants (CA), Certified Management Accountants (CMA), Cost Accountants, Tax Consultants, Financial Analysts, or Academicians. The course also serves as a strong foundation for those planning to pursue Ph.D. or professional certifications like ACCA, CFA, and CPA.",
    "With a blend of theoretical and practical applications, this program develops analytical, problem-solving, and decision-making abilities, making graduates highly valuable in the financial and business sectors."
  ],
  "pg/mcom-bf": [
    "Master of Commerce (M.Com) in Banking & Finance is a postgraduate program designed to provide advanced knowledge in banking, financial management, investment strategies, and risk assessment. The course equips students with expertise in financial markets, monetary policies, corporate finance, and banking regulations, preparing them for high-level roles in the financial sector.",
    "The curriculum includes key subjects such as financial accounting, banking laws, international finance, risk management, investment analysis, and financial institutions management. It focuses on developing analytical and decision-making skills required for managing financial operations efficiently.",
    "Graduates of M.Com in Banking & Finance can explore career opportunities in commercial and investment banking, financial consulting, risk management, stock markets, corporate finance, and government financial institutions. They can also pursue certifications like CFA, FRM, or Ph.D. for further specialization.",
    "This program is ideal for students looking to build a career in finance, banking, investment management, and financial planning, offering a strong foundation for leadership roles in the financial industry."
  ],
  "pg/msc-it": [
    "Master of Science (M.Sc.) in Information Technology is a postgraduate program that focuses on advanced concepts in computing, software development, data management, networking, and cybersecurity. This course is designed to equip students with in-depth technical expertise and problem-solving abilities required in the rapidly evolving IT industry.",
    "The curriculum covers a broad range of subjects, including software engineering, database management, artificial intelligence, cloud computing, big data analytics, network security, and web technologies. Through hands-on projects, research, and real-world case studies, students gain practical experience in designing, developing, and managing IT solutions.",
    "Graduates of M.Sc. IT can pursue careers as software developers, data analysts, cybersecurity experts, IT consultants, system architects, and network administrators in industries such as finance, healthcare, education, and e-commerce. Additionally, they can opt for further research or doctoral studies in specialized IT fields.",
    "This program is ideal for individuals who seek to enhance their technical knowledge, stay updated with the latest technological trends, and build a rewarding career in the field of information technology."
  ],
  "pg/mcom-bm": [
    "The Master of Commerce (M.Com) in Business Management is a postgraduate program designed to provide advanced knowledge and expertise in the field of business administration and management. This program focuses on developing strategic thinking, leadership skills, and analytical abilities essential for managing businesses effectively in a competitive global environment.",
    "The curriculum covers key subjects such as corporate governance, financial management, human resource management, marketing strategies, organizational behavior, business ethics, and entrepreneurship development. Through case studies, research projects, and practical applications, students gain a deeper understanding of business dynamics and decision-making processes.",
    "Graduates of M.Com in Business Management can pursue careers in corporate leadership, financial consulting, marketing management, human resource management, entrepreneurship, and academia. The program also provides a strong foundation for further studies such as Ph.D., Chartered Accountancy (CA), and MBA specialization programs.",
    "This course is ideal for students who seek to enhance their business acumen, develop managerial competencies, and take on leadership roles in various industries."
  ],
  "pg/msf": [
    "The Master of Science (M.Sc.) in Finance is a postgraduate program designed to provide advanced knowledge in financial analysis, investment management, risk assessment, and corporate finance. This program focuses on equipping students with strong analytical and quantitative skills essential for making strategic financial decisions in dynamic business environments.",
    "The curriculum typically includes subjects like financial markets, portfolio management, derivatives, econometrics, financial modeling, corporate valuation, and international finance. It integrates theoretical concepts with practical applications, preparing students for high-level roles in the financial sector.",
    "Graduates of M.Sc. in Finance have diverse career opportunities in investment banking, asset management, financial consulting, risk analysis, fintech, corporate finance, and financial research. The program also serves as a strong foundation for pursuing professional certifications such as CFA (Chartered Financial Analyst), FRM (Financial Risk Manager), and CFP (Certified Financial Planner).",
    "This degree is ideal for individuals who have a keen interest in finance, investment strategies, and financial risk management and aspire to build a career in the global financial industry."
  ],
  "phd/be": [
    "A Ph.D. in Business Economics is an advanced research-oriented program that focuses on the intersection of business practices and economic principles. This doctoral degree equips scholars with a deep understanding of economic theories, quantitative methods, and their applications in business decision-making, policy formulation, and market analysis.",
    "The program covers areas such as microeconomics, macroeconomics, econometrics, corporate finance, industrial organization, international trade, and behavioral economics. It emphasizes empirical research and data analysis to solve complex business and economic challenges.",
    "Candidates pursuing a Ph.D. in Business Economics are required to conduct original research, contributing to academic literature and practical applications in industries such as banking, consulting, government policy-making, international organizations, and academia. Graduates often work as economists, policy analysts, business consultants, or professors in leading institutions worldwide.",
    "This program is ideal for individuals with a strong analytical mindset who are passionate about economic research, business strategy, and policy development."
  ]
};

for (const [coursePath, paragraphs] of Object.entries(updates)) {
  const filePath = path.join(process.cwd(), 'src/app/programmes', coursePath, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if introductionContent is already passed to CourseTemplate
    if (!content.includes('introductionContent=')) {
      const introNode = `<>\n${paragraphs.map(p => `        <p className="mb-4">${p.replace(/'/g, "&apos;")}</p>`).join('\n')}\n      </>`;
      
      // Inject introductionContent prop
      content = content.replace(
        '<CourseTemplate ', 
        `<CourseTemplate \n      introductionContent={\n        ${introNode.split('\\n').join('\n        ')}\n      }`
      );
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${coursePath}`);
    } else {
        console.log(`Skipped ${coursePath}, already updated`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
}
