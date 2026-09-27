import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Car,
  Calendar,
  MapPin,
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  Key,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  Award,
} from 'lucide-react';
import { CarCard } from '../../components/common/CarCard';
import { carService } from '../../services/carService';
import { OriginalCarShowcase } from '../../components/home/OriginalCarShowcase';
import { HeroCarVisual } from '../../components/home/HeroCarVisual';

export const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Search Bar Form State
  const [searchState, setSearchState] = useState({
    pickupLocation: 'Mumbai Downtown Hub',
    dropoffLocation: 'Mumbai Airport Terminal 2',
    pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    returnDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    category: 'All',
  });

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await carService.getFeaturedCars();
        if (data.success && data.cars.length > 0) {
          setFeaturedCars(data.cars);
        } else {
          const allData = await carService.getCars({ limit: 6 });
          setFeaturedCars(allData.cars?.slice(0, 6) || []);
        }
      } catch (err) {
        console.error('Failed to load featured cars:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      pickupLocation: searchState.pickupLocation,
      dropoffLocation: searchState.dropoffLocation,
      pickupDate: searchState.pickupDate,
      returnDate: searchState.returnDate,
      category: searchState.category !== 'All' ? searchState.category : '',
    }).toString();
    navigate(`/cars?${query}`);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[88vh] flex items-center pt-8 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-red">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Premier Luxury & Exotic Fleet in India</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
                Drive Your <br />
                <span className="text-gradient-red">Dream Car</span>
              </h1>

              <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Premium cars. Flexible rentals. Exceptional experience. Choose from world-class supercars and luxury SUVs with instant confirmation and white-glove doorstep delivery.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/cars"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-bold text-base shadow-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Car className="w-5 h-5" />
                  <span>Explore Cars</span>
                </Link>

                <a
                  href="#experience-fleet"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel text-white font-semibold text-base hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span>Explore Original Fleet</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-md mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-black text-white">100%</p>
                  <p className="text-xs text-slate-400">Insured & Verified</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">24/7</p>
                  <p className="text-xs text-slate-400">VIP Concierge</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">0₹</p>
                  <p className="text-xs text-slate-400">Hidden Charges</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Original Luxury Supercar Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <HeroCarVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH RENTAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative z-20">
          <form onSubmit={handleSearchSubmit} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-brand-red" />
                <h3 className="text-lg font-bold text-white">Reserve Your Vehicle</h3>
              </div>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                Instant Availability Check
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Pickup Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" /> Pickup Location
                </label>
                <select
                  value={searchState.pickupLocation}
                  onChange={(e) => setSearchState({ ...searchState, pickupLocation: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                >
                  <option value="Mumbai Downtown Hub">Mumbai Downtown Hub</option>
                  <option value="Mumbai Airport Terminal 2">Mumbai Airport T2</option>
                  <option value="Bandra West Luxury Lounge">Bandra West Lounge</option>
                  <option value="BKC Financial Hub">BKC Financial Hub</option>
                  <option value="Doorstep VIP Delivery">Doorstep VIP Delivery</option>
                </select>
              </div>

              {/* Dropoff Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Return Location
                </label>
                <select
                  value={searchState.dropoffLocation}
                  onChange={(e) => setSearchState({ ...searchState, dropoffLocation: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                >
                  <option value="Mumbai Airport Terminal 2">Mumbai Airport T2</option>
                  <option value="Mumbai Downtown Hub">Mumbai Downtown Hub</option>
                  <option value="Bandra West Luxury Lounge">Bandra West Lounge</option>
                  <option value="BKC Financial Hub">BKC Financial Hub</option>
                </select>
              </div>

              {/* Pickup Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Pickup Date
                </label>
                <input
                  type="date"
                  value={searchState.pickupDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSearchState({ ...searchState, pickupDate: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* Return Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Return Date
                </label>
                <input
                  type="date"
                  value={searchState.returnDate}
                  min={searchState.pickupDate}
                  onChange={(e) => setSearchState({ ...searchState, returnDate: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* Car Type / Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-purple-400" /> Vehicle Category
                </label>
                <select
                  value={searchState.category}
                  onChange={(e) => setSearchState({ ...searchState, category: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                >
                  <option value="All">All Categories</option>
                  <option value="Sports">Sports Coupes</option>
                  <option value="Supercar">Supercars & Exotics</option>
                  <option value="SUV">Luxury SUVs</option>
                  <option value="Sedan">Executive Sedans</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-bold text-sm shadow-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Cars</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. FEATURED CARS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-brand-red uppercase tracking-widest">
              <span>Apex Signature Fleet</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">Featured Vehicles</h2>
            <p className="text-slate-400 text-sm mt-1">
              Top requested precision performance machines and ultra-luxury SUVs ready for reservation.
            </p>
          </div>

          <Link
            to="/cars"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:text-white transition-colors group"
          >
            <span>View All Fleet</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </section>

      {/* 4. DEDICATED ORIGINAL CAR FLEET SHOWCASE */}
      <section id="experience-fleet" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OriginalCarShowcase />
      </section>

      {/* 5. HOW IT WORKS WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-widest">
            Effortless Luxury
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">How Apex Rental Works</h2>
          <p className="text-slate-400 text-sm">
            From seamless fleet selection to ignition in under 3 minutes with zero paperwork delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/30 text-brand-red flex items-center justify-center font-black text-lg">
              01
            </div>
            <h3 className="text-xl font-bold text-white">Choose Your Car</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Browse our handpicked luxury fleet, inspect high-resolution galleries, review horsepower specs, and pick your preferred dates.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-black text-lg">
              02
            </div>
            <h3 className="text-xl font-bold text-white">Instant Confirmation</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Secure digital booking with zero overlap conflicts. Pay safely via Card, UPI, or Net Banking with comprehensive insurance.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-lg">
              03
            </div>
            <h3 className="text-xl font-bold text-white">Ignite & Drive</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Receive your car sanitized and fueled at our VIP showroom hub or directly at your airport terminal or residence.
            </p>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US / TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-widest">
              Unmatched Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Why Discerning Drivers Choose Apex Wheels
            </h2>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">100% Guaranteed Exact Models</strong>
                  <span className="text-slate-400">You drive the exact vehicle you reserve, never an inferior downgrade.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Track & Street Ready Maintenance</strong>
                  <span className="text-slate-400">Every supercar undergoes a multi-point master mechanic inspection prior to delivery.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Dedicated 24/7 Roadside & Concierge</strong>
                  <span className="text-slate-400">Instant VIP support anywhere in Mumbai, Delhi NCR, and Bangalore.</span>
                </div>
              </div>
            </div>

            <Link
              to="/cars"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all"
            >
              <span>Explore The Garage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-80 sm:h-96 border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
              alt="Porsche 911"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Featured Legend</p>
                  <p className="text-base font-bold text-white">Porsche 911 Carrera S</p>
                </div>
                <span className="text-brand-red font-mono font-bold text-sm">₹25,000 / day</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
