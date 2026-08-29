'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import {
  TrendingUp, Users, Eye, Clock, Globe,
  ArrowUpRight, ArrowDownRight, RefreshCw, Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// ─── Types ───────────────────────────────────────────────────────────────────
type DayRow  = { day: string; visitors: number; pageViews: number };
type MonthRow = { month: string; visitors: number; pageViews: number };
type PageRow  = { page: string; views: number; change: number };

const deviceData = [
  { name: 'Mobile',  value: 62, color: '#123B6D' },
  { name: 'Desktop', value: 31, color: '#4C9BE8' },
  { name: 'Tablet',  value:  7, color: '#93C5FD' },
];

const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3">
      <p className="text-xs font-bold text-slate-600 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-xs font-semibold" style={{ color: p.color }}>
          {p.name}: <span className="text-slate-800">{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function OverviewDashboard() {
  const [view, setView]               = useState<'daily' | 'monthly'>('monthly');
  const [loading, setLoading]         = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  const [totalVisits, setTotalVisits]   = useState(0);
  const [totalViews, setTotalViews]     = useState(0);
  const [dailyData, setDailyData]       = useState<DayRow[]>([]);
  const [monthlyData, setMonthlyData]   = useState<MonthRow[]>([]);
  const [topPages, setTopPages]         = useState<PageRow[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // ── All-time totals ──────────────────────────────────────────────────
      const { data: all } = await supabase
        .from('page_analytics')
        .select('count');

      const total = (all ?? []).reduce((s: number, r: any) => s + (r.count || 0), 0);
      setTotalVisits(total);
      setTotalViews(Math.round(total * 2.8)); // rough page-views estimate

      // ── Daily data (last 7 days) ─────────────────────────────────────────
      const today = new Date();
      const sevenAgo = new Date(today);
      sevenAgo.setDate(today.getDate() - 6);
      const sevenAgoStr = sevenAgo.toISOString().split('T')[0];

      const { data: daily } = await supabase
        .from('page_analytics')
        .select('visit_date, count')
        .gte('visit_date', sevenAgoStr)
        .order('visit_date');

      // Aggregate by day-of-week
      const dayMap: Record<string, number> = {};
      (daily ?? []).forEach((r: any) => {
        const d = new Date(r.visit_date);
        const label = DAY_LABELS[d.getDay()];
        dayMap[label] = (dayMap[label] || 0) + r.count;
      });

      // Build last-7-day array in correct order
      const dayArr: DayRow[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const label = DAY_LABELS[d.getDay()];
        const v = dayMap[label] || 0;
        dayArr.push({ day: label, visitors: v, pageViews: Math.round(v * 2.8) });
      }
      setDailyData(dayArr);

      // ── Monthly data (last 8 months) ─────────────────────────────────────
      const eightMonthsAgo = new Date(today);
      eightMonthsAgo.setMonth(today.getMonth() - 7);
      eightMonthsAgo.setDate(1);
      const eightAgoStr = eightMonthsAgo.toISOString().split('T')[0];

      const { data: monthly } = await supabase
        .from('page_analytics')
        .select('visit_date, count')
        .gte('visit_date', eightAgoStr)
        .order('visit_date');

      const monthMap: Record<string, number> = {};
      (monthly ?? []).forEach((r: any) => {
        const d = new Date(r.visit_date);
        const label = MONTH_LABELS[d.getMonth()];
        monthMap[label] = (monthMap[label] || 0) + r.count;
      });

      const monthArr: MonthRow[] = [];
      for (let i = 7; i >= 0; i--) {
        const d = new Date(today);
        d.setMonth(today.getMonth() - i);
        const label = MONTH_LABELS[d.getMonth()];
        const v = monthMap[label] || 0;
        monthArr.push({ month: label, visitors: v, pageViews: Math.round(v * 2.8) });
      }
      setMonthlyData(monthArr);

      // ── Top pages (all-time, aggregated) ─────────────────────────────────
      const { data: pages } = await supabase
        .from('page_analytics')
        .select('path, count');

      const pageMap: Record<string, number> = {};
      (pages ?? []).forEach((r: any) => {
        pageMap[r.path] = (pageMap[r.path] || 0) + r.count;
      });

      // Also get last-30-days for change %
      const thirtyAgo = new Date(today);
      thirtyAgo.setDate(today.getDate() - 30);
      const { data: recent } = await supabase
        .from('page_analytics')
        .select('path, count')
        .gte('visit_date', thirtyAgo.toISOString().split('T')[0]);
      const prevMap: Record<string, number> = {};
      (recent ?? []).forEach((r: any) => {
        prevMap[r.path] = (prevMap[r.path] || 0) + r.count;
      });

      const sorted = Object.entries(pageMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([path, views]) => {
          const prev = prevMap[path] || 0;
          const change = prev > 0 ? Math.round(((views - prev) / prev) * 100) : 0;
          return { page: path, views, change };
        });
      setTopPages(sorted);

    } catch (e) {
      console.error('Analytics fetch error', e);
    } finally {
      setLoading(false);
      setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const chartData = view === 'daily' ? dailyData : monthlyData;
  const xKey = view === 'daily' ? 'day' : 'month';

  const statCards = [
    { label: 'Total Visitors',    value: totalVisits.toLocaleString(), sub: 'all-time', positive: true, color: '#123B6D', bg: '#EBF3FF',  icon: <Users size={20} /> },
    { label: 'Total Page Views',  value: totalViews.toLocaleString(),  sub: 'estimated', positive: true, color: '#0891B2', bg: '#E0F7FA', icon: <Eye size={20} /> },
    { label: 'Tracked Pages',     value: topPages.length.toString(),   sub: 'unique paths', positive: true, color: '#B45309', bg: '#FEF3C7', icon: <Clock size={20} /> },
    { label: 'Visits Today',      value: (dailyData[dailyData.length - 1]?.visitors ?? 0).toLocaleString(), sub: 'today', positive: true, color: '#059669', bg: '#D1FAE5', icon: <Globe size={20} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-sm text-gray-500">Real visitor analytics — powered by Supabase</p>
        </div>
        <button onClick={fetchData} disabled={loading}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#123B6D] transition-colors disabled:opacity-50">
          {loading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
          {lastUpdated ? `Updated ${lastUpdated}` : 'Loading…'}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl" style={{ background: card.bg, color: card.color }}>{card.icon}</div>
              <span className={`text-xs font-medium text-gray-400`}>{card.sub}</span>
            </div>
            <div>
              {loading
                ? <div className="h-8 w-20 bg-slate-100 rounded animate-pulse" />
                : <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              }
              <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Visitor Traffic Chart */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp size={16} className="text-[#123B6D]" />Visitor Traffic
            </h3>
            <p className="text-xs text-gray-400">Real visits tracked per day / month</p>
          </div>
          <div className="flex rounded-lg overflow-hidden border border-slate-200 text-xs font-semibold">
            <button onClick={() => setView('daily')}
              className={`px-3 py-1.5 transition-colors ${view === 'daily' ? 'bg-[#123B6D] text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Daily</button>
            <button onClick={() => setView('monthly')}
              className={`px-3 py-1.5 transition-colors ${view === 'monthly' ? 'bg-[#123B6D] text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Monthly</button>
          </div>
        </div>
        {loading ? (
          <div className="h-[260px] bg-slate-50 rounded-xl animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#123B6D" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#123B6D" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4C9BE8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4C9BE8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="visitors" name="Visitors"   stroke="#123B6D" strokeWidth={2} fill="url(#gV)" />
              <Area type="monotone" dataKey="pageViews" name="Page Views" stroke="#4C9BE8" strokeWidth={2} fill="url(#gP)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Top Pages */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Eye size={16} className="text-[#123B6D]" />Most Visited Pages
          </h3>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-slate-50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : topPages.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No visits tracked yet. Visit some pages first!</p>
          ) : (
            <div className="space-y-3">
              {topPages.map((p, i) => (
                <div key={p.page} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-300 w-4 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-700 truncate">{p.page}</span>
                      <div className="flex items-center gap-1.5 ml-2 shrink-0">
                        <span className="text-xs font-bold text-gray-800">{p.views.toLocaleString()}</span>
                        {p.change !== 0 && (
                          <span className={`text-[10px] font-bold flex items-center ${p.change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                            {p.change >= 0 ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                            {Math.abs(p.change)}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full transition-all duration-700"
                        style={{
                          width: `${topPages[0].views ? (p.views / topPages[0].views) * 100 : 0}%`,
                          background: `hsl(${215 - i * 12}, 60%, ${40 + i * 5}%)`,
                        }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Device Split */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Globe size={16} className="text-[#123B6D]" />Visitors by Device
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value">
                {deviceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-2">
            {deviceData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-gray-600 font-medium">{d.name}</span>
                </div>
                <span className="font-bold text-gray-800">{d.value}%</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-3">Device data requires UA parsing</p>
        </div>
      </div>

      {/* Daily Bar Chart */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-[#123B6D]" />Daily Visitors — Last 7 Days
        </h3>
        {loading ? (
          <div className="h-[180px] bg-slate-50 rounded-xl animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dailyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="visitors" name="Visitors" fill="#123B6D" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
