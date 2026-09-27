import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';
import { adminService } from '../../services/adminService';
import { TrendingUp, DollarSign, Award, Shield, ArrowUpRight } from 'lucide-react';

export const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await adminService.getDashboardStats();
        if (res.success) {
          setData(res);
        }
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const formatPrice = (val) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
        <p className="text-slate-400 font-mono text-sm">Processing financial models...</p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const avgOrderValue =
    stats.totalBookings > 0 ? Math.round(stats.totalRevenue / stats.totalBookings) : 0;

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          Financial Intelligence
        </span>
        <h1 className="text-3xl font-black text-white mt-1">Revenue & Performance Analytics</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Historical growth trajectory, average transaction value, and fleet monetization.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <span className="text-xs font-semibold text-slate-400">Total Gross Realized Revenue</span>
          <p className="text-3xl font-black text-emerald-400 font-mono">
            {formatPrice(stats.totalRevenue || 0)}
          </p>
          <p className="text-[11px] text-slate-500">From verified card, UPI, and netbanking transactions</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <span className="text-xs font-semibold text-slate-400">Average Booking Value (AOV)</span>
          <p className="text-3xl font-black text-cyan-400 font-mono">
            {formatPrice(avgOrderValue)}
          </p>
          <p className="text-[11px] text-slate-500">Per reservation transaction across fleet</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <span className="text-xs font-semibold text-slate-400">Total Booking Volume</span>
          <p className="text-3xl font-black text-white font-mono">
            {stats.totalBookings || 0} Trips
          </p>
          <p className="text-[11px] text-slate-500">Completed, active, and upcoming rentals</p>
        </div>
      </div>

      {/* Monthly Revenue Comparison */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider">
              Six-Month Revenue Curve
            </h3>
            <p className="text-xs text-slate-400">Monthly gross sales across all exotic segments</p>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.monthlyRevenue || []}>
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `₹${val / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0c1017',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(value) => [formatPrice(value), 'Revenue']}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#00f0ff"
                strokeWidth={3}
                dot={{ r: 5, fill: '#00f0ff' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
