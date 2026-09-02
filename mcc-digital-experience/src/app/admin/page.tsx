'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Shield, LogOut, Lock, User, ArrowRight,
  Bell, CalendarDays, FileText, GraduationCap,
  Image as ImageIcon, LayoutDashboard, ChevronRight
} from 'lucide-react';

// ─── Same manager components as superadmin ───────────────────────────────────
import NoticeForm from '@/app/superadmin/NoticeForm';
import NoticeList from '@/app/superadmin/NoticeList';
import HomeEventsManager from '@/app/superadmin/HomeEventsManager';
import HomeBannerManager from '@/app/superadmin/HomeBannerManager';
import ProgrammesManagerV2 from '@/app/superadmin/ProgrammesManagerV2';
import CalendarManager from '@/app/superadmin/CalendarManager';
import StudentsCornerManager from '@/app/superadmin/StudentsCornerManager';
import WallOfFameManager from '@/app/superadmin/WallOfFameManager';
import StatutoryBodiesManager from '@/app/superadmin/StatutoryBodiesManager';
import JrCollegeManager from '@/app/superadmin/JrCollegeManager';
import ExaminationManager from '@/app/superadmin/ExaminationManager';
import ResearchManager from '@/app/superadmin/ResearchManager';
import IllustriousAlumniManager from '@/app/superadmin/IllustriousAlumniManager';
import NewsAnnouncementsManager from '@/app/superadmin/NewsAnnouncementsManager';
import { Notice } from '@/lib/noticeTypes';

const ALL_TABS: { key: string; label: string; icon: React.ReactNode; description: string }[] = [
  { key: 'notice',               label: 'Notice System',          icon: <Bell size={22} />,           description: 'Create and manage notices' },
  { key: 'home-events',          label: 'Events Publication',      icon: <ImageIcon size={22} />,       description: 'Manage homepage events' },
  { key: 'home-banners',         label: 'Homepage Banners',        icon: <ImageIcon size={22} />,       description: 'Manage homepage banners' },
  { key: 'calendar-management',  label: 'Calendar Management',     icon: <CalendarDays size={22} />,    description: 'Manage academic calendar' },
  { key: 'examination',          label: 'Examination Manager',     icon: <FileText size={22} />,        description: 'Manage exam documents' },
  { key: 'programme-management', label: 'Programme Management',    icon: <GraduationCap size={22} />,   description: 'Manage programme data' },
  { key: 'students-corner',      label: 'Students Corner',         icon: <LayoutDashboard size={22} />, description: 'Manage student corner content' },
  { key: 'research',             label: 'Research Manager',        icon: <FileText size={22} />,        description: 'Manage research data' },
  { key: 'wall-of-fame',         label: 'Wall of Fame',            icon: <LayoutDashboard size={22} />, description: 'Manage wall of fame' },
  { key: 'illustrious-alumni',   label: 'Illustrious Alumni',      icon: <GraduationCap size={22} />,   description: 'Manage alumni entries' },
  { key: 'statutory-bodies',     label: 'Statutory Bodies',        icon: <FileText size={22} />,        description: 'Manage statutory bodies' },
  { key: 'degree-programmes',    label: 'Degree Programmes',       icon: <FileText size={22} />,        description: 'Manage degree programmes' },
  { key: 'jr-college',           label: 'Jr College',              icon: <GraduationCap size={22} />,   description: 'Manage Jr College content' },
  { key: 'news',                 label: 'News & Announcements',    icon: <Bell size={22} />,            description: 'Manage news & announcements' },
];

type Subadmin = {
  id: string;
  name: string;
  username: string;
  allowed_tabs: string[];
};

// ─── Content renderer ─────────────────────────────────────────────────────────
function ModuleContent({ tabKey, allowedTabs }: { tabKey: string; allowedTabs: string[] }) {
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  // Extract programme slugs: 'programme-management:bcom' → 'bcom'
  const allowedProgSlugs = allowedTabs
    .filter(t => t.startsWith('programme-management:'))
    .map(t => t.split(':')[1]);

  if (tabKey === 'notice') {
    return (
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Notice Management</h2>
            <p className="text-sm text-gray-500">Create, schedule, and manage all notices</p>
          </div>
          {!showNoticeForm && !editingNotice ? (
            <button onClick={() => setShowNoticeForm(true)} className="flex items-center gap-2 bg-[#123B6D] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0d2d54] transition-colors">
              + New Notice
            </button>
          ) : (
            <button onClick={() => { setShowNoticeForm(false); setEditingNotice(null); }} className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
              ✕ {editingNotice ? 'Cancel Edit' : 'Close Form'}
            </button>
          )}
        </div>
        {showNoticeForm && !editingNotice && (
          <div className="mb-6"><NoticeForm onSuccess={() => setShowNoticeForm(false)} onCancel={() => setShowNoticeForm(false)} /></div>
        )}
        {editingNotice && (
          <div className="mb-6"><NoticeForm initialData={editingNotice} onSuccess={() => setEditingNotice(null)} onCancel={() => setEditingNotice(null)} /></div>
        )}
        <NoticeList onEdit={(notice) => { setShowNoticeForm(false); setEditingNotice(notice); }} />
      </div>
    );
  }
  if (tabKey === 'home-events')         return <HomeEventsManager />;
  if (tabKey === 'home-banners')         return <HomeBannerManager />;
  if (tabKey === 'calendar-management')  return <CalendarManager />;
  if (tabKey === 'examination')          return <ExaminationManager />;
  if (tabKey === 'programme-management') return <Suspense fallback={<Loading />}><ProgrammesManagerV2 allowedSlugs={allowedProgSlugs.length > 0 ? allowedProgSlugs : undefined} /></Suspense>;
  if (tabKey === 'students-corner')      return <Suspense fallback={<Loading />}><StudentsCornerManager /></Suspense>;
  if (tabKey === 'research')             return <ResearchManager />;
  if (tabKey === 'wall-of-fame')         return <Suspense fallback={<Loading />}><WallOfFameManager /></Suspense>;
  if (tabKey === 'illustrious-alumni')   return <Suspense fallback={<Loading />}><IllustriousAlumniManager /></Suspense>;
  if (tabKey === 'statutory-bodies')     return <Suspense fallback={<Loading />}><StatutoryBodiesManager /></Suspense>;
  if (tabKey === 'jr-college')           return <JrCollegeManager />;
  if (tabKey === 'news')                 return <NewsAnnouncementsManager />;
  return <div className="text-gray-400 py-20 text-center">Module not found.</div>;
}

function Loading() {
  return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#123B6D]" /></div>;
}

// ─── Main page content ────────────────────────────────────────────────────────
function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [subadmin, setSubadmin] = useState<Subadmin | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>(tabParam);

  // Login form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hydrate session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('mccSubadmin');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Subadmin;
        setSubadmin(parsed);
      } catch { localStorage.removeItem('mccSubadmin'); }
    }
    setIsCheckingAuth(false);
  }, []);

  // Keep URL in sync with active tab and track last used module
  useEffect(() => {
    if (subadmin && activeTab) {
      router.replace(`/admin?tab=${activeTab}`);
      // Fire-and-forget update to DB
      supabase.from('mcc_subadmins').update({ last_active_tab: activeTab }).eq('id', subadmin.id).then();
    }
  }, [activeTab, subadmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error: dbErr } = await supabase
      .from('mcc_subadmins')
      .select('id, name, username, allowed_tabs, is_active')
      .eq('username', username.trim())
      .eq('password', password)
      .single();

    if (dbErr || !data) {
      setError('Invalid username or password.');
      setLoading(false);
      return;
    }
    if (!data.is_active) {
      setError('Your account is disabled. Please contact the administrator.');
      setLoading(false);
      return;
    }

    // Update last login
    await supabase.from('mcc_subadmins').update({ last_login_at: new Date().toISOString() }).eq('id', data.id);

    const sub: Subadmin = { id: data.id, name: data.name, username: data.username, allowed_tabs: data.allowed_tabs };
    setSubadmin(sub);
    localStorage.setItem('mccSubadmin', JSON.stringify(sub));
    setLoading(false);
    setActiveTab(null); // show dashboard first
    router.replace('/admin');
  };

  const handleLogout = () => {
    setSubadmin(null);
    localStorage.removeItem('mccSubadmin');
    setUsername('');
    setPassword('');
    setActiveTab(null);
    router.replace('/admin');
  };

  if (isCheckingAuth) return <Loading />;

  // ─── Dashboard (module grid) ─────────────────────────────────────────────
  if (subadmin && !activeTab) {
    const allowedModules = ALL_TABS.filter(t => 
      subadmin.allowed_tabs.includes(t.key) || 
      (t.key === 'programme-management' && subadmin.allowed_tabs.some(a => a.startsWith('programme-management:')))
    );
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-[#123B6D] text-white px-6 py-3.5 flex items-center justify-between shadow-md sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4A017] rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Admin Portal</h1>
              <p className="text-white/60 text-[11px]">Welcome back, {subadmin.name}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
            <LogOut size={15} /> Logout
          </button>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Your Dashboard</h2>
            <p className="text-gray-500 mt-1 text-sm">Select a module to manage.</p>
          </div>

          {allowedModules.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
              <Shield size={40} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-semibold">No modules assigned yet</p>
              <p className="text-gray-400 text-sm mt-1">Please contact your administrator to get access.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {allowedModules.map(mod => (
                <button
                  key={mod.key}
                  onClick={() => setActiveTab(mod.key)}
                  className="group bg-white rounded-2xl border border-[#E2E8F0] p-5 text-left hover:shadow-md hover:border-[#123B6D]/30 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#123B6D]/10 flex items-center justify-center mb-4 text-[#123B6D] group-hover:bg-[#123B6D] group-hover:text-white transition-colors">
                    {mod.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-[#123B6D] transition-colors">{mod.label}</h3>
                  <p className="text-xs text-gray-400">{mod.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-[#123B6D] opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <ChevronRight size={13} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  // ─── Module view ──────────────────────────────────────────────────────────
  if (subadmin && activeTab) {
    const isAllowed = subadmin.allowed_tabs.includes(activeTab) || 
      (activeTab === 'programme-management' && subadmin.allowed_tabs.some(a => a.startsWith('programme-management:')));
    const modInfo = ALL_TABS.find(t => t.key === activeTab);

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header */}
        <header className="bg-[#123B6D] text-white px-6 py-3.5 flex items-center justify-between shadow-md sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab(null)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold"
            >
              ←
            </button>
            <div>
              <h1 className="font-bold text-base leading-tight">{modInfo?.label ?? 'Module'}</h1>
              <p className="text-white/60 text-[11px]">Admin Portal — {subadmin.name}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
            <LogOut size={15} /> Logout
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
          {!isAllowed ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Shield size={40} className="text-red-400 mb-4" />
              <p className="text-gray-700 font-semibold text-lg">Access Denied</p>
              <p className="text-gray-400 text-sm mt-1">You do not have permission to view this module.</p>
              <button onClick={() => setActiveTab(null)} className="mt-6 px-6 py-2.5 bg-[#123B6D] text-white rounded-xl text-sm font-bold">
                Back to Dashboard
              </button>
            </div>
          ) : (
            <ModuleContent tabKey={activeTab} allowedTabs={subadmin.allowed_tabs} />
          )}
        </main>
      </div>
    );
  }

  // ─── Login Page ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#123B6D] rounded-2xl flex items-center justify-center shadow-lg">
            <Shield size={32} className="text-[#D4A017]" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Portal</h2>
        <p className="mt-2 text-center text-sm text-gray-500">Sign in with your assigned credentials</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100">
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm font-medium text-center border border-red-100">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="admin-username" className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="admin-username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123B6D]/20 focus:border-[#123B6D] text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#123B6D] hover:bg-[#0d2d54] transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <><span>Sign In</span><ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#123B6D]" /></div>}>
      <AdminContent />
    </Suspense>
  );
}
