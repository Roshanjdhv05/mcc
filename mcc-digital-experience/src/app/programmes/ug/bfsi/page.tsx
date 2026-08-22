import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BFSI | MCC Digital Experience Platform',
  description: 'Bachelor of Commerce (Banking, Financial Services and Insurance) at Mulund College of Commerce.',
};

import BFSIPageClient from './BFSIPageClient';

export default function CoursePage() {
  return <BFSIPageClient />;
}
