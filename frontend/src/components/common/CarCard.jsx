import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Fuel, Gauge, Users, Zap, Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { motion } from 'framer-motion';

export const CarCard = ({ car }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(car._id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const imageSrc =
    car.images && car.images.length > 0
      ? car.images[0]
      : 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col group relative"
    >
      {/* Top Image & Floating Badges */}
      <div className="relative h-52 w-full overflow-hidden bg-dark-900">
        <img
          src={imageSrc}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-black/30" />

        {/* Brand & Category Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-white border border-white/10">
            {car.brand}
          </span>
          <span className="px-2 py-0.5 rounded-lg bg-brand-red/90 text-white text-[11px] font-semibold">
            {car.category}
          </span>
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(car);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
            wishlisted
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-500'
              : 'bg-black/50 border-white/10 text-white hover:text-rose-400 hover:scale-110'
          }`}
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Rating Floating Tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-950/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{car.rating ? car.rating.toFixed(1) : '5.0'}</span>
          <span className="text-slate-400 text-[10px]">({car.numReviews || 12})</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-brand-red transition-colors line-clamp-1">
            {car.name}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{car.location || 'Mumbai Hub'}</p>
        </div>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="truncate">{car.horsepower || 400} HP</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate">{car.transmission || 'Automatic'}</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
            <Fuel className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate">{car.fuelType || 'Petrol'}</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span className="truncate">{car.seats || 4} Seats</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-mono">Daily Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-white">{formatPrice(car.pricePerDay)}</span>
              <span className="text-xs text-slate-400">/day</span>
            </div>
          </div>

          <Link
            to={`/cars/${car._id}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-brand-red text-white text-xs font-bold transition-all group/btn shadow-sm hover:shadow-glow"
          >
            <span>View 3D</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
