import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Contact = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your inquiry has been received! Our VIP concierge will contact you within 15 minutes.', 'success');
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-widest">
          Concierge Services
        </span>
        <h1 className="text-4xl font-black text-white">Get In Touch</h1>
        <p className="text-sm text-slate-400">
          Have bespoke questions regarding delivery, track rentals, or corporate events? Our concierge team is at your disposal 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info & Showrooms */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              Showroom Hubs
            </h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Mumbai Flagship Lounge</strong>
                  <p className="text-slate-400">Platina Tower, G-Block, Bandra Kurla Complex (BKC), Mumbai 400051</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Delhi NCR Experience Center</strong>
                  <p className="text-slate-400">Aerocity Hospitality District, New Delhi 110037</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Bangalore Luxury Bay</strong>
                  <p className="text-slate-400">Indiranagar 100 Feet Road, Bengaluru 560038</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">Direct Lines</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-red" />
                <span className="font-mono text-white text-sm">+91 (022) 8000-APEX (2739)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-red" />
                <span className="text-white text-sm">concierge@apexwheels.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Send an Immediate Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Kapoor"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul@domain.com"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Inquiry Nature</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                  >
                    <option value="General Inquiry">General Fleet Inquiry</option>
                    <option value="Corporate Booking">Corporate / Event Rental</option>
                    <option value="Track Day">Private Track Day Support</option>
                    <option value="Airport Concierge">Airport VIP Transfer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Message / Vehicle Preference</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your rental schedule, desired vehicle model, or special requests..."
                  className="w-full bg-dark-900 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-brand-red"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-bold text-sm shadow-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
