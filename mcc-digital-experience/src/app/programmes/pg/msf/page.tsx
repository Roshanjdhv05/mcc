import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'M.Sc. Finance | MCC Digital Experience Platform',
  description: 'Master of Science (Finance) at Mulund College of Commerce.',
};

import MSFPageClient from './MSFPageClient';

export default function MSFPage() {
  return <MSFPageClient />;
}
