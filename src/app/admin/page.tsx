import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | MCC Digital Experience',
  description: 'Admin dashboard for MCC Digital Experience platform',
};

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#123B6D] mb-2 font-heading">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back. Here is an overview of your platform.</p>
        </div>
        <div className="hidden sm:block">
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            System Online
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Students</p>
          <p className="text-3xl font-bold text-[#123B6D]">4,521</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-gray-500 mb-1">Faculty Members</p>
          <p className="text-3xl font-bold text-[#123B6D]">134</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-gray-500 mb-1">Active Notices</p>
          <p className="text-3xl font-bold text-[#123B6D]">28</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-gray-500 mb-1">Pending Inquiries</p>
          <p className="text-3xl font-bold text-[#123B6D]">15</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {[
                { action: 'New admission query received', time: '10 mins ago' },
                { action: 'Updated examination timetable', time: '1 hour ago' },
                { action: 'Uploaded new gallery images', time: '3 hours ago' },
                { action: 'Added notice for holiday', time: 'Yesterday' },
              ].map((item, idx) => (
                <li key={idx} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">{item.action}</p>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#123B6D] hover:bg-[#0a2342] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#123B6D] transition-colors">
                Publish New Notice
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#123B6D] transition-colors">
                Manage Users
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#123B6D] transition-colors">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
