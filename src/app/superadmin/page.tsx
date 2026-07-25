'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, User, ShieldAlert, ArrowRight, LayoutDashboard, Bell, LogOut, Plus, X } from 'lucide-react';
import NoticeForm from './NoticeForm';
import NoticeList from './NoticeList';

const MARGIN_FIX = '-mt-[64px] md:-mt-[150px] lg:-mt-[185px] xl:-mt-[195px]';

function SuperAdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as 'overview' | 'notice';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const [activeTab, setActiveTab] = useState<'overview' | 'notice'>('overview');
  const [showNoticeForm, setShowNoticeForm] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    if (localStorage.getItem('mccSuperadmin') === 'true') {
      setIsLoggedIn(true);
    }
    setIsCheckingAuth(false);
  }, []);

  // Sync activeTab with URL param
  useEffect(() => {
    if (tabParam && (tabParam === 'overview' || tabParam === 'notice')) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: 'overview' | 'notice') => {
    setActiveTab(tab);
    setShowNoticeForm(false);
    router.push(`/superadmin?tab=${tab}`);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTimeout(() => {
      if (username === 'mccwebsite' && password === 'mccwebsite210726') {
        setIsLoggedIn(true);
        localStorage.setItem('mccSuperadmin', 'true');
        // Ensure URL param is set on login if missing
        if (!tabParam) router.push('/superadmin?tab=overview');
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('mccSuperadmin');
    setUsername('');
    setPassword('');
    setShowNoticeForm(false);
    setActiveTab('overview');
    router.push('/superadmin');
  };

  if (isCheckingAuth) {
    return <div className={`min-h-screen bg-slate-50 flex items-center justify-center ${MARGIN_FIX} relative z-50`}><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#123B6D]"></div></div>;
  }

  if (isLoggedIn) {
    return (
      <div className={`min-h-screen bg-slate-50 flex flex-col ${MARGIN_FIX} relative z-50`}>

        {/* ─── Header ─── */}
        <header className="bg-[#123B6D] text-white px-6 py-3.5 flex items-center justify-between shadow-md sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4A017] rounded-lg flex items-center justify-center">
              <ShieldAlert size={16} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Superadmin Portal</h1>
              <p className="text-white/60 text-[11px]">Mulund College of Commerce</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <LogOut size={15} /> Logout
          </button>
        </header>

        <div className="flex flex-1 min-h-0">
          {/* ─── Sidebar ─── */}
          <aside className="w-56 bg-white border-r border-[#E2E8F0] flex flex-col py-4 gap-1 shadow-sm flex-shrink-0">
            {([
              { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
              { key: 'notice', label: 'Notice System', icon: <Bell size={18} /> },
            ] as const).map(item => (
              <button
                key={item.key}
                onClick={() => handleTabChange(item.key)}
                className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeTab === item.key
                    ? 'bg-[#123B6D]/10 text-[#123B6D]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </aside>

          {/* ─── Main Content ─── */}
          <main className="flex-1 overflow-y-auto p-6">

            {/* ── Overview ── */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">Dashboard Overview</h2>
                <p className="text-sm text-gray-500 mb-6">Welcome back! Here's a quick summary of the Notice System.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Total Notices</p>
                    <p className="text-4xl font-bold text-[#123B6D]">–</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Active Notices</p>
                    <p className="text-4xl font-bold text-emerald-600">–</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Archived Notices</p>
                    <p className="text-4xl font-bold text-gray-400">–</p>
                  </div>
                </div>
                <div className="mt-6 bg-[#123B6D]/5 border border-[#123B6D]/10 rounded-2xl p-5">
                  <p className="text-sm text-[#123B6D] font-semibold mb-1">💡 Quick Tip</p>
                  <p className="text-sm text-gray-600">Head to <strong>Notice System</strong> to create, schedule, and manage all college notices. Notices with expired dates are automatically moved to the Archive.</p>
                </div>
              </div>
            )}

            {/* ── Notice System ── */}
            {activeTab === 'notice' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Notice Management</h2>
                    <p className="text-sm text-gray-500">Create, schedule, and manage all notices</p>
                  </div>
                  {!showNoticeForm ? (
                    <button
                      onClick={() => setShowNoticeForm(true)}
                      className="flex items-center gap-2 bg-[#123B6D] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors shadow-sm"
                    >
                      <Plus size={16} /> New Notice
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowNoticeForm(false)}
                      className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
                    >
                      <X size={16} /> Close Form
                    </button>
                  )}
                </div>

                {showNoticeForm && (
                  <div className="mb-6">
                    <NoticeForm
                      onSuccess={() => {
                        setShowNoticeForm(false);
                      }}
                      onCancel={() => setShowNoticeForm(false)}
                    />
                  </div>
                )}

                <NoticeList />
              </div>
            )}

          </main>
        </div>
      </div>
    );
  }

  // ─── Login Page ───
  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${MARGIN_FIX} relative z-50`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#123B6D] rounded-2xl flex items-center justify-center shadow-lg">
            <ShieldAlert size={32} className="text-[#D4A017]" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-[var(--font-heading)]">
          Superadmin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to manage the Notice System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-medium text-center border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username" name="username" type="text" autoComplete="username" required
                  value={username} onChange={e => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm"
                  placeholder="mccwebsite"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password" name="password" type="password" autoComplete="current-password" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#123B6D] hover:bg-[#0d2d54] focus:outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed group">
              {loading ? 'Signing in...' : (
                <><span>Sign in</span><ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SuperAdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#123B6D]"></div></div>}>
      <SuperAdminContent />
    </Suspense>
  );
}
