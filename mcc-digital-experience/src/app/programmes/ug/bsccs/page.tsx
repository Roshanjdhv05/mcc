import type { Metadata } from 'next';
import { renderSyllabusTable } from '@/lib/syllabusData';
import BScCSPageClient from './BScCSPageClient';

export const metadata: Metadata = {
  title: 'B.Sc. CS | Mulund College of Commerce (AUTONOMOUS)',
  description: 'Bachelor of Science in Computer Science (B.Sc. CS) at Mulund College of Commerce. A rigorous computing degree focused on algorithms, software engineering, and artificial intelligence.',
};

export default function BScCSPage() {
  const syllabus = renderSyllabusTable('BSC_CS');
  return <BScCSPageClient syllabusContent={syllabus} />;
}
