import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchPage from './SearchPage';

export const metadata: Metadata = {
  title: 'Search | MCC Digital Experience Platform',
  description: 'Search across programmes, NAAC documents, notices, forms, faculty and more at Mulund College of Commerce.',
};

export default function SearchRoute() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-[#123B6D] text-lg font-semibold">Loading search…</div>
      </div>
    }>
      <SearchPage />
    </Suspense>
  );
}
