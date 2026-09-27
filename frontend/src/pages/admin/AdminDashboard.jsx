import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { adminService } from '../../services/adminService';
import {
  Car,
  Users,
  CalendarCheck,
  TrendingUp,
  Zap,
  ArrowUpRight,
  Shield,
} from 'lucide-react';

const PIE_COLORS = ['#ff334b', '#00f0ff', '#10b981', '#f59e0b', '#6b7280'];

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await adminService.getDashboardStats();
        if (res.success) {
          setData(res);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatPrice = (val) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
        <p className="text-slate-400 font-mono text-sm">Aggregating enterprise telemetry...</p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const statusPieData = data?.statusCounts
    ? Object.keys(data.statusCounts).map((key) => ({
        name: key.toUpperCase(),
        value: data.statusCounts[key],
      }))
    : [];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Executive Analytics
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Platform Control Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time fleet utilization, booking pipelines, and revenue metrics.
          </p>
        </div>

        <Link
          to="/admin/cars/new"
          className="px-4 py-2.5 rounded-xl bg-cyan-500 text-dark-950 font-bold text-xs shadow-glow-cyan hover:brightness-110 transition-all self-start sm:self-auto flex items-center gap-1.5"
        >
          <Car className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </Link>
      </div>

      {/* 5 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Fleet</span>
            <Car className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{stats.totalCars || 0}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Users</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{stats.totalUsers || 0}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Bookings</span>
            <CalendarCheck className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{stats.totalBookings || 0}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Active Rentals</span>
            <Zap className="w-4 h-4 text-brand-red animate-pulse" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{stats.activeRentals || 0}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Gross Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-emerald-400 font-mono">
            {formatPrice(stats.totalRevenue || 0)}
          </p>
        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Revenue Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              Monthly Revenue Growth
            </h3>
            <span className="text-xs font-mono text-cyan-400">Completed Bookings</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.monthlyRevenue || []}>
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
                <Bar dataKey="revenue" fill="#00f0ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Status Donut Chart (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
            Booking Status Distribution
          </h3>

          <div className="h-64 w-full flex items-center justify-center">
            {statusPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0c1017',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-slate-500">No booking distribution data available</p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {statusPieData.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                />
                <span>
                  {entry.name}: <strong>{entry.value}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Booked Vehicles Showcase */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
          Top Booked Vehicles (Fleet Performance)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {(data?.popularCars || []).map((car, idx) => (
            <div key={idx} className="glass-card p-4 rounded-2xl border border-white/5 space-y-2">
              <img
                src={car.image || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80'}
                alt={car.name}
                className="w-full h-24 rounded-xl object-cover"
              />
              <div>
                <p className="text-xs font-bold text-white truncate">{car.name}</p>
                <p className="text-[11px] text-slate-400">{car.brand}</p>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-xs font-mono">
                <span className="text-slate-400">{car.totalBookings} rentals</span>
                <span className="text-cyan-400 font-bold">{formatPrice(car.totalRevenue)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
            Latest Reservations Pipeline
          </h3>
          <Link to="/admin/bookings" className="text-xs text-cyan-400 hover:underline">
            Manage All Bookings →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] text-slate-400 uppercase font-mono border-b border-white/10">
              <tr>
                <th className="pb-3 font-semibold">Client</th>
                <th className="pb-3 font-semibold">Car</th>
                <th className="pb-3 font-semibold">Dates</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Payment</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(data?.recentBookings || []).map((b) => (
                <tr key={b._id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-semibold text-white">
                    <p>{b.user?.name || 'Client'}</p>
                    <p className="text-[10px] text-slate-400">{b.user?.email}</p>
                  </td>
                  <td className="py-3 font-semibold text-white">{b.car?.name}</td>
                  <td className="py-3 text-slate-300">
                    {new Date(b.pickupDate).toLocaleDateString()} → {new Date(b.returnDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 font-mono font-bold text-white">{formatPrice(b.totalAmount)}</td>
                  <td className="py-3">
                    <span className={`text-[10px] font-bold uppercase ${b.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-white/5 text-slate-300 border border-white/10">
                      {b.bookingStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
