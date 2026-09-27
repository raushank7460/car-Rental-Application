import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import { useAuth } from '../../context/AuthContext';
import {
  CalendarCheck,
  Zap,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Car,
  AlertCircle,
} from 'lucide-react';

export const UserDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getMyBookings();
        if (data.success) {
          setBookings(data.bookings || []);
        }
      } catch (err) {
        console.error('Failed to fetch user bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Compute metrics
  const totalBookings = bookings.length;
  const activeRental = bookings.find((b) => b.bookingStatus === 'active');
  const completedRentals = bookings.filter((b) => b.bookingStatus === 'completed').length;
  const totalSpent = bookings
    .filter((b) => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const getStatusBadge = (status) => {
    const map = {
      pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      confirmed: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 animate-pulse',
      completed: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
      cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    };
    return map[status] || 'bg-white/5 text-slate-300';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-wider">
            Client Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your supercar reservations, upcoming drives, and concierge requests.
          </p>
        </div>

        <Link
          to="/cars"
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white text-xs font-bold shadow-glow hover:brightness-110 transition-all flex items-center gap-1.5"
        >
          <Car className="w-4 h-4" />
          <span>Book a New Car</span>
        </Link>
      </div>

      {/* 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Bookings</span>
            <CalendarCheck className="w-4 h-4 text-brand-red" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{totalBookings}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Active Rental</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{activeRental ? '1 Active' : 'None'}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{completedRentals}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Spent</span>
            <span className="text-xs text-amber-400 font-mono font-bold">₹</span>
          </div>
          <p className="text-2xl font-black text-white font-mono">{formatPrice(totalSpent)}</p>
        </div>
      </div>

      {/* Active Rental Spotlight (if any) */}
      {activeRental && (
        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Currently On Road (Active Rental)
              </h3>
            </div>
            <Link
              to={`/user/bookings/${activeRental._id}`}
              className="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>View Live Voucher</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4">
              <img
                src={activeRental.car?.images?.[0] || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80'}
                alt={activeRental.car?.name}
                className="w-20 h-14 rounded-xl object-cover border border-white/10"
              />
              <div>
                <h4 className="text-base font-bold text-white">{activeRental.car?.name}</h4>
                <p className="text-xs text-slate-400">
                  Return due: {new Date(activeRental.returnDate).toLocaleDateString()} at {activeRental.dropoffLocation}
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ACTIVE RENTAL
            </span>
          </div>
        </div>
      )}

      {/* Recent Bookings Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
            Recent Reservations
          </h3>
          <Link
            to="/user/bookings"
            className="text-xs font-bold text-brand-red hover:text-white transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <Car className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm text-slate-400">You haven't made any car reservations yet.</p>
            <Link
              to="/cars"
              className="inline-block px-5 py-2 rounded-xl bg-brand-red text-white text-xs font-bold shadow-glow"
            >
              Browse Luxury Fleet
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] text-slate-400 uppercase font-mono border-b border-white/10">
                <tr>
                  <th className="pb-3 font-semibold">Vehicle</th>
                  <th className="pb-3 font-semibold">Rental Dates</th>
                  <th className="pb-3 font-semibold">Total Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 flex items-center gap-3">
                      <img
                        src={b.car?.images?.[0] || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=200&q=80'}
                        alt={b.car?.name}
                        className="w-12 h-9 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-bold text-white text-sm">{b.car?.name || 'Luxury Vehicle'}</p>
                        <p className="text-[11px] text-slate-400">{b.car?.brand}</p>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-300">
                      <p>{new Date(b.pickupDate).toLocaleDateString()}</p>
                      <p className="text-[10px] text-slate-500">to {new Date(b.returnDate).toLocaleDateString()}</p>
                    </td>
                    <td className="py-3.5 font-mono font-bold text-white">
                      {formatPrice(b.totalAmount)}
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${getStatusBadge(b.bookingStatus)}`}>
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        to={`/user/bookings/${b._id}`}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-colors"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
