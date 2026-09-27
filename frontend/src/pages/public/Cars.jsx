import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { carService } from '../../services/carService';
import { CarCard } from '../../components/common/CarCard';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ArrowUpDown,
  Car as CarIcon,
} from 'lucide-react';

export const Cars = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filters State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [brand, setBrand] = useState(searchParams.get('brand') || 'All');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '60000');
  const [fuelType, setFuelType] = useState(searchParams.get('fuelType') || 'All');
  const [transmission, setTransmission] = useState(searchParams.get('transmission') || 'All');
  const [seats, setSeats] = useState(searchParams.get('seats') || '');
  const [minRating, setMinRating] = useState(searchParams.get('minRating') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

  const fetchCars = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (brand && brand !== 'All') params.brand = brand;
      if (category && category !== 'All') params.category = category;
      if (maxPrice) params.maxPrice = maxPrice;
      if (fuelType && fuelType !== 'All') params.fuelType = fuelType;
      if (transmission && transmission !== 'All') params.transmission = transmission;
      if (seats) params.seats = seats;
      if (minRating) params.minRating = minRating;
      if (sort) params.sort = sort;

      const data = await carService.getCars(params);
      if (data.success) {
        setCars(data.cars);
      }
    } catch (err) {
      console.error('Failed to load cars:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [brand, category, maxPrice, fuelType, transmission, seats, minRating, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCars();
  };

  const handleResetFilters = () => {
    setSearch('');
    setBrand('All');
    setCategory('All');
    setMaxPrice('60000');
    setFuelType('All');
    setTransmission('All');
    setSeats('');
    setMinRating('');
    setSort('newest');
    setSearchParams({});
  };

  const BRANDS = ['All', 'BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Land Rover', 'Toyota', 'Lamborghini'];
  const CATEGORIES = ['All', 'Sports', 'Supercar', 'SUV', 'Sedan'];
  const FUEL_TYPES = ['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric'];
  const TRANSMISSIONS = ['All', 'Automatic', 'Dual-Clutch', 'Manual'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-widest">
            Handpicked Fleet
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">Available Vehicles</h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse {cars.length} pristine exotic supercars, luxury SUVs, and executive sedans.
          </p>
        </div>

        {/* Search Input & Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative min-w-[260px] flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by model or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-red"
            />
          </form>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-dark-900 border border-white/10 rounded-xl px-3 py-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-dark-900">Newest Arrivals</option>
              <option value="price-asc" className="bg-dark-900">Price: Low to High</option>
              <option value="price-desc" className="bg-dark-900">Price: High to Low</option>
              <option value="rating" className="bg-dark-900">Highest Rated</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="lg:hidden p-2.5 rounded-xl bg-dark-900 border border-white/10 text-white flex items-center gap-2 text-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-red" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside
          className={`lg:block ${
            showMobileFilters ? 'block' : 'hidden'
          } space-y-6 lg:sticky lg:top-28 h-fit`}
        >
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-red" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Filters</h3>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-brand-red flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Manufacturer / Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-red"
              >
                {BRANDS.map((b) => (
                  <option key={b} value={b} className="bg-dark-900">{b}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Body Style</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-red"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-dark-900">{c}</option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Max Daily Rate</span>
                <span className="font-mono font-bold text-brand-red">
                  ₹{Number(maxPrice).toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="60000"
                step="2500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>₹5,000</span>
                <span>₹60,000</span>
              </div>
            </div>

            {/* Fuel Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Fuel Type</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-red"
              >
                {FUEL_TYPES.map((f) => (
                  <option key={f} value={f} className="bg-dark-900">{f}</option>
                ))}
              </select>
            </div>

            {/* Transmission */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Transmission</label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-red"
              >
                {TRANSMISSIONS.map((t) => (
                  <option key={t} value={t} className="bg-dark-900">{t}</option>
                ))}
              </select>
            </div>

            {/* Minimum Seats */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Minimum Seats</label>
              <div className="grid grid-cols-4 gap-2">
                {['', '2', '4', '7'].map((s) => (
                  <button
                    key={s || 'all'}
                    type="button"
                    onClick={() => setSeats(s)}
                    className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      seats === s
                        ? 'bg-brand-red text-white border-brand-red'
                        : 'bg-dark-900 text-slate-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {s ? `${s}+` : 'Any'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Cars Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : cars.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center space-y-4 border border-white/10">
              <CarIcon className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-xl font-bold text-white">No Vehicles Match Your Criteria</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Try widening your price range or clearing some filters to see our full luxury lineup.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-xl bg-brand-red text-white font-bold text-sm shadow-glow hover:brightness-110 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
