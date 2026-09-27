import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { CarCard } from '../../components/common/CarCard';
import { Heart, Car } from 'lucide-react';

export const Wishlist = () => {
  const { wishlist, loading } = useWishlist();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Saved Vehicles</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Vehicles you've bookmarked for your next high-performance road trip or executive arrival.
          </p>
        </div>

        <Link
          to="/cars"
          className="px-4 py-2 rounded-xl bg-brand-red text-white text-xs font-bold shadow-glow hover:brightness-110 self-start sm:self-auto"
        >
          Explore Fleet
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : wishlist.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center space-y-4 border border-white/10">
          <Heart className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">Your Wishlist is Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Explore our collection and click the heart icon on any supercar to save it for quick reservation.
          </p>
          <Link
            to="/cars"
            className="inline-block px-5 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold shadow-glow"
          >
            Browse Cars
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};
