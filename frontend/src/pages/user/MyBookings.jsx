import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import { useToast } from '../../context/ToastContext';
import {
  CalendarCheck,
  CreditCard,
  XCircle,
  Eye,
  Car,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const { showToast } = useToast();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getMyBookings();
      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const data = await bookingService.cancelBooking(id);
      if (data.success) {
        showToast('Booking cancelled successfully', 'info');
        fetchBookings();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'all') return true;
    return b.bookingStatus === statusFilter;
  });

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">My Reservations</h1>
          <p className="text-xs sm:text-sm text-slate-400">View and manage all your past and upcoming luxury drives.</p>
        </div>

        <Link
          to="/cars"
          className="px-4 py-2 rounded-xl bg-brand-red text-white text-xs font-bold shadow-glow hover:brightness-110 self-start sm:self-auto"
        >
          Explore Fleet
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        {['all', 'pending', 'confirmed', 'active', 'completed', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              statusFilter === tab
                ? 'bg-brand-red text-white shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center space-y-3 border border-white/10">
          <CalendarCheck className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Reservations Found</h3>
          <p className="text-xs text-slate-400">There are no bookings matching the selected status.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b._id}
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              {/* Left Car & Dates */}
              <div className="flex items-center gap-4">
                <img
                  src={b.car?.images?.[0] || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80'}
                  alt={b.car?.name}
                  className="w-24 h-18 rounded-xl object-cover border border-white/10 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                      ID: {b._id.slice(-6).toUpperCase()}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusBadge(b.bookingStatus)}`}>
                      {b.bookingStatus}
                    </span>
                    {b.paymentStatus === 'paid' ? (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Paid
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Unpaid
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white">{b.car?.name || 'Luxury Vehicle'}</h3>
                  <p className="text-xs text-slate-400">
                    {new Date(b.pickupDate).toLocaleDateString()} → {new Date(b.returnDate).toLocaleDateString()} ({b.totalDays} {b.totalDays === 1 ? 'day' : 'days'})
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Pickup: {b.pickupLocation} | Return: {b.dropoffLocation}
                  </p>
                </div>
              </div>

              {/* Right Price & Actions */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-end lg:items-center gap-4 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0 border-white/10">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 font-mono">Total Paid / Due</span>
                  <p className="text-xl font-black text-white font-mono">{formatPrice(b.totalAmount)}</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {b.paymentStatus !== 'paid' && b.bookingStatus !== 'cancelled' && (
                    <Link
                      to={`/user/bookings/${b._id}?checkout=true`}
                      className="px-3.5 py-2 rounded-xl bg-brand-red text-white text-xs font-bold shadow-glow hover:brightness-110 flex items-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Pay Now</span>
                    </Link>
                  )}

                  <Link
                    to={`/user/bookings/${b._id}`}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Voucher</span>
                  </Link>

                  {b.bookingStatus !== 'cancelled' && b.bookingStatus !== 'completed' && (
                    <button
                      onClick={() => handleCancelBooking(b._id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Cancel Booking"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
