import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMS | Mulund College of Commerce (AUTONOMOUS)',
  description: 'Bachelor of Management Studies (BMS) at Mulund College of Commerce.',
};

import BMSPageClient from './BMSPageClient';

export default function BMSPage() {
  return <BMSPageClient />;
}
