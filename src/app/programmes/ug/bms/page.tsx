import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMS | MCC Digital Experience Platform',
  description: 'Bachelor of Management Studies (BMS) at Mulund College of Commerce.',
};

import BMSPageClient from './BMSPageClient';

export default function BMSPage() {
  return <BMSPageClient />;
}
