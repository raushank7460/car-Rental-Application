import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { carService } from '../../services/carService';
import { bookingService } from '../../services/bookingService';
import { reviewService } from '../../services/extraServices';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { CarCanvas } from '../../components/3d/CarCanvas';
import {
  Star,
  Zap,
  Gauge,
  Fuel,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Heart,
  ArrowLeft,
  Clock,
  Sparkles,
  CreditCard,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';

export const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' or '3d'

  // Booking Form State
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const fourDaysLater = new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0];

  const [bookingData, setBookingData] = useState({
    pickupLocation: 'Mumbai Downtown Hub',
    dropoffLocation: 'Mumbai Airport Terminal 2',
    pickupDate: tomorrow,
    returnDate: fourDaysLater,
    paymentMethod: 'card',
    notes: '',
  });

  const [availabilityStatus, setAvailabilityStatus] = useState(null); // { checking: false, isAvailable: true }

  // Review Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchCarAndReviews = async () => {
      try {
        setLoading(true);
        const data = await carService.getCarById(id);
        if (data.success) {
          setCar(data.car);
        }
        const reviewsData = await reviewService.getReviewsByCar(id);
        if (reviewsData.success) {
          setReviews(reviewsData.reviews);
        }
      } catch (err) {
        showToast(err.message, 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchCarAndReviews();
  }, [id]);

  // Check live availability whenever dates change
  useEffect(() => {
    if (!car) return;
    const checkAvail = async () => {
      try {
        setAvailabilityStatus({ checking: true });
        const res = await carService.checkAvailability(id, bookingData.pickupDate, bookingData.returnDate);
        setAvailabilityStatus({ checking: false, isAvailable: res.isAvailable });
      } catch (err) {
        setAvailabilityStatus({ checking: false, isAvailable: true });
      }
    };
    checkAvail();
  }, [id, car, bookingData.pickupDate, bookingData.returnDate]);

  // Price calculations
  const calculatePricing = () => {
    if (!car) return { days: 1, base: 0, insurance: 0, tax: 0, discount: 0, total: 0 };
    const start = new Date(bookingData.pickupDate);
    const end = new Date(bookingData.returnDate);
    const diffTime = Math.max(1, Math.abs(end - start));
    const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const base = car.pricePerDay * days;
    const insurance = Math.round(base * 0.08);
    const tax = Math.round(base * 0.18);
    const discount = days >= 5 ? Math.round(base * 0.1) : 0;
    const total = base + insurance + tax - discount;

    return { days, base, insurance, tax, discount, total };
  };

  const pricing = calculatePricing();

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please sign in or create an account to reserve this car', 'info');
      navigate('/login', { state: { from: `/cars/${id}` } });
      return;
    }

    if (availabilityStatus?.isAvailable === false) {
      showToast('This vehicle is already booked for these dates. Please choose different dates.', 'error');
      return;
    }

    try {
      setBookingLoading(true);
      const res = await bookingService.createBooking({
        car: car._id,
        pickupLocation: bookingData.pickupLocation,
        dropoffLocation: bookingData.dropoffLocation,
        pickupDate: bookingData.pickupDate,
        returnDate: bookingData.returnDate,
        paymentMethod: bookingData.paymentMethod,
        notes: bookingData.notes,
      });

      if (res.success) {
        showToast('Reservation initiated! Redirecting to secure checkout...', 'success');
        navigate(`/user/bookings/${res.booking._id}?checkout=true`);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please login to leave a review', 'info');
      return;
    }

    try {
      setSubmittingReview(true);
      const res = await reviewService.addReview({
        carId: id,
        rating: reviewRating,
        comment: reviewComment,
      });

      if (res.success) {
        showToast('Thank you for your review!', 'success');
        setReviews([res.review, ...reviews]);
        setReviewComment('');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-brand-red border-t-transparent animate-spin" />
        <p className="text-slate-400 font-mono text-sm">Loading 3D showroom model...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Car Not Found</h2>
        <Link to="/cars" className="text-brand-red hover:underline inline-flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Back to Fleet Catalog
        </Link>
      </div>
    );
  }

  const formatPrice = (val) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <Link
          to="/cars"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Fleet
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleWishlist(car)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              isWishlisted(car._id)
                ? 'bg-rose-500/20 border-rose-500/30 text-rose-400'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted(car._id) ? 'fill-rose-400' : ''}`} />
            <span>{isWishlisted(car._id) ? 'Saved' : 'Save to Wishlist'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Visuals & Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 7 Columns: 3D Model & Specs */}
        <div className="lg:col-span-7 space-y-8">
          {/* Header Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-brand-red/20 text-brand-red border border-brand-red/30 text-xs font-bold uppercase tracking-wider">
                {car.brand}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 text-xs font-semibold">
                {car.category}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold ml-auto">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{car.rating?.toFixed(1) || '5.0'}</span>
                <span className="text-slate-400 font-normal">({car.numReviews || reviews.length} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white">{car.name}</h1>
            <p className="text-sm text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-red" />
              <span>Available at {car.location || 'Mumbai Central Showroom Hub'}</span>
            </p>
          </div>

          {/* Viewer Tabs (3D Studio vs High-Res Gallery) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'gallery'
                    ? 'bg-brand-red text-white shadow-glow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Original Photo Gallery ({car.images?.length || 1})</span>
              </button>
              <button
                onClick={() => setActiveTab('3d')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === '3d'
                    ? 'bg-brand-red text-white shadow-glow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Optional 3D View</span>
              </button>
            </div>

            {/* Viewer Display */}
            {activeTab === '3d' ? (
              <CarCanvas
                initialColor="#ff2238"
                height="h-[440px] sm:h-[500px]"
                autoRotateDefault={true}
                showControls={true}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {car.images?.map((img, idx) => (
                  <div key={idx} className="h-64 rounded-2xl overflow-hidden border border-white/10 bg-dark-900">
                    <img src={img} alt={`${car.name} ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">Vehicle Overview</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{car.description}</p>
          </div>

          {/* Specifications Grid */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> Power Output
                </span>
                <p className="text-base font-bold text-white">{car.horsepower || 450} HP</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Gauge className="w-3.5 h-3.5 text-amber-400" /> Transmission
                </span>
                <p className="text-base font-bold text-white">{car.transmission || 'Automatic'}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Fuel className="w-3.5 h-3.5 text-emerald-400" /> Fuel System
                </span>
                <p className="text-base font-bold text-white">{car.fuelType || 'Petrol'}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Users className="w-3.5 h-3.5 text-purple-400" /> Seating Capacity
                </span>
                <p className="text-base font-bold text-white">{car.seats || 4} Persons</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-brand-red" /> Model Year
                </span>
                <p className="text-base font-bold text-white">{car.year || 2024}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Gauge className="w-3.5 h-3.5 text-blue-400" /> Efficiency / Mileage
                </span>
                <p className="text-base font-bold text-white">{car.mileage || '10.5 kmpl'}</p>
              </div>
            </div>
          </div>

          {/* Features Checklist */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              Installed Features & Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(car.features || ['GPS', 'Bluetooth', 'Air Conditioning', 'Parking Sensors', 'Cruise Control', 'Sunroof']).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Dynamic Booking Card */}
        <div className="lg:col-span-5">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 lg:sticky lg:top-28 shadow-2xl">
            {/* Price Header */}
            <div className="flex items-baseline justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs text-slate-400 font-mono">Daily Rental Rate</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{formatPrice(car.pricePerDay)}</span>
                  <span className="text-slate-400 text-xs">/ day</span>
                </div>
              </div>

              {/* Live Availability Badge */}
              <div>
                {availabilityStatus?.checking ? (
                  <span className="text-xs text-slate-400 font-mono">Checking dates...</span>
                ) : availabilityStatus?.isAvailable === false ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                    <AlertCircle className="w-3.5 h-3.5" /> Overlapping Booking
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Available Now
                  </span>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* Pickup Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" /> Pickup Hub
                </label>
                <select
                  value={bookingData.pickupLocation}
                  onChange={(e) => setBookingData({ ...bookingData, pickupLocation: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                >
                  <option value="Mumbai Downtown Hub">Mumbai Downtown Hub</option>
                  <option value="Mumbai Airport Terminal 2">Mumbai Airport T2</option>
                  <option value="Bandra West Luxury Lounge">Bandra West Lounge</option>
                  <option value="BKC Financial District">BKC Financial District</option>
                  <option value="Doorstep Delivery (VIP)">Doorstep VIP Delivery</option>
                </select>
              </div>

              {/* Dropoff Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Drop-off Hub
                </label>
                <select
                  value={bookingData.dropoffLocation}
                  onChange={(e) => setBookingData({ ...bookingData, dropoffLocation: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                >
                  <option value="Mumbai Airport Terminal 2">Mumbai Airport T2</option>
                  <option value="Mumbai Downtown Hub">Mumbai Downtown Hub</option>
                  <option value="Bandra West Luxury Lounge">Bandra West Lounge</option>
                  <option value="BKC Financial District">BKC Financial District</option>
                </select>
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Pickup Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingData.pickupDate}
                    onChange={(e) => setBookingData({ ...bookingData, pickupDate: e.target.value })}
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> Return Date
                  </label>
                  <input
                    type="date"
                    min={bookingData.pickupDate}
                    value={bookingData.returnDate}
                    onChange={(e) => setBookingData({ ...bookingData, returnDate: e.target.value })}
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red"
                    required
                  />
                </div>
              </div>

              {/* Preferred Payment Method */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-brand-red" /> Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card' },
                    { id: 'upi', label: 'UPI / QR' },
                    { id: 'netbanking', label: 'NetBanking' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setBookingData({ ...bookingData, paymentMethod: m.id })}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        bookingData.paymentMethod === m.id
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-dark-900 text-slate-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Price Breakdown Summary */}
              <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Car Rental ({pricing.days} {pricing.days === 1 ? 'day' : 'days'})</span>
                  <span className="font-mono text-white">{formatPrice(pricing.base)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Comprehensive Insurance (8%)</span>
                  <span className="font-mono text-white">{formatPrice(pricing.insurance)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & GST (18%)</span>
                  <span className="font-mono text-white">{formatPrice(pricing.tax)}</span>
                </div>
                {pricing.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Extended Rental Discount (10%)</span>
                    <span className="font-mono">-{formatPrice(pricing.discount)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-sm font-bold text-white">
                  <span>Estimated Total</span>
                  <span className="text-xl font-black text-brand-red font-mono">
                    {formatPrice(pricing.total)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={bookingLoading || availabilityStatus?.isAvailable === false}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-bold text-base shadow-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Reserve This Vehicle</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Free cancellation up to 24 hours prior to pickup. No hidden security deductibles.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">Client Reviews & Ratings</h2>
            <p className="text-sm text-slate-400">Feedback from verified renters of this vehicle.</p>
          </div>
        </div>

        {/* Add Review Form */}
        {user ? (
          <form onSubmit={handleReviewSubmit} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-brand-red" />
              Write Your Verified Review
            </h3>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-300">Your Rating:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="p-1 text-amber-400 hover:scale-125 transition-transform"
                  >
                    <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Describe your driving and rental experience..."
              className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-red"
              required
            />

            <button
              type="submit"
              disabled={submittingReview}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-brand-red text-white text-xs font-bold transition-all shadow-sm"
            >
              {submittingReview ? 'Submitting...' : 'Post Review'}
            </button>
          </form>
        ) : (
          <div className="glass-panel p-4 rounded-xl text-center text-xs text-slate-400 border border-white/10">
            Have you driven this car? <Link to="/login" className="text-brand-red underline font-bold">Sign in</Link> to submit your review.
          </div>
        )}

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <p className="text-sm text-slate-400 italic">No reviews yet for this vehicle. Be the first to rent and rate it!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div key={rev._id} className="glass-card p-5 rounded-xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-red/20 text-brand-red font-bold text-xs flex items-center justify-center">
                      {rev.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{rev.user?.name || 'Verified Renter'}</p>
                      <p className="text-[10px] text-slate-400">
                        {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Recent'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
