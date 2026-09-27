import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Eye,
  AlertCircle,
} from 'lucide-react';

export const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { showToast } = useToast();

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/dashboard');
      if (res.data.success) {
        // Fetch all bookings through direct API or admin route
        const allRes = await api.get('/bookings');
        setBookings(allRes.data.bookings || res.data.recentBookings || []);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const res = await api.put(`/bookings/${bookingId}`, {
        bookingStatus: newStatus,
      });
      if (res.data.success) {
        showToast(`Booking status updated to ${newStatus}`, 'success');
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? { ...b, bookingStatus: newStatus } : b))
        );
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const formatPrice = (val) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const filtered = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.bookingStatus === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">All Client Bookings</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Dispatch, verify keys handover, and track active client road trips.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 bg-dark-900 border border-white/10 rounded-xl px-3 py-1.5 self-start sm:self-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-dark-900">All Bookings</option>
            <option value="pending" className="bg-dark-900">Pending</option>
            <option value="confirmed" className="bg-dark-900">Confirmed</option>
            <option value="active" className="bg-dark-900">Active (On Road)</option>
            <option value="completed" className="bg-dark-900">Completed</option>
            <option value="cancelled" className="bg-dark-900">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] text-slate-400 uppercase font-mono border-b border-white/10 bg-white/5">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Booking ID</th>
                  <th className="py-3.5 px-4 font-semibold">Client</th>
                  <th className="py-3.5 px-4 font-semibold">Vehicle</th>
                  <th className="py-3.5 px-4 font-semibold">Rental Dates</th>
                  <th className="py-3.5 px-4 font-semibold">Amount</th>
                  <th className="py-3.5 px-4 font-semibold">Payment</th>
                  <th className="py-3.5 px-4 font-semibold">Change Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((b) => (
                  <tr key={b._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-400">
                      #{b._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="py-3 px-4 text-white">
                      <p className="font-bold">{b.user?.name || 'Verified Client'}</p>
                      <p className="text-[10px] text-slate-400">{b.user?.email || b.user?.phone}</p>
                    </td>
                    <td className="py-3 px-4 text-white">
                      <p className="font-bold">{b.car?.name}</p>
                      <p className="text-[10px] text-slate-400">{b.car?.brand}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <p>{new Date(b.pickupDate).toLocaleDateString()}</p>
                      <p className="text-[10px] text-slate-500">to {new Date(b.returnDate).toLocaleDateString()}</p>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {formatPrice(b.totalAmount)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase ${
                          b.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={b.bookingStatus}
                        onChange={(e) => handleStatusChange(b._id, e.target.value)}
                        className="bg-dark-900 border border-white/10 text-[11px] font-bold rounded-lg px-2 py-1 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                      >
                        <option value="pending" className="bg-dark-900">Pending</option>
                        <option value="confirmed" className="bg-dark-900">Confirmed</option>
                        <option value="active" className="bg-dark-900">Active (Dispatched)</option>
                        <option value="completed" className="bg-dark-900">Completed</option>
                        <option value="cancelled" className="bg-dark-900">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/user/bookings/${b._id}`}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors inline-block"
                        title="View Voucher"
                      >
                        <Eye className="w-4 h-4" />
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
