import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'M.Com (Advanced Accountancy) | MCC Digital Experience Platform',
  description: 'Master of Commerce (Advanced Accountancy) at Mulund College of Commerce.',
};

import MComAAPageClient from './MComAAPageClient';

export default function CoursePage() {
  return <MComAAPageClient />;
}
