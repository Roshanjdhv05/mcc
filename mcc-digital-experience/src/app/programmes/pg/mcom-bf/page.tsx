import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'M.Com (Banking & Finance) | Mulund College of Commerce (AUTONOMOUS)',
  description: 'Master of Commerce (Banking & Finance) at Mulund College of Commerce.',
};

import MComBFPageClient from './MComBFPageClient';

export default function CoursePage() {
  return <MComBFPageClient />;
}
