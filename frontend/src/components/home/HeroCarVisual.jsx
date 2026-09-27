import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, ArrowRight, Award, Gauge } from 'lucide-react';

const HERO_CARS = [
  {
    id: '6ab40b55ecfd387d67189ddc',
    name: 'BMW M4 Competition',
    badge: 'Flagship M Performance',
    tag: '503 HP • 3.8s 0-100',
    price: '₹18,000/day',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: '6ab40b55ecfd387d67189ddf',
    name: 'Porsche 911 Carrera S',
    badge: 'Iconic Track Precision',
    tag: '443 HP • 3.5s 0-100',
    price: '₹25,000/day',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: '6ab40b55ecfd387d67189dde',
    name: 'Audi R8 V10 Performance',
    badge: 'Naturally Aspirated V10',
    tag: '612 HP • 3.1s 0-100',
    price: '₹35,000/day',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=85',
  },
];

export const HeroCarVisual = () => {
  const [activeCarIdx, setActiveCarIdx] = useState(0);
  const activeCar = HERO_CARS[activeCarIdx];

  return (
    <div className="relative w-full">
      {/* Ambient Neon Backlights */}
      <div className="absolute -inset-4 bg-gradient-to-r from-brand-red/20 via-cyan-500/15 to-brand-crimson/20 rounded-3xl blur-2xl pointer-events-none" />

      {/* Main Glass Showcase Container */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 bg-dark-900/90 shadow-2xl p-4 sm:p-6 space-y-4">
        {/* Top Header inside Hero Box */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Available For Immediate Delivery
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-xl">
            {HERO_CARS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActiveCarIdx(i)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                  activeCarIdx === i
                    ? 'bg-brand-red text-white shadow-glow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {c.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Visual Image Stage */}
        <div className="relative w-full h-[280px] sm:h-[350px] rounded-2xl overflow-hidden border border-white/10 group bg-dark-950">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeCar.image}
              src={activeCar.image}
              alt={activeCar.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent pointer-events-none" />

          {/* Floating Tag Top-Left */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-dark-900/90 border border-white/15 text-white font-mono text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-brand-red" />
              {activeCar.badge}
            </span>
          </div>

          {/* Floating Tag Top-Right */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-xl bg-dark-900/90 border border-white/15 text-amber-400 font-mono text-xs font-bold shadow-lg backdrop-blur-md">
              ★ {activeCar.rating}
            </span>
          </div>

          {/* Bottom Floating Stats Bar */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 p-3 rounded-xl bg-dark-900/90 border border-white/15 backdrop-blur-md">
            <div>
              <p className="text-sm font-black text-white">{activeCar.name}</p>
              <p className="text-xs font-mono text-slate-300 flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-cyan-400" /> {activeCar.tag}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-black text-white">{activeCar.price}</p>
              <Link
                to={`/cars/${activeCar.id}`}
                className="text-[11px] font-bold text-brand-red hover:underline flex items-center justify-end gap-1"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Badges Footer */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center">
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Insurance</p>
            <p className="text-xs font-bold text-white">100% Zero-Dep</p>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Delivery</p>
            <p className="text-xs font-bold text-white">White-Glove VIP</p>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Condition</p>
            <p className="text-xs font-bold text-white">Showroom Fresh</p>
          </div>
        </div>
      </div>
    </div>
  );
};
