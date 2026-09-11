require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const journalData = [
  {
    slug: 'about-journal',
    name: 'About the Journal',
    category: 'Research Journal',
    display_order: 15,
    content: {
      about: "The MCC Research Journal is a peer-reviewed, bi-annual academic journal dedicated to publishing high-quality research papers, review articles, and case studies across multidisciplinary domains. It serves as an intellectual platform for academicians, researchers, and students to disseminate innovative research findings and scholarly insights.",
      objectives_activities: [
        { type: "point", content: "Frequency: Bi-annual" },
        { type: "point", content: "Format: Print & Online" },
        { type: "point", content: "Peer Review: Double-blind" },
        { type: "point", content: "ISSN: 2349-8250" }
      ]
    }
  },
  {
    slug: 'advisory-board',
    name: 'Advisory Board',
    category: 'Research Journal',
    display_order: 16,
    content: {
      members: [
        { name: "Prof D T Shirke", role: "Vice Chancellor, Warna University (Former VC, Shivaji University, Kolhapur)" },
        { name: "Dr Apoorva Palkar", role: "VC, Ratan Tata Maharashtra State Skill University" },
        { name: "Prof Varadraj Bapat", role: "Director, Shailendra Mehta Institute of Management, IIT Bombay" },
        { name: "Shri. Satish Marathe", role: "Director, RBI" }
      ]
    }
  },
  {
    slug: 'board-of-editors',
    name: 'Board of Editors',
    category: 'Research Journal',
    display_order: 17,
    content: {
      committee: [
        { name: "Prof Dr Minal Mapuskar", role: "Editor in Chief – Principal, Mulund College of Commerce" },
        { name: "Dr Rajashri Deshpande", role: "Managing Editor" },
        { name: "Prof. Dr Kedar Marulkar", role: "Head of Dept – Commerce, Shivaji University Kolhapur" },
        { name: "CMA Dr Kinnerry Thakkar", role: "Head of Dept – Commerce, University of Mumbai" },
        { name: "Dr. Swapnali Mahadik", role: "Assistant Professor, MCA, DES's NMITD" },
        { name: "Dr Arjun Lakhe", role: "Member" },
        { name: "Dr Kanchana Sattur", role: "Member" },
        { name: "Dr Jyotika Chheda", role: "Member" },
        { name: "Dr Shayeree Ghosh", role: "Member" }
      ]
    }
  },
  {
    slug: 'review-committee',
    name: 'Review Committee',
    category: 'Research Journal',
    display_order: 18,
    content: {
      members: [
        { name: "CMA Dr Kinnerry Thakkar", role: "Head of Dept – Commerce, University of Mumbai" },
        { name: "Prof. Dr Kedar Marulkar", role: "Head of Dept – Commerce, Shivaji University Kolhapur" },
        { name: "Dr. Swapnali Mahadik", role: "Assistant Professor, MCA, DES's NMITD" }
      ]
    }
  },
  {
    slug: 'guidelines-submission',
    name: 'Guidelines for Paper Submission',
    category: 'Research Journal',
    display_order: 19,
    content: {
      guidelines: [
        { title: "Originality & Plagiarism", content: "Submitted papers must be original, unpublished work not currently under consideration by any other journal. Plagiarism should be strictly under 10%." },
        { title: "Manuscript Formatting", content: "Manuscripts should be typed in MS Word, Times New Roman font (12 pt size, 1.5 line spacing) with standard 1-inch margins on all sides." },
        { title: "Abstract & Keywords", content: "An abstract of 150–250 words summarizing the research objective, methodology, and key findings should be provided along with 4–6 relevant keywords." },
        { title: "Citation & Reference Style", content: "All citations and references must adhere strictly to the APA 7th Edition style format." },
        { title: "Submission Process", content: "Authors should email their full paper soft copy (in .doc / .docx format) to researchjournal@mccmulund.ac.in along with author details." }
      ]
    }
  },
  {
    slug: 'journal-contact',
    name: 'Contact',
    category: 'Research Journal',
    display_order: 20,
    content: {
      address: "Research & Development Cell, Mulund College of Commerce (Autonomous), Sarojini Naidu Road, Mulund (West), Mumbai - 400080, Maharashtra, India",
      email: "researchjournal@mccmulund.ac.in",
      secondary_email: "mccresearchcell@gmail.com",
      phone: "+91 22 2560 0017 / +91 22 2565 0257",
      timings: "Monday to Saturday: 10:00 AM – 5:00 PM"
    }
  }
];

async function updateDb() {
  console.log("Upserting Research Journal sections into mcc_research...");
  for (const item of journalData) {
    const { data, error } = await supabase
      .from('mcc_research')
      .upsert(item, { onConflict: 'slug' })
      .select();
    if (error) {
      console.error(`Error upserting ${item.slug}:`, error.message);
    } else {
      console.log(`Successfully updated ${item.slug}`);
    }
  }
}

updateDb();
