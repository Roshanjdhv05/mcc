import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'M.Sc. Finance | Mulund College of Commerce (AUTONOMOUS)',
  description: 'Master of Science (Finance) at Mulund College of Commerce.',
};

import MSFPageClient from './MSFPageClient';

export default function MSFPage() {
  return <MSFPageClient />;
}
