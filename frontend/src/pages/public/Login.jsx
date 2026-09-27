import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Car, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/user/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate(redirectPath);
      }
    } catch (err) {
      // Toast already shown in context
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      {/* Background ambient glow */}
      <div className="absolute w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-red to-brand-crimson flex items-center justify-center shadow-glow">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-wider text-white">
              APEX<span className="text-brand-red">WHEELS</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-white pt-2">Welcome Back</h2>
          <p className="text-xs text-slate-400">Access your luxury bookings, saved vehicles, and concierge</p>
        </div>

        {/* Demo Quick-Fill Buttons */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block text-center">
            One-Click Demo Credentials
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@apexwheels.com', 'Admin@123')}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 text-xs font-semibold transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('alex@example.com', 'User@123')}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-brand-red/10 hover:bg-brand-red/20 text-rose-300 border border-brand-red/20 text-xs font-semibold transition-all"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>User Demo</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300">Password</label>
              <a href="#" className="text-slate-400 hover:text-brand-red">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-bold text-sm shadow-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In Securely</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-center text-slate-400">
          Don't have an Apex Wheels account?{' '}
          <Link to="/register" className="text-brand-red hover:underline font-bold">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};
