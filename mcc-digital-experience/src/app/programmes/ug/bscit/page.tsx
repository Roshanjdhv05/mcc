import type { Metadata } from 'next';
import { renderSyllabusTable } from '@/lib/syllabusData';

export const metadata: Metadata = {
  title: 'BSc IT | MCC Digital Experience Platform',
  description: 'Bachelor of Science in Information Technology (BSc IT) at Mulund College of Commerce.',
};

import BScITPageClient from './BScITPageClient';

export default function BScITPage() {
  const syllabus = renderSyllabusTable('BSC_IT');

  return <BScITPageClient syllabusContent={syllabus} />;
}
