import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Instagram, Twitter, Facebook, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-dark-900 border-t border-white/10 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-red to-brand-crimson flex items-center justify-center shadow-glow">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-wider text-white">
                APEX<span className="text-brand-red">WHEELS</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              India's premier 3D interactive exotic automobile rental service. Handpicked supercars, executive sedans, and luxury SUVs backed by 24/7 VIP concierge.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:text-white hover:border-brand-red transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:text-white hover:border-brand-red transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:text-white hover:border-brand-red transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono">Fleet Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cars?category=Supercar" className="hover:text-white transition-colors">Exotics & Supercars</Link></li>
              <li><Link to="/cars?category=Sports" className="hover:text-white transition-colors">Track Performance Coupes</Link></li>
              <li><Link to="/cars?category=SUV" className="hover:text-white transition-colors">Luxury & Rugged SUVs</Link></li>
              <li><Link to="/cars?category=Sedan" className="hover:text-white transition-colors">Executive Limousines</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Apex</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Showroom Hubs</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Member Sign In</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Join Apex Club</Link></li>
            </ul>
          </div>

          {/* Showroom Hubs & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono">VIP Concierge</h4>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                +91 (022) 8000-APEX
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                concierge@apexwheels.com
              </p>
              <p className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                BKC Financial District, Mumbai, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Apex Wheels Luxury Mobility Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Encrypted Booking
            </span>
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
