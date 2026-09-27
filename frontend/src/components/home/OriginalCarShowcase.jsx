import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Gauge,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  X,
  Compass,
  Award,
  Layers,
  Fuel,
  Activity,
  ArrowRight
} from 'lucide-react';

export const ORIGINAL_FLEET = [
  {
    id: '6ab40b55ecfd387d67189ddc',
    name: 'BMW M4 Competition',
    brand: 'BMW',
    category: 'Supercar / Sports Coupe',
    year: 2024,
    pricePerDay: 18000,
    horsepower: 503,
    acceleration: '3.8s',
    topSpeed: '290 km/h',
    transmission: '8-Speed M Steptronic',
    engine: '3.0L M TwinPower Turbo I6',
    fuelType: 'Petrol',
    rating: 4.9,
    reviewsCount: 18,
    tagline: 'Precision Track Engineering Meets Daily Luxury',
    description:
      'The BMW M4 Competition Coupe represents the peak of high performance in the BMW 4 Series line-up. Powered by a 503-hp M TwinPower Turbo engine with track-tuned adaptive suspension and carbon fiber aerodynamics.',
    features: ['Harmon Kardon Audio', 'Carbon Fiber Roof', 'Heated M Seats', 'Adaptive M Suspension', 'Apple CarPlay & HUD'],
    colors: [
      { name: 'Toronto Red', hex: '#d91e2b' },
      { name: 'Isle of Man Green', hex: '#0a4d3c' },
      { name: 'Black Sapphire', hex: '#111215' },
      { name: 'Alpine White', hex: '#f1f5f9' },
      { name: 'Portimao Blue', hex: '#1d4ed8' },
    ],
    views: [
      {
        label: 'Front 3/4 Exterior',
        url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Side Profile',
        url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Interior Cockpit',
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Rear Dynamic',
        url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=85',
      },
    ],
  },
  {
    id: '6ab40b55ecfd387d67189ddd',
    name: 'Mercedes-AMG GT Coupe',
    brand: 'Mercedes-Benz',
    category: 'Supercar',
    year: 2024,
    pricePerDay: 28000,
    horsepower: 577,
    acceleration: '3.2s',
    topSpeed: '318 km/h',
    transmission: '9-Speed AMG SPEEDSHIFT',
    engine: 'Handcrafted 4.0L V8 Biturbo',
    fuelType: 'Petrol',
    rating: 5.0,
    reviewsCount: 24,
    tagline: 'Handcrafted Power and Roaring V8 Symphony',
    description:
      'A handcrafted AMG 4.0-liter V8 biturbo engine with exhilarating dynamics, race-inspired active aerodynamics cockpit, and unmistakable roaring exhaust notes.',
    features: ['AMG Ride Control', 'Burmester High-End Surround', 'Nappa Leather Interior', 'Track Pace Telemetry', 'Active Aerodynamics'],
    colors: [
      { name: 'Magno Selenite Grey', hex: '#525960' },
      { name: 'Solarbeam Yellow', hex: '#eab308' },
      { name: 'Obsidian Black', hex: '#0f1115' },
      { name: 'Jupiter Red', hex: '#dc2626' },
    ],
    views: [
      {
        label: 'Front 3/4 Exterior',
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Rear Track',
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Luxury Cockpit',
        url: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Side Profile',
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=85',
      },
    ],
  },
  {
    id: '6ab40b55ecfd387d67189dde',
    name: 'Audi R8 V10 Performance',
    brand: 'Audi',
    category: 'Supercar',
    year: 2023,
    pricePerDay: 35000,
    horsepower: 612,
    acceleration: '3.1s',
    topSpeed: '330 km/h',
    transmission: '7-Speed S Tronic Dual-Clutch',
    engine: '5.2L Naturally Aspirated V10',
    fuelType: 'Petrol',
    rating: 4.9,
    reviewsCount: 15,
    tagline: 'Naturally Aspirated V10 Thrill with Quattro Traction',
    description:
      'Naturally aspirated 5.2-liter V10 engine that revs up to 8,700 RPM. Legendary quattro all-wheel drive providing sheer track precision and acoustic euphoria.',
    features: ['Audi Virtual Cockpit', 'Carbon Ceramic Brakes', 'Bang & Olufsen 3D Audio', 'Laser Headlights', 'Sport Exhaust System'],
    colors: [
      { name: 'Kemora Grey', hex: '#64748b' },
      { name: 'Vegas Yellow', hex: '#facc15' },
      { name: 'Mythos Black', hex: '#0f172a' },
      { name: 'Tango Red', hex: '#ef4444' },
    ],
    views: [
      {
        label: 'Front 3/4 Track',
        url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Dynamic Profile',
        url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Cockpit View',
        url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Rear Aero',
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=85',
      },
    ],
  },
  {
    id: '6ab40b55ecfd387d67189ddf',
    name: 'Porsche 911 Carrera S',
    brand: 'Porsche',
    category: 'Sports',
    year: 2024,
    pricePerDay: 25000,
    horsepower: 443,
    acceleration: '3.5s',
    topSpeed: '308 km/h',
    transmission: '8-Speed Porsche Doppelkupplung (PDK)',
    engine: '3.0L Twin-Turbo Flat-Six',
    fuelType: 'Petrol',
    rating: 4.8,
    reviewsCount: 29,
    tagline: 'The Timeless Benchmark of Sports Car Purity',
    description:
      'The timeless silhouette with rear-engine layout. Twin-turbo flat-six engine delivering immediate acceleration and unparalleled steering feedback.',
    features: ['Sport Chrono Package', 'Porsche Active Suspension (PASM)', 'Panoramic Glass Roof', 'Bose Surround Sound', 'Launch Control'],
    colors: [
      { name: 'Guards Red', hex: '#dc2626' },
      { name: 'Racing Yellow', hex: '#eab308' },
      { name: 'GT Silver Metallic', hex: '#94a3b8' },
      { name: 'Jet Black Metallic', hex: '#0f172a' },
    ],
    views: [
      {
        label: 'Front Profile',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Rear Light Strip',
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Porsche Cockpit',
        url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Studio View',
        url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=85',
      },
    ],
  },
  {
    id: '6ab40b55ecfd387d67189de2',
    name: 'Lamborghini Huracan EVO',
    brand: 'Lamborghini',
    category: 'Supercar',
    year: 2023,
    pricePerDay: 55000,
    horsepower: 640,
    acceleration: '2.9s',
    topSpeed: '325 km/h',
    transmission: '7-Speed Dual-Clutch LDF',
    engine: '5.2L Naturally Aspirated V10',
    fuelType: 'Petrol',
    rating: 5.0,
    reviewsCount: 31,
    tagline: 'Raw Italian Emotion and Unrivaled Aerodynamic Mastery',
    description:
      'Raw Italian emotion. V10 naturally aspirated monster with 640 HP, LDVI vehicle dynamics brain, and futuristic hexagonal design architecture.',
    features: ['Dynamic Steering (LDS)', 'Magnetorheological Suspension', 'Carbon Skin Finish', 'Sport Exhaust Valves', 'Telemetry System'],
    colors: [
      { name: 'Arancio Borealis', hex: '#ea580c' },
      { name: 'Verde Mantis', hex: '#16a34a' },
      { name: 'Giallo Inti', hex: '#eab308' },
      { name: 'Nero Noctis', hex: '#0f172a' },
    ],
    views: [
      {
        label: 'Front Exotic',
        url: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Profile Aero',
        url: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Cockpit View',
        url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Track Stance',
        url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=85',
      },
    ],
  },
  {
    id: '6ab40b55ecfd387d67189de0',
    name: 'Range Rover Sport Dynamic',
    brand: 'Land Rover',
    category: 'Luxury SUV',
    year: 2024,
    pricePerDay: 22000,
    horsepower: 395,
    acceleration: '5.4s',
    topSpeed: '242 km/h',
    transmission: '8-Speed Automatic AWD',
    engine: '3.0L MHEV Turbocharged I6',
    fuelType: 'Diesel',
    rating: 4.7,
    reviewsCount: 19,
    tagline: 'Imposing Luxury Meets All-Terrain Supremacy',
    description:
      'Imposing luxury meets all-terrain supremacy. Powered by a mild-hybrid turbocharged inline-6 with dynamic air suspension and meridian 3D sound.',
    features: ['Terrain Response 2', 'Meridian 3D Sound', 'Ventilated Massage Seats', 'Adaptive Cruise Control', 'Soft Close Doors'],
    colors: [
      { name: 'Santorini Black', hex: '#0f172a' },
      { name: 'Firenze Red', hex: '#b91c1c' },
      { name: 'Carpathian Grey', hex: '#475569' },
      { name: 'Fuji White', hex: '#f8fafc' },
    ],
    views: [
      {
        label: 'Front Majestic',
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Profile Stance',
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Executive Cabin',
        url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=85',
      },
      {
        label: 'Rear Elegance',
        url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=85',
      },
    ],
  },
];

export const OriginalCarShowcase = () => {
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [selectedViewIndex, setSelectedViewIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const car = ORIGINAL_FLEET[selectedCarIndex];
  const activeImage = car.views[selectedViewIndex]?.url || car.views[0].url;

  const handleSelectCar = (index) => {
    setSelectedCarIndex(index);
    setSelectedViewIndex(0);
    setSelectedColor(0);
  };

  return (
    <div className="glass-panel p-6 sm:p-10 lg:p-12 rounded-3xl border border-white/10 relative overflow-hidden space-y-8">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="max-w-2xl space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-brand-red/10 text-brand-red border border-brand-red/20 text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Original Luxury Fleet Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Experience The Elite Fleet
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Inspect our authentic, showroom-condition luxury supercars and executive fleet. Review real high-resolution exterior profiles, cabin interiors, and track-tested performance metrics.
          </p>
        </div>

        {/* Fleet Verification Badge */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-md self-start md:self-auto">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider">100% Original Fleet</p>
            <p className="text-[11px] text-slate-400">Zero Replica • Certified Condition</p>
          </div>
        </div>
      </div>

      {/* Model Selector Tabs */}
      <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
        {ORIGINAL_FLEET.map((item, idx) => {
          const isActive = idx === selectedCarIndex;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectCar(idx)}
              className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2.5 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-red to-brand-crimson text-white shadow-glow'
                  : 'bg-dark-900/60 text-slate-400 hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              <span>{item.brand}</span>
              <span className={isActive ? 'text-white' : 'text-slate-300'}>{item.name.replace(item.brand, '').trim()}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${isActive ? 'bg-black/30 text-white' : 'bg-white/5 text-slate-400'}`}>
                ₹{(item.pricePerDay / 1000).toFixed(0)}k/d
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Original Car Interactive Viewer Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Side: High-Resolution Visual Stage */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full h-[360px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/10 bg-dark-950 group shadow-2xl">
            {/* Ambient Radial Backlight behind car */}
            <div className="absolute inset-0 bg-radial-gradient from-white/5 via-dark-950/70 to-dark-950 pointer-events-none" />

            {/* Main High-Res Image with Framer Motion Animation */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={`${car.name} - ${car.views[selectedViewIndex]?.label}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-dark-950/40 pointer-events-none" />

            {/* Top Floating Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <span className="px-3 py-1 rounded-xl bg-dark-900/85 backdrop-blur-md border border-white/15 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg">
                  <Award className="w-3.5 h-3.5 text-brand-red" />
                  {car.category}
                </span>
                <span className="px-3 py-1 rounded-xl bg-dark-900/85 backdrop-blur-md border border-white/15 text-amber-400 font-bold text-xs flex items-center gap-1 shadow-lg">
                  ★ {car.rating} ({car.reviewsCount} verified drives)
                </span>
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(true)}
                title="View Fullscreen"
                className="pointer-events-auto p-2.5 rounded-xl bg-dark-900/80 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/15 backdrop-blur-md transition-all active:scale-95 shadow-lg"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Controls: Camera/Angle Views */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 bg-dark-900/90 p-1.5 rounded-2xl border border-white/15 backdrop-blur-md shadow-xl overflow-x-auto max-w-full">
                {car.views.map((v, vIdx) => (
                  <button
                    key={vIdx}
                    onClick={() => setSelectedViewIndex(vIdx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedViewIndex === vIdx
                        ? 'bg-brand-red text-white shadow-glow'
                        : 'text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              <div className="text-[11px] font-mono text-slate-400 bg-dark-900/80 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md hidden sm:block">
                Original High-Res Capture
              </div>
            </div>
          </div>

          {/* Color Palettes Swatch */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Factory Lacquer:
              </span>
              <span className="text-xs font-semibold text-slate-300">
                {car.colors[selectedColor]?.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {car.colors.map((c, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => setSelectedColor(cIdx)}
                  title={c.name}
                  style={{ backgroundColor: c.hex }}
                  className={`w-6 h-6 rounded-full border transition-all ${
                    selectedColor === cIdx
                      ? 'border-white scale-125 ring-2 ring-brand-red ring-offset-2 ring-offset-dark-900'
                      : 'border-white/20 hover:scale-110 opacity-80 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Original Car Specs & Booking Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              <span>{car.year} Release</span>
              <span>•</span>
              <span>{car.engine}</span>
            </div>
            <h3 className="text-3xl font-black text-white">{car.name}</h3>
            <p className="text-xs font-medium text-brand-red">{car.tagline}</p>
            <p className="text-sm text-slate-300 leading-relaxed pt-1">
              {car.description}
            </p>
          </div>

          {/* Real Performance Specifications Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-dark-900/80 border border-white/10 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-brand-red" /> Horsepower
              </span>
              <p className="text-xl font-black text-white tracking-tight">{car.horsepower} HP</p>
              <p className="text-[10px] text-slate-500 font-mono">Factory Dyno Rated</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-900/80 border border-white/10 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-cyan-400" /> 0-100 km/h
              </span>
              <p className="text-xl font-black text-white tracking-tight">{car.acceleration}</p>
              <p className="text-[10px] text-slate-500 font-mono">Launch Control Enabled</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-900/80 border border-white/10 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" /> Top Speed
              </span>
              <p className="text-xl font-black text-white tracking-tight">{car.topSpeed}</p>
              <p className="text-[10px] text-slate-500 font-mono">Aerodynamic Package</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-900/80 border border-white/10 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Fuel className="w-3.5 h-3.5 text-amber-400" /> Transmission
              </span>
              <p className="text-xs font-bold text-white tracking-tight truncate pt-1">{car.transmission}</p>
              <p className="text-[10px] text-slate-500 font-mono">{car.fuelType}</p>
            </div>
          </div>

          {/* Premium Features Badges */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Showroom Equipment
            </span>
            <div className="flex flex-wrap gap-1.5">
              {car.features.map((feat, fIdx) => (
                <span
                  key={fIdx}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing & Booking Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 via-dark-900/90 to-brand-red/10 border border-white/15 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">VIP Rental Rate</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">₹{car.pricePerDay.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-slate-400">/ 24 hours</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold">
                  Ready for Delivery
                </span>
                <p className="text-[10px] text-slate-400 mt-1">Zero Security Deposit Option</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Link
                to={`/cars/${car.id}`}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson hover:brightness-110 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-glow transition-all"
              >
                <span>Book This Car</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to={`/cars/${car.id}`}
                className="w-full py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 flex items-center justify-center gap-2 transition-all"
              >
                <span>Full Specs & Reviews</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="flex items-center justify-between text-white z-10">
            <div>
              <h3 className="text-xl font-bold">{car.name}</h3>
              <p className="text-xs text-slate-400 font-mono">{car.views[selectedViewIndex]?.label}</p>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={activeImage}
              alt={car.name}
              className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div
            className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {car.views.map((v, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedViewIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedViewIndex === idx
                    ? 'bg-brand-red text-white shadow-glow'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
