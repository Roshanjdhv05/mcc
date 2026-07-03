'use client';

import Link from 'next/link';
import { WifiOff, RotateCcw, Home } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-300 mb-6">
        <WifiOff size={40} />
      </div>
      
      <h1 className="text-3xl font-bold text-[#123B6D] font-[var(--font-heading)] mb-3">
        You're offline
      </h1>
      
      <p className="text-slate-500 max-w-sm mb-8 text-sm leading-relaxed">
        It seems you've lost your internet connection. Previously viewed pages and cached content are still available.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => {
            if (typeof window !== 'undefined') window.location.reload();
          }}
          className="bg-[#123B6D] hover:bg-[#0d2a4f] text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
        >
          <RotateCcw size={18} />
          Retry Connection
        </button>
        <Link 
          href="/"
          className="bg-white hover:bg-slate-50 text-[#123B6D] border border-slate-200 px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Home size={18} />
          Go Home
        </Link>
      </div>
    </div>
  );
}
