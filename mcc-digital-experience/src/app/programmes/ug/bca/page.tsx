import type { Metadata } from 'next';
import { renderSyllabusTable } from '@/lib/syllabusData';

export const metadata: Metadata = {
  title: 'BSc Computer Applications | MCC Digital Experience Platform',
  description: 'Bachelor of Science in Computer Applications (BSc CA) at Mulund College of Commerce.',
};

import BCAPageClient from './BCAPageClient';

export default function BCAPage() {
  const syllabus = renderSyllabusTable('BCA');

  return <BCAPageClient syllabusContent={syllabus} />;
}
