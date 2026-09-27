import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Mail, Phone, Lock, Save, Shield } from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        phone: formData.phone,
      };
      if (formData.password) {
        payload.password = formData.password;
      }
      await updateProfile(payload);
      setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (err) {
      // Handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Profile Settings</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Update your member credentials and contact phone for seamless delivery coordination.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        {/* User Card */}
        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-red to-brand-crimson text-white font-black text-2xl flex items-center justify-center shadow-glow">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{user?.name}</h3>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <span className="inline-block mt-1 text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Verified Member
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Registered Email (Cannot Be Changed)</label>
            <div className="relative opacity-60">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-sm text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Mobile Phone</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 space-y-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Change Security Password (Optional)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Leave blank to keep current"
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Repeat new password"
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold shadow-glow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
