import type { Metadata } from 'next';
import { renderSyllabusTable } from '@/lib/syllabusData';

export const metadata: Metadata = {
  title: 'BSc Data Science | MCC Digital Experience Platform',
  description: 'Bachelor of Science in Data Science at Mulund College of Commerce.',
};

import DSPageClient from './DSPageClient';

export default function DSPage() {
  const syllabus = renderSyllabusTable('BSC_DS');

  return <DSPageClient syllabusContent={syllabus} />;
}
