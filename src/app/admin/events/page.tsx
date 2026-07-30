'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, X, CalendarDays, Globe, Home, BookOpen, LayoutGrid, ArrowLeft } from 'lucide-react';
import EventPublishForm from './EventPublishForm';
import EventsList from './EventsList';

export default function AdminEventsPage() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setShowForm(false);
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#123B6D] flex items-center justify-center">
                <CalendarDays size={16} className="text-white" />
              </div>
              <div>
                <h1 className="font-black text-gray-900 text-base leading-none">Events Publication</h1>
                <p className="text-xs text-gray-400 mt-0.5">Publish events across the website</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#123B6D] hover:bg-[#0d2d54] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
          >
            <Plus size={16} /> Publish New Event
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Publish Target Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Globe size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">Events Gallery</p>
              <p className="text-xs text-gray-500">/students-corner/gallery</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Home size={18} className="text-yellow-600" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">Homepage Latest</p>
              <p className="text-xs text-gray-500">Latest in MCC section</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <BookOpen size={18} className="text-green-600" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">Academic Calendar</p>
              <p className="text-xs text-gray-500">Home + full calendar page</p>
            </div>
          </div>
        </div>

        {/* Form Slide-in Panel */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            {/* Panel */}
            <div className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#123B6D] rounded-lg flex items-center justify-center">
                    <Plus size={15} className="text-white" />
                  </div>
                  <h2 className="font-black text-gray-900">Publish New Event</h2>
                </div>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 flex-1">
                <EventPublishForm onSuccess={handleSuccess} />
              </div>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <LayoutGrid size={16} className="text-[#123B6D]" />
              <h2 className="font-bold text-gray-900">All Published Events</h2>
            </div>
            <button
              onClick={() => setRefreshKey(k => k + 1)}
              className="text-xs text-[#123B6D] font-semibold hover:underline"
            >
              Refresh
            </button>
          </div>
          <EventsList refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}
