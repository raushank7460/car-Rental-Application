import React from 'react';
import { ShieldCheck, Award, Zap, Users, Compass, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-widest">
          The Apex Standard
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white">
          Redefining Automotive Luxury
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Founded with a relentless passion for precision engineering and grand touring excellence, Apex Wheels provides access to the world’s most iconic supercars and executive automobiles through an immersive 3D digital platform.
        </p>
      </div>

      {/* Grid Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 text-brand-red flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">White-Glove Care</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Every vehicle in our collection is company-owned and maintained directly by certified master mechanics with authentic OEM components.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Real-Time 3D Showroom</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            No stock generic photos. Our 3D interactive viewer lets you inspect aerodynamics, paint reflections, and wheel packages directly in your browser.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Zero Hidden Charges</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Transparent pricing with comprehensive collision insurance, full GST invoicing, and flexible 24-hour cancellation policies.
          </p>
        </div>
      </div>

      {/* Fleet Stats Banner */}
      <div className="glass-panel p-10 rounded-3xl border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <p className="text-4xl font-black text-brand-red font-mono">100%</p>
          <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Exact Model Guarantee</p>
        </div>
        <div>
          <p className="text-4xl font-black text-white font-mono">15,000+</p>
          <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Track & Road Miles</p>
        </div>
        <div>
          <p className="text-4xl font-black text-cyan-400 font-mono">4.9 / 5.0</p>
          <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Client Satisfaction</p>
        </div>
        <div>
          <p className="text-4xl font-black text-amber-400 font-mono">24/7</p>
          <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">VIP Roadside Concierge</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Ready for an Unforgettable Drive?</h2>
        <Link
          to="/cars"
          className="inline-flex px-8 py-3.5 rounded-2xl bg-brand-red text-white font-bold text-sm shadow-glow hover:brightness-110 transition-all"
        >
          View Current Fleet
        </Link>
      </div>
    </div>
  );
};
