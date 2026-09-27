import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { bookingService } from '../../services/bookingService';
import { paymentService } from '../../services/extraServices';
import { useToast } from '../../context/ToastContext';
import {
  ArrowLeft,
  CalendarCheck,
  ShieldCheck,
  CreditCard,
  QrCode,
  Landmark,
  Printer,
  CheckCircle2,
  Clock,
  MapPin,
  Car,
  AlertCircle,
} from 'lucide-react';

export const BookingDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(searchParams.get('checkout') === 'true');

  // Payment Form State
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8829');
  const [cardHolder, setCardHolder] = useState('VIP RENTER');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('789');
  const [upiId, setUpiId] = useState('driver@okaxis');
  const [bankName, setBankName] = useState('HDFC Bank');

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getBookingById(id);
      if (data.success) {
        setBooking(data.booking);
        if (data.booking.paymentStatus === 'pending' && searchParams.get('checkout') === 'true') {
          setShowPaymentModal(true);
        }
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    try {
      setProcessingPayment(true);
      const res = await paymentService.processPayment({
        bookingId: id,
        method: selectedMethod,
        paymentDetails: {
          cardHolder,
          method: selectedMethod,
        },
      });

      if (res.success) {
        // Fire confetti celebration
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff334b', '#00f0ff', '#ffffff', '#ffd700'],
        });

        showToast('Payment successful! Your luxury drive is confirmed.', 'success');
        setBooking(res.booking);
        setShowPaymentModal(false);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setProcessingPayment(false);
    }
  };

  const formatPrice = (val) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-brand-red border-t-transparent animate-spin" />
        <p className="text-slate-400 font-mono text-sm">Generating reservation voucher...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-white font-bold text-lg">Booking Not Found</p>
        <Link to="/user/bookings" className="text-brand-red underline text-sm">Back to Reservations</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/user/bookings"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Bookings
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-semibold text-white transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          {booking.paymentStatus === 'pending' && (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-4 py-1.5 rounded-xl bg-brand-red text-white text-xs font-bold shadow-glow hover:brightness-110 flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" />
              <span>Complete Payment</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Reservation Voucher Card */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white">APEX<span className="text-brand-red">WHEELS</span></span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-brand-red/20 text-brand-red border border-brand-red/30">
                Official Voucher
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Reservation Reference: #{booking._id.toUpperCase()}
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span
              className={`inline-block px-3 py-1 rounded-xl text-xs font-bold uppercase border ${
                booking.bookingStatus === 'confirmed'
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                  : booking.bookingStatus === 'active'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}
            >
              Booking {booking.bookingStatus}
            </span>
            <p className="text-[11px] text-slate-400">
              Payment Status: <strong className={booking.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'}>{booking.paymentStatus.toUpperCase()}</strong>
            </p>
          </div>
        </div>

        {/* Vehicle Showcase */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5">
          <img
            src={booking.car?.images?.[0] || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80'}
            alt={booking.car?.name}
            className="w-full sm:w-48 h-32 rounded-xl object-cover border border-white/10"
          />
          <div className="space-y-2 w-full">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-red text-white">
                {booking.car?.brand}
              </span>
              <span className="text-xs text-slate-400">{booking.car?.category}</span>
            </div>
            <h2 className="text-2xl font-black text-white">{booking.car?.name}</h2>
            <div className="grid grid-cols-3 gap-2 pt-1 text-xs text-slate-300">
              <p>Power: <strong className="text-white">{booking.car?.horsepower || 450} HP</strong></p>
              <p>Transmission: <strong className="text-white">{booking.car?.transmission || 'Auto'}</strong></p>
              <p>Seats: <strong className="text-white">{booking.car?.seats || 4}</strong></p>
            </div>
          </div>
        </div>

        {/* Schedule & Location Itinerary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-white/5 border border-white/5">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <CalendarCheck className="w-4 h-4 text-emerald-400" /> Pickup Details
            </span>
            <p className="text-sm font-bold text-white">
              {new Date(booking.pickupDate).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-xs text-slate-400 flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5" />
              <span>{booking.pickupLocation}</span>
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" /> Return Due Details
            </span>
            <p className="text-sm font-bold text-white">
              {new Date(booking.returnDate).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-xs text-slate-400 flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>{booking.dropoffLocation}</span>
            </p>
          </div>
        </div>

        {/* Itemized Price Breakdown */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
            Financial Statement & Charges
          </h3>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2.5 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>
                Vehicle Daily Rental ({booking.totalDays} {booking.totalDays === 1 ? 'Day' : 'Days'} @ {formatPrice(booking.pricePerDay)}/day)
              </span>
              <span className="font-mono text-white">{formatPrice(booking.pricePerDay * booking.totalDays)}</span>
            </div>
            <div className="flex justify-between">
              <span>Comprehensive Collision Damage Waiver (8%)</span>
              <span className="font-mono text-white">{formatPrice(booking.insurance)}</span>
            </div>
            <div className="flex justify-between">
              <span>Mandatory GST & Transport Surcharge (18%)</span>
              <span className="font-mono text-white">{formatPrice(booking.tax)}</span>
            </div>
            {booking.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Extended Rental Promotional Rebate</span>
                <span className="font-mono">-{formatPrice(booking.discount)}</span>
              </div>
            )}
            <div className="pt-3 border-t border-white/10 flex justify-between items-baseline text-base font-bold text-white">
              <span>Net Gross Total</span>
              <span className="text-2xl font-black text-brand-red font-mono">
                {formatPrice(booking.totalAmount)}
              </span>
            </div>
            {booking.transactionId && (
              <div className="pt-2 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>Transaction Ref: {booking.transactionId}</span>
                <span className="text-emerald-400 font-bold uppercase">{booking.paymentMethod} Verified</span>
              </div>
            )}
          </div>
        </div>

        {/* Security / QR Check-in Mock */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Express Doorstep / Hub Handover
            </h4>
            <p className="text-xs text-slate-400 max-w-sm">
              Present this digital QR code to your Apex concierge alongside your valid driver's license to receive vehicle keys.
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl shadow-lg shrink-0">
            <QrCode className="w-20 h-20 text-slate-900" />
          </div>
        </div>
      </div>

      {/* Payment Modal / Drawer */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Secure Checkout</h3>
                <p className="text-xs text-slate-400">Total Due: <strong className="text-brand-red font-mono">{formatPrice(booking.totalAmount)}</strong></p>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1 rounded-lg bg-white/5"
              >
                Close
              </button>
            </div>

            {/* Payment Method Switcher */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'upi', label: 'UPI / QR', icon: QrCode },
                { id: 'netbanking', label: 'NetBanking', icon: Landmark },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMethod(m.id)}
                    className={`py-2.5 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1.5 transition-all ${
                      selectedMethod === m.id
                        ? 'bg-brand-red text-white border-brand-red shadow-glow'
                        : 'bg-dark-900 text-slate-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleProcessPayment} className="space-y-4">
              {selectedMethod === 'card' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gradient-to-tr from-slate-900 to-dark-800 border border-white/10 text-white space-y-3 font-mono shadow-md">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>APEX PLATINUM</span>
                      <CreditCard className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-lg font-bold tracking-widest">{cardNumber}</p>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{cardHolder}</span>
                      <span>{cardExpiry}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-300 font-semibold">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-semibold">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-semibold">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'upi' && (
                <div className="space-y-3 text-center">
                  <div className="p-4 bg-white rounded-2xl inline-block shadow-lg mx-auto">
                    <QrCode className="w-36 h-36 text-dark-950" />
                  </div>
                  <p className="text-xs text-slate-400">Scan via Google Pay, PhonePe, or Paytm</p>
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] text-slate-300 font-semibold">Or Enter UPI ID (VPA)</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === 'netbanking' && (
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-semibold">Select Authorized Bank</label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="State Bank of India">State Bank of India</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={processingPayment}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-bold text-sm shadow-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {processingPayment ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize & Pay {formatPrice(booking.totalAmount)}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
