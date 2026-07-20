import type { Metadata } from 'next';
import { renderSyllabusTable } from '@/lib/syllabusData';

export const metadata: Metadata = {
  title: 'MSc IT | MCC Digital Experience Platform',
  description: 'Master of Science in Information Technology (MSc IT) at Mulund College of Commerce.',
};

import MScITPageClient from './MScITPageClient';

export default function MScITPage() {
  const syllabus = renderSyllabusTable('MSC_IT');

  return <MScITPageClient syllabusContent={syllabus} />;
}
